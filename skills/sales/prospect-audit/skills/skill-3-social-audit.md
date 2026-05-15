# SKILL 3: Organic Social Audit

## When to use

After Skill 2 has completed. Uses `instagram_url` and `tiktok_url` from PROSPECT_CONTEXT.

If both are "not found", note the absence as an opportunity in the output and proceed immediately to the next skill. Do NOT stop the workflow.

## What to do

### Step 1: Determine which platforms to audit

Check PROSPECT_CONTEXT:
- If `instagram_url` exists and is not "not found" -- audit Instagram
- If `tiktok_url` exists and is not "not found" -- audit TikTok
- If neither exists -- skip to Step 4 (no-presence output)

### Step 2: Audit Instagram (if available)

Use Chrome DevTools MCP to navigate to `instagram_url`. Take a snapshot of the full profile page.

If Chrome DevTools MCP is unavailable or hits a login wall, use WebFetch to load the profile page. If that also fails, note "Instagram profile could not be loaded for public review" and skip to TikTok.

From the visible profile page, assess:

**Profile:**
- Bio: Is it clear, compelling, and aligned with the brand? Does it include a CTA or link?
- Follower count (approximate from what's visible)
- Following-to-follower ratio (healthy or inflated?)

**Content Grid (visible recent posts -- do NOT click into individual posts):**
- Visual consistency: Is there a cohesive look (colors, style, quality)?
- Content types visible: Static photos, carousels (indicated by icon), Reels (indicated by icon), graphics
- Posting frequency: Estimate from visible post dates or grid density
- Content variety: All product shots, or a healthy mix (lifestyle, UGC, educational, behind-the-scenes)?
- Brand-product alignment: Does the content reinforce what the website and ads are selling?

**Overall:** Rate as Strong / Moderate / Weak with a one-sentence justification.

### Step 3: Audit TikTok (if available)

Use Chrome DevTools MCP to navigate to `tiktok_url`. Take a snapshot of the full profile page.

If Chrome DevTools MCP is unavailable, use WebFetch. If that also fails, note "TikTok profile could not be loaded for public review" and skip.

From the visible profile page, assess:

**Profile:**
- Bio: Clear and aligned with brand?
- Follower count and likes count (visible on profile)

**Content Grid (visible recent videos -- do NOT click into individual videos):**
- Posting frequency: Estimate from visible video dates or grid density
- Content types: Product demos, trends, UGC-style, educational, behind-the-scenes
- Thumbnail quality: Intentional or random frames?
- View counts (visible on thumbnails): Any standout performers vs. consistent low views?

**Overall:** Rate as Strong / Moderate / Weak with a one-sentence justification.

### Step 4: Identify opportunities and capture output

**If neither platform exists**, generate:

```
SOCIAL_AUDIT_OUTPUT:

## Organic Social Presence

{company_name} does not currently have a discoverable Instagram or TikTok presence linked from their website.

### Opportunity

Organic social is a significant untapped channel. Brands in this category use Instagram and TikTok to:
- Repurpose top-performing ad creative as organic content (extends ROI on production spend)
- Build community and social proof that strengthens paid ad performance
- Test messaging angles organically before investing ad spend

This is a clear growth opportunity we would address in a full engagement.
```

**If one or both platforms were audited**, identify 2-3 specific opportunities. Each must be:
- **Specific**: Reference something observed (e.g., "Your Instagram grid is entirely product shots, but your top Meta ad angle is lifestyle/identity -- repurposing that angle organically would reinforce the message")
- **Connected**: Tie back to Meta audit or market snapshot findings where possible
- **Actionable**: Something they can start doing this week

Then generate:

```
SOCIAL_AUDIT_OUTPUT:

## Organic Social Audit

### Instagram [if audited]
**Profile:** [1-2 sentence assessment of bio, follower count, profile quality]
**Content:** [2-3 sentence assessment of grid quality, consistency, variety, frequency]
**Overall:** [Strong/Moderate/Weak] -- [one-sentence justification]

### TikTok [if audited]
**Profile:** [1-2 sentence assessment]
**Content:** [2-3 sentence assessment of content types, frequency, view performance]
**Overall:** [Strong/Moderate/Weak] -- [one-sentence justification]

### Opportunities
1. [Specific opportunity with connection to other audit findings]
2. [Specific opportunity]
3. [Specific opportunity, if applicable]
```

After the opportunities, add the teaser:
> "Organic social is a force multiplier for paid media. Our full engagement includes a content strategy that turns your best-performing ad creative into a steady stream of organic content -- extending the ROI on every piece of production. Book a strategy call to see how it works."

Do NOT present interim results to the user.

### Step 5: Progress update

Tell Brock:
> "Social audit complete (Instagram: [audited/not found/blocked], TikTok: [audited/not found/blocked]). Moving to product page review."

## Error handling

- Instagram login wall or rate limit: note and skip to TikTok
- TikTok fails to load: note and skip
- Both platforms fail to load but URLs exist: note the URLs were found on the website but could not be reviewed publicly, skip the section entirely rather than generating a misleading "no presence" output
- Neither platform linked from website: use the no-presence output (Step 4)
- Never hard stop -- this skill always produces output and proceeds

## Next step

Proceed to Skill 4: Product Page Review.
