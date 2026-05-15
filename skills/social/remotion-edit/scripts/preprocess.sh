#!/usr/bin/env bash
# preprocess.sh — Idempotent preprocessing pipeline for the remotion-edit skill.
#
# Steps:
#   1. Hash the input → cache key
#   2. Generate ProRes 4444 alpha matte via RVM (segment_rvm.py)
#   3. Compute upper-torso bbox track (subject_track.py)
#   4. Transcribe audio with whisper.cpp (transcribe.sh)
#   5. Convert transcript → @remotion/captions format (captions_from_whisper.py)
#   6. Symlink cache dir into Remotion public/cache/
#
# Each step skips if its output already exists. Re-run cheaply on the same source.
#
# Usage: preprocess.sh <input.mp4>
set -euo pipefail

INPUT="${1:?usage: preprocess.sh <input.mp4>}"
if [ ! -f "$INPUT" ]; then
  echo "input not found: $INPUT" >&2
  exit 1
fi

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SKILL_DIR="$( cd "$SCRIPT_DIR/.." && pwd )"
VENV="$SKILL_DIR/.venv"
PY="$VENV/bin/python3"

if [ ! -x "$PY" ]; then
  echo "python venv missing at $VENV — run setup_venv.sh first" >&2
  exit 1
fi

HASH="$("$SCRIPT_DIR/hash_source.sh" "$INPUT")"
CACHE="$HOME/.cache/remotion-edit/$HASH"
mkdir -p "$CACHE"

echo "[preprocess] input=$INPUT hash=$HASH cache=$CACHE" >&2

# 1. Matte
if [ ! -f "$CACHE/matte.mov" ]; then
  echo "[preprocess] [1/4] generating alpha matte (RVM)..." >&2
  "$PY" "$SCRIPT_DIR/segment_rvm.py" \
    --input "$INPUT" \
    --output "$CACHE/matte.mov" \
    --width 1920 --height 1080 --fps 30
else
  echo "[preprocess] [1/4] matte cached, skipping" >&2
fi

# 2. Subject track
if [ ! -f "$CACHE/subject-track.json" ]; then
  echo "[preprocess] [2/4] computing subject bbox track..." >&2
  "$PY" "$SCRIPT_DIR/subject_track.py" \
    --matte "$CACHE/matte.mov" \
    --output "$CACHE/subject-track.json"
else
  echo "[preprocess] [2/4] track cached, skipping" >&2
fi

# 3. Transcript
if [ ! -f "$CACHE/transcript.json" ]; then
  echo "[preprocess] [3/4] transcribing audio (whisper.cpp)..." >&2
  "$SCRIPT_DIR/transcribe.sh" "$INPUT" "$CACHE/transcript.json"
else
  echo "[preprocess] [3/4] transcript cached, skipping" >&2
fi

# 4. Captions
if [ ! -f "$CACHE/captions.json" ]; then
  echo "[preprocess] [4/4] converting captions..." >&2
  "$PY" "$SCRIPT_DIR/captions_from_whisper.py" \
    --input "$CACHE/transcript.json" \
    --output "$CACHE/captions.json"
else
  echo "[preprocess] [4/4] captions cached, skipping" >&2
fi

# 5. Symlink
"$SCRIPT_DIR/link_cache.sh" "$HASH"

echo "[preprocess] done. hash=$HASH" >&2
echo "$HASH"
