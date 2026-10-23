import { useState, useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { VerticalCutReveal } from './ui/vertical-cut-reveal'

export default function AboutUsSection() {
  const [isUnrolled, setIsUnrolled] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsUnrolled(entry.isIntersecting)
      },
      { threshold: 0.12 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-white text-slate-900 py-6 sm:py-8 lg:py-8 px-6 sm:px-12 lg:px-16 border-t border-slate-100 overflow-hidden font-['Inter'] select-text"
    >
      <div className="relative max-w-[1560px] w-full mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

          {/* ================= LEFT SIDE: VERTICAL CUT REVEAL TEXT ANIMATION ================= */}
          <div className="lg:col-span-5 flex flex-col justify-center pr-0 lg:pr-6">

            {/* Main Prominent Section Title (Character-by-character Cut Reveal) */}
            <div className="mb-3 sm:mb-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal font-['Inter'] tracking-[0.03em] uppercase text-black leading-none select-text">
                <VerticalCutReveal
                  splitBy="characters"
                  staggerDuration={0.035}
                  staggerFrom="first"
                  inView={isUnrolled}
                  transition={{
                    type: 'spring',
                    stiffness: 220,
                    damping: 24,
                  }}
                >
                  About Us
                </VerticalCutReveal>
              </h2>
            </div>

            {/* Sub-headline (Word-by-word Cut Reveal) */}
            <div className="mb-3 sm:mb-4">
              <h3 className="text-xl sm:text-2xl lg:text-[26px] font-medium text-slate-900 tracking-tight leading-snug select-text">
                <VerticalCutReveal
                  splitBy="words"
                  staggerDuration={0.06}
                  staggerFrom="first"
                  inView={isUnrolled}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 22,
                    delay: 0.1,
                  }}
                >
                  Bridging Imagination and Physical Reality.
                </VerticalCutReveal>
              </h3>
            </div>

            {/* Primary description (Word-by-word Cut Reveal) */}
            <div>
              <p className="text-[15px] sm:text-base text-slate-600 font-sans leading-relaxed select-text max-w-lg">
                <VerticalCutReveal
                  splitBy="words"
                  staggerDuration={0.015}
                  staggerFrom="first"
                  inView={isUnrolled}
                  transition={{
                    type: 'spring',
                    stiffness: 180,
                    damping: 24,
                    delay: 0.18,
                  }}
                >
                  We are an engineering lab turning bold concepts into tangible technologies. Through deep-tech research, human-centered design, and precision manufacturing, we build products that endure and make an impact.
                </VerticalCutReveal>
              </p>
            </div>

            {/* Explore Button */}
            <div
              className="overflow-hidden mt-6 sm:mt-8 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: isUnrolled ? 'translateY(0)' : 'translateY(36px)',
                opacity: isUnrolled ? 1 : 0,
                transitionDelay: isUnrolled ? '340ms' : '0ms',
              }}
            >
              <button
                type="button"
                onClick={() => {
                  const target = document.getElementById('introduction')
                  if (target) {
                    if (window.__lenis) {
                      window.__lenis.scrollTo(target, { duration: 1.2 })
                    } else {
                      target.scrollIntoView({ behavior: 'smooth' })
                    }
                  }
                }}
                className="inline-flex items-center gap-3.5 sm:gap-4 group cursor-pointer font-['Inter'] select-none"
              >
                <span className="text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase text-slate-900 group-hover:text-black transition-colors">
                  EXPLORE OUR MISSION
                </span>
                <div className="h-[1.5px] w-10 sm:w-14 bg-slate-300 group-hover:w-16 sm:group-hover:w-20 group-hover:bg-black transition-all duration-300" />
                <div className="w-8 h-8 rounded-full border border-slate-300 bg-slate-50 flex items-center justify-center group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-300 shadow-xs text-slate-900">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            </div>

          </div>

          {/* ================= RIGHT SIDE: IMAGES SHOWCASE ================= */}
          <div className="lg:col-span-7 w-full grid grid-cols-2 gap-4 sm:gap-6 lg:gap-7">

            {/* Image 1: Team Collaborative Discussion */}
            <div className="relative w-full h-[430px] sm:h-[490px] lg:h-[clamp(470px,62vh,580px)]">
              {/* Unrolling Card Container */}
              <div
                className="absolute inset-x-0 p-1 sm:p-[5px] rounded-3xl border-2 border-slate-200/90 ring-1 ring-slate-900/10 bg-white shadow-2xl overflow-hidden group"
                style={{
                  top: isUnrolled ? '0px' : '50%',
                  bottom: isUnrolled ? '0px' : '50%',
                  opacity: isUnrolled ? 1 : 0,
                  transition: isUnrolled
                    ? 'top 1100ms cubic-bezier(0.16, 1, 0.3, 1) 0ms, bottom 1100ms cubic-bezier(0.16, 1, 0.3, 1) 0ms, opacity 800ms ease 0ms'
                    : 'top 500ms ease, bottom 500ms ease, opacity 400ms ease',
                }}
              >
                <div className="relative w-full h-full overflow-hidden rounded-[19px] bg-slate-100">
                  {/* Stationary Image Mask */}
                  <div
                    className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full overflow-hidden"
                    style={{ height: 'clamp(470px, 62vh, 580px)' }}
                  >
                    <img
                      src="/about_team_discussion.jpg"
                      alt="Product Innovators in Collaborative Discussion"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Image 2: Cross-Disciplinary Brainstorming (Offset downward for editorial feel) */}
            <div className="relative w-full h-[430px] sm:h-[490px] lg:h-[clamp(470px,62vh,580px)] mt-3 sm:mt-5 lg:mt-5">
              {/* Unrolling Card Container */}
              <div
                className="absolute inset-x-0 p-1 sm:p-[5px] rounded-3xl border-2 border-slate-200/90 ring-1 ring-slate-900/10 bg-white shadow-2xl overflow-hidden group"
                style={{
                  top: isUnrolled ? '0px' : '50%',
                  bottom: isUnrolled ? '0px' : '50%',
                  opacity: isUnrolled ? 1 : 0,
                  transition: isUnrolled
                    ? 'top 1100ms cubic-bezier(0.16, 1, 0.3, 1) 140ms, bottom 1100ms cubic-bezier(0.16, 1, 0.3, 1) 140ms, opacity 800ms ease 140ms'
                    : 'top 500ms ease, bottom 500ms ease, opacity 400ms ease',
                }}
              >
                <div className="relative w-full h-full overflow-hidden rounded-[19px] bg-slate-100">
                  {/* Stationary Image Mask */}
                  <div
                    className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full overflow-hidden"
                    style={{ height: 'clamp(470px, 62vh, 580px)' }}
                  >
                    <img
                      src="/about_team_brainstorm.jpg"
                      alt="Engineers and Designers Brainstorming Innovations"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

