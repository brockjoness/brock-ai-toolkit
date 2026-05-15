# Prospect Audit

## What it is
A lead-magnet generator. Point it at a prospect's email or domain; it scrapes their website, finds their Meta Ad Library, reviews their organic social and one product page, runs two Perplexity calls for market context, and synthesizes the whole thing into a single-page, branded HTML audit deployed to a public Vercel URL. The deliverable is meant to feel like a free taste of what a full engagement would reveal.

## What problem it solves
Cold pitching paid-media agencies is brutal — prospects need to see that you actually know their account. A pre-built audit shows up in their inbox as a customized URL, demonstrates analytical rigor, and ends with a calendar link. Done at scale, it's an inbound lead magnet that runs from a domain alone.

## Maturity
`production` — Brock runs this as the core lead magnet for Clickflow, both interactively and via a poller that picks up new submissions from a Notion form.

## How to run it

Trigger phrases: `prospect audit for {email or domain}`, `audit {domain}`, `generate lead magnet for {company}`.

Required env (in your project's `.env`):
- `ANTHROPIC_API_KEY`
- `PERPLEXITY_API_KEY`
- A Notion MCP server (for the submission database lookups)
- A Gmail MCP server (for delivery — uses `mcp__gmail-*__send_email`)

Required setup:
- Replace `YOUR_NOTION_DB_ID` and `collection://YOUR_NOTION_DATA_SOURCE_ID` in `rules.md` and `skills/skill-0-discovery.md`.
- Replace `https://your-calendar-link.example.com` in `skills/skill-5-synthesis.md` and `skills/skill-7-email.md` with your real calendar link.
- Vercel CLI installed and authenticated.

## Inputs and outputs
**In:** An email address or a bare domain. Personal email providers (gmail, yahoo, etc.) hard-stop.
**Out:** A static HTML audit deployed to Vercel, plus a CRM update with the audit URL and Meta Ads Library URL. Optionally, a delivery email sent through Gmail MCP with the audit link and a calendar CTA.

## Branding variants

The HTML template is plain — colors, fonts, and logo are wired through CSS variables and a `{{COMPANY_LOGO}}` placeholder. To run a second brand variant, clone the `templates/` folder, swap the palette and logo, and point the deploy step at the cloned template.

Historically Brock has run **a second brand variant with a dark palette** alongside the default light theme — same skills 0-5, but a different deploy template, a different sender Gmail account, and a "reply to this email" CTA instead of a calendar booking link. The pattern is:

1. Copy `templates/prospect-audit.html` and `templates/_base-styles-light.html` into a new template directory.
2. Override the brand colors and accent in the base styles file.
3. Override the brand name, logo URL, and `clickflow.dev` references in the page template.
4. Create a variant of `skills/skill-6-deploy.md` that reads from your new template directory.
5. If you want a different sender, create a variant of `skills/skill-7-email.md` pointing at a different Gmail MCP server.

This pattern is intentionally not abstracted — for two or three brand variants the duplication is cheaper than a templating layer.

## Where to extend it
- `rules.md` — hard stops, scope limits, brand styling, Notion lifecycle
- `skills/skill-1-market-snapshot.md` — the two Perplexity prompts
- `skills/skill-2-meta-audit.md` — messaging taxonomy used to classify ad angles
- `skills/skill-5-synthesis.md` — "what a full engagement reveals" closing section
- `templates/prospect-audit.html` — the deliverable's structure

## Known limitations
- Hard-stops on personal email domains and on prospects without active Meta ads. This is the right behaviour for a paid-media lead magnet; for other use cases, see [`prospect-audit-leadgen`](../prospect-audit-leadgen).
- Two Perplexity calls per run — keep an eye on cost at high volume.
- Vercel deploys per audit. At hundreds of audits per week you'll want to consolidate to a single project with dynamic routes.
- The OG image (`api/og.js`) hardcodes `clickflow.dev` text — edit for your brand.
