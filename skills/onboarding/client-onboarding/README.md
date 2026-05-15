# Client Onboarding

## What it is
A multi-step Claude skill that processes newly-signed clients sitting in a Notion CRM at status "5. Onboarded" and runs the full launch handoff: scan CRM, generate a Google Docs service agreement, send the first Stripe invoice, draft a welcome email in Gmail, create a launch task in a Notion Workflow database, and flip the CRM status to "6. Active."

## What problem it solves
The minutes after a deal closes are the leakiest part of agency operations: contracts get drafted in Word, invoices get forgotten, and the kickoff feels chaotic. This skill compresses contract + invoice + welcome email + task creation into a single command and a single review checkpoint, so clients see a tight, professional launch within 48 hours of signing.

## Maturity
`production`

## How to run it
Trigger inside Claude with phrases like "Run onboarding check" or "Process onboarded clients." The skill chain is orchestrated by `workflow.md`. You need:

- A Notion CRM database (set `YOUR_NOTION_DB_ID` placeholders).
- A Google Cloud service account with Docs + Drive API access (path set in `.env`).
- A Stripe API key (`STRIPE_API_KEY`).
- A Gmail MCP connection.
- A Notion MCP connection.

Copy `.env.example` to `.env` and fill in real values.

## Inputs and outputs
**In:** Notion CRM rows at status "5. Onboarded" with company name, client name, email, deal value, services, and agency slug.
**Out:** A copied + populated Google Docs contract shared with the client, a sent Stripe invoice, a Gmail draft welcome email, a Notion launch task, and an updated CRM status.

## Where to extend it
- Add new services: edit the service-to-checklist table in `skill-4-workflow-task.md`.
- Add new agencies/brands: extend the agency-gate logic in `skill-0-crm-scan.md` and add a brand file at `brands/{slug}/brand.md`.
- Change contract content: edit the Google Docs template and update `contract-field-map.md`.

## Known limitations
- Hard-coded to the original Notion CRM schema; if your fields differ you must rewrite the field map.
- The agency gate currently skips contract + invoice for agencies other than the default — you may want to remove that conditional.
- No retry logic for Stripe or Google Docs failures beyond a single retry; transient API errors require manual reruns.
