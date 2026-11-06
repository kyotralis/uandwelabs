import { useMemo } from 'react'
import ProductShowcaseSection from './ProductShowcaseSection'
import { useTranslation } from '../i18n'

// Simulation Slides for Ananda Geo Spatial
export const SIMULATION_SLIDES = [
  {
    src: '/sunlight_card.jpg?v=2',
    alt: 'Urban Shadow Analysis',
    title: 'Urban Shadow Analysis',
    subtitle: 'Solar Ray-Casting & Diurnal Dynamics',
    meta: [
      { label: 'Compute Speed', value: '60 FPS Ray-Cast' },
      { label: 'Solar Accuracy', value: '99.4%' },
      { label: 'Resolution', value: 'Sub-meter Grid' },
    ],
  },
  {
    src: '/airflow_card.jpg',
    alt: 'Flow Field Simulation',
    title: 'Flow Field Simulation',
    subtitle: 'Aerodynamic CFD & Micro-Climate',
    meta: [
      { label: 'CFD Method', value: 'LBM GPU Solver' },
      { label: 'Mesh Resolution', value: '2.8M Nodes' },
      { label: 'Vector Angle', value: '360° Multi-Vector' },
    ],
  },
  {
    src: '/flood_card.jpg?v=2',
    alt: 'Urban Flood Simulation',
    title: 'Urban Flood Simulation',
    subtitle: 'Hydrological Resilience & Runoff',
    meta: [
      { label: 'Hydro Equation', value: '2D Saint-Venant' },
      { label: 'Storm Scenario', value: '100-Year Peak' },
      { label: 'Terrain Mesh', value: 'LiDAR DEM' },
    ],
  },
]

export const COMMERCIAL_SLIDES = SIMULATION_SLIDES
export const RESIDENTIAL_SLIDES = SIMULATION_SLIDES
export const ANANDA_CATEGORIES = []

export default function GeoSpatialSection({ onNavigateToAnanda }) {
  const { t } = useTranslation()
  const g = t.geospatial || {}

  const localizedSlides = useMemo(() => {
    return SIMULATION_SLIDES.map((slide, idx) => ({
      ...slide,
      title: g.slides?.[idx]?.title || slide.title,
      subtitle: g.slides?.[idx]?.subtitle || slide.subtitle,
      meta: g.slides?.[idx]?.meta || slide.meta,
    }))
  }, [g])

  return (
    <ProductShowcaseSection
      id="introduction"
      title={g.title || 'Ananda'}
      subtitle={g.subtitle || 'Geo Spatial'}
      description={g.description || 'Planetary-scale solar ray-casting, aerodynamic CFD, and hydrological simulation modules calibrated for towers, campuses, and urban environments.'}
      buttonText={g.buttonText || 'EXPLORE ANANDA'}
      onButtonClick={() => {
        if (onNavigateToAnanda) {
          onNavigateToAnanda()
        } else {
          window.location.hash = 'ananda'
        }
      }}
      nextSectionId="healthcare"
      slides={localizedSlides}
    />
  )
}


