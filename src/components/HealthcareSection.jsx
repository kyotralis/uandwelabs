import { useMemo } from 'react'
import ProductShowcaseSection from './ProductShowcaseSection'
import { useTranslation } from '../i18n'
import { useCmsContent } from '../services/contentStore'
import AdminEditButton from './AdminEditButton'

// Healthcare 3 Assistive Elderly Care & Safety Slides
export const HEALTHCARE_SLIDES = [
  {
    src: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795424401/uandwelabs/cms/Hands_Cradling_a_Dynamic_Heart_1795424399358.jpg',
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
    src: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795424401/uandwelabs/cms/Hands_Cradling_a_Dynamic_Heart_1795424399358.jpg',
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
    src: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795424401/uandwelabs/cms/Hands_Cradling_a_Dynamic_Heart_1795424399358.jpg',
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
  const [cmsHome, , isLoaded] = useCmsContent('home')
  const { t } = useTranslation()
  const h = t.healthcare || {}

  const localizedSlides = useMemo(() => {
    // Wait for direct database response before rendering slides so no stale or old mock image flashes
    if (!isLoaded) {
      return []
    }

    const base = (cmsHome?.healthcareSlides && Array.isArray(cmsHome.healthcareSlides) && cmsHome.healthcareSlides.length > 0)
      ? cmsHome.healthcareSlides
      : HEALTHCARE_SLIDES

    return base.map((slide, idx) => ({
      ...slide,
      title: slide.title || h.slides?.[idx]?.title,
      subtitle: slide.subtitle || h.slides?.[idx]?.subtitle,
      meta: slide.meta || h.slides?.[idx]?.meta,
    }))
  }, [cmsHome?.healthcareSlides, h, isLoaded])

  return (
    <div className="relative">
      <ProductShowcaseSection
        id="healthcare"
        title={cmsHome?.healthcare?.title || h.title || 'Dara'}
        subtitle={cmsHome?.healthcare?.subtitle || h.subtitle || 'Healthcare'}
        description={cmsHome?.healthcare?.description || h.description || 'Smart assistive device for seniors—featuring a talking clock, reading magnifier, night torch, rise-to-wake display, and automatic fall emergency alerts.'}
        buttonText={cmsHome?.healthcare?.buttonText || h.buttonText || 'EXPLORE DARA'}
        onButtonClick={() => {
          if (onNavigateToDara) {
            onNavigateToDara()
          } else {
            window.history.pushState(null, '', '/dara')
            window.dispatchEvent(new Event('popstate'))
          }
        }}
        nextSectionId="board"
        slides={localizedSlides}
        leftControls={
          <AdminEditButton section="home" field="healthcare" label="Dara Overview" buttonText="Edit Overview" inline />
        }
        extraControls={
          <AdminEditButton section="home" field="healthcareSlides" label="Healthcare & Dara" buttonText="Edit Slides" inline />
        }
      />
    </div>
  )
}

