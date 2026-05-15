# Call Prep Workflow

## Overview

Automates end-to-end sales call preparation. Reads a CRM page, runs the appropriate prospect audit, deploys to Vercel, writes talking points into Notion, and pings team chat.

## Activation Triggers

- `prepare for a call with {Notion page URL}`
- `call prep for {Notion page URL}`
- `prep call {Notion page URL}`

## Skill Chain

Execute these skills sequentially. Each skill depends on the previous one's output.

```
Skill 0: Notion Intake            (call-prep -- ./skills/)
    |
Skill 1: Agency Router            (delegates to shared prospect-audit skills 0-5)
    |     - if Prospect Audit field already populated → SKIP, jump to Skill 2
    |     - default brand variant → ../prospect-audit/skills/skill-6-deploy.md
    |     - secondary brand variant → ../prospect-audit/skills/skill-6-deploy.md (alt template)
    |     - SKIPS Skill 7 (email) — this is call prep, not lead delivery
    |
Skill 2: Talking Points           (call-prep -- ./skills/)
    |     - reads call notes from the Notion page body
    |     - cross-references with audit findings
    |     - writes structured talking points back into the Notion page
    |
Skill 3: Team Chat Notification   (call-prep -- ./skills/)
          - posts completion summary to your team channel
```

## Before starting

Confirm scope in one line:
> "Call prep for **{company_name}** ({agency}). Audit exists: [yes/no]. Running: {audit + talking points + chat ping / talking points + chat ping}."

## Skill files

**Call-prep-specific skills:**
- `skills/skill-0-notion-intake.md` -- Fetch CRM page, extract all fields, detect agency, check if audit already exists
- `skills/skill-1-agency-router.md` -- Route to correct audit pipeline, run shared skills 0-5, update Notion with audit URL
- `skills/skill-2-talking-points.md` -- Cross-reference call notes with audit outputs, write to Notion
- `skills/skill-3-chat-notify.md` -- Compose summary, post to your team chat channel

**Shared skills (from `../prospect-audit/skills/`):**
- `skill-0-discovery.md`, `skill-1-market-snapshot.md`, `skill-2-meta-audit.md`, `skill-3-social-audit.md`, `skill-4-product-page.md`, `skill-5-synthesis.md`, `skill-6-deploy.md`

## Context flow

`CALL_PREP_CONTEXT` is assembled in Skill 0 from the Notion CRM page. It contains: `page_id`, `notion_url`, `company_name`, `agency`, `domain`, `email`, `client_name`, `instagram`, `tiktok`, `call_notes`, `existing_audit_url`, `skip_audit`.

`PROSPECT_CONTEXT` is assembled by shared Skill 0 (discovery) and flows through shared skills 1-5 as normal.

## Error handling

- **Notion page fetch fails**: STOP, report the error
- **Agency field empty or unrecognized**: Ask which brand variant to use
- **No domain on CRM page**: STOP, flag missing data
- **Shared skill hard stops**: All prospect-audit hard stops apply
- **Audit already exists**: Skip audit pipeline, jump to talking points
- **Vercel deploy fails**: Retry once, then provide local file path
- **Chat MCP unavailable**: Skip notification, report completion in conversation
- **No call notes on page**: Generate talking points from audit findings only, note the absence
