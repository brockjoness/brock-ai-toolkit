# Lead Enrichment

## Overview
Enriches website submissions from an inbound waitlist by researching each lead's identity from their email address. Pulls name, company, phone number, and LinkedIn profile, then updates the Notion database.

## Data Source
- **Notion Database:** Website Submissions
- **Database ID:** `YOUR_NOTION_DB_ID`
- **Data Source ID:** `collection://YOUR_NOTION_DATA_SOURCE_ID`

## Schema
| Property | Type | Description |
|----------|------|-------------|
| Email | title | Email address (submitted via form) |
| Name | text | Full name of the person |
| Company | text | Company or brand name |
| phone | phone_number | Phone number |
| LinkedIn | url | LinkedIn profile URL |

## Research Methods
1. **Email domain** — extract the domain (ignore gmail.com, yahoo.com, etc.) and research the company website
2. **Web search** — search for the email address, the person's name + company, LinkedIn profiles
3. **LinkedIn search** — search `site:linkedin.com "{email}"` or `site:linkedin.com "{name}" "{company}"`
4. **Company website** — check team/about pages for the person's name and role

## What Counts as "Unenriched"
A submission needs enrichment if ANY of these fields are empty: Name, Company, phone, LinkedIn.
