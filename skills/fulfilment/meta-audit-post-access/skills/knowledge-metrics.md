# Knowledge -- Metrics & Definitions

**Supported brands:** All D2C brands.

**Campaign types to always distinguish:**
- Prospecting (cold audience, interest/lookalike/broad)
- Retargeting (warm/engaged audience)
- ASC -- Advantage+ Shopping Campaigns (report separately; unique fields apply)
- Lead gen (no purchase data; do not compute ROAS)

**Key metrics -- map from whatever columns are present:**

| Metric | Definition | Fallback if missing |
|---|---|---|
| Spend | Total amount spent | Hard required -- stop if absent |
| Impressions | Total impressions served | Hard required |
| Reach | Unique accounts reached | Optional |
| Frequency | Impressions / Reach | Compute if both present |
| CPM | Spend / Impressions x 1000 | Compute if both present |
| CTR (link) | Link clicks / Impressions | Compute if both present |
| CPC (link) | Spend / Link clicks | Compute if both present; do not use all clicks |
| Thumb-Stop Rate | 3s video plays / Impressions | N/A for non-video; do not compute for static |
| Hook Rate | DO NOT use -- ambiguous; use Thumb-Stop Rate only | -- |
| Hold Rate | Video plays at 25% / 50% / 75% / 100% of duration | Optional; label quartile clearly |
| Add-to-Cart | ATC events | Optional proxy if purchases missing |
| Purchases | Purchase conversion events | Required for CPP and ROAS |
| CPP | Spend / Purchases | Do not compute if purchases absent |
| ROAS | Revenue / Spend | Do not compute if revenue absent |
| New vs. Returning | Requires pixel setup or ASC new customer ROAS field | Label "unavailable" if absent -- do not estimate |
