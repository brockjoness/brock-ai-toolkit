# SKILL 1: Google Ads Transparency Center Catalog

## When to use

After Skill 0 confirms the Transparency Center URL or advertiser is identified.

## What to do

### Step 1: Fetch the Transparency Center

Navigate to the Google Ads Transparency Center page using Chrome DevTools MCP:

1. Use `navigate_page` to load the Transparency Center URL
2. Use `take_snapshot` to capture the page content
3. Scroll down and take additional snapshots until all visible ads are captured
4. Extract all active ads from the snapshot data

If the Transparency Center is inaccessible via Chrome DevTools, fall back to web search for the brand's active Google Ads and note the limitation.

### Step 2: Catalog all visible ads

Produce a table of all active ads found:

| Ad # | Format | Region | Start Date | Headlines | Descriptions | Display URL | CTA | Landing Page URL |
|---|---|---|---|---|---|---|---|---|

**Format classification:**
- **Search (Text):** Text ad with headlines and descriptions
- **Display (Image):** Image or responsive display ad
- **Video (YouTube):** Video ad (note thumbnail or description)
- **Shopping (Product):** Product listing with image and price

**Copy extraction (for Search text ads):**
- Headlines = all visible headline variations
- Descriptions = visible description text
- Display URL = the green URL shown in the ad
- CTA = if visible (e.g., "Shop Now", "Learn More", "Get Quote")

### Step 3: Analyze ad copy patterns

For Search text ads, group by messaging angle using the taxonomy from rules.md:

| Messaging Angle | # of Ads | Sample Headlines | Assessment |
|---|---|---|---|

Assessment = one sentence on whether this angle appears strong, overused, or underutilized.

For Display/Video ads, note:
- Visual themes and styles
- Messaging consistency with Search ads
- Format quality (professional vs basic)

### Step 4: Assess format diversity

| Format | # of Active Ads | % of Total | Assessment |
|---|---|---|---|

Assessment notes:
- Is the advertiser using multiple formats or just one?
- Are they running Shopping ads (should they be, given their business type)?
- Is YouTube/video present (opportunity if missing)?

### Step 5: Extract landing page URLs

Compile a unique list of all landing page URLs found across active ads:

| Landing Page URL | # of Ads Pointing Here | Ad Formats Using It |
|---|---|---|

This feeds into Skill 2 (Website Audit).

## Output format

1. **Ad Catalog Table** (all active ads)
2. **Messaging Angle Breakdown** (grouped table with assessment)
3. **Format Diversity Assessment** (table with assessment)
4. **Landing Page URL List** (for Skill 2)

## Next step

Proceed automatically to Skill 2 (Website & Landing Page Audit).
