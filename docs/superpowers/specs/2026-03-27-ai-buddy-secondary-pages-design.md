# AI Buddy Secondary Pages Design

**Project:** `ai-buddy`

**Date:** 2026-03-27

## Goal

Extend the current Vue 3 prototype implementation with the next layer of user-facing pages so the journal and healing areas feel connected rather than stopping at top-level tab views.

This iteration focuses on restoring three secondary prototype experiences:

- journal empty state from `_1/code.html`
- journal detail from `_4/code.html`
- healing playback detail from `_5/code.html`

The result should preserve the existing first-version mobile shell while making the most important secondary navigation paths feel complete.

## Scope

### In Scope

- Add the journal empty-state presentation to the journal tab
- Add a dedicated journal detail page
- Add a dedicated healing player page
- Connect existing journal and healing entry points to those new pages
- Preserve the current bottom-tab shell for top-level application routes
- Keep all content local and mock-driven
- Add automated coverage for the new routes and key interactions
- Preserve UTF-8-safe content and existing mobile layout behavior

### Out of Scope

- Real journal creation or editing flow
- Real journal deletion persistence
- Real AI chat continuation logic
- Real audio playback, streaming, or media session integration
- Backend APIs
- New authentication behavior
- Redesign of the existing welcome, onboarding, auth, or primary tab information architecture

## Source Material

This iteration should align against the following prototype exports:

- `_1/code.html` for the journal empty state
- `_4/code.html` for the journal detail view
- `_5/code.html` for the healing playback detail view

Existing first-level pages remain anchored to the mapping already established in the prototype-alignment iteration.

## Product Structure

### Top-Level Application Shell

The current main application shell remains unchanged at the top level:

- `/app/home`
- `/app/companion`
- `/app/journal`
- `/app/healing`

These routes continue to use the shared mobile viewport with:

- a fixed outer mobile frame
- a middle scroll region
- a fixed bottom navigation bar

### Secondary Pages

This iteration adds two focused secondary pages outside the tab shell:

- `/journal/:id`
- `/healing/:id`

These pages should behave as immersive detail views rather than tab-shell screens. They may omit the bottom navigation and instead use a focused top bar with back navigation, matching the prototype's more concentrated presentation.

## Page-Level Design

### Journal Tab

The journal tab keeps its role as the main journal entry point, but its default state changes.

For this iteration, the journal tab should default to the empty-state version inspired by `_1/code.html`. That means:

- the journal title remains visible
- the central illustration and emotional empty-state message become the primary content
- the primary journal CTA is visible and interactive
- no separate route is required for the empty state

The empty state should be implemented as a tab state, not as a standalone page. This keeps the journal tab aligned with the user's chosen behavior and avoids unnecessary route sprawl.

The implementation should still preserve a clean seam for switching back to a list state later through local mock configuration.

### Journal Detail Page

The journal detail page should align to `_4/code.html`.

Key requirements:

- large hero image near the top
- visible date and entry type badge
- large title
- long-form journal body copy
- tags displayed as chips
- AI reflection card styled as a distinct response surface
- companion continuation CTA that routes to the companion tab
- bottom action group for favorite, edit, and delete

This page should feel reflective and immersive rather than card-like. The visual hierarchy should emphasize reading and contemplation.

### Healing Tab

The healing tab remains the discovery surface introduced in the previous iteration, but its cards and recommendation areas should now serve as genuine entry points into a focused playback experience.

The tab should continue to preserve:

- recommendation hero
- mood chips
- category cards
- recent playback items

The main change in this iteration is navigability rather than structural redesign.

### Healing Player Page

The healing player page should align to `_5/code.html`.

Key requirements:

- atmospheric hero or immersive background treatment
- prominent circular or album-art style cover image
- track title
- track type badge
- progress bar with current time and total duration
- playback controls for previous, play or pause, and next
- optional secondary control affordances such as shuffle or repeat

This page should feel quieter and more focused than the discovery tab, with visual weight centered on playback and emotional atmosphere.

## Routing Design

The recommended route structure for this iteration is:

- `/app/:tab(home|companion|journal|healing)`
- `/journal/:id`
- `/healing/:id`

This keeps top-level navigation and secondary detail navigation clearly separated.

### Navigation Behavior

Required transitions:

- journal tab empty state remains at `/app/journal`
- journal list items, when present, navigate to `/journal/:id`
- journal detail companion continuation CTA navigates to `/app/companion`
- healing hero, category recommendations, or recent tracks can navigate to `/healing/:id`
- secondary detail pages provide top-level back behavior to the previous main context

This approach is preferred over forcing detail states into `/app/:tab`, because it preserves clean browser history, direct linking, and simpler component responsibilities.

