// ========================================================
// UANDWE LABS - MULTI-LANGUAGE TRANSLATION DICTIONARY
// Supports: English ('en-in', 'en-us') & Chinese ('zh-cn')
// ========================================================

export const TRANSLATIONS = {
  en: {
    // ----------------------------------------------------
    // HEADER & NAVIGATION
    // ----------------------------------------------------
    header: {
      products: 'Products',
      solutions: 'Solutions',
      blogs: 'Blogs',
      aboutUs: 'About Us',
      careers: 'Careers',
      searchPlaceholder: 'Search products...',
      selectRegionLang: 'Select Region & Language',
      signIn: 'Sign In',
      signOut: 'Sign Out',
      signInToAccount: 'Sign In to Account',
      signInAnanda: 'Sign In to Ananda',
      emailGoogleSignIn: 'Email & Google sign-in',
      anandaCommercialResidency: 'Commercial & Residency',
      commercial: 'Commercial',
      commercialPlatform: 'Scale Platform',
      residency: 'Residency',
      residencyPlatform: 'Living Platform',
      enterCommercial: 'Enter Commercial',
      enterResidency: 'Enter Residency',
      commercialDesc: 'Sub-meter solar ray-casting, aerodynamic wind CFD, and flood hydrology for urban masterplans.',
      residencyDesc: 'Passive cross-ventilation breezes, daylight autonomy, and microclimate comfort for estates.',
      anandaCategoryLabel: 'Urban Physics & CFD',
      physicalAi: 'Physical AI',
      physicalAiLabel: 'Autonomous Edge Vision',
      healthcare: 'Healthcare',
      healthcareLabel: 'Elder Longevity & Fall Radar',
      auraTitle: 'Aura',
      auraSubtitle: 'Autonomous Edge Vision & 128-TOPS Silicon',
      auraDesc: 'Deterministic INT8 quantized neural inferencing directly in hardware cache. Sub-millisecond multilane highway LPR at 180 km/h and 350m perimeter tracking with zero cloud egress.',
      exploreAura: 'Explore Aura Hardware Node',
      daraTitle: 'Dara',
      daraSubtitle: 'Autonomous Senior Dignity & Fall Radar',
      daraDesc: 'Smart assistive device keeping seniors safe and independent. Features 60 GHz contactless wall radar, multi-language talking clock (English, Hindi, Tamil, Kannada, Telugu, Malayalam), and rise-to-wake torch.',
      exploreDara: 'Explore Dara Assistive Platform',
      solutionsEnterpriseHeading: 'ENTERPRISE & MUNICIPAL DEPLOYMENTS',
      exploreCapabilities: 'Explore All Capabilities',
      navigation: 'Navigation',
      regionLanguage: 'Region & Language',
      solutions: [
        {
          id: 'environmental-simulation',
          title: 'Environmental Physics',
          subtitle: 'Microclimate & Aerodynamics',
          description: 'Predictive solar radiation, aerodynamic CFD wind flow, and flood risk mapping.',
          tag: 'SIMULATION',
          pills: ['Solar Radiation', 'CFD Wind Flow'],
        },
        {
          id: 'healthcare-assistive-ai',
          title: 'Assistive Healthcare',
          subtitle: 'Autonomous Elder Safety',
          description: 'Sub-300ms contactless fall detection and optical prescription reading with zero wearables.',
          tag: 'CLINICAL',
          pills: ['Contactless Radar', 'Zero Wearables'],
        },
        {
          id: 'physical-ai-vision',
          title: 'Edge Computer Vision',
          subtitle: 'Tactical Defense & Highway LPR',
          description: 'Multilane highway LPR and 350m perimeter tracking with on-chip edge tensor cores.',
          tag: 'TACTICAL',
          pills: ['Edge Tensor Silicon', '350m Perimeter Mesh'],
        },
      ],
    },

    // ----------------------------------------------------
    // HERO CAROUSEL
    // ----------------------------------------------------
    hero: {
      slides: [
        {
          category: 'Design & Engineering',
          headline: 'Ideas Deserve to Become Real.',
          tagline: 'Turn ambitious thinking into tangible products',
          subtitle: 'Turn ambitious thinking into tangible products through purposeful design and advanced engineering.',
          ctaText: 'DISCOVER OUR MISSION',
        },
        {
          category: 'Precision Systems',
          headline: 'More Than Meets the Eye.',
          tagline: 'Precision and intelligent systems',
          subtitle: 'Behind every remarkable product lies a world of precision, intelligent systems, and engineering that makes it work.',
          ctaText: 'EXPLORE OUR PRODUCTS',
        },
        {
          category: 'Future Architecture',
          headline: 'Tomorrow Starts with What We Build Today.',
          tagline: 'Products with a clear purpose',
          subtitle: 'We create products with a clear purpose, designed to address real challenges and open new possibilities.',
          ctaText: 'VIEW LAB CAPABILITIES',
        },
      ],
    },

    // ----------------------------------------------------
    // WHAT WE BELIEVE IN
    // ----------------------------------------------------
    beliefs: {
      title1: 'What We',
      title2: 'Believe In',
      subtitle: 'Core Engineering Principles',
      intro: 'Great products begin with clear thinking, purposeful design, and an uncompromising commitment to getting the details right. At UandWe Labs, we build technology that endures.',
      principles: [
        {
          title: 'Simplicity',
          statement: 'The best solutions make complex things easier to understand and use.',
          elaboration: 'We strip away the non-essential to reveal clarity. In deep-tech and complex hardware, restraint is the highest form of engineering sophistication.',
        },
        {
          title: 'Purposeful Design',
          statement: 'Every decision should serve a clear purpose, from the first concept to the final experience.',
          elaboration: 'Design is not decoration. Every millimeter of housing, every optical angle, and every line of code exists to solve a real human and physical problem.',
        },
        {
          title: 'Engineering Excellence',
          statement: 'We value thoughtful engineering, attention to detail, and dependable product development.',
          elaboration: 'From sub-micron tolerances in optics to zero-drift neural algorithms, we build with aerospace-grade precision and an uncompromising refusal to cut corners.',
        },
        {
          title: 'Built for the Long Term',
          statement: 'We believe products should be designed with reliability, maintainability, and future growth in mind.',
          elaboration: 'True sustainability means endurance. We engineer modular, upgradeable architectures that outlast disposable consumer cycles and thrive in harsh environments.',
        },
      ],
    },

    // ----------------------------------------------------
    // GEOSPATIAL (ANANDA) SHOWCASE
    // ----------------------------------------------------
    geospatial: {
      title: 'Ananda',
      subtitle: 'Geo Spatial',
      description: 'Planetary-scale solar ray-casting, aerodynamic CFD, and hydrological simulation modules calibrated for towers, campuses, and urban environments.',
      buttonText: 'EXPLORE ANANDA',
      slides: [
        {
          title: 'Urban Shadow Analysis',
          subtitle: 'Solar Ray-Casting & Diurnal Dynamics',
          meta: [
            { label: 'Compute Speed', value: '60 FPS Ray-Cast' },
            { label: 'Solar Accuracy', value: '99.4%' },
            { label: 'Resolution', value: 'Sub-meter Grid' },
          ],
        },
        {
          title: 'Flow Field Simulation',
          subtitle: 'Aerodynamic CFD & Micro-Climate',
          meta: [
            { label: 'CFD Method', value: 'LBM GPU Solver' },
            { label: 'Mesh Resolution', value: '2.8M Nodes' },
            { label: 'Vector Angle', value: '360° Multi-Vector' },
          ],
        },
        {
          title: 'Urban Flood Simulation',
          subtitle: 'Hydrological Resilience & Runoff',
          meta: [
            { label: 'Hydro Equation', value: '2D Saint-Venant' },
            { label: 'Storm Scenario', value: '100-Year Peak' },
            { label: 'Terrain Mesh', value: 'LiDAR DEM' },
          ],
        },
      ],
    },

    // ----------------------------------------------------
    // HEALTHCARE (DARA) SHOWCASE
    // ----------------------------------------------------
    healthcare: {
      title: 'Dara',
      subtitle: 'Healthcare',
      description: 'Smart assistive device for seniors—featuring a talking clock, reading magnifier, night torch, rise-to-wake display, and automatic fall emergency alerts.',
      buttonText: 'EXPLORE DARA',
      slides: [
        {
          title: 'Talking Clock & Magnifier',
          subtitle: 'Multi-Language Voice & Label Reading',
          meta: [
            { label: 'Time Announce', value: 'Multi-Language Voice' },
            { label: 'Magnifier', value: 'Medicine Label Reader' },
            { label: 'Audio Speaker', value: 'Tactile Push-to-Talk' },
          ],
        },
        {
          title: 'Fall Detection & SOS',
          subtitle: 'Automatic Impact Sensing & Rapid Alert',
          meta: [
            { label: 'Fall Detection', value: 'Automatic Sensor' },
            { label: 'Emergency Alert', value: 'Instant SOS Broadcast' },
            { label: 'Safety Link', value: 'Caregiver Notification' },
          ],
        },
        {
          title: 'Torch Light & Rise-to-Wake',
          subtitle: 'Night Guidance & Lift-Activated Clock',
          meta: [
            { label: 'Night Torch', value: 'Built-in Illumination' },
            { label: 'Rise-to-Wake', value: 'Motion-Activated Screen' },
            { label: 'Readability', value: 'High-Contrast OLED' },
          ],
        },
      ],
    },

    // ----------------------------------------------------
    // PHYSICAL AI (AURA) SHOWCASE
    // ----------------------------------------------------
    board: {
      title: 'Aura',
      subtitle: 'Physical AI',
      description: 'Smart cameras and vehicle analytics powered by edge AI—delivering real-time visibility, threat detection, and proactive security.',
      buttonText: 'EXPLORE AURA',
      slides: [
        {
          title: 'AURA LPR',
          subtitle: 'AI-powered license plate recognition and vehicle identification',
          meta: [
            { label: 'Recognition', value: 'Plate & Vehicle ID' },
            { label: 'Speed Capture', value: 'High-Speed Multilane' },
            { label: 'Edge Latency', value: '< 1.2 ms' },
          ],
        },
        {
          title: 'AURA VISION',
          subtitle: 'Intelligent cameras with real-time AI detection',
          meta: [
            { label: 'Neural Power', value: '128 TOPS NPU' },
            { label: 'Optical Sensor', value: '4K Multi-Spectral' },
            { label: 'Detection', value: 'Real-Time Edge AI' },
          ],
        },
        {
          title: 'AURA SENTINEL',
          subtitle: 'Multi-camera security and suspicious vehicle monitoring',
          meta: [
            { label: 'Monitoring', value: 'Multi-Camera Mesh' },
            { label: 'Suspicious Tracking', value: 'Vehicle & Threat Alerts' },
            { label: 'Perimeter Range', value: '350m Zero-Drift' },
          ],
        },
      ],
    },

    // ----------------------------------------------------
    // CAREERS (GROW WITH US)
    // ----------------------------------------------------
    careers: {
      headline: 'Grow With Us',
      statement: "Curious minds. Bold ideas. Meaningful work. Let's build what's next, together.",
      buttonText: 'Explore Opportunities',
    },

    // ----------------------------------------------------
    // FOOTER
    // ----------------------------------------------------
    footer: {
      description: 'We bridge generative intelligence, environmental physics, and precision engineering to design sustainable, future-ready realities.',
      aboutUsCol: 'About Us',
      productsCol: 'Products',
      links: {
        aboutUs: 'About Us',
        careers: 'Careers',
        techBlog: 'Technical Blog',
        partners: 'Partners',
        ananda: 'Ananda',
        dara: 'Dara (Healthcare)',
        aura: 'Aura (Physical AI)',
      },
      legal: {
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        security: 'Security',
      },
      copyright: '© 2026 uandwelabs. All rights reserved.',
    },

    // ----------------------------------------------------
    // ANANDA PAGE (GEOSPATIAL & ARCHITECTURAL SIMULATION)
    // ----------------------------------------------------
    anandaPage: {
      heroCommercialSlides: [
        {
          id: 'exoskeleton',
          title: 'Aerodynamic Monolith',
          desc: 'Monumental fluid structural exoskeleton and high-performance glass curtain wall',
        },
        {
          id: 'skybridge',
          title: 'Twin Commercial Towers & Skybridge',
          desc: 'Twin towers linked high above by an aerodynamic cantilevered glass skybridge',
        },
        {
          id: 'waterfront',
          title: 'Waterfront Commercial Spire',
          desc: 'LBM boundary layer airflow simulations and solar ray-casting across maritime city districts',
        },
        {
          id: 'cantilever',
          title: 'High-Density Structural Envelope',
          desc: 'Real-time urban morphology and microclimate CFD modeling for commercial masterplans',
        },
      ],
      heroResidentialSlides: [
        {
          id: 'residential_sunset_villa',
          title: 'Hillside Residential Villa',
          desc: 'Indoor-outdoor living with sunken fire pit lounge and cantilevered timber overhangs',
        },
        {
          id: 'residential_estate_pool',
          title: 'Luxury Residential Estate',
          desc: 'Floor-to-ceiling glass pavilions opening to infinity reflection pool and private courtyard',
        },
        {
          id: 'residential_zen_courtyard',
          title: 'Biophilic Courtyard Sanctuary',
          desc: 'Natural cross-ventilation sliding glass with reflecting pool and Japanese maple',
        },
      ],
      heroDefaultTitle: 'Where Architecture Meets Physics',
      heroCommercialFallbackDesc: 'Sub-meter solar ray-casting, Lattice Boltzmann aerodynamic wind fields, and 2D Saint-Venant flood hydrology for commercial scale masterplans.',
      heroResidentialFallbackDesc: 'Passive cross-ventilation, daylight autonomy, and microclimate comfort for private villas and estates in real time.',
      scheduleSimulation: 'Schedule Simulation',

      coreTitle: 'The Architecture of Innovation',
      features: [
        {
          title: 'Diurnal Solar Ray-Casting',
          desc: 'Sub-meter solar azimuth and altitude computation based on NOAA astronomical ephemeris tables and surrounding urban morphology at 60 FPS without render queues.',
        },
        {
          title: 'LBM Aerodynamic Wind Solver',
          desc: 'Lattice Boltzmann Method (LBM) fluid dynamics computing 3D airflow streamlines, corner vortex shedding, and pedestrian safety criteria in minutes.',
        },
        {
          title: '2D Saint-Venant Hydrology',
          desc: '2D shallow water differential equations solved across high-resolution LiDAR Digital Elevation Models (DEM) for critical 100-year storm climate resilience.',
        },
        {
          title: 'Passive Cross-Breeze Corridors',
          desc: 'Window-to-window cross-ventilation analysis and courtyard convective pressure differentials enabling zero-energy natural convective cooling.',
        },
        {
          title: 'Daylight Autonomy & Glare Shield',
          desc: 'Calculates spatial daylight autonomy (sDA) and annual sunlight exposure (ASE), optimizing exterior louvers without blocking panoramic views.',
        },
        {
          title: 'Native BIM & LiDAR Ingestion',
          desc: 'Instant geometry ingestion of Revit IFC files, Rhino geometries, and 3D GeoTIFF matrices with zero coordinate conversion friction.',
        },
      ],

      commercialScale: 'Commercial Scale',
      residentialLiving: 'Residential Living',
      toggleScaleAria: 'Toggle Commercial or Residential Scale',
      dualityCommercial: {
        card1: 'High-Density Envelope Solar Ray-Caster',
        card2: 'Urban Aerodynamic Wind Fields',
        card3: '2D Stormwater Hydrology Basin',
      },
      dualityResidential: {
        card1: 'Private Villa Daylighting & Courtyards',
        card2: 'Convective Cross-Breeze Corridors',
        card3: 'Tree Canopy Shading Corridors',
      },

      perspectivesTitle: 'Architect & Engineering Perspectives',
      testimonials: [
        {
          name: 'Sarah Chen',
          role: 'Principal Environmental Architect',
          studio: 'Studio Form & Light',
          quote: 'Ananda gives us instantaneous GPU ray-tracing on 50-story envelopes. We no longer wait three days for CFD renders; we test wind vortices live with our clients right in the design review room.',
        },
        {
          name: 'David Park',
          role: 'Director of Masterplanning',
          studio: 'Urban Matrix Labs',
          quote: 'The hydrological 2D Saint-Venant solver pinpointed flood detention zones right where our parking ingress was planned. It saved our development millions in mitigation and prevented costly redesigns.',
        },
        {
          name: 'Elena Rodriguez',
          role: 'Sustainable Residential Designer',
          studio: 'Biophilic Habitat',
          quote: 'Designing private villas with Ananda cross-ventilation lets us eliminate mechanical HVAC in living courtyards. The thermal comfort is completely natural and our clients love the energy independence.',
        },
      ],

      caseStudiesTitle: 'Built on Ananda',
      caseStudies: [
        {
          id: 1,
          title: 'Tokyo Waterfront Spire',
          desc: 'Aerodynamic vortex shedding and boundary layer pedestrian comfort mapping across Tokyo Bay.',
        },
        {
          id: 2,
          title: 'Zurich Alpine Cantilever',
          desc: 'Sub-zero wind vortex acceleration and passive solar thermal retention along Swiss mountain ridges.',
        },
        {
          id: 3,
          title: 'Singapore Marina Shading',
          desc: 'Bioclimatic canopy solar filtration and natural convective stack cooling for tropical pavilions.',
        },
        {
          id: 4,
          title: 'Geneva Lakefront Pavilion',
          desc: 'Passive solar thermal absorption through low-E glazed envelopes and evaporative water micro-climates.',
        },
        {
          id: 5,
          title: 'Kyoto Courtyard Lightwell',
          desc: 'Zero-energy daylight autonomy across private living quarters via clerestory geometry.',
        },
        {
          id: 6,
          title: 'California Coastal Breezeway',
          desc: 'Window-to-window convective cross-ventilation corridors reducing active HVAC consumption by 42%.',
        },
        {
          id: 7,
          title: 'Metropolitan Transit Masterplan',
          desc: 'Multi-acre urban physics convergence and boundary layer aerodynamic modeling before pouring foundations.',
        },
      ],

      ctaTitle: 'Ready to shape the future?',
      ctaDesc: 'Deploy GPU ray-casting, aerodynamic wind CFD, and flood hydrology on your next architectural development with our engineering team.',
      ctaButton: 'Schedule Simulation Consultation',

      modal: {
        formTitle: 'Schedule Simulation Consultation',
        close: 'Close',
        fullNameLabel: 'Full Name',
        fullNamePlaceholder: 'Your Full Name',
        emailLabel: 'Email',
        emailPlaceholder: 'your.email@domain.com',
        practiceLabel: 'Practice / Studio',
        practicePlaceholder: 'Agency Name',
        scaleLabel: 'Scale',
        commercialScale: 'Commercial Scale',
        residentialScale: 'Residential Scale',
        bothScale: 'Both / Municipal',
        siteCoordinatesLabel: 'Site Coordinates (Lat / Long)',
        gpsLocked: 'GPS Locked',
        acquiringFix: 'Acquiring Fix...',
        latPlaceholder: 'Latitude (e.g. 12.971599)',
        lngPlaceholder: 'Longitude (e.g. 77.594566)',
        detectLocation: 'Detect Current Location',
        acquiringSatellite: 'Acquiring Satellite Lock...',
        locationDenied: 'Location access was not granted by browser. You can enter latitude and longitude coordinates manually above.',
        submitForm: 'Submit Simulation Consultation',

        scheduleTitle: 'Schedule Consultation',
        scheduleSubtitle: 'Select your preferred date and time slot for the engineering review',
        backToForm: 'Back to Form',
        siteCoordsLabel: 'Site Coordinates:',
        scaleSuffix: 'Scale',
        selectSlot: 'Select Appointment Slot',
        selectDate: 'Select Date',
        dates: ['Today, Oct 28', 'Tomorrow, Oct 29', 'Friday, Oct 30'],
        selectTime: 'Select Time Slot',
        confirmSchedule: 'Confirm Scheduled Session',

        agentBridgeHeader: 'AGENT BRIDGE // SESSION #UWE-GEO-8492',
        agentBridgeSubtitle: 'WEBRTC ENCRYPTED AES-256 SIMULATION STREAM',
        closeRoom: 'Close Room',
        siteTelemetryHud: 'SITE TELEMETRY HUD //',
        telemetryStats: 'FPS: 60.0 BVH RAY-CASTER | LBM WIND D3Q19',
        engineerName: 'Dr. Aris Vance',
        engineerRole: 'Principal GeoSpatial Engineer',
        architectDefaultName: 'Architect',
        you: 'You',
        cameraOff: 'Camera Off',
        liveVideo: 'Live Video',
        unmute: 'Unmute',
        mute: 'Mute',
        startVideo: 'Start Video',
        stopVideo: 'Stop Video',
        shareModel: 'Share 3D Model',
        sharingBim: 'Sharing BIM',
        leaveRoom: 'Leave Room',
        engineerSpokenQuote: '"Site LiDAR terrain DEM ingested for {lat}° N, {lng}° E. Initializing 360-degree diurnal solar exposure and micro-climate wind acceleration vectors..."',

        confirmedTitle: 'Consultation Confirmed',
        bookingRef: 'BOOKING REFERENCE // #UWE-GEO-8492',
        assignedEngineerLabel: 'ASSIGNED ENGINEER:',
        dateTimeLabel: 'DATE & TIME:',
        at: 'at',
        siteCoordsConfirmedLabel: 'SITE COORDINATES:',
        clientLabel: 'CLIENT:',
        secureWebRtcLink: 'SECURE WEBRTC CONSULTATION LINK',
        copy: 'Copy',
        copied: 'Copied',
        connectNow: 'CONNECT TO AGENT ROOM NOW (EARLY ACCESS)',
        addToCalendar: 'ADD TO GOOGLE CALENDAR',
        doneClose: 'Done / Close',
      },
    },

    // ----------------------------------------------------
    // DARA PAGE (ASSISTIVE HEALTHCARE & SENIOR CARE)
    // ----------------------------------------------------
    daraPage: {
      heroTitle: {
        line1: 'Senior Care.',
        line2: 'Invisible by Design.',
      },
      heroDesc: 'A smart assistive device that keeps elderly loved ones safe and independent at home. Features a talking clock, night torch light, and automatic fall detection — with zero cameras or wearables.',
      heroButtonText: 'Schedule Clinical Pilot',

      clockSectionTitle: 'Talking Clock & Built-In Speaker',
      clockSectionDesc: 'Displays the current time clearly on a high-contrast screen. Press the button to announce the exact time aloud via the built-in speaker in multiple regional languages.',
      liveClockLabel: 'LIVE CLOCK:',
      pressToAnnounce: 'PRESS TO ANNOUNCE CURRENT TIME',
      timeAnnouncementPrefix: 'The current time is ',
      stopVoice: 'Stop voice',
      playVoice: 'Play medicine reminder speech',

      gallery: [
        {
          title: '60 GHz Contactless Radar',
          desc: 'Continuous fall detection through drywall and shower curtains with zero cameras.',
        },
        {
          title: 'Built-in Torch & Rise-to-Wake',
          desc: 'Automatically activates clock and illuminates path the instant the device is raised.',
        },
      ],

      architectureTitle: 'The Architecture of Senior Autonomy',
      features: [
        {
          title: 'Talking Clock & Multi-Language Voice',
          desc: 'Displays the current time with high-contrast digits and announces the exact time aloud upon button press through the built-in acoustic speaker with multi-language voice support.',
        },
        {
          title: 'Built-in Torch Light',
          desc: 'Integrated downward-focused torch light engineered to help elderly users navigate safely in dark rooms, unlit hallways, and during nighttime without fumbling for wall switches.',
        },
        {
          title: 'Optical Magnifying Glass',
          desc: 'Integrated magnifying glass that helps elderly users effortlessly read small text, labels, medicine names, prescription dosages, and other small household objects.',
        },
        {
          title: 'Rise-to-Wake Display',
          desc: 'Solid-state motion sensors automatically activate and illuminate the clock and display the instant the user raises or lifts the device from the dock or table.',
        },
        {
          title: 'Fall Detection & Emergency Alert',
          desc: 'Detects when the user experiences a fall anywhere in the room and immediately dispatches an emergency alert without requiring any wearables or cameras.',
        },
        {
          title: '100% Optical Dignity & Autonomous Battery',
          desc: 'Engineered with zero cameras for complete personal privacy, supported by a magnetic Qi dock offering 30 days of autonomous battery backup.',
        },
      ],

      pillarsTitle: {
        line1: 'Designed Around',
        line2: 'Human Needs.',
      },
      pillars: [
        {
          title: 'Simplicity',
          tagline: 'Technology should feel effortless.',
          desc: 'Zero complex configuration, zero smartphones required, and zero multi-step menus. Every interaction is immediate, direct, and completely natural from the very first touch.',
        },
        {
          title: 'Accessibility',
          tagline: 'Designed with elderly users in mind.',
          desc: 'Crafted specifically for aging eyesight, reduced tactile dexterity, and diverse mother tongues. High-contrast numbers and crystal-clear voice clarity eliminate all barriers.',
        },
        {
          title: 'Comfort',
          tagline: 'Everyday interactions should feel natural.',
          desc: 'Soft, ambient night illumination that gently guides footsteps without glare, paired with soothing acoustic speech that reassures rather than startles in peaceful homes.',
        },
        {
          title: 'Independence',
          tagline: 'Supporting confidence in everyday living.',
          desc: 'Fostering the freedom to live safely and autonomously in one’s own space, knowing dependable emergency protection is always present without invasive oversight.',
        },
      ],

      darkCanvasTitle: {
        line1: 'Your Space. Your Privacy.',
        line2: 'Your Independence.',
      },
      darkCards: [
        {
          title: 'Personal spaces deserve privacy.',
          desc: 'Personal sanctuaries such as bedrooms and bathrooms must remain entirely sacred. Technology should safeguard well-being in the background without introducing surveillance or visual inspection into intimate living quarters.',
        },
        {
          title: 'Technology should support, not control.',
          desc: 'True assistive design empowers self-reliance rather than imposing restrictions. Dara acts as a supportive companion that stays silent until called upon, preserving personal autonomy and daily rhythm without clinical oversight.',
        },
        {
          title: 'Assistance should feel natural.',
          desc: 'Support should feel like a considerate human presence, never an alarming emergency siren or institutional monitor. From soothing acoustic cadence to gentle ambient illumination, every interaction is crafted to feel respectful, warm, and effortless.',
        },
      ],

      purpose: {
        line1: 'Built for Dignity.',
        line2: 'Designed for Independence.',
        description: 'Assistive technology crafted to keep seniors safe, comfortable, and self-reliant at home — with zero wearables, zero cameras, and complete peace of mind.',
      },

      cta: {
        title: 'Bring Dignity to Every Room',
        subtitle: 'Reserve a clinical evaluation unit or schedule a consultation with our geriatric hardware engineering team in Bengaluru.',
        buttonText: 'Request Clinical Pilot',
      },

      modal: {
        title: 'Dara Clinical Pilot Consultation',
        formTitle: 'Reserve Pilot Hardware',
        formSubtitle: 'Specify deployment criteria to evaluate pilot units in your facility.',
        scopeLabel: 'Care Setting',
        scopeOptions: [
          { value: 'home', label: 'Private Home / Senior Independent Living' },
          { value: 'assisted', label: 'Assisted Living Community' },
          { value: 'memory', label: 'Memory Care / Dementia Residence' },
          { value: 'hospital', label: 'Geriatric Hospital Ward' },
        ],
        notesPlaceholder: 'Add any specific clinical or architectural requirements...',
        departmentTitle: 'Dara Geriatric Hardware Engineering Desk',
        departmentSubtitle: 'Clinical Consultation Team · Bengaluru',
      },
    },

    // ----------------------------------------------------
    // AURA PAGE (PHYSICAL AI & HARDENED EDGE SILICON)
    // ----------------------------------------------------
    auraPage: {
      heroTitle: {
        line1: 'Physical AI.',
        line2: 'Silicon at the Edge.',
      },
      heroDesc: 'Deterministic 128-TOPS neural inferencing directly inside hardened optical sensor nodes. Sub-millisecond vehicle tracking and perimeter defense with zero cloud egress.',
      heroButtonText: 'Schedule Node Pilot',

      gallery: [
        {
          title: 'Multilane Highway LPR',
          desc: 'Real-time optical character and vehicle identification at speeds up to 180 km/h with sub-millisecond precision.',
        },
        {
          title: '350M Perimeter Mesh',
          desc: 'Multi-camera spatial target handoff detects and tracks perimeter vectors across 350 meters with zero blind spots.',
        },
      ],

      architectureTitle: 'The Architecture of Autonomous Edge Silicon',
      features: [
        {
          title: 'High-Speed LPR & Vehicle Analytics',
          desc: 'Identifies license plates, vehicle classifications, and velocities across multiple highway lanes in under 0.8 milliseconds with 99.8% precision.',
        },
        {
          title: '128-TOPS On-Chip NPU Core',
          desc: 'Executes INT8 quantized deep neural inferencing directly in hardware cache. Raw video frames never leave the sensor node, eliminating cloud roundtrips.',
        },
        {
          title: '350M Coordinated Perimeter Mesh',
          desc: 'Autonomous multi-node target handoff tracks human and vehicular vectors over 350 meters with zero blind spots and predictive intrusion alerting.',
        },
        {
          title: 'Sub-Millisecond Actuation Relay',
          desc: 'Direct dry-contact relays trigger barrier gates, optical strobes, and perimeter interlocks in under 1.2 milliseconds — faster than human nerve reaction.',
        },
        {
          title: 'FIPS 140-2 Level 3 Armored Cryptography',
          desc: 'Hardware root-of-trust, cryptographic secure boot, and anti-tamper zeroization circuitry protect critical defense credentials and classified metadata.',
        },
        {
          title: '100% Air-Gapped Network Autonomy',
          desc: 'Operates completely severed from external cloud networks. Zero recurring bandwidth fees, zero telemetry leaks, and zero downtime during fiber cuts.',
        },
      ],

      pillarsTitle: {
        line1: 'Designed Around',
        line2: 'Critical Missions.',
      },
      pillars: [
        {
          title: 'Speed',
          tagline: 'Sub-millisecond reaction time.',
          desc: 'From photon strike on CMOS glass to physical dry-contact barrier relay in 1.2 ms — executing deterministic edge perception faster than human optical reflex.',
        },
        {
          title: 'Precision',
          tagline: '99.8% deterministic accuracy.',
          desc: 'Deep tensor convolution eliminates false positives from shadows, weather, and headlight glare across all four lanes under low-lux lighting conditions.',
        },
        {
          title: 'Resilience',
          tagline: 'Hardened for harsh environments.',
          desc: 'IP68 ingress and IK10 vandal dome inside extruded 6061-T6 aluminum with passive convective cooling from -40°C to +75°C without moving mechanical fans.',
        },
        {
          title: 'Sovereignty',
          tagline: 'Complete data ownership.',
          desc: '100% on-premises execution. Video data stays completely local on the camera node with zero third-party cloud subscription fees or compliance exposure.',
        },
      ],

      darkCanvasTitle: {
        line1: 'Zero Cloud Reliance.',
        line2: 'Absolute Sovereignty.',
      },
      darkCards: [
        {
          title: 'Raw video never leaves the camera.',
          desc: 'Unlike conventional cloud CCTV systems that stream unencrypted private footage across third-party networks, Aura processes all frames directly on local silicon. Only verified metadata alerts exit the hardware.',
        },
        {
          title: 'Zero vulnerability to network outages.',
          desc: "Perimeter protection cannot depend on internet uptime. Severed fiber cables, jamming attacks, or external ISP down-times have zero impact on Aura's continuous, autonomous local defense.",
        },
        {
          title: 'Zero recurring compute or bandwidth fees.',
          desc: 'Eliminate perpetual AWS Kinesis and Azure GPU ingestion fees. Aura is a permanent silicon asset that executes uninterrupted, high-throughput machine vision with zero recurring monthly compute costs.',
        },
      ],

      purpose: {
        line1: 'Built for Reliability.',
        line2: 'Engineered for the Edge.',
        description: 'Critical physical infrastructure demands instant, deterministic perception. Aura executes deep intelligence directly where action happens — completely autonomous, completely private.',
      },

      cta: {
        title: 'Deploy Edge Silicon on Your Perimeter',
        subtitle: 'Reserve an evaluation kit or schedule a technical architecture review with our hardware engineers in Bengaluru.',
        buttonText: 'Request Technical Pilot',
      },

      modal: {
        title: 'Aura Technical Pilot Consultation',
        formTitle: 'Reserve Pilot Hardware',
        formSubtitle: 'Specify deployment criteria to evaluate Aura 128-TOPS edge nodes on your perimeter.',
        scopeLabel: 'Mission Profile',
        scopeOptions: [
          { value: 'highway', label: 'High-Speed Arterial Highway LPR' },
          { value: 'perimeter', label: '350m Critical Infrastructure Perimeter' },
          { value: 'logistics', label: 'Industrial Warehouse & Logistics Safety' },
          { value: 'campus', label: 'Enterprise High-Security Corporate Campus' },
        ],
        notesPlaceholder: 'e.g. 10 corridor nodes, ONVIF Profile S/T compatibility, dry-contact barrier relay activation...',
        departmentTitle: 'Aura Edge Silicon Operations',
        departmentSubtitle: 'Defense & Highway Architecture Team',
      },
    },

    // ----------------------------------------------------
    // SHARED PRODUCT CONSULT MODAL LABELS
    // ----------------------------------------------------
    productModal: {
      yourName: 'Your Name',
      emailAddress: 'Email Address',
      facilityPractice: 'Facility / Practice',
      deploymentNotes: 'Deployment Notes',
      proceedToSchedule: 'PROCEED TO ARCHITECT SCHEDULING',
      scheduleReviewTitle: 'Schedule Live Technical Review',
      scheduleReviewDesc: 'Direct 1-on-1 session with our engineering team in Bengaluru.',
      selectDate: 'Select Date',
      selectTime: 'Select Time (IST / UTC+5:30)',
      dates: ['Tomorrow, Nov 4', 'Wed, Nov 5', 'Thu, Nov 6'],
      back: 'Back',
      connectDesk: 'CONNECT TO CLINICAL ENGINEERING DESK',
      connectDeskTech: 'CONNECT TO TECHNICAL SILICON DESK',
      secureWebRtc: 'SECURE WEBRTC BRIDGE',
      endSession: 'END SESSION',
      copy: 'Copy',
      copied: 'Copied',
      confirmedTitle: 'Consultation Confirmed',
      confirmationMessage: 'Thank you, {name}. Your session for {date} at {time} has been registered. An invitation has been dispatched to {email}.',
      closeWindow: 'Close Window',
    },

    // ----------------------------------------------------
    // BLOGS & TECHNICAL PERSPECTIVES
    // ----------------------------------------------------
    blogsPage: {
      badge: 'UANDWE LABS · PERSPECTIVES & STORIES',
      volumeTag: 'VOL. 04 · 2026 EDITION',
      heroTitle: {
        line1: 'Stories & Breakthroughs.',
        line2: 'Where Ideas Become Real.',
      },
      heroSubtitle:
        'Notes, design thinking, and engineering breakdowns from our team — exploring environmental physics, autonomous edge silicon, and assistive human care.',
      heroButtonText: 'Explore Articles',
      flagshipTitle: 'The Architecture of Innovation',
      allArticlesTitle: 'Articles & Perspectives',
      featuredBadge: 'FEATURED DISPATCH',
      searchPlaceholder: 'Search articles, topics, or authors...',
      allFilter: 'All Dispatches',
      categories: {
        all: 'All Publications',
        geospatial: 'GeoSpatial Physics',
        healthcare: 'Assistive Healthcare',
        physicalAi: 'Edge Physical AI',
      },
      readTimeLabel: 'min read',
      readArticle: 'Read Technical Paper',
      readShort: 'Read Paper',
      filterCount: 'Showing {count} research publications',
      noResults: 'No technical dispatches found matching your query.',
      resetSearch: 'Reset search filter',
      featured: {
        category: 'GeoSpatial Physics',
        categoryTag: 'SIMULATION ENGINE',
        title: 'Real-Time Lattice Boltzmann Aerodynamics: Solving 3D Navier-Stokes in the Browser at 60 FPS',
        excerpt:
          'How our engineering team eliminated render queues by porting D3Q19 streaming distribution kernels directly into client-side WebGL compute shaders, enabling instantaneous wind aerodynamic feedback for commercial architectural towers.',
        author: 'Dr. Aris Vance',
        authorRole: 'Principal GeoSpatial Engineer · Bengaluru',
        date: 'November 02, 2026',
        readTime: '12 min read',
        image: '/ananda_hero.jpg',
        tags: ['CFD Fluid Dynamics', 'Lattice Boltzmann', 'GPU Ray-Casting', 'WebGL Shaders'],
        metrics: [
          { label: 'Compute Frame Rate', value: '60 FPS' },
          { label: 'LBM Grid Resolution', value: '2.8M Nodes' },
          { label: 'Latency to First Streamline', value: '< 16 ms' },
        ],
      },
      articles: [
        {
          id: 'realtime-lbm-aerodynamics',
          slug: 'lattice-boltzmann-realtime-aerodynamics',
          category: 'geospatial',
          categoryLabel: 'GeoSpatial Physics',
          title: 'Real-Time Lattice Boltzmann Aerodynamics: Solving 3D Navier-Stokes in the Browser at 60 FPS',
          excerpt:
            'How our engineering team eliminated render queues by porting D3Q19 streaming distribution kernels directly into client-side WebGL compute shaders, enabling instantaneous wind aerodynamic feedback for commercial architectural towers.',
          author: 'Dr. Aris Vance',
          authorRole: 'Principal GeoSpatial Engineer · Bengaluru',
          date: 'November 02, 2026',
          readTime: '12 min read',
          image: '/ananda_hero.jpg',
          tags: ['CFD Fluid Dynamics', 'Lattice Boltzmann', 'GPU Ray-Casting', 'WebGL Shaders'],
          metrics: [
            { label: 'Compute Frame Rate', value: '60 FPS' },
            { label: 'LBM Grid Resolution', value: '2.8M Nodes' },
            { label: 'Latency to First Streamline', value: '< 16 ms' },
          ],
        },
        {
          id: 'diurnal-solar-low-e',
          slug: 'diurnal-solar-ephemeris-ray-casting',
          category: 'geospatial',
          categoryLabel: 'GeoSpatial Physics',
          title: 'Sub-Meter Diurnal Solar Ray-Casting: Balancing Daylight Autonomy & Thermal Heat Gain',
          excerpt:
            'Astronomical ephemeris algorithms and low-E envelope modeling converge to eliminate artificial lighting in commercial towers without increasing active cooling loads.',
          author: 'Maya Lin',
          authorRole: 'Senior Computational Architect',
          date: 'October 28, 2026',
          readTime: '8 min read',
          image: '/site_vision_daylight.jpg',
          tags: ['Solar Ray-Casting', 'Daylight Autonomy', 'EPW Climate Data'],
          metrics: [
            { label: 'Solar Ephemeris Accuracy', value: '99.4%' },
            { label: 'HVAC Energy Reduction', value: '38%' },
          ],
        },
        {
          id: 'radar-vs-cameras-elderly',
          slug: '60ghz-millimeter-wave-fall-detection',
          category: 'healthcare',
          categoryLabel: 'Assistive Healthcare',
          title: 'Why We Chose 60 GHz Millimeter-Wave Radar Over Optical Cameras in Geriatric Spaces',
          excerpt:
            'The ethical imperative of privacy in elder assistive design: detecting biomechanical micro-velocity drops in intimate spaces like bathrooms without cameras or wearables.',
          author: 'Dr. Priya Sundaram',
          authorRole: 'Head of Assistive Hardware Systems',
          date: 'October 22, 2026',
          readTime: '7 min read',
          image: '/dara_emergency_fall.jpg',
          tags: ['60 GHz Radar', 'Fall Detection', 'Zero Wearables', 'Privacy-First'],
          metrics: [
            { label: 'Detection Latency', value: '< 280 ms' },
            { label: 'Optical Cameras Used', value: 'Zero' },
          ],
        },
        {
          id: 'deterministic-highway-lpr',
          slug: '128-tops-multilane-highway-lpr',
          category: 'physicalAi',
          categoryLabel: 'Edge Physical AI',
          title: 'Sub-Millisecond Multilane LPR at 180 km/h: Zero Cloud Egress on Hardened Silicon',
          excerpt:
            'Running INT8 quantized deep neural inferencing directly in optical sensor hardware cache. License plate recognition and vehicle classification with sub-millisecond deterministic certainty.',
          author: 'Vikram Seth',
          authorRole: 'Edge Silicon Systems Lead',
          date: 'October 15, 2026',
          readTime: '10 min read',
          image: '/aura_lpr.jpg',
          tags: ['128-TOPS NPU', 'Highway LPR', 'Zero Cloud', 'INT8 Quantization'],
          metrics: [
            { label: 'Per-Frame Inference', value: '0.8 ms' },
            { label: 'Target Velocity Max', value: '180 km/h' },
          ],
        },
        {
          id: 'passive-cross-ventilation',
          slug: 'passive-venturi-wind-corridors',
          category: 'geospatial',
          categoryLabel: 'GeoSpatial Physics',
          title: 'Passive Venturi Wind Corridors: Cooling High-End Hillside Residences Without Active HVAC',
          excerpt:
            'Simulating courtyard convective pressure differentials and clerestory airflow streams during schematic design to cut active HVAC refrigeration equipment tonnage by 42%.',
          author: 'Kaelen Thorne',
          authorRole: 'Aerodynamics CFD Researcher',
          date: 'October 08, 2026',
          readTime: '9 min read',
          image: '/residential_breeze.jpg',
          tags: ['Venturi Corridors', 'Passive Cooling', 'Hillside Microclimate'],
          metrics: [
            { label: 'HVAC Tonnage Cut', value: '42%' },
            { label: 'Wind Velocity Boost', value: '2.4x' },
          ],
        },
        {
          id: 'assistive-audio-psychology',
          slug: 'psychology-of-elder-audio-companions',
          category: 'healthcare',
          categoryLabel: 'Assistive Healthcare',
          title: 'The Psychology of Assistive Audio: Designing Calming Cadence for Aging Ears',
          excerpt:
            'Why shrill digital alarm beeps trigger agitation in dementia care, and how warm analog acoustic frequency curves restore dignity, orientation, and daily calm.',
          author: 'Ananya Rao',
          authorRole: 'Acoustic Interaction Designer',
          date: 'September 29, 2026',
          readTime: '6 min read',
          image: '/dara_assistive_device.jpg',
          tags: ['Acoustic Speech', 'Tactile UX', 'Geriatric Care', 'Talking Clock'],
          metrics: [
            { label: 'Supported Languages', value: '6 Dialects' },
            { label: 'Acoustic Clarity Score', value: '98%' },
          ],
        },
        {
          id: 'air-gapped-350m-perimeter',
          slug: 'air-gapped-sovereign-perimeter-mesh',
          category: 'physicalAi',
          categoryLabel: 'Edge Physical AI',
          title: 'Air-Gapped Sovereign Defense: Multi-Camera Target Handoff Across 350 Meters',
          excerpt:
            'Coordinating autonomous edge nodes over a local optical mesh network. Detecting and handing off perimeter vectors with zero central server or internet vulnerability.',
          author: 'Devendra Patel',
          authorRole: 'Autonomous Edge Infrastructure Architect',
          date: 'September 19, 2026',
          readTime: '11 min read',
          image: '/aura_sentinel_dusk.jpg',
          tags: ['350m Mesh', 'Air-Gapped', 'Perimeter Security', 'Zero Drift'],
          metrics: [
            { label: 'Mesh Coverage Radius', value: '350 Meters' },
            { label: 'Handoff Drift', value: '0.00%' },
          ],
        },
      ],
      newsletter: {
        badge: 'ENGINEERING DISPATCH',
        title: 'Receive Unreleased Whitepapers & Solvers in Your Inbox',
        subtitle:
          'Bi-weekly technical dispatches containing mathematical solvers, microclimate datasets, and edge silicon benchmarking logs. Zero marketing fluff.',
        placeholder: 'Enter your institutional or professional email...',
        buttonText: 'SUBSCRIBE TO DISPATCH',
        subscribedTitle: 'You are now subscribed to the UandWe Labs Dispatch.',
        subscribedDesc: 'A confirmation has been sent to your email. You will receive our next unreleased whitepaper.',
      },
      modal: {
        backToArticles: 'Back to all publications',
        shareArticle: 'Share Technical Paper',
        copiedUrl: 'Paper link copied to clipboard',
        keyTakeaways: 'Key Engineering Takeaways',
        authorBioLabel: 'About the Author',
        schedulePilot: 'Schedule Pilot with Engineering Author',
        publishedIn: 'Published in UandWe Labs Technical Journal',
      },
      cta: {
        title: 'Ready to shape the future?',
        subtitle:
          'Connect with our research and systems engineering desks to review raw simulation datasets, hardware schematics, or co-author technical publications.',
        buttonText: 'Connect with Our Research Desk',
      },
    },

    // ----------------------------------------------------
    // ABOUT US & LAB PHILOSOPHY (ENGLISH)
    // ----------------------------------------------------
    aboutPage: {
      badge: 'UANDWE RESEARCH LABS · OUR PURPOSE & CULTURE',
      heroTitle: {
        line1: 'About UandWe Labs.',
        line2: 'Where Ideas Become Real.',
      },
      heroSubtitle:
        'We bridge generative intelligence, environmental physics, and precision engineering to design sustainable, future-ready realities that serve humanity with dignity.',
      heroCta: 'Discover Our Mission',
      originBadge: 'ORIGIN & CONVICTION',
      originTitle: 'The Pursuit of Tangible Truth',
      originParagraph1:
        'UandWe Labs was established in Bengaluru with a singular mandate: to bridge high-performance computational theory with uncompromising physical precision. In an era dominated by ephemeral software layers, we focus on what endures — deterministic fluid physics, sovereign edge silicon, and non-invasive assistive technology.',
      originParagraph2:
        'Our multi-disciplinary team brings together computational fluid dynamicists, optical sensor architects, and biophilic system designers. We believe that true technological advancement must preserve personal dignity, foster human independence, and honor environmental boundaries.',
      principlesTitle: 'What We Believe In',
      principlesSubtitle: 'Core Engineering Principles',
      principlesIntro:
        'Great products begin with clear thinking, purposeful design, and an uncompromising commitment to getting the details right. At UandWe Labs, we build technology that endures.',
      principles: [
        {
          title: 'Simplicity',
          statement: 'The best solutions make complex things easier to understand and use.',
          elaboration:
            'We strip away the non-essential to reveal clarity. In deep-tech and complex hardware, restraint is the highest form of engineering sophistication.',
        },
        {
          title: 'Purposeful Design',
          statement: 'Every decision should serve a clear purpose, from the first concept to the final experience.',
          elaboration:
            'Design is not decoration. Every millimeter of housing, every optical angle, and every line of code exists to solve a real human and physical problem.',
        },
        {
          title: 'Engineering Excellence',
          statement: 'We value thoughtful engineering, attention to detail, and dependable product development.',
          elaboration:
            'From sub-micron tolerances in optics to zero-drift neural algorithms, we build with aerospace-grade precision and an uncompromising refusal to cut corners.',
        },
        {
          title: 'Built for the Long Term',
          statement: 'We believe products should be designed with reliability, maintainability, and future growth in mind.',
          elaboration:
            'True sustainability means endurance. We engineer modular, upgradeable architectures that outlast disposable consumer cycles and thrive in harsh environments.',
        },
      ],
      divisionsTitle: 'Three Frontiers of Physical Reality',
      divisionsSubtitle: 'Our Core R&D Divisions',
      divisions: [
        {
          tag: 'ENVIRONMENTAL SIMULATION',
          title: 'Ananda GeoSpatial',
          desc: 'Sub-meter solar ray-casting, Lattice Boltzmann fluid dynamics at 60 FPS, and 2D Saint-Venant flood hydrology for resilient masterplans.',
          linkText: 'Explore Ananda Platform',
          target: 'ananda',
          image: '/building-3.jpg',
        },
        {
          tag: 'ASSISTIVE HEALTHCARE',
          title: 'Dara Assistive Health',
          desc: 'Contactless 60 GHz fall radar, multi-language acoustic talking clock, and rise-to-wake torch engineered for elder independence with zero wearables.',
          linkText: 'Explore Dara Hardware',
          target: 'dara',
          image: '/dara_assistive_device.jpg',
        },
        {
          tag: 'PHYSICAL AI SILICON',
          title: 'Aura Autonomous Edge',
          desc: 'Deterministic 128-TOPS neural tensor cores executed in hardware cache. Sub-millisecond multilane highway LPR and 350m perimeter defense with zero cloud egress.',
          linkText: 'Explore Aura Node',
          target: 'aura',
          image: '/hero_compute_board.jpg',
        },
      ],
      lifecycleTitle: 'The Engineering Lifecycle',
      lifecycleSubtitle: 'How first-principles computation transforms into durable physical hardware.',
      lifecycleSteps: [
        {
          num: '01',
          title: 'First-Principles Physics',
          desc: 'Before fabrication begins, every dynamic is modeled with mathematical solvers — from Navier-Stokes fluid aerodynamics to astronomical ephemeris solar ray-casting.',
        },
        {
          num: '02',
          title: 'Sub-Micron Prototyping',
          desc: 'Precision optical benches, CNC-milled structural housings, and 60 GHz millimeter-wave radomes engineered to aerospace tolerances in our Bengaluru labs.',
        },
        {
          num: '03',
          title: 'Deterministic Edge Silicon',
          desc: 'INT8 quantized neural networks executed directly within hardware cache. Sub-millisecond compute without internet connectivity or centralized servers.',
        },
        {
          num: '04',
          title: 'Empirical Field Validation',
          desc: 'Rigorous real-world stress testing across geriatric elder-care living spaces, multilane transit corridors, and microclimate wind corridors.',
        },
      ],
      collectiveTitle: 'The Research Collective',
      collectiveSubtitle: 'Executive leadership, principal scientists, and hardware architects guiding our mission from Bengaluru.',
      collective: [
        {
          name: 'Karthik R. Narayan',
          role: 'Founder & Chief Executive Officer',
          specialty: 'First-Principles Research & Systems Strategy',
          bio: 'Leads UandWe Labs’ long-term research mission across sovereign edge silicon, privacy-first assistive hardware, and planetary-scale physical simulation.',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
          tag: 'FOUNDER & CEO',
          initials: 'KN',
        },
        {
          name: 'Dr. Priya Sundaram',
          role: 'Co-Founder & Head of Assistive Systems',
          specialty: 'Contactless Sensors & Acoustic UX',
          bio: 'Pioneers contactless millimeter-wave micro-doppler radar and multi-language acoustic companions engineered for senior safety without cameras or wearables.',
          image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
          tag: 'CO-FOUNDER',
          initials: 'PS',
        },
        {
          name: 'Devendra Patel',
          role: 'Autonomous Edge Silicon Architect',
          specialty: '128-TOPS NPU & INT8 Cache Cores',
          bio: 'Designs sovereign edge vision nodes. Architect of sub-millisecond highway vehicle analytics and 350-meter air-gapped tactical perimeter mesh networks.',
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
          tag: 'SILICON LEAD',
          initials: 'DP',
        },
        {
          name: 'Maya Lin',
          role: 'Chief Scientific Officer & Principal Architect',
          specialty: 'Large-Scale Numerical Solvers & Ephemeris',
          bio: 'Bridges algorithmic generative geometry with NOAA astronomical climate ephemeris and 2D Saint-Venant flood resilience for masterplans.',
          image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80',
          tag: 'CHIEF SCIENTIST',
          initials: 'ML',
        },
      ],
      perspectivesTitle: 'Peer & Partner Perspectives',
      perspectivesSubtitle: 'Reflections from architects, clinical directors, and infrastructure engineers building with UandWe Labs.',
      perspectives: [
        {
          quote: 'Ananda fundamentally transformed our environmental masterplanning. Computing Lattice Boltzmann wind aerodynamics live in the design room eliminated three-day cloud queues completely.',
          name: 'Sarah Chen',
          role: 'Principal Environmental Architect',
          org: 'Studio Form & Light',
          image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop&q=80',
        },
        {
          quote: 'In elder care, the ethical line is absolute. Dara’s 60 GHz contactless radar delivers sub-300ms fall detection while preserving total human dignity. Zero cameras, zero wearable bracelets.',
          name: 'Dr. Rajesh Shenoy',
          role: 'Director of Geriatric Care',
          org: 'Manipal Health Network',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&auto=format&fit=crop&q=80',
        },
        {
          quote: 'Deploying Aura’s 128-TOPS edge silicon on multi-lane transit corridors gave us sub-millisecond vehicle recognition at 180 km/h with zero external data egress. A masterclass in sovereign engineering.',
          name: 'Marcus Vance',
          role: 'Autonomous Mobility Architect',
          org: 'Apex Infrastructure Group',
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&auto=format&fit=crop&q=80',
        },
      ],
      ctaTitle: 'Ready to Build What Truly Matters?',
      ctaDesc:
        'We are continually expanding our research and engineering benches in Bengaluru. Work alongside fluid aerodynamicists, sensor architects, and computational designers.',
      ctaButton: 'Explore Open Careers',
    },

    // ----------------------------------------------------
    // CAREERS & TALENT BENCH (ENGLISH)
    // ----------------------------------------------------
    careersPage: {
      badge: 'UANDWE RESEARCH LABS · CAREERS & FELLOWSHIP',
      heroTitle: {
        line1: 'Build What Endures.',
        line2: 'Careers at UandWe Labs.',
      },
      heroSubtitle:
        'We are expanding our research and engineering benches in Bengaluru. We bring together curious scientists, hardware craftsmen, and computational engineers building deep technology that truly endures.',
      heroCta: 'Explore Open Positions',
      cultureTitle: 'How We Work',
      cultureSubtitle: 'Principles that shape our culture, our engineering standards, and the way we build together.',
      convictions: [
        {
          num: '01',
          title: 'Curiosity Over Consensus',
          desc: 'The biggest breakthroughs happen when you question established conventions. We encourage bold experiments, challenging assumptions, and following curiosity wherever the data leads.',
        },
        {
          num: '02',
          title: 'High-Trust Autonomy',
          desc: 'We don’t believe in micro-management or endless status meetings. We hire brilliant, driven individuals, give them the best tools, and trust them to make decisions and execute.',
        },
        {
          num: '03',
          title: 'Obsessive Craftsmanship',
          desc: 'Details make the product. From elegant algorithmic architecture to precision physical materials, we hold ourselves to the highest standards of quality and refinement.',
        },
        {
          num: '04',
          title: 'Meaningful Impact',
          desc: 'We dedicate our careers to solving problems that truly matter. Every system we ship is built to improve lives, respect privacy, and leave a positive, enduring mark on the world.',
        },
      ],
      benchesTitle: 'Life Inside UandWe Labs',
      benchesSubtitle: 'Where theoretical physics converges with aerospace-grade fabrication and real-world deployment.',
      lifeBenches: [
        {
          title: 'First-Principles Numerical Solvers',
          desc: 'Engineers continuously profile custom mathematical algorithms, large-scale spatial modeling kernels, and real-time physical simulation engines running on dedicated compute infrastructure.',
          tag: 'COMPUTATIONAL SIMULATION',
          image: '/ananda_hero.jpg',
        },
        {
          title: 'Precision Mechanics & Silicon Bring-Up',
          desc: 'Cross-functional teams design aerospace-grade enclosures, validate low-noise analog signal integrity, and test high-efficiency embedded microcontrollers built to operate for decades.',
          tag: 'RAPID PROTOTYPING & HARDWARE',
          image: '/about_team_brainstorm.jpg',
        },
        {
          title: 'Interdisciplinary Synthesis & Field Validation',
          desc: 'Applied scientists and systems architects collaborate on mathematical models, resilient embedded firmware, and real-world deployment infrastructure with zero cloud dependencies.',
          tag: 'UANDWE LABS BENCHES',
          image: '/about_indian_team_1.jpg',
        },
      ],
      openingsTitle: 'Open Engineering Benches',
      openingsSubtitle: 'Current research and engineering openings across our benches in Bengaluru. Apply directly to our technical desk.',
      categories: {
        all: 'All Benches',
        geospatial: 'GeoSpatial Physics',
        healthcare: 'Assistive Healthcare',
        silicon: 'Edge Silicon & AI',
        systems: 'Systems & Hardware',
      },
      jobs: [
        {
          id: 'cfd-fluid-engineer',
          title: 'Principal CFD & Fluid Dynamics Engineer',
          division: 'Ananda GeoSpatial',
          category: 'geospatial',
          location: 'Bengaluru, India · On-Site',
          type: 'Full-Time',
          exp: '5+ Years / PhD preferred',
          desc: 'Lead the mathematical development of real-time 3D Lattice Boltzmann D3Q19 solvers and 2D Saint-Venant flood equations ported into client-side WebGL compute shaders.',
          skills: ['Lattice Boltzmann Method', 'Navier-Stokes Solvers', 'WebGL Compute Shaders', 'C++ / GLSL', 'Numerical Hydrology'],
          responsibilities: [
            'Develop streaming distribution collision kernels for D3Q19 aerodynamic solvers running at 60 FPS in browser environments.',
            'Optimize sub-meter solar ray-casting pipelines based on NOAA astronomical ephemeris calculations and high-density urban meshes.',
            'Collaborate with global architectural practices to validate aerodynamic comfort and flood detention simulations.',
          ],
          requirements: [
            'Master’s or PhD in Computational Fluid Dynamics, Aerospace Engineering, Applied Mathematics, or equivalent.',
            'Deep expertise in numerical discretization, Navier-Stokes partial differential equations, and GPU-accelerated computing.',
            'Fluency in modern GLSL, WebGL / WebGPU compute pipelines, and high-performance algorithms.',
          ],
        },
        {
          id: 'rf-radar-lead',
          title: 'Millimeter-Wave RF & Radar Systems Lead',
          division: 'Dara Assistive Health',
          category: 'healthcare',
          location: 'Bengaluru, India · On-Site',
          type: 'Full-Time',
          exp: '4+ Years',
          desc: 'Architect our next-generation 60 GHz contactless fall detection radar. Calibrate micro-doppler vital tracking algorithms and oversee RF anechoic chamber certification.',
          skills: ['60 GHz FMCW Radar', 'Micro-Doppler Processing', 'Antenna Array Design', 'Embedded DSP', 'Biometric Signal Processing'],
          responsibilities: [
            'Design and tune 60 GHz FMCW radar transceivers capable of sub-280ms fall detection through steam and obstacles.',
            'Develop machine learning classifiers that distinguish human biomechanical fall signatures from household pets and falling objects.',
            'Direct RF testing, radome dielectric material characterization, and regulatory compliance testing.',
          ],
          requirements: [
            'Degree in Electrical Engineering, RF & Microwave Systems, or Signal Processing.',
            'Hands-on experience with millimeter-wave radar bring-up, vector network analyzers, and FMCW signal pipelines.',
            'Commitment to privacy-first, zero-camera assistive hardware engineering.',
          ],
        },
        {
          id: 'edge-npu-architect',
          title: 'Autonomous Edge Silicon & NPU Architect',
          division: 'Aura Physical AI',
          category: 'silicon',
          location: 'Bengaluru, India · On-Site',
          type: 'Full-Time',
          exp: '5+ Years',
          desc: 'Design deterministic INT8 deep neural inferencing architectures executed directly in on-chip hardware cache for 180 km/h highway LPR and 350m perimeter defense.',
          skills: ['INT8 Quantization', '128-TOPS NPU Pipeline', 'Verilog / SystemVerilog', 'Edge Computer Vision', 'Zero Cloud Egress'],
          responsibilities: [
            'Architect custom neural tensor execution pipelines that eliminate external memory roundtrips and guarantee sub-millisecond per-frame inference.',
            'Implement post-training INT8 quantization algorithms that preserve 99.8% precision for multilane license plate and vehicle classification.',
            'Design low-power thermal mitigation architectures inside passively cooled IP68 aluminum enclosures.',
          ],
          requirements: [
            'Degree in Computer Engineering, Microelectronics, or Computer Science.',
            'Demonstrated track record of deploying deep learning models on specialized edge silicon, FPGA, or NPU platforms.',
            'Proficiency in PyTorch quantization toolkits, ONNX runtimes, and low-level embedded hardware interfaces.',
          ],
        },
        {
          id: 'senior-bioclimatic-architect',
          title: 'Senior Computational & Bioclimatic Architect',
          division: 'Ananda GeoSpatial',
          category: 'geospatial',
          location: 'Bengaluru, India · Hybrid',
          type: 'Full-Time',
          exp: '3+ Years',
          desc: 'Bridge high-density architectural masterplanning with physical environmental simulation. Author algorithms for spatial daylight autonomy and convective courtyard cooling.',
          skills: ['Computational Architecture', 'Biophilic Design', 'Revit / Rhino / Grasshopper', 'Spatial Daylight Autonomy (sDA)', 'Passive HVAC Reduction'],
          responsibilities: [
            'Translate complex bioclimatic and meteorological ephemeris datasets into intuitive visual overlays for architectural teams.',
            'Author generative design algorithms optimizing facade louver angles and building orientations for natural daylight autonomy.',
            'Interface with municipal sustainability councils to establish new benchmarks for passive urban climate resilience.',
          ],
          requirements: [
            'Degree in Architecture, Building Science, or Computational Urban Design.',
            'Extensive experience with Rhino, Grasshopper, Ladybug Tools, and algorithmic geometric design.',
            'Deep passion for sustainable urbanism and reducing active mechanical refrigeration loads.',
          ],
        },
        {
          id: 'embedded-firmware-crypto',
          title: 'Senior Embedded Firmware & Cryptography Engineer',
          division: 'Aura Physical AI',
          category: 'systems',
          location: 'Bengaluru, India · On-Site',
          type: 'Full-Time',
          exp: '4+ Years',
          desc: 'Build air-gapped, anti-tamper firmware and local optical mesh communication protocols for defense and municipal critical infrastructure.',
          skills: ['FIPS 140-2 Level 3', 'Cryptographic Secure Boot', 'Bare-Metal C / Rust', 'FreeRTOS / Zephyr', 'Air-Gapped Mesh'],
          responsibilities: [
            'Implement cryptographic hardware root-of-trust, anti-tamper zeroization triggers, and encrypted local mesh packet protocols.',
            'Develop real-time driver subsystems for sub-1.2ms dry-contact physical barrier gate actuation relays.',
            'Ensure zero remote attack surface and 100% network autonomy during fiber and external telemetry disruptions.',
          ],
          requirements: [
            'Degree in Computer Science, Electrical Engineering, or Cybersecurity.',
            'Extensive experience in low-level C / Rust, microcontroller peripheral drivers (SPI, I2C, UART), and secure hardware enclaves.',
            'Experience with embedded cryptographic standards, secure boot chains, and side-channel attack mitigation.',
          ],
        },
        {
          id: 'acoustic-ux-designer',
          title: 'Acoustic Interaction & Hardware UX Designer',
          division: 'Dara Assistive Health',
          category: 'healthcare',
          location: 'Bengaluru, India · Hybrid',
          type: 'Full-Time',
          exp: '3+ Years',
          desc: 'Design human-centered physical interfaces, natural acoustic frequency curves, and multi-language spoken companions engineered specifically for elderly comfort and clarity.',
          skills: ['Psychoacoustics', 'Elder Universal Design', 'Tactile Industrial UX', 'Multi-Language Audio Cadence', 'Haptic Feedback'],
          responsibilities: [
            'Engineer natural, soothing frequency response curves for built-in acoustic speakers that optimize speech intelligibility for aging ears.',
            'Design intuitive tactile push-to-talk interactions, rise-to-wake motion thresholds, and warm night illumination behaviors.',
            'Direct regional voice recording and phonetic localization across 6 Indian languages for medicine reminders and clock announcements.',
          ],
          requirements: [
            'Degree in Industrial Design, Interaction Design, Human-Computer Interaction, or Acoustic Engineering.',
            'Portfolio demonstrating thoughtful physical hardware interaction, accessibility design, or acoustic products.',
            'Deep empathy for geriatric care and dedication to dignified elder autonomy.',
          ],
        },
      ],
      benefitsTitle: 'The Fellowship Experience',
      benefitsSubtitle: 'What we provide to support foundational research, intellectual sovereignty, and life.',
      benefits: [
        {
          title: 'Uncapped Research Benches',
          desc: 'Direct access to cutting-edge FPGA stations, precision CNC milling, dedicated GPU clusters, and specialized RF anechoic chambers.',
        },
        {
          title: 'Intellectual Sovereignty',
          desc: 'Full co-authorship on patent filings, peer-reviewed technical journal publications, and open-source mathematical solver releases.',
        },
        {
          title: 'Comprehensive Health & Care',
          desc: '100% premium health, dental, and vision insurance for you and your dependents, plus mental wellness and clinical emergency support.',
        },
        {
          title: 'Bengaluru Campus & Relocation',
          desc: 'Comprehensive relocation packages to Bengaluru, ergonomic Herman Miller benches, catered nutritious meals, and high-performance mobile hardware.',
        },
      ],
      spontaneousTitle: 'Don’t See Your Exact Bench?',
      spontaneousDesc: 'We are always looking for exceptional computational physicists, optical sensor designers, and low-level firmware hackers. Reach out directly to our founders.',
      spontaneousButton: 'Send General Technical Inquiry',
      modal: {
        applyTitle: 'Bench Application',
        roleLabel: 'APPLYING FOR:',
        fullName: 'Full Name',
        email: 'Email Address',
        phone: 'Phone / WhatsApp (Optional)',
        portfolio: 'Portfolio / GitHub / LinkedIn URL',
        note: 'Tell us about a technical problem you solved from first principles...',
        submit: 'Submit Application to Engineering Bench',
        submitting: 'Dispatching to Bench...',
        successTitle: 'Application Received',
        successMsg: 'Your dossier has been routed directly to our engineering desk in Bengaluru. We review all technical submissions within 48 hours.',
        bookingRef: 'APPLICATION REF · ',
        close: 'Done / Close',
      },
    },
  },

  // ======================================================
  // CHINESE TRANSLATIONS (SIMPLIFIED CHINESE · 简体中文)
  // ======================================================
  'zh-cn': {
    // ----------------------------------------------------
    // HEADER & NAVIGATION
    // ----------------------------------------------------
    header: {
      products: '产品',
      solutions: '解决方案',
      blogs: '博客',
      aboutUs: '关于我们',
      careers: '招贤纳士',
      searchPlaceholder: '搜索产品、物理仿真、智能系统...',
      selectRegionLang: '选择地区与语言',
      signIn: '登录',
      signOut: '退出登录',
      signInToAccount: '登录个人账户',
      signInAnanda: '登录 Ananda 平台',
      emailGoogleSignIn: '邮箱与 Google 账号登录',
      anandaCommercialResidency: '商业级与住宅级',
      commercial: '商业级',
      commercialPlatform: '商业规划平台',
      residency: '住宅级',
      residencyPlatform: '人居微气候平台',
      enterCommercial: '进入商业平台',
      enterResidency: '进入住宅平台',
      commercialDesc: '亚米级太阳光线投射、空气动力学风场CFD计算及城市级洪涝水动力学。',
      residencyDesc: '建筑被动式穿堂风通风、采光自主率及高端私宅微气候舒适度模拟。',
      anandaCategoryLabel: '城市微气候与流体力学',
      physicalAi: '物理AI',
      physicalAiLabel: '边缘自主机器视觉',
      healthcare: '医疗健康',
      healthcareLabel: '长者无感雷达跌倒监测',
      auraTitle: 'Aura',
      auraSubtitle: '边缘自主视觉与 128-TOPS 神经硅片',
      auraDesc: '硬件缓存级INT8量化神经推理。支持180 km/h多车道高速卡口毫秒级识别及350米周界警戒，零云端依赖。',
      exploreAura: '探索 Aura 硬件节点',
      daraTitle: 'Dara',
      daraSubtitle: '长者自主尊严与跌倒雷达监测系统',
      daraDesc: '保障长者居家安全与独立生活的智能辅助设备。搭载60 GHz非接触雷达、多语言语音播报钟及起身夜灯。',
      exploreDara: '探索 Dara 智能辅具平台',
      solutionsEnterpriseHeading: '政企与市政级工程交付',
      exploreCapabilities: '查看全部技术能力',
      navigation: '导航菜单',
      regionLanguage: '地区与语言',
      solutions: [
        {
          id: 'environmental-simulation',
          title: '环境物理工程',
          subtitle: '微气候与流体力学',
          description: '预测性太阳辐射、空气动力学CFD风场与洪涝风险评估。',
          tag: '环境物理',
          pills: ['太阳辐射模拟', 'CFD流场计算'],
        },
        {
          id: 'healthcare-assistive-ai',
          title: '辅助医疗看护',
          subtitle: '长者自主与安全',
          description: '300毫秒级非接触跌倒告警与处方光学放大，零穿戴束缚。',
          tag: '辅助医疗',
          pills: ['非接触雷达', '零穿戴束缚'],
        },
        {
          id: 'physical-ai-vision',
          title: '边缘机器视觉',
          subtitle: '周界防护与高速识别',
          description: '多车道高速卡口毫秒级车牌识别及350米周界警戒，本地张量计算。',
          tag: '自主感知',
          pills: ['边缘张量芯片', '350米警戒网'],
        },
      ],
    },

    // ----------------------------------------------------
    // HERO CAROUSEL
    // ----------------------------------------------------
    hero: {
      slides: [
        {
          category: '设计与工程创新',
          headline: '构想，理应化为现实。',
          tagline: '将远大构想转化为切实产品',
          subtitle: '通过目的明确的设计理念与尖端工程技术，将雄心勃勃的构想淬炼为触手可及的卓越产品。',
          ctaText: '探索我们的使命',
        },
        {
          category: '精密系统架构',
          headline: '超乎所见，深藏不露。',
          tagline: '高精度与前沿智能系统',
          subtitle: '在每一件令人惊叹的产品背后，都蕴藏着微米级精密仪器、端侧智能算法与驱动其运转的深厚工程底蕴。',
          ctaText: '浏览核心产品',
        },
        {
          category: '未来技术平台',
          headline: '未来，始于今日所造。',
          tagline: '目的明确的革新技术',
          subtitle: '我们打造目标明确的革新技术，专为攻克真实世界的严苛挑战，开启人居与智能感知的全新可能。',
          ctaText: '查看实验室研发能力',
        },
      ],
    },

    // ----------------------------------------------------
    // WHAT WE BELIEVE IN
    // ----------------------------------------------------
    beliefs: {
      title1: '我们所',
      title2: '坚守的信仰',
      subtitle: '核心工程原则',
      intro: '卓越的产品始于明晰的逻辑思维、目的明确的设计构思，以及对打磨每一个细节的不妥协追求。在 UandWe Labs，我们打造能够经受时间洗礼的长久技术。',
      principles: [
        {
          title: '大道至简',
          statement: '最佳的解决方案，在于化繁为简，让复杂技术变得清晰易懂、自然易用。',
          elaboration: '我们剥离一切冗余，以呈现本质的纯粹。在深科技与精密硬件领域，克制与精简是最高阶的工程智慧。',
        },
        {
          title: '使命所向的设计',
          statement: '从最初的灵感雏形到最终的交互体验，每一个决策都必须服务于明确的目的。',
          elaboration: '设计绝非表面的装饰。外壳的每一毫米公差、镜头的每一个光学角度、底层的每一行算法，皆为解决真实的物理与人类问题而生。',
        },
        {
          title: '精益求精的工程标准',
          statement: '我们崇尚深思熟虑的严密工程、细致入微的工艺打磨与安全可靠的产品开发。',
          elaboration: '从光学微米级超精加工到零漂移神经算力，我们以严谨的航天级标准开发系统，坚决拒绝任何偷工减料。',
        },
        {
          title: '立足长远的持久韧性',
          statement: '我们坚信产品必须在设计之初就融入高可靠性、易维护性与面向未来的延展生命力。',
          elaboration: '真正的可持续性在于经久耐用。我们构建模块化、可迭代升级的系统架构，超越一次性消费主义浪潮，在严苛环境中历久弥新。',
        },
      ],
    },

    // ----------------------------------------------------
    // GEOSPATIAL (ANANDA) SHOWCASE
    // ----------------------------------------------------
    geospatial: {
      title: 'Ananda',
      subtitle: '城市微气候与空间物理',
      description: '面向城市地标、商业园区及大型综合体，提供行星级太阳光线投射、空气动力学CFD风场与洪涝水动力学高保真仿真引擎。',
      buttonText: '探索 ANANDA',
      slides: [
        {
          title: '城市日照与阴影分析',
          subtitle: '太阳光线投射与昼夜光照动态',
          meta: [
            { label: '计算速率', value: '60 FPS 实时光线投射' },
            { label: '日照准确度', value: '99.4%' },
            { label: '空间分辨率', value: '亚米级空间网格' },
          ],
        },
        {
          title: '微气候流场CFD模拟',
          subtitle: '空气动力学CFD与微气候环境',
          meta: [
            { label: 'CFD算法', value: 'GPU加速LBM求解器' },
            { label: '网格节点数', value: '280万网格节点' },
            { label: '风向维度', value: '360°全向风场分析' },
          ],
        },
        {
          title: '城市洪涝与水文弹性分析',
          subtitle: '水文径流模拟与防洪韧性设计',
          meta: [
            { label: '流体动力学方程', value: '二维圣维南方程组' },
            { label: '暴雨情景预设', value: '百年一遇峰值降雨' },
            { label: '地貌高程数据', value: '激光雷达DEM数字高程' },
          ],
        },
      ],
    },

    // ----------------------------------------------------
    // HEALTHCARE (DARA) SHOWCASE
    // ----------------------------------------------------
    healthcare: {
      title: 'Dara',
      subtitle: '长者尊严辅助医疗硬件',
      description: '专为银发长者打造的智能辅助生活设备——集多语种语音报时钟、光学处方放大镜、感应夜行手电筒、起身感应唤醒与自动跌倒紧急救援报警于一体。',
      buttonText: '探索 DARA',
      slides: [
        {
          title: '语音报时钟与光学放大镜',
          subtitle: '多语种语音报时与药盒说明放大',
          meta: [
            { label: '时间播报', value: '多语种语音清晰播报' },
            { label: '放大透镜', value: '4.5倍高清药瓶阅读镜' },
            { label: '扬声系统', value: '实体触感一键对讲' },
          ],
        },
        {
          title: '无感跌倒监测与紧急呼救',
          subtitle: '自动撞击感应与秒级告警下发',
          meta: [
            { label: '跌倒监测', value: '60GHz微多普勒雷达' },
            { label: '紧急告警', value: '毫秒级自动SOS多方广播' },
            { label: '监护联动', value: '家属与看护端即时推送' },
          ],
        },
        {
          title: '夜行手电筒与起夜唤醒屏',
          subtitle: '夜间安全照明与拿起自动点亮',
          meta: [
            { label: '夜间夜行灯', value: '柔和防眩夜间照明' },
            { label: '拿起唤醒', value: '动作传感即时点亮' },
            { label: '屏幕视效', value: '高对比度广角大字屏' },
          ],
        },
      ],
    },

    // ----------------------------------------------------
    // PHYSICAL AI (AURA) SHOWCASE
    // ----------------------------------------------------
    board: {
      title: 'Aura',
      subtitle: '物理AI与边缘自主视觉',
      description: '搭载128-TOPS神经张量算力的边缘自主摄像机与车辆智能分析系统——提供零云端依赖的超低延迟实时识别、周界防御与主动预警。',
      buttonText: '探索 AURA',
      slides: [
        {
          title: 'AURA LPR 智能车牌识别',
          subtitle: '基于边缘AI的高速全天候车牌与车型辨识',
          meta: [
            { label: '识别能力', value: '车牌、品牌及车型分类' },
            { label: '抓拍车速', value: '180 km/h多车道抓拍' },
            { label: '边缘延迟', value: '< 1.2 毫秒本地计算' },
          ],
        },
        {
          title: 'AURA VISION 全光谱摄像机',
          subtitle: '集成128-TOPS边缘算力的全实时AI监测摄像机',
          meta: [
            { label: '神经网络算力', value: '128 TOPS 定制张量算力' },
            { label: '光学传感器', value: '4K多光谱超微光传感器' },
            { label: '目标检测', value: '全场景端侧实时推断' },
          ],
        },
        {
          title: 'AURA SENTINEL 哨兵组网',
          subtitle: '分布式多目周界组网与可疑目标连续追踪',
          meta: [
            { label: '监控模式', value: '无中心边缘分布式网状互联' },
            { label: '态势预警', value: '越界入侵与可疑轨迹预警' },
            { label: '周界纵深', value: '350米零漂移防区覆盖' },
          ],
        },
      ],
    },

    // ----------------------------------------------------
    // CAREERS (GROW WITH US)
    // ----------------------------------------------------
    careers: {
      headline: '虚位以待 · 共同成长',
      statement: '好奇的心灵。大胆的构想。意义深远的创造。让我们携手，铸就科技的下一个篇章。',
      buttonText: '探索开放职位',
    },

    // ----------------------------------------------------
    // FOOTER
    // ----------------------------------------------------
    footer: {
      description: '我们融合生成式智能、环境物理仿真与高精尖工程制造，致力于构建可持续、面向未来的真实世界。',
      aboutUsCol: '关于我们',
      productsCol: '核心产品',
      links: {
        aboutUs: '关于我们',
        careers: '加入我们',
        techBlog: '技术专栏',
        partners: '生态伙伴',
        ananda: 'Ananda (环境物理)',
        dara: 'Dara (辅助医疗)',
        aura: 'Aura (物理AI)',
      },
      legal: {
        privacy: '隐私权保护',
        terms: '服务协议',
        security: '安全白皮书',
      },
      copyright: '© 2026 uandwelabs. 保留所有权利。',
    },

    // ----------------------------------------------------
    // ANANDA PAGE (GEOSPATIAL & ARCHITECTURAL SIMULATION · 中文)
    // ----------------------------------------------------
    anandaPage: {
      heroCommercialSlides: [
        {
          id: 'exoskeleton',
          title: '空气动力学流体单体建筑',
          desc: '宏伟的流体结构外骨骼与高性能建筑玻璃幕墙系统',
        },
        {
          id: 'skybridge',
          title: '双子商业塔楼与悬挑天桥',
          desc: '通过高空空气动力学悬挑玻璃连桥相连接的双子商业综合塔楼',
        },
        {
          id: 'waterfront',
          title: '滨海商业地标塔楼',
          desc: '海洋性城市片区格网玻尔兹曼边界层气流模拟与精准太阳光线投射',
        },
        {
          id: 'cantilever',
          title: '高密度建筑结构围护系统',
          desc: '面向大型商业综合体总体规划的实时城市形态与微气候CFD流场建模',
        },
      ],
      heroResidentialSlides: [
        {
          id: 'residential_sunset_villa',
          title: '半山生态私享独栋',
          desc: '室内外一体化下沉壁炉休闲会客厅与悬挑原木深挑檐设计',
        },
        {
          id: 'residential_estate_pool',
          title: '高端奢华私宅庄园',
          desc: '通高落地玻璃展厅连通无边界镜面水景与私密内院空间',
        },
        {
          id: 'residential_zen_courtyard',
          title: '亲生物自然禅意庭院',
          desc: '镜面水池与日本红枫点缀的自然对流通风格栅推拉门系统',
        },
      ],
      heroDefaultTitle: '当建筑艺术遇见严谨物理',
      heroCommercialFallbackDesc: '亚米级太阳光线投射计算、格网玻尔兹曼气流风场及二维圣维南洪涝水动力学模拟。',
      heroResidentialFallbackDesc: '面向私人独栋与庄园的实时被动式穿堂风通风、采光自主率及微气候热舒适度分析。',
      scheduleSimulation: '预约物理仿真咨询',

      coreTitle: '创新的建筑物理架构',
      features: [
        {
          title: '昼夜全周期太阳光线投射',
          desc: '基于NOAA天文星历表与周边城市三维形态的亚米级太阳方位角及高度角计算，60 FPS毫秒级响应，无需漫长渲染排队。',
        },
        {
          title: 'LBM空气动力学风场求解器',
          desc: '采用格子玻尔兹曼方法（LBM）计算三维气流流线、拐角气流脱落涡及行人高度舒适度与安全准则，数分钟内完成求解。',
        },
        {
          title: '二维圣维南浅水地表水文学',
          desc: '基于高精度LiDAR数字高程模型（DEM）求解二维浅水微分方程，为应对百年一遇特大暴雨提供气候韧性规划。',
        },
        {
          title: '被动式穿堂风气流走廊',
          desc: '窗对窗穿堂风流通分析与中庭对流气压差计算，实现真正的零能耗自然对流降温。',
        },
        {
          title: '采光自主率与智能遮阳防眩',
          desc: '精确计算空间采光自主率（sDA）与年眩光暴露率（ASE），在最大化保留全景视野的同时优化外部百叶遮阳。',
        },
        {
          title: '原生BIM与激光点云无缝导入',
          desc: '即刻解析导入Revit IFC模型、Rhino复杂几何曲面及三维GeoTIFF地理栅格，实现零坐标转换摩擦。',
        },
      ],

      commercialScale: '商业综合级',
      residentialLiving: '人居微环境',
      toggleScaleAria: '切换商业或住宅尺度',
      dualityCommercial: {
        card1: '高密建筑围护太阳光线投射',
        card2: '城市级空气动力学风场流线',
        card3: '二维暴雨地表径流水动力学汇水盆地',
      },
      dualityResidential: {
        card1: '高端独栋自然采光与庭院微气候',
        card2: '被动对流穿堂风走廊',
        card3: '林冠树荫自然遮阳降温走廊',
      },

      perspectivesTitle: '建筑大师与工程师洞见',
      testimonials: [
        {
          name: '陈思涵 (Sarah Chen)',
          role: '首席环境物理建筑师',
          studio: '形态与光影建筑事务所',
          quote: 'Ananda 在50层建筑围护上为我们提供了即时的GPU光线追踪。我们不再需要等待三天的CFD渲染；在方案评审室里，我们就能和客户现场实时测试风涡脱落。',
        },
        {
          name: '朴大卫 (David Park)',
          role: '总规规划总监',
          studio: '城市矩阵实验室',
          quote: '水动力学二维圣维南求解器精准测算出了暴雨滞洪区，刚好就在我们原规划的地下车库入口处。它为项目节省了数百万的补救开销，避免了极度昂贵的二次返工。',
        },
        {
          name: '埃莱娜·罗德里格斯 (Elena Rodriguez)',
          role: '可持续人居私宅设计师',
          studio: '生命栖居设计事务所',
          quote: '借助 Ananda 的穿堂风通风模拟设计私家独栋，使我们能够完全取消起居庭院中的机械空调。热舒适度纯属自然，客户对这种能源独立性赞不绝口。',
        },
      ],

      caseStudiesTitle: '基于 Ananda 构建的地标项目',
      caseStudies: [
        {
          id: 1,
          title: '东京滨海超高层地标塔',
          desc: '东京湾区空气动力学气流脱落涡与行人层风舒适度空间映射。',
        },
        {
          id: 2,
          title: '苏黎世高山悬挑综合体',
          desc: '瑞士阿尔卑斯山脊亚零度强风涡加速与被动式太阳能储热保温。',
        },
        {
          id: 3,
          title: '新加坡滨海湾遮阳天幕',
          desc: '热带展馆生物气候天幕太阳光线漫射过滤与自然热压拔风降温。',
        },
        {
          id: 4,
          title: '日内瓦湖畔日光反射展馆',
          desc: '通过Low-E中空镀膜玻璃围护被动吸收太阳能，融合水面蒸发微气候调节。',
        },
        {
          id: 5,
          title: '京都院落天窗自然采光井',
          desc: '利用高侧天窗几何形体，实现私人起居空间全年零能耗自然采光自主。',
        },
        {
          id: 6,
          title: '加州海岸被动对流风道住宅',
          desc: '窗对窗被动对流穿堂风气流走廊，降低建筑主动空调能耗达42%。',
        },
        {
          id: 7,
          title: '大都会枢纽综合交通总规',
          desc: '在浇筑第一方混凝土前，针对百亩城市片区完成全尺度物理收敛与边界层风洞数值建模。',
        },
      ],

      ctaTitle: '准备好塑造未来的人居与城市了吗？',
      ctaDesc: '立即与我们的工程专家团队携手，在您的下一座建筑地标中部署GPU光线投射、空气动力学CFD流场与洪水动力学模拟。',
      ctaButton: '预约物理仿真技术咨询',

      modal: {
        formTitle: '预约物理仿真技术咨询',
        close: '关闭',
        fullNameLabel: '姓名',
        fullNamePlaceholder: '您的全名',
        emailLabel: '工作邮箱',
        emailPlaceholder: '您的邮箱@domain.com',
        practiceLabel: '设计院 / 事务所 / 机构',
        practicePlaceholder: '事务所或机构名称',
        scaleLabel: '规划尺度',
        commercialScale: '商业综合级',
        residentialScale: '高端住宅级',
        bothScale: '大型市政 / 综合规划',
        siteCoordinatesLabel: '地块经纬度坐标 (纬度 / 经度)',
        gpsLocked: 'GPS 定位已锁定',
        acquiringFix: '正在捕获卫星信号...',
        latPlaceholder: '纬度 (如 12.971599)',
        lngPlaceholder: '经度 (如 77.594566)',
        detectLocation: '获取当前地理位置',
        acquiringSatellite: '正在捕获高精度卫星定位...',
        locationDenied: '浏览器未授予位置访问权限。您可以在上方手动输入经纬度坐标。',
        submitForm: '提交物理仿真咨询预约',

        scheduleTitle: '确认预约时间',
        scheduleSubtitle: '请选择适合您进行工程技术评审的日期与时段',
        backToForm: '返回表单',
        siteCoordsLabel: '地块坐标：',
        scaleSuffix: '尺度',
        selectSlot: '选择技术会商时段',
        selectDate: '选择日期',
        dates: ['今天, 10月28日', '明天, 10月29日', '周五, 10月30日'],
        selectTime: '选择具体时间',
        confirmSchedule: '确认预约本次会商',

        agentBridgeHeader: '专家直连终端 // 会议号 #UWE-GEO-8492',
        agentBridgeSubtitle: 'WEBRTC AES-256 加密端到端仿真流',
        closeRoom: '关闭会议室',
        siteTelemetryHud: '现场遥测平显 //',
        telemetryStats: 'FPS: 60.0 BVH 光线追踪 | LBM 风场 D3Q19',
        engineerName: 'Dr. Aris Vance',
        engineerRole: '首席地理空间物理专家',
        architectDefaultName: '建筑师',
        you: '您',
        cameraOff: '摄像头已关闭',
        liveVideo: '实时视频',
        unmute: '取消静音',
        mute: '静音',
        startVideo: '开启视频',
        stopVideo: '关闭视频',
        shareModel: '共享3D模型',
        sharingBim: '正在共享BIM',
        leaveRoom: '退出会议',
        engineerSpokenQuote: '"已载入目标地块 {lat}° N, {lng}° E 的LiDAR数字高程模型。正在初始化全天候360度日照暴露度与微气候风速加速矢量场..."',

        confirmedTitle: '咨询预约已确认',
        bookingRef: '预约凭证 // #UWE-GEO-8492',
        assignedEngineerLabel: '指派负责专家：',
        dateTimeLabel: '会商时间：',
        at: '于',
        siteCoordsConfirmedLabel: '目标地块坐标：',
        clientLabel: '客户代表：',
        secureWebRtcLink: '加密 WebRTC 专线链接',
        copy: '复制',
        copied: '已复制',
        connectNow: '立即进入专家会商室 (提前通道)',
        addToCalendar: '添加至 GOOGLE 日历',
        doneClose: '完成 / 关闭',
      },
    },

    // ----------------------------------------------------
    // DARA PAGE (ASSISTIVE HEALTHCARE & SENIOR CARE · 中文)
    // ----------------------------------------------------
    daraPage: {
      heroTitle: {
        line1: '长者关怀与尊严。',
        line2: '大巧无形，润物无声。',
      },
      heroDesc: '守护居家老人安全与独立自主的智能辅助终端。集语音报时时钟、夜间应急手电与毫米波跌倒主动检测于一体——零摄像头入侵，零穿戴束缚。',
      heroButtonText: '预约临床试点评估',

      clockSectionTitle: '多语种语音报时钟与内置扬声器',
      clockSectionDesc: '在高对比度屏幕上清晰显示当前时间。轻按实体按键，即可通过内置声学扬声器以多种母语方言清晰朗读当前精准时间。',
      liveClockLabel: '实时时钟：',
      pressToAnnounce: '轻按语音播报当前时间',
      timeAnnouncementPrefix: '当前时间是 ',
      stopVoice: '停止语音',
      playVoice: '试听服药提醒语音',

      gallery: [
        {
          title: '60 GHz 非接触式空间跌倒雷达',
          desc: '穿透隔墙与浴室淋浴帘实现全天候无死角跌倒检测，完全无需摄像头。',
        },
        {
          title: '内置下射照明手电与拿起即亮',
          desc: '拿起设备瞬间自动点亮时钟荧幕并照亮脚下地面，守护夜间安全起夜。',
        },
      ],

      architectureTitle: '长者自主独立生活的硬件架构',
      features: [
        {
          title: '语音报时时钟与多语种亲情播报',
          desc: '采用高对比度清晰数字显影，轻触按键即可通过内置高保真扬声器多语种清晰大声播报时间。',
        },
        {
          title: '内置定向护眼手电',
          desc: '集成向下聚焦漫反射光束，专为长者在暗室、走廊及夜间行走设计，无需在黑暗中摸索墙壁开关。',
        },
        {
          title: '光学放大镜辅助阅读',
          desc: '集成精密光学放大镜，帮助长者轻松看清小字说明书、药品包装、处方剂量及日常微小物件。',
        },
        {
          title: '拿起即亮感应屏',
          desc: '高灵敏固态姿态传感器，长者从桌面或磁吸底座拿起设备瞬间即刻柔和点亮屏幕。',
        },
        {
          title: '跌倒主动识别与紧急报警',
          desc: '全屋毫米波主动感知长者姿态突变，发生跌倒立即向监护人发送求助告警，无需任何穿戴设备或摄像头。',
        },
        {
          title: '100% 视觉尊严保护与超长续航',
          desc: '硬件级杜绝摄像头以守护老人绝对隐私尊严；配备磁吸无线底座，单次充满支持30天脱机超长续航。',
        },
      ],

      pillarsTitle: {
        line1: '以人为本。',
        line2: '围绕长者真实需求设计。',
      },
      pillars: [
        {
          title: '极简交互',
          tagline: '科技应当如空气般自然无感。',
          desc: '零复杂网络配置，无需智能手机，绝无繁复层级菜单。每一次触控都是最直接、符合直觉的自然交互。',
        },
        {
          title: '全龄无碍',
          tagline: '专门针对长者生理感知退化定制。',
          desc: '针对老龄视力减退、手指触觉灵敏度降低及多语种方言深度定制。大字号高对比与清晰人声消除一切数字鸿沟。',
        },
        {
          title: '温润舒适',
          tagline: '让每一次日常互动都倍感亲切。',
          desc: '柔和无眩光的夜间防跌地灯，辅以温和安心的人性化语音，守护宁静安详的家庭生活而不受刺耳警报惊扰。',
        },
        {
          title: '独立自主',
          tagline: '重塑长者在居家生活中的自信。',
          desc: '赋予老人在自己熟悉的私密空间中安全自主生活的尊严，在无被监视感的前提下获得坚实可靠的紧急安全兜底。',
        },
      ],

      darkCanvasTitle: {
        line1: '您的私属空间。您的尊严隐私。',
        line2: '您的自主独立。',
      },
      darkCards: [
        {
          title: '私密生活空间绝不应受到窥视。',
          desc: '卧室与浴室等私人圣地必须保持绝对的隐私。科技应当在静默的后台默默护佑长者安康，绝不在私密起居环境中引入任何摄像头监控或视觉巡检。',
        },
        {
          title: '科技应赋能自主，而非施加控制。',
          desc: '真正的辅助设计旨在赋予长者自立能力，而非施加繁琐束缚。Dara 宛如一个贴心的沉默伴侣，不打扰老人的生活节奏，无需冰冷的临床式管制。',
        },
        {
          title: '每一次关怀都应温暖而自然。',
          desc: '援助应当如同亲人般体贴，而非令人惊慌失措的警报鸣响或机械冰冷的仪器监控。从舒缓的语调到温柔的夜光，处处体现对长者的尊重与关怀。',
        },
      ],

      purpose: {
        line1: '因尊严而铸。',
        line2: '为独立自主而生。',
        description: '专为居家老人量身打造的辅助智能终端，兼具安全、舒适与自立——零穿戴、零摄像头，带给全家人由衷的踏实与心安。',
      },

      cta: {
        title: '让体面与尊严走进每一个居所',
        subtitle: '预约一台临床评估原型机，或与我们在班加罗尔的老年康养硬件工程专家团队进行技术会商。',
        buttonText: '申请临床试点评估',
      },

      modal: {
        title: 'Dara 临床试点评估技术咨询',
        formTitle: '预约试点原型硬件',
        formSubtitle: '填写部署要求，以便在您的机构或家庭环境中评估试点机型。',
        scopeLabel: '应用照护场景',
        scopeOptions: [
          { value: 'home', label: '私人住宅 / 长者居家自理' },
          { value: 'assisted', label: '长者持续照料社区 (CCRC)' },
          { value: 'memory', label: '记忆障碍与失智照护中心' },
          { value: 'hospital', label: '老年康复医院 / 临床病房' },
        ],
        notesPlaceholder: '请输入具体临床或建筑无障碍改造要求...',
        departmentTitle: 'Dara 老年康养硬件工程研发台',
        departmentSubtitle: '临床评估与应用咨询团队 · 班加罗尔',
      },
    },

    // ----------------------------------------------------
    // AURA PAGE (PHYSICAL AI & HARDENED EDGE SILICON · 中文)
    // ----------------------------------------------------
    auraPage: {
      heroTitle: {
        line1: '物理AI终端。',
        line2: '端侧算力芯片。',
      },
      heroDesc: '在加固型光学感知节点内直接运行确定性 128-TOPS 神经网络推理。亚毫秒级车辆高速捕获与周界警戒，零云端回传延迟。',
      heroButtonText: '预约节点原型评估',

      gallery: [
        {
          title: '多车道高速公路车牌毫秒级识别',
          desc: '支持高达 180 km/h 极速下的实时车牌字符与车型精确提取，时延低于亚毫秒。',
        },
        {
          title: '350米周界协同感知网格',
          desc: '多机空间目标无缝接力接管，跨越 350 米周界全纵深零盲区追踪移动矢量。',
        },
      ],

      architectureTitle: '端侧自主物理AI芯片架构',
      features: [
        {
          title: '高速车牌识别与全维车辆结构化分析',
          desc: '在 0.8 毫秒内完成跨多车道的高清车牌识别、车型分类与车速测算，准确率达 99.8%。',
        },
        {
          title: '128-TOPS 板载嵌入式 NPU 核心',
          desc: '在片上硬件缓存内直接执行 INT8 量化深度神经网络推理。原始视频流永不离开传感器节点，消除云端传输带宽与延迟。',
        },
        {
          title: '350米协同警戒网格网络',
          desc: '多节点自主时空接力，实现长达 350 米警戒线的人车矢量零盲区追踪与侵入轨迹前瞻预测。',
        },
        {
          title: '亚毫秒物理干触点联动继电器',
          desc: '集成直接干接点继电器输出，在 1.2 毫秒内瞬间联动道闸、强光频闪与周界电子联动锁——快于人体神经反射速度。',
        },
        {
          title: 'FIPS 140-2 三级硬件装甲级密码学',
          desc: '配备硬件信任根、安全引导与物理防拆自动清零擦除电路，全面防护核心机密凭证与态势元数据。',
        },
        {
          title: '100% 物理隔离局域网完全自主',
          desc: '无需接入任何外部互联网或公有云。零重复性网络宽带费用，绝无遥测数据外泄，光纤切断时依然稳定自主运行。',
        },
      ],

      pillarsTitle: {
        line1: '精工细作。',
        line2: '为关键防务与高严苛使命而造。',
      },
      pillars: [
        {
          title: '极致时延',
          tagline: '亚毫秒级瞬间物理响应。',
          desc: '从光子击中 CMOS 感光面到触发物理干接点道闸仅需 1.2 毫秒——端侧感知执行速度超越人类视觉神经反射。',
        },
        {
          title: '确定性精度',
          tagline: '99.8% 确定性极高准确率。',
          desc: '深层张量卷积网络彻底剔除阴影、雨雪浓雾及车灯眩光干扰，在极暗低照度下依然覆盖四车道精准识别。',
        },
        {
          title: '坚固韧性',
          tagline: '为极寒酷暑恶劣工业环境加固。',
          desc: 'IP68 防水防尘与 IK10 防爆圆顶，航空级 6061-T6 挤压铝合金外壳，-40°C 至 +75°C 全被动散热，无机械风扇磨损。',
        },
        {
          title: '数据主权',
          tagline: '100% 掌控自有数据与模型主权。',
          desc: '100% 本地闭环运行。所有视频帧与检测结果绝对驻留本地节点，杜绝任何第三方云订阅依赖与隐私合规风险。',
        },
      ],

      darkCanvasTitle: {
        line1: '零公有云依赖。',
        line2: '绝对主权掌控。',
      },
      darkCards: [
        {
          title: '原始视频流绝不离开摄像机芯片。',
          desc: '与在公网传输未经加密视频的传统云监控不同，Aura 在本地芯片上处理全部图像帧，仅有验证后的轻量结构化元数据与警报流出硬件。',
        },
        {
          title: '面对网络断连拥有零脆弱性。',
          desc: '周界安全防护绝不能受制于互联网可用性。光缆切断、电磁压制或运营商网络瘫痪对 Aura 的自主周界防御零影响。',
        },
        {
          title: '零重复性算力与宽带订阅成本。',
          desc: '彻底告别高昂的云端 GPU 订阅费。Aura 是属于您的永久芯片硬件资产，以零持续月费提供不间断的高吞吐量端侧机器视觉推理。',
        },
      ],

      purpose: {
        line1: '为可靠性而筑。',
        line2: '为边缘端而生。',
        description: '关键物理基础设施必须依赖即时、确定性的敏锐感知。Aura 在事件发生的第一线执行边缘深度智能——完全自主，完全私密。',
      },

      cta: {
        title: '在您的周界部署端侧物理AI算力芯片',
        subtitle: '预约一套测试套件，或与我们在班加罗尔的硬件工程团队进行端侧架构评审。',
        buttonText: '申请技术架构试点',
      },

      modal: {
        title: 'Aura 端侧芯片试点技术咨询',
        formTitle: '预约试点硬件节点',
        formSubtitle: '填写周界部署要求，以申请评估 Aura 128-TOPS 边缘计算节点。',
        scopeLabel: '使命与部署场景',
        scopeOptions: [
          { value: 'highway', label: '高等级交通主干线高速车牌识别' },
          { value: 'perimeter', label: '350米关键基础设施重要周界防护' },
          { value: 'logistics', label: '大型工业仓储与物流枢纽安全警戒' },
          { value: 'campus', label: '高安保等级企业与园区总部基地' },
        ],
        notesPlaceholder: '例如：10个走廊节点、ONVIF Profile S/T协议兼容性、干接点联动继电器...',
        departmentTitle: 'Aura 端侧物理AI芯片运营中心',
        departmentSubtitle: '防务与智慧高速架构工程组',
      },
    },

    // ----------------------------------------------------
    // SHARED PRODUCT CONSULT MODAL LABELS · 中文
    // ----------------------------------------------------
    productModal: {
      yourName: '您的姓名',
      emailAddress: '电子邮箱',
      facilityPractice: '机构 / 单位名称',
      deploymentNotes: '部署需求备注',
      proceedToSchedule: '下一步：进入专家时间预约',
      scheduleReviewTitle: '预约实时技术评审会商',
      scheduleReviewDesc: '与我们位于班加罗尔的硬件工程专家团队进行 1 对 1 深度交流。',
      selectDate: '选择日期',
      selectTime: '选择时间 (IST / UTC+5:30)',
      dates: ['明天, 11月4日', '周三, 11月5日', '周四, 11月6日'],
      back: '返回',
      connectDesk: '连线临床工程咨询台',
      connectDeskTech: '连线芯片架构工程台',
      secureWebRtc: '加密 WEBRTC 连线通道',
      endSession: '结束会话',
      copy: '复制',
      copied: '已复制',
      confirmedTitle: '咨询预约已确认',
      confirmationMessage: '感谢您，{name}。您预约的会商已登记（时间：{date} {time}）。邀请函与会商链接已发送至您的邮箱：{email}。',
      closeWindow: '关闭窗口',
    },

    // ----------------------------------------------------
    // BLOGS & TECHNICAL PERSPECTIVES (中文)
    // ----------------------------------------------------
    blogsPage: {
      badge: 'UANDWE 实验室 · 思考与观察',
      volumeTag: '第 04 卷 · 2026 年度特辑',
      heroTitle: {
        line1: '探索与实践：',
        line2: '灵感在此化为现实。',
      },
      heroSubtitle:
        '汇聚空间物理、边缘芯片与长者科技的深度研发手记与工程洞察，由 UandWe Labs 核心团队直接呈现。',
      heroButtonText: '浏览精选文章',
      flagshipTitle: '创新的工程架构',
      allArticlesTitle: '精选文章与深度观察',
      featuredBadge: '旗舰技术专论',
      searchPlaceholder: '搜索技术文章、主题或研发专家...',
      allFilter: '全部专栏文章',
      categories: {
        all: '全部学术与技术出版物',
        geospatial: '城市物理与流体力学',
        healthcare: '辅助医疗与长者科技',
        physicalAi: '边缘物理AI与机器视觉',
      },
      readTimeLabel: '分钟阅读',
      readArticle: '阅读完整技术论述',
      readShort: '阅读论文',
      filterCount: '已收录 {count} 篇深度研究成果',
      noResults: '未检索到与您查询匹配的技术文章。',
      resetSearch: '重置搜索筛选',
      featured: {
        category: '城市物理与流体力学',
        categoryTag: '核心仿真引擎',
        title: '实时格子玻尔兹曼空气动力学：在浏览器端以 60 FPS 求解 3D 纳维-斯托克斯方程',
        excerpt:
          '我们如何摒弃传统排队渲染管线，将 D3Q19 流体流式分布核直接移植到 WebGL 计算着色器，为大型商业超高层建筑提供即时的风环境与气流空气动力学动态反馈。',
        author: 'Aris Vance 博士',
        authorRole: '首席空间地理与流体工程师 · 班加罗尔',
        date: '2026年11月02日',
        readTime: '12 分钟阅读',
        image: '/ananda_hero.jpg',
        tags: ['CFD 流体力学', '格子玻尔兹曼法 (LBM)', 'GPU 光线投射', 'WebGL 计算着色器'],
        metrics: [
          { label: '实时运算帧率', value: '60 FPS 稳定' },
          { label: 'LBM 空间网格节点', value: '280 万网格点' },
          { label: '首道流线渲染延迟', value: '< 16 毫秒' },
        ],
      },
      articles: [
        {
          id: 'realtime-lbm-aerodynamics',
          slug: 'lattice-boltzmann-realtime-aerodynamics',
          category: 'geospatial',
          categoryLabel: '城市物理与流体力学',
          title: '实时格子玻尔兹曼空气动力学：在浏览器端以 60 FPS 求解 3D 纳维-斯托克斯方程',
          excerpt:
            '我们如何摒弃传统排队渲染管线，将 D3Q19 流体流式分布核直接移植到 WebGL 计算着色器，为大型商业超高层建筑提供即时的风环境与气流空气动力学动态反馈。',
          author: 'Aris Vance 博士',
          authorRole: '首席空间地理与流体工程师 · 班加罗尔',
          date: '2026年11月02日',
          readTime: '12 分钟阅读',
          image: '/ananda_hero.jpg',
          tags: ['CFD 流体力学', '格子玻尔兹曼法 (LBM)', 'GPU 光线投射', 'WebGL 计算着色器'],
          metrics: [
            { label: '实时运算帧率', value: '60 FPS 稳定' },
            { label: 'LBM 空间网格节点', value: '280 万网格点' },
            { label: '首道流线渲染延迟', value: '< 16 毫秒' },
          ],
        },
        {
          id: 'diurnal-solar-low-e',
          slug: 'diurnal-solar-ephemeris-ray-casting',
          category: 'geospatial',
          categoryLabel: '城市物理与流体力学',
          title: '亚米级昼夜太阳光线投射：平衡建筑采光自主率与室内热工得热',
          excerpt:
            '天文历表精密轨道算法与 Low-E 低辐射玻璃幕墙协同建模，在大幅消除商业建筑人工照明的同时，严密杜绝制冷负荷飙升。',
          author: 'Maya Lin',
          authorRole: '高级计算建筑学专家',
          date: '2026年10月28日',
          readTime: '8 分钟阅读',
          image: '/site_vision_daylight.jpg',
          tags: ['太阳光线投射', '采光自主率 (DA)', 'EPW 气象数据'],
          metrics: [
            { label: '天文历表精度', value: '99.4%' },
            { label: '暖通综合能耗下降', value: '38%' },
          ],
        },
        {
          id: 'radar-vs-cameras-elderly',
          slug: '60ghz-millimeter-wave-fall-detection',
          category: 'healthcare',
          categoryLabel: '辅助医疗与长者科技',
          title: '为何在长者私密居所中，我们坚持选用 60 GHz 毫米波雷达而非光学摄像头',
          excerpt:
            '长者辅助科技中的生命伦理与隐私尊严：在浴室等绝对私密空间中，零穿戴、零镜头精准捕捉人体跌倒生物力学微加速度突变。',
          author: 'Priya Sundaram 博士',
          authorRole: '辅助硬件系统研发负责人',
          date: '2026年10月22日',
          readTime: '7 分钟阅读',
          image: '/dara_emergency_fall.jpg',
          tags: ['60 GHz 毫米波', '主动跌倒识别', '无感零穿戴', '隐私第一原则'],
          metrics: [
            { label: '跌倒事件识别延迟', value: '< 280 毫秒' },
            { label: '私密空间光学镜头数', value: '0 枚 (绝对无感)' },
          ],
        },
        {
          id: 'deterministic-highway-lpr',
          slug: '128-tops-multilane-highway-lpr',
          category: 'physicalAi',
          categoryLabel: '边缘物理AI与机器视觉',
          title: '180 km/h 高速多车道毫秒级抓拍：坚固型芯片上的完全离线神经推理',
          excerpt:
            '在边缘光学感知节点的片上缓存内直接运行 INT8 量化深度神经网络，实现亚毫秒级车牌 OCR 与车型结构化分析，彻底告别云端回传依赖。',
          author: 'Vikram Seth',
          authorRole: '边缘硅片系统架构师',
          date: '2026年10月15日',
          readTime: '10 分钟阅读',
          image: '/aura_lpr.jpg',
          tags: ['128-TOPS NPU', '高速公路 LPR', '零云端依赖', 'INT8 量化加速'],
          metrics: [
            { label: '单帧完整推理用时', value: '0.8 毫秒' },
            { label: '精准识别极速上限', value: '180 km/h' },
          ],
        },
        {
          id: 'passive-cross-ventilation',
          slug: 'passive-venturi-wind-corridors',
          category: 'geospatial',
          categoryLabel: '城市物理与流体力学',
          title: '被动式文丘里穿堂风走廊：无需开启机械空调的高端半山别墅微气候自冷却',
          excerpt:
            '在方案设计阶段通过内院对流压差与高侧窗拔风效应CFD流场模拟，将建筑机械制冷机组的装机冷量削减 42%。',
          author: 'Kaelen Thorne',
          authorRole: '空气动力学流体研究员',
          date: '2026年10月08日',
          readTime: '9 分钟阅读',
          image: '/residential_breeze.jpg',
          tags: ['文丘里风洞走廊', '自然被动式冷却', '半山微气候模拟'],
          metrics: [
            { label: 'HVAC 制冷装机削减', value: '42%' },
            { label: '室内自然风速提升', value: '2.4 倍' },
          ],
        },
        {
          id: 'assistive-audio-psychology',
          slug: 'psychology-of-elder-audio-companions',
          category: 'healthcare',
          categoryLabel: '辅助医疗与长者科技',
          title: '长者辅助声学心理学：为听觉老龄化打造舒缓、尊严且自然的人声韵律',
          excerpt:
            '尖锐的数码电子蜂鸣报警为何会在失智症照护中诱发恐慌？我们如何通过模拟声学频响曲线与母语方言播报重建老人的安全感。',
          author: 'Ananya Rao',
          authorRole: '人机交互声学设计师',
          date: '2026年09月29日',
          readTime: '6 分钟阅读',
          image: '/dara_assistive_device.jpg',
          tags: ['自然语音播报', '触感人机交互', '长者认知呵护', '报时多语言钟'],
          metrics: [
            { label: '内置多语言方言数', value: '6 种母语语音' },
            { label: '声学可懂度评分', value: '98%' },
          ],
        },
        {
          id: 'air-gapped-350m-perimeter',
          slug: 'air-gapped-sovereign-perimeter-mesh',
          category: 'physicalAi',
          categoryLabel: '边缘物理AI与机器视觉',
          title: '物理隔离级主权防御网络：跨越 350 米周界的多相机协同目标空间接力',
          excerpt:
            '多个边缘自主智能感知节点通过局域自组光纤网协同运作，在完全物理断网、无中心服务器的环境下实现零漂移威胁目标空间交接。',
          author: 'Devendra Patel',
          authorRole: '边缘基础设施架构专家',
          date: '2026年09月19日',
          readTime: '11 分钟阅读',
          image: '/aura_sentinel_dusk.jpg',
          tags: ['350米网格互联', '物理单向隔离', '关键周界防线', '零轨迹漂移'],
          metrics: [
            { label: '网状互联覆盖半径', value: '350 米' },
            { label: '跨节点目标交接漂移', value: '0.00%' },
          ],
        },
      ],
      newsletter: {
        badge: '实验室技术专刊',
        title: '直接在您的收件箱中接收未公开的研究论文与仿真求解器',
        subtitle:
          '双周刊工程技术专递，包含前沿数学求解器实现、微气候实测数据集与边缘芯片基准测试日志。绝无营销垃圾邮件。',
        placeholder: '输入您的工作或机构电子邮箱...',
        buttonText: '订阅前沿技术专递',
        subscribedTitle: '您已成功订阅 UandWe Labs 技术专递。',
        subscribedDesc: '确认邮件已发送至您的邮箱。我们将在下一期未公开白皮书发布时第一时间寄送给您。',
      },
      modal: {
        backToArticles: '← 返回全部技术出版物',
        shareArticle: '分享本篇技术论文',
        copiedUrl: '论文链接已复制到剪贴板',
        keyTakeaways: '核心工程结论与创新点',
        authorBioLabel: '作者简介',
        schedulePilot: '与论文研发作者预约技术交流',
        publishedIn: '发表于 UandWe Labs 核心技术期刊',
      },
      cta: {
        title: '准备好塑造未来了吗？',
        subtitle:
          '与我们位于班加罗尔的研究和系统工程台联系，审查原始仿真数据集、硬件原理图或共同撰写技术出版物。',
        buttonText: '联系我们的研究台',
      },
    },

    // ----------------------------------------------------
    // ABOUT US & LAB PHILOSOPHY (中文)
    // ----------------------------------------------------
    aboutPage: {
      badge: 'UANDWE 研发实验室 · 愿景与文化',
      heroTitle: {
        line1: '关于 UandWe Labs',
        line2: '让前沿设想化为切实现实。',
      },
      heroSubtitle:
        '我们融合生成式智能、环境物理学与精密硬件工程，构建可持续、面向未来的实体科技，以尊严与科技造福生命。',
      heroCta: '探索我们的使命',
      originBadge: '起源与信念',
      originTitle: '对确凿物理真理的执着探索',
      originParagraph1:
        'UandWe Labs 诞生于印度班加罗尔，怀揣着坚定的使命：将顶尖前沿的计算理论与严苛的物理实体精密制造紧密交融。在虚浮软件泛滥的时代，我们专注投身于能够真正经久不衰的核心领域——确定性流体物理学、主权级边缘AI计算芯片，以及无感非侵入式长者智能辅具。',
      originParagraph2:
        '我们的跨学科发明团队汇聚了计算流体力学专家、高精度光学传感器架构师以及人居环境生物亲和设计先锋。我们坚信，真正的科技进步必须守护个人尊严、促进人的独立自立，并敬畏自然环境的边界。',
      principlesTitle: '我们的核心信念',
      principlesSubtitle: '基石工程准则',
      principlesIntro:
        '卓越的产品始于清晰缜密的思考、目的明确的精雕细琢，以及对每一处微观细节精益求精的不懈坚持。在 UandWe Labs，我们缔造历久弥坚的实体科技。',
      principles: [
        {
          title: '简约纯粹',
          statement: '最优秀的解决方案往往化繁为简，让复杂深奥的技术自然易用。',
          elaboration:
            '我们摒弃一切非必要的冗杂，回归本真清晰。在深科技与复杂硬件架构中，克制是工程成熟度与深厚造诣的最高体现。',
        },
        {
          title: '明确目的',
          statement: '每一个技术决策与外观微弧都必须服务于清晰切实的解决目的。',
          elaboration:
            '设计绝非流于表面的装饰。每一毫米外壳倒角、每一处光学透镜角度以及每一行底层代码，都是为了解决具体的真实物理与人类挑战。',
        },
        {
          title: '工程至精',
          statement: '我们推崇深思熟虑的精湛工程、对极限细节的敬畏与经得起考验的可靠产品开发。',
          elaboration:
            '从光学结构中的亚微米级公差，到张量算力核的零漂移实时推断，我们以航空级精密标准打磨软硬件，坚决拒绝妥协。',
        },
        {
          title: '立足长远',
          statement: '我们深信，产品必须从源头围绕高可靠性、易维护性与未来长青扩展进行研发。',
          elaboration:
            '真正的可持续性意味着持久长青。我们工程化设计模块化、可迭代升级的架构，跳脱消费主义短视周期，在极端工况下历久弥新。',
        },
      ],
      divisionsTitle: '探索物理现实的三大前沿',
      divisionsSubtitle: '核心研发业务群',
      divisions: [
        {
          tag: '城市微气候与环境物理',
          title: 'Ananda 空间地理物理平台',
          desc: '亚米级太阳光线投射分析、浏览器端 60 FPS 格子玻尔兹曼流体动力学风环境模拟，以及 2D 浅水波圣维南暴雨洪涝防灾水动力学计算。',
          linkText: '探索 Ananda 平台',
          target: 'ananda',
          image: '/building-3.jpg',
        },
        {
          tag: '长者科技与辅助医疗',
          title: 'Dara 智能长者看护系统',
          desc: '非接触式 60 GHz 毫米波雷达跌倒监测、多语言母语语音报时钟以及抬手即亮柔光手电筒，在绝无摄像头与穿戴物的前提下捍卫长者独立自立。',
          linkText: '探索 Dara 智能辅具',
          target: 'dara',
          image: '/dara_assistive_device.jpg',
        },
        {
          tag: '边缘物理AI算力硅片',
          title: 'Aura 边缘自主计算节点',
          desc: '硬件级INT8神经张量算力缓存直推，以微秒级确定性支撑 180 km/h 多车道高速卡口瞬时识别与 350 米超长周界网格警戒，零云端依赖。',
          linkText: '探索 Aura 硬件算力',
          target: 'aura',
          image: '/hero_compute_board.jpg',
        },
      ],
      lifecycleTitle: '研发与工程实现路径',
      lifecycleSubtitle: '从第一性原理数学理论到经久耐用的物理硬件实体。',
      lifecycleSteps: [
        {
          num: '01',
          title: '第一性原理物理学',
          desc: '在实际加工之前，所有物理动力学均通过严格的数学求解器进行仿真——从纳维-斯托克斯流体气动分析到高精度天文太阳光线投射。',
        },
        {
          num: '02',
          title: '亚微米级精密制造',
          desc: '高精度光学检测平台、CNC 精密切削结构件以及 60 GHz 毫米波雷达罩，均在班加罗尔研发中心按航空级公差打造。',
        },
        {
          num: '03',
          title: '确定性边缘算力芯片',
          desc: 'INT8 量化神经网络直接在硬件级张量缓存中运行。在零云端连接与无中心服务器的环境下实现微秒级实时推断。',
        },
        {
          num: '04',
          title: '严苛实地场景验证',
          desc: '深入长者起居真实居所、高速多车道交通枢纽以及微气候复杂风走廊进行多维度极限应力实测。',
        },
      ],
      collectiveTitle: '核心领军与科学家团队',
      collectiveSubtitle: '引领班加罗尔研发总部的核心创始人、首席科学家与前沿硬件架构师团队。',
      collective: [
        {
          name: 'Karthik R. Narayan',
          role: '创始人兼首席执行官 (CEO)',
          specialty: '第一性原理工程与研发战略',
          bio: '统领 UandWe Labs 全球战略研发方向，聚焦主权级边缘算力、长者非侵入式健康感知与物理尺度数值仿真。',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
          tag: '创始人 & CEO',
          initials: 'KN',
        },
        {
          name: 'Priya Sundaram 博士',
          role: '联合创始人兼辅具系统负责人',
          specialty: '非接触式传感与声学工程',
          bio: '开拓非侵入式毫米波感知与隐私友好型环境硬件，全天候守护长者安全，彻底免除摄像头与穿戴式手环束缚。',
          image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
          tag: '联合创始人',
          initials: 'PS',
        },
        {
          name: 'Devendra Patel',
          role: '边缘自主硅片硬件架构师',
          specialty: '128-TOPS NPU 与 INT8 缓存直推',
          bio: '负责主权级边缘计算流水线设计，主导毫秒级边缘神经网络推理与纯物理隔离网络安全架构。',
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
          tag: '芯片架构负责人',
          initials: 'DP',
        },
        {
          name: 'Maya Lin',
          role: '首席科学官兼空间架构专家',
          specialty: '大规模数值求解与天文微气候算法',
          bio: '将自研 GPU 高性能物理仿真内核与天文历微气候数据深度结合，赋能前沿人居环境被动式韧性设计。',
          image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80',
          tag: '首席科学家',
          initials: 'ML',
        },
      ],
      perspectivesTitle: '行业伙伴与权威评价',
      perspectivesSubtitle: '来自与 UandWe Labs 携手同行的规划建筑师、长者看护专家与交通基础设施学者的真实回响。',
      perspectives: [
        {
          quote: 'Ananda 从根本上重塑了我们的可持续建筑设计流程。在设计评审现场直接实时求解流体风动力学，彻底告别了耗时三天的云端排队等待。',
          name: 'Sarah Chen',
          role: '首席环境建筑师',
          org: 'Studio Form & Light',
          image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop&q=80',
        },
        {
          quote: '在长者看护领域，伦理底线绝不容妥协。Dara 的 60 GHz 非接触雷达不仅提供低于 300 毫秒的急救跌倒告警，更捍卫了长者纯粹的个人尊严，绝无摄像头。',
          name: 'Rajesh Shenoy 博士',
          role: '长者健康工程总监',
          org: 'Manipal Health Network',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&auto=format&fit=crop&q=80',
        },
        {
          quote: '在多车道高速交通卡口部署 Aura 128-TOPS 边缘硅片，实现了 180 km/h 极速下的微秒级车牌识别，且数据零云端外泄，是主权级工程的典范。',
          name: 'Marcus Vance',
          role: '自动移动基础设施架构师',
          org: 'Apex Infrastructure Group',
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&auto=format&fit=crop&q=80',
        },
      ],
      ctaTitle: '与我们共同缔造改变现实的科技',
      ctaDesc:
        '我们常年在班加罗尔研发总部诚聘优秀的计算流体力学专家、边缘张量硬件架构师及工业设计大师。',
      ctaButton: '查看热招研发职位',
    },

    // ----------------------------------------------------
    // CAREERS & TALENT BENCH (CHINESE · 简体中文)
    // ----------------------------------------------------
    careersPage: {
      badge: 'UANDWE 研发实验室 · 招贤纳士与学者计划',
      heroTitle: {
        line1: '造就历久弥坚的实体科技。',
        line2: '加入 UandWe Labs。',
      },
      heroSubtitle:
        '我们正在班加罗尔研发中心大力扩建核心工程技术团队，汇聚满怀探索好奇心的科学家、硬件工匠与计算工程师，共同铸就经得起岁月沉淀的深科技基石。',
      heroCta: '浏览热招职位',
      cultureTitle: '我们的研发方式',
      cultureSubtitle: '指引我们的研发文化、工程标准以及我们携手创新的核心准则。',
      convictions: [
        {
          num: '01',
          title: '探索未知的纯粹好奇',
          desc: '颠覆性的技术突破始于对既有常识的敢于质疑。我们鼓励前沿探索、挑战底层假设，始终追随真实数据与科学逻辑指引的方向。',
        },
        {
          num: '02',
          title: '高度自驱与彼此信任',
          desc: '我们摒弃繁复的汇报层级与微观管理。我们汇聚卓越而自驱的人才，提供行业顶尖的研发装备，充分赋权每位工程师独立决策与高效攻坚。',
        },
        {
          num: '03',
          title: '极致打磨的工程师匠心',
          desc: '细节决定一切。无论是高优雅度的底层算法架构，还是严苛公差的实体工业打样，我们始终对工程品质抱持近乎偏执的审美与敬畏。',
        },
        {
          num: '04',
          title: '创造切实深远的人类价值',
          desc: '我们专注于真正值得投入一生的硬核课题。每一项研发成果都以改善人们生活、守护个人尊严为使命，为时代留下经得起时间检验的技术印记。',
        },
      ],
      benchesTitle: '走进 UandWe 研发实验室',
      benchesSubtitle: '理论物理学与航空级精密制造及实体落地的交汇之地。',
      lifeBenches: [
        {
          title: '第一性原理数值求解与并行算力台',
          desc: '研发工程师专注攻坚自研数学算法、大规模空间几何建模内核与毫秒级实时物理仿真引擎，在自建算力架构上实现突破。',
          tag: '高性能计算与物理仿真',
          image: '/ananda_hero.jpg',
        },
        {
          title: '精密机械加工与低功耗硅片试验室',
          desc: '跨学科团队研制航空级精密结构封装，验证超低噪声模拟信号完整性，并对设计寿命达数十年的高能效嵌入式微控制器进行全工况测试。',
          tag: '精密硬件试制与超净间',
          image: '/about_team_brainstorm.jpg',
        },
        {
          title: '跨学科系统集成与真实工况实证',
          desc: '应用科学家与系统架构师紧密协同，将抽象数学理论、高鲁棒性嵌入式固件与无云依赖的本地闭环系统在真实物理场景中全面实证。',
          tag: 'UANDWE 研发协同中心',
          image: '/about_indian_team_1.jpg',
        },
      ],
      openingsTitle: '核心热招研发职位',
      openingsSubtitle: '我们在班加罗尔研发基地的当前工程与研究席位。欢迎直接向我们的技术台投递。',
      categories: {
        all: '全部职位',
        geospatial: '空间地理物理',
        healthcare: '长者辅助医疗',
        silicon: '边缘硅片与AI',
        systems: '嵌入式与系统',
      },
      jobs: [
        {
          id: 'cfd-fluid-engineer',
          title: '空间物理与计算流体力学首席工程师',
          division: 'Ananda 空间地理物理平台',
          category: 'geospatial',
          location: '印度班加罗尔 · 全职现场',
          type: '全职',
          exp: '5年以上经验 / 博士优先',
          desc: '负责将 3D 格子玻尔兹曼 (LBM D3Q19) 求解器与 2D 浅水波圣维南暴雨洪涝微分方程移植至浏览器端 WebGL GPU 计算着色器中，实现 60 FPS 瞬时收敛。',
          skills: ['格子玻尔兹曼方法', '纳维-斯托克斯求解器', 'WebGL 计算着色器', 'C++ / GLSL', '数值水动力学'],
          responsibilities: [
            '研发适用于 D3Q19 空气动力学风场求解器的流分布碰撞核函数，在前端浏览器环境下实现 60 FPS 实时渲染。',
            '基于 NOAA 天文星历数据与高密度城市三维网格，优化亚米级太阳光线昼夜投射运算管线。',
            '与全球顶尖建筑设计事务所协同，验证地标综合体抗风压舒适度与防洪排涝韧性模型。',
          ],
          requirements: [
            '计算流体力学、航空航天、应用数学或相关专业硕士及博士学位。',
            '精通数值离散化方法、偏微分方程求解及 GPU 高性能加速计算。',
            '熟练掌握现代 GLSL、WebGL / WebGPU 计算管线及并行算法设计。',
          ],
        },
        {
          id: 'rf-radar-lead',
          title: '毫米波射频与雷达系统研发负责人',
          division: 'Dara 智能长者看护系统',
          category: 'healthcare',
          location: '印度班加罗尔 · 全职现场',
          type: '全职',
          exp: '4年以上经验',
          desc: '主持研发下一代 60 GHz 非接触式毫米波跌倒监测雷达。校准人体微多普勒生命体征信号算法，并主导微波暗室射频认证。',
          skills: ['60 GHz FMCW 微波雷达', '微多普勒信号处理', '天线阵列设计', '嵌入式 DSP', '生物力学信号识别'],
          responsibilities: [
            '设计并调谐 60 GHz 调频连续波 (FMCW) 雷达收发机，实现在蒸汽、水雾及隔断遮挡下 280 毫秒极速跌倒告警。',
            '构建微加速度特征神经网络，精准区分人体真实失衡跌倒与宠物跑动或抛物干扰。',
            '指导微波暗室射频实测、雷达罩介电材料透射特性优化及全球无线电合规认证。',
          ],
          requirements: [
            '电子工程、电磁场与微波技术或信号处理相关专业背景。',
            '具备毫米波雷达硬件调试、矢量网络分析仪使用及 FMCW 测距测速管线研发经验。',
            '崇尚隐私至上理念，坚决践行零摄像头无感辅助硬件设计。',
          ],
        },
        {
          id: 'edge-npu-architect',
          title: '边缘自主计算与 NPU 硬件架构师',
          division: 'Aura 边缘自主计算节点',
          category: 'silicon',
          location: '印度班加罗尔 · 全职现场',
          type: '全职',
          exp: '5年以上经验',
          desc: '设计完全在片上硬件缓存内运行的确定性 INT8 深度神经网络直推架构，赋能 180 km/h 多车道高速卡口与 350 米周界警戒。',
          skills: ['INT8 量化加速', '128-TOPS NPU 流水线', 'Verilog / SystemVerilog', '边缘机器视觉', '零云端依赖'],
          responsibilities: [
            '架构定制化神经张量执行管线，规避外部总线访问瓶颈，保障单帧完整推理延迟低于 0.8 毫秒。',
            '实现训练后 INT8 量化补偿算法，确保在极端低照度工况下车牌与车型分类精度不低于 99.8%。',
            '在 IP68 压铸铝全封闭被动散热结构内优化低功耗热管理方案。',
          ],
          requirements: [
            '微电子、计算机体系结构或电子科学相关专业。',
            '拥有在专用边缘算力芯片、FPGA 或 NPU 平台上落地量化神经网络的扎实工业界成果。',
            '精通 PyTorch 量化工具链、ONNX 运行时及底层硬件寄存器控制接口。',
          ],
        },
        {
          id: 'senior-bioclimatic-architect',
          title: '资深计算建筑与生物亲和环境系统专家',
          division: 'Ananda 空间地理物理平台',
          category: 'geospatial',
          location: '印度班加罗尔 · 混合办公',
          type: '全职',
          exp: '3年以上经验',
          desc: '连接高密度城市总规与物理环境微气候仿真。主导编制自然采光自主率 (sDA) 与庭院穿堂风被动散热算法。',
          skills: ['计算性建筑设计', '生物亲和微气候', 'Revit / Rhino / Grasshopper', '采光自主率 sDA', '被动式节能减排'],
          responsibilities: [
            '将复杂的微气候气象星历数据转化为建筑师与规划院直观易懂的三维交互视效图层。',
            '编写参数化立面百叶角度自适应算法，最大化室内自然采光并有效抑制热负荷。',
            '与市政可持续发展委员会合作，树立新一代低能耗人居防灾工程基准。',
          ],
          requirements: [
            '建筑学、建筑物理或城市计算设计专业。',
            '熟练使用 Rhino、Grasshopper、Ladybug 系列工具及参数化几何生成。',
            '热爱可持续人居设计，致力于通过被动式自然微气候取代传统高能耗机械空调。',
          ],
        },
        {
          id: 'embedded-firmware-crypto',
          title: '资深嵌入式固件与安全加密工程师',
          division: 'Aura 边缘自主计算节点',
          category: 'systems',
          location: '印度班加罗尔 · 全职现场',
          type: '全职',
          exp: '4年以上经验',
          desc: '为关键市政与国防级周界基础设施打造完全物理断网、防拆自毁的安全固件及局域光纤自组网协议。',
          skills: ['FIPS 140-2 Level 3', '硬件安全根信任', '底层 C / Rust', 'FreeRTOS / Zephyr', '物理隔离自组网'],
          responsibilities: [
            '实现硬件根信任密钥分发、主动防拆触发自毁电路及端到端加密自组网协议栈。',
            '编写硬实时驱动子系统，在 1.2 毫秒内触发干接点物理道闸继电器与周界警示联动。',
            '在光纤切断或网络瘫痪环境下保障 100% 独立离线运作与零外部攻击面。',
          ],
          requirements: [
            '计算机科学、通信工程或信息安全专业背景。',
            '熟练掌握底层 C / Rust 编程、微控制器硬件驱动 (SPI, I2C, UART) 及硬件加密隔离区。',
            '具备嵌入式安全认证标准、安全启动链及侧信道攻击防御经验。',
          ],
        },
        {
          id: 'acoustic-ux-designer',
          title: '长者声学人机交互与触感产品设计师',
          division: 'Dara 智能长者看护系统',
          category: 'healthcare',
          location: '印度班加罗尔 · 混合办公',
          type: '全职',
          exp: '3年以上经验',
          desc: '专为银发长者听觉与触觉生理特点设计舒缓人声频响曲线、多语种母语方言播报及直觉式物理交互。',
          skills: ['心理声学', '通用无障碍设计', '触感实体交互', '多语种母语音调', '触觉反馈'],
          responsibilities: [
            '调校内置发声单元的柔和声学频响曲线，针对高龄退化听力优化人声辨识清晰度，杜绝刺耳警报惊扰。',
            '设计一键报时大按键实体触感、抬手点亮微重力感应阈值及夜行柔光照明交互。',
            '统筹 6 种母语方言在服药提醒与时间播报上的专业录音与语音学本地化标定。',
          ],
          requirements: [
            '工业设计、交互设计、人机工程或声学工程相关背景。',
            '拥有实物智能硬件交互、适老化无障碍设计或声学硬件产品代表案例。',
            '对长者关怀事业怀抱崇高敬意，立志以有温度的科技捍卫老人的自立尊严。',
          ],
        },
      ],
      benefitsTitle: '全方位的学者与研发福利',
      benefitsSubtitle: '我们提供坚实的学术、技术与生活保障，让深科技探索无后顾之忧。',
      benefits: [
        {
          title: '不设上限的科研硬件预算',
          desc: '直接使用顶配 FPGA 开发工作站、超精密 CNC 切削打样台、独享 GPU 计算集群及专属微波暗室。',
        },
        {
          title: '知识产权与学术主权',
          desc: '享有发明专利第一发明人署名权、国际顶会核心期刊论文发表权，并鼓励开源通用求解器算法。',
        },
        {
          title: '顶格健康保障与全家守护',
          desc: '涵盖全额商业高端医疗险、牙科与眼科保障，配偶及子女全额随保，另设心理关怀与名医急救绿色通道。',
        },
        {
          title: '班加罗尔落户与高品质安居',
          desc: '提供全额搬迁安家津贴、人体工学 Herman Miller 办公设备、定制营养私厨餐食及便携旗舰工作站。',
        },
      ],
      spontaneousTitle: '未找到完全契合的职位？',
      spontaneousDesc: '我们常年求贤若渴，若您在计算物理、微波光学或底层系统架构领域造诣深厚，欢迎随时与我们的创始研发团队直接对话。',
      spontaneousButton: '投递开放式技术自荐',
      modal: {
        applyTitle: '职位投递',
        roleLabel: '投递职位：',
        fullName: '您的全名',
        email: '电子邮箱',
        phone: '手机号码 / 微信 (选填)',
        portfolio: '个人作品集 / GitHub / 主页链接',
        note: '向我们分享一个您从第一性原理出发攻克的硬核技术难题...',
        submit: '正式向技术工程台提交申请',
        submitting: '正在递交至研发中心...',
        successTitle: '申请已成功递交',
        successMsg: '您的技术简历与工程自荐已直接抄送至班加罗尔研发总监桌面，我们将在 48 小时内完成技术评估并与您联系。',
        bookingRef: '投递编号 · ',
        close: '完成 / 关闭',
      },
    },
  },
}

