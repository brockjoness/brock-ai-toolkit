# Notion as Your Agency OS

Turn Notion into the central operating system for your entire agency. Claude reads from and writes to Notion using natural language — managing your CRM pipeline, tracking onboarding status, organizing workflow tasks, storing client context, and maintaining a prompt library so you never forget what you've built.

## What You'll Need

- Notion workspace (free or Plus plan)
- Claude with Notion MCP — built into Claude.ai Pro, or Claude Code via Notion MCP server
- No additional tools

## Setup — Five Databases

### Database 1: CRM (Client Pipeline)

| Field | Type | Purpose |
|---|---|---|
| Company Name | Title | Primary identifier |
| Client Name | Text | Contact person |
| Email | Email | Contact email |
| Website | URL | Client website |
| Instagram | URL | Social profile |
| Meta Ads Library | URL | Constructed from FB page ID |
| Company Type | Select | Ecommerce / Lead Gen / SaaS |
| Services | Multi-select | What you manage |
| Status | Select | Pipeline stage |
| Deal Value | Number | Monthly fee |

**Status pipeline:** 1. Lead → 2. Intake Complete → 3. Audit Sent → 4. Kickoff Scheduled → 5. Onboarded → 6. Active

### Database 2: Website Submissions
Form submissions and audit requests.

### Database 3: Offers
Your pricing tiers and service packages.

### Database 4: Workflow Tasks
Internal task tracking for onboarding.

### Database 5: Content Ideas
Weekly content calendar.

## The Rules File

```markdown
---
name: notion-agency-os
description: Manage an agency's Notion workspace as a central operating system.
---

# Notion Agency OS

You manage my agency's Notion workspace. Follow these rules at all times:

RULE 1 — ONLY WRITE WHEN ASKED
Never create pages, update content, or add anything to Notion unless I explicitly ask. Present output in conversation first. Push to Notion only when told.

RULE 2 — ALWAYS WRITE TO THE CLIENT'S PAGE
When adding content to Notion, place it inside the client's existing CRM page. Never create standalone workspace-level pages.

RULE 3 — PULL CONTEXT BEFORE CLIENT WORK
Before any client task, fetch the client's CRM page first. Key fields: Company Name, Website, Instagram, Meta Ads Library, Company Type, Services, Status.

RULE 4 — CREATE NEW CLIENTS
When I say "create a new client {COMPANY}":
1. Search the web for their Facebook page, Instagram, website
2. Construct their Meta Ads Library URL from the Facebook page ID
3. ASK me for contact name, email, and phone — never guess
4. Create CRM entry with Status "1. Lead"
5. Confirm what was found and what's missing

ALWAYS:
- Flag missing data immediately, don't assume
- Work with what's available, note what's empty
- Keep client content under their CRM page, never scattered
```

## Using This in Claude.ai vs Claude Code

**Claude.ai** (Pro): natural-language CRM management, search workspace, update statuses, prompt library.

**Claude Code:** Notion becomes the brain that powers every other skill. Other skills reference Notion for client context. Chaining example:
- "Create new client Acme Corp" → CRM entry
- "Run prospect audit for Acme Corp" → pulls context, runs audit
- "Deploy the audit" → ships to Vercel
- "Update Acme to Audit Sent" → CRM status updated
