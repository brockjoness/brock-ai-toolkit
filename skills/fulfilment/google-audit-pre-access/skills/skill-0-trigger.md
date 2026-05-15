# SKILL 0: Trigger & Context Pull

## When to activate

Start the pre-access Google Ads audit workflow when **any** of the following occur:

1. The user says "google pre-access audit", "prospect google audit", "google ads review", or "transparency center audit"
2. The user provides a Google Ads Transparency Center URL without performance data
3. The user provides a prospect/brand name and asks for a Google Ads review
4. The user asks to analyze a brand's Google Ads presence, website, or search strategy without account data

## What to do

### Step 1: Pull client context from Notion

Search the Notion CRM (`YOUR_NOTION_CRM_COLLECTION_ID`) for the prospect:

1. Search by Company Name
2. Extract: Website, Company Type, Top 3 Best Sellers, Content Sources
3. If no CRM entry exists, ask the user for: website URL, Google Ads Transparency Center URL (or brand name to search), and 1-2 competitor names

### Step 2: Find the Transparency Center page

If the user provides a direct Transparency Center URL, use it.

If only a brand name is provided:
- Navigate to `https://adstransparency.google.com/` via Chrome DevTools MCP
- Search for the advertiser name
- Take a snapshot and identify the correct advertiser page
- If multiple results appear, ask the user to confirm the correct one

### Step 3: Identify competitors

Ask the user: "Who are 1-2 key competitors we should compare against?"

If the user doesn't know or skips:
- Infer competitors from the brand's niche (use web search if needed)
- Or skip the competitor snapshot (Skill 3) and note: "Competitor analysis skipped -- can be added if competitor information is provided."

### Step 4: Confirm inputs and proceed

State what you have:
- Google Ads Transparency Center: [URL or "searching by name"]
- Website: [URL or "not provided"]
- Competitors: [names/URLs or "skipped"]
- Company Type: [type or "not specified"]

### Step 5: Begin the audit

Proceed through Skills 1-4 sequentially. Do not wait for further instructions after confirming inputs.

## Next step

Proceed automatically to Skill 1 (Transparency Center Catalog).
