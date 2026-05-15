# Casualize Names -- Rules

## Activation Triggers

- "casualize names in {sheet URL}"
- "make names friendly for {sheet}"
- "prep lead names for email"
- "casualize the lead list"

## Scripts

Scripts are referenced relative to this skill folder:

```
./scripts/
```

| Script | Purpose |
|--------|---------|
| `casualize_batch.py` | All 3 fields at once (recommended, 3x faster) |
| `casualize_company_names_batch.py` | Company names only |
| `casualize_first_names_batch.py` | First names only |
| `casualize_city_names_batch.py` | City names only |

Note: the scripts themselves live in a separate tools repo; the rules below are the contract.

## Casualization Rules

### First Names
- Use common nicknames: "William" -> "Will", "Jennifer" -> "Jen"
- Keep original if no common nickname exists
- Keep it professional

### Company Names
- Remove "The" at beginning
- Remove legal suffixes (LLC, Inc, Corp, Ltd)
- Remove generic words (Realty, Group, Solutions, Services)
- Keep core brand name
- Use "you guys" for overly generic names

### City Names
- Use local nicknames: "San Francisco" -> "SF", "Philadelphia" -> "Philly"
- Keep original if no common nickname

## Output Columns

Creates three new columns in the Google Sheet:
- `casual_first_name`
- `casual_company_name`
- `casual_city_name`

## Performance

- Processes in batches of 50 with 5 parallel workers
- ~35 records/sec
- 3,000 records in ~90 seconds

## Hard Stops

1. **No sheet URL provided** -- STOP and ask for the Google Sheet URL
2. **Sheet has no email column** -- STOP and flag the issue (only rows with emails are processed)

## Environment

Requires in your project's `.env` file (see `.env.example`):
```
ANTHROPIC_API_KEY
```

## General Rules

- Default: skip rows that already have casual names (use `--overwrite` to re-process)
- Only rows with email addresses are processed
- This is a lightweight utility -- typically run after `scrape-leads` or `gmaps-leads`
