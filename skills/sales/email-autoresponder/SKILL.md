# Email Autoresponder

## Overview
Multi-account Gmail integration for reading and replying to emails across all of your inboxes. Uses the `@gongrzhe/server-gmail-autoauth-mcp` MCP server, one configured instance per account.

## Accounts

| MCP Server ID | Inbox | Credentials Path |
|---------------|--------|-----------------|
| `gmail-personal` | Personal | `~/.secrets/email-autoresponder/personal/` |
| `gmail-brand-a` | Brand A | `~/.secrets/email-autoresponder/brand-a/` |
| `gmail-brand-b` | Brand B | `~/.secrets/email-autoresponder/brand-b/` |
| `gmail-brand-c` | Brand C | `~/.secrets/email-autoresponder/brand-c/` |

Add or remove entries to match your setup.

Each account folder at `~/.secrets/email-autoresponder/{account}/` contains:
- `credentials.json` — Gmail OAuth token (auto-refreshes)
- `gcp-oauth.keys.json` — GCP OAuth client ID and secret

## MCP Configuration
All Gmail MCP servers are configured in your Claude project's `.mcp.json`. Each server points to the credential files at `~/.secrets/email-autoresponder/{account}/`.

## Setup
1. Credentials are stored locally at `~/.secrets/` (not in any cloud sync)
2. GCP OAuth keys can be shared across all accounts if they use the same GCP project
3. Each `credentials.json` holds account-specific OAuth tokens
4. First-time auth for a new account requires browser-based OAuth flow — the `@gongrzhe/server-gmail-autoauth-mcp` package handles this

## Usage
When you ask to check or reply to emails, the skill uses the appropriate `gmail-{account}` MCP server tools. Match the account to the context of the conversation.

## Voice Profile

The full voice guide (greetings, common phrases, banned phrases, sign-offs, per-context tone) lives in `rules.md`. Replace it with your own writing rules before using this skill — the included rules are calibrated for one specific writer and will not match yours.

## Reference Examples

The included `rules.md` shows three example tones for three brand contexts (warm partnership, brief operational, polished sales). Edit them to match how you actually write.
