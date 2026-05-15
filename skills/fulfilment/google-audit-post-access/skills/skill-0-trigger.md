# SKILL 0: Workflow Trigger & Entry Point

## When to activate

Start the post-access Google Ads audit workflow automatically when **any** of the following occur:

1. The user uploads a data file (CSV, XLSX, TSV) that contains Google Ads export columns (e.g., "Cost", "Impr.", "Clicks", "Campaign", "Ad group", "Conversions", "Conv. value")
2. The user pastes tabular data containing Google Ads metrics
3. The user pastes a **Google Sheets URL** containing Google Ads data -- read the sheet via Chrome DevTools MCP (`navigate_page`, `take_snapshot`), extract tabular data, then proceed as normal
4. The user explicitly requests a "post-access audit", "full audit", "google audit", "search audit", or "pmax audit" and provides Google Ads data
5. The user provides multiple data files (campaign-level, keyword-level, search term report, etc.)

## Transparency Center reminder

If the user provides performance data but **no Google Ads Transparency Center URL**, prompt them:

> "Do you have a Google Ads Transparency Center link for this brand? Paste it and I'll cross-reference active ads with your performance data in the diagnostics section."

If the user does not have one or chooses to skip, proceed without the Transparency Center cross-reference in Skill 6.

## What to do

0. **Check for agency/client context** -- if brand.md and/or context.md were loaded by the router, use them:
   - Client context provides: Ad Account ID, attribution model, goals/KPIs, business context
   - Brand guidelines provide: report tone, formatting preferences, sign-off
   - If no context was loaded, proceed as before (ask user or infer from data)

1. **Acknowledge the data** -- confirm what was received (filename(s), row count, apparent date range if visible, campaign types detected). State the data source type: `Google Sheets URL | CSV/Excel Upload | Pasted Data`
2. **Begin Skill 1 (Data Quality Check)** immediately -- do not wait for further instructions
3. **Proceed through Skills 1-8 sequentially** as defined in the workflow
4. **Skill 4** Search deep dive: Only run if Search campaign data is present
5. **Skill 5** Shopping/PMax deep dive: Only run if Shopping or PMax data is present
6. **Skill 6** Display/YouTube/DemandGen and audience sections: Only run if relevant data is present
7. **Skill 7** Landing page analysis: Only run if landing page URLs are available in the data or the user provides the brand's website
8. **Skill 8** Action Plan: Always run

## Re-entry logic

If the user provides **additional data** after the audit has started (e.g., search term report, keyword report, Merchant Center feed, GA4 export, demographic breakdown):

- Identify which skills are affected by the new data
- Re-run those skills with the combined dataset
- Update the final report with revised findings
- State clearly: "Updated [Section Name] with new data -- changes noted below."

## Next step

Proceed automatically to Skill 1.
