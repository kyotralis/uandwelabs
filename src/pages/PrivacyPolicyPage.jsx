import { useEffect, useState } from 'react'
import { ArrowLeft, CheckCircle2, Mail } from 'lucide-react'
import { useTranslation } from '../i18n'
import { useCmsContent } from '../services/contentStore'
import AdminEditButton from '../components/AdminEditButton'

export default function PrivacyPolicyPage({

  onNavigateToHome,
  onNavigateBack,

}) {
  const { t } = useTranslation()
  const [activeSection, setActiveSection] = useState('principles')
  const [cmsPrivacy] = useCmsContent('privacyPolicy')

  useEffect(() => {
    let savedY = null
    try {
      savedY = sessionStorage.getItem('privacy_scroll_y')
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
        sessionStorage.setItem('privacy_scroll_y', String(window.scrollY))
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

  // Fallback sections in case CMS is still initializing
  const fallbackSections = [
    {
      id: 'principles',
      num: 'Section 01',
      label: '1. Privacy by Architecture',
      title: '1. Privacy by Architecture',
      content:
        'UandWe Labs builds hardware and computational platforms under a foundational principle: data that never leaves the local premise cannot be leaked, harvested, or weaponized. Unlike conventional consumer tech ecosystems that monetize behavioral tracking, our business model relies exclusively on enterprise licenses, research bench grants, and physical device deployments.',
      bulletPoints:
        'Zero biometric harvesting or advertising re-targeting.\nClient-side WebGL simulation execution for CAD and environmental physics meshes.\nComplete air-gapped support for sovereign transit and defense installations.',
    },
    {
      id: 'collection',
      num: 'Section 02',
      label: '2. Information We Collect',
      title: '2. Information We Collect',
      content:
        'We only collect minimal technical and contact information that you explicitly provide when engaging with our platform:',
      bulletPoints:
        'Consultation & Scheduling Dossiers: Name, professional email, architectural studio or institution name, and optional target project coordinates for microclimate reviews.\nFellowship & Bench Applications: Contact details, CV/portfolio links, and self-disclosed technical problem write-ups submitted via our careers modal.\nTechnical Journal Dispatches: Email address for recipients subscribing to unreleased whitepapers, with one-click unsubscribe in every transmission.',
    },
    {
      id: 'rights',
      num: 'Section 03',
      label: '3. User Rights & Data Sovereignty',
      title: '3. User Rights & Data Sovereignty',
      content:
        'Regardless of your geographic location, you retain full sovereignty over your information:',
      bulletPoints:
        'Right to Complete Erasure: You may request the immediate deletion of your consultation bookings and account credentials at any time.\nRight to Data Portability: Download any technical simulation outputs, ephemeris logs, or consultation dossiers in open JSON/CSV formats.',
    },
    {
      id: 'compliance',
      num: 'Section 04',
      label: '4. Regulatory Compliance (DPDP & GDPR)',
      title: '4. Regulatory Compliance (DPDP & GDPR)',
      content:
        'UandWe Labs complies with the Indian Digital Personal Data Protection (DPDP) Act 2023, the European Union General Data Protection Regulation (GDPR), and the California Consumer Privacy Act (CCPA). All data in transit is encrypted using TLS 1.3, and resting databases are encrypted using AES-256 GCM.',
    },
    {
      id: 'contact',
      num: 'Section 05',
      label: '5. Data Protection Officer',
      title: '5. Data Protection Officer & Inquiries',
      content:
        'For formal privacy inquiries, cryptographic audits, or data deletion requests, contact our engineering desk:',
      contactEmail: 'privacy@uandwelabs.com',
    },
  ]

  const hero = cmsPrivacy?.hero || {}
  const titleLine1 = hero.titleLine1 || 'Privacy Policy &'
  const titleLine2 = hero.titleLine2 || 'Data Sovereignty.'
  const heroIntro =
    hero.intro ||
    'At UandWe Labs, privacy is an engineering invariant, not a legal afterthought. We design edge physical AI, contactless senior care radar, and microclimate solvers that operate with uncompromising personal dignity and zero unnecessary cloud data egress.'

  const sections =
    cmsPrivacy?.sections && Array.isArray(cmsPrivacy.sections) && cmsPrivacy.sections.length > 0
      ? cmsPrivacy.sections
      : fallbackSections

  const contactData = cmsPrivacy?.contact || {}
  const contactEmail = contactData.contactEmail || cmsPrivacy?.contactEmail || 'privacy@uandwelabs.com'
  const contactLabel = contactData.label || 'Direct Inquiry'

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
          section="privacyPolicy"
          field="hero"
          label="Privacy Hero Header"
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

          <p className="text-neutral-300 text-base sm:text-lg max-w-2xl leading-relaxed font-normal">
            {heroIntro}
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
                {sections.map((sec, idx) => {
                  const secId = sec.id || `section-${idx + 1}`
                  const secLabel = sec.label || sec.title || `Section ${idx + 1}`
                  return (
                    <li key={secId}>
                      <button
                        type="button"
                        onClick={() => scrollToClause(secId)}
                        className={`w-full text-left py-2 px-3 rounded-lg transition-colors cursor-pointer text-xs font-mono ${
                          activeSection === secId
                            ? 'bg-black text-white font-medium'
                            : 'text-neutral-600 hover:text-black hover:bg-neutral-200/60'
                        }`}
                      >
                        {secLabel}
                      </button>
                    </li>
                  )
                })}
              </ul>

              <div className="mt-8 pt-6 border-t border-black/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-neutral-400 block">
                    {contactLabel}
                  </span>
                  <AdminEditButton
                    section="privacyPolicy"
                    field="contact"
                    label="Direct Inquiry Email"
                    inline={true}
                    buttonText="Edit"
                    className="text-[10px] py-0.5 px-2 font-mono"
                  />
                </div>
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

          {/* Main Content Articles */}
          <main className="lg:col-span-8 space-y-12 sm:space-y-16 text-neutral-800 leading-relaxed relative">
            <div className="flex justify-end">
              <AdminEditButton
                section="privacyPolicy"
                field="sections"
                label="Policy Clauses & Sections"
                inline={true}
                buttonText="Edit Policy Clauses"
              />
            </div>

            {sections.map((sec, idx) => {
              const secId = sec.id || `section-${idx + 1}`
              const bullets = Array.isArray(sec.bulletPoints)
                ? sec.bulletPoints
                : (typeof sec.bulletPoints === 'string' && sec.bulletPoints.trim().length > 0
                  ? sec.bulletPoints.split('\n').map((s) => s.trim()).filter(Boolean)
                  : [])

              const paragraphs = typeof sec.content === 'string'
                ? sec.content.split('\n\n').filter(Boolean)
                : [sec.content].filter(Boolean)

              return (
                <article
                  key={secId}
                  id={secId}
                  className={`space-y-4 ${idx > 0 ? 'pt-6 border-t border-black/10' : ''}`}
                >
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    {sec.num || `Section ${String(idx + 1).padStart(2, '0')}`}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                    {sec.title}
                  </h2>

                  {paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-sm sm:text-base text-neutral-600">
                      {p}
                    </p>
                  ))}

                  {bullets.length > 0 && (
                    <div className="p-5 rounded-xl bg-neutral-50 border border-black/10 text-xs sm:text-sm text-neutral-700 space-y-2.5">
                      {bullets.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {(sec.id === 'contact' || sec.contactEmail) && (
                    <div className="p-6 rounded-2xl bg-neutral-950 text-white space-y-2 text-sm font-mono mt-4">
                      <p className="text-neutral-400">OFFICE OF DATA PROTECTION & SOVEREIGNTY</p>
                      <p className="text-white font-medium">UandWe Labs Engineering Campus</p>
                      <p className="text-neutral-300">Bengaluru, Karnataka 560001, India</p>
                      <p className="pt-2">
                        Email:{' '}
                        <a
                          href={`mailto:${sec.contactEmail || contactEmail}`}
                          className="text-white underline underline-offset-4"
                        >
                          {sec.contactEmail || contactEmail}
                        </a>
                      </p>
                    </div>
                  )}
                </article>
              )
            })}
          </main>
        </div>
      </div>
    </div>
  )
}
