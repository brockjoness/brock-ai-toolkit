# content-ideation

## What it is
A Claude skill that generates a 7-day content calendar across YouTube, Instagram, and email newsletter. Every YouTube idea is grounded in a real skill from your workspace; Instagram gets Reel + Carousel adaptations of each video plus standalone personal posts; newsletter angles include a lead magnet.

## What problem it solves
The blank-page problem for creators who already have substance to share. Instead of guessing at "what should I post this week", this skill mines your actual skill inventory and reference creator profiles and produces concrete briefs (hook, talking points, thumbnail concept, IG adaptation, newsletter angle).

## Maturity
`working` — Brock runs it daily via a scheduled job at 9am CET.

## How to run it
1. Maintain a `skill-inventory.md` in your Claude workspace listing the skills/tools you could make content about.
2. Maintain `creator-references/` profiles for the creators whose style you want to learn from.
3. Maintain a `style-guide.md` for your carousel/visual aesthetic.
4. Optionally wire Notion MCP and a Social database — the skill will push the generated calendar.
5. Trigger Claude with "generate content ideas" or "content calendar".

**Reference paths in `SKILL.md` are placeholders** — point them at your own files.

## Inputs and outputs
**In:** `WEEK_START` (defaults to next Monday), and optional `FOCUS_DEPARTMENT`, `PERSONAL_MOMENTS`, `TRENDING_TOPICS`, `CUSTOM_IDEAS`.

**Out:** A 7-day calendar table, full briefs per YouTube video (hook, talking points, thumbnail concept, B-roll notes, lead magnet idea), IG Reel + Carousel scripts derived from each video, standalone IG ideas, and newsletter angles. Optionally pushed to a Notion database.

## Where to extend it
- Adjust the YouTube selection criteria in Step 3 of `SKILL.md`.
- Replace the Notion field mapping in Step 9 with your own database schema.
- Swap the creator reference styles (Saraev / Hormozi etc) for your own.

## Known limitations
- Quality depends on the depth of your `skill-inventory.md`. A thin inventory produces thin ideas.
- Notion integration assumes a specific database shape (see Step 9). Adapt fields before wiring.
- Personal IG content quality depends on the `PERSONAL_MOMENTS` input — without it, you get generic prompts.
