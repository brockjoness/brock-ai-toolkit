# SKILL 1: Contract Generation (Google Docs)

## When to use

After Skill 0 has assembled ONBOARDING_CONTEXT for a client.

## Prerequisites

- Google Cloud project with Docs API + Drive API enabled
- Service account key at `the path in GOOGLE_SERVICE_ACCOUNT_JSON env var`
- Contract template Google Doc ID in `contract-field-map.md`
- Contracts folder Google Drive ID in `contract-field-map.md`

## What to do

### Step 1: Validate required fields

Check ONBOARDING_CONTEXT has:
- `company_name`
- `client_name`
- `email`
- `deal_value`
- `services`
- `agency_slug`

If any are missing: hard stop for this client. Report the missing fields.

### Step 2: Read contract field map

Read `contract-field-map.md` in this skill's directory to get:
- `TEMPLATE_DOC_ID`: `YOUR_GOOGLE_DOC_TEMPLATE_ID`
- `CONTRACTS_FOLDER_ID`: `YOUR_GOOGLE_DRIVE_FOLDER_ID`

### Step 3: Authenticate with Google APIs

Read the service account key from `the path in GOOGLE_SERVICE_ACCOUNT_JSON env var`.

Generate a JWT access token using the service account credentials:

```bash
# Generate JWT and exchange for access token
# Scopes needed: https://www.googleapis.com/auth/documents, https://www.googleapis.com/auth/drive
```

Store the access token for subsequent API calls.

### Step 4: Copy the contract template

Use the Google Drive API to create a copy of the template:

```bash
curl -s -X POST \
  "https://www.googleapis.com/drive/v3/files/{TEMPLATE_DOC_ID}/copy" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Service Agreement - {company_name}",
    "parents": ["{CONTRACTS_FOLDER_ID}"]
  }'
```

Extract the new document ID from the response.

### Step 5: Populate contract placeholders

Use the Google Docs API `batchUpdate` with `replaceAllText` requests:

```bash
curl -s -X POST \
  "https://docs.googleapis.com/v1/documents/{NEW_DOC_ID}:batchUpdate" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "requests": [
      {"replaceAllText": {"containsText": {"text": "{{START_DATE}}", "matchCase": true}, "replaceText": "{current date, e.g. March 16, 2026}"}},
      {"replaceAllText": {"containsText": {"text": "{{COMPANY_NAME}}", "matchCase": true}, "replaceText": "{company_name}"}},
      {"replaceAllText": {"containsText": {"text": "{{ADDRESS}}", "matchCase": true}, "replaceText": ""}},
      {"replaceAllText": {"containsText": {"text": "{{CONTACT_NAME}}", "matchCase": true}, "replaceText": "{client_name}"}},
      {"replaceAllText": {"containsText": {"text": "{{TITLE}}", "matchCase": true}, "replaceText": ""}},
      {"replaceAllText": {"containsText": {"text": "{{EMAIL}}", "matchCase": true}, "replaceText": "{email}"}},
      {"replaceAllText": {"containsText": {"text": "{{AMOUNT}}", "matchCase": true}, "replaceText": "${deal_value}/mo"}},
      {"replaceAllText": {"containsText": {"text": "{{SIGNATURE}}", "matchCase": true}, "replaceText": ""}},
      {"replaceAllText": {"containsText": {"text": "{{TODAY_DATE}}", "matchCase": true}, "replaceText": "{current date, e.g. March 16, 2026}"}},
      {"replaceAllText": {"containsText": {"text": "{{COMPANY}}", "matchCase": true}, "replaceText": "{company_name}"}}
    ]
  }'
```

**Services list formatting:** Join the services array with line breaks or commas:
- "Meta Ads, Google Ads, Email Campaigns"

### Step 6: Share the document with the client

```bash
curl -s -X POST \
  "https://www.googleapis.com/drive/v3/files/{NEW_DOC_ID}/permissions" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "role": "commenter",
    "type": "user",
    "emailAddress": "{email}"
  }'
```

This gives the client read + comment access (cannot edit).

### Step 7: Store contract URL

Construct the Google Docs URL:
```
https://docs.google.com/document/d/{NEW_DOC_ID}/edit
```

Add `contract_url` to ONBOARDING_CONTEXT.

### Step 8: Report and trigger review checkpoint

> "Contract generated for **{company_name}**: {contract_url}"

The workflow.md review checkpoint fires after this skill. Do not proceed to Skill 2 until Brock approves.

## Error handling

- Service account key not found: hard stop. Report "Google Docs credentials not configured at the path in GOOGLE_SERVICE_ACCOUNT_JSON env var."
- Template copy fails: hard stop for this client. Report the API error.
- Placeholder replacement fails: hard stop. The contract may be in a bad state.
- Sharing fails: note the failure but continue. Brock can share manually. Still add contract_url to context.
- Access token generation fails: hard stop. Report authentication error.

## Next step

Return to workflow.md review checkpoint. Wait for Brock's approval before proceeding to Skill 2.
