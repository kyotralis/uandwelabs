import { useState, useEffect, useRef } from 'react'

// The 4 Core Principles
const PRINCIPLES = [
  {
    title: 'Simplicity',
    statement: 'The best solutions make complex things easier to understand and use.',
    elaboration:
      'We strip away the non-essential to reveal clarity. In deep-tech and complex hardware, restraint is the highest form of engineering sophistication.',
  },
  {
    title: 'Purposeful Design',
    statement: 'Every decision should serve a clear purpose, from the first concept to the final experience.',
    elaboration:
      'Design is not decoration. Every millimeter of housing, every optical angle, and every line of code exists to solve a real human and physical problem.',
  },
  {
    title: 'Engineering Excellence',
    statement: 'We value thoughtful engineering, attention to detail, and dependable product development.',
    elaboration:
      'From sub-micron tolerances in optics to zero-drift neural algorithms, we build with aerospace-grade precision and an uncompromising refusal to cut corners.',
  },
  {
    title: 'Built for the Long Term',
    statement: 'We believe products should be designed with reliability, maintainability, and future growth in mind.',
    elaboration:
      'True sustainability means endurance. We engineer modular, upgradeable architectures that outlast disposable consumer cycles and thrive in harsh environments.',
  },
]

export default function WhatWeBelieveSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const leftColRef = useRef(null)

  useEffect(() => {
    const el = leftColRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px',
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="beliefs"
      className="relative w-full bg-white text-slate-900 pt-10 sm:pt-12 lg:pt-14 pb-6 sm:pb-8 lg:pb-10 px-6 sm:px-12 lg:px-16 border-t border-slate-100 overflow-visible font-['Inter'] select-text"
    >
      {/* Subtle warm ambient glow in top-right corner */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-12 right-0 w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1560px] w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-20 items-start relative">

          {/* ================= LEFT COLUMN: STAYS IN SAME PAGE (PINNED/STICKY) ================= */}
          <div ref={leftColRef} className="lg:col-span-5 lg:sticky lg:top-36 self-start">

            {/* Main Prominent Section Title */}
            <div className="overflow-hidden mb-2 sm:mb-3">
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-normal font-['Inter'] tracking-[0.03em] uppercase text-black leading-none select-text transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: isVisible ? 'translateY(0)' : 'translateY(115%)',
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: isVisible ? '100ms' : '0ms',
                }}
              >
                What We
              </h2>
            </div>

            <div className="overflow-hidden mb-4 sm:mb-6">
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-normal font-['Inter'] tracking-[0.03em] uppercase text-black leading-none select-text transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: isVisible ? 'translateY(0)' : 'translateY(115%)',
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: isVisible ? '180ms' : '0ms',
                }}
              >
                Believe In
              </h2>
            </div>

            {/* Sub-headline */}
            <div className="overflow-hidden mb-4 sm:mb-6">
              <h3
                className="text-xl sm:text-2xl lg:text-[28px] font-light text-slate-900 uppercase tracking-wide leading-snug select-text transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: isVisible ? 'translateY(0)' : 'translateY(115%)',
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: isVisible ? '240ms' : '0ms',
                }}
              >
                Core Engineering Principles
              </h3>
            </div>

            {/* Introductory Statement Mask Reveal */}
            <div className="overflow-hidden mb-6 sm:mb-8">
              <p
                className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed max-w-md transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] select-text"
                style={{
                  transform: isVisible ? 'translateY(0)' : 'translateY(36px)',
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: isVisible ? '300ms' : '0ms',
                }}
              >
                Great products begin with clear thinking, purposeful design, and an uncompromising commitment to getting the details right.
              </p>
            </div>

            {/* Accent Expanding Underline */}
            <div
              className="h-[1.5px] bg-slate-300 rounded-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                width: isVisible ? '48px' : '0px',
                opacity: isVisible ? 1 : 0,
                transitionDelay: isVisible ? '360ms' : '0ms',
              }}
            />
          </div>

          {/* ================= RIGHT COLUMN: CARDS COME UP ONE BY ONE ================= */}
          <div className="lg:col-span-7 relative flex flex-col pt-2 lg:pt-0">
            {PRINCIPLES.map((item, idx) => {
              const isLast = idx === PRINCIPLES.length - 1

              return (
                <article
                  key={item.title}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`group sticky rounded-3xl sm:rounded-[32px] p-8 sm:p-11 lg:p-14 bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_-4px_24px_rgba(0,0,0,0.03),0_20px_50px_rgba(0,0,0,0.07)] ring-1 ring-slate-900/5 transition-all duration-500 cursor-default ${isLast ? 'mb-0' : 'mb-[30vh] sm:mb-[40vh] lg:mb-[48vh]'
                    }`}
                  style={{
                    top: `calc(7.5rem + ${idx * 14}px)`,
                    zIndex: 10 + idx,
                  }}
                >
                  {/* Title Bar without arrow or tag */}
                  <div className="mb-5 sm:mb-6">
                    <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-medium tracking-tight text-slate-950 group-hover:text-black transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Prominent Large Typographic Statement */}
                  <p className="text-xl sm:text-2xl lg:text-[27px] font-light text-slate-900 leading-[1.38] tracking-[-0.015em] mb-5 sm:mb-6 transition-colors group-hover:text-slate-950">
                    {item.statement}
                  </p>

                  {/* Concise Contextual Elaboration */}
                  <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal max-w-xl transition-colors group-hover:text-slate-700">
                    {item.elaboration}
                  </p>

                  {/* Expanding Orange Edge Accent */}
                  <div className="mt-8 sm:mt-10 h-[2px] w-12 bg-slate-200 group-hover:w-36 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:via-amber-400 group-hover:to-transparent transition-all duration-700 ease-out" />
                </article>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
