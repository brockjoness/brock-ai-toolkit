# Casualize Names Workflow

## Trigger

Any of these commands activate this workflow:
- "casualize names in {sheet URL}"
- "make names friendly for {sheet}"
- "prep lead names for email"
- "casualize the lead list"

## Before starting

Confirm scope in one line:
> "Casualizing names in **{sheet URL}**. Processing first names, company names, and city names."

## Steps

```
Step 1: Validate Input
    ↓
Step 2: Run Batch Casualization
    ↓
Step 3: Confirm Results
```

### Step 1 -- Validate Input

Confirm the Google Sheet URL is provided and accessible.

### Step 2 -- Run Batch Casualization

**All three fields at once (recommended):**
```bash
python3 -u ./scripts/casualize_batch.py "<GOOGLE_SHEET_URL>"
```

**Re-process existing (overwrite):**
```bash
python3 -u ./scripts/casualize_batch.py "<GOOGLE_SHEET_URL>" --overwrite
```

**Individual field processing (if needed):**
```bash
python3 -u ./scripts/casualize_company_names_batch.py "<GOOGLE_SHEET_URL>"
python3 -u ./scripts/casualize_first_names_batch.py "<GOOGLE_SHEET_URL>"
python3 -u ./scripts/casualize_city_names_batch.py "<GOOGLE_SHEET_URL>"
```

### Step 3 -- Confirm Results

Report:
- Number of rows processed
- Processing time
- Any rows skipped (no email, already had casual names)

## Error handling

- **No sheet URL**: Ask for the Google Sheet URL
- **Auth failure**: Delete `token.json` and re-authenticate
- **No email column**: Flag the issue
