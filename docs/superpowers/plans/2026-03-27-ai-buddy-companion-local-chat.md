# Companion Local Chat Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add minimal local companion chat interactions so the companion composer supports input, send, placeholder feedback, and the new interaction tests pass.

**Architecture:** Keep the change localized to the companion tab. Store composer input, local thread state, and placeholder feedback inside `CompanionTab.vue`, seeded from the existing static companion data. Expose stable `data-testid` hooks for the interaction tests rather than coupling behavior checks to visual structure.

**Tech Stack:** Vue 3, Vue Router, Vitest, Vue Test Utils

---

### Task 1: Implement Local Companion Composer

**Files:**
- Modify: `src/components/tabs/CompanionTab.vue`
- Modify: `tests/app-tabs.spec.ts`
- Test: `tests/app-tabs.spec.ts`

- [ ] **Step 1: Confirm the new interaction tests fail**

Run: `npm test -- --run tests/app-tabs.spec.ts`
Expected: FAIL because the companion composer is still static and missing the required interactive hooks/behavior.

- [ ] **Step 2: Tighten the fragile test assertions just enough for implementation**

Update the companion interaction tests to prefer stable hooks over styling classes where practical and keep the assertions focused on observable message/feedback behavior.

- [ ] **Step 3: Write the minimal companion composer implementation**

Add:
- local reactive thread state seeded from `companionMessages`
- a real input with `data-testid="chat-input"`
- send button with `data-testid="chat-send"`
- placeholder action buttons with `data-testid="chat-plus"`, `data-testid="chat-voice"`, and `data-testid="chat-settings"`
- feedback region with `data-testid="chat-feedback"`
- minimal send behavior:
  - ignore empty or whitespace-only input
  - append one user message
  - append one local assistant reply
  - clear the input after send

- [ ] **Step 4: Verify the targeted test suite passes**

Run: `npm test -- --run tests/app-tabs.spec.ts`
Expected: PASS

- [ ] **Step 5: Run a broader related verification**

Run: `npm test -- --run tests/router.spec.ts tests/secondary-pages.spec.ts tests/app-tabs.spec.ts`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/tabs/CompanionTab.vue tests/app-tabs.spec.ts docs/superpowers/plans/2026-03-27-ai-buddy-companion-local-chat.md
git commit -m "feat: add local companion chat interactions"
```
