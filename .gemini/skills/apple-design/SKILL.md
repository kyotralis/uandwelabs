---
name: apple-design
description: Apple's approach to interface design and fluid, physical motion, translated for the web. Use when building or reviewing gesture-driven UI, spring animations, drag/swipe/sheet interactions, momentum and interruptible transitions, translucent materials and depth, typography (optical sizing, tracking, leading), reduced-motion, or the design foundations (feedback, spatial consistency, restraint) behind Apple-style interfaces.
---

# Apple Design & Fluid Motion Principles (Emil Kowalski)

## The Core Idea
> "When we align the interface to the way we think and move, something magical happens - it stops feeling like a computer and starts feeling like a seamless extension of us."

An interface is fluid when it behaves like the physical world: things respond instantly, move continuously, carry momentum, resist at boundaries, and can be redirected mid-motion.

## Foundational Rules:

### 1. Response — Kill Latency & Add Instant Press Feedback
- **Respond on pointer-down / active, not on release.**
- Buttons must have tactile `:active` state (e.g. `active:scale-[0.98]` or Framer Motion `whileTap={{ scale: 0.98 }}`) transitioning in <=100ms.
- Never wait for release or introduce artificial delays.

### 2. Kill `transition: all`
- **Never use `transition: all` or `transition-all`.**
- Explicitly name transitioned properties: `transition-colors`, `transition-transform`, `transition-opacity`.
- Use responsive easing (`ease-out` or custom cubic bezier), never `ease-in` for entering UI.

### 3. Direct Manipulation & Interruptibility
- Gestures and moving elements must be interruptible and reversible mid-flight.
- Use spring physics (`type: "spring", damping: 25, stiffness: 300`) instead of rigid fixed-duration CSS keyframes.

### 4. Spatial Consistency & Physicality
- Popovers, dropdowns, and modals should scale from their trigger origin or feel physically anchored, not pop out from nowhere.
- Never animate from `scale(0)` - start from `scale(0.95)` with opacity crossfade.

### 5. Restraint & Reduced Motion
- Restrain infinite animations: don't have emojis or badges bounce forever without purpose.
- Respect `@media (prefers-reduced-motion: reduce)` (`motion-reduce:transition-none`, `motion-reduce:animate-none`).
- GPU-accelerated properties only: animate `transform` and `opacity`, never layout properties (`width`, `height`, `margin`, `padding`, `top`, `left`).

