# Call Prep

## What it is
An end-to-end sales call preparation workflow. You point it at a Notion CRM page; it reads the page, runs a prospect audit if one doesn't already exist, deploys the audit to Vercel, writes structured talking points back into the Notion page under the current call notes date, and posts a summary to a team chat channel.

## What problem it solves
Sales calls go better when you've actually read the prospect's site, their ads, and your team's internal notes — but doing that for every call is a 30-minute task. This skill collapses it to one command and produces talking points you can scan from your phone on the way to the meeting.

## Maturity
`working` — Used in production by Brock, but depends heavily on the [`prospect-audit`](../prospect-audit) skill which it chains into.

## How to run it
Trigger phrases: `call prep for {Notion page URL}`, `prepare for a call with {Notion page URL}`.

Requires:
- Notion MCP configured (`notion-fetch`, `notion-update-page`)
- A team chat MCP for the completion notification (Slack MCP in the original setup)
- All env vars from the `prospect-audit` skill (this skill delegates to it)

The Notion CRM page must have at minimum a `Company Name`, a `Website` property, and an `Agency` property identifying which brand variant of prospect-audit to run.

## Inputs and outputs
**In:** A Notion CRM page URL.
**Out:** Audit deployed and URL written back to the CRM page; talking points appended to the page body under the current date's call notes; a chat-channel notification with the top three talking points.

## Where to extend it
- `workflow.md` — overall sequence
- `skills/skill-2-talking-points.md` — change how talking points are structured or where they're written
- `skills/skill-3-slack-notify.md` — swap the chat target (channel name + MCP)

## Known limitations
- Hard-coded to expect specific Notion properties (Company Name, Website, Agency, Prospect Audit, Meta Ads Library). If your CRM has different fields, edit skill-0.
- The "agency router" (skill-1) assumes two brand variants of the prospect-audit. Single-brand users can simplify it.
- If the existing audit URL is set but the audit page is offline, the WebFetch fallback in skill-1 will degrade silently — talking points will be thinner.
