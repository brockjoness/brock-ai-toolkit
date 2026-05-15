# manus-meta-l7

## Maturity
`experimental` — Built as a one-off for the Manus agent runtime. Not maintained as actively as the other skills here. Treat the contract as the durable part; the integration glue may need work.

## What it is
A Claude/Manus skill that pulls a tight 7-day-vs-prior-7-day performance snapshot from a Meta Ads account. Five metrics only: spend, conversions, CPA, conversion value, ROAS — each with % delta and a one-sentence takeaway. No fluff.

## What problem it solves
The "Monday morning glance" report for someone who runs a brand. Most reporting bloats the page with CTR, CPM, frequency, reach, and ten other numbers. This skill is deliberately ruthless about signal vs noise — five numbers, one takeaway.

## How to run it
Two access modes:

**API mode (preferred):**
1. Set a Meta Marketing API access token in your project's `.env` (see `.env.example`).
2. Invoke the skill with your ad account ID (format: `act_XXXXXXXXXX`).
3. The skill calls the Insights endpoint twice (one per window) and computes deltas.

**Paste mode:**
1. Export from Ads Manager covering both windows (or two exports).
2. Paste CSV or screenshot in chat.
3. The skill parses the numbers directly.

## Inputs and outputs
**In:** Ad account ID, access method (API token or paste), optional currency.
**Out:** A markdown table with Last 7d / Prior 7d / delta for the five metrics, plus a one-sentence takeaway.

## Where to extend it
- Change the date window logic in Step 1 of `SKILL.md`.
- Swap the action type (`offsite_conversion.fb_pixel_purchase`) for lead conversions or a custom event.
- Add per-campaign breakouts if you need granularity (but that defeats the purpose).

## Known limitations
- Five metrics only — by design. If you want CTR/CPM/frequency, use a different report.
- Today is always excluded (partial day skews numbers).
- If the account has zero purchases in either window, it stops rather than fabricate a CPA/ROAS.
- API mode requires that the user already has a working Meta Marketing API token. Token acquisition is out of scope.
