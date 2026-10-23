import { useState, useEffect } from 'react'
import {
  CheckCircle2,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react'

export default function LoginPage({ onLogin, onNavigateToHome, initialMode = 'signup', redirectTarget }) {
  const [isSignUp, setIsSignUp] = useState(initialMode !== 'signin')
  const [isEntered, setIsEntered] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  })
  const [submitted, setSubmitted] = useState(false)

  // Sync mode if initialMode changes
  useEffect(() => {
    if (initialMode) {
      setIsSignUp(initialMode !== 'signin')
    }
  }, [initialMode])

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
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    if (onLogin) {
      onLogin({
        name: formData.fullName.trim() || (formData.email ? formData.email.split('@')[0] : 'New Member'),
        email: formData.email.trim() || 'member@uandwelabs.com',
        isNewAccount: isSignUp,
      })
    }
  }

  // Calculate password strength (0-3)
  const getStrength = (pass) => {
    if (!pass) return 0
    let score = 0
    if (pass.length >= 6) score++
    if (pass.length >= 8 && /[A-Z]/.test(pass)) score++
    if (/[0-9]/.test(pass) || /[^A-Za-z0-9]/.test(pass)) score++
    return score
  }

  const strength = getStrength(formData.password)

  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center p-4 sm:p-8 font-sans selection:bg-slate-800 selection:text-white overflow-hidden">
      
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
          <span>{isSignUp ? 'Account created successfully!' : 'Signed in successfully!'}</span>
        </div>
      )}

      {/* ================= MAIN ANIMATED FRAMED CARD ================= */}
      <div className="relative z-10 w-full max-w-5xl rounded-[28px] sm:rounded-[36px] border-2 sm:border-[3px] border-[#0c1017] bg-[#0c1017] shadow-[0_35px_80px_-15px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-700">
        <div className="flex flex-col md:flex-row min-h-[580px] lg:min-h-[620px] w-full relative">
          
          {/* ================= LEFT IMAGE PANEL ================= */}
          <div
            className={`relative overflow-hidden bg-slate-900 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isEntered
                ? 'md:w-[42%] lg:w-[40%] min-h-[300px] md:min-h-[620px]'
                : 'md:w-full min-h-[580px] md:min-h-[620px]'
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

          {/* ================= RIGHT FORM PANEL (Rich, Polished & Modern) ================= */}
          <div
            className={`bg-white md:rounded-tl-[48px] lg:rounded-tl-[54px] relative z-10 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
              isEntered
                ? 'md:w-[58%] lg:w-[60%] opacity-100 translate-x-0'
                : 'md:w-0 opacity-0 translate-x-20 pointer-events-none'
            }`}
          >
            <div className="w-full min-w-[320px] sm:min-w-[420px] lg:min-w-[480px] p-8 sm:p-10 lg:p-12 flex flex-col justify-between h-full">
              
              {/* Header: Switcher & Return */}
              <div
                className={`flex items-center justify-between gap-2 text-xs transition-all duration-700 delay-300 ${
                  isEntered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
                }`}
              >
                <button
                  type="button"
                  onClick={onNavigateToHome}
                  className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors font-medium text-[11.5px] cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to uandwelabs</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-normal hidden sm:inline">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 font-medium text-[11px] hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer shadow-xs"
                  >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </button>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="my-auto py-5">
                
                {/* Title & Subtitle */}
                <div
                  className={`mb-6 transition-all duration-700 delay-400 ${
                    isEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <h1 className="text-2xl sm:text-3xl font-medium text-[#2d323d] tracking-normal mb-1.5">
                    {isSignUp ? 'Create an Account' : 'Welcome Back'}
                  </h1>
                  <p className="text-xs text-slate-400 font-normal leading-relaxed">
                    {isSignUp
                      ? "Turn your boldest ideas into reality. Your creative launchpad starts here."
                      : "Good to see you again. Let's pick up right where you left off."}
                  </p>
                </div>

                {/* Social Login Buttons Row */}
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 transition-all duration-700 delay-500 ${
                    isEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  {/* Google */}
                  <button
                    type="button"
                    onClick={() => {
                      if (onLogin) {
                        onLogin({ name: 'Google User', email: 'user@gmail.com', isNewAccount: isSignUp })
                      }
                    }}
                    className="w-full flex items-center justify-center gap-2.5 py-2.5 px-3.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50/80 shadow-[0_2px_6px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-slate-300 transition-all text-xs font-medium text-slate-700 cursor-pointer"
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
                    <span>Google</span>
                  </button>

                  {/* Facebook */}
                  <button
                    type="button"
                    onClick={() => {
                      if (onLogin) {
                        onLogin({ name: 'Facebook User', email: 'user@facebook.com', isNewAccount: isSignUp })
                      }
                    }}
                    className="w-full flex items-center justify-center gap-2.5 py-2.5 px-3.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50/80 shadow-[0_2px_6px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-slate-300 transition-all text-xs font-medium text-slate-700 cursor-pointer"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#1877F2"
                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                      />
                    </svg>
                    <span>Facebook</span>
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
                    or continue with email
                  </span>
                  <div className="border-t border-slate-200/80 w-full" />
                </div>

                {/* Form Inputs Container */}
                <form onSubmit={handleSubmit}>
                  <div
                    className={`space-y-3 mb-4 transition-all duration-700 delay-600 ${
                      isEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                  >
                    {/* Full Name (Sign Up only) */}
                    {isSignUp && (
                      <div className="relative flex items-center rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-white focus-within:bg-white focus-within:border-slate-800 focus-within:ring-2 focus-within:ring-slate-800/5 transition-all shadow-2xs">
                        <div className="pl-3.5 text-slate-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          name="fullName"
                          placeholder="Full Name"
                          value={formData.fullName}
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
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
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

                    {/* Password Strength Meter (Sign Up only) */}
                    {isSignUp && formData.password.length > 0 && (
                      <div className="pt-1 px-1">
                        <div className="flex items-center gap-1.5 h-1.5 w-full">
                          <div
                            className={`h-full flex-1 rounded-full transition-all duration-300 ${
                              strength >= 1 ? 'bg-amber-400' : 'bg-slate-200'
                            }`}
                          />
                          <div
                            className={`h-full flex-1 rounded-full transition-all duration-300 ${
                              strength >= 2 ? 'bg-blue-400' : 'bg-slate-200'
                            }`}
                          />
                          <div
                            className={`h-full flex-1 rounded-full transition-all duration-300 ${
                              strength >= 3 ? 'bg-emerald-500' : 'bg-slate-200'
                            }`}
                          />
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1 block font-medium">
                          {strength <= 1 && 'Weak password'}
                          {strength === 2 && 'Good password'}
                          {strength >= 3 && 'Strong password'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password Row */}
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
                      <span>{isSignUp ? 'Keep me signed in' : 'Remember me'}</span>
                    </label>

                    {!isSignUp && (
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
                    )}
                  </div>

                  {/* Submit Button Row */}
                  <div
                    className={`transition-all duration-700 delay-700 ${
                      isEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                  >
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault()
                        if (onLogin) {
                          onLogin({
                            name: formData.fullName.trim() || (formData.email ? formData.email.split('@')[0] : 'New Member'),
                            email: formData.email.trim() || 'member@uandwelabs.com',
                            isNewAccount: isSignUp,
                          })
                        }
                      }}
                      className="w-full sm:w-auto bg-[#1b2330] hover:bg-[#0f151f] text-white font-medium text-xs py-3.5 px-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 active:scale-98 flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
