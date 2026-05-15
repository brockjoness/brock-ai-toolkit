# Pre-Access Google Ads Audit -- Rules

## Data Sources

This audit uses ONLY publicly available data. No ad account access required.

| Source | How to Access | Required? |
|---|---|---|
| Google Ads Transparency Center | Chrome DevTools MCP (navigate + snapshot) or WebFetch | Required |
| Prospect's website | Chrome DevTools MCP or WebFetch | Recommended |
| Competitor Transparency Center pages | Chrome DevTools MCP (navigate + snapshot) | Recommended (1-2 competitors) |

## Notion CRM Integration

Before starting, look up the prospect in the Notion CRM (`YOUR_NOTION_CRM_COLLECTION_ID`).

Extract these fields (use whatever is filled in):
- **Website** -- for landing page and brand context
- **Company Type** -- shapes the audit lens (ecommerce vs. lead gen vs. SaaS)
- **Top 3 Best Sellers** -- helps evaluate whether ads align with hero products
- **Content Source 1/2/3** -- any raw assets or brand guidelines

If the prospect has no CRM entry, ask for: website URL, Google Ads Transparency Center URL (or advertiser name to search for), and 1-2 competitor names.

## Ad Categorization

Group every visible ad by its format type:

| Ad Format | Description |
|---|---|
| Search (Text) | Text-based ads with headlines, descriptions, display URLs |
| Display (Image) | Image-based or responsive display ads |
| Video (YouTube) | Video ads with thumbnails |
| Shopping (Product) | Product listing ads with images and prices |

## Messaging Angle Taxonomy

For Search text ads, group by primary messaging angle:

| Angle Type | Description |
|---|---|
| Benefit-led | Focuses on customer outcome ("Get X results") |
| Feature-led | Focuses on product specs or capabilities |
| Price / Promo | Highlights discounts, free shipping, bundles |
| Authority / Social Proof | Awards, reviews, "trusted by X" |
| Urgency / Scarcity | Limited time, limited stock, deadline-driven |
| Comparison / Switch | "Better than," "switch from," competitive positioning |
| Question / Problem-aware | Opens with a pain point or question |

## Observable Quality Signals (No Performance Data Available)

Since we have no account data, assess ad quality using observable signals:

- **Ad volume:** More active ads suggest active testing and management
- **Ad recency:** Recent start dates suggest active optimization
- **Copy specificity:** Specific, benefit-driven copy vs generic product descriptions
- **Extension usage:** Ads with sitelinks, callouts, and structured snippets suggest mature account management
- **Format diversity:** Healthy advertisers use multiple formats (Search + Display + Shopping + Video)
- **Landing page alignment:** Strong match between ad promise and landing page delivery
- **Competitive positioning:** How the prospect's ads compare to competitor ads in tone, specificity, and volume

## Output Format

- Client-facing document; this is a sales/pitch document
- Plain text with headers and simple tables
- Notion-compatible markdown
- No internal methodology exposed
- No emojis, no code blocks, no HTML
- No hedging language -- be direct and opinionated
- Every finding includes "why" -- never just describe
- Target length: 3-5 pages when pasted into a doc (concise, not exhaustive)

## General Rules

- Do NOT write anything to Notion unless Brock explicitly asks
- Present the full audit in the conversation first
- If the Transparency Center is inaccessible via fetch, use web search and note the limitation
- If the prospect's CRM page is missing fields, work with what's available -- don't block the audit
- Never claim performance metrics you don't have
- Frame everything as "here is what we see and here is what we would change"
