# SKILL 5: Shopping & Performance Max Deep Dive

## When to use

After Skill 4 (or Skill 3 if Search data was absent), only if Shopping or PMax campaign data is present. If neither exists, skip to Skill 6.

## What to do

### Subsection 1: Shopping Campaign Performance

Only run if standard Shopping campaign data is present.

**Top/Bottom Products by ROAS:**

| Product / Product Group | Spend | Clicks | Conversions | Revenue | ROAS | CPA | Assessment |
|---|---|---|---|---|---|---|---|

Show top 10 and bottom 10 products or product groups. Assessment = WINNER / MIDDLE / LOSER with one-sentence explanation of why.

**Product Category Analysis:**
If product type or category data is available, aggregate performance:

| Category | Spend Share | ROAS | CPA | Conversion Rate | Recommendation |
|---|---|---|---|---|---|

Identify: Categories with strong ROAS that deserve more budget. Categories burning spend with poor returns. Categories with no conversions that should be excluded or restructured.

### Subsection 2: Feed Quality Signals

Assess based on available data (Merchant Center export, product titles in ads data, or observable signals):

- **Title optimization:** Are product titles descriptive and keyword-rich? Flag generic titles (e.g., "Blue Shirt" vs "Men's Premium Cotton Oxford Button-Down Shirt - Navy Blue").
- **Missing attributes:** If Merchant Center data shows gaps (no GTIN, missing product type, no custom labels), flag them.
- **Image quality:** Note if product images appear to be high-quality lifestyle shots vs basic white-background photos (if observable from Transparency Center or creative assets).
- **Price competitiveness:** If competitor pricing data is available, note position.

Output a quick assessment:
- Feed health: Strong / Needs Work / Poor
- Top 3 feed improvements to prioritize

### Subsection 3: Performance Max Asset Groups

Only run if PMax data is present.

**Asset Group Performance:**

| Asset Group | Spend | Impressions | Clicks | Conversions | CPA | ROAS | Asset Strength |
|---|---|---|---|---|---|---|---|

For each asset group, note:
- Asset strength rating (Excellent / Good / Average / Low)
- Whether audience signals are configured
- What networks PMax appears to be serving on (if search term insights reveal Search delivery vs Display delivery)

**Audience Signals Review:**
- Are audience signals configured for each asset group?
- Are signals aligned with the brand's actual customer base?
- Recommendation on signal optimization

### Subsection 4: PMax Search Term Insights

Only run if PMax search term data is available (Google now provides this).

**Brand vs Generic vs Competitor Split:**

| Term Category | % of Impressions | % of Clicks | % of Conversions | Avg CPC |
|---|---|---|---|---|

Assess:
- Is PMax over-indexing on brand terms (cannibalizing brand Search campaigns)?
- Is PMax finding productive generic terms?
- Are competitor terms converting or just burning spend?

**Cannibalization Risk:**
If both Search and PMax campaigns exist, assess whether PMax is bidding on the same terms as Search campaigns. Flag overlap and recommend brand exclusions or campaign priority settings.

### Subsection 5: Listing Group Structure

If listing group data is available:
- Is the structure too granular (hundreds of single-product groups with insufficient data)?
- Is it too broad (one "All products" group with no segmentation)?
- Recommendation on optimal listing group structure for this account's product count and spend level

## Output format

1. **Shopping Performance** (top/bottom products, category analysis)
2. **Feed Quality Assessment** (health rating + top improvements)
3. **PMax Asset Groups** (performance table + audience signal review)
4. **PMax Search Term Insights** (brand/generic/competitor split + cannibalization)
5. **Listing Group Structure** (assessment + recommendation)

## Next step

Proceed automatically to Skill 6.
