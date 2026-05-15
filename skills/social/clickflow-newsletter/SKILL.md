---
name: clickflow-newsletter
description: Draft or edit newsletter emails in the author's voice. Mode A drafts polished emails from raw voice-to-text dumps. Mode B cleans up typed drafts into ready-to-send emails while preserving the original angle. Use when the user says "newsletter", "write a newsletter email", "clean this email", "edit this draft", or pastes either a voice dump or typed draft.
allowed-tools: Bash, Read, Glob, Grep
---

# SKILL — Newsletter (Brock's Clickflow newsletter; adapt to your own)

---

## TRIGGER

**Mode A — Draft from voice dump:**
- "clickflow newsletter"
- "run the newsletter skill"
- "write a newsletter email"
- "turn this into a newsletter"
- Any message containing a voice-to-text dump followed by a request to draft an email

**Mode B — Edit a typed draft:**
- "clean this email"
- "edit this draft"
- "fix this email"
- "polish this campaign"
- Any message containing a structured typed draft with a request to clean, edit, fix, or improve

---

## MODES

This skill operates in two modes. Detect the mode from the input shape before doing anything else.

| Signal | Mode A (Draft) | Mode B (Edit) |
|---|---|---|
| Input shape | Rambling, verbal tics ("um", "like"), repetition, no paragraph structure | Already-structured sentences, intentional paragraph breaks, no verbal tics |
| Job | Parse the dump, extract substance, draft from scratch | Edit the existing draft, preserve structure and angle |
| Output | Full polished email + 3 subject lines | Cleaned email + changelog of what changed |
| Rewrite freedom | High — author did not write the prose | Low — preserve author's wording wherever possible |

If ambiguous, ask once: "Draft this from scratch or edit what you wrote?"

---

## WHAT THIS SKILL DOES

Takes a raw voice-to-text dump and turns it into a polished newsletter email for a warm subscriber list. These are people who opted in via a lead magnet. Every email either teaches something or gives something away.

This is NOT cold outreach. This is NOT agency client email. This is the author talking to their audience like a smart friend sharing what they are building.

---

## EMAIL TYPES

| Type | When to Use | Core Pattern |
|---|---|---|
| `resource-drop` | Sharing a new free tool, template, or board | Lead with what it does, then link to it |
| `build-update` | Something new in the product or stack | Show what changed, why it matters, what is next |
| `insight` | A lesson from past work or current building | Tell the story, extract the takeaway, connect to a resource |
| `behind-the-scenes` | Showing the build process transparently | Walk through what happened this week, what broke, what worked |

---

## INPUTS

**Primary input:** A voice-to-text dump pasted by the author. This is the raw material. Extract the topic, key details, anecdotes, and intent from it.

**Optional (ask only if truly unclear from the voice dump):**
- `EMAIL_TYPE` — one of: `resource-drop`, `build-update`, `insight`, `behind-the-scenes`
- `CTA_TARGET` — where the reader should go (waitlist link, calendar link, board link, reply)
- `TOOL_TO_MENTION` — a specific tool from the skill inventory to reference

Do NOT ask for these if the voice dump makes them obvious. Infer first, ask second.

---

## REFERENCE FILES TO LOAD

Before drafting, read these files:

```
./voice-reference.md       — tone rules and patterns (adapt to your voice)
./skill-inventory.md       — optional: free tools to reference (you maintain this)
```

---

## STEP-BY-STEP WORKFLOW — MODE A (Draft from voice dump)

### Step 1 — Load Voice Reference

Read `voice-reference.md` in full. Internalize the paragraph rhythm, sign-off style, subject line patterns, and banned language before writing a single word.

### Step 2 — Load Skill Inventory (if present)

Read `skill-inventory.md`. Identify which tools or templates could be relevant to the topic from the voice dump.

### Step 3 — Parse the Voice Dump

Extract from the raw voice-to-text:
- **Core topic** — what is this email about
- **Key details** — specific numbers, names, results, anecdotes
- **Intent** — is the author sharing a tool, giving an update, teaching a lesson, or showing process
- **Any mentioned links or CTAs**

Discard filler, repetition, and verbal tics. Keep the substance.

### Step 4 — Determine Email Type

Infer from the voice dump:
- Mentions a new tool or template → `resource-drop`
- Mentions a product update → `build-update`
- References a past experience, lesson, or mistake → `insight`
- References the current week, process, or "what I'm working on" → `behind-the-scenes`

### Step 5 — Draft Subject Lines

Generate 3 subject line options:
- All lowercase or sentence case only — never Title Case
- Under 45 characters
- No emojis, no exclamation marks, no brackets
- One curiosity-driven (open loop)
- One benefit-driven (states what the reader gets)
- One personal/story-driven (sounds like a friend texting)

### Step 6 — Draft Email Body

Write the email following `voice-reference.md` patterns. Structure:

**Opening (1-2 short paragraphs):**
No greeting. Jump straight into the story, observation, or hook.

**Middle (2-4 short paragraphs):**
Deliver the value. Use the specific details from the voice dump.

**Close (1-2 short paragraphs):**
Soft CTA. If the author mentioned a link, use it. If not, suggest an appropriate one based on email type.

Sign off per `voice-reference.md`. (Brock uses just "Brock" on its own line — replace with yours.)

