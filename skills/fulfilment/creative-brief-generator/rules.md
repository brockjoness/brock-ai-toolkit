# Creative Brief Generator -- Rules

## Activation Triggers

- "Generate creative brief for [Client]"
- "Creative brief for [Client]"
- "Build briefs from this research"
- "Brief me on [Client] creatives"
- Automatically triggered as part of the strategy pipeline (after competitor research or audit)

## Input Sources (in priority order)

1. **Competitor research output** — Section 7 "Creative Brief Input Summary" from competitor-research skill
2. **Meta audit output** — Creative deep dive section from meta-audit-post-access or meta-audit-pre-access
3. **Google audit output** — Ad copy patterns from google-audit-post-access or google-audit-pre-access
4. **Manual brief** — Brock provides direction directly (product, angle, audience, goals)
5. **Client context** — From CRM + client context file (best sellers, brand voice, competitor list)

Multiple inputs can be combined. More data = better briefs.

## Output Format

Every creative brief follows this standardized structure:

### CREATIVE BRIEF — [Brand Name]

**Date:** [Current Date]
**Agency:** [Agency Name]
**Vertical:** [Beauty/Health/Apparel/Food/Events/Other]
**Campaign Objective:** [Awareness / Consideration / Conversion]
**Target Platforms:** [Meta Feed, Meta Stories, Google Display, TikTok, etc.]

---

#### 1. Target Audience

| Segment | Description |
|---|---|
| **Primary** | [Demographics, psychographics, behaviors] |
| **Secondary** | [If applicable] |
| **Exclusions** | [Who NOT to target] |

**Audience Language:** [3-5 phrases/quotes from research that this audience actually uses]

---

#### 2. Hook Angles (3-5)

For each hook angle:

| # | Hook Angle | Type | Source Signal | Example Hook Line |
|---|---|---|---|---|
| 1 | [Name] | [Pain-point / Social proof / Lifestyle / Feature / Urgency / Comparison] | [Where this came from in research] | "[Specific hook copy]" |
| 2 | [Name] | [Type] | [Source] | "[Hook copy]" |
| 3 | [Name] | [Type] | [Source] | "[Hook copy]" |

**Priority:** Hook #[X] has the strongest signal — test this first.

---

#### 3. Visual Direction

| Element | Direction |
|---|---|
| **Hero Image** | [Product shot / Lifestyle / UGC-style / Before-after / Flat lay] |
| **Color Treatment** | [Brand colors / Muted / Bold / Warm / Cool] |
| **Text Overlay Style** | [Minimal / Bold headline / Data callout / Testimonial overlay] |
| **Format Priority** | [Static / Video / Carousel / UGC] |

**Visual References:** [Describe 2-3 reference styles — competitor ads, mood direction]

---

#### 4. Copy Variants (3)

For each variant:

**Variant [N]: [Angle Name]**
- **Headline:** [Max 8 words]
- **Body:** [Max 2 lines, benefit-focused]
- **CTA:** [2-4 words]
- **Rationale:** [Why this angle, backed by data]

---

#### 5. Platform-Specific Notes

| Platform | Format | Key Consideration |
|---|---|---|
| Meta Feed (4:5) | [Static / Video / Carousel] | [Safe zones, thumb-stop, sound-off] |
| Meta Stories (9:16) | [Static / Video] | [Full-bleed, swipe-up CTA, 3-sec hook] |
| Google Display | [Responsive / Static] | [Headline limits, description limits, image specs] |
| TikTok | [Video] | [Native feel, sound-on, trend-riding] |

---

#### 6. Testing Framework

| Round | What to Test | Variants | Success Metric | Decision Threshold |
|---|---|---|---|---|
| 1 | Hook angles | 3-5 variants | CTR + Thumb-stop rate | 48-72 hours, 95% significance |
| 2 | Copy/CTA | Winner hook + 3 copy variants | CVR | 48-72 hours |
| 3 | Visual format | Winner copy + format variants | ROAS | 72 hours |

---

## Brief Quality Rules

- Every hook angle must cite its source (research quote, audit finding, competitor gap)
- Copy variants must be production-ready — no placeholder text
- Visual direction must be specific enough for a designer or AI tool to execute
- Platform notes must reflect actual platform specs (not generic advice)
- No emojis in brief copy
- No em dashes in ad copy
- Headlines max 8 words
- Body copy max 2 lines
- CTAs 2-4 words

## Vertical Templates

When a vertical is identified, load the corresponding template from `templates/` for vertical-specific guidance on:
- Common winning angles for that vertical
- Visual styles that perform well
- Copy frameworks that resonate
- Platform-specific notes

Available templates:
- `templates/beauty-skincare.md`
- `templates/health-wellness.md`
- `templates/apparel-fashion.md`
- `templates/food-beverage.md`
- `templates/events-entertainment.md`

If the vertical doesn't match any template, use general D2C best practices.

## Output Routing

After generating the brief, it can be:
1. **Presented to Brock** for review and refinement
2. **Fed to creative-generator** skill to produce HTML ad mockups
3. **Written to Notion** under the client's CRM page (only when explicitly asked)
4. **Included in pre-onboarding package** as part of the strategy pipeline
