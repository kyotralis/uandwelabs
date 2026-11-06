import { useState, useEffect } from 'react'

/**
 * ArrowShapeUpStack2 Icon
 * Google Material Symbols - "Arrow Shape Up Stack 2"
 */
export function ArrowShapeUpStack2({ className = "w-5 h-5", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M9 23v-3H4l8-9l8 9h-5v3zm2-2h2v-3h2.55L12 14l-3.55 4H11zm-7-6l8-9l8 9h-2.675L12 9l-5.325 6zm0-5l8-9l8 9h-2.675L12 4l-5.325 6z" />
    </svg>
  )
}

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      // Show when scrolled down past 260px (past top header area)
      setIsVisible(scrollY > 260)
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })

    // Also support Lenis smooth scroll if active
    let lenisTimer = null
    const attachLenis = () => {
      if (window.__lenis) {
        window.__lenis.on('scroll', toggleVisibility)
      } else {
        lenisTimer = setTimeout(attachLenis, 200)
      }
    }
    attachLenis()

    // Initial check
    toggleVisibility()

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
      if (window.__lenis) {
        window.__lenis.off('scroll', toggleVisibility)
      }
      if (lenisTimer) clearTimeout(lenisTimer)
    }
  }, [])

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.1 })
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div
      className={`fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 transition-all duration-300 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
        className="group relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/90 hover:bg-black text-white border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ring-1 ring-white/10"
      >
        <ArrowShapeUpStack2 className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 transition-transform duration-300 group-hover:-translate-y-1" />
        
        {/* Subtle glowing ring on hover */}
        <span className="absolute inset-0 rounded-full border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </button>
    </div>
  )
}

