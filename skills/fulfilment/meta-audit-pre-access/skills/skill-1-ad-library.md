# SKILL 1: Ad Library Catalog

## When to use

After Skill 0 confirms the Ad Library URL is available.

## What to do

### Step 1: Fetch the Ad Library

Navigate to the Meta Ads Library URL using Chrome DevTools MCP:

1. Use `navigate_page` to load the Ad Library URL
2. Use `take_snapshot` to capture the page content
3. Scroll down and take additional snapshots until all active ads are captured
4. Extract all active ads from the snapshot data

If the Ad Library is inaccessible via Chrome DevTools, fall back to web search for the brand's active ads and note the limitation.

### Step 2: Structure the Ad Library data

Produce a table of all active ads found:

| Ad # | Start Date | Days Active | Format | Duration (video) | Multiple Versions? | Primary Copy (first 2 sentences) | Headline | CTA | Landing Page URL |
|---|---|---|---|---|---|---|---|---|---|

**Format classification:**
- **Video**: Has a play button and duration indicator
- **Static/Image**: No video controls present
- **Carousel**: Multiple cards visible with navigation arrows

**Copy extraction:**
- Primary Copy = the main ad body text (first 2 sentences)
- Headline = the bold text in the link preview area
- CTA = the button text (e.g., "Shop Now", "Learn More")

### Step 3: Map messaging angles

Group ads by messaging angle using the taxonomy from rules.md:

| Messaging Angle | # of Active Ads | Sample Copy | Assessment |
|---|---|---|---|

Assessment = one sentence on whether this angle appears strong, over-indexed, or underutilized based on volume and recency.

### Step 4: Extract landing page URLs

Compile a unique list of all landing page URLs found across active ads:

| Landing Page URL | # of Ads Pointing Here | Ad Formats Using It | Primary CTA on Page |
|---|---|---|---|

This feeds into Skill 4 (Website Review).

## Output format

1. **Ad Library Summary Table** (all active ads)
2. **Messaging Angle Breakdown** (grouped table with assessment)
3. **Landing Page URL List** (for Skill 4)

## Next step

Proceed automatically to Skill 2 (Creative Analysis).
