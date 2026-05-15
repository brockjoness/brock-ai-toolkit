# Cold Email Auto-Reply

## What it is
A reply manager for cold email campaigns running in Instantly. When a prospect replies, this skill looks up the originating campaign in a knowledge-base sheet, pulls additional client context, and drafts a short, on-brand reply that continues the conversation toward a booked call. Replies go back through the Instantly API.

## What problem it solves
Cold campaigns die when replies sit unanswered. Manually replying means re-loading context for every thread — which campaign, which offer, what the rules of engagement are. This skill compresses that into one tool call and keeps tone consistent across hundreds of threads.

## Maturity
`working` — Solid, but the knowledge-base lookup is brittle if the sheet format drifts.

## How to run it

Trigger phrases: `handle Instantly replies`, `process email replies for {campaign}`, `auto-reply to campaign threads`.

```bash
python3 ./scripts/instantly_autoreply.py --thread_id <THREAD_ID>
```

Required env (in your project's `.env`):
- `INSTANTLY_API_KEY`
- `ANTHROPIC_API_KEY`

Required setup:
- A Google Sheet acting as the campaign knowledge base (set `YOUR_CAMPAIGN_KB_SHEET_ID` in `rules.md`). Each row: Campaign ID, Campaign Name, Knowledge Base text, Reply Examples.
- Optional: a per-client context file at `./clients/{client-slug}/context.md`

## Inputs and outputs
**In:** An Instantly thread ID (from a webhook or manual input).
**Out:** A reply sent through the Instantly API, under 100 words, tone-matched to the campaign.

## Where to extend it
- `rules.md` — reply guidelines, hard stops, knowledge-base schema
- The knowledge-base sheet — add new campaigns by adding rows

## Known limitations
- Pairs only with [`cold-email-campaigns`](../cold-email-campaigns) (campaigns must exist there for the KB lookup to work).
- Hard-stops on unsubscribe / hostile language by design; those need human review.
- Won't make pricing or timeline commitments not present in the knowledge base — a feature, not a bug.
