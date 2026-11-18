import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  FileText,
  CheckCircle2,
  Mail,
  ShieldAlert,
  Award,
  Shield,
  Scale,
  Cpu,
  Lock,
  Terminal,
  AlertTriangle,
  Building,
  HardDrive,
  ExternalLink,
} from 'lucide-react'
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
  const [activeSection, setActiveSection] = useState('preamble')

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
    { id: 'preamble', label: '1. Preamble & Master Agreement' },
    { id: 'accounts', label: '2. Accounts, Authentication & Access' },
    { id: 'simulation-licenses', label: '3. Ananda Urban Physics Licenses' },
    { id: 'hardware-pilots', label: '4. Hardware Pilots & Edge Deployment' },
    { id: 'intellectual-property', label: '5. IP Rights & Customer Ownership' },
    { id: 'data-sovereignty', label: '6. Zero-Egress Data Sovereignty' },
    { id: 'acceptable-use', label: '7. Acceptable Use & Ethical AI' },
    { id: 'warranties', label: '8. Limited Warranties & Disclaimers' },
    { id: 'liability', label: '9. Limitation of Liability & Indemnity' },
    { id: 'termination', label: '10. Term, Suspension & Termination' },
    { id: 'export-governance', label: '11. Export Controls & Governing Law' },
    { id: 'legal-desk', label: '12. Legal Desk & Inquiries' },
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

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-white/10 border border-white/20 text-neutral-300">
              Enterprise Governance
            </span>
            <span className="text-xs font-mono text-neutral-400">
              Version 3.4 · Effective November 2026
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight uppercase leading-[1.08] mb-6">
            Terms of <br />
            <span className="text-neutral-400">Service & Enterprise Agreement.</span>
          </h1>

          <p className="text-neutral-300 text-base sm:text-lg max-w-3xl leading-relaxed font-normal">
            These Terms of Service govern enterprise access, mathematical simulation engine licensing,
            hardware evaluation kits, edge physical AI nodes, and clinical research deployments provided by
            UandWe Labs Private Limited.
          </p>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. BODY LAYOUT: TABLE OF CONTENTS + DETAILED SECTIONS     */}
      {/* ======================================================== */}
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Quick Jump Sidebar */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-28 p-6 rounded-2xl bg-neutral-50 border border-black/10">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-4">
                Articles of Agreement
              </span>
              <ul className="space-y-1 text-xs font-mono">
                {sections.map((sec) => (
                  <li key={sec.id}>
                    <button
                      type="button"
                      onClick={() => scrollToClause(sec.id)}
                      className={`w-full text-left py-2 px-3 rounded-lg transition-all cursor-pointer ${
                        activeSection === sec.id
                          ? 'bg-black text-white font-medium shadow-sm'
                          : 'text-neutral-600 hover:text-black hover:bg-neutral-200/60'
                      }`}
                    >
                      {sec.label}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-black/10 space-y-3">
                <span className="text-[11px] font-mono text-neutral-400 block uppercase tracking-wider">
                  Compliance Desk
                </span>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Questions regarding master enterprise agreements (MSA) or custom hardware SLAs:
                </p>
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
          <main className="lg:col-span-8 space-y-14 sm:space-y-18 text-neutral-800 leading-relaxed">
            
            {/* Section 1 */}
            <article id="preamble" className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase bg-neutral-100 text-neutral-700 font-medium">
                  Article 01
                </span>
                <span className="text-xs font-mono text-neutral-400">Preamble & Scope</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                1. Preamble & Binding Master Agreement
              </h2>
              <div className="space-y-3 text-sm sm:text-[15px] text-neutral-600 leading-relaxed font-normal">
                <p>
                  <strong>1.1 Legal Entity & Applicability.</strong> This Agreement is executed between 
                  <strong> UandWe Labs Private Limited</strong> (hereinafter referred to as <em>"UandWe Labs"</em>, <em>"Company"</em>, <em>"we"</em>, <em>"us"</em>, or <em>"our"</em>), an engineering technology corporation organized under the laws of the Republic of India with headquarters in Bengaluru, Karnataka, and the commercial entity, government agency, educational institution, or individual purchasing, accessing, or evaluating our platforms (<em>"Customer"</em>, <em>"Client"</em>, or <em>"you"</em>).
                </p>
                <p>
                  <strong>1.2 Covered Platforms & Hardware.</strong> These Terms govern all engagements across UandWe Labs engineering divisions, including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                  <li>
                    <strong>ANANDA Platform:</strong> High-performance computational fluid dynamics (CFD), Lattice Boltzmann (LBM) aerodynamic kernels, diurnal solar ray-casting, 2D Saint-Venant shallow water hydrology solvers, and WebGL/WebGPU browser compute runtimes.
                  </li>
                  <li>
                    <strong>DARA Platform:</strong> Contactless 60 GHz frequency-modulated continuous wave (FMCW) radar assistive hardware, multi-language acoustic guidance engines, optical dignity motion monitoring, and related evaluation kits.
                  </li>
                  <li>
                    <strong>AURA Platform:</strong> Autonomous 128-TOPS edge physical AI machine vision sensor nodes, hardware INT8 quantized neural tensor inferencing cores, high-speed multilane license plate recognition (LPR), 350-meter coordinated spatial perimeter mesh networks, and dry-contact actuation relays.
                  </li>
                  <li>
                    <strong>Enterprise Digital Services:</strong> Customer accounts, WebRTC consultation suites, technical dispatches, and programmatic APIs.
                  </li>
                </ul>
                <p>
                  <strong>1.3 Institutional Authority.</strong> If entering into this Agreement on behalf of an architectural firm, healthcare institution, municipal corporation, defense organization, or enterprise client, you affirm and warrant that you hold express legal corporate power to bind said organization to these terms.
                </p>
              </div>
            </article>

            {/* Section 2 */}
            <article id="accounts" className="space-y-4 pt-8 border-t border-black/10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase bg-neutral-100 text-neutral-700 font-medium">
                  Article 02
                </span>
                <span className="text-xs font-mono text-neutral-400">Identity & Credentials</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                2. Accounts, Authentication & Access Security
              </h2>
              <div className="space-y-3 text-sm sm:text-[15px] text-neutral-600 leading-relaxed font-normal">
                <p>
                  <strong>2.1 Corporate Account Governance.</strong> Access to technical pilot hardware benches, high-tier simulation compute nodes, or developer API tokens requires account registration verified by authorized organizational email credentials. Customers are solely responsible for all compute activity, token generation, and hardware provisioning under their credentials.
                </p>
                <p>
                  <strong>2.2 Multi-Factor Authentication (MFA) & Secure Tokens.</strong> Users must safeguard API private keys, WebAuthn credentials, and session tokens. Sharing cryptographic access keys across non-authorized operators is strictly prohibited. You must notify UandWe Labs Security Operations immediately at <code>security@uandwelabs.com</code> upon discovering any compromised credential.
                </p>
                <p>
                  <strong>2.3 Access Revocation.</strong> We reserve the right to suspend or revoke credentials that display automated rate-limit abuse, credential stuffing, unapproved penetration scans, or unauthorized multi-tenant sharing.
                </p>
              </div>
            </article>

            {/* Section 3 */}
            <article id="simulation-licenses" className="space-y-4 pt-8 border-t border-black/10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase bg-neutral-100 text-neutral-700 font-medium">
                  Article 03
                </span>
                <span className="text-xs font-mono text-neutral-400">Simulation Run Run-time</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                3. Ananda Computational Simulation Licenses
              </h2>
              <div className="space-y-3 text-sm sm:text-[15px] text-neutral-600 leading-relaxed font-normal">
                <p>
                  <strong>3.1 Limited License Grant.</strong> Subject to continuous adherence to this Agreement, UandWe Labs grants Client a non-exclusive, non-transferable, revocable, non-sublicensable license to utilize the Ananda computational platform to ingest 3D spatial models, execute GPU-accelerated Lattice Boltzmann airflow models, and render solar ray-casting visualizations strictly for internal architectural optimization, educational study, or client presentations.
                </p>
                <p>
                  <strong>3.2 Solver Integrity & Reverse-Engineering Prohibition.</strong> Clients shall not decompile, disassemble, reverse engineer, or unbundle compiled WebAssembly (WASM) modules, D3Q19 collision matrices, or proprietary mathematical shaders driving Ananda. Any extraction of raw solver binary code or benchmarking intended to build competing CFD cloud platforms constitutes a material breach of contract.
                </p>
                <p>
                  <strong>3.3 Advisory Nature of Computational Physics.</strong> Ananda simulations are high-precision architectural design tools intended to inform spatial layout, passive ventilation pathways, and microclimate comfort. While solver algorithms are calibrated against wind-tunnel benchmarks and physical boundary layer fluid dynamics, <em>Ananda simulation outputs do not replace formal licensed professional engineering (PE) structural stamps, municipal civil engineering approvals, or statutory wind-loading certifications.</em>
                </p>
              </div>
            </article>

            {/* Section 4 */}
            <article id="hardware-pilots" className="space-y-4 pt-8 border-t border-black/10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase bg-neutral-100 text-neutral-700 font-medium">
                  Article 04
                </span>
                <span className="text-xs font-mono text-neutral-400">Physical Hardware & Silicon</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                4. Hardware Pilots, Loaner Benches & Edge Node Deployment
              </h2>
              <div className="space-y-3 text-sm sm:text-[15px] text-neutral-600 leading-relaxed font-normal">
                <p>
                  <strong>4.1 Evaluation Kit Ownership.</strong> Any Dara contactless radar prototype units, Aura 128-TOPS edge evaluation cameras, or loaner hardware kits dispatched to Client for pilot testing remain the exclusive personal property of UandWe Labs unless transferred via an executed commercial bill of sale or purchase order.
                </p>
                <p>
                  <strong>4.2 Firmware License & Silicon Root of Trust.</strong> All firmware, bootloader binaries, neural model quantization weights, and cryptographic microcode flashed onto Aura and Dara nodes are licensed, not sold. Clients agree not to dump hardware SPI flash, bypass secure boot routines, or extract FIPS 140-2 Level 3 cryptographic credentials.
                </p>
                <p>
                  <strong>4.3 Operating Parameters & Hardware Handling.</strong> Client must operate all hardware nodes strictly within rated specifications:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-neutral-700 text-sm">
                  <li>Aura Cameras: Operational ambient temperature range -40°C to +75°C; power delivery through compliant IEEE 802.3at PoE+ injectors.</li>
                  <li>Dara Assistive Devices: Indoor tabletop / wall dock mounting; avoidance of liquid submersion beyond rated ingress protection.</li>
                  <li>No unauthorized teardown, silicon decapping, or housing alterations that invalidate factory ingress seals.</li>
                </ul>
                <p>
                  <strong>4.4 Return of Loaner Units.</strong> Upon conclusion or termination of an evaluation period, Client shall return all evaluation hardware in original functional condition (ordinary operational wear excepted) within 14 business days using Company-provided insured packaging.
                </p>
              </div>
            </article>

            {/* Section 5 */}
            <article id="intellectual-property" className="space-y-4 pt-8 border-t border-black/10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase bg-neutral-100 text-neutral-700 font-medium">
                  Article 05
                </span>
                <span className="text-xs font-mono text-neutral-400">Intellectual Property</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                5. Intellectual Property Rights & Customer Ownership
              </h2>
              <div className="space-y-3 text-sm sm:text-[15px] text-neutral-600 leading-relaxed font-normal">
                <p>
                  <strong>5.1 UandWe Labs IP.</strong> UandWe Labs retains all right, title, and interest, including all worldwide patent rights, copyright, trade secret rights, industrial design patents, trademarks, and technical know-how in and to our platforms, hardware enclosures, optical assemblies, firmware, tensor quantization pipelines, and mathematical solvers.
                </p>
                <p>
                  <strong>5.2 100% Customer Data Ownership.</strong> Customer maintains full, unconditional ownership and intellectual property rights in and to all 3D CAD meshes, architectural BIM drawings, facility perimeter schematics, floor plans, and proprietary project datasets uploaded to our platform. UandWe Labs claims zero ownership over your design geometry.
                </p>
                <p>
                  <strong>5.3 Deliverable Rights.</strong> All rendered reports, aerodynamic vector datasets, daylight autonomy factor graphs, and vehicle traffic analytics generated through paid subscriptions or purchased hardware nodes are the sole property of Customer for commercial publication, building permits, or academic disclosure.
                </p>
              </div>
            </article>

            {/* Section 6 */}
            <article id="data-sovereignty" className="space-y-4 pt-8 border-t border-black/10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase bg-neutral-100 text-neutral-700 font-medium">
                  Article 06
                </span>
                <span className="text-xs font-mono text-neutral-400">Data Sovereignty</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                6. Zero-Egress Silicon Architecture & Data Sovereignty
              </h2>
              <div className="space-y-3 text-sm sm:text-[15px] text-neutral-600 leading-relaxed font-normal">
                <p>
                  <strong>6.1 On-Premise Execution Invariant.</strong> For Aura physical AI nodes and Dara assistive care hardware, we operate under a foundational engineering covenant: <em>raw video pixels and raw micro-radar FMCW reflections are processed deterministically within local hardware SRAM and cache.</em> No unencrypted raw feeds are continuously streamed to third-party public clouds.
                </p>
                <p>
                  <strong>6.2 Air-Gapped Network Support.</strong> Customers deploying Aura in classified defense facilities, municipal corridors, or enterprise perimeters hold the statutory right to sever external WAN uplinks and run nodes in 100% air-gapped configuration without platform lockout or telemetry penalties.
                </p>
                <p>
                  <strong>6.3 Statutory Data Compliance.</strong> All data handling complies with the <em>Digital Personal Data Protection Act (DPDP), 2023 (India)</em>, the <em>General Data Protection Regulation (GDPR)</em>, and standard healthcare optical dignity covenants.
                </p>
              </div>
            </article>

            {/* Section 7 */}
            <article id="acceptable-use" className="space-y-4 pt-8 border-t border-black/10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase bg-neutral-100 text-neutral-700 font-medium">
                  Article 07
                </span>
                <span className="text-xs font-mono text-neutral-400">Ethical AI Standards</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                7. Acceptable Use Policy & Ethical AI Covenants
              </h2>
              <div className="space-y-3 text-sm sm:text-[15px] text-neutral-600 leading-relaxed font-normal">
                <p>
                  <strong>7.1 Strict Weaponization Prohibition.</strong> Customer explicitly agrees not to mount, integrate, or interface UandWe Labs hardware (including Aura cameras or Dara sensor nodes) or mathematical simulation software with lethal autonomous weapon systems, kinetic munitions, weapon guidance assemblies, or offensive military ordnance.
                </p>
                <p>
                  <strong>7.2 Human Dignity Covenants.</strong> In alignment with our corporate mission:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-neutral-700 text-sm">
                  <li>Dara healthcare devices shall be utilized solely for restorative care, fall detection, and geriatric autonomy; under no circumstance may Dara units be repurposed for covert residential surveillance.</li>
                  <li>Aura cameras shall not be configured for unlawful warrantless mass surveillance, biometric suppression of peaceful assembly, or civil rights infringements.</li>
                </ul>
                <p>
                  <strong>7.3 Infrastructure Security.</strong> Clients shall not subject UandWe Labs web APIs or compute infrastructure to distributed denial-of-service (DDoS) attacks, automated fuzzing, or security vulnerability scans without written authorization from the UandWe Labs Incident Response team.
                </p>
              </div>
            </article>

            {/* Section 8 */}
            <article id="warranties" className="space-y-4 pt-8 border-t border-black/10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase bg-neutral-100 text-neutral-700 font-medium">
                  Article 08
                </span>
                <span className="text-xs font-mono text-neutral-400">Warranties & Disclaimers</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                8. Limited Warranties & Engineering Disclaimers
              </h2>
              <div className="space-y-3 text-sm sm:text-[15px] text-neutral-600 leading-relaxed font-normal">
                <p>
                  <strong>8.1 Limited Hardware Warranty.</strong> UandWe Labs warrants that purchased production hardware units (excluding pre-production evaluation units and beta prototypes) will be free from material defects in manufacturing workmanship and materials for a period of twelve (12) months from delivery date under normal intended use.
                </p>
                <p>
                  <strong>8.2 Exclusive Warranty Remedy.</strong> In the event of an authenticated hardware defect within the warranty period, Company will, at its sole discretion, either: (a) repair the unit using certified replacement components, (b) replace the unit with an equivalent functional hardware revision, or (c) issue a prorated credit.
                </p>
                <p>
                  <strong>8.3 "As-Is" Software Disclaimers.</strong> EXCEPT AS EXPRESSLY SET FORTH HEREIN, ALL DIGITAL PLATFORMS, SIMULATION SOLVERS, WEBGPU RENDER ENGINES, AND BETA BENCHMARK UTILITIES ARE PROVIDED STRICTLY ON AN "AS-IS" AND "AS-AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER STATUTORY, EXPRESS, OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A SPECIFIC ARCHITECTURAL PURPOSE, OR UNINTERRUPTED UPTIME.
                </p>
              </div>
            </article>

            {/* Section 9 */}
            <article id="liability" className="space-y-4 pt-8 border-t border-black/10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase bg-neutral-100 text-neutral-700 font-medium">
                  Article 09
                </span>
                <span className="text-xs font-mono text-neutral-400">Risk Allocation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                9. Limitation of Liability & Indemnification
              </h2>
              <div className="space-y-3 text-sm sm:text-[15px] text-neutral-600 leading-relaxed font-normal">
                <p>
                  <strong>9.1 Waiver of Consequential Damages.</strong> TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL UANDWE LABS, ITS DIRECTORS, RESEARCH SCIENTISTS, SYSTEM ENGINEERS, OR AFFILIATES BE LIABLE TO CUSTOMER OR ANY THIRD PARTY FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF REVENUE, LOSS OF COMMERCIAL PROFITS, CONSTRUCTION DELAYS, STRUCTURAL RE-ENGINEERING COSTS, SEVERE METEOROLOGICAL DISASTERS, OR DATA LOSS ARISING OUT OF THE USE OF OR INABILITY TO USE OUR SIMULATION KERNELS OR HARDWARE.
                </p>
                <p>
                  <strong>9.2 Aggregate Financial Cap.</strong> IN ALL CIRCUMSTANCES, UANDWE LABS' MAXIMUM AGGREGATE LIABILITY ARISING UNDER OR RELATED TO THIS AGREEMENT, WHETHER IN CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, OR OTHERWISE, SHALL BE STRICTLY LIMITED TO THE TOTAL AMOUNTS ACTUALLY PAID BY CLIENT TO UANDWE LABS IN THE TWELVE (12) MONTHS PRECEDING THE INCIDENT GIVING RISE TO LIABILITY, OR ₹50,000 INR (APPROX. $600 USD) IN THE CASE OF FREE PILOT EVALUATIONS.
                </p>
                <p>
                  <strong>9.3 Mutual Indemnification.</strong> Customer agrees to defend, indemnify, and hold harmless UandWe Labs against any third-party claims, regulatory enforcement penalties, or legal fees resulting from: (a) unauthorized modification or weaponization of hardware nodes, (b) structural deployment of designs without certified professional civil engineering stamps, or (c) breach of third-party privacy rights.
                </p>
              </div>
            </article>

            {/* Section 10 */}
            <article id="termination" className="space-y-4 pt-8 border-t border-black/10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase bg-neutral-100 text-neutral-700 font-medium">
                  Article 10
                </span>
                <span className="text-xs font-mono text-neutral-400">Lifecycle & Severance</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                10. Term, Suspension & Termination
              </h2>
              <div className="space-y-3 text-sm sm:text-[15px] text-neutral-600 leading-relaxed font-normal">
                <p>
                  <strong>10.1 Agreement Duration.</strong> This Agreement remains in continuous effect until expired under the terms of a specific Master Services Agreement or terminated by either party in accordance with this Section.
                </p>
                <p>
                  <strong>10.2 Termination for Cause.</strong> Either party may terminate this Agreement immediately upon written notice if the other party materially breaches any provision of this Agreement and fails to cure such breach within thirty (30) days of receiving formal notice. UandWe Labs may suspend access or terminate immediately without cure period in cases of weaponization breach, reverse engineering, or willful IP infringement.
                </p>
                <p>
                  <strong>10.3 Effect of Termination.</strong> Upon termination: (a) all active computational software licenses immediately terminate, (b) Client must promptly return all loaner/pilot hardware units, and (c) all provisions regarding intellectual property, confidentiality, limitations of liability, and governing law shall survive.
                </p>
              </div>
            </article>

            {/* Section 11 */}
            <article id="export-governance" className="space-y-4 pt-8 border-t border-black/10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase bg-neutral-100 text-neutral-700 font-medium">
                  Article 11
                </span>
                <span className="text-xs font-mono text-neutral-400">Jurisdiction & Trade</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                11. Export Controls, Sanctions & Dispute Resolution
              </h2>
              <div className="space-y-3 text-sm sm:text-[15px] text-neutral-600 leading-relaxed font-normal">
                <p>
                  <strong>11.1 Export & Dual-Use Trade Compliance.</strong> UandWe Labs technologies, including optical sensor arrays, neural accelerators, and fluid dynamic solvers, are subject to export control regulations under the Directorate General of Foreign Trade (DGFT) of India, SCOMET dual-use lists, and applicable international trade sanctions. Clients shall not export, re-export, or divert hardware or technical data to embargoed destinations without proper statutory clearance.
                </p>
                <p>
                  <strong>11.2 Governing Law.</strong> This Agreement and any disputes or claims arising out of or in connection with its subject matter shall be governed by and construed strictly in accordance with the substantive laws of the <strong>Republic of India</strong>, without regard to conflict of law principles.
                </p>
                <p>
                  <strong>11.3 Binding Arbitration.</strong> Any controversy, dispute, or claim arising out of or relating to this Agreement shall be referred to and finally resolved by binding arbitration under the <em>Arbitration and Conciliation Act, 1996</em>. The seat and venue of arbitration shall be <strong>Bengaluru, Karnataka, India</strong>. The tribunal shall consist of a sole arbitrator appointed mutually by the parties. Proceedings shall be conducted in the English language.
                </p>
                <p>
                  <strong>11.4 Injunctive Relief.</strong> Nothing herein shall prohibit either party from seeking interim injunctive or equitable relief before the competent courts of law in Bengaluru, India to protect its intellectual property or trade secrets.
                </p>
              </div>
            </article>

            {/* Section 12 */}
            <article id="legal-desk" className="space-y-4 pt-8 border-t border-black/10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase bg-neutral-100 text-neutral-700 font-medium">
                  Article 12
                </span>
                <span className="text-xs font-mono text-neutral-400">Official Communication</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                12. Legal Desk, Notices & Institutional Inquiries
              </h2>
              <p className="text-sm sm:text-[15px] text-neutral-600">
                All statutory legal notices, formal summons, patent inquiries, and custom Master Services Agreement requests must be addressed in writing to:
              </p>
              
              <div className="p-6 sm:p-8 rounded-2xl bg-neutral-950 text-white space-y-3 font-mono text-xs sm:text-sm shadow-xl border border-white/10">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-neutral-400 tracking-wider uppercase font-semibold">
                    Office of General Counsel & Regulatory Affairs
                  </span>
                  <span className="text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                    Active Desk
                  </span>
                </div>
                <p className="text-white font-medium text-base">UandWe Labs Private Limited</p>
                <p className="text-neutral-300">Advanced Hardware & Physical AI Campus</p>
                <p className="text-neutral-400">Bengaluru, Karnataka 560001, Republic of India</p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs">
                  <div>
                    <span className="text-neutral-400 block text-[10px]">LEGAL COUNSEL DESK:</span>
                    <a href="mailto:legal@uandwelabs.com" className="text-white underline underline-offset-4 hover:text-neutral-200">
                      legal@uandwelabs.com
                    </a>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px]">SECURITY & INCIDENT DESK:</span>
                    <a href="mailto:security@uandwelabs.com" className="text-white underline underline-offset-4 hover:text-neutral-200">
                      security@uandwelabs.com
                    </a>
                  </div>
                </div>
              </div>
            </article>

          </main>
        </div>
      </div>
    </div>
  )
}
