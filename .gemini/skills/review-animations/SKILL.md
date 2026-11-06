---
name: review-animations
description: Reviews animation and motion code against a high craft bar derived from Emil Kowalski's design engineering philosophy. Default to flagging; approval is earned.
---

# Reviewing Animations (Emil Kowalski)

## The Ten Non-Negotiable Standards:
1. **Justified motion** — Every animation must serve a function.
2. **Frequency-appropriate** — 100+/day actions get zero or reduced motion.
3. **Responsive easing** — `ease-out` or custom bezier. No `ease-in` on UI.
4. **Sub-300ms UI** — Fast, crisp micro-interactions.
5. **Origin & physical correctness** — Scale from trigger, never from `scale(0)` (use `scale(0.95)` + opacity).
6. **Interruptibility** — Cancellable springs, no blocking keyframes.
7. **GPU-only properties** — Animate `transform` and `opacity` only. No layout thrashing (`width`, `height`, etc.).
8. **Accessibility** — Honor `prefers-reduced-motion` and gate hover for touch devices.
9. **Asymmetric enter/exit** — Press/drag is deliberate; response snaps.
10. **Cohesion & Restraint** — Restrain looping animations; no infinite bouncing without purpose.

