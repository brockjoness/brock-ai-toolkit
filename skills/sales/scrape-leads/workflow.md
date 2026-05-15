# Scrape Leads Workflow

## Trigger

- "scrape leads for {industry} in {location}"
- "find {number} leads for {industry}"
- "build a lead list for {industry}"
- "scrape {industry} businesses in {location}"

## Before starting

> "Scraping **{count}** leads for **{industry}** in **{location}**. Output to Google Sheets."

## Steps

```
Step 1: Test Scrape (25 leads)
    ↓
Step 2: Quality Verification (80% match threshold)
    ↓
Step 3: Full Scrape (single or parallel based on volume)
    ↓
Step 4: [Optional] LLM Classification
    ↓
Step 5: Upload to Google Sheets / CRM
    ↓
Step 6: Enrich Missing Emails
```

### Step 1 -- Test Scrape

```bash
python3 ./scripts/scrape_apify.py \
  --query "INDUSTRY in LOCATION" --max_items 25 --no-email-filter \
  --output .tmp/test_leads.json
```

### Step 2 -- Quality Verification

- Read `.tmp/test_leads.json`
- Check if at least 20/25 (80%) leads match the target industry
- **Pass**: Proceed to Step 3
- **Fail**: STOP and ask to refine keywords

### Step 3 -- Full Scrape

**For <1000 leads:**
```bash
python3 ./scripts/scrape_apify.py \
  --query "INDUSTRY in LOCATION" --max_items TOTAL_COUNT --no-email-filter \
  --output .tmp/leads.json
```

**For 1000+ leads:**
```bash
python3 ./scripts/scrape_apify_parallel.py \
  --query "INDUSTRY" --total_count TOTAL_COUNT --location "LOCATION" \
  --strategy regions --no-email-filter
```

### Step 4 -- LLM Classification (optional)

For complex niches:
```bash
python3 ./scripts/classify_leads_llm.py \
  .tmp/leads.json --classification_type product_saas \
  --output .tmp/classified_leads.json
```

### Step 5 -- Upload to Google Sheets

```bash
python3 ./scripts/update_sheet.py \
  .tmp/leads.json --title "Leads - INDUSTRY"
```

### Step 6 -- Enrich Missing Emails

```bash
python3 ./scripts/enrich_emails.py <SHEET_URL>
```

## Error handling

- **No leads found**: Ask to broaden search terms
- **API error**: Check credentials in your project's `.env`
- **Low classification quality** (>80% "unclear"): Improve scrape keywords before re-running
- **Google Sheets auth failure**: Delete `token.json` and re-authenticate
