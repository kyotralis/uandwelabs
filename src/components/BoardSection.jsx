import { useMemo } from 'react'
import ProductShowcaseSection from './ProductShowcaseSection'
import { useTranslation } from '../i18n'
import { useCmsContent } from '../services/contentStore'
import AdminEditButton from './AdminEditButton'

// Aura Physical AI Slides
export const BOARD_SLIDES = [
  {
    src: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795433117/uandwelabs/cms/aura_2_1795433115192.jpg',
    alt: 'AURA LPR - AI-powered license plate recognition and vehicle identification',
    title: 'AURA LPR',
    subtitle: 'AI-powered license plate recognition and vehicle identification',
    meta: [
      { label: 'Recognition', value: 'Plate & Vehicle ID' },
      { label: 'Speed Capture', value: 'High-Speed Multilane' },
      { label: 'Edge Latency', value: '< 1.2 ms' },
    ],
  },
  {
    src: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795433119/uandwelabs/cms/aura_1_1795433117743.jpg',
    alt: 'AURA VISION - Intelligent cameras with real-time AI detection',
    title: 'AURA VISION',
    subtitle: 'Intelligent cameras with real-time AI detection',
    meta: [
      { label: 'Neural Power', value: '128 TOPS NPU' },
      { label: 'Optical Sensor', value: '4K Multi-Spectral' },
      { label: 'Detection', value: 'Real-Time Edge AI' },
    ],
  },
  {
    src: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795433121/uandwelabs/cms/aura_sentinel_ladybug_1795433118929.jpg',
    alt: 'AURA SENTINEL - Multi-camera security and suspicious vehicle monitoring',
    title: 'AURA SENTINEL',
    subtitle: 'Multi-camera security and suspicious vehicle monitoring',
    meta: [
      { label: 'Monitoring', value: 'Multi-Camera Mesh' },
      { label: 'Suspicious Tracking', value: 'Vehicle & Threat Alerts' },
      { label: 'Perimeter Range', value: '350m Zero-Drift' },
    ],
  },
]

export default function BoardSection({ onNavigateToAura }) {
  const { t } = useTranslation()
  const b = t.board || {}
  const [cmsAura] = useCmsContent('aura')

  const activeSlides = cmsAura?.boardSlides && cmsAura.boardSlides.length > 0
    ? cmsAura.boardSlides
    : BOARD_SLIDES

  const localizedSlides = useMemo(() => {
    return activeSlides.map((slide, idx) => ({
      ...slide,
      title: slide.title || b.slides?.[idx]?.title,
      subtitle: slide.subtitle || b.slides?.[idx]?.subtitle,
      meta: slide.meta || b.slides?.[idx]?.meta,
    }))
  }, [activeSlides, b])

  return (
    <div className="relative">
      <ProductShowcaseSection
        id="board"
        title={cmsAura?.board?.title || b.title || 'Aura'}
        subtitle={cmsAura?.board?.subtitle || b.subtitle || 'Physical AI'}
        description={cmsAura?.board?.description || b.description || 'Smart cameras and vehicle analytics powered by edge AI—delivering real-time visibility, threat detection, and proactive security.'}
        buttonText={cmsAura?.board?.buttonText || b.buttonText || 'EXPLORE AURA'}
        onButtonClick={() => {
          if (onNavigateToAura) {
            onNavigateToAura()
          } else {
            window.history.pushState(null, '', '/aura')
            window.dispatchEvent(new Event('popstate'))
          }
        }}
        nextSectionId="beliefs"
        slides={localizedSlides}
        leftControls={
          <AdminEditButton section="aura" field="board" label="Aura Overview" buttonText="Edit Overview" inline />
        }
        extraControls={
          <AdminEditButton section="aura" field="boardSlides" label="Aura Board" buttonText="Edit Slides" inline />
        }
      />
    </div>
  )
}

