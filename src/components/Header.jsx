import { useState, useRef, useEffect, useMemo } from 'react'
import {
  Search,
  Globe,
  ChevronDown,
  X,
  Menu,
  User as UserIcon,
  LogOut,
  Check,
  ArrowRight,
  Building2,
  Home,
  Radio,
  Cpu,
  ArrowUpRight,
  FileText,
  Briefcase,
  Info,
} from 'lucide-react'
import Logo from '../assets/logo.webp'
import { useTranslation, GLOBAL_LOCALES } from '../i18n'

// Dropdown Navigation Data (Horizontal Segmented Dock)
const PRODUCTS_DATA = [
  {
    id: 'ananda',
    title: 'Ananda',
    subtitle: 'Urban Physics & Microclimate',
    description: 'Solar ray-casting, aerodynamic CFD, daylight autonomy & flood hydrology simulation.',
    tag: 'GEOSPATIAL',
    badgeClass: 'bg-orange-100 text-orange-800 border-orange-200/80',
    iconBg: 'bg-orange-50 text-orange-600 border-orange-200/60',
    targetId: 'ananda',
    hasVariants: true,
  },
  {
    id: 'dara',
    title: 'Dara',
    subtitle: 'Assistive Healthcare Hardware',
    description: '60 GHz contactless wall radar, optical prescription magnifier & voice companion.',
    tag: 'HEALTHCARE',
    badgeClass: 'bg-blue-100 text-[#0a192f] border-blue-200/80',
    iconBg: 'bg-blue-50 text-[#0a192f] border-blue-200/60',
    targetId: 'dara',
    hasVariants: false,
    pills: ['60GHz Wall Radar', '4.5x Optical Lens'],
  },
  {
    id: 'aura',
    title: 'Aura',
    subtitle: 'Autonomous Edge Vision',
    description: '128-TOPS neural tensor silicon, multilane highway LPR & 350m perimeter defense.',
    tag: 'PHYSICAL AI',
    badgeClass: 'bg-indigo-100 text-indigo-900 border-indigo-200/80',
    iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200/60',
    targetId: 'aura',
    hasVariants: false,
    pills: ['128-TOPS Silicon', '350m Defense Mesh'],
  },
]

const SOLUTIONS_DATA = [
  {
    id: 'environmental-simulation',
    title: 'Environmental Physics',
    subtitle: 'Microclimate & Aerodynamics',
    description: 'Predictive solar radiation, aerodynamic CFD wind flow, and flood risk mapping.',
    tag: 'SIMULATION',
    badgeClass: 'bg-orange-100 text-orange-800 border-orange-200/80',
    iconBg: 'bg-orange-50 text-orange-600 border-orange-200/60',
    targetId: 'ananda',
    category: 'commercial',
    pills: ['Solar Radiation', 'CFD Wind Flow'],
  },
  {
    id: 'healthcare-assistive-ai',
    title: 'Assistive Healthcare',
    subtitle: 'Autonomous Elder Safety',
    description: 'Sub-300ms contactless fall detection and optical prescription reading with zero wearables.',
    tag: 'CLINICAL',
    badgeClass: 'bg-blue-100 text-[#0a192f] border-blue-200/80',
    iconBg: 'bg-blue-50 text-[#0a192f] border-blue-200/60',
    targetId: 'dara',
    category: null,
    pills: ['Contactless Radar', 'Zero Wearables'],
  },
  {
    id: 'physical-ai-vision',
    title: 'Edge Computer Vision',
    subtitle: 'Tactical Defense & Highway LPR',
    description: 'Multilane highway LPR and 350m perimeter tracking with on-chip edge tensor cores.',
    tag: 'TACTICAL',
    badgeClass: 'bg-indigo-100 text-indigo-900 border-indigo-200/80',
    iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200/60',
    targetId: 'aura',
    category: null,
    pills: ['Edge Tensor Silicon', '350m Perimeter Mesh'],
  },
]

// Global Search Index (Products, Solutions, Platforms, Sections, Pages)
const SEARCH_ITEMS = [
  {
    id: 'ananda-commercial',
    title: 'Ananda Commercial',
    subtitle: 'Urban Physics & Microclimate CFD',
    description: 'Sub-meter solar ray-casting, aerodynamic wind CFD, and flood hydrology for masterplans.',
    target: 'ananda',
    platform: 'commercial',
    keywords: ['ananda', 'an', 'commercial', 'urban physics', 'cfd', 'wind', 'solar', 'flood', 'simulation', 'fluid'],
  },
  {
    id: 'ananda-residency',
    title: 'Ananda Residency',
    subtitle: 'Living Platform & Daylight Autonomy',
    description: 'Passive cross-ventilation breezes, daylight autonomy, and estate microclimate comfort.',
    target: 'ananda',
    platform: 'residential',
    keywords: ['ananda', 'an', 'residency', 'residential', 'breeze', 'ventilation', 'daylight', 'living', 'passive cooling', 'estates'],
  },
  {
    id: 'dara',
    title: 'Dara',
    subtitle: 'Autonomous Senior Dignity & Fall Radar',
    description: '60 GHz contactless wall radar, multi-language talking clock, and rise-to-wake torch.',
    target: 'dara',
    keywords: ['dara', 'da', 'healthcare', 'fall detection', 'radar', 'elder', 'talking clock', 'torch', 'assistive', 'senior', 'longevity'],
  },
  {
    id: 'aura',
    title: 'Aura',
    subtitle: 'Autonomous Edge Vision & 128-TOPS Silicon',
    description: 'Sub-millisecond multilane highway LPR at 180 km/h, 350m perimeter tracking, zero cloud egress.',
    target: 'aura',
    keywords: ['aura', 'au', 'physical ai', 'edge vision', 'silicon', 'lpr', 'camera', 'tensor', 'perimeter', '128-tops'],
  },
  {
    id: 'solution-simulation',
    title: 'Environmental Physics',
    subtitle: 'Microclimate & Aerodynamics',
    description: 'Predictive solar radiation, aerodynamic CFD wind flow, and flood risk mapping.',
    target: 'ananda',
    platform: 'commercial',
    keywords: ['environmental', 'physics', 'aerodynamics', 'microclimate', 'solar radiation', 'cfd wind flow', 'flood', 'ananda', 'an'],
  },
  {
    id: 'solution-healthcare',
    title: 'Assistive Healthcare',
    subtitle: 'Autonomous Elder Safety',
    description: 'Sub-300ms contactless fall detection and optical prescription reading with zero wearables.',
    target: 'dara',
    keywords: ['healthcare', 'assistive', 'elder', 'safety', 'radar', 'fall', 'dara', 'clinical', 'zero wearables'],
  },
  {
    id: 'solution-tactical',
    title: 'Edge Computer Vision',
    subtitle: 'Tactical Defense & Highway LPR',
    description: 'Multilane highway LPR and 350m perimeter tracking with on-chip edge tensor cores.',
    target: 'aura',
    keywords: ['edge vision', 'computer vision', 'aura', 'tactical', 'highway lpr', 'defense', 'perimeter mesh', 'tensor'],
  },
  {
    id: 'blogs',
    title: 'Technical Blogs & Research',
    subtitle: 'Mathematical Solvers & Engineering Dispatches',
    description: 'Real-time Lattice Boltzmann CFD at 60 FPS, 60 GHz radar biomechanics, and edge silicon papers.',
    target: 'blogs',
    keywords: ['blogs', 'blog', 'technical', 'research', 'whitepapers', 'dispatches', 'publications', 'lattice boltzmann', 'articles', 'ananda', 'an'],
  },
  {
    id: 'about',
    title: 'About Us — Vision & Engineering',
    subtitle: 'Our Purpose, Mandate & Engineering Principles',
    description: 'From first-principles mathematical physics to sovereign edge silicon and elder-care assistive robotics.',
    target: 'about',
    keywords: ['about', 'about us', 'vision', 'engineering', 'principles', 'company', 'mission', 'origin', 'mandate', 'team'],
  },
  {
    id: 'careers',
    title: 'Careers — Grow With Us',
    subtitle: 'Open Roles, Engineering Culture & Opportunities',
    description: 'Join our team of CFD dynamicists, optical architects, and edge silicon hardware designers.',
    target: 'careers',
    keywords: ['careers', 'career', 'jobs', 'hiring', 'grow with us', 'opportunities', 'culture', 'open roles', 'work with us'],
  },
]

const SECTION_IDS = ['hero', 'about', 'introduction', 'healthcare', 'board', 'beliefs', 'careers']

