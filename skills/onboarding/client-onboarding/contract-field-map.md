# Contract Template Field Map

## Template Configuration

- **Google Doc Template ID:** `YOUR_GOOGLE_DOC_TEMPLATE_ID`
- **Google Drive Contracts Folder ID:** `YOUR_GOOGLE_DRIVE_FOLDER_ID`
- **Service Account Key Path:** `the path in GOOGLE_SERVICE_ACCOUNT_JSON env var`

## Placeholders

These are the exact placeholder strings in the Google Doc template and what replaces them.

| Placeholder | Where in Template | Source | Format Example |
|---|---|---|---|
| `{{START_DATE}}` | "This agreement will commence on {{START_DATE}}" | Current date | "March 16, 2026" |
| `{{COMPANY_NAME}}` | PARTIES: "Company: {{COMPANY_NAME}}" | ONBOARDING_CONTEXT.company_name | "ACME Corp" |
| `{{ADDRESS}}` | PARTIES: "Address: {{ADDRESS}}" | Left blank | "" |
| `{{CONTACT_NAME}}` | PARTIES + ACCEPTANCE: "Contact Name: {{CONTACT_NAME}}" | ONBOARDING_CONTEXT.client_name | "Jane Smith" |
| `{{TITLE}}` | PARTIES + ACCEPTANCE: "Title: {{TITLE}}" | Left blank | "" |
| `{{EMAIL}}` | PARTIES: "Email: {{EMAIL}}" | ONBOARDING_CONTEXT.email | "jane@acme-corp.com" |
| `{{AMOUNT}}` | SELECTED SERVICES: "monthly management fee of {{AMOUNT}}" | ONBOARDING_CONTEXT.deal_value | "$5,000/mo" |
| `{{SIGNATURE}}` | ACCEPTANCE (Clickflow): "Signature: {{SIGNATURE}}" | Left blank (signed manually) | "" |
| `{{TODAY_DATE}}` | ACCEPTANCE (both parties): "Date: {{TODAY_DATE}}" | Current date | "March 16, 2026" |
| `{{COMPANY}}` | ACCEPTANCE (Client): "Company: {{COMPANY}}" | ONBOARDING_CONTEXT.company_name | "ACME Corp" |

**Note:** `{{CONTACT_NAME}}`, `{{TITLE}}`, and `{{TODAY_DATE}}` each appear twice in the template. The `replaceAllText` API call replaces all occurrences automatically.

## API Reference

### Copy template
```
POST https://www.googleapis.com/drive/v3/files/YOUR_GOOGLE_DOC_TEMPLATE_ID/copy
```

### Populate placeholders
```
POST https://docs.googleapis.com/v1/documents/{NEW_DOC_ID}:batchUpdate
```
Uses `replaceAllText` requests for each placeholder.

### Share with client
```
POST https://www.googleapis.com/drive/v3/files/{NEW_DOC_ID}/permissions
```
Role: `commenter` (read + comment, no edit).

## Setup Instructions

1. Create a Google Cloud project at https://console.cloud.google.com
2. Enable "Google Docs API" and "Google Drive API"
3. Create a Service Account under IAM & Admin > Service Accounts
4. Download the JSON key file and save to `the path in GOOGLE_SERVICE_ACCOUNT_JSON env var`
5. Share the Contracts folder with the service account email (found in the JSON key file under `client_email`)
6. Share the contract template doc with the same service account email
