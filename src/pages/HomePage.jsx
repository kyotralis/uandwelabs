import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import Hero from '../components/Hero'
import AboutUsSection from '../components/AboutUsSection'
import GeoSpatialSection from '../components/GeoSpatialSection'
import HealthcareSection from '../components/HealthcareSection'
import BoardSection from '../components/BoardSection'
import WhatWeBelieveSection from '../components/WhatWeBelieveSection'
import GrowWithUsSection from '../components/GrowWithUsSection'
import Footer from '../components/Footer'

const SECTION_IDS = ['hero', 'about', 'introduction', 'healthcare', 'board', 'beliefs', 'careers']

export default function HomePage({
  user,
  onLogout,
  onNavigateToLogin,
}) {
  const lenisRef = useRef(null)

  // 1. Initialize Lenis buttery-smooth momentum scrolling
  useEffect(() => {
    if (typeof window === 'undefined') return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis
    window.__lenis = lenis

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
      delete window.__lenis
    }
  }, [])

  // 2. Restore scroll position to the current section upon page refresh / reload
  useEffect(() => {
    if (typeof window === 'undefined') return

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const hash = window.location.hash.replace('#', '').toLowerCase()
    let savedSection = null
    let savedScrollY = null

    try {
      savedSection = sessionStorage.getItem('uandwe_active_section')
      savedScrollY = sessionStorage.getItem('uandwe_scroll_y')
    } catch {
      // ignore storage access errors
    }

    const targetSection = (hash && SECTION_IDS.includes(hash)) ? hash : savedSection

    if (targetSection && targetSection !== 'hero') {
      const doScrollToSection = () => {
        const el = document.getElementById(targetSection)
        if (el) {
          if (window.__lenis) {
            window.__lenis.scrollTo(el, { immediate: true })
          } else {
            el.scrollIntoView({ behavior: 'instant', block: 'start' })
          }
          return true
        }
        return false
      }

      doScrollToSection()
      const t1 = setTimeout(doScrollToSection, 40)
      const t2 = setTimeout(doScrollToSection, 150)
      const t3 = setTimeout(doScrollToSection, 350)

      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
        clearTimeout(t3)
      }
    } else if (savedScrollY && Number(savedScrollY) > 80) {
      const scrollPos = Number(savedScrollY)
      const doScrollToY = () => {
        if (window.__lenis) {
          window.__lenis.scrollTo(scrollPos, { immediate: true })
        } else {
          window.scrollTo({ top: scrollPos, behavior: 'instant' })
        }
      }
      doScrollToY()
      const t1 = setTimeout(doScrollToY, 40)
      const t2 = setTimeout(doScrollToY, 150)

      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
      }
    }
  }, [])

  // 3. Continuously track the active section smoothly without jank
  useEffect(() => {
    if (typeof window === 'undefined') return

    let hashUpdateTimer = null

    const handleScroll = () => {
      try {
        sessionStorage.setItem('uandwe_scroll_y', String(window.scrollY))
      } catch {
        // ignore
      }

      // Check which section is currently in view
      const scrollMid = window.scrollY + window.innerHeight * 0.45
      let activeId = 'hero'

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollMid >= top && scrollMid < top + height) {
            activeId = id
            break
          }
        }
      }

      try {
        sessionStorage.setItem('uandwe_active_section', activeId)
      } catch {
        // ignore
      }

      // Debounce history replaceState to prevent browser scroll thread hiccups
      if (hashUpdateTimer) clearTimeout(hashUpdateTimer)
      hashUpdateTimer = setTimeout(() => {
        try {
          if (activeId !== 'hero') {
            window.history.replaceState(null, '', '#' + activeId)
          } else {
            window.history.replaceState(null, '', window.location.pathname)
          }
        } catch {
          // ignore
        }
      }, 250)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (hashUpdateTimer) clearTimeout(hashUpdateTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Hero
        user={user}
        onLogout={onLogout}
        onNavigateToLogin={onNavigateToLogin}
      />

      {/* About Us Section */}
      <AboutUsSection />

      {/* Geo Spatial Section */}
      <GeoSpatialSection />

      {/* Healthcare Section */}
      <HealthcareSection />

      {/* Aura / Roadside Safety Vision & Vehicle Intelligence Section */}
      <BoardSection />

      {/* What We Believe In Section */}
      <WhatWeBelieveSection />

      {/* Grow With Us Careers Section */}
      <GrowWithUsSection />

      {/* Clean Simple Footer */}
      <Footer />
    </div>
  )
}

