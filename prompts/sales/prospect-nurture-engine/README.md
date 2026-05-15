# Prospect Nurture & Auto Follow-Up Engine

## What it is
An always-on, three-motion nurture engine designed for real estate agents (but adapts to any slow-cycle service business). Handles missed-call text-back, no-show recovery, and a monthly check-in that pulls fresh content from the agent's own blog and socials.

## What problem it solves
Agents lose 30-50% of leads to bad follow-up — buyers fill out a form, go to one showing, then nothing. This engine runs the entire follow-up cadence from one Notion pipeline, stops the moment a lead converts or opts out, and never auto-responds to a real reply.

## Where to use it
Claude.ai (paste the prompt into a Project + a Schedule). Works with Notion + Gmail connectors. SMS is pluggable: Claude drafts (Method A), OpenPhone API (Method B), or Twilio (Method C).

## How to run it
1. Create Notion databases: "Lead Pipeline" and "Missed Calls" (schemas in PROMPT.md).
2. Create a Claude Project "Realtor Nurture Engine" — paste the skill block as instructions.
3. Create a Schedule running every hour — paste the scheduled prompt.
4. Dry-run mode: Claude shows drafts for the first 2 leads in each motion before sending.

## Inputs and outputs
**In:** new lead row, missed-call row, no-show event, or rolling monthly anchor.
**Out:** SMS draft or send + email follow-up + Notion status update + escalation email to the agent only when human attention is needed.

## Known limitations
- TCPA compliance is on you — every lead must have given consent before being added.
- Method C (Twilio) requires A2P 10DLC brand registration; expect 1-2 weeks for approval.
- Gmail caps at ~500 sends/day free / ~2,000/day Workspace — fine for monthly cadence even with thousands of leads.
- Method A is human-in-the-loop for sends — replies need to be tagged manually.
