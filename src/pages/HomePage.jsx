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

  // 2. Restore section or scroll position upon refresh, hash URL, or query param
  useEffect(() => {
    if (typeof window === 'undefined') return

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const hash = window.location.hash.replace('#', '').toLowerCase()
    const urlParams = new URLSearchParams(window.location.search)
    const paramSection = urlParams.get('section')?.toLowerCase() || urlParams.get('field')?.toLowerCase()
    let savedSection = ''
    let savedY = ''
    try {
      savedSection = sessionStorage.getItem('uandwe_active_section') || sessionStorage.getItem('uandwe_home_section') || ''
      savedY = sessionStorage.getItem('uandwe_scroll_y') || ''
    } catch {}

    const targetSection =
      (hash && SECTION_IDS.includes(hash) ? hash : null) ||
      (paramSection && SECTION_IDS.includes(paramSection) ? paramSection : null) ||
      (savedSection && SECTION_IDS.includes(savedSection) && savedSection !== 'hero' ? savedSection : null)

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
      const t4 = setTimeout(() => {
        doScrollToSection()
        isRestoringRef.current = false
      }, 700)

      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
        clearTimeout(t3)
        clearTimeout(t4)
      }
    } else if (savedY && Number(savedY) > 80) {
      const doScrollY = () => {
        if (window.__lenis) {
          window.__lenis.scrollTo(Number(savedY), { immediate: true })
        } else {
          window.scrollTo({ top: Number(savedY), behavior: 'instant' })
        }
      }
      doScrollY()
      const t1 = setTimeout(doScrollY, 40)
      const t2 = setTimeout(doScrollY, 150)
      const t3 = setTimeout(() => {
        doScrollY()
        isRestoringRef.current = false
      }, 500)

      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
        clearTimeout(t3)
      }
    } else {
      // Default top position only if brand new visit
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
      isRestoringRef.current = false
    }
  }, [])

  // 3. Continuously track the active section smoothly without jank and keep URL/session in sync
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      if (isRestoringRef.current) return

      try {
        sessionStorage.setItem('uandwe_scroll_y', String(window.scrollY))
      } catch {}

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
        sessionStorage.setItem('uandwe_home_section', activeId)

        // Notify parent iframe (Admin) of section change so Admin knows exact section
        if (window.parent !== window) {
          window.parent.postMessage(
            {
              type: 'SECTION_CHANGE',
              section: activeId,
              path: activeId === 'hero' ? '/' : `/#${activeId}`,
              scrollY: window.scrollY,
            },
            '*'
          )
        }

        // Update URL hash gently without jumping or polluting history
        if (activeId !== 'hero') {
          if (window.location.hash !== `#${activeId}`) {
            window.history.replaceState(null, '', `#${activeId}`)
          }
        } else {
          if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname)
          }
        }
      } catch {}
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

