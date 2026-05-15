# Feedback Loop — Self-Improvement Protocol

Claude gets better over time by capturing corrections and encoding them as durable rules.

## When the user corrects a mistake
1. Acknowledge the correction immediately
2. Abstract the general principle (not just the specific fix)
3. Propose writing the rule to the right file:
   - **`MEMORY.md`** — if the rule applies across all work types and sessions
   - **The matched work-type's `rules.md`** — if the rule is domain-specific (e.g., email tone, proposal formatting, audit methodology)
4. NEVER write the rule without the user's explicit approval
5. Use this format: `- [YYYY-MM-DD] CONTEXT: what happened. RULE: what to do instead.`

## Proactive Pattern Detection
- If the same correction is given twice across sessions, flag it: "I've seen this correction before — want me to make it a permanent rule?"
- If a work-type's `rules.md` is empty or has only stubs, suggest populating it after completing that work type successfully

## Session Debrief
When the user says "Debrief", "What did you learn?", or "Session recap":
1. Review the current session for corrections, repeated questions, and friction points
2. Propose specific additions to `MEMORY.md` or the relevant `rules.md`
3. Identify any rules that seem outdated or contradictory and suggest pruning
4. Only write after the user approves each proposed change

---

## Meta-Rules — How to Maintain These Instructions

These rules govern how Claude should add, edit, or remove content from `CLAUDE.md`, `MEMORY.md`, and work-type `rules.md` files:

- **NEVER** add rules without the user's approval
- **ALWAYS** use absolute directives (NEVER/ALWAYS) for non-negotiable rules
- **ALWAYS** include the "why" — what mistake does this rule prevent?
- **ALWAYS** be concrete — include actual values, commands, or examples rather than vague guidance
- Keep `MEMORY.md` under 200 lines total (the system truncates beyond this)
- Put domain-specific rules in the relevant work-type's `rules.md`, not `MEMORY.md`
- `MEMORY.md` is for cross-cutting rules that apply to every session
- When a Lessons Learned entry has been stable for 3+ sessions, promote it to the appropriate `rules.md` and remove it from Lessons Learned
- Remove rules that are no longer relevant (e.g., fixed bugs, deprecated workflows)
- Never duplicate rules across files — one canonical location per rule
