#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "[ai-buddy] Missing required command: $1" >&2
    exit 1
  fi
}

require_command docker

if ! docker compose version >/dev/null 2>&1; then
  echo "[ai-buddy] docker compose plugin is not available." >&2
  exit 1
fi

echo "[ai-buddy] Building and starting containers..."
docker compose -f "$ROOT_DIR/docker-compose.yml" up -d --build

echo "[ai-buddy] Service started."
docker compose -f "$ROOT_DIR/docker-compose.yml" ps
