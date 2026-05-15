# Lead Enrichment

## What it is
Reads a Notion database of inbound form submissions (waitlist, newsletter, etc.), finds rows missing name/company/phone/LinkedIn, researches each one with web search + WebFetch, and proposes enrichment writes back into Notion. Nothing is written without your explicit approval.

## What problem it solves
Inbound forms that only collect an email leave you guessing who actually signed up. Manually researching every lead is slow; doing it in batch with a structured method gets you a high-confidence shortlist of "this person is worth reaching out to."

## Maturity
`production` — Brock runs this against a live ClickFlow waitlist Notion database.

## How to run it

Trigger phrases: `enrich leads`, `check new submissions`, `process the waitlist`.

Requires:
- A Notion MCP configured with access to the submissions database
- The WebSearch and WebFetch tools

Set your Notion database ID in `SKILL.md` (placeholder `YOUR_NOTION_DB_ID`).

## Inputs and outputs
**In:** A trigger phrase. The skill self-discovers unenriched rows.
**Out:** A table of researched leads (name, company, phone, LinkedIn) presented for review; after approval, fields are written into Notion. Empty fields stay empty — the skill never fabricates.

## Where to extend it
- `SKILL.md` — adjust the data source ID, schema, and what counts as "unenriched"
- `workflow.md` — extend the research pass (e.g., add Hunter, Apollo, Clearbit)

## Known limitations
- Personal-email domains (gmail, yahoo, etc.) often won't yield enrichment data. Surfaced as "could not enrich" rather than guessed.
- Phone numbers are only used if publicly listed. No data brokers, no guessing.
- LinkedIn search depends on the search index — sometimes profiles are missed even when they exist.
