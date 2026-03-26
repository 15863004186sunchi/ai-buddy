# AI Buddy Secondary Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend the current Vue 3 app with journal empty-state, journal detail, and healing player pages that match the prototype and connect cleanly to the existing mobile tab flow.

**Architecture:** Keep `AppTabsPage.vue` as the stable top-level tab shell and add dedicated secondary routes for journal detail and healing playback. Use local mock data to drive the new page states, keep interactions lightweight and testable, and preserve the existing fixed-bottom mobile navigation behavior on `/app/:tab` routes.

**Tech Stack:** Vue 3, Vite, Vue Router, Vitest, Vue Test Utils, TypeScript, CSS variables, local mock data

---

## File Structure

**Create**

- `src/pages/JournalDetailPage.vue`
- `src/pages/HealingPlayerPage.vue`
- `tests/secondary-pages.spec.ts`

**Modify**

- `src/router/index.ts`
- `src/components/tabs/JournalTab.vue`
- `src/components/tabs/HealingTab.vue`
- `src/data/journal.ts`
- `src/data/healing.ts`
- `tests/app-tabs.spec.ts`
- `tests/router.spec.ts`
- `tests/encoding.spec.ts`

**Reference**

- `_1/code.html`
- `_4/code.html`
- `_5/code.html`
- `docs/superpowers/specs/2026-03-27-ai-buddy-secondary-pages-design.md`

### Task 1: Add Secondary Route Coverage and Page Skeletons

**Files:**
- Create: `tests/secondary-pages.spec.ts`
- Modify: `tests/router.spec.ts`
- Modify: `src/router/index.ts`
- Create: `src/pages/JournalDetailPage.vue`
- Create: `src/pages/HealingPlayerPage.vue`

- [ ] **Step 1: Write the failing tests**

Add route coverage for:
- `/journal/journal-1` renders a journal detail page shell
- `/healing/track-1` renders a healing player page shell
- unauthenticated access to the new secondary routes redirects to `/auth`

Use selectors and text that will exist in the final page shells, such as page titles, back buttons, and stable `data-testid` attributes.

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- --run tests/router.spec.ts tests/secondary-pages.spec.ts`
Expected: FAIL because the new routes and page components do not exist yet.

- [ ] **Step 3: Write minimal implementation**

Implement the minimum route skeleton to satisfy the tests:
- register `/journal/:id` and `/healing/:id` in `src/router/index.ts`
- apply the same authenticated-route guard behavior used by the app shell
- create minimal but structured `JournalDetailPage.vue` and `HealingPlayerPage.vue` with stable page-level wrappers and headings

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- --run tests/router.spec.ts tests/secondary-pages.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/router/index.ts src/pages/JournalDetailPage.vue src/pages/HealingPlayerPage.vue tests/router.spec.ts tests/secondary-pages.spec.ts
git commit -m "feat: add secondary page routes"
```

### Task 2: Implement Journal Empty State and Detail Experience

**Files:**
- Modify: `src/components/tabs/JournalTab.vue`
- Modify: `src/data/journal.ts`
- Modify: `src/pages/JournalDetailPage.vue`
- Modify: `tests/app-tabs.spec.ts`
- Modify: `tests/secondary-pages.spec.ts`
- Modify: `tests/encoding.spec.ts`

- [ ] **Step 1: Write the failing tests**

Update tests to cover:
- `/app/journal` renders the empty-state experience instead of the list by default
- the journal tab exposes the primary CTA and empty-state wrapper
- `/journal/journal-1` renders the expected hero image, metadata, tags, AI reflection block, and bottom actions
- the companion continuation CTA on journal detail navigates to `/app/companion`
- the favorite action toggles local visual state on the detail page

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- --run tests/app-tabs.spec.ts tests/secondary-pages.spec.ts tests/encoding.spec.ts`
Expected: FAIL because the journal tab still renders list-first content and the detail page is still only a skeleton.

- [ ] **Step 3: Write minimal implementation**

Implement the journal experience in small, focused edits:
- reshape `src/data/journal.ts` to expose empty-state copy, list entries, detail content, and a local state toggle seam
- update `JournalTab.vue` so the default state renders the `_1/code.html` inspired empty state
- keep the list-state data available for future reactivation rather than deleting it
- finish `JournalDetailPage.vue` with prototype-aligned layout, tags, AI reflection card, and local favorite toggle state
- route the companion continuation CTA to `/app/companion`
- add stable `data-testid` hooks where tests need them

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- --run tests/app-tabs.spec.ts tests/secondary-pages.spec.ts tests/encoding.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/tabs/JournalTab.vue src/data/journal.ts src/pages/JournalDetailPage.vue tests/app-tabs.spec.ts tests/secondary-pages.spec.ts tests/encoding.spec.ts
git commit -m "feat: implement journal secondary pages"
```

