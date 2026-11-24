import { useState, useEffect, useRef, useMemo } from 'react'
import { Camera, Cpu, Shield, Lock, Radio, Zap, Scan, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react'
import MorphGallery from '../components/ui/morph-gallery'
import HeroHeading from '../components/ui/HeroHeading'
import { HERO_AUTOPLAY_DURATION } from '../constants/hero'
import AdminEditButton from '../components/AdminEditButton'
import { useTranslation } from '../i18n'
import { useCmsContent } from '../services/contentStore'
import { openAuthModal } from '../utils/authPrompt'
import { isUserAuthorizedForProduct } from '../utils/accountManager'
import {
  ProductGallery,
  ProductArchitectureGrid,
  ProductPillarsGrid,
  ProductDarkShowcase,
  ProductPurposeStatement,
  ProductCtaBox,
  ProductConsultModal,
} from '../components/ProductComponents'

// ==========================================
// AURA HERO SLIDES (MorphGallery WebGL)
// ==========================================
export const AURA_HERO_SLIDES = [
  {
    id: 'highway-lpr',
    category: 'Autonomous Highway Edge Vision',
    src: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795433117/uandwelabs/cms/aura_2_1795433115192.jpg',
    thumb: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795433117/uandwelabs/cms/aura_2_1795433115192.jpg',
    alt: 'Aura LPR - Multilane Expressway Vehicle Perception & License Plate Recognition',
    headline: 'Physical AI. Silicon at the Edge.',
    subtitle:
      'Deterministic 128-TOPS neural inferencing directly inside hardened optical sensor nodes. Sub-millisecond vehicle tracking across 6 expressway lanes with zero cloud egress.',
    ctaText: 'Request Pilot Demo',
  },
  {
    id: 'perimeter-mesh',
    category: 'Critical Infrastructure Defense',
    src: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795433121/uandwelabs/cms/aura_sentinel_ladybug_1795433118929.jpg',
    thumb: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795433121/uandwelabs/cms/aura_sentinel_ladybug_1795433118929.jpg',
    alt: 'Aura Sentinel - 350M Coordinated Perimeter Mesh & Threat Tracking',
    headline: 'Coordinated Perimeter Mesh.',
    subtitle:
      'Autonomous multi-node target handoff tracks human and vehicular vectors over 350 meters with zero blind spots, micro-lux night optics, and predictive intrusion alerts.',
    ctaText: 'Request Pilot Demo',
  },
  {
    id: 'campus-checkpoint',
    category: 'Mission-Critical Access Intelligence',
    src: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795433123/uandwelabs/cms/aura_vision_ladybug_1795433121288.jpg',
    thumb: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795433123/uandwelabs/cms/aura_vision_ladybug_1795433121288.jpg',
    alt: 'Aura Biomimetic Node - Ladybug-Inspired Autonomous Edge Vision Sensor',
    headline: 'Air-Gapped Autonomous Vision.',
    subtitle:
      'Raw video never exits the camera node. FIPS 140-2 Level 3 armored cryptography and hardware root-of-trust ensure permanent physical security and absolute data sovereignty.',
    ctaText: 'Request Pilot Demo',
  },
]

// ==========================================
// AURA DATA SPECIFICATION
// ==========================================
const AURA_GALLERY = [
  {
    image: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795433117/uandwelabs/cms/aura_2_1795433115192.jpg',
    title: 'Multilane Highway LPR',
    desc: 'Real-time optical character and vehicle identification at speeds up to 180 km/h with sub-millisecond precision.',
  },
  {
    image: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795433121/uandwelabs/cms/aura_sentinel_ladybug_1795433118929.jpg',
    title: '350M Perimeter Mesh',
    desc: 'Multi-camera spatial target handoff detects and tracks perimeter vectors across 350 meters with zero blind spots.',
  },
]

const RAW_AURA_FEATURES = [
  {
    icon: <Camera size={24} strokeWidth={1.5} />,
    title: 'High-Speed LPR & Vehicle Analytics',
    desc: 'Identifies license plates, vehicle classifications, and velocities across multiple highway lanes in under 0.8 milliseconds with 99.8% precision.',
  },
  {
    icon: <Cpu size={24} strokeWidth={1.5} />,
    title: '128-TOPS On-Chip NPU Core',
    desc: 'Executes INT8 quantized deep neural inferencing directly in hardware cache. Raw video frames never leave the sensor node, eliminating cloud roundtrips.',
  },
  {
    icon: <Radio size={24} strokeWidth={1.5} />,
    title: '350M Coordinated Perimeter Mesh',
    desc: 'Autonomous multi-node target handoff tracks human and vehicular vectors over 350 meters with zero blind spots and predictive intrusion alerting.',
  },
  {
    icon: <Zap size={24} strokeWidth={1.5} />,
    title: 'Sub-Millisecond Actuation Relay',
    desc: 'Direct dry-contact relays trigger barrier gates, optical strobes, and perimeter interlocks in under 1.2 milliseconds — faster than human nerve reaction.',
  },
  {
    icon: <Shield size={24} strokeWidth={1.5} />,
    title: 'FIPS 140-2 Level 3 Armored Cryptography',
    desc: 'Hardware root-of-trust, cryptographic secure boot, and anti-tamper zeroization circuitry protect critical defense credentials and classified metadata.',
  },
  {
    icon: <Lock size={24} strokeWidth={1.5} />,
    title: '100% Air-Gapped Network Autonomy',
    desc: 'Operates completely severed from external cloud networks. Zero recurring bandwidth fees, zero telemetry leaks, and zero downtime during fiber cuts.',
  },
]

const AURA_PILLARS = [
  {
    title: 'Speed',
    tagline: 'Sub-millisecond reaction time.',
    desc: 'From photon strike on CMOS glass to physical dry-contact barrier relay in 1.2 ms — executing deterministic edge perception faster than human optical reflex.',
    icon: <Zap size={24} strokeWidth={1.5} />,
  },
  {
    title: 'Precision',
    tagline: '99.8% deterministic accuracy.',
    desc: 'Deep tensor convolution eliminates false positives from shadows, weather, and headlight glare across all four lanes under low-lux lighting conditions.',
    icon: <Scan size={24} strokeWidth={1.5} />,
  },
  {
    title: 'Resilience',
    tagline: 'Hardened for harsh environments.',
    desc: 'IP68 ingress and IK10 vandal dome inside extruded 6061-T6 aluminum with passive convective cooling from -40°C to +75°C without moving mechanical fans.',
    icon: <ShieldCheck size={24} strokeWidth={1.5} />,
  },
  {
    title: 'Sovereignty',
    tagline: 'Complete data ownership.',
    desc: '100% on-premises execution. Video data stays completely local on the camera node with zero third-party cloud subscription fees or compliance exposure.',
    icon: <Lock size={24} strokeWidth={1.5} />,
  },
]

const AURA_DARK_CARDS = [
  {
    title: 'Raw video never leaves the camera.',
    desc: 'Unlike conventional cloud CCTV systems that stream unencrypted private footage across third-party networks, Aura processes all frames directly on local silicon. Only verified metadata alerts exit the hardware.',
  },
  {
    title: 'Zero vulnerability to network outages.',
    desc: "Perimeter protection cannot depend on internet uptime. Severed fiber cables, jamming attacks, or external ISP down-times have zero impact on Aura's continuous, autonomous local defense.",
  },
  {
    title: 'Zero recurring compute or bandwidth fees.',
    desc: 'Eliminate perpetual AWS Kinesis and Azure GPU ingestion fees. Aura is a permanent silicon asset that executes uninterrupted, high-throughput machine vision with zero recurring monthly compute costs.',
  },
]

const AURA_SCOPE_OPTIONS = [
  { value: 'highway', label: 'High-Speed Arterial Highway LPR' },
  { value: 'perimeter', label: '350m Critical Infrastructure Perimeter' },
  { value: 'logistics', label: 'Industrial Warehouse & Logistics Safety' },
  { value: 'campus', label: 'Enterprise High-Security Corporate Campus' },
]

// Module-level flag so returning to Aura shows hero content immediately
let auraHeroRevealedOnce = false

export default function AuraPage({
  user,
  onLogout,
  onNavigateToHome,
  onNavigateBack,
  onNavigateToLogin,
  onNavigateToAnanda,
  onNavigateToDara,
  onNavigateToAura,
  onNavigateToBlogs,
  onNavigateToAbout,
  onNavigateToCareers,
  onNavigateToPrivacy,
  onNavigateToTerms,
}) {
  const [cmsAura] = useCmsContent('aura')
  const { t } = useTranslation()
  const ap = t.auraPage || {}

  const [modalOpen, setModalOpen] = useState(false)

  // Multi-Slide WebGL Morph Hero States (Identical to Homepage Hero)
  const [activeHeroIndex, setActiveHeroIndex] = useState(0)
  const [isHeroRevealed, setIsHeroRevealed] = useState(() => auraHeroRevealedOnce)
  const [isHeroPaused, setIsHeroPaused] = useState(false)
  const heroReadyTriggered = useRef(auraHeroRevealedOnce)

  const heroSlides = useMemo(() => {
    const base = (cmsAura?.heroSlides && Array.isArray(cmsAura.heroSlides) && cmsAura.heroSlides.length > 0)
      ? cmsAura.heroSlides
      : AURA_HERO_SLIDES

    return base.map((slide, idx) => ({
      ...slide,
      headline: slide.headline || ap.heroSlides?.[idx]?.headline,
      category: slide.category || ap.heroSlides?.[idx]?.category,
      subtitle: slide.subtitle || ap.heroSlides?.[idx]?.subtitle,
      ctaText: slide.ctaText || ap.heroSlides?.[idx]?.ctaText,
    }))
  }, [cmsAura?.heroSlides, ap.heroSlides])

  const handleHeroReady = () => {
    auraHeroRevealedOnce = true
    if (heroReadyTriggered.current) return
    heroReadyTriggered.current = true
    setIsHeroRevealed(true)
  }

  useEffect(() => {
    if (auraHeroRevealedOnce) {
      setIsHeroRevealed(true)
      return
    }
    const fallbackTimer = setTimeout(() => {
      handleHeroReady()
    }, 200)
    return () => clearTimeout(fallbackTimer)
  }, [])

  // Auto-play hero slide rotation (synchronized with noise dissolve WebGL transition)
  useEffect(() => {
    if (!isHeroRevealed || isHeroPaused || heroSlides.length === 0) return
    const timer = setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % heroSlides.length)
    }, HERO_AUTOPLAY_DURATION)
    return () => clearInterval(timer)
  }, [isHeroRevealed, isHeroPaused, heroSlides.length])

  const handleSelectHeroSlide = (idx) => {
    setActiveHeroIndex(idx)
  }

  const currentHeroSlide = heroSlides[activeHeroIndex] || heroSlides[0]

  // Localized data structures
  const gallery = useMemo(() => {
    const rawList = (cmsAura?.gallery && Array.isArray(cmsAura.gallery) && cmsAura.gallery.length > 0)
      ? cmsAura.gallery
      : (ap.gallery || AURA_GALLERY)
    const list = rawList.filter((item) => !item.title?.toLowerCase().includes('biomimetic'))
    return list.map((item, idx) => ({
      ...item,
      image: item.src || item.image || AURA_GALLERY[idx]?.image,
    }))
  }, [cmsAura?.gallery, ap.gallery])

  const features = useMemo(() => {
    const icons = [
      <Camera key="c1" size={24} strokeWidth={1.5} />,
      <Cpu key="c2" size={24} strokeWidth={1.5} />,
      <Radio key="c3" size={24} strokeWidth={1.5} />,
      <Zap key="c4" size={24} strokeWidth={1.5} />,
      <Shield key="c5" size={24} strokeWidth={1.5} />,
      <Lock key="c6" size={24} strokeWidth={1.5} />,
    ]
    if (cmsAura?.features && Array.isArray(cmsAura.features) && cmsAura.features.length > 0) {
      return cmsAura.features.map((item, idx) => ({
        ...item,
        icon: icons[idx % icons.length],
      }))
    }
    const list = ap.features || RAW_AURA_FEATURES
    return list.map((item, idx) => ({
      ...item,
      icon: icons[idx] || RAW_AURA_FEATURES[idx]?.icon,
    }))
  }, [cmsAura?.features, ap.features])

  const pillars = useMemo(() => {
    const icons = [
      <Zap key="p1" size={24} strokeWidth={1.5} />,
      <Scan key="p2" size={24} strokeWidth={1.5} />,
      <ShieldCheck key="p3" size={24} strokeWidth={1.5} />,
      <Lock key="p4" size={24} strokeWidth={1.5} />,
    ]
    if (cmsAura?.pillars && Array.isArray(cmsAura.pillars) && cmsAura.pillars.length > 0) {
      return cmsAura.pillars.map((item, idx) => ({
        ...item,
        icon: icons[idx % icons.length],
      }))
    }
    const list = ap.pillars || AURA_PILLARS
    return list.map((item, idx) => ({
      ...item,
      icon: icons[idx] || AURA_PILLARS[idx]?.icon,
    }))
  }, [cmsAura?.pillars, ap.pillars])

  const darkCards = useMemo(() => {
    if (cmsAura?.security?.cards && Array.isArray(cmsAura.security.cards) && cmsAura.security.cards.length > 0) {
      return cmsAura.security.cards
    }
    return ap.darkCards || AURA_DARK_CARDS
  }, [cmsAura?.security?.cards, ap.darkCards])

  const purposeData = useMemo(() => {
    return cmsAura?.purpose || ap.purpose || {}
  }, [cmsAura?.purpose, ap.purpose])

  const ctaData = useMemo(() => {
    return cmsAura?.cta || ap.cta || {}
  }, [cmsAura?.cta, ap.cta])

  const securityData = useMemo(() => {
    return cmsAura?.security || {}
  }, [cmsAura?.security])
  const scopeOptions = ap.modal?.scopeOptions || AURA_SCOPE_OPTIONS

  return (
    <div className="bg-white min-h-screen text-neutral-900 w-full font-sans selection:bg-black selection:text-white">
      {/* 1. IMMERSIVE HERO SECTION (MorphGallery WebGL Shader & Homepage Hero Animation) */}
      <div className="min-h-screen relative flex flex-col justify-between overflow-hidden font-['Inter'] text-white select-text">
        <AdminEditButton section="aura" field="heroSlides" label="Hero Slides" variant="dark" position="hero" />
        {/* Full-Bleed Artwork (Morph Gallery with WebGL noise dissolve transition) */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden opacity-100">
          <MorphGallery
            items={heroSlides}
            index={activeHeroIndex}
            onIndexChange={handleSelectHeroSlide}
            autoplay={0}
            duration={1200}
            height="100%"
            arrows={false}
            thumbnails={false}
            onReady={handleHeroReady}
          />
          {/* Cinematic dark scrims to ensure pristine typography legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 via-50% to-transparent/10 pointer-events-none z-[1]" />
          <div className="absolute inset-0 bg-black/15 pointer-events-none z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 pointer-events-none z-[1]" />
        </div>

        {/* Top Back Navigation Button */}
        <div className="absolute top-24 sm:top-28 lg:top-32 left-0 right-0 z-20 pointer-events-none">
          <div className="w-full max-w-[1560px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 2xl:px-20 flex justify-start">
            <button
              type="button"
              onClick={() => {
                if (onNavigateBack) {
                  onNavigateBack()
                } else if (typeof window !== 'undefined' && window.history.length > 1) {
                  window.history.back()
                } else if (onNavigateToHome) {
                  onNavigateToHome()
                }
              }}
              aria-label="Back to Previous Page"
              className="pointer-events-auto w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 group cursor-pointer shadow-lg hover:scale-105 active:scale-95 hover:border-white/40"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* MAIN HERO CONTENT (Identical layout to Homepage Hero) */}
        <main className="relative z-10 flex-1 w-full flex items-center pointer-events-none pt-20 sm:pt-24 lg:pt-28 pb-12">
          <div className="relative z-10 w-full max-w-[1560px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 2xl:px-20 py-8 flex flex-col justify-center pointer-events-auto">
            <div className="max-w-3xl">
              <div
                key={activeHeroIndex}
                className={`transition-all duration-1000 ${isHeroRevealed ? 'animate-hero-sync' : 'opacity-0'
                  }`}
              >
                {/* Category Tag */}
                <div className="mb-3">
                  <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-300 font-medium">
                    {currentHeroSlide.category}
                  </span>
                </div>

                {/* Master Headline: Centralized kinetic reveal animation */}
                <HeroHeading text={currentHeroSlide.headline} />

                {/* Subtitle Paragraph */}
                <p className="mt-5 sm:mt-6 text-sm sm:text-[15.5px] text-white font-normal leading-relaxed max-w-xl font-['Inter'] min-h-[64px] sm:min-h-[72px] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
                  {currentHeroSlide.subtitle}
                </p>

                {/* Action Button: REQUEST PILOT DEMO ────○ */}
                <div className="mt-6 sm:mt-8">
                  <button
                    type="button"
                    onClick={() => {
                      if (!isUserAuthorizedForProduct(user, 'aura')) {
                        openAuthModal({
                          title: 'Sign In Required',
                          message: 'Please sign in with your account to request an Aura technical pilot.',
                          productKey: 'aura',
                          actionText: 'Sign In / Register',
                        })
                        return
                      }
                      setModalOpen(true)
                    }}
                    className="inline-flex items-center gap-4 group cursor-pointer font-['Inter'] active:scale-[0.98] transition-transform duration-150"
                  >
                    <span className="text-[11.5px] font-semibold tracking-[0.2em] uppercase text-white group-hover:text-white/80 transition-colors drop-shadow-sm">
                      {currentHeroSlide.ctaText || ap.heroButtonText || 'Request Pilot Demo'}
                    </span>

                    {/* Horizontal Extension Line */}
                    <div className="h-[1.5px] w-12 sm:w-16 bg-white/70 group-hover:w-20 sm:group-hover:w-24 transition-all duration-300" />

                    {/* Circular Arrow Button */}
                    <div className="w-8 h-8 rounded-full border border-white/60 bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-sm text-white">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* CORNER DOWN SQUARE THUMBNAILS (Touch & Go, Identical to Homepage Hero) */}
        <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 z-20 pointer-events-none">
          <div className="w-full max-w-[1560px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 2xl:px-20 flex justify-end">
            <nav
              aria-label="Aura Hero Slide Navigation"
              className={`pointer-events-auto transition-all duration-1000 ${isHeroRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              onMouseEnter={() => setIsHeroPaused(true)}
              onMouseLeave={() => setIsHeroPaused(false)}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                {heroSlides.map((slide, idx) => {
                  const isActive = idx === activeHeroIndex
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => handleSelectHeroSlide(idx)}
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

      {/* INNER CONTENT WRAPPER */}
      <div className="px-6 sm:px-12 lg:px-16 max-w-[1560px] mx-auto">
        {/* 2. SPATIAL DYNAMICS GALLERY */}
        <div className="relative">
          <AdminEditButton section="aura" field="gallery" label="Hardware Gallery" />
          <ProductGallery items={gallery} />
        </div>

        {/* 3. CONTIGUOUS ARCHITECTURE GRID */}
        <div className="relative">
          <AdminEditButton section="aura" field="features" label="Edge Features" />
          <ProductArchitectureGrid
            title={cmsAura?.architectureTitle || ap.architectureTitle || "The Architecture of Autonomous Edge Silicon"}
            features={features}
          />
        </div>

        {/* 4. MISSION PILLARS GRID */}
        <div className="relative">
          <AdminEditButton section="aura" field="pillars" label="Mission Pillars" />
          <ProductPillarsGrid
            title={<>{cmsAura?.pillarsTitle?.line1 || ap.pillarsTitle?.line1 || 'Designed Around'} <br /><span className="text-neutral-900">{cmsAura?.pillarsTitle?.line2 || ap.pillarsTitle?.line2 || 'Critical Missions.'}</span></>}
            pillars={pillars}
          />
        </div>
      </div>

      {/* 5. AIR-GAPPED SECURITY (DARK CANVAS) */}
      <div className="relative">
        <AdminEditButton section="aura" field="security" label="Security Showcase" variant="dark" />
        <ProductDarkShowcase
          backgroundImage={securityData.image || "/hero_compute_board.jpg"}
          title={<>{securityData.headingLine1 || ap.darkCanvasTitle?.line1 || 'Zero Cloud Reliance.'} <br /><span className="text-white">{securityData.headingLine2 || ap.darkCanvasTitle?.line2 || 'Absolute Sovereignty.'}</span></>}
          cards={darkCards}
        />
      </div>

      {/* 6. PURPOSE STATEMENT (WHITE CANVAS) */}
      <div className="relative">
        <AdminEditButton section="aura" field="purpose" label="Purpose" />
        <ProductPurposeStatement
          backgroundImage={purposeData.image || "https://res.cloudinary.com/fukpn05e/image/upload/v1795433121/uandwelabs/cms/aura_sentinel_ladybug_1795433118929.jpg"}
          imageAlt="Aura Engineering Purpose"
          line1={purposeData.line1 || ap.purpose?.line1 || "Built for Reliability."}
          line2={purposeData.line2 || ap.purpose?.line2 || "Engineered for the Edge."}
          description={purposeData.description || ap.purpose?.description || "Critical physical infrastructure demands instant, deterministic perception. Aura executes deep intelligence directly where action happens — completely autonomous, completely private."}
        />
      </div>

      {/* 7. CLOSING CALL TO ACTION BOX */}
      <div className="relative">
        <AdminEditButton section="aura" field="cta" label="Call to Action" />
        <ProductCtaBox
          title={ctaData.title || ap.cta?.title || "Deploy Edge Silicon on Your Perimeter"}
          subtitle={ctaData.subtitle || ap.cta?.subtitle || "Reserve an evaluation kit or schedule a technical architecture review with our hardware engineers in Bengaluru."}
          buttonText={ctaData.buttonText || ap.cta?.buttonText || "Request Technical Pilot"}
          onButtonClick={() => {
            if (!isUserAuthorizedForProduct(user, 'aura')) {
              openAuthModal({
                title: 'Sign In Required',
                message: 'Please sign in with your account to request an Aura technical pilot.',
                productKey: 'aura',
                actionText: 'Sign In / Register',
              })
              return
            }
            setModalOpen(true)
          }}
        />
      </div>

      {/* CONSULTATION / PILOT MODAL */}
      <ProductConsultModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        user={user}
        onNavigateToLogin={onNavigateToLogin}
        productKey="aura"
        title={ap.modal?.title || "Aura Technical Pilot Consultation"}
        formTitle={ap.modal?.formTitle || "Reserve Pilot Hardware"}
        formSubtitle={ap.modal?.formSubtitle || "Specify deployment criteria to evaluate Aura 128-TOPS edge nodes on your perimeter."}
        scopeLabel={ap.modal?.scopeLabel || "Mission Profile"}
        scopeOptions={scopeOptions}
        notesPlaceholder={ap.modal?.notesPlaceholder || "e.g. 10 corridor nodes, ONVIF Profile S/T compatibility, dry-contact barrier relay activation..."}
        meetingUrl="https://meet.uandwelabs.com/aura-edge-sec-902"
        departmentTitle={ap.modal?.departmentTitle || "Aura Edge Silicon Operations"}
        departmentSubtitle={ap.modal?.departmentSubtitle || "Defense & Highway Architecture Team"}
      />
    </div>
  )
}
