# Test Analyzer -- Rules

## Classification Thresholds

Reuse thresholds from `meta-audit-post-access/skills/knowledge-thresholds.md`:

### Minimum sample requirements
- Spend >= $200 AND Purchases >= 3 -> eligible for Winner/Loser classification
- Spend >= $200, Purchases 1-2 -> Middle (insufficient conversions to call)
- Spend < $200 -> "Insufficient sample" (do not classify)

### Winner/Loser determination (ROAS-based -- primary)
- **Winner:** ROAS >= +15% above test group baseline AND CPA <= baseline
- **Loser:** ROAS <= -15% below baseline OR CPA significantly above baseline
- **Middle:** Within +/-15% of baseline ROAS

### Winner/Loser determination (CPA-based -- fallback)
When revenue data is missing but conversions and spend are present:
- **Winner:** CPA <= 85% of baseline (15% cheaper)
- **Loser:** CPA >= 115% of baseline (15% more expensive)
- **Middle:** CPA within +/-15% of baseline

### Practical significance
- A 15% difference in ROAS or CPA with $200+ spend and 3+ conversions is treated as practically significant for creative testing purposes
- For higher confidence, recommend extending test to $500+ spend or 10+ conversions before scaling the winner

## Fatigue Detection (During Test)
- Frequency >= 3.0 (prospecting) or >= 6.0 (retargeting) -> test may be compromised by fatigue
- CTR declining >20% WoW on any test variant -> flag as fatiguing, may not be a valid loser
- If fatigue is detected, note it in the analysis -- the "loser" may have been a winner that fatigued

## Test Structure Validation
Before analyzing, check:
- Are variants testing ONE variable? (angle vs. angle, format vs. format, CTA vs. CTA)
- If multiple variables changed between variants, note that results are directional only
- Minimum 2 variants per test (no single-variant "tests")
- Maximum recommended: 5 variants per ad set (more = slower learning)

## Output Rules
- Always present results as a ranked table: Winner(s) -> Middle -> Loser(s) -> Insufficient Sample
- Include confidence level: "High" ($500+, 10+ conversions), "Moderate" ($200+, 3+ conversions), "Low" (<$200 or <3 conversions)
- Never recommend scaling a "Low" confidence winner -- recommend extending the test instead
- Element extraction must be specific: not "good creative" but "benefit-led headline + lifestyle imagery + warm tones"

## Constraints
- Do not modify source data files
- Do not present raw data dumps -- always summarize and interpret
- Do not recommend killing ALL variants unless explicitly all are underperforming vs. historical baseline
- If no clear winner exists, that IS the finding -- recommend next test, not a forced pick
