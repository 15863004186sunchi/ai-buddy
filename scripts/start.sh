#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMPOSE_CMD=(docker compose -f "$ROOT_DIR/docker-compose.yml")

usage() {
  cat <<'EOF'
Usage:
  ./scripts/start.sh           Build and start the service
  ./scripts/start.sh --fresh   Rebuild without cache and recreate containers
EOF
}

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

MODE="default"

if [ "$#" -gt 1 ]; then
  usage >&2
  exit 1
fi

if [ "$#" -eq 1 ]; then
  case "$1" in
    --fresh)
      MODE="fresh"
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "[ai-buddy] Unknown option: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
fi

if [ "$MODE" = "fresh" ]; then
  echo "[ai-buddy] Performing a fresh rebuild without Docker cache..."
  "${COMPOSE_CMD[@]}" down
  "${COMPOSE_CMD[@]}" build --no-cache
  "${COMPOSE_CMD[@]}" up -d --force-recreate
else
  echo "[ai-buddy] Building and starting containers..."
  "${COMPOSE_CMD[@]}" up -d --build
fi

echo "[ai-buddy] Service started."
"${COMPOSE_CMD[@]}" ps
