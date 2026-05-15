# SKILL 1: Segment Performance Analysis

## When to use

After Skill 0 has parsed and normalized the audience data.

## Inputs

- `AUDIENCE_CONTEXT` from Skill 0
- Classification tiers from `rules.md`

## What to do

### Step 1: Classify each segment

Apply performance tier rules from `rules.md`:

For each segment with sufficient data (Spend >= $200, Conversions >= 3):
- Calculate ROAS and CPA relative to account baseline
- Assign tier: Top / Strong / Average / Weak / Cut
- Note confidence: High ($500+, 10+ conv), Moderate ($200+, 3+ conv), Low (<$200)

### Step 2: Rank segments

Create a ranked table:

```
| Rank | Segment | Type | Spend | ROAS | CPA | Conv | Tier | Action |
|------|---------|------|-------|------|-----|------|------|--------|
| 1 | {name} | {type} | ${X} | {X} | ${X} | {X} | Top | Scale |
| 2 | ... | ... | ... | ... | ... | ... | ... | ... |
```

Sort by: ROAS descending (primary), then CPA ascending (tiebreaker).

### Step 3: Analyze by audience type

Group segments by type and compare:

```
AUDIENCE TYPE PERFORMANCE:
| Type | Avg ROAS | Avg CPA | % of Spend | % of Conv | Efficiency |
|------|----------|---------|------------|-----------|------------|
| Broad | {X} | ${X} | {X}% | {X}% | {rating} |
| Lookalike | {X} | ${X} | {X}% | {X}% | {rating} |
| Interest | {X} | ${X} | {X}% | {X}% | {rating} |
| Retargeting | {X} | ${X} | {X}% | {X}% | {rating} |
```

Efficiency rating:
- **Over-indexed:** % of conversions > % of spend (getting more than you're paying for)
- **Balanced:** Within 10% of each other
- **Under-indexed:** % of conversions < % of spend (paying more than you're getting)

### Step 4: Detect audience overlap

Infer overlap from:
- Similar audience descriptions / targeting parameters
- Similar performance patterns (CPM, CTR, CPA within 10% of each other)
- Audience names suggesting shared seed sources (e.g., "LAL 1% Purchasers" and "LAL 3% Purchasers")

Flag overlapping pairs with consolidation recommendation.

### Step 5: Demographic analysis (if data available)

For each demographic cell:
- Calculate ROAS and CPA
- Compare to account baseline
- Identify top-performing and worst-performing demographics
- Flag any demographic spending >15% of budget with CPA >150% of baseline

```
DEMOGRAPHIC HEATMAP:
| Age | Male ROAS | Male CPA | Female ROAS | Female CPA |
|-----|-----------|----------|-------------|------------|
| 18-24 | {X} | ${X} | {X} | ${X} |
| 25-34 | {X} | ${X} | {X} | ${X} |
| ... |
```

### Step 6: Customer cohort analysis (if RFM data available)

For each RFM segment:
- Segment size (count and % of total)
- Average order value
- Average orders per customer
- Total revenue contribution
- Recommended targeting action (retarget, exclude, build lookalike, winback)

### Step 7: Generate segment insights

```
KEY FINDINGS:
  1. {Insight about best-performing audience type}
  2. {Insight about demographic sweet spot}
  3. {Insight about overlap/waste}
  4. {Insight about underexplored opportunity}
```

Store as `SEGMENT_ANALYSIS_OUTPUT`.

> "Segment analysis complete. {X} top performers, {X} to cut. Moving to targeting recommendations."

## Next step

Proceed to Skill 2: Targeting Recommendations.
