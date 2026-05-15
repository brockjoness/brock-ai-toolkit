#!/usr/bin/env bash
# link_cache.sh — Symlink ~/.cache/remotion-edit/<hash> into the Remotion
# project's public/cache/<hash> so staticFile() can resolve it without iCloud
# syncing the multi-GB matte.
#
# Requires the env var REMOTION_PUBLIC_CACHE_DIR to be set to the absolute
# path of your Remotion project's public/cache directory. See .env.example.
#
# Usage: link_cache.sh <hash>
set -euo pipefail

HASH="${1:?usage: link_cache.sh <hash>}"

if [ -z "${REMOTION_PUBLIC_CACHE_DIR:-}" ]; then
  echo "REMOTION_PUBLIC_CACHE_DIR is not set. See .env.example." >&2
  exit 1
fi

CACHE_SRC="$HOME/.cache/remotion-edit/$HASH"
PUBLIC_CACHE_DIR="$REMOTION_PUBLIC_CACHE_DIR"
LINK_DEST="$PUBLIC_CACHE_DIR/$HASH"

if [ ! -d "$CACHE_SRC" ]; then
  echo "cache source missing: $CACHE_SRC" >&2
  exit 1
fi

mkdir -p "$PUBLIC_CACHE_DIR"

# Replace any existing link/dir
if [ -L "$LINK_DEST" ] || [ -e "$LINK_DEST" ]; then
  rm -rf "$LINK_DEST"
fi

ln -s "$CACHE_SRC" "$LINK_DEST"
echo "[link_cache] $LINK_DEST -> $CACHE_SRC" >&2
