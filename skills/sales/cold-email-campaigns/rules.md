# Cold Email Campaigns -- Rules

## Activation Triggers

- "create cold email campaigns for {client}"
- "set up email campaigns for {client}"
- "build Instantly campaigns for {client}"
- "cold outreach for {client}"

## Scripts

Scripts are referenced relative to this skill folder:

```
./scripts/
```

| Script | Purpose |
|--------|---------|
| `instantly_create_campaigns.py` | Creates campaigns via Instantly API |
| `read_sheet.py` | Read lead data if needed |

## Campaign Examples

Drop example campaigns into `./examples/campaigns.md` to bias the generator's output. The file is read at generation time.

## Client Context Loading

Before generating campaigns, load client context:
1. Check if a client context file exists at `./clients/{client-slug}/context.md`
2. Check your CRM for the client record (offers, positioning, target audience)
3. If neither exists, ask for client description, offers, and target audience

## Campaign Structure

Each campaign (3 total, one per offer) contains:

### Email 1 (A/B Split Test)
- Personalization hook (`{{icebreaker}}` or custom opener)
- Social proof (credentials, results)
- Offer (clear value proposition)
- Soft CTA

### Email 2 (Follow-up Bump)
- Brief, friendly bump
- Reference original email
- Restate value
- Clear CTA

### Email 3 (Breakup)
- Short, direct
- Last chance framing
- Simple yes/no ask

## Available Instantly Variables

- `{{firstName}}`, `{{lastName}}`, `{{companyName}}`, `{{casualCompanyName}}`, `{{icebreaker}}`, `{{sendingAccountFirstName}}`

## Hard Stops

1. **No client description or context** -- STOP and ask for details
2. **No offers provided and cannot be inferred** -- generate 3 distinct offers from description, confirm before deploying

## API Notes

- Schedule requires `name` field in each schedule object
- Timezone: Use `America/Chicago` (not all IANA values work)
- HTML: Instantly strips plain text outside HTML tags -- wrap in `<p>` tags

## Environment

Requires in your project's `.env` file:
```
INSTANTLY_API_KEY
ANTHROPIC_API_KEY
```

## General Rules

- Always present campaign copy for review before deploying to Instantly
- Keep emails under 150 words
- Never use aggressive or hard-sell CTAs
- Differentiate each campaign's angle -- don't repeat the same approach 3 times
