# Appointment No-Show Recovery

## What it is
A scheduled prompt that runs a 3-touch email recovery sequence on no-showed appointments. Touches get gentler over 72 hours — first assumes good faith, second offers an easy out, third gives permission to close the file.

## What problem it solves
Med spas lose 15-25% of booked revenue to no-shows. Service trades lose even more because the time block burns. Most businesses do nothing. This recovers 20-40% of missed appointments without sounding pushy.

## Where to use it
Claude.ai (Project + Schedule). Email-only by default. SMS optional — Claude drafts it, you send.

## How to run it
1. Pick your no-show signal: Google Calendar event title contains "NO-SHOW", or Notion Status field flipped to "No-Show".
2. Create Notion database "No-Show Sequences" (Customer, Email, Appointment Time, Stage, Last Touch).
3. Create Claude Project, paste skill block as instructions.
4. Add Schedule every 30 min with the scheduled prompt.

## Inputs and outputs
**In:** a calendar event tagged NO-SHOW or a CRM row with Status = No-Show.
**Out:** up to 3 emails over 72 hours, stops automatically on rebook or reply.

## Known limitations
- The 15-min buffer before Touch 1 is intentional — lets front desk un-tag accidents. Don't shorten it.
- Won't auto-respond to substantive replies — those pause the sequence and flag you.
- Google policy: never offer incentives or filter by sentiment.
