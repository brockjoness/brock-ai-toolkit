# Cold Email Auto-Reply -- Rules

## Activation Triggers

- "handle Instantly replies"
- "process email replies for {campaign}"
- "auto-reply to campaign threads"
- "check Instantly inbox"

## Scripts

Scripts are referenced relative to this skill folder:

```
./scripts/
```

| Script | Purpose |
|--------|---------|
| `instantly_autoreply.py` | Main auto-reply script |

## Knowledge Base

Campaign knowledge base spreadsheet: `YOUR_CAMPAIGN_KB_SHEET_ID`

Each row contains:
- Campaign ID
- Campaign Name
- Knowledge Base (service details, offers, credentials)
- Reply Examples (tone/style guidance)

## Client Context RAG

Before generating a reply, load additional context:
1. Look up the campaign's client in your CRM for current offers, pricing notes, and positioning
2. Check `./clients/{client-slug}/context.md` for account-specific details
3. Use the knowledge base row as the primary context, supplemented by client files

## Companion Skill

This skill is a companion to **cold-email-campaigns**. Campaigns are created there; replies are handled here.

## Hard Stops

1. **Campaign ID not found in knowledge base** -- STOP and report
2. **Thread contains unsubscribe or hostile language** -- STOP and flag for manual review
3. **Reply would require commitments not in the knowledge base** -- STOP and ask

## Reply Guidelines

- Keep under 100 words
- Match the campaign's established tone
- Address the prospect's specific question or concern
- Steer toward booking a call
- Never make up information not in the knowledge base or client context
- Never discuss pricing specifics unless explicitly in the knowledge base

## Environment

Requires in your project's `.env` file:
```
INSTANTLY_API_KEY
ANTHROPIC_API_KEY
```

## General Rules

- Always load campaign context before generating a reply
- Read the full thread history to maintain conversational continuity
- Flag unusual or sensitive replies for manual review
