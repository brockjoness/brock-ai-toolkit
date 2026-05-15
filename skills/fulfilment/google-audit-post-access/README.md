# Google Audit — Post-Access

## What it is
Full Google Ads diagnostic once the account is connected: search, shopping, PMax, display, YouTube. Diagnoses wasted spend, Quality Score health, bidding, feed quality, and landing page experience — and produces a prioritized action plan.

## What problem it solves
Replaces the multi-day analyst slog of pulling a hundred slices of data and writing them up. The skill imposes a consistent structure, applies thresholds, and forces every finding to ship with a recommended action.

## Maturity
`working`

## How to run it
Bring your own exports: campaign, ad group, keyword, search terms, ad copy, asset performance, Shopping/PMax breakdowns. Optionally include Google Analytics, Merchant Center, or attribution platform (Northbeam, Triple Whale) data.

The skill walks through:
1. Trigger → 2. Data quality → 3. Baselines → 4. Executive summary → 5. Search deep dive → 6. Shopping/PMax → 7. Diagnostics → 8. Landing pages → 9. Action plan

Thresholds and definitions live in `skills/knowledge-thresholds.md` and `skills/knowledge-metrics.md`.

## Inputs and outputs
**In:** Google Ads exports (CSV/XLSX), optional GA4 / Merchant Center / attribution data, brand context.
**Out:** Client-facing audit report in Notion-compatible markdown — exec summary, deep-dive sections, diagnostics, prioritized action plan with owners and metrics.

## Where to extend it
Edit thresholds in `skills/knowledge-thresholds.md`. Add new diagnostic checks in `skills/skill-6-diagnostics.md`. Customize the action plan format in `skills/skill-8-action-plan.md`.

## Known limitations
- Bring-your-own-data; the skill does not pull from the Google Ads API.
- Sample-size minimums are practical heuristics, not formal stats.
- Attribution analysis depends on whichever platform you export from.
