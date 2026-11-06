import { useEffect, useState } from 'react'
import { ArrowLeft, FileText, CheckCircle2, Mail, ShieldAlert, Award } from 'lucide-react'
import Footer from '../components/Footer'
import { useTranslation } from '../i18n'

export default function TermsPage({
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
  const [activeSection, setActiveSection] = useState('acceptance')

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
    { id: 'acceptance', label: '1. Acceptance of Terms' },
    { id: 'licenses', label: '2. Computational Platform Licenses' },
    { id: 'hardware', label: '3. Hardware Benches & Pilot Units' },
    { id: 'ip', label: '4. Intellectual Property & Solvers' },
    { id: 'liability', label: '5. Disclaimers & Environmental Physics' },
    { id: 'conduct', label: '6. Acceptable Use & Sovereign Integrity' },
    { id: 'governance', label: '7. Governing Law & Jurisdiction' },
    { id: 'contact', label: '8. Legal Desk & Inquiries' },
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
            Terms of <br />
            <span className="text-neutral-400">Service & Engagement.</span>
          </h1>

          <p className="text-neutral-300 text-base sm:text-lg max-w-2xl leading-relaxed font-normal">
            Rules, operational covenants, and licensing agreements governing the use of 
            UandWe Labs software engines, simulation kernels, hardware benchmarks, and clinical research devices.
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
                Terms Index
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
                <span className="text-[11px] font-mono text-neutral-400 block mb-2">Legal Counsel</span>
                <a
                  href="mailto:legal@uandwelabs.com"
                  className="inline-flex items-center gap-2 text-xs font-mono text-neutral-900 hover:text-black font-medium underline underline-offset-4"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>legal@uandwelabs.com</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Main Legal Articles */}
          <main className="lg:col-span-8 space-y-12 sm:space-y-16 text-neutral-800 leading-relaxed">
            
            {/* Section 1 */}
            <article id="acceptance" className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Section 01</span>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                1. Acceptance of Terms
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                By accessing or interacting with UandWe Labs portals, Ananda simulation platforms, Dara assistive hardware, or Aura sovereign vision devices, you acknowledge that you have reviewed, understood, and agreed to be legally bound by these Terms of Service. If you are entering into this agreement on behalf of an architectural practice, healthcare institution, or municipal agency, you represent that you possess legal authority to bind that entity.
              </p>
            </article>

            {/* Section 2 */}
            <article id="licenses" className="space-y-4 pt-6 border-t border-black/10">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Section 02</span>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                2. Computational Platform Licenses
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                Subject to compliance with these terms, UandWe Labs grants you a limited, non-exclusive, revocable, non-transferable license to access our real-time WebGL compute shaders, diurnal solar ephemeris models, and Lattice Boltzmann fluid dynamic solvers strictly for architectural evaluation and research. Reverse engineering compiled WASM binaries or redistributing underlying mathematical kernels without written consent is strictly prohibited.
              </p>
            </article>

            {/* Section 3 */}
            <article id="hardware" className="space-y-4 pt-6 border-t border-black/10">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Section 03</span>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                3. Hardware Benches & Clinical Pilot Units
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                Dara assistive devices provided for healthcare pilots or private trials remain the intellectual property of UandWe Labs unless purchased under commercial enterprise transfer deeds. Pilot participants agree to deploy devices in accordance with provided clinical guidelines and must not subject units to electrical overstress, liquid submersion beyond rated IP standards, or non-sanctioned hardware modifications.
              </p>
            </article>

            {/* Section 4 */}
            <article id="ip" className="space-y-4 pt-6 border-t border-black/10">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Section 04</span>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                4. Intellectual Property & Solver Ownership
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                All proprietary mathematical solvers, D3Q19 aerodynamic collision algorithms, 128-TOPS neural tensor layouts, industrial hardware designs, typography, brand marks, and technical journal whitepapers are the exclusive property of UandWe Labs. Clients retain 100% full intellectual property ownership over their uploaded 3D CAD meshes, architectural floorplans, and outputted environmental reports.
              </p>
            </article>

            {/* Section 5 */}
            <article id="liability" className="space-y-4 pt-6 border-t border-black/10">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Section 05</span>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                5. Environmental Physics Disclaimers
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                Ananda computational fluid dynamics, diurnal ray-casting, and 2D Saint-Venant flood simulations are high-precision mathematical models intended for conceptual architectural optimization. While calibrated against wind tunnel empirical datasets and NOAA climate data, they do not eliminate the necessity of formal civil engineering stamp approvals for structural permits and seismic compliance.
              </p>
            </article>

            {/* Section 6 */}
            <article id="conduct" className="space-y-4 pt-6 border-t border-black/10">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Section 06</span>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                6. Acceptable Use & Sovereign Integrity
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                You agree not to utilize our autonomous edge vision devices or spatial physics kernels for unlawful surveillance, biometric harassment, weaponized guidance, or any deployment that infringes upon human optical dignity. Any breach results in immediate revocation of licenses and termination of active WebRTC consultation desks.
              </p>
            </article>

            {/* Section 7 */}
            <article id="governance" className="space-y-4 pt-6 border-t border-black/10">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Section 07</span>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                7. Governing Law & Dispute Resolution
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                These Terms of Service are governed by and construed in accordance with the laws of the Republic of India. Any legal dispute, controversy, or claim arising out of or relating to this platform shall be subject to the exclusive jurisdiction of the competent courts located in Bengaluru, Karnataka, India.
              </p>
            </article>

            {/* Section 8 */}
            <article id="contact" className="space-y-4 pt-6 border-t border-black/10">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Section 08</span>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                8. Legal Desk & Inquiries
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                For commercial licensing contracts, institutional fellowship covenants, or legal notices, contact our counsel:
              </p>
              <div className="p-6 rounded-2xl bg-neutral-950 text-white space-y-2 text-sm font-mono">
                <p className="text-neutral-400">OFFICE OF GENERAL COUNSEL & LICENSING</p>
                <p className="text-white font-medium">UandWe Labs Engineering Campus</p>
                <p className="text-neutral-300">Bengaluru, Karnataka 560001, India</p>
                <p className="pt-2">
                  Legal Desk:{' '}
                  <a href="mailto:legal@uandwelabs.com" className="text-white underline underline-offset-4">
                    legal@uandwelabs.com
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

