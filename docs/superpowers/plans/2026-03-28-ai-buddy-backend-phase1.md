# AI Buddy Backend Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first real backend for AI Buddy using FastAPI so the existing front-end can switch from local mock auth and local companion chat to a real server-backed flow.

**Architecture:** Add a dedicated `backend/` Python service inside the existing repo. Keep auth on REST, companion chat on WebSocket, and persist user, refresh-session, single default companion session, and companion messages in PostgreSQL via SQLAlchemy and Alembic. Use a simple server-side template reply engine behind a replaceable service interface so a real model can be added later without rewriting the protocol.

**Tech Stack:** Python 3.12+, FastAPI, SQLAlchemy 2.x, Alembic, PostgreSQL, Pydantic v2, PyJWT, passlib/bcrypt, pytest, httpx, FastAPI TestClient

---

## File Structure

**Create**

- `backend/pyproject.toml`
- `backend/.env.example`
- `backend/alembic.ini`
- `backend/alembic/env.py`
- `backend/alembic/script.py.mako`
- `backend/alembic/versions/`
- `backend/app/__init__.py`
- `backend/app/main.py`
- `backend/app/core/config.py`
- `backend/app/core/security.py`
- `backend/app/db/base.py`
- `backend/app/db/session.py`
- `backend/app/api/__init__.py`
- `backend/app/api/health.py`
- `backend/app/api/auth.py`
- `backend/app/api/companion.py`
- `backend/app/api/ws.py`
- `backend/app/models/__init__.py`
- `backend/app/models/user.py`
- `backend/app/models/user_session.py`
- `backend/app/models/companion_session.py`
- `backend/app/models/companion_message.py`
- `backend/app/schemas/__init__.py`
- `backend/app/schemas/auth.py`
- `backend/app/schemas/companion.py`
- `backend/app/services/__init__.py`
- `backend/app/services/auth_service.py`
- `backend/app/services/token_service.py`
- `backend/app/services/companion_service.py`
- `backend/app/services/reply_engine.py`
- `backend/app/services/chat_runtime.py`
- `backend/app/dependencies.py`
- `backend/tests/conftest.py`
- `backend/tests/test_health.py`
- `backend/tests/test_auth_api.py`
- `backend/tests/test_auth_service.py`
- `backend/tests/test_companion_api.py`
- `backend/tests/test_companion_ws.py`

**Modify**

- `README.md`

**Reference**

- `docs/superpowers/specs/2026-03-28-ai-buddy-backend-phase1-api-design.md`

### Task 1: Bootstrap the FastAPI Backend Workspace

**Files:**
- Create: `backend/pyproject.toml`
- Create: `backend/app/__init__.py`
- Create: `backend/app/main.py`
- Create: `backend/app/api/__init__.py`
- Create: `backend/app/api/health.py`
- Create: `backend/tests/conftest.py`
- Create: `backend/tests/test_health.py`

- [ ] **Step 1: Write the failing test**

Add `backend/tests/test_health.py` expecting a minimal FastAPI app with a health endpoint such as `GET /api/v1/health`.

- [ ] **Step 2: Run test to verify it fails**

Run: `python -m pytest -q backend/tests/test_health.py`
Expected: FAIL because the backend package and app entrypoint do not exist yet.

- [ ] **Step 3: Write minimal backend bootstrap implementation**

Create:
- `backend/pyproject.toml` with FastAPI, Uvicorn, SQLAlchemy, Alembic, psycopg, pydantic-settings, PyJWT, passlib, pytest, httpx
- a minimal FastAPI app in `backend/app/main.py`
- a health router in `backend/app/api/health.py`
- test bootstrap helpers in `backend/tests/conftest.py`

- [ ] **Step 4: Run test to verify it passes**

