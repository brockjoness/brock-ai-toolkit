# Cold Email Auto-Reply Workflow

## Trigger

- "handle Instantly replies"
- "process email replies for {campaign}"
- "auto-reply to campaign threads"
- "check Instantly inbox"

## Before starting

> "Processing reply for **{prospect}** on campaign **{campaign_name}**. Loading context from knowledge base + client files."

## Steps

```
Step 1: Receive Thread
    ↓
Step 2: Look Up Campaign Context
    ↓
Step 3: Load Client Context (RAG)
    ↓
Step 4: Generate Reply
    ↓
Step 5: Send via Instantly
```

### Step 1 -- Receive Thread

Get the incoming thread ID from the Instantly webhook or manual input.

### Step 2 -- Look Up Campaign Context

Query the knowledge base spreadsheet (`YOUR_CAMPAIGN_KB_SHEET_ID`) to retrieve:
- Campaign name and ID
- Service details and offers
- Reply examples for tone/style

### Step 3 -- Load Client Context (RAG)

Supplement the knowledge base with:
1. Client context file: `./clients/{client-slug}/context.md`
2. CRM record for current offers, pricing, and positioning
3. Use this combined context to inform the reply

### Step 4 -- Generate Reply

Using the full thread history + campaign context + client context:
- Craft a reply under 100 words
- Match the campaign's tone
- Address the prospect's specific question or objection
- Steer toward booking a call

### Step 5 -- Send via Instantly

```bash
python3 ./scripts/instantly_autoreply.py --thread_id THREAD_ID
```

## Error handling

- **Campaign ID not in knowledge base**: Report -- do not guess
- **Hostile or unsubscribe language**: Flag for manual review, do not auto-reply
- **Reply requires unknown commitments**: Ask before sending
- **Instantly API error**: Retry once, then report
