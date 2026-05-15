# SKILL 6: Performance Diagnostics

## When to use

After Skill 5 (or Skill 4/3 if Shopping/PMax was absent). This skill covers cross-channel diagnostics, bidding strategy analysis, budget allocation, and any Display/YouTube/Demand Gen analysis.

## What to do

### Subsection 1: Bidding Strategy Audit

For each campaign, assess the bidding strategy:

| Campaign | Current Strategy | Target | Actual Performance | Assessment |
|---|---|---|---|---|

**Common strategy mismatches to flag:**
- tROAS on a brand campaign (brand campaigns are low-funnel; tROAS may limit volume unnecessarily)
- Max Conversions without a CPA cap on a budget-constrained campaign (risk of CPA inflation)
- Manual CPC on a campaign with sufficient conversion data for automated bidding
- tCPA set significantly below historical CPA (algorithm can't deliver; impression share drops)
- Maximize Clicks on a conversion-focused campaign (optimizing for wrong signal)

For each mismatch:
- **Issue:** What's wrong
- **Impact:** How it hurts performance (cite metrics)
- **Recommendation:** What to change and why

### Subsection 2: Budget Allocation

**Spend Distribution:**

| Campaign Type | Spend | % of Total | Conversions | % of Total Conv | ROAS | Efficiency Score |
|---|---|---|---|---|---|---|

Efficiency Score = ROAS relative to account average (High / Average / Low).

**Key Findings:**
- Campaigns with strong ROAS that are budget-constrained (lost IS to budget > 0)
- Campaigns with poor ROAS consuming disproportionate spend
- Recommended reallocation (shift X% from [campaign A] to [campaign B])

**Impression Share Analysis** (if data available):

| Campaign | Search IS | Lost IS (Budget) | Lost IS (Rank) | Recommendation |
|---|---|---|---|---|

Flag:
- Brand campaigns with Search IS < 80% (should aim for 90%+)
- High-ROAS non-brand campaigns with Lost IS (Budget) > 20% (opportunity to scale)
- Campaigns losing IS to rank (indicates QS or bid issues)

### Subsection 3: Display Campaign Analysis

Only run if Display campaign data is present.

**Placement Analysis:**
- Top performing placements vs wasted placements
- Managed placements vs automatic placements performance comparison
- Recommendation on placement exclusions

**Audience Performance:**

| Audience | Spend | Clicks | CTR | Conversions | CPA | Assessment |
|---|---|---|---|---|---|---|

Identify high-performing audiences to scale and low-performing audiences to exclude.

**Creative Format Performance:**
- Responsive display ads vs uploaded image ads (if both present)
- Assessment of creative quality from available signals

### Subsection 4: YouTube / Video Analysis

Only run if Video campaign data is present.

| Campaign | Spend | Views | View Rate | CPV | Conversions | CPA |
|---|---|---|---|---|---|---|

Assess:
- View rates vs industry benchmarks (30%+ healthy for in-stream, 10%+ for discovery)
- CPV efficiency
- Conversion performance (if conversion-focused campaign)
- Audience targeting effectiveness

### Subsection 5: Demand Gen Analysis

Only run if Demand Gen campaign data is present.

- Creative format performance (image vs video vs carousel)
- Audience signal effectiveness
- Conversion performance vs other campaign types

### Subsection 6: Audience & Demographic Analysis

Only run if demographic data is available.

**Age/Gender Performance:**

| Segment | Spend | Clicks | Conversions | CPA | ROAS | Index vs Avg |
|---|---|---|---|---|---|---|

Flag segments that significantly over or underperform (>20% deviation from account average). Recommend bid adjustments or exclusions for extreme underperformers.

**Device Performance:**

| Device | Spend | Clicks | CTR | Conversions | CPA | ROAS |
|---|---|---|---|---|---|---|

Flag device-level disparities. Recommend bid modifiers if one device significantly underperforms.

**Geographic Performance** (if available):
Only highlight geo outliers -- regions spending >10% of budget with significantly worse performance than account average.

## Output format

1. **Bidding Strategy Audit** (table + mismatches + recommendations)
2. **Budget Allocation** (distribution + impression share + reallocation recommendations)
3. **Display Analysis** (conditional)
4. **YouTube / Video Analysis** (conditional)
5. **Demand Gen Analysis** (conditional)
6. **Audience & Demographics** (conditional)

## Next step

Proceed automatically to Skill 7.
