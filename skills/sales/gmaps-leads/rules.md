# Google Maps Leads -- Rules

## Activation Triggers

- "scrape Google Maps for {query}"
- "find local businesses for {industry} in {location}"
- "gmaps leads for {query}"
- "pull Google Maps leads for {industry}"

## Scripts

Scripts are referenced relative to this skill folder:

```
./scripts/
```

| Script | Purpose |
|--------|---------|
| `gmaps_lead_pipeline.py` | Main orchestration pipeline |
| `gmaps_parallel_pipeline.py` | Parallel version for higher volume |
| `scrape_google_maps.py` | Google Maps scraper |
| `extract_website_contacts.py` | Website contact extractor |
| `update_sheet.py` | Google Sheets sync |

## Hard Stops

1. **No location in query** -- STOP and ask user to include a location
2. **API credentials missing** -- STOP and point to credential requirements
3. **No businesses found** -- STOP and suggest including location or broadening query

## ICP Filtering

When scraping for a specific campaign, apply ICP filtering:
- Flag businesses that match the ideal client profile
- Note ICP match confidence in the output when applicable

## Output Schema (36 fields)

**Business Basics:** business_name, category, address, city, state, zip_code, phone, website, rating, review_count

**Extracted Contacts:** emails, additional_phones, business_hours

**Social Media:** facebook, twitter, linkedin, instagram, youtube, tiktok

**Owner Info:** owner_name, owner_title, owner_email, owner_phone, owner_linkedin

**Team Contacts:** JSON array of team members

**Metadata:** lead_id, scraped_at, search_query, pages_scraped, enrichment_status

## Cost Estimates

| Component | Per Lead |
|-----------|----------|
| Apify Google Maps | ~$0.01-0.02 |
| Claude Haiku extraction | ~$0.002 |
| DuckDuckGo/HTTP | Free |
| **Total** | **~$0.012-0.022** |

For 100 leads: ~$1.50-2.50 total

## Environment

Requires in your project's `.env` file:
```
APIFY_API_TOKEN
ANTHROPIC_API_KEY
GOOGLE_APPLICATION_CREDENTIALS
```

## General Rules

- Always include location in the search query
- ~10-15% of sites will block scrapers -- this is expected and handled gracefully
- Uses lead_id (MD5 of name|address) for deduplication
- Delete `token.json` and re-authenticate if Google Sheets auth fails
