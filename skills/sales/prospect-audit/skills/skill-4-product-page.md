# SKILL 4: Product Page Review

## When to use

After Skill 3 has completed. Uses `product_page_url` from PROSPECT_CONTEXT.

If no product page was found in Skill 0, review the homepage instead.

## What to do

### Step 1: Navigate to the product page

Use Chrome DevTools MCP to navigate to `product_page_url` (or homepage fallback). Take a snapshot of the full page.

If Chrome DevTools MCP is unavailable, use WebFetch.

### Step 2: Assess ad-to-page message match

Compare the messaging angles found in the Meta ads (from Skill 2) against what's presented on the product page:

- Do the ads promise something the page delivers?
- Is the page optimized for the same audience the ads target?
- Is there a clear connection between ad copy and page headline/hero?

Rate as **Strong Match** or **Weak Match** with specific evidence.

### Step 3: Trust signals audit

Check for the presence of each trust signal:

| Trust Signal | Present? | Notes |
|---|---|---|
| Star rating / review count above the fold | Yes/No | |
| Total review count visible | Yes/No | |
| Individual review snippets | Yes/No | |
| "As seen in" / press logos | Yes/No | |
| Money-back guarantee or return policy | Yes/No | |
| Shipping information (free shipping, timeline) | Yes/No | |
| Size/fit guidance (if applicable) | Yes/No | |
| Quality callouts (materials, ingredients, process) | Yes/No | |
| Social proof count ("X customers", "X sold") | Yes/No | |
| Founder/brand story accessible | Yes/No | |

### Step 4: CTA assessment

- Is the primary CTA clear and prominent?
- Is there a secondary CTA (e.g., "Learn More", "See Details")?
- Is the CTA above the fold?
- Does the CTA text match the ad's CTA?

### Step 5: Generate 3-5 quick wins

Based on the review, identify 3-5 specific, actionable improvements:

Each quick win must be:
- **Specific**: "Add a star rating with review count above the fold on this product page" (not vague "improve social proof")
- **Actionable**: Something they can do this week
- **Impactful**: Explain why it matters (conversion lift, trust, reducing friction)

### Step 6: Add teaser

After the quick wins:
> "Our full website audit covers your entire funnel -- homepage, collection pages, cart, and checkout. We analyze page speed, mobile experience, conversion flow, and message match across every touchpoint. Book a strategy call to see the complete analysis."

### Step 7: Capture output

Store the full review as `PRODUCT_PAGE_OUTPUT`. Include:
- Page reviewed (URL)
- Message match assessment
- Trust signals table
- CTA assessment
- 3-5 quick wins
- Teaser

Do NOT present interim results to the user.

### Step 8: Progress update

Tell Brock:
> "Product page review complete. Moving to synthesis."

## Next step

Proceed to Skill 5: Synthesis & Report.
