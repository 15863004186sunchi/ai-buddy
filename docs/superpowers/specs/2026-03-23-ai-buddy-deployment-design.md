# AI Buddy Deployment Design

**Project:** `ai-buddy`

**Date:** 2026-03-23

## Goal

Add a production-oriented deployment setup for the current Vue 3 front-end so it can be deployed on a CentOS 10 VPS using Docker Compose and simple shell scripts for service management.

## Scope

### In Scope

- Multi-stage `Dockerfile` for building and serving the Vite app
- `nginx` configuration that supports Vue Router history fallback
- `docker-compose.yml` for single-service deployment
- Shell scripts for:
  - start
  - stop
  - logs
  - status
- Deployment instructions for a CentOS/GCP VPS

### Out of Scope

- HTTPS certificates
- External reverse proxy tier
- Multi-environment deployment matrix
- CI/CD automation
- Domain name automation

## Deployment Model

This version uses the simplest production topology:

- public VPS port `80`
- one Docker Compose project
- one `nginx` container serving static assets

The app remains a static SPA. Vite builds the production bundle during the image build stage, and `nginx` serves the generated `dist/` contents.

## Architecture

### Container Build

Use a multi-stage Docker build:

1. `node` stage
   - install dependencies with `npm ci`
   - run `npm run build`
2. `nginx` stage
   - copy built static assets into nginx html directory
   - copy custom nginx config

### Runtime

Use Docker Compose to run a single container:

- service name: `ai-buddy`
- port mapping: `80:80`
- restart policy: `unless-stopped`

### Routing Behavior

Because the app uses Vue Router history mode, the nginx config must:

- serve static assets directly
- route unknown paths back to `/index.html`

Without this fallback, refreshing routes like `/home` or `/auth` would return 404.

## Files

### New Files

- `Dockerfile`
- `docker-compose.yml`
- `deploy/nginx.conf`
- `scripts/start.sh`
- `scripts/stop.sh`
- `scripts/logs.sh`
- `scripts/status.sh`

### Updated Files

- `README.md`

## Script Behavior

### `scripts/start.sh`

- verify `docker` exists
- verify `docker compose` exists
- build and start the stack in detached mode

### `scripts/stop.sh`

- stop and remove the running stack

### `scripts/logs.sh`

- print or follow compose logs
- default to follow mode for convenience

### `scripts/status.sh`

- show compose service status

## VPS Usage Flow

Expected server flow:

1. install Docker Engine and Docker Compose plugin
2. clone the repository
3. `chmod +x scripts/*.sh`
4. run `./scripts/start.sh`
5. verify with `./scripts/status.sh`
6. inspect with `./scripts/logs.sh`

## Risks and Mitigations

### Risk: Vue history routing breaks on refresh

Mitigation:
- include `try_files` fallback in nginx config

### Risk: Docker Compose command differences

Mitigation:
- target `docker compose` explicitly instead of legacy `docker-compose`

### Risk: CentOS shell differences

Mitigation:
- keep scripts POSIX-friendly `bash` scripts with minimal dependencies

## Deliverables

- production-ready Docker packaging for the current SPA
- single-command start/stop/log/status workflow
- updated README with VPS deployment steps
