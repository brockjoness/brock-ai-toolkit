# Churn Risk Detector

## What it is
A skill that scans a client portfolio for early signals of churn risk: deteriorating performance metrics, missed targets, communication gaps, late payments, slow approval cycles, and qualitative red flags from notes. Output is a ranked list of accounts and a recommended save play per account.

## What problem it solves
Most agencies lose clients without ever explicitly being warned. This skill turns retention from a reactive scramble into a recurring check: each cycle it surfaces the 1-3 accounts most likely to leave in the next 60-90 days and what to do about them now.

## Maturity
`working`

## How to run it
Trigger with "Run churn risk check" or "Detect churn risk." It expects access to your CRM (Notion MCP) for account metadata + recent activity, and ideally the last 60 days of performance data per account.

## Inputs and outputs
**In:** CRM access to all active client accounts, recent performance data per account (CSV exports or stored history), recent communication metadata (last contact, last call).
**Out:** A ranked list (High / Medium / Low risk) with a one-paragraph diagnosis and a recommended save play per account.

## Where to extend it
- Change risk scoring weights: edit `rules.md`.
- Add a new signal (e.g., NPS, sentiment): extend the signal list in `workflow.md`.

## Known limitations
- Signals are heuristic, not predictive — false positives are common in the Medium tier.
- Requires consistent CRM hygiene; if "last contact" isn't logged, the comms signal is unreliable.
- No automated alerting; the skill has to be invoked.
