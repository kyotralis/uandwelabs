import { useEffect, useState } from 'react'
import { ArrowLeft, Lock, EyeOff, Server, HardDrive, CheckCircle2, ChevronRight, Mail } from 'lucide-react'
import Footer from '../components/Footer'
import { useTranslation } from '../i18n'

export default function PrivacyPolicyPage({
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
  const [activeSection, setActiveSection] = useState('principles')

  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true })
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const handleBack = () => {
    if (onNavigateToHome) {
      onNavigateToHome()
    } else if (typeof window !== 'undefined') {
      window.location.hash = ''
    }
  }

  const sections = [
    { id: 'principles', label: '1. Privacy by Architecture' },
    { id: 'collection', label: '2. Information We Collect' },
    { id: 'hardware', label: '3. Product & Edge Sensor Privacy' },
    { id: 'simulation', label: '4. Simulation Models & Geometry' },
    { id: 'cookies', label: '5. Storage & Telemetry' },
    { id: 'rights', label: '6. User Rights & Data Sovereignty' },
    { id: 'compliance', label: '7. Regulatory Compliance (DPDP & GDPR)' },
    { id: 'contact', label: '8. Data Protection Officer' },
  ]

  const scrollToClause = (id) => {
    setActiveSection(id)
    const el = document.getElementById(id)
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 120
      window.scrollTo({ top: topOffset, behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-white min-h-screen text-neutral-900 w-full font-sans selection:bg-black selection:text-white">
      {/* ======================================================== */}
      {/* 1. HERO HEADER                                           */}
      {/* ======================================================== */}
      <section className="relative w-full bg-black text-white pt-32 sm:pt-36 pb-16 sm:pb-20 px-6 sm:px-12 lg:px-16 overflow-hidden border-b border-white/10">
        <div className="max-w-[1280px] mx-auto">
          {/* Circular Arrow-Only Back Button */}
          <div className="mb-6 sm:mb-8">
            <button
              type="button"
              onClick={handleBack}
              aria-label="Back to Home"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 group cursor-pointer shadow-lg hover:scale-105 active:scale-95 hover:border-white/40"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight uppercase leading-[1.08] mb-6">
            Privacy Policy & <br />
            <span className="text-neutral-400">Data Sovereignty.</span>
          </h1>

          <p className="text-neutral-300 text-base sm:text-lg max-w-2xl leading-relaxed font-normal">
            At UandWe Labs, privacy is an engineering invariant, not a legal afterthought. 
            We design edge physical AI, contactless senior care radar, and microclimate solvers 
            that operate with uncompromising personal dignity and zero unnecessary cloud data egress.
          </p>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. BODY LAYOUT: TABLE OF CONTENTS + DETAILED SECTIONS     */}
      {/* ======================================================== */}
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Quick Jump Sidebar */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-28 p-6 rounded-2xl bg-neutral-50 border border-black/10">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-4">
                Policy Navigation
              </span>
              <ul className="space-y-1.5 text-sm">
                {sections.map((sec) => (
                  <li key={sec.id}>
                    <button
                      type="button"
                      onClick={() => scrollToClause(sec.id)}
                      className={`w-full text-left py-2 px-3 rounded-lg transition-colors cursor-pointer text-xs font-mono ${
                        activeSection === sec.id
                          ? 'bg-black text-white font-medium'
                          : 'text-neutral-600 hover:text-black hover:bg-neutral-200/60'
                      }`}
                    >
                      {sec.label}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-black/10">
                <span className="text-[11px] font-mono text-neutral-400 block mb-2">Direct Inquiry</span>
                <a
                  href="mailto:privacy@uandwelabs.com"
                  className="inline-flex items-center gap-2 text-xs font-mono text-neutral-900 hover:text-black font-medium underline underline-offset-4"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>privacy@uandwelabs.com</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Main Content Articles */}
          <main className="lg:col-span-8 space-y-12 sm:space-y-16 text-neutral-800 leading-relaxed">
            
            {/* Section 1 */}
            <article id="principles" className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Section 01</span>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                1. Privacy by Architecture
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                UandWe Labs builds hardware and computational platforms under a foundational principle: 
                <strong className="text-neutral-950 font-medium"> data that never leaves the local premise cannot be leaked, harvested, or weaponized.</strong> 
                Unlike conventional consumer tech ecosystems that monetize behavioral tracking, our business model relies exclusively on enterprise licenses, research bench grants, and physical device deployments.
              </p>
              <div className="p-5 rounded-xl bg-neutral-50 border border-black/10 text-xs sm:text-sm text-neutral-700 space-y-2">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Zero biometric harvesting or advertising re-targeting.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Client-side WebGL simulation execution for CAD and environmental physics meshes.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Complete air-gapped support for sovereign transit and defense installations.</span>
                </div>
              </div>
            </article>

            {/* Section 2 */}
            <article id="collection" className="space-y-4 pt-6 border-t border-black/10">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Section 02</span>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                2. Information We Collect
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                We only collect minimal technical and contact information that you explicitly provide when engaging with our platform:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-neutral-600">
                <li>
                  <strong className="text-neutral-900 font-medium">Consultation & Scheduling Dossiers:</strong> Name, professional email, architectural studio or institution name, and optional target project coordinates for microclimate reviews.
                </li>
                <li>
                  <strong className="text-neutral-900 font-medium">Fellowship & Bench Applications:</strong> Contact details, CV/portfolio links, and self-disclosed technical problem write-ups submitted via our careers modal.
                </li>
                <li>
                  <strong className="text-neutral-900 font-medium">Technical Journal Dispatches:</strong> Email address for recipients subscribing to unreleased whitepapers, with one-click unsubscribe in every transmission.
                </li>
              </ul>
            </article>

            {/* Section 3 */}
            <article id="hardware" className="space-y-4 pt-6 border-t border-black/10">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Section 03</span>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                3. Product & Edge Sensor Privacy
              </h2>
              
              <div className="space-y-4">
                <div className="border border-black/10 rounded-xl p-6 bg-white hover:border-black/30 transition-colors">
                  <h3 className="text-lg font-medium text-neutral-950 mb-2 flex items-center gap-2">
                    <EyeOff className="w-4 h-4 text-neutral-600" />
                    <span>Dara Assistive Health: 100% Optical Dignity</span>
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Dara operates without cameras, microphones, or wearable tracking bracelets. 
                    Fall detection is computed via 60 GHz contactless millimeter-wave FMCW radar. 
                    Raw radar reflections are transformed into instantaneous micro-doppler velocity curves directly in on-chip embedded DSP registers and discarded within milliseconds. 
                    No visual images of private bedrooms, bathrooms, or living quarters can ever be recorded or transmitted.
                  </p>
                </div>

                <div className="border border-black/10 rounded-xl p-6 bg-white hover:border-black/30 transition-colors">
                  <h3 className="text-lg font-medium text-neutral-950 mb-2 flex items-center gap-2">
                    <Server className="w-4 h-4 text-neutral-600" />
                    <span>Aura Physical AI: On-Chip INT8 Vision</span>
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Aura nodes execute vehicle tracking, high-speed multilane LPR, and perimeter boundary alerts locally on our 128-TOPS neural tensor processor. 
                    Video feeds remain within internal high-speed SRAM. Only structured cryptographic metadata events (e.g., timestamp and vector confidence) are forwarded to local private mesh controllers.
                  </p>
                </div>
              </div>
            </article>

            {/* Section 4 */}
            <article id="simulation" className="space-y-4 pt-6 border-t border-black/10">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Section 04</span>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                4. Simulation Models & Geometry
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                When using the Ananda GeoSpatial platform, your 3D CAD models, Rhino/OBJ exports, and building envelopes are parsed locally in your web browser via client-side WebGL compute shaders. 
                We do not upload proprietary architectural floorplans, structural drawings, or elevation geometry to external training datasets without explicit contractual agreements.
              </p>
            </article>

            {/* Section 5 */}
            <article id="cookies" className="space-y-4 pt-6 border-t border-black/10">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Section 05</span>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                5. Storage & Telemetry
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                We do not deploy third-party advertising tracking cookies (such as Meta Pixel or cross-site tracking beacons). 
                We utilize minimal <code className="text-xs font-mono bg-neutral-100 px-2 py-0.5 rounded">sessionStorage</code> and <code className="text-xs font-mono bg-neutral-100 px-2 py-0.5 rounded">localStorage</code> strictly to:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-neutral-600">
                <li>Remember your active authenticated user session.</li>
                <li>Preserve your selected language and locale preference.</li>
                <li>Restore your exact reading section when refreshing long engineering benches.</li>
              </ul>
            </article>

            {/* Section 6 */}
            <article id="rights" className="space-y-4 pt-6 border-t border-black/10">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Section 06</span>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                6. User Rights & Data Sovereignty
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                Regardless of your geographic location, you retain full sovereignty over your information:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-black/10 bg-neutral-50">
                  <h4 className="font-medium text-neutral-950 text-sm mb-1">Right to Complete Erasure</h4>
                  <p className="text-xs text-neutral-600">You may request the immediate deletion of your consultation bookings and account credentials at any time.</p>
                </div>
                <div className="p-4 rounded-xl border border-black/10 bg-neutral-50">
                  <h4 className="font-medium text-neutral-950 text-sm mb-1">Right to Data Portability</h4>
                  <p className="text-xs text-neutral-600">Download any technical simulation outputs, ephemeris logs, or consultation dossiers in open JSON/CSV formats.</p>
                </div>
              </div>
            </article>

            {/* Section 7 */}
            <article id="compliance" className="space-y-4 pt-6 border-t border-black/10">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Section 07</span>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                7. Regulatory Compliance (DPDP & GDPR)
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                UandWe Labs complies with the Indian Digital Personal Data Protection (DPDP) Act 2023, the European Union General Data Protection Regulation (GDPR), and the California Consumer Privacy Act (CCPA). 
                All data in transit is encrypted using TLS 1.3, and resting databases are encrypted using AES-256 GCM.
              </p>
            </article>

            {/* Section 8 */}
            <article id="contact" className="space-y-4 pt-6 border-t border-black/10">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Section 08</span>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                8. Data Protection Officer & Inquiries
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                For formal privacy inquiries, cryptographic audits, or data deletion requests, contact our engineering desk:
              </p>
              <div className="p-6 rounded-2xl bg-neutral-950 text-white space-y-2 text-sm font-mono">
                <p className="text-neutral-400">OFFICE OF DATA PROTECTION & SOVEREIGNTY</p>
                <p className="text-white font-medium">UandWe Labs Engineering Campus</p>
                <p className="text-neutral-300">Bengaluru, Karnataka 560001, India</p>
                <p className="pt-2">
                  Email:{' '}
                  <a href="mailto:privacy@uandwelabs.com" className="text-white underline underline-offset-4">
                    privacy@uandwelabs.com
                  </a>
                </p>
              </div>
            </article>

          </main>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. SITE FOOTER                                           */}
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

