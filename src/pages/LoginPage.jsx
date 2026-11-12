// UandWe Labs - Authentication & Google OAuth Login
import { useState, useEffect, useRef } from 'react'
import {
  CheckCircle2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  ShieldCheck,
  RefreshCw,
  User as UserIcon,
} from 'lucide-react'
import { authApi } from '../services/api'

export default function LoginPage({
  onLogin,
  onNavigateToHome,
  redirectTarget,
  initialMode = 'signin',
}) {
  const [mode, setMode] = useState(initialMode === 'signup' ? 'signup' : 'signin')
  const isSignUp = mode === 'signup'
  const [isEntered, setIsEntered] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successNotice, setSuccessNotice] = useState('')

  useEffect(() => {
    if (initialMode === 'signup' || initialMode === 'signin') {
      setMode(initialMode)
      setErrorMessage('')
    }
  }, [initialMode])

  // 2FA / OTP Verification States
  const [showOtpView, setShowOtpView] = useState(false)
  const [pendingEmail, setPendingEmail] = useState('')
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', ''])
  const [resendTimer, setResendTimer] = useState(60)
  const [resending, setResending] = useState(false)
  const [resendNotification, setResendNotification] = useState('')
  const otpInputRefs = useRef([])

  // Resend countdown timer
  useEffect(() => {
    let interval = null
    if (showOtpView && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [showOtpView, resendTimer])

  const targetCategory = redirectTarget === 'ananda-residential'
    ? 'residential'
    : redirectTarget === 'ananda'
    ? 'commercial'
    : null

  // Trigger entrance sequence smoothly on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEntered(true)
    }, 40)
    return () => clearTimeout(timer)
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    if (errorMessage) setErrorMessage('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessNotice('')

    const cleanEmail = formData.email.trim()
    if (!cleanEmail) {
      setErrorMessage('Please enter your email address.')
      return
    }

    if (!formData.password) {
      setErrorMessage('Please enter your password.')
      return
    }

    if (isSignUp) {
      if (!agreeTerms) {
        setErrorMessage('Please accept the Terms and Conditions of Service to continue.')
        return
      }
      if (formData.password.length < 6) {
        setErrorMessage('Password must be at least 6 characters long.')
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage('Passwords do not match. Please verify your password.')
        return
      }

      setLoading(true)
      try {
        const userName = formData.name.trim() || cleanEmail.split('@')[0]
        const data = await authApi.register(userName, cleanEmail, formData.password)
        setSubmitted(true)
        if (onLogin) {
          onLogin({
            id: data.user.id,
            name: data.user.name || userName,
            email: data.user.email || cleanEmail,
            role: data.user.role || 'member',
            isNewAccount: true,
          })
        }
      } catch (err) {
        setErrorMessage(err.message || 'Registration failed. Please check your connection.')
      } finally {
        setLoading(false)
      }
    } else {
      setLoading(true)
      try {
        const data = await authApi.login(cleanEmail, formData.password)
        setSubmitted(true)
        if (onLogin) {
          onLogin({
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role || 'member',
            isNewAccount: false,
          })
        }
      } catch (err) {
        setErrorMessage(err.message || 'Login failed. Please check your email and password.')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleGoogleLogin = () => {
    setErrorMessage('')
    setLoading(true)

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '437563486795-6s1h2njshkno8htq6m1g2v7b2r2cfdd8.apps.googleusercontent.com'
    if (!clientId) {
      setErrorMessage('Google Client ID is not configured.')
      setLoading(false)
      return
    }

    if (typeof window === 'undefined' || !window.google?.accounts?.oauth2) {
      setErrorMessage('Google Sign-In is initializing. Please wait a moment and try again.')
      setLoading(false)
      return
    }

    try {
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'email profile openid',
        callback: async (tokenResponse) => {
          if (tokenResponse.error) {
            setErrorMessage(tokenResponse.error_description || tokenResponse.error || 'Google sign-in was cancelled.')
            setLoading(false)
            return
          }

          try {
            // Fetch genuine profile details directly from Google OAuth userinfo API
            const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            })

            if (!userInfoRes.ok) {
              throw new Error('Failed to retrieve user profile from Google.')
            }

            const profile = await userInfoRes.json()
            if (!profile.email) {
              throw new Error('Google account did not return a valid email address.')
            }

            // Authenticate and sync with backend & Neo4j graph database
            const data = await authApi.googleLogin({
              email: profile.email,
              name: profile.name || profile.given_name || profile.email.split('@')[0],
              picture: profile.picture,
              googleId: profile.sub,
              access_token: tokenResponse.access_token,
            })

            // If 2FA / OTP verification is requested
            if (data.requiresOtp) {
              setPendingEmail(profile.email)
              setShowOtpView(true)
              setResendTimer(60)
              setSuccessNotice(`A 6-digit verification code has been sent to ${profile.email}.`)
              setErrorMessage('')
              setTimeout(() => {
                otpInputRefs.current[0]?.focus()
              }, 120)
              return
            }

            setSubmitted(true)
            if (onLogin) {
              onLogin({
                id: data.user.id,
                name: data.user.name || profile.name,
                email: data.user.email || profile.email,
                avatar: data.user.avatar || profile.picture,
                role: data.user.role || 'member',
                isNewAccount: false,
              })
            }
          } catch (err) {
            console.error('[Google Auth Error]:', err)
            setErrorMessage(err.message || 'Google authorization failed.')
          } finally {
            setLoading(false)
          }
        },
        error_callback: (error) => {
          console.error('[Google Auth Popup Error]:', error)
          if (error?.type === 'popup_closed') {
            setErrorMessage('')
          } else {
            setErrorMessage('Google popup was blocked by browser. Click the site settings icon in your address bar to allow pop-ups.')
          }
          setLoading(false)
        },
      })

      // Open Google account selection popup
      tokenClient.requestAccessToken({ prompt: 'select_account' })
    } catch (err) {
      console.error('[Google Token Client Error]:', err)
      setErrorMessage('Could not initiate Google sign-in. Please try again.')
      setLoading(false)
    }
  }

  const handleOtpChange = (index, value) => {
    const cleaned = value.replace(/\D/g, '')
    if (!cleaned) {
      const next = [...otpValues]
      next[index] = ''
      setOtpValues(next)
      return
    }

    if (cleaned.length === 1) {
      const next = [...otpValues]
      next[index] = cleaned
      setOtpValues(next)
      if (errorMessage) setErrorMessage('')
      if (index < 5 && otpInputRefs.current[index + 1]) {
        otpInputRefs.current[index + 1].focus()
      }
    } else {
      // Pasted full code or multiple digits
      const digits = cleaned.slice(0, 6).split('')
      const next = [...otpValues]
      digits.forEach((d, i) => {
        if (i < 6) next[i] = d
      })
      setOtpValues(next)
      if (errorMessage) setErrorMessage('')
      const nextFocus = Math.min(digits.length, 5)
      otpInputRefs.current[nextFocus]?.focus()
    }
  }

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerifyOtp = async (e) => {
    if (e) e.preventDefault()
    const fullCode = otpValues.join('')
    if (fullCode.length !== 6) {
      setErrorMessage('Please enter the complete 6-digit verification code.')
      return
    }

    setErrorMessage('')
    setLoading(true)

    try {
      const data = await authApi.verifyOtp(pendingEmail, fullCode)
      setSubmitted(true)
      if (onLogin) {
        onLogin({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          avatar: data.user.avatar,
          role: data.user.role || 'member',
          isNewAccount: false,
        })
      }
    } catch (err) {
      setErrorMessage(err.message || 'Invalid or expired verification code.')
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    if (resendTimer > 0 || loading || resending) return
    setErrorMessage('')
    setSuccessNotice('')
    setResending(true)
    try {
      const data = await authApi.resendOtp(pendingEmail)
      setResendTimer(60)
      const msg = data.message || `A new 6-digit code has been sent to ${pendingEmail}.`
      setSuccessNotice(msg)
      setResendNotification(`New 6-digit code sent to ${pendingEmail}!`)
      setOtpValues(['', '', '', '', '', ''])
      setTimeout(() => {
        otpInputRefs.current[0]?.focus()
      }, 100)
      setTimeout(() => {
        setResendNotification('')
      }, 5000)
    } catch (err) {
      setErrorMessage(err.message || 'Failed to resend code. Please try again.')
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center font-sans selection:bg-slate-800 selection:text-white">
      
      {/* ================= ATMOSPHERIC CITY BACKDROP ================= */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
        <img
          src="/backdrop.jpg"
          alt="Cityscape Backdrop"
          className="w-full h-full object-cover object-center filter blur-[6px] scale-105"
        />
        <div className="absolute inset-0 bg-slate-950/40 backdrop-contrast-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/50" />
      </div>

      {/* Floating Success Toast */}
      {submitted && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/90 backdrop-blur-md text-white text-xs font-medium shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 border border-slate-700/80">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Signed in successfully!</span>
        </div>
      )}

      {/* Floating Resend Success Toast */}
      {resendNotification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 border border-emerald-500">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{resendNotification}</span>
        </div>
      )}

      {/* Main card wrapper */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 w-full z-10 my-auto py-10 sm:py-16">
        {/* ================= CINEMATIC FLOATING MODAL CARD ================= */}
        <div
          className={`relative z-10 w-full max-w-5xl rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/15 bg-slate-950 shadow-[0_35px_100px_rgba(0,0,0,0.85)] transition-all duration-700 ${
            isEntered ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
          }`}
        >
          {/* Full-bleed Bridge Backdrop Image Spanning Entire Card */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <img
              src="/backdrop.jpg"
              alt="Bridge Cityscape"
              className="w-full h-full object-cover object-center scale-105"
            />
            {/* Gradient shading across the card to ensure high contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/75 md:to-transparent" />
            <div className="absolute inset-0 bg-black/25" />
          </div>

          {/* Card Split Layout */}
          <div className="relative z-10 flex flex-col md:flex-row min-h-[560px] lg:min-h-[620px] w-full">
            
            {/* ================= LEFT HERO PANEL ================= */}
            <div className="flex-1 p-8 sm:p-12 lg:p-14 flex flex-col justify-between relative z-10">
              {/* Top Row: Back Navigation & Optional Category Badge */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={onNavigateToHome}
                  className="inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors font-medium text-xs cursor-pointer group"
                >
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                  <span>Back to uandwelabs</span>
                </button>

                {targetCategory && (
                  <div>
                    {targetCategory === 'residential' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-[11px] font-semibold backdrop-blur-md">
                        🏡 Ananda Residency
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-200 text-[11px] font-semibold backdrop-blur-md">
                        🏢 Ananda Commercial
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Center / Hero Typography (Matches Reference Screenshot) */}
              <div className="my-auto py-10 md:py-8">
                {isSignUp ? (
                  <>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-[1.12] mb-4">
                      Don&apos;t Have An<br />
                      <span className="font-semibold">Account?</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed max-w-sm">
                      Register to access all the features of our service. Manage your business in one place. It&apos;s free!
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.12] mb-4">
                      Welcome
                    </h1>
                    <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed max-w-sm">
                      Sign in to access your high-performance simulation platforms, sovereign edge silicon, and workspaces.
                    </p>
                  </>
                )}
              </div>

            </div>

            {/* ================= RIGHT FROSTED GLASS FORM PANEL ================= */}
            <div className="w-full md:w-[48%] lg:w-[46%] bg-black/55 md:bg-black/65 backdrop-blur-2xl border-t md:border-t-0 md:border-l border-white/10 p-6 sm:p-10 lg:p-12 flex flex-col justify-center items-center relative z-10">
              
              {showOtpView ? (
                /* ================= OTP VERIFICATION VIEW ================= */
                <div className="w-full max-w-sm mx-auto my-auto flex flex-col justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setShowOtpView(false)
                      setErrorMessage('')
                      setSuccessNotice('')
                      setOtpValues(['', '', '', '', '', ''])
                    }}
                    className="inline-flex items-center gap-1.5 text-white/60 hover:text-white transition-colors font-medium text-[11.5px] cursor-pointer mb-6"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Use a different account</span>
                  </button>

                  <div className="mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-400/30 text-orange-400 flex items-center justify-center mb-3">
                      <ShieldCheck className="w-5 h-5 text-orange-400" />
                    </div>
                    <h2 className="text-2xl font-medium text-white tracking-tight mb-1">
                      Verify Your Email
                    </h2>
                    <p className="text-xs text-white/60 font-light leading-relaxed">
                      We sent a 6-digit security code to
                    </p>
                    <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white font-medium text-xs border border-white/15">
                      <Mail className="w-3.5 h-3.5 text-orange-400" />
                      <span>{pendingEmail}</span>
                    </div>
                  </div>

                  {/* Success Notice Banner */}
                  {successNotice && (
                    <div className="mb-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{successNotice}</span>
                    </div>
                  )}

                  {/* Error Banner */}
                  {errorMessage && (
                    <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-400/30 text-red-200 text-xs flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                      <div className="flex-1 leading-snug">
                        <span className="font-semibold block mb-0.5">Verification Error</span>
                        <span>{errorMessage}</span>
                      </div>
                    </div>
                  )}

                  {/* 6-Digit OTP Form */}
                  <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <div>
                      <label className="block text-[11px] font-medium text-white/70 uppercase tracking-wider mb-3">
                        Enter 6-Digit Security Code
                      </label>
                      <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                        {otpValues.map((digit, idx) => (
                          <input
                            key={idx}
                            ref={(el) => (otpInputRefs.current[idx] = el)}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                            className="w-10 h-12 sm:w-11 sm:h-13 text-center font-mono text-xl font-bold rounded-xl border border-white/20 bg-white/5 text-white focus:bg-white/10 focus:border-white transition-all outline-none"
                            autoFocus={idx === 0}
                          />
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || otpValues.join('').length !== 6}
                      className="w-full rounded-full border border-white/30 bg-white/10 hover:bg-white/20 hover:border-white text-white text-xs font-medium py-3 px-6 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm disabled:opacity-40"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                          <span>Verifying code...</span>
                        </div>
                      ) : (
                        <span>Verify & Sign In</span>
                      )}
                    </button>

                    <div className="flex items-center justify-between text-xs pt-3 border-t border-white/10">
                      <span className="text-white/50 text-[11.5px]">
                        Didn&apos;t receive the code?
                      </span>
                      {resending ? (
                        <div className="inline-flex items-center gap-1.5 text-orange-400 font-medium text-[11.5px]">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Sending...</span>
                        </div>
                      ) : resendTimer > 0 ? (
                        <span className="text-white/40 font-medium text-[11.5px]">
                          Resend code in <strong className="text-white/70">{resendTimer}s</strong>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          disabled={loading || resending}
                          className="inline-flex items-center gap-1 font-medium text-[11.5px] text-orange-400 hover:text-orange-300 hover:underline transition-colors cursor-pointer"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Resend Code</span>
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              ) : (
                /* ================= SIGN UP / SIGN IN VIEW (MATCHING SCREENSHOT) ================= */
                <div className="w-full max-w-sm mx-auto my-auto flex flex-col justify-center">
                  
                  {/* Sign In / Sign Up Option Switcher */}
                  <div className="flex items-center p-1 rounded-full bg-white/10 border border-white/15 mb-6 w-full">
                    <button
                      type="button"
                      onClick={() => {
                        setMode('signin')
                        setErrorMessage('')
                      }}
                      className={`flex-1 py-1.5 px-3 text-xs rounded-full transition-all cursor-pointer text-center ${
                        !isSignUp
                          ? 'bg-white text-slate-900 shadow-sm font-semibold'
                          : 'text-white/70 hover:text-white font-medium'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMode('signup')
                        setErrorMessage('')
                      }}
                      className={`flex-1 py-1.5 px-3 text-xs rounded-full transition-all cursor-pointer text-center ${
                        isSignUp
                          ? 'bg-white text-slate-900 shadow-sm font-semibold'
                          : 'text-white/70 hover:text-white font-medium'
                      }`}
                    >
                      Sign Up
                    </button>
                  </div>

                  {/* Header Title */}
                  <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight mb-6">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                  </h2>

                  {/* Error Banner */}
                  {errorMessage && (
                    <div className="mb-5 p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-200 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                      <div className="flex-1 leading-snug">
                        <span>{errorMessage}</span>
                      </div>
                    </div>
                  )}

                  {/* Form with Clean Underline Inputs */}
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      {/* Email Field */}
                      <div className="relative border-b border-white/20 focus-within:border-white transition-colors pb-1">
                        <label className="block text-[11px] text-white/60 mb-1 font-light">Email</label>
                        <div className="flex items-center justify-between">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="name@example.com"
                            className="w-full bg-transparent text-white text-xs placeholder:text-white/25 focus:outline-none"
                          />
                          <Mail className="w-4 h-4 text-white/50 shrink-0 ml-2" />
                        </div>
                      </div>

                      {/* Username Field (Sign Up Only) */}
                      {isSignUp && (
                        <div className="relative border-b border-white/20 focus-within:border-white transition-colors pb-1">
                          <label className="block text-[11px] text-white/60 mb-1 font-light">Username</label>
                          <div className="flex items-center justify-between">
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Your username"
                              className="w-full bg-transparent text-white text-xs placeholder:text-white/25 focus:outline-none"
                            />
                            <UserIcon className="w-4 h-4 text-white/50 shrink-0 ml-2" />
                          </div>
                        </div>
                      )}

                      {/* Password Field */}
                      <div className="relative border-b border-white/20 focus-within:border-white transition-colors pb-1">
                        <label className="block text-[11px] text-white/60 mb-1 font-light">Password</label>
                        <div className="flex items-center justify-between">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder={isSignUp ? 'Min 6 characters' : '••••••••'}
                            className="w-full bg-transparent text-white text-xs placeholder:text-white/25 focus:outline-none"
                          />
                          <div className="flex items-center gap-2 ml-2">
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="text-white/50 hover:text-white transition-colors cursor-pointer"
                              title={showPassword ? 'Hide password' : 'Show password'}
                            >
                              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                            <Lock className="w-3.5 h-3.5 text-white/50 shrink-0" />
                          </div>
                        </div>
                      </div>

                      {/* Confirm Password (Sign Up Only) */}
                      {isSignUp && (
                        <div className="relative border-b border-white/20 focus-within:border-white transition-colors pb-1">
                          <label className="block text-[11px] text-white/60 mb-1 font-light">Confirm Password</label>
                          <div className="flex items-center justify-between">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              required
                              placeholder="••••••••"
                              className="w-full bg-transparent text-white text-xs placeholder:text-white/25 focus:outline-none"
                            />
                            <Lock className="w-3.5 h-3.5 text-white/50 shrink-0 ml-2" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Checkbox Row: Terms & Conditions or Remember Me */}
                    <div className="mt-6 mb-7">
                      {isSignUp ? (
                        <div className="flex items-center gap-2 text-xs text-white/70">
                          <input
                            type="checkbox"
                            id="terms"
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                            className="w-3.5 h-3.5 rounded border-white/30 bg-transparent text-white accent-white cursor-pointer"
                          />
                          <label htmlFor="terms" className="text-[11.5px] cursor-pointer text-white/75 select-none">
                            I Agree To <span className="text-white underline">Terms And Conditions</span> Of Service
                          </label>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between text-xs text-white/70">
                          <label className="flex items-center gap-2 cursor-pointer text-[11.5px] select-none text-white/75">
                            <input
                              type="checkbox"
                              checked={rememberMe}
                              onChange={() => setRememberMe(!rememberMe)}
                              className="w-3.5 h-3.5 rounded border-white/30 bg-transparent text-white accent-white cursor-pointer"
                            />
                            <span>Remember me</span>
                          </label>
                          <a
                            href="#forgot"
                            onClick={(e) => {
                              e.preventDefault()
                              alert('Password reset link sent to your email!')
                            }}
                            className="text-[11.5px] text-white/60 hover:text-white transition-colors hover:underline"
                          >
                            Forgot password?
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Submit Button (Full Width & Centered) */}
                    <div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-full border border-white/30 bg-white/10 hover:bg-white/20 hover:border-white text-white text-xs font-medium py-3 px-6 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm disabled:opacity-50"
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                            <span>Please wait...</span>
                          </div>
                        ) : (
                          <span>{isSignUp ? 'Sign Up' : 'Sign In'}</span>
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Google OAuth Button */}
                  <div className="mt-8 pt-5 border-t border-white/10">
                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-white text-xs font-medium transition-all cursor-pointer shadow-xs disabled:opacity-50"
                    >
                      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span>{isSignUp ? 'Sign up with Google' : 'Continue with Google'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
