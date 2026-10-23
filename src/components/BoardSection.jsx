import ProductShowcaseSection from './ProductShowcaseSection'

// Aura Security Camera Slides
export const BOARD_SLIDES = [
  {
    src: '/aura_camera_1.jpg',
    alt: 'Aura AI Security Camera with Precision Milled Optics',
    title: 'Aura Vision Core',
    subtitle: 'On-Device AI & 4K Multi-Spectral Lens',
    meta: [
      { label: 'Neural Power', value: '128 TOPS NPU' },
      { label: 'Optical Sensor', value: '4K Multi-Spectral' },
      { label: 'Edge Latency', value: '< 1.2 ms' },
    ],
  },
  {
    src: '/aura_camera_2.jpg',
    alt: 'Aura LiDAR Ring Surveillance Camera at Dusk',
    title: 'Sentinel LiDAR Array',
    subtitle: 'Perimeter Scanning & Low-Light Halo Array',
    meta: [
      { label: 'Illumination', value: 'LiDAR Ring Array' },
      { label: 'Field of View', value: '180° Panoramic' },
      { label: 'Range', value: '350m Zero-Drift' },
    ],
  },
  {
    src: '/aura_camera_3.jpg',
    alt: 'Aura 360 Autonomous Optical Dome Camera',
    title: 'Aura 360 Autonomous',
    subtitle: 'Motorized Gimbal & Gold-Trace Sensor Die',
    meta: [
      { label: 'Coverage', value: '360° Optical Zoom' },
      { label: 'Gimbal Precision', value: '0.01° Micro-Step' },
      { label: 'Standard', value: 'IP68 Mil-Spec' },
    ],
  },
]

export default function BoardSection() {
  return (
    <ProductShowcaseSection
      id="board"
      title="Aura"
      subtitle="Security Cam"
      description="Next-generation autonomous security vision systems, edge neural compute, and real-time optical surveillance architecture engineered for mission-critical industrial monitoring."
      buttonText="EXPLORE AURA"
      nextSectionId="beliefs"
      slides={BOARD_SLIDES}
      carouselConfig={{ gap: -0.20 }}
    />
  )
}
