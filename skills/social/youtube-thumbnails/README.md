# youtube-thumbnails

## What it is
A Claude skill that generates high-CTR YouTube thumbnails using Google's Gemini image model (Nano Banana Pro). It matches the creator's face direction (yaw/pitch) against a library of personal reference photos so the generated face actually looks like the creator. Three modes: concept (from text), reference (recreate an existing thumbnail's layout with your face), and edit (refine a generated image).

## What problem it solves
Generic AI-generated thumbnails look generic. By feeding the model 2 reference photos of you with a matching head pose, you get thumbnails that read as you on the YouTube grid. Four style presets (`clickflow`, `hormozi`, `saraev`, `minimal`) cover different visual languages.

## Maturity
`working` — Brock's daily thumbnail pipeline.

## Photo library expectation
**This skill requires a personal reference photo library — not shipped.** You need to:
1. Drop 30-40 photos of yourself into `reference-photos/raw/` (varied angles and expressions).
2. Run `scripts/analyze_face_directions.py` to detect yaw/pitch with MediaPipe and rename each photo as `subject_yaw{L/R}{deg}_pitch{U/D}{deg}.jpg`.
3. From then on, `generate_thumbnail.py` will auto-pick the 2 photos with the closest matching pose.

Without your own photos the skill will still run, but face consistency will be poor — the model has nothing to anchor to.

## How to run it
1. Set `NANO_BANANA_API_KEY` in your project's `.env` (see `.env.example`). This is a Google Gemini API key.
2. Build your reference photo library (above).
3. Run:
   ```bash
   # Concept mode
   python scripts/generate_thumbnail.py --concept "shocked at 5 inboxes being answered by AI" --style clickflow --title "AI Answers My Emails"

   # Reference mode (recreate an existing thumbnail's layout)
   python scripts/generate_thumbnail.py --reference "https://youtube.com/watch?v=VIDEO_ID" --style hormozi

   # Edit pass
   python scripts/generate_thumbnail.py --edit output/.../104016_1.png --prompt "Change text to 'AI RUNS MY DAY'. Make background darker."
   ```

Python deps: `google-genai`, `mediapipe`, `opencv-python`, `Pillow`, `numpy`, `python-dotenv`, `requests`.

## Inputs and outputs
**In:** `CONCEPT` text + `STYLE` preset (`clickflow` default, or `hormozi`/`saraev`/`minimal`) + optional `TITLE`, `EXPRESSION`, `REFERENCE_URL`, `VARIATIONS`.
**Out:** N PNG files (default 3) saved to `output/YYYY.MM.DD/HHMMSS_N.png`, ~1376x768.

## Where to extend it
- `STYLE_PROMPTS` in `scripts/generate_thumbnail.py` — add or tweak style presets.
- `EXPRESSION_DEFAULTS` — adjust default face expression per style.
- `format_angle()` in `analyze_face_directions.py` — change the pose-binning granularity (currently 5°).

## Known limitations
- Quality is bounded by your reference photo library. Bin coverage matters — if you only have center-facing photos, side-angle thumbnails will be poor.
- Gemini image generation has variable latency (10-60+ seconds) and costs ~$0.14-0.24 per image.
- The `reference` mode downloads YouTube's thumbnail; it can fall back to lower resolutions if `maxresdefault` doesn't exist.
- The skill uses 2 reference photos per generation — 1 loses likeness, 3+ causes regeneration issues per Brock's testing.
