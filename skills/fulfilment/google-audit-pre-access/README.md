# Google Audit — Pre-Access

## What it is
Conducts a pre-access Google Ads audit using only publicly available data: the Google Ads Transparency Center, the prospect's website, and a competitor scan. Produces a strategic brief framed as a sales document.

## What problem it solves
A prospect won't grant ad-account access until they trust you. This skill builds that trust by showing you can already see — and fix — meaningful issues from the outside.

## Maturity
`working`

## How to run it
Invoke with a prospect's name, domain, and optionally their Google Ads Transparency Center URL. The skill chains through:

1. Trigger (`skill-0`) — pull context (Notion CRM optional)
2. Transparency Center scan
3. Website audit
4. Competitor landscape
5. Opportunities + "what we'd do with access"

If you use the optional Notion CRM lookup, set `YOUR_NOTION_CRM_COLLECTION_ID` in your environment.

## Inputs and outputs
**In:** Prospect name, domain, Transparency Center URL (or it can search).
**Out:** Client-facing audit report in Notion-compatible markdown — ad inventory, ad copy patterns, website findings, competitor comparison, opportunities, sales close.

## Where to extend it
Tune scoring rubrics in `rules.md`. Edit individual section logic in `skills/skill-*.md`. Adjust the closing pitch in `skills/skill-4-opportunities.md` and `final-output-assembly.md`.

## Known limitations
- No performance metrics — pre-access means no ROAS, CTR, or Quality Score data.
- Cannot inspect search-term reports, bidding, or budget allocation.
- Competitor list is heuristic; provide one if you can.
