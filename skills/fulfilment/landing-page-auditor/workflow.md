# Landing Page Auditor -- Workflow

## Trigger

Activated by:
- "Audit landing page for [Client]"
- "Landing page review for [URL]"
- "Check where the ads land for [Client]"
- "CRO audit for [Client]"
- "Review this landing page: [URL]"

## Skill Chain

```
Skill 0: Fetch & Parse Landing Page
    |
Skill 1: Evaluate Each Audit Dimension (1-10)
    |
Skill 2: Compute Scores & Prioritize Findings
    |
Skill 3: Generate Recommendations & Action Plan
    |
Skill 4 (optional): Build HTML Audit Report
```

## Before Starting

Confirm scope:
> "Auditing landing page for **{Client}**: `{URL}`. Ad creative provided for message match: {Yes / No}. Audit type: {full audit / quick scan}."

If multiple URLs provided:
> "Auditing {X} landing pages for **{Client}**. Running full CRO audit on each."

## Input

| Source | Format | What It Provides |
|---|---|---|
| Landing page URL | URL string | Page to audit (fetched via web fetch) |
| Ad creative | Image/text/URL (optional) | Headline, copy, visual for message-match scoring |
| Client context | `agencies/{slug}/clients/{slug}/context.md` (optional) | Brand info, target audience, product details |

### Minimum Required
- At least one landing page URL

## Context Flow

`AUDIT_CONTEXT` assembled in Skill 0:
- `client_name`, `agency_slug` (if available)
- `page_url`, `page_title`, `page_content` (fetched)
- `ad_creative` (headline, body copy, image description -- if provided)
- `page_type` (standalone LP, product page, homepage, collection page)
- `device_focus` (mobile-first assessment by default)

## Step-by-Step Execution

### Step 0: Fetch & Parse
1. Fetch the landing page URL using web fetch
2. Parse the page structure: identify hero section, headlines, CTAs, forms, images, navigation, trust elements, social proof, urgency elements
3. Identify page type (standalone LP, product page, homepage)
4. If ad creative is provided, extract headline, body copy, and visual description for message-match analysis
5. Note any fetch errors (page down, redirect chains, slow response)

### Step 1: Evaluate Each Dimension
For each of the 10 audit dimensions per rules.md:

1. **Page Load Speed:**
   - Note response time from fetch
   - Check for large images, excessive scripts, third-party tag bloat
   - Score 1-5 per rules.md criteria

2. **Mobile Responsiveness:**
   - Evaluate layout structure for mobile viewport compatibility
   - Check text sizing, tap target spacing, horizontal scroll risk
   - Score 1-5

3. **Above-the-Fold Content:**
   - Identify the hero section: headline, sub-headline, CTA, visual
   - Assess whether value proposition is clear within 5 seconds
   - Check if primary CTA is visible without scrolling
   - Score 1-5

4. **Message Match (if ad creative provided):**
   - Compare ad headline to page headline
   - Compare ad offer/promise to page content
   - Check visual continuity (ad imagery vs. page imagery)
   - Score 1-5, or mark N/A if no ad creative

5. **Trust Signals:**
   - Scan for reviews, testimonials, trust badges, guarantees
   - Assess prominence and placement
   - Score 1-5

6. **CTA Clarity & Frequency:**
   - Identify all CTAs on the page
   - Assess primary CTA clarity, specificity, and visual prominence
   - Check CTA repetition at scroll intervals
   - Score 1-5

7. **Form Friction:**
   - Count form fields, identify required vs. optional
   - Assess step count and complexity
   - Flag unnecessary friction (phone required, CAPTCHA, account creation)
   - Score 1-5 (if no form, score based on checkout flow complexity)

8. **Social Proof Placement:**
   - Identify all social proof elements and their placement relative to CTAs/decision points
   - Assess specificity (named testimonials vs. anonymous)
   - Score 1-5

9. **Urgency/Scarcity:**
   - Identify countdown timers, limited stock indicators, time-limited offers
   - Assess authenticity and balance
   - Score 1-5

10. **Navigation:**
    - Assess navigation presence and complexity
    - For standalone LPs: fewer nav options = better (keeps focus)
    - For product pages: appropriate nav expected
    - Score 1-5 based on page type context

### Step 2: Compute Scores & Prioritize
1. Calculate weighted overall score per rules.md formula
2. Rank findings by impact: dimensions scoring 1-2 are Critical, 3 is Medium, 4+ is Low priority
3. Identify top 3 highest-impact fixes
4. Cross-reference findings (e.g., slow load + poor mobile = compounding problem)

### Step 3: Recommendations & Action Plan
1. For each dimension scoring 3 or below, write a specific recommendation per rules.md format
2. Assign priority (Critical / High / Medium / Low)
3. Estimate expected impact (conversion rate lift or qualitative improvement)
4. Order recommendations by priority and expected impact
5. If message mismatch detected: flag as top priority (this is the fastest win for paid media)

### Step 4 (Optional): HTML Report
1. If requested, build HTML audit report per rules.md formatting
2. Color-code scores (red/yellow/green)
3. Apply agency branding if available
4. Deploy or deliver as standalone HTML

## Final Output

Present audit results directly in conversation:
> **Landing Page Audit -- {Client}**
> **URL:** `{URL}`
> **Overall Score: {X.X}/5.0 ({rating})**
>
> {Scorecard per rules.md format}
>
> **Top 3 Fixes (highest impact):**
> 1. {fix + expected impact}
> 2. {fix + expected impact}
> 3. {fix + expected impact}
>
> Options:
> 1. **Full detailed report** -- expand findings for all 10 dimensions
> 2. **HTML audit report** -- generate a shareable branded report
> 3. **Audit another page** -- run audit on a different URL for the same client
> 4. **A/B test hypotheses** -- generate specific test ideas based on findings

## Error Handling

- Page fails to load: report "Page unreachable -- HTTP {status code}. Verify URL is correct and page is live."
- Page redirects: note redirect chain and audit the final destination URL
- Page requires authentication: flag "Page is behind login -- cannot audit. Provide a public URL or screenshot."
- No ad creative provided: skip Message Match dimension, note in scorecard as N/A, reduce total weight
- Multiple URLs provided: audit each independently, then provide a comparative summary
- Page is a homepage (not a landing page): adjust Navigation scoring expectations, note "This is a homepage, not a dedicated landing page -- navigation is expected. Consider building a dedicated LP for paid traffic."