### Task 3: Implement Healing Player Navigation and Playback UI State

**Files:**
- Modify: `src/components/tabs/HealingTab.vue`
- Modify: `src/data/healing.ts`
- Modify: `src/pages/HealingPlayerPage.vue`
- Modify: `tests/app-tabs.spec.ts`
- Modify: `tests/secondary-pages.spec.ts`
- Modify: `tests/encoding.spec.ts`

- [ ] **Step 1: Write the failing tests**

Update tests to cover:
- healing hero and recent-track items can navigate to `/healing/:id`
- `/healing/track-1` renders the expected artwork, title, type badge, progress area, and control cluster
- the main play button toggles local play or pause state
- the healing tab still renders its discovery structure inside the app shell

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- --run tests/app-tabs.spec.ts tests/secondary-pages.spec.ts tests/encoding.spec.ts`
Expected: FAIL because the healing tab entry points are not wired and the player page still lacks its final playback UI.

- [ ] **Step 3: Write minimal implementation**

Implement the healing flow in focused steps:
- extend `src/data/healing.ts` with detail-by-id content used by the player page
- wire the healing hero, category cards, and recent tracks to route into `/healing/:id`
- complete `HealingPlayerPage.vue` with immersive background, cover artwork, metadata, progress display, and playback controls
- add local play or pause toggle state without introducing real audio playback
- add stable selectors for player-level interactions

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- --run tests/app-tabs.spec.ts tests/secondary-pages.spec.ts tests/encoding.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/tabs/HealingTab.vue src/data/healing.ts src/pages/HealingPlayerPage.vue tests/app-tabs.spec.ts tests/secondary-pages.spec.ts tests/encoding.spec.ts
git commit -m "feat: implement healing player flow"
```

### Task 4: Lock In Regression Coverage and Verify the Whole App

**Files:**
- Modify: `tests/router.spec.ts`
- Modify: `tests/app-tabs.spec.ts`
- Modify: `tests/secondary-pages.spec.ts`
- Modify: `tests/encoding.spec.ts`
- Modify: any touched Vue files if regressions appear during verification

- [ ] **Step 1: Write the failing regression checks**

Add or tighten assertions for:
- the app shell still fixes the bottom navigation on `/app/:tab`
- secondary pages do not accidentally render the tab-shell bottom navigation
- existing authenticated app entry still works after the new routes were introduced
- new Chinese copy in the secondary pages is covered by encoding regression checks

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- --run tests/router.spec.ts tests/app-tabs.spec.ts tests/secondary-pages.spec.ts tests/encoding.spec.ts`
Expected: FAIL until any missing selectors, layout boundaries, or text coverage are corrected.

- [ ] **Step 3: Write minimal implementation**

Fix only the regressions surfaced by the expanded coverage:
- tighten page wrappers or selectors if the shell leaks into secondary pages
- add or adjust `data-testid` hooks only where needed for durable tests
- keep layout changes scoped to the affected pages

- [ ] **Step 4: Run full verification**

Run: `npm test -- --run`
Expected: PASS

Run: `npm run build`
Expected: PASS and emit production assets

- [ ] **Step 5: Commit**

```bash
git add src tests
git commit -m "test: cover secondary page regressions"
```

## Review Notes

The writing-plans skill normally calls for a dedicated plan review loop via subagent. That review is not being delegated in this session because no explicit subagent request was made. The fallback here is to keep the plan concrete, test-first, and directly reviewable by the user before execution.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-03-27-ai-buddy-secondary-pages.md`.

Two execution options:

1. Subagent-Driven (recommended) - I dispatch a fresh subagent per task, review between tasks, fast iteration
2. Inline Execution - Execute tasks in this session using executing-plans, batch execution with checkpoints