import { useState, useEffect } from 'react'
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
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import AuthPromptModal from './components/AuthPromptModal'
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

  // Multi-Account Sessions (maximum 2 accounts in the switcher)
  const [savedAccounts, setSavedAccounts] = useState(() => getSavedAccounts())

  // Initialize from hash or storage if present
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase()

      // If user was on home page, stay on home page across refresh unless an explicit standalone page is targeted
      try {
        const savedPage = sessionStorage.getItem('uandwe_current_page')
        if (savedPage === 'home') {
          const isExplicitStandalone =
            hash === '#login' || hash === '#signin' || hash === '#signup' ||
            hash === '#ananda' || hash === '#ananda-commercial' || hash === '#ananda-residential' ||
            hash === '#dara' || hash === '#aura' ||
            hash === '#blogs' || hash === '#blog' ||
            hash === '#about' || hash === '#about-us' ||
            hash === '#privacy' || hash === '#security' || hash === '#terms'
          if (!isExplicitStandalone) {
            return 'home'
          }
        }
      } catch {}

      if (hash === '#login' || hash === '#signin' || hash === '#signup') {
        return 'login'
      }
      if (hash === '#ananda' || hash === '#geospatial' || hash === '#ananda-commercial' || hash === '#ananda-residential') {
        return 'ananda'
      }
      if (hash === '#dara') {
        return 'dara'
      }
      if (hash === '#aura' || hash === '#physical-ai') {
        return 'aura'
      }
      if (hash === '#blogs' || hash === '#blog') {
        return 'blogs'
      }
      if (hash === '#about' || hash === '#about-us') {
        return 'about'
      }
      if (hash === '#careers' || hash === '#career' || hash === '#jobs') {
        return 'careers'
      }
      if (hash === '#privacy' || hash === '#privacy-policy') {
        return 'privacy'
      }
      if (hash === '#security' || hash === '#security-compliance') {
        return 'security'
      }
      if (hash === '#terms' || hash === '#terms-of-service') {
        return 'terms'
      }
      try {
        const savedPage = sessionStorage.getItem('uandwe_current_page')
        if (
          savedPage === 'login' ||
          savedPage === 'ananda' ||
          savedPage === 'dara' ||
          savedPage === 'aura' ||
          savedPage === 'blogs' ||
          savedPage === 'about' ||
          savedPage === 'careers' ||
          savedPage === 'privacy' ||
          savedPage === 'security' ||
          savedPage === 'terms'
        )
          return savedPage
      } catch {}
    }
    return 'home'
  })
  const [anandaCategory, setAnandaCategory] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase()
      if (hash === '#ananda-residential') return 'residential'
      try {
        const savedCat = sessionStorage.getItem('ananda_category')
        if (savedCat) return savedCat
      } catch {}
    }
    return 'commercial'
  })
  const [loginMode, setLoginMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase()
      if (hash === '#signin' || hash === '#login') return 'signin'
      if (hash === '#signup' || hash === '#register') return 'signup'
      try {
        const savedMode = sessionStorage.getItem('uandwe_login_mode')
        if (savedMode === 'signup' || savedMode === 'signin') return savedMode
      } catch {}
    }
    return 'signup'
  })
  const [welcomeMessage, setWelcomeMessage] = useState('')

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

  // Persist current page & ananda category in sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('uandwe_current_page', currentPage)
      sessionStorage.setItem('ananda_category', anandaCategory)
      sessionStorage.setItem('uandwe_login_mode', loginMode)
    } catch {}
  }, [currentPage, anandaCategory, loginMode])

  // Maintain correct hash in URL bar when navigating between dedicated pages
  useEffect(() => {
    if (currentPage === 'login') {
      const currentHash = window.location.hash.toLowerCase()
      if (currentHash !== '#login' && currentHash !== '#signin' && currentHash !== '#signup') {
        window.history.replaceState(null, '', loginMode === 'signup' ? '#signup' : '#login')
      }
    } else if (currentPage === 'ananda') {
      const currentHash = window.location.hash.toLowerCase()
      if (!currentHash.includes('ananda') && !currentHash.includes('geospatial')) {
        window.history.replaceState(null, '', anandaCategory === 'residential' ? '#ananda-residential' : '#ananda')
      }
    } else if (currentPage === 'dara') {
      const currentHash = window.location.hash.toLowerCase()
      if (!currentHash.includes('dara') && !currentHash.includes('healthcare')) {
        window.history.replaceState(null, '', '#dara')
      }
    } else if (currentPage === 'aura') {
      const currentHash = window.location.hash.toLowerCase()
      if (!currentHash.includes('aura') && !currentHash.includes('board') && !currentHash.includes('physical-ai')) {
        window.history.replaceState(null, '', '#aura')
      }
    } else if (currentPage === 'blogs') {
      const currentHash = window.location.hash.toLowerCase()
      if (!currentHash.includes('blog')) {
        window.history.replaceState(null, '', '#blogs')
      }
    } else if (currentPage === 'about') {
      const currentHash = window.location.hash.toLowerCase()
      if (!currentHash.includes('about')) {
        window.history.replaceState(null, '', '#about')
      }
    } else if (currentPage === 'careers') {
      const currentHash = window.location.hash.toLowerCase()
      if (!currentHash.includes('career') && !currentHash.includes('jobs')) {
        window.history.replaceState(null, '', '#careers')
      }
    } else if (currentPage === 'privacy') {
      const currentHash = window.location.hash.toLowerCase()
      if (!currentHash.includes('privacy')) {
        window.history.replaceState(null, '', '#privacy')
      }
    } else if (currentPage === 'security') {
      const currentHash = window.location.hash.toLowerCase()
      if (!currentHash.includes('security')) {
        window.history.replaceState(null, '', '#security')
      }
    } else if (currentPage === 'terms') {
      const currentHash = window.location.hash.toLowerCase()
      if (!currentHash.includes('terms')) {
        window.history.replaceState(null, '', '#terms')
      }
    }
  }, [currentPage, anandaCategory, loginMode])

  // Hash route listener to allow user-initiated navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase()
      if (hash === '#login' || hash === '#signin') {
        setCurrentPage('login')
        setLoginMode('signin')
      } else if (hash === '#signup') {
        setCurrentPage('login')
        setLoginMode('signup')
      } else if (hash === '#ananda' || hash === '#geospatial' || hash === '#ananda-commercial') {
        setAnandaCategory('commercial')
        setCurrentPage('ananda')
      } else if (hash === '#ananda-residential') {
        setAnandaCategory('residential')
        setCurrentPage('ananda')
      } else if (hash === '#dara') {
        setCurrentPage('dara')
      } else if (hash === '#aura' || hash === '#physical-ai') {
        setCurrentPage('aura')
      } else if (hash === '#blogs' || hash === '#blog') {
        setCurrentPage('blogs')
      } else if (hash === '#about' || hash === '#about-us') {
        setCurrentPage('about')
      } else if (hash === '#careers' || hash === '#career' || hash === '#jobs') {
        try {
          if (sessionStorage.getItem('uandwe_current_page') === 'home') {
            setCurrentPage('home')
            return
          }
        } catch {}
        setCurrentPage('careers')
      } else if (hash === '#privacy' || hash === '#privacy-policy') {
        setCurrentPage('privacy')
        try { sessionStorage.setItem('uandwe_current_page', 'privacy') } catch {}
        if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
        window.scrollTo({ top: 0, behavior: 'instant' })
      } else if (hash === '#security' || hash === '#security-compliance') {
        setCurrentPage('security')
        try { sessionStorage.setItem('uandwe_current_page', 'security') } catch {}
        if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
        window.scrollTo({ top: 0, behavior: 'instant' })
      } else if (hash === '#terms' || hash === '#terms-of-service') {
        setCurrentPage('terms')
        try { sessionStorage.setItem('uandwe_current_page', 'terms') } catch {}
        if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
        window.scrollTo({ top: 0, behavior: 'instant' })
      } else if (
        hash === '#healthcare' ||
        hash === '#board' ||
        hash === '#introduction' ||
        hash === '#beliefs' ||
        hash === '#hero' ||
        hash === '' ||
        hash === '#'
      ) {
        setCurrentPage('home')
      } else {
        setCurrentPage('home')
      }
    }
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const [redirectTarget, setRedirectTarget] = useState(null)

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
      setCurrentPage('ananda')
      window.history.replaceState(null, '', window.location.pathname)
      window.location.hash = target
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }

    if (target === 'dara') {
      setCurrentPage('dara')
      window.location.hash = 'dara'
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }

    if (target === 'aura') {
      setCurrentPage('aura')
      window.location.hash = 'aura'
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }

    if (target === 'blogs' || target === 'blog') {
      setCurrentPage('blogs')
      window.location.hash = 'blogs'
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }

    if (target === 'about' || target === 'about-us') {
      setCurrentPage('about')
      window.location.hash = 'about'
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }

    if (target === 'careers' || target === 'career' || target === 'jobs') {
      setCurrentPage('careers')
      window.location.hash = 'careers'
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }

    setCurrentPage('home')
    window.history.replaceState(null, '', window.location.pathname)

    if (target) {
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
    } else {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
    }
  }

  // 1-Click Multi-Account Switcher (Swaps between up to 2 saved accounts instantly)
  const handleSwitchAccount = (targetAccount) => {
    if (!targetAccount) return
    const newActive = switchActiveAccount(targetAccount)
    if (!newActive) return

    setUser(newActive)
    setSavedAccounts(getSavedAccounts())

    // Update active workspace
    const targetProd = newActive.selectedProduct || 'ananda'
    try {
      sessionStorage.setItem('uandwe_selected_product', targetProd)
    } catch {}

    if (targetProd === 'ananda-residential') {
      setAnandaCategory('residential')
      setCurrentPage('ananda')
      window.location.hash = 'ananda-residential'
      window.scrollTo({ top: 0, behavior: 'instant' })
    } else if (targetProd === 'ananda') {
      setAnandaCategory('commercial')
      setCurrentPage('ananda')
      window.location.hash = 'ananda'
      window.scrollTo({ top: 0, behavior: 'instant' })
    } else if (targetProd === 'dara') {
      setCurrentPage('dara')
      window.location.hash = 'dara'
      window.scrollTo({ top: 0, behavior: 'instant' })
    } else if (targetProd === 'aura') {
      setCurrentPage('aura')
      window.location.hash = 'aura'
      window.scrollTo({ top: 0, behavior: 'instant' })
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
    } catch {}

    // Update in saved accounts
    const updatedAccounts = saveAccount(updatedUser)
    setSavedAccounts(updatedAccounts)

    if (productKey === 'ananda-residential') {
      setAnandaCategory('residential')
      setCurrentPage('ananda')
      window.location.hash = 'ananda-residential'
      window.scrollTo({ top: 0, behavior: 'instant' })
    } else if (productKey === 'ananda') {
      setAnandaCategory('commercial')
      setCurrentPage('ananda')
      window.location.hash = 'ananda'
      window.scrollTo({ top: 0, behavior: 'instant' })
    } else if (productKey === 'dara') {
      setCurrentPage('dara')
      window.location.hash = 'dara'
      window.scrollTo({ top: 0, behavior: 'instant' })
    } else if (productKey === 'aura') {
      setCurrentPage('aura')
      window.location.hash = 'aura'
      window.scrollTo({ top: 0, behavior: 'instant' })
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
      setCurrentPage('home')
      window.history.replaceState(null, '', window.location.pathname)
    }
  }

  // On logout: can log out of active account or all accounts
  const handleLogout = (all = false) => {
    if (all) {
      clearAllSavedAccounts()
      setSavedAccounts([])
      setUser(null)
      setCurrentPage('home')
      window.history.replaceState(null, '', window.location.pathname)
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
    setCurrentPage('home')
    window.history.replaceState(null, '', window.location.pathname)
  }

  const handleAddAccount = () => {
    handleNavigateToLogin('signin')
  }

  const handleNavigateToLogin = (mode = 'signup', target = null) => {
    setLoginMode(mode)
    setRedirectTarget(target)
    setCurrentPage('login')
    try {
      sessionStorage.setItem('uandwe_current_page', 'login')
      sessionStorage.setItem('uandwe_login_mode', mode)
    } catch {}
    window.location.hash = mode === 'signup' ? 'signup' : 'login'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavigateToHome = () => {
    setCurrentPage('home')
    try {
      sessionStorage.setItem('uandwe_current_page', 'home')
      sessionStorage.setItem('uandwe_active_section', 'hero')
      sessionStorage.removeItem('ananda_scroll_y')
    } catch {}
    window.location.hash = 'hero'
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }

  const handleNavigateToAnanda = (category = 'commercial') => {
    setAnandaCategory(category)
    setCurrentPage('ananda')
    window.location.hash = category === 'residential' ? 'ananda-residential' : 'ananda'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleNavigateToDara = () => {
    setCurrentPage('dara')
    window.location.hash = 'dara'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleNavigateToAura = () => {
    setCurrentPage('aura')
    window.location.hash = 'aura'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleNavigateToBlogs = () => {
    setCurrentPage('blogs')
    window.location.hash = 'blogs'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleNavigateToAbout = () => {
    setCurrentPage('about')
    try {
      sessionStorage.setItem('uandwe_current_page', 'about')
    } catch {}
    window.location.hash = 'about'
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true })
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleNavigateToCareers = () => {
    setCurrentPage('careers')
    try {
      sessionStorage.setItem('uandwe_current_page', 'careers')
    } catch {}
    window.location.hash = 'careers'
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true })
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleNavigateToPrivacy = () => {
    setCurrentPage('privacy')
    try {
      sessionStorage.setItem('uandwe_current_page', 'privacy')
    } catch {}
    window.location.hash = 'privacy'
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true })
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleNavigateToSecurity = () => {
    setCurrentPage('security')
    try {
      sessionStorage.setItem('uandwe_current_page', 'security')
    } catch {}
    window.location.hash = 'security'
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true })
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleNavigateToTerms = () => {
    setCurrentPage('terms')
    try {
      sessionStorage.setItem('uandwe_current_page', 'terms')
    } catch {}
    window.location.hash = 'terms'
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true })
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // Show LoginPage if on login route
  if (currentPage === 'login') {
    return (
      <LoginPage
        onLogin={handleLogin}
        onNavigateToHome={handleNavigateToHome}
        initialMode={loginMode}
        redirectTarget={redirectTarget}
      />
    )
  }

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

      {/* Show Ananda GeoSpatial standalone full page */}
      {currentPage === 'ananda' && (
        <AnandaPage
          user={user}
          onLogout={handleLogout}
          onNavigateToHome={handleNavigateToHome}
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

      {/* ========================================================= */}
      {/* UNIFIED GLOBAL FOOTER (Mounted once across entire app)    */}
      {/* ========================================================= */}
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
    </>
  )
}

export default App
