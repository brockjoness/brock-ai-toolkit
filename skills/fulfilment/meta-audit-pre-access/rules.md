# Pre-Access Meta Creative Audit -- Rules

## Data Sources

This audit uses ONLY publicly available data. No ad account access required.

| Source | How to Access | Required? |
|---|---|---|
| Meta Ads Library | Chrome DevTools MCP (navigate + snapshot) or web search | Required |
| Prospect's website | Chrome DevTools MCP or WebFetch | Recommended |
| Prospect's Instagram | Web search or direct URL | Optional |
| Competitor Ad Libraries | Chrome DevTools MCP (navigate + snapshot) | Recommended (1-2 competitors) |

## Notion CRM Integration

Before starting, look up the prospect in the Notion CRM (`YOUR_NOTION_CRM_COLLECTION_ID`).

Extract these fields (use whatever is filled in):
- **Meta Ads Library** -- required; primary input for the audit
- **Website** -- for landing page and brand context
- **Instagram** -- for organic content context
- **TikTok** -- for cross-platform creative context
- **Company Type** -- shapes the audit lens (ecommerce vs. lead gen vs. SaaS)
- **Top 3 Best Sellers** -- helps evaluate whether ads align with hero products
- **Content Source 1/2/3** -- any raw assets or brand guidelines

If the Meta Ads Library field is empty, ask for the link before proceeding.
If the prospect has no CRM entry, ask for: Ad Library URL, website URL, Instagram handle, and 1-2 competitor names.

## Messaging Taxonomy & Quality Signals

→ See `.claude/shared/audit-reference.md` for messaging angle taxonomy and creative quality signals.

## Output Format

- Client-facing document; this is a sales/pitch document
- Plain text with headers and simple tables
- Notion-compatible markdown
- Percentages as % (not decimals)
- No internal methodology exposed
- No emojis, no code blocks, no HTML
- No hedging language -- be direct and opinionated
- Every finding includes "why" -- never just describe

## General Rules

- Present full audit in conversation first for review
- If CRM page is missing fields, work with what's available -- don't block the audit
- Target length: 3-5 pages when pasted into a doc (concise, not exhaustive)
