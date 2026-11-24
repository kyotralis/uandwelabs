import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import Hero from '../components/Hero'
import WhatWeBelieveSection from '../components/WhatWeBelieveSection'
import GeoSpatialSection from '../components/GeoSpatialSection'
import HealthcareSection from '../components/HealthcareSection'
import BoardSection from '../components/BoardSection'

const SECTION_IDS = ['hero', 'beliefs', 'introduction', 'healthcare', 'board']

export default function HomePage({
  user,
  onLogout,
  onNavigateToLogin,
  onNavigateToAnanda,
  onNavigateToDara,
  onNavigateToAura,
  onNavigateToBlogs,
  onNavigateToAbout,

  anandaCategory,
}) {
  const lenisRef = useRef(null)
  const isRestoringRef = useRef(true)

  // Ensure current page session is registered as 'home' and clean any legacy section locks
  useEffect(() => {
    try {
      sessionStorage.setItem('uandwe_current_page', 'home')
      sessionStorage.removeItem('uandwe_active_section')
      sessionStorage.removeItem('uandwe_scroll_y')
      sessionStorage.removeItem('uandwe_hero_slide_index')
    } catch {}
  }, [])

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

  // 2. Only scroll to a section if explicitly requested via URL hash (e.g. #healthcare)
  useEffect(() => {
    if (typeof window === 'undefined') return

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const hash = window.location.hash.replace('#', '').toLowerCase()
    const targetSection = hash && SECTION_IDS.includes(hash) ? hash : null

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
      const t1 = setTimeout(doScrollToSection, 50)
      const t2 = setTimeout(doScrollToSection, 180)
      const t3 = setTimeout(doScrollToSection, 400)
      const t4 = setTimeout(() => {
        doScrollToSection()
        isRestoringRef.current = false
      }, 800)

      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
        clearTimeout(t3)
        clearTimeout(t4)
      }
    } else {
      // Always start at top (Hero section) on initial home page visit
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
      isRestoringRef.current = false
    }
  }, [])

  // 3. Continuously track the active section smoothly without jank
  useEffect(() => {
    if (typeof window === 'undefined') return

    let hashUpdateTimer = null

    const handleScroll = () => {
      if (isRestoringRef.current) return

      try {
        sessionStorage.setItem('uandwe_scroll_y', String(window.scrollY))
      } catch {
        // ignore
      }

      // Check which section is currently in view using bounding client rect
      let activeId = 'hero'
      const viewportMid = window.innerHeight * 0.45

      if (window.scrollY > 120) {
        for (const id of SECTION_IDS) {
          const el = document.getElementById(id)
          if (el) {
            const rect = el.getBoundingClientRect()
            if (rect.top <= viewportMid && rect.bottom >= viewportMid) {
              activeId = id
              break
            }
          }
        }
      }

      try {
        sessionStorage.setItem('uandwe_active_section', activeId)
      } catch {
        // ignore
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[var(--site-bg)]">
      <Hero
        user={user}
        onLogout={onLogout}
        onNavigateToLogin={onNavigateToLogin}
        onNavigateToAnanda={onNavigateToAnanda}
        onNavigateToDara={onNavigateToDara}
        onNavigateToAura={onNavigateToAura}
        onNavigateToBlogs={onNavigateToBlogs}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToHome={() => {
          if (window.__lenis) {
            window.__lenis.scrollTo(0, { duration: 1.2 })
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }}
        anandaCategory={anandaCategory}
      />

      {/* What We Believe In Section (Moved directly below Hero) */}
      <WhatWeBelieveSection />

      {/* Geo Spatial Section */}
      <GeoSpatialSection onNavigateToAnanda={onNavigateToAnanda} />

      {/* Healthcare Section */}
      <HealthcareSection onNavigateToDara={onNavigateToDara} />

      {/* Aura / Physical AI Section */}
      <BoardSection onNavigateToAura={onNavigateToAura} />
    </div>
  )
}