export default function Header({
  activeNav = 'products',
  onNavChange,
  user,
  onLogout,
  onNavigateToLogin,
  onNavigateToAnanda,
  onNavigateToDara,
  onNavigateToAura,
  onNavigateToBlogs,
  onNavigateToAbout,
  onNavigateToCareers,
  onNavigateToHome,
  isRevealed: propIsRevealed,
  anandaCategory: propAnandaCategory,
}) {
  const [internalRevealed, setInternalRevealed] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [hoveredProductCategory, setHoveredProductCategory] = useState('ananda')
  const [globalOpen, setGlobalOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [signInMenuOpen, setSignInMenuOpen] = useState(false)
  const [signInGeoSpatialOpen, setSignInGeoSpatialOpen] = useState(false)
  const [userGeoSpatialOpen, setUserGeoSpatialOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileGeoSpatialOpen, setMobileGeoSpatialOpen] = useState(false)
  const [avatarError, setAvatarError] = useState(false)

  useEffect(() => {
    setAvatarError(false)
  }, [user?.avatar])

  // Track active Ananda platform ('commercial' or 'residential')
  const [activePlatform, setActivePlatform] = useState(() => {
    if (propAnandaCategory) return propAnandaCategory
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase()
      if (hash.includes('residential')) return 'residential'
      if (hash.includes('ananda') || hash.includes('commercial')) return 'commercial'
      try {
        const saved = sessionStorage.getItem('ananda_category') || localStorage.getItem('uandwe_active_platform')
        if (saved) return saved
      } catch {
        // ignore
      }
    }
    return 'commercial'
  })

  useEffect(() => {
    if (propAnandaCategory) {
      setActivePlatform(propAnandaCategory)
    }
  }, [propAnandaCategory])

  useEffect(() => {
    const handleCategoryChange = (e) => {
      if (e.detail) {
        setActivePlatform(e.detail)
      }
    }
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase()
      if (hash.includes('residential')) {
        setActivePlatform('residential')
      } else if (hash.includes('ananda') || hash.includes('commercial')) {
        setActivePlatform('commercial')
      }
    }
    window.addEventListener('ananda_category_change', handleCategoryChange)
    window.addEventListener('hashchange', handleHash)
    return () => {
      window.removeEventListener('ananda_category_change', handleCategoryChange)
      window.removeEventListener('hashchange', handleHash)
    }
  }, [])

  const headerVisibleRef = useRef(true)
  const isHoveredRef = useRef(false)
  const isAnyMenuOpenRef = useRef(false)
  const autoHideTimerRef = useRef(null)
  const lastScrollYRef = useRef(0)
  const lastSectionRef = useRef('hero')

  // Global i18n Translation Context
  const { selectedLocale, setLocale, isZh, t: i18nDict } = useTranslation()
  const t = i18nDict.header
  const localizedSolutions = t.solutions

  const headerRef = useRef(null)
  const searchContainerRef = useRef(null)
  const searchInputRef = useRef(null)
  const mobileSearchRef = useRef(null)
  const mobileSearchInputRef = useRef(null)
  const globalRef = useRef(null)
  const userMenuRef = useRef(null)
  const signInMenuRef = useRef(null)
  const navDropdownTimeoutRef = useRef(null)
  const signInTimeoutRef = useRef(null)
  const userMenuTimeoutRef = useRef(null)
  const globalTimeoutRef = useRef(null)
  const lastUserMenuHoverTimeRef = useRef(0)
  const lastGlobalHoverTimeRef = useRef(0)

  const isAnyMenuOpen = Boolean(
    activeDropdown ||
    globalOpen ||
    searchOpen ||
    userMenuOpen ||
    signInMenuOpen ||
    mobileMenuOpen
  )

  const updateHeaderVisible = (visible) => {
    headerVisibleRef.current = visible
    setHeaderVisible(visible)
  }

  const resetAutoHideTimer = () => {
    if (autoHideTimerRef.current) {
      clearTimeout(autoHideTimerRef.current)
      autoHideTimerRef.current = null
    }

    if (typeof window !== 'undefined' && window.scrollY > 60) {
      autoHideTimerRef.current = setTimeout(() => {
        if (!isHoveredRef.current && !isAnyMenuOpenRef.current) {
          updateHeaderVisible(false)
          setActiveDropdown(null)
        }
      }, 3000)
    }
  }

  useEffect(() => {
    isAnyMenuOpenRef.current = isAnyMenuOpen
    if (isAnyMenuOpen) {
      if (autoHideTimerRef.current) {
        clearTimeout(autoHideTimerRef.current)
        autoHideTimerRef.current = null
      }
    } else if (!isHovered && typeof window !== 'undefined' && window.scrollY > 60 && headerVisibleRef.current) {
      resetAutoHideTimer()
    }
  }, [isAnyMenuOpen, isHovered])

  // Close open dropdowns when scrolling down from top
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      if (window.scrollY > 80) {
        if (activeDropdown) setActiveDropdown(null)
        if (globalOpen) setGlobalOpen(false)
        if (userMenuOpen) setUserMenuOpen(false)
        if (signInMenuOpen) setSignInMenuOpen(false)
        if (searchOpen) setSearchOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeDropdown, globalOpen, userMenuOpen, signInMenuOpen, searchOpen])

  const handleCapsuleMouseEnter = () => {
    setIsHovered(true)
    isHoveredRef.current = true
    if (autoHideTimerRef.current) {
      clearTimeout(autoHideTimerRef.current)
      autoHideTimerRef.current = null
    }
  }

  const handleCapsuleMouseLeave = () => {
    setIsHovered(false)
    isHoveredRef.current = false
    if (typeof window !== 'undefined' && window.scrollY > 60 && !isAnyMenuOpenRef.current) {
      resetAutoHideTimer()
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setInternalRevealed(true)
    }, 150)
    return () => clearTimeout(timer)
  }, [])

  const isRevealed = propIsRevealed !== undefined ? propIsRevealed : internalRevealed

  // Auto focus search input when search opened
  useEffect(() => {
    if (searchOpen) {
      const timer = setTimeout(() => {
        if (window.innerWidth < 1024) {
          mobileSearchInputRef.current?.focus({ preventScroll: true })
        } else {
          searchInputRef.current?.focus({ preventScroll: true })
        }
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [searchOpen])

  // Click outside listener for all dropdowns & popovers
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (globalRef.current && !globalRef.current.contains(e.target)) {
        setGlobalOpen(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
        setUserGeoSpatialOpen(false)
      }
      if (signInMenuRef.current && !signInMenuRef.current.contains(e.target)) {
        setSignInMenuOpen(false)
        setSignInGeoSpatialOpen(false)
      }
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target) &&
        (!mobileSearchRef.current || !mobileSearchRef.current.contains(e.target))
      ) {
        setSearchOpen(false)
      }
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside, { passive: true })
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  // Smooth hover handlers for dropdowns
  const handleNavMouseEnter = (menuName) => {
    if (navDropdownTimeoutRef.current) {
      clearTimeout(navDropdownTimeoutRef.current)
    }
    if (globalTimeoutRef.current) {
      clearTimeout(globalTimeoutRef.current)
    }
    setGlobalOpen(false)
    setActiveDropdown(menuName)
  }

  const handleNavMouseLeave = () => {
    navDropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 240)
  }

  // Smooth hover handlers for Guest Sign In menu
  const handleSignInMouseEnter = () => {
    if (signInTimeoutRef.current) {
      clearTimeout(signInTimeoutRef.current)
    }
    if (globalTimeoutRef.current) {
      clearTimeout(globalTimeoutRef.current)
    }
    setGlobalOpen(false)
    setSignInMenuOpen(true)
  }

  const handleSignInMouseLeave = () => {
    signInTimeoutRef.current = setTimeout(() => {
      setSignInMenuOpen(false)
      setSignInGeoSpatialOpen(false)
    }, 280)
  }

  // Smooth hover handlers for User Profile menu
  const handleUserMenuMouseEnter = () => {
    lastUserMenuHoverTimeRef.current = performance.now()
    if (userMenuTimeoutRef.current) {
      clearTimeout(userMenuTimeoutRef.current)
    }
    if (globalTimeoutRef.current) {
      clearTimeout(globalTimeoutRef.current)
    }
    setGlobalOpen(false)
    setUserMenuOpen(true)
  }

  const handleUserMenuMouseLeave = () => {
    userMenuTimeoutRef.current = setTimeout(() => {
      setUserMenuOpen(false)
    }, 280)
  }

  const handleUserMenuToggle = (e) => {
    e.stopPropagation()
    if (userMenuTimeoutRef.current) {
      clearTimeout(userMenuTimeoutRef.current)
    }
    // On touch devices, a finger tap triggers synthetic mouseenter followed immediately by click.
    // If mouseenter ran within the last 350ms, ensure the menu stays OPEN.
    const timeSinceHover = performance.now() - lastUserMenuHoverTimeRef.current
    if (timeSinceHover < 350) {
      setUserMenuOpen(true)
    } else {
      setUserMenuOpen((prev) => !prev)
    }
    setGlobalOpen(false)
    setSignInMenuOpen(false)
    setActiveDropdown(null)
  }

  // Smooth hover handlers for Global Locale / Region selector
  const handleGlobalMouseEnter = () => {
    lastGlobalHoverTimeRef.current = performance.now()
    if (globalTimeoutRef.current) {
      clearTimeout(globalTimeoutRef.current)
    }
    if (navDropdownTimeoutRef.current) {
      clearTimeout(navDropdownTimeoutRef.current)
    }
    if (signInTimeoutRef.current) {
      clearTimeout(signInTimeoutRef.current)
    }
    if (userMenuTimeoutRef.current) {
      clearTimeout(userMenuTimeoutRef.current)
    }
    setActiveDropdown(null)
    setUserMenuOpen(false)
    setSignInMenuOpen(false)
    setGlobalOpen(true)
  }

  const handleGlobalMouseLeave = () => {
    globalTimeoutRef.current = setTimeout(() => {
      setGlobalOpen(false)
    }, 280)
  }

  const handleGlobalToggle = (e) => {
    e.stopPropagation()
    if (globalTimeoutRef.current) {
      clearTimeout(globalTimeoutRef.current)
    }
    const timeSinceHover = performance.now() - lastGlobalHoverTimeRef.current
    if (timeSinceHover < 350) {
      setGlobalOpen(true)
    } else {
      setGlobalOpen((prev) => !prev)
    }
    setUserMenuOpen(false)
    setSignInMenuOpen(false)
    setActiveDropdown(null)
  }

  const handleDropdownItemClick = (targetId, navKey, requiresAuth = false, category = null) => {
    setActiveDropdown(null)
    setMobileMenuOpen(false)
    if (requiresAuth && !user) {
      if (onNavigateToLogin) {
        onNavigateToLogin('signin', targetId)
      } else {
        window.location.hash = 'login'
      }
      return
    }
    if (onNavChange) {
      onNavChange(navKey)
    }
    if (category) {
      window.dispatchEvent(new CustomEvent('ananda_category_change', { detail: category }))
    }
    if (targetId === 'dara' || targetId === 'healthcare') {
      if (onNavigateToDara) {
        onNavigateToDara()
        return
      }
    }
    if (targetId === 'aura' || targetId === 'board') {
      if (onNavigateToAura) {
        onNavigateToAura()
        return
      }
    }
    if (targetId === 'blogs' || navKey === 'BLOGS') {
      if (onNavigateToBlogs) {
        onNavigateToBlogs()
        return
      }
    }
    if (targetId === 'about' || navKey === 'ABOUT' || targetId === 'about-us') {
      if (onNavigateToAbout) {
        onNavigateToAbout()
        return
      }
      window.location.hash = 'about'
      return
    }
    if (targetId === 'careers' || navKey === 'CAREERS' || targetId === 'career' || targetId === 'jobs') {
      if (onNavigateToCareers) {
        onNavigateToCareers()
        return
      }
      window.location.hash = 'careers'
      return
    }
    if (targetId === 'ananda') {
      if (onNavigateToAnanda) {
        onNavigateToAnanda(category || 'commercial')
        return
      }
    }
    if (targetId) {
      const resolvedId = targetId
      const el = document.getElementById(resolvedId)
      if (el) {
        if (window.__lenis) {
          window.__lenis.scrollTo(el, { duration: 1.2 })
        } else {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        if (onNavigateToHome) {
          onNavigateToHome()
        }
        window.location.hash = resolvedId
      }
    }
  }

  // Navigate with selected Ananda platform destination:
  // - If user is already logged in: navigate directly to Commercial or Residency!
  // - If user is a guest (not logged in): navigate to login page, remembering the chosen platform.
  const handleNavigateToLoginWithTarget = (targetCategory) => {
    setActiveDropdown(null)
    setSignInMenuOpen(false)
    setSignInGeoSpatialOpen(false)
    setMobileMenuOpen(false)
    setUserMenuOpen(false)
    setUserGeoSpatialOpen(false)

    setActivePlatform(targetCategory)
    try {
      sessionStorage.setItem('ananda_category', targetCategory)
      localStorage.setItem('uandwe_active_platform', targetCategory)
    } catch {
      // ignore
    }

    if (user) {
      // User is logged in: take them directly to the chosen Ananda platform
      if (onNavigateToAnanda) {
        onNavigateToAnanda(targetCategory)
      } else {
        window.location.hash = targetCategory === 'residential' ? 'ananda-residential' : 'ananda'
      }
      window.dispatchEvent(new CustomEvent('ananda_category_change', { detail: targetCategory }))
    } else {
      // User is a guest: go to login page with target
      const target = targetCategory === 'residential' ? 'ananda-residential' : 'ananda'
      if (onNavigateToLogin) {
        onNavigateToLogin('signin', target)
      } else {
        window.location.hash = 'login'
      }
    }
  }

  // Direct navigation to Ananda platform page (Commercial or Residency) without login requirement
  const handleNavigateToAnandaPlatform = (targetCategory = 'commercial') => {
    setActiveDropdown(null)
    setMobileMenuOpen(false)
    setSearchOpen(false)
    setSearchQuery('')
    setActivePlatform(targetCategory)
    try {
      sessionStorage.setItem('ananda_category', targetCategory)
      localStorage.setItem('uandwe_active_platform', targetCategory)
    } catch {
      // ignore
    }
    window.dispatchEvent(new CustomEvent('ananda_category_change', { detail: targetCategory }))
    if (onNavigateToAnanda) {
      onNavigateToAnanda(targetCategory)
      return
    }
    window.location.hash = targetCategory === 'residential' ? 'ananda-residential' : 'ananda'
  }

  const handleSelectLocale = (locale) => {
    if (globalTimeoutRef.current) {
      clearTimeout(globalTimeoutRef.current)
    }
    setLocale(locale)
    setGlobalOpen(false)
  }

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return []

    return SEARCH_ITEMS.map((item) => {
      let score = 0
      const titleLower = item.title.toLowerCase()
      const subtitleLower = item.subtitle.toLowerCase()
      const descLower = item.description.toLowerCase()

      // Exact title match or starts with query
      if (titleLower === q) score += 100
      else if (titleLower.startsWith(q)) score += 60
      else if (titleLower.split(' ').some((word) => word.startsWith(q))) score += 40
      else if (titleLower.includes(q)) score += 25

      // Subtitle match
      if (subtitleLower.startsWith(q)) score += 30
      else if (subtitleLower.includes(q)) score += 15

      // Keywords match
      if (item.keywords?.some((k) => k === q)) score += 50
      else if (item.keywords?.some((k) => k.startsWith(q))) score += 35
      else if (item.keywords?.some((k) => k.includes(q))) score += 15

      // Description match
      if (descLower.includes(q)) score += 10

      return { item, score }
    })
      .filter((res) => res.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((res) => res.item)
  }, [searchQuery])

  const handleSelectSearchResult = (item) => {
    setSearchOpen(false)
    setSearchQuery('')
    if (item.target === 'ananda') {
      handleNavigateToAnandaPlatform(item.platform || 'commercial')
      return
    }
    if (item.target === 'dara') {
      handleDropdownItemClick('dara', 'PRODUCTS')
      return
    }
    if (item.target === 'aura') {
      handleDropdownItemClick('aura', 'PRODUCTS')
      return
    }
    if (item.target === 'blogs') {
      if (onNavigateToBlogs) onNavigateToBlogs()
      else handleDropdownItemClick('blogs', 'BLOGS')
      return
    }
    if (item.target === 'about') {
      if (onNavigateToAbout) onNavigateToAbout()
      else handleDropdownItemClick('about', 'ABOUT')
      return
    }
    if (item.target === 'careers') {
      if (onNavigateToCareers) onNavigateToCareers()
      else handleDropdownItemClick('careers', 'CAREERS')
      return
    }
    handleDropdownItemClick(item.target, 'PRODUCTS')
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchResults.length > 0) {
      handleSelectSearchResult(searchResults[0])
    } else if (searchQuery.trim()) {
      const targetEl = document.getElementById('introduction')
      if (targetEl) {
        if (window.__lenis) {
          window.__lenis.scrollTo(targetEl, { duration: 1.2 })
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' })
        }
      }
      setSearchOpen(false)
    }
  }

  const isHeaderActive = isRevealed

  return (
    <header
      ref={headerRef}
      style={{
        opacity: isHeaderActive ? 1 : 0,
        transform: isHeaderActive ? 'translateY(0px)' : 'translateY(-125%)',
        transition: 'opacity 350ms cubic-bezier(0.16, 1, 0.3, 1), transform 450ms cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isHeaderActive ? undefined : 'none',
      }}
      className="absolute top-0 left-0 right-0 z-50 w-full px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 pt-3 sm:pt-4 pointer-events-none font-sans"
    >
      <div className="w-full max-w-[1560px] 2xl:max-w-[1720px] mx-auto flex flex-col items-center">
        {/* ================= FLOATING CAPSULE HEADER BAR ================= */}
        <div
          onMouseEnter={handleCapsuleMouseEnter}
          onMouseLeave={handleCapsuleMouseLeave}
          className="pointer-events-auto w-full max-w-full h-[56px] sm:h-[70px] lg:h-[74px] px-3 sm:px-6 lg:px-7 xl:px-9 rounded-full bg-white shadow-[0_16px_50px_rgba(0,0,0,0.18),0_2px_8px_rgba(0,0,0,0.06)] border border-slate-200/90 ring-1 ring-black/[0.04] flex items-center justify-between transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.22)]"
        >

          {/* ------------------------------------------------------- */}
          {/* LEFT: Brand Logo + Navigation Links */}
          {/* Products | Blogs | Careers */}
          {/* ------------------------------------------------------- */}
          <div className="flex items-center gap-1.5 sm:gap-4 lg:gap-5 xl:gap-7 shrink-0">

            {/* Brand Logo & Name - Crisp & Elegant */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                const heroEl = document.getElementById('hero')
                if (heroEl) {
                  if (window.__lenis) {
                    window.__lenis.scrollTo(0, { duration: 1.2 })
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                } else if (onNavigateToHome) {
                  onNavigateToHome()
                } else {
                  window.location.hash = 'hero'
                }
              }}
              className="flex items-center gap-1.5 sm:gap-2.5 xl:gap-3 cursor-pointer select-none group shrink-0 py-0.5"
              aria-label="uandwelabs Home"
            >
              <img
                src={Logo}
                alt="uandwelabs logo"
                className="h-8 sm:h-10 md:h-11 lg:h-11 xl:h-[50px] w-auto object-contain group-hover:scale-105 transition-all duration-200 drop-shadow-xs"
              />
              <span className="text-[13px] sm:text-[17px] xl:text-[19px] font-semibold tracking-[-0.01em] uppercase text-slate-900 group-hover:text-black transition-colors font-['Inter'] whitespace-nowrap">
                UANDWE LABS
              </span>
            </a>

            {/* Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 shrink-0">

              {/* 1. Products (Includes Ananda with Commercial & Residency) */}
              <div
                className="relative"
                onMouseEnter={() => handleNavMouseEnter('products')}
                onMouseLeave={handleNavMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveDropdown(activeDropdown === 'products' ? null : 'products')
                  }}
                  className={`flex items-center gap-1 xl:gap-1.5 px-3 py-1.5 xl:py-2 text-[13.5px] xl:text-[15px] font-medium tracking-normal rounded-full transition-colors duration-150 ease-out active:scale-[0.98] cursor-pointer ${
                    activeDropdown === 'products' || activeNav?.toLowerCase() === 'products'
                      ? 'text-black bg-slate-100 font-semibold shadow-xs'
                      : 'text-slate-700 hover:text-black hover:bg-slate-100/80'
                  }`}
                >
                  <span>Products</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                      activeDropdown === 'products' ? 'rotate-180 text-black' : 'group-hover:text-black'
                    }`}
                  />
                </button>
                

                {/* Products Dropdown (Anchored under Products button) */}
                {activeDropdown === 'products' && (
                  <>
                    {/* Narrow hover bridge strictly scoped to Products button width */}
                    <div className="absolute top-full left-0 right-0 h-8 pointer-events-auto z-40" />

                    <div
                      onMouseEnter={() => handleNavMouseEnter('products')}
                      onMouseLeave={handleNavMouseLeave}
                      className="absolute left-0 top-full pt-7 sm:pt-8 w-[680px] sm:w-[720px] lg:w-[750px] xl:w-[780px] max-w-[calc(100vw-2.5rem)] z-50 origin-top-left animate-in fade-in-0 slide-in-from-top-2 duration-150"
                    >
                    <div className="bg-white/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-[0_28px_70px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.04)] border border-slate-200/90 ring-1 ring-black/[0.04] overflow-hidden p-3.5 sm:p-4">
                      {/* Master-Detail Split Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-stretch">
                        {/* LEFT COLUMN: 3 Categories (Hover Switcher) */}
                        <div className="md:col-span-4 flex flex-col justify-center space-y-2 border-b md:border-b-0 md:border-r border-slate-200/80 pb-3 md:pb-0 md:pr-3">
                          <div className="space-y-2">
                            {/* 1. Ananda Tab */}
                            <div
                              onMouseEnter={() => setHoveredProductCategory('ananda')}
                              onClick={() => handleDropdownItemClick('ananda', 'PRODUCTS', false, activePlatform || 'commercial')}
                              className={`group flex items-center justify-between p-3 sm:p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                                hoveredProductCategory === 'ananda'
                                  ? 'bg-black text-white border-black shadow-md'
                                  : 'bg-slate-50/70 hover:bg-white text-slate-800 border-slate-200/70 hover:border-slate-300'
                              }`}
                            >
                              <div>
                                <span className="font-semibold text-[15px] tracking-tight block">Ananda</span>
                                <span
                                  className={`text-[11.5px] block leading-tight mt-0.5 ${
                                    hoveredProductCategory === 'ananda' ? 'text-neutral-400' : 'text-slate-500'
                                  }`}
                                >
                                  Urban Physics &amp; CFD
                                </span>
                              </div>
                              <ArrowRight
                                className={`w-4 h-4 transition-transform duration-200 ${
                                  hoveredProductCategory === 'ananda'
                                    ? 'text-white translate-x-1 opacity-100'
                                    : 'text-slate-400 opacity-40 group-hover:opacity-100'
                                }`}
                              />
                            </div>

                            {/* 2. Physical AI Tab */}
                            <div
                              onMouseEnter={() => setHoveredProductCategory('physical-ai')}
                              onClick={() => handleDropdownItemClick('aura', 'PRODUCTS')}
                              className={`group flex items-center justify-between p-3 sm:p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                                hoveredProductCategory === 'physical-ai'
                                  ? 'bg-black text-white border-black shadow-md'
                                  : 'bg-slate-50/70 hover:bg-white text-slate-800 border-slate-200/70 hover:border-slate-300'
                              }`}
                            >
                              <div>
                                <span className="font-semibold text-[15px] tracking-tight block">Physical AI</span>
                                <span
                                  className={`text-[11.5px] block leading-tight mt-0.5 ${
                                    hoveredProductCategory === 'physical-ai' ? 'text-neutral-400' : 'text-slate-500'
                                  }`}
                                >
                                  Autonomous Edge Vision
                                </span>
                              </div>
                              <ArrowRight
                                className={`w-4 h-4 transition-transform duration-200 ${
                                  hoveredProductCategory === 'physical-ai'
                                    ? 'text-white translate-x-1 opacity-100'
                                    : 'text-slate-400 opacity-40 group-hover:opacity-100'
                                }`}
                              />
                            </div>

                            {/* 3. Healthcare Tab */}
                            <div
                              onMouseEnter={() => setHoveredProductCategory('healthcare')}
                              onClick={() => handleDropdownItemClick('dara', 'PRODUCTS')}
                              className={`group flex items-center justify-between p-3 sm:p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                                hoveredProductCategory === 'healthcare'
                                  ? 'bg-black text-white border-black shadow-md'
                                  : 'bg-slate-50/70 hover:bg-white text-slate-800 border-slate-200/70 hover:border-slate-300'
                              }`}
                            >
                              <div>
                                <span className="font-semibold text-[15px] tracking-tight block">Healthcare</span>
                                <span
                                  className={`text-[11.5px] block leading-tight mt-0.5 ${
                                    hoveredProductCategory === 'healthcare' ? 'text-neutral-400' : 'text-slate-500'
                                  }`}
                                >
                                  Elder Longevity &amp; Fall Radar
                                </span>
                              </div>
                              <ArrowRight
                                className={`w-4 h-4 transition-transform duration-200 ${
                                  hoveredProductCategory === 'healthcare'
                                    ? 'text-white translate-x-1 opacity-100'
                                    : 'text-slate-400 opacity-40 group-hover:opacity-100'
                                }`}
                              />
                            </div>
                          </div>
                        </div>

                        {/* RIGHT COLUMN: Revealed Content on Hover */}
                        <div className="md:col-span-8 pl-0 md:pl-2 flex flex-col justify-center">
                          {/* 1. When Hovering ANANDA -> Shows Commercial and Residency */}
                          {hoveredProductCategory === 'ananda' && (
                            <div className="h-full flex flex-col justify-center animate-in fade-in-50 duration-200">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
                                {/* Commercial Card */}
                                <div
                                  onClick={() => handleNavigateToAnandaPlatform('commercial')}
                                  className="group/card p-4 sm:p-4.5 rounded-xl bg-slate-50/70 hover:bg-white border border-slate-200 hover:border-black transition-all duration-200 flex flex-col justify-between cursor-pointer shadow-2xs hover:shadow-xs"
                                >
                                  <div>
                                    <div className="flex items-center justify-between gap-1 mb-1">
                                      <h4 className="font-semibold text-slate-900 text-[15px] sm:text-[16px] group-hover/card:text-black transition-colors">
                                        Commercial
                                      </h4>
                                      <ArrowUpRight className="w-4 h-4 text-slate-400 opacity-60 group-hover/card:opacity-100 group-hover/card:text-black group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all" />
                                    </div>
                                    <p className="text-[12px] text-slate-600 leading-relaxed font-normal">
                                      Sub-meter solar ray-casting, aerodynamic wind CFD, and flood hydrology for urban masterplans.
                                    </p>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">Solar &amp; Wind</span>
                                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">Urban CFD</span>
                                    </div>
                                  </div>
                                  <div className="pt-2.5 mt-2.5 border-t border-slate-200 flex items-center justify-between text-[11.5px] font-semibold text-slate-800 group-hover/card:text-black">
                                    <span>Enter Commercial</span>
                                    <span className="group-hover/card:translate-x-1 transition-transform">→</span>
                                  </div>
                                </div>

                                {/* Residency Card */}
                                <div
                                  onClick={() => handleNavigateToAnandaPlatform('residential')}
                                  className="group/card p-4 sm:p-4.5 rounded-xl bg-slate-50/70 hover:bg-white border border-slate-200 hover:border-black transition-all duration-200 flex flex-col justify-between cursor-pointer shadow-2xs hover:shadow-xs"
                                >
                                  <div>
                                    <div className="flex items-center justify-between gap-1 mb-1">
                                      <h4 className="font-semibold text-slate-900 text-[15px] sm:text-[16px] group-hover/card:text-black transition-colors">
                                        Residency
                                      </h4>
                                      <ArrowUpRight className="w-4 h-4 text-slate-400 opacity-60 group-hover/card:opacity-100 group-hover/card:text-black group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all" />
                                    </div>
                                    <p className="text-[12px] text-slate-600 leading-relaxed font-normal">
                                      Passive cross-ventilation breezes, daylight autonomy, and microclimate comfort for estates.
                                    </p>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">Ventilation</span>
                                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">Daylight</span>
                                    </div>
                                  </div>
                                  <div className="pt-2.5 mt-2.5 border-t border-slate-200 flex items-center justify-between text-[11.5px] font-semibold text-slate-800 group-hover/card:text-black">
                                    <span>Enter Residency</span>
                                    <span className="group-hover/card:translate-x-1 transition-transform">→</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* 2. When Hovering PHYSICAL AI -> Shows Aura */}
                          {hoveredProductCategory === 'physical-ai' && (
                            <div
                              onClick={() => handleDropdownItemClick('aura', 'PRODUCTS')}
                              className="group/aura p-5 rounded-xl bg-slate-50/70 hover:bg-white border border-slate-200 hover:border-black transition-all duration-200 flex flex-col justify-between h-full cursor-pointer animate-in fade-in-50 duration-200 shadow-2xs hover:shadow-xs"
                            >
                              <div>
                                <div className="mb-1">
                                  <h4 className="font-semibold text-slate-900 text-[20px] sm:text-[22px] tracking-tight group-hover/aura:text-black transition-colors">
                                    Aura
                                  </h4>
                                </div>
                                <span className="text-[12px] font-medium text-slate-500 block mb-2">
                                  Autonomous Edge Vision &amp; 128-TOPS Silicon
                                </span>
                                <p className="text-[12.5px] text-slate-600 leading-relaxed font-normal">
                                  Deterministic INT8 quantized neural inferencing directly in hardware cache. Sub-millisecond multilane highway LPR at 180 km/h and 350m perimeter tracking with zero cloud egress.
                                </p>
                                <div className="flex flex-wrap gap-1.5 mt-2.5">
                                  <span className="text-[10.5px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">128-TOPS Silicon</span>
                                  <span className="text-[10.5px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">INT8 Cache</span>
                                  <span className="text-[10.5px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">Zero Cloud Egress</span>
                                </div>
                              </div>

                              <div className="pt-2.5 mt-3 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-800 group-hover/aura:text-black">
                                <span>Explore Aura Hardware Node</span>
                                <span className="group-hover/aura:translate-x-1 transition-transform">→</span>
                              </div>
                            </div>
                          )}

                          {/* 3. When Hovering HEALTHCARE -> Shows Dara */}
                          {hoveredProductCategory === 'healthcare' && (
                            <div
                              onClick={() => handleDropdownItemClick('dara', 'PRODUCTS')}
                              className="group/dara p-5 rounded-xl bg-slate-50/70 hover:bg-white border border-slate-200 hover:border-black transition-all duration-200 flex flex-col justify-between h-full cursor-pointer animate-in fade-in-50 duration-200 shadow-2xs hover:shadow-xs"
                            >
                              <div>
                                <div className="mb-1">
                                  <h4 className="font-semibold text-slate-900 text-[20px] sm:text-[22px] tracking-tight group-hover/dara:text-black transition-colors">
                                    Dara
                                  </h4>
                                </div>
                                <span className="text-[12px] font-medium text-slate-500 block mb-2">
                                  Autonomous Senior Dignity &amp; Fall Radar
                                </span>
                                <p className="text-[12.5px] text-slate-600 leading-relaxed font-normal">
                                  Smart assistive device keeping seniors safe and independent. Features 60 GHz contactless wall radar, multi-language talking clock (English, Hindi, Tamil, Kannada, Telugu, Malayalam), and rise-to-wake torch.
                                </p>
                                <div className="flex flex-wrap gap-1.5 mt-2.5">
                                  <span className="text-[10.5px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">60 GHz Wall Radar</span>
                                  <span className="text-[10.5px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">Talking Clock</span>
                                  <span className="text-[10.5px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">Rise-to-Wake Torch</span>
                                </div>
                              </div>

                              <div className="pt-2.5 mt-3 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-800 group-hover/dara:text-black">
                                <span>Explore Dara Assistive Platform</span>
                                <span className="group-hover/dara:translate-x-1 transition-transform">→</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  </>
                )}
              </div>

              {/* 2. Solutions */}
              <div
                className="relative"
                onMouseEnter={() => handleNavMouseEnter('solutions')}
                onMouseLeave={handleNavMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveDropdown(activeDropdown === 'solutions' ? null : 'solutions')
                  }}
                  className={`flex items-center gap-1 xl:gap-1.5 px-3 py-1.5 xl:py-2 text-[13.5px] xl:text-[15px] font-medium tracking-normal rounded-full transition-colors duration-150 ease-out active:scale-[0.98] cursor-pointer ${
                    activeDropdown === 'solutions' || activeNav?.toLowerCase() === 'solutions'
                      ? 'text-black bg-slate-100 font-semibold shadow-xs'
                      : 'text-slate-700 hover:text-black hover:bg-slate-100/80'
                  }`}
                >
                  <span>Solutions</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                      activeDropdown === 'solutions' ? 'rotate-180 text-black' : 'group-hover:text-black'
                    }`}
                  />
                </button>

                {/* Solutions Dropdown */}
                {activeDropdown === 'solutions' && (
                  <>
                    {/* Narrow hover bridge strictly scoped to Solutions button width */}
                    <div className="absolute top-full left-0 right-0 h-8 pointer-events-auto z-40" />

                    <div
                      onMouseEnter={() => handleNavMouseEnter('solutions')}
                      onMouseLeave={handleNavMouseLeave}
                      className="absolute left-0 -translate-x-12 sm:-translate-x-20 lg:-translate-x-24 top-full pt-7 sm:pt-8 w-[700px] sm:w-[760px] lg:w-[820px] max-w-[calc(100vw-2.5rem)] z-50 origin-top-left animate-in fade-in-0 slide-in-from-top-2 duration-150"
                    >
                    <div className="bg-white/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-[0_28px_70px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.04)] border border-slate-200/90 ring-1 ring-black/[0.04] overflow-hidden p-3.5 sm:p-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {SOLUTIONS_DATA.map((item) => {
                          const IconComp = item.id === 'environmental-simulation' ? Globe : item.id === 'healthcare-assistive-ai' ? Radio : Cpu
                          const accentHover = item.id === 'environmental-simulation' ? 'group-hover:text-orange-600' : item.id === 'healthcare-assistive-ai' ? 'group-hover:text-blue-900' : 'group-hover:text-indigo-600'
                          return (
                            <div
                              key={item.id}
                              onClick={() => handleDropdownItemClick(item.targetId, 'SOLUTIONS', false, item.category)}
                              className="group relative flex flex-col justify-between p-4 sm:p-4.5 text-left rounded-2xl bg-slate-50/60 hover:bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-200 cursor-pointer overflow-hidden"
                            >
                              <div>
                                {/* Top Row: Icon on Left, Pill Badge on Right */}
                                <div className="flex items-center justify-between gap-2 mb-3">
                                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border group-hover:scale-105 transition-transform duration-200 ${item.iconBg}`}>
                                    <IconComp className="w-4.5 h-4.5" />
                                  </div>
                                  <span className={`text-[9.5px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border shrink-0 shadow-2xs ${item.badgeClass}`}>
                                    {item.tag}
                                  </span>
                                </div>

                                {/* Title & Subtitle with full card width */}
                                <div className="mb-2.5">
                                  <div className={`flex items-center justify-between gap-1 font-semibold text-[15px] text-slate-900 ${accentHover} transition-colors`}>
                                    <span className="truncate">{item.title}</span>
                                    <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                                  </div>
                                  <span className="text-[11.5px] font-medium text-slate-500 block leading-tight mt-0.5">
                                    {item.subtitle}
                                  </span>
                                </div>

                                <p className="text-[12px] text-slate-500 group-hover:text-slate-700 leading-relaxed font-normal mb-3.5 transition-colors">
                                  {item.description}
                                </p>
                              </div>

                              {item.pills && (
                                <div className="flex items-center gap-1.5 mt-auto pt-3 border-t border-slate-200/70">
                                  {item.pills.map((pill, idx) => (
                                    <div
                                      key={idx}
                                      className="flex-1 py-1.5 px-2 rounded-lg bg-white/90 group-hover:bg-slate-50 text-slate-700 text-[11px] font-medium border border-slate-200/90 text-center truncate shadow-2xs transition-colors"
                                    >
                                      {pill}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>

                      {/* Clean Executive Solutions Footer */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-3 py-2 bg-slate-50/80 rounded-xl">
                        <div className="flex items-center gap-2">
                          <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                          <span className="text-[11px] sm:text-[11.5px] text-slate-600 font-semibold tracking-tight uppercase">
                            ENTERPRISE &amp; MUNICIPAL DEPLOYMENTS
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDropdownItemClick('beliefs', 'SOLUTIONS')}
                          className="text-[11.5px] sm:text-[12px] font-semibold text-slate-700 hover:text-black flex items-center gap-1.5 cursor-pointer transition-colors group/foot"
                        >
                          <span>Explore All Capabilities</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover/foot:text-black group-hover/foot:translate-x-0.5 transition-all duration-200" />
                        </button>
                      </div>
                    </div>
                  </div>
                  </>
                )}
              </div>

              {/* 3. Blogs */}
              <button
                type="button"
                onMouseEnter={() => {
                  if (navDropdownTimeoutRef.current) clearTimeout(navDropdownTimeoutRef.current)
                  setActiveDropdown(null)
                }}
                onClick={() => handleDropdownItemClick('blogs', 'BLOGS')}
                className={`px-3 py-1.5 xl:py-2 text-[13.5px] xl:text-[15px] font-medium tracking-normal rounded-full transition-all duration-200 cursor-pointer ${
                  activeNav?.toLowerCase() === 'blogs'
                    ? 'text-black bg-slate-100 font-semibold shadow-xs'
                    : 'text-slate-700 hover:text-black hover:bg-slate-100/80'
                }`}
              >
                Blogs
              </button>

              {/* 4. About Us */}
              <button
                type="button"
                onMouseEnter={() => {
                  if (navDropdownTimeoutRef.current) clearTimeout(navDropdownTimeoutRef.current)
                  setActiveDropdown(null)
                }}
                onClick={() => {
                  if (onNavigateToAbout) {
                    onNavigateToAbout()
                  } else {
                    handleDropdownItemClick('about', 'ABOUT')
                  }
                }}
                className={`px-3 py-1.5 xl:py-2 text-[13.5px] xl:text-[15px] font-medium tracking-normal rounded-full transition-colors duration-150 ease-out active:scale-[0.98] cursor-pointer ${
                  activeNav?.toLowerCase() === 'about'
                    ? 'text-black bg-slate-100 font-semibold shadow-xs'
                    : 'text-slate-700 hover:text-black hover:bg-slate-100/80'
                }`}
              >
                About Us
              </button>

              {/* 5. Careers */}
              <button
                type="button"
                onMouseEnter={() => {
                  if (navDropdownTimeoutRef.current) clearTimeout(navDropdownTimeoutRef.current)
                  setActiveDropdown(null)
                }}
                onClick={() => {
                  if (onNavigateToCareers) {
                    onNavigateToCareers()
                  } else {
                    handleDropdownItemClick('careers', 'CAREERS')
                  }
                }}
                className={`px-3 py-1.5 xl:py-2 text-[13.5px] xl:text-[15px] font-medium tracking-normal rounded-full transition-all duration-200 cursor-pointer ${
                  activeNav?.toLowerCase() === 'careers'
                    ? 'text-black bg-slate-100 font-semibold shadow-xs'
                    : 'text-slate-700 hover:text-black hover:bg-slate-100/80'
                }`}
              >
                Careers
              </button>

            </nav>
          </div>

          {/* ------------------------------------------------------- */}
          {/* RIGHT: Search | India ▾ | Sign In                       */}
          {/* ------------------------------------------------------- */}
          <div className="flex items-center gap-1 sm:gap-2.5 xl:gap-3.5 shrink-0">

            {/* 1A. Mobile & Tablet Search Toggle Button (Fixed icon in header, opens dropdown bar below on < lg screens) */}
            <button
              type="button"
              onClick={() => {
                const next = !searchOpen
                setSearchOpen(next)
                if (next) {
                  setGlobalOpen(false)
                  setUserMenuOpen(false)
                  setSignInMenuOpen(false)
                  setActiveDropdown(null)
                  setMobileMenuOpen(false)
                }
              }}
              className={`lg:hidden flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-colors cursor-pointer shrink-0 ${
                searchOpen
                  ? 'bg-black text-white shadow-xs'
                  : 'text-slate-700 hover:text-black hover:bg-slate-100'
              }`}
              title="Search"
              aria-label="Toggle Search"
            >
              {searchOpen ? <X className="w-4 h-4 text-white" /> : <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />}
            </button>

            {/* 1B. Desktop Expandable Search (Expands inline on >= lg desktop screens) */}
            <div ref={searchContainerRef} className="relative hidden lg:flex items-center">
              <form
                onSubmit={handleSearchSubmit}
                onClick={() => {
                  if (!searchOpen) {
                    setSearchOpen(true)
                    setGlobalOpen(false)
                    setUserMenuOpen(false)
                    setActiveDropdown(null)
                  }
                }}
                className={`flex items-center h-9 sm:h-9.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
                  searchOpen
                    ? 'w-48 lg:w-56 xl:w-64 px-3 bg-white border border-slate-300/80 shadow-[0_4px_18px_rgba(0,0,0,0.08)] ring-2 ring-black/5'
                    : 'w-9 sm:w-9.5 px-0 bg-transparent hover:bg-slate-100 cursor-pointer justify-center border border-transparent'
                }`}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    if (!searchOpen) {
                      e.preventDefault()
                      setSearchOpen(true)
                      setGlobalOpen(false)
                      setUserMenuOpen(false)
                      setActiveDropdown(null)
                    }
                  }}
                  className={`flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                    searchOpen
                      ? 'text-slate-400 hover:text-slate-700 mr-1.5'
                      : 'w-9 sm:w-9.5 h-9 sm:h-9.5 text-slate-700 hover:text-black'
                  }`}
                  title="Search"
                  aria-label="Search"
                >
                  <Search className="w-4.5 h-4.5" />
                </button>

                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products, solutions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setSearchOpen(false)
                      setSearchQuery('')
                    }
                  }}
                  tabIndex={searchOpen ? 0 : -1}
                  className={`w-full text-xs sm:text-[13.5px] font-normal bg-transparent outline-none text-slate-900 placeholder:text-slate-400 transition-opacity duration-200 ${
                    searchOpen ? 'opacity-100 delay-100' : 'opacity-0 pointer-events-none w-0'
                  }`}
                />

                {searchOpen && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSearchOpen(false)
                      setSearchQuery('')
                    }}
                    className="text-slate-400 hover:text-slate-800 p-1 rounded-full hover:bg-slate-100 shrink-0 transition-colors cursor-pointer ml-1"
                    title="Close search"
                    aria-label="Close search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>

              {/* Desktop Live Search Results Dropdown */}
              {searchOpen && searchQuery.trim().length > 0 && (
                <div className="absolute right-0 top-full mt-3 w-[390px] xl:w-[430px] max-w-[calc(100vw-2.5rem)] bg-white/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-[0_24px_70px_rgba(0,0,0,0.18),0_4px_14px_rgba(0,0,0,0.06)] border border-slate-200/90 ring-1 ring-black/[0.04] p-2.5 sm:p-3 z-50 origin-top-right animate-in fade-in-0 slide-in-from-top-2 duration-150 overflow-hidden">
                  <div className="flex items-center justify-between px-2.5 py-1.5 mb-1.5 border-b border-slate-100">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Search Results
                    </span>
                    <span className="text-[10.5px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
                    </span>
                  </div>

                  {searchResults.length > 0 ? (
                    <div className="max-h-[360px] overflow-y-auto pr-0.5 space-y-0.5">
                      {searchResults.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSelectSearchResult(item)}
                          className="group px-3 py-2.5 rounded-xl hover:bg-slate-100/80 active:bg-slate-100 transition-colors duration-150 cursor-pointer text-left"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-[13.5px] sm:text-[14px] text-slate-900 group-hover:text-black truncate">
                              {item.title}
                            </span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                          </div>
                          <p className="text-[12px] text-slate-500 group-hover:text-slate-700 line-clamp-1 transition-colors mt-0.5 leading-snug">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-7 px-4 text-center">
                      <Search className="w-5 h-5 text-slate-300 mx-auto mb-1.5" />
                      <p className="text-[13px] font-semibold text-slate-700">No results found for "{searchQuery}"</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Try "Ananda", "Dara", "Aura", or "Physics"</p>
                    </div>
                  )}

                  <div className="mt-2 pt-2 border-t border-slate-100 px-2 py-1 flex items-center justify-between text-[10.5px] text-slate-400">
                    <span>Press <kbd className="px-1 py-0.5 bg-slate-100 rounded text-slate-600 font-mono text-[9.5px]">Enter</kbd> to select</span>
                    <span><kbd className="px-1 py-0.5 bg-slate-100 rounded text-slate-600 font-mono text-[9.5px]">ESC</kbd> to close</span>
                  </div>
                </div>
              )}
            </div>

            {/* Subtle Vertical Divider */}
            <span className="h-5 w-px bg-slate-200/90 hidden sm:block" />

            {/* 2. Global Locale / Region Selector (Globe + India ▾) */}
            <div
              ref={globalRef}
              className="relative hidden sm:block"
              onMouseEnter={handleGlobalMouseEnter}
              onMouseLeave={handleGlobalMouseLeave}
            >
              <button
                type="button"
                onClick={handleGlobalToggle}
                className={`flex items-center gap-1 sm:gap-1.5 py-1 sm:py-1.5 px-2 sm:px-3 xl:px-3.5 rounded-full text-[13px] sm:text-[14px] xl:text-[14.5px] font-medium text-slate-700 transition-colors cursor-pointer select-none ${globalOpen ? 'bg-slate-100 text-black font-semibold' : 'hover:bg-slate-100 hover:text-black'
                  }`}
                aria-label="Select Language or Region"
              >
                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700 shrink-0" />
                <span className="hidden xl:inline">{selectedLocale.label}</span>
                <span className="hidden sm:inline xl:hidden uppercase font-semibold text-xs tracking-wider">{selectedLocale.code}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${globalOpen ? 'rotate-180 text-black' : ''
                    }`}
                />
              </button>

              {/* Region Popover */}
              {globalOpen && (
                <div
                  onMouseEnter={handleGlobalMouseEnter}
                  onMouseLeave={handleGlobalMouseLeave}
                  className="absolute right-0 top-full pt-6 sm:pt-7 w-64 sm:w-72 z-50 animate-in fade-in slide-in-from-top-1 duration-150 before:absolute before:-top-3 before:left-0 before:w-full before:h-8 before:content-['']"
                >
                  <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-200/90 p-2.5 text-xs ring-1 ring-black/5">
                    <div className="px-3.5 py-2 border-b border-slate-100 mb-1 flex items-center justify-between">
                      <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px]">
                        Select Region & Language
                      </span>
                      <Globe className="w-4 h-4 text-slate-400" />
                    </div>

                    <div className="space-y-1">
                      {GLOBAL_LOCALES.map((locale) => {
                        const isSelected = selectedLocale.code === locale.code
                        return (
                          <button
                            key={locale.code}
                            type="button"
                            onClick={() => handleSelectLocale(locale)}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${isSelected
                                ? 'bg-slate-100 text-slate-900 font-semibold'
                                : 'text-slate-700 hover:bg-slate-50 hover:text-black'
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-base">{locale.country}</span>
                              <div>
                                <span className="block text-[14px] leading-tight">
                                  {locale.label}
                                </span>
                                <span className="block text-[11.5px] text-slate-400">
                                  {locale.region}
                                </span>
                              </div>
                            </div>
                            {isSelected && <Check className="w-4.5 h-4.5 text-emerald-600" />}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Subtle Vertical Divider */}
            <span className="h-5 w-px bg-slate-200/90 hidden sm:block" />

            {/* 3. Sign In / User Profile */}
            {user ? (
              /* User Profile Dropdown */
              <div
                ref={userMenuRef}
                className="relative"
                onMouseEnter={handleUserMenuMouseEnter}
                onMouseLeave={handleUserMenuMouseLeave}
              >
                <button
                  type="button"
                  onClick={handleUserMenuToggle}
                  className="flex items-center gap-1.5 sm:gap-2 py-1 px-1.5 sm:px-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer select-none"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                >
                  <div className="w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs relative overflow-hidden shrink-0 border border-slate-200">
                    {user.avatar && !avatarError ? (
                      <img
                        src={user.avatar}
                        alt=""
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          setAvatarError(true)
                        }}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : null}
                    <span className={user.avatar && !avatarError ? 'hidden' : 'block'}>
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <span className="text-[13px] sm:text-[14px] xl:text-[14.5px] font-semibold text-black hidden sm:inline max-w-[75px] xl:max-w-[120px] truncate">
                    {user.name || 'Member'}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-500 transition-transform hidden sm:inline ${userMenuOpen ? 'rotate-180 text-black' : ''
                      }`}
                  />
                </button>

                {userMenuOpen && (
                  <div
                    onMouseEnter={handleUserMenuMouseEnter}
                    onMouseLeave={handleUserMenuMouseLeave}
                    className="absolute right-0 top-full pt-6 sm:pt-7 w-64 sm:w-72 z-50 animate-in fade-in slide-in-from-top-1 duration-150 before:absolute before:-top-3 before:left-0 before:w-full before:h-8 before:content-['']"
                  >
                    <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-200/90 p-2.5 text-xs divide-y divide-slate-100 ring-1 ring-black/5">
                      <div className="px-3.5 py-2.5 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-xs relative overflow-hidden shrink-0 border border-slate-200">
                          {user.avatar && !avatarError ? (
                            <img
                              src={user.avatar}
                              alt=""
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none'
                                setAvatarError(true)
                              }}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : null}
                          <span className={user.avatar && !avatarError ? 'hidden' : 'block'}>
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                          </span>
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-semibold text-slate-900 truncate text-[14px]">
                            {user.name || 'Member'}
                          </p>
                          <p className="text-slate-500 truncate text-[12px] mt-0.5">
                            {user.email || ''}
                          </p>
                        </div>
                      </div>

                      {/* User Profile Platform Section: ONLY displays Commercial or Residency based on user selection */}
                      <div className="py-1">
                        {activePlatform === 'residential' ? (
                          <button
                            type="button"
                            onClick={() => {
                              setUserMenuOpen(false)
                              handleNavigateToLoginWithTarget('residential')
                            }}
                            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-700 hover:text-black hover:bg-slate-100 text-[12.5px] font-medium text-left cursor-pointer transition-colors group"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 group-hover:bg-black group-hover:text-white transition-colors">
                                <Home className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <span className="font-semibold text-slate-900 block leading-tight">
                                  Residency
                                </span>
                                <span className="text-[10.5px] text-slate-500 font-medium">
                                  Living Platform
                                </span>
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:text-black transition-all" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setUserMenuOpen(false)
                              handleNavigateToLoginWithTarget('commercial')
                            }}
                            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-700 hover:text-black hover:bg-slate-100 text-[12.5px] font-medium text-left cursor-pointer transition-colors group"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 group-hover:bg-black group-hover:text-white transition-colors">
                                <Building2 className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <span className="font-semibold text-slate-900 block leading-tight">
                                  Commercial
                                </span>
                                <span className="text-[10.5px] text-slate-500 font-medium">
                                  Scale Platform
                                </span>
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:text-black transition-all" />
                          </button>
                        )}
                      </div>

                      <div className="pt-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setUserMenuOpen(false)
                            if (onLogout) onLogout()
                          }}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-red-600 hover:bg-red-50 text-[13px] font-medium text-left cursor-pointer transition-colors"
                        >
                          <LogOut className="w-4 h-4 text-red-500" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Guest Sign In Button */
              <div
                ref={signInMenuRef}
                className="relative hidden sm:block"
                onMouseEnter={handleSignInMouseEnter}
                onMouseLeave={handleSignInMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setSignInMenuOpen((prev) => !prev)}
                  onMouseEnter={handleSignInMouseEnter}
                  className={`group inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 xl:px-5 py-1.5 sm:py-2 rounded-full bg-black text-white hover:bg-orange-500 text-[13px] sm:text-[13.5px] xl:text-[14px] font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:shadow-orange-500/25 active:scale-95 select-none ${signInMenuOpen ? 'ring-2 ring-orange-400/40 bg-orange-500' : ''
                    }`}
                  aria-expanded={signInMenuOpen}
                  aria-haspopup="true"
                >
                  <span>Sign In</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${signInMenuOpen ? 'rotate-180 text-white' : 'text-slate-300 group-hover:text-white'
                      }`}
                  />
                </button>

                {signInMenuOpen && (
                  <div
                    onMouseEnter={handleSignInMouseEnter}
                    onMouseLeave={handleSignInMouseLeave}
                    className="absolute right-0 top-full pt-6 sm:pt-7 w-72 sm:w-80 z-50 animate-in fade-in slide-in-from-top-1 duration-150 before:absolute before:-top-3 before:left-0 before:w-full before:h-3 before:content-['']"
                  >
                    <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-200/90 p-2 text-xs divide-y divide-slate-100 ring-1 ring-black/5">
                      <div
                        className="p-1 space-y-1"
                        onMouseEnter={() => setSignInGeoSpatialOpen(true)}
                      >
                        <button
                          type="button"
                          onClick={() => setSignInGeoSpatialOpen((prev) => !prev)}
                          className="w-full flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-slate-100/80 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 group-hover:bg-black group-hover:text-white transition-colors">
                              <Globe className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900 text-[13.5px]">
                                Ananda
                              </p>
                              <p className="text-[11px] text-slate-500">
                                Commercial & Residency
                              </p>
                            </div>
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 group-hover:text-black transition-transform ${
                              signInGeoSpatialOpen ? 'rotate-180 text-black' : ''
                            }`}
                          />
                        </button>

                        {/* Always visible on hover or toggle */}
                        {signInGeoSpatialOpen && (
                          <div className="pl-3 pr-2 py-1.5 space-y-1 bg-slate-50/90 rounded-xl my-1 border border-slate-100 animate-in fade-in-0 duration-150">
                            <button
                              type="button"
                              onClick={() => handleNavigateToLoginWithTarget('commercial')}
                              className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg text-slate-700 hover:text-black hover:bg-white text-[12px] font-medium transition-colors cursor-pointer group"
                            >
                              <div className="flex items-center gap-2">
                                <Building2 className="w-3.5 h-3.5 text-slate-700 group-hover:text-black transition-colors" />
                                <span>Commercial</span>
                              </div>
                              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-black transition-colors" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleNavigateToLoginWithTarget('residential')}
                              className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg text-slate-700 hover:text-black hover:bg-white text-[12px] font-medium transition-colors cursor-pointer group"
                            >
                              <div className="flex items-center gap-2">
                                <Home className="w-3.5 h-3.5 text-slate-700 group-hover:text-black transition-colors" />
                                <span>Residency</span>
                              </div>
                              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-black transition-colors" />
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="p-1 pt-1.5 space-y-1">
                        <button
                          type="button"
                          onClick={() => {
                            setSignInMenuOpen(false)
                            setSignInGeoSpatialOpen(false)
                            if (onNavigateToLogin) {
                              onNavigateToLogin('signin', null)
                            } else {
                              window.location.hash = 'login'
                            }
                          }}
                          className="w-full flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-slate-100/80 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-black group-hover:text-white transition-colors">
                              <UserIcon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900 text-[13.5px]">
                                Sign In to Account
                              </p>
                              <p className="text-[11px] text-slate-500">
                                Email &amp; Google sign-in
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:text-black transition-all" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 4. Mobile Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-full text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              title="Toggle Menu"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6 text-black" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-black" />}
            </button>

          </div>

        </div>



        {/* ========================================================= */}
        {/* MOBILE & TABLET SEARCH BAR DROPDOWN (Directly below capsule) */}
        {/* ========================================================= */}
        {searchOpen && (
          <div
            ref={mobileSearchRef}
            className="pointer-events-auto lg:hidden w-full max-w-full sm:max-w-xl md:max-w-2xl mt-2 px-1 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center h-11 sm:h-12 w-full rounded-full bg-white shadow-[0_12px_36px_rgba(0,0,0,0.18)] border border-slate-200 px-4 ring-1 ring-black/5"
            >
              <Search className="w-4.5 h-4.5 text-slate-400 shrink-0 mr-2.5" />
              <input
                ref={mobileSearchInputRef}
                type="text"
                placeholder="Search products, solutions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setSearchOpen(false)
                    setSearchQuery('')
                  }
                }}
                className="w-full text-xs sm:text-sm font-normal bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-slate-400 hover:text-slate-600 p-1 mr-1.5 cursor-pointer"
                  title="Clear text"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false)
                  setSearchQuery('')
                }}
                className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-black py-1 px-2.5 rounded-md hover:bg-slate-100 cursor-pointer shrink-0"
              >
                Cancel
              </button>
            </form>

            {/* Mobile Live Search Results Dropdown */}
            {searchQuery.trim().length > 0 && (
              <div className="mt-2 w-full bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-slate-200/90 p-2.5 max-h-[360px] overflow-y-auto animate-in fade-in-0 slide-in-from-top-1 duration-150">
                <div className="flex items-center justify-between px-2.5 py-1 mb-1.5 border-b border-slate-100">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Search Results
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
                  </span>
                </div>

                {searchResults.length > 0 ? (
                  <div className="space-y-0.5">
                    {searchResults.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleSelectSearchResult(item)}
                        className="px-3 py-2.5 rounded-xl hover:bg-slate-100/80 active:bg-slate-100 transition-colors cursor-pointer text-left"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-[13.5px] text-slate-900 truncate">
                            {item.title}
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        </div>
                        <p className="text-[12px] text-slate-500 line-clamp-1 mt-0.5 leading-snug">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 px-4 text-center">
                    <Search className="w-5 h-5 text-slate-300 mx-auto mb-1.5" />
                    <p className="text-[13px] font-semibold text-slate-700">No results found for "{searchQuery}"</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Try "Ananda", "Dara", "Aura", or "Physics"</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}



        {/* ========================================================= */}
        {/* MOBILE DRAWER / FLYOUT                                    */}
        {/* ========================================================= */}
        {mobileMenuOpen && (
          <div
            onMouseEnter={handleCapsuleMouseEnter}
            onMouseLeave={handleCapsuleMouseLeave}
            className="pointer-events-auto lg:hidden w-full max-w-full mt-2.5 rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-2xl p-5 sm:p-7 animate-in slide-in-from-top-2 duration-200 space-y-4 ring-1 ring-black/5 max-h-[calc(100vh-100px)] overflow-y-auto"
          >
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-black uppercase tracking-widest block mb-2">
                Navigation
              </span>

              {/* Products Mobile */}
              <div className="border-b border-slate-100 pb-2">
                <button
                  type="button"
                  onClick={() => handleDropdownItemClick('introduction', 'PRODUCTS')}
                  className="w-full flex items-center justify-between py-2 text-[15px] font-semibold text-black hover:opacity-75"
                >
                  <span>Products</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
                <div className="pl-1 py-1 space-y-2">
                  {/* Ananda: Commercial & Residency */}
                  <div className="p-2.5 sm:p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1.5">
                    <span className="text-[13px] sm:text-[14px] font-semibold text-slate-900 block">Ananda</span>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-0.5">
                      <button
                        type="button"
                        onClick={() => handleNavigateToAnandaPlatform('commercial')}
                        className="text-left p-2 sm:p-2.5 rounded-lg bg-white border border-slate-200 hover:border-black active:border-black text-slate-900 font-semibold text-xs sm:text-[13px] flex items-center justify-between cursor-pointer transition-all duration-200 shadow-2xs group"
                      >
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700 group-hover:text-black transition-colors" />
                          <span>Commercial</span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigateToAnandaPlatform('residential')}
                        className="text-left p-2 sm:p-2.5 rounded-lg bg-white border border-slate-200 hover:border-black active:border-black text-slate-900 font-semibold text-xs sm:text-[13px] flex items-center justify-between cursor-pointer transition-all duration-200 shadow-2xs group"
                      >
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700 group-hover:text-black transition-colors" />
                          <span>Residency</span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                      </button>
                    </div>
                  </div>

                  {/* Physical AI & Healthcare (Responsive 2-Col on Tablets) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {/* Physical AI: Aura */}
                    <div className="p-2.5 sm:p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1.5 flex flex-col justify-between">
                      <span className="text-[13px] sm:text-[14px] font-semibold text-slate-900 block">Physical AI</span>
                      <button
                        type="button"
                        onClick={() => handleDropdownItemClick('aura', 'PRODUCTS')}
                        className="w-full text-left p-2 sm:p-2.5 rounded-lg bg-white border border-slate-200 hover:border-black active:border-black text-slate-900 font-semibold text-xs sm:text-[13px] flex items-center justify-between cursor-pointer transition-all duration-200 shadow-2xs group"
                      >
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700 group-hover:text-black transition-colors" />
                          <span>Aura — Autonomous Edge Vision</span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                      </button>
                    </div>

                    {/* Healthcare: Dara */}
                    <div className="p-2.5 sm:p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1.5 flex flex-col justify-between">
                      <span className="text-[13px] sm:text-[14px] font-semibold text-slate-900 block">Healthcare</span>
                      <button
                        type="button"
                        onClick={() => handleDropdownItemClick('dara', 'PRODUCTS')}
                        className="w-full text-left p-2 sm:p-2.5 rounded-lg bg-white border border-slate-200 hover:border-black active:border-black text-slate-900 font-semibold text-xs sm:text-[13px] flex items-center justify-between cursor-pointer transition-all duration-200 shadow-2xs group"
                      >
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700 group-hover:text-black transition-colors" />
                          <span>Dara — Assistive Elder Hardware</span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Solutions Mobile */}
              <div className="border-b border-slate-100 pb-2">
                <button
                  type="button"
                  onClick={() => handleDropdownItemClick('introduction', 'SOLUTIONS')}
                  className="w-full flex items-center justify-between py-2 text-[15px] font-semibold text-black hover:opacity-75"
                >
                  <span>Solutions</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
                <div className="pl-1 py-1 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                  {SOLUTIONS_DATA.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleDropdownItemClick(item.targetId, 'SOLUTIONS', false, item.category)}
                      className="w-full text-left p-2.5 sm:p-3 rounded-xl hover:bg-slate-100/80 border border-transparent hover:border-slate-200 transition-colors cursor-pointer"
                    >
                      <span className="text-[13.5px] sm:text-[14px] font-semibold text-slate-900 block">
                        {item.title}
                      </span>
                      <p className="text-[11.5px] text-slate-500 leading-snug mt-1">
                        {item.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Links: Blogs, About Us, Careers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2 border-b border-slate-100 pb-2">
                {/* Blogs Mobile */}
                <button
                  type="button"
                  onClick={() => handleDropdownItemClick('blogs', 'BLOGS')}
                  className="w-full flex items-center justify-between py-2 sm:py-2.5 px-2 rounded-xl text-[14.5px] sm:text-[15px] font-semibold text-black hover:bg-slate-50 transition-colors"
                >
                  <span>Blogs</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>

                {/* About Us Mobile */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    if (onNavigateToAbout) {
                      onNavigateToAbout()
                    } else {
                      handleDropdownItemClick('about', 'ABOUT')
                    }
                  }}
                  className="w-full flex items-center justify-between py-2 sm:py-2.5 px-2 rounded-xl text-[14.5px] sm:text-[15px] font-semibold text-black hover:bg-slate-50 transition-colors"
                >
                  <span>About Us</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>

                {/* Careers Mobile */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    if (onNavigateToCareers) {
                      onNavigateToCareers()
                    } else {
                      handleDropdownItemClick('careers', 'CAREERS')
                    }
                  }}
                  className="w-full flex items-center justify-between py-2 sm:py-2.5 px-2 rounded-xl text-[14.5px] sm:text-[15px] font-semibold text-black hover:bg-slate-50 transition-colors"
                >
                  <span>Careers</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </div>

            </div>

            {/* Global region mobile */}
            <div className="pt-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                Region & Language
              </span>
              <div className="grid grid-cols-3 gap-2">
                {GLOBAL_LOCALES.map((locale) => (
                  <button
                    key={locale.code}
                    type="button"
                    onClick={() => handleSelectLocale(locale)}
                    className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 p-2 rounded-xl text-xs text-center border cursor-pointer transition-colors ${selectedLocale.code === locale.code
                        ? 'border-slate-900 bg-slate-100 font-semibold text-slate-900'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                  >
                    <span className="text-base">{locale.country}</span>
                    <span className="text-[11.5px]">{locale.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Auth options mobile */}
            <div className="pt-3 border-t border-slate-100">
              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    if (onLogout) onLogout()
                  }}
                  className="w-full py-2.5 rounded-full bg-red-50 text-red-600 font-semibold text-xs flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out ({user.name})</span>
                </button>
              ) : (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      if (onNavigateToLogin) onNavigateToLogin('signin', 'introduction')
                    }}
                    className="w-full py-2.5 px-4 rounded-2xl bg-black text-white font-semibold text-xs flex items-center justify-between shadow-sm cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span>Sign In to Ananda</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      if (onNavigateToLogin) onNavigateToLogin('signin')
                    }}
                    className="w-full py-2.5 rounded-2xl border border-slate-200 text-slate-800 font-semibold text-xs text-center hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all cursor-pointer"
                  >
                    Sign In to Account
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
