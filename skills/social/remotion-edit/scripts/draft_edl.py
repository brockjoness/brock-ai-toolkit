#!/usr/bin/env python3
"""
draft_edl.py — Generate a draft EDL JSON from a captions.json transcript using
simple heuristics. The user is expected to polish punchline timing afterward.

Heuristics:
  - Split into scenes at long pauses (>= 600 ms gap between captions)
  - Cap scenes at 25 source frames in length to avoid wall-of-text
  - Pick a hero "text behind" word per scene from first capitalized noun
  - Add a lower third on the first scene
  - Add a vignette to every scene

Usage:
    draft_edl.py --captions captions.json --source <input.mp4> --output edl.draft.json
"""

import argparse
import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path


SCENE_GAP_MS = 600
SCENE_MAX_SECONDS = 12
HERO_STOPWORDS = {"the", "and", "but", "you", "your", "for", "with", "that", "this",
                  "have", "from", "what", "when", "they", "their", "would", "could",
                  "about", "just", "like", "really", "going", "want", "know", "think",
                  "Hey", "Okay", "Yeah", "So", "Well", "Now", "I", "I'm", "I've"}


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser()
    p.add_argument("--captions", required=True, type=Path)
    p.add_argument("--source", required=True, type=Path)
    p.add_argument("--output", required=True, type=Path)
    return p.parse_args()


def hash12(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()[:12]


def probe(path: Path) -> dict:
    out = subprocess.check_output([
        "ffprobe", "-v", "error",
        "-select_streams", "v:0",
        "-show_entries", "stream=width,height,r_frame_rate,nb_frames,duration",
        "-of", "json",
        str(path),
    ])
    data = json.loads(out)["streams"][0]
    num, den = data["r_frame_rate"].split("/")
    fps = float(num) / float(den)
    return {
        "fps": fps,
        "width": int(data["width"]),
        "height": int(data["height"]),
        "durationFrames": int(data.get("nb_frames") or float(data["duration"]) * fps),
    }


def hero_word(text: str) -> str:
    words = re.findall(r"[A-Za-z']+", text)
    candidates = [w for w in words if len(w) >= 4 and w.lower() not in {s.lower() for s in HERO_STOPWORDS}]
    if not candidates:
        return ""
    candidates.sort(key=len, reverse=True)
    return candidates[0].upper()


def main() -> int:
    args = parse_args()
    captions = json.loads(args.captions.read_text())
    if not captions:
        print("no captions", file=sys.stderr)
        return 1

    info = probe(args.source)
    fps = info["fps"]

    # Group captions into scenes by pause gap
    scenes_raw = []
    current = [captions[0]]
    for cap in captions[1:]:
        prev_end = current[-1]["endMs"]
        gap = cap["startMs"] - prev_end
        scene_len_s = (current[-1]["endMs"] - current[0]["startMs"]) / 1000.0
        if gap >= SCENE_GAP_MS or scene_len_s >= SCENE_MAX_SECONDS:
            scenes_raw.append(current)
            current = [cap]
        else:
            current.append(cap)
    scenes_raw.append(current)

    edl_scenes = []
    for i, group in enumerate(scenes_raw):
        start_ms = group[0]["startMs"]
        end_ms = group[-1]["endMs"] + 100  # small tail
        in_frame = int(round(start_ms / 1000.0 * fps))
        out_frame = int(round(end_ms / 1000.0 * fps))
        text_blob = " ".join(c["text"] for c in group)
        hero = hero_word(text_blob)

        scene = {
            "id": f"s{i:03d}",
            "inFrame": in_frame,
            "outFrame": out_frame,
            "transition": "cut" if i == 0 else "zoom-punch",
            "transitionDurationFrames": 6,
            "captions": {
                "enabled": True,
                "style": "highlight",
                "size": "medium",
                "position": "bottom",
                "maxVisibleWords": 7,
            },
            "vignette": True,
        }
        if hero:
            scene["textBehind"] = {
                "text": hero,
                "fontSize": 280,
                "color": "#FFFFFF",
                "animation": "rise",
                "position": "center",
            }
        if i == 0:
            scene["lowerThird"] = {
                "atFrame": 30,
                "durationFrames": 150,
                "label": "Brock Jones",
                "sub": "Founder · Clickflow",
            }
        edl_scenes.append(scene)

    edl = {
        "version": 1,
        "source": {
            "path": str(args.source.resolve()),
            "hash": hash12(args.source),
            "fps": fps,
            "width": info["width"],
            "height": info["height"],
            "durationFrames": info["durationFrames"],
        },
        "outputFps": 30,
        "scenes": edl_scenes,
        "hook": {"text": "CLICKFLOW", "durationFrames": 60},
        "outro": {
            "text": "clickflow.dev",
            "subText": "AI ads, moved fast",
            "durationFrames": 90,
        },
    }

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(edl, indent=2))
    print(f"[draft_edl] wrote {len(edl_scenes)} scenes to {args.output}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
