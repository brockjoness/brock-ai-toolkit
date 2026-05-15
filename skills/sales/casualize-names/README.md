# Casualize Names

## What it is
A small utility that takes a Google Sheet of leads and adds three new columns: `casual_first_name`, `casual_company_name`, `casual_city_name`. It converts "William" to "Will", strips legal suffixes from company names, and turns city names into local nicknames ("Philadelphia" -> "Philly"). It's meant to be the last step before piping a lead list into cold email merge fields.

## What problem it solves
Cold email open and reply rates rise sharply when merge fields read like a human wrote them. Doing the conversion manually on 3,000 rows is impossible; doing it inline in your email tool is fragile. This skill batches it once, writes the results back to the sheet, and is idempotent (rows that already have casual names are skipped unless you pass `--overwrite`).

## Maturity
`production` — Brock uses this in his standard lead-list prep pipeline.

## How to run it

```bash
# all three fields at once (recommended)
python3 -u ./scripts/casualize_batch.py "<GOOGLE_SHEET_URL>"

# overwrite existing casual columns
python3 -u ./scripts/casualize_batch.py "<GOOGLE_SHEET_URL>" --overwrite
```

Required env: `ANTHROPIC_API_KEY` (see `.env.example`).

The scripts themselves live in a separate (currently private) tools repo. The expected behaviour is documented in `rules.md` so you can rebuild a thin wrapper around any LLM if needed.

## Inputs and outputs
**In:** A Google Sheet URL with a `first_name`, `company_name`, `city`, and `email` column. Rows without emails are skipped.
**Out:** Three new columns added to the same sheet: `casual_first_name`, `casual_company_name`, `casual_city_name`.

## Where to extend it
- `rules.md` — the casualization rules themselves (nicknames, suffixes to strip, city aliases)
- The batching wrapper script — adjust batch size (default 50) or worker count (default 5)

## Known limitations
- Hard-codes American/English nicknames and city aliases. Localize for other markets by editing `rules.md`.
- Skips rows without an email by design — useful if you only mail rows with verified emails, less useful otherwise.
- LLM-based; expect minor inconsistency at scale. Spot-check 1% of rows before sending.
