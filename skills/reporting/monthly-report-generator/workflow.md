# Monthly Report Generator -- Workflow

## Trigger

Activated by:
- "Monthly report for [Client]"
- "Generate monthly report for [Client]"
- "Month-end report for [Client]"
- Upload of CSV/XLSX with 30 days of ad performance data

## Skill Chain

```
Skill 0: Parse & Validate Monthly Data
    |
Skill 1: Compute MoM Trends & 90-Day Trend Lines
    |
Skill 2: Platform Comparison Analysis
    |
Skill 3: Campaign & Creative Performance Analysis
    |
Skill 4: Generate Strategic Narrative & Next Month Plan
    |
Skill 5: Build HTML Report
    |
Skill 6: Deploy to Vercel
```

## Before Starting

Confirm scope:
> "Generating monthly report for **{Client}** ({Month, Year}). Platform(s): {Meta / Google / Both / + Klaviyo}. Prior month data available: {Yes / No}."

## Input

The skill accepts performance data exports from:

| Platform | Format | Minimum Required Columns |
|---|---|---|
| Meta Ads Manager | CSV/XLSX/TSV | Spend, Impressions, Campaign Name |
| Google Ads | CSV/XLSX | Cost, Impressions, Campaign |
| Klaviyo | CSV/XLSX | Revenue, Sends, Opens, Clicks (optional) |

Optional columns (enrich the report when present): Clicks, Link Clicks, Purchases, Revenue, Reach, Video Views, Add to Cart, CTR, CPC, CPM, ROAS, Frequency, Ad Set Name, Ad Name, Audience Segment.

For MoM comparison: prior month's data (CSV or previously stored context). For 90-day trend lines: 3 months of data preferred.

## Context Flow

`MONTHLY_REPORT_CONTEXT` assembled in Skill 0:
- `client_name`, `agency_slug`, `client_slug`
- `report_month` (e.g., "March 2026")
- `platforms` (Meta, Google, Klaviyo, or combination)
- `budget` (from client context or manual input)
- `current_month_data` (parsed CSV data)
- `prior_month_data` (if available -- for MoM comparison)
- `three_month_data` (if available -- for 90-day trend lines)

## Step-by-Step Execution

### Step 0: Parse & Validate
1. Identify file format and platform source
2. Map columns to standard metric names (state mapping before proceeding)
3. Validate date range covers full month (flag if partial)
4. Check for required columns (Spend, Impressions minimum)
5. If prior month data is available, parse and align column structure
6. If 3 months of data available, structure for trend line computation

### Step 1: MoM Trends & 90-Day Lines
1. Aggregate current month totals: spend, revenue, ROAS, CPA, CTR, CPM, conversions
2. If prior month data exists: compute MoM change (absolute and percentage) for each metric
3. If 3-month data exists: plot trend direction (accelerating, decelerating, stable)
4. Flag any metric with >20% MoM swing for strategic narrative

### Step 2: Platform Comparison
1. Segment all data by platform (Meta vs Google)
2. Compute identical metrics for each platform
3. Determine winner per metric
4. Calculate efficiency delta between platforms
5. Draft budget reallocation recommendation based on relative platform ROAS and CPA

### Step 3: Campaign & Creative Analysis
1. Rank campaigns by ROAS (minimum $500 spend to qualify)
2. Identify top 5-10 campaigns with performance drivers
3. Group creatives by theme/angle and compute aggregate performance per theme
4. Assess format performance (UGC vs static vs video vs carousel)
5. Detect fatigue signals: declining CTR or rising frequency across the month

### Step 4: Strategic Narrative & Plan
1. Synthesize findings into "What worked / What didn't / Why" narrative
2. Extract the single most important learning from the month
3. Draft next month plan: budget allocation (specific dollar amounts), creative direction, testing roadmap, audience strategy
4. Ensure every recommendation cites the data that supports it

### Step 5: Build HTML Report
1. Load base styles from `2-onboarding/skills/pre-onboarding/templates/_base-styles.html`
2. Load agency branding from `brands/{slug}/brand.md`
3. Render all sections per rules.md structure
4. Include trend line charts, comparison tables, stat cards
5. Validate all metrics render correctly

### Step 6: Deploy to Vercel
1. Structure deployment: `./reports/{client-slug}/month-{YYYY-MM}/`
2. Create `index.html`, `package.json`, `api/og.js`
3. Deploy and capture URL

## Final Output

Present key findings in conversation, then confirm:
> "Monthly report generated for **{Client}** -- {Month, Year}."
> **Report URL:** {vercel_url}
> **Key strategic takeaways:**
> 1. {takeaway 1}
> 2. {takeaway 2}
> 3. {takeaway 3}
>
> **Next month recommendation:** {budget split + primary creative direction}
>
> Options:
> 1. **Deploy only** -- report is live at the URL
> 2. **Draft delivery email** -- draft a client email with the report link and key highlights
> 3. **Refine** -- adjust sections or add depth to specific areas

## Cadence

- Reports cover the 1st through last day of each calendar month
- Generated within the first 3 business days of the following month
- Delivered to client by end of the first week of the new month

## Error Handling

- Missing required columns (Spend, Impressions): stop and ask for correct export
- No purchases/revenue data: skip ROAS/revenue sections, note "Revenue data unavailable -- engagement analysis only"
- Prior month data unavailable: skip MoM comparison, note "First month -- no month-over-month comparison available"
- Less than 3 months of data: skip 90-day trend lines, note "Trend lines require 3+ months of data"
- Partial month data: flag date range and note "Partial month -- metrics may not reflect full-month performance"
- Single platform only: skip platform comparison section, note "Single-platform report -- no cross-platform comparison"
- Empty dataset: stop and flag to Brock
