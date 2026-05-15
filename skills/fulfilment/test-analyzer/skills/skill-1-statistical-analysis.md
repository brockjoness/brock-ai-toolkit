# SKILL 1: Statistical Analysis

## When to use

After Skill 0 has parsed and normalized the test data.

## Inputs

- `TEST_CONTEXT` from Skill 0 (all normalized ad data, baseline metrics)
- Classification thresholds from `rules.md`

## What to do

### Step 1: Calculate test group baseline

Compute the weighted average across all ads in the test:
- **Baseline ROAS** = Total Revenue / Total Spend (if revenue available)
- **Baseline CPA** = Total Spend / Total Conversions (if conversions available)
- **Baseline CTR** = Total Clicks / Total Impressions * 100
- **Baseline CPM** = Total Spend / Total Impressions * 1000

This baseline represents the "average" performance of the test group. Winners beat it, losers trail it.

If account-level historical baselines are available (from client context or Brock), note both:
- Test group baseline (internal comparison)
- Account baseline (external comparison)

### Step 2: Classify each ad

For each ad in the test, apply the classification rules:

**Eligibility check:**
- Spend >= $200 AND Conversions >= 3 -> **Eligible** for Winner/Loser
- Spend >= $200, Conversions 1-2 -> **Middle** (insufficient conversions)
- Spend < $200 -> **Insufficient Sample** (do not classify)

**Classification (for eligible ads):**

Using ROAS (primary):
- ROAS >= baseline * 1.15 AND CPA <= baseline -> **Winner**
- ROAS <= baseline * 0.85 OR CPA >= baseline * 1.30 -> **Loser**
- Otherwise -> **Middle**

Using CPA (fallback, when no revenue):
- CPA <= baseline * 0.85 -> **Winner**
- CPA >= baseline * 1.15 -> **Loser**
- Otherwise -> **Middle**

Using CTR only (when no conversions at all):
- CTR >= baseline * 1.25 -> **Potential Winner** (upper-funnel only)
- CTR <= baseline * 0.75 -> **Potential Loser** (upper-funnel only)
- Note: "Upper-funnel classification only. Cannot confirm without conversion data."

### Step 3: Assign confidence levels

| Criteria | Confidence |
|---|---|
| Spend >= $500, Conversions >= 10, clear separation (>25%) | **High** |
| Spend >= $200, Conversions >= 3, moderate separation (>15%) | **Moderate** |
| Spend < $200 OR Conversions < 3 | **Low** (do not classify) |

### Step 4: Check for fatigue contamination

For each ad, check:
- Frequency >= 3.0 (prospecting) or >= 6.0 (retargeting) -> **Fatigue flag**
- If a "Loser" has fatigue signals, add note: "May have fatigued rather than underperformed. Consider the creative concept separately from its current execution."

### Step 5: Rank and sort

Sort all ads into tiers:
1. **Winners** (ranked by ROAS or CPA, best first)
2. **Middle** (ranked by ROAS or CPA)
3. **Losers** (ranked by ROAS or CPA, worst last)
4. **Insufficient Sample** (ranked by spend, highest first)

### Step 6: Generate summary statistics

```
TEST SUMMARY:
  Total ads tested: {X}
  Winners: {X} ({X}% of spend)
  Middle: {X} ({X}% of spend)
  Losers: {X} ({X}% of spend)
  Insufficient sample: {X}

  Best performer: {Ad Name} -- ROAS {X} / CPA ${X}
  Worst performer: {Ad Name} -- ROAS {X} / CPA ${X}

  Test group baseline: ROAS {X} / CPA ${X} / CTR {X}%
  vs. Account baseline: ROAS {X} / CPA ${X} (if available)
```

Store as `ANALYSIS_OUTPUT`.

### Step 7: Provide progress update

> "Analysis complete. {X} winners, {X} losers identified. Moving to element extraction."

## Next step

Proceed to Skill 2: Element Extraction.
