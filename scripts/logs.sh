#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [ "$#" -gt 0 ]; then
  docker compose -f "$ROOT_DIR/docker-compose.yml" logs "$@"
  exit 0
fi

docker compose -f "$ROOT_DIR/docker-compose.yml" logs -f --tail=200
