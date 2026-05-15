# SKILL 0: Workflow Trigger & Entry Point

## When to activate

Start the post-access Meta Ads audit workflow automatically when **any** of the following occur:

1. The user uploads a data file (CSV, XLSX, TSV) that contains Meta Ads export columns (e.g., "Amount spent", "Impressions", "Campaign name", "Ad name", "Results", "Cost per result")
2. The user pastes tabular data containing Meta Ads metrics
3. The user pastes a **Google Sheets URL** containing Meta Ads data -- read the sheet via Chrome DevTools MCP (navigate to URL, take snapshot, extract tabular data), then proceed as normal
4. The user explicitly requests a "post-access audit", "full audit", "meta audit", or review of their Meta Ads data
5. The user pastes a **Facebook Ad Library URL** alongside performance data -- store the URL for Skill 4 and continue

## Ad Library reminder

If the user provides performance data but **no Facebook Ad Library URL**, prompt them:

> "Do you have a Facebook Ad Library link for this brand? Paste it and I'll cross-reference active ads with your performance data in the creative deep dive."

If the user does not have one or chooses to skip, proceed without the Ad Library cross-reference in Skill 4.

## What to do

0. **Check for agency/client context** -- if brand.md and/or context.md were loaded by the router, use them:
   - Client context provides: Ad Account ID, attribution window, goals/KPIs, business context
   - Brand guidelines provide: report tone, formatting preferences, sign-off
   - If no context was loaded, proceed as before (ask user or infer from data)

1. **Acknowledge the data** -- confirm what was received (filename, row count, apparent date range if visible). State the data source type: `Google Sheets URL | CSV/Excel Upload | Pasted Data`
2. **Begin Skill 1 (Data Quality Check)** immediately -- do not wait for further instructions
3. **Proceed through Skills 1-7 sequentially** as defined in the workflow
4. **Skill 4** Ad Library cross-reference: Only run if a Facebook Ad Library URL was provided
5. **Skill 5** Audience insights: Only run if demographic data is present
6. **Skill 6** Landing page analysis: Only run if landing page URLs are available in the data or the user provides the brand's website

## Re-entry logic

If the user provides **additional data** after the audit has started (e.g., demographic breakdown file, placement data, Shopify order export, creative assets, Google Analytics data):

- Identify which skills are affected by the new data
- Re-run those skills with the combined dataset
- Update the final report with revised findings
- State clearly: "Updated [Section Name] with new data -- changes noted below."

## Next step

Proceed automatically to Skill 1.
