# Lead Enrichment Workflow

## Trigger
"Enrich leads", "check new submissions", "process the waitlist", "enrich the latest leads".

## Step 1: Fetch Unenriched Submissions

1. Use the Notion MCP `notion-fetch` tool to read the Website Submissions data source: `collection://YOUR_NOTION_DATA_SOURCE_ID`
2. Identify entries where Name, Company, phone, or LinkedIn are empty.
3. If no unenriched entries exist, report "No new leads to enrich" and stop.
4. Present a count: "Found {N} unenriched leads. Starting research."

## Step 2: Research Each Lead

For each unenriched email address:

### 2a. Extract Domain
- Parse the email domain (e.g., `jane@acme.com` → `acme.com`).
- If the domain is a personal provider (gmail.com, yahoo.com, hotmail.com, outlook.com, icloud.com, aol.com, protonmail.com), note "personal email" and rely on direct search instead.

### 2b. Web Search
Run parallel searches using the WebSearch tool:
1. `"{email address}"` — direct email search
2. `"{email address}" linkedin` — find LinkedIn profile
3. `site:{domain} team OR about OR leadership` — find the person on their company site (skip for personal emails)

### 2c. LinkedIn Search
If not found above, try:
- `site:linkedin.com/in/ "{name}" "{company}"` (if name/company partially known)
- `site:linkedin.com/in/ "{email domain}"` (match by company domain)

### 2d. Company Website
If the domain is a business domain:
- Use WebFetch on `https://{domain}` to identify the company name and check for team/about pages.
- If a team page exists, fetch it to find the person's name and role.

### 2e. Compile Results
For each lead, compile:
- **Name**: Full name (first + last)
- **Company**: Company or brand name
- **phone**: Phone number (if publicly available)
- **LinkedIn**: Full LinkedIn profile URL (https://linkedin.com/in/...)

If a field can't be found after research, leave it empty. Never guess or fabricate data.

## Step 3: Present Findings

Show the results before writing to Notion:

```
## Lead Enrichment Results

| Email | Name | Company | Phone | LinkedIn |
|-------|------|---------|-------|----------|
| jane@acme.com | Jane Doe | Acme Inc | 555-0100 | linkedin.com/in/janedoe |
| john@gmail.com | — | — | — | — |
```

Wait for approval: "Write these to Notion?" or "Any corrections?"

## Step 4: Update Notion

After approval, for each enriched lead:
1. Use `notion-search` to find the page by email address.
2. Use `notion-update-page` with `update_properties` to write the enriched fields.
3. Only update fields that have values — don't overwrite existing data with blanks.

Confirm each update: "Updated {email} with name, company, LinkedIn."

## Step 5: Summary

```
## Done
- Enriched: 3 leads
- Partially enriched: 1 lead (phone not found)
- Could not enrich: 1 lead (personal Gmail, no public presence)
```

## Rules
- **Never fabricate data.** If you can't find it, leave it blank.
- **Never write to Notion without explicit approval.**
- **Phone numbers**: Only use publicly listed numbers (company website, LinkedIn). Never guess.
- **LinkedIn**: Must be a direct profile link (linkedin.com/in/...), not a search results page.
- **Privacy**: Only use publicly available information.
