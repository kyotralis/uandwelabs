import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ArrowLeft,
  X,
  Copy,
  CheckCircle2,
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
} from 'lucide-react'
import { useTranslation } from '../i18n'
import CommonCta from './CommonCta'
import ScrollReveal from './ui/ScrollReveal'
import { openAuthModal } from '../utils/authPrompt'
import { isUserAuthorizedForProduct } from '../utils/accountManager'

// ========================================================
// ANANDA-STYLE SCROLL ENTRANCE OBSERVER HOOK
// ========================================================
export function useAnandaInView(offset = 220) {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const check = () => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      // Triggers when section is comfortably inside viewport (~220px in)
      setIsInView(r.top < vh - offset && r.bottom > 60)
    }

    check()
    const t1 = setTimeout(check, 60)
    const t2 = setTimeout(check, 250)

    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check, { passive: true })

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [offset])

  return [ref, isInView]
}

const useInView = useAnandaInView

// ========================================================
// SHARED ANIMATION VARIANT
// ========================================================
const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

// ========================================================
// 1. PRODUCT HERO
// ========================================================
export function ProductHero({
  backgroundImage,
  imageAlt = 'Product Visual',
  title,
  description,
  buttonText = 'Schedule Pilot',
  onButtonClick,
  onBack,
}) {
  return (
    <div className="relative w-full h-screen min-h-[600px] flex items-end pb-16 md:pb-20 lg:pb-24 pt-28 sm:pt-32 px-6 sm:px-12 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <img
          src={backgroundImage}
          alt={imageAlt}
          className="w-full h-full object-cover grayscale opacity-75 scale-100 hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 pointer-events-none" />
      </div>

      {/* Top Floating Back Button (Positioned at the top below header) */}
      {onBack && (
        <div className="absolute top-24 sm:top-28 lg:top-32 left-0 right-0 z-20 pointer-events-none">
          <div className="w-full max-w-[1560px] 2xl:max-w-[1840px] mx-auto px-6 sm:px-12 lg:px-16 flex justify-start">
            <button
              type="button"
              onClick={onBack}
              aria-label="Back to Home"
              className="pointer-events-auto w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 group cursor-pointer shadow-lg hover:scale-105 active:scale-95 hover:border-white/40"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-[1560px] 2xl:max-w-[1840px] mx-auto flex flex-col justify-end">
        <div className="max-w-2xl">
          {/* Hero title */}
          <motion.div initial="hidden" animate="visible" variants={fadeUpVariant}>
            <div className="relative inline-block py-1">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-[64px] font-normal font-['Inter'] tracking-[0.03em] text-white uppercase leading-[1.08] select-text drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
                {title}
              </h1>
            </div>
          </motion.div>

          {/* Hero description paragraph (Commented out for now) */}
          {/* {description && (
            <p className="mt-5 sm:mt-6 text-sm sm:text-[15.5px] text-white font-normal leading-relaxed max-w-xl font-['Inter'] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              {description}
            </p>
          )} */}

          {/* Hero CTA button */}
          <div className="mt-7 sm:mt-9">
            <button
              onClick={onButtonClick}
              className="group inline-flex items-center gap-4 px-8 py-4 bg-white text-black hover:bg-neutral-900 hover:text-white border border-white transition-all duration-300 font-normal tracking-wide whitespace-nowrap text-sm uppercase cursor-pointer"
            >
              <span>{buttonText}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ========================================================
// 2. PRODUCT GALLERY (DYNAMIC RESPONSIVE MULTI-COLUMN)
// ========================================================
export function ProductGallery({ items = [], className = '' }) {
  if (!items || items.length === 0) return null
  const [ref, inView] = useAnandaInView(220)

  const gridClass =
    items.length === 2
      ? 'grid-cols-1 md:grid-cols-2'
      : items.length === 3
        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'

  return (
    <div ref={ref} className={`w-full pt-8 sm:pt-12 md:pt-14 pb-4 sm:pb-6 md:pb-8 overflow-hidden ${className}`}>
      <div className={`grid ${gridClass} gap-8 lg:gap-10 w-full items-start`}>
        {items.map((item, idx) => {
          const isDark = idx % 2 === 0
          return (
            <div
              key={item.id || idx}
              className={`aspect-[4/3] bg-neutral-100 relative group overflow-hidden border border-black/10 cursor-pointer ${
                idx % 2 === 1 ? 'mt-0 md:mt-12 lg:mt-16 xl:mt-20' : ''
              } ${item.className || ''}`}
              style={{
                transform: inView ? 'translateY(0)' : 'translateY(160px)',
                opacity: inView ? 1 : 0,
                transition: 'transform 1250ms cubic-bezier(0.16, 1, 0.3, 1), opacity 1250ms cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: inView ? `${idx * 160}ms` : '0ms',
                willChange: 'transform, opacity',
              }}
            >
              <img
                src={item.image || item.src}
                alt={item.alt || item.title}
                className={`w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ${item.imageClassName || ''}`}
              />
              <div
                className={`absolute bottom-0 left-0 p-6 sm:p-8 border-t border-r transition-colors duration-500 max-w-md ${
                  isDark
                    ? 'bg-black text-white border-white/20 group-hover:bg-white group-hover:text-black'
                    : 'bg-white text-neutral-900 border-black/10 group-hover:bg-black group-hover:text-white'
                }`}
              >
                <h3 className="text-xl sm:text-2xl font-normal tracking-tight mb-2">{item.title}</h3>
                <p
                  className={`text-sm font-normal transition-colors ${
                    isDark
                      ? 'text-neutral-300 group-hover:text-neutral-600'
                      : 'text-neutral-500 group-hover:text-neutral-300'
                  }`}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ========================================================
// 3. PRODUCT ARCHITECTURE GRID (CONTIGUOUS BORDER GRID)
//    Streamlined with unified ScrollReveal animation system
// ========================================================
export function ProductArchitectureGrid({ title, features = [], className = '' }) {
  return (
    <div className={`w-full py-6 sm:py-8 md:py-10 overflow-hidden ${className}`}>
      <ScrollReveal y={50}>
        <div className="max-w-3xl mb-6 md:mb-8">
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-neutral-900 uppercase">
            {title}
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-black/10 w-full">
        {features.map((feature, idx) => (
          <ScrollReveal
            key={idx}
            delay={(idx % 3) * 0.1}
            y={60}
            className="h-full border-b border-r border-black/10"
          >
            <div className="p-10 md:p-12 flex flex-col justify-start group hover:bg-black transition-colors duration-500 cursor-default h-full">
              <div className="text-neutral-900 group-hover:text-white transition-colors duration-500 mb-8">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-normal text-neutral-900 tracking-tight mb-4 group-hover:text-white transition-colors duration-500">
                {feature.title}
              </h3>

              <p className="text-neutral-500 font-normal text-sm leading-relaxed group-hover:text-neutral-400 transition-colors duration-500">
                {feature.desc}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}

// ========================================================
// 4. PRODUCT PILLARS GRID (4-COLUMN EDITORIAL)
//    Streamlined with unified ScrollReveal animation system
// ========================================================
export function ProductPillarsGrid({ title, pillars = [], className = '' }) {
  return (
    <div className={`w-full py-6 sm:py-8 md:py-10 overflow-hidden ${className}`}>
      {/* Section Header */}
      <ScrollReveal y={50}>
        <div className="max-w-3xl mb-6 md:mb-8">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal font-['Inter'] tracking-tight text-neutral-900 uppercase leading-[1.08]">
            {title}
          </h2>
        </div>
      </ScrollReveal>

      {/* 4-Column Editorial Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-black/10 w-full">
        {pillars.map((pillar, idx) => (
          <ScrollReveal
            key={pillar.title || idx}
            delay={(idx % 4) * 0.1}
            y={60}
            className="h-full border-b border-r border-black/10"
          >
            <div className="p-8 sm:p-10 flex flex-col justify-between group hover:bg-black transition-colors duration-500 cursor-default h-full">
              <div className="space-y-6">
                <div className="text-neutral-700 group-hover:text-white transition-colors duration-500 mb-8">
                  {pillar.icon}
                </div>

                <div>
                  <h3 className="text-2xl font-normal tracking-tight text-neutral-900 group-hover:text-white transition-colors duration-500 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 group-hover:text-neutral-400 transition-colors duration-500">
                    {pillar.tagline}
                  </p>
                </div>

                <p className="text-sm text-neutral-500 leading-relaxed font-normal group-hover:text-neutral-300 transition-colors duration-500">
                  {pillar.desc}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}

// ========================================================
// 5. PRODUCT DARK SHOWCASE (INVERTED HOVER TO WHITE)
//    Streamlined with unified ScrollReveal animation system
// ========================================================
export function ProductDarkShowcase({
  backgroundImage,
  title,
  cards = [],
  className = '',
}) {
  return (
    <div className={`w-full bg-black text-white py-10 sm:py-12 md:py-16 relative overflow-hidden ${className}`}>
      {/* Subtle Ambient Background Scrim with Grayscale Visual */}
      {backgroundImage && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover grayscale opacity-15 contrast-125 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.05),transparent_70%)]" />
        </div>
      )}

      <div className="px-6 sm:px-12 lg:px-16 max-w-[1560px] 2xl:max-w-[1840px] mx-auto w-full relative z-10">
        {/* Section Header */}
        <ScrollReveal y={50}>
          <div className="mb-6 md:mb-8 pb-6 border-b border-white/10">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal font-['Inter'] uppercase tracking-tight text-white leading-[1.08]">
              {title}
            </h2>
          </div>
        </ScrollReveal>

        {/* 3-Column Architectural Cards Grid with Inverted Hover to White */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card, idx) => (
            <ScrollReveal
              key={idx}
              delay={(idx % 3) * 0.12}
              y={60}
              className="h-full"
            >
              <div className="bg-neutral-950/85 backdrop-blur-2xl border border-white/15 p-8 sm:p-10 flex flex-col justify-start hover:bg-white hover:border-white transition-all duration-500 group cursor-default h-full">
                <h3 className="text-2xl sm:text-3xl font-normal text-white group-hover:text-black tracking-tight mb-4 transition-colors duration-500">
                  {card.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-400 group-hover:text-neutral-800 leading-relaxed font-normal transition-colors duration-500">
                  {card.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}

// ========================================================
// 6. PRODUCT PURPOSE STATEMENT (CENTERED WHITE MANIFESTO)
// ========================================================
export function ProductPurposeStatement({
  backgroundImage,
  imageAlt = 'Purpose Visual',
  line1,
  line2,
  description,
  className = '',
}) {
  return (
    <div className={`w-full py-10 sm:py-12 md:py-16 relative overflow-hidden bg-white text-neutral-900 group ${className}`}>
      {/* Subtle Ambient Background Scrim with Grayscale Imagery */}
      {backgroundImage && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src={backgroundImage}
            alt={imageAlt}
            className="w-full h-full object-cover grayscale opacity-10 contrast-125 scale-100 group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white" />
        </div>
      )}

      <div className="px-6 sm:px-12 lg:px-16 max-w-[1560px] 2xl:max-w-[1840px] mx-auto w-full relative z-10 flex flex-col items-center justify-center">
        <ScrollReveal y={60}>
          <div className="max-w-4xl mx-auto text-center space-y-6 flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal font-['Inter'] uppercase tracking-tight text-neutral-900 leading-[1.12] text-center">
              <span className="block">{line1}</span>
              <span className="block">{line2}</span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-neutral-600 font-normal leading-relaxed max-w-2xl text-center mx-auto">
              {description}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}

// ========================================================
// 7. PRODUCT CTA BOX (UNIFIED COMMON CTA)
// ========================================================
export function ProductCtaBox({
  title,
  subtitle,
  buttonText = 'Request Pilot',
  onButtonClick,
  className = '',
}) {
  return (
    <CommonCta
      title={title}
      subtitle={subtitle}
      buttonText={buttonText}
      onButtonClick={onButtonClick}
      className={className}
    />
  )
}

// Helper to check whether logged-in user is authorized for this product
export function isUserProductMatch(user, productKey) {
  return isUserAuthorizedForProduct(user, productKey);
}

// ========================================================
// 8. PRODUCT CONSULTATION MODAL
// ========================================================
const DEFAULT_SCOPE_OPTIONS = []

export function ProductConsultModal({
  open,
  onClose,
  user,
  onNavigateToLogin,
  productKey,
  title = 'Hardware Pilot Consultation',
  formTitle = 'Reserve Pilot Hardware',
  formSubtitle = 'Specify deployment criteria to evaluate pilot units in your facility.',
  nameLabel,
  namePlaceholder = 'Dr. Anandita Sen',
  emailLabel,
  emailPlaceholder = 'anandita@health.in',
  facilityLabel,
  facilityPlaceholder = 'Manipal Geriatric Wellness / Private Home',
  showScope = true,
  scopeLabel = 'Sector',
  scopeOptions = DEFAULT_SCOPE_OPTIONS,
  notesLabel,
  notesPlaceholder = 'Add any specific clinical or architectural requirements...',
  submitButtonText,
  meetingUrl = 'https://meet.uandwelabs.com/pilot-desk',
  departmentTitle = 'Hardware Engineering Operations',
  departmentSubtitle = 'Engineering & Clinical Architecture Desk',
}) {
  const { t } = useTranslation()
  const pm = t.productModal || {}

  // Determine whether modal belongs to dara, aura, or ananda
  const inferredProductKey =
    productKey ||
    (String(title).toLowerCase().includes('dara') || meetingUrl.includes('dara')
      ? 'dara'
      : String(title).toLowerCase().includes('aura') || meetingUrl.includes('aura')
      ? 'aura'
      : 'ananda')

  const matchesProduct = isUserProductMatch(user, inferredProductKey)

  const resolvedNameLabel = nameLabel || pm.yourName || 'Your Name'
  const resolvedEmailLabel = emailLabel || pm.emailAddress || 'Email Address'
  const resolvedFacilityLabel = facilityLabel || pm.facilityPractice || 'Facility / Practice'
  const resolvedNotesLabel = notesLabel || pm.deploymentNotes || 'Deployment Notes'
  const resolvedSubmitButtonText = submitButtonText || pm.proceedToSchedule || 'PROCEED TO ARCHITECT SCHEDULING'

  const [modalStep, setModalStep] = useState('form') // 'form' | 'schedule' | 'connect' | 'confirmed'
  const [formData, setFormData] = useState(() => ({
    name: matchesProduct ? (user?.name || '') : '',
    email: matchesProduct ? (user?.email || '') : '',
    facility: '',
    sector: scopeOptions[0]?.value || '',
    notes: '',
  }))

  const availableDates = pm.dates || ['Tomorrow, Nov 4', 'Wed, Nov 5', 'Thu, Nov 6']
  const [selectedDateIndex, setSelectedDateIndex] = useState(0)
  const selectedDate = availableDates[selectedDateIndex] || availableDates[0]
  const [selectedTime, setSelectedTime] = useState('11:00 AM')
  const [copiedLink, setCopiedLink] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)

  // Reset ONLY when modal transitions from closed to open
  const wasOpenRef = useRef(false)
  useEffect(() => {
    if (open && !wasOpenRef.current) {
      setModalStep('form')
      setCallDuration(0)
      setCopiedLink(false)
      setIsMuted(false)
      setIsVideoOff(false)
      const matches = isUserProductMatch(user, inferredProductKey)
      setFormData({
        name: matches ? (user?.name || '') : '',
        email: matches ? (user?.email || '') : '',
        facility: '',
        sector: scopeOptions[0]?.value || '',
        notes: '',
      })
    }
    wasOpenRef.current = open
  }, [open, user, inferredProductKey])

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && open) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  // Call timer
  useEffect(() => {
    let timer
    if (open && modalStep === 'connect') {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    } else {
      setCallDuration(0)
    }
    return () => clearInterval(timer)
  }, [open, modalStep])

  const formatCallTime = (secs) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(meetingUrl)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  if (!open) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ type: "spring", damping: 28, stiffness: 350, mass: 0.8 }}
          className="relative w-full max-w-2xl bg-white border border-black/20 shadow-2xl overflow-hidden z-10"
        >
          {/* Top Bar */}
          <div className="px-8 py-6 bg-black text-white flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-white">
                {title}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white cursor-pointer group flex items-center justify-center"
              aria-label="Close"
            >
              <X size={18} className="transition-transform duration-500 ease-in-out group-hover:rotate-180" />
            </button>
          </div>

          {/* Steps */}
          <AnimatePresence mode="wait">
            {/* Step 1: Form */}
            {modalStep === 'form' && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="p-8 space-y-6"
              >
                <div>
                  <h3 className="text-2xl font-normal text-neutral-900 tracking-tight uppercase">
                    {formTitle}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    {formSubtitle}
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (!isUserAuthorizedForProduct(user, inferredProductKey || 'dara')) {
                      if (onClose) onClose()
                      const msg =
                        inferredProductKey === 'aura'
                          ? 'Please sign in with your account to request an Aura technical pilot.'
                          : inferredProductKey === 'ananda'
                          ? 'Please sign in with your account to schedule a simulation consultation.'
                          : 'Please sign in with your account to request a Dara demo.'
                      openAuthModal({
                        title: 'Sign In Required',
                        message: msg,
                        productKey: inferredProductKey || 'dara',
                        actionText: 'Sign In / Register',
                      })
                      return
                    }
                    setModalStep('schedule')
                  }}
                  className="space-y-4 text-xs font-mono"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block uppercase text-neutral-600 mb-1 tracking-wider text-[11px]">{resolvedNameLabel}</label>
                      <input
                        type="text"
                        required
                        value={formData.name || ''}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder={namePlaceholder}
                        className="w-full px-4 py-3 bg-neutral-50 border border-black/15 text-neutral-900 focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block uppercase text-neutral-600 mb-1 tracking-wider text-[11px]">{resolvedEmailLabel}</label>
                      <input
                        type="email"
                        required
                        value={formData.email || ''}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder={emailPlaceholder}
                        className="w-full px-4 py-3 bg-neutral-50 border border-black/15 text-neutral-900 focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                  </div>

                  {showScope ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block uppercase text-neutral-600 mb-1 tracking-wider text-[11px]">{resolvedFacilityLabel}</label>
                        <input
                          type="text"
                          required
                          value={formData.facility || ''}
                          onChange={(e) => setFormData((prev) => ({ ...prev, facility: e.target.value }))}
                          placeholder={facilityPlaceholder}
                          className="w-full px-4 py-3 bg-neutral-50 border border-black/15 text-neutral-900 focus:outline-none focus:border-black transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block uppercase text-neutral-600 mb-1 tracking-wider text-[11px]">{scopeLabel}</label>
                        <select
                          value={formData.sector || ''}
                          onChange={(e) => setFormData((prev) => ({ ...prev, sector: e.target.value }))}
                          className="w-full px-4 py-3 bg-neutral-50 border border-black/15 text-neutral-900 focus:outline-none focus:border-black transition-colors"
                        >
                          {scopeOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block uppercase text-neutral-600 mb-1 tracking-wider text-[11px]">{resolvedFacilityLabel}</label>
                      <input
                        type="text"
                        required
                        value={formData.facility || ''}
                        onChange={(e) => setFormData((prev) => ({ ...prev, facility: e.target.value }))}
                        placeholder={facilityPlaceholder}
                        className="w-full px-4 py-3 bg-neutral-50 border border-black/15 text-neutral-900 focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block uppercase text-neutral-600 mb-1 tracking-wider text-[11px]">{resolvedNotesLabel}</label>
                    <textarea
                      rows={3}
                      value={formData.notes || ''}
                      onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                      placeholder={notesPlaceholder}
                      className="w-full px-4 py-3 bg-neutral-50 border border-black/15 text-neutral-900 focus:outline-none focus:border-black transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 bg-black hover:bg-neutral-800 text-white text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{resolvedSubmitButtonText}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 2: Schedule */}
            {modalStep === 'schedule' && (
              <motion.div
                key="schedule"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="p-8 space-y-6"
              >
                <div>
                  <h3 className="text-2xl font-normal text-neutral-900 tracking-tight uppercase">{pm.scheduleReviewTitle || 'Schedule Live Technical Review'}</h3>
                  <p className="text-xs text-neutral-500 mt-1">{pm.scheduleReviewDesc || 'Direct 1-on-1 session with our engineering team in Bengaluru.'}</p>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="block uppercase text-neutral-600 mb-2 tracking-wider text-[11px]">{pm.selectDate || 'Select Date'}</label>
                    <div className="grid grid-cols-3 gap-2">
                      {availableDates.map((d, idx) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setSelectedDateIndex(idx)}
                          className={`py-3 px-2 border text-center transition-colors cursor-pointer ${
                            selectedDateIndex === idx
                              ? 'bg-black text-white border-black font-semibold'
                              : 'bg-white text-neutral-700 border-black/15 hover:border-black'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase text-neutral-600 mb-2 tracking-wider text-[11px]">{pm.selectTime || 'Select Time (IST / UTC+5:30)'}</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['10:00 AM', '11:30 AM', '03:00 PM', '05:00 PM'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setSelectedTime(t)}
                          className={`py-3 px-2 border text-center transition-colors cursor-pointer ${
                            selectedTime === t
                              ? 'bg-black text-white border-black font-semibold'
                              : 'bg-white text-neutral-700 border-black/15 hover:border-black'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-black/10">
                  <button
                    type="button"
                    onClick={() => setModalStep('form')}
                    className="px-6 py-3.5 border border-black/15 text-xs font-mono uppercase tracking-wider text-neutral-700 hover:border-black cursor-pointer"
                  >
                    {pm.back || 'Back'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalStep('connect')}
                    className="flex-1 py-3.5 bg-black hover:bg-neutral-800 text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    {title?.toLowerCase().includes('aura') ? (pm.connectDeskTech || 'CONNECT TO TECHNICAL SILICON DESK') : (pm.connectDesk || 'CONNECT TO CLINICAL ENGINEERING DESK')}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Connect Simulator */}
            {modalStep === 'connect' && (
              <motion.div
                key="connect"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="p-8 space-y-6"
              >
                <div className="relative aspect-video bg-neutral-950 flex flex-col justify-between p-6 border border-black/20 text-white">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{pm.secureWebRtc || 'SECURE WEBRTC BRIDGE'}</span>
                    </div>
                    <span className="text-neutral-400">{formatCallTime(callDuration)}</span>
                  </div>

                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 border border-white/20 flex items-center justify-center mx-auto text-white text-xs font-mono tracking-widest">
                      LAB
                    </div>
                    <div className="text-sm font-normal uppercase tracking-wider">{departmentTitle}</div>
                    <div className="text-xs text-neutral-400 font-mono">{departmentSubtitle}</div>
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className={`p-3 text-white transition-colors cursor-pointer ${isMuted ? 'bg-red-600' : 'bg-neutral-800 hover:bg-neutral-700'}`}
                    >
                      {isMuted ? <MicOff size={16} /> : <Mic size={16} />}
                    </button>
                    <button
                      onClick={() => setIsVideoOff(!isVideoOff)}
                      className={`p-3 text-white transition-colors cursor-pointer ${isVideoOff ? 'bg-red-600' : 'bg-neutral-800 hover:bg-neutral-700'}`}
                    >
                      {isVideoOff ? <VideoOff size={16} /> : <Video size={16} />}
                    </button>
                    <button
                      onClick={() => setModalStep('confirmed')}
                      className="px-6 py-3 bg-white text-black hover:bg-neutral-200 text-xs font-mono uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                    >
                      <PhoneOff size={14} />
                      <span>{pm.endSession || 'END SESSION'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-neutral-50 border border-black/10 font-mono text-xs">
                  <span className="text-neutral-500 truncate mr-2">{meetingUrl}</span>
                  <button
                    onClick={handleCopyLink}
                    className="text-black font-medium hover:text-neutral-600 flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
                  >
                    {copiedLink ? <CheckCircle2 size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    <span>{copiedLink ? (pm.copied || 'Copied') : (pm.copy || 'Copy')}</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirmed */}
            {modalStep === 'confirmed' && (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="p-8 text-center space-y-4"
              >
                <div className="w-14 h-14 bg-neutral-100 text-black flex items-center justify-center mx-auto border border-black/10">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="text-2xl font-normal text-neutral-900 uppercase">{pm.confirmedTitle || 'Consultation Confirmed'}</h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                  {(pm.confirmationMessage || 'Thank you, {name}. Your session for {date} at {time} has been registered. An invitation has been dispatched to {email}.')
                    .replace('{name}', formData.name || 'valued partner')
                    .replace('{date}', selectedDate)
                    .replace('{time}', selectedTime)
                    .replace('{email}', formData.email || 'your email')}
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-8 py-3.5 bg-black hover:bg-neutral-800 text-white text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer"
                >
                  {pm.closeWindow || 'Close Window'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

