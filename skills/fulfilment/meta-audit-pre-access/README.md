# Meta Audit — Pre-Access

## What it is
Conducts a pre-access Meta creative audit using only publicly available data: the prospect's Meta Ads Library, their website and Instagram, and 1–2 competitor Ad Libraries. Closes with creative briefs and a sales pitch for full-account access.

## What problem it solves
Most prospects won't share ad-account access cold. This skill lets you walk in with a sharp, confident creative read — already showing them what's wrong and what you'd test.

## Maturity
`working`

## How to run it
Invoke with the prospect's name, domain, and Meta Ads Library URL. The skill chains:

1. Trigger / context pull
2. Ad Library scan
3. Creative analysis (angles, formats, CTAs, copy patterns)
4. Competitor snapshot
5. Website + landing review
6. Opportunities
7. Creative mockups (optional, via `creative-generator`)

If you use the optional Notion CRM lookup, set `YOUR_NOTION_CRM_COLLECTION_ID`.

## Inputs and outputs
**In:** Prospect name, domain, Meta Ads Library URL, optional competitor URLs.
**Out:** Client-facing audit report (Notion-compatible markdown) + optional creative mockups.

## Where to extend it
Tune analysis frameworks in `rules.md`. Edit individual sections in `skills/skill-*.md`. The mockup step in `skill-6-creative-mockups.md` integrates with `creative-generator`.

## Known limitations
- No performance data — pre-access means no ROAS, CTR, hold rate.
- Ad Library shows active ads only; historical performance is invisible.
- Mockups require `creative-generator` and a Vercel CLI for deploy.
