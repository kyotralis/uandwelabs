import { useEffect, useState } from 'react'
import { ArrowLeft, Mail } from 'lucide-react'
import { useTranslation } from '../i18n'
import { useCmsContent } from '../services/contentStore'
import AdminEditButton from '../components/AdminEditButton'

export default function TermsPage({
  user,
  onLogout,
  onNavigateToHome,
  onNavigateBack,
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
  const [cmsTerms] = useCmsContent('termsOfService')

  useEffect(() => {
    let savedY = null
    try {
      savedY = sessionStorage.getItem('terms_scroll_y')
    } catch {}

    if (savedY && Number(savedY) > 50) {
      setTimeout(() => {
        window.scrollTo({ top: Number(savedY), behavior: 'instant' })
      }, 50)
      setTimeout(() => {
        window.scrollTo({ top: Number(savedY), behavior: 'instant' })
      }, 200)
    } else {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true })
      }
      window.scrollTo({ top: 0, behavior: 'instant' })
    }

    const handleScroll = () => {
      try {
        sessionStorage.setItem('terms_scroll_y', String(window.scrollY))
      } catch {}
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleBack = () => {
    if (onNavigateBack) {
      onNavigateBack()
    } else if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back()
    } else if (onNavigateToHome) {
      onNavigateToHome()
    }
  }

  // Fallback articles in case CMS is loading or unpopulated
  const fallbackArticles = [
    {
      id: 'preamble',
      badge: 'Article 01',
      tag: 'Preamble & Scope',
      label: '1. Preamble & Master Agreement',
      title: '1. Preamble & Binding Master Agreement',
      content:
        '1.1 Legal Entity & Applicability. This Agreement is executed between UandWe Labs Private Limited (hereinafter referred to as "UandWe Labs", "Company", "we", "us", or "our"), an engineering technology corporation organized under the laws of the Republic of India with headquarters in Bengaluru, Karnataka, and the commercial entity, government agency, educational institution, or individual purchasing, accessing, or evaluating our platforms ("Customer", "Client", or "you").\n\n1.2 Covered Platforms & Hardware. These Terms govern all engagements across UandWe Labs engineering divisions, including ANANDA Platform, DARA Platform, AURA Platform, and Enterprise Digital Services.\n\n1.3 Institutional Authority. If entering into this Agreement on behalf of an architectural firm, healthcare institution, municipal corporation, defense organization, or enterprise client, you affirm and warrant that you hold express legal corporate power to bind said organization to these terms.',
      bulletPoints:
        'ANANDA Platform: High-performance computational fluid dynamics (CFD), Lattice Boltzmann aerodynamic kernels, diurnal solar ray-casting, 2D Saint-Venant shallow water hydrology solvers, and WebGL/WebGPU browser compute runtimes.\nDARA Platform: Contactless 60 GHz frequency-modulated continuous wave (FMCW) radar assistive hardware, multi-language acoustic guidance engines, optical dignity motion monitoring, and related evaluation kits.\nAURA Platform: Autonomous 128-TOPS edge physical AI machine vision sensor nodes, hardware INT8 quantized neural tensor inferencing cores, high-speed multilane license plate recognition (LPR), 350-meter coordinated spatial perimeter mesh networks, and dry-contact actuation relays.\nEnterprise Digital Services: Customer accounts, WebRTC consultation suites, technical dispatches, and programmatic APIs.',
    },
    {
      id: 'accounts',
      badge: 'Article 02',
      tag: 'Identity & Credentials',
      label: '2. Accounts, Authentication & Access',
      title: '2. Accounts, Authentication & Access Security',
      content:
        '2.1 Corporate Account Governance. Access to technical pilot hardware benches, high-tier simulation compute nodes, or developer API tokens requires account registration verified by authorized organizational email credentials. Customers are solely responsible for all compute activity, token generation, and hardware provisioning under their credentials.\n\n2.2 Multi-Factor Authentication (MFA) & Secure Tokens. Users must safeguard API private keys, WebAuthn credentials, and session tokens. Sharing cryptographic access keys across non-authorized operators is strictly prohibited. You must notify UandWe Labs Security Operations immediately upon discovering any compromised credential.\n\n2.3 Access Revocation. We reserve the right to suspend or revoke credentials that display automated rate-limit abuse, credential stuffing, unapproved penetration scans, or unauthorized multi-tenant sharing.',
    },
    {
      id: 'intellectual-property',
      badge: 'Article 03',
      tag: 'Intellectual Property',
      label: '3. IP Rights & Customer Ownership',
      title: '3. Intellectual Property Rights & Customer Ownership',
      content:
        '3.1 UandWe Labs IP. UandWe Labs retains all right, title, and interest, including all worldwide patent rights, copyright, trade secret rights, industrial design patents, trademarks, and technical know-how in and to our platforms, hardware enclosures, optical assemblies, firmware, tensor quantization pipelines, and mathematical solvers.\n\n3.2 100% Customer Data Ownership. Customer maintains full, unconditional ownership and intellectual property rights in and to all 3D CAD meshes, architectural BIM drawings, facility perimeter schematics, floor plans, and proprietary project datasets uploaded to our platform. UandWe Labs claims zero ownership over your design geometry.\n\n3.3 Deliverable Rights. All rendered reports, aerodynamic vector datasets, daylight autonomy factor graphs, and vehicle traffic analytics generated through paid subscriptions or purchased hardware nodes are the sole property of Customer for commercial publication, building permits, or academic disclosure.',
    },
    {
      id: 'acceptable-use',
      badge: 'Article 04',
      tag: 'Ethical AI Standards',
      label: '4. Acceptable Use & Ethical AI',
      title: '4. Acceptable Use Policy & Ethical AI Covenants',
      content:
        '4.1 Strict Weaponization Prohibition. Customer explicitly agrees not to mount, integrate, or interface UandWe Labs hardware (including Aura cameras or Dara sensor nodes) or mathematical simulation software with lethal autonomous weapon systems, kinetic munitions, weapon guidance assemblies, or offensive military ordnance.\n\n4.2 Human Dignity Covenants. In alignment with our corporate mission, Dara healthcare devices shall be utilized solely for restorative care, fall detection, and geriatric autonomy; under no circumstance may Dara units be repurposed for covert residential surveillance. Aura cameras shall not be configured for unlawful warrantless mass surveillance, biometric suppression of peaceful assembly, or civil rights infringements.\n\n4.3 Infrastructure Security. Clients shall not subject UandWe Labs web APIs or compute infrastructure to distributed denial-of-service (DDoS) attacks, automated fuzzing, or security vulnerability scans without written authorization from the UandWe Labs Incident Response team.',
      bulletPoints:
        'Dara healthcare devices shall be utilized solely for restorative care, fall detection, and geriatric autonomy; under no circumstance may Dara units be repurposed for covert residential surveillance.\nAura cameras shall not be configured for unlawful warrantless mass surveillance, biometric suppression of peaceful assembly, or civil rights infringements.\nClients shall not subject UandWe Labs web APIs or compute infrastructure to distributed denial-of-service (DDoS) attacks, automated fuzzing, or security vulnerability scans without written authorization.',
    },
    {
      id: 'warranties',
      badge: 'Article 05',
      tag: 'Warranties & Disclaimers',
      label: '5. Limited Warranties & Disclaimers',
      title: '5. Limited Warranties & Engineering Disclaimers',
      content:
        '5.1 Limited Hardware Warranty. UandWe Labs warrants that purchased production hardware units (excluding pre-production evaluation units and beta prototypes) will be free from material defects in manufacturing workmanship and materials for a period of twelve (12) months from delivery date under normal intended use.\n\n5.2 Exclusive Warranty Remedy. In the event of an authenticated hardware defect within the warranty period, Company will, at its sole discretion, either: (a) repair the unit using certified replacement components, (b) replace the unit with an equivalent functional hardware revision, or (c) issue a prorated credit.\n\n5.3 "As-Is" Software Disclaimers. EXCEPT AS EXPRESSLY SET FORTH HEREIN, ALL DIGITAL PLATFORMS, SIMULATION SOLVERS, WEBGPU RENDER ENGINES, AND BETA BENCHMARK UTILITIES ARE PROVIDED STRICTLY ON AN "AS-IS" AND "AS-AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER STATUTORY, EXPRESS, OR IMPLIED.',
    },
    {
      id: 'liability',
      badge: 'Article 06',
      tag: 'Risk Allocation',
      label: '6. Limitation of Liability & Indemnity',
      title: '6. Limitation of Liability & Indemnification',
      content:
        '6.1 Waiver of Consequential Damages. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL UANDWE LABS, ITS DIRECTORS, RESEARCH SCIENTISTS, SYSTEM ENGINEERS, OR AFFILIATES BE LIABLE TO CUSTOMER OR ANY THIRD PARTY FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF REVENUE, LOSS OF COMMERCIAL PROFITS, CONSTRUCTION DELAYS, STRUCTURAL RE-ENGINEERING COSTS, SEVERE METEOROLOGICAL DISASTERS, OR DATA LOSS.\n\n6.2 Aggregate Financial Cap. IN ALL CIRCUMSTANCES, UANDWE LABS\' MAXIMUM AGGREGATE LIABILITY ARISING UNDER OR RELATED TO THIS AGREEMENT, WHETHER IN CONTRACT, TORT, OR OTHERWISE, SHALL BE STRICTLY LIMITED TO THE TOTAL AMOUNTS ACTUALLY PAID BY CLIENT TO UANDWE LABS IN THE TWELVE (12) MONTHS PRECEDING THE INCIDENT, OR ₹50,000 INR IN THE CASE OF FREE PILOT EVALUATIONS.\n\n6.3 Mutual Indemnification. Customer agrees to defend, indemnify, and hold harmless UandWe Labs against any third-party claims, regulatory enforcement penalties, or legal fees resulting from: (a) unauthorized modification or weaponization of hardware nodes, (b) structural deployment of designs without certified professional civil engineering stamps, or (c) breach of third-party privacy rights.',
    },
    {
      id: 'termination',
      badge: 'Article 07',
      tag: 'Lifecycle & Severance',
      label: '7. Term, Suspension & Termination',
      title: '7. Term, Suspension & Termination',
      content:
        '7.1 Agreement Duration. This Agreement remains in continuous effect until expired under the terms of a specific Master Services Agreement or terminated by either party in accordance with this Section.\n\n7.2 Termination for Cause. Either party may terminate this Agreement immediately upon written notice if the other party materially breaches any provision of this Agreement and fails to cure such breach within thirty (30) days of receiving formal notice. UandWe Labs may suspend access or terminate immediately without cure period in cases of weaponization breach, reverse engineering, or willful IP infringement.\n\n7.3 Effect of Termination. Upon termination: (a) all active computational software licenses immediately terminate, (b) Client must promptly return all loaner/pilot hardware units, and (c) all provisions regarding intellectual property, confidentiality, limitations of liability, and governing law shall survive.',
    },
    {
      id: 'export-governance',
      badge: 'Article 08',
      tag: 'Jurisdiction & Trade',
      label: '8. Export Controls & Governing Law',
      title: '8. Export Controls, Sanctions & Dispute Resolution',
      content:
        '8.1 Export & Dual-Use Trade Compliance. UandWe Labs technologies, including optical sensor arrays, neural accelerators, and fluid dynamic solvers, are subject to export control regulations under the Directorate General of Foreign Trade (DGFT) of India, SCOMET dual-use lists, and applicable international trade sanctions. Clients shall not export, re-export, or divert hardware or technical data to embargoed destinations without proper statutory clearance.\n\n8.2 Governing Law. This Agreement and any disputes or claims arising out of or in connection with its subject matter shall be governed by and construed strictly in accordance with the substantive laws of the Republic of India, without regard to conflict of law principles.\n\n8.3 Binding Arbitration. Any controversy, dispute, or claim arising out of or relating to this Agreement shall be referred to and finally resolved by binding arbitration under the Arbitration and Conciliation Act, 1996. The seat and venue of arbitration shall be Bengaluru, Karnataka, India. The tribunal shall consist of a sole arbitrator appointed mutually by the parties. Proceedings shall be conducted in the English language.\n\n8.4 Injunctive Relief. Nothing herein shall prohibit either party from seeking interim injunctive or equitable relief before the competent courts of law in Bengaluru, India to protect its intellectual property or trade secrets.',
    },
    {
      id: 'legal-desk',
      badge: 'Article 09',
      tag: 'Official Communication',
      label: '9. Legal Desk & Inquiries',
      title: '9. Legal Desk, Notices & Institutional Inquiries',
      content:
        'All statutory legal notices, formal summons, patent inquiries, and custom Master Services Agreement requests must be addressed in writing to:\nOffice of General Counsel & Regulatory Affairs\nUandWe Labs Private Limited\nAdvanced Hardware & Physical AI Campus\nBengaluru, Karnataka 560001, Republic of India',
      contactEmail: 'legal@uandwelabs.com',
    },
  ]

  const hero = cmsTerms?.hero || {}
  const titleLine1 = hero.titleLine1 || 'Terms of'
  const titleLine2 = hero.titleLine2 || 'Service & Enterprise Agreement.'
  const heroIntro =
    hero.intro ||
    'These Terms of Service govern enterprise access, mathematical simulation engine licensing, hardware evaluation kits, edge physical AI nodes, and clinical research deployments provided by UandWe Labs Private Limited.'

  const articles =
    cmsTerms?.articles && Array.isArray(cmsTerms.articles) && cmsTerms.articles.length > 0
      ? cmsTerms.articles
      : fallbackArticles

  const contactData = cmsTerms?.legalDesk || cmsTerms?.contact || {}
  const contactEmail = contactData.contactEmail || cmsTerms?.contactEmail || 'legal@uandwelabs.com'
  const contactSecurityEmail = contactData.securityEmail || 'security@uandwelabs.com'
  const contactLabel = contactData.label || 'Compliance Desk'
  const deskDesc = contactData.deskDescription || 'Questions regarding master enterprise agreements (MSA) or custom hardware SLAs:'

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
        <AdminEditButton
          section="termsOfService"
          field="hero"
          label="Terms Hero Header"
          position="hero"
        />

        <div className="max-w-[1280px] mx-auto">
          {/* Circular Arrow-Only Back Button */}
          <div className="mb-6 sm:mb-8">
            <button
              type="button"
              onClick={handleBack}
              aria-label="Back to Previous Page"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 group cursor-pointer shadow-lg hover:scale-105 active:scale-95 hover:border-white/40"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight uppercase leading-[1.08] mb-6">
            {titleLine1} <br />
            <span className="text-neutral-400">{titleLine2}</span>
          </h1>

          <p className="text-neutral-300 text-base sm:text-lg max-w-3xl leading-relaxed font-normal">
            {heroIntro}
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
                {articles.map((sec, idx) => {
                  const secId = sec.id || `article-${idx + 1}`
                  const secLabel = sec.label || sec.title || `Article ${idx + 1}`
                  return (
                    <li key={secId}>
                      <button
                        type="button"
                        onClick={() => scrollToClause(secId)}
                        className={`w-full text-left py-2 px-3 rounded-lg transition-all cursor-pointer ${
                          activeSection === secId
                            ? 'bg-black text-white font-medium shadow-sm'
                            : 'text-neutral-600 hover:text-black hover:bg-neutral-200/60'
                        }`}
                      >
                        {secLabel}
                      </button>
                    </li>
                  )
                })}
              </ul>

              <div className="mt-8 pt-6 border-t border-black/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-neutral-400 block uppercase tracking-wider">
                    {contactLabel}
                  </span>
                  <AdminEditButton
                    section="termsOfService"
                    field="contact"
                    label="Compliance Desk Email"
                    inline={true}
                    buttonText="Edit"
                    className="text-[10px] py-0.5 px-2 font-mono"
                  />
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {deskDesc}
                </p>
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex items-center gap-2 text-xs font-mono text-neutral-900 hover:text-black font-medium underline underline-offset-4"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{contactEmail}</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Main Legal Articles */}
          <main className="lg:col-span-8 space-y-14 sm:space-y-18 text-neutral-800 leading-relaxed relative">
            <div className="flex justify-end">
              <AdminEditButton
                section="termsOfService"
                field="articles"
                label="Terms Articles & Clauses"
                inline={true}
                buttonText="Edit Articles & Clauses"
              />
            </div>

            {articles.map((art, idx) => {
              const artId = art.id || `article-${idx + 1}`
              const bullets = Array.isArray(art.bulletPoints)
                ? art.bulletPoints
                : (typeof art.bulletPoints === 'string' && art.bulletPoints.trim().length > 0
                  ? art.bulletPoints.split('\n').map((s) => s.trim()).filter(Boolean)
                  : [])

              const paragraphs = typeof art.content === 'string'
                ? art.content.split('\n\n').filter(Boolean)
                : [art.content].filter(Boolean)

              return (
                <article
                  key={artId}
                  id={artId}
                  className={`space-y-4 ${idx > 0 ? 'pt-8 border-t border-black/10' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase bg-neutral-100 text-neutral-700 font-medium">
                      {art.badge || `Article ${String(idx + 1).padStart(2, '0')}`}
                    </span>
                    {art.tag && (
                      <span className="text-xs font-mono text-neutral-400">{art.tag}</span>
                    )}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                    {art.title}
                  </h2>

                  <div className="space-y-3 text-sm sm:text-[15px] text-neutral-600 leading-relaxed font-normal">
                    {paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}

                    {bullets.length > 0 && (
                      <ul className="list-disc pl-6 space-y-2 text-neutral-700 pt-2">
                        {bullets.map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              )
            })}
          </main>
        </div>
      </div>
    </div>
  )
}
