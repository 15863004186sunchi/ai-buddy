# AI Buddy Prototype Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-align the current Vue 3 mobile app to the exported prototype by rebuilding the welcome/auth flow and the four main tabs with correct page mapping, fixed bottom navigation, and prototype-faithful layouts.

**Architecture:** Keep the existing Vue 3 + Vue Router application, but change the main experience from a single mixed `HomePage` to a route-driven app shell at `/app/:tab`. Entry pages stay independent, while the shared mobile viewport owns fixed bottom navigation and each tab owns its own scrollable content and mock data.

**Tech Stack:** Vue 3, Vite, Vue Router, Vitest, Vue Test Utils, CSS variables, local mock data, localStorage

---

## File Structure

**Create**

- `docs/superpowers/plans/2026-03-25-ai-buddy-prototype-alignment.md`
- `src/pages/RegisterPage.vue`
- `src/pages/AppTabsPage.vue`
- `src/components/tabs/HomeTab.vue`
- `src/components/tabs/CompanionTab.vue`
- `src/components/tabs/JournalTab.vue`
- `src/components/tabs/HealingTab.vue`
- `src/data/companion.ts`
- `src/data/journal.ts`
- `src/data/healing.ts`
- `tests/app-tabs.spec.ts`

**Modify**

- `src/router/index.ts`
- `src/layouts/MobileViewport.vue`
- `src/components/navigation/BottomNav.vue`
- `src/pages/WelcomePage.vue`
- `src/pages/AuthPage.vue`
- `src/pages/HomePage.vue`
- `src/data/home.ts`
- `tests/router.spec.ts`
- `tests/auth.spec.ts`
- `tests/home.spec.ts`
- `tests/welcome-clickability.spec.ts`
- `tests/encoding.spec.ts`

**Reference**

- `welcome/code.html`
- `auth_qq/code.html`
- `register_form/code.html`
- `home/code.html`
- `ai/code.html`
- `_3/code.html`
- `_6/code.html`
- `_1/code.html`
- `_4/code.html`
- `_5/code.html`
- `docs/superpowers/specs/2026-03-25-ai-buddy-prototype-alignment-design.md`

## Task 1: Lock the New Route Contract

**Files:**
- Modify: `src/router/index.ts`
- Modify: `tests/router.spec.ts`
- Modify: `tests/auth.spec.ts`

- [ ] **Step 1: Write the failing route tests**

Add coverage for the corrected route contract:

```ts
it('redirects root to /welcome', async () => {
  const router = createAppRouter(createMemoryHistory())
  router.push('/')
  await router.isReady()
  expect(router.currentRoute.value.fullPath).toBe('/welcome')
})

it('redirects unauthenticated users from /app/home to /auth', async () => {
  const router = createAppRouter(createMemoryHistory())
  router.push('/app/home')
  await router.isReady()
  expect(router.currentRoute.value.fullPath).toBe('/auth')
})

it('navigates to /app/home after valid auth', async () => {
  // submit valid mock credentials
  expect(router.currentRoute.value.fullPath).toBe('/app/home')
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- --run tests/router.spec.ts tests/auth.spec.ts`
Expected: FAIL because `/welcome`, `/register`, and `/app/:tab` are not wired yet

- [ ] **Step 3: Implement the route changes**

Update `src/router/index.ts` so the app supports:

- `/` redirecting to `/welcome`
- `/welcome`
- `/onboarding/:step(1|2|3)`
- `/auth`
- `/register`
- `/app/:tab(home|companion|journal|healing)`

Also update auth success routing from `/home` to `/app/home`.

- [ ] **Step 4: Re-run the route tests**

Run: `npm test -- --run tests/router.spec.ts tests/auth.spec.ts`
Expected: PASS for route structure and auth destination

- [ ] **Step 5: Commit**

```bash
git add src/router/index.ts tests/router.spec.ts tests/auth.spec.ts
git commit -m "refactor: align routes with prototype app structure"
```

