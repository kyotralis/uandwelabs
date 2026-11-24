import { useMemo } from 'react'
import ProductShowcaseSection from './ProductShowcaseSection'
import { useTranslation } from '../i18n'
import { useCmsContent } from '../services/contentStore'
import AdminEditButton from './AdminEditButton'

import goldenHourUrbanCampus from '../assets/anadha/Golden Hour Urban Campus.webp'
import duskCampusAirflow from '../assets/anadha/Dusk Campus Airflow Visualization.webp'
import stormFloodedCampus from '../assets/anadha/Storm-Flooded Urban Campus at Dusk.webp'

// Simulation Slides for Ananda Geo Spatial
export const SIMULATION_SLIDES = [
  {
    src: goldenHourUrbanCampus,
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
    src: duskCampusAirflow,
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
    src: stormFloodedCampus,
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
  const [cmsHome] = useCmsContent('home')
  const { t } = useTranslation()
  const g = t.geospatial || {}

  const localizedSlides = useMemo(() => {
    const base = (cmsHome?.geoSpatialSlides && Array.isArray(cmsHome.geoSpatialSlides) && cmsHome.geoSpatialSlides.length > 0)
      ? cmsHome.geoSpatialSlides
      : SIMULATION_SLIDES

    return base.map((slide, idx) => ({
      ...slide,
      title: slide.title || g.slides?.[idx]?.title,
      subtitle: slide.subtitle || g.slides?.[idx]?.subtitle,
      meta: slide.meta || g.slides?.[idx]?.meta,
    }))
  }, [cmsHome?.geoSpatialSlides, g])

  return (
    <div className="relative">
      <ProductShowcaseSection
        id="introduction"
        title={cmsHome?.geoSpatial?.title || g.title || 'Ananda'}
        subtitle={cmsHome?.geoSpatial?.subtitle || g.subtitle || 'Geo Spatial'}
        description={cmsHome?.geoSpatial?.description || g.description || 'Planetary-scale solar ray-casting, aerodynamic CFD, and hydrological simulation modules calibrated for towers, campuses, and urban environments.'}
        buttonText={cmsHome?.geoSpatial?.buttonText || g.buttonText || 'EXPLORE ANANDA'}
        onButtonClick={() => {
          if (onNavigateToAnanda) {
            onNavigateToAnanda()
          } else {
            window.history.pushState(null, '', '/ananda')
            window.dispatchEvent(new Event('popstate'))
          }
        }}
        nextSectionId="healthcare"
        slides={localizedSlides}
        leftControls={
          <AdminEditButton section="home" field="geoSpatial" label="Ananda Overview" buttonText="Edit Overview" inline />
        }
        extraControls={
          <AdminEditButton section="home" field="geoSpatialSlides" label="GeoSpatial Simulation" buttonText="Edit Slides" inline />
        }
      />
    </div>
  )
}


