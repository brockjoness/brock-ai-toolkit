# SKILL 0: Trigger & Context Pull

## When to activate

Start the pre-access audit workflow when **any** of the following occur:

1. The user says "pre-access audit", "prospect audit", "creative audit", or "Ad Library audit"
2. The user provides a Facebook Ad Library URL without performance data
3. The user provides a prospect/brand name and asks for a creative review
4. The user asks to analyze a brand's ads, website, or creative strategy without account data

## What to do

### Step 1: Pull client context from Notion

Search the Notion CRM (`YOUR_NOTION_CRM_COLLECTION_ID`) for the prospect:

1. Search by Company Name
2. Extract: Meta Ads Library URL, Website, Instagram, TikTok, Company Type, Top 3 Best Sellers, Content Sources
3. If no CRM entry exists, ask the user for: Ad Library URL, website URL, Instagram handle

### Step 2: Identify competitors

Ask the user: "Who are 1-2 key competitors we should compare against?"

If the user doesn't know or skips:
- Infer competitors from the brand's niche (use web search if needed)
- Or skip the competitor snapshot (Skill 3) and note: "Competitor analysis skipped -- can be added if competitor Ad Library URLs are provided."

### Step 3: Confirm inputs and proceed

State what you have:
- Ad Library URL: [URL or "needed"]
- Website: [URL or "not provided"]
- Instagram: [handle or "not provided"]
- Competitors: [names/URLs or "skipped"]
- Company Type: [type or "not specified"]

### Step 4: Begin the audit

Proceed through Skills 1-5 sequentially. Do not wait for further instructions after confirming inputs.

## Next step

Proceed automatically to Skill 1 (Ad Library Catalog).
