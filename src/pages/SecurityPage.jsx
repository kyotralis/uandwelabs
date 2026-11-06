import { useEffect, useState } from 'react'
import { ArrowLeft, ShieldCheck, Lock, Cpu, Server, Key, AlertTriangle, CheckCircle2, Mail, Terminal, FileCode } from 'lucide-react'
import Footer from '../components/Footer'
import { useTranslation } from '../i18n'

export default function SecurityPage({
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
  const [activeSection, setActiveSection] = useState('philosophy')

  useEffect(() => {
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
    { id: 'philosophy', label: '1. Sovereign Security Philosophy' },
    { id: 'silicon', label: '2. Hardware Root of Trust & Silicon' },
    { id: 'radar', label: '3. Radar & Zero-Camera Isolation' },
    { id: 'encryption', label: '4. Cryptographic Standards' },
    { id: 'mesh', label: '5. Air-Gapped Mesh Architecture' },
    { id: 'vdp', label: '6. Vulnerability Disclosure Program' },
    { id: 'incident', label: '7. Incident Response & SLAs' },
    { id: 'contact', label: '8. Security Engineering Contact' },
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

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono uppercase tracking-wider text-neutral-300 mb-6">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-200" />
            <span>INFRASTRUCTURE & PROTOCOL SECURITY · 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight uppercase leading-[1.08] mb-6">
            Security & <br />
            <span className="text-neutral-400">System Hardening.</span>
          </h1>

          <p className="text-neutral-300 text-base sm:text-lg max-w-2xl leading-relaxed font-normal">
            How UandWe Labs protects physical infrastructure, mathematical simulation pipelines, 
            and assistive hardware through sovereign edge silicon, air-gapped cryptographic validation, 
            and zero-trust engineering standards.
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
                Security Sections
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
                <span className="text-[11px] font-mono text-neutral-400 block mb-2">Vulnerability Desk</span>
                <a
                  href="mailto:security@uandwelabs.com"
                  className="inline-flex items-center gap-2 text-xs font-mono text-neutral-900 hover:text-black font-medium underline underline-offset-4"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>security@uandwelabs.com</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Main Security Documentation */}
          <main className="lg:col-span-8 space-y-12 sm:space-y-16 text-neutral-800 leading-relaxed">
            
            {/* Section 1 */}
            <article id="philosophy" className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Section 01</span>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                1. Sovereign Security Philosophy
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                In mission-critical infrastructure, centralized cloud dependencies introduce fatal points of failure and surveillance vectors. 
                Our engineering architecture is built on the paradigm of <strong className="text-neutral-950 font-medium">sovereign edge computation</strong>. 
                Every node we deploy — from Dara senior care sensors in homes to Aura highway sentinel nodes on transit corridors — contains dedicated local compute silicon capable of independent, autonomous execution with zero internet connectivity.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-black/10 bg-neutral-50">
                  <span className="text-xs font-mono text-neutral-400 block mb-1">LATENCY INVARIANT</span>
                  <p className="text-lg font-semibold text-neutral-950">&lt; 1.2 ms</p>
                  <p className="text-xs text-neutral-500 mt-1">Zero cloud round-trip delay</p>
                </div>
                <div className="p-4 rounded-xl border border-black/10 bg-neutral-50">
                  <span className="text-xs font-mono text-neutral-400 block mb-1">DATA EGRESS</span>
                  <p className="text-lg font-semibold text-neutral-950">0.00%</p>
                  <p className="text-xs text-neutral-500 mt-1">No raw video leaves cache</p>
                </div>
                <div className="p-4 rounded-xl border border-black/10 bg-neutral-50">
                  <span className="text-xs font-mono text-neutral-400 block mb-1">ENCRYPTION AT REST</span>
                  <p className="text-lg font-semibold text-neutral-950">AES-256</p>
                  <p className="text-xs text-neutral-500 mt-1">Hardware cryptoprocessor</p>
                </div>
              </div>
            </article>

            {/* Section 2 */}
            <article id="silicon" className="space-y-4 pt-6 border-t border-black/10">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Section 02</span>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                2. Hardware Root of Trust & Cryptographic Silicon
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                Each custom motherboard and sensor carrier board developed in our Bengaluru hardware foundry incorporates an immutable Hardware Root of Trust (RoT):
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-neutral-600">
                <li>
                  <strong className="text-neutral-900 font-medium">Cryptographically Signed Bootloader:</strong> Microcontrollers verify Ed25519 digital signatures on all firmware binaries in read-only mask ROM before permitting code execution.
                </li>
                <li>
                  <strong className="text-neutral-900 font-medium">Anti-Tamper Enclosures:</strong> Enclosures for Aura defense cameras and Dara assistive devices incorporate physical active interlocks that instantaneously wipe internal volatile keystores upon unauthorized physical chassis penetration.
                </li>
                <li>
                  <strong className="text-neutral-900 font-medium">True Random Number Generation (TRNG):</strong> Cryptographic keys are generated utilizing quantum thermal junction noise on silicon, completely eliminating pseudo-random entropy depletion.
                </li>
              </ul>
            </article>

            {/* Section 3 */}
            <article id="radar" className="space-y-4 pt-6 border-t border-black/10">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Section 03</span>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                3. Radar & Zero-Camera Isolation Architecture
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                For geriatric safety and intimate domestic environments, camera-based computer vision presents unacceptable privacy risk. 
                Dara eliminates cameras entirely through 60 GHz millimeter-wave frequency-modulated continuous wave (FMCW) radar.
              </p>
              <div className="p-5 rounded-2xl bg-neutral-950 text-white space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>EMBEDDED RADAR PIPELINE ISOLATION</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 font-mono">
                  [RADAR ANTENNA] → [RAW RF BEAT FREQUENCY] → [ON-CHIP FFT KERNEL] → [MICRO-DOPPLER VELOCITY METRIC] → [DISCARD RAW BUFFER]
                </p>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  The raw microwave reflection never traverses an external bus or operating system filesystem. Only the deterministic mathematical scalar (e.g. abrupt negative Z-axis acceleration &gt; 3.2 m/s²) triggers an emergency dispatch alert.
                </p>
              </div>
            </article>

            {/* Section 4 */}
            <article id="encryption" className="space-y-4 pt-6 border-t border-black/10">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Section 04</span>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                4. Cryptographic Standards & Transport
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-neutral-600">
                <p>
                  All external communication layers adhere to strict zero-trust standards:
                </p>
                <div className="space-y-2">
                  <div className="p-4 rounded-xl border border-black/10 bg-white">
                    <h4 className="font-medium text-neutral-950 text-sm mb-1 flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-neutral-500" />
                      <span>WebRTC Live Video Consultations</span>
                    </h4>
                    <p className="text-xs text-neutral-600">
                      Technical sessions between architects and our simulation team are transmitted over peer-to-peer DTLS-SRTP channels with end-to-end forward secrecy. No recording servers sit inline without explicit mutual authorization.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-black/10 bg-white">
                    <h4 className="font-medium text-neutral-950 text-sm mb-1 flex items-center gap-2">
                      <Server className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Web Services & API Hardening</span>
                    </h4>
                    <p className="text-xs text-neutral-600">
                      Enforced TLS 1.3 with strict HSTS (Strict-Transport-Security: max-age=63072000; includeSubDomains; preload), CSP headers disallowing inline script execution, and rate limiting with automated IP jail fail2ban mechanisms.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Section 5 */}
            <article id="mesh" className="space-y-4 pt-6 border-t border-black/10">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Section 05</span>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                5. Air-Gapped Sovereign Mesh Architecture
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                For critical industrial perimeters and defense installations, Aura nodes coordinate across an air-gapped optical and sub-GHz mesh spanning 350 meters without internet access. 
                Nodes share zero-knowledge telemetry frames authenticated with ephemeral cryptographic tokens, guaranteeing that disruption of one node cannot compromise perimeter telemetry.
              </p>
            </article>

            {/* Section 6 */}
            <article id="vdp" className="space-y-4 pt-6 border-t border-black/10">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Section 06</span>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                6. Vulnerability Disclosure Program (VDP)
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                We actively welcome security researchers, reverse engineers, and cryptographic auditors to evaluate our web infrastructure, firmware binaries, and simulation engines.
              </p>

              <div className="p-5 rounded-xl border border-black/10 bg-neutral-50 space-y-3">
                <h4 className="font-medium text-neutral-950 text-sm">Safe Harbor Commitment</h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  If you conduct good-faith vulnerability research in compliance with this policy, we will consider your research authorized, work with you to remediate the vulnerability swiftly, and not pursue legal action.
                </p>
                <div className="pt-2 text-xs font-mono text-neutral-700 space-y-1">
                  <p>• Reporting Address: <strong className="text-neutral-950">security@uandwelabs.com</strong></p>
                  <p>• Initial Response SLA: &lt; 24 Hours</p>
                  <p>• Triage & Patch Verification: &lt; 72 Hours</p>
                </div>
              </div>
            </article>

            {/* Section 7 */}
            <article id="incident" className="space-y-4 pt-6 border-t border-black/10">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Section 07</span>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                7. Incident Response & Business Continuity SLAs
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                UandWe Labs maintains an automated 24/7 technical incident response desk. 
                In the event of an infrastructure anomaly, automated circuit breakers decouple external integrations within 300 milliseconds. 
                Any affected commercial partners receive root-cause engineering retrospectives and cryptographic proofs of zero data contamination.
              </p>
            </article>

            {/* Section 8 */}
            <article id="contact" className="space-y-4 pt-6 border-t border-black/10">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Section 08</span>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                8. Security Engineering Contact
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                To report critical security advisories, encrypt communications using our public PGP key:
              </p>
              <div className="p-6 rounded-2xl bg-neutral-950 text-white space-y-2 text-sm font-mono">
                <p className="text-neutral-400">SECURITY OPERATIONS DESK & HARDWARE LAB</p>
                <p className="text-white font-medium">UandWe Labs Engineering Campus</p>
                <p className="text-neutral-300">Bengaluru, Karnataka 560001, India</p>
                <p className="pt-2">
                  Emergency Desk:{' '}
                  <a href="mailto:security@uandwelabs.com" className="text-white underline underline-offset-4">
                    security@uandwelabs.com
                  </a>
                </p>
                <p className="text-xs text-neutral-400 pt-1">
                  PGP Fingerprint: <span className="text-neutral-300">8A4F 92E1 30CB B591 0D38  4F12 7E89 A320 6C9B D410</span>
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

