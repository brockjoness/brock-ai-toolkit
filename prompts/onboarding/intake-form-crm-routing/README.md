# Intake Form → CRM Routing

## What it is
A scheduled prompt that watches Gmail for new website form submissions (Typeform, Tally, Jotform, Webflow, HubSpot, plain HTML), parses them, enriches via web search, scores 0-100 against a rubric, picks an owner via round-robin, creates a Notion CRM row, and sends a service-specific auto-reply from the assigned owner's Gmail.

## What problem it solves
Every form builder emails you submissions by default. Most ops teams either (a) ignore that and lose leads to slow response, or (b) duct-tape Zapier + Clearbit + Apollo together. This replaces all of that with one Claude schedule and Gmail's web search.

## Where to use it
Claude.ai (Project + Schedule). Gmail + Notion connectors required.

## How to run it
1. Create Notion "CRM" and "Round Robin" databases (schemas in PROMPT.md).
2. Create Claude Project "Intake Router", paste the skill block as instructions.
3. Add Schedule every 5 min with scheduled prompt.
4. Confirm every form builder emails submissions to your Gmail.

## Inputs and outputs
**In:** form-submission email arriving in Gmail.
**Out:** enriched CRM row + scored band + assigned owner + auto-reply from owner's Gmail (Hot/Warm only). Cold gets CRM only, Disqualified gets silence.

## Known limitations
- Web-search enrichment is best-effort — solo founders or new domains often have nothing to find.
- The 10-lead daily cap per owner is a soft circuit-breaker. Hot leads at cap get queued and alerted.
- Regulated industries (healthcare, legal, financial) require human review before sending — built into the prompt.