**Total length:** 150-300 words. If the draft exceeds 300 words, cut it.

### Step 7 — Present for Review

Output the draft in this format:

```
## Subject Line Options

1. [option A — curiosity]
2. [option B — benefit]
3. [option C — personal]

Recommendation: #[N] because [reason]

---

## Email Body

[full email text with line breaks between paragraphs]

[Sign-off]

---

## Details

- **Type:** [resource-drop / build-update / insight / behind-the-scenes]
- **Word count:** [N]
- **CTA:** [where the link goes, or "reply CTA", or "none"]
```

Wait for approval or request revisions.

---

## STEP-BY-STEP WORKFLOW — MODE B (Edit a typed draft)

### Step 1 — Load Voice Reference

Read `voice-reference.md` in full.

### Step 2 — Read the draft as-is

Do not start editing yet. First understand:
- **The angle** — what the author is actually trying to say
- **The structure** — how the email is organized (hook → middle → CTA)
- **The CTA** — where the reader ends up
- **The subject line** — did the author provide one, or do you need to draft options

This is the most important step. Mode B is editing, not rewriting. If you do not understand the angle, you will rewrite it by accident.

### Step 3 — Edit pass

Make these corrections, in this order:
1. **Grammar and sentence structure** — fix anything broken
2. **Banned punctuation** — remove every em dash and emoji per voice rules; cut any exclamation mark beyond the first
3. **Filler openers** — strip "I hope this finds you well", "just wanted to share", greetings ("Hey", "Hi", "Hello")
4. **Hanging dependencies** — split into standalone sentences
5. **Banned words and cliches** — replace with plain alternatives (see voice-reference.md banned list)
6. **Hedging** — cut "I think maybe", "sort of", "kind of"
7. **Length** — if over 300 words, cut the weakest paragraph (never the angle)
8. **Sign-off** — replace whatever the author used with the canonical sign-off from voice-reference.md

### Step 4 — Idea preservation check

Before presenting, verify:
- The core angle is the same as the original draft
- No new points have been added
- No points have been removed unless they were filler
- Specific numbers, names, and anecdotes are preserved exactly
- The CTA target is unchanged

If you changed the angle or added new ideas, undo it. The job is to sharpen, not to rewrite.

### Step 5 — Subject lines

If the author provided a subject line, clean it (lowercase, under 45 chars, no banned punctuation) and present the cleaned version.

If not, draft 3 options following Mode A Step 5 rules.

### Step 6 — Present for review

Output in this format:

```
## Subject Line
[cleaned version of author's, OR 3 options if none provided]

---

## Edited Email

[full edited body]

[Sign-off]

---

## Changelog

- [bullet: what was changed and why — one line per change]

---

## Details

- **Original word count:** [N]
- **Edited word count:** [N]
- **Wording preserved:** [estimated %]
- **Angle preserved:** yes/no (should always be yes)
```

### Step 7 — Heavy-edit guardrail

If the edit changed more than ~30% of the author's wording, do NOT just present the edited version. Instead, present BOTH the original and the edited version side-by-side and ask: "I changed more than I usually would. Want me to commit to this version, or pull back closer to your original?"

---

## HARD STOPS

- If `voice-reference.md` does not exist — stop and flag it
- If no input is provided — ask: "Drop a voice note and I will draft one, or paste a typed draft and I will clean it up."
- If the draft contains banned punctuation per voice rules — remove before presenting
- If the draft exceeds 300 words — cut to 300 or under before presenting
- If the draft opens with a banned greeting — remove it
- Never fabricate tools or resources that do not exist in the skill inventory
- Never write a sequence or multi-email series — this skill handles one email at a time
- Never send the email — draft/edit only, the author reviews and sends manually
- **Mode B only:** never rewrite the angle or add new points. If your edit touches more than ~30% of the wording, present original + edited side-by-side instead of committing

---

## QUALITY CHECKS BEFORE DELIVERING

- [ ] Subject lines are all under 45 characters
- [ ] Subject lines contain no emojis, no exclamation marks, no Title Case
- [ ] Email opens without a greeting
- [ ] Paragraphs vary in length
- [ ] No paragraph runs longer than 4 sentences
- [ ] No filler adjectives or marketing buzzwords
- [ ] Verbs are active, not weak
- [ ] No banned punctuation (per voice-reference.md)
- [ ] Signs off per voice-reference.md
- [ ] Total word count is 150-300 words
- [ ] At least one specific number, timeframe, or concrete detail is included
- [ ] CTA is soft — reads as an offer, not a push
- [ ] The email sounds like a smart friend sharing something useful

---

## COMPANION SKILLS

| Skill | How It Connects |
|---|---|
| `content-ideation` | Generates newsletter angles in Step 7 of its workflow — those angles can be fed as topics |

---

## QUICK START

When invoked, Claude should:

1. Load `voice-reference.md` and (if present) `skill-inventory.md`
2. **Detect mode:** voice dump (Mode A) or structured typed draft (Mode B)? If ambiguous, ask once.
3. If input is missing, ask: "Drop a voice note and I will draft one, or paste a typed draft and I will clean it up."
4. **Mode A:** parse the dump, draft from scratch, generate 3 subject line options
5. **Mode B:** read the draft, edit in place, preserve the angle, output edited version + changelog
6. Present for review
