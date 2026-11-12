import { useState, useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'

export default function CommonCta({
  title = 'Ready to shape the future?',
  subtitle = 'Deploy GPU ray-casting, aerodynamic wind CFD, and flood hydrology on your next architectural development with our engineering team.',
  buttonText = 'Schedule Simulation Consultation',
  onButtonClick,
  className = '',
}) {
  const ctaRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const check = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight
      if (ctaRef.current) {
        const r = ctaRef.current.getBoundingClientRect()
        setIsVisible(r.top < vh - 40 && r.bottom > 0)
      }
    }

    let obs = null
    if (typeof IntersectionObserver !== 'undefined') {
      obs = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting)
        },
        { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
      )
      if (ctaRef.current) obs.observe(ctaRef.current)
    }

    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check, { passive: true })
    check()
    const t = setTimeout(check, 80)

    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
      clearTimeout(t)
      if (obs) obs.disconnect()
    }
  }, [])

  return (
    <div className={`w-full pt-8 sm:pt-12 md:pt-16 pb-14 sm:pb-20 md:pb-24 overflow-hidden ${className}`}>
      <div className="max-w-[1560px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-8 lg:px-16">
        <div
          ref={ctaRef}
          className="w-full bg-neutral-950 text-white p-6 sm:p-10 md:p-14 lg:p-16 xl:p-20 rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8 lg:gap-12 relative overflow-hidden"
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
            opacity: isVisible ? 1 : 0,
            transition: 'transform 950ms cubic-bezier(0.16, 1, 0.3, 1), opacity 950ms cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform, opacity',
          }}
        >
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15] mb-3 sm:mb-5 font-sans">
              {title}
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base md:text-lg font-normal leading-relaxed font-sans">
              {subtitle}
            </p>
          </div>

          <div className="w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
            <button
              type="button"
              onClick={onButtonClick}
              className="w-full sm:w-auto group inline-flex items-center justify-between sm:justify-center gap-3 sm:gap-4 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white text-neutral-950 hover:bg-neutral-100 transition-all duration-300 font-semibold text-xs sm:text-sm tracking-wide cursor-pointer shadow-lg active:scale-[0.98]"
            >
              <span className="text-left sm:text-center leading-snug">{buttonText}</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                <ArrowRight size={14} className="sm:w-4 sm:h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

