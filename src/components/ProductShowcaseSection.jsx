import { useState, useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { CoverflowCarousel } from './ui/coverflow-carousel'
import { VerticalCutReveal } from './ui/vertical-cut-reveal'

export default function ProductShowcaseSection({
  id,
  title,
  subtitle,
  description,
  buttonText,
  nextSectionId,
  slides,
  carouselConfig = {},
}) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.12 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleNextSectionClick = () => {
    if (!nextSectionId) return
    const target = document.getElementById(nextSectionId)
    if (target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { duration: 1.2 })
      } else {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const {
    rotate = 28,
    depth = 0.36,
    perspective = 3.2,
    falloff = 0.55,
    fade = 0.15,
    cardWidth = 'clamp(330px, min(29vw, 58vh), 450px)',
    gap = -0.13,
    loop = true,
    showCaption = false,
    showPagination = true,
    showNavigation = true,
  } = carouselConfig

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative w-full bg-white text-slate-900 py-6 sm:py-8 lg:py-8 px-6 sm:px-12 lg:px-16 border-t border-slate-100 overflow-hidden font-['Inter'] select-text"
    >
      <div className="max-w-[1560px] w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

          {/* ================= LEFT SIDE: VERTICAL CUT REVEAL TEXT ANIMATION ================= */}
          <div className="lg:col-span-4 flex flex-col justify-center pr-0 lg:pr-4">

            {/* Main Prominent Product Title (Character-by-character Cut Reveal) */}
            <div className="mb-3 sm:mb-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal font-['Inter'] tracking-[0.03em] uppercase text-black leading-none select-text">
                <VerticalCutReveal
                  splitBy="characters"
                  staggerDuration={0.035}
                  staggerFrom="first"
                  inView={isVisible}
                  transition={{
                    type: 'spring',
                    stiffness: 220,
                    damping: 24,
                  }}
                >
                  {title}
                </VerticalCutReveal>
              </h2>
            </div>

            {/* Sub-headline (Word-by-word Cut Reveal) */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl lg:text-[28px] font-light text-slate-900 uppercase tracking-wide leading-snug select-text">
                <VerticalCutReveal
                  splitBy="words"
                  staggerDuration={0.08}
                  staggerFrom="first"
                  inView={isVisible}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 22,
                    delay: 0.12,
                  }}
                >
                  {subtitle}
                </VerticalCutReveal>
              </h3>
            </div>

            {/* Description Paragraph (Word-by-word Cut Reveal) */}
            <div>
              <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed select-text max-w-md">
                <VerticalCutReveal
                  splitBy="words"
                  staggerDuration={0.015}
                  staggerFrom="first"
                  inView={isVisible}
                  transition={{
                    type: 'spring',
                    stiffness: 180,
                    damping: 24,
                    delay: 0.22,
                  }}
                >
                  {description}
                </VerticalCutReveal>
              </p>
            </div>

            {/* Explore Button */}
            {buttonText && nextSectionId && (
              <div
                className="overflow-hidden mt-6 sm:mt-8 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: isVisible ? 'translateY(0)' : 'translateY(36px)',
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: isVisible ? '340ms' : '0ms',
                }}
              >
                <button
                  type="button"
                  onClick={handleNextSectionClick}
                  className="inline-flex items-center gap-3.5 sm:gap-4 group cursor-pointer font-['Inter'] select-none"
                >
                  <span className="text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase text-slate-900 group-hover:text-black transition-colors">
                    {buttonText}
                  </span>
                  <div className="h-[1.5px] w-10 sm:w-14 bg-slate-300 group-hover:w-16 sm:group-hover:w-20 group-hover:bg-black transition-all duration-300" />
                  <div className="w-8 h-8 rounded-full border border-slate-300 bg-slate-50 flex items-center justify-center group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-300 shadow-xs text-slate-900">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              </div>
            )}

          </div>

          {/* ================= RIGHT SIDE: COVERFLOW CAROUSEL ANIMATION ================= */}
          <div className="lg:col-span-8 w-full">
            <CoverflowCarousel
              isUnrolled={isVisible}
              slides={slides}
              rotate={rotate}
              depth={depth}
              perspective={perspective}
              falloff={falloff}
              fade={fade}
              cardWidth={cardWidth}
              gap={gap}
              loop={loop}
              showCaption={showCaption}
              showPagination={showPagination}
              showNavigation={showNavigation}
            />
          </div>

        </div>
      </div>
    </section>
  )
}
