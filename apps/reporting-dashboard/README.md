# Reporting Dashboard

## What it is
A Next.js + Supabase client reporting dashboard for an ad agency. Clients log in, see their unified Meta / Google / Klaviyo / Shopify performance in one place, request work, manage personas, and run ROI calculators. Admins manage clients, onboarding, requests, and seed demo data — all behind Supabase Auth with row-level security.

## What problem it solves
Agencies report by stitching screenshots from five dashboards into a Google Doc every week. This collapses the loop: data flows from every platform into one normalized table, clients self-serve their own view, and admins get an operational dashboard for onboarding and requests. The same project also hosts an experimental ad-creative generator (Claude + Gemini) and a set of ROI calculators that double as a lead magnet.

## Maturity
`working` — deployed to Vercel and used internally. Some routes (video generation, ad copy, creative library) are scaffolded but not finished. See `HANDOFF.md` for the most recent state.

## How to run it

```bash
cd apps/reporting-dashboard
cp .env.example .env.local      # fill in your Supabase + AI provider keys
npm install
npm run dev                     # http://localhost:3000
```

One-time database setup:
1. Create a Supabase project at supabase.com.
2. Paste `supabase/schema.sql` into the SQL editor and run it.
3. Configure Auth → URL Configuration with `http://localhost:3000` as Site URL and `http://localhost:3000/auth/callback` as a redirect URL.
4. (Optional) Deploy the four pull-* edge functions under `supabase/functions/` to ingest data daily.

See `SETUP-GUIDE.md` for a longer walkthrough and `HANDOFF.md` for the current build state.

## Inputs and outputs
**In:** Supabase data from the four `pull-*` edge functions (Meta, Google, Klaviyo, Shopify APIs) + manually onboarded client records.
**Out:** A browser dashboard at `/dashboard` per client; an admin dashboard at `/admin`; JSON API routes under `/api/*`.

## Where to extend it
- New platform integration → add a new `supabase/functions/pull-{platform}.ts` and add a row type to `client_metrics`.
- New client-facing page → add a route under `src/app/(client)/`.
- New admin action → add a server action in `src/app/actions/admin.ts`.
- Theming / multi-agency look → `src/lib/agency-theme.ts`.

## Known limitations
- Built against Next.js 16 with the `proxy.ts` convention (replaces `middleware.ts`) — some APIs differ from current docs.
- The edge functions are scaffolds: they sketch the API call shape but each platform's auth (OAuth refresh tokens, ad-account scoping) needs to be filled in for your environment.
- Schema seed data is illustrative only. The `seed-demo-data.ts` generator produces plausible numbers but should not be left in production.
- RLS policies in `schema.sql` are a starting point — review them before exposing to real clients.
- The video-generation route requires a `FAL_KEY` and is currently hidden in the UI.
