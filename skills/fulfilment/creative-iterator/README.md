# Creative Iterator

## What it is
A lightweight routing skill that takes `test-analyzer` output (winning elements plus iteration briefs) and feeds it into the creative pipeline to produce the next round of ad variants.

## What problem it solves
Closes the loop on a creative testing cycle: instead of manually re-briefing after every test read, this skill packages the winners into the right format for `creative-brief-generator` and `creative-generator`.

## Maturity
`working`

## How to run it
Invoke after `test-analyzer` produces its extraction output, or with a manual description of a winning ad and what to change. The skill packages an iteration context object and hands off to `creative-brief-generator`.

No API keys required.

## Inputs and outputs
**In:** Extraction output from `test-analyzer` (or a manual winner description), client name, agency slug, iteration type (angle / format / copy / CTA).
**Out:** An iteration context object that triggers `creative-brief-generator` for the next round.

## Where to extend it
Single-file skill — edit `workflow.md` to change packaging logic or routing decisions.

## Known limitations
- Pure routing — no analysis logic of its own.
- Assumes downstream skills (`creative-brief-generator`, `creative-generator`) are installed.
