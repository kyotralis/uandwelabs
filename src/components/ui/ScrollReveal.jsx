import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// =====================================================================
// UNIFIED ANIMATION SYSTEM FOR UANDWE LABS
// Single source of truth for all card & section scroll entrance animations
// =====================================================================

// Studio-grade easing (Apple / Stripe smooth curve)
export const EASING_STUDIO = [0.16, 1, 0.3, 1]
export const EASING_STUDIO_CSS = 'cubic-bezier(0.16, 1, 0.3, 1)'

/**
 * 1. ScrollReveal Component (Framer Motion)
 * Smoothly animates cards and sections into view.
 *
 * Configured with once=false and instant hidden-reset, so the animation
 * triggers EVERY TIME the user scrolls into the section (not just on refresh)!
 *
 * @param {string} direction - 'left' | 'right' | 'up' | 'down' | 'none' (default 'up')
 * @param {number} distance - Movement distance in pixels (default 60)
 * @param {number} delay - Animation entrance delay in seconds (default 0)
 * @param {number} duration - Animation duration in seconds (default 0.8)
 * @param {boolean} once - If false (default), animates every time the section comes into view
 * @param {number} amount - Fraction of element that must enter viewport to trigger (default 0.15)
 * @param {string} margin - Viewport rootMargin offset (default '0px 0px -40px 0px')
 */
export default function ScrollReveal({
  children,
  direction = 'up',
  y,
  x,
  distance = 60,
  delay = 0,
  duration = 0.8,
  scale = 1,
  className = '',
  style = {},
  once = false,
  amount = 0.15,
  margin = '0px 0px -40px 0px',
  ...props
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once,
    amount,
    margin,
  })

  let initialX = 0
  let initialY = 0

  if (x !== undefined) {
    initialX = x
  } else if (direction === 'left') {
    initialX = -distance
  } else if (direction === 'right') {
    initialX = distance
  }

  if (y !== undefined) {
    initialY = y
  } else if (direction === 'up') {
    initialY = distance
  } else if (direction === 'down') {
    initialY = -distance
  }

  const variants = {
    hidden: {
      opacity: 0,
      x: initialX,
      y: initialY,
      scale,
      transition: {
        duration: 0.15, // Instant reset when scrolled out of view so it's always ready!
        delay: 0,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration,
        delay,         // Staggered entrance delay when scrolling into view!
        ease: EASING_STUDIO,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/**
 * 2. ScrollStagger Component
 * Automatically staggers child elements inside a grid/flex container.
 */
export function ScrollStagger({
  children,
  stagger = 0.12,
  delayChildren = 0.05,
  className = '',
  once = false,
  amount = 0.15,
  margin = '0px 0px -40px 0px',
  ...props
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount, margin })

  const variants = {
    hidden: {
      opacity: 0,
      transition: { duration: 0.15, delay: 0 },
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/**
 * 3. useScrollReveal Hook (Lightweight IntersectionObserver hook)
 * For components that prefer standard React state & refs.
 */
export function useScrollReveal(options = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px', once = false } = options
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) obs.disconnect()
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, isVisible]
}

/**
 * 4. Helper to generate uniform CSS transition styles
 * For existing cards using inline CSS styles.
 */
export function getCardRevealStyle(isVisible, delay = 0, y = 50, duration = 800) {
  return {
    transform: isVisible ? 'translateY(0)' : `translateY(${y}px)`,
    opacity: isVisible ? 1 : 0,
    transition: `transform ${duration}ms ${EASING_STUDIO_CSS}, opacity ${duration}ms ${EASING_STUDIO_CSS}`,
    transitionDelay: isVisible ? `${delay}ms` : '0ms',
    willChange: 'transform, opacity',
  }
}
