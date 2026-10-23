import ProductShowcaseSection from './ProductShowcaseSection'

// Healthcare 3 Simulation & Telemetry Slides
export const HEALTHCARE_SLIDES = [
  {
    src: '/hero_medical_device.jpg',
    alt: 'Biomedical Diagnostic Sensors',
    title: 'Diagnostic Sensors',
    subtitle: 'Multi-Spectral Optical Telemetry',
    meta: [
      { label: 'Optical Precision', value: 'Sub-Micron' },
      { label: 'Response Time', value: '< 2.4 ms' },
      { label: 'Calibration', value: 'Zero Drift' },
    ],
  },
  {
    src: '/hero_slide_healthcare.jpg',
    alt: 'Clinical Telemetry & Biometrics',
    title: 'Biometric Analytics',
    subtitle: 'Real-Time Surgical Telemetry',
    meta: [
      { label: 'Sampling Rate', value: '10 kHz Live' },
      { label: 'Surgical Accuracy', value: '99.8%' },
      { label: 'Telemetry', value: 'Edge Processed' },
    ],
  },
  {
    src: '/hero_qualcomm_health.jpg',
    alt: 'Autonomous Bio-Sensing Nodes',
    title: 'Bio-Sensing Nodes',
    subtitle: 'Autonomous Cleanroom & Clinical Monitoring',
    meta: [
      { label: 'Telemetry Link', value: 'Low-Power IoT' },
      { label: 'Sensor Array', value: 'Multi-Parameter' },
      { label: 'Standard', value: 'ISO 13485 Validated' },
    ],
  },
]

export default function HealthcareSection() {
  return (
    <ProductShowcaseSection
      id="healthcare"
      title="Dara"
      subtitle="Healthcare"
      description="Next-generation non-invasive diagnostic sensors, multi-spectral optical telemetry, and real-time patient biometric analytics engineered for surgical precision."
      buttonText="EXPLORE DARA"
      nextSectionId="board"
      slides={HEALTHCARE_SLIDES}
    />
  )
}
