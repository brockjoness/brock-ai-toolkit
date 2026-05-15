# Audience Analyzer

## What it is
A skill that ingests paid media audience performance data (Meta, Google, or customer lists) and produces segment profiles, ranked recommendations, and targeting opportunities. It tells you which audiences to scale, which to consolidate, and which to drop.

## What problem it solves
Most ad accounts run dozens of audiences with no systematic way to compare them. This skill turns a raw audience report into a ranked, actionable shortlist — including lookalike, interest, behavior, and daypart suggestions — mapped to creative angles.

## Maturity
`working`

## How to run it
Drop the skill folder into your Claude Code skills directory and invoke it with a brief description plus a CSV or table of audience performance data. The skill loads `agent.md`, `rules.md`, `workflow.md`, and the numbered `skills/skill-*.md` files in order.

No API keys required — works on data you provide.

## Inputs and outputs
**In:** Audience-level performance export (Meta, Google, or customer list), brand context, optional creative-strategy notes.
**Out:** Segment profile table, ranked targeting recommendations, lookalike/interest suggestions, audience-to-creative mapping.

## Where to extend it
Tune classification logic in `rules.md`. Add or edit segment-analysis steps in `skills/skill-1-segment-analysis.md`. Adjust the recommendation framework in `skills/skill-2-targeting-recommendations.md`.

## Known limitations
- Quality of output depends entirely on the granularity of the data you feed it — needs at least audience-level breakdowns with spend, CPA/ROAS, and volume.
- Does not pull from ad platforms directly; bring your own export.
- Statistical-significance checks are practical thresholds, not formal tests.
