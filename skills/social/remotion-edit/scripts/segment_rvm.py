#!/usr/bin/env python3
"""
segment_rvm.py — Generate a per-frame alpha matte for a talking-head video using
RobustVideoMatting (RVM). Output is a ProRes 4444 .mov with RGBA channels.

Usage:
    segment_rvm.py --input <in.mp4> --output <matte.mov> [--width 1920] [--height 1080] [--fps 30]

Requires:
    - PyTorch + RVM checkpoint (downloaded on first run via torch.hub)
    - ffmpeg in PATH
    - av (PyAV) for frame writing
"""

import argparse
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser()
    p.add_argument("--input", required=True, type=Path)
    p.add_argument("--output", required=True, type=Path)
    p.add_argument("--width", type=int, default=1920)
    p.add_argument("--height", type=int, default=1080)
    p.add_argument("--fps", type=int, default=30)
    p.add_argument("--device", default="auto", choices=["auto", "mps", "cuda", "cpu"])
    p.add_argument("--downsample-ratio", type=float, default=0.25,
                   help="RVM downsample ratio. 0.25 is the recommended default for HD inputs.")
    return p.parse_args()


def select_device(requested: str) -> str:
    import torch
    if requested != "auto":
        return requested
    if torch.backends.mps.is_available():
        return "mps"
    if torch.cuda.is_available():
        return "cuda"
    return "cpu"


def main() -> int:
    args = parse_args()

    if not args.input.exists():
        print(f"input not found: {args.input}", file=sys.stderr)
        return 1

    if shutil.which("ffmpeg") is None:
        print("ffmpeg not found in PATH", file=sys.stderr)
        return 1

    args.output.parent.mkdir(parents=True, exist_ok=True)

    # Lazy imports so this script can be inspected without torch installed
    import torch
    import av
    import numpy as np

    device = select_device(args.device)
    print(f"[segment_rvm] device={device}", file=sys.stderr)

    # Load RVM via torch.hub. First call downloads the model.
    model = torch.hub.load("PeterL1n/RobustVideoMatting", "mobilenetv3").to(device).eval()

    # Pre-resize source to target dimensions and fps with ffmpeg, write to temp file.
    # This keeps the Python loop simple and predictable.
    with tempfile.TemporaryDirectory() as td:
        resized = Path(td) / "resized.mp4"
        ff_cmd = [
            "ffmpeg", "-y", "-i", str(args.input),
            "-vf", f"scale={args.width}:{args.height},fps={args.fps}",
            "-c:v", "libx264", "-preset", "fast", "-crf", "18",
            "-an",
            str(resized),
        ]
        subprocess.run(ff_cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

        # Open resized source for reading frames
        in_container = av.open(str(resized))
        in_stream = in_container.streams.video[0]
        in_stream.thread_type = "AUTO"

        # Write directly to ProRes 4444 RGBA via PyAV
        out_container = av.open(str(args.output), mode="w")
        out_stream = out_container.add_stream("prores_ks", rate=args.fps)
        out_stream.width = args.width
        out_stream.height = args.height
        out_stream.pix_fmt = "yuva444p10le"
        out_stream.options = {"profile": "4", "qscale": "11"}  # profile 4 = 4444

        rec = [None] * 4  # RVM recurrent state

        with torch.no_grad():
            frame_count = 0
            for frame in in_container.decode(in_stream):
                img = frame.to_ndarray(format="rgb24")  # H x W x 3 uint8
                tensor = (
                    torch.from_numpy(img)
                    .to(device)
                    .float()
                    .div(255.0)
                    .permute(2, 0, 1)
                    .unsqueeze(0)
                )  # 1 x 3 x H x W
                fgr, pha, *rec = model(tensor, *rec, downsample_ratio=args.downsample_ratio)

                fgr_np = (fgr.clamp(0, 1).squeeze(0).permute(1, 2, 0).cpu().numpy() * 255).astype("uint8")
                pha_np = (pha.clamp(0, 1).squeeze(0).squeeze(0).cpu().numpy() * 255).astype("uint8")

                rgba = np.dstack([fgr_np, pha_np])  # H x W x 4
                out_frame = av.VideoFrame.from_ndarray(rgba, format="rgba")
                out_frame = out_frame.reformat(format="yuva444p10le")
                for packet in out_stream.encode(out_frame):
                    out_container.mux(packet)

                frame_count += 1
                if frame_count % 60 == 0:
                    print(f"[segment_rvm] frame {frame_count}", file=sys.stderr)

        # Flush
        for packet in out_stream.encode():
            out_container.mux(packet)
        out_container.close()
        in_container.close()

    print(f"[segment_rvm] wrote {args.output}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
