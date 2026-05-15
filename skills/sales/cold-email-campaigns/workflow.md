# Cold Email Campaigns Workflow

## Trigger

- "create cold email campaigns for {client}"
- "set up email campaigns for {client}"
- "build Instantly campaigns for {client}"
- "cold outreach for {client}"

## Before starting

> "Creating **3 cold email campaigns** for **{client}** targeting **{audience}**. Will present copy for review before deploying to Instantly."

## Steps

```
Step 1: Load Client Context
    ↓
Step 2: Load Campaign Examples
    ↓
Step 3: Generate 3 Campaigns (copy review)
    ↓
Step 4: Review Gate
    ↓
Step 5: Deploy to Instantly
```

### Step 1 -- Load Client Context

1. `./clients/{client-slug}/context.md` -- if a client slug is known
2. CRM -- search for the client record for offers, positioning, audience
3. If neither exists, ask for: company name, description, target audience, value proposition, social proof, and 3 offers (or generate offers)

### Step 2 -- Load Campaign Examples

```bash
cat ./examples/campaigns.md
```

### Step 3 -- Generate 3 Campaigns

Draft 3 campaigns (one per offer), each with:
- Email 1: Two A/B variants (personalization + social proof + offer + soft CTA)
- Email 2: Follow-up bump
- Email 3: Breakup email

Present the full copy for review.

### Step 4 -- Review Gate

Wait for approval or revision notes. Iterate on copy as needed.

### Step 5 -- Deploy to Instantly

```bash
python3 ./scripts/instantly_create_campaigns.py \
  --client_name "CLIENT_NAME" \
  --client_description "DESCRIPTION" \
  --offers "Offer 1|Offer 2|Offer 3" \
  --target_audience "AUDIENCE" \
  --social_proof "SOCIAL_PROOF"
```

Report the created campaign IDs and names.

## Error handling

- **No client context available**: Ask for client details before proceeding
- **API errors**: Script retries once, then fails with detailed error
- **Rate limits**: Handled with exponential backoff in the script
- **No offers provided**: Generate 3 distinct offers from the client description, confirm before proceeding