## Task 2: Rebuild the Shared Mobile Shell and Bottom Navigation

**Files:**
- Create: `src/pages/AppTabsPage.vue`
- Modify: `src/layouts/MobileViewport.vue`
- Modify: `src/components/navigation/BottomNav.vue`
- Modify: `tests/home.spec.ts`
- Create: `tests/app-tabs.spec.ts`

- [ ] **Step 1: Write the failing shell tests**

Add tests that prove:

```ts
it('renders bottom nav outside the scroll area', async () => {
  expect(wrapper.get('[data-testid="bottom-nav"]').exists()).toBe(true)
  expect(wrapper.get('[data-testid="app-scroll"]').find('[data-testid="bottom-nav"]').exists()).toBe(false)
})

it('switches tabs by routing instead of local ref state', async () => {
  await wrapper.get('[data-testid="nav-journal"]').trigger('click')
  expect(router.currentRoute.value.fullPath).toBe('/app/journal')
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- --run tests/home.spec.ts tests/app-tabs.spec.ts`
Expected: FAIL because the current home page still owns tab switching internally

- [ ] **Step 3: Implement the shared shell**

- Create `src/pages/AppTabsPage.vue` as the route-level tab container
- Move fixed-bottom-nav responsibility into `MobileViewport`
- Update `BottomNav.vue` to accept route-style tab ids: `home`, `companion`, `journal`, `healing`
- Make bottom-nav clicks call `router.push('/app/<tab>')`
- Keep the scroll container in the middle region with `data-testid="app-scroll"`

- [ ] **Step 4: Re-run the shell tests**

Run: `npm test -- --run tests/home.spec.ts tests/app-tabs.spec.ts`
Expected: PASS for fixed-nav layout and route-driven tab switching

- [ ] **Step 5: Commit**

```bash
git add src/pages/AppTabsPage.vue src/layouts/MobileViewport.vue src/components/navigation/BottomNav.vue tests/home.spec.ts tests/app-tabs.spec.ts
git commit -m "refactor: move main tabs into shared app shell"
```

## Task 3: Restore Welcome, Login, and Register Entry Pages

**Files:**
- Modify: `src/pages/WelcomePage.vue`
- Modify: `src/pages/AuthPage.vue`
- Create: `src/pages/RegisterPage.vue`
- Modify: `tests/router.spec.ts`
- Modify: `tests/auth.spec.ts`
- Modify: `tests/welcome-clickability.spec.ts`
- Modify: `tests/encoding.spec.ts`

- [ ] **Step 1: Write the failing entry-page tests**

Add assertions for:

```ts
it('renders the welcome headline cluster without relying on oversized spacer blocks', () => {
  expect(source).not.toContain('justify-content: space-between')
})

it('renders login and register as separate routes', async () => {
  router.push('/register')
  await router.isReady()
  expect(wrapper.text()).toContain('\u7acb\u5373\u6ce8\u518c')
})

it('navigates from login to register', async () => {
  await wrapper.get('[data-testid="go-register"]').trigger('click')
  expect(router.currentRoute.value.fullPath).toBe('/register')
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- --run tests/router.spec.ts tests/auth.spec.ts tests/welcome-clickability.spec.ts tests/encoding.spec.ts`
Expected: FAIL because register is still embedded in auth and the welcome/auth layouts are still too loose

- [ ] **Step 3: Implement the entry-page rebuild**

- Tighten vertical spacing in `WelcomePage.vue` to match `welcome/code.html`
- Keep the CTA fully clickable and routing to onboarding
- Simplify `AuthPage.vue` into a dedicated login page aligned to `auth_qq/code.html`
- Create `RegisterPage.vue` aligned to `register_form/code.html`
- Keep validation behavior, mock session creation, and third-party buttons as non-blocking UI
- Update auth/register links to route between `/auth` and `/register`

