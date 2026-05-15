#!/usr/bin/env python3
"""
Generate YouTube thumbnails using Gemini AI (Nano Banana Pro).

Supports three modes:
1. Concept mode: Generate from a text description
2. Reference mode: Recreate layout of an existing thumbnail with your face
3. Edit mode: Refine a generated thumbnail

Style presets:
- clickflow: Editorial / B2B aesthetic, white bg + charcoal text (default)
- hormozi: Bold text, high contrast, emotional face
- saraev: Clean whiteboard/diagram, single focal point
- minimal: Dark bg, face + one visual element

Usage:
    # Concept mode (from ideation skill output)
    python generate_thumbnail.py --concept "shocked at 5 Gmail inboxes" --style clickflow --title "AI Answers My Emails"

    # Reference mode (recreate existing thumbnail layout)
    python generate_thumbnail.py --reference "https://youtube.com/watch?v=VIDEO_ID" --style hormozi

    # Edit pass
    python generate_thumbnail.py --edit "output/20260325/104016_1.png" --prompt "Change text to blue"
"""

from __future__ import annotations

import argparse
import base64
import io
import math
import os
import re
import sys
from pathlib import Path
from datetime import datetime
from typing import Optional

import cv2
import mediapipe as mp
import numpy as np
import requests
from dotenv import load_dotenv
from PIL import Image
from google import genai
from google.genai import types

load_dotenv()

# MediaPipe Face Mesh for pose estimation
mp_face_mesh = mp.solutions.face_mesh

# Paths
SCRIPT_DIR = Path(__file__).parent
SKILL_DIR = SCRIPT_DIR.parent
REFERENCE_PHOTOS_DIR = SKILL_DIR / "reference-photos"
OUTPUT_DIR = SKILL_DIR / "output"

# TODO: set NANO_BANANA_API_KEY in .env (see .env.example)
API_KEY = os.getenv("NANO_BANANA_API_KEY")

# Gemini model
MODEL = "gemini-3-pro-image-preview"

# Image sizes
THUMB_SIZE = (1280, 720)
REF_SIZE = (400, 400)

# Style-specific prompt templates
STYLE_PROMPTS = {
    "hormozi": """YouTube thumbnail, 16:9 format, 1280x720 minimum.
{concept}
{title_line}
Bold white or yellow text overlay. High contrast. Person shown with {expression} expression.
Clean background with strong visual element. The person must look exactly like the reference photos provided.
Text should complement the video title, not repeat it. Make the thumbnail pop at small sizes (360x200).
Bright, attention-grabbing colors. Professional YouTube thumbnail quality.""",

    "saraev": """YouTube thumbnail, 16:9 format, 1280x720 minimum.
Clean whiteboard or Excalidraw-style background.
{concept}
Person on left side, {expression} expression, pointing at or presenting the key visual element.
{title_line}
Minimal text overlay. Single focal point. The person must look exactly like the reference photos provided.
Clean, educational aesthetic. Professional YouTube thumbnail quality.""",

    "minimal": """YouTube thumbnail, 16:9 format, 1280x720 minimum.
Dark gradient background (#0a0a0a to #1a1a1a).
Person's face on left third with {expression} expression.
{concept}
One visual element on the right side.
{title_line}
Subtle text if any. Moody, premium feel. The person must look exactly like the reference photos provided.
Professional YouTube thumbnail quality.""",

    "clickflow": """YouTube thumbnail, 16:9 format, 1280x720 minimum.
Clean white or very light warm background (#FAFAF8). Subtle grid paper or dot grid texture.
{concept}
{title_line}
Text in dark charcoal black (#1A1A18) or pure black (#111110), clean sans-serif font similar to DM Sans. Large, bold, readable at small sizes.
Person shown with {expression} expression on the right third of the frame.
STRICT COLOR RULES: Only use black, white, and very light warm grays. NO neon. NO gradients. NO saturated blues, purples, or bright colors.
The only accent color allowed is a thin yellow (#FBC005) underline beneath one or two key words.
Include real-looking UI elements, numbered labels, or small monochrome app icons where relevant.
The person must look exactly like the reference photos provided.
Professional YouTube thumbnail quality. Clean, editorial, modern B2B SaaS aesthetic.""",
}

EXPRESSION_DEFAULTS = {
    "hormozi": "shocked",
    "saraev": "confident",
    "minimal": "thinking",
    "clickflow": "confident",
}


