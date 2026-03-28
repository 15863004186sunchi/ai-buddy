# AI Buddy Backend Phase 1 API Design

**Project:** `ai-buddy`

**Date:** 2026-03-28

## Goal

Design the first production backend contract that can replace the current front-end mock flow for:

- account registration and login
- authenticated session retrieval
- companion chat initialization
- companion chat message exchange

This phase should let the existing Vue 3 app move from local mock auth and local mock companion replies toward a real client-server flow without forcing the rest of the product to go backend-first yet.

## Scope

### In Scope

- email and password registration
- email and password login
- JWT-based authentication
- refresh-token based session continuation
- single default companion chat session per user
- companion history retrieval
- WebSocket-based streaming assistant replies
- rule or template based assistant generation on the server side
- backend data contracts needed by the current front-end routes

### Out of Scope

- multi-session or folder-style chat management
- real LLM integration
- RAG, tools, memory ranking, or prompt orchestration
- journal CRUD APIs
- healing content management APIs
- admin, moderation, analytics, billing, or notification systems
- third-party social login

## Product Context

The current front-end already contains these user-facing surfaces:

- welcome and onboarding
- auth pages
- top-level tabs for home, companion, journal, and healing
- secondary detail pages for journal and healing

Among these, the first backend-enabled chain for this phase is intentionally limited to:

- auth pages
- companion tab

Journal and healing should remain mock-driven in this phase so implementation stays focused and the first backend plan remains small enough to execute cleanly.

## Chosen Architecture

### Recommended Split

Use:

- REST for authentication and session bootstrap
- WebSocket for companion chat streaming

This keeps account flows simple and conventional while giving the companion area a real-time interaction model that is compatible with future LLM replacement.

### Why This Split

Using REST for auth avoids overcomplicating registration, login, token refresh, and current-user lookups.

Using WebSocket for companion chat avoids the awkwardness of:

- POST for user input
- separate SSE channel for assistant output

and gives a cleaner long-lived channel for future typing indicators, interruptions, retry signals, or model-side events.

## Authentication Design

### Auth Model

Authentication uses:

- `accessToken` for normal authenticated requests
- `refreshToken` for renewing access

The access token is short-lived. The refresh token is longer-lived and stored server-side in hashed form so logout and token invalidation remain possible.

### Transport

For REST endpoints, the client sends:

`Authorization: Bearer <accessToken>`

For WebSocket, phase 1 uses:

- `GET /api/v1/companion/ws?token=<accessToken>`

This is acceptable for phase 1 because it is straightforward to integrate with the current front-end. If desired later, the connection can move to an initial `auth.init` event after handshake.

WebSocket auth-failure signaling is explicit in phase 1:

- if the token is invalid or expired before upgrade, the server rejects the handshake with `401 Unauthorized`
- if the token becomes unusable for the current socket lifecycle, the server emits `system.auth.expired` and then closes the socket with close code `4401`
- after receiving that signal, the client refreshes the token over REST and reconnects

### Refresh Token Rotation

Refresh-token rotation is mandatory in phase 1:

- every successful refresh returns a new refresh token
- the previous refresh token becomes invalid immediately
- the client must replace the stored refresh token after every successful refresh

This removes ambiguity in logout, refresh replay, and multi-device session handling.

### Logout Semantics

Phase 1 uses the lightweight logout model:

- logout revokes the current refresh token session
- already-issued access tokens are not force-revoked immediately
- existing WebSocket connections are not forcibly closed just because logout was called elsewhere
- once the current access token expires, subsequent REST and WebSocket authentication attempts must fail until the user logs in again

This keeps phase 1 implementation small and avoids introducing token denylist or global socket eviction requirements.

## Session Model

### Single Companion Session

Each authenticated user has one default companion conversation.

Behavior:

- if no companion session exists, the backend creates one automatically
- the front-end does not manage a session list
- the front-end only asks for the user’s default session

This matches the current product state and avoids premature multi-thread information architecture.

## API Surface

### REST Endpoints

#### `POST /api/v1/auth/register`

Creates a user account and returns initial tokens plus current user info.

