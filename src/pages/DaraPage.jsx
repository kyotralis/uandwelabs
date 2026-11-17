import { useState, useEffect, useMemo, useRef } from 'react'
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
  ArrowRight,
  ArrowLeft,
} from 'lucide-react'
import MorphGallery from '../components/ui/morph-gallery'
import { useTranslation } from '../i18n'
import { openAuthModal } from '../utils/authPrompt'
import { isUserAuthorizedForProduct } from '../utils/accountManager'
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
const DARA_HERO_SLIDES = [
  {
    id: 'dara-living',
    category: 'ASSISTIVE HEALTHCARE',
    src: '/dara_hero_living.jpg',
    thumb: '/dara_hero_living.jpg',
    alt: 'Senior Care Invisible by Design',
    headline: 'Senior Care. Invisible by Design.',
    subtitle:
      'A smart assistive device that keeps elderly loved ones safe and independent at home. Features a talking clock, night torch light, and automatic fall detection — with zero cameras or wearables.',
    ctaText: 'REQUEST DEMO',
  },
  {
    id: 'dara-wellness',
    category: 'DAILY WELLNESS & ROUTINE',
    src: '/dara_hero_wellness.jpg',
    thumb: '/dara_hero_wellness.jpg',
    alt: 'Gentle Reminders and Daily Independence',
    headline: 'Gentle Reminders. Natural Independence.',
    subtitle:
      'Acoustic voice alerts and clear display cues guide medication schedules and hydration effortlessly, harmonizing into the morning routine.',
    ctaText: 'REQUEST DEMO',
  },
  {
    id: 'dara-twilight',
    category: 'NIGHT GUIDANCE & PEACE OF MIND',
    src: '/dara_hero_twilight.jpg',
    thumb: '/dara_hero_twilight.jpg',
    alt: 'Twilight Assurance and Nighttime Protection',
    headline: 'Twilight Assurance. Nighttime Clarity.',
    subtitle:
      'Automatic rise-to-wake torch guidance and continuous radar-based fall sensing provide 24/7 peace of mind in every room without intrusive cameras.',
    ctaText: 'REQUEST DEMO',
  },
]

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
    image: '/dara_device_home.jpg',
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

  // Multi-Slide WebGL Morph Hero States
  const [activeHeroIndex, setActiveHeroIndex] = useState(0)
  const [isHeroRevealed, setIsHeroRevealed] = useState(false)
  const [isHeroPaused, setIsHeroPaused] = useState(false)
  const heroReadyTriggered = useRef(false)

  const heroSlides = useMemo(() => {
    return DARA_HERO_SLIDES.map((slide, idx) => ({
      ...slide,
      headline: dp.heroSlides?.[idx]?.headline || slide.headline,
      category: dp.heroSlides?.[idx]?.category || slide.category,
      subtitle: dp.heroSlides?.[idx]?.subtitle || slide.subtitle,
      ctaText: dp.heroSlides?.[idx]?.ctaText || slide.ctaText,
    }))
  }, [dp.heroSlides])

  const handleHeroReady = () => {
    if (heroReadyTriggered.current) return
    heroReadyTriggered.current = true
    requestAnimationFrame(() => {
      setIsHeroRevealed(true)
    })
  }

  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      handleHeroReady()
    }, 350)
    return () => clearTimeout(fallbackTimer)
  }, [])

  // Auto-play hero slide rotation (5s duration, synchronized with noise dissolve WebGL transition)
  useEffect(() => {
    if (!isHeroRevealed || isHeroPaused) return
    const timer = setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isHeroRevealed, isHeroPaused, heroSlides.length])

  const handleSelectHeroSlide = (idx) => {
    setActiveHeroIndex(idx)
  }

  const currentHeroSlide = heroSlides[activeHeroIndex] || heroSlides[0]

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
      {/* 1. IMMERSIVE HERO SECTION (MorphGallery WebGL Shader) */}
      <div className="min-h-screen relative flex flex-col justify-between overflow-hidden font-['Inter'] text-white select-text">
        {/* Full-Bleed Artwork (Morph Gallery with WebGL noise dissolve transition) */}
        <div
          className={`absolute inset-0 w-full h-full z-0 overflow-hidden transition-all duration-1000 ease-out ${
            isHeroRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]'
          }`}
        >
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
                if (onNavigateToHome) onNavigateToHome()
                else if (typeof window !== 'undefined') window.location.hash = ''
              }}
              aria-label="Back to Home"
              className="pointer-events-auto w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 group cursor-pointer shadow-lg hover:scale-105 active:scale-95 hover:border-white/40"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* MAIN HERO CONTENT (Identical layout to Homepage & Ananda Hero) */}
        <main className="relative z-10 flex-1 w-full flex items-center pointer-events-none pt-20 sm:pt-24 lg:pt-28 pb-12">
          <div className="relative z-10 w-full max-w-[1560px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 2xl:px-20 py-8 flex flex-col justify-center pointer-events-auto">
            <div className="max-w-3xl">
              <div
                key={activeHeroIndex}
                className={`transition-all duration-1000 ${
                  isHeroRevealed ? 'animate-hero-sync' : 'opacity-0'
                }`}
              >
                {/* Category Tag */}
                <div className="mb-3">
                  <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-300 font-medium">
                    {currentHeroSlide.category}
                  </span>
                </div>

                {/* Master Headline */}
                <div className="relative inline-block py-1">
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-[64px] font-normal font-['Inter'] tracking-[0.03em] text-white uppercase leading-[1.08] select-text drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
                    {currentHeroSlide.headline}
                  </h1>
                </div>

                {/* Subtitle Paragraph */}
                <p className="mt-5 sm:mt-6 text-sm sm:text-[15.5px] text-white font-normal leading-relaxed max-w-xl font-['Inter'] min-h-[64px] sm:min-h-[72px] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
                  {currentHeroSlide.subtitle}
                </p>

                {/* Action Button: REQUEST DEMO ────○ */}
                <div className="mt-6 sm:mt-8">
                  <button
                    type="button"
                    onClick={() => {
                      if (!isUserAuthorizedForProduct(user, 'dara')) {
                        openAuthModal({
                          title: 'Sign In Required',
                          message: 'Please sign in with your account to request a Dara demo.',
                          productKey: 'dara',
                          actionText: 'Sign In / Register',
                        })
                        return
                      }
                      setModalOpen(true)
                    }}
                    className="inline-flex items-center gap-4 group cursor-pointer font-['Inter'] active:scale-[0.98] transition-transform duration-150"
                  >
                    <span className="text-[11.5px] font-semibold tracking-[0.2em] uppercase text-white group-hover:text-white/80 transition-colors drop-shadow-sm">
                      {currentHeroSlide.ctaText || dp.heroButtonText || 'REQUEST DEMO'}
                    </span>

                    <div className="h-[1.5px] w-12 sm:w-16 bg-white/70 group-hover:w-20 sm:group-hover:w-24 transition-all duration-300" />

                    <div className="w-8 h-8 rounded-full border border-white/60 bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-sm text-white">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* CORNER DOWN SQUARE THUMBNAILS (Identical layout to Homepage Hero) */}
        <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 z-20 pointer-events-none">
          <div className="w-full max-w-[1560px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 2xl:px-20 flex justify-end">
            <nav
              aria-label="Dara Hero Slide Navigation"
              className={`pointer-events-auto transition-all duration-1000 ${
                isHeroRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              onMouseEnter={() => setIsHeroPaused(true)}
              onMouseLeave={() => setIsHeroPaused(false)}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                {heroSlides.map((slide, idx) => {
                  const isActive = idx === activeHeroIndex;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => handleSelectHeroSlide(idx)}
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
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
      </div>

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
        subtitle={dp.cta?.subtitle || "Request a live hardware demonstration or schedule a consultation with our geriatric engineering team in Bengaluru."}
        buttonText={dp.cta?.buttonText || "Request Demo"}
        onButtonClick={() => {
          if (!isUserAuthorizedForProduct(user, 'dara')) {
            openAuthModal({
              title: 'Sign In Required',
              message: 'Please sign in with your account to request a Dara demo.',
              productKey: 'dara',
              actionText: 'Sign In / Register',
            })
            return
          }
          setModalOpen(true)
        }}
      />

      {/* CONSULTATION / PILOT MODAL */}
      <ProductConsultModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        user={user}
        onNavigateToLogin={onNavigateToLogin}
        productKey="dara"
        title={dp.modal?.title || "Dara Demo Request"}
        formTitle={dp.modal?.formTitle || "Request Hardware Demo"}
        formSubtitle={dp.modal?.formSubtitle || "Specify patient and delivery details to schedule a live demonstration or evaluation."}
        nameLabel={dp.modal?.nameLabel || "Patient Name"}
        namePlaceholder="Patient Full Name"
        emailLabel={dp.modal?.emailLabel || "Patient Email"}
        emailPlaceholder="patient@health.in"
        facilityLabel={dp.modal?.facilityLabel || "Care Home / Residence"}
        facilityPlaceholder="Residence / Care Home / Facility Name"
        showScope={false}
        notesLabel={dp.modal?.notesLabel || "Notes"}
        notesPlaceholder={dp.modal?.notesPlaceholder || "Add any specific requirements or notes..."}
        submitButtonText={dp.modal?.submitButtonText || "REQUEST DEMO"}
        meetingUrl="https://meet.uandwelabs.com/dara-consult-desk"
        departmentTitle={dp.modal?.departmentTitle || "Dara Geriatric Hardware Engineering Desk"}
        departmentSubtitle={dp.modal?.departmentSubtitle || "Clinical Consultation Team · Bengaluru"}
      />
    </div>
  )
}
