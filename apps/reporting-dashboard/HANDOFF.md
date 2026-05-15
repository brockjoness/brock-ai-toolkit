# Clickflow Dashboard — Handoff

Copy this entire block into a new Claude Code session to resume the build:

---

**Resume: Clickflow Dashboard Build**

Continue building the Clickflow self-serve ad platform deployed at:

- **Live URL:** https://your-deployment.vercel.app
- **Admin:** https://your-deployment.vercel.app/admin
- **Login:** https://your-deployment.vercel.app/login (password auth enabled)
- **Generator:** https://your-deployment.vercel.app/generator
- **Onboarding:** https://your-deployment.vercel.app/onboarding

**Codebase:** `apps/reporting-dashboard/`

**Deploy command:** `cd "apps/reporting-dashboard" && vercel --yes --prod --scope YOUR_VERCEL_SCOPE`

**Stack:** Next.js 16 + Supabase (project: YOUR_SUPABASE_PROJECT_REF) + Tailwind + Recharts

**Admin login:** brock@clickflow.dev / CHANGEME_ADMIN_PASSWORD

---

## What's DONE

### Phase 1: Foundation (COMPLETE)
- Clickflow branding (DM Sans, #FAFAF8 bg, #1A1A18 text, #2D7A4F accent)
- Feature-centric sidebar nav: Dashboard, Generator, Ad Copy, Ad Images, Personas, Reports, Creative Library, ROI Calculators, Settings
- All routes scaffolded under `src/app/(client)/`

### Phase 7: ROI Calculators (COMPLETE)
- 7 interactive calculators at `/calculators`
- Tab container: Ecom Ads, Lead Ads, Ecom Website, Lead Website, Ecom Email, Lead Email, SEO
- Formulas match Google Sheet `YOUR_GOOGLE_SHEET_ID`
- Components in `src/components/calculators/`

### Phase 5: Reports + Demo Data Seeder (COMPLETE)
- Reports page at `/reports` with metric cards, charts, campaign tables
- Demo data generator at `src/lib/seed-demo-data.ts`
- Admin seeds via "Seed Demo Data" button on admin client detail page

### Phase 3: Personas (COMPLETE)
- Full CRUD at `/personas` with form + card components
- Supabase `personas` table with RLS
- API route at `src/app/api/personas/route.ts`

### Admin Improvements (COMPLETE)
- Onboarding → client flow
- Expandable onboarding table with full submission detail view
- Client edit form on admin detail page
- Generic `updateClient()` server action

### Ad Generator (COMPLETE — images only, video scaffolded)
- `src/app/(client)/generator/page.tsx` — useReducer, 3 phases (form → stepper → results)
- 5 API routes under `src/app/api/generator/`: scrape, brief, headlines, image, video
- Pipeline: Paste URL → scrape → Claude brief → Claude headlines → Gemini images
- Video route exists but hidden (needs `FAL_KEY`)
- Env vars on Vercel: `ANTHROPIC_API_KEY`, `GEMINI_API_KEY` (set), `FAL_KEY` (not set)

### Onboarding v2 — Self-Serve (COMPLETE)
- **Self-serve flow:** Onboarding auto-creates client + client_users link → redirects straight to dashboard. No admin approval needed.
- **Agency/Brand account type:** Step-0 card selector ("I'm an Agency" / "I'm a Brand") replaces old agency dropdown
- **Auto-fill from website:** `POST /api/onboarding/analyze-website` scrapes website → Claude Sonnet 4.5 → pre-fills brand_voice, target_audience, additional_notes at step 4
- **Gradient header:** Animated blue + gold gradient blobs matching clickflow.dev hero
- **Industry selector:** 11 options including "Mobile App"
- **Supabase fixes:** `agency`/`account_type` stripped before insert; status constraint handled (insert as 'submitted', update to 'completed')
- **Service role client:** Onboarding API uses `SUPABASE_SERVICE_ROLE_KEY` to bypass RLS for client/user creation
- **Branding:** All "ClickFlow" → "Clickflow" (lowercase f) across entire codebase

### Auth System Fixes (COMPLETE)
- **Password login added:** Login page supports both password and magic link auth
- **RLS fix:** Added SELECT policy on `client_users` (`auth.uid() = user_id`) — table had RLS enabled but zero policies, blocking all authenticated reads
- **Multiple client_users rows:** All `.single()` calls replaced throughout codebase — `getClientUser()`, `requireAdmin()`, admin layout, onboarding page, and auth callback all handle multiple rows
- **Auth callback fix:** `/auth/callback` route now checks all user rows for admin/client role instead of failing on `.single()`
- **Onboarding dedup:** API checks for existing `client_users` record before inserting to prevent duplicates

### Slack Webhook Fix (COMPLETE)
- **Removed Acme Agency webhook** from both `.env.local` and Vercel env vars — was sending Clickflow onboarding notifications to Acme Agency Slack workspace (YOUR_SLACK_TEAM_ID)
- **No Clickflow webhook configured yet** — code gracefully skips when `SLACK_WEBHOOK_URL` is unset
- Acme Agency website's own Slack integration is unaffected (separate Vercel project)

---

## What's IN PROGRESS — Pick up here

### Enable Video Generation (NEXT)
1. Set `FAL_KEY` env var on Vercel
2. Unhide video count selector in `src/app/(client)/generator/page.tsx`
3. Route at `src/app/api/generator/video/route.ts` uses Kling 2.1 via `@fal-ai/client`
4. Duration: 5s or 10s, cfg_scale 0.5, data URI input

---

## What's PENDING

### Phase 2: Ad Copy Generator
- Meta copy: headlines, descriptions, body copy
- Google copy: 30 headlines (30 char), 10 descriptions (90 char), callouts, sitelinks
- Persona picker integration
- API route: `POST /api/generate-copy`
- Need `OPENAI_API_KEY` env var

### Phase 6: Creative Inspiration Library
- Supabase `creative_library` table exists
- Paste URL → fetch OG metadata → save + preview card grid
- Tag/filter system

### Phase 4: Ad Images (separate from Generator)
- AI-generated product images from URLs
- Integration TBD (may overlap with Generator)

---

## Supabase Details

### Tables (all exist)
clients, client_users, client_metrics, meta_ads, google_ads, klaviyo_metrics, shopify_metrics, onboarding_submissions, platform_connections, client_requests, client_notes, personas, creative_library, generated_copy

### RLS Policies (key ones)
- `client_users`: "Users can read own rows" — `auth.uid() = user_id`
- `clients`: "Client access" (SELECT), "Admin access" (ALL)
- `onboarding_submissions`: "Authenticated users can submit" (INSERT), "Submitter access" (SELECT), "Admin access" (ALL)
- Onboarding API route uses **service role key** to bypass RLS for creating clients/users

### Data State
- Admin user: brock@clickflow.dev (password: CHANGEME_ADMIN_PASSWORD)
- Original client: "Example Client" (00000000-0000-0000-0000-000000000000)
- Test onboarding clients created during testing
- Metrics: empty until seeded via admin → client detail → "Seed Demo Data"

---

## Key Files
- `src/proxy.ts` — auth proxy (protects all client + admin routes)
- `src/app/login/page.tsx` — login (password + magic link)
- `src/app/auth/callback/route.ts` — magic link callback, routes admin→/admin, client→/dashboard, new→/onboarding
- `src/app/onboarding/page.tsx` — onboarding with gradient header
- `src/components/forms/onboarding-form.tsx` — 5-step self-serve onboarding
- `src/app/api/onboarding/route.ts` — auto-creates client + user link (uses service role)
- `src/app/api/onboarding/analyze-website/route.ts` — Claude-powered website analysis for auto-fill
- `src/lib/queries/auth.ts` — getClientUser, requireAdmin (handles multiple rows)
- `src/components/layout/sidebar.tsx` — main nav
- `src/app/(client)/layout.tsx` — client layout with sidebar
- `src/app/(client)/generator/page.tsx` — generator UI
- `src/app/api/generator/` — 5 API routes (scrape, brief, headlines, image, video)
- `src/app/actions/admin.ts` — all server actions
- `src/lib/seed-demo-data.ts` — demo data generator
- `src/lib/supabase-server.ts` — server Supabase client (anon key, respects RLS)
- `src/lib/supabase.ts` — browser Supabase client
- `src/lib/agency-theme.ts` — theme system (Clickflow, Acme Agency, Beacon Brand)
- `.env.local` — Supabase keys, Anthropic key, Gemini key (no Slack webhook currently)
- `vercel.json` — function duration overrides for generator routes

---

## Important Rules
- **Next.js 16:** Read `node_modules/next/dist/docs/` before writing code — APIs may differ from training data. `proxy.ts` replaces `middleware.ts`.
- **Always spell "Clickflow" with lowercase f** — never "ClickFlow"
- **Agency separation is critical:** Never use Acme Agency credentials, Slack webhooks, Notion databases, or Asana projects for Clickflow work (or vice versa). They are completely independent.
- **Service role key** is used ONLY in the onboarding API route for privileged operations. All other server code uses the anon key with RLS.
- **No database for generator** — everything is ephemeral in browser session
- **Gemini model:** Currently `gemini-2.0-flash-exp` for image generation
- **All API routes** use `export const runtime = 'nodejs'`
- **Proxy matcher** excludes `_next/static`, `_next/image`, `favicon.ico`, and `api` routes
