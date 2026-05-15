# QBR Generator

## What it is
A skill chain that turns 90 days of performance data plus client context into a full Quarterly Business Review: quarterly headline metrics with QoQ comparison, top wins, challenges and learnings, platform deep dives (Meta, Google, Klaviyo), creative evolution, audience analysis, revenue attribution, and a structured next-quarter strategy. Deploys as a branded HTML report on Vercel.

## What problem it solves
QBRs are the highest-leverage retention moment of the year. A great one renews and expands; a sloppy one starts the offboarding conversation. This skill enforces a consistent, strategic-partner-voice structure with data backing every claim, so the QBR you produce on quarter 8 of a relationship is as sharp as the one on quarter 2.

## Maturity
`production`

## How to run it
Trigger with "QBR for [Client]" or "Quarterly review for [Client]" and attach 90 days of data (Meta + Google + optional Klaviyo). Required: Vercel CLI logged in, brand file at `brands/{slug}/brand.md`, and (strongly recommended) prior-quarter data for QoQ comparison and a client context file at `brands/{slug}/clients/{slug}/context.md` with targets.

## Inputs and outputs
**In:** 90 days of per-platform CSV/XLSX exports, quarterly targets, client context notes, prior-quarter data (optional), Brock's qualitative notes on wins/challenges.
**Out:** A deployed HTML QBR at a Vercel URL plus a conversation summary with the quarter headline, top 3 wins, key challenge, and next-quarter recommendation. Optionally a delivery email and presentation talking points.

## Where to extend it
- Change the report sections or weighting: edit `rules.md`.
- Add a new platform deep-dive: extend the platform list in `workflow.md` step 2.
- Customize tone: edit the Tone & Voice section in `rules.md`.

## Known limitations
- Strongly benefits from a client context file with explicit targets; without targets, variance analysis is a guess.
- Single-platform QBRs work but are visibly thinner.
- Revenue attribution section assumes you've picked an attribution model — it does not arbitrate between models.
