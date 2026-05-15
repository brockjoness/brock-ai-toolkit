---
name: youtube-thumbnails
description: Generate high-CTR YouTube thumbnails using Gemini AI image generation with face-direction matching. Supports concept-based generation and reference-based recreation.
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

# SKILL — YouTube Thumbnail Generator

---

## TRIGGER

- "create thumbnail for [video title]"
- "generate youtube thumbnail"
- "thumbnail for this week's video"
- "recreate this thumbnail with my face"
- Any request referencing a thumbnail concept from the content-ideation skill

---

## WHAT THIS SKILL DOES

Generates high-CTR YouTube thumbnails using Gemini AI (Nano Banana Pro). Takes a concept description (from the content-ideation skill or manual input), matches the creator's best reference photo by face direction, and generates 3 variations. Supports edit passes for text, colors, and element changes.

---

## MODES

### Concept Mode (default)
Generates an original thumbnail from a text description.
```bash
python3 scripts/generate_thumbnail.py --concept "shocked at 5 Gmail inboxes being answered by AI" --style clickflow --title "AI Answers My Emails"
```

### Reference Mode
Recreates the layout/style of an existing high-performing thumbnail with your face.
```bash
python3 scripts/generate_thumbnail.py --reference "https://youtube.com/watch?v=VIDEO_ID" --style hormozi
```

### Edit Mode
Refines a generated thumbnail.
```bash
python3 scripts/generate_thumbnail.py --edit "output/20260325/104016_1.png" --prompt "Change text to 'AI RUNS MY AGENCY'. Make background darker."
```

---

## STYLE PRESETS

| Style | Description | When to Use |
|---|---|---|
| `clickflow` | White/light bg (#FAFAF8), charcoal black text, grid paper texture, yellow underline accents, numbered labels, monochrome icons. Editorial/B2B aesthetic. | **Default.** |
| `hormozi` | Bold text, high contrast, emotional face expression, bright colors. Text COMPLEMENTS title (doesn't repeat). | Bold claims, framework videos, surprising results. |
| `saraev` | Clean whiteboard/diagram background, single focal point, minimal text. Face presenting/pointing at element. | Tutorial walkthroughs, system explanations. |
| `minimal` | Dark gradient background, face on left/right third, one visual element on opposite side. | Deep dives, philosophical content. |

---

## INPUTS

**Required:**
- `CONCEPT` — text description of the thumbnail

**Optional:**
- `TITLE` — text to overlay on the thumbnail
- `STYLE` — one of: `clickflow` (default), `hormozi`, `saraev`, `minimal`
- `REFERENCE_URL` — YouTube URL to use as layout reference (reference mode)
- `VARIATIONS` — number of variations to generate (default: 3)
- `EXPRESSION` — face expression: `shocked`, `confident`, `pointing`, `thinking`

---

## REFERENCE PHOTOS

**You must supply your own.** Photos live at:
```
./reference-photos/
```

**Setup (one-time):**
1. Drop 30-40 photos of yourself into `reference-photos/raw/`
2. Run: `python3 scripts/analyze_face_directions.py`
3. Photos are renamed with yaw/pitch metadata: `subject_yawL30_pitchU10.jpg`

The script automatically selects the best 2 reference photos matching the desired pose.

---

## STEP-BY-STEP WORKFLOW

### Step 1 — Resolve Inputs

If invoked from the content-ideation skill, the thumbnail concept is already defined. If manual, ask:
- "What's the video about? Give me a one-sentence thumbnail concept."
- "Which style? (clickflow / hormozi / saraev / minimal)"

### Step 2 — Select Reference Photos

Find the best-matching reference photos by face direction:
- For `hormozi` style: select photos with direct-to-camera or slightly angled pose
- For `saraev` style: select photos where the subject is gesturing or pointing
- For `minimal` style: select photos with neutral, thoughtful expression

If reference photos don't exist yet, skip face matching and generate with concept description only. Note in output that results will improve with reference photos.

### Step 3 — Build Gemini Prompt

Based on style parameter, construct the generation prompt (see `STYLE_PROMPTS` in `generate_thumbnail.py`).

### Step 4 — Generate Variations

Call Gemini API (`gemini-3-pro-image-preview` via Nano Banana Pro) with 2 reference photos + the concept prompt. Generate `VARIATIONS` count (default 3).

### Step 5 — Save Output

Save to: `./output/YYYY.MM.DD/`

Files named: `{HHMMSS}_{n}.png`

### Step 6 — Present Results

```
Generated 3 thumbnails → [path to output folder]

  1. [path]_1.png — [brief description]
  2. [path]_2.png — [brief description]
  3. [path]_3.png — [brief description]

  Recommendation: #[N] looks strongest because [reason].

  Want to edit any of these? Say "edit [number]" with your changes.
```

### Step 7 — Edit Pass (Optional)

If requested, use the edit endpoint to modify the selected thumbnail.

---

## HARD STOPS

- If `reference-photos/` directory is empty — warn that results will be generic (no face matching), but still generate.
- If `NANO_BANANA_API_KEY` is not set — stop and provide instructions to set it in your project's `.env` (see `.env.example`).
- If Gemini API fails — retry once, then stop and report the error with the prompt that was sent.
- Never generate without a concept — always require at least a one-sentence description.

---

## QUALITY CHECKS BEFORE DELIVERING

- [ ] Output is approximately 16:9 (1280x720 minimum)
- [ ] Face is recognizable (not distorted or blended)
- [ ] Text is readable at thumbnail size (visible at 360x200 in YouTube search results)
- [ ] High contrast between text and background
- [ ] Clear focal point — eye goes to face or text first, not lost in clutter
- [ ] Thumbnail complements the video title (doesn't just repeat it)
- [ ] Style matches the selected preset

---

## API DETAILS

- **Model:** `gemini-3-pro-image-preview` (Nano Banana Pro)
- **API Key:** `$NANO_BANANA_API_KEY` (from your project's `.env`)
- **Cost:** ~$0.14-0.24 per generation/edit
- **Latency:** 10-60+ seconds per image
- **Output:** ~1376x768 (close to 16:9)
- **Optimal reference photos:** 2 per generation (1 loses likeness, 3+ causes regeneration issues)

---

## COMPANION SKILLS

| Skill | How It Connects |
|---|---|
| `content-ideation` | Provides thumbnail concepts in Step 4 of its workflow |

---

## QUICK START

When invoked with "create thumbnail for [title]":

1. Check if reference photos exist in `reference-photos/`
2. Ask: "What's the thumbnail concept? And which style — clickflow (default), hormozi, saraev, or minimal?"
3. Generate 3 variations
4. Present results with recommendation
5. Offer edit pass
