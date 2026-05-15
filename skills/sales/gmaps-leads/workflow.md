# Google Maps Leads Workflow

## Trigger

- "scrape Google Maps for {query}"
- "find local businesses for {industry} in {location}"
- "gmaps leads for {query}"
- "pull Google Maps leads for {industry}"

## Before starting

> "Scraping Google Maps for **{query}** -- targeting **{limit}** leads. Output to Google Sheets."

## Steps

```
Step 1: Google Maps Scrape
    ↓
Step 2: Website Scraping & Contact Page Discovery
    ↓
Step 3: Web Search Enrichment (owner/decision-maker info)
    ↓
Step 4: Claude Contact Extraction
    ↓
Step 5: Google Sheets Sync (deduplicated)
```

### Step 1 -- Run the Pipeline

**New sheet:**
```bash
python3 ./scripts/gmaps_lead_pipeline.py \
  --search "INDUSTRY in LOCATION" --limit COUNT
```

**Append to existing sheet:**
```bash
python3 ./scripts/gmaps_lead_pipeline.py \
  --search "INDUSTRY in LOCATION" --limit COUNT \
  --sheet-url "SHEET_URL"
```

**Higher volume (parallel):**
```bash
python3 ./scripts/gmaps_lead_pipeline.py \
  --search "INDUSTRY in LOCATION" --limit COUNT --workers 5
```

The pipeline handles Steps 1-5 automatically. Each lead goes through:
1. Google Maps listing via Apify `compass/crawler-google-places`
2. Main page + up to 5 contact pages scraped
3. DuckDuckGo search for owner contact info
4. Claude Haiku extracts structured contacts
5. Appends to Google Sheet with deduplication by lead_id

## Error handling

- **"No businesses found"**: Include location in query -- Google Maps needs geographic context
- **403 Forbidden**: ~10-15% of sites block scrapers -- handled gracefully, reported as enrichment gap
- **Auth issues**: Delete `token.json` and re-authenticate
- **Duplicates**: Automatic deduplication via lead_id (MD5 of name|address)