- [ ] **Step 4: Re-run the entry-page tests**

Run: `npm test -- --run tests/router.spec.ts tests/auth.spec.ts tests/welcome-clickability.spec.ts tests/encoding.spec.ts`
Expected: PASS for route separation, clickability, and UTF-8-safe copy

- [ ] **Step 5: Commit**

```bash
git add src/pages/WelcomePage.vue src/pages/AuthPage.vue src/pages/RegisterPage.vue tests/router.spec.ts tests/auth.spec.ts tests/welcome-clickability.spec.ts tests/encoding.spec.ts
git commit -m "feat: restore welcome and auth entry pages"
```

## Task 4: Rebuild Home and Companion from the Correct Prototypes

**Files:**
- Create: `src/components/tabs/HomeTab.vue`
- Create: `src/components/tabs/CompanionTab.vue`
- Modify: `src/pages/AppTabsPage.vue`
- Modify: `src/data/home.ts`
- Create: `src/data/companion.ts`
- Modify: `tests/home.spec.ts`
- Modify: `tests/app-tabs.spec.ts`

- [ ] **Step 1: Write the failing tab tests**

Add assertions such as:

```ts
it('renders prototype-like home sections', async () => {
  expect(wrapper.text()).toContain('\u6bcf\u65e5\u56de\u54cd')
  expect(wrapper.text()).toContain('\u4e3a\u4f60\u63a8\u8350')
  expect(wrapper.findAll('img').length).toBeGreaterThanOrEqual(3)
})

it('renders companion as a chat screen', async () => {
  router.push('/app/companion')
  await router.isReady()
  expect(wrapper.get('[data-testid="chat-thread"]').exists()).toBe(true)
  expect(wrapper.get('[data-testid="chat-composer"]').exists()).toBe(true)
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- --run tests/home.spec.ts tests/app-tabs.spec.ts`
Expected: FAIL because companion is still a card view and the tab content is not route-owned yet

- [ ] **Step 3: Implement the home and companion tabs**

- Move the correct home content into `src/components/tabs/HomeTab.vue`
- Create `src/data/companion.ts` with mock messages and composer placeholder copy from `ai/code.html`
- Create `src/components/tabs/CompanionTab.vue` with header, scrollable thread, and pinned composer block
- Render these components from `AppTabsPage.vue` based on route param

- [ ] **Step 4: Re-run the tab tests**

Run: `npm test -- --run tests/home.spec.ts tests/app-tabs.spec.ts`
Expected: PASS for home fidelity and companion chat structure

- [ ] **Step 5: Commit**

```bash
git add src/components/tabs/HomeTab.vue src/components/tabs/CompanionTab.vue src/pages/AppTabsPage.vue src/data/home.ts src/data/companion.ts tests/home.spec.ts tests/app-tabs.spec.ts
git commit -m "feat: align home and companion tabs with prototype"
```

## Task 5: Rebuild Journal and Healing Tabs from the Correct Prototypes

**Files:**
- Create: `src/components/tabs/JournalTab.vue`
- Create: `src/components/tabs/HealingTab.vue`
- Create: `src/data/journal.ts`
- Create: `src/data/healing.ts`
- Modify: `src/pages/AppTabsPage.vue`
- Modify: `tests/home.spec.ts`
- Modify: `tests/app-tabs.spec.ts`

- [ ] **Step 1: Write the failing journal/healing tests**

Add assertions such as:

```ts
it('renders journal as a list page', async () => {
  router.push('/app/journal')
  await router.isReady()
  expect(wrapper.get('[data-testid="journal-list"]').exists()).toBe(true)
  expect(wrapper.text()).toContain('\u5fc3\u60c5\u65e5\u8bb0')
})

it('renders healing as a discovery page', async () => {
  router.push('/app/healing')
  await router.isReady()
  expect(wrapper.text()).toContain('\u7597\u6108\u7a7a\u95f4')
  expect(wrapper.get('[data-testid="healing-categories"]').exists()).toBe(true)
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- --run tests/home.spec.ts tests/app-tabs.spec.ts`
Expected: FAIL because journal and healing are still simplified card sections

