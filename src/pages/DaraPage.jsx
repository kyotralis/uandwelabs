import { useState, useEffect, useMemo } from 'react'
import {
  Volume2,
  Search,
  Radio,
  Shield,
  Play,
  Pause,
  Clock,
  Eye,
  Zap,
  Sparkles,
  Heart,
  Sun,
  ShieldCheck,
} from 'lucide-react'
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
  useAnandaInView,
} from '../components/ProductComponents'

// ==========================================
// DARA DATA SPECIFICATION
// ==========================================
const EQUALIZER_HEIGHTS = [35, 75, 40, 95, 60, 85, 45, 90, 30, 70, 50, 80]

const PREVIEW_LANGUAGES = [
  { code: 'en', label: 'English (India)', text: 'Good morning, Mother. It is 7:00 AM. Time for 1 tablet of Amlodipine with warm water.' },
  { code: 'hi', label: 'हिंदी (Hindi)', text: 'नमस्ते माताजी। सुबह के 7 बज रहे हैं। कृपया अपनी दवा गुनगुने पानी के साथ लें।' },
  { code: 'ta', label: 'தமிழ் (Tamil)', text: 'காலை வணக்கம் அம்மா. காலை 7 மணி. மாத்திரையை வெதுவெதுப்பான நீரில் உட்கொள்ளவும்.' },
  { code: 'kn', label: 'ಕನ್ನಡ (Kannada)', text: 'ಶುಭೋದಯ ಅಮ್ಮಾ. ಬೆಳಗಿನ 7 ಗಂಟೆ. ದಯವಿಟ್ಟು ಮಾತ್ರೆ ತೆಗೆದುಕೊಳ್ಳಿ.' },
  { code: 'te', label: 'తెలుగు (Telugu)', text: 'శుభోదయం అమ్మా. ఉదయం 7:00 గంటలు. దయచేసి గోరువెచ్చని నీటితో మాత్ర తీసుకోండి.' },
  { code: 'ml', label: 'മലയാളം (Malayalam)', text: 'സുപ്രഭാതം അമ്മേ. ഇപ്പോൾ രാവിലെ 7:00 മണി. ദയവായി ചൂടുവെള്ളത്തിൽ ഗുളിക കഴിക്കുക.' },
]

const DARA_GALLERY = [
  {
    image: '/dara_assistive_device.jpg',
    title: '60 GHz Contactless Radar',
    desc: 'Continuous fall detection through drywall and shower curtains with zero cameras.',
  },
  {
    image: '/dara_torch_risetowake.jpg',
    title: 'Built-in Torch & Rise-to-Wake',
    desc: 'Automatically activates clock and illuminates path the instant the device is raised.',
  },
]

const RAW_DARA_FEATURES = [
  {
    
    icon: <Clock size={24} strokeWidth={1.5} />,
    title: 'Talking Clock & Multi-Language Voice',
    desc: 'Displays the current time with high-contrast digits and announces the exact time aloud upon button press through the built-in acoustic speaker with multi-language voice support.',
  },
  {
    icon: <Zap size={24} strokeWidth={1.5} />,
    title: 'Built-in Torch Light',
    desc: 'Integrated downward-focused torch light engineered to help elderly users navigate safely in dark rooms, unlit hallways, and during nighttime without fumbling for wall switches.',
  },
  {
    icon: <Search size={24} strokeWidth={1.5} />,
    title: 'Optical Magnifying Glass',
    desc: 'Integrated magnifying glass that helps elderly users effortlessly read small text, labels, medicine names, prescription dosages, and other small household objects.',
  },
  {
    icon: <Eye size={24} strokeWidth={1.5} />,
    title: 'Rise-to-Wake Display',
    desc: 'Solid-state motion sensors automatically activate and illuminate the clock and display the instant the user raises or lifts the device from the dock or table.',
  },
  {
    icon: <Radio size={24} strokeWidth={1.5} />,
    title: 'Fall Detection & Emergency Alert',
    desc: 'Detects when the user experiences a fall anywhere in the room and immediately dispatches an emergency alert without requiring any wearables or cameras.',
  },
  {
    icon: <Shield size={24} strokeWidth={1.5} />,
    title: '100% Optical Dignity & Autonomous Battery',
    desc: 'Engineered with zero cameras for complete personal privacy, supported by a magnetic Qi dock offering 30 days of autonomous battery backup.',
  },
]

