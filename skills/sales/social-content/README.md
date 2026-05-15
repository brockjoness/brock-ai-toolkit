# Social Content

## What it is
A plan-mode prompt for writing LinkedIn and X posts in a specific author's voice. You point it at a topic or article; it asks which author profile to use (the skill ships with two example profiles — a founder-voice and an operator-voice) and produces both a LinkedIn version and an X version, plus a short note on hook rationale and what was anonymized.

## What problem it solves
Most LLM-generated social writing sounds like the same beige LinkedIn voice. This skill loads a structured voice profile *first* — positioning, tone, formatting rules, banned phrases, hook patterns — so the output actually reads like the named author. Switching authors is one variable, not a re-prompt.

## Maturity
`production` — Used regularly. Quality scales with how well the voice profile is written.

## How to run it

Trigger phrases: `write a LinkedIn post`, `write a tweet`, `post for {author}`, `write social content`.

No env vars, no scripts. Drop `social-content.md` into your `.claude/skills/` or load it manually.

## Inputs and outputs
**In:** Topic or source material, target platform (LinkedIn / X / both), author identity.
**Out:** A LinkedIn post (150-350 words), an X post (3-8 lines or a tight thread), and 2-4 lines explaining the hook choice and any anonymization applied.

## Where to extend it
- `social-content.md` itself — adjust the author profiles inline
- Add your own voice profile by following the structure used in the existing "Author A" / "Author B" sections
- Quality check section at the end — extend with your own gotchas

## Known limitations
- The two example author profiles are heavily personalized to a paid-social agency context. Replace them with profiles for your domain before output quality clicks in.
- Hook patterns are calibrated for LinkedIn / X 2024-2026. Expect to update them as platforms change.
- Won't fabricate numbers; if you want concrete data points in a post, supply them.
