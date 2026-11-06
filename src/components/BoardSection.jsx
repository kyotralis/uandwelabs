import { useMemo } from 'react'
import ProductShowcaseSection from './ProductShowcaseSection'
import { useTranslation } from '../i18n'

// Aura Physical AI Slides
export const BOARD_SLIDES = [
  {
    src: '/aura_lpr.jpg',
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
    src: '/aura_camera_1.jpg',
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
    src: '/aura_camera_2.jpg',
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

  const localizedSlides = useMemo(() => {
    return BOARD_SLIDES.map((slide, idx) => ({
      ...slide,
      title: b.slides?.[idx]?.title || slide.title,
      subtitle: b.slides?.[idx]?.subtitle || slide.subtitle,
      meta: b.slides?.[idx]?.meta || slide.meta,
    }))
  }, [b])

  return (
    <ProductShowcaseSection
      id="board"
      title={b.title || 'Aura'}
      subtitle={b.subtitle || 'Physical AI'}
      description={b.description || 'Smart cameras and vehicle analytics powered by edge AI—delivering real-time visibility, threat detection, and proactive security.'}
      buttonText={b.buttonText || 'EXPLORE AURA'}
      onButtonClick={() => {
        if (onNavigateToAura) {
          onNavigateToAura()
        } else {
          window.location.hash = 'aura'
        }
      }}
      nextSectionId="beliefs"
      slides={localizedSlides}
    />
  )
}

