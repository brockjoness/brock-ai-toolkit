# Creative Brief Generator

## What it is
Turns research, audit output, or manual direction into a standardized, production-ready creative brief for paid social ads — hooks, visual direction, copy variants, CTAs, and platform notes.

## What problem it solves
The expensive step between "we ran a competitor audit" and "creative is in production" is writing the brief. This skill compresses that step into a templated output that feeds directly into a creative-generator pipeline.

## Maturity
`working`

## How to run it
Invoke the skill with one or more of: competitor research, a Meta/Google audit, audience analysis, or a manual brief seed. The skill loads vertical-specific templates from `templates/` (apparel-fashion, beauty-skincare, events-entertainment, food-beverage, health-wellness).

No API keys required.

## Inputs and outputs
**In:** Audit data, research, or manual brief context; vertical; brand voice notes.
**Out:** A structured creative brief with hook angles, visual direction, 3+ copy variants, CTAs, and platform-specific guidance.

## Where to extend it
Add a vertical by dropping a new file in `templates/`. Edit angle frameworks in `rules.md`. Tune the trigger logic in `skill-0-trigger.md` and the assembly logic in `skill-1-generate-brief.md`.

## Known limitations
- Output is only as good as the inputs — generic input yields generic briefs.
- Does not produce visuals; pair with `creative-generator` for mockups.
- The Notion write step is opt-in and requires the user to wire up their own Notion integration.
