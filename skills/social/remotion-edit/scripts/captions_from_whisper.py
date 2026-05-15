#!/usr/bin/env python3
"""
captions_from_whisper.py — Convert a whisper.cpp `--output-json-full` transcript
into the @remotion/captions Caption[] array shape:

    [{ text, startMs, endMs, timestampMs, confidence }]

Usage:
    captions_from_whisper.py --input transcript.json --output captions.json
"""

import argparse
import json
import sys
from pathlib import Path


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser()
    p.add_argument("--input", required=True, type=Path)
    p.add_argument("--output", required=True, type=Path)
    return p.parse_args()


def main() -> int:
    args = parse_args()
    if not args.input.exists():
        print(f"input not found: {args.input}", file=sys.stderr)
        return 1

    raw = json.loads(args.input.read_text())

    # whisper.cpp --output-json-full shape:
    # { "transcription": [{ "offsets": {"from": ms, "to": ms}, "text": "...", "tokens": [...] }, ...] }
    captions = []
    for seg in raw.get("transcription", []):
        text = seg.get("text", "").strip()
        if not text:
            continue
        start = int(seg["offsets"]["from"])
        end = int(seg["offsets"]["to"])
        captions.append({
            "text": text,
            "startMs": start,
            "endMs": end,
            "timestampMs": (start + end) // 2,
            "confidence": None,
        })

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(captions, indent=2))
    print(f"[captions] wrote {len(captions)} captions to {args.output}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
