import { useState, useMemo } from 'react'
import { Camera, Cpu, Shield, Lock, Radio, Zap, Scan, ShieldCheck } from 'lucide-react'
import Footer from '../components/Footer'
import { useTranslation } from '../i18n'
import {
  ProductHero,
  ProductGallery,
  ProductArchitectureGrid,
  ProductPillarsGrid,
  ProductDarkShowcase,
  ProductPurposeStatement,
  ProductCtaBox,
  ProductConsultModal,
} from '../components/ProductComponents'

// ==========================================
// AURA DATA SPECIFICATION
// ==========================================
const AURA_GALLERY = [
  {
    image: '/aura_lpr.jpg',
    title: 'Multilane Highway LPR',
    desc: 'Real-time optical character and vehicle identification at speeds up to 180 km/h with sub-millisecond precision.',
  },
  {
    image: '/aura_sentinel_dusk.jpg',
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

export default function AuraPage({
  user,
  onLogout,
  onNavigateToHome,
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
  const { t } = useTranslation()
  const ap = t.auraPage || {}

  const [modalOpen, setModalOpen] = useState(false)

  // Localized data structures
  const gallery = useMemo(() => {
    const list = ap.gallery || AURA_GALLERY
    return list.map((item, idx) => ({
      ...item,
      image: AURA_GALLERY[idx]?.image,
    }))
  }, [ap.gallery])

  const features = useMemo(() => {
    const icons = [
      <Camera size={24} strokeWidth={1.5} />,
      <Cpu size={24} strokeWidth={1.5} />,
      <Radio size={24} strokeWidth={1.5} />,
      <Zap size={24} strokeWidth={1.5} />,
      <Shield size={24} strokeWidth={1.5} />,
      <Lock size={24} strokeWidth={1.5} />,
    ]
    const list = ap.features || RAW_AURA_FEATURES
    return list.map((item, idx) => ({
      ...item,
      icon: icons[idx] || RAW_AURA_FEATURES[idx]?.icon,
    }))
  }, [ap.features])

  const pillars = useMemo(() => {
    const icons = [
      <Zap size={24} strokeWidth={1.5} />,
      <Scan size={24} strokeWidth={1.5} />,
      <ShieldCheck size={24} strokeWidth={1.5} />,
      <Lock size={24} strokeWidth={1.5} />,
    ]
    const list = ap.pillars || AURA_PILLARS
    return list.map((item, idx) => ({
      ...item,
      icon: icons[idx] || AURA_PILLARS[idx]?.icon,
    }))
  }, [ap.pillars])

  const darkCards = ap.darkCards || AURA_DARK_CARDS
  const scopeOptions = ap.modal?.scopeOptions || AURA_SCOPE_OPTIONS

  return (
    <div className="bg-white min-h-screen text-neutral-900 w-full font-sans selection:bg-black selection:text-white">
      {/* 1. IMMERSIVE HERO */}
      <ProductHero
        backgroundImage="/aura_sentinel_dusk.jpg"
        imageAlt="Aura Physical AI"
        title={<>{ap.heroTitle?.line1 || 'Physical AI.'} <br /><span className="text-white">{ap.heroTitle?.line2 || 'Silicon at the Edge.'}</span></>}
        description={ap.heroDesc || "Deterministic 128-TOPS neural inferencing directly inside hardened optical sensor nodes. Sub-millisecond vehicle tracking and perimeter defense with zero cloud egress."}
        buttonText={ap.heroButtonText || "Schedule Node Pilot"}
        onButtonClick={() => setModalOpen(true)}
        onBack={onNavigateToHome}
      />

      {/* INNER CONTENT WRAPPER */}
      <div className="px-6 sm:px-12 lg:px-16 max-w-[1560px] mx-auto">
        {/* 2. SPATIAL DYNAMICS GALLERY */}
        <ProductGallery items={gallery} />

        {/* 3. CONTIGUOUS ARCHITECTURE GRID */}
        <ProductArchitectureGrid
          title={ap.architectureTitle || "The Architecture of Autonomous Edge Silicon"}
          features={features}
        />

        {/* 4. MISSION PILLARS GRID */}
        <ProductPillarsGrid
          title={<>{ap.pillarsTitle?.line1 || 'Designed Around'} <br /><span className="text-neutral-900">{ap.pillarsTitle?.line2 || 'Critical Missions.'}</span></>}
          pillars={pillars}
        />
      </div>

      {/* 5. AIR-GAPPED SECURITY (DARK CANVAS) */}
      <ProductDarkShowcase
        backgroundImage="/hero_compute_board.jpg"
        title={<>{ap.darkCanvasTitle?.line1 || 'Zero Cloud Reliance.'} <br /><span className="text-white">{ap.darkCanvasTitle?.line2 || 'Absolute Sovereignty.'}</span></>}
        cards={darkCards}
      />

      {/* 6. PURPOSE STATEMENT (WHITE CANVAS) */}
      <ProductPurposeStatement
        backgroundImage="/aura_sentinel_dusk.jpg"
        imageAlt="Aura Engineering Purpose"
        line1={ap.purpose?.line1 || "Built for Reliability."}
        line2={ap.purpose?.line2 || "Engineered for the Edge."}
        description={ap.purpose?.description || "Critical physical infrastructure demands instant, deterministic perception. Aura executes deep intelligence directly where action happens — completely autonomous, completely private."}
      />

      {/* 7. CLOSING CALL TO ACTION BOX */}
      <ProductCtaBox
        title={ap.cta?.title || "Deploy Edge Silicon on Your Perimeter"}
        subtitle={ap.cta?.subtitle || "Reserve an evaluation kit or schedule a technical architecture review with our hardware engineers in Bengaluru."}
        buttonText={ap.cta?.buttonText || "Request Technical Pilot"}
        onButtonClick={() => setModalOpen(true)}
      />

      {/* GLOBAL FOOTER */}
      <Footer
        onNavigateToHome={onNavigateToHome}
        onNavigateToAnanda={onNavigateToAnanda}
        onNavigateToDara={onNavigateToDara}
        onNavigateToAura={onNavigateToAura}
        onNavigateToBlogs={onNavigateToBlogs}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToCareers={onNavigateToCareers}
        onNavigateToPrivacy={onNavigateToPrivacy}
        onNavigateToTerms={onNavigateToTerms}
        onNavigateToLogin={onNavigateToLogin}
        user={user}
      />

      {/* CONSULTATION / PILOT MODAL */}
      <ProductConsultModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        user={user}
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