## Component and Layout Boundaries

### Keep the Existing Tab Shell Stable

`AppTabsPage.vue` should remain the stable owner of first-level tab rendering and bottom navigation. This iteration should avoid turning it into a complex nested router shell unless that becomes strictly necessary.

### Journal Responsibilities

`JournalTab.vue` should own first-level journal-state rendering:

- empty-state rendering for the current iteration default
- list-state rendering as a preserved later seam

If the file becomes visually dense, it is acceptable to extract:

- `JournalEmptyState.vue`
- `JournalListItem.vue`

### Healing Responsibilities

`HealingTab.vue` should stay responsible for discovery content only.

If playback UI complexity warrants it, it is acceptable to extract:

- `PlayerControls.vue`
- `HealingTrackCard.vue`

### Secondary Page Components

Add dedicated page components for:

- `JournalDetailPage.vue`
- `HealingPlayerPage.vue`

These components should remain page-scoped rather than being generalized prematurely into a large design system.

## Data Strategy

This iteration should continue using local mock data modules.

### Journal Data

The journal data module should be clarified so it can represent both first-level state and detail content, such as:

- journal empty-state copy and illustration metadata
- journal list entries
- journal detail content by id
- a local toggle or config seam for empty-state vs list-state rendering

The current iteration should default to the empty-state mode.

### Healing Data

The healing data module should provide:

- discovery hero content
- category cards
- recent tracks
- detail content by id for the focused player page

The goal is to keep view logic simple and to create clean seams for future API-backed content.

## Interaction Requirements

This iteration should deliver meaningful navigation and lightweight local interactions without pretending to support backend behavior that does not exist yet.

Required behaviors:

- `/app/journal` shows the empty state by default
- the primary journal CTA is clickable and may show lightweight feedback, but does not need to enter a full editor flow
- journal detail companion continuation CTA routes to `/app/companion`
- favorite on journal detail toggles visual state locally
- edit and delete can remain first-version placeholder interactions with clear feedback
- healing discovery items route to the correct player page
- player play or pause control toggles local visual state
- progress display may remain static or lightly simulated
- existing bottom navigation continues to switch correctly between top-level tabs
- top-level tabs continue to keep the bottom navigation fixed while content scrolls in the middle area

## Styling Requirements

This iteration should continue to favor prototype fidelity over simplification.

Required styling direction:

- preserve the soft emotional visual language already established in the app
- restore imagery from the prototype-driven content where possible
- keep visual hierarchy close to the exported designs
- make secondary pages feel focused and immersive
- avoid large blank areas above or below content
- keep Chinese copy readable and prevent encoding regressions
- maintain mobile-safe scrolling and no horizontal overflow on common phone widths

## Testing and Acceptance

### Automated Coverage

The implementation plan should include tests for:

- journal tab default empty-state rendering
- journal detail route rendering by id
- healing player route rendering by id
- route transitions from the journal or healing entry points
- journal detail companion continuation CTA navigation to the companion tab
- local toggling behavior for favorite and play or pause UI state
- continued tab switching behavior in the main shell
- continued UTF-8 safety for Chinese copy where relevant

### Acceptance Criteria

This iteration is acceptable when all of the following are true:

- the journal tab shows the empty-state experience by default
- the journal detail page is reachable and visually matches the intended prototype structure
- the healing player page is reachable and visually matches the intended prototype structure
- journal and healing top-level views now have real secondary navigation seams
- the companion continuation CTA leads into the companion tab
- the main tab shell still uses fixed bottom navigation with middle-region scrolling
- secondary pages feel focused rather than squeezed into the tab shell
- existing tests still pass after the additions
- `npm test -- --run` passes
- `npm run build` passes

## Risks and Mitigations

### Risk: Empty-state-only default hides journal detail work

If the journal tab defaults only to empty state, the new detail page could feel disconnected during manual review.

Mitigation:

- keep detail routes directly addressable
- keep mock data available for tests and later list-mode reactivation

### Risk: Secondary pages accidentally inherit tab-shell layout constraints

Forcing detail pages into the same fixed-bottom structure can produce awkward spacing and focus problems.

Mitigation:

- keep detail pages outside `/app/:tab`
- use dedicated page-level layout tuned to immersive reading or playback

### Risk: Placeholder interactions feel broken

Buttons that look active but do nothing can reduce confidence.

Mitigation:

- keep first-version buttons interactive with clear local feedback
- avoid implying full editor or playback support where it is not implemented

### Risk: Encoding regressions while updating Chinese content

Chinese text corruption has already appeared during prior edits.

Mitigation:

- preserve UTF-8-safe editing practices
- extend or retain encoding regression checks as part of verification