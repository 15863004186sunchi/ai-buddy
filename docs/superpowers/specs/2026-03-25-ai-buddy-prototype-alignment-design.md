# AI Buddy Prototype Alignment Design

**Project:** `ai-buddy`

**Date:** 2026-03-25

## Goal

Align the current Vue 3 front-end implementation more closely with the exported mobile prototype so the first-version experience matches the intended product structure and page semantics.

This iteration focuses on correcting page mapping, layout behavior, and visual fidelity for the primary mobile experience. It remains a front-end-only implementation with local mock data and no backend integration.

## Scope

### In Scope

- Re-map the current application pages to the correct prototype sources
- Rebuild the four primary bottom navigation tabs to match their intended prototype roles
- Fix mobile layout behavior so content scrolls in the middle area while the bottom navigation stays fixed
- Tighten the welcome, login, and register pages so they no longer have excessive vertical whitespace
- Restore major prototype visuals that are currently missing, including imagery, card hierarchy, and tab-specific content structure
- Keep the current Vue 3, Vite, and Vue Router stack
- Preserve UTF-8 Chinese copy and protect against encoding regressions
- Extend automated tests for the corrected page structure and navigation behavior

### Out of Scope

- Backend APIs
- Real AI chat integration
- Real authentication or third-party login
- Audio playback implementation beyond static first-version UI
- Full implementation of secondary prototype pages such as journal detail and healing player
- New product features not implied by the existing prototype

## Source Material

The prototype pages to align against in this iteration are:

- `welcome/code.html`
- `auth_qq/code.html`
- `register_form/code.html`
- `home/code.html`
- `ai/code.html`
- `_3/code.html`
- `_6/code.html`

Secondary reference pages that should inform future navigation seams, but are not part of this implementation scope:

- `_1/code.html` for journal empty state
- `_4/code.html` for journal detail
- `_5/code.html` for healing playback detail

## Corrected Page Mapping

The application should use the following prototype-to-page mapping:

- Welcome page -> `welcome/code.html`
- Login page -> `auth_qq/code.html`
- Register page -> `register_form/code.html`
- Home tab -> `home/code.html`
- Companion tab -> `ai/code.html`
- Journal tab -> `_3/code.html`
- Healing tab -> `_6/code.html`

This corrected mapping replaces the current mixed implementation where some tabs reuse the wrong layout archetype.

## Product Structure

### Independent Entry Pages

These routes remain outside the main tab shell:

- Welcome
- Onboarding step 1, 2, 3
- Login
- Register

These screens should behave as full-screen entry flows and should not render the bottom tab navigation.

### Main Application Area

The main application area contains four bottom-navigation tabs:

- Home
- Companion
- Journal
- Healing

All four tabs must share the same mobile shell behavior:

- a fixed outer viewport
- a scrollable middle content region
- a bottom navigation bar that remains fixed in place

## Page-Level Design

### Welcome

The welcome page should align to `welcome/code.html`.

Key requirements:

- reduce excessive empty space above and below the main content cluster
- preserve the visual focus on the brand, emotional headline, supporting copy, and primary CTA
- keep decorative visuals, gradients, and icon accents that establish the prototype's tone
- ensure the primary CTA reliably enters the onboarding flow

### Login

The login page should align to `auth_qq/code.html`.

Key requirements:

- present login as its own screen rather than a loosely spaced variant inside a generic auth page
- restore compact vertical spacing closer to the prototype
- preserve third-party entry buttons as visual-only actions
- keep the current mock validation and success routing behavior

### Register

The register page should align to `register_form/code.html`.

Key requirements:

- present register as its own dedicated page
- restore the denser form layout and third-party sign-up section from the prototype
- preserve local validation for username, email, password, and password confirmation
- provide a clear route back to login

### Home Tab

The home tab should align to `home/code.html`.

Key requirements:

- retain the greeting header and emotional tone
- include the mood selection cards
- include the daily reflection section
- include the recommendation cards with imagery
- keep the main content vertically scrollable
- keep the bottom navigation fixed

### Companion Tab

The companion tab should align to `ai/code.html`.

Key requirements:

- present a conversational AI chat layout rather than a card feed
- include a top bar, message area, and input composer area
- keep the message list scrollable
- keep the input composer visually pinned near the bottom of the page content
- keep the bottom navigation fixed below the main content shell
- use mock conversation content only; sending does not require backend behavior in this iteration

### Journal Tab

The journal tab should align to `_3/code.html`.

Key requirements:

- present a journal list page rather than home-style cards
- include page title, supporting atmosphere copy, and visible entry points for search and new writing
- render a scrollable list of journal entries
- preserve a clear seam for later navigation into `_1/code.html` and `_4/code.html`

