export const runtime = 'nodejs'

import { NextRequest } from 'next/server'
import { fal } from '@fal-ai/client'

const ENDPOINT = 'fal-ai/kling-video/v2.1/standard/image-to-video' as const

interface VideoRequest {
  image_data_uri: string
  motion_prompt?: string
  headline?: string
  duration_seconds?: number
  negative_prompt?: string
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as VideoRequest
    const { image_data_uri, motion_prompt, headline, duration_seconds = 5, negative_prompt } = body

    if (!image_data_uri) {
      return Response.json({ error: 'image_data_uri is required' }, { status: 400 })
    }

    const falKey = process.env.FAL_KEY
    if (!falKey) {
      return Response.json({ error: 'FAL_KEY not configured' }, { status: 500 })
    }

    fal.config({ credentials: falKey })

    // Duration: "5" or "10"
    const durationStr = duration_seconds >= 8 ? '10' : '5'

    // Build motion prompt
    let mp = motion_prompt || 'Gentle natural motion, subtle dolly-in toward the product, premium D2C ad feel'
    if (headline) {
      mp = `${mp}. Subject: ${headline}`
    }

    const result = await fal.subscribe(ENDPOINT, {
      input: {
        image_url: image_data_uri,
        prompt: mp,
        duration: durationStr,
        cfg_scale: 0.5,
        ...(negative_prompt ? { negative_prompt } : {}),
      },
      logs: false,
    })

    const videoUrl = (result?.data as unknown as { video?: { url?: string } })?.video?.url
    if (!videoUrl) {
      return Response.json({ error: 'No video URL in response' }, { status: 500 })
    }

    // Download video and return as base64 data URI
    const videoRes = await fetch(videoUrl, { signal: AbortSignal.timeout(180000) })
    if (!videoRes.ok) {
      return Response.json({ error: 'Failed to download video' }, { status: 500 })
    }

    const buffer = await videoRes.arrayBuffer()
    const base64 = Buffer.from(buffer).toString('base64')
    const dataUri = `data:video/mp4;base64,${base64}`

    return Response.json({ video: dataUri })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Video generation failed'
    return Response.json({ error: message }, { status: 500 })
  }
}
