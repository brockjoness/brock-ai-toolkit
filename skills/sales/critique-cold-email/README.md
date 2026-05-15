# Critique Cold Email

## What it is
Paste in a subject line and email body; the skill scores it on 8 dimensions (subject, opener, problem fit, value prop, social proof, CTA, brevity, tone), out of 80, and tells you which fixes will move reply rate the most. Weak elements get concrete drop-in rewrites. Ends by offering a full rewrite.

## What problem it solves
Self-reviewing your own cold email is hard — you wrote it because you thought it was good. This skill gives you a structured second opinion with a numeric ceiling, a spam-trigger scan, and prioritized rewrites that you can actually paste in.

## Maturity
`production` — A user-invocable slash skill (`/critique-cold-email`). Self-contained.

## How to run it

Drop the `SKILL.md` into your `.claude/skills/` directory and invoke with `/critique-cold-email`. The skill itself prompts for subject + body if you don't paste them.

No env vars, no scripts.

## Inputs and outputs
**In:** Subject line + email body (and optionally target audience).
**Out:** An 8-dimension score table, a spam risk rating, the top 3 critical fixes with rationale, drop-in rewrites for weak elements, and an offer to produce a complete rewrite.

## Where to extend it
- `SKILL.md` — adjust scoring rubric, spam trigger words, rating bands

## Known limitations
- It's a heuristic scorer, not a calibrated benchmark. Use the relative scores within your own writing, not as an industry leaderboard.
- Optimized for B2B cold email. For B2C or transactional, the brevity rule and CTA guidance will steer wrong.
