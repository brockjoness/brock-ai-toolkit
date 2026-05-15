export const runtime = 'nodejs'

import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { load } from 'cheerio'

const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()
    if (!url || typeof url !== 'string') {
      return Response.json({ error: 'URL is required' }, { status: 400 })
    }

    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`

    // Fetch and extract page text
    const res = await fetch(normalizedUrl, {
      headers: { 'User-Agent': USER_AGENT },
      signal: AbortSignal.timeout(15000),
    })
    const html = await res.text()
    const $ = load(html)

    // Get meta description and og tags
    const metaDescription = $('meta[name="description"]').attr('content') || ''
    const ogDescription = $('meta[property="og:description"]').attr('content') || ''
    const ogTitle = $('meta[property="og:title"]').attr('content') || ''

    // Get visible page text
    $('script, style, noscript, iframe, nav, footer, header').remove()
    const pageText = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 3000)

    const siteContext = [
      ogTitle && `Title: ${ogTitle}`,
      metaDescription && `Meta description: ${metaDescription}`,
      ogDescription && `OG description: ${ogDescription}`,
      `Page content: ${pageText}`,
    ]
      .filter(Boolean)
      .join('\n\n')

    // Use Claude to analyze
    const anthropic = new Anthropic()
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250514',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: `Analyze this website content and extract the following. Be concise and specific — each field should be 1-2 sentences max.

Website: ${normalizedUrl}

${siteContext}

Return a JSON object with exactly these keys:
- "brand_voice": A brief description of the brand's tone and communication style (e.g., "Bold and direct with a playful edge" or "Premium and sophisticated, focused on craftsmanship")
- "target_audience": Who the brand's ideal customer appears to be based on the content (e.g., "Health-conscious parents aged 25-40 looking for convenient solutions")
- "additional_notes": One key insight about the brand's positioning, unique value prop, or market category

Return ONLY valid JSON, no markdown.`,
        },
      ],
    })

    const text =
      message.content[0].type === 'text' ? message.content[0].text : ''
    const analysis = JSON.parse(text)

    return Response.json(analysis)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Analysis failed'
    return Response.json({ error: message }, { status: 500 })
  }
}