Rules:

- `displayName` is required in phase 1
- returned `user.displayName` is never `null`
- `email` is normalized to lowercase before persistence and lookup
- `email` uniqueness is case-insensitive
- `displayName` max length is `50`
- `password` max length is `128`

Request:

```json
{
  "email": "user@example.com",
  "password": "password123",
  "displayName": "小满"
}
```

Response:

```json
{
  "accessToken": "jwt-access-token",
  "refreshToken": "jwt-refresh-token",
  "user": {
    "id": "u_123",
    "email": "user@example.com",
    "displayName": "小满"
  }
}
```

#### `POST /api/v1/auth/login`

Logs in an existing user and returns tokens plus current user info.

Request:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "accessToken": "jwt-access-token",
  "refreshToken": "jwt-refresh-token",
  "user": {
    "id": "u_123",
    "email": "user@example.com",
    "displayName": "小满"
  }
}
```

#### `POST /api/v1/auth/refresh`

Exchanges a valid refresh token for a new access token and a rotated refresh token.

Request:

```json
{
  "refreshToken": "jwt-refresh-token"
}
```

Response:

```json
{
  "accessToken": "jwt-access-token",
  "refreshToken": "jwt-refresh-token"
}
```

#### `GET /api/v1/auth/me`

Returns the authenticated user profile used by the app shell.

Response:

```json
{
  "user": {
    "id": "u_123",
    "email": "user@example.com",
    "displayName": "小满"
  }
}
```

#### `POST /api/v1/auth/logout`

Invalidates the refresh-token session and should be used by the front-end when the user explicitly logs out.

Rules:

- this endpoint requires both `Authorization: Bearer <accessToken>` and the current `refreshToken`
- logout is idempotent from the client perspective

Request:

```json
{
  "refreshToken": "jwt-refresh-token"
}
```

Response:

```json
{
  "ok": true
}
```

#### `GET /api/v1/companion/session`

Returns the current user’s default companion session. If it does not yet exist, the backend creates it first.

Response:

```json
{
  "session": {
    "id": "cs_001",
    "userId": "u_123",
    "type": "default",
    "title": "默认陪伴会话",
    "createdAt": "2026-03-28T10:00:00Z",
    "updatedAt": "2026-03-28T10:05:00Z"
  }
}
```

#### `GET /api/v1/companion/session/messages`

Returns historical messages for the current default companion session.

Ordering contract:

- messages are returned oldest-first
- clients append newer streamed messages to the end of the current thread
- if an assistant generation was interrupted after persistence began, the returned message keeps its last persisted content and `status = failed`

Response:

```json
{
  "sessionId": "cs_001",
  "messages": [
    {
      "id": "m_001",
      "role": "assistant",
      "content": "你好，我在这里陪你。",
      "status": "completed",
      "createdAt": "2026-03-28T10:00:00Z"
    }
  ]
}
```

### WebSocket Endpoint

#### `GET /api/v1/companion/ws?token=<accessToken>`

Creates a chat stream for the authenticated user.

The client uses this connection to:

- send user messages
- receive streaming assistant replies
- receive chat-level errors

## WebSocket Event Protocol

### Client -> Server

#### `chat.send`

Sent when the user submits a new message.

```json
{
  "event": "chat.send",
  "data": {
    "clientMessageId": "local_001",
    "sessionId": "cs_001",
    "content": "我今天有点焦虑"
  }
}
```

Rules:

- `content` must be non-empty after trimming
- `content` max length is `4000`
- `sessionId` must belong to the authenticated user
- `clientMessageId` is generated by the front-end for reconciliation
- phase 1 allows only one in-flight assistant generation per session
- if a new `chat.send` arrives while an assistant reply is still streaming, the server rejects it with `chat.error` and does not queue it automatically

### Server -> Client

#### `system.auth.expired`

Signals that the current socket is no longer authorized and the client must refresh and reconnect.

```json
{
  "event": "system.auth.expired",
  "data": {
    "code": "AUTH_TOKEN_EXPIRED",
    "message": "登录状态已过期，请重新连接"
  }
}
```

#### `chat.user.accepted`

Confirms the user message was accepted and persisted.

```json
{
  "event": "chat.user.accepted",
  "data": {
    "clientMessageId": "local_001",
    "message": {
      "id": "m_101",
      "role": "user",
      "content": "我今天有点焦虑",
      "status": "completed",
      "createdAt": "2026-03-28T10:10:00Z"
    }
  }
}
```

#### `chat.assistant.started`

Signals that assistant generation has begun.

Persistence contract:

- at `chat.assistant.started`, the server creates and persists the assistant message with `status = streaming`
- the initial persisted content may be empty
- subsequent deltas update the same persisted assistant message

```json
{
  "event": "chat.assistant.started",
  "data": {
    "messageId": "m_102",
    "role": "assistant",
    "status": "streaming"
  }
}
```

#### `chat.assistant.delta`

Streams assistant content chunks.

```json
{
  "event": "chat.assistant.delta",
  "data": {
    "messageId": "m_102",
    "delta": "听起来你现在"
  }
}
```

#### `chat.assistant.completed`

Marks assistant generation as complete and provides the final normalized message object.

```json
{
  "event": "chat.assistant.completed",
  "data": {
    "message": {
      "id": "m_102",
      "role": "assistant",
      "content": "听起来你现在很紧绷，我们先慢一点。",
      "status": "completed",
      "createdAt": "2026-03-28T10:10:02Z"
    }
  }
}
```

#### `chat.error`

Returns chat-specific failure information.

Correlation contract:

- if the error is tied to a specific optimistic send, the server includes `clientMessageId`
- if the error is session-level rather than tied to one send, `clientMessageId` may be omitted

```json
{
  "event": "chat.error",
  "data": {
    "code": "CHAT_SEND_FAILED",
    "message": "消息发送失败，请稍后再试",
    "clientMessageId": "local_001"
  }
}
```

#### Interrupted Generation Behavior

If assistant generation is interrupted after `chat.assistant.started`:

- the persisted assistant message remains in storage
- its latest accumulated content is preserved
- its `status` becomes `failed`
- on the active socket, the server emits a terminal `chat.error` with `code = CHAT_STREAM_INTERRUPTED` and the related assistant `messageId`
- after that terminal error event, the socket stays open so the user can retry without reconnecting
- on reconnect, `GET /api/v1/companion/session/messages` returns that message as the canonical history state

This gives the front-end a stable replay contract after disconnects.

## Field Conventions

### Message Fields

- `role`: `user | assistant`
- `status`: `streaming | completed | failed`
- `content`: plain UTF-8 text
- `createdAt`: ISO 8601 UTC timestamp

### Identity Fields

- user ids use a stable unique id such as `u_123`
- companion session ids use a stable unique id such as `cs_001`
- message ids use a stable unique id such as `m_001`

### Client Correlation

`clientMessageId` is not a persisted business identifier. It exists only to let the front-end reconcile optimistic local messages with server-confirmed records.

## Reply Engine Design

### Phase 1 Reply Strategy

Phase 1 assistant replies are generated by a server-side rule or template engine.

The engine may:

- route by keyword group
- rotate among reassuring template variants
- fall back to a neutral supportive reply

The engine should not pretend to be a real LLM in phase 1. Its job is to preserve the companion interaction model and event contract so a real model can replace it later.

### Replacement Seam

The WebSocket protocol and stored message shape should remain stable when the internal reply generator changes from:

- template engine

to:

- real model gateway

This means the implementation should isolate the reply generation service behind a clean internal interface, even if phase 1 only has one implementation.

## Data Model

### `users`

Fields:

- `id`
- `email`
- `password_hash`
- `display_name`
- `created_at`
- `updated_at`

Constraints:

- `email` must be unique

### `user_sessions`

Fields:

- `id`
- `user_id`
- `refresh_token_hash`
- `expired_at`
- `created_at`

Purpose:

- supports refresh token rotation
- supports explicit logout and invalidation

### `companion_sessions`

Fields:

- `id`
- `user_id`
- `type`
- `title`
- `created_at`
- `updated_at`

Constraints:

- one `default` session per user in phase 1
- `updated_at` changes whenever a new user or assistant message is persisted into the session

### `companion_messages`

Fields:

- `id`
- `session_id`
- `role`
- `content`
- `status`
- `created_at`

Purpose:

- stores the canonical conversation history returned to the front-end

## Error Design

### Authentication Errors

- `AUTH_INVALID_CREDENTIALS`
- `AUTH_EMAIL_ALREADY_EXISTS`
- `AUTH_TOKEN_EXPIRED`
- `AUTH_UNAUTHORIZED`

### Chat Errors

- `CHAT_SESSION_NOT_FOUND`
- `CHAT_MESSAGE_EMPTY`
- `CHAT_SEND_FAILED`
- `CHAT_STREAM_INTERRUPTED`
- `CHAT_REPLY_IN_PROGRESS`

### REST Error Shape

Use a consistent envelope. Recommended status codes in phase 1:

- `400` for validation errors such as empty message or malformed payload
- `401` for missing, invalid, or expired access tokens
- `404` for missing session resources that pass auth but do not exist
- `409` for registration conflicts such as duplicate email

Use a consistent envelope:

```json
{
  "error": {
    "code": "AUTH_INVALID_CREDENTIALS",
    "message": "邮箱或密码错误"
  }
}
```

### WebSocket Error Shape

Use the `chat.error` event with the same `code` and `message` philosophy.

## Front-End Integration Flow

### Login Flow

1. Front-end calls `POST /api/v1/auth/login`
2. Front-end stores `accessToken` and `refreshToken`
3. Front-end optionally calls `GET /api/v1/auth/me`
4. Front-end enters `/app/home`

### Companion Entry Flow

1. Front-end calls `GET /api/v1/companion/session`
2. Front-end receives or creates the default session
3. Front-end calls `GET /api/v1/companion/session/messages`
4. Front-end renders history
5. Front-end opens WebSocket with access token

### Send Message Flow

1. Front-end generates `clientMessageId`
2. Front-end sends `chat.send`
3. Back-end persists and emits `chat.user.accepted`
4. Back-end persists the assistant placeholder and emits `chat.assistant.started`
5. Back-end emits one or more `chat.assistant.delta`
6. Back-end emits `chat.assistant.completed`
7. Front-end updates the visible assistant bubble from partial to final state
8. if the user sends again before step 6 completes, the server responds with `chat.error` using `CHAT_REPLY_IN_PROGRESS`

### Token Expiration Flow

For REST:

- server returns `401` with `AUTH_TOKEN_EXPIRED`
- front-end calls `POST /api/v1/auth/refresh`
- front-end retries the original request after refresh succeeds
- front-end replaces the stored refresh token with the rotated one returned by refresh

For WebSocket:

- if the handshake fails with `401`, the front-end refreshes token first and reconnects
- if the socket receives `system.auth.expired`, the front-end refreshes token first and reconnects
- after reconnect, the front-end continues using the same default chat session
- after reconnect, message history is restored from `GET /api/v1/companion/session/messages`, including any assistant messages marked `failed`

## Security and Validation Baseline

Phase 1 should still include these minimum protections:

- password hashing with a modern algorithm
- email uniqueness checks
- message trimming and empty-message validation
- ownership checks for session and message access
- hashed refresh token storage
- token expiration checks
- UTF-8 safe request and response handling

## Acceptance Criteria

This spec is acceptable for implementation planning when:

- the current auth pages can be switched from local mock auth to REST auth
- the current companion page can load a real default session and real persisted history
- the current companion page can send messages over WebSocket
- the front-end can render streamed assistant deltas before final completion
- logout can invalidate the refresh token session
- interrupted assistant replies have a defined persisted state and replay behavior
- the protocol stays small enough to implement in one focused backend phase

## Future Expansion

These are intentionally deferred, but this design should not block them:

- multi-session chat
- real model gateway integration
- message metadata such as token usage or safety annotations
- journal APIs
- healing content APIs
- richer user profile management

The important constraint is that phase 1 should create a clean seam, not a toy protocol that must be thrown away later.
