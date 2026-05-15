# SKILL 5: Performance Diagnostics

## When to use

After the Creative Deep Dive. This skill merges fatigue detection, audience insights, and root cause analysis into one unified diagnostics section.

## What to do

### Subsection 1: Fatigue Flags

Determine mode based on data availability (confirmed in Skill 1):

**Time-Series Mode** (if daily/weekly breakdown available):
- Flag an ad if CTR is declining for 2+ consecutive weeks WoW AND CPP is rising for 2+ consecutive weeks WoW (both conditions must be true)

**Snapshot Mode** (if only aggregate data available):
- Flag an ad if it meets 2 or more of:
  - Frequency at or above flag threshold for its audience type (per knowledge-thresholds.md)
  - Thumb-Stop Rate >20% below format-matched baseline (UGC vs. static vs. animation -- do not blend)
  - ROAS below baseline with spend >= $200

**Critical distinction:**
- "Creative fatigue" = was working, now declining. Only flag "fatigue" for ads that previously met or exceeded baseline and are now declining.
- "Never worked" = below baseline from day 1. These are misses, not fatigued ads.

**Two-tier frequency system:**
- Watch tier (Prospecting: >=3.0; Retargeting: >=6.0): "Watch -- approaching fatigue threshold"
- Flag tier (Prospecting: >=4.0; Retargeting: >=9.0): "Flag -- above fatigue threshold"

Produce a **Fatigue Flags Table** (keep it concise -- just the flagged ads with recommended actions):

| Ad Name | Campaign | ROAS | Frequency | Fatigue Signals | Recommended Action |
|---|---|---|---|---|---|

Recommended actions: Pause / Refresh opening line / Rotate to new audience / Test variant with new first 3 seconds / Monitor (for Watch-tier only)

### Subsection 2: Audience Insights (Conditional)

Only if demographic breakdowns are present (confirmed in Skill 1). If not present, skip silently.

**Age & Gender Analysis:**
Within each campaign bucket, produce:

| Segment | Spend | CPP | ROAS | Assessment |
|---|---|---|---|---|

Highlight the highest-ROAS and lowest-ROAS segments. Note any segment performing >20% above baseline that lacks tailored creative.

**Geo Analysis** (only if a location consumes >10% of budget with poor ROAS):
Flag underperforming geos. Skip full geo table unless there are actionable findings.

**Placement Analysis:**

| Placement | Spend | ROAS | Assessment |
|---|---|---|---|

Flag any placement consuming disproportionate budget relative to its ROAS contribution.

**New vs. Returning Customer Split** (if available):
Flag as "masking" if blended ROAS is above baseline but new customer ROAS is >20% below baseline. This indicates returning customers are inflating perceived efficiency while acquisition is underperforming.

### Subsection 3: Root Cause Analysis

For every ad classified as a Loser in Skill 4, perform root cause analysis.

**Group root causes by failure type** (not per-ad tables -- group for scannability):

**Creative Failures** (High CPM + Low CTR):
- Which ads? What's the common thread?
- Diagnosis: Creative is not stopping the scroll. Check Thumb-Stop Rate if available.
- Recommendation for the group

**Funnel Leaks** (Good CTR + Low Conversion Rate):
- Which ads? What's the common thread?
- Diagnosis: Clicks but no purchases. Check: landing page mismatch, offer clarity, checkout friction, wrong optimization event.
- Recommendation for the group

**Efficiency Drags** (Good Conversion + Low ROAS):
- Which ads? What's the common thread?
- Diagnosis: Converting but at poor efficiency. Check: AOV problem, attribution window discrepancy, audience overlap with retargeting.
- Recommendation for the group

For each group, include:
- **Evidence:** Specific metrics vs. baselines
- **Hypothesis:** Most likely cause
- **Recommendation:** Exact change to make
- **Owner:** Media Buyer / Creative / Dev
- **Priority:** High / Med / Low

**Measurement note:** If integrity concerns exist (attribution window inconsistencies, pixel issues), flag once here: "Measurement integrity note: [specific concern]. Root cause conclusions are directional until resolved." Then move details to Appendix.

## Output format

1. **Fatigue Flags Table** (flagged ads with recommended actions)
2. **Audience Insights** (if demographic data available -- tables with assessments)
3. **Root Cause Analysis** (grouped by failure type: Creative Failures, Funnel Leaks, Efficiency Drags)

## Next step

Proceed automatically to Skill 6.
