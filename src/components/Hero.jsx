import { useState, useEffect, useRef, useMemo } from 'react'
import { ArrowRight } from 'lucide-react'
import MorphGallery from './ui/morph-gallery'
import HeroHeading from './ui/HeroHeading'
import { HERO_AUTOPLAY_DURATION } from '../constants/hero'
import { useTranslation } from '../i18n'
import { useCmsContent } from '../services/contentStore'
import AdminEditButton from './AdminEditButton'

// Hero Slides: Company Vision & Product Engineering (Order: Ananda -> Dara -> Aura)
const HERO_SLIDES = [
  {
    id: 'ananda-urban-physics',
    category: 'Urban Physics & CFD',
    src: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795433129/uandwelabs/cms/hero_ananda_urban_physics_1795433127739.jpg',
    thumb: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795433129/uandwelabs/cms/hero_ananda_urban_physics_1795433127739.jpg',
    alt: 'Ananda - Urban Physics & Microclimate CFD Architecture',
    headline: 'More Than Meets the Eye.',
    tagline: 'Precision and intelligent systems',
    subtitle:
      'Behind every remarkable building lies a world of precision urban physics, microclimate aerodynamics, and environmental engineering that makes it work.',
    targetId: 'introduction',
    ctaText: 'EXPLORE ANANDA',
  },
  {
    id: 'ideas-become-real',
    category: 'Design & Engineering',
    src: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795424401/uandwelabs/cms/Hands_Cradling_a_Dynamic_Heart_1795424399358.jpg',
    thumb: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795424401/uandwelabs/cms/Hands_Cradling_a_Dynamic_Heart_1795424399358.jpg',
    thumbStyle: { objectPosition: '72% 38%' },
    alt: 'Ideas Deserve to Become Real - Purposeful Design and Advanced Engineering',
    headline: 'Ideas Deserve to Become Real.',
    tagline: 'Turn ambitious thinking into tangible products',
    subtitle:
      'Turn ambitious thinking into tangible products through purposeful design and advanced engineering.',
    targetId: 'beliefs',
    ctaText: 'DISCOVER OUR MISSION',
  },
  {
    id: 'tomorrow-starts-today',
    category: 'Physical AI & Edge Vision',
    src: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795433117/uandwelabs/cms/aura_2_1795433115192.jpg',
    thumb: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795433117/uandwelabs/cms/aura_2_1795433115192.jpg',
    alt: 'Tomorrow Starts with What We Build Today - Aura Physical AI & Autonomous Edge Vision',
    headline: 'Tomorrow Starts with What We Build Today.',
    tagline: 'Products with a clear purpose',
    subtitle:
      'We create products with a clear purpose, designed to address real challenges and open new possibilities.',
    targetId: 'board',
    ctaText: 'VIEW LAB CAPABILITIES',
  },
]

const AUTOPLAY_DURATION = HERO_AUTOPLAY_DURATION

// Module-level flag so when returning to Home, hero is revealed immediately with 0ms delay
let heroHasRevealedOnce = false

