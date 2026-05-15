# SKILL 2: Establish Baselines

## When to use

After Skill 1 confirms sufficient data is present.

## What to do

Segment the data into buckets:

- Prospecting (cold audience)
- Retargeting (warm/engaged audience)
- ASC (Advantage+ Shopping Campaigns)
- Lead gen (if present -- no purchase data)

If campaign objective or audience type is not labeled in the data, ask user how to segment. If user does not respond, proceed by inferring from campaign names and flag the inference.

**Campaign bucket inference patterns (use when explicit labels are absent):**

| Name Pattern (case-insensitive) | Inferred Bucket |
|---|---|
| TOF, Top of Funnel, Prospecting, Cold, Broad, Interest, Lookalike, LAL, Acquisition | Prospecting |
| BOF, Bottom of Funnel, Retargeting, RT, Remarketing, Warm, Engaged, Site Visitors, ATC, Cart | Retargeting |
| ASC, Advantage+, Advantage Shopping, A+ | ASC |
| Lead, Lead Gen, Leads | Lead Gen |

**Fallback for ambiguous names:**
If campaign names do not match any pattern above (e.g., "Campaign 1", "Test 03", coded names), do NOT silently infer. Instead:
1. Present the full list of campaign names to the user
2. Ask: "I cannot determine audience type from these campaign names. Please classify each as Prospecting, Retargeting, ASC, or Lead Gen."
3. If user does not respond, treat ALL campaigns as a single "Unclassified" bucket, compute baselines on the blended set, and label: "Baselines are blended -- treat as directional. Segment-level analysis unavailable."

For each bucket, compute baselines for:

- CPM
- CTR (link)
- CPC (link)
- CPP (if purchases present)
- ROAS (if revenue present)
- Thumb-Stop Rate (if video data present -- video ads only)
- Frequency

Baseline source hierarchy (use the first available):

1. Rolling 30-day (or last 28 days) from account history if user provides it
2. Rolling 90-day if 30-day unavailable
3. The provided date range only -> label as "Period baseline -- treat as directional"

If industry benchmarks are relevant, state them alongside internal baselines for context. Always label which is which.

Produce a Baselines table:

| Bucket | Metric | Baseline Value | Source | Date Range |
|---|---|---|---|---|

## Output format

Baselines table, clearly segmented by campaign bucket.

## Next step

Proceed automatically to Skill 3.
