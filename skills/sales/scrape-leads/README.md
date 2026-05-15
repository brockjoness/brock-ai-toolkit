# Scrape Leads

## What it is
An Apify-based lead scraper with a built-in quality gate. Runs a 25-lead test scrape first; only proceeds to full volume if at least 80% of the test rows match the target industry. For 1,000+ lead jobs it partitions geographically (e.g. four US regions) so scrapes run in parallel. Email enrichment via AnyMailFinder is a final pass.

## What problem it solves
Big lead scrapes that look fine in summary often hide 40% off-target rows that ruin a cold campaign. Forcing a quality check on 25 rows before committing thousands of API credits is the difference between a $5 mistake and a $500 one.

## Maturity
`production` — Brock uses this as the default outbound lead generator.

## How to run it

Trigger phrases: `scrape leads for {industry} in {location}`, `build a lead list for {industry}`, `find {number} leads for {industry}`.

```bash
# test (always run first)
python3 ./scripts/scrape_apify.py \
  --query "INDUSTRY in LOCATION" --max_items 25 --no-email-filter \
  --output .tmp/test_leads.json

# full scrape — <1000 leads
python3 ./scripts/scrape_apify.py \
  --query "INDUSTRY in LOCATION" --max_items COUNT --no-email-filter \
  --output .tmp/leads.json

# full scrape — 1000+ leads, geographic partitioning
python3 ./scripts/scrape_apify_parallel.py \
  --query "INDUSTRY" --total_count COUNT --location "LOCATION" \
  --strategy regions --no-email-filter

# upload + enrich
python3 ./scripts/update_sheet.py .tmp/leads.json --title "Leads - INDUSTRY"
python3 ./scripts/enrich_emails.py <SHEET_URL>
```

Required env (in your project's `.env`):
- `APIFY_API_TOKEN`
- `GOOGLE_APPLICATION_CREDENTIALS`
- `ANTHROPIC_API_KEY`
- `ANYMAILFINDER_API_KEY`

## Inputs and outputs
**In:** Industry + location + count.
**Out:** A deduplicated Google Sheet (or Notion CRM) with verified email addresses where available.

## Where to extend it
- `rules.md` — volume thresholds, partitioning strategies, hard stops
- `workflow.md` — add or remove pipeline steps (classification is optional)
- Chain into [`classify-leads`](../classify-leads) and [`casualize-names`](../casualize-names) for the full pre-outreach pipeline

## Known limitations
- Quality is only as good as the Apify actor for your niche. Some industries scrape cleanly, others need keyword tweaking.
- Geographic partitioning is currently 4-way for US/EU/UK/CA/AU. Other regions need partition definitions added.
- Email enrichment success varies wildly by industry (90% for tech, much lower for trades).
