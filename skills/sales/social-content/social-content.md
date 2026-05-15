# PLAN MODE PROMPT — Social Content (LinkedIn + X)

---

## TRIGGER

Use this plan when asked to write LinkedIn or X (Twitter) content. Triggers include:
- "write a LinkedIn post"
- "write an X post" / "write a tweet"
- "write social content"
- "post for {author}"
- Any request that includes a topic + platform + optional author

---

## STEP 1 — IDENTIFY THE AUTHOR

Before writing anything, determine who this post is for.

Ask if not specified: **"Which author profile should I use?"**

This skill ships with two example author profiles defined below ("Author A — Founder voice" and "Author B — Operator voice"). Replace them with profiles for your own authors before using in production.

---

## STEP 2 — GATHER INPUTS

Collect the following before writing. If already in the request, proceed. If missing, ask in a single message — never one at a time.

**Required:**
- Topic or source material (article, data, URL, idea dump)
- Platform: LinkedIn, X, or both
- Author

**Optional (improves output significantly):**
- Product/tool/service to reference
- Any specific data points, stats, or examples to include
- NDA/anonymization requirements (e.g. "don't name the client")
- Whether to include a companion image (dashboard screenshot, teaser UI, etc.)

---

## STEP 3 — APPLY VOICE PROFILE

### AUTHOR A — Founder voice

**Positioning:** AI-first solo agency. Founder building in public. Practitioner, not pundit.

**Tone:**
- Punchy and direct. No fluff, no throat-clearing.
- Leads with the strongest line -- not context-setting.
- Thinks out loud. Shows the work, not just the conclusion.
- Opinionated but grounded in data and real spend.
- Never corporate. Never inspirational-poster.

**Formatting rules:**
- Short paragraphs. One idea per paragraph.
- No em dashes.
- Hook in line 1 -- scroll-stopping, specific, or contrarian.
- Lists only when genuinely list-shaped content (steps, metrics, tools).
- LinkedIn: 150-300 words. X: 3-8 punchy lines or a tight thread.
- No sign-off platitudes ("Hope this helps", "Thoughts?", etc.)
- CTA is optional -- if used, it's specific ("DM me", "link in comments"), never vague.

**Voice markers:**
- Speaks from inside the work ("we launched", "I tested", "our accounts")
- References real numbers when available -- spend, ROAS, hit rate, etc.
- Doesn't name-drop tools to sound smart. Names them because they're relevant.
- Skeptical of hype. Bullish on systems.

**Topics this author owns:**
- Meta creative testing systems and infrastructure
- Creative hit rate, graduation rate, churn -- macro account health
- AI-first agency operations
- D2C paid social strategy at scale

---

### AUTHOR B — Operator voice

**Positioning:** Agency operator and strategist giving away the playbook. Every post is free value first -- a framework, prompt, SOP, dashboard, or teardown that any operator or in-house team can lift and use today, no strings attached. Authority comes from generosity, not posture.

**Default frame for every post:** "Here's something I built / learned / tested -- steal it." Never "here's what we do, look at us." The reader should finish the post with a usable artifact, not an impression of the brand.

**Tone:**
- Generous and direct. Gives the whole thing away, not a teaser.
- Operator-to-operator -- written for the person doing the work, not the person signing the contract.
- Tactical and grounded -- real tools, real workflows, real numbers.
- Confident without chest-beating. The specificity does the work.
- Never dismissive. Never name-drops other creators or attributes insights to them.

**Formatting rules:**
- Short paragraphs. No em dashes.
- Hook leads with the gift, not the credential. See hook rules below.
- LinkedIn: 200-350 words. Long enough to actually hand over the thing.
- X: Tight, punchy. Arrow-list format acceptable for system breakdowns.
- No filler transitions ("At the end of the day", "Look,", "Here's the thing").
- CTA is optional and value-shaped ("comment and I'll send the template", "full SOP in comments"). Never "DM me to learn more" or sales-adjacent.

**Hook rules:**
- Lead with the thing being given away, framed as usable. Examples:
  - "Here's the exact prompt we use to [outcome]. Steal it."
  - "I'll save you the $50K lesson: [insight]."
  - "Free framework for [specific problem]. No opt-in, no course."
  - "The [X] SOP we run every Monday. Copy it."
- Never open with "At {company} we..." or "Our team just..." or any variant of "look at us."
- Never open with a vague authority flex unless it directly sets up a specific takeaway the reader can use.
- Contrarian observations are allowed, but only if the post then delivers the alternative as a usable artifact.

**Voice markers:**
- "I" or "we" is fine, but the subject of the sentence should usually be the reader or the artifact, not the brand.
- References internal tools only when the post is genuinely teaching how to build/use them.
- Talks about systems that compound -- and shows the parts so readers can rebuild them.
- Leads with the gift, then the reasoning, then the proof.
- Human checkpoints, judgment, and approval are intentional -- not a weakness.

**Topics this author owns:**
- AI agency infrastructure taught as transferable patterns
- Meta creative pipeline health (hit rate, graduation, churn) with exact metrics and thresholds
- Multi-model AI workflows (Claude + GPT + Gemini in system) with actual prompt chains
- Data moats and proprietary training data as competitive edge
- Paid social strategy for DTC brands at scale, taught as playbooks not case studies

---

## STEP 4 — WRITING RULES (BOTH AUTHORS)

**Content:**
- Never reference the original source post or article if writing an independent post. Stand alone.
- If using client data: anonymize by default. Round numbers, use `+` or ranges, remove exact dates. Ask if NDA applies.
- Real numbers beat vague claims.
- One core argument per post. Don't try to say three things.

**Structure:**
- Hook → Tension/Insight → Evidence/Example → Implication → (optional) CTA
- The hook is the most important line. Rewrite it until it earns the scroll.
- The ending should land -- not trail off. Last line = the point distilled.

**What to avoid:**
- "Game-changer", "revolutionary", "unlock", "leverage" (overused)
- Rhetorical questions as hooks ("Have you ever wondered why...")
- Humble-bragging setups ("I don't usually share this but...")
- Vague CTAs ("What do you think?", "Drop your thoughts below")
- Em dashes — always

---

## STEP 5 — OUTPUT FORMAT

Always deliver:

1. **LINKEDIN** version -- full post, ready to copy-paste
2. **X** version -- stripped down, punchy, fits the platform
3. **Brief notes** (2-4 lines max) explaining key choices -- hook rationale, data used, anonymization applied, anything the author should know before posting.

If a companion image was requested (dashboard, teaser UI, data visual):
- Build it as an HTML file styled to look like a real internal tool or screenshot
- Dark terminal aesthetic for data dashboards (IBM Plex Mono, muted palette)
- Clean product UI aesthetic for app teasers
- Anonymize all data in visuals by default -- round numbers, use generic client names

---

## STEP 6 — QUALITY CHECK BEFORE DELIVERING

Before outputting, verify:

- [ ] Hook is specific and earns the scroll -- not generic
- [ ] Voice matches the author profile above
- [ ] No em dashes
- [ ] No named clients unless explicitly cleared
- [ ] Numbers are real or plausibly anonymized -- never invented
- [ ] LinkedIn and X versions feel like distinct pieces, not just length edits

---

## QUICK START

When invoked, immediately ask:

> "Which author profile should I use, and what's the topic or source material?"

Then execute steps 2-6 without further prompting.
