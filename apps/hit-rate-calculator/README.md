# Hit-Rate Calculator

## What it is
A single-page lead-magnet calculator. A prospect enters their Meta-ads creative-testing numbers (creatives launched, spend, ads that hit, churn, scale stats) and gets back a styled multi-section report scoring their creative pipeline: hit rate, churn rate, replenishment coverage gap, and recommended monthly test volume.

## What problem it solves
Agencies and in-house ad teams pitch "creative testing" services but their prospects rarely know their own numbers. This tool turns a vague conversation ("we need more creative") into a quantified diagnostic ("you launch 200 ads/month, your hit rate is 13%, you need to launch 340/month to keep scale fed"). It doubles as an email-capture lead magnet at the report-reveal step.

## Maturity
`working` — single static HTML file; calculator math runs entirely client-side.

## How to run it

```bash
cd apps/hit-rate-calculator
# Serve the static file any way you like, e.g.:
python3 -m http.server 8080
# then open http://localhost:8080
```

Or drop `index.html` into any static host (Vercel, Netlify, Cloudflare Pages, S3, GitHub Pages). No build step.

The email-capture form POSTs to a relative `/api/capture` endpoint. Implement that endpoint in your host of choice if you want to forward captured leads to your ESP (Brevo, Sendgrid, Mailchimp, etc.). See `.env.example` for the provider keys you'd typically need.

## Inputs and outputs
**In:** Hand-entered numbers from the prospect (test creatives, spend, hits, churn, scaled ads, monthly graduates, etc.) plus their email at the gate.
**Out:** A styled four-panel report rendered in the same page, plus a captured `{ name, email }` payload POSTed to `/api/capture`.

## Where to extend it
- Math and report layout: `index.html` (the `generateReport()` function and the HTML template that follows it).
- Branding: the CSS variables at the top of the `<style>` block (`--bg`, `--signal`, font stack) and the `Acme Agency` strings.
- Email capture: swap the `/api/capture` endpoint for your own URL.

## Known limitations
- Self-reported inputs — garbage in, garbage out. No validation of plausibility ranges.
- The calculator framework (hit rate / replenishment / coverage gap) is opinionated. It assumes a Meta-style test-then-scale pipeline; it does not fit creator-led TikTok-style "always-on" testing well.
- Lead capture is fire-and-forget. If `/api/capture` fails the report still renders — by design, so the prospect isn't blocked, but it does mean you can drop leads silently.
