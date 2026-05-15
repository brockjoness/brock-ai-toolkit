# Classify Leads Workflow

## Trigger

- "classify these leads"
- "filter leads by type"
- "separate product companies from agencies"
- "classify the lead list"

## Before starting

> "Classifying **{count}** leads from **{source}** using `{classification_type}` filter."

## Steps

```
Step 1: Load Lead Data
    ↓
Step 2: Run LLM Classification
    ↓
Step 3: Review Distribution
    ↓
Step 4: Update Sheet with Results
```

### Step 1 -- Load Lead Data

If input is a Google Sheet:
```bash
python3 ./scripts/read_sheet.py <SHEET_URL> --output .tmp/leads.json
```

If input is a local JSON file from a prior scrape, use it directly.

### Step 2 -- Run LLM Classification

```bash
python3 ./scripts/classify_leads_llm.py \
  .tmp/leads.json --classification_type product_saas --output .tmp/classified_leads.json
```

### Step 3 -- Review Distribution

Read `.tmp/classified_leads.json` and report:
- Count per classification category
- Percentage of "unclear" results
- If >80% "unclear" -- STOP and recommend refining scrape keywords

### Step 4 -- Update Sheet

```bash
python3 ./scripts/update_sheet.py \
  .tmp/classified_leads.json --title "Classified Leads - TYPE"
```

## Error handling

- **No input data**: Ask for the lead file or sheet URL
- **High "unclear" rate**: Signal that the original scrape keywords need refinement
- **API error**: Check `ANTHROPIC_API_KEY`
