# SKILL 3: Team Chat Notification

## When to use

After Skill 2 has written talking points to Notion. Final skill.

## What to do

### Step 1: Compose the message

```
Call prep complete for *{company_name}* ({agency})

Audit: {vercel_url or existing_audit_url}
CRM: {notion_url}

Top talking points:
- {1-line summary of talking point 1}
- {1-line summary of talking point 2}
- {1-line summary of talking point 3}
```

### Step 2: Send to your team channel

Use your team chat MCP (Slack, Discord, etc.) to send the message to `#your-team-channel`.

### Step 3: Confirm completion

> "Call prep complete for **{company_name}**. Notification sent to #your-team-channel."

## Error handling

- If chat MCP is not configured or unavailable: Skip silently, report completion in conversation
- If send fails (auth error, channel not found): Report and do not retry

## Final step

Present a final summary:
> "Call prep complete for **{company_name}** ({agency})."
>
> **Audit URL**: {vercel_url or existing_audit_url}
> **CRM page**: {notion_url}
> **Talking points**: Written to Notion
> **Chat**: Sent to #your-team-channel [or: skipped]
