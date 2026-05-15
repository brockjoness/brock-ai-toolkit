# Monthly Report Generator

## What it is
A multi-step skill that turns 30 days of ad performance data (Meta, Google, optionally Klaviyo) into a full monthly client report: MoM trends, platform comparison, top campaigns, creative themes, strategic narrative, and a next-month plan — rendered as a branded HTML page deployed to Vercel.

## What problem it solves
Monthly reports are the deliverable clients judge agencies on most. Doing them well takes hours; doing them inconsistently destroys trust. This skill standardizes the structure, forces every recommendation to cite supporting data, and produces a shareable link in minutes instead of hours.

## Maturity
`production`

## How to run it
Trigger with "Monthly report for [Client]" and attach the month's performance exports. You need: Vercel CLI logged in, the agency brand file at `brands/{slug}/brand.md`, and optionally prior-month data for MoM comparison.

## Inputs and outputs
**In:** CSV/XLSX exports from Meta Ads Manager and/or Google Ads (and Klaviyo if applicable) covering the full month, plus optional prior-month data for trends.
**Out:** A deployed HTML report at a Vercel URL plus a conversation summary of the key strategic takeaways and next-month recommendation.

## Where to extend it
- Change the report sections or order: edit `rules.md`.
- Add a new platform: extend the column-mapping logic in `workflow.md` step 0.
- Restyle: edit `../../onboarding/pre-onboarding/templates/_base-styles.html`.

## Known limitations
- Needs at least Spend + Impressions; missing revenue data degrades the report substantially.
- 90-day trend lines require 3 monthly data points — first two months produce a thinner report.
- No DB-backed metric history yet; relies on the user supplying prior-month CSVs.
- Vercel is the only deploy target.
