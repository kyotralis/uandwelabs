import Logo from '../assets/logo.webp'
import { useTranslation } from '../i18n'

export default function Footer({
  onNavigateToHome,
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
  const f = t.footer || {}

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
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
      window.location.hash = id
    }
  }

  return (
    <footer className="w-full bg-[var(--site-bg)] text-slate-900 border-t border-[var(--site-border)] font-sans pt-14 sm:pt-16 pb-12 px-6 sm:px-12 lg:px-16">
      <div className="max-w-[1560px] w-full mx-auto">
        
        {/* ================= MAIN FOOTER GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-12 border-b border-[var(--site-border)]">
          
          {/* Left: Brand Logo + Description together (Original clean layout) */}
          <div className="md:col-span-5 pr-0 lg:pr-8">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById('hero')
                if (el) {
                  if (window.__lenis) {
                    window.__lenis.scrollTo(0, { duration: 1.2 })
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                } else {
                  if (onNavigateToHome) {
                    onNavigateToHome()
                  }
                  window.location.hash = 'hero'
                }
              }}
              className="inline-flex items-center gap-3 mb-4 group cursor-pointer"
            >
              <img
                src={Logo}
                alt="UandWe Labs logo"
                className="h-11 sm:h-12 w-auto object-contain group-hover:scale-105 transition-all"
              />
              <span className="text-[19px] sm:text-[20px] font-semibold tracking-[-0.03em] text-slate-900 group-hover:text-black transition-colors font-['Inter']">
                UANDWE LABS
              </span>
            </a>

            <p className="text-sm text-slate-500 font-normal leading-relaxed max-w-sm mt-1">
              {f.description || 'We bridge generative intelligence, environmental physics, and precision engineering to design sustainable, future-ready realities.'}
            </p>
          </div>

          {/* Middle: Links Columns (About Us & Products) */}
          <div className="md:col-span-5 grid grid-cols-2 gap-8 text-sm">
            
            {/* Column 1: About Us */}
            <div>
              <h4 className="font-semibold text-slate-900 text-sm mb-4">
                {f.aboutUsCol || 'About Us'}
              </h4>
              <ul className="space-y-3 text-slate-600">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      if (onNavigateToAbout) {
                        onNavigateToAbout()
                      } else {
                        scrollToSection('about')
                      }
                    }}
                    className="hover:text-black transition-colors cursor-pointer text-left"
                  >
                    {f.links?.aboutUs || 'About Us'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      if (onNavigateToCareers) {
                        onNavigateToCareers()
                      } else {
                        scrollToSection('careers')
                      }
                    }}
                    className="hover:text-black transition-colors cursor-pointer text-left"
                  >
                    {f.links?.careers || 'Careers'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      if (onNavigateToBlogs) {
                        onNavigateToBlogs()
                      } else {
                        scrollToSection('blogs')
                      }
                    }}
                    className="hover:text-black transition-colors cursor-pointer text-left"
                  >
                    {f.links?.techBlog || 'Technical Blog'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('about')}
                    className="hover:text-black transition-colors cursor-pointer text-left"
                  >
                    {f.links?.partners || 'Partners'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Products */}
            <div>
              <h4 className="font-semibold text-slate-900 text-sm mb-4">
                {f.productsCol || 'Products'}
              </h4>
              <ul className="space-y-3 text-slate-600">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      if (onNavigateToAnanda) {
                        onNavigateToAnanda()
                      } else {
                        scrollToSection('introduction')
                      }
                    }}
                    className="hover:text-black transition-colors cursor-pointer text-left"
                  >
                    {f.links?.ananda || 'Ananda'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      if (onNavigateToDara) {
                        onNavigateToDara()
                      } else {
                        scrollToSection('healthcare')
                      }
                    }}
                    className="hover:text-black transition-colors cursor-pointer text-left"
                  >
                    {f.links?.dara || 'Dara (Healthcare)'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      if (onNavigateToAura) {
                        onNavigateToAura()
                      } else {
                        scrollToSection('board')
                      }
                    }}
                    className="hover:text-black transition-colors cursor-pointer text-left"
                  >
                    {f.links?.aura || 'Aura (Physical AI)'}
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Right: Twitter (X) & LinkedIn Icons Alone on the Right Side */}
          <div className="md:col-span-2 flex md:justify-end items-start pt-1">
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:text-black hover:bg-slate-50 hover:border-slate-400 transition-all shadow-xs cursor-pointer"
                title="Twitter (X)"
                aria-label="Twitter (X)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:text-[#0A66C2] hover:bg-blue-50/60 hover:border-blue-300 transition-all shadow-xs cursor-pointer"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63s.73 1.63 1.63 1.63 1.63-.73 1.63-1.63-.73-1.63-1.63-1.63z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* ================= BOTTOM BAR: COPYRIGHT & LEGAL ================= */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span>{f.copyright || '© 2026 uandwelabs. All rights reserved.'}</span>
          </div>

          <div className="flex items-center gap-5 sm:gap-6 flex-wrap">
            <button
              type="button"
              onClick={() => {
                if (onNavigateToPrivacy) {
                  onNavigateToPrivacy()
                } else {
                  try {
                    sessionStorage.setItem('uandwe_current_page', 'privacy')
                  } catch {}
                  window.location.hash = 'privacy'
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new Event('hashchange'))
                  }
                }
              }}
              className="hover:text-slate-800 transition-colors cursor-pointer text-left"
            >
              {f.legal?.privacy || 'Privacy Policy'}
            </button>

            <button
              type="button"
              onClick={() => {
                if (onNavigateToTerms) {
                  onNavigateToTerms()
                } else {
                  try {
                    sessionStorage.setItem('uandwe_current_page', 'terms')
                  } catch {}
                  window.location.hash = 'terms'
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new Event('hashchange'))
                  }
                }
              }}
              className="hover:text-slate-800 transition-colors cursor-pointer text-left"
            >
              {f.legal?.terms || 'Terms of Service'}
            </button>
          </div>
        </div>

      </div>
    </footer>
  )
}
