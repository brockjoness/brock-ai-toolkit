#!/usr/bin/env python3
"""
subject_track.py — Read an alpha matte video and write a per-frame upper-torso
bounding box, smoothed with a One-Euro filter. Used by the 9:16 reframe.

Usage:
    subject_track.py --matte <matte.mov> --output <subject-track.json>
"""

import argparse
import json
import math
import sys
from pathlib import Path


class OneEuroFilter:
    """1D One-Euro low-pass filter. Smooths jitter while preserving real motion."""

    def __init__(self, freq: float, mincutoff: float = 1.0, beta: float = 0.0, dcutoff: float = 1.0):
        self.freq = freq
        self.mincutoff = mincutoff
        self.beta = beta
        self.dcutoff = dcutoff
        self.x_prev = None
        self.dx_prev = 0.0

    @staticmethod
    def _alpha(cutoff: float, freq: float) -> float:
        tau = 1.0 / (2.0 * math.pi * cutoff)
        te = 1.0 / freq
        return 1.0 / (1.0 + tau / te)

    def __call__(self, x: float) -> float:
        if self.x_prev is None:
            self.x_prev = x
            return x
        dx = (x - self.x_prev) * self.freq
        edx = self._alpha(self.dcutoff, self.freq) * dx + (
            1.0 - self._alpha(self.dcutoff, self.freq)
        ) * self.dx_prev
        cutoff = self.mincutoff + self.beta * abs(edx)
        a = self._alpha(cutoff, self.freq)
        x_filt = a * x + (1.0 - a) * self.x_prev
        self.x_prev = x_filt
        self.dx_prev = edx
        return x_filt


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser()
    p.add_argument("--matte", required=True, type=Path)
    p.add_argument("--output", required=True, type=Path)
    return p.parse_args()


def main() -> int:
    args = parse_args()
    if not args.matte.exists():
        print(f"matte not found: {args.matte}", file=sys.stderr)
        return 1

    import av
    import numpy as np

    container = av.open(str(args.matte))
    stream = container.streams.video[0]
    fps = float(stream.average_rate)
    width = stream.width
    height = stream.height

    # Use top 60% of frame to avoid hand-gesture jitter expanding the bbox
    upper_h = int(height * 0.6)

    fx = OneEuroFilter(freq=fps, mincutoff=1.5, beta=0.05)
    fy = OneEuroFilter(freq=fps, mincutoff=1.5, beta=0.05)
    fw = OneEuroFilter(freq=fps, mincutoff=0.8, beta=0.02)
    fh = OneEuroFilter(freq=fps, mincutoff=0.8, beta=0.02)

    track = []
    last = {"cx": width / 2, "cy": upper_h / 2, "w": width / 2, "h": upper_h}

    for i, frame in enumerate(container.decode(stream)):
        # Convert to numpy; use alpha channel as mask
        img = frame.to_ndarray(format="rgba")  # H x W x 4
        alpha = img[:upper_h, :, 3]  # upper torso only
        mask = alpha > 32  # threshold for "subject present"

        if mask.any():
            ys, xs = np.where(mask)
            x0, x1 = xs.min(), xs.max()
            y0, y1 = ys.min(), ys.max()
            cx = (x0 + x1) / 2
            cy = (y0 + y1) / 2
            w = x1 - x0
            h = y1 - y0
            last = {"cx": float(cx), "cy": float(cy), "w": float(w), "h": float(h)}

        track.append({
            "frame": i,
            "cx": fx(last["cx"]),
            "cy": fy(last["cy"]),
            "w": fw(last["w"]),
            "h": fh(last["h"]),
        })

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps({
        "fps": fps,
        "width": width,
        "height": height,
        "frames": track,
    }, indent=2))
    print(f"[subject_track] wrote {len(track)} frames to {args.output}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
