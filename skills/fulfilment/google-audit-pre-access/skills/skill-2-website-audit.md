# SKILL 2: Website & Landing Page Audit

## When to use

After Skill 1 has cataloged the Transparency Center ads and extracted landing page URLs. Also runs if the user provided a website URL directly.

## What to do

### Step 1: Identify pages to review

Prioritize in this order:
1. Landing pages linked from active ads (from Skill 1)
2. Homepage
3. Key product/service pages (inferred from brand type)

Review top 3-5 pages maximum. Focus on the most important ones, not exhaustive coverage.

### Step 2: Page-by-page review

For each landing page, navigate via Chrome DevTools MCP and assess:

**[Landing Page URL]**

- **Above-the-fold content:** What does the visitor see immediately? Is the value proposition clear within 3 seconds?
- **Headline alignment:** Does the page headline match the ad promise? (STRONG / WEAK match)
- **Primary CTA:** What is the main call-to-action? Is it clear, visible, and compelling?
- **Trust signals:** Reviews/ratings, security badges, guarantees, social proof, media logos
- **Mobile experience:** Does the layout appear mobile-optimized? (responsive, tap targets, load speed)
- **Conversion friction:** How many steps/clicks to convert? Form length? Required information?

### Step 3: Message match assessment

For each ad -> landing page combination, assess the continuity:

| Ad Headline/Promise | Landing Page Delivery | Match | Issue (if weak) |
|---|---|---|---|

**STRONG match:** Ad promise is immediately visible and reinforced on the landing page.
**WEAK match:** Ad says one thing, landing page says another (or buries the promise below the fold).

For weak matches, provide a specific fix:
- "Move the [X] offer above the fold"
- "Add the [specific claim from ad] to the hero section"
- "Create a dedicated landing page for [ad angle] instead of sending to the generic homepage"

### Step 4: SEO & technical signals

Quick assessment of observable signals:
- **Page title & meta description:** Relevant and compelling?
- **H1 tag:** Present, clear, keyword-relevant?
- **Structured data:** Any schema markup visible? (product schema, review schema, FAQ schema)
- **Page speed signals:** Does the page feel fast or sluggish on load?

### Step 5: Quick-win callouts

3-5 specific, actionable improvements:

For each:
- **What to fix:** The specific issue (be concrete)
- **Why it matters:** How it impacts conversions or ad quality (landing page experience component of Quality Score, bounce rate, conversion rate)
- **How to fix it:** The specific change to make

## Output format

1. **Landing Page Reviews** (page-by-page assessment)
2. **Message Match Assessment** (ad-to-page match table)
3. **SEO & Technical Signals** (quick summary)
4. **Quick-Win Recommendations** (3-5 actionable fixes)

## Next step

Proceed automatically to Skill 3 (Competitor Landscape).
