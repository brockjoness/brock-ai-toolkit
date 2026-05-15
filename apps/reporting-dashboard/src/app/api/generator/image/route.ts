export const runtime = 'nodejs'

import { NextRequest } from 'next/server'
import { GoogleGenAI } from '@google/genai'

interface ImageRequest {
  brief: {
    brand_name: string
    brand_voice: { tone: string; avoid_words: string[] }
    target_audience: string
    must_include: string[]
    do_not_include: string[]
    performance_hypotheses: Array<{ hypothesis: string; weight: number }>
  }
  angle: {
    headline_direction: string
    primary_text_direction: string
    cta: string
  }
  headline: string
  reference_image_url?: string
  product_name?: string
  aspect_ratio?: string
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ImageRequest
    const { brief, angle, headline, reference_image_url, product_name, aspect_ratio = '1:1' } = body

    if (!brief || !angle || !headline) {
      return Response.json({ error: 'brief, angle, and headline are required' }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return Response.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 })
    }

    const ai = new GoogleGenAI({ apiKey })

    // Build the image generation prompt (no all-caps labels — Nano Banana renders them literally)
    const topHypotheses = (brief.performance_hypotheses || [])
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 2)
      .map((h) => h.hypothesis)
      .join('; ')

    const productRef = product_name
      ? `Place the exact product (${product_name}) naturally into the scene, maintaining its exact cover design, colors, branding, and proportions from the reference. Photorealistic, hero placement, product clearly recognizable.`
      : ''

    const prompt = `Create a high-end social media advertisement image for ${brief.brand_name}, a ${brief.brand_voice.tone} brand.

Scene direction: ${angle.headline_direction} — adapted naturally for ${brief.target_audience}. ${angle.primary_text_direction}.

${productRef}

Render exactly two pieces of text directly on the image, integrated into the composition like a real D2C Instagram ad — and only these two:

1. The main headline (large, prominent, top of image): ${headline}
2. A small pill-shaped call-to-action button: ${angle.cta}

The text must be spelled exactly as shown above, perfectly legible, with crisp modern typography (clean white or brand-tonal sans-serif with subtle shadow). The CTA button should look like a real Instagram ad button. Do not render any other text, labels, captions, watermarks, badges, headers, or section names anywhere in the image. Do not render the words "headline", "CTA", "button", or any explanatory labels.

Mandatory scene elements: ${(brief.must_include || []).join(', ')}.

Do not include any of: ${[...(brief.brand_voice.avoid_words || []), ...(brief.do_not_include || [])].join(', ')}. No watermarks, no lorem ipsum, no extra UI chrome.

Lean the creative direction toward these performance insights: ${topHypotheses || 'none'}.

Format: aspect ratio ${aspect_ratio}. High-end D2C lifestyle advertising aesthetic. Photorealistic. Warm, inviting lighting. Real, natural human emotion if people are in the scene — never staged or fake-looking.`

    // Build parts
    const parts: Array<{ text: string } | { inlineData: { data: string; mimeType: string } }> = [
      { text: prompt },
    ]

    // If reference image provided, fetch and inline it
    if (reference_image_url) {
      try {
        const imgRes = await fetch(reference_image_url, { signal: AbortSignal.timeout(15000) })
        if (imgRes.ok) {
          const buffer = await imgRes.arrayBuffer()
          const base64 = Buffer.from(buffer).toString('base64')
          const mime = imgRes.headers.get('content-type') || 'image/jpeg'
          parts.push({ inlineData: { data: base64, mimeType: mime } })
        }
      } catch {
        // Continue without reference image
      }
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: [{ role: 'user', parts }],
      config: {
        responseModalities: ['IMAGE'],
        imageConfig: { aspectRatio: aspect_ratio as '1:1' | '9:16' | '16:9' | '4:3' | '3:4' },
      },
    })

    // Extract image from response
    const candidate = response.candidates?.[0]
    if (!candidate?.content?.parts) {
      return Response.json({ error: 'No image generated' }, { status: 500 })
    }

    for (const part of candidate.content.parts) {
      if (part.inlineData?.data) {
        const mime = part.inlineData.mimeType || 'image/png'
        const dataUri = `data:${mime};base64,${part.inlineData.data}`
        return Response.json({ image: dataUri, mime })
      }
    }

    return Response.json({ error: 'No image data in response' }, { status: 500 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Image generation failed'
    return Response.json({ error: message }, { status: 500 })
  }
}
