# Ad Generator

## What it is
A Next.js 16 / React 19 starter for a web app that generates ad creatives from brand inputs. It's the scaffold for Clickflow's ad generator — fresh `create-next-app` shell with the AI SDKs installed (Anthropic for copy, Google GenAI for images, Fal.ai for hosted model inference, Cheerio for scraping brand pages) and a tiny shared `Button` component plus the Clickflow font/color tokens wired into Tailwind v4. The actual generation pipeline is not built yet — this is the starting point.

## What problem it solves
Cuts the time between "I want a new ad creative" and a draft visual + headline from hours of designer-and-copywriter work down to minutes. The intended flow: paste a brand URL or upload assets, the app scrapes/parses brand context, an LLM writes ad copy variants, and an image model renders matching visuals. None of that is wired yet — only the scaffold ships here.

## Maturity
`experimental` — scaffold only. Landing page is the unmodified Next.js template.

## How to run it
```bash
cd apps/ad-generator
npm install
cp .env.example .env.local   # add keys as you wire each SDK
npm run dev                  # http://localhost:3000
```

Build and deploy:
```bash
npm run build && npm start
```
Deploys cleanly to Vercel out of the box.

## Inputs and outputs
**In:** (planned) a brand URL or uploaded brand assets, plus a short brief.
**Out:** (planned) ad copy variants and rendered image creatives.

Today: nothing — landing page only.

## Stack
- Next.js 16.2 (App Router) + React 19
- Tailwind CSS v4 (DM Sans + Newsreader, Clickflow palette in `src/app/globals.css`)
- `@anthropic-ai/sdk` (copy)
- `@google/genai` (image/multimodal generation)
- `@fal-ai/client` (hosted model inference)
- `cheerio` (brand-page scraping)

## Where to extend
- `src/app/page.tsx` — replace the placeholder landing page with the generator UI.
- Add API routes under `src/app/api/` for the generation pipeline (one route per provider keeps keys server-side).
- `src/components/ui/` — shared UI primitives.
- `src/app/globals.css` — brand tokens.

## Known limitations
- No generation logic yet — SDKs are installed but unused.
- No persistence layer (no Supabase, no DB) — add one before this is more than a demo.
- No auth.
- No rate limiting on the (not-yet-existing) API routes.
- Next.js 16 is fast-moving; check `node_modules/next/dist/docs/` before assuming the App Router behaves the way older docs describe.
