# SKILL 2: Meta Pre-Access Audit Adapter

## When to use

After Skill 1 (competitor research) has completed.

## Pre-check

Before running, check if `meta_ads_library` is available in CLIENT_CONTEXT.

**If missing:**
- Set `META_AUDIT_OUTPUT` to `"SKIPPED: No Meta Ads Library URL in CRM. Add the URL and re-run pre-onboarding to include the Meta audit."`
- Tell the user: "Meta audit skipped -- no Ad Library URL in CRM. Moving to Google audit."
- Skip to Skill 3.

**If present:** proceed with the audit.

## What to do

### Step 1: Load the existing meta pre-access audit skill

Read the following files from the standalone meta audit skill:
- `.claude/work-types/./fulfilment/meta-audit-pre-access/agent.md`
- `.claude/work-types/./fulfilment/meta-audit-pre-access/rules.md`
- `.claude/work-types/./fulfilment/meta-audit-pre-access/skills/skill-0-trigger.md`
- `.claude/work-types/./fulfilment/meta-audit-pre-access/skills/skill-1-ad-library.md`
- `.claude/work-types/./fulfilment/meta-audit-pre-access/skills/skill-2-creative-analysis.md`
- `.claude/work-types/./fulfilment/meta-audit-pre-access/skills/skill-3-competitor-snapshot.md`
- `.claude/work-types/./fulfilment/meta-audit-pre-access/skills/skill-4-website-review.md`
- `.claude/work-types/./fulfilment/meta-audit-pre-access/skills/skill-5-opportunities.md`
- `.claude/work-types/./fulfilment/meta-audit-pre-access/skills/final-output-assembly.md`

### Step 2: Execute the meta pre-access audit workflow

Run the full audit workflow using CLIENT_CONTEXT data:
- **Meta Ads Library URL**: `meta_ads_library`
- **Website**: `website`
- **Instagram**: `instagram`
- **Competitor names**: any identified in Skill 1's competitive landscape section

Follow the skill sequence: trigger > ad library catalog > creative analysis > competitor snapshot > website review > opportunities > final assembly.

### Step 3: Capture the output

Capture the full assembled audit report as `META_AUDIT_OUTPUT`.

Do NOT present interim results to the user.

### Step 4: Extract key metrics for the template

From the audit output, extract for template injection:
- `ad_count`: total number of active ads analyzed
- `competitors_reviewed`: names of competitors reviewed (or "None")

### Step 5: Provide progress update

Tell the user:
> "Meta creative audit complete. Moving to Google audit."

## Error handling

- If Chrome DevTools MCP is unavailable: set `META_AUDIT_OUTPUT` to `"SKIPPED: Chrome DevTools MCP unavailable. Cannot navigate Meta Ads Library."` and proceed.
- If the Ad Library URL returns no results: note this in the output and still proceed with whatever analysis is possible (website review, competitor snapshot).

## Next step

Proceed to Skill 3: Google Audit Adapter.
