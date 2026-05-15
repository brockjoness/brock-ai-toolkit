# Onboarding Intake Processor

## What it is
A skill that parses a client intake form submission (or equivalent structured data) and turns it into a clean, validated record inside the Notion CRM, plus a kickoff prep brief ready for the first client call.

## What problem it solves
Intake forms produce messy inputs: weird formatting, missing fields, contradictions between what was said on the sales call and what was typed into the form. This skill normalizes the data, flags gaps, creates the CRM page with the right fields, and produces a one-pager you can scan five minutes before a kickoff call.

## Maturity
`working`

## How to run it
Trigger with phrases like "Process onboarding intake for [Client]" after a form submission lands. Required: Notion MCP with access to your CRM database. Set `YOUR_NOTION_CRM_DB_ID` in `.env`.

## Inputs and outputs
**In:** Raw intake form payload (JSON, email body, pasted text) with at minimum company name, contact, services, and budget.
**Out:** A new (or updated) row in your Notion CRM, plus a "kickoff prep" doc summarizing what the client said, what's missing, and what to ask in the first call.

## Where to extend it
- Map new intake form fields: edit the field map in `skill-0-parse-validate.md`.
- Change kickoff brief format: edit `skill-2-kickoff-prep.md`.

## Known limitations
- Assumes one specific intake form schema; significantly different forms will need the parse step rewritten.
- No deduplication: if the same company is submitted twice, it creates two CRM rows.
- Does not currently push to a Slack channel or trigger downstream automations.