- [ ] **Step 3: Implement the journal and healing tabs**

- Create `src/data/journal.ts` from `_3/code.html` with list entries and intro copy
- Create `src/components/tabs/JournalTab.vue` with title, helper text, search/new-entry affordances, and scrollable list
- Create `src/data/healing.ts` from `_6/code.html` with daily highlight, mood chips, categories, and recent playback
- Create `src/components/tabs/HealingTab.vue` with discovery layout and stable bottom spacing
- Wire both tabs through `AppTabsPage.vue`

- [ ] **Step 4: Re-run the journal/healing tests**

Run: `npm test -- --run tests/home.spec.ts tests/app-tabs.spec.ts`
Expected: PASS for journal-list and healing-discovery structure

- [ ] **Step 5: Commit**

```bash
git add src/components/tabs/JournalTab.vue src/components/tabs/HealingTab.vue src/data/journal.ts src/data/healing.ts src/pages/AppTabsPage.vue tests/home.spec.ts tests/app-tabs.spec.ts
git commit -m "feat: align journal and healing tabs with prototype"
```

## Task 6: Clean Up Legacy Wiring, Verify Encoding, and Run Full Validation

**Files:**
- Modify: `src/pages/HomePage.vue`
- Modify: `tests/encoding.spec.ts`
- Modify: `tests/home.spec.ts`
- Modify: `tests/app-tabs.spec.ts`

- [ ] **Step 1: Write the final failing regression checks**

Add checks that guard against the bugs already seen:

```ts
it('does not render question-mark nav labels', async () => {
  expect(wrapper.get('[data-testid="bottom-nav"]').text()).not.toContain('?')
})

it('preserves utf8 chinese copy in primary pages', () => {
  expect(readFileSync('src/components/tabs/JournalTab.vue', 'utf8')).toContain('\u5fc3\u60c5\u65e5\u8bb0')
})
```

- [ ] **Step 2: Run the focused regression tests**

Run: `npm test -- --run tests/home.spec.ts tests/app-tabs.spec.ts tests/encoding.spec.ts`
Expected: FAIL until legacy wiring and encoding coverage are updated

- [ ] **Step 3: Finish cleanup and verification wiring**

- Retire `src/pages/HomePage.vue` from active routing, or reduce it to a compatibility wrapper only if still needed
- Remove any leftover local-tab state that conflicts with route-driven tabs
- Expand `tests/encoding.spec.ts` to cover newly created tab files and register page
- Ensure all new Chinese copy is saved as UTF-8 without BOM

- [ ] **Step 4: Run the full suite and production build**

Run: `npm test -- --run`
Expected: PASS

Run: `npm run build`
Expected: PASS and emit production assets

- [ ] **Step 5: Commit**

```bash
git add src/pages/HomePage.vue tests/encoding.spec.ts tests/home.spec.ts tests/app-tabs.spec.ts
git commit -m "test: finalize prototype alignment regressions"
```

## Final Verification Checklist

- [ ] `npm test -- --run`
- [ ] `npm run build`
- [ ] Manual smoke test: `/welcome -> /onboarding/1 -> /auth -> /register -> /auth -> /app/home`
- [ ] Manual smoke test: switch all four bottom tabs on a narrow mobile viewport
- [ ] Manual smoke test: confirm bottom nav stays fixed while the middle area scrolls
- [ ] Manual smoke test: confirm no major blank area appears below the nav after tab switching

## Review Notes

The `writing-plans` skill calls for a separate plan review loop via subagent. I am not dispatching a reviewer here because no explicit subagent delegation was requested in this session. The fallback is a fully written plan with exact file paths, concrete tests, and execution checkpoints visible in this document.