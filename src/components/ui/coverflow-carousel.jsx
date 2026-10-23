
import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../lib/utils'

const useIsoLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect

export function CoverflowCarousel({
  slides = [],
  rotate = 44,
  depth = 0.6,
  perspective = 3,
  falloff = 0.56,
  fade = 0.1,
  cardWidth = 'clamp(180px, 20vw, 260px)',
  gap = 0.05,
  loop = true,
  showCaption = false,
  showPagination = false,
  showNavigation = true,
  label = 'Cover carousel',
  className,
  cardClassName,
  onSlideChange,
  isUnrolled: propIsUnrolled,
}) {
  const count = slides.length

  const frameRef = React.useRef(null)
  const cardRefs = React.useRef([])
  /** Fractional card index at the centre. The single source of truth. */
  const posRef = React.useRef(0)
  /** Where the current settle is headed. */
  const targetRef = React.useRef(0)
  const widthRef = React.useRef(0)
  const rafRef = React.useRef(null)
  const dragRef = React.useRef(null)

  const [selected, setSelected] = React.useState(0)
  const [internalUnrolled, setInternalUnrolled] = React.useState(false)

  React.useEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInternalUnrolled(entry.isIntersecting)
      },
      { threshold: 0.12 }
    )

    observer.observe(frame)
    return () => observer.disconnect()
  }, [])

  const isUnrolled = propIsUnrolled !== undefined ? propIsUnrolled : internalUnrolled

  /** Nearest whole card, folded back into 0..count-1. */
  const indexAt = React.useCallback(
    (pos) => {
      if (!count) return 0
      return ((Math.round(pos) % count) + count) % count
    },
    [count],
  )

  // Paint straight to the DOM for 60fps performance without React re-renders on every pixel.
  const paint = React.useCallback(() => {
    const width = widthRef.current
    if (!width || !count) return
    const pitch = width * (1 + gap)
    const pos = posRef.current

    cardRefs.current.forEach((card, index) => {
      if (!card) return

      let offset = index - pos
      if (loop) {
        offset = ((offset % count) + count) % count
        if (offset > count / 2) offset -= count
      }

      const distance = Math.abs(offset)
      const ramp = Math.pow(distance, falloff)
      const tilt = Math.min(rotate * ramp, 82) * Math.sign(offset)

      card.style.transform =
        `translateX(calc(-50% + ${offset * pitch}px)) ` +
        `translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`

      const edge = loop ? Math.max(0, Math.min(1, (count / 2 - distance) * 2.8)) : 1
      card.style.setProperty('--cf-fade', String(Math.max(0, 1 - fade * distance) * edge))
      card.style.zIndex = String(100 - Math.round(distance))
    })
  }, [count, depth, fade, falloff, gap, loop, rotate])

  // Smooth ease-in-out cubic curve: zero jerk at start, silky acceleration, gentle stop
  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

  const settle = React.useCallback(
    (target, customDuration) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      targetRef.current = target
      const newIndex = indexAt(target)
      setSelected(newIndex)
      if (onSlideChange) onSlideChange(newIndex)

      const startPos = posRef.current
      const diff = target - startPos
      if (Math.abs(diff) < 0.0002) {
        posRef.current = target
        paint()
        rafRef.current = null
        return
      }

      // Smooth duration: 620ms for arrow transitions
      const duration =
        customDuration ?? Math.min(Math.max(Math.abs(diff) * 580, 500), 750)
      const startTime = performance.now()

      const step = (now) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const ease = easeInOutCubic(progress)

        posRef.current = startPos + diff * ease
        paint()

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step)
        } else {
          posRef.current = target
          paint()
          rafRef.current = null
        }
      }

      rafRef.current = requestAnimationFrame(step)
    },
    [indexAt, paint, onSlideChange],
  )

  const clamp = React.useCallback(
    (pos) => (loop ? pos : Math.max(0, Math.min(count - 1, pos))),
    [count, loop],
  )

  const goTo = React.useCallback(
    (index) => {
      const target = loop
        ? index + Math.round((targetRef.current - index) / count) * count
        : index
      settle(clamp(target), 620)
    },
    [clamp, count, loop, settle],
  )

  const nudge = React.useCallback(
    (by) => {
      const currentTarget = Math.round(targetRef.current)
      const nextTarget = clamp(currentTarget + by)
      settle(nextTarget, 650)
    },
    [clamp, settle],
  )

  const isDraggingRef = React.useRef(false)
  const dragStartRef = React.useRef({ x: 0, y: 0 })

  const onPointerDown = (event) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    dragStartRef.current = { x: event.clientX, y: event.clientY }
    isDraggingRef.current = false
    targetRef.current = posRef.current
    dragRef.current = {
      id: event.pointerId,
      target: event.currentTarget,
      captured: false,
      x: event.clientX,
      pos: posRef.current,
      v: 0,
      t: performance.now(),
    }
  }

  const onPointerMove = (event) => {
    const drag = dragRef.current
    if (!drag || drag.id !== event.pointerId) return

    const dx = event.clientX - dragStartRef.current.x
    const dy = event.clientY - dragStartRef.current.y

    // Allow vertical scrolling naturally without pointer capture trapping the gesture
    if (!drag.captured) {
      if (Math.abs(dx) > 7 && Math.abs(dx) > Math.abs(dy)) {
        try {
          drag.target.setPointerCapture(event.pointerId)
          drag.captured = true
          isDraggingRef.current = true
        } catch {
          // ignore
        }
      } else if (Math.abs(dy) > 7) {
        // Abort carousel drag so vertical scroll continues unimpeded
        dragRef.current = null
        return
      } else {
        return
      }
    }

    const pitch = widthRef.current * (1 + gap)
    if (!pitch) return

    const now = performance.now()
    const previous = posRef.current
    posRef.current = clamp(drag.pos - (event.clientX - drag.x) / pitch)
    drag.v = ((posRef.current - previous) / Math.max(now - drag.t, 1)) * 1000
    drag.t = now

    const index = indexAt(posRef.current)
    if (index !== selected) {
      setSelected(index)
      if (onSlideChange) onSlideChange(index)
    }
    paint()
  }

  const endDrag = (event) => {
    const drag = dragRef.current
    if (!drag || drag.id !== event.pointerId) return

    if (drag.captured) {
      try {
        drag.target.releasePointerCapture(event.pointerId)
      } catch {
        // ignore
      }
    }
    dragRef.current = null

    if (isDraggingRef.current) {
      const carried = Math.max(-2, Math.min(2, drag.v * 0.18))
      settle(clamp(Math.round(posRef.current + carried)), 550)
      setTimeout(() => {
        isDraggingRef.current = false
      }, 80)
    }
  }

  useIsoLayoutEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    const measure = () => {
      const card = cardRefs.current[0]
      if (!card) return
      widthRef.current = card.offsetWidth
      paint()
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(frame)
    return () => observer.disconnect()
  }, [paint])

  React.useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    },
    [],
  )

  const active = slides[selected]

  return (
    <div
      className={cn('w-full select-none', className)}
      style={{ ['--cf-card']: cardWidth }}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      {/* Top-Right Navigation Controls (NVIDIA Style) */}
      {showNavigation && (
        <div
          className="flex items-center justify-end gap-1.5 sm:gap-2 mb-2 sm:mb-3 pr-1 sm:pr-3"
          style={{
            opacity: isUnrolled ? 1 : 0,
            pointerEvents: isUnrolled ? 'auto' : 'none',
            transition: isUnrolled ? 'opacity 600ms ease 300ms' : 'opacity 300ms ease',
          }}
        >
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => nudge(-1)}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center hover:bg-black transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer border border-slate-800"
          >
            <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => nudge(1)}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center hover:bg-black transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer border border-slate-800"
          >
            <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>
        </div>
      )}

      <div className="relative">
        <div
          ref={frameRef}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') {
              event.preventDefault()
              nudge(-1)
            } else if (event.key === 'ArrowRight') {
              event.preventDefault()
              nudge(1)
            }
          }}
          className="cursor-grab overflow-visible py-2 sm:py-3 outline-none active:cursor-grabbing"
          style={{
            perspective: `calc(var(--cf-card) * ${perspective})`,
            touchAction: 'pan-y',
          }}
        >
          <div
            className="relative select-none"
            style={{
              height: 'calc(var(--cf-card) * 1.25)',
              transformStyle: 'preserve-3d',
            }}
          >
            {slides.map((slide, index) => {
              const distanceToSelected = count > 1
                ? Math.min(Math.abs(index - selected), count - Math.abs(index - selected))
                : 0
              const delay = distanceToSelected * 140

              return (
                <div
                  key={index}
                  ref={(node) => {
                    cardRefs.current[index] = node
                  }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${count}`}
                  onClick={() => {
                    if (isDraggingRef.current) return
                    goTo(index)
                  }}
                  className={cn(
                    'absolute left-1/2 p-1 sm:p-[5px] rounded-3xl bg-white shadow-2xl will-change-transform cursor-pointer border-2 border-slate-200/90 ring-1 ring-slate-900/10 hover:shadow-black/40 overflow-hidden',
                    cardClassName,
                  )}
                  style={{
                    width: 'var(--cf-card)',
                    top: isUnrolled ? '0px' : '50%',
                    bottom: isUnrolled ? '0px' : '50%',
                    opacity: isUnrolled ? 1 : 0,
                    transition: isUnrolled
                      ? `top 1100ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, bottom 1100ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity 800ms ease ${delay}ms`
                      : 'top 500ms ease, bottom 500ms ease, opacity 400ms ease',
                  }}
                >
                  {/* Inner Card Container */}
                  <div
                    className="relative w-full h-full overflow-hidden rounded-[19px] bg-slate-900"
                    style={{ opacity: 'var(--cf-fade, 1)', transition: 'opacity 300ms ease' }}
                  >

                    {/* Window Unmasking: Inner image & content anchored at full height to stay stationary as borders unroll */}
                    <div
                      className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full overflow-hidden"
                      style={{ height: 'calc(var(--cf-card) * 1.25)' }}
                    >
                      <img
                        src={slide.src}
                        alt={slide.alt || slide.title || ''}
                        draggable={false}
                        className="h-full w-full select-none object-cover pointer-events-none"
                      />

                      {/* Scrim & title inside card */}
                      {slide.title && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-5 sm:p-7 text-white pointer-events-none">
                          <p className="text-base sm:text-lg font-medium tracking-wide uppercase font-['Inter'] leading-tight">
                            {slide.title}
                          </p>
                          {slide.subtitle && (
                            <p className="text-xs sm:text-sm text-white/75 font-sans mt-1">
                              {slide.subtitle}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>

      {showCaption && active?.title && (
        <div
          key={selected}
          className="mt-3 flex flex-col items-center px-4 duration-300 animate-in fade-in"
        >
          <p className="text-base font-semibold tracking-tight text-slate-900 font-['Inter']">
            {active.title}
          </p>
          {active.subtitle && (
            <p className="mt-0.5 text-xs text-slate-500 font-sans">
              {active.subtitle}
            </p>
          )}
          {active.meta && active.meta.length > 0 && (
            <dl className="mt-4 w-full max-w-[260px] text-xs divide-y divide-slate-100">
              {active.meta.map((row) => (
                <div key={row.label} className="flex justify-between py-1.5">
                  <dt className="text-slate-500">{row.label}</dt>
                  <dd className="font-semibold text-slate-900 font-mono">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      )}

      {showPagination && (
        <div
          className="mt-2.5 flex items-center justify-center gap-2"
          style={{
            opacity: isUnrolled ? 1 : 0,
            pointerEvents: isUnrolled ? 'auto' : 'none',
            transition: isUnrolled ? 'opacity 600ms ease 300ms' : 'opacity 300ms ease',
          }}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selected}
              onClick={() => goTo(index)}
              className={cn(
                'size-2.5 rounded-full transition-all cursor-pointer',
                index === selected ? 'bg-black w-6' : 'bg-slate-300 hover:bg-slate-400',
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
