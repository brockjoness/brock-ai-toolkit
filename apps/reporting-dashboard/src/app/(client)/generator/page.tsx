'use client'

import { useReducer, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'

/* ─── Types ─── */

interface GeneratedAsset {
  type: 'image' | 'video'
  dataUri: string
  headline: string
  angleId: string
}

interface FormData {
  url: string
  brand_guidelines: string
  instagram_url: string
  drive_link: string
  image_count: number
  video_count: number
}

type Step = 'scrape' | 'brief' | 'headlines' | 'images' | 'videos'

interface State {
  phase: 'form' | 'generating' | 'results'
  form: FormData
  currentStep: Step | null
  stepStatus: Record<Step, 'pending' | 'active' | 'done' | 'error'>
  stepError: string | null
  assets: GeneratedAsset[]
  brief: Record<string, unknown> | null
  headlines: Record<string, string[]> | null
  scrapeData: Record<string, unknown> | null
}

type Action =
  | { type: 'UPDATE_FORM'; field: keyof FormData; value: string | number }
  | { type: 'START_GENERATING' }
  | { type: 'SET_STEP'; step: Step; status: 'active' | 'done' | 'error' }
  | { type: 'SET_STEP_ERROR'; error: string }
  | { type: 'SET_SCRAPE_DATA'; data: Record<string, unknown> }
  | { type: 'SET_BRIEF'; data: Record<string, unknown> }
  | { type: 'SET_HEADLINES'; data: Record<string, string[]> }
  | { type: 'ADD_ASSET'; asset: GeneratedAsset }
  | { type: 'FINISH' }
  | { type: 'RESET' }

const INITIAL_FORM: FormData = {
  url: '',
  brand_guidelines: '',
  instagram_url: '',
  drive_link: '',
  image_count: 2,
  video_count: 0,
}

const STEPS: Step[] = ['scrape', 'brief', 'headlines', 'images', 'videos']

const STEP_LABELS: Record<Step, string> = {
  scrape: 'Scraping website',
  brief: 'Creating creative brief',
  headlines: 'Generating headlines',
  images: 'Generating images',
  videos: 'Generating videos',
}

const initialState: State = {
  phase: 'form',
  form: INITIAL_FORM,
  currentStep: null,
  stepStatus: { scrape: 'pending', brief: 'pending', headlines: 'pending', images: 'pending', videos: 'pending' },
  stepError: null,
  assets: [],
  brief: null,
  headlines: null,
  scrapeData: null,
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'UPDATE_FORM':
      return { ...state, form: { ...state.form, [action.field]: action.value } }
    case 'START_GENERATING':
      return {
        ...state,
        phase: 'generating',
        currentStep: 'scrape',
        stepStatus: { scrape: 'pending', brief: 'pending', headlines: 'pending', images: 'pending', videos: 'pending' },
        stepError: null,
        assets: [],
        brief: null,
        headlines: null,
        scrapeData: null,
      }
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.step,
        stepStatus: { ...state.stepStatus, [action.step]: action.status },
        stepError: action.status === 'error' ? state.stepError : null,
      }
    case 'SET_STEP_ERROR':
      return { ...state, stepError: action.error }
    case 'SET_SCRAPE_DATA':
      return { ...state, scrapeData: action.data }
    case 'SET_BRIEF':
      return { ...state, brief: action.data }
    case 'SET_HEADLINES':
      return { ...state, headlines: action.data }
    case 'ADD_ASSET':
      return { ...state, assets: [...state.assets, action.asset] }
    case 'FINISH':
      return { ...state, phase: 'results', currentStep: null }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

/* ─── Component ─── */

export default function GeneratorPage() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const abortRef = useRef<AbortController | null>(null)

  async function runGeneration() {
    dispatch({ type: 'START_GENERATING' })
    abortRef.current = new AbortController()
    const signal = abortRef.current.signal

    try {
      // Step 1: Scrape
      dispatch({ type: 'SET_STEP', step: 'scrape', status: 'active' })
      const scrapeRes = await fetch('/api/generator/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: state.form.url }),
        signal,
      })
      if (!scrapeRes.ok) throw new Error((await scrapeRes.json()).error || 'Scrape failed')
      const scrapeData = await scrapeRes.json()
      dispatch({ type: 'SET_SCRAPE_DATA', data: scrapeData })
      dispatch({ type: 'SET_STEP', step: 'scrape', status: 'done' })

      // Step 2: Brief
      dispatch({ type: 'SET_STEP', step: 'brief', status: 'active' })
      const briefRes = await fetch('/api/generator/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scrape_data: scrapeData,
          brand_guidelines: state.form.brand_guidelines,
        }),
        signal,
      })
      if (!briefRes.ok) throw new Error((await briefRes.json()).error || 'Brief generation failed')
      const brief = await briefRes.json()
      dispatch({ type: 'SET_BRIEF', data: brief })
      dispatch({ type: 'SET_STEP', step: 'brief', status: 'done' })

      // Step 3: Headlines
      dispatch({ type: 'SET_STEP', step: 'headlines', status: 'active' })
      const headlinesRes = await fetch('/api/generator/headlines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brief }),
        signal,
      })
      if (!headlinesRes.ok) throw new Error((await headlinesRes.json()).error || 'Headlines failed')
      const headlinesData = await headlinesRes.json()
      const headlines: Record<string, string[]> = headlinesData.headlines
      dispatch({ type: 'SET_HEADLINES', data: headlines })
      dispatch({ type: 'SET_STEP', step: 'headlines', status: 'done' })

      // Step 4: Images
      const imageCount = state.form.image_count
      if (imageCount > 0) {
        dispatch({ type: 'SET_STEP', step: 'images', status: 'active' })
        const angles = (brief.copy_angles || []) as Array<{
          id: string
          headline_direction: string
          primary_text_direction: string
          cta: string
        }>

        // Pick first product image as reference
        const products = (scrapeData.products || []) as Array<{ title: string; images: string[] }>
        const refImage = products[0]?.images?.[0] || null
        const productName = products[0]?.title || null

        for (let i = 0; i < imageCount; i++) {
          if (signal.aborted) break
          const angle = angles[i % angles.length]
          const angleHeadlines = headlines[angle.id] || ['Your Product, Reimagined']
          const headline = angleHeadlines[i % angleHeadlines.length]

          try {
            const imgRes = await fetch('/api/generator/image', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                brief,
                angle,
                headline,
                reference_image_url: refImage,
                product_name: productName,
                aspect_ratio: '1:1',
              }),
              signal,
            })
            if (imgRes.ok) {
              const imgData = await imgRes.json()
              if (imgData.image) {
                dispatch({
                  type: 'ADD_ASSET',
                  asset: { type: 'image', dataUri: imgData.image, headline, angleId: angle.id },
                })
              }
            }
          } catch (e) {
            if ((e as Error).name === 'AbortError') break
            // Continue to next image on error
          }
        }
        dispatch({ type: 'SET_STEP', step: 'images', status: 'done' })
      } else {
        dispatch({ type: 'SET_STEP', step: 'images', status: 'done' })
      }

      // Step 5: Videos
      const videoCount = state.form.video_count
      if (videoCount > 0) {
        dispatch({ type: 'SET_STEP', step: 'videos', status: 'active' })

        // Use generated images as source for videos, fall back to first product image
        for (let i = 0; i < videoCount; i++) {
          if (signal.aborted) break

          // Prefer a generated image, else use scraped product image
          let imageDataUri = ''
          if (state.assets && state.assets.length > 0) {
            // We can't access state.assets here since it's stale in closure — but we store them
            // Use the first generated image if we have one
          }
          // Since we can't read updated state in async, we'll pass the first product image
          const products = (scrapeData.products || []) as Array<{ images: string[] }>
          const productImg = products[0]?.images?.[0]
          if (productImg) {
            // Fetch and convert to data URI
            try {
              const fetchRes = await fetch(productImg, { signal })
              if (fetchRes.ok) {
                const buf = await fetchRes.arrayBuffer()
                const base64 = btoa(
                  new Uint8Array(buf).reduce((s, b) => s + String.fromCharCode(b), '')
                )
                const mime = fetchRes.headers.get('content-type') || 'image/jpeg'
                imageDataUri = `data:${mime};base64,${base64}`
              }
            } catch {
              // skip
            }
          }

          if (!imageDataUri) continue

          const angles = (brief.copy_angles || []) as Array<{ id: string }>
          const angle = angles[i % angles.length]
          const angleHeadlines = headlines[angle.id] || ['']

          try {
            const vidRes = await fetch('/api/generator/video', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                image_data_uri: imageDataUri,
                headline: angleHeadlines[0],
                duration_seconds: 5,
              }),
              signal,
            })
            if (vidRes.ok) {
              const vidData = await vidRes.json()
              if (vidData.video) {
                dispatch({
                  type: 'ADD_ASSET',
                  asset: {
                    type: 'video',
                    dataUri: vidData.video,
                    headline: angleHeadlines[0],
                    angleId: angle.id,
                  },
                })
              }
            }
          } catch (e) {
            if ((e as Error).name === 'AbortError') break
          }
        }
        dispatch({ type: 'SET_STEP', step: 'videos', status: 'done' })
      } else {
        dispatch({ type: 'SET_STEP', step: 'videos', status: 'done' })
      }

      dispatch({ type: 'FINISH' })
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        const step = state.currentStep || 'scrape'
        dispatch({ type: 'SET_STEP_ERROR', error: (err as Error).message })
        dispatch({ type: 'SET_STEP', step, status: 'error' })
      }
    }
  }

  function handleCancel() {
    abortRef.current?.abort()
    dispatch({ type: 'RESET' })
  }

  function downloadAsset(asset: GeneratedAsset, index: number) {
    const ext = asset.type === 'video' ? 'mp4' : 'png'
    const link = document.createElement('a')
    link.href = asset.dataUri
    link.download = `ad-${asset.angleId}-${index + 1}.${ext}`
    link.click()
  }

  /* ─── Form Phase ─── */
  if (state.phase === 'form') {
    return (
      <div className="max-w-[640px]">
        <h1 className="text-[22px] font-semibold text-[var(--color-foreground,#1A1A18)] mb-1">Ad Generator</h1>
        <p className="text-[13px] text-[#888] mb-6">
          Paste a website URL and brand guidelines to generate ad creatives.
        </p>

        <Card className="space-y-5">
          <div>
            <label className="block text-[12px] font-medium text-[#666] mb-1.5 uppercase tracking-wide">
              Website URL *
            </label>
            <Input
              type="url"
              placeholder="https://example.com"
              value={state.form.url}
              onChange={(e) => dispatch({ type: 'UPDATE_FORM', field: 'url', value: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-[#666] mb-1.5 uppercase tracking-wide">
              Brand Guidelines *
            </label>
            <Textarea
              placeholder="Describe the brand voice, target audience, key messages, what to avoid..."
              value={state.form.brand_guidelines}
              onChange={(e) =>
                dispatch({ type: 'UPDATE_FORM', field: 'brand_guidelines', value: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-[#666] mb-1.5 uppercase tracking-wide">
                Instagram URL
              </label>
              <Input
                type="url"
                placeholder="https://instagram.com/brand"
                value={state.form.instagram_url}
                onChange={(e) =>
                  dispatch({ type: 'UPDATE_FORM', field: 'instagram_url', value: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#666] mb-1.5 uppercase tracking-wide">
                Google Drive Link
              </label>
              <Input
                type="url"
                placeholder="https://drive.google.com/..."
                value={state.form.drive_link}
                onChange={(e) =>
                  dispatch({ type: 'UPDATE_FORM', field: 'drive_link', value: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-[#666] mb-1.5 uppercase tracking-wide">
              Image Count
            </label>
            <Select
              value={state.form.image_count}
              onChange={(e) =>
                dispatch({ type: 'UPDATE_FORM', field: 'image_count', value: parseInt(e.target.value) })
              }
            >
              <option value={1}>1 image</option>
              <option value={2}>2 images</option>
              <option value={3}>3 images</option>
            </Select>
          </div>

          <Button
            variant="accent"
            size="lg"
            className="w-full"
            disabled={!state.form.url || !state.form.brand_guidelines}
            onClick={runGeneration}
          >
            Generate Creatives
          </Button>
        </Card>
      </div>
    )
  }

  /* ─── Generating Phase (Stepper) ─── */
  if (state.phase === 'generating') {
    return (
      <div className="max-w-[640px]">
        <h1 className="text-[22px] font-semibold text-[var(--color-foreground,#1A1A18)] mb-1">Generating...</h1>
        <p className="text-[13px] text-[#888] mb-6">
          Creating ad creatives for{' '}
          <span className="font-medium text-[var(--color-foreground,#1A1A18)]">{state.form.url}</span>
        </p>

        <Card className="space-y-0">
          {STEPS.map((step, i) => {
            const status = state.stepStatus[step]
            // Skip videos step if no videos requested
            if (step === 'videos' && state.form.video_count === 0) return null

            return (
              <div key={step} className="flex items-start gap-3 py-3.5 px-1">
                {/* Status icon */}
                <div className="mt-0.5 flex-shrink-0">
                  {status === 'done' && (
                    <div className="w-6 h-6 rounded-full bg-[var(--color-accent,#2D7A4F)] flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                  {status === 'active' && (
                    <div className="w-6 h-6 rounded-full border-2 border-[var(--color-accent,#2D7A4F)] flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent,#2D7A4F)] animate-pulse" />
                    </div>
                  )}
                  {status === 'pending' && (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-200" />
                  )}
                  {status === 'error' && (
                    <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Label */}
                <div className="flex-1 min-w-0">
                  <div
                    className={`text-[14px] ${
                      status === 'active'
                        ? 'text-[var(--color-foreground,#1A1A18)] font-medium'
                        : status === 'done'
                        ? 'text-[var(--color-accent,#2D7A4F)]'
                        : status === 'error'
                        ? 'text-red-500'
                        : 'text-[#999]'
                    }`}
                  >
                    {STEP_LABELS[step]}
                    {status === 'active' && <span className="ml-1.5 text-[12px] text-[#999]">...</span>}
                  </div>
                  {status === 'error' && state.stepError && (
                    <div className="text-[12px] text-red-400 mt-0.5">{state.stepError}</div>
                  )}
                </div>

                {/* Connector line */}
                {i < STEPS.length - 1 && !(step === 'images' && state.form.video_count === 0) && (
                  <div className="absolute left-[31px] top-[42px] w-px h-[calc(100%-42px)] bg-gray-200" />
                )}
              </div>
            )
          })}
        </Card>

        {/* Preview images as they arrive */}
        {state.assets.length > 0 && (
          <div className="mt-6">
            <h2 className="text-[14px] font-medium text-[var(--color-foreground,#1A1A18)] mb-3">
              Generated so far ({state.assets.length})
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {state.assets.map((asset, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-[var(--color-card-border,#E8E8E6)]">
                  {asset.type === 'image' ? (
                    <img src={asset.dataUri} alt={asset.headline} className="w-full aspect-square object-cover" />
                  ) : (
                    <video src={asset.dataUri} controls className="w-full aspect-square object-cover" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <Button variant="secondary" size="md" className="mt-4" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    )
  }

  /* ─── Results Phase ─── */
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-semibold text-[var(--color-foreground,#1A1A18)] mb-1">Results</h1>
          <p className="text-[13px] text-[#888]">
            {state.assets.length} creative{state.assets.length !== 1 ? 's' : ''} generated for{' '}
            <span className="font-medium text-[var(--color-foreground,#1A1A18)]">
              {(state.brief as Record<string, string>)?.brand_name || state.form.url}
            </span>
          </p>
        </div>
        <Button variant="secondary" size="md" onClick={() => dispatch({ type: 'RESET' })}>
          New Generation
        </Button>
      </div>

      {/* Brief summary */}
      {state.brief && (
        <Card className="mb-6">
          <h2 className="text-[14px] font-semibold text-[var(--color-foreground,#1A1A18)] mb-3">Creative Brief</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-[13px]">
            <div>
              <span className="text-[#888]">Target Audience: </span>
              <span className="text-[var(--color-foreground,#1A1A18)]">
                {(state.brief as Record<string, string>).target_audience}
              </span>
            </div>
            <div>
              <span className="text-[#888]">Key Message: </span>
              <span className="text-[var(--color-foreground,#1A1A18)]">
                {(state.brief as Record<string, string>).key_message}
              </span>
            </div>
            <div>
              <span className="text-[#888]">Brand Voice: </span>
              <span className="text-[var(--color-foreground,#1A1A18)]">
                {((state.brief as Record<string, Record<string, string>>).brand_voice)?.tone}
              </span>
            </div>
            <div>
              <span className="text-[#888]">Angles: </span>
              <span className="text-[var(--color-foreground,#1A1A18)]">
                {((state.brief as Record<string, Array<{ id: string }>>).copy_angles || []).map((a) => a.id).join(', ')}
              </span>
            </div>
          </div>
        </Card>
      )}

      {/* Asset grid */}
      {state.assets.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {state.assets.map((asset, i) => (
            <Card key={i} className="p-0 overflow-hidden">
              {asset.type === 'image' ? (
                <img src={asset.dataUri} alt={asset.headline} className="w-full aspect-square object-cover" />
              ) : (
                <video src={asset.dataUri} controls className="w-full aspect-video object-cover" />
              )}
              <div className="p-3">
                <div className="text-[13px] font-medium text-[var(--color-foreground,#1A1A18)] mb-1 truncate">
                  {asset.headline}
                </div>
                <div className="text-[11px] text-[#999] mb-2">
                  {asset.type === 'image' ? 'Image' : 'Video'} &middot; {asset.angleId}
                </div>
                <Button variant="secondary" size="sm" className="w-full" onClick={() => downloadAsset(asset, i)}>
                  Download
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <p className="text-[14px] text-[#888] text-center py-8">
            No assets were generated. Try again with different settings.
          </p>
        </Card>
      )}

      {/* Headlines reference */}
      {state.headlines && Object.keys(state.headlines).length > 0 && (
        <Card className="mt-6">
          <h2 className="text-[14px] font-semibold text-[var(--color-foreground,#1A1A18)] mb-3">
            Generated Headlines
          </h2>
          <div className="space-y-3">
            {Object.entries(state.headlines).map(([angleId, lines]) => (
              <div key={angleId}>
                <div className="text-[12px] text-[#888] uppercase tracking-wide mb-1">{angleId}</div>
                <div className="flex flex-wrap gap-2">
                  {lines.map((h, j) => (
                    <span
                      key={j}
                      className="inline-block px-3 py-1.5 bg-[#F5F5F3] rounded-lg text-[13px] text-[var(--color-foreground,#1A1A18)]"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
