# Classify Leads

## What it is
An LLM-based lead classifier you run after scraping. Given a JSON or Google Sheet of leads, it tags each row with a category (e.g., `product_saas` vs `agency`) and a confidence band (clear / likely / unclear), then writes the result back to the sheet. Use it when keyword matching can't tell two similar business types apart.

## What problem it solves
Scrapers return noisy lists. "AI consultancy" can mean a product company or a services shop; "marketing agency" can hide an in-house team. Classifying with an LLM cleans the list before it hits your outbound tool, which keeps reply rates honest and avoids burning sender reputation on the wrong audience.

## Maturity
`production` — Brock uses this as the standard post-scrape filter when the niche is complex.

## How to run it

```bash
# read leads from a sheet
python3 ./scripts/read_sheet.py <SHEET_URL> --output .tmp/leads.json

# classify
python3 ./scripts/classify_leads_llm.py \
  .tmp/leads.json \
  --classification_type product_saas \
  --output .tmp/classified_leads.json

# write back
python3 ./scripts/update_sheet.py \
  .tmp/classified_leads.json --title "Classified Leads - TYPE"
```

Required env: `ANTHROPIC_API_KEY`.

## Inputs and outputs
**In:** A JSON file or Google Sheet URL of scraped leads.
**Out:** Same data plus a `classification` and `confidence` column; new tab/sheet titled "Classified Leads - {TYPE}".

## Where to extend it
- Add a new `--classification_type` by extending the prompt in `classify_leads_llm.py`
- Tune the unclear-rate threshold (default 80%) in `rules.md`

## Known limitations
- ~$0.30 per 1,000 leads and ~2 min for 3,000 — fine for batches, not for real-time.
- High "unclear" rates (>80%) usually signal a bad scrape rather than a bad classifier; the skill stops and tells you so.
- Don't use this for obvious categories (dentists, plumbers). Simple keyword filtering is faster and cheaper.
