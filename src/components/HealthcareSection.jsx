import { useMemo } from 'react'
import ProductShowcaseSection from './ProductShowcaseSection'
import { useTranslation } from '../i18n'

// Healthcare 3 Assistive Elderly Care & Safety Slides
export const HEALTHCARE_SLIDES = [
  {
    src: '/dara_assistive_device.jpg',
    alt: 'Dara Assistive Device with Magnifying Glass and Multi-Language Voice Clock',
    title: 'Talking Clock & Magnifier',
    subtitle: 'Multi-Language Voice & Label Reading',
    meta: [
      { label: 'Time Announce', value: 'Multi-Language Voice' },
      { label: 'Magnifier', value: 'Medicine Label Reader' },
      { label: 'Audio Speaker', value: 'Tactile Push-to-Talk' },
    ],
  },
  {
    src: '/dara_emergency_fall.jpg',
    alt: 'Dara Automatic Fall Detection and Emergency SOS Alert',
    title: 'Fall Detection & SOS',
    subtitle: 'Automatic Impact Sensing & Rapid Alert',
    meta: [
      { label: 'Fall Detection', value: 'Automatic Sensor' },
      { label: 'Emergency Alert', value: 'Instant SOS Broadcast' },
      { label: 'Safety Link', value: 'Caregiver Notification' },
    ],
  },
  {
    src: '/dara_torch_risetowake.jpg',
    alt: 'Dara Built-in Torch Light and Rise-to-Wake Display in Dark Environment',
    title: 'Torch Light & Rise-to-Wake',
    subtitle: 'Night Guidance & Lift-Activated Clock',
    meta: [
      { label: 'Night Torch', value: 'Built-in Illumination' },
      { label: 'Rise-to-Wake', value: 'Motion-Activated Screen' },
      { label: 'Readability', value: 'High-Contrast OLED' },
    ],
  },
]

export default function HealthcareSection({ onNavigateToDara }) {
  const { t } = useTranslation()
  const h = t.healthcare || {}

  const localizedSlides = useMemo(() => {
    return HEALTHCARE_SLIDES.map((slide, idx) => ({
      ...slide,
      title: h.slides?.[idx]?.title || slide.title,
      subtitle: h.slides?.[idx]?.subtitle || slide.subtitle,
      meta: h.slides?.[idx]?.meta || slide.meta,
    }))
  }, [h])

  return (
    <ProductShowcaseSection
      id="healthcare"
      title={h.title || 'Dara'}
      subtitle={h.subtitle || 'Healthcare'}
      description={h.description || 'Smart assistive device for seniors—featuring a talking clock, reading magnifier, night torch, rise-to-wake display, and automatic fall emergency alerts.'}
      buttonText={h.buttonText || 'EXPLORE DARA'}
      onButtonClick={() => {
        if (onNavigateToDara) {
          onNavigateToDara()
        } else {
          window.location.hash = 'dara'
        }
      }}
      nextSectionId="board"
      slides={localizedSlides}
    />
  )
}