### Healing Tab

The healing tab should align to `_6/code.html`.

Key requirements:

- present a content discovery page rather than a simplified placeholder
- include the large daily recommendation block
- include healing mood filters or chips
- include healing categories
- include a recent playback section
- keep the content scrollable and the bottom navigation fixed
- preserve a clear seam for later navigation into `_5/code.html`

## Routing Design

The application should separate entry routes from main application routes.

Recommended route structure:

- `/welcome`
- `/onboarding/:step`
- `/auth`
- `/register`
- `/app/:tab`

Where `:tab` is limited to:

- `home`
- `companion`
- `journal`
- `healing`

The root route may redirect to the appropriate screen based on current session rules, but the implementation plan should keep the page responsibilities above intact.

## Component and Layout Boundaries

### Shared Layout

`MobileViewport` should become the stable mobile shell for the main application area. Its responsibilities should be limited to:

- outer mobile viewport framing
- safe area and page background handling
- middle scroll region container
- fixed bottom navigation placement

### Main Tab Container

A main tab container should:

- interpret the current tab route
- render the correct tab content component
- attach the shared bottom navigation

### Tab Content Components

Each primary tab should own its own content structure:

- `HomeTab`
- `CompanionTab`
- `JournalTab`
- `HealingTab`

This keeps page semantics clear and avoids overloading a single page component with mismatched content patterns.

### Shared UI Components

Reusable components should only be extracted where repetition is clear, such as:

- bottom navigation
- chat bubble
- chat composer
- recommendation card
- mood chip
- journal list item
- healing category card

The implementation should avoid creating an oversized design system during this alignment pass.

## Data Strategy

This iteration should continue using local mock data, but the data should be separated by page domain:

- `src/data/home.ts`
- `src/data/companion.ts`
- `src/data/journal.ts`
- `src/data/healing.ts`

The purpose is to match the prototype's page roles more clearly and create clean seams for later API integration.

## Interaction Requirements

This iteration should deliver believable first-version interactions without backend dependencies.

Required behaviors:

- welcome CTA enters the onboarding flow
- onboarding continues to auth
- login and register routes can navigate between each other
- successful mock auth enters the main application area
- bottom navigation switches between the four primary tabs
- home, journal, and healing tabs scroll only in the middle content region
- companion tab scrolls messages while keeping its composer near the bottom
- tab switching must not create large blank areas beneath the bottom navigation
- buttons such as search, send, and play may remain mock interactions with simple feedback

## Styling Requirements

This iteration should favor prototype fidelity over invention.

Required styling direction:

- restore prototype imagery where available
- preserve card depth, rounded corners, overlays, and gradient atmosphere
- avoid simplified placeholder blocks where the prototype clearly shows richer content
- keep Chinese text readable and encoded correctly
- avoid excessive vertical whitespace on entry screens
- ensure no horizontal overflow on common mobile widths

## Testing and Acceptance

### Acceptance Criteria

The implementation is acceptable when all of the following are true:

- the welcome, login, and register screens no longer show obvious top-and-bottom whitespace imbalance
- each primary tab matches the correct prototype role
- the bottom navigation displays correct labels and icons without fallback characters
- bottom navigation remains fixed on mobile while content scrolls in the middle region
- companion is a chat page, not a recommendation page
- journal is a list page, not a home page variant
- healing is a discovery page with recommendations and categories
- switching tabs does not introduce large blank space below the navigation
- Chinese copy renders correctly in UTF-8

### Automated Verification

The implementation plan should include automated tests for:

- route transitions across the welcome and auth flow
- bottom navigation tab switching
- fixed-bottom-navigation layout behavior
- companion chat layout structure
- journal list layout structure
- encoding regression coverage for Chinese copy

Final verification should include:

- `npm test -- --run`
- `npm run build`

## Risks and Mitigations

### Risk: Prototype fidelity remains partial

The current app already diverged from the intended prototype in several places.

Mitigation:

- rebuild the four primary tabs from the corrected prototype mapping instead of continuing piecemeal patching

### Risk: Layout regressions while fixing tab structure

Changes to the shared mobile shell can easily break scroll behavior or fixed positioning.

Mitigation:

- treat the shell layout as a first-class acceptance criterion
- add tests specifically around tab switching and fixed navigation behavior

### Risk: Scope creep into secondary screens

Journal detail, empty state, and healing playback can pull the iteration beyond its intended boundary.

Mitigation:

- keep those pages as explicit future seams only
- focus this pass on the four primary tabs and entry pages

### Risk: Encoding regressions on Windows-based edits

Chinese content has already regressed once during file writes.

Mitigation:

- preserve UTF-8-safe editing practices
- keep encoding regression tests in place and extend them where needed