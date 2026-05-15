# Creative Production Router

## What it is
Takes a creative brief and routes it to the right production method: HTML static mockups, AI UGC (HeyGen), AI video (Veo 3), or a human-content direction document.

## What problem it solves
Not every brief belongs in the same pipeline. This skill decides — based on format, intent, and assets available — whether to generate mockups, build a HeyGen prompt, build a Veo 3 prompt, or produce a shot list for a real shoot.

## Maturity
`experimental`

## How to run it
Invoke with a creative brief. The skill inspects the brief, picks a production method, and either chains to the matching downstream skill (`creative-generator`) or emits a structured production brief for HeyGen or Veo 3.

If you actually want to call HeyGen or Veo 3, you'll need API access — see `.env.example`.

## Inputs and outputs
**In:** Creative brief, client context, optional asset notes.
**Out:** Either a routed call to `creative-generator`, or a structured HeyGen / Veo 3 / human-content production brief.

## Where to extend it
Single-file skill — edit `workflow.md` to change the routing table, add a new production method, or tune the heuristics in Step 1.

## Known limitations
- Routing is heuristic-based, not learned.
- HeyGen and Veo 3 integrations emit prompts only — actually generating media is left to the user.
- The "human content direction" branch produces a doc, not a production plan.
