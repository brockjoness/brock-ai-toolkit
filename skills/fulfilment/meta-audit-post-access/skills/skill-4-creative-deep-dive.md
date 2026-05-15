# SKILL 4: Creative Deep Dive

## When to use

After the Executive Summary. This is the core analysis skill -- it merges winner/loser classification, creative asset analysis, copy mining, video/static deep dives, and Ad Library cross-reference into one unified section.

## What to do

### Subsection 1: Winner/Loser Classification

For each campaign bucket (Prospecting / Retargeting / ASC), rank all ads by ROAS descending.
Apply classification minimums and Winner/Loser/Middle thresholds from knowledge-thresholds.md.

Produce one table per bucket:

| Ad Name | Format | Spend | ROAS | Orders | CPP | CTR | Thumb-Stop | Frequency | Tier | Why It Works / Why It Fails |
|---|---|---|---|---|---|---|---|---|---|---|

The **"Why It Works / Why It Fails"** column is critical. For every ad:
- **Winners:** One sentence explaining the creative psychology -- what emotional/rational trigger, format choice, or copy pattern drives performance
- **Losers:** One sentence diagnosing the failure -- what specific creative element is failing and why (use hypothesis language if causation is unclear: "Likely: creative fails to stop scroll -- Thumb-Stop 8% vs. baseline 22%")
- **Middle:** Can be brief or omitted

Separate ads below minimum thresholds and label "Not enough data to classify -- monitoring."

### Subsection 2: Creative Patterns That Work

Analyze ALL winning ads (and creative assets if uploaded) to identify repeatable patterns:

**Winning Creative Patterns Summary:**

| Pattern Type | Observed in N Winners | Specific Examples | Why It Works |
|---|---|---|---|

For each pattern, include:
- What visual/copy/format elements define this pattern
- Which specific ads demonstrate it
- Why the psychology works (emotional trigger, rational benefit, format advantage)
- Replication guidance (how to create more in this pattern)

**Anti-Patterns (from Losers):**

| Anti-Pattern Type | Observed in N Losers | Specific Examples | Why It Fails |
|---|---|---|---|

### Subsection 3: Copy & Messaging Mining

Extract actual winning copy from top performers. Present as a reusable reference library.

**Working Headlines (from top performers):**

Group by type:
- **Emotional / Aspirational:** "[Exact headline]" -- Ad Name, ROAS X.XX -- Why: [one sentence]
- **Functional / Benefit-Driven:** "[Exact headline]" -- Ad Name, ROAS X.XX -- Why: [one sentence]
- **Urgency / Promo:** "[Exact headline]" -- Ad Name, ROAS X.XX -- Why: [one sentence]
- **Identity-Based:** "[Exact headline]" -- Ad Name, ROAS X.XX -- Why: [one sentence]

**Best Hooks (First 10 seconds of video / first line of copy):**
- Extract the actual opening lines from top-performing ads
- Group by hook type: UGC Testimonial, Emotional Storytelling, Problem-Solution, Contrarian/Insider, Direct Benefit
- For each: the exact words + why it works

**Value Prop Patterns:**
- What specific claims, benefits, or differentiators appear across winners?
- Which messaging themes resonate? (comfort, durability, convenience, milestone, community)

**CTA Analysis:**
- What CTA buttons are used? Distribution across winners vs. losers.
- Opportunity: test benefit-driven CTAs beyond "Shop Now"

### Subsection 4: Video Creative Deep Dive (Conditional)

Only if video ads exist in the data AND video metrics are available (3s plays, quartile views).

**Hook Analysis -- Best Performing Hooks:**

For each hook type that appears in top performers:
- **Hook type name** (e.g., "Emotional Text Overlay + Product Reveal")
- **Examples:** Which specific ads use this hook? Performance metrics.
- **Why it works:** Psychology of the hook
- **Editing guidance:** How to replicate -- shot composition, text overlay strategy, music/sound

**Retention & Pacing Patterns:**
- High-retention patterns (which ads hold viewers past 25%? What do they have in common?)
- Drop-off causes (where do viewers leave? What creative elements cause drop-off?)
- Fix guidance for each drop-off cause

**Production Guidance for Video Editors:**

**Shot Composition & Framing:**
- What camera angles work? (e.g., kid-level vs. top-down, close-ups for tactile products, parent POV)

**Text Overlay Strategy:**
- First 3 seconds: size, contrast, emotional vs. descriptive
- Mid-video signposting: guide the story with text
- CTA text in final 3 seconds

**Pacing & Cuts:**
- Optimal shot length for retention
- Match cuts for flow when showing multiple products
- Pacing build toward CTA

**Sound-Off Optimization:**
- Assume 80% watch muted
- Caption requirements
- Music as emotional cue

### Subsection 5: Static Creative Insights (Conditional)

Only if static ads exist in the data.

**Design Patterns That Work:**
- For each pattern: example ad, visual composition, why it works, replication guide

**Copy Integration Rules:**
- Headline placement & sizing (top-third, center, bottom)
- Font & contrast rules
- Call-out strategies (size labeling, fabric callouts, bundle savings)

### Subsection 6: Ad Library Cross-Reference (Conditional)

Only if a Facebook Ad Library URL was provided.

1. **Fetch Ad Library** via Chrome DevTools MCP
2. **Cross-reference** with performance data: which winners are still active? Which are retired (revival candidates)?
3. **Format mix & concentration risk**: Is the account over-reliant on one format, one angle, or one landing page?
4. **Gaps**: What's missing from the active set that should be tested?

Keep this subsection concise -- 3-5 key findings, not a full Ad Library audit (that's the pre-access audit's job).

## Output format

1. Winner/Loser Classification Tables (one per bucket, with "Why" column)
2. Winning Creative Patterns Summary + Anti-Patterns
3. Copy & Messaging Library (headlines, hooks, value props, CTAs)
4. Video Creative Deep Dive (if applicable -- hooks, retention, production guidance)
5. Static Creative Insights (if applicable -- design patterns, copy integration)
6. Ad Library Cross-Reference (if applicable -- key findings only)

## Next step

Proceed automatically to Skill 5.