const DARA_PILLARS = [
  {
    title: 'Simplicity',
    tagline: 'Technology should feel effortless.',
    desc: 'Zero complex configuration, zero smartphones required, and zero multi-step menus. Every interaction is immediate, direct, and completely natural from the very first touch.',
    icon: <Sparkles size={24} strokeWidth={1.5} />,
  },
  {
    title: 'Accessibility',
    tagline: 'Designed with elderly users in mind.',
    desc: 'Crafted specifically for aging eyesight, reduced tactile dexterity, and diverse mother tongues. High-contrast numbers and crystal-clear voice clarity eliminate all barriers.',
    icon: <Heart size={24} strokeWidth={1.5} />,
  },
  {
    title: 'Comfort',
    tagline: 'Everyday interactions should feel natural.',
    desc: 'Soft, ambient night illumination that gently guides footsteps without glare, paired with soothing acoustic speech that reassures rather than startles in peaceful homes.',
    icon: <Sun size={24} strokeWidth={1.5} />,
  },
  {
    title: 'Independence',
    tagline: 'Supporting confidence in everyday living.',
    desc: 'Fostering the freedom to live safely and autonomously in one’s own space, knowing dependable emergency protection is always present without invasive oversight.',
    icon: <ShieldCheck size={24} strokeWidth={1.5} />,
  },
]

const DARA_DARK_CARDS = [
  {
    title: 'Personal spaces deserve privacy.',
    desc: 'Personal sanctuaries such as bedrooms and bathrooms must remain entirely sacred. Technology should safeguard well-being in the background without introducing surveillance or visual inspection into intimate living quarters.',
  },
  {
    title: 'Technology should support, not control.',
    desc: 'True assistive design empowers self-reliance rather than imposing restrictions. Dara acts as a supportive companion that stays silent until called upon, preserving personal autonomy and daily rhythm without clinical oversight.',
  },
  {
    title: 'Assistance should feel natural.',
    desc: 'Support should feel like a considerate human presence, never an alarming emergency siren or institutional monitor. From soothing acoustic cadence to gentle ambient illumination, every interaction is crafted to feel respectful, warm, and effortless.',
  },
]

const DARA_SCOPE_OPTIONS = [
  { value: 'home', label: 'Private Home / Senior Independent Living' },
  { value: 'assisted', label: 'Assisted Living Community' },
  { value: 'memory', label: 'Memory Care / Dementia Residence' },
  { value: 'hospital', label: 'Geriatric Hospital Ward' },
]

