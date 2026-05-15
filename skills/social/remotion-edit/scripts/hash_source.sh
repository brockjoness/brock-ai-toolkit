#!/usr/bin/env bash
# Compute SHA256 first-12-chars hash of an input file. Used as cache key.
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "usage: hash_source.sh <input-file>" >&2
  exit 1
fi

shasum -a 256 "$1" | awk '{print substr($1, 1, 12)}'
