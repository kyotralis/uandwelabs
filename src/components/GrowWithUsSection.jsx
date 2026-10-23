import { useState, useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import careerHeroImg from '../assets/careerhomeimage.png'

export default function GrowWithUsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -20px 0px',
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="careers"
      className="relative w-full bg-white pt-2 sm:pt-4 lg:pt-6 pb-16 sm:pb-24 lg:pb-28 px-4 sm:px-8 lg:px-12 overflow-hidden font-['Inter'] select-text"
      aria-labelledby="grow-with-us-heading"
    >
      <div className="max-w-[1560px] w-full mx-auto">

        {/* ================= CINEMATIC FULL-WIDTH CURVED CARD ================= */}
        <div
          ref={cardRef}
          className="group relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] rounded-3xl sm:rounded-[40px] lg:rounded-[48px] overflow-hidden shadow-[0_24px_70px_rgba(234,88,12,0.08),0_4px_20px_rgba(0,0,0,0.04)] border border-slate-200/80 flex items-center bg-white transition-opacity duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
          }}
        >
          {/* Background Visual sliding completely from the left side */}
          <div
            className="absolute inset-0 w-full h-full transition-transform duration-[1850ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform select-none pointer-events-none"
            style={{
              transform: isVisible ? 'translateX(0)' : 'translateX(-100%)',
            }}
          >
            <img
              src={careerHeroImg}
              alt="Modern architectural terrace with ascending spiral staircase in warm sunrise light"
              className="w-full h-full object-cover object-[70%_center] sm:object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
          </div>

          {/* Editorial Light Gradient Overlay for crisp typography contrast */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent sm:from-white/90 sm:via-white/40 sm:to-transparent pointer-events-none transition-opacity duration-[1400ms] ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transitionDelay: isVisible ? '300ms' : '0ms',
            }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent pointer-events-none transition-opacity duration-[1400ms] ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transitionDelay: isVisible ? '300ms' : '0ms',
            }}
          />

          {/* Warm Amber Ambient Glow */}
          <div className="absolute top-0 left-12 w-[500px] h-[500px] bg-orange-400/10 rounded-full blur-[140px] pointer-events-none" />

          {/* ================= OVERLAID EDITORIAL CONTENT ================= */}
          <div className="relative z-10 w-full p-8 sm:p-14 lg:p-20 flex flex-col justify-center min-h-[480px] sm:min-h-[540px] lg:min-h-[580px]">

            {/* Middle: Oversized Headline, Statement, and Action Button with group hover translation */}
            <div className="max-w-3xl py-4 transition-transform duration-700 ease-out group-hover:translate-x-1.5">

              {/* Oversized Headline with Split-Line Roll-Up Animation */}
              <div className="mb-4 sm:mb-6">
                <div className="overflow-hidden">
                  <h2
                    id="grow-with-us-heading"
                    className="text-4xl sm:text-5xl lg:text-6xl font-normal font-['Inter'] tracking-[0.03em] uppercase text-slate-900 leading-tight transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] select-text"
                    style={{
                      transform: isVisible ? 'translateY(0)' : 'translateY(115%)',
                      opacity: isVisible ? 1 : 0,
                      transitionDelay: isVisible ? '380ms' : '0ms',
                    }}
                  >
                    Grow With Us
                  </h2>
                </div>
              </div>

              {/* Supporting Statement Mask Reveal */}
              <div className="overflow-hidden mb-8 sm:mb-10">
                <p
                  className="text-base sm:text-lg lg:text-xl text-slate-700 font-normal leading-relaxed max-w-xl transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] select-text"
                  style={{
                    transform: isVisible ? 'translateY(0)' : 'translateY(115%)',
                    opacity: isVisible ? 1 : 0,
                    transitionDelay: isVisible ? '580ms' : '0ms',
                  }}
                >
                  Curious minds. Bold ideas. Meaningful work. Let's build what's next, together.
                </p>
              </div>

              {/* Call to Action Group Mask Reveal */}
              <div className="overflow-hidden">
                <div
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: isVisible ? 'translateY(0)' : 'translateY(115%)',
                    opacity: isVisible ? 1 : 0,
                    transitionDelay: isVisible ? '750ms' : '0ms',
                  }}
                >
                  {/* Explore Opportunities Button */}
                  <a
                    href="#careers"
                    className="group/btn inline-flex items-center gap-3 px-8 py-4 rounded-full bg-slate-950 hover:bg-orange-500 text-white text-sm sm:text-[15px] font-semibold tracking-tight transition-all duration-300 shadow-[0_6px_25px_rgba(15,23,42,0.2)] hover:shadow-[0_8px_35px_rgba(249,115,22,0.4)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
                  >
                    <span>Explore Opportunities</span>
                    <ArrowRight className="w-4 h-4 text-orange-400 group-hover/btn:text-white transition-all duration-300 ease-out group-hover/btn:translate-x-1.5" />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
