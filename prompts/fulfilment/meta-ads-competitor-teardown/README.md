# Meta Ads Competitor Teardown

## What it is
A prompt that reverse-engineers any brand's live Meta (Facebook + Instagram) ad strategy using only the public Ad Library. Output: format mix, messaging-angle distribution, their likely winners (45+ day runs), creative-fatigue signals, and 3 gap-based test concepts a competitor could ship.

## What problem it solves
Most teams guess what's working in their category. The Meta Ad Library has the answer — but parsing 40 ads by hand takes hours. This prompt does it in one paste.

## Where to use it
Claude.ai (Pro recommended — it can browse the Ad Library directly). Free tier works if you paste 5-10 screenshots from the Ad Library URL.

## How to run it
1. Paste PROMPT.md.
2. Drop a brand URL or Facebook page name.
3. If Claude can't auto-find the Ad Library, paste the page URL.

## Inputs and outputs
**In:** brand URL or Facebook page name.
**Out:** format mix table, angle distribution, repeated heros, fatigue signals, gap list, 3 test concepts.

## Known limitations
- No spend or performance data — that's not public.
- "Winners" are inferred from run duration. A brand running a bad ad for 60 days will look like a winner.
- Brands with fewer than 5 active ads don't produce a useful teardown.
