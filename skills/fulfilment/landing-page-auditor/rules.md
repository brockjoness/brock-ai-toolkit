# Landing Page Auditor -- Rules

## Data Source

Current input: Landing page URL(s) provided manually + optional ad creative for message-match scoring. Future: Will query Supabase client_metrics table directly when data pipeline is operational (for conversion rate benchmarks and historical page performance).

## Audit Dimensions & Scoring

Each dimension is scored 1-5:
- **1:** Critical issue -- actively harming conversions
- **2:** Poor -- significant improvement needed
- **3:** Acceptable -- functional but leaving conversions on the table
- **4:** Good -- well-executed with minor optimization opportunities
- **5:** Excellent -- best-in-class execution

### 1. Page Load Speed (Weight: High)
- Fetch the page and assess load behavior
- Score based on perceived and actual load time
- Flags: large unoptimized images, render-blocking scripts, excessive third-party tags
- Benchmark: pages loading >3 seconds lose ~50% of mobile visitors

### 2. Mobile Responsiveness (Weight: High)
- Evaluate layout, text size, tap targets, and scroll behavior on mobile viewport
- Check for horizontal scroll, overlapping elements, unreadable text
- D2C traffic is 60-80% mobile -- this is non-negotiable

### 3. Above-the-Fold Content (Weight: High)
- Does the hero section communicate the value proposition in under 5 seconds?
- Is there a clear headline that matches visitor intent?
- Is there a primary CTA visible without scrolling?
- Is there a supporting visual (product image, lifestyle shot, video)?

### 4. Message Match (Weight: High -- requires ad creative)
- Compare the ad headline/copy to the landing page headline/copy
- Score based on continuity: does the page deliver what the ad promised?
- Check: same offer, same language, same visual style, same product
- Mismatch = visitor confusion = bounce

### 5. Trust Signals (Weight: Medium)
- Reviews/testimonials present and visible?
- Trust badges (secure checkout, money-back guarantee, certifications)?
- Social proof (number of customers, ratings, media mentions)?
- Real brand identity (not a generic template feel)?

### 6. CTA Clarity & Frequency (Weight: High)
- Is the primary CTA clear and specific (not just "Submit" or "Learn More")?
- Is the CTA repeated at logical scroll intervals?
- Does the CTA button stand out visually from the page?
- Is there a single clear primary action (not competing CTAs)?

### 7. Form Friction (Weight: Medium)
- How many form fields? (fewer = better for top-of-funnel)
- Multi-step or single-step?
- Are required fields clearly marked?
- Is there unnecessary friction (phone number required, CAPTCHA, account creation)?

### 8. Social Proof Placement (Weight: Medium)
- Are testimonials/reviews placed near decision points (near CTA, near pricing)?
- Is social proof specific (names, photos, specific results) or generic?
- Is there video social proof (higher impact)?
- Volume of proof (1 review vs. "10,000+ customers")?

### 9. Urgency/Scarcity Elements (Weight: Low-Medium)
- Are there time-limited offers, countdown timers, or stock indicators?
- Are urgency elements authentic (not fake scarcity)?
- Is urgency balanced (motivating, not pushy)?

### 10. Navigation (Weight: Medium)
- Does the landing page minimize or remove site navigation?
- Good landing pages reduce exit paths to keep focus on conversion
- Exception: product pages within a store (nav expected)
- Score based on context: standalone LP vs. product page vs. homepage

## Output Format

### Audit Scorecard

```
--- LANDING PAGE AUDIT ---

Client: {Client Name}
URL: {landing page URL}
Date: {audit date}
Ad creative provided: {Yes / No}

OVERALL SCORE: {X.X} / 5.0 ({rating: Poor / Below Average / Average / Good / Excellent})

DIMENSION SCORES:
  1. Page Load Speed:       {X}/5 -- {one-line finding}
  2. Mobile Responsiveness: {X}/5 -- {one-line finding}
  3. Above-the-Fold:        {X}/5 -- {one-line finding}
  4. Message Match:         {X}/5 -- {one-line finding} (or "N/A -- no ad creative provided")
  5. Trust Signals:         {X}/5 -- {one-line finding}
  6. CTA Clarity:           {X}/5 -- {one-line finding}
  7. Form Friction:         {X}/5 -- {one-line finding}
  8. Social Proof:          {X}/5 -- {one-line finding}
  9. Urgency/Scarcity:      {X}/5 -- {one-line finding}
  10. Navigation:           {X}/5 -- {one-line finding}

TOP 3 PRIORITIES (highest impact fixes):
  1. {Finding + specific recommendation + expected impact}
  2. {Finding + specific recommendation + expected impact}
  3. {Finding + specific recommendation + expected impact}
```

### Detailed Findings (per dimension)
For each dimension scoring 3 or below:
- **Current state:** what the page does now
- **Problem:** why this hurts conversions
- **Recommendation:** specific change to make
- **Priority:** Critical / High / Medium / Low
- **Expected impact:** estimated conversion rate lift or qualitative improvement

## Scoring Calculation

- Overall score: weighted average of all dimensions
- If Message Match is N/A (no ad creative), exclude from average and note it
- Weights: High = 3x, Medium = 2x, Low-Medium = 1x

## Formatting Rules

- No emojis
- No em dashes
- Scores: always X/5 format
- URLs: displayed in full
- Recommendations: numbered and prioritized
- Use specific page element references ("the hero headline", "the Add to Cart button", "the form on the pricing section")

## HTML Report (Optional)

When requested, generate an HTML audit report using:
- Color-coded scores (1-2: red, 3: yellow, 4-5: green)
- Screenshot-style annotations where relevant
- Uses dark theme base styles from `2-onboarding/skills/pre-onboarding/templates/_base-styles.html`
- Agency branding injected from `agencies/{slug}/brand.md`
