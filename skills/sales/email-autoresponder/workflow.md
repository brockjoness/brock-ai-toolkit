# Email Autoresponder Workflow

## Trigger
Asks to check email, reply to emails, or handle a specific inbox (e.g., "check my brand-a email", "reply to that thread", "go through my inboxes").

## Step 1: Identify Target Inbox(es)

- If an account is specified → use that MCP server (e.g., `gmail-brand-a`).
- If "check my email" or "go through everything" → check all configured accounts in order:
  1. `gmail-personal`
  2. `gmail-brand-a`
  3. `gmail-brand-b`
  4. `gmail-brand-c`

## Step 2: Fetch & Scan Inbox

For each target inbox:
1. Use the Gmail MCP tools to fetch recent/unread emails.
2. Scan subject lines and senders to build a quick summary.
3. Categorize each email into: **Reply**, **Flag**, or **Ignore** (per rules.md).

Present a summary:

```
## {Account Name} Inbox

**Reply** (drafts ready):
- [Sender] — Subject — 1-line context

**Flagged** (needs your eyes):
- [Sender] — Subject — why it's flagged

**Ignored**: 3 newsletters, 2 automated notifications
```

Wait for confirmation on which emails to proceed with, or "draft all".

## Step 3: Draft Replies

For each email marked for reply:
1. Read the full email thread for context.
2. Draft a reply following the tone and rules in rules.md.
3. Match the signature to the account being used.

Present each draft:

```
**To:** recipient@email.com
**Subject:** Re: Original Subject

Draft body here.
```

Note: Do not include a signature — Gmail applies each account's native signature automatically on send.

## Step 4: Approval Loop

- Wait for approval on each draft.
- **"send"** / **"good"** / **"go"** → send via Gmail MCP.
- **Revision request** → revise and re-present. Do not send.
- **"skip"** → move to next email without sending.
- **"skip all"** → stop processing remaining drafts.

## Step 5: Send & Confirm

After approval:
1. Send the reply using the Gmail MCP tools.
2. Confirm: "Sent reply to [Sender] from {account}."
3. Move to the next draft.

## Step 6: Wrap-Up

After all inboxes are processed:

```
## Done
- Sent: 4 replies (2 brand-a, 1 personal, 1 brand-b)
- Flagged: 2 emails for your review
- Skipped: 1 draft
```

## Error Handling

| Issue | Action |
|-------|--------|
| MCP server won't connect | Report which account failed. Suggest re-running OAuth: "Run `npx @gongrzhe/server-gmail-autoauth-mcp` to re-auth {account}." |
| OAuth token expired | Same as above — the MCP package handles token refresh, but manual re-auth may be needed. |
| Email send fails | Show the error. Do not retry automatically — ask how to proceed. |
| Ambiguous email (Reply vs Flag?) | Default to Flag. Better to surface than draft a bad reply. |
