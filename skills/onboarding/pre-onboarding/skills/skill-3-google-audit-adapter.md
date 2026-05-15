# SKILL 3: Google Pre-Access Audit Adapter

## When to use

After Skill 2 (Meta audit) has completed or been skipped.

## What to do

### Step 1: Load the Google pre-access audit skill

Read the following files from the standalone Google audit skill:
- `.claude/work-types/./fulfilment/google-audit-pre-access/agent.md`
- `.claude/work-types/./fulfilment/google-audit-pre-access/rules.md`
- `.claude/work-types/./fulfilment/google-audit-pre-access/skills/skill-0-trigger.md`
- `.claude/work-types/./fulfilment/google-audit-pre-access/skills/skill-1-transparency-center.md`
- `.claude/work-types/./fulfilment/google-audit-pre-access/skills/skill-2-website-audit.md`
- `.claude/work-types/./fulfilment/google-audit-pre-access/skills/skill-3-competitor-landscape.md`
- `.claude/work-types/./fulfilment/google-audit-pre-access/skills/skill-4-opportunities.md`
- `.claude/work-types/./fulfilment/google-audit-pre-access/skills/final-output-assembly.md`

### Step 2: Execute the Google pre-access audit workflow

Run the full audit workflow using CLIENT_CONTEXT data:

- **Brand name**: `company_name`
- **Website**: `website`
- **Company Type**: `company_type`
- **Top 3 Best Sellers**: `best_sellers`
- **Google Ads ID**: `google_ads_id` (if available, for Transparency Center lookup)
- **Competitor names**: any identified from `call_notes` or from Skill 1's competitive landscape

Follow the skill sequence: trigger > transparency center catalog > website audit > competitor landscape > opportunities > final assembly.

The audit uses:
- Google Ads Transparency Center (via Chrome DevTools MCP)
- Website crawling for landing page analysis
- Competitor Transparency Center pages for comparison

### Step 3: Capture the output

Capture the full assembled audit report as `GOOGLE_AUDIT_OUTPUT`.

Do NOT present interim results to the user.

### Step 4: Extract key metrics for the template

From the audit output, extract for template injection:
- `google_ad_count`: total number of active ads observed
- `google_ad_formats`: formats detected (Search, Display, Video, Shopping)
- `google_competitors_reviewed`: names of competitors reviewed

### Step 5: Provide progress update

Tell the user:
> "Google audit complete. Moving to roadmap generation."

## Error handling

- If Chrome DevTools MCP is unavailable: set `GOOGLE_AUDIT_OUTPUT` to `"SKIPPED: Chrome DevTools MCP unavailable. Cannot navigate Google Ads Transparency Center."` and proceed.
- If no Google Ads presence is found for the brand in Transparency Center: note this in the output ("No active Google Ads detected") and still proceed with website audit and competitive analysis.

## Next step

Proceed to Skill 4: Roadmap Generator.
