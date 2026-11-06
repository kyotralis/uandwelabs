import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Clock,
  User as UserIcon,
  Share2,
  Check,
  CheckCircle2,
  X,
  Sparkles,
  Layers,
  Cpu,
  Globe,
  Radio,
  ExternalLink,
} from 'lucide-react'
import Footer from '../components/Footer'
import CommonCta from '../components/CommonCta'
import { useTranslation } from '../i18n'

export default function BlogPage({
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
  onNavigateToSecurity,
  onNavigateToTerms,
}) {
  const { t } = useTranslation()
  const bp = t.blogsPage || {}

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeArticle, setActiveArticle] = useState(null)
  const [copiedLink, setCopiedLink] = useState(false)

  const handleBack = () => {
    if (onNavigateToHome) {
      onNavigateToHome()
    } else if (typeof window !== 'undefined') {
      window.location.hash = ''
    }
  }

  // Card element refs & scroll-triggered entrance states
  const cardElRefs = useRef([])
  const [cardVisible, setCardVisible] = useState([])
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )

  // Responsive stagger delay per card
  const getCardDelay = (idx, isVisible) => {
    if (!isVisible) return '0ms'
    if (screenWidth >= 1024) return `${(idx % 3) * 120}ms`
    if (screenWidth >= 768) return `${(idx % 2) * 130}ms`
    return '0ms'
  }

  // Preserve scroll position on refresh
  useEffect(() => {
    let savedY = null
    try {
      savedY = sessionStorage.getItem('uandwe_blog_scroll_y')
    } catch {}
    if (savedY && Number(savedY) > 20) {
      const scrollPos = Number(savedY)
      const restore = () => {
        if (window.__lenis) {
          window.__lenis.scrollTo(scrollPos, { immediate: true })
        } else {
          window.scrollTo({ top: scrollPos, behavior: 'instant' })
        }
      }
      restore()
      setTimeout(restore, 50)
      setTimeout(restore, 150)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      try {
        sessionStorage.setItem('uandwe_blog_scroll_y', String(window.scrollY))
      } catch {}
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when article modal is open
  useEffect(() => {
    if (activeArticle) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeArticle])

  // Localized articles list
  const articles = useMemo(() => {
    return bp.articles || []
  }, [bp.articles])

  // Filtered articles based on category pill & search query
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesCategory =
        selectedCategory === 'all' || art.category === selectedCategory
      const query = searchQuery.trim().toLowerCase()
      if (!query) return matchesCategory

      const matchesQuery =
        art.title?.toLowerCase().includes(query) ||
        art.excerpt?.toLowerCase().includes(query) ||
        art.author?.toLowerCase().includes(query) ||
        art.tags?.some((tag) => tag.toLowerCase().includes(query))

      return matchesCategory && matchesQuery
    })
  }, [articles, selectedCategory, searchQuery])

  // Scroll & IntersectionObserver visibility for each card (comes from left)
  useEffect(() => {
    const count = filteredArticles.length
    setCardVisible(new Array(count).fill(false))
    cardElRefs.current = cardElRefs.current.slice(0, count)

    if (count === 0) return

    const checkCards = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight
      const vw = window.innerWidth || document.documentElement.clientWidth
      setScreenWidth(vw)

      const isInView = (el) => {
        if (!el) return false
        const r = el.getBoundingClientRect()
        return r.top < vh - 40 && r.bottom > -200
      }

      const next = new Array(count).fill(false)

      if (vw >= 1024) {
        // Desktop (3 columns): row of 3 cards comes from left
        for (let i = 0; i < count; i += 3) {
          const rowIndices = []
          for (let j = i; j < Math.min(i + 3, count); j++) rowIndices.push(j)
          const rowVis = rowIndices.some((idx) => isInView(cardElRefs.current[idx]))
          rowIndices.forEach((idx) => {
            next[idx] = rowVis
          })
        }
      } else if (vw >= 768) {
        // Tablet / iPad Mini (2 columns): row of 2 cards comes from left ("two two cards")
        for (let i = 0; i < count; i += 2) {
          const rowIndices = []
          for (let j = i; j < Math.min(i + 2, count); j++) rowIndices.push(j)
          const rowVis = rowIndices.some((idx) => isInView(cardElRefs.current[idx]))
          rowIndices.forEach((idx) => {
            next[idx] = rowVis
          })
        }
      } else {
        // Mobile / Small screen (1 column): each card comes from left individually
        for (let i = 0; i < count; i++) {
          next[i] = isInView(cardElRefs.current[i])
        }
      }

      setCardVisible((prev) => {
        if (!prev || prev.length !== count) return next
        for (let i = 0; i < count; i++) {
          if (prev[i] !== next[i]) return next
        }
        return prev
      })
    }

    let obs = null
    if (typeof IntersectionObserver !== 'undefined') {
      obs = new IntersectionObserver(
        () => {
          checkCards()
        },
        { threshold: [0, 0.1, 0.25], rootMargin: '0px 0px -40px 0px' }
      )
      cardElRefs.current.forEach((el) => {
        if (el) obs.observe(el)
      })
    }

    window.addEventListener('scroll', checkCards, { passive: true })
    window.addEventListener('resize', checkCards, { passive: true })
    checkCards()
    const t1 = setTimeout(checkCards, 60)
    const t2 = setTimeout(checkCards, 200)

    return () => {
      window.removeEventListener('scroll', checkCards)
      window.removeEventListener('resize', checkCards)
      clearTimeout(t1)
      clearTimeout(t2)
      if (obs) obs.disconnect()
    }
  }, [filteredArticles.length, selectedCategory, searchQuery])

  // Featured paper data
  const featured = bp.featured || {}

  // Handle Share / Copy Link
  const handleCopyLink = (article) => {
    const url = `${window.location.origin}#blogs?id=${article.id || article.slug}`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url)
    }
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2400)
  }

  return (
    <div className="bg-white min-h-screen text-neutral-900 w-full font-sans selection:bg-black selection:text-white">
      {/* ======================================================== */}
      {/* 1. IMMERSIVE HERO SECTION (ANANDA SWISS BRUTALIST STYLE) */}
      {/* ======================================================== */}
      <div className="relative w-full h-screen min-h-[600px] flex items-end pb-16 sm:pb-20 md:pb-24 pt-28 sm:pt-32 px-[4%] overflow-hidden bg-black">
        {/* Dynamic Image with subtle overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/building-2.jpg"
            alt="UandWe Labs Perspectives & Stories"
            className="w-full h-full object-cover grayscale opacity-75 scale-100 hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/30 pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col justify-end">
          <div className="max-w-3xl">
            <div className="mb-4 sm:mb-6">
              <button
                type="button"
                onClick={handleBack}
                aria-label="Back to Home"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 group cursor-pointer shadow-lg hover:scale-105 active:scale-95 hover:border-white/40"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
            </div>
            <div className="relative inline-block py-1">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-[64px] font-normal font-['Inter'] tracking-[0.03em] text-white uppercase leading-[1.08] select-text drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
                {bp.heroTitle?.line1 || 'Stories & Breakthroughs.'} <br />
                <span className="text-white">{bp.heroTitle?.line2 || 'Where Ideas Become Real.'}</span>
              </h1>
            </div>

            <p className="mt-5 sm:mt-6 text-sm sm:text-[15.5px] text-white font-normal leading-relaxed max-w-xl font-['Inter'] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              {bp.heroSubtitle ||
                'Notes, design thinking, and engineering breakdowns from our team — exploring environmental physics, autonomous edge silicon, and assistive human care.'}
            </p>

            <div className="mt-7 sm:mt-9">
              <a
                href="#dispatches"
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById('dispatches')
                  if (el) {
                    if (window.__lenis) {
                      window.__lenis.scrollTo(el, { duration: 1.2 })
                    } else {
                      el.scrollIntoView({ behavior: 'smooth' })
                    }
                  }
                }}
                className="group relative inline-flex items-center gap-4 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white text-neutral-900 hover:bg-neutral-100 font-['Inter'] font-semibold text-xs sm:text-[13px] tracking-[0.14em] uppercase transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_15px_35px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>{bp.heroButtonText || 'Explore Articles'}</span>
                <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-neutral-800 group-hover:translate-x-1 transition-all duration-300 shadow-xs">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. DISPATCHES ARTICLE SECTION                            */}
      {/* ======================================================== */}
      <div id="dispatches" className="w-full pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-24 md:pb-28 overflow-hidden">
        <div className="max-w-[1560px] mx-auto px-6 sm:px-12 lg:px-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-10 lg:mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-900 font-sans">
                {bp.allArticlesTitle || 'Articles & Perspectives'}
              </h2>
            </div>

            {/* Filter Pills & Integrated Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setSearchQuery('')
                }}
                className="py-2.5 px-4 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer bg-black text-white font-medium shadow-xs text-center shrink-0"
              >
                {bp.categories?.all || 'All Publications'} ({articles.length})
              </button>

              <div className="relative w-full sm:w-72 lg:w-80">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={bp.searchPlaceholder || 'Search technical dispatches...'}
                  className="w-full pl-10 pr-9 py-2.5 bg-neutral-50 hover:bg-neutral-100 focus:bg-white border border-neutral-300 focus:border-black rounded-full text-xs font-sans outline-none transition-all placeholder:text-neutral-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black cursor-pointer p-0.5"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Result count */}
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-black/10">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
              {bp.filterCount
                ? bp.filterCount.replace('{count}', filteredArticles.length)
                : `Showing ${filteredArticles.length} research publications`}
            </span>

            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
                className="text-xs font-mono uppercase tracking-wider text-neutral-900 underline hover:text-orange-600 cursor-pointer"
              >
                {bp.resetSearch || 'Reset search filter'}
              </button>
            )}
          </div>

          {/* Empty state */}
          {filteredArticles.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-neutral-500 text-sm mb-4">
                {bp.noResults || 'No technical dispatches found matching your query.'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
                className="px-6 py-2.5 bg-black text-white text-xs font-mono uppercase tracking-wider rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                {bp.resetSearch || 'Reset search filter'}
              </button>
            </div>
          ) : (
            /* Unified continuous grid: each card comes in from the LEFT side when scrolled to */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {filteredArticles.map((art, idx) => (
                <article
                  key={art.id || idx}
                  ref={(el) => (cardElRefs.current[idx] = el)}
                  onClick={() => setActiveArticle(art)}
                  className="group flex flex-col justify-between border border-black/10 bg-white hover:border-black transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md"
                  style={{
                    transform: cardVisible[idx] ? 'translateX(0)' : 'translateX(-60px)',
                    opacity: cardVisible[idx] ? 1 : 0,
                    transition:
                      'transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 850ms cubic-bezier(0.16, 1, 0.3, 1), border-color 300ms, box-shadow 300ms',
                    transitionDelay: getCardDelay(idx, cardVisible[idx]),
                    willChange: 'transform, opacity',
                  }}
                >
                  {/* Article Thumbnail */}
                  <div>
                    <div className="aspect-[16/10] bg-neutral-100 overflow-hidden relative border-b border-black/10">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        loading="lazy"
                      />
                    </div>

                    {/* Metadata & Headline */}
                    <div className="p-5 sm:p-6 lg:p-7">
                      <div className="flex items-center gap-2.5 text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2.5">
                        <span>{art.date}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {art.readTime}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-normal tracking-tight text-neutral-900 group-hover:text-black mb-2.5 leading-snug">
                        {art.title}
                      </h3>

                      <p className="text-neutral-500 font-normal text-sm leading-relaxed mb-5 line-clamp-3">
                        {art.excerpt}
                      </p>

                      {/* Tag chips */}
                      {art.tags && (
                        <div className="flex flex-wrap gap-1.5 mb-1">
                          {art.tags.slice(0, 3).map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 text-[11px] font-mono"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Author + Arrow */}
                  <div className="px-5 sm:px-6 lg:px-7 py-4 border-t border-black/10 flex items-center justify-between gap-3 bg-neutral-50/60 group-hover:bg-neutral-100/60 transition-colors">
                    <div className="flex items-center gap-2.5 min-w-0 shrink">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-neutral-200 border border-black/10 flex items-center justify-center font-mono text-[10px] sm:text-[11px] font-semibold text-neutral-800 shrink-0">
                        {art.author ? art.author.charAt(0) : 'U'}
                      </div>
                      <span className="text-xs font-medium text-neutral-800 truncate">
                        {art.author}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-neutral-900 shrink-0 whitespace-nowrap group-hover:translate-x-1 transition-transform">
                      <span className="hidden xl:inline">{bp.readArticle || 'Read Technical Paper'}</span>
                      <span className="xl:hidden">{bp.readShort || 'Read Paper'}</span>
                      <ArrowUpRight size={14} className="shrink-0" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. FULL TECHNICAL ARTICLE READER MODAL                   */}
      {/* ======================================================== */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-black/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setActiveArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-white text-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-black/10 my-auto max-h-[92vh] flex flex-col"
            >
              {/* Sticky Modal Top Bar */}
              <div className="sticky top-0 z-20 px-6 sm:px-8 py-4.5 bg-white/95 backdrop-blur-md border-b border-black/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-600 hover:text-black cursor-pointer transition-colors"
                >
                  <ArrowRight size={14} className="rotate-180" />
                  <span>{bp.modal?.backToArticles || 'Back to Dispatches'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopyLink(activeArticle)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/10 hover:border-black text-xs font-mono uppercase tracking-wider text-neutral-700 hover:text-black transition-colors cursor-pointer"
                    title={bp.modal?.shareArticle || 'Share Paper'}
                  >
                    {copiedLink ? (
                      <>
                        <Check size={12} className="text-emerald-600" />
                        <span className="text-emerald-600">
                          {bp.modal?.copiedUrl || 'Copied'}
                        </span>
                      </>
                    ) : (
                      <>
                        <Share2 size={12} />
                        <span>{bp.modal?.shareArticle || 'Share'}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveArticle(null)}
                    className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600 hover:text-black transition-colors cursor-pointer"
                    aria-label="Close reader"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Scrollable Reader Content */}
              <div className="overflow-y-auto p-6 sm:p-10 lg:p-12 space-y-8 font-sans">
                {/* Header Meta */}
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-wider text-neutral-500 mb-4">
                    <span>{activeArticle.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {activeArticle.readTime}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-neutral-950 uppercase leading-[1.12] mb-6">
                    {activeArticle.title}
                  </h1>

                  <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed border-l-2 border-black pl-5 py-1">
                    {activeArticle.excerpt}
                  </p>
                </div>

                {/* Lead Image */}
                <div className="aspect-[16/9] w-full bg-neutral-100 rounded-2xl overflow-hidden border border-black/10">
                  <img
                    src={activeArticle.image}
                    alt={activeArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Author Card */}
                <div className="p-5 rounded-2xl bg-neutral-50 border border-black/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center font-mono font-semibold text-sm">
                      {activeArticle.author ? activeArticle.author.charAt(0) : 'U'}
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 text-sm">
                        {activeArticle.author}
                      </h4>
                      <p className="text-xs text-neutral-500">{activeArticle.authorRole}</p>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider hidden sm:inline">
                    {bp.modal?.publishedIn || 'UandWe Labs Engineering Journal'}
                  </span>
                </div>

                {/* Key Empirical Metrics */}
                {activeArticle.metrics && (
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
                      // {bp.modal?.keyTakeaways || 'Key Engineering Metrics'}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {activeArticle.metrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-2xl border border-black/10 bg-neutral-50/70"
                        >
                          <span className="text-2xl font-mono font-semibold text-neutral-900 block">
                            {m.value}
                          </span>
                          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mt-1">
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Detailed Technical Body Paragraphs */}
                <div className="space-y-6 text-sm sm:text-base text-neutral-700 leading-relaxed font-normal">
                  <h3 className="text-xl sm:text-2xl font-normal text-neutral-900 tracking-tight uppercase pt-4 border-t border-black/10">
                    1. The Architectural & Computational Problem
                  </h3>
                  <p>
                    Traditional engineering workflows separate schematic design from environmental validation. Structural and masterplanning teams must submit CAD assets to third-party consultants, wait days or weeks for computational fluid dynamics (CFD) convergence, and discover aerodynamic buffeting or solar glare penalties only after architectural envelopes are finalized.
                  </p>
                  <p>
                    At UandWe Labs, we treat physics as an interactive design material rather than an afterthought. By executing deterministic mathematical models directly on hardware cache and client WebGL shaders, our platforms eliminate server queues entirely.
                  </p>

                  <h3 className="text-xl sm:text-2xl font-normal text-neutral-900 tracking-tight uppercase pt-4 border-t border-black/10">
                    2. Mathematical Architecture & Hardware Optimization
                  </h3>
                  <p>
                    Whether porting 2D Saint-Venant shallow water equations across high-resolution LiDAR Digital Elevation Models, or running INT8 quantized neural pipelines directly in hardened optical sensor nodes at 180 km/h, the principle remains constant: zero cloud latency, zero drift, and absolute sovereignty.
                  </p>

                  {/* Technical Quote Callout */}
                  <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900 text-white my-6">
                    <p className="text-base sm:text-lg font-normal leading-relaxed italic">
                      "True innovation is not adding more complexity or requiring continuous cloud telemetry. It is the disciplined reduction of latency until computing feels like natural physical reality."
                    </p>
                    <span className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mt-3">
                      — UandWe Labs Architecture Manifesto
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-normal text-neutral-900 tracking-tight uppercase pt-4 border-t border-black/10">
                    3. Field Results & Practical Deployment
                  </h3>
                  <p>
                    Through active deployments across commercial high-rises, residential hillside estates, and municipal perimeter perimeters, our hardware and software systems deliver measurable performance gains: 42% HVAC equipment reduction, sub-300ms contactless fall detection, and zero false alerts on high-speed transit corridors.
                  </p>
                </div>

                {/* Footer Modal Action */}
                <div className="pt-8 border-t border-black/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {activeArticle.tags?.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs font-mono"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveArticle(null)
                      if (activeArticle.category === 'geospatial' && onNavigateToAnanda) {
                        onNavigateToAnanda()
                      } else if (activeArticle.category === 'healthcare' && onNavigateToDara) {
                        onNavigateToDara()
                      } else if (activeArticle.category === 'physicalAi' && onNavigateToAura) {
                        onNavigateToAura()
                      }
                    }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider rounded-full transition-colors cursor-pointer"
                  >
                    <span>Explore Platform</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* 4. MONOCHROMATIC HIGH-IMPACT CTA                         */}
      {/* ======================================================== */}
      <CommonCta
        title={bp.cta?.title || 'Ready to shape the future?'}
        subtitle={
          bp.cta?.subtitle ||
          'Connect with our research and systems engineering desks to review raw simulation datasets, hardware schematics, or co-author technical publications.'
        }
        buttonText={bp.cta?.buttonText || 'Connect with Our Research Desk'}
        onButtonClick={() => {
          if (onNavigateToCareers) {
            onNavigateToCareers()
          } else if (onNavigateToHome) {
            onNavigateToHome()
          }
        }}
      />

      {/* ======================================================== */}
      {/* 7. GLOBAL FOOTER                                         */}
      {/* ======================================================== */}
      <Footer
        onNavigateToHome={onNavigateToHome}
        onNavigateToAnanda={onNavigateToAnanda}
        onNavigateToDara={onNavigateToDara}
        onNavigateToAura={onNavigateToAura}
        onNavigateToBlogs={onNavigateToBlogs}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToCareers={onNavigateToCareers}
        onNavigateToPrivacy={onNavigateToPrivacy}
        onNavigateToSecurity={onNavigateToSecurity}
        onNavigateToTerms={onNavigateToTerms}
        user={user}
      />
    </div>
  )
}
