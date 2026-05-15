# Scrape Leads -- Rules

## Activation Triggers

- "scrape leads for {industry} in {location}"
- "find {number} leads for {industry}"
- "build a lead list for {industry}"
- "scrape {industry} businesses in {location}"

## Scripts

Scripts are referenced relative to this skill folder:

```
./scripts/
```

| Script | Purpose |
|--------|---------|
| `scrape_apify.py` | Single scrape for <1000 leads |
| `scrape_apify_parallel.py` | Parallel scraping for 1000+ leads |
| `classify_leads_llm.py` | LLM-based lead classification |
| `enrich_emails.py` | Email enrichment via AnyMailFinder |
| `update_sheet.py` | Batch Google Sheets updates |
| `read_sheet.py` | Read data from Google Sheets |

## Hard Stops

1. **Test scrape fails quality check** (<80% industry match on 25 leads) -- STOP and ask user to refine keywords
2. **API credentials missing** -- STOP and point to `.env` requirements
3. **No leads returned** -- STOP and suggest broadening the search

## Volume Thresholds

- **<1000 leads**: Use `scrape_apify.py` (single mode)
- **1000+ leads**: Use `scrape_apify_parallel.py` with geographic partitioning

## Geographic Partitioning (parallel mode)

- **United States**: 4-way (Northeast, Southeast, Midwest, West)
- **EU/Europe**: 4-way (Western, Southern, Northern, Eastern)
- **UK**: 4-way (SE England, N England, Scotland/Wales, SW England)
- **Canada**: 4-way (Ontario, Quebec, West, Atlantic)
- **Australia**: 4-way (NSW, VIC/TAS, QLD, WA/SA)

## Output Options

- **Google Sheets** (default): Upload via `update_sheet.py`, return the sheet URL
- **CRM**: If specified as the destination, write leads to the appropriate database

## Environment

Requires in your project's `.env` file:
```
APIFY_API_TOKEN
GOOGLE_APPLICATION_CREDENTIALS
ANTHROPIC_API_KEY
ANYMAILFINDER_API_KEY
```

## General Rules

- Always run a 25-lead test scrape before the full scrape
- The deliverable is the Google Sheet URL or CRM entry -- not local JSON files
- `.tmp/` files are intermediates only
- If classification is needed (complex niches), run `classify_leads_llm.py` before uploading
