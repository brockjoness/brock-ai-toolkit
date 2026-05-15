# SKILL 6: Landing Page Analysis

## When to use

After Performance Diagnostics (Skill 5). Only run if landing page URLs are available in the ad data or the user provides the brand's website URL.

If no landing page data is available, skip to Skill 7 (Action Plan).

## What to do

### Subsection 1: Landing Page Performance Table

Extract all unique landing page URLs from the ad data. Produce:

| Landing Page | # of Ads | Total Spend | Avg ROAS | Best Performer (Ad Name, ROAS) | Worst Performer (Ad Name, ROAS) |
|---|---|---|---|---|---|

**Key Insight:** After the table, write 2-3 sentences explaining the pattern. Which pages convert best and why? Which underperform and why? (e.g., "Swim Collection and Sale pages convert best because they have clear occasion/urgency framing. Generic 'What's New' pages underperform because they lack emotional hooks.")

### Subsection 2: Message Match Audit

For the top 3-5 landing pages by spend, assess ad-to-page continuity.

Visit each page using Chrome DevTools MCP or WebFetch (if accessible).

**Strong Match Examples:**
For each strong match:
- **Ad:** [Ad name] -> [Landing Page]
- **Ad promise:** What the ad copy/visual promises
- **Page delivery:** What the page delivers
- **Match strength:** Why the continuity works
- **Conversion result:** ROAS and orders as proof

**Weak Match / Friction Flags:**
For each weak match:
- **Ad:** [Ad name] -> [Landing Page]
- **Mismatch:** Specific disconnect between ad promise and page delivery (e.g., "Ad targets grandmas with gifting angle. LP shows generic product grid without gift-framing, gift-wrap options, or grandma-specific messaging.")
- **Conversion result:** ROAS as evidence of the problem
- **Fix:** Specific recommendation (e.g., "Create 'Grandma's Favorites' LP with gift messaging, bundle options, gift-wrap add-ons, and 'Why grandmas love [Brand]' social proof.")

### Subsection 3: Conversion Path Notes (Conditional)

Only if Google Analytics data is available.

For the top landing pages, note:
- Bounce rate
- Time on page
- Scroll depth
- Exit points
- Cart abandonment rate (if available)

If GA data is not available, do not caveat -- simply omit this subsection silently. Recommend GA integration in the Action Plan if relevant.

## Output format

1. **Landing Page Performance Table** (with key insight)
2. **Message Match Audit** (strong matches + weak match friction flags with fixes)
3. **Conversion Path Notes** (if GA data available)

## Next step

Proceed automatically to Skill 7.
