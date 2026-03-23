# AI Buddy Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Package the Vue 3 app for CentOS VPS deployment with Docker Compose and add shell scripts for common service operations.

**Architecture:** Build the SPA in a Node stage and serve it via Nginx in a runtime container. Use `docker compose` as the single service entry point and thin bash wrappers for day-to-day VPS operations.

**Tech Stack:** Docker, Docker Compose, Nginx, Bash, Vite

---

## File Structure

**Create**

- `Dockerfile`
- `docker-compose.yml`
- `deploy/nginx.conf`
- `scripts/start.sh`
- `scripts/stop.sh`
- `scripts/logs.sh`
- `scripts/status.sh`

**Modify**

- `README.md`

### Task 1: Add Container Build and Runtime Config

**Files:**
- Create: `Dockerfile`
- Create: `docker-compose.yml`
- Create: `deploy/nginx.conf`

- [ ] **Step 1: Write the failing verification target**

Define the deployment contract:
- Docker build must run `npm ci` and `npm run build`
- nginx must serve `dist/`
- Vue history routes must fall back to `index.html`

- [ ] **Step 2: Run verification to show it is missing**

Run: `Get-ChildItem Dockerfile,docker-compose.yml,deploy/nginx.conf`
Expected: FAIL because files do not exist yet

- [ ] **Step 3: Write minimal implementation**

Create the multi-stage Dockerfile, compose file, and nginx config.

- [ ] **Step 4: Run verification to confirm structure**

Run: `Get-ChildItem Dockerfile,docker-compose.yml,deploy/nginx.conf`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add Dockerfile docker-compose.yml deploy/nginx.conf
git commit -m "feat: add docker deployment config"
```

### Task 2: Add VPS Helper Scripts

**Files:**
- Create: `scripts/start.sh`
- Create: `scripts/stop.sh`
- Create: `scripts/logs.sh`
- Create: `scripts/status.sh`

- [ ] **Step 1: Write the failing verification target**

Define expected script entry points and required `docker compose` calls.

- [ ] **Step 2: Run verification to show it is missing**

Run: `Get-ChildItem scripts`
Expected: FAIL because scripts do not exist yet

- [ ] **Step 3: Write minimal implementation**

Create Bash scripts for start, stop, logs, and status.

- [ ] **Step 4: Run verification to confirm presence**

Run: `Get-ChildItem scripts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add scripts
git commit -m "feat: add deployment helper scripts"
```

### Task 3: Document VPS Deployment Usage

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Write the failing documentation target**

Identify missing deployment guidance for:
- CentOS VPS setup
- script usage
- Docker Compose operations

- [ ] **Step 2: Run verification to show docs are incomplete**

Run: `Select-String -Path README.md -Pattern "Docker|docker compose|CentOS|start.sh"`
Expected: no matches or incomplete matches

- [ ] **Step 3: Write minimal implementation**

Add a deployment section with setup and usage examples.

- [ ] **Step 4: Run verification to confirm documentation exists**

Run: `Select-String -Path README.md -Pattern "Docker|docker compose|CentOS|start.sh"`
Expected: matches returned

- [ ] **Step 5: Commit**

```bash
git add README.md
git commit -m "docs: add vps deployment instructions"
```

### Task 4: Verify and Finalize

**Files:**
- Modify: repository metadata as needed

- [ ] **Step 1: Validate compose file structure**

Run: `docker compose config`
Expected: PASS if Docker is available locally

- [ ] **Step 2: Validate shell scripts**

Run: `bash -n scripts/start.sh scripts/stop.sh scripts/logs.sh scripts/status.sh`
Expected: PASS if Bash is available locally

- [ ] **Step 3: Commit final deployment work**

```bash
git add .
git commit -m "chore: add docker deployment workflow"
```
