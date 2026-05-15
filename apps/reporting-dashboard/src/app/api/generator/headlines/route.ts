export const runtime = 'nodejs'

import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

interface CopyAngle {
  id: string
  headline_direction: string
  primary_text_direction: string
  cta: string
  variations: number
}

interface Brief {
  brand_name: string
  brand_voice: {
    tone: string
    avoid_words: string[]
    signature_phrases: string[]
  }
  target_audience: string
  key_message: string
  copy_angles: CopyAngle[]
}

function extractJsonArray(raw: string): string[] {
  let cleaned = raw.replace(/```json\s*/gi, '').replace(/```\s*/gi, '')
  const match = cleaned.match(/\[[\s\S]*\]/)
  if (!match) {
    // Fallback: extract quoted strings
    const quotes = raw.match(/["\u201c]([^"\u201d]{4,100})["\u201d]/g)
    if (quotes) return quotes.map((q) => q.replace(/["\u201c\u201d]/g, ''))
    return [raw.split(/[.;:]/)[0].trim().slice(0, 80)]
  }
  return JSON.parse(match[0])
}

export async function POST(req: NextRequest) {
  try {
    const { brief } = (await req.json()) as { brief: Brief }
    if (!brief?.copy_angles?.length) {
      return Response.json({ error: 'brief with copy_angles is required' }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return Response.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 500 })
    }

    const client = new Anthropic({ apiKey })
    const results: Record<string, string[]> = {}

    for (const angle of brief.copy_angles) {
      const prompt = `YOU ARE A SENIOR DIRECT-RESPONSE COPYWRITER WRITING AD HEADLINES FOR ${brief.brand_name}.

BRAND VOICE: ${brief.brand_voice.tone}
AVOID THESE WORDS: ${brief.brand_voice.avoid_words?.join(', ') || '(none)'}
SIGNATURE PHRASES (use sparingly, only if natural): ${brief.brand_voice.signature_phrases?.join(', ') || '(none)'}

TARGET AUDIENCE: ${brief.target_audience}
KEY MESSAGE: ${brief.key_message}

CREATIVE ANGLE ID: ${angle.id}
HEADLINE DIRECTION: ${angle.headline_direction}
PRIMARY TEXT DIRECTION: ${angle.primary_text_direction}

WRITE ${angle.variations || 1} DISTINCT AD HEADLINES THAT:
- Are 3-8 words each (will be rendered on an image — must be short)
- Match the brand voice perfectly
- Pursue the headline direction without quoting it verbatim
- Feel like real ad copy, not generic marketing
- Avoid the forbidden words

RETURN ONLY A JSON ARRAY OF STRINGS, NOTHING ELSE. EXAMPLE:
["Headline one here", "Headline two here"]`

      const resp = await client.messages.create({
        model: 'claude-sonnet-4-5-20250514',
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }],
      })

      const text = resp.content[0].type === 'text' ? resp.content[0].text : '[]'
      results[angle.id] = extractJsonArray(text)
    }

    return Response.json({ headlines: results })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Headline generation failed'
    return Response.json({ error: message }, { status: 500 })
  }
}
