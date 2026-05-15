# Creative Refresh Playbook

## When to use
Creative fatigue signals detected: high frequency, declining CTR, rising CPA on previously winning ads.

## Fatigue Detection Thresholds

| Signal | Watch Level | Action Level |
|---|---|---|
| Frequency (Prospecting) | >= 3.0 | >= 4.0 |
| Frequency (Retargeting) | >= 6.0 | >= 9.0 |
| CTR decline (WoW) | >= 15% drop | >= 25% drop |
| Thumb-stop rate decline | >= 15% drop | >= 25% drop |
| CPA increase (WoW) | >= 15% rise | >= 25% rise |
| Creative age | >= 2 weeks | >= 4 weeks |

## Refresh Strategy

### Tier 1: Quick Refresh (24-48 hours)
Minimal effort, maximum speed. Use when fatigue is early-stage.

- **New headline/hook on same creative:** Keep the winning visual, swap the text overlay
- **Color/layout variation:** Same angle, different visual treatment
- **CTA swap:** Test different calls to action on the winning creative
- **Aspect ratio variation:** Convert feed (4:5) winner to story (9:16) or vice versa

### Tier 2: Angle Iteration (2-3 days)
Moderate effort. Use when the winning angle still resonates but the execution is stale.

- **Same angle, new execution:** Same messaging, completely new visual/creative
- **Testimonial swap:** New customer quote/video on the same social proof angle
- **Format change:** Static winner → video version (or vice versa)
- **UGC version:** Professional creative → UGC-style recreation

### Tier 3: New Angle Launch (3-5 days)
Full creative brief needed. Use when the winning angle is exhausted.

- **New messaging angle:** Different pain point, benefit, or emotional trigger
- **Competitive angle:** Pivot to comparison or differentiation messaging
- **Seasonal/topical hook:** Tie to current events, season, or trending topic
- **Audience-specific creative:** Same product, different audience-tailored messaging

## Refresh Cycle Cadence

| Account Size | Recommended Refresh Frequency | New Variants Per Cycle |
|---|---|---|
| <$10K/mo spend | Every 3-4 weeks | 3-5 variants |
| $10-50K/mo spend | Every 2-3 weeks | 5-8 variants |
| $50-250K/mo spend | Every 1-2 weeks | 8-15 variants |
| $250K+/mo spend | Weekly | 15-25 variants |

## Process

1. Identify fatiguing ads (from weekly report fatigue signals)
2. Determine refresh tier based on fatigue severity
3. Extract winning elements from the fatiguing ad (hook, visual style, copy angle)
4. Feed to `creative-brief-generator` skill with winning elements as input
5. Generate new variants via `creative-generator` skill
6. Launch new variants alongside (not replacing) fatiguing ads
7. Cut fatiguing ads only after new variants have 48-72 hours of data