Run: `python -m pytest -q backend/tests/test_health.py`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add backend/pyproject.toml backend/app backend/tests
git commit -m "chore: bootstrap fastapi backend workspace"
```

### Task 2: Add Configuration, Database Foundation, and Alembic Wiring

**Files:**
- Create: `backend/.env.example`
- Create: `backend/alembic.ini`
- Create: `backend/alembic/env.py`
- Create: `backend/alembic/script.py.mako`
- Create: `backend/app/core/config.py`
- Create: `backend/app/db/base.py`
- Create: `backend/app/db/session.py`
- Modify: `backend/app/main.py`
- Modify: `backend/tests/conftest.py`
- Modify: `backend/tests/test_health.py`

- [ ] **Step 1: Write the failing test**

Extend backend tests to expect:
- application settings load from environment
- database session dependency exists
- app startup still succeeds with the configured database URL

- [ ] **Step 2: Run tests to verify they fail**

Run: `python -m pytest -q backend/tests/test_health.py`
Expected: FAIL because settings and database wiring do not exist.

- [ ] **Step 3: Write minimal configuration and DB foundation**

Implement:
- `backend/app/core/config.py` with app, JWT, and database settings
- `backend/app/db/session.py` with SQLAlchemy engine/session factory
- `backend/app/db/base.py` as metadata anchor for models and Alembic
- Alembic config files wired to SQLAlchemy metadata
- `.env.example` documenting required variables

Use PostgreSQL for runtime configuration, but keep tests able to inject a test database URL cleanly through fixtures.

- [ ] **Step 4: Run tests to verify they pass**

Run: `python -m pytest -q backend/tests/test_health.py`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add backend/.env.example backend/alembic.ini backend/alembic backend/app/core backend/app/db backend/tests backend/app/main.py
git commit -m "feat: add backend config and database foundation"
```

### Task 3: Implement Persistence Models, Migration, and Core Auth Utilities

**Files:**
- Create: `backend/app/models/__init__.py`
- Create: `backend/app/models/user.py`
- Create: `backend/app/models/user_session.py`
- Create: `backend/app/models/companion_session.py`
- Create: `backend/app/models/companion_message.py`
- Create: `backend/app/core/security.py`
- Create: `backend/app/services/token_service.py`
- Create: `backend/app/services/auth_service.py`
- Create: `backend/tests/test_auth_service.py`
- Create: `backend/alembic/versions/<timestamp>_create_phase1_tables.py`
- Modify: `backend/app/db/base.py`

- [ ] **Step 1: Write the failing tests**

Add service-level tests covering:
- password hashing and verification
- email normalization to lowercase
- access token creation
- refresh token rotation semantics
- refresh token is stored and compared in hashed form rather than raw persistence
- default companion session creation seam for a new user

- [ ] **Step 2: Run tests to verify they fail**

Run: `python -m pytest -q backend/tests/test_auth_service.py`
Expected: FAIL because models, token service, and auth service do not exist.

- [ ] **Step 3: Write the minimal persistence and auth utility implementation**

Implement:
- SQLAlchemy models for `users`, `user_sessions`, `companion_sessions`, `companion_messages`
- `backend/app/core/security.py` for hashing and password verification
- `backend/app/services/token_service.py` for JWT generation and parsing
- `backend/app/services/auth_service.py` for email normalization, register/login primitives, hashed refresh-token storage, and refresh-token rotation support
- the first Alembic migration creating all phase 1 tables

- [ ] **Step 4: Run tests to verify they pass**

