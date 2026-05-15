# remotion-edit

## What it is
A Remotion-based video edit pipeline that takes a single talking-head MP4 and renders both 16:9 and 9:16 outputs in a Trey Cockrum (@treyconverts)-inspired style: text-behind-subject, word-by-word kinetic captions, whip/zoom transitions, animated callouts. The skill drives preprocess + LLM-drafted EDL + render; the sibling Remotion project holds the compositions.

## What problem it solves
Manually editing the same talking-head video into two aspect ratios with kinetic typography is the most repetitive part of a creator's workflow. This skill caches the expensive bits (alpha matte, transcript, subject track) keyed by source hash so re-runs are cheap, and the EDL JSON gives the human a single file to polish punchline timing in.

## Maturity
`working` for the pipeline plumbing. The companion Remotion project (`remotion-video-editor/`) that renders the compositions is **not shipped here** — you'll need to provide your own Remotion compositions named `MainEdit16x9` and `MainEdit9x16` that read the EDL via `--props`.

## How to run it

```bash
# One-time setup
./scripts/setup_venv.sh

# For each video
./scripts/preprocess.sh /path/to/input.mp4
./scripts/draft_edl.py --captions ~/.cache/remotion-edit/<hash>/captions.json --source /path/to/input.mp4 --output edl.json

# Edit edl.json by hand, then render via your Remotion project
npx remotion render MainEdit16x9 out/video.16x9.mp4 --props=./edl.json
npx remotion render MainEdit9x16 out/video.9x16.mp4 --props=./edl.json
```

### Environment

Set in your project's `.env`:

```
REMOTION_PUBLIC_CACHE_DIR=/absolute/path/to/your/remotion-video-editor/public/cache
```

This is where `link_cache.sh` will symlink the per-hash cache directory so Remotion's `staticFile()` can find it without iCloud syncing multi-GB ProRes files.

Optional: `WHISPER_MODEL` to point at a non-default whisper.cpp model file.

## Inputs and outputs
**In:** A single talking-head MP4. Optional pre-existing `edl.json`.
**Out:**
- `~/.cache/remotion-edit/<hash>/matte.mov` — ProRes 4444 RGBA alpha matte
- `~/.cache/remotion-edit/<hash>/subject-track.json` — per-frame upper-torso bbox, One-Euro smoothed
- `~/.cache/remotion-edit/<hash>/transcript.json` — whisper.cpp word-level transcript
- `~/.cache/remotion-edit/<hash>/captions.json` — `@remotion/captions` format
- A draft `edl.json` for human polish
- Final 16:9 and 9:16 MP4 renders (via your Remotion project)

## Where to extend it
- `schemas/edl.schema.json` — the EDL JSON shape. Versioned for forward compatibility.
- `scripts/draft_edl.py` — heuristics for scene splits, hero words, default hook/outro text. The hook/outro defaults are set to Brock's Clickflow brand; swap them for yours.
- `scripts/segment_rvm.py` — alpha matte generation. Swap RobustVideoMatting for a different segmenter here.

## Known limitations
- The Remotion compositions themselves are not in this skill — you need to build them or share a project that reads the EDL schema.
- Cache lives outside iCloud (`~/.cache/`) by design. If your Remotion project lives inside iCloud, the symlink workaround is required and you must set `REMOTION_PUBLIC_CACHE_DIR`.
- Apple Silicon recommended (MPS). CPU runs are slow.
- whisper.cpp `--output-json-full` shape can change between versions; the converter targets the shape current as of the skill's last update.
