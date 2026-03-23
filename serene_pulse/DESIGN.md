# Design System Strategy: The Radiant Sanctuary

## 1. Overview & Creative North Star: "The Ethereal Embrace"
This design system moves beyond "Soft Minimalism" into a territory we define as **The Ethereal Embrace**. In a category often dominated by cold, robotic interactions, this system creates a digital sanctuary that feels alive, breathing, and deeply human. 

We reject the "template" look of rigid grids and harsh dividers. Instead, we utilize **Intentional Asymmetry**—where elements float like organic clouds—and **Tonal Depth** to guide the user’s eye. The goal is to reduce cognitive load not just through whitespace, but through a sensory experience that feels like fine stationery or frosted glass under soft morning light. Every interaction must feel like a sigh of relief.

---

## 2. Colors & The "No-Line" Philosophy
Our palette is a sophisticated triptych of Lavender (`primary`), Peach (`secondary`), and Mint (`tertiary`). To maintain a premium, editorial feel, we adhere to these strict execution rules:

*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Structural boundaries must be defined solely through background shifts. For example, a `surface-container-low` (#f4f4f0) section sitting on a `surface` (#faf9f6) background provides a soft, intuitive boundary that feels organic, not engineered.
*   **Surface Hierarchy & Nesting:** Treat the UI as physical layers of "Vellum." Use the `surface-container` tiers to create depth. A `surface-container-lowest` (#ffffff) card should be nested within a `surface-container` (#eeeeea) area to create a natural, "lifted" focal point without the clunkiness of traditional shadows.
*   **The Glass & Gradient Rule:** To move beyond flat UI, use "Glassmorphism" for floating navigation elements or modal overlays. Apply a `surface-variant` with 60% opacity and a 20px backdrop-blur. 
*   **Signature Textures:** Use subtle linear gradients for CTAs and Hero states. 
    *   *Example:* A transition from `primary` (#6150b0) to `primary-container` (#a190f5) at a 135-degree angle. This adds "soul" and a sense of movement to the interface.

---

## 3. Typography: Editorial Warmth
We pair **Plus Jakarta Sans** (Headlines) with **Be Vietnam Pro** (Body) to strike a balance between friendly approachability and sophisticated clarity.

*   **Display & Headlines (Plus Jakarta Sans):** These are our "Emotional Anchors." Use `display-lg` (3.5rem) for moments of reflection and `headline-md` (1.75rem) for conversational headers. The rounded terminals of Jakarta Sans evoke safety and empathy.
*   **Title & Body (Be Vietnam Pro):** Used for the "Soul" of the app—the AI's responses. `title-lg` (1.375rem) provides a comfortable reading rhythm, while `body-md` (0.875rem) handles secondary information with high legibility.
*   **Hierarchy Note:** Use high-contrast scale shifts (e.g., a `display-sm` headline immediately followed by a `body-sm` label) to create an editorial, magazine-like feel that breaks the monotony of standard mobile app layouts.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "heavy" for an emotional companionship app. We achieve lift through light and tone.

*   **The Layering Principle:** Stack your surfaces. 
    *   Base: `surface` (#faf9f6)
    *   Content Area: `surface-container-low` (#f4f4f0)
    *   Active Card: `surface-container-lowest` (#ffffff)
*   **Ambient Shadows:** If a floating element (like a FAB) requires a shadow, it must be "Ambient." Use the `on-surface` color (#303330) at 5% opacity with a 32px blur and 8px Y-offset. It should feel like a soft glow, not a dark cast.
*   **The "Ghost Border" Fallback:** If accessibility requires a border, use `outline-variant` (#b0b3ae) at **15% opacity**. A 100% opaque border is a failure of the system’s soft aesthetic.

---

## 5. Components: Soft Primitives

### Buttons & Interaction
*   **Primary Button:** Uses the Signature Gradient (`primary` to `primary-container`). Shape is `full` (9999px) for a "pill" feel. Padding: `3` (1rem) vertical, `6` (2rem) horizontal.
*   **Tertiary Button:** No container. Use `primary` text with an icon. Interaction state uses a `surface-container-high` subtle background shift.

### Input & Form Fields
*   **Text Inputs:** Use `surface-container-highest` backgrounds with `xl` (3rem) corner radius. Forgo the bottom line; use a soft inner tint instead. 
*   **States:** Error states must use `error_container` (#f97386) for the background with `on_error_container` (#6e0523) for text. Avoid bright "Stoplight" reds; keep it tonal and calm.

### Cards & Messaging Bubbles
*   **The Chat Bubble:** Forbid dividers. Separate messages using `spacing-2` (0.7rem). User messages use `secondary-container` (#ffdbcc), while SoulEcho responses use `primary-container` (#a190f5) with a `lg` (2rem) radius.
*   **Floating State:** Use the Glassmorphism rule for persistent music players or "mood trackers" that float over the main feed.

### Specialized Component: The "Reflection Orb"
An animated, pulsing gradient circle using `primary-dim`, `secondary-dim`, and `tertiary-dim`. This serves as the "Thinking" or "Listening" indicator for the AI, reinforcing the "Echo" metaphor.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use asymmetrical margins. If the left margin is `spacing-6`, try a right margin of `spacing-8` for hero headers to create visual breathing room.
*   **Do** use illustrative, "line-art" icons with rounded caps. Icons should feel hand-drawn and soft.
*   **Do** lean into `surface-lowest` (#ffffff) for high-focus areas like journaling screens.

### Don't
*   **Don't** use 1px dividers. If you need to separate content, use a `spacing-4` (1.4rem) vertical gap or a subtle background color shift.
*   **Don't** use pure black (#000000) for text. Always use `on-surface` (#303330) to maintain the "warm" empathetic tone.
*   **Don't** use "Snap-to-Grid" layouts. Allow elements to overlap slightly (e.g., an icon breaking the boundary of a card) to create a sense of depth and fluidity.