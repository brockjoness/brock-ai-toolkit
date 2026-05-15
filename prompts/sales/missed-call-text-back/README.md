# Missed-Call Text-Back Automation

## What it is
A two-tier prompt that drafts the perfect text-back to a missed call in the business owner's voice. Tier 1 is on-demand: paste the call context, get the SMS. Tier 2 is scheduled: Claude watches Gmail for missed-call alerts from OpenPhone / GHL / RingCentral and queues replies into Notion.

## What problem it solves
Whoever texts back first wins ~78% of local-service jobs, and most competitors never reply at all. The blocker isn't effort — it's deciding what to say. This prompt removes the decision.

## Where to use it
Claude.ai (paste into a Project for Tier 1; add a Schedule for Tier 2). No Twilio, no Make, no A2P 10DLC — you send from your own phone, so carrier rules don't apply.

## How to run it
Tier 1:
1. Create a Claude Project "Missed Call Replies", paste the skill block as instructions.
2. When a call comes in, type: `{number} called at {time} — voicemail said: {gist}` and copy the reply.

Tier 2:
1. Do Tier 1 first.
2. Enable Gmail + Notion connectors.
3. Create a "Missed Call Log" database (Caller Number, Time, Voicemail Gist, Draft SMS, Status).
4. Add a Schedule running every 15 min with the scheduled prompt.

## Inputs and outputs
**In:** caller number, time of call, voicemail content, caller name if known.
**Out:** one SMS under 160 chars in the owner's voice, ready to copy.

## Known limitations
- You still hit Send manually — the prompt cannot text from your phone.
- Tier 2 requires your phone provider to email missed-call alerts (OpenPhone, GHL, RingCentral, Aircall, Dialpad all do this by default).
