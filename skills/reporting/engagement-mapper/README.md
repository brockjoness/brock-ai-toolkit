# Engagement Mapper

## What it is
A skill that takes time-series engagement data (impressions, clicks, comments, opens, etc.) and maps it across day-of-week and hour-of-day to find when an audience is most responsive. Output is a daypart heatmap plus a recommended posting/spending schedule.

## What problem it solves
"When should we post?" and "when should we shift budget?" are usually answered by gut feel. This skill converts actual platform data into a clear daypart pattern and a concrete schedule recommendation, which can feed into ad scheduling, organic posting cadence, or email send timing.

## Maturity
`experimental`

## How to run it
Trigger with "Run engagement mapper for [Client]" with a time-series dataset attached (CSV/XLSX with timestamps and engagement metrics). No external APIs required.

## Inputs and outputs
**In:** A dataset with timestamped engagement events (post-level, ad-level, or email-level), ideally covering 4+ weeks.
**Out:** A daypart heatmap (rendered as text/HTML) plus a ranked list of high-performing day×hour cells and a draft posting/spend schedule.

## Where to extend it
- Add new engagement metrics: extend the parser in `skills/skill-0-parse-timeseries.md`.
- Change the heatmap rendering style: edit `skills/skill-1-daypart-analysis.md`.

## Known limitations
- Works best with at least 4 weeks of data; under that, recommendations are noisy.
- Does not separate paid vs organic engagement signal.
- Timezone handling is single-timezone only; international audiences need pre-segmentation.
