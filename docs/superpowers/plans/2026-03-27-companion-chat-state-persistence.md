# Companion Chat State Persistence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep sent companion chat messages across tab switches while resetting unsent draft text and transient feedback on remount.

**Architecture:** Store the sent-message thread in a dedicated companion composable backed by a module-level singleton. Keep draft and feedback state local to `CompanionTab.vue` so tab switches preserve only committed conversation history.

**Tech Stack:** Vue 3, Vue Router, Vitest, Vue Test Utils

---

### Task 1: Lock The Route-Switch Behavior With A Test

**Files:**
- Modify: `tests/app-tabs.spec.ts`
- Test: `tests/app-tabs.spec.ts`

- [ ] **Step 1: Write the failing test**

Add a test that:
- mounts `/app/companion`
- sends one message
- enters a new draft and triggers placeholder feedback
- routes to `/app/home` and back to `/app/companion`
- expects the sent messages to remain while the draft input and feedback region are empty

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/app-tabs.spec.ts`
Expected: FAIL because the companion thread is currently stored inside the tab component and is lost on remount.

### Task 2: Move The Conversation Thread Into A Shared Companion Store

**Files:**
- Create: `src/composables/useCompanionChat.ts`
- Modify: `src/data/companion.ts`
- Modify: `src/components/tabs/CompanionTab.vue`
- Test: `tests/app-tabs.spec.ts`

- [ ] **Step 1: Add a message factory to the companion data module**

Export `createInitialCompanionMessages()` so callers receive a cloned initial thread instead of mutating the shared constant array directly.

- [ ] **Step 2: Create the companion chat composable**

Implement a singleton store that exposes:
- `messages`
- `sendLocalMessage(draft: string)`
- `resetCompanionChatForTests()`

- [ ] **Step 3: Update the companion tab to use the composable**

Keep only `draftMessage` and `feedbackMessage` local in the component. Replace the inline message append logic with a call to `sendLocalMessage(trimmedDraft)`.

- [ ] **Step 4: Reset the shared chat state in tests**

Call `resetCompanionChatForTests()` from the test setup helper so each test starts from the initial thread.

- [ ] **Step 5: Run the targeted test suite**

Run: `npm test -- --run tests/app-tabs.spec.ts`
Expected: PASS

### Task 3: Run Regression Verification

**Files:**
- Test: `tests/router.spec.ts`
- Test: `tests/secondary-pages.spec.ts`
- Test: `tests/app-tabs.spec.ts`

- [ ] **Step 1: Run the broader related suite**

Run: `npm test -- --run tests/router.spec.ts tests/secondary-pages.spec.ts tests/app-tabs.spec.ts`
Expected: PASS

- [ ] **Step 2: Run a production build**

Run: `npm run build`
Expected: PASS
