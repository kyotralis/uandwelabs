import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import AnandaPage from './pages/AnandaPage'
import DaraPage from './pages/DaraPage'
import AuraPage from './pages/AuraPage'
import BlogPage from './pages/BlogPage'
import AboutUsPage from './pages/AboutUsPage'
import CareersPage from './pages/CareersPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import SecurityPage from './pages/SecurityPage'
import TermsPage from './pages/TermsPage'

// Directional Page Slide Variants (CSS Grid Stacked):
// Entering page slides in on top (zIndex: 20) directly over the existing page (zIndex: 10)
// Both pages stay at 100% opacity with edge shadow -> ZERO white screen gap or flash!
const pageTransitionVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    zIndex: 20,
    opacity: 1,
    boxShadow: direction > 0 ? '-16px 0 36px -4px rgba(0,0,0,0.12)' : '16px 0 36px -4px rgba(0,0,0,0.12)',
  }),
  center: {
    x: 0,
    zIndex: 20,
    opacity: 1,
    boxShadow: '0 0 0 rgba(0,0,0,0)',
    transition: {
      x: { ease: [0.16, 1, 0.3, 1], duration: 0.68 },
    },
    transitionEnd: {
      transform: 'none',
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? '-22%' : '22%',
    zIndex: 10,
    opacity: 1, // Keep fully solid so NO white background bleeds through
    transition: {
      x: { ease: [0.16, 1, 0.3, 1], duration: 0.68 },
    },
  }),
}

// Logical page order for directional slide calculations (Header flow: Home -> Products -> Blogs -> About -> Careers)
const PAGE_ORDER = {
  home: 0,
  ananda: 1,
  dara: 2,
  aura: 3,
  blogs: 4,
  about: 5,
  careers: 6,
  privacy: 7,
  security: 8,
  terms: 9,
  login: 10,
}

function calculateNavDirection(fromPage, toPage) {
  if (toPage === 'home') return -1 // Returning to Home is always Back (slides in from Left)
  if (fromPage === 'home') return 1 // Leaving Home to any subpage is Next (slides in from Right)
  const fromRank = PAGE_ORDER[fromPage] ?? 0
  const toRank = PAGE_ORDER[toPage] ?? 0
  return toRank >= fromRank ? 1 : -1
}

// Instant top-level scrubber for legacy /hero or #hero in URL bar
if (typeof window !== 'undefined') {
  const hash = window.location.hash.toLowerCase()
  const path = window.location.pathname.toLowerCase()
  if (hash === '#hero' || path === '/hero') {
    window.history.replaceState(null, '', '/')
  }
}

import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import AuthPromptModal from './components/AuthPromptModal'
import ToastContainer, { showToast } from './components/ui/Toast'
import {
  getSavedAccounts,
  saveAccount,
  switchActiveAccount,
  removeSavedAccount,
  clearAllSavedAccounts,
} from './utils/accountManager'