def get_face_pose(image: Image.Image) -> tuple[float, float] | None:
    """Extract yaw and pitch angles from a face in a PIL Image using MediaPipe."""
    img = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    h, w = img.shape[:2]

    with mp_face_mesh.FaceMesh(
        static_image_mode=True,
        max_num_faces=1,
        refine_landmarks=True,
        min_detection_confidence=0.5,
    ) as face_mesh:
        results = face_mesh.process(rgb)

        if not results.multi_face_landmarks:
            return None

        landmarks = results.multi_face_landmarks[0].landmark

        model_points = np.array([
            (0.0, 0.0, 0.0),
            (0.0, -330.0, -65.0),
            (-225.0, 170.0, -135.0),
            (225.0, 170.0, -135.0),
            (-150.0, -150.0, -125.0),
            (150.0, -150.0, -125.0),
        ], dtype=np.float64)

        landmark_indices = [1, 152, 33, 263, 61, 291]
        image_points = np.array([
            (landmarks[i].x * w, landmarks[i].y * h)
            for i in landmark_indices
        ], dtype=np.float64)

        focal_length = w
        center = (w / 2, h / 2)
        camera_matrix = np.array([
            [focal_length, 0, center[0]],
            [0, focal_length, center[1]],
            [0, 0, 1],
        ], dtype=np.float64)

        dist_coeffs = np.zeros((4, 1))

        success, rotation_vec, translation_vec = cv2.solvePnP(
            model_points, image_points, camera_matrix, dist_coeffs,
            flags=cv2.SOLVEPNP_ITERATIVE
        )

        if not success:
            return None

        rotation_mat, _ = cv2.Rodrigues(rotation_vec)
        proj_matrix = np.hstack((rotation_mat, translation_vec))
        _, _, _, _, _, _, euler_angles = cv2.decomposeProjectionMatrix(proj_matrix)

        pitch = float(euler_angles[0][0])
        yaw = float(euler_angles[1][0])

        yaw = max(-90, min(90, yaw))
        pitch = max(-45, min(45, pitch))

        return (yaw, pitch)


def find_best_reference(target_yaw: float, target_pitch: float) -> Path | None:
    """Find the reference photo with the closest matching face pose."""
    extensions = {".jpg", ".jpeg", ".png", ".webp"}
    refs = [
        f for f in REFERENCE_PHOTOS_DIR.iterdir()
        if f.suffix.lower() in extensions and f.name.startswith("subject_yaw")
    ]

    if not refs:
        return None

    pattern = r"subject_yaw(L|R)?(\d+|0)_pitch(U|D)?(\d+|0)"

    best_match = None
    best_distance = float("inf")

    for ref in refs:
        match = re.match(pattern, ref.stem)
        if not match:
            continue

        yaw_dir, yaw_val, pitch_dir, pitch_val = match.groups()

        yaw = int(yaw_val) if yaw_val != "0" else 0
        if yaw_dir == "L":
            yaw = -yaw

        pitch = int(pitch_val) if pitch_val != "0" else 0
        if pitch_dir == "D":
            pitch = -pitch

        distance = math.sqrt((target_yaw - yaw) ** 2 + (target_pitch - pitch) ** 2)

        if distance < best_distance:
            best_distance = distance
            best_match = ref

    return best_match


def extract_video_id(url: str) -> str | None:
    """Extract YouTube video ID from various URL formats."""
    patterns = [
        r'(?:youtube\.com/watch\?v=|youtu\.be/|youtube\.com/embed/)([a-zA-Z0-9_-]{11})',
        r'youtube\.com/shorts/([a-zA-Z0-9_-]{11})',
    ]
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    return None


def get_youtube_thumbnail(video_id: str) -> Image.Image | None:
    """Download YouTube thumbnail in best available quality."""
    qualities = ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault']

    for quality in qualities:
        url = f"https://img.youtube.com/vi/{video_id}/{quality}.jpg"
        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                img = Image.open(io.BytesIO(response.content))
                if img.size[0] > 200:
                    print(f"Downloaded thumbnail: {quality} ({img.size})")
                    return img
        except Exception:
            continue

    return None


def load_reference_photo(path: Path) -> Image.Image | None:
    """Load and resize a single reference photo."""
    try:
        img = Image.open(path)
        if img.mode not in ("RGB", "L"):
            img = img.convert("RGB")
        img = img.resize(REF_SIZE)
        print(f"Loaded reference: {path.name}")
        return img
    except Exception as e:
        print(f"Warning: Could not load {path}: {e}")
        return None


