# Weekly Report Generator -- Workflow

## Trigger

Activated by:
- "Weekly report for [Client]"
- "Generate this week's report for [Client]"
- "Build report from this data"
- Upload of CSV/XLSX with ad performance data

## Skill Chain

```
Skill 0: Parse & Validate Data
    ↓
Skill 1: Analyze Performance
    ↓
Skill 2: Generate Report
    ↓
Skill 3: Deploy to Vercel
```

## Before Starting

Confirm scope:
> "Generating weekly report for **{Client}** ({Date Range}). Platform(s): {Meta / Google / Both}."

## Input

The skill accepts performance data exports from:

| Platform | Format | Minimum Required Columns |
|---|---|---|
| Meta Ads Manager | CSV/XLSX/TSV | Spend, Impressions |
| Google Ads | CSV/XLSX | Cost, Impressions |

Optional columns (enrich the report when present): Clicks, Link Clicks, Purchases, Revenue, Reach, Video Views, Add to Cart, CTR, CPC, CPM, ROAS, Frequency, Campaign Name, Ad Set Name, Ad Name.

## Context Flow

`REPORT_CONTEXT` assembled in Skill 0:
- `client_name`, `agency_slug`, `client_slug`
- `date_range` (reporting week)
- `platforms` (Meta, Google, or both)
- `budget` (from CRM or client context)
- `raw_data` (parsed CSV data)
- `prior_week_data` (if available -- for WoW comparison)

## Final Output

Present key findings in conversation, then confirm:
> "Weekly report generated for **{Client}**."
> **Report URL:** {vercel_url}
> **Key highlights:** {top 3 findings}
>
> Ready to send to the client? Options:
> 1. **Deploy only** -- report is live at the URL
> 2. **Draft email** -- draft a delivery email with the report link
> 3. **Refine** -- adjust or add sections

## Cadence

- Reports cover Monday-Sunday
- Generated and deployed on Fridays
- Delivered to client by end of day Friday

## Error Handling

- Missing required columns (Spend, Impressions): stop and ask for correct export
- No purchases/revenue data: skip ROAS/CPP sections, note "Revenue data unavailable"
- Prior week data unavailable: skip WoW comparison, note "First week -- no comparison available"
- Empty dataset: stop and flag to Brock
