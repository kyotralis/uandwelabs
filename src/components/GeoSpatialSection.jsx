import ProductShowcaseSection from './ProductShowcaseSection'

// Geo Spatial 3 Simulation Slides
export const GEO_SLIDES = [
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

export default function GeoSpatialSection() {
  return (
    <ProductShowcaseSection
      id="introduction"
      title="Ananda"
      subtitle="Geo Spatial"
      description="Planetary-scale solar ray-casting, aerodynamic CFD, and hydrological simulation modules calibrated for zero-drift physical performance."
      buttonText="EXPLORE ANANDA"
      nextSectionId="healthcare"
      slides={GEO_SLIDES}
    />
  )
}