export default function Hero({
  user,
  onLogout,
  onNavigateToLogin,
  onNavigateToAnanda,
  onNavigateToDara,
  onNavigateToAura,
  onNavigateToBlogs,
  onNavigateToAbout,
  onNavigateToHome,
  anandaCategory,
}) {
  const [activeNav, setActiveNav] = useState('PROJECTS')
  const [isRevealed, setIsRevealed] = useState(() => heroHasRevealedOnce)
  // Always start on the first slide (Index 0: Ananda - "More Than Meets the Eye")
  const [slideIndex, setSlideIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const readyTriggered = useRef(heroHasRevealedOnce)

  // Clear any legacy saved slide index so the homepage always opens on Slide 0
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem('uandwe_hero_slide_index')
      } catch { }
    }
  }, [])

  const [cmsHome] = useCmsContent('home')
  const { t } = useTranslation()

  const rawSlides = useMemo(() => {
    if (cmsHome?.heroSlides && Array.isArray(cmsHome.heroSlides) && cmsHome.heroSlides.length > 0) {
      return cmsHome.heroSlides
    }
    return HERO_SLIDES
  }, [cmsHome?.heroSlides])

  const localizedSlides = useMemo(() => {
    return rawSlides.map((slide, idx) => ({
      ...slide,
      category: slide.category || t.hero?.slides?.[idx]?.category,
      headline: slide.headline || t.hero?.slides?.[idx]?.headline,
      tagline: slide.tagline || t.hero?.slides?.[idx]?.tagline,
      subtitle: slide.subtitle || t.hero?.slides?.[idx]?.subtitle,
      ctaText: slide.ctaText || t.hero?.slides?.[idx]?.ctaText,
    }))
  }, [rawSlides, t])

  const currentSlide = localizedSlides[slideIndex] || localizedSlides[0]

  // Synchronize initial reveal: wait for hero image/WebGL to be ready, with a safety fallback
  const handleReady = () => {
    heroHasRevealedOnce = true
    if (readyTriggered.current) return
    readyTriggered.current = true
    setIsRevealed(true)
  }

  useEffect(() => {
    if (heroHasRevealedOnce) {
      setIsRevealed(true)
      return
    }
    // Safety fallback: if WebGL or image load takes longer than 200ms, reveal simultaneously
    const fallbackTimer = setTimeout(() => {
      handleReady()
    }, 200)

    return () => clearTimeout(fallbackTimer)
  }, [])

  // Automatic slide rotation
  useEffect(() => {
    if (!isRevealed || isPaused || localizedSlides.length === 0) return

    const timer = setInterval(() => {
      setSlideIndex((curr) => (curr + 1) % localizedSlides.length)
    }, AUTOPLAY_DURATION)

    return () => clearInterval(timer)
  }, [isRevealed, isPaused, localizedSlides.length])

  // Touch and Go Handler
  const handleSelectSlide = (idx) => {
    setSlideIndex(idx)
  }

  return (
    <div
      id="hero"
      className="min-h-screen relative flex flex-col justify-between overflow-hidden font-['Inter'] text-white select-text"
    >
      <AdminEditButton section="home" field="heroSlides" label="Hero Slides" variant="dark" position="hero" />

      {/* Full-Bleed Artwork (Morph Gallery with WebGL noise dissolve transition) - ALWAYS 100% visible */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden opacity-100">
        <MorphGallery
          items={localizedSlides}
          index={slideIndex}
          onIndexChange={handleSelectSlide}
          autoplay={0}
          duration={1200}
          height="100%"
          arrows={false}
          thumbnails={false}
          onReady={handleReady}
        />
        {/* Cinematic dark scrim over left side to ensure typography is 100% readable across all photos */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 via-50% to-transparent/10 pointer-events-none z-[1]" />
        <div className="absolute inset-0 bg-black/15 pointer-events-none z-[1]" />
      </div>

      {/* ========================================================= */}
      {/* MAIN HERO CONTENT & DYNAMIC DOMAIN SYNCHRONIZATION        */}
      {/* ========================================================= */}
      <main className="relative z-10 flex-1 w-full flex items-center pointer-events-none pt-16 sm:pt-20 lg:pt-24 pb-8">

        {/* Left Content Area */}
        <div className="relative z-10 w-full max-w-[1560px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 2xl:px-20 py-8 flex flex-col justify-center pointer-events-auto">
          <div className="max-w-2xl">

            {/* Master Content: Synchronized with Active Slide & Image Morph */}
            <div
              key={slideIndex}
              className={`transition-all duration-1000 ${isRevealed ? 'opacity-100' : 'opacity-0'
                }`}
            >
              {/* Master Headline: Centralized kinetic reveal animation */}
              <HeroHeading text={currentSlide.headline} />

              {/* Subtitle Paragraph: Staggered Soft Blur & Rise */}
              <p className="animate-hero-subtitle mt-5 sm:mt-6 text-sm sm:text-[15.5px] text-white font-normal leading-relaxed max-w-xl font-['Inter'] min-h-[64px] sm:min-h-[72px] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
                {currentSlide.subtitle}
              </p>

              {/* Action Button: Staggered Slide In */}
              <div className="animate-hero-cta mt-6 sm:mt-8">
                <a
                  href={`#${currentSlide.targetId}`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(currentSlide.targetId)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="inline-flex items-center gap-4 group cursor-pointer font-['Inter'] active:scale-[0.98] transition-transform duration-150"
                >
                  <span className="text-[11.5px] font-semibold tracking-[0.2em] uppercase text-white group-hover:text-white/80 transition-colors drop-shadow-sm">
                    {currentSlide.ctaText}
                  </span>

                  {/* Horizontal Extension Line */}
                  <div className="h-[1.5px] w-12 sm:w-16 bg-white/70 group-hover:w-20 sm:group-hover:w-24 transition-all duration-300" />

                  {/* Circular Arrow Button */}
                  <div className="w-8 h-8 rounded-full border border-white/60 bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-sm text-white">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </a>
              </div>

            </div>

          </div>
        </div>

      </main>

      {/* ========================================================= */}
      {/* CORNER DOWN SQUARE THUMBNAILS (Touch & Go, No Text/Line)  */}
      {/* ========================================================= */}
      <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 z-20 pointer-events-none">
        <div className="w-full max-w-[1560px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 2xl:px-20 flex justify-end">
          <nav
            aria-label="Hero Slide Navigation"
            className={`pointer-events-auto transition-all duration-1000 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              {localizedSlides.map((slide, idx) => {
                const isActive = idx === slideIndex
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => handleSelectSlide(idx)}
                    className={`relative aspect-square w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 outline-none group select-none ${isActive
                      ? 'border border-white scale-110 shadow-[0_12px_32px_rgba(0,0,0,0.65),0_0_16px_rgba(255,255,255,0.35)] opacity-100 z-10'
                      : 'border border-white/25 shadow-[0_8px_24px_rgba(0,0,0,0.45)] opacity-60 hover:opacity-100 hover:border-white/70 hover:scale-105'
                      }`}
                    title={`Switch to ${slide.headline}`}
                    aria-label={`Slide ${idx + 1}: ${slide.headline}`}
                    aria-current={isActive}
                  >
                    <img
                      src={slide.thumb || slide.src}
                      alt={slide.headline}
                      style={slide.thumbStyle || {}}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="eager"
                      decoding="async"
                    />
                  </button>
                )
              })}
            </div>
          </nav>
        </div>
      </div>

    </div>
  )
}
