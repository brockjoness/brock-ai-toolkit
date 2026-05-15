# Landing Page Auditor

## What it is
Audits a client's landing page across 10 CRO dimensions, scores each, evaluates message match against ad creative, and produces a prioritized action plan.

## What problem it solves
The best ads die on bad landing pages. This skill names the conversion barriers — slow load, weak CTA placement, message mismatch, form friction — and ranks fixes by expected revenue impact.

## Maturity
`working`

## How to run it
Invoke with a landing page URL, optionally with ad creative or copy from the campaign driving traffic. The skill fetches the page, evaluates the 10 dimensions defined in `rules.md`, and emits a structured report.

No API keys required. For deep audits, the skill can be paired with Chrome DevTools MCP for performance traces.

## Inputs and outputs
**In:** Landing page URL, optional ad creative/copy for message-match scoring, optional context (vertical, traffic source, offer).
**Out:** Audit report with per-dimension scores (1–5), specific findings citing on-page elements, prioritized fix recommendations with expected impact.

## Where to extend it
Edit the dimensions and scoring rubric in `rules.md`. Update the audit walk-through in `workflow.md`. Adjust the agent voice and recommendation style in `agent.md`.

## Known limitations
- Cannot run real Lighthouse traces without additional tooling.
- A/B test hypotheses are educated guesses, not statistically validated.
- Mobile assessment is heuristic — pair with an actual mobile session for high-stakes audits.
