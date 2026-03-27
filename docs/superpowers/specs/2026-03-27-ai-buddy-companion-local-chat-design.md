# AI Buddy Companion Local Chat Design

**Project:** `ai-buddy`

**Date:** 2026-03-27

## Goal

Make the companion tab feel interactive before backend and real AI integration exist.

This iteration should turn the current static chat screen into a lightweight local conversation flow:

- the input area becomes editable
- clicking send appends a user message
- a local mock assistant reply is generated immediately after
- empty input cannot be sent
- secondary buttons remain non-backend placeholders, but provide clear feedback

The result should preserve the current visual layout and emotional tone while making the companion experience feel alive.

## Scope

### In Scope

- local editable composer state in the companion tab
- send interaction for user-authored messages
- local mock assistant reply generation
- lightweight placeholder feedback for `+`, `语音`, and `设置`
- automated tests for the new local conversation behavior

### Out of Scope

- real AI integration
- backend storage or conversation persistence across refresh
- conversation history management across sessions
- file upload, voice input, or settings panels with full behavior
- multi-thread chat switching

## Current State

The current companion tab already has:

- a prototype-aligned message list
- a composer layout
- top-level tab routing and fixed mobile shell behavior

But it still behaves as a static presentation:

- the composer is not editable
- send does not append messages
- no local assistant reply is created
- the secondary action buttons do not produce meaningful interaction feedback

## Proposed Behavior

### Composer

Replace the current placeholder-only center area with a controlled text input or textarea that matches the existing visual style.

Requirements:

- preserve the current rounded composer container
- keep `+`, input area, `语音`, and `发送` in the same visual order
- allow multiline-safe local state if practical, but a single-line input is acceptable for this iteration
- trim whitespace before sending

### Sending Messages

When the user clicks `发送`:

1. validate that the input is not empty after trimming
2. append a new local user message to the displayed conversation
3. clear the input
4. append a mock assistant reply immediately after

If the input is empty:

- do not append a message
- provide lightweight feedback near the composer

### Mock Assistant Replies

The assistant reply does not need to simulate real intelligence, but it should feel emotionally supportive and consistent with the product tone.

The local reply generator should:

- return one of several prewritten reassuring responses
- optionally react to simple mood-related keywords if that is easy to implement
- avoid pretending the system is calling a real model

The main requirement is that sending a message visibly advances the conversation.

### Secondary Buttons

For this phase:

- `+` shows a local placeholder message such as “附件能力将在后端接入后开放”
- `语音` shows a local placeholder message such as “语音输入将在后端接入后开放”
- `设置` shows a local placeholder message such as “对话设置将在下一阶段开放”

These buttons should feel intentionally deferred rather than broken.

## Component Boundaries

### Companion Tab

`src/components/tabs/CompanionTab.vue` remains the primary owner of:

- rendering the message list
- managing local composer state
- managing local placeholder feedback
- appending user and assistant messages

If the file becomes dense, it is acceptable to extract only small helpers later, but no extra abstraction is required for this iteration.

### Companion Data

`src/data/companion.ts` should continue to provide the seeded conversation and labels.

It may be expanded to include:

- initial mock messages
- an array of assistant reply templates
- placeholder button copy

The goal is to keep the view logic simple and avoid hardcoding too much text inside the component.

## Data and State Design

The local companion state should include:

- `draftMessage`
- `messages`
- `feedbackMessage`

Suggested message shape:

- `id`
- `role`
- `author`
- `text`
- optional `steps`
- optional `closing`

The simplest acceptable implementation is:

- initialize local `messages` from the existing static companion message data
- append user and assistant messages in component-local reactive state

No persistence beyond the current page session is required.

## UX Notes

- keep the current visual structure and spacing intact
- preserve the emotional, supportive writing tone
- avoid large layout shifts when messages are appended
- keep the composer anchored near the bottom of the scroll region
- ensure the thread can continue growing without breaking the mobile layout

## Testing Requirements

Add or update tests to cover:

- the composer accepts input
- clicking send appends a user message
- clicking send appends a mock assistant reply
- empty input does not send
- `+`, `语音`, and `设置` provide placeholder feedback

The existing chat layout checks should remain green.

## Acceptance Criteria

This phase is complete when:

- the companion tab is no longer purely static
- users can type and send a message locally
- a mock assistant reply appears after sending
- empty sends are blocked
- secondary buttons provide intentional placeholder feedback
- `npm test -- --run` passes
- `npm run build` passes

## Future Handoff

This design intentionally prepares the companion tab for later backend integration.

When the backend project is ready, the main replacement seam should be:

- swap local mock reply generation for an async API call
- optionally persist conversation history remotely

The component structure from this phase should remain reusable for that transition.
