# SKILL 7: Landing Page Analysis

## When to use

After Skill 6, only if landing page URLs are available in the data or the user provides the brand's website. If no landing page data exists, skip to Skill 8.

## What to do

### Subsection 1: Landing Page Performance Table

If landing page URLs are present in the data with associated metrics:

| Landing Page URL | # Campaigns | # Ad Groups | Spend | Clicks | Conversions | Conv Rate | CPA | ROAS | Best Performer | Worst Performer |
|---|---|---|---|---|---|---|---|---|---|---|

- "Best Performer" = the campaign or ad group sending traffic to this page with the best ROAS/CPA
- "Worst Performer" = the campaign or ad group with the worst ROAS/CPA on this page

**Key Insight Paragraph:**
Summarize the landing page landscape in 2-3 sentences. Are there too many landing pages? Too few? Is one page carrying disproportionate spend? Are conversion rates significantly different across pages?

### Subsection 2: Message Match Audit

For the top 3-5 landing pages by spend, assess the match between ad copy and landing page content:

**[Landing Page URL]**
- **Ad promise:** What the ads sending traffic here promise (headline, description, CTA)
- **Page delivery:** What the landing page actually delivers above the fold
- **Match strength:** STRONG / WEAK
- **If WEAK:** Specific mismatch identified and what to fix:
  - Ad says "Free Shipping" but page doesn't mention it above the fold
  - Ad highlights "50% Off" but page shows full price first
  - Ad targets "running shoes" but page shows all shoe categories
  - Headline mismatch: ad hook doesn't appear anywhere on the page

### Subsection 3: Quality Score Landing Page Impact

If Quality Score component data is available:

| Landing Page | # Keywords | Avg QS | LP Experience Rating | Recommendation |
|---|---|---|---|---|

Flag pages where landing page experience is "Below Average" -- these directly reduce ad rank and increase CPC. For each:
- Likely causes (page speed, mobile experience, content relevance, navigation)
- Recommended fix

### Subsection 4: Conversion Path Notes

Only if GA4 data is available:
- Which landing pages have the highest bounce rate?
- What is the typical conversion path (pages visited before converting)?
- Are there significant drop-off points?
- Recommendation on funnel improvements

### Subsection 5: Quick-Win Recommendations

3-5 specific, actionable landing page improvements:

For each:
- **The issue:** What's wrong (specific, data-backed)
- **The fix:** What to change (concrete, implementable)
- **Expected impact:** How this improves performance (QS improvement -> lower CPC, message match -> higher conv rate, etc.)

## Output format

1. **Landing Page Performance Table** (with key insight paragraph)
2. **Message Match Audit** (top 3-5 pages, strong/weak classification)
3. **Quality Score Landing Page Impact** (conditional on QS data)
4. **Conversion Path Notes** (conditional on GA4 data)
5. **Quick-Win Recommendations** (3-5 actionable improvements)

## Next step

Proceed automatically to Skill 8.
