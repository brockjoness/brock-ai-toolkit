#!/usr/bin/env bash
# transcribe.sh — extract audio from a video and run whisper.cpp with VAD,
# producing a JSON transcript with word-level timestamps.
#
# Usage: transcribe.sh <input.mp4> <output.json>
set -euo pipefail

INPUT="${1:?usage: transcribe.sh <input.mp4> <output.json>}"
OUTPUT="${2:?usage: transcribe.sh <input.mp4> <output.json>}"

if ! command -v whisper-cli >/dev/null 2>&1; then
  echo "whisper-cli not found in PATH. brew install whisper-cpp" >&2
  exit 1
fi
if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg not found in PATH" >&2
  exit 1
fi

WORKDIR="$(mktemp -d)"
trap 'rm -rf "$WORKDIR"' EXIT

WAV="$WORKDIR/audio.wav"
ffmpeg -y -i "$INPUT" -ar 16000 -ac 1 -c:a pcm_s16le "$WAV" \
  >/dev/null 2>&1

# whisper.cpp model path. Default to base.en for speed; user can override via WHISPER_MODEL env.
MODEL="${WHISPER_MODEL:-$HOME/.cache/whisper-cpp/ggml-base.en.bin}"
if [ ! -f "$MODEL" ]; then
  mkdir -p "$(dirname "$MODEL")"
  echo "[transcribe] downloading whisper base.en model..." >&2
  curl -fsSL -o "$MODEL" \
    https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-base.en.bin
fi

# Run whisper.cpp with word-level timestamps.
# Note: whisper-cpp built-in VAD is not available in all builds;
# silero VAD path is optional. We rely on word timestamps for downstream alignment.
JSON_BASE="$WORKDIR/out"
whisper-cli \
  --model "$MODEL" \
  --output-json-full \
  --output-file "$JSON_BASE" \
  --max-len 1 \
  --split-on-word \
  "$WAV" \
  >/dev/null 2>&1

mkdir -p "$(dirname "$OUTPUT")"
cp "${JSON_BASE}.json" "$OUTPUT"

echo "[transcribe] wrote $OUTPUT" >&2