def load_reference_photos(max_photos: int = 2, specific_path: Path | None = None) -> list[Image.Image]:
    """Load reference photos for face consistency."""
    photos = []

    if not REFERENCE_PHOTOS_DIR.exists():
        print(f"Warning: Reference photos not found at {REFERENCE_PHOTOS_DIR}")
        print("Add 30-40 photos to reference-photos/raw/ and run analyze_face_directions.py")
        return photos

    if specific_path and specific_path.exists():
        ref = load_reference_photo(specific_path)
        if ref:
            photos.append(ref)
            if max_photos == 1:
                return photos

    extensions = {".jpg", ".jpeg", ".png", ".webp"}
    photo_files = sorted([
        f for f in REFERENCE_PHOTOS_DIR.iterdir()
        if f.suffix.lower() in extensions and f != specific_path and f.name.startswith("subject_")
    ])

    for photo_file in photo_files[:max_photos - len(photos)]:
        ref = load_reference_photo(photo_file)
        if ref:
            photos.append(ref)

    return photos


def generate_thumbnail(
    concept: str,
    reference_photos: list[Image.Image],
    style: str = "clickflow",
    title: str = "",
    expression: str = "",
    source_image: Image.Image | None = None,
) -> Image.Image | None:
    """Generate a thumbnail from concept description."""
    client = genai.Client(api_key=API_KEY)

    if not expression:
        expression = EXPRESSION_DEFAULTS.get(style, "confident")

    title_line = f'Text overlay reading "{title}".' if title else ""

    prompt_template = STYLE_PROMPTS.get(style, STYLE_PROMPTS["clickflow"])
    prompt = prompt_template.format(
        concept=concept,
        title_line=title_line,
        expression=expression,
    )

    num_refs = len(reference_photos)
    if source_image:
        ref_label = f"IMAGE 1{f' and 2' if num_refs > 1 else ''}: Reference photo(s) of the subject's face."
        source_label = f"IMAGE {num_refs + 1}: Reference thumbnail to recreate the layout of."
        full_prompt = f"{ref_label}\n{source_label}\n\n{prompt}"

        thumb = source_image.copy()
        thumb.thumbnail(THUMB_SIZE, Image.Resampling.LANCZOS)
        contents = reference_photos + [thumb, full_prompt]
    else:
        if reference_photos:
            ref_label = f"IMAGE 1{f' and 2' if num_refs > 1 else ''}: Reference photo(s) of the subject's face. The generated thumbnail must feature this exact person."
            full_prompt = f"{ref_label}\n\n{prompt}"
        else:
            full_prompt = prompt
        contents = reference_photos + [full_prompt]

    print(f"\nGenerating thumbnail...")
    print(f"Style: {style} | Expression: {expression}")
    if title:
        print(f"Title overlay: {title}")

    try:
        response = client.models.generate_content(
            model=MODEL,
            contents=contents,
            config=types.GenerateContentConfig(
                response_modalities=["TEXT", "IMAGE"],
            ),
        )

        if response.candidates and response.candidates[0].content:
            for part in response.candidates[0].content.parts:
                if hasattr(part, 'inline_data') and part.inline_data:
                    data = part.inline_data.data
                    if data:
                        img_bytes = base64.b64decode(data) if isinstance(data, str) else data
                        return Image.open(io.BytesIO(img_bytes))
                elif hasattr(part, 'text') and part.text:
                    print(f"Model note: {part.text[:200]}")

        print("No image in response")
        return None

    except Exception as e:
        print(f"Error: {e}")
        return None


def edit_thumbnail(
    source_image: Image.Image,
    edit_instructions: str,
) -> Image.Image | None:
    """Edit an existing thumbnail with high-level instructions."""
    client = genai.Client(api_key=API_KEY)

    thumb = source_image.copy()
    thumb.thumbnail(THUMB_SIZE, Image.Resampling.LANCZOS)

    prompt = f"""IMAGE 1: A thumbnail that needs editing.

TASK: Make the following changes to this thumbnail:
{edit_instructions}

Keep everything else exactly the same. Only modify what is explicitly requested.

Output in 16:9 format."""

    print(f"\nEditing with instructions: {edit_instructions[:100]}...")

    try:
        response = client.models.generate_content(
            model=MODEL,
            contents=[thumb, prompt],
            config=types.GenerateContentConfig(
                response_modalities=["TEXT", "IMAGE"],
            ),
        )

        if response.candidates and response.candidates[0].content:
            for part in response.candidates[0].content.parts:
                if hasattr(part, 'inline_data') and part.inline_data:
                    data = part.inline_data.data
                    if data:
                        img_bytes = base64.b64decode(data) if isinstance(data, str) else data
                        return Image.open(io.BytesIO(img_bytes))
                elif hasattr(part, 'text') and part.text:
                    print(f"Model note: {part.text[:200]}")

        print("No image in response")
        return None

    except Exception as e:
        print(f"Error: {e}")
        return None


