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

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '437563486795-2l163eihu31uc0pspnfo6ltq2jdbjot5.apps.googleusercontent.com'
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
          setErrorMessage('Google sign-in window could not open. Please check popup permissions.')
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
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 w-full z-10 my-auto py-12 sm:py-16">
        {/* ================= MAIN ANIMATED FRAMED CARD ================= */}
        <div className="relative z-10 w-full max-w-5xl rounded-[28px] sm:rounded-[36px] border-2 sm:border-[3px] border-[#0c1017] bg-[#0c1017] shadow-[0_35px_80px_-15px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-700">
        <div className="flex flex-col md:flex-row min-h-[560px] lg:min-h-[600px] w-full relative">
          
          {/* ================= LEFT IMAGE PANEL ================= */}
          <div
            className={`relative overflow-hidden bg-slate-900 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isEntered
                ? 'md:w-[42%] lg:w-[40%] min-h-[280px] md:min-h-[600px]'
                : 'md:w-full min-h-[560px] md:min-h-[600px]'
            }`}
          >
            <img
              src="/building.jpg"
              alt="Architecture"
              className={`w-full h-full object-cover object-center absolute inset-0 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isEntered ? 'scale-105' : 'scale-115'
              }`}
            />
            {/* Subtle Gradient Shade */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/30 pointer-events-none" />
          </div>

          {/* ================= RIGHT FORM PANEL ================= */}
          <div
            className={`bg-white md:rounded-tl-[48px] lg:rounded-tl-[54px] relative z-10 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
              isEntered
                ? 'md:w-[58%] lg:w-[60%] opacity-100 translate-x-0'
                : 'md:w-0 opacity-0 translate-x-20 pointer-events-none'
            }`}
          >
            <div className="w-full min-w-[320px] sm:min-w-[420px] lg:min-w-[480px] p-8 sm:p-10 lg:p-12 flex flex-col justify-between h-full">
              
              {/* Header: Back to Home */}
              <div
                className={`flex items-center justify-between gap-2 text-xs transition-all duration-700 delay-300 ${
                  isEntered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
                }`}
              >
                <button
                  type="button"
                  onClick={onNavigateToHome}
                  className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors font-medium text-[12px] cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to uandwelabs</span>
                </button>
              </div>

              {/* Main Content Area */}
              <div className="my-auto py-4">
                
                {showOtpView ? (
                  /* ================= OTP VERIFICATION SCREEN ================= */
                  <div className="animate-in fade-in slide-in-from-right-3 duration-300">
                    <button
                      type="button"
                      onClick={() => {
                        setShowOtpView(false)
                        setErrorMessage('')
                        setSuccessNotice('')
                        setOtpValues(['', '', '', '', '', ''])
                      }}
                      className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors font-medium text-[11.5px] cursor-pointer mb-5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Use a different account</span>
                    </button>

                    <div className="mb-6">
                      <div className="w-11 h-11 rounded-2xl bg-orange-500/10 border border-orange-200/80 text-orange-600 flex items-center justify-center mb-3.5 shadow-2xs">
                        <ShieldCheck className="w-5 h-5 text-orange-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#2d323d] tracking-tight mb-1">
                        Verify Your Email
                      </h2>
                      <p className="text-xs text-slate-500 font-normal leading-relaxed">
                        We sent a 6-digit security code to
                      </p>
                      <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 font-semibold text-[12px] border border-slate-200/80">
                        <Mail className="w-3.5 h-3.5 text-orange-600" />
                        <span>{pendingEmail}</span>
                      </div>
                    </div>

                    {/* Success Notice Banner */}
                    {successNotice && (
                      <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in duration-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{successNotice}</span>
                      </div>
                    )}

                    {/* Error Banner */}
                    {errorMessage && (
                      <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200/80 text-red-700 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                        <div className="flex-1 leading-snug">
                          <span className="font-semibold block mb-0.5">Verification Error</span>
                          <span>{errorMessage}</span>
                        </div>
                      </div>
                    )}

                    {/* 6-Digit OTP Boxes */}
                    <form onSubmit={handleVerifyOtp} className="space-y-5">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2.5">
                          Enter 6-Digit Security Code
                        </label>
                        <div className="flex items-center justify-between gap-1.5 sm:gap-2.5">
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
                              className="w-10 h-12 sm:w-12 sm:h-14 text-center font-mono text-xl sm:text-2xl font-bold rounded-xl border border-slate-200/90 bg-slate-50/60 focus:bg-white focus:border-black focus:ring-2 focus:ring-black/10 transition-all outline-none shadow-2xs"
                              autoFocus={idx === 0}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Verify Button */}
                      <button
                        type="submit"
                        disabled={loading || otpValues.join('').length !== 6}
                        className="w-full bg-[#1b2330] hover:bg-[#0f151f] disabled:opacity-50 text-white font-medium text-xs py-3.5 px-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 active:scale-98 flex items-center justify-center gap-2 group cursor-pointer"
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                            <span>Verifying code...</span>
                          </div>
                        ) : (
                          <>
                            <span>Verify & Sign In</span>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>

                      {/* Resend Timer Row */}
                      <div className="flex items-center justify-between text-xs pt-1.5 border-t border-slate-100">
                        <span className="text-slate-500 text-[11.5px]">
                          Didn&apos;t receive the code?
                        </span>
                        {resending ? (
                          <div className="inline-flex items-center gap-1.5 text-orange-600 font-semibold text-[11.5px]">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin text-orange-600" />
                            <span>Sending new code...</span>
                          </div>
                        ) : resendTimer > 0 ? (
                          <span className="text-slate-400 font-medium text-[11.5px]">
                            Resend code in <strong className="text-slate-600 font-semibold">{resendTimer}s</strong>
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={handleResendOtp}
                            disabled={loading || resending}
                            className="inline-flex items-center gap-1 font-semibold text-[11.5px] text-orange-600 hover:text-orange-700 hover:underline transition-colors cursor-pointer"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>Resend Code</span>
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                ) : (
                  /* ================= NORMAL SIGN IN / SIGN UP SCREEN ================= */
                  <>
                    {/* Mode Switcher Tabs */}
                    <div
                      className={`flex items-center p-1 bg-slate-100/90 rounded-xl mb-5 transition-all duration-700 delay-400 ${
                        isEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setMode('signin')
                          setErrorMessage('')
                        }}
                        className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                          !isSignUp ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
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
                        className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                          isSignUp ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        Create Account
                      </button>
                    </div>

                    {/* Title & Subtitle */}
                    <div
                      className={`mb-5 transition-all duration-700 delay-400 ${
                        isEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                    >
                      {targetCategory === 'residential' ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold mb-2.5">
                          <span>🏡 Ananda Residency</span>
                        </div>
                      ) : targetCategory === 'commercial' ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-[11px] font-semibold mb-2.5">
                          <span>🏢 Ananda Commercial</span>
                        </div>
                      ) : null}
                      <h1 className="text-2xl sm:text-3xl font-semibold text-[#2d323d] tracking-tight mb-1.5">
                        {isSignUp ? 'Create Account' : 'Sign In'}
                      </h1>
                      <p className="text-xs text-slate-400 font-normal leading-relaxed">
                        {isSignUp
                          ? 'Register your email & password to access UandWe Labs platforms.'
                          : targetCategory === 'residential'
                          ? 'Sign in to access Ananda Residency Living Platform'
                          : targetCategory === 'commercial'
                          ? 'Sign in to access Ananda Commercial Scale Platform'
                          : 'Welcome back. Access your platform and workspaces.'}
                      </p>
                    </div>

                    {/* Error Banner */}
                    {errorMessage && (
                      <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200/80 text-red-700 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                        <div className="flex-1 leading-snug">
                          <span className="font-semibold block mb-0.5">Authentication Notice</span>
                          <span>{errorMessage}</span>
                          {!isSignUp && (errorMessage.toLowerCase().includes('invalid') || errorMessage.toLowerCase().includes('not found')) && (
                            <button
                              type="button"
                              onClick={() => {
                                setMode('signup')
                                setErrorMessage('')
                              }}
                              className="mt-1.5 block text-orange-600 hover:text-orange-700 font-semibold underline cursor-pointer"
                            >
                              Don&apos;t have an account or password yet? Click here to Create Account &rarr;
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Option 1: Google Sign In (Password-free) */}
                    <div
                      className={`mb-5 transition-all duration-700 delay-500 ${
                        isEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50/80 disabled:opacity-60 shadow-[0_2px_6px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-slate-300 transition-all text-xs font-semibold text-slate-700 cursor-pointer"
                      >
                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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

                    {/* Divider Line */}
                    <div
                      className={`relative flex items-center justify-center mb-5 transition-all duration-700 delay-500 ${
                        isEntered ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <div className="border-t border-slate-200/80 w-full" />
                      <span className="bg-white px-3 text-[10.5px] text-slate-400 font-normal uppercase tracking-wider shrink-0">
                        {isSignUp ? 'or register with email' : 'or sign in with email'}
                      </span>
                      <div className="border-t border-slate-200/80 w-full" />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                      <div
                        className={`space-y-3 mb-4 transition-all duration-700 delay-600 ${
                          isEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                      >
                        {/* Full Name field (Sign Up only) */}
                        {isSignUp && (
                          <div className="relative flex items-center rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-white focus-within:bg-white focus-within:border-slate-800 focus-within:ring-2 focus-within:ring-slate-800/5 transition-all shadow-2xs">
                            <div className="pl-3.5 text-slate-400">
                              <UserIcon className="w-4 h-4" />
                            </div>
                            <input
                              type="text"
                              name="name"
                              placeholder="Full Name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full py-3 px-3 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
                            />
                          </div>
                        )}

                        {/* Email Address */}
                        <div className="relative flex items-center rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-white focus-within:bg-white focus-within:border-slate-800 focus-within:ring-2 focus-within:ring-slate-800/5 transition-all shadow-2xs">
                          <div className="pl-3.5 text-slate-400">
                            <Mail className="w-4 h-4" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full py-3 px-3 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
                          />
                        </div>

                        {/* Password */}
                        <div className="relative flex items-center rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-white focus-within:bg-white focus-within:border-slate-800 focus-within:ring-2 focus-within:ring-slate-800/5 transition-all shadow-2xs">
                          <div className="pl-3.5 text-slate-400">
                            <Lock className="w-4 h-4" />
                          </div>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder={isSignUp ? 'Create Password (min 6 characters)' : 'Password'}
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full py-3 px-3 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="pr-3.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                            title={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>

                        {/* Confirm Password (Sign Up only) */}
                        {isSignUp && (
                          <div className="relative flex items-center rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-white focus-within:bg-white focus-within:border-slate-800 focus-within:ring-2 focus-within:ring-slate-800/5 transition-all shadow-2xs">
                            <div className="pl-3.5 text-slate-400">
                              <Lock className="w-4 h-4" />
                            </div>
                            <input
                              type={showPassword ? 'text' : 'password'}
                              name="confirmPassword"
                              placeholder="Confirm Password"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              required
                              className="w-full py-3 px-3 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
                            />
                          </div>
                        )}
                      </div>

                      {/* Remember Me & Forgot Password Row (Sign In only) */}
                      {!isSignUp && (
                        <div
                          className={`flex items-center justify-between text-xs mb-5 transition-all duration-700 delay-650 ${
                            isEntered ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          <label className="flex items-center gap-2 cursor-pointer text-slate-500 hover:text-slate-700 text-[11.5px]">
                            <input
                              type="checkbox"
                              checked={rememberMe}
                              onChange={() => setRememberMe(!rememberMe)}
                              className="w-3.5 h-3.5 rounded border-slate-300 text-slate-900 focus:ring-slate-900/20 cursor-pointer accent-slate-900"
                            />
                            <span>Remember me</span>
                          </label>

                          <a
                            href="#forgot"
                            onClick={(e) => {
                              e.preventDefault()
                              alert('Password reset link sent to your email!')
                            }}
                            className="text-[11.5px] font-medium text-slate-500 hover:text-slate-800 transition-colors hover:underline"
                          >
                            Forgot password?
                          </a>
                        </div>
                      )}

                      {/* Submit Button Row */}
                      <div
                        className={`transition-all duration-700 delay-700 ${
                          isEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                      >
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-[#1b2330] hover:bg-[#0f151f] disabled:opacity-50 text-white font-medium text-xs py-3.5 px-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 active:scale-98 flex items-center justify-center gap-2 group cursor-pointer"
                        >
                          {loading ? (
                            <div className="flex items-center gap-2">
                              <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                              <span>{isSignUp ? 'Creating account...' : 'Signing in...'}</span>
                            </div>
                          ) : (
                            <>
                              <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </button>
                      </div>

                      {/* Bottom Mode Switcher */}
                      <div className="mt-5 text-center text-xs text-slate-500">
                        {isSignUp ? (
                          <span>
                            Already have an account?{' '}
                            <button
                              type="button"
                              onClick={() => {
                                setMode('signin')
                                setErrorMessage('')
                              }}
                              className="font-semibold text-slate-900 hover:text-orange-600 hover:underline cursor-pointer"
                            >
                              Sign In
                            </button>
                          </span>
                        ) : (
                          <span>
                            Don&apos;t have an account or password?{' '}
                            <button
                              type="button"
                              onClick={() => {
                                setMode('signup')
                                setErrorMessage('')
                              }}
                              className="font-semibold text-slate-900 hover:text-orange-600 hover:underline cursor-pointer"
                            >
                              Create Account
                            </button>
                          </span>
                        )}
                      </div>
                    </form>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
      {/* closes card wrapper */}
      </div>
    </div>
  )
}
