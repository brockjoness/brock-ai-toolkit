# Classify Leads -- Rules

## Activation Triggers

- "classify these leads"
- "filter leads by type"
- "separate product companies from agencies"
- "classify the lead list"

## Scripts

Scripts are referenced relative to this skill folder:

```
./scripts/
```

| Script | Purpose |
|--------|---------|
| `classify_leads_llm.py` | Main LLM classification script |
| `update_sheet.py` | Update Google Sheets with results |
| `read_sheet.py` | Read lead data from Google Sheets |

## When to Use

- Product SaaS vs IT consulting/agencies
- High-ticket vs low-ticket businesses
- Subscription vs one-time payment models
- Any nuanced distinction that keyword matching cannot handle

## When NOT to Use

- Simple, obvious categories (dentists, realtors, plumbers)
- If `scrape-leads` already returned clean, single-category results

## Classification Types

- `product_saas` -- Product companies vs service/consulting firms
- Custom types can be defined per use case

## Performance

- ~2 minutes for 3,000 leads
- ~$0.30 per 1,000 leads
- Default: includes "unclear" classifications (medium confidence)

## Hard Stops

1. **No input data** -- STOP and ask for a lead file or sheet URL
2. **>80% "unclear" results** -- STOP and recommend refining the original scrape keywords

## Companion Skills

This skill pairs with:
- **scrape-leads** -- classify after scraping from Apify
- **gmaps-leads** -- classify after scraping from Google Maps

## Environment

Requires in your project's `.env` file:
```
ANTHROPIC_API_KEY
```
