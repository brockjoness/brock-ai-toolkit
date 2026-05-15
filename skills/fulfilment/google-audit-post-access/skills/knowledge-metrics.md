# Knowledge -- Metrics & Definitions

**Supported verticals:** All D2C and lead generation brands.

**Campaign types to always distinguish:**
- Search - Brand (branded keyword campaigns)
- Search - Non-Brand (generic/category keyword campaigns)
- Shopping (standard Shopping campaigns)
- Performance Max (PMax campaigns -- report separately; unique fields apply)
- Display (Display Network campaigns)
- YouTube / Video (video campaigns)
- Demand Gen (Demand Gen campaigns)
- App (App campaigns -- rare for D2C)

**Key metrics -- map from whatever columns are present:**

| Metric | Definition | Fallback if missing |
|---|---|---|
| Spend (Cost) | Total amount spent | Hard required -- stop if absent |
| Impressions | Total impressions served | Hard required -- stop if absent |
| Clicks | Total clicks | Hard required -- stop if absent |
| CTR | Clicks / Impressions | Compute if both present |
| CPC | Spend / Clicks | Compute if both present |
| CPM | Spend / Impressions x 1000 | Compute if both present |
| Conversions | Total conversion events | Required for CPA and ROAS |
| Conversion Value | Total revenue from conversions | Required for ROAS |
| Conversion Rate | Conversions / Clicks | Compute if both present |
| CPA | Spend / Conversions | Do not compute if conversions absent |
| ROAS | Conversion Value / Spend | Do not compute if conversion value absent |
| Search Impression Share | Impressions / estimated eligible impressions | Optional; Search only |
| Search Lost IS (Budget) | Share of impressions lost due to budget | Optional; Search only |
| Search Lost IS (Rank) | Share of impressions lost due to ad rank | Optional; Search only |
| Quality Score | 1-10 keyword score | Optional; Search only |
| Landing Page Experience | Below Average / Average / Above Average | Optional; QS component |
| Ad Relevance | Below Average / Average / Above Average | Optional; QS component |
| Expected CTR | Below Average / Average / Above Average | Optional; QS component |
| View Rate | Video views / Impressions | Video/YouTube only |
| CPV | Spend / Video views | Video/YouTube only |
| Video Played To 25% | Quartile view count | Optional; Video only |
| Video Played To 50% | Quartile view count | Optional; Video only |
| Video Played To 75% | Quartile view count | Optional; Video only |
| Video Played To 100% | Quartile view count | Optional; Video only |
| Interaction Rate | Interactions / Impressions | Display/Video |
| All Conversions | Includes cross-device and view-through | Optional; note if used vs standard conversions |
