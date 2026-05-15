# Review Request Automation

## What it is
A scheduled prompt that watches your Gmail for invoice-paid emails (Stripe, Square, QuickBooks), then sends a review request from your own Gmail in your voice, runs two follow-ups, and stops on reply or review.

## What problem it solves
Most local businesses get 1 review for every 20-30 happy customers because nobody asks. This asks every time, in a voice that sounds like a text from the owner — not a corporate blast. 3-5x more Google reviews on the same job volume.

## Where to use it
Claude.ai (Project + Schedule). Gmail + Notion connectors required.

## How to run it
1. Create Notion database "Review Request Log" (Customer, Email, Service Date, Last Touch Sent, Touch Stage).
2. Create Claude Project, paste skill block.
3. Add Schedule daily at 6pm with scheduled prompt.
4. Get your direct review link from Google Business Profile → Reviews → "Share review form".

## Inputs and outputs
**In:** invoice-paid emails arriving in Gmail.
**Out:** up to 3 review-request emails per customer, sent from your Gmail in your voice, with a private-feedback redirect for unhappy customers in the SAME email.

## Known limitations
- Google policy: this prompt is compliant only because it never filters by sentiment and never offers incentives. Don't modify those rules — Google delists profiles for it.
- Won't detect actual posted reviews unless you wire up the Google Business Profile API. The reply check catches most stop conditions.
- $50 threshold filters spam-tier transactions — tune up or down for your business.
