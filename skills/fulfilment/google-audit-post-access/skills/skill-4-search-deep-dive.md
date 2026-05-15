# SKILL 4: Search Campaign Deep Dive

## When to use

After Skill 3, only if Search campaign data is present. If no Search data exists, skip to Skill 5.

## What to do

### Subsection 1: Keyword Performance Analysis

**Top Performers Table:**

| Keyword | Match Type | Impressions | Clicks | CTR | CPC | Conversions | CPA | ROAS | QS |
|---|---|---|---|---|---|---|---|---|---|

Show top 10 keywords by conversion volume or ROAS (whichever is more relevant to the account's goals). Include "Why it works" note for the top 3.

**Wasted Spend Keywords:**

| Keyword | Match Type | Spend | Clicks | Conversions | CPA vs Baseline | Action |
|---|---|---|---|---|---|---|

Show keywords with significant spend and zero or poor conversions. Action column = specific recommendation (pause, adjust match type, add negative, improve landing page).

### Subsection 2: Search Term Analysis

Only run if search term data is provided.

**Budget Waste -- Irrelevant Terms:**
Table of search terms that triggered ads but are clearly irrelevant. For each: the search term, which keyword triggered it, spend wasted, recommended negative keyword (exact or phrase).

**Hidden Gems -- High-Performing Terms Not Covered:**
Search terms with strong conversion metrics that don't have a matching keyword. For each: recommended keyword to add, suggested match type, projected impact.

**Negative Keyword Gaps:**
Patterns of irrelevant search terms that suggest systematic negative keyword gaps. Group by theme (e.g., "competitor names," "DIY/free," "jobs/careers," "informational queries").

### Subsection 3: Ad Copy Analysis

**Headline & Description Performance:**
If RSA asset-level performance data is available (pinned vs unpinned, asset performance labels), analyze which headlines and descriptions drive the best results.

Identify patterns:
- **Winning copy patterns:** What types of headlines work? (benefit-led, feature-led, urgency, price-inclusive, question-format, social proof)
- **Losing copy patterns:** What approaches underperform?
- **CTA effectiveness:** Which CTAs drive higher CTR?

**Ad Copy Mining:**
Extract actual top-performing headlines and descriptions for reuse:

| Copy Element | Type | Example Text | Performance Signal |
|---|---|---|---|

Group by:
- Headlines that drive CTR (hook/attention)
- Headlines that drive conversions (intent match)
- Descriptions that support conversion (trust/detail)

### Subsection 4: Quality Score Breakdown

Only run if Quality Score data is available.

**QS Distribution:**

| QS Score | # Keywords | % of Total | Avg CPC | Avg CTR |
|---|---|---|---|---|

**Component Analysis:**
For keywords with QS <= 6 and significant spend, break down components:
- Landing Page Experience: Below Average / Average / Above Average
- Ad Relevance: Below Average / Average / Above Average
- Expected CTR: Below Average / Average / Above Average

**High-Spend, Low-QS Keywords:**
Table of keywords where spend is high but QS is 4 or below. For each: the specific QS component dragging it down and the recommended fix (improve landing page, tighten ad copy relevance, restructure ad group).

### Subsection 5: Match Type Analysis

**Performance by Match Type:**

| Match Type | Spend | Impressions | Clicks | CTR | CPC | Conversions | CPA | ROAS |
|---|---|---|---|---|---|---|---|---|

Assess:
- Is broad match driving quality traffic or inflating spend?
- Are exact match keywords capturing enough volume?
- Is phrase match finding a productive middle ground?
- Recommendation on match type strategy (consolidate, expand, shift budget)

### Subsection 6: Ad Extensions / Assets

**Extension Audit:**

| Extension Type | Active? | CTR Contribution | Assessment |
|---|---|---|---|
| Sitelinks | Yes/No | X% | Strong / Weak / Missing |
| Callouts | Yes/No | X% | Strong / Weak / Missing |
| Structured Snippets | Yes/No | X% | Strong / Weak / Missing |
| Call Extensions | Yes/No | X% | Strong / Weak / Missing |
| Image Extensions | Yes/No | X% | Strong / Weak / Missing |
| Price Extensions | Yes/No | X% | Strong / Weak / Missing |
| Promotion Extensions | Yes/No | X% | Strong / Weak / Missing |

Flag missing extensions that should be active. Note: extensions improve ad rank and Quality Score -- every missing extension is a missed opportunity.

## Output format

1. **Keyword Performance** (top performers + wasted spend)
2. **Search Term Analysis** (waste, hidden gems, negative gaps)
3. **Ad Copy Analysis** (patterns + copy mining)
4. **Quality Score Breakdown** (distribution + component analysis)
5. **Match Type Analysis** (performance comparison + recommendation)
6. **Extension Audit** (coverage + gaps)

## Next step

Proceed automatically to Skill 5.
