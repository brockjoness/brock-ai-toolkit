# Weekly Report Generator

## What it is
A skill chain that takes a week of ad performance data and produces a branded weekly client report: executive summary, spend vs budget, key metrics with WoW deltas, top/bottom performers, fatigue signals, and a next-week plan. Deploys as a Vercel-hosted HTML page.

## What problem it solves
Weekly reports are high-frequency and easy to half-ass. This skill standardizes the structure, computes WoW deltas correctly, flags fatigue signals before they become problems, and outputs a clean link the client can read in under two minutes.

## Maturity
`production`

## How to run it
Trigger with "Weekly report for [Client]" and attach the week's performance exports. Required: Vercel CLI logged in (`npx vercel login`), brand file at `brands/{slug}/brand.md`, ideally prior week's data for WoW comparison.

## Inputs and outputs
**In:** CSV/XLSX exports from Meta/Google covering the report week, plus prior week's data for WoW deltas.
**Out:** A deployed HTML report at a Vercel URL plus a short conversation summary with 2-3 key highlights and an optional draft delivery email.

## Where to extend it
- Change report sections: edit `rules.md`.
- Adjust top/bottom performer thresholds: edit the classification rules in `rules.md`.
- Change deploy target: rewrite `skill-3-deploy.md`.

## Known limitations
- Top performer ranking falls back to engagement-only when conversion data is missing.
- Requires at least 4 weeks of data for trend lines to be useful.
- No email delivery integration — drafts are produced but you send manually.
