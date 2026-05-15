# Audience Analyzer -- Rules

## Data Requirements

### Minimum required
- At least ONE of: Meta Audience Insights export, Google Analytics audience data, ad set-level performance data, or customer list
- Spend + Impressions columns at minimum for performance-based analysis

### Recommended for full analysis
- Ad set-level data with audience names/descriptions
- Demographic breakdowns (age, gender, location)
- Conversion data (purchases, revenue) for ROAS/CPA analysis
- Customer list with purchase history for RFM segmentation

## Segment Classification

### Performance tiers
| Tier | Criteria | Action |
|---|---|---|
| **Top** | ROAS >= 1.5x account average OR CPA <= 70% of average | Scale budget, build lookalikes from this seed |
| **Strong** | ROAS >= 1.0-1.5x average OR CPA 70-90% of average | Maintain, test creative variants |
| **Average** | Within +/-15% of account average | Monitor, test new angles |
| **Weak** | ROAS <= 0.85x average OR CPA >= 115% of average | Reduce budget, consider cutting |
| **Cut** | ROAS <= 0.5x average OR CPA >= 150% of average, with $500+ spend | Pause and reallocate |

### Minimum sample for classification
- Spend >= $200 AND Conversions >= 3 -> eligible for tier assignment
- Below threshold -> "Insufficient data" (recommend extending)

## Overlap Rules

- If two audiences share >30% overlap (Meta Audience Overlap tool or inferred from similar performance + audience descriptions), flag for consolidation
- Consolidation recommendation: merge into a single broader ad set, or suppress one from the other
- Never recommend running overlapping audiences in the same campaign without acknowledging the auction competition impact

## Lookalike Recommendations

- Only recommend lookalikes from segments with 1,000+ seed size (Meta minimum for quality)
- Start with 1% lookalike for highest-value seeds
- Expand to 3% and 5% only after 1% is validated
- Always recommend excluding the source audience from the lookalike campaign

## Demographic Analysis

- Group by: Age bracket (18-24, 25-34, 35-44, 45-54, 55-64, 65+), Gender (M/F/All)
- Report CPA and ROAS per demographic cell
- Flag any demographic with 2x+ CPA variance from average
- Do NOT recommend excluding demographics with <$100 spend (insufficient data)

## Output Rules

- Always present a ranked segment table with key metrics
- Include both performance (ROAS/CPA) and scale (spend/conversions) metrics
- Recommendations must be platform-specific (Meta vs. Google targeting actions)
- Never recommend audience sizes without noting minimum viable daily budget ($20/day minimum per audience)

## Constraints

- Do not modify source data files
- Do not access Meta Audience Insights API directly (data must be provided)
- Do not recommend interest targeting without data support (no guessing)
- If customer list data contains PII, note that it should be hashed before upload to any platform
