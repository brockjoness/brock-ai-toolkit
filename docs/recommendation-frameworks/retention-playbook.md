# Retention & Email Playbook

## When to use
Client has a retention gap: high acquisition cost, low repeat purchase rate, or inactive email/SMS list. Applies when Klaviyo, Hubspot, or similar email platform is in scope.

## Diagnostic: Is There a Retention Problem?

| Signal | Healthy | Warning | Problem |
|---|---|---|---|
| Repeat purchase rate | >30% | 15-30% | <15% |
| Average order frequency | >2x/year | 1-2x/year | 1x/year |
| Email list engagement | >25% open rate | 15-25% | <15% |
| Flow revenue % of total | >25% | 10-25% | <10% |
| Campaign revenue % of total | >15% | 5-15% | <5% |

## Core Email Flows (Must-Have)

### 1. Welcome Series (3-5 emails)
- **Email 1 (Immediate):** Discount delivery + brand story
- **Email 2 (Day 1):** Product education / how to use
- **Email 3 (Day 3):** Social proof / reviews
- **Email 4 (Day 5):** Objection handling
- **Email 5 (Day 7):** Urgency / discount expiration

**Benchmark:** 40-60% open rate, 5-10% conversion rate

### 2. Abandoned Cart (3 emails)
- **Email 1 (1 hour):** "You left something behind" + cart contents
- **Email 2 (24 hours):** Social proof + urgency
- **Email 3 (48 hours):** Discount incentive (if margin allows)

**Benchmark:** 40-50% open rate, 5-15% conversion rate

### 3. Browse Abandonment (2 emails)
- **Email 1 (4 hours):** "Still looking?" + viewed products
- **Email 2 (24 hours):** Related products + social proof

**Benchmark:** 30-40% open rate, 2-5% conversion rate

### 4. Post-Purchase (3-4 emails)
- **Email 1 (Immediate):** Order confirmation + what to expect
- **Email 2 (Day 3-5):** How to get the most out of your purchase
- **Email 3 (Day 14-21):** Review request
- **Email 4 (Day 30-45):** Replenishment reminder (if consumable)

**Benchmark:** 50-70% open rate, 1-3% review submission rate

### 5. Winback (3 emails)
- **Email 1 (60 days inactive):** "We miss you" + what's new
- **Email 2 (75 days):** Exclusive offer / discount
- **Email 3 (90 days):** "Last chance" + sunset warning

**Benchmark:** 15-25% open rate, 1-3% conversion rate

### 6. Sunset Flow
- **Trigger:** 120+ days inactive, no engagement with winback
- **Action:** Move to suppression list (stop sending)
- **Purpose:** Protect deliverability and list health

## Campaign Strategy

### Weekly/Bi-weekly campaigns
- **Content mix:** 60% value/education, 30% product/offer, 10% brand story
- **Segmentation:** Engaged (opened in 90 days) vs. All subscribers
- **A/B test:** Subject lines on every send (min 20% of list)

### Campaign calendar
- **Monday:** New arrivals / product education
- **Wednesday:** Content / tips / UGC
- **Friday:** Promotions / offers (if running)

## Klaviyo-Specific Recommendations

### Predictive analytics (built-in)
- **Expected date of next order:** Use for replenishment flow timing
- **Predicted CLV:** Segment VIPs (top 20% by predicted CLV) for exclusive treatment
- **Churn risk:** High churn risk → trigger winback flow earlier

### Segmentation strategy
| Segment | Definition | Use For |
|---|---|---|
| VIPs | Top 20% by revenue or order count | Exclusive offers, early access |
| At-risk | Purchased 60-90 days ago, no recent activity | Winback campaigns |
| New subscribers | Joined <30 days, haven't purchased | Welcome series optimization |
| Repeat buyers | 2+ purchases | Loyalty messaging, referral asks |
| One-time buyers | 1 purchase, 30+ days ago | Repurchase nudge |

## Integration with Paid Ads

- Upload Klaviyo segments as Meta Custom Audiences for retargeting
- Exclude recent purchasers (7-14 days) from prospecting campaigns
- Use email engagement data to build high-intent lookalike audiences
- Sync suppressed/unsubscribed contacts to exclusion lists
