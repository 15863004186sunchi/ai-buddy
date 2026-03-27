# AI Buddy Companion Local Chat Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the current static companion tab into a locally interactive chat flow with editable input, send behavior, mock assistant replies, and placeholder feedback for deferred actions.

**Architecture:** Keep `CompanionTab.vue` as the main owner of the local conversation experience and extend `src/data/companion.ts` to provide seeded messages, reply templates, and placeholder copy. Reuse the existing `/app/companion` tab route and mobile shell, and add only the minimum state and selectors needed for durable tests.

**Tech Stack:** Vue 3, Vite, Vue Router, Vitest, Vue Test Utils, TypeScript, CSS variables, local reactive state

---

## File Structure

**Create**

- none

**Modify**

- `src/components/tabs/CompanionTab.vue`
- `src/data/companion.ts`
- `tests/app-tabs.spec.ts`
- `tests/encoding.spec.ts`

**Reference**

- `docs/superpowers/specs/2026-03-27-ai-buddy-companion-local-chat-design.md`

### Task 1: Add Failing Coverage for Local Composer Behavior

**Files:**
- Modify: `tests/app-tabs.spec.ts`

- [ ] **Step 1: Write the failing tests**

Add coverage for:
- typing into the companion composer
- clicking `发送` appends a user message
- clicking `发送` appends a local assistant reply
- empty input does not send
- `+`、`语音`、`设置` show placeholder feedback

Use stable `data-testid` hooks such as:
- `chat-input`
- `chat-send`
- `chat-feedback`
- `chat-settings`
- `chat-plus`
- `chat-voice`

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/app-tabs.spec.ts`
Expected: FAIL because the companion composer is still static and the new selectors or behaviors do not exist.

- [ ] **Step 3: Write minimal implementation**

Do not implement yet beyond what is needed to understand the failing shape.

- [ ] **Step 4: Run test to verify it still fails for the expected reason**

Run: `npm test -- --run tests/app-tabs.spec.ts`
Expected: FAIL for missing interactive companion behavior, not for unrelated syntax issues.

- [ ] **Step 5: Commit**

```bash
git add tests/app-tabs.spec.ts
git commit -m "test: cover companion local chat interactions"
```

### Task 2: Implement Local Companion Chat State and Placeholder Actions

**Files:**
- Modify: `src/components/tabs/CompanionTab.vue`
- Modify: `src/data/companion.ts`

- [ ] **Step 1: Write the minimal implementation for companion data**

Update `src/data/companion.ts` to expose:
- seeded `companionMessages`
- reply templates for mock assistant responses
- placeholder messages for `+`, `语音`, and `设置`
- existing header and composer labels, preserving current Chinese copy

- [ ] **Step 2: Write the minimal implementation for companion view state**

Update `src/components/tabs/CompanionTab.vue` to:
- initialize a local reactive `messages` array from the seeded data
- manage `draftMessage`
- manage `feedbackMessage`
- render an editable input or textarea in the composer
- append a user message and one mock assistant reply on send
- ignore empty or whitespace-only input
- show placeholder feedback for `+`, `语音`, and `设置`

- [ ] **Step 3: Add stable selectors**

Add only the selectors needed by tests, such as:
- `data-testid="chat-input"`
- `data-testid="chat-send"`
- `data-testid="chat-feedback"`
- `data-testid="chat-settings"`
- `data-testid="chat-plus"`
- `data-testid="chat-voice"`

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run tests/app-tabs.spec.ts`
Expected: PASS with the new local companion interactions covered.

- [ ] **Step 5: Commit**

```bash
git add src/components/tabs/CompanionTab.vue src/data/companion.ts tests/app-tabs.spec.ts
git commit -m "feat: add companion local chat interactions"
```

### Task 3: Lock Encoding and Full Regression Coverage

**Files:**
- Modify: `tests/encoding.spec.ts`
- Modify: `src/components/tabs/CompanionTab.vue` if regressions appear
- Modify: `src/data/companion.ts` if regressions appear

- [ ] **Step 1: Write the failing regression checks**

Update `tests/encoding.spec.ts` to cover any newly added user-facing Chinese copy such as:
- placeholder feedback strings
- updated composer-related text

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/encoding.spec.ts`
Expected: FAIL until the new Chinese copy is covered in the encoding regression test.

- [ ] **Step 3: Write minimal implementation adjustments**

If needed:
- keep new companion copy in UTF-8-safe source text
- tighten selectors or labels only where tests require it

- [ ] **Step 4: Run full verification**

Run: `npm test -- --run`
Expected: PASS

Run: `npm run build`
Expected: PASS and emit production assets

- [ ] **Step 5: Commit**

```bash
git add src/components/tabs/CompanionTab.vue src/data/companion.ts tests/app-tabs.spec.ts tests/encoding.spec.ts
git commit -m "test: cover companion local chat regressions"
```

## Review Notes

The writing-plans skill normally calls for a plan review loop via subagent. That review is not being delegated in this session because no explicit subagent request was made. The fallback is to keep the plan concrete, TDD-oriented, and directly reviewable before execution.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-03-27-ai-buddy-companion-local-chat.md`.

Two execution options:

1. Subagent-Driven (recommended) - I dispatch a fresh subagent per task, review between tasks, fast iteration
2. Inline Execution - Execute tasks in this session using executing-plans, batch execution with checkpoints
