# Email Autoresponder

## What it is
A multi-inbox Gmail triage assistant. You connect one or more Gmail accounts through the [`@gongrzhe/server-gmail-autoauth-mcp`](https://www.npmjs.com/package/@gongrzhe/server-gmail-autoauth-mcp) MCP server (one configured server per inbox), then point Claude at "check my email." The skill scans the inbox(es), categorizes each thread as Reply / Flag / Ignore, drafts replies in your voice, and waits for explicit approval before sending anything.

## What problem it solves
If you run multiple brands or accounts, inbox switching is a serious tax. Most "email automation" tools either send without you (terrifying) or just label things (useless). This skill drafts in your voice and stops at the send button.

## Maturity
`production` — Brock uses this daily across multiple Gmail accounts.

## How to run it
Trigger phrases: `check my email`, `go through my inboxes`, `reply to that thread`.

Setup:
1. Install `@gongrzhe/server-gmail-autoauth-mcp` and run OAuth once per account.
2. Add one MCP server entry per inbox to your Claude config (e.g. `gmail-personal`, `gmail-brand-a`, `gmail-brand-b`).
3. Store credential JSONs locally (NOT in iCloud sync). Default path: `~/.secrets/email-autoresponder/{account}/`.
4. Customize the voice rules in `rules.md` to match how *you* write.

## Inputs and outputs
**In:** "Check my email" / "reply to {thread}" plus your approval/revision feedback per draft.
**Out:** Drafts presented one at a time, each with To / Subject / body. Sent only after you say "send", "good", or "go".

## Where to extend it
- `rules.md` — your voice profile (greetings, banned phrases, sign-offs, per-context tone)
- `workflow.md` — inbox order, reply/flag/ignore categorization

## Known limitations
- No signature in drafts by design; Gmail's native signature is applied on send. You'll want to set the native signature per account.
- Never sends without approval. Good. Not configurable.
- The voice profile in `rules.md` is heavily personalized. Replace it with your own before this is useful.
