import { useState, useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'

function App() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('uandwe_user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  // Always default to 'home' so visitors immediately see the website first
  const [currentPage, setCurrentPage] = useState('home')
  const [loginMode, setLoginMode] = useState('signin')
  const [welcomeMessage, setWelcomeMessage] = useState('')

  // On initial mount, ensure any lingering #login or #signup hash is cleared so the website home page is shown
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase()
      if (hash === '#login' || hash === '#signup') {
        window.history.replaceState(null, '', window.location.pathname)
      }
    }
  }, [])

  // Hash route listener to allow user-initiated navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase()
      if (hash === '#login') {
        setCurrentPage('login')
        setLoginMode('signin')
      } else if (hash === '#signup') {
        setCurrentPage('login')
        setLoginMode('signup')
      } else {
        setCurrentPage('home')
      }
    }
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const [redirectTarget, setRedirectTarget] = useState(null)

  // Called when user completes login / sign up: immediately return to home page
  const handleLogin = (userData) => {
    setUser(userData)
    try {
      localStorage.setItem('uandwe_user', JSON.stringify(userData))
    } catch (err) {
      console.error('Failed to save session:', err)
    }
    setCurrentPage('home')
    const target = redirectTarget
    setRedirectTarget(null)
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

  // On logout: clear user session and stay on Home page as a guest (never force sign in page)
  const handleLogout = () => {
    setUser(null)
    try {
      localStorage.removeItem('uandwe_user')
    } catch (err) {
      console.error('Failed to clear session:', err)
    }
    setCurrentPage('home')
    window.history.replaceState(null, '', window.location.pathname)
  }

  const handleNavigateToLogin = (mode = 'signup', target = null) => {
    setLoginMode(mode)
    setRedirectTarget(target)
    setCurrentPage('login')
    window.location.hash = mode === 'signin' ? 'login' : 'signup'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavigateToHome = () => {
    setCurrentPage('home')
    window.location.hash = 'hero'
    window.scrollTo({ top: 0, behavior: 'smooth' })
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

  return (
    <HomePage
      user={user}
      onLogout={handleLogout}
      onNavigateToLogin={handleNavigateToLogin}
      welcomeMessage={welcomeMessage}
      onDismissWelcome={() => setWelcomeMessage('')}
    />
  )
}

export default App
