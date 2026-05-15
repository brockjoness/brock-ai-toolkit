# instagram-carousel-generator

## What it is
A Claude skill that turns a card-by-card carousel script into a folder of 1080x1080 HTML files, one per card, ready to screenshot and post to Instagram. Six visual styles (editorial, bold text, dark tech, clean infographic, gradient neon, whiteboard diagram).

## What problem it solves
Designing IG carousels in Figma or Canva is slow and locks you into one tool. This skill produces self-contained HTML files you can open in Safari, full-screen, and screenshot. The aesthetic is consistent across cards because the style guides are programmatic.

## Maturity
`working` — Brock uses Clickflow-branded variants for @brockmjones.

## How to run it
1. Maintain a style registry at `instagram/styles/_registry.md` and per-style markdown files (one per style slug) in your workspace. Each style file defines tokens, typography, and a Quick-Start HTML template. (Not shipped in this repo — bring your own.)
2. (Optional) For `editorial-minimalism`, set up a photo folder structure with date subfolders containing numbered photos (`1.jpg`, `2.jpg`, ...).
3. Trigger Claude with "create carousels for [topic]" or "build the carousel slides".

No env vars needed — the skill is prompt + HTML only.

## Inputs and outputs
**In:** `CARD_SCRIPTS` (the card-by-card text) and `STYLE` (one of six slugs).
**Out:** One `card-NN.html` per card under `output/[style-slug]/[series-slug]/`, plus a summary with screenshot instructions.

## Where to extend it
- Add a new style by writing a new style guide in `instagram/styles/<slug>.md` and registering it in `_registry.md`.
- Override colors per brand via a `--brand` flag and brand tokens in the registry.

## Known limitations
- The style guides themselves are not shipped here — you need to build your own visual system or copy one. The `SKILL.md` describes the contract.
- Only `editorial-minimalism` uses real photos. Other styles are CSS-only.
- Output is HTML, not PNG. You screenshot manually (or wire up Puppeteer separately).