Run: `python -m pytest -q backend/tests/test_auth_service.py`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add backend/app/models backend/app/core/security.py backend/app/services/token_service.py backend/app/services/auth_service.py backend/alembic/versions backend/tests/test_auth_service.py
git commit -m "feat: add auth models and token services"
```

### Task 4: Implement REST Auth Endpoints

**Files:**
- Create: `backend/app/schemas/__init__.py`
- Create: `backend/app/schemas/auth.py`
- Create: `backend/app/dependencies.py`
- Create: `backend/app/api/auth.py`
- Create: `backend/tests/test_auth_api.py`
- Modify: `backend/app/main.py`
- Modify: `backend/app/services/auth_service.py`

- [ ] **Step 1: Write the failing tests**

Add API tests for:
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `GET /api/v1/auth/me`
- `POST /api/v1/auth/logout`

Cover:
- duplicate email conflict
- invalid credentials
- refresh token rotation
- logout idempotence
- required `displayName`
- `displayName` max length `50`
- `password` max length `128`
- lowercase and case-insensitive email handling
- logout requiring both bearer auth and the submitted refresh token
- contract-level error envelope and representative status codes

- [ ] **Step 2: Run tests to verify they fail**

Run: `python -m pytest -q backend/tests/test_auth_api.py`
Expected: FAIL because auth schemas, dependencies, and routes do not exist.

- [ ] **Step 3: Write the minimal auth API implementation**

Implement:
- request and response schemas in `backend/app/schemas/auth.py`
- current-user dependencies in `backend/app/dependencies.py`
- auth routes in `backend/app/api/auth.py`
- service logic required to revoke the submitted refresh-token session on logout while leaving access-token revocation lightweight

- [ ] **Step 4: Run tests to verify they pass**

Run: `python -m pytest -q backend/tests/test_auth_api.py`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add backend/app/schemas/auth.py backend/app/dependencies.py backend/app/api/auth.py backend/app/services/auth_service.py backend/tests/test_auth_api.py backend/app/main.py
git commit -m "feat: implement rest auth endpoints"
```

### Task 5: Implement Companion Session Bootstrap REST Endpoints

**Files:**
- Create: `backend/app/schemas/companion.py`
- Create: `backend/app/api/companion.py`
- Create: `backend/app/services/companion_service.py`
- Create: `backend/tests/test_companion_api.py`
- Modify: `backend/app/main.py`
- Modify: `backend/app/services/auth_service.py` if ownership helpers are needed

- [ ] **Step 1: Write the failing tests**

Add API tests covering:
- `GET /api/v1/companion/session` auto-creates the default session on first request
- repeated calls return the same default session
- `GET /api/v1/companion/session/messages` returns oldest-first history
- only the authenticated owner can access the session history
- `companion_sessions.updated_at` changes when new user or assistant messages are persisted
- interrupted assistant messages are returned with preserved partial content and `status = failed`

- [ ] **Step 2: Run tests to verify they fail**

Run: `python -m pytest -q backend/tests/test_companion_api.py`
Expected: FAIL because companion schemas, services, and routes do not exist.

- [ ] **Step 3: Write the minimal companion REST implementation**

Implement:
- companion response schemas in `backend/app/schemas/companion.py`
- default-session lookup or creation in `backend/app/services/companion_service.py`
- message history retrieval in oldest-first order
- REST routes in `backend/app/api/companion.py`

- [ ] **Step 4: Run tests to verify they pass**