export default function DaraPage({
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
  const dp = t.daraPage || {}

  const [modalOpen, setModalOpen] = useState(false)
  const [activeLangIndex, setActiveLangIndex] = useState(0)
  const [isPlayingVoice, setIsPlayingVoice] = useState(false)
  const [clockRef, clockInView] = useAnandaInView(220)

  // Localized data structures
  const gallery = useMemo(() => {
    const list = dp.gallery || DARA_GALLERY
    return list.map((item, idx) => ({
      ...item,
      image: DARA_GALLERY[idx]?.image,
    }))
  }, [dp.gallery])

  const features = useMemo(() => {
    const icons = [
      <Clock size={24} strokeWidth={1.5} />,
      <Zap size={24} strokeWidth={1.5} />,
      <Search size={24} strokeWidth={1.5} />,
      <Eye size={24} strokeWidth={1.5} />,
      <Radio size={24} strokeWidth={1.5} />,
      <Shield size={24} strokeWidth={1.5} />,
    ]
    const list = dp.features || RAW_DARA_FEATURES
    return list.map((item, idx) => ({
      ...item,
      icon: icons[idx] || RAW_DARA_FEATURES[idx]?.icon,
    }))
  }, [dp.features])

  const pillars = useMemo(() => {
    const icons = [
      <Sparkles size={24} strokeWidth={1.5} />,
      <Heart size={24} strokeWidth={1.5} />,
      <Sun size={24} strokeWidth={1.5} />,
      <ShieldCheck size={24} strokeWidth={1.5} />,
    ]
    const list = dp.pillars || DARA_PILLARS
    return list.map((item, idx) => ({
      ...item,
      icon: icons[idx] || DARA_PILLARS[idx]?.icon,
    }))
  }, [dp.pillars])

  const darkCards = dp.darkCards || DARA_DARK_CARDS
  const scopeOptions = dp.modal?.scopeOptions || DARA_SCOPE_OPTIONS

  // Live Current Time Clock
  const [currentTimeStr, setCurrentTimeStr] = useState(() => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTimeStr(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Speech synthesis audio preview
  const handleToggleVoice = (customText) => {
    const lang = PREVIEW_LANGUAGES[activeLangIndex]
    const textToPlay = customText || lang.text

    if (isPlayingVoice) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel()
      setIsPlayingVoice(false)
      return
    }

    setIsPlayingVoice(true)

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(textToPlay)
      utterance.lang = lang.code === 'en' ? 'en-IN' : `${lang.code}-IN`
      utterance.rate = 0.92
      utterance.pitch = 1.02
      utterance.onend = () => setIsPlayingVoice(false)
      utterance.onerror = () => setIsPlayingVoice(false)
      window.speechSynthesis.speak(utterance)
    } else {
      setTimeout(() => setIsPlayingVoice(false), 3500)
    }
  }

  const handleAnnounceTime = () => {
    const lang = PREVIEW_LANGUAGES[activeLangIndex]
    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    
    let announceText = `The current time is ${timeStr}.`
    if (lang.code === 'hi') {
      announceText = `अभी समय ${timeStr} हुआ है।`
    } else if (lang.code === 'ta') {
      announceText = `இப்போது நேரம் ${timeStr}.`
    } else if (lang.code === 'kn') {
      announceText = `ಈಗ ಸಮಯ ${timeStr}.`
    } else if (lang.code === 'te') {
      announceText = `ఇప్పుడు సమయం ${timeStr}.`
    } else if (lang.code === 'ml') {
      announceText = `ഇപ്പോൾ സമയം ${timeStr}.`
    }
    handleToggleVoice(announceText)
  }

  return (
    <div className="bg-white min-h-screen text-neutral-900 w-full font-sans selection:bg-black selection:text-white">
      {/* 1. IMMERSIVE HERO */}
      <ProductHero
        backgroundImage="/dara_assistive_device.jpg"
        imageAlt="Dara Hardware Platform"
        title={<>{dp.heroTitle?.line1 || 'Senior Care.'} <br /><span className="text-white">{dp.heroTitle?.line2 || 'Invisible by Design.'}</span></>}
        description={dp.heroDesc || "A smart assistive device that keeps elderly loved ones safe and independent at home. Features a talking clock, night torch light, and automatic fall detection — with zero cameras or wearables."}
        buttonText={dp.heroButtonText || "Schedule Clinical Pilot"}
        onButtonClick={() => setModalOpen(true)}
        onBack={onNavigateToHome}
      />

      {/* INNER CONTENT WRAPPER */}
      <div className="px-6 sm:px-12 lg:px-16 max-w-[1560px] mx-auto">
        {/* SECTION A: TALKING CLOCK & MULTI-LANGUAGE VOICE DECK */}
        <div ref={clockRef} className="w-full py-20 md:py-24 border-b border-black/10 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center w-full">
            <div
              className="lg:col-span-5 space-y-3"
              style={{
                transform: clockInView ? 'translateY(0)' : 'translateY(120px)',
                opacity: clockInView ? 1 : 0,
                transition: 'transform 1250ms cubic-bezier(0.16, 1, 0.3, 1), opacity 1250ms cubic-bezier(0.16, 1, 0.3, 1)',
                willChange: 'transform, opacity',
              }}
            >
              <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-neutral-900 uppercase">
                {dp.clockSectionTitle || 'Talking Clock & Built-In Speaker'}
              </h2>
              <p className="text-neutral-500 text-sm md:text-base leading-relaxed">
                {dp.clockSectionDesc || 'Displays the current time clearly on a high-contrast screen. Press the button to announce the exact time aloud via the built-in speaker in multiple regional languages.'}
              </p>
            </div>

            <div
              className="lg:col-span-7 bg-neutral-50 border border-black/10 p-8 space-y-6"
              style={{
                transform: clockInView ? 'translateY(0)' : 'translateY(160px)',
                opacity: clockInView ? 1 : 0,
                transition: 'transform 1250ms cubic-bezier(0.16, 1, 0.3, 1), opacity 1250ms cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: clockInView ? '200ms' : '0ms',
                willChange: 'transform, opacity',
              }}
            >
              <div className="flex items-center justify-between border-b border-black/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-600">{dp.liveClockLabel || 'LIVE CLOCK:'}</span>
                  <span className="text-2xl md:text-3xl font-mono font-normal text-neutral-900">{currentTimeStr}</span>
                </div>
              </div>

              {/* Language Selector Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PREVIEW_LANGUAGES.map((lang, idx) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setActiveLangIndex(idx)
                      if (isPlayingVoice) {
                        handleToggleVoice(lang.text)
                      }
                    }}
                    className={`py-3 px-4 border text-xs font-mono uppercase tracking-wider text-center transition-colors duration-300 cursor-pointer ${
                      activeLangIndex === idx
                        ? 'bg-black border-black text-white'
                        : 'bg-white border-black/10 text-neutral-700 hover:border-black/30'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              {/* Action Bar */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <button
                  onClick={handleAnnounceTime}
                  className="px-6 py-3.5 bg-black hover:bg-neutral-800 text-white text-xs font-mono uppercase tracking-wider transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Volume2 size={16} />
                  <span>{dp.pressToAnnounce || 'PRESS TO ANNOUNCE CURRENT TIME'}</span>
                </button>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <button
                    onClick={() => handleToggleVoice()}
                    className="p-3 bg-white border border-black/10 hover:border-black text-neutral-900 transition-colors cursor-pointer"
                    title={isPlayingVoice ? (dp.stopVoice || "Stop voice") : (dp.playVoice || "Play medicine reminder speech")}
                  >
                    {isPlayingVoice ? <Pause size={16} /> : <Play size={16} />}
                  </button>

                  <div className="flex items-center gap-1 h-6">
                    {EQUALIZER_HEIGHTS.map((h, i) => (
                      <span
                        key={i}
                        className={`w-0.5 transition-all duration-300 ${isPlayingVoice ? 'bg-black' : 'bg-neutral-300'}`}
                        style={{ height: isPlayingVoice ? `${h}%` : '25%' }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-xs text-neutral-500 italic pt-1">
                "{PREVIEW_LANGUAGES[activeLangIndex].text}"
              </p>
            </div>
          </div>
        </div>

        {/* SECTION B: SPATIAL DYNAMICS GALLERY */}
        <ProductGallery items={gallery} />

        {/* SECTION C: ARCHITECTURE GRID */}
        <ProductArchitectureGrid
          title={dp.architectureTitle || "The Architecture of Senior Autonomy"}
          features={features}
        />

        {/* SECTION D: HUMAN PILLARS GRID */}
        <ProductPillarsGrid
          title={<>{dp.pillarsTitle?.line1 || 'Designed Around'} <br /><span className="text-neutral-900">{dp.pillarsTitle?.line2 || 'Human Needs.'}</span></>}
          pillars={pillars}
        />
      </div>

      {/* SECTION E: PRIVACY-FIRST TECHNOLOGY (DARK CANVAS) */}
      <ProductDarkShowcase
        backgroundImage="/dara_torch_risetowake.jpg"
        title={<>{dp.darkCanvasTitle?.line1 || 'Your Space. Your Privacy.'} <br /><span className="text-white">{dp.darkCanvasTitle?.line2 || 'Your Independence.'}</span></>}
        cards={darkCards}
      />

      {/* SECTION F: PURPOSE STATEMENT (WHITE CANVAS) */}
      <ProductPurposeStatement
        backgroundImage="/dara_emergency_fall.jpg"
        imageAlt="The Story Behind DARA"
        line1={dp.purpose?.line1 || "Built for Dignity."}
        line2={dp.purpose?.line2 || "Designed for Independence."}
        description={dp.purpose?.description || "Assistive technology crafted to keep seniors safe, comfortable, and self-reliant at home — with zero wearables, zero cameras, and complete peace of mind."}
      />

      {/* SECTION G: CLOSING CALL TO ACTION BOX */}
      <ProductCtaBox
        title={dp.cta?.title || "Bring Dignity to Every Room"}
        subtitle={dp.cta?.subtitle || "Reserve a clinical evaluation unit or schedule a consultation with our geriatric hardware engineering team in Bengaluru."}
        buttonText={dp.cta?.buttonText || "Request Clinical Pilot"}
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
        title={dp.modal?.title || "Dara Clinical Pilot Consultation"}
        formTitle={dp.modal?.formTitle || "Reserve Pilot Hardware"}
        formSubtitle={dp.modal?.formSubtitle || "Specify deployment criteria to evaluate pilot units in your facility."}
        scopeLabel={dp.modal?.scopeLabel || "Care Setting"}
        scopeOptions={scopeOptions}
        notesPlaceholder={dp.modal?.notesPlaceholder || "Add any specific clinical or architectural requirements..."}
        meetingUrl="https://meet.uandwelabs.com/dara-consult-desk"
        departmentTitle={dp.modal?.departmentTitle || "Dara Geriatric Hardware Engineering Desk"}
        departmentSubtitle={dp.modal?.departmentSubtitle || "Clinical Consultation Team · Bengaluru"}
      />
    </div>
  )
}
