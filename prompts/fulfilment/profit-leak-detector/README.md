# Profit Leak Detector

## What it is
A forensic-style prompt that takes any operating data you can paste in — SaaS subscriptions, a Stripe or Shopify export, a rough P&L — and surfaces the top 5 places a business is bleeding money, ranked by annual dollar impact.

## What problem it solves
Most operators know their margin is softer than it should be but can't point to where. Hiring a consultant for that costs thousands and takes weeks. This prompt produces a usable audit in one paste.

## Where to use it
Claude.ai (paste-and-go). Works on free or Pro. Pro lets you attach CSV exports directly.

## How to run it
1. Open a new Claude.ai chat.
2. Paste PROMPT.md as the first message.
3. Follow up with whatever data you have — subscription list, Stripe export, P&L, ad spend.
4. Say "Run a profit leak audit."

## Inputs and outputs
**In:** SaaS list, Stripe / Shopify export, rough P&L, ad spend by platform, headcount.
**Out:** A ranked table of the top 5 leaks with annual dollar impact, a 48-hour fix list, and a one-line total recovery estimate.

## Known limitations
- Estimates are only as sharp as the data you paste. Garbage in, vague out.
- Doesn't replace a real fractional CFO for anything above ~$5M revenue.
- Won't catch leaks that don't show up in the data sources listed (e.g. a bad lease).
