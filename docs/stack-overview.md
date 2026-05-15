# Stack overview

A short tour of the tools this toolkit depends on, and why each one is here. Skip whatever's obvious to you.

## The thinking layer

**Claude (Anthropic)** does almost all of the analysis, generation, classification, and summarization. Most skills are designed to run inside Claude Code (the CLI) — they're Markdown instruction sets Claude reads and executes. A handful of skills also have a Python or shell entry point that calls the Anthropic API directly when scripting is more practical than a chat session.

Why Claude and not another model: it follows long instructions reliably, the agentic loop in Claude Code is good enough that I rarely need to write orchestration code, and the SKILL.md pattern means "add a new capability" is usually 30 minutes of writing rather than a full integration.

## The persistence layer

**Notion** is the operational source of truth. CRM, content calendar, workflow state, client context — all of it lives in Notion databases. Skills read and write Notion via the official API. The reason I chose Notion over a real database: I can edit the same data manually when something needs human judgment, and the agency team can see what's going on without me building dashboards.

**Supabase** is the database for anything that needs auth, row-level security, or a real query surface — currently just the reporting dashboard app. Postgres-backed, edge functions for serverless logic, generous free tier.

**Google Workspace** (via service accounts) for Docs (contracts, proposals), Sheets (lead lists, exports), Drive (asset storage), Calendar (booking).

## The deployment layer

**Vercel** for anything that needs a URL. Static lead magnets, the reporting dashboard, generated audit pages, proposal landing pages. The audit-report-deployer skill spits out an HTML file and runs `vercel --prod` against it; clients get a shareable link in under a minute.

## Integrations worth naming

- **Apify** — Google Maps scraping, LinkedIn scraping, website content extraction. Cheaper and more reliable than rolling your own scraper for any given source.
- **AnyMailFinder** — Email enrichment / verification for scraped leads.
- **Instantly** — Cold email infrastructure (warming, sending, replies). Skills generate the copy and push campaigns via API.
- **Perplexity** — Market research, competitor research. Used for "give me a snapshot of this prospect's industry" before I jump into a sales call.
- **Meta Marketing API** — Read ad accounts, pull ad creatives, check Ads Library.
- **Stripe** — Invoicing during the onboarding flow.

## Image and video generation

- **Gemini / Nano Banana** for high-CTR YouTube thumbnails (face-direction matching from a reference photo library).
- **Google Veo 3** for short AI video clips.
- **HeyGen** for AI UGC video (a face, scripted voiceover, optional B-roll).
- **Fal.ai** as the hosted-inference layer for various open models, e.g. Kling for video.

Most of these are gated behind feature flags or env-var presence — the skills work without them but degrade gracefully (e.g. creative-production-router emits prompts instead of calling APIs if keys aren't set).

## Local tooling

- **Claude Code** is where I run almost everything — the agentic CLI is the development environment and the production runtime for most skills.
- **Cron / LaunchAgent** for anything that runs on a schedule (e.g. the content-ideation skill runs every morning at 9am CET).
- **Python (uv)** for skills that need real scripting. Lightweight venvs, fast install.
- **Remotion** for video editing automation (in `skills/social/remotion-edit/`).

## Why this stack and not another

I optimized for: low marginal cost of adding a new capability, no infra to babysit, and the ability to read everything that's happening in plain text. Notion + Markdown skills + Vercel deploys hit that sweet spot. The downside is that there's no central orchestrator — each skill is its own thing — which means if you want a single observability pane, you have to build it. For most agency-scale operations that's the right trade.