Run: `python -m pytest -q backend/tests/test_companion_api.py`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add backend/app/schemas/companion.py backend/app/api/companion.py backend/app/services/companion_service.py backend/tests/test_companion_api.py backend/app/main.py
git commit -m "feat: add companion session rest endpoints"
```

### Task 6: Implement WebSocket Companion Chat Streaming and Reply Engine

**Files:**
- Create: `backend/app/api/ws.py`
- Create: `backend/app/services/reply_engine.py`
- Create: `backend/app/services/chat_runtime.py`
- Create: `backend/tests/test_companion_ws.py`
- Modify: `backend/app/main.py`
- Modify: `backend/app/services/companion_service.py`
- Modify: `backend/app/schemas/companion.py` if shared event typing helpers are helpful

- [ ] **Step 1: Write the failing tests**

Add WebSocket tests covering:
- authenticated connection to `/api/v1/companion/ws`
- invalid token handshake rejection
- mid-connection auth expiration emits `system.auth.expired` and closes with `4401`
- `chat.send` persists a user message and yields `chat.user.accepted` with the originating `clientMessageId`
- assistant flow yields `chat.assistant.started`, one or more deltas, and `chat.assistant.completed`
- sending while a reply is still streaming returns `chat.error` with `CHAT_REPLY_IN_PROGRESS` and the rejected send's `clientMessageId`
- empty or whitespace-only content is rejected
- content over the `4000` length limit is rejected
- `sessionId` ownership is enforced
- interrupted assistant generation emits terminal `chat.error` with `CHAT_STREAM_INTERRUPTED` and the related assistant `messageId`
- interrupted assistant generation marks the persisted assistant message as `failed`
- interrupted assistant generation keeps the socket open so the client can retry without reconnecting
- interrupted assistant generation is observable in subsequent history fetches with preserved partial content and `status = failed`

- [ ] **Step 2: Run tests to verify they fail**

Run: `python -m pytest -q backend/tests/test_companion_ws.py`
Expected: FAIL because the WebSocket route and streaming runtime do not exist.

- [ ] **Step 3: Write the minimal WebSocket and reply-engine implementation**

Implement:
- `backend/app/services/reply_engine.py` with keyword or template-driven reply chunks
- `backend/app/services/chat_runtime.py` to enforce one in-flight assistant generation per session
- `backend/app/api/ws.py` handling handshake auth, `chat.send`, and server events
- validation for trimmed non-empty content, `4000` max content length, and authenticated session ownership
- persistence updates for `streaming`, `completed`, and `failed` assistant states
- interrupted-stream terminal behavior that emits `chat.error` with the assistant `messageId` and leaves the socket open
- `system.auth.expired` behavior hook and `4401` close handling seam

- [ ] **Step 4: Run tests to verify they pass**

Run: `python -m pytest -q backend/tests/test_companion_ws.py`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add backend/app/api/ws.py backend/app/services/reply_engine.py backend/app/services/chat_runtime.py backend/app/services/companion_service.py backend/tests/test_companion_ws.py backend/app/main.py
git commit -m "feat: add companion websocket streaming flow"
```

### Task 7: Run Full Backend Verification and Document Local Usage

**Files:**
- Modify: `README.md`
- Modify: any backend files only if verification surfaces regressions

- [ ] **Step 1: Write any missing regression checks first**

If full-suite verification reveals uncovered bugs, add or tighten tests in:
- `backend/tests/test_health.py`
- `backend/tests/test_auth_api.py`
- `backend/tests/test_auth_service.py`
- `backend/tests/test_companion_api.py`
- `backend/tests/test_companion_ws.py`

- [ ] **Step 2: Run the full backend test suite**

Run: `python -m pytest -q backend/tests`
Expected: PASS

- [ ] **Step 3: Run migration verification**

Run: `python -m alembic -c backend/alembic.ini upgrade head`
Expected: PASS with the phase 1 tables created successfully against the configured database.

- [ ] **Step 4: Run a backend import or startup verification**

Run: `python -m compileall backend/app`
Expected: PASS with no syntax errors

- [ ] **Step 5: Update local run documentation**

Document in `README.md`:
- how to install backend dependencies
- how to configure `DATABASE_URL`, `JWT_SECRET`, and token lifetimes
- how to run Alembic migration
- how to start the backend locally

- [ ] **Step 6: Commit**

```bash
git add backend README.md
git commit -m "docs: add backend phase 1 local run guide"
```

## Review Notes

This plan intentionally does not include:

- journal backend
- healing backend
- real LLM integration
- Docker compose integration for the backend service

Those should become later focused plans after phase 1 auth and companion APIs are working end-to-end.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-03-28-ai-buddy-backend-phase1.md`.

Two execution options:

1. Subagent-Driven (recommended) - I dispatch a fresh subagent per task, review between tasks, fast iteration
2. Inline Execution - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
