# Companion Chat State Persistence Design

## Goal
Keep sent companion chat messages when the user switches between app tabs, while intentionally resetting any unsent draft text and transient feedback copy when the companion tab remounts.

## Constraints
- No real backend.
- Preserve the existing `chat-*` test hooks.
- Keep the change localized to the companion feature.
- Do not persist state across full page reloads.

## Approach
- Move the sent-message thread into a small companion-specific composable with a module-level singleton store.
- Seed that store from a factory function built from the existing companion data so callers never mutate the exported initial message array directly.
- Keep `draftMessage` and `feedbackMessage` local to `CompanionTab.vue` so they reset naturally when the component is unmounted and mounted again.

## Data Flow
1. `CompanionTab.vue` reads `messages` and `sendLocalMessage()` from `useCompanionChat()`.
2. On send, the component trims and validates the draft locally.
3. The composable appends the user message and a mock assistant reply to the shared thread store.
4. The component clears its local draft and feedback state.
5. When routing away and back, the shared thread remains, but the component-local draft and feedback are recreated empty.

## Testing
- Add a route-switch regression test that sends a message, navigates away, and returns.
- Assert that:
  - the sent user and assistant messages are still present
  - the input is empty after remount
  - the feedback region is empty after remount
