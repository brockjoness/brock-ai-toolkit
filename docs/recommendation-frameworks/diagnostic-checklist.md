# Diagnostic Checklist

## When to use
ROAS is below target OR CPA is above target. Performance is declining or underperforming -- time to diagnose.

## Diagnostic Flow

Work through these in order. Stop when you find the root cause.

### 1. Data Quality Check
- [ ] Is attribution accurate? (check attribution window, CAPI status)
- [ ] Has the pixel fired correctly this week? (check Events Manager)
- [ ] Is there a reporting delay? (compare platform data vs. Shopify/GA4)
- [ ] Did the client make website changes? (new checkout, pricing changes, broken pages)

**If data issue found:** Fix attribution/tracking first. Do not optimize based on bad data.

### 2. Creative Health Check
- [ ] Frequency on top ads: >3.0 (prospecting) or >6.0 (retargeting)?
- [ ] CTR declined >20% WoW on any top-spend ad?
- [ ] Thumb-stop rate declining?
- [ ] How old is the top-spending creative? (>3 weeks = fatigue risk)

**If creative fatigue found:** → See `creative-refresh-playbook.md`

### 3. Audience Health Check
- [ ] Audience overlap between ad sets? (check Meta Audience Overlap tool)
- [ ] Lookalike audiences performing worse than broad? (may be over-targeted)
- [ ] Retargeting pool shrinking? (check 7-day, 30-day website custom audiences)
- [ ] New audience tests launched recently? (cold audiences need time to learn)

**If audience issue found:** Consolidate overlapping ad sets, refresh lookalike seeds, or expand targeting.

### 4. Budget & Bidding Check
- [ ] Was budget changed recently? (resets learning phase)
- [ ] Is the campaign in "Limited" learning status?
- [ ] Bid cap or cost cap set too low? (restricting delivery)
- [ ] Budget spread too thin across too many ad sets?

**If budget issue found:** Consolidate spend into fewer ad sets, remove bid caps, or wait for learning to complete.

### 5. External Factors
- [ ] Seasonality? (post-holiday, summer slowdown, back-to-school)
- [ ] Competitor activity spike? (check Ad Library for new competitor ads)
- [ ] Platform changes? (iOS updates, Meta algorithm changes, policy changes)
- [ ] Market shift? (category demand declining, macro economic factors)

**If external factor found:** Adjust expectations, pivot strategy, or wait it out.

### 6. Landing Page Check
- [ ] Page load speed degraded? (>3 seconds = significant drop-off)
- [ ] Mobile experience broken? (test on actual device)
- [ ] Message match between ad and landing page? (same hook, same offer)
- [ ] Checkout friction increased? (new steps, removed payment options)

**If landing page issue found:** Fix the page before optimizing ads. Ads can't fix a broken funnel.

## Action Priority Matrix

| Root Cause | Urgency | Action |
|---|---|---|
| Tracking broken | Immediate | Fix before any optimization |
| Creative fatigue | This week | Launch new creative tests |
| Audience saturation | This week | Expand targeting, refresh lookalikes |
| Budget misallocation | This week | Consolidate, reallocate |
| Landing page issue | This week | Fix page, then retest |
| Seasonality/external | Monitor | Adjust targets, ride it out |
