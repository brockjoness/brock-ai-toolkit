# Monthly Report Generator -- Rules

## Data Source

Current input: CSV/XLSX upload. Future: Will query Supabase client_metrics table directly when data pipeline is operational.

## Report Structure

Every monthly report follows this structure:

### 1. Executive Summary (5 sentences max)
- Sentence 1: Overall monthly performance vs. target (revenue, ROAS, spend)
- Sentence 2: Month-over-month trajectory (improving, declining, flat + by how much)
- Sentence 3: Platform-level winner (which platform drove the best results)
- Sentence 4: Biggest strategic insight or shift observed
- Sentence 5: Primary strategic recommendation for next month

### 2. Month-over-Month Trends
- Spend: this month vs. last month vs. 2 months ago
- ROAS: this month vs. last month vs. 2 months ago
- CPA: this month vs. last month vs. 2 months ago
- Revenue: this month vs. last month vs. 2 months ago
- 90-day trend line for each metric (3 data points minimum)
- Directional analysis: accelerating, decelerating, or stable

### 3. Platform Comparison (Meta vs Google)

| Metric | Meta | Google | Winner | Delta |
|---|---|---|---|---|
| Spend | | | | |
| ROAS | | | | |
| CPA | | | | |
| Revenue | | | | |
| CTR | | | | |
| CPM | | | | |
| Conversions | | | | |

Include: budget allocation recommendation based on relative efficiency.

### 4. Top Performing Campaigns (5-10)
For each:
- Campaign name and platform
- Key metrics (ROAS, CPA, CTR, spend, revenue)
- What made it work (creative angle, audience, format, timing)
- Recommendation: scale further, maintain, or iterate

### 5. Creative Performance Summary
- Top 3-5 creative themes/angles that performed this month
- Format performance breakdown (UGC vs static vs video vs carousel)
- Creative fatigue signals across the month (frequency trends, declining engagement)
- Creative refresh recommendations for next month

### 6. Audience Insights
- Top performing audience segments
- Audience growth or contraction trends
- Prospecting vs retargeting efficiency comparison
- Audience expansion or refinement recommendations

### 7. Strategic Narrative
- **What worked:** specific tactics, creatives, or audiences that drove results (cite metrics)
- **What didn't:** underperforming areas with diagnosis of why
- **Why:** connect performance to external factors (seasonality, market trends, creative fatigue, funnel changes)
- **Key learning:** the single most important insight from this month

### 8. Next Month Plan

| Category | Recommendation | Rationale | Expected Impact |
|---|---|---|---|
| Budget allocation | | | |
| Creative strategy | | | |
| Testing roadmap | | | |
| Audience strategy | | | |
| Platform adjustments | | | |

Include specific dollar amounts or percentage shifts for budget allocation.

## Metric Rules

Reference the shared metric definitions:
- **ROAS:** Revenue / Spend (do not compute if revenue absent)
- **CPA:** Spend / Purchases (do not compute if purchases absent)
- **CTR:** Link Clicks / Impressions (use link clicks, not all clicks)
- **CPM:** Spend / Impressions x 1000
- **CVR:** Purchases / Link Clicks
- **MoM Change:** ((This Month - Last Month) / Last Month) x 100

See `./fulfilment/meta-audit-post-access/skills/knowledge-metrics.md` for full definitions.
See `./fulfilment/meta-audit-post-access/skills/knowledge-thresholds.md` for classification thresholds.

## Key Differences from Weekly Report

- Strategic narrative voice (not just data tables)
- Month-over-month comparisons (not week-over-week)
- 90-day trend lines (minimum 3 monthly data points)
- Budget allocation recommendations with specific dollar amounts for next month
- Platform comparison analysis (Meta vs Google head-to-head)
- Creative theme analysis (patterns across 30 days, not individual ad performance)
- Forward-looking plan section is more detailed (budget splits, creative direction, testing roadmap)

## Formatting Rules

- No emojis
- No em dashes
- Numbers: use commas for thousands (1,234), dollar sign for money ($1,234.56), percentage for rates (12.3%)
- Trends: use directional arrows in HTML (up arrow green, down arrow red, flat arrow gray)
- MoM changes: always show absolute value and percentage change
- Round percentages to 1 decimal place
- Round dollar amounts to 2 decimal places
- 90-day trend lines: use simple line charts or sparklines in the HTML report

## Deployment

- HTML report deployed to Vercel: `./reports/{client-slug}/month-{YYYY-MM}/`
- Uses dark theme base styles from `2-onboarding/skills/pre-onboarding/templates/_base-styles.html`
- Agency branding injected from `brands/{slug}/brand.md`
- Each report is a separate Vercel deployment
- File structure: `index.html`, `package.json`, `api/og.js`
