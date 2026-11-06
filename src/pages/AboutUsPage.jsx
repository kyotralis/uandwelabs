import { useState, useEffect, useRef } from 'react'
import { ArrowRight, ArrowLeft, Quote } from 'lucide-react'
import Footer from '../components/Footer'
import CommonCta from '../components/CommonCta'
import { useTranslation } from '../i18n'

export default function AboutUsPage({
  user,
  onNavigateToHome,
  onNavigateToAnanda,
  onNavigateToDara,
  onNavigateToAura,
  onNavigateToBlogs,
  onNavigateToAbout,
  onNavigateToCareers,
  onNavigateToPrivacy,
  onNavigateToSecurity,
  onNavigateToTerms,
}) {
  const { t } = useTranslation()
  const ap = t.aboutPage || {}

  // Preserve scroll position on refresh
  useEffect(() => {
    let savedY = null
    try {
      savedY = sessionStorage.getItem('uandwe_about_scroll_y')
    } catch {}
    if (savedY && Number(savedY) > 20) {
      const scrollPos = Number(savedY)
      const restore = () => {
        if (window.__lenis) {
          window.__lenis.scrollTo(scrollPos, { immediate: true })
        } else {
          window.scrollTo({ top: scrollPos, behavior: 'instant' })
        }
      }
      restore()
      setTimeout(restore, 50)
      setTimeout(restore, 150)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      try {
        sessionStorage.setItem('uandwe_about_scroll_y', String(window.scrollY))
      } catch {}
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const frontiersRef = useRef(null)
  const lifecycleRef = useRef(null)
  const perspectivesRef = useRef(null)
  const [frontiersVisible, setFrontiersVisible] = useState(false)
  const [lifecycleVisible, setLifecycleVisible] = useState(false)
  const [perspectivesVisible, setPerspectivesVisible] = useState(false)

  useEffect(() => {
    const checkVisibility = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight
      if (frontiersRef.current) {
        const r = frontiersRef.current.getBoundingClientRect()
        setFrontiersVisible(r.top < vh - 40 && r.bottom > 0)
      }
      if (lifecycleRef.current) {
        const r = lifecycleRef.current.getBoundingClientRect()
        setLifecycleVisible(r.top < vh - 40 && r.bottom > 0)
      }
      if (perspectivesRef.current) {
        const r = perspectivesRef.current.getBoundingClientRect()
        setPerspectivesVisible(r.top < vh - 40 && r.bottom > 0)
      }
    }

    let frontiersObs = null
    let lifecycleObs = null
    let perspectivesObs = null
    if (typeof IntersectionObserver !== 'undefined') {
      frontiersObs = new IntersectionObserver(
        ([entry]) => {
          setFrontiersVisible(entry.isIntersecting)
        },
        { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
      )
      lifecycleObs = new IntersectionObserver(
        ([entry]) => {
          setLifecycleVisible(entry.isIntersecting)
        },
        { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
      )
      perspectivesObs = new IntersectionObserver(
        ([entry]) => {
          setPerspectivesVisible(entry.isIntersecting)
        },
        { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
      )
      if (frontiersRef.current) frontiersObs.observe(frontiersRef.current)
      if (lifecycleRef.current) lifecycleObs.observe(lifecycleRef.current)
      if (perspectivesRef.current) perspectivesObs.observe(perspectivesRef.current)
    }

    window.addEventListener('scroll', checkVisibility, { passive: true })
    window.addEventListener('resize', checkVisibility, { passive: true })
    checkVisibility()
    const t = setTimeout(checkVisibility, 80)

    return () => {
      window.removeEventListener('scroll', checkVisibility)
      window.removeEventListener('resize', checkVisibility)
      clearTimeout(t)
      if (frontiersObs) frontiersObs.disconnect()
      if (lifecycleObs) lifecycleObs.disconnect()
      if (perspectivesObs) perspectivesObs.disconnect()
    }
  }, [])

  const divisions = ap.divisions || [
    {
      tag: 'ENVIRONMENTAL SIMULATION',
      title: 'Ananda GeoSpatial',
      desc: 'Sub-meter solar ray-casting, Lattice Boltzmann fluid dynamics at 60 FPS, and 2D Saint-Venant flood hydrology for resilient masterplans.',
      linkText: 'Explore Ananda Platform',
      target: 'ananda',
      image: '/building-3.jpg',
    },
    {
      tag: 'ASSISTIVE HEALTHCARE',
      title: 'Dara Assistive Health',
      desc: 'Contactless 60 GHz fall radar, multi-language acoustic talking clock, and rise-to-wake torch engineered for elder independence with zero wearables.',
      linkText: 'Explore Dara Hardware',
      target: 'dara',
      image: '/dara_assistive_device.jpg',
    },
    {
      tag: 'PHYSICAL AI SILICON',
      title: 'Aura Autonomous Edge',
      desc: 'Deterministic 128-TOPS neural tensor cores executed in hardware cache. Sub-millisecond multilane highway LPR and 350m perimeter defense with zero cloud egress.',
      linkText: 'Explore Aura Node',
      target: 'aura',
      image: '/hero_compute_board.jpg',
    },
  ]

  const lifecycleSteps = ap.lifecycleSteps || [
    {
      num: '01',
      title: 'First-Principles Physics',
      desc: 'Before fabrication begins, every dynamic is modeled with mathematical solvers — from Navier-Stokes fluid aerodynamics to astronomical ephemeris solar ray-casting.',
    },
    {
      num: '02',
      title: 'Sub-Micron Prototyping',
      desc: 'Precision optical benches, CNC-milled structural housings, and 60 GHz millimeter-wave radomes engineered to aerospace tolerances in our Bengaluru labs.',
    },
    {
      num: '03',
      title: 'Deterministic Edge Silicon',
      desc: 'INT8 quantized neural networks executed directly within hardware cache. Sub-millisecond compute without internet connectivity or centralized servers.',
    },
    {
      num: '04',
      title: 'Empirical Field Validation',
      desc: 'Rigorous real-world stress testing across geriatric elder-care living spaces, multilane transit corridors, and microclimate wind corridors.',
    },
  ]

  const perspectives = ap.perspectives || [
    {
      quote:
        'Ananda fundamentally transformed our environmental masterplanning. Computing Lattice Boltzmann wind aerodynamics live in the design room eliminated three-day cloud queues completely.',
      name: 'Sarah Chen',
      role: 'Principal Environmental Architect',
      org: 'Studio Form & Light',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop&q=80',
    },
    {
      quote:
        'In elder care, the ethical line is absolute. Dara’s 60 GHz contactless radar delivers sub-300ms fall detection while preserving total human dignity. Zero cameras, zero wearable bracelets.',
      name: 'Dr. Rajesh Shenoy',
      role: 'Director of Geriatric Care',
      org: 'Manipal Health Network',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&auto=format&fit=crop&q=80',
    },
    {
      quote:
        'Deploying Aura’s 128-TOPS edge silicon on multi-lane transit corridors gave us sub-millisecond vehicle recognition at 180 km/h with zero external data egress. A masterclass in sovereign engineering.',
      name: 'Marcus Vance',
      role: 'Autonomous Mobility Architect',
      org: 'Apex Infrastructure Group',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&auto=format&fit=crop&q=80',
    },
  ]

  const handleDivisionClick = (target) => {
    if (target === 'ananda' && onNavigateToAnanda) {
      onNavigateToAnanda()
    } else if (target === 'dara' && onNavigateToDara) {
      onNavigateToDara()
    } else if (target === 'aura' && onNavigateToAura) {
      onNavigateToAura()
    }
  }

  return (
    <div className="bg-white min-h-screen text-neutral-900 w-full font-sans selection:bg-black selection:text-white">
      {/* ======================================================== */}
      {/* 1. IMMERSIVE HERO SECTION                                */}
      {/* ======================================================== */}
      <div className="relative w-full h-screen min-h-[600px] flex items-end pb-16 sm:pb-20 md:pb-24 pt-28 sm:pt-32 px-[4%] overflow-hidden bg-black">
        {/* Dynamic Image with subtle overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/building-3.jpg"
            alt="UandWe Labs Vision & Engineering"
            className="w-full h-full object-cover grayscale opacity-75 scale-100 hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/30 pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col justify-end">
          <div className="max-w-3xl">
            <div className="mb-4 sm:mb-6">
              <button
                type="button"
                onClick={() => {
                  if (onNavigateToHome) onNavigateToHome()
                  else if (typeof window !== 'undefined') window.location.hash = ''
                }}
                aria-label="Back to Home"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 group cursor-pointer shadow-lg hover:scale-105 active:scale-95 hover:border-white/40"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
            </div>
            <div className="relative inline-block py-1">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-[64px] font-normal font-['Inter'] tracking-[0.03em] text-white uppercase leading-[1.08] select-text drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
                {ap.heroTitle?.line1 || 'About UandWe Labs.'} <br />
                <span className="text-white">{ap.heroTitle?.line2 || 'Where Ideas Become Real.'}</span>
              </h1>
            </div>

            <p className="mt-5 sm:mt-6 text-sm sm:text-[15.5px] text-white font-normal leading-relaxed max-w-xl font-['Inter'] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              {ap.heroSubtitle ||
                'We bridge generative intelligence, environmental physics, and precision engineering to design sustainable, future-ready realities that serve humanity with dignity.'}
            </p>

            <div className="mt-7 sm:mt-9">
              <a
                href="#mission"
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById('mission')
                  if (el) {
                    if (window.__lenis) {
                      window.__lenis.scrollTo(el, { duration: 1.2 })
                    } else {
                      el.scrollIntoView({ behavior: 'smooth' })
                    }
                  }
                }}
                className="group relative inline-flex items-center gap-4 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white text-neutral-900 hover:bg-neutral-100 font-['Inter'] font-semibold text-xs sm:text-[13px] tracking-[0.14em] uppercase transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_15px_35px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>{ap.heroCta || 'Discover Our Mission'}</span>
                <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-neutral-800 group-hover:translate-x-1 transition-all duration-300 shadow-xs">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. ORIGIN & CONVICTION EDITORIAL SECTION                 */}
      {/* ======================================================== */}
      <div id="mission" className="w-full pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-16">
        <div className="max-w-[1560px] mx-auto px-6 sm:px-12 lg:px-16">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal font-['Inter'] uppercase tracking-tight text-neutral-950 leading-[1.05] mb-12 max-w-4xl">
            {ap.originTitle || 'The Pursuit of Tangible Truth'}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pt-4 border-t border-black/10">
            <div className="lg:col-span-6">
              <p className="text-base sm:text-lg text-neutral-700 font-normal leading-relaxed">
                {ap.originParagraph1 ||
                  'UandWe Labs was established in Bengaluru with a singular mandate: to bridge high-performance computational theory with uncompromising physical precision. In an era dominated by ephemeral software layers, we focus on what endures — deterministic fluid physics, sovereign edge silicon, and non-invasive assistive technology.'}
              </p>
            </div>
            <div className="lg:col-span-6">
              <p className="text-base sm:text-lg text-neutral-700 font-normal leading-relaxed">
                {ap.originParagraph2 ||
                  'Our multi-disciplinary team brings together computational fluid dynamicists, optical sensor architects, and biophilic system designers. We believe that true technological advancement must preserve personal dignity, foster human independence, and honor environmental boundaries.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. THREE FRONTIERS OF PHYSICAL REALITY (DIVISIONS BENTO) */}
      {/* ======================================================== */}
      <div className="w-full pt-10 sm:pt-14 md:pt-16 pb-8 sm:pb-12 md:pb-16 overflow-hidden">
        <div className="max-w-[1560px] mx-auto px-6 sm:px-12 lg:px-16">
          <div
            className="mb-12"
            style={{
              transform: frontiersVisible ? 'translateX(0)' : 'translateX(-80px)',
              opacity: frontiersVisible ? 1 : 0,
              transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 850ms cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform, opacity',
            }}
          >
            <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-neutral-900 uppercase font-sans">
              {ap.divisionsTitle || 'Three Frontiers of Physical Reality'}
            </h2>
          </div>

          <div
            ref={frontiersRef}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {divisions.map((div, idx) => (
              <div
                key={idx}
                onClick={() => handleDivisionClick(div.target)}
                className="group border border-black/10 bg-white hover:border-black transition-all duration-300 flex flex-col justify-between cursor-pointer rounded-2xl overflow-hidden hover:shadow-xl"
                style={{
                  transform: frontiersVisible ? 'translateX(0)' : 'translateX(-220px)',
                  opacity: frontiersVisible ? 1 : 0,
                  transition: 'transform 950ms cubic-bezier(0.16, 1, 0.3, 1), opacity 950ms cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: frontiersVisible ? `${idx * 160}ms` : '0ms',
                  willChange: 'transform, opacity',
                }}
              >
                <div>
                  <div className="aspect-[16/10] bg-neutral-100 overflow-hidden relative border-b border-black/10">
                    <img
                      src={div.image}
                      alt={div.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>

                  <div className="p-7 sm:p-8">
                    <h3 className="text-2xl font-normal tracking-tight text-neutral-900 mb-3 group-hover:text-black">
                      {div.title}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                      {div.desc}
                    </p>
                  </div>
                </div>

                <div className="px-7 sm:px-8 py-4.5 border-t border-black/10 flex items-center justify-between bg-neutral-50/50 group-hover:bg-neutral-100/60 transition-colors">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-900 font-medium">
                    {div.linkText}
                  </span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. THE ENGINEERING LIFECYCLE (4-STAGE METHODOLOGY)       */}
      {/* ======================================================== */}
      <div className="w-full pt-10 sm:pt-14 md:pt-16 pb-8 sm:pb-12 md:pb-16 overflow-hidden">
        <div className="max-w-[1560px] mx-auto px-6 sm:px-12 lg:px-16">
          <div
            className="mb-14 max-w-3xl"
            style={{
              transform: lifecycleVisible ? 'translateY(0)' : 'translateY(60px)',
              opacity: lifecycleVisible ? 1 : 0,
              transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 850ms cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform, opacity',
            }}
          >
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal font-['Inter'] uppercase tracking-tight text-neutral-950 leading-[1.05] mb-4">
              {ap.lifecycleTitle || 'The Engineering Lifecycle'}
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
              {ap.lifecycleSubtitle || 'How first-principles computation transforms into durable physical hardware.'}
            </p>
          </div>

          <div
            ref={lifecycleRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {lifecycleSteps.map((step, idx) => (
              <div
                key={idx}
                className="group border border-black/10 bg-white p-8 sm:p-9 flex flex-col justify-between hover:bg-black hover:border-black transition-all duration-500 cursor-default"
                style={{
                  transform: lifecycleVisible ? 'translateY(0)' : 'translateY(160px)',
                  opacity: lifecycleVisible ? 1 : 0,
                  transition:
                    'transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 850ms cubic-bezier(0.16, 1, 0.3, 1), background-color 500ms, border-color 500ms',
                  transitionDelay: lifecycleVisible ? `${idx * 120}ms` : '0ms',
                  willChange: 'transform, opacity',
                }}
              >
                <div>
                  <span className="text-3xl sm:text-4xl font-mono text-neutral-300 group-hover:text-neutral-500 font-normal block mb-6 transition-colors duration-500">
                    {step.num}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-neutral-950 group-hover:text-white mb-4 leading-snug transition-colors duration-500">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600 group-hover:text-neutral-300 text-sm leading-relaxed transition-colors duration-500">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. PEER & PARTNER PERSPECTIVES                           */}
      {/* ======================================================== */}
      <div className="w-full pt-10 sm:pt-14 md:pt-16 pb-8 sm:pb-12 md:pb-16 overflow-hidden">
        <div className="max-w-[1560px] mx-auto px-6 sm:px-12 lg:px-16">
          <div
            className="mb-14 max-w-3xl"
            style={{
              transform: perspectivesVisible ? 'translateX(0)' : 'translateX(-80px)',
              opacity: perspectivesVisible ? 1 : 0,
              transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 850ms cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform, opacity',
            }}
          >
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal font-['Inter'] uppercase tracking-tight text-neutral-950 leading-[1.05] mb-4">
              {ap.perspectivesTitle || 'Peer & Partner Perspectives'}
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
              {ap.perspectivesSubtitle || 'Reflections from architects, clinical directors, and infrastructure engineers building with UandWe Labs.'}
            </p>
          </div>

          <div
            ref={perspectivesRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {perspectives.map((p, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between border border-black/10 p-8 sm:p-10 bg-neutral-50/50 hover:bg-white hover:border-black transition-all duration-300 rounded-2xl hover:shadow-xl"
                style={{
                  transform: perspectivesVisible ? 'translateX(0)' : 'translateX(-220px)',
                  opacity: perspectivesVisible ? 1 : 0,
                  transition: 'transform 950ms cubic-bezier(0.16, 1, 0.3, 1), opacity 950ms cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: perspectivesVisible ? `${idx * 160}ms` : '0ms',
                  willChange: 'transform, opacity',
                }}
              >
                <div>
                  <div className="mb-6">
                    <Quote size={28} className="text-neutral-900/15" />
                  </div>
                  <p className="text-base sm:text-lg font-normal text-neutral-900 leading-relaxed mb-8">
                    "{p.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-black/10">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-11 h-11 rounded-full object-cover grayscale"
                  />
                  <div>
                    <h4 className="text-neutral-950 font-normal text-sm sm:text-base">
                      {p.name}
                    </h4>
                    <p className="text-neutral-500 text-xs tracking-wider">
                      {p.role} · {p.org}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 6. CALL TO ACTION / CAREERS                               */}
      {/* ======================================================== */}
      <CommonCta
        title={ap.ctaTitle || 'Ready to Build What Truly Matters?'}
        subtitle={ap.ctaDesc || 'We are continually expanding our research and engineering benches in Bengaluru. Work alongside fluid aerodynamicists, sensor architects, and computational designers.'}
        buttonText={ap.ctaButton || 'Explore Open Careers'}
        onButtonClick={() => {
          if (onNavigateToCareers) {
            onNavigateToCareers()
          } else if (onNavigateToHome) {
            onNavigateToHome()
            setTimeout(() => {
              document.getElementById('careers')?.scrollIntoView({ behavior: 'smooth' })
            }, 200)
          }
        }}
      />

      {/* ======================================================== */}
      {/* 7. GLOBAL SITE FOOTER                                    */}
      {/* ======================================================== */}
      <Footer
        onNavigateToHome={onNavigateToHome}
        onNavigateToAnanda={onNavigateToAnanda}
        onNavigateToDara={onNavigateToDara}
        onNavigateToAura={onNavigateToAura}
        onNavigateToBlogs={onNavigateToBlogs}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToCareers={onNavigateToCareers}
        onNavigateToPrivacy={onNavigateToPrivacy}
        onNavigateToSecurity={onNavigateToSecurity}
        onNavigateToTerms={onNavigateToTerms}
        user={user}
      />
    </div>
  )
}

