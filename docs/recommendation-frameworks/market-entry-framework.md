# Market Entry Testing Framework

## When to use
Client is entering a new market, launching a new product line, or expanding to a new platform. No historical performance data to guide strategy.

## Phase 1: Research (Days 1-3)

### Inputs needed
- Target market definition (geography, demographics, psychographics)
- Product/offer to test
- Budget allocation for testing phase
- Success criteria (target CPA, ROAS, or lead volume)

### Actions
1. Run `competitor-research` skill for the target market
2. Analyze competitor ad libraries in the new market
3. Identify 3-5 messaging angles from research
4. Generate creative briefs via `creative-brief-generator`

## Phase 2: Foundation Build (Days 3-5)

### Campaign structure for new market entry

| Campaign | Objective | Audience | Budget Split |
|---|---|---|---|
| **Broad prospecting** | Conversions | Broad targeting (geo + age/gender only) | 40% |
| **Interest-based** | Conversions | 3-5 interest stacks relevant to market | 30% |
| **Lookalike** (if seed available) | Conversions | 1%, 3%, 5% lookalikes | 20% |
| **Retargeting** | Conversions | Site visitors, engagers | 10% |

### Creative mix for launch
- 3 messaging angles x 2 formats (static + video) = 6 creatives minimum
- Each ad set gets all 6 creatives (let the algorithm find winners)
- No more than 3 ad sets per campaign at launch (consolidate for learning)

## Phase 3: Learning Phase (Days 5-12)

### Rules during learning
- **Do NOT touch budgets** for the first 7 days
- **Do NOT cut ads** until they have $200+ spend or 3+ purchases
- **Do NOT add new audiences** until initial audiences clear learning
- **Monitor daily** but only act on 7-day data

### Metrics to track
- CPA by messaging angle (which angle resonates?)
- CTR by format (static vs. video preference?)
- CVR by audience type (broad vs. interest vs. lookalike)
- CPM by geography/demographic (market-level cost signals)

## Phase 4: Optimize (Days 12-21)

### Decision framework

| Signal | Action |
|---|---|
| One angle clearly winning (>30% better CPA) | Scale winning angle, iterate with new executions |
| All angles similar performance | Continue testing, add new angles from research |
| All angles underperforming | Revisit offer/product-market fit, test pricing/promotions |
| Broad beating interest targeting | Lean into broad, cut narrowest audiences |
| High CTR but low CVR | Landing page issue -- fix before scaling |

### Iteration loop
1. Identify winning angle + audience combination
2. Scale winner by 20-30% budget increase
3. Create 3 new creative variants of winning angle
4. Test 1-2 new audiences based on learnings
5. Repeat every 5-7 days

## Phase 5: Steady State (Day 21+)

Once you have:
- 1-2 winning angles with consistent CPA
- 2-3 audiences delivering reliably
- Creative refresh pipeline active

Transition to standard weekly reporting cadence and normal optimization cycles.

## Budget Guidance

| Monthly Test Budget | Recommended Test Duration | Expected Learning |
|---|---|---|
| $3-5K | 3-4 weeks | Identify 1-2 viable angles |
| $5-15K | 2-3 weeks | Identify winning angle + audience |
| $15-50K | 1-2 weeks | Full funnel validation |
| $50K+ | 1 week | Rapid iteration possible |
