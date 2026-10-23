import { useState, useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import Header from './Header'
import MorphGallery from './ui/morph-gallery'

// Hero Slides: Company Vision & Product Engineering
const HERO_SLIDES = [
  {
    id: 'ideas-become-real',
    category: 'Design & Engineering',
    src: '/hero_ideas_real.jpg',
    thumb: '/hero_ideas_real.jpg',
    alt: 'Ideas Deserve to Become Real - Purposeful Design and Advanced Engineering',
    headline: 'Ideas Deserve to Become Real.',
    tagline: 'Turn ambitious thinking into tangible products',
    subtitle:
      'Turn ambitious thinking into tangible products through purposeful design and advanced engineering.',
    targetId: 'about',
    ctaText: 'DISCOVER OUR MISSION',
  },
  {
    id: 'more-than-meets-the-eye',
    category: 'Precision Systems',
    src: '/hero_precision_depth.jpg',
    thumb: '/hero_precision_depth.jpg',
    alt: 'More Than Meets the Eye - Precision and Intelligent Systems',
    headline: 'More Than Meets the Eye.',
    tagline: 'Precision and intelligent systems',
    subtitle:
      'Behind every remarkable product lies a world of precision, intelligent systems, and engineering that makes it work.',
    targetId: 'introduction',
    ctaText: 'EXPLORE OUR PRODUCTS',
  },
  {
    id: 'tomorrow-starts-today',
    category: 'Future Architecture',
    src: '/hero_tomorrow_build.jpg',
    thumb: '/hero_tomorrow_build.jpg',
    alt: 'Tomorrow Starts with What We Build Today - Clear Purpose and New Possibilities',
    headline: 'Tomorrow Starts with What We Build Today.',
    tagline: 'Products with a clear purpose',
    subtitle:
      'We create products with a clear purpose, designed to address real challenges and open new possibilities.',
    targetId: 'board',
    ctaText: 'VIEW LAB CAPABILITIES',
  },
]

const AUTOPLAY_DURATION = 5000 // 5 seconds per slide

export default function Hero({ user, onLogout, onNavigateToLogin }) {
  const [activeNav, setActiveNav] = useState('PROJECTS')
  const [isRevealed, setIsRevealed] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const readyTriggered = useRef(false)

  const currentSlide = HERO_SLIDES[slideIndex] || HERO_SLIDES[0]

  // Synchronize initial reveal: wait for hero image/WebGL to be ready, with a safety fallback
  const handleReady = () => {
    if (readyTriggered.current) return
    readyTriggered.current = true
    requestAnimationFrame(() => {
      setIsRevealed(true)
    })
  }

  useEffect(() => {
    // Safety fallback: if WebGL or image load takes longer than 350ms, reveal simultaneously
    const fallbackTimer = setTimeout(() => {
      handleReady()
    }, 350)

    return () => clearTimeout(fallbackTimer)
  }, [])

  // Automatic slide rotation
  useEffect(() => {
    if (!isRevealed || isPaused) return

    const timer = setInterval(() => {
      setSlideIndex((curr) => (curr + 1) % HERO_SLIDES.length)
    }, AUTOPLAY_DURATION)

    return () => clearInterval(timer)
  }, [isRevealed, isPaused])

  // Touch and Go Handler
  const handleSelectSlide = (idx) => {
    setSlideIndex(idx)
  }

  return (
    <div
      id="hero"
      className="min-h-screen relative flex flex-col justify-between overflow-hidden font-['Inter'] text-white select-text"
    >

      {/* Full-Bleed Artwork (Morph Gallery with WebGL noise dissolve transition) */}
      <div
        className={`absolute inset-0 w-full h-full z-0 overflow-hidden transition-all duration-1000 ease-out ${
          isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]'
        }`}
      >
        <MorphGallery
          items={HERO_SLIDES}
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
      {/* SEPARATE HEADER COMPONENT (Transparent Backdrop)          */}
      {/* ========================================================= */}
      <Header
        activeNav={activeNav}
        onNavChange={setActiveNav}
        user={user}
        onLogout={onLogout}
        onNavigateToLogin={onNavigateToLogin}
        isRevealed={isRevealed}
      />

      {/* ========================================================= */}
      {/* MAIN HERO CONTENT & DYNAMIC DOMAIN SYNCHRONIZATION        */}
      {/* ========================================================= */}
      <main className="relative z-10 flex-1 w-full flex items-center pointer-events-none pt-16 sm:pt-20 lg:pt-24 pb-8">

        {/* Left Content Area */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-14 lg:px-18 py-8 flex flex-col justify-center pointer-events-auto">
          <div className="max-w-2xl">

            {/* Master Content: Synchronized with Active Slide & Image Morph */}
            <div
              key={slideIndex}
              className={`transition-all duration-1000 ${
                isRevealed ? 'animate-hero-sync' : 'opacity-0'
              }`}
            >
              {/* Master Headline: Synchronized with Active Slide */}
              <div className="relative inline-block py-1">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-[64px] font-normal font-['Inter'] tracking-[0.03em] text-white uppercase leading-[1.08] select-text drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
                  {currentSlide.headline}
                </h1>
              </div>

              {/* Subtitle Paragraph: Synchronized with Active Slide */}
              <p className="mt-5 sm:mt-6 text-sm sm:text-[15.5px] text-white/90 font-normal leading-relaxed max-w-xl font-['Inter'] min-h-[64px] sm:min-h-[72px] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
                {currentSlide.subtitle}
              </p>

              {/* Action Button: EXPLORE PLATFORM ────○ */}
              <div className="mt-6 sm:mt-8">
                <a
                  href={`#${currentSlide.targetId}`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(currentSlide.targetId)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="inline-flex items-center gap-4 group cursor-pointer font-['Inter']"
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
      <nav
        aria-label="Hero Slide Navigation"
        className={`absolute bottom-6 sm:bottom-10 right-6 sm:right-12 lg:right-18 z-20 pointer-events-auto transition-all duration-1000 ${
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex items-center gap-3 sm:gap-4">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === slideIndex
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => handleSelectSlide(idx)}
                className={`relative aspect-square w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 outline-none group select-none ${
                  isActive
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
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </button>
            )
          })}
        </div>
      </nav>

    </div>
  )
}