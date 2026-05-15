export const runtime = 'nodejs'

import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const BRIEF_PROMPT = `YOU ARE FILLING IN CREATIVE-DIRECTION FIELDS OF A STRUCTURED AD-GENERATION BRIEF.
RETURN ONLY A JSON OBJECT WITH THESE KEYS (AND ONLY THESE KEYS):

{
  "brand_name": "string — short brand name",
  "brand_url": "string — full https URL (REQUIRED if not in form)",
  "campaign_name": "string — short slug like 'q2_gifting_test'",
  "target_audience": "string — 1-2 sentence description of the buyer",
  "key_message": "string — the single most important thing to convey",
  "brand_voice": {
    "tone": "string — 3-6 adjectives describing the brand voice",
    "avoid_words": ["array of words/phrases to never use"],
    "signature_phrases": ["array of brand phrases to favor (sparingly)"]
  },
  "must_include": ["array of scene elements every ad MUST contain"],
  "do_not_include": ["array of things every ad must AVOID"],
  "performance_hypotheses": [
    {"hypothesis": "string", "weight": 1.0}
  ],
  "copy_angles": [
    {
      "id": "snake_case_id",
      "headline_direction": "string — what direction the headline should take",
      "primary_text_direction": "string — what the body copy emphasizes",
      "cta": "Shop Now",
      "variations": 1
    }
  ]
}

RULES:
- Generate 2-3 distinct copy_angles, NOT just one
- copy_angles[].variations should be 1 (not more)
- brand_voice.tone should be a SINGLE comma-separated string, NOT an array
- Avoid generic words like "premium", "quality", "leading"
- do_not_include should contain SCENE-LEVEL negatives ("phones", "screens", "stock-photo feel"), not abstract concepts
- Return ONLY the JSON object, no preamble, no markdown fences`

function extractJson(raw: string): Record<string, unknown> {
  // Strip markdown fences
  let cleaned = raw.replace(/```json\s*/gi, '').replace(/```\s*/gi, '')
  // Extract first JSON object
  const match = cleaned.match(/\{[\s\S]*\}/)
  if (!match) throw new Error('No JSON found in response')
  return JSON.parse(match[0])
}

export async function POST(req: NextRequest) {
  try {
    const { scrape_data, brand_guidelines } = await req.json()
    if (!scrape_data || !brand_guidelines) {
      return Response.json({ error: 'scrape_data and brand_guidelines are required' }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return Response.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 500 })
    }

    const client = new Anthropic({ apiKey })

    // Build context from scrape data
    const productSummary = (scrape_data.products || [])
      .slice(0, 5)
      .map((p: { title: string; description: string; price: string }) =>
        `- ${p.title}${p.price ? ` ($${p.price})` : ''}: ${p.description?.slice(0, 150) || 'No description'}`
      )
      .join('\n')

    const userMessage = `${BRIEF_PROMPT}

---
BRAND URL: ${scrape_data.url || ''}
BRAND NAME: ${scrape_data.brand_name || ''}
HOMEPAGE TEXT (first 2500 chars): ${(scrape_data.homepage_text || '').slice(0, 2500)}

TOP PRODUCTS:
${productSummary || '(none scraped)'}

BRAND GUIDELINES FROM USER:
${brand_guidelines}
---

Now return the JSON brief.`

    const resp = await client.messages.create({
      model: 'claude-sonnet-4-5-20250514',
      max_tokens: 2000,
      messages: [{ role: 'user', content: userMessage }],
    })

    const text = resp.content[0].type === 'text' ? resp.content[0].text : ''
    const brief = extractJson(text)

    return Response.json(brief)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Brief generation failed'
    return Response.json({ error: message }, { status: 500 })
  }
}
