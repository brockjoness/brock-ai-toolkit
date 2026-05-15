#!/usr/bin/env bash
# setup_venv.sh — Create the skill-local Python venv and install dependencies.
# Idempotent: skips reinstall if already set up.
set -euo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SKILL_DIR="$( cd "$SCRIPT_DIR/.." && pwd )"
VENV="$SKILL_DIR/.venv"

if [ ! -d "$VENV" ]; then
  echo "[setup_venv] creating venv at $VENV" >&2
  python3 -m venv "$VENV"
fi

source "$VENV/bin/activate"
pip install --quiet --upgrade pip

# Pin known-good versions; torch+torchvision must agree
pip install --quiet \
  "torch>=2.2,<2.6" \
  "torchvision>=0.17,<0.21" \
  "av>=12,<14" \
  "numpy>=1.26,<3"

echo "[setup_venv] venv ready at $VENV" >&2
