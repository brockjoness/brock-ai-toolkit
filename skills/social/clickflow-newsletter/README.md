# clickflow-newsletter

## What it is
A Claude skill that turns either a raw voice-to-text dump or a typed draft into a polished newsletter email written in a single author's voice. Two modes: Mode A drafts from scratch off a voice ramble, Mode B cleans up a typed draft while preserving the original angle.

## What problem it solves
Most operators have ideas but no time to write. This skill takes the raw thought (voice or typed) and produces a 150-300 word email with three subject line options, ready to paste into a send platform. It guards against marketer-speak, em dashes, emojis, and other off-voice patterns.

## Maturity
`working` — Brock uses it weekly for his Clickflow newsletter.

## How to run it
1. Drop the `SKILL.md` and `voice-reference.md` into your Claude skills folder (or paste contents inline).
2. Adapt `voice-reference.md` to your own voice rules. The shipped file documents Brock Jones's voice — replace banned-words lists, sign-off, paragraph rhythm, and storytelling anchors with yours.
3. Optionally maintain a `skill-inventory.md` listing tools/resources you can reference in emails. The skill will look for one; if absent, drop the inventory references.
4. Trigger Claude with phrases like "write a newsletter email", "clean this email", or paste a voice dump.

No env vars needed — the skill is prompt-only.

## Inputs and outputs
**In:** A raw voice-to-text dump (Mode A) or a structured typed draft (Mode B). Optionally: `EMAIL_TYPE`, `CTA_TARGET`, `TOOL_TO_MENTION`.

**Out:** Three subject line options + email body (Mode A), or cleaned email + changelog (Mode B).

## Where to extend it
- `voice-reference.md` — your voice rules. This is the file you almost certainly want to rewrite.
- `SKILL.md` — modes, workflow, hard stops. Edit if your editorial process differs.

## Known limitations
- Single-email only. No drip sequences or multi-email campaigns.
- Voice rules are opinionated (Brock's): no em dashes, no emojis, lowercase subject lines, etc. You will likely want to soften or invert these.
- Mode detection (voice dump vs typed draft) is heuristic. Ambiguous inputs trigger a one-shot clarification question.
