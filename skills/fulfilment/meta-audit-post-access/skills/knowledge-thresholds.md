# Knowledge -- Classification & Fatigue Thresholds

**Classification minimums (Meta ad-level):**
- Spend >= $200 AND Purchases >= 3 -> eligible for Winner/Loser
- Spend >= $200, Purchases 1-2 -> Middle (insufficient conversions)
- Spend < $200 -> "Insufficient sample"
- Apply same spend threshold at ad set and campaign level proportionally

**Winner/Loser classification thresholds (ROAS-based -- primary):**
- Winner: ROAS >= +15% above bucket baseline AND CPP <= bucket baseline
- Loser: ROAS <= -15% below bucket baseline OR CPP significantly above baseline
- Middle: Within +/-15% of bucket baseline ROAS

**Winner/Loser classification thresholds (CPP-based -- fallback when revenue is absent):**
Use this when revenue data is missing but purchases and spend are present.
- Winner: CPP <= 85% of bucket baseline CPP (i.e., 15% cheaper than baseline)
- Loser: CPP >= 115% of bucket baseline CPP (i.e., 15% more expensive than baseline)
- Middle: CPP within +/-15% of bucket baseline CPP
- Label all CPP-based classifications: "Classified by CPP -- revenue data unavailable"

**Fatigue thresholds -- segmented:**
- Prospecting: Frequency >= 3.0 = watch; >= 4.0 = flag
- Retargeting: Frequency >= 6.0 = watch; >= 9.0 = flag
- Thumb-Stop: flag if >20% below format-matched baseline (UGC vs. static vs. animation separately -- do not blend)
- ROAS/CPP trend: requires at least 3 data points (daily or weekly); if unavailable, use snapshot signals only
