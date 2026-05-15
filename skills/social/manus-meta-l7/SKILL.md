---
name: meta-l7-performance
description: Pull a tight last-7-days vs prior-7-days Meta Ads performance snapshot — spend, conversions, CPA, conversion value, and ROAS, with % deltas.
---

# SKILL — Meta L7 Performance Snapshot

> Maturity: experimental. Built originally for the Manus agent runtime.

## PURPOSE

Pull a clean, founder-friendly snapshot of Meta Ads performance for the **last 7 days** compared to the **previous 7 days**. Five numbers only. No fluff, no extra metrics.

This is the report someone who runs a brand should be able to glance at every Monday morning and immediately know whether things are getting better or worse.

---

## METRICS (the only ones that matter for this skill)

1. **Total spend**
2. **Total conversions** (purchases)
3. **Cost per conversion** (CPA = spend / conversions)
4. **Conversion value** (purchase value)
5. **ROAS** (purchase ROAS = conversion value / spend)

Each shown for **Last 7 days** and **Prior 7 days**, with the **% delta** between them.

Do not add other metrics. Do not add CTR, CPM, frequency, impressions, reach, video views, or anything else. The whole point is signal over noise.

---

## WHAT YOU NEED

- Access to the user's Meta Ads account (Ads Manager, Meta Marketing API token, or an export the user pastes in)
- The **ad account ID** (format: `act_XXXXXXXXXX`)
- Today's date (used to define the two 7-day windows)

---

## INPUTS TO ASK FOR

Ask only if the user has not already provided them:

1. **Ad account ID** — `act_XXXXXXXXXX`
2. **Access method** — one of:
   - Marketing API access token (preferred — you'll call the API directly). Token comes from `META_ACCESS_TOKEN` in your project's `.env` file (see `.env.example`).
   - The user will paste a CSV/screenshot export from Ads Manager
3. **Currency** — optional; infer from the account if possible

If anything is missing, ask once, then proceed.

---

## STEP-BY-STEP

### Step 1 — Define the date windows

Let `today` = the current date.

- **Last 7 days:** `today - 7` through `today - 1` (inclusive, 7 days, excludes today since today is partial)
- **Prior 7 days:** `today - 14` through `today - 8` (inclusive, 7 days)

Always use full days. Never include today (it's incomplete and skews the numbers).

### Step 2A — If using the Marketing API

Call the Meta Marketing API Insights endpoint **twice**, once per window:

```
GET https://graph.facebook.com/v21.0/{ad_account_id}/insights
  ?level=account
  &time_range={"since":"YYYY-MM-DD","until":"YYYY-MM-DD"}
  &fields=spend,actions,action_values,purchase_roas
  &access_token={META_ACCESS_TOKEN}
```

From the response:
- **Spend** → `spend`
- **Conversions** → from `actions`, sum the `value` of the action with `action_type` = `offsite_conversion.fb_pixel_purchase` (fall back to `purchase` if pixel purchases aren't present)
- **Conversion value** → from `action_values`, same action type as above
- **ROAS** → from `purchase_roas` (use the `value` field). If absent, compute it as `conversion_value / spend`
- **CPA** → compute as `spend / conversions`

### Step 2B — If the user pastes an export

Ask the user to paste a CSV or screenshot from Ads Manager covering **both** date windows (or two exports, one per window). The required columns:

- Amount spent
- Purchases (or Website purchases)
- Cost per purchase
- Purchase conversion value (or Website purchase conversion value)
- Purchase ROAS (or Website purchase ROAS)

Parse those numbers directly. Do not guess missing values.

### Step 3 — Compute % deltas

For each metric:

```
delta_pct = ((last_7d - prior_7d) / prior_7d) * 100
```

Round to 1 decimal place. Show a `+` for increases, `-` for decreases. If `prior_7d` is 0, show `n/a`.

For CPA, a **decrease** is good. For every other metric, an **increase** is good.

### Step 4 — Output the snapshot

Output **exactly** this format and nothing else above it:

```
# Meta L7 Snapshot — {ad_account_name or ID}

**Last 7 days:** {since} → {until}
**Prior 7 days:** {since} → {until}

| Metric           | Last 7d   | Prior 7d  | Δ        |
|------------------|-----------|-----------|----------|
| Spend            | {value}   | {value}   | {+/-X%}  |
| Conversions      | {value}   | {value}   | {+/-X%}  |
| Cost / Conv.     | {value}   | {value}   | {+/-X%}  |
| Conv. Value      | {value}   | {value}   | {+/-X%}  |
| ROAS             | {value}   | {value}   | {+/-X%}  |

**Takeaway:** {one sentence}
```

Format money values in the account's currency with thousands separators (e.g. `$12,430.55`). Format ROAS as a multiple to 2 decimal places (e.g. `3.42x`). Format conversions as whole numbers.

### Step 5 — Write the takeaway

One sentence. Plain English. Name the biggest mover and say whether things got better or worse overall. Examples:

- *"Spend held steady but ROAS dropped from 3.8x to 2.9x — efficiency is slipping, likely worth a creative refresh."*
- *"Spend up 22% and ROAS up to 4.1x — scaling is working, keep going."*
- *"Conversions dropped 35% on flat spend — something broke this week, check tracking and recent creative changes first."*

No hedging. No "it depends." One clear read.

---

## HARD STOPS

- If the ad account has **zero purchases** in either window, say so plainly and stop. Do not invent a CPA or ROAS.
- If the user only provides data for one window, ask for the other — never compare against an estimate.
- Never include metrics outside the five listed above, even if the user's export contains them.
- Never include today's date in either window.
- If the API call fails, surface the actual error message — don't paper over it.

---

## QUALITY CHECKS BEFORE DELIVERING

- [ ] Both date windows are exactly 7 days
- [ ] Today's date is excluded
- [ ] All five metrics are present for both windows
- [ ] All five % deltas are computed
- [ ] CPA delta is interpreted correctly (lower = better)
- [ ] Money values use the account currency
- [ ] ROAS is shown as a multiple (e.g. `3.42x`), not a percentage
- [ ] The takeaway is one sentence, no hedging
- [ ] No metrics outside the approved five appear in the output
