# Knowledge -- Classification & Quality Thresholds

**Classification minimums (Google Ads entity-level):**
- Spend >= $150 AND Conversions >= 3 -> eligible for Winner/Loser
- Spend >= $150, Conversions 1-2 -> Middle (insufficient conversions)
- Spend < $150 -> "Insufficient sample"
- Apply same spend threshold proportionally at keyword, ad group, and campaign level

**Winner/Loser classification thresholds (ROAS-based -- primary):**
- Winner: ROAS >= +20% above campaign type baseline
- Loser: ROAS <= -20% below campaign type baseline
- Middle: Within +/-20% of campaign type baseline ROAS

**Winner/Loser classification thresholds (CPA-based -- fallback when revenue is absent):**
Use this when conversion value data is missing but conversions and spend are present.
- Winner: CPA <= 80% of campaign type baseline CPA (i.e., 20% cheaper than baseline)
- Loser: CPA >= 120% of campaign type baseline CPA (i.e., 20% more expensive than baseline)
- Middle: CPA within +/-20% of campaign type baseline CPA
- Label all CPA-based classifications: "Classified by CPA -- revenue data unavailable"

**Quality Score thresholds:**
- QS 1-4: Flag for immediate action (below average; significantly hurting ad rank and CPC)
- QS 5-6: Monitor (average; room for improvement but not critical)
- QS 7-10: Healthy (above average; no action needed)
- High-spend keywords (>$100 in period) with QS <= 4: Priority flag

**Quality Score component priorities (when fixing low QS):**
1. Landing Page Experience -- most impactful, often the hardest to fix
2. Ad Relevance -- fix by tightening ad group theme and improving headline relevance
3. Expected CTR -- improve by testing stronger headlines and using ad extensions

**Search Impression Share thresholds:**
- Brand campaigns: Target 90%+ Search IS; flag if < 80%
- Non-brand campaigns: Flag if Lost IS (Budget) > 20% AND ROAS is above baseline (opportunity to scale)
- Flag if Lost IS (Rank) > 30% (indicates QS or bid competitiveness issue)

**Match type efficiency benchmarks (directional -- vary by industry):**
- Exact match typically delivers lowest CPA but lowest volume
- Broad match typically delivers highest volume but highest CPA
- Flag if broad match CPA is >2x exact match CPA in the same campaign

**Budget allocation signals:**
- If a campaign type has ROAS >2x account average AND Lost IS (Budget) > 0: recommend budget increase
- If a campaign type has ROAS <50% of account average AND spend share > 20%: recommend budget reduction
