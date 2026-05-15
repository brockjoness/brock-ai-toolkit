# Test Analyzer

## What it is
Reads raw ad performance data, classifies tests as winners / losers / inconclusive against defined thresholds, extracts the creative elements that drove winning performance, and emits an iteration brief for the next round.

## What problem it solves
Most ad accounts call "winners" off vibes. This skill enforces sample-size minimums, applies consistent thresholds, isolates the variable that drove the result, and packages the lesson as a brief the creative pipeline can act on.

## Maturity
`working`

## How to run it
Invoke with a performance export (CSV/XLSX) covering ad-level data with spend, CPA/ROAS, CTR, and ideally creative metadata (format, hook, angle, CTA). The skill walks through:

1. Parse data
2. Statistical analysis (winner/loser classification)
3. Element extraction
4. Next-round brief (chains into `creative-iterator`)

Thresholds live in `rules.md`.

## Inputs and outputs
**In:** Ad performance export, optional creative metadata, brand context.
**Out:** Winner/loser classification, extracted winning elements (hook, visual, copy, CTA), and an iteration brief.

## Where to extend it
Tune classification thresholds and sample-size minimums in `rules.md`. Add new statistical checks in `skills/skill-1-statistical-analysis.md`. Adjust the iteration-brief format in `skills/skill-3-next-round-brief.md`.

## Known limitations
- Practical-significance thresholds, not formal hypothesis tests.
- Quality of element extraction depends on creative metadata being present in the export.
- Assumes downstream skills (`creative-iterator`, `creative-brief-generator`) are installed if you want the loop to close.
