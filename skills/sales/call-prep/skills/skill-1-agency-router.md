# SKILL 1: Agency Router

## When to use

After Skill 0 has completed and `CALL_PREP_CONTEXT` is assembled.

## What to do

### Step 1: Check skip condition

If `skip_audit = true`:
- Log: "Audit already deployed at {existing_audit_url}. Skipping audit pipeline."
- Fetch the existing audit page using `WebFetch` on `existing_audit_url` and extract the key sections (market snapshot, creative analysis, product page review, quick wins, testing roadmap). Store these as best-effort `MARKET_SNAPSHOT_OUTPUT`, `META_AUDIT_OUTPUT`, `PRODUCT_PAGE_OUTPUT`, and `SYNTHESIS_OUTPUT`.
- Jump directly to Skill 2.

### Step 2: Route by agency

Execute the shared prospect-audit skills sequentially, passing `domain` from `CALL_PREP_CONTEXT`:

1. `../prospect-audit/skills/skill-0-discovery.md`
2. `../prospect-audit/skills/skill-1-market-snapshot.md`
3. `../prospect-audit/skills/skill-2-meta-audit.md`
4. `../prospect-audit/skills/skill-3-social-audit.md`
5. `../prospect-audit/skills/skill-4-product-page.md`
6. `../prospect-audit/skills/skill-5-synthesis.md` -- **SKIP the approval gate.** Proceed immediately.
7. `../prospect-audit/skills/skill-6-deploy.md` -- deploys to Vercel, captures URL. Use the brand variant matching the Agency value (see prospect-audit README "Branding variants").

### Step 3: Skip email delivery

Do NOT execute Skill 7 (email) from the prospect-audit pipeline. This is call prep, not lead outreach.

### Step 4: Update Notion with audit URL

After deploy completes, capture the Vercel deployment URL. Use `notion-update-page` to set the `Prospect Audit` property on the CRM page to the deployed URL. Also set `Meta Ads Library` if it was found in discovery.

### Step 5: Progress update

> "Audit deployed for **{company_name}**: {vercel_url}. Notion updated. Moving to talking points."

## Error handling

- Shared skill hard stops (no website, no Meta ads): STOP the entire call-prep workflow
- Vercel deploy fails: Retry once, then provide local file path
- Notion update fails: Report the Vercel URL manually, continue to Skill 2

## Next step

Proceed to Skill 2: Talking Points.
