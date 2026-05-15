export const runtime = 'nodejs'

import { NextRequest } from 'next/server'
import { load } from 'cheerio'

const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

interface ScrapedProduct {
  title: string
  handle: string
  description: string
  images: string[]
  price: string
  tags: string[]
}

interface ScrapeResult {
  brand_name: string
  url: string
  is_shopify: boolean
  products: ScrapedProduct[]
  lifestyle_images: string[]
  homepage_text: string
}

async function tryShopifyJson(baseUrl: string): Promise<ScrapedProduct[] | null> {
  try {
    const res = await fetch(`${baseUrl.replace(/\/$/, '')}/products.json?limit=250`, {
      headers: { 'User-Agent': USER_AGENT },
      signal: AbortSignal.timeout(10000),
    })
    if (!res.ok) return null
    const ct = res.headers.get('content-type') || ''
    if (!ct.includes('application/json')) return null
    const data = await res.json()
    const products = data.products
    if (!Array.isArray(products)) return null

    return products.slice(0, 20).map((p: Record<string, unknown>) => ({
      title: (p.title as string) || '',
      handle: (p.handle as string) || '',
      description: stripHtml((p.body_html as string) || '').slice(0, 500),
      images: ((p.images as Array<{ src: string }>) || []).slice(0, 4).map((img) => img.src),
      price: ((p.variants as Array<{ price: string }>) || [])[0]?.price || '',
      tags: ((p.tags as string[]) || []).slice(0, 10),
    }))
  } catch {
    return null
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function bestSrc(img: any, baseUrl: string): string | null {
  const srcset = img.attr('srcset') as string | undefined
  if (srcset) {
    let bestUrl = ''
    let bestW = 0
    for (const entry of srcset.split(',')) {
      const parts = entry.trim().split(/\s+/)
      if (parts.length >= 2 && parts[1].endsWith('w')) {
        const w = parseInt(parts[1].slice(0, -1), 10)
        if (w > bestW) {
          bestW = w
          bestUrl = parts[0]
        }
      }
    }
    if (bestUrl) return new URL(bestUrl, baseUrl).href
  }
  const src = (img.attr('src') || img.attr('data-src')) as string | undefined
  if (src) return new URL(src, baseUrl).href
  return null
}

async function scrapeGeneric(url: string): Promise<{
  products: ScrapedProduct[]
  lifestyle_images: string[]
  homepage_text: string
  brand_name: string
}> {
  const res = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT },
    signal: AbortSignal.timeout(15000),
  })
  const html = await res.text()
  const $ = load(html)

  // Extract brand name from title or og:site_name
  const brand_name =
    $('meta[property="og:site_name"]').attr('content') ||
    $('title').text().split(/[|\-–—]/).pop()?.trim() ||
    new URL(url).hostname.replace('www.', '').split('.')[0]

  // Homepage text (first 2500 chars of visible text)
  $('script, style, noscript, iframe').remove()
  const homepage_text = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 2500)

  // Lifestyle images: large images from the page
  const lifestyle_images: string[] = []
  $('img').each((_: number, el: unknown) => {
    if (lifestyle_images.length >= 12) return false
    const src = bestSrc($(el as never), url)
    if (src && !src.includes('icon') && !src.includes('logo') && !src.includes('svg')) {
      lifestyle_images.push(src)
    }
  })

  // Try to find product-like elements
  const products: ScrapedProduct[] = []
  $('[class*="product"], [data-product]').each((_: number, el: unknown) => {
    if (products.length >= 10) return false
    const $el = $(el as never)
    const title = $el.find('h2, h3, [class*="title"]').first().text().trim()
    const img = $el.find('img').first()
    const imgSrc = bestSrc(img, url)
    if (title && imgSrc) {
      products.push({
        title,
        handle: title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        description: $el.find('p, [class*="description"]').first().text().trim().slice(0, 500),
        images: [imgSrc],
        price: $el.find('[class*="price"]').first().text().trim(),
        tags: [],
      })
    }
  })

  return { products, lifestyle_images, homepage_text, brand_name }
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()
    if (!url || typeof url !== 'string') {
      return Response.json({ error: 'URL is required' }, { status: 400 })
    }

    // Normalize URL
    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`

    // Try Shopify JSON first
    const shopifyProducts = await tryShopifyJson(normalizedUrl)
    const isShopify = shopifyProducts !== null

    // Always scrape the homepage for text + lifestyle images
    const generic = await scrapeGeneric(normalizedUrl)

    const result: ScrapeResult = {
      brand_name: generic.brand_name,
      url: normalizedUrl,
      is_shopify: isShopify,
      products: isShopify && shopifyProducts!.length > 0 ? shopifyProducts! : generic.products,
      lifestyle_images: generic.lifestyle_images,
      homepage_text: generic.homepage_text,
    }

    return Response.json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Scrape failed'
    return Response.json({ error: message }, { status: 500 })
  }
}
