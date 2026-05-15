# Budget Pacing Monitor

## What it is
A skill that compares spend-to-date against a target monthly budget and flags clients who are overspending, underspending, or at risk of missing their monthly target. Output is a short pacing summary with directional recommendations (cut, hold, scale).

## What problem it solves
Mid-month "are we on track?" is one of the most common client questions and one of the easiest to fumble. This skill turns a CSV/XLSX or platform export into a one-screen answer: how much has been spent, where pacing sits versus the target on this day of the month, and what to do about it.

## Maturity
`working`

## How to run it
Trigger with "Pace [Client]" or "Budget pacing for [Client]." Feed it the most recent platform export(s) or paste data into the conversation. No external API keys required beyond your platform exports.

## Inputs and outputs
**In:** Month-to-date spend by platform (CSV/XLSX/paste), monthly budget (from CRM or manual), today's date.
**Out:** Pacing percentage, projected end-of-month spend, status (on track / under / over), and a recommended adjustment per platform.

## Where to extend it
- Change the pacing thresholds (what counts as "off pace"): edit `rules.md`.
- Add new platforms: extend the parser logic in `workflow.md`.

## Known limitations
- Linear pacing model only — does not account for weekend/holiday seasonality unless you tell it to.
- Does not pull spend directly from ad platform APIs; relies on exports.
- No alerting layer — you have to run it; it doesn't run itself on a schedule.