function App() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('uandwe_user')
      if (saved) {
        const parsed = JSON.parse(saved)
        // Purge old mock / placeholder session data
        if (parsed?.email === 'user@gmail.com' || parsed?.name === 'Google User') {
          localStorage.removeItem('uandwe_user')
          localStorage.removeItem('uandwe_token')
          return null
        }
        return parsed
      }
      return null
    } catch {
      return null
    }
  })

  // Clean route parser from window.location (supports pathname and strips legacy hash)
  function getRouteInfo() {
    if (typeof window === 'undefined') {
      return { page: 'home', category: 'commercial', mode: 'signup' }
    }

    // Parse path, e.g. "/hero", "/ananda", "/dara", "/aura", "/about", "/careers", "/login", "/signup"
    const rawPath = window.location.pathname.toLowerCase().replace(/^\/+/, '').replace(/\/+$/, '')
    // Support legacy or redirected hash without #
    const rawHash = window.location.hash.toLowerCase().replace(/^#+/, '').replace(/^\/+/, '')
    const route = rawPath || rawHash

    if (route === 'login' || route === 'signin') {
      return { page: 'login', category: 'commercial', mode: 'signin' }
    }
    if (route === 'signup' || route === 'register') {
      return { page: 'login', category: 'commercial', mode: 'signup' }
    }
    if (route === 'ananda-residential' || route === 'ananda/residential') {
      return { page: 'ananda', category: 'residential', mode: 'signup' }
    }
    if (route === 'ananda' || route === 'geospatial' || route === 'ananda-commercial' || route === 'ananda/commercial') {
      return { page: 'ananda', category: 'commercial', mode: 'signup' }
    }
    if (route === 'dara' || route === 'healthcare') {
      return { page: 'dara', category: 'commercial', mode: 'signup' }
    }
    if (route === 'aura' || route === 'physical-ai' || route === 'board') {
      return { page: 'aura', category: 'commercial', mode: 'signup' }
    }
    if (route === 'blogs' || route === 'blog') {
      return { page: 'blogs', category: 'commercial', mode: 'signup' }
    }
    if (route === 'about' || route === 'about-us') {
      return { page: 'about', category: 'commercial', mode: 'signup' }
    }
    if (route === 'careers' || route === 'career' || route === 'jobs') {
      return { page: 'careers', category: 'commercial', mode: 'signup' }
    }
    if (route === 'privacy' || route === 'privacy-policy') {
      return { page: 'privacy', category: 'commercial', mode: 'signup' }
    }
    if (route === 'security' || route === 'security-compliance') {
      return { page: 'security', category: 'commercial', mode: 'signup' }
    }
    if (route === 'terms' || route === 'terms-of-service') {
      return { page: 'terms', category: 'commercial', mode: 'signup' }
    }
    if (route === 'admin' || route === 'dashboard' || route === 'cms') {
      if (typeof window !== 'undefined') {
        window.location.href = 'http://localhost:5175'
      }
      return { page: 'home', category: 'commercial', mode: 'signup' }
    }

    // Home route (/hero, /introduction, /beliefs, /)
    return { page: 'home', category: 'commercial', mode: 'signup' }
  }

  function getPathForState(page, anandaCategory, loginMode) {
    if (page === 'login') return loginMode === 'signup' ? '/signup' : '/login'
    if (page === 'ananda') return anandaCategory === 'residential' ? '/ananda-residential' : '/ananda'
    if (page === 'dara') return '/dara'
    if (page === 'aura') return '/aura'
    if (page === 'blogs') return '/blogs'
    if (page === 'about') return '/about'
    if (page === 'careers') return '/careers'
    if (page === 'privacy') return '/privacy'
    if (page === 'security') return '/security'
    if (page === 'terms') return '/terms'
    return '/' // Pure root domain for home (e.g. localhost:5174/ or uandwelabs.com) with no /hero
  }

  // Multi-Account Sessions (maximum 2 accounts in the switcher)
  const [savedAccounts, setSavedAccounts] = useState(() => getSavedAccounts())

  // Initialize from clean URL pathname
  const [currentPage, setCurrentPage] = useState(() => getRouteInfo().page)
  const currentPageRef = useRef(currentPage)
  useEffect(() => {
    currentPageRef.current = currentPage
  }, [currentPage])
  const [anandaCategory, setAnandaCategory] = useState(() => getRouteInfo().category)
  const [loginMode, setLoginMode] = useState(() => getRouteInfo().mode)
  const [welcomeMessage, setWelcomeMessage] = useState('')

  // Directional navigation tracking: +1 = Forward / Next (from Right), -1 = Back (from Left)
  const [navDirection, setNavDirection] = useState(1)

  // Clean static branding title & SEO description
  useEffect(() => {
    document.title = 'UANDWE LABS'

    const descriptions = {
      home: 'UandWe Labs bridges generative intelligence, environmental physics, and precision silicon engineering. Creators of Ananda, Dara, and Aura.',
      ananda: 'Diurnal solar ray-casting, Lattice Boltzmann aerodynamic wind fields, and 2D Saint-Venant flood hydrology for modern masterplans.',
      dara: 'Smart assistive healthcare hardware keeping seniors safe and independent with contactless 60 GHz radar and multi-language voice guidance.',
      aura: 'Autonomous edge vision nodes delivering real-time vehicle analytics, high-speed highway recognition, and 350m perimeter defense.',
      about: 'We believe good technology should feel like second nature — protecting your dignity, respecting your peace of mind, and bringing people closer together.',
      careers: 'Join our research branch in Bengaluru. Work alongside fluid aerodynamicists, sensor architects, and computational designers.',
      blogs: 'Engineering research publications, CFD benchmarking, and hardware architecture whitepapers.',
      login: 'Sign in to access your UandWe Labs simulation environments and enterprise consoles.',
      privacy: 'Our commitment to zero cloud reliance, local edge data processing, and physical privacy sovereignty.',
      security: 'Hardware-level cryptographic validation and security compliance specifications.',
      terms: 'Terms of service and engineering simulation usage agreement.',
    }

    const pageDesc = descriptions[currentPage] || descriptions.home

    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', pageDesc)

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', 'UANDWE Labs')

    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', pageDesc)
  }, [currentPage])

  // Global In-App Auth Required Prompt Modal
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    title: 'Sign In Required',
    message: 'Please sign in or create an account to proceed.',
    productKey: 'dara',
    actionText: 'Sign In / Register',
  })

  useEffect(() => {
    const handleOpenAuth = (e) => {
      const { title, message, productKey, actionText } = e.detail || {}
      setAuthModal({
        isOpen: true,
        title: title || 'Sign In Required',
        message: message || 'Please sign in or create an account to proceed.',
        productKey: productKey || 'dara',
        actionText: actionText || 'Sign In / Register',
      })
    }

    const handleCloseAuth = () => {
      setAuthModal((prev) => ({ ...prev, isOpen: false }))
    }

    window.addEventListener('uandwe:open-auth-modal', handleOpenAuth)
    window.addEventListener('uandwe:close-auth-modal', handleCloseAuth)

    return () => {
      window.removeEventListener('uandwe:open-auth-modal', handleOpenAuth)
      window.removeEventListener('uandwe:close-auth-modal', handleCloseAuth)
    }
  }, [])

  const handleAuthModalConfirm = () => {
    const targetProduct = authModal.productKey || 'dara'
    setAuthModal((prev) => ({ ...prev, isOpen: false }))
    handleNavigateToLogin('signin', targetProduct)
  }

  // Browser History & Session Stack tracking
  const currentHistoryIdxRef = useRef(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initialIdx = window.history.state?.idx ?? 0
      currentHistoryIdxRef.current = initialIdx
      if (!window.history.state || window.history.state.idx === undefined) {
        window.history.replaceState({ idx: initialIdx, page: currentPage }, '', window.location.pathname)
      }
    }
  }, [])

  // Pre-warm critical visual assets into browser memory cache for instantaneous paint
  useEffect(() => {
    if (typeof window === 'undefined') return
    const criticalImages = [
      'https://res.cloudinary.com/fukpn05e/image/upload/v1795433129/uandwelabs/cms/hero_ananda_urban_physics_1795433127739.jpg',
      'https://res.cloudinary.com/fukpn05e/image/upload/v1795424401/uandwelabs/cms/Hands_Cradling_a_Dynamic_Heart_1795424399358.jpg',
      'https://res.cloudinary.com/fukpn05e/image/upload/v1795433127/uandwelabs/cms/hero_aura_highway_lpr_1795433125508.jpg',
      'https://res.cloudinary.com/fukpn05e/image/upload/v1795433140/uandwelabs/cms/about_hero_studio_1795433139418.jpg',
      'https://res.cloudinary.com/fukpn05e/image/upload/v1795433142/uandwelabs/cms/about_team_discussion_1795433140845.jpg',
      'https://res.cloudinary.com/fukpn05e/image/upload/v1795505931/uandwelabs/cms/building-2_1795505930761.jpg',
      'https://res.cloudinary.com/fukpn05e/image/upload/v1795505971/uandwelabs/cms/careerhomeimage_1795505970368.jpg',
      'https://res.cloudinary.com/fukpn05e/image/upload/v1795505914/uandwelabs/cms/ananda_hero_1795505913763.jpg',
      'https://res.cloudinary.com/fukpn05e/image/upload/v1795424401/uandwelabs/cms/Hands_Cradling_a_Dynamic_Heart_1795424399358.jpg',
      '/aura_hero.jpg',
      'https://res.cloudinary.com/fukpn05e/image/upload/v1795433117/uandwelabs/cms/aura_2_1795433115192.jpg',
      'https://res.cloudinary.com/fukpn05e/image/upload/v1795433123/uandwelabs/cms/aura_vision_ladybug_1795433121288.jpg',
      'https://res.cloudinary.com/fukpn05e/image/upload/v1795433121/uandwelabs/cms/aura_sentinel_ladybug_1795433118929.jpg',
    ]
    criticalImages.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  // Persist current page & ananda category in sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('uandwe_current_page', currentPage)
      sessionStorage.setItem('ananda_category', anandaCategory)
      sessionStorage.setItem('uandwe_login_mode', loginMode)
    } catch { }
  }, [currentPage, anandaCategory, loginMode])

  // Maintain clean pathname in URL bar (instantly scrub any # hash or /hero on Home)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const targetPath = getPathForState(currentPage, anandaCategory, loginMode)
    const currentPath = window.location.pathname.toLowerCase()
    const currentHash = window.location.hash.toLowerCase()
    const hasHash = Boolean(window.location.hash)

    // Scrub /hero or #hero immediately to clean root /
    if (currentHash === '#hero' || currentPath === '/hero') {
      window.history.replaceState({ idx: currentHistoryIdxRef.current, page: 'home' }, '', '/')
      return
    }

    const isRootTarget = targetPath === '/'
    const isCurrentRoot = currentPath === '' || currentPath === '/'

    if (hasHash || (isRootTarget ? !isCurrentRoot : currentPath !== targetPath)) {
      window.history.replaceState({ idx: currentHistoryIdxRef.current, page: currentPage }, '', targetPath)
    }
  }, [currentPage, anandaCategory, loginMode])

  // Listen to browser Back/Forward (popstate) with directional recognition
  useEffect(() => {
    const handleLocationChange = (event) => {
      const info = getRouteInfo()
      const prevIdx = currentHistoryIdxRef.current
      const newIdx = event?.state?.idx ?? 0

      let dir = 1
      if (newIdx < prevIdx) {
        dir = -1 // User clicked Browser Back (slide from Left)
      } else if (newIdx > prevIdx) {
        dir = 1  // User clicked Browser Forward (slide from Right)
      } else {
        dir = calculateNavDirection(currentPageRef.current, info.page)
      }

      currentHistoryIdxRef.current = newIdx
      setNavDirection(dir)
      setCurrentPage(info.page)
      currentPageRef.current = info.page
      setAnandaCategory(info.category)
      setLoginMode(info.mode)
      try {
        sessionStorage.setItem('uandwe_current_page', info.page)
        sessionStorage.setItem('ananda_category', info.category)
      } catch { }

      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true })
      }
      window.scrollTo({ top: 0, behavior: 'instant' })

      // If user navigated to a home page section like /introduction or /beliefs
      const path = window.location.pathname.toLowerCase().replace(/^\/+/, '').replace(/\/+$/, '')
      if (path && (path === 'introduction' || path === 'beliefs' || path === 'healthcare' || path === 'board')) {
        setTimeout(() => {
          const el = document.getElementById(path)
          if (el) {
            if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.2 })
            else el.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      }
    }

    window.addEventListener('popstate', handleLocationChange)
    window.addEventListener('hashchange', handleLocationChange)
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.removeEventListener('hashchange', handleLocationChange)
    }
  }, [currentPage])

  const [redirectTarget, setRedirectTarget] = useState(null)

  // In-app navigation stack (tracks breadcrumbs so Back goes to previous page)
  const pageHistoryRef = useRef([getRouteInfo().page])

  // Unified Directional Page Navigator
  const navigateToPage = (targetPage, path, category = null, mode = null) => {
    const dir = calculateNavDirection(currentPageRef.current, targetPage)
    setNavDirection(dir)
    setCurrentPage(targetPage)
    currentPageRef.current = targetPage
    if (category) setAnandaCategory(category)
    if (mode) setLoginMode(mode)

    try {
      sessionStorage.setItem('uandwe_current_page', targetPage)
      if (category) sessionStorage.setItem('ananda_category', category)
      if (mode) sessionStorage.setItem('uandwe_login_mode', mode)
    } catch { }

    const nextIdx = (currentHistoryIdxRef.current || 0) + 1
    currentHistoryIdxRef.current = nextIdx
    window.history.pushState({ idx: nextIdx, page: targetPage }, '', path)
    pageHistoryRef.current.push(targetPage)

    if (typeof window !== 'undefined' && window.parent !== window) {
      try {
        window.parent.postMessage({ type: 'ROUTE_CHANGE', path, page: targetPage }, '*')
      } catch {}
    }

    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true })
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // Smart Back Navigator: Returns to previous page (e.g. Careers -> Blogs), or Home if opened directly
  const handleNavigateBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1 && currentHistoryIdxRef.current > 0) {
      window.history.back()
      return
    }

    if (pageHistoryRef.current.length > 1) {
      pageHistoryRef.current.pop()
      const prevPage = pageHistoryRef.current[pageHistoryRef.current.length - 1]
      const targetPath = getPathForState(prevPage, anandaCategory, loginMode)
      navigateToPage(prevPage, targetPath)
      return
    }

    handleNavigateToHome()
  }

  // Called when user completes login / sign up: route to destination or home page
  const handleLogin = (userData, selectedDestination = null) => {
    const activeProd =
      userData?.selectedProduct ||
      (selectedDestination && selectedDestination !== 'all' ? selectedDestination : null) ||
      sessionStorage.getItem('uandwe_selected_product') ||
      'ananda'
    const enrichedUser = {
      ...userData,
      selectedProduct: activeProd,
    }

    // Save into multi-account manager (max 2 accounts kept)
    const updatedAccounts = saveAccount(enrichedUser)
    setSavedAccounts(updatedAccounts)
    setUser(enrichedUser)
    showToast(`Welcome back, ${enrichedUser.name || 'Engineer'}!`, 'success')
    try {
      sessionStorage.setItem('uandwe_selected_product', activeProd)
    } catch (err) {
      console.error('Failed to save session:', err)
    }

    const target = (selectedDestination && selectedDestination !== 'all') ? selectedDestination : redirectTarget
    setRedirectTarget(null)

    // Determine target platform category
    let cat = 'commercial'
    if (target === 'ananda-residential') {
      cat = 'residential'
    } else if (target === 'ananda') {
      cat = 'commercial'
    } else {
      try {
        const saved = sessionStorage.getItem('ananda_category') || localStorage.getItem('uandwe_active_platform')
        if (saved === 'residential') cat = 'residential'
      } catch {
        // ignore
      }
    }

    setAnandaCategory(cat)
    try {
      sessionStorage.setItem('ananda_category', cat)
      localStorage.setItem('uandwe_active_platform', cat)
    } catch {
      // ignore
    }

    // If destination was Ananda Commercial or Residency
    if (target === 'ananda' || target === 'ananda-residential') {
      navigateToPage('ananda', target === 'ananda-residential' ? '/ananda-residential' : '/ananda', cat)
      return
    }

    if (target === 'dara') {
      navigateToPage('dara', '/dara')
      return
    }

    if (target === 'aura') {
      navigateToPage('aura', '/aura')
      return
    }

    if (target === 'blogs' || target === 'blog') {
      navigateToPage('blogs', '/blogs')
      return
    }

    if (target === 'about' || target === 'about-us') {
      navigateToPage('about', '/about')
      return
    }

    if (target === 'careers' || target === 'career' || target === 'jobs') {
      navigateToPage('careers', '/careers')
      return
    }

    navigateToPage('home', '/')

    if (target && target !== 'home' && target !== 'hero') {
      setTimeout(() => {
        const el = document.getElementById(target)
        if (el) {
          if (window.__lenis) {
            window.__lenis.scrollTo(el, { duration: 1.2 })
          } else {
            el.scrollIntoView({ behavior: 'smooth' })
          }
        }
      }, 150)
    }
  }

  // 1-Click Multi-Account Switcher (Swaps between up to 2 saved accounts instantly)
  const handleSwitchAccount = (targetAccount) => {
    if (!targetAccount) return
    const newActive = switchActiveAccount(targetAccount)
    if (!newActive) return

    setUser(newActive)
    setSavedAccounts(getSavedAccounts())
    showToast(`Switched account to ${newActive.name || newActive.email}`, 'info')

    // Update active workspace
    const targetProd = newActive.selectedProduct || 'ananda'
    try {
      sessionStorage.setItem('uandwe_selected_product', targetProd)
    } catch { }

    if (targetProd === 'ananda-residential') {
      navigateToPage('ananda', '/ananda-residential', 'residential')
    } else if (targetProd === 'ananda') {
      navigateToPage('ananda', '/ananda', 'commercial')
    } else if (targetProd === 'dara') {
      navigateToPage('dara', '/dara')
    } else if (targetProd === 'aura') {
      navigateToPage('aura', '/aura')
    }
  }

  // Seamless Product Switcher for the Active Logged-In User
  const handleSwitchProduct = (productKey) => {
    if (!productKey || !user) return
    const updatedUser = {
      ...user,
      selectedProduct: productKey,
    }
    setUser(updatedUser)
    try {
      localStorage.setItem('uandwe_user', JSON.stringify(updatedUser))
      sessionStorage.setItem('uandwe_selected_product', productKey)
    } catch { }

    // Update in saved accounts
    const updatedAccounts = saveAccount(updatedUser)
    setSavedAccounts(updatedAccounts)

    if (productKey === 'ananda-residential') {
      navigateToPage('ananda', '/ananda-residential', 'residential')
    } else if (productKey === 'ananda') {
      navigateToPage('ananda', '/ananda', 'commercial')
    } else if (productKey === 'dara') {
      navigateToPage('dara', '/dara')
    } else if (productKey === 'aura') {
      navigateToPage('aura', '/aura')
    }
  }

  // Remove a saved account from the list
  const handleRemoveAccount = (email, selectedProduct) => {
    const { remaining, nextActive } = removeSavedAccount(email, selectedProduct)
    setSavedAccounts(remaining)
    if (nextActive) {
      setUser(nextActive)
      handleSwitchAccount(nextActive)
    } else {
      setUser(null)
      navigateToPage('home', '/')
    }
  }

  // On logout: can log out of active account or all accounts
  const handleLogout = (all = false) => {
    showToast(all ? 'Signed out of all accounts' : 'Signed out successfully', 'info')
    if (all) {
      clearAllSavedAccounts()
      setSavedAccounts([])
      setUser(null)
      navigateToPage('home', '/')
      return
    }

    if (user) {
      const { remaining, nextActive } = removeSavedAccount(user.email, user.selectedProduct)
      setSavedAccounts(remaining)
      if (nextActive) {
        setUser(nextActive)
        handleSwitchAccount(nextActive)
        return
      }
    }

    clearAllSavedAccounts()
    setSavedAccounts([])
    setUser(null)
    navigateToPage('home', '/')
  }

  const handleAddAccount = () => {
    handleNavigateToLogin('signin')
  }

  const handleNavigateToLogin = (mode = 'signup', target = null) => {
    setRedirectTarget(target)
    const path = mode === 'signup' ? '/signup' : '/login'
    navigateToPage('login', path, null, mode)
  }

  const handleNavigateToHome = () => {
    try {
      sessionStorage.setItem('uandwe_active_section', 'hero')
      sessionStorage.removeItem('ananda_scroll_y')
    } catch { }
    navigateToPage('home', '/')
  }

  const handleNavigateToAnanda = (category = 'commercial') => {
    const path = category === 'residential' ? '/ananda-residential' : '/ananda'
    navigateToPage('ananda', path, category)
  }

  const handleNavigateToDara = () => {
    navigateToPage('dara', '/dara')
  }

  const handleNavigateToAura = () => {
    navigateToPage('aura', '/aura')
  }

  const handleNavigateToBlogs = () => {
    navigateToPage('blogs', '/blogs')
  }

  const handleNavigateToAbout = () => {
    navigateToPage('about', '/about')
  }

  const handleNavigateToCareers = () => {
    navigateToPage('careers', '/careers')
  }

  const handleNavigateToPrivacy = () => {
    navigateToPage('privacy', '/privacy')
  }

  const handleNavigateToSecurity = () => {
    navigateToPage('security', '/security')
  }

  const handleNavigateToTerms = () => {
    navigateToPage('terms', '/terms')
  }

  // Confidential Admin Hotkey: Ctrl + Shift + A (opens independent Admin CMS Studio on port 5175)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault()
        window.open('http://localhost:5175', '_blank')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Active navigation indicator for the unified header
  const activeNav =
    currentPage === 'ananda' || currentPage === 'dara' || currentPage === 'aura'
      ? 'products'
      : currentPage === 'blogs'
        ? 'blogs'
        : currentPage === 'about'
          ? 'about'
          : currentPage === 'careers'
            ? 'careers'
            : 'home'

  return (
    <>
      {/* ========================================================= */}
      {/* UNIFIED GLOBAL HEADER (Mounted once across entire app)    */}
      {/* ========================================================= */}
      {currentPage !== 'login' && (
        <Header
          activeNav={activeNav}
          currentPage={currentPage}
          user={user}
          savedAccounts={savedAccounts}
          onSwitchAccount={handleSwitchAccount}
          onSwitchProduct={handleSwitchProduct}
          onAddAccount={handleAddAccount}
          onRemoveAccount={handleRemoveAccount}
          onLogout={handleLogout}
          onNavigateToLogin={handleNavigateToLogin}
          onNavigateToHome={handleNavigateToHome}
          onNavigateToAnanda={handleNavigateToAnanda}
          onNavigateToDara={handleNavigateToDara}
          onNavigateToAura={handleNavigateToAura}
          onNavigateToBlogs={handleNavigateToBlogs}
          onNavigateToAbout={handleNavigateToAbout}
          onNavigateToCareers={handleNavigateToCareers}
          anandaCategory={anandaCategory}
          isRevealed={true}
        />
      )}

      {/* ========================================================= */}
      {/* DIRECTIONAL SLIDE PAGE CONTAINER (CSS GRID STACKING)      */}
      {/* Next page: slides in from Right (+100%) on top (z-20)     */}
      {/* Back page: slides in from Left (-100%) on top (z-20)      */}
      {/* Exiting page stays visible underneath -> ZERO WHITE SCREEN*/}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 grid-rows-1 w-full min-h-screen relative bg-white" style={{ overflowX: 'clip' }}>
        <AnimatePresence initial={false} custom={navDirection}>
          <motion.div
            key={currentPage + (currentPage === 'ananda' ? `-${anandaCategory}` : '')}
            custom={navDirection}
            variants={pageTransitionVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className={`col-start-1 row-start-1 w-full min-h-screen ${currentPage === 'login' ? 'bg-black' : 'bg-white'
              }`}
          >
            {/* Show Login standalone full page */}
            {currentPage === 'login' && (
              <LoginPage
                onLogin={handleLogin}
                onNavigateToHome={handleNavigateToHome}
                onNavigateBack={handleNavigateBack}
                initialMode={loginMode}
                redirectTarget={redirectTarget}
              />
            )}

            {/* Show Ananda GeoSpatial standalone full page */}
            {currentPage === 'ananda' && (
              <AnandaPage
                user={user}
                onLogout={handleLogout}
                onNavigateToHome={handleNavigateToHome}
                onNavigateBack={handleNavigateBack}
                onNavigateToLogin={handleNavigateToLogin}
                onNavigateToAnanda={handleNavigateToAnanda}
                onNavigateToDara={handleNavigateToDara}
                onNavigateToAura={handleNavigateToAura}
                onNavigateToBlogs={handleNavigateToBlogs}
                onNavigateToAbout={handleNavigateToAbout}
                onNavigateToCareers={handleNavigateToCareers}
                onNavigateToPrivacy={handleNavigateToPrivacy}
                onNavigateToTerms={handleNavigateToTerms}
                initialCategory={anandaCategory}
              />
            )}

            {/* Show Dara Healthcare standalone full page */}
            {currentPage === 'dara' && (
              <DaraPage
                user={user}
                onLogout={handleLogout}
                onNavigateToHome={handleNavigateToHome}
                onNavigateBack={handleNavigateBack}
                onNavigateToLogin={handleNavigateToLogin}
                onNavigateToAnanda={handleNavigateToAnanda}
                onNavigateToDara={handleNavigateToDara}
                onNavigateToAura={handleNavigateToAura}
                onNavigateToBlogs={handleNavigateToBlogs}
                onNavigateToAbout={handleNavigateToAbout}
                onNavigateToCareers={handleNavigateToCareers}
                onNavigateToPrivacy={handleNavigateToPrivacy}
                onNavigateToTerms={handleNavigateToTerms}
              />
            )}

            {/* Show Aura Physical AI standalone full page */}
            {currentPage === 'aura' && (
              <AuraPage
                user={user}
                onLogout={handleLogout}
                onNavigateToHome={handleNavigateToHome}
                onNavigateBack={handleNavigateBack}
                onNavigateToLogin={handleNavigateToLogin}
                onNavigateToAnanda={handleNavigateToAnanda}
                onNavigateToDara={handleNavigateToDara}
                onNavigateToAura={handleNavigateToAura}
                onNavigateToBlogs={handleNavigateToBlogs}
                onNavigateToAbout={handleNavigateToAbout}
                onNavigateToCareers={handleNavigateToCareers}
                onNavigateToPrivacy={handleNavigateToPrivacy}
                onNavigateToTerms={handleNavigateToTerms}
              />
            )}

            {/* Show Blogs standalone full page */}
            {currentPage === 'blogs' && (
              <BlogPage
                user={user}
                onLogout={handleLogout}
                onNavigateToHome={handleNavigateToHome}
                onNavigateBack={handleNavigateBack}
                onNavigateToLogin={handleNavigateToLogin}
                onNavigateToAnanda={handleNavigateToAnanda}
                onNavigateToDara={handleNavigateToDara}
                onNavigateToAura={handleNavigateToAura}
                onNavigateToBlogs={handleNavigateToBlogs}
                onNavigateToAbout={handleNavigateToAbout}
                onNavigateToCareers={handleNavigateToCareers}
                onNavigateToPrivacy={handleNavigateToPrivacy}
                onNavigateToTerms={handleNavigateToTerms}
              />
            )}

            {/* Show About Us standalone full page */}
            {currentPage === 'about' && (
              <AboutUsPage
                user={user}
                onLogout={handleLogout}
                onNavigateToHome={handleNavigateToHome}
                onNavigateBack={handleNavigateBack}
                onNavigateToLogin={handleNavigateToLogin}
                onNavigateToAnanda={handleNavigateToAnanda}
                onNavigateToDara={handleNavigateToDara}
                onNavigateToAura={handleNavigateToAura}
                onNavigateToBlogs={handleNavigateToBlogs}
                onNavigateToAbout={handleNavigateToAbout}
                onNavigateToCareers={handleNavigateToCareers}
                onNavigateToPrivacy={handleNavigateToPrivacy}
                onNavigateToTerms={handleNavigateToTerms}
              />
            )}

            {/* Show Careers standalone full page */}
            {currentPage === 'careers' && (
              <CareersPage
                user={user}
                onLogout={handleLogout}
                onNavigateToHome={handleNavigateToHome}
                onNavigateBack={handleNavigateBack}
                onNavigateToLogin={handleNavigateToLogin}
                onNavigateToAnanda={handleNavigateToAnanda}
                onNavigateToDara={handleNavigateToDara}
                onNavigateToAura={handleNavigateToAura}
                onNavigateToBlogs={handleNavigateToBlogs}
                onNavigateToAbout={handleNavigateToAbout}
                onNavigateToCareers={handleNavigateToCareers}
                onNavigateToPrivacy={handleNavigateToPrivacy}
                onNavigateToSecurity={handleNavigateToSecurity}
                onNavigateToTerms={handleNavigateToTerms}
              />
            )}

            {/* Show Privacy Policy standalone full page */}
            {currentPage === 'privacy' && (
              <PrivacyPolicyPage
                user={user}
                onLogout={handleLogout}
                onNavigateToHome={handleNavigateToHome}
                onNavigateBack={handleNavigateBack}
                onNavigateToLogin={handleNavigateToLogin}
                onNavigateToAnanda={handleNavigateToAnanda}
                onNavigateToDara={handleNavigateToDara}
                onNavigateToAura={handleNavigateToAura}
                onNavigateToBlogs={handleNavigateToBlogs}
                onNavigateToAbout={handleNavigateToAbout}
                onNavigateToCareers={handleNavigateToCareers}
                onNavigateToPrivacy={handleNavigateToPrivacy}
                onNavigateToSecurity={handleNavigateToSecurity}
                onNavigateToTerms={handleNavigateToTerms}
              />
            )}

            {/* Show Security standalone full page */}
            {currentPage === 'security' && (
              <SecurityPage
                user={user}
                onLogout={handleLogout}
                onNavigateToHome={handleNavigateToHome}
                onNavigateBack={handleNavigateBack}
                onNavigateToLogin={handleNavigateToLogin}
                onNavigateToAnanda={handleNavigateToAnanda}
                onNavigateToDara={handleNavigateToDara}
                onNavigateToAura={handleNavigateToAura}
                onNavigateToBlogs={handleNavigateToBlogs}
                onNavigateToAbout={handleNavigateToAbout}
                onNavigateToCareers={handleNavigateToCareers}
                onNavigateToPrivacy={handleNavigateToPrivacy}
                onNavigateToSecurity={handleNavigateToSecurity}
                onNavigateToTerms={handleNavigateToTerms}
              />
            )}

            {/* Show Terms standalone full page */}
            {currentPage === 'terms' && (
              <TermsPage
                user={user}
                onLogout={handleLogout}
                onNavigateToHome={handleNavigateToHome}
                onNavigateBack={handleNavigateBack}
                onNavigateToLogin={handleNavigateToLogin}
                onNavigateToAnanda={handleNavigateToAnanda}
                onNavigateToDara={handleNavigateToDara}
                onNavigateToAura={handleNavigateToAura}
                onNavigateToBlogs={handleNavigateToBlogs}
                onNavigateToAbout={handleNavigateToAbout}
                onNavigateToCareers={handleNavigateToCareers}
                onNavigateToPrivacy={handleNavigateToPrivacy}
                onNavigateToSecurity={handleNavigateToSecurity}
                onNavigateToTerms={handleNavigateToTerms}
              />
            )}

            {/* Show Home page */}
            {currentPage === 'home' && (
              <HomePage
                user={user}
                onLogout={handleLogout}
                onNavigateToLogin={handleNavigateToLogin}
                onNavigateToAnanda={handleNavigateToAnanda}
                onNavigateToDara={handleNavigateToDara}
                onNavigateToAura={handleNavigateToAura}
                onNavigateToBlogs={handleNavigateToBlogs}
                onNavigateToAbout={handleNavigateToAbout}
                onNavigateToCareers={handleNavigateToCareers}
                onNavigateToPrivacy={handleNavigateToPrivacy}
                onNavigateToSecurity={handleNavigateToSecurity}
                onNavigateToTerms={handleNavigateToTerms}
                anandaCategory={anandaCategory}
                welcomeMessage={welcomeMessage}
                onDismissWelcome={() => setWelcomeMessage('')}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ========================================================= */}
      {/* UNIFIED GLOBAL FOOTER (Mounted once across entire app)    */}
      {/* ========================================================= */}
      {currentPage !== 'login' && (
        <Footer
          onNavigateToHome={handleNavigateToHome}
          onNavigateToAnanda={handleNavigateToAnanda}
          onNavigateToDara={handleNavigateToDara}
          onNavigateToAura={handleNavigateToAura}
          onNavigateToBlogs={handleNavigateToBlogs}
          onNavigateToAbout={handleNavigateToAbout}
          onNavigateToCareers={handleNavigateToCareers}
          onNavigateToPrivacy={handleNavigateToPrivacy}
          onNavigateToSecurity={handleNavigateToSecurity}
          onNavigateToTerms={handleNavigateToTerms}
          user={user}
        />
      )}

      {/* ========================================================= */}
      {/* GLOBAL LUXURY IN-APP AUTH REQUIRED PROMPT MODAL            */}
      {/* ========================================================= */}
      <AuthPromptModal
        open={authModal.isOpen}
        onClose={() => setAuthModal((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={handleAuthModalConfirm}
        title={authModal.title}
        message={authModal.message}
        productKey={authModal.productKey}
        actionText={authModal.actionText}
      />

      <ScrollToTop />
      <ToastContainer />
    </>
  )
}

export default App
