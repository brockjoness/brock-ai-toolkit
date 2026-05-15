# Google Maps Leads

## What it is
Scrapes Google Maps for local businesses matching an industry + location, then deep-enriches each result: website scraping, contact-page discovery, owner search via DuckDuckGo, and LLM-based structured extraction into a 36-field schema. Final output lands in a Google Sheet, deduplicated.

## What problem it solves
Local lead gen tools either give you Maps listings with no contacts (useless for outbound) or charge hundreds per month for the enrichment. This pipeline costs roughly $0.012-$0.022 per lead end-to-end and produces emails, owner names, and social profiles — enough to actually run outreach.

## Maturity
`production` — Brock uses this for local-business lead gen.

## How to run it

Trigger phrases: `scrape Google Maps for {query}`, `find local businesses for {industry} in {location}`.

```bash
# new sheet
python3 ./scripts/gmaps_lead_pipeline.py \
  --search "INDUSTRY in LOCATION" --limit COUNT

# append to existing sheet
python3 ./scripts/gmaps_lead_pipeline.py \
  --search "INDUSTRY in LOCATION" --limit COUNT \
  --sheet-url "SHEET_URL"

# higher volume (parallel)
python3 ./scripts/gmaps_lead_pipeline.py \
  --search "INDUSTRY in LOCATION" --limit COUNT --workers 5
```

Required env (in your project's `.env`):
- `APIFY_API_TOKEN`
- `ANTHROPIC_API_KEY`
- `GOOGLE_APPLICATION_CREDENTIALS` (path to service account JSON)

## Inputs and outputs
**In:** A search query (must include a location) and a target count.
**Out:** A Google Sheet with up to 36 columns: business basics, extracted emails, social profiles, owner info, team contacts, scraping metadata.

## Where to extend it
- `rules.md` — output schema, cost estimates, hard stops
- The pipeline script — add new enrichment passes (e.g., LinkedIn, Hunter)

## Known limitations
- ~10-15% of websites will block scrapers. Handled gracefully — those rows just have fewer enriched fields.
- Owner research uses DuckDuckGo (free) and degrades on locked-down sites.
- Deduplication key is MD5 of `name|address`. If addresses change, you'll get duplicates.
