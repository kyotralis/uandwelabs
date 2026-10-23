import { useState, useRef, useEffect } from 'react'
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
} from 'lucide-react'
import Logo from '../assets/logo.png'


// Dropdown Navigation Data
const PRODUCTS_DATA = [
  {
    title: 'Ananda · Geo Spatial',
    targetId: 'introduction',
  },
  {
    title: 'Healthcare',
    targetId: 'healthcare',
  },
  {
    title: 'Aura · Security Cam',
    targetId: 'board',
  },
]

// Global Locales / Regions
const GLOBAL_LOCALES = [
  { code: 'en-in', label: 'India', region: 'India', country: '🇮🇳' },
  { code: 'en-us', label: 'USA', region: 'United States', country: '🇺🇸' },
  { code: 'zh-cn', label: 'China', region: 'China (中国)', country: '🇨🇳' },
]

const SECTION_IDS = ['hero', 'about', 'introduction', 'healthcare', 'board', 'beliefs', 'careers']

export default function Header({
  activeNav = 'products',
  onNavChange,
  user,
  onLogout,
  onNavigateToLogin,
  isRevealed: propIsRevealed,
}) {
  const [internalRevealed, setInternalRevealed] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [globalOpen, setGlobalOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [signInMenuOpen, setSignInMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const headerVisibleRef = useRef(true)
  const isHoveredRef = useRef(false)
  const isAnyMenuOpenRef = useRef(false)
  const autoHideTimerRef = useRef(null)
  const lastScrollYRef = useRef(0)
  const lastSectionRef = useRef('hero')

  // Selected global locale
  const [selectedLocale, setSelectedLocale] = useState(() => {
    try {
      const saved = localStorage.getItem('uandwe_locale')
      if (saved) {
        const parsed = JSON.parse(saved)
        const match = GLOBAL_LOCALES.find((l) => l.code === parsed.code)
        if (match) return match
      }
    } catch {
      // ignore
    }
    return GLOBAL_LOCALES[0] // Default: India
  })

  const headerRef = useRef(null)
  const searchContainerRef = useRef(null)
  const searchInputRef = useRef(null)
  const globalRef = useRef(null)
  const userMenuRef = useRef(null)
  const signInMenuRef = useRef(null)
  const navDropdownTimeoutRef = useRef(null)

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

  // Scroll listener: only show header on scroll UP when in other sections, and auto-hide after 3s
  useEffect(() => {
    if (typeof window === 'undefined') return

    lastScrollYRef.current = window.scrollY

    if (window.scrollY > 60) {
      resetAutoHideTimer()
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const lastScrollY = lastScrollYRef.current
      const delta = currentScrollY - lastScrollY

      // Detect active section
      let activeSection = 'hero'
      if (currentScrollY > 60) {
        const scrollMid = currentScrollY + window.innerHeight * 0.35
        for (const id of SECTION_IDS) {
          const el = document.getElementById(id)
          if (el) {
            const top = el.offsetTop
            const height = el.offsetHeight
            if (scrollMid >= top && scrollMid < top + height) {
              activeSection = id
              break
            }
          }
        }
      }

      // If at top of the page (hero section)
      if (currentScrollY <= 60) {
        updateHeaderVisible(true)
        if (autoHideTimerRef.current) {
          clearTimeout(autoHideTimerRef.current)
          autoHideTimerRef.current = null
        }
        lastScrollYRef.current = currentScrollY
        lastSectionRef.current = 'hero'
        return
      }

      // In other sections:
      // If section changed while header is visible, restart 3s timer
      if (activeSection !== lastSectionRef.current) {
        lastSectionRef.current = activeSection
        if (headerVisibleRef.current) {
          resetAutoHideTimer()
        }
      }

      // Ignore micro jitter
      if (Math.abs(delta) < 6) {
        return
      }

      if (delta > 0) {
        // Moving DOWN: Hide header immediately when in other section
        if (!isHoveredRef.current && !isAnyMenuOpenRef.current) {
          updateHeaderVisible(false)
          setActiveDropdown(null)
        }
        if (autoHideTimerRef.current) {
          clearTimeout(autoHideTimerRef.current)
          autoHideTimerRef.current = null
        }
      } else {
        // Moving UP: Show header, and auto-hide after 3 seconds in the section
        updateHeaderVisible(true)
        resetAutoHideTimer()
      }

      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    let lenisTimer = null
    const attachLenis = () => {
      if (window.__lenis) {
        window.__lenis.on('scroll', handleScroll)
      } else {
        lenisTimer = setTimeout(attachLenis, 150)
      }
    }
    attachLenis()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (window.__lenis) {
        window.__lenis.off('scroll', handleScroll)
      }
      if (lenisTimer) clearTimeout(lenisTimer)
      if (autoHideTimerRef.current) {
        clearTimeout(autoHideTimerRef.current)
      }
    }
  }, [])

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
        searchInputRef.current?.focus({ preventScroll: true })
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
      }
      if (signInMenuRef.current && !signInMenuRef.current.contains(e.target)) {
        setSignInMenuOpen(false)
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setSearchOpen(false)
      }
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Smooth hover handlers for dropdowns
  const handleNavMouseEnter = (menuName) => {
    if (navDropdownTimeoutRef.current) {
      clearTimeout(navDropdownTimeoutRef.current)
    }
    setActiveDropdown(menuName)
  }

  const handleNavMouseLeave = () => {
    navDropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 180)
  }

  const handleDropdownItemClick = (targetId, navKey, requiresAuth = false) => {
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
    if (targetId) {
      const el = document.getElementById(targetId)
      if (el) {
        if (window.__lenis) {
          window.__lenis.scrollTo(el, { duration: 1.2 })
        } else {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }

  const handleSelectLocale = (locale) => {
    setSelectedLocale(locale)
    setGlobalOpen(false)
    try {
      localStorage.setItem('uandwe_locale', JSON.stringify(locale))
    } catch {
      // ignore
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
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

  const isHeaderActive = isRevealed && headerVisible

  return (
    <header
      ref={headerRef}
      style={{
        opacity: isHeaderActive ? 1 : 0,
        transform: isHeaderActive ? 'translateY(0px)' : 'translateY(-125%)',
        transition: 'opacity 350ms cubic-bezier(0.16, 1, 0.3, 1), transform 450ms cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isHeaderActive ? undefined : 'none',
      }}
      className="fixed top-0 left-0 right-0 z-50 w-full px-3 sm:px-5 md:px-7 lg:px-9 pt-3.5 sm:pt-4.5 pointer-events-none font-sans"
    >
      <div className="w-full max-w-[97vw] xl:max-w-[1460px] 2xl:max-w-[1560px] mx-auto flex flex-col items-center">

        {/* ========================================================= */}
        {/* SLEEK UNIFIED GLASS CAPSULE BAR (Increased Height)        */}
        {/* Generous 68-74px height for enhanced presence and luxury  */}
        {/* ========================================================= */}
        <div
          onMouseEnter={handleCapsuleMouseEnter}
          onMouseLeave={handleCapsuleMouseLeave}
          className="pointer-events-auto w-full h-[62px] sm:h-[68px] lg:h-[72px] px-5 sm:px-7 lg:px-9 rounded-full bg-white/85 backdrop-blur-2xl border border-white/80 shadow-[0_14px_45px_rgba(0,0,0,0.09),0_1px_4px_rgba(0,0,0,0.04)] ring-1 ring-slate-900/5 flex items-center justify-between transition-all duration-300 hover:shadow-[0_18px_50px_rgba(0,0,0,0.12)]"
        >

          {/* ------------------------------------------------------- */}
          {/* LEFT: Brand Logo + Navigation Links */}
          {/* Products | Blogs | Careers */}
          {/* ------------------------------------------------------- */}
          <div className="flex items-center gap-6 sm:gap-8 lg:gap-10">

            {/* Brand Logo - Enlarged & Crisp */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                if (window.__lenis) {
                  window.__lenis.scrollTo(0, { duration: 1.2 })
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }}
              className="flex items-center cursor-pointer select-none group shrink-0 py-0.5"
              aria-label="uandwelabs Home"
            >
              <img
                src={Logo}
                alt="uandwelabs"
                className="h-9 sm:h-10 md:h-11 lg:h-[46px] w-auto object-contain group-hover:opacity-85 transition-opacity drop-shadow-xs"
              />
            </a>

            {/* Navigation Links (Desktop) */}
            <nav className="hidden md:flex items-center gap-1.5 sm:gap-2 lg:gap-2.5">

              {/* 1. Products (with dropdown) */}
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
                  className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-[14.5px] sm:text-[15px] lg:text-[15.5px] font-medium tracking-normal rounded-full transition-all duration-200 cursor-pointer ${
                    activeDropdown === 'products' || activeNav?.toLowerCase() === 'products'
                      ? 'text-black bg-black/10 font-semibold shadow-xs'
                      : 'text-slate-700 hover:text-black hover:bg-black/5'
                  }`}
                >
                  <span>Products</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                      activeDropdown === 'products' ? 'rotate-180 text-black' : ''
                    }`}
                  />
                </button>

                {/* Products Dropdown Panel */}
                {activeDropdown === 'products' && (
                  <div
                    onMouseEnter={() => handleNavMouseEnter('products')}
                    onMouseLeave={handleNavMouseLeave}
                    className="absolute left-0 top-full pt-3 w-64 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  >
                    <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-200/90 p-2.5 ring-1 ring-black/5">
                      {PRODUCTS_DATA.map((item) => (
                        <button
                          key={item.title}
                          type="button"
                          onClick={() => handleDropdownItemClick(item.targetId, 'PRODUCTS')}
                          className="w-full text-left px-4 py-2.5 rounded-xl text-[14.5px] font-medium text-slate-800 hover:text-black hover:bg-slate-100/90 transition-colors cursor-pointer"
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Blogs */}
              <button
                type="button"
                onClick={() => handleDropdownItemClick('about', 'BLOGS')}
                className={`px-3.5 sm:px-4 py-2 text-[14.5px] sm:text-[15px] lg:text-[15.5px] font-medium tracking-normal rounded-full transition-all duration-200 cursor-pointer ${
                  activeNav?.toLowerCase() === 'blogs'
                    ? 'text-black bg-black/10 font-semibold shadow-xs'
                    : 'text-slate-700 hover:text-black hover:bg-black/5'
                }`}
              >
                Blogs
              </button>

              {/* 3. Careers */}
              <button
                type="button"
                onClick={() => handleDropdownItemClick('careers', 'CAREERS')}
                className={`px-3.5 sm:px-4 py-2 text-[14.5px] sm:text-[15px] lg:text-[15.5px] font-medium tracking-normal rounded-full transition-all duration-200 cursor-pointer ${
                  activeNav?.toLowerCase() === 'careers'
                    ? 'text-black bg-black/10 font-semibold shadow-xs'
                    : 'text-slate-700 hover:text-black hover:bg-black/5'
                }`}
              >
                Careers
              </button>

            </nav>
          </div>

          {/* ------------------------------------------------------- */}
          {/* RIGHT: Search | India ▾ | Sign In                       */}
          {/* ------------------------------------------------------- */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">

            {/* 1. Expandable Search */}
            <div ref={searchContainerRef} className="relative flex items-center">
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
                    ? 'w-48 sm:w-60 md:w-68 px-3.5 bg-white/95 border border-slate-300/80 shadow-[0_4px_18px_rgba(0,0,0,0.08)] ring-2 ring-black/5'
                    : 'w-9 sm:w-9.5 px-0 bg-transparent hover:bg-black/5 cursor-pointer justify-center border border-transparent'
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
                      ? 'text-slate-400 hover:text-slate-700 mr-2'
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
                  placeholder="Search products..."
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
            </div>

            {/* Subtle Vertical Divider */}
            <span className="h-5 w-px bg-slate-200/90 hidden sm:block" />

            {/* 2. Global Locale / Region Selector (Globe + India ▾) */}
            <div ref={globalRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setGlobalOpen(!globalOpen)
                  setUserMenuOpen(false)
                  setSignInMenuOpen(false)
                  setActiveDropdown(null)
                }}
                className={`flex items-center gap-1.5 py-1.5 px-3 sm:px-3.5 rounded-full text-[14px] sm:text-[14.5px] font-medium text-slate-700 transition-colors cursor-pointer ${
                  globalOpen ? 'bg-black/10 text-black font-semibold' : 'hover:bg-black/5 hover:text-black'
                }`}
                title="Select Language / Region"
                aria-label="Select Language or Region"
              >
                <Globe className="w-4 h-4 text-slate-700" />
                <span className="hidden sm:inline">{selectedLocale.label}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                    globalOpen ? 'rotate-180 text-black' : ''
                  }`}
                />
              </button>

              {/* Region Popover */}
              {globalOpen && (
                <div className="absolute right-0 top-full pt-3 w-64 sm:w-72 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
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
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                              isSelected
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
              <div ref={userMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setUserMenuOpen(!userMenuOpen)
                    setGlobalOpen(false)
                    setSignInMenuOpen(false)
                  }}
                  className="flex items-center gap-2 py-1 px-2 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-[14px] sm:text-[14.5px] font-semibold text-black hidden sm:inline max-w-[120px] truncate">
                    {user.name || 'Member'}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-500 transition-transform ${
                      userMenuOpen ? 'rotate-180 text-black' : ''
                    }`}
                  />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full pt-3 w-64 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-200/90 p-2.5 text-xs divide-y divide-slate-100 ring-1 ring-black/5">
                      <div className="px-3.5 py-2.5">
                        <p className="font-semibold text-slate-900 truncate text-[14px]">
                          {user.name || 'uandwelabs Member'}
                        </p>
                        <p className="text-slate-500 truncate text-[12px] mt-0.5">
                          {user.email || 'member@uandwelabs.com'}
                        </p>
                      </div>

                      <div className="py-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setUserMenuOpen(false)
                            const el = document.getElementById('introduction')
                            if (el) {
                              if (window.__lenis) {
                                window.__lenis.scrollTo(el, { duration: 1.2 })
                              } else {
                                el.scrollIntoView({ behavior: 'smooth' })
                              }
                            }
                          }}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-slate-700 hover:bg-slate-50 text-[13px] text-left cursor-pointer"
                        >
                          <Globe className="w-4 h-4 text-slate-500" />
                          <span className="font-medium text-slate-900">Geo Spatial</span>
                        </button>
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
              <div ref={signInMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setSignInMenuOpen((prev) => !prev)}
                  onMouseEnter={() => setSignInMenuOpen(true)}
                  className={`group inline-flex items-center gap-1.5 px-4.5 sm:px-5 py-2 rounded-full bg-black text-white hover:bg-orange-500 text-[13.5px] sm:text-[14px] font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:shadow-orange-500/25 active:scale-95 select-none ${
                    signInMenuOpen ? 'ring-2 ring-orange-400/40 bg-orange-500' : ''
                  }`}
                  aria-expanded={signInMenuOpen}
                  aria-haspopup="true"
                >
                  <span>Sign In</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      signInMenuOpen ? 'rotate-180 text-white' : 'text-slate-300 group-hover:text-white'
                    }`}
                  />
                </button>

                {signInMenuOpen && (
                  <div
                    onMouseEnter={() => setSignInMenuOpen(true)}
                    onMouseLeave={() => setSignInMenuOpen(false)}
                    className="absolute right-0 top-full pt-2.5 w-64 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  >
                    <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-200/90 p-2 text-xs divide-y divide-slate-100 ring-1 ring-black/5">
                      <div className="p-1 space-y-1">
                        <button
                          type="button"
                          onClick={() => {
                            setSignInMenuOpen(false)
                            if (onNavigateToLogin) {
                              onNavigateToLogin('signin', 'introduction')
                            } else {
                              window.location.hash = 'login'
                            }
                          }}
                          className="w-full flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-slate-100/80 transition-colors group cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center text-slate-800 group-hover:bg-black group-hover:text-white transition-colors">
                              <Globe className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900 text-[13.5px] group-hover:text-black">
                                Geo Spatial
                              </p>
                              <p className="text-[11px] text-slate-500">
                                Access platform
                              </p>
                            </div>
                          </div>
                        </button>
                      </div>

                      <div className="p-1 pt-1.5 space-y-1">
                        <button
                          type="button"
                          onClick={() => {
                            setSignInMenuOpen(false)
                            if (onNavigateToLogin) {
                              onNavigateToLogin('signin')
                            } else {
                              window.location.hash = 'login'
                            }
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:text-orange-600 hover:bg-orange-50/70 text-[13px] font-medium text-left transition-colors cursor-pointer group"
                        >
                          <UserIcon className="w-4 h-4 text-slate-400 group-hover:text-orange-500 transition-colors" />
                          <span>Sign In to Account</span>
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
              className="md:hidden p-2 rounded-full text-slate-800 hover:bg-black/5 transition-colors cursor-pointer"
              title="Toggle Menu"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
            </button>

          </div>

        </div>

        {/* ========================================================= */}
        {/* MOBILE DRAWER / FLYOUT                                    */}
        {/* ========================================================= */}
        {mobileMenuOpen && (
          <div
            onMouseEnter={handleCapsuleMouseEnter}
            onMouseLeave={handleCapsuleMouseLeave}
            className="pointer-events-auto md:hidden w-full max-w-md mt-2.5 rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-2xl p-5 animate-in slide-in-from-top-2 duration-200 space-y-4 ring-1 ring-black/5"
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
                <div className="pl-3 py-1 space-y-1.5">
                  {PRODUCTS_DATA.map((item) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => handleDropdownItemClick(item.targetId, 'PRODUCTS')}
                      className="flex items-center gap-2 py-1 text-[13.5px] font-medium text-black hover:opacity-75 w-full text-left cursor-pointer"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-black" />
                      <span>{item.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Blogs Mobile */}
              <button
                type="button"
                onClick={() => handleDropdownItemClick('about', 'BLOGS')}
                className="w-full flex items-center justify-between py-2 text-[15px] font-semibold text-black hover:opacity-75 border-b border-slate-100"
              >
                <span>Blogs</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

              {/* Careers Mobile */}
              <button
                type="button"
                onClick={() => handleDropdownItemClick('careers', 'CAREERS')}
                className="w-full flex items-center justify-between py-2 text-[15px] font-semibold text-black hover:opacity-75 border-b border-slate-100"
              >
                <span>Careers</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

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
                    className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 p-2 rounded-xl text-xs text-center border cursor-pointer transition-colors ${
                      selectedLocale.code === locale.code
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
                      <span>Geo Spatial</span>
                    </div>
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
