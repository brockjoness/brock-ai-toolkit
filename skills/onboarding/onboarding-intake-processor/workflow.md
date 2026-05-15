# Onboarding Intake Processor — Workflow

## Trigger

Activated by:
- "Process intake for [Company]"
- "New client intake: [Company]"
- "Onboard [Company]"
- Automated: form submission webhook (future)

## Skill Chain

Execute sequentially:

```
Skill 0: Parse & Validate Intake Data
    ↓
Skill 1: Create/Update CRM Entry + Client Context
    ↓
Skill 2: Generate Kickoff Agenda
```

## Before Starting

Confirm to Brock:
> "Processing intake for **{Company Name}**. Creating CRM entry, populating client context, and generating kickoff agenda."

## Input

Intake data provided in any format:
- Pasted form submission text
- Structured field list
- Conversational description from Brock

Required fields: Company Name, Website, Contact Name, Contact Email, Monthly Spend, Platform(s)

## Context Flow

`INTAKE_CONTEXT` is assembled in Skill 0 and flows through subsequent skills:
- `company_name`, `website`, `contact_name`, `contact_email`
- `monthly_spend`, `platforms` (Meta, Google, TikTok)
- `goals`, `competitors`, `best_sellers`
- `creative_assets_link`, `brand_guidelines`
- `agency_slug` (default: clickflow)
- `client_slug` (kebab-case of company name)

## Final Output

Present to Brock:
```
Intake processed for [Company Name].

CRM entry: [created/updated] — Status: "2. Intake Complete"
Client context: brands/{agency}/{client-slug}/context.md [created/updated]
Kickoff agenda: [generated below]

Next step: Run audit/pre-onboarding, then schedule kickoff call.
```

## Error Handling

- Missing required fields: list what's missing, ask Brock before proceeding
- Client already exists in CRM: update existing entry (don't create duplicate)
- No website provided: block — this is required for audits and logo