def main():
    parser = argparse.ArgumentParser(
        description="Generate YouTube thumbnails"
    )
    parser.add_argument("--concept", "-c", type=str, help="Concept description (concept mode)")
    parser.add_argument("--reference", "-r", type=str, help="YouTube URL to recreate (reference mode)")
    parser.add_argument("--edit", "-e", type=str, help="Edit an existing thumbnail (path to image)")
    parser.add_argument(
        "--style", type=str, default="clickflow",
        choices=["clickflow", "hormozi", "saraev", "minimal"],
        help="Style preset (default: clickflow)",
    )
    parser.add_argument("--title", "-t", type=str, default="", help="Text overlay")
    parser.add_argument(
        "--expression", type=str, default="",
        choices=["shocked", "confident", "pointing", "thinking", ""],
        help="Face expression (default: style-dependent)",
    )
    parser.add_argument("--prompt", "-p", type=str, default="", help="Edit instructions (required for --edit mode)")
    parser.add_argument("--variations", "-n", type=int, default=3, help="Number of variations (default: 3)")
    parser.add_argument("--refs", type=int, default=2, help="Number of reference photos (default: 2)")
    parser.add_argument("--no-match", action="store_true", help="Skip face direction matching")

    args = parser.parse_args()

    if not API_KEY:
        print("Error: NANO_BANANA_API_KEY not set")
        print("Set it in your project's .env file (see .env.example)")
        sys.exit(1)

    # Create date-based output folder
    date_folder = OUTPUT_DIR / datetime.now().strftime("%Y.%m.%d")
    date_folder.mkdir(parents=True, exist_ok=True)
    time_stamp = datetime.now().strftime("%H%M%S")

    # === EDIT MODE ===
    if args.edit:
        if not args.prompt:
            print("Error: --edit requires --prompt with edit instructions")
            sys.exit(1)

        print(f"Loading image to edit: {args.edit}")
        edit_image = Image.open(args.edit)
        print(f"Size: {edit_image.size}")

        result = edit_thumbnail(edit_image, args.prompt)

        if result is None:
            print("Edit failed")
            sys.exit(1)

        output_path = date_folder / f"{time_stamp}_edited.png"
        result.save(output_path)
        print(f"\nSaved: {output_path}")
        print(f"Size: {result.size}")
        return

    # === CONCEPT MODE or REFERENCE MODE ===
    if not args.concept and not args.reference:
        print("Error: Provide --concept, --reference URL, or --edit image")
        sys.exit(1)

    # Load source thumbnail if reference mode
    source_image = None
    if args.reference:
        video_id = extract_video_id(args.reference)
        if not video_id:
            print(f"Error: Could not extract video ID from {args.reference}")
            sys.exit(1)
        print(f"Video ID: {video_id}")
        source_image = get_youtube_thumbnail(video_id)
        if not source_image:
            print("Error: Could not download YouTube thumbnail")
            sys.exit(1)

        # Analyze face direction in source for matching
        if not args.no_match:
            print("\nAnalyzing face direction in source thumbnail...")
            pose = get_face_pose(source_image)
            if pose:
                yaw, pitch = pose
                print(f"Detected pose: yaw={yaw:+.1f}, pitch={pitch:+.1f}")

    # Load reference photos
    reference_photos = load_reference_photos(max_photos=args.refs)
    if not reference_photos:
        print("Warning: No reference photos found. Generating without face matching.")
        print("For better results, add photos to reference-photos/raw/ and run analyze_face_directions.py")

    # Build concept
    concept = args.concept or "Recreate this thumbnail layout with the subject's face"

    # Generate variations
    output_paths = []

    for i in range(args.variations):
        print(f"\n--- Variation {i + 1}/{args.variations} ---")

        result = generate_thumbnail(
            concept=concept,
            reference_photos=reference_photos,
            style=args.style,
            title=args.title,
            expression=args.expression,
            source_image=source_image,
        )

        if result is None:
            print(f"Failed to generate variation {i + 1}")
            continue

        output_path = date_folder / f"{time_stamp}_{i + 1}.png"
        result.save(output_path)
        output_paths.append(str(output_path))
        print(f"Saved: {output_path}")
        print(f"Size: {result.size}")

    print(f"\n=== Generated {len(output_paths)}/{args.variations} variations ===")
    for path in output_paths:
        print(f"  - {path}")


if __name__ == "__main__":
    main()
