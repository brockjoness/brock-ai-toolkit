# Social skills

A collection of Claude skills Brock Jones uses to run the content side of his work — YouTube, Instagram, and a personal newsletter. Each skill is a self-contained folder with a `SKILL.md` (the prompt/instructions Claude loads), a `README.md` (this folder's one-pager), and optional scripts and reference files.

These are the actual skills, not toy examples. They have been sanitized for public release — secrets and client names have been stripped, and personal references (where they describe Brock's own brand, like Clickflow) have been left in with a note to adapt for your own use.

| Skill | What it does | Maturity |
|---|---|---|
| [`clickflow-newsletter`](./clickflow-newsletter) | Drafts newsletter emails from voice dumps or cleans up typed drafts in a single author's voice. | working |
| [`content-ideation`](./content-ideation) | Generates a 7-day content calendar (YouTube + IG + newsletter) grounded in your real skill inventory. | working |
| [`instagram-carousel-generator`](./instagram-carousel-generator) | Turns card-by-card scripts into 1080x1080 HTML files in one of six visual styles. | working |
| [`manus-meta-l7`](./manus-meta-l7) | Pulls a 7d-vs-prior-7d Meta Ads snapshot — five metrics only. | experimental |
| [`remotion-edit`](./remotion-edit) | Remotion video edit pipeline that renders 16:9 + 9:16 from a single talking-head MP4. | working |
| [`youtube-description`](./youtube-description) | Generates YouTube descriptions from timestamped transcripts. | working |
| [`youtube-thumbnails`](./youtube-thumbnails) | Generates thumbnails with Gemini, matching the creator's face direction from a personal reference library. | working |

## Conventions

- Each skill lives in its own folder.
- `SKILL.md` is the file Claude loads.
- `README.md` is for humans evaluating whether the skill is useful.
- `.env.example` lists the env vars the skill needs (if any). Copy to `.env` in the project where you'll run the skill.
- Generated outputs (`output/`, `reference-photos/`, etc.) are not in this repo. The skills create those folders at runtime.

## Adapting these to your own work

Several skills reference Brock's personal brand (Clickflow) or his own opinionated rules (newsletter voice). Those are intentional — this is his repo. When you adopt a skill, look for the "adapt to your own" notes in each `SKILL.md` and rewrite the parts that encode Brock's preferences (banned words, sign-off, color tokens, etc.).

See `_FLAGS.md` in this folder for anything the sanitization pass flagged for human review.
