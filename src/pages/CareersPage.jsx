import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  X,
  MapPin,

} from 'lucide-react'
import Footer from '../components/Footer'
import CommonCta from '../components/CommonCta'
import { useTranslation } from '../i18n'

export default function CareersPage({
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
  const cp = t.careersPage || {}

  const lifeBenches = cp.lifeBenches || [
    {
      title: 'First-Principles Numerical Solvers',
      desc: 'Engineers continuously profile custom mathematical algorithms, large-scale spatial modeling kernels, and real-time physical simulation engines running on dedicated compute infrastructure.',
      tag: 'COMPUTATIONAL SIMULATION',
      image: '/ananda_hero.jpg',
    },
    {
      title: 'Precision Mechanics & Silicon Bring-Up',
      desc: 'Cross-functional teams design aerospace-grade enclosures, validate low-noise analog signal integrity, and test high-efficiency embedded microcontrollers built to operate for decades.',
      tag: 'RAPID PROTOTYPING & HARDWARE',
      image: '/about_team_brainstorm.jpg',
    },
    {
      title: 'Interdisciplinary Synthesis & Field Validation',
      desc: 'Applied scientists and systems architects collaborate on mathematical models, resilient embedded firmware, and real-world deployment infrastructure with zero cloud dependencies.',
      tag: 'UANDWE LABS BENCHES',
      image: '/about_indian_team_1.jpg',
    },
  ]

  const jobs = useMemo(() => {
    return cp.jobs || []
  }, [cp.jobs])

  const [activeJob, setActiveJob] = useState(null)
  const [isApplying, setIsApplying] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [applicationRef, setApplicationRef] = useState('')

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    portfolio: '',
    note: '',
  })

  const isRestoringRef = useRef(true)

  // Preserve and restore exact scroll position / section on page refresh
  useEffect(() => {
    let savedY = null
    let savedSection = null
    try {
      savedY = sessionStorage.getItem('uandwe_careers_scroll_y')
      savedSection = sessionStorage.getItem('uandwe_careers_active_section')
    } catch {}

    const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '').toLowerCase() : ''
    const validSections = ['hero', 'culture', 'life', 'openings', 'benefits', 'inquiry']
    const targetSection = (hash && validSections.includes(hash)) ? hash : savedSection

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
      const t2 = setTimeout(doScrollToSection, 120)
      const t3 = setTimeout(doScrollToSection, 300)
      const t4 = setTimeout(() => {
        doScrollToSection()
        isRestoringRef.current = false
      }, 600)

      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
        clearTimeout(t3)
        clearTimeout(t4)
      }
    } else if (savedY && Number(savedY) > 20) {
      const scrollPos = Number(savedY)
      const doScrollToY = () => {
        if (window.__lenis) {
          window.__lenis.scrollTo(scrollPos, { immediate: true })
        } else {
          window.scrollTo({ top: scrollPos, behavior: 'instant' })
        }
      }

      doScrollToY()
      const t1 = setTimeout(doScrollToY, 40)
      const t2 = setTimeout(doScrollToY, 120)
      const t3 = setTimeout(() => {
        doScrollToY()
        isRestoringRef.current = false
      }, 600)

      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
        clearTimeout(t3)
      }
    } else {
      isRestoringRef.current = false
    }
  }, [])

  // Lock body scroll when modal is active
  useEffect(() => {
    if (activeJob) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeJob])

  const cultureRef = useRef(null)
  const benchesRef = useRef(null)
  const benefitsRef = useRef(null)
  const jobCardRefs = useRef([])
  const lifeCardRefs = useRef([])
  const [cultureVisible, setCultureVisible] = useState(false)
  const [benchesVisible, setBenchesVisible] = useState(false)
  const [benefitsVisible, setBenefitsVisible] = useState(false)
  const [jobCardVisible, setJobCardVisible] = useState([])
  const [lifeCardVisible, setLifeCardVisible] = useState([])
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )

  const getJobDelay = (idx, isVisible) => {
    if (!isVisible) return '0ms'
    if (screenWidth >= 1024) return `${(idx % 3) * 120}ms`
    if (screenWidth >= 768) return `${(idx % 2) * 130}ms`
    return '0ms'
  }

  const getLifeCardDelay = (idx, isVisible) => {
    if (!isVisible) return '0ms'
    if (screenWidth >= 1024) return `${idx * 140}ms`
    return '0ms'
  }

  useEffect(() => {
    const checkVisibility = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight
      const vw = window.innerWidth || document.documentElement.clientWidth
      setScreenWidth(vw)

      if (cultureRef.current) {
        const r = cultureRef.current.getBoundingClientRect()
        setCultureVisible(r.top < vh - 40 && r.bottom > 20)
      }
      if (benchesRef.current) {
        const r = benchesRef.current.getBoundingClientRect()
        setBenchesVisible(r.top < vh - 40 && r.bottom > 20)
      }
      if (benefitsRef.current) {
        const r = benefitsRef.current.getBoundingClientRect()
        setBenefitsVisible(r.top < vh - 40 && r.bottom > 20)
      }

      // Check Life Inside UandWe Labs cards (animates whenever entering viewport)
      const lifeCount = lifeBenches.length
      const nextLife = new Array(lifeCount).fill(false)
      const isLifeInView = (el) => {
        if (!el) return false
        const r = el.getBoundingClientRect()
        return r.top < vh - 40 && r.bottom > 20
      }

      if (vw >= 1024) {
        // Desktop: all 3 cards in row animate together with stagger
        const anyLifeVis = lifeCardRefs.current.some((el) => isLifeInView(el))
        nextLife.fill(anyLifeVis)
      } else {
        // Tablet (iPad Mini / md) & Mobile: each card one by one from left
        for (let i = 0; i < lifeCount; i++) {
          nextLife[i] = isLifeInView(lifeCardRefs.current[i])
        }
      }

      setLifeCardVisible((prev) => {
        if (!prev || prev.length !== lifeCount) return nextLife
        for (let i = 0; i < lifeCount; i++) {
          if (prev[i] !== nextLife[i]) return nextLife
        }
        return prev
      })

      // Check job cards (animates whenever entering viewport)
      const jCount = jobs.length
      const nextJobs = new Array(jCount).fill(false)
      const isJobInView = (el) => {
        if (!el) return false
        const r = el.getBoundingClientRect()
        return r.top < vh - 40 && r.bottom > 20
      }

      if (vw >= 1024) {
        for (let i = 0; i < jCount; i += 3) {
          const row = []
          for (let j = i; j < Math.min(i + 3, jCount); j++) row.push(j)
          const vis = row.some((idx) => isJobInView(jobCardRefs.current[idx]))
          row.forEach((idx) => { nextJobs[idx] = vis })
        }
      } else if (vw >= 768) {
        for (let i = 0; i < jCount; i += 2) {
          const row = []
          for (let j = i; j < Math.min(i + 2, jCount); j++) row.push(j)
          const vis = row.some((idx) => isJobInView(jobCardRefs.current[idx]))
          row.forEach((idx) => { nextJobs[idx] = vis })
        }
      } else {
        for (let i = 0; i < jCount; i++) {
          nextJobs[i] = isJobInView(jobCardRefs.current[i])
        }
      }

      setJobCardVisible((prev) => {
        if (!prev || prev.length !== jCount) return nextJobs
        for (let i = 0; i < jCount; i++) {
          if (prev[i] !== nextJobs[i]) return nextJobs
        }
        return prev
      })

      // Continuously record scroll position and active section for refresh restoration
      if (!isRestoringRef.current && typeof window !== 'undefined') {
        try {
          sessionStorage.setItem('uandwe_careers_scroll_y', String(window.scrollY))

          const sections = ['inquiry', 'benefits', 'openings', 'life', 'culture', 'hero']
          let currentSection = 'hero'
          const vMid = window.innerHeight * 0.45

          for (const sId of sections) {
            const el = document.getElementById(sId)
            if (el) {
              const rect = el.getBoundingClientRect()
              if (rect.top <= vMid && rect.bottom >= vMid) {
                currentSection = sId
                break
              }
            }
          }
          sessionStorage.setItem('uandwe_careers_active_section', currentSection)
        } catch {}
      }
    }

    let cultureObs = null
    let benchesObs = null
    let benefitsObs = null
    let jobsObs = null
    if (typeof IntersectionObserver !== 'undefined') {
      cultureObs = new IntersectionObserver(
        ([entry]) => {
          setCultureVisible(entry.isIntersecting)
        },
        { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
      )
      benchesObs = new IntersectionObserver(
        ([entry]) => {
          setBenchesVisible(entry.isIntersecting)
        },
        { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
      )
      benefitsObs = new IntersectionObserver(
        ([entry]) => {
          setBenefitsVisible(entry.isIntersecting)
        },
        { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
      )
      jobsObs = new IntersectionObserver(
        () => {
          checkVisibility()
        },
        { threshold: [0, 0.1, 0.25], rootMargin: '0px 0px -40px 0px' }
      )

      if (cultureRef.current) cultureObs.observe(cultureRef.current)
      if (benchesRef.current) benchesObs.observe(benchesRef.current)
      if (benefitsRef.current) benefitsObs.observe(benefitsRef.current)
      jobCardRefs.current.forEach((el) => {
        if (el) jobsObs.observe(el)
      })
      lifeCardRefs.current.forEach((el) => {
        if (el) jobsObs.observe(el)
      })
    }

    window.addEventListener('scroll', checkVisibility, { passive: true })
    window.addEventListener('resize', checkVisibility, { passive: true })
    checkVisibility()
    const t = setTimeout(checkVisibility, 80)

    return () => {
      window.removeEventListener('scroll', checkVisibility)
      window.removeEventListener('resize', checkVisibility)
      clearTimeout(t)
      if (cultureObs) cultureObs.disconnect()
      if (benchesObs) benchesObs.disconnect()
      if (benefitsObs) benefitsObs.disconnect()
      if (jobsObs) jobsObs.disconnect()
    }
  }, [jobs.length, lifeBenches.length])

  const convictions = cp.convictions || [
    {
      num: '01',
      title: 'Curiosity Over Consensus',
      desc: 'The biggest breakthroughs happen when you question established conventions. We encourage bold experiments, challenging assumptions, and following curiosity wherever the data leads.',
    },
    {
      num: '02',
      title: 'High-Trust Autonomy',
      desc: 'We don’t believe in micro-management or endless status meetings. We hire brilliant, driven individuals, give them the best tools, and trust them to make decisions and execute.',
    },
    {
      num: '03',
      title: 'Obsessive Craftsmanship',
      desc: 'Details make the product. From elegant algorithmic architecture to precision physical materials, we hold ourselves to the highest standards of quality and refinement.',
    },
    {
      num: '04',
      title: 'Meaningful Impact',
      desc: 'We dedicate our careers to solving problems that truly matter. Every system we ship is built to improve lives, respect privacy, and leave a positive, enduring mark on the world.',
    },
  ]

  const benefits = cp.benefits || [
    {
      title: 'Uncapped Research Benches',
      desc: 'Direct access to cutting-edge FPGA stations, precision CNC milling, dedicated GPU clusters, and specialized RF anechoic chambers.',
    },
    {
      title: 'Intellectual Sovereignty',
      desc: 'Full co-authorship on patent filings, peer-reviewed technical journal publications, and open-source mathematical solver releases.',
    },
    {
      title: 'Comprehensive Health & Care',
      desc: '100% premium health, dental, and vision insurance for you and your dependents, plus mental wellness and clinical emergency support.',
    },
    {
      title: 'Bengaluru Campus & Relocation',
      desc: 'Comprehensive relocation packages to Bengaluru, ergonomic Herman Miller benches, catered nutritious meals, and high-performance mobile hardware.',
    },
  ]

  const handleOpenApplication = (job) => {
    setActiveJob(job)
    setIsApplying(true)
    setIsSubmitted(false)
  }

  const handleOpenGeneralInquiry = () => {
    setActiveJob({
      id: 'general-technical-inquiry',
      title: cp.spontaneousTitle || 'General Technical Fellowship / Inquiry',
      division: 'UandWe Research Labs · Bengaluru',
      location: 'Bengaluru, India · Flexible',
      type: 'Fellowship / Technical Role',
      desc: cp.spontaneousDesc || 'Spontaneous technical dossier directly to our founders and principal engineers.',
      skills: ['Computational Physics', 'RF & Radar', 'Edge Silicon', 'Embedded Systems'],
    })
    setIsApplying(true)
    setIsSubmitted(false)
  }

  const handleCloseModal = () => {
    setActiveJob(null)
    setIsApplying(false)
    setIsSubmitted(false)
    setIsSubmitting(false)
  }

  const handleSubmitApplication = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setApplicationRef(`UWE-TALENT-${Math.floor(1000 + Math.random() * 9000)}`)
    }, 900)
  }

  return (
    <div className="bg-white min-h-screen text-neutral-900 w-full font-sans selection:bg-black selection:text-white">
      {/* ======================================================== */}
      {/* 1. IMMERSIVE HERO SECTION                                */}
      {/* ======================================================== */}
      <div id="hero" className="relative w-full h-screen min-h-[640px] flex items-end pb-16 sm:pb-20 md:pb-24 pt-28 sm:pt-32 px-[4%] overflow-hidden bg-black">
        {/* Dynamic Visual with subtle overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/about_team_discussion.jpg"
            alt="UandWe Labs Engineering Careers"
            className="w-full h-full object-cover grayscale opacity-75 scale-100 hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-[1560px] mx-auto flex flex-col justify-end">
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
                {cp.heroTitle?.line1 || 'Build What Endures.'} <br />
                <span className="text-white">{cp.heroTitle?.line2 || 'Careers at UandWe Labs.'}</span>
              </h1>
            </div>

            <p className="mt-5 sm:mt-6 text-sm sm:text-[15.5px] text-white font-normal leading-relaxed max-w-xl font-['Inter'] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              {cp.heroSubtitle ||
                'We are expanding our research and engineering benches in Bengaluru. We bring together curious scientists, hardware craftsmen, and computational engineers building deep technology that truly endures.'}
            </p>

            <div className="mt-7 sm:mt-9">
              <a
                href="#openings"
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById('openings')
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
                <span>{cp.heroCta || 'Explore Open Positions'}</span>
                <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-neutral-800 group-hover:translate-x-1 transition-all duration-300 shadow-xs">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. CULTURE & WORKING CONVICTIONS (HOW WE WORK)           */}
      {/* ======================================================== */}
      <div id="culture" className="w-full pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-16 overflow-hidden">
        <div className="max-w-[1560px] mx-auto px-6 sm:px-12 lg:px-16">
          <div
            className="mb-14 max-w-3xl"
            style={{
              transform: cultureVisible ? 'translateY(0)' : 'translateY(60px)',
              opacity: cultureVisible ? 1 : 0,
              transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 850ms cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform, opacity',
            }}
          >
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal font-['Inter'] uppercase tracking-tight text-neutral-950 leading-[1.05] mb-4">
              {cp.cultureTitle || 'How We Work'}
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
              {cp.cultureSubtitle ||
                'Principles that shape our culture, our engineering standards, and the way we build together.'}
            </p>
          </div>

          <div
            ref={cultureRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {convictions.map((c, idx) => (
              <div
                key={idx}
                className="group border border-black/10 bg-white p-8 sm:p-9 flex flex-col justify-between hover:bg-black hover:border-black transition-all duration-500 cursor-default"
                style={{
                  transform: cultureVisible ? 'translateY(0)' : 'translateY(160px)',
                  opacity: cultureVisible ? 1 : 0,
                  transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 850ms cubic-bezier(0.16, 1, 0.3, 1), background-color 500ms, border-color 500ms',
                  transitionDelay: cultureVisible ? `${idx * 120}ms` : '0ms',
                  willChange: 'transform, opacity',
                }}
              >
                <div>
                  <span className="text-3xl sm:text-4xl font-mono text-neutral-300 group-hover:text-neutral-500 font-normal block mb-6 transition-colors duration-500">
                    {c.num}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-neutral-950 group-hover:text-white mb-4 leading-snug transition-colors duration-500">
                    {c.title}
                  </h3>
                  <p className="text-neutral-600 group-hover:text-neutral-300 text-sm leading-relaxed transition-colors duration-500">
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. LIFE INSIDE UANDWE LABS                               */}
      {/* ======================================================== */}
      <div id="life" className="w-full pt-10 sm:pt-14 md:pt-16 pb-8 sm:pb-12 md:pb-16 overflow-hidden">
        <div className="max-w-[1560px] mx-auto px-6 sm:px-12 lg:px-16">
          <div
            ref={benchesRef}
            className="mb-14 max-w-3xl"
            style={{
              transform: benchesVisible ? 'translateX(0)' : 'translateX(-80px)',
              opacity: benchesVisible ? 1 : 0,
              transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 850ms cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform, opacity',
            }}
          >
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal font-['Inter'] uppercase tracking-tight text-neutral-950 leading-[1.05] mb-4">
              {cp.benchesTitle || 'Life Inside UandWe Labs'}
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
              {cp.benchesSubtitle ||
                'Where theoretical physics converges with aerospace-grade fabrication and real-world deployment.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {lifeBenches.map((bench, idx) => (
              <div
                key={idx}
                ref={(el) => (lifeCardRefs.current[idx] = el)}
                className="group border border-black/10 bg-white hover:border-black transition-all duration-300 flex flex-col justify-between rounded-2xl overflow-hidden hover:shadow-xl"
                style={{
                  transform: lifeCardVisible[idx] ? 'translateX(0)' : 'translateX(-80px)',
                  opacity: lifeCardVisible[idx] ? 1 : 0,
                  transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 850ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms, border-color 300ms',
                  transitionDelay: getLifeCardDelay(idx, lifeCardVisible[idx]),
                  willChange: 'transform, opacity',
                }}
              >
                <div>
                  <div className="aspect-[16/10] bg-neutral-100 overflow-hidden relative border-b border-black/10">
                    <img
                      src={bench.image}
                      alt={bench.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  <div className="p-7 sm:p-8">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-2">
                      {bench.tag}
                    </span>
                    <h3 className="text-2xl font-normal tracking-tight text-neutral-900 mb-3 group-hover:text-black">
                      {bench.title}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {bench.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. OPEN ENGINEERING BENCHES (JOB ROLES & APPLICATION)    */}
      {/* ======================================================== */}
      <div id="openings" className="w-full pt-10 sm:pt-14 md:pt-16 pb-8 sm:pb-12 md:pb-16 bg-white overflow-hidden">
        <div className="max-w-[1560px] mx-auto px-6 sm:px-12 lg:px-16">
          <div className="mb-10 sm:mb-12 max-w-3xl">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal font-['Inter'] uppercase tracking-tight text-neutral-950 leading-[1.05] mb-4">
              {cp.openingsTitle || 'Open Engineering Benches'}
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
              {cp.openingsSubtitle ||
                'Current research and engineering openings across our benches in Bengaluru. Apply directly to our technical desk.'}
            </p>
          </div>

          {/* Jobs Grid (Continuous 3-Col Desktop / 2-Col Tablet / 1-Col Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {jobs.map((job, idx) => (
              <div
                key={job.id}
                ref={(el) => (jobCardRefs.current[idx] = el)}
                onClick={() => handleOpenApplication(job)}
                className="group border border-black/10 bg-white hover:border-black transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between cursor-pointer rounded-2xl hover:shadow-xl h-full"
                style={{
                  transform: jobCardVisible[idx] ? 'translateX(0)' : 'translateX(-60px)',
                  opacity: jobCardVisible[idx] ? 1 : 0,
                  transition:
                    'transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 850ms cubic-bezier(0.16, 1, 0.3, 1), border-color 300ms, box-shadow 300ms',
                  transitionDelay: getJobDelay(idx, jobCardVisible[idx]),
                  willChange: 'transform, opacity',
                }}
              >
                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded">
                      {job.division}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">
                      {job.type}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-neutral-950 mb-3 group-hover:text-black leading-snug">
                    {job.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs font-mono text-neutral-500 mb-5">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} />
                      {job.location}
                    </span>
                  </div>

                  <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                    {job.desc}
                  </p>

                  {/* Skills tags */}
                  {job.skills && (
                    <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                      {job.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded bg-neutral-50 border border-black/5 text-neutral-600 text-[11px] font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-5 border-t border-black/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-neutral-900 group-hover:translate-x-0.5 transition-transform">
                  <span className="font-semibold">{cp.applyButton || 'Apply for Bench'}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. THE FELLOWSHIP EXPERIENCE (BENEFITS & LIVING)         */}
      {/* ======================================================== */}
      <div id="benefits" className="w-full pt-10 sm:pt-14 md:pt-16 pb-8 sm:pb-12 md:pb-16 overflow-hidden">
        <div className="max-w-[1560px] mx-auto px-6 sm:px-12 lg:px-16">
          <div
            className="mb-14 max-w-3xl"
            style={{
              transform: benefitsVisible ? 'translateY(0)' : 'translateY(60px)',
              opacity: benefitsVisible ? 1 : 0,
              transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 850ms cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform, opacity',
            }}
          >
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal font-['Inter'] uppercase tracking-tight text-neutral-950 leading-[1.05] mb-4">
              {cp.benefitsTitle || 'The Fellowship Experience'}
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
              {cp.benefitsSubtitle ||
                'What we provide to support foundational research, intellectual sovereignty, and life.'}
            </p>
          </div>

          <div
            ref={benefitsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {benefits.map((b, idx) => (
              <div
                key={idx}
                className="group border border-black/10 bg-white p-8 sm:p-9 flex flex-col justify-between hover:bg-black hover:border-black transition-all duration-500 cursor-default"
                style={{
                  transform: benefitsVisible ? 'translateY(0)' : 'translateY(160px)',
                  opacity: benefitsVisible ? 1 : 0,
                  transition:
                    'transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 850ms cubic-bezier(0.16, 1, 0.3, 1), background-color 500ms, border-color 500ms',
                  transitionDelay: benefitsVisible ? `${idx * 120}ms` : '0ms',
                  willChange: 'transform, opacity',
                }}
              >
                <div>
                  <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-neutral-950 group-hover:text-white mb-3 leading-snug transition-colors duration-500">
                    {b.title}
                  </h3>
                  <p className="text-neutral-600 group-hover:text-neutral-300 text-sm leading-relaxed transition-colors duration-500">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 6. GENERAL INQUIRIES & FOUNDER NOTE                      */}
      {/* ======================================================== */}
      <div id="inquiry">
        <CommonCta
          title={cp.spontaneousTitle || 'Don’t See Your Exact Bench?'}
          subtitle={cp.spontaneousDesc || 'We are always looking for exceptional computational physicists, optical sensor designers, and low-level firmware hackers. Reach out directly to our founders.'}
          buttonText={cp.spontaneousButton || 'Send General Technical Inquiry'}
          onButtonClick={handleOpenGeneralInquiry}
        />
      </div>

      {/* ======================================================== */}
      {/* 7. APPLICATION & DOSSIER MODAL                           */}
      {/* ======================================================== */}
      <AnimatePresence>
        {activeJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-black/80 backdrop-blur-md overflow-y-auto"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white text-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-black/10 my-auto max-h-[92vh] flex flex-col"
            >
              {/* Modal Top Bar */}
              <div className="sticky top-0 z-20 px-6 sm:px-8 py-4.5 bg-white/95 backdrop-blur-md border-b border-black/10 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">
                    {cp.modal?.applyTitle || 'Bench Application'}
                  </span>
                  <h3 className="text-base sm:text-lg font-normal tracking-tight text-neutral-950 truncate max-w-sm sm:max-w-md">
                    {activeJob.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600 hover:text-black transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto p-6 sm:p-8 space-y-6 font-sans">
                {isSubmitted ? (
                  /* Success View */
                  <div className="py-10 text-center space-y-5">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                      <CheckCircle2 size={32} />
                    </div>

                    <h4 className="text-2xl font-normal tracking-tight text-neutral-950 uppercase">
                      {cp.modal?.successTitle || 'Application Received'}
                    </h4>

                    <p className="text-neutral-600 text-sm max-w-md mx-auto leading-relaxed">
                      {cp.modal?.successMsg ||
                        'Your dossier has been routed directly to our engineering desk in Bengaluru. We review all technical submissions within 48 hours.'}
                    </p>

                    <div className="p-4 bg-neutral-50 border border-black/10 rounded-2xl max-w-sm mx-auto font-mono text-xs text-neutral-700">
                      <span>{cp.modal?.bookingRef || 'APPLICATION REF · '}</span>
                      <span className="font-semibold">{applicationRef}</span>
                    </div>

                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="px-6 py-2.5 bg-black text-white text-xs font-mono uppercase tracking-wider rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
                      >
                        {cp.modal?.close || 'Done / Close'}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Application Form */
                  <form onSubmit={handleSubmitApplication} className="space-y-4">
                    <div className="p-4 bg-neutral-50 border border-black/10 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                        <span>{activeJob.division}</span>
                        <span>{activeJob.location}</span>
                      </div>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        {activeJob.desc}
                      </p>
                    </div>

                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                        {cp.modal?.fullName || 'Full Name'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Maya Lin"
                        className="w-full px-4 py-2.5 bg-neutral-50 focus:bg-white border border-neutral-300 focus:border-black rounded-xl text-sm outline-none transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                        {cp.modal?.email || 'Email Address'} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full px-4 py-2.5 bg-neutral-50 focus:bg-white border border-neutral-300 focus:border-black rounded-xl text-sm outline-none transition-all"
                      />
                    </div>

                    {/* Phone / WhatsApp */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                        {cp.modal?.phone || 'Phone / WhatsApp (Optional)'}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 bg-neutral-50 focus:bg-white border border-neutral-300 focus:border-black rounded-xl text-sm outline-none transition-all"
                      />
                    </div>

                    {/* Portfolio / GitHub / LinkedIn */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                        {cp.modal?.portfolio || 'Portfolio / GitHub / LinkedIn URL'} *
                      </label>
                      <input
                        type="url"
                        required
                        value={formData.portfolio}
                        onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                        placeholder="https://github.com/... or https://linkedin.com/in/..."
                        className="w-full px-4 py-2.5 bg-neutral-50 focus:bg-white border border-neutral-300 focus:border-black rounded-xl text-sm outline-none transition-all"
                      />
                    </div>

                    {/* Technical Problem Note */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                        {cp.modal?.note ||
                          'Tell us about a technical problem you solved from first principles...'} *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formData.note}
                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                        placeholder="Brief overview of an engineering, mathematical, or architectural problem you tackled..."
                        className="w-full px-4 py-2.5 bg-neutral-50 focus:bg-white border border-neutral-300 focus:border-black rounded-xl text-sm outline-none transition-all resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 bg-black hover:bg-neutral-800 disabled:bg-neutral-400 text-white font-mono text-xs uppercase tracking-wider rounded-full font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <span>{cp.modal?.submitting || 'Dispatching to Bench...'}</span>
                        ) : (
                          <>
                            <span>{cp.modal?.submit || 'Submit Application to Engineering Bench'}</span>
                            <ArrowRight size={14} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* 8. GLOBAL SITE FOOTER                                    */}
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
