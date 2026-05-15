# remotion-edit

Reusable Remotion-based video edit pipeline that takes a talking-head MP4 and renders both 16:9 and 9:16 outputs in a Trey Cockrum (@treyconverts) inspired style: text-behind-subject, word-by-word kinetic captions, whip/zoom transitions, animated callouts.

## Invocation

```
remotion-edit <input.mp4> [edl.json]
```

If `edl.json` is omitted, an LLM-drafted EDL is generated from the transcript and the user is asked to confirm/edit before render.

## Pipeline overview

1. **Preprocess** (idempotent, hash-keyed cache)
   - SHA256 first 12 chars of input → cache key
   - Cache lives at `~/.cache/remotion-edit/<hash>/` (OUTSIDE iCloud Drive)
   - Symlinked into `$REMOTION_PUBLIC_CACHE_DIR/<hash>/` at render time
   - Steps:
     a. `segment_rvm.py` → `matte.mov` (RVM, ProRes 4444 RGBA, 1920x1080 @ 30fps)
     b. `subject_track.py` → `subject-track.json` (bbox per frame, One-Euro smoothed)
     c. `transcribe.sh` → `transcript.json` (whisper.cpp with VAD, word-level timestamps)
     d. `captions_from_whisper.py` → `captions.json` (Remotion `@remotion/captions` format)
2. **Draft EDL** (only if not provided)
   - `draft_edl.py transcript.json > edl.draft.json`
   - User edits punchlines, callout timing, text-behind hero words
3. **Render**
   - `npx remotion render MainEdit16x9 out/<name>.16x9.mp4 --props=./edl.json`
   - `npx remotion render MainEdit9x16 out/<name>.9x16.mp4 --props=./edl.json`

## Files

- `scripts/preprocess.sh` — orchestrator
- `scripts/hash_source.sh` — SHA256 first 12 chars
- `scripts/segment_rvm.py` — RobustVideoMatting wrapper
- `scripts/subject_track.py` — alpha bbox + One-Euro filter
- `scripts/transcribe.sh` — whisper.cpp wrapper
- `scripts/captions_from_whisper.py` — format converter
- `scripts/draft_edl.py` — heuristic + LLM EDL drafter
- `scripts/link_cache.sh` — symlink cache → public/cache (uses `$REMOTION_PUBLIC_CACHE_DIR`)
- `schemas/edl.schema.json` — versioned EDL JSON schema
- `examples/sample.edl.json` — worked example

## Renderer

The Remotion compositions are not shipped with this skill. You must provide a sibling Remotion project that exposes `MainEdit16x9` and `MainEdit9x16` compositions, both reading the EDL via `--props`.

## Key technical decisions (locked)

- **RobustVideoMatting** for segmentation (clean hair edges, temporally stable)
- **ProRes 4444 .mov** for matte (Remotion alpha path most reliable)
- **whisper.cpp + VAD** for captions (local, free, word-level)
- **Hybrid EDL**: LLM drafts 80%, human polishes punchline timing
- **9:16 reframe**: subject-tracked crop via matte bbox + One-Euro smoothing
- **Cache outside iCloud**, symlinked in (avoid syncing multi-GB ProRes)
