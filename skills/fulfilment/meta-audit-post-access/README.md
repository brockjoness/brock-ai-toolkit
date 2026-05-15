# Meta Audit — Post-Access

## What it is
Full Meta Ads diagnostic once the account is connected. Diagnoses creative fatigue, mines winning copy and hooks, scores funnel health, and produces a prioritized action plan with creative briefs the team can ship immediately.

## What problem it solves
Replaces the days of manual pivot-tabling that go into a real creative audit. The skill enforces a consistent structure, applies thresholds, and pairs every diagnosis with a testable next step.

## Maturity
`working`

## How to run it
Bring your own exports: campaign, ad set, ad-level performance, breakdowns (placement, age, gender, device), creative metrics (thumb-stop, hold rate, hook rate when available). Optionally include GA4, Google Ads context, or attribution data (Northbeam, Triple Whale).

The skill walks through:
1. Trigger → 2. Data quality → 3. Baselines → 4. Executive summary → 5. Creative deep dive → 6. Diagnostics → 7. Landing pages → 8. Action plan

Thresholds and definitions live in `skills/knowledge-thresholds.md` and `skills/knowledge-metrics.md`.

## Inputs and outputs
**In:** Meta Ads exports (CSV/XLSX), optional GA4 / attribution data, brand context.
**Out:** Client-facing audit report in Notion-compatible markdown — exec summary, creative deep dive, diagnostics, action plan with owners and metrics.

## Where to extend it
Edit thresholds in `skills/knowledge-thresholds.md`. Add diagnostic checks in `skills/skill-5-diagnostics.md`. Customize the action-plan format in `skills/skill-7-action-plan.md`.

## Known limitations
- Bring-your-own-data; does not pull from the Meta Marketing API.
- Creative-fatigue detection assumes frequency and trend data are present.
- Attribution analysis depends on whichever platform you export from.
