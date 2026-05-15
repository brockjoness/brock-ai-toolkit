# Cold Email Campaigns

## What it is
Given a client description and three offers, this skill generates three full cold email campaigns — each with an A/B-tested first email, a follow-up bump, and a breakup — and deploys them to Instantly via API. It pulls client context from your CRM (or a local file) and uses Instantly's merge variables for personalization.

## What problem it solves
Spinning up a new cold email campaign takes hours: writing three angles, drafting six emails per angle, setting up A/B variants, configuring schedules, mapping merge fields. This skill collapses that to one command and presents the copy for review before anything is deployed.

## Maturity
`working` — Production-shaped, with a human review gate before deploy. Quality depends entirely on the client context you feed it.

## How to run it

Trigger phrases: `create cold email campaigns for {client}`, `build Instantly campaigns for {client}`.

```bash
python3 ./scripts/instantly_create_campaigns.py \
  --client_name "Acme Corp" \
  --client_description "..." \
  --offers "Offer 1|Offer 2|Offer 3" \
  --target_audience "DTC founders, $1M-$10M ARR" \
  --social_proof "Scaled X to $Y..."
```

Required env (in your project's `.env`):
- `INSTANTLY_API_KEY`
- `ANTHROPIC_API_KEY`

Optional: a per-client context file at `./clients/{client-slug}/context.md`.

## Inputs and outputs
**In:** Client name, description, target audience, social proof, and 3 offers (or generated offers).
**Out:** Three deployed Instantly campaigns (paused, ready to launch). Copy is presented for human review first.

## Where to extend it
- `rules.md` — campaign structure, available Instantly merge variables, hard stops
- `./examples/campaigns.md` — drop in your own example campaigns to bias the generator

## Known limitations
- Hard-coded to Instantly's API (variable names, schedule format). Porting to Lemlist/Smartlead means rewriting the deploy script.
- Timezone is set to `America/Chicago` because not all IANA strings work in Instantly — edit at the script level.
- Generated copy is a starting point. Always read it before launching.
