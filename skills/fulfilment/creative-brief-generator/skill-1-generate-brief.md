# SKILL 1: Generate Creative Brief

## What to do

Using the `BRIEF_CONTEXT` from Skill 0, generate a complete creative brief following the standardized format in rules.md.

### Step 1: Load vertical template

If a vertical template was identified in Skill 0, read it from `templates/{vertical}.md`. Apply vertical-specific guidance to all brief sections.

### Step 2: Build Target Audience section

**From research input:** Use audience signals, demographics, psychographics from competitor research
**From audit input:** Use audience data from platform audits
**From client context:** Use CRM fields (best sellers → infer buyer profile)
**From manual input:** Use Brock's direction

Include 3-5 phrases of "audience language" — exact quotes from research that this audience actually uses. These inform ad copy.

### Step 3: Build Hook Angles (3-5)

Generate 3-5 hook angles. For each:
1. **Name** the angle (e.g., "Pain-point: Sleep disruption")
2. **Type** it (Pain-point / Social proof / Lifestyle / Feature / Urgency / Comparison / Founder story / Emotional)
3. **Cite the source signal** — where in the research/audit this came from
4. **Write an example hook line** — production-ready, max 8 words

**Angle selection priority:**
- If research available: prioritize angles with strongest user language signals
- If audit available: prioritize patterns from top-performing ads
- If both available: cross-reference — angles supported by BOTH research and audit data rank highest
- If manual only: follow Brock's direction, supplement with vertical best practices

**Always include at least one angle from each category (when data supports it):**
- 1x Pain-point or Problem/Solution
- 1x Social proof or Testimonial
- 1x Benefit-led or Feature-led

### Step 4: Build Visual Direction

Specify for each element:
- **Hero image:** What the main visual should be (product shot, lifestyle, UGC, before/after, flat lay)
- **Color treatment:** Based on brand.md guidelines + vertical norms
- **Text overlay style:** Minimal, bold headline, data callout, testimonial overlay
- **Format priority:** Static, video, carousel, or UGC — based on audit data or vertical norms

Include 2-3 visual reference descriptions (not URLs — describe the style/mood).

### Step 5: Build Copy Variants (3)

Write 3 production-ready copy variants. Each must include:
- **Headline:** Max 8 words, scroll-stopping
- **Body:** Max 2 lines, benefit-focused
- **CTA:** 2-4 words, action-oriented
- **Rationale:** Why this angle, backed by data

**Copy rules:**
- No emojis
- No em dashes
- Match brand voice from brand.md
- Borrow exact user language from research where possible
- Each variant tests a DIFFERENT angle (don't write 3 versions of the same angle)

### Step 6: Build Platform-Specific Notes

For each target platform, specify:
- Recommended format (static/video/carousel)
- Key technical considerations (safe zones, character limits, aspect ratios)
- Platform-specific creative advice (e.g., "Stories need 3-second hook; TikTok needs native feel")

### Step 7: Build Testing Framework

Define the 3-round testing approach:
1. **Round 1:** Hook angle test — 3-5 variants, measure CTR + thumb-stop, 48-72hrs
2. **Round 2:** Copy/CTA test — winning hook + 3 copy variants, measure CVR, 48-72hrs
3. **Round 3:** Format/visual test — winning copy + format variants, measure ROAS, 72hrs

### Step 8: Present brief

Output the complete brief in the standardized format from rules.md.

Then present options:
> "Creative brief complete for **{Brand}**. Options:
> 1. **Refine** — adjust angles, copy, or direction
> 2. **Generate mockups** — feed to creative-generator for HTML ad production
> 3. **Write to Notion** — save under client's CRM page
> 4. **Continue pipeline** — proceed to next step"

## Next step

If Brock says "generate mockups" or the brief is part of the strategy pipeline:
- Feed the brief output to the `creative-generator` skill (at `3-fulfilment/skills/creative-generator/`)
- The creative-generator uses the Hook Angles, Copy Variants, and Visual Direction sections as its input
