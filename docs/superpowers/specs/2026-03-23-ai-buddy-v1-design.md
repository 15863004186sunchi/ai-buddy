# AI Buddy V1 Design

**Project:** `ai-buddy`

**Date:** 2026-03-23

## Goal

Build a Vue 3 front-end application that converts the existing mobile UI prototype into a runnable first-version experience for a single primary user journey:

`Welcome -> Onboarding -> Auth -> Home`

This version is a front-end-only prototype. It must feel like a real product flow, but it does not call live APIs or integrate real third-party auth.

## Scope

### In Scope

- Create a runnable Vue 3 project from the prototype assets in the current workspace
- Implement a mobile-first experience with desktop preview support
- Build the first complete user journey:
  - Welcome page
  - Three-step onboarding flow
  - Authentication page with login/register switching
  - Home page after successful mock authentication
- Add local form validation for register/login
- Add route navigation between pages
- Add local mock user state with `localStorage` persistence
- Preserve the prototype's visual language:
  - soft gradients
  - warm glassmorphism surfaces
  - rounded cards and controls
  - editorial typography hierarchy

### Out of Scope

- Real backend APIs
- Real QQ or other third-party OAuth flows
- Complex state management libraries unless needed later
- Full conversion of every prototype directory in the repository
- Production-grade accessibility audit beyond sound semantic structure and usable interactions

## Source Material

The current workspace contains exported prototype pages. The pages selected for V1 are:

- `welcome/code.html`
- `onboarding_1/code.html`
- `onboarding_2/code.html`
- `onboarding_3/code.html`
- `register_form/code.html`
- `auth_qq/code.html`
- `home/code.html`

The visual system guidance is also available in:

- `serene_pulse/DESIGN.md`

## Product Flow

### 1. Welcome

Purpose:
- establish brand tone
- present a clear primary CTA

Behavior:
- primary CTA routes to onboarding step 1

### 2. Onboarding

Purpose:
- introduce the app's emotional positioning and key value propositions

Behavior:
- three sequential steps
- next button advances steps
- skip action routes directly to auth
- progress indicators reflect current step

### 3. Auth

Purpose:
- provide a believable entry point into the product

Behavior:
- segmented toggle between login and register states
- register mode validates nickname, email, password, confirm password
- login mode validates email and password
- third-party buttons are visual only and show non-blocking mock feedback
- successful submit writes a mock user object to local state and `localStorage`, then routes to home

### 4. Home

Purpose:
- reward completion of onboarding/auth flow with a polished destination screen

Behavior:
- display greeting using mock user information when available
- display mood cards, daily reflection module, recommendations, and bottom navigation
- logout clears mock session and routes to welcome

## Architecture

The application will be implemented as a standard Vue 3 single-page app with Vite and Vue Router. The codebase should be lightweight and intentionally simple for V1: route-driven pages, reusable UI primitives, centralized theme tokens, and a small composable-based session store instead of a heavier state library.

The prototype HTML files are reference material, not source code to paste directly. We will reimplement the UI as Vue single-file components so the app is maintainable, testable, and ready for later backend integration.

## Technical Design

### Stack

- Vue 3
- Vite
- Vue Router
- Vitest
- Vue Test Utils
- CSS with design tokens and component/page styles

### State

Use a small composable for session state:

- `user`
- `isAuthenticated`
- `login`
- `register`
- `logout`
- hydration from `localStorage`

This keeps V1 simple while still creating a clean seam for later migration to Pinia or API-backed auth.

### Routing

Planned routes:

- `/` -> welcome
- `/onboarding/:step(1|2|3)` -> onboarding
- `/auth` -> auth
- `/home` -> home

Route guards:

- unauthenticated users can access welcome, onboarding, auth
- `/home` redirects to `/auth` if no mock session exists

### Components

Planned reusable components:

- mobile app shell
- gradient CTA button
- glass card
- onboarding progress dots
- segmented auth tabs
- text input field
- bottom navigation
- toast/banner for mock third-party auth feedback

### Styling

The app should preserve the prototype's feeling while being more engineering-friendly:

- convert repeated prototype colors into CSS variables
- define typography tokens for headline/body/label
- define shared radius, shadow, blur, and gradient utilities
- use a centered mobile viewport on larger screens
- reauthor broken/garbled prototype copy into readable Chinese text

## Testing Strategy

V1 should cover the key behavior rather than every visual detail.

Primary automated tests:

- route navigation into onboarding/auth/home
- auth form mode switching
- validation behavior for register and login submission
- session persistence logic
- home redirect behavior when unauthenticated

Visual verification:

- local build
- local preview
- browser smoke-check of the full user flow

## Risks and Mitigations

### Risk: Prototype export quality issues

Some prototype HTML contains garbled Chinese text and CDN-only styling assumptions.

Mitigation:
- treat prototype export as visual reference only
- rewrite readable copy
- reimplement styles locally in project code

### Risk: Overbuilding V1

It is tempting to convert every screen and create a full design system immediately.

Mitigation:
- keep V1 limited to one primary path
- only extract components used by this flow

### Risk: Authentication complexity creep

Real auth and social login can expand scope quickly.

Mitigation:
- explicit front-end-only mock behavior in V1
- leave clean extension points for future API integration

## Deliverables

- a runnable Vue 3 project in the current workspace
- a complete first-version main flow
- local tests for key interactions
- git-initialized project history
- remote configured to `git@github.com:15863004186sunchi/ai-buddy.git`

## Notes

The brainstorming skill normally calls for an external spec review loop via subagent. That review step is not being delegated here because no explicit subagent delegation was requested in this session. The fallback is a direct written spec plus user review before implementation planning and execution.
