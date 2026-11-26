// ========================================================
// UANDWE LABS - MULTI-LANGUAGE TRANSLATION DICTIONARY
// Supports: English ('en-in', 'en-us')
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
      commercialDesc: 'Large-scale environmental physics, solar ray-casting, and microclimate CFD simulation for commercial towers and urban masterplans.',
      residencyDesc: 'Passive cross-ventilation, natural daylight autonomy, and microclimate comfort tailored for private residences and luxury estates.',
      anandaCategoryLabel: 'Urban Physics & CFD',
      physicalAi: 'Physical AI',
      physicalAiLabel: 'Autonomous Edge Vision',
      healthcare: 'Healthcare',
      healthcareLabel: 'Elder Longevity & Fall Radar',
      auraTitle: 'Aura',
      auraSubtitle: 'Autonomous Edge Vision & 128-TOPS Silicon',
      auraDesc: 'Autonomous edge vision systems delivering real-time vehicle analytics, high-speed highway recognition, and 350m perimeter defense.',
      exploreAura: 'Explore Aura Hardware Node',
      daraTitle: 'Dara',
      daraSubtitle: 'Autonomous Senior Dignity & Fall Radar',
      daraDesc: 'Smart assistive healthcare hardware keeping seniors safe and independent with contactless 60 GHz fall radar and multi-language voice guidance.',
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
          category: 'Urban Physics & CFD',
          headline: 'More Than Meets the Eye.',
          tagline: 'Precision and intelligent systems',
          subtitle: 'Behind every remarkable building lies a world of precision urban physics, microclimate aerodynamics, and environmental engineering that makes it work.',
          ctaText: 'EXPLORE ANANDA',
        },
        {
          category: 'Design & Engineering',
          headline: 'Ideas Deserve to Become Real.',
          tagline: 'Turn ambitious thinking into tangible products',
          subtitle: 'Turn ambitious thinking into tangible products through purposeful design and advanced engineering.',
          ctaText: 'DISCOVER OUR MISSION',
        },
        {
          category: 'Physical AI & Edge Vision',
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
      intro: 'Great products begin with clear thinking, purposeful design, and an uncompromising commitment to getting the details right. At UANDWE Labs, we build technology that endures.',
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
      companyCol: 'Company',
      aboutUsCol: 'Company',
      productsCol: 'Products',
      links: {
        aboutUs: 'About Us',
        careers: 'Careers',
        techBlog: 'Blogs',
        partners: 'Partners',
        ananda: 'Geo Spatial',
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
      heroSlides: [
        {
          id: 'riverside_skyline',
          title: 'Architecture Meets Physics.',
          desc: 'Diurnal solar ray-casting and microclimate airflow simulation across glass-facade towers.',
        },
        {
          id: 'courtyard_windflow',
          title: 'Built for the Breeze.',
          desc: 'LBM aerodynamic wind solver and passive cross-ventilation across green courtyards.',
        },
        {
          id: 'waterway_masterplan',
          title: 'Water Meets Architecture.',
          desc: '2D shallow water differential hydrology and biophilic cooling for resilient masterplans.',
        },
      ],
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
          title: 'Hydro-Morphology & Blue Corridors',
          desc: '2D Saint-Venant shallow water simulation across urban massing and waterway detention basins.',
        },
        {
          id: 2,
          title: 'Aerodynamic Complex Envelope',
          desc: 'LBM aerodynamic streamlines and vortex wake modeling around high-rise tower geometries.',
        },
        {
          id: 3,
          title: 'Mesoscale Cityscape Streamlines',
          desc: 'Atmospheric boundary layer CFD flow vectors and convective thermal streamlines across metropolitan sectors.',
        },
        {
          id: 4,
          title: 'Vortex Cross-Breeze Acceleration',
          desc: 'Corner vortex shedding and convective pressure differential corridors for natural passive ventilation.',
        },
        {
          id: 5,
          title: 'Building Blocks Micro-Airflow',
          desc: 'Pedestrian-level aerodynamic comfort and wake diversion across dense modular urban blocks.',
        },
        {
          id: 6,
          title: 'Grid Cavity Boundary Layer Flow',
          desc: 'High-resolution microclimate airflow streamlines and recirculating vortex simulation in urban cavities.',
        },
        {
          id: 7,
          title: 'Structural Wireframe CFD Grid',
          desc: 'Sub-meter wind velocity vectors and turbulence kinetic energy solved through structural wireframe matrices.',
        },
        {
          id: 8,
          title: 'Metropolitan Massing Masterplan',
          desc: 'Multi-acre urban physics convergence, solar diurnal ray-casting, and environmental massing analysis.',
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
      heroButtonText: 'Request Demo',

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
        subtitle: 'Request a live hardware demonstration or schedule a consultation with our geriatric engineering team in Bengaluru.',
        buttonText: 'Request Demo',
      },

      modal: {
        title: 'Dara Demo Request',
        formTitle: 'Request Hardware Demo',
        formSubtitle: 'Specify patient and delivery details to schedule a live demonstration or evaluation.',
        nameLabel: 'Patient Name',
        emailLabel: 'Patient Email',
        facilityLabel: 'Care Home / Residence',
        notesLabel: 'Notes',
        notesPlaceholder: 'Add any specific requirements or notes...',
        submitButtonText: 'REQUEST DEMO',
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
      heroButtonText: 'Request Pilot Demo',

      heroSlides: [
        {
          id: 'highway-lpr',
          category: 'Autonomous Highway Edge Vision',
          headline: 'Physical AI. Silicon at the Edge.',
          subtitle:
            'Deterministic 128-TOPS neural inferencing directly inside hardened optical sensor nodes. Sub-millisecond vehicle tracking across 6 expressway lanes with zero cloud egress.',
          ctaText: 'Request Pilot Demo',
        },
        {
          id: 'perimeter-mesh',
          category: 'Critical Infrastructure Defense',
          headline: 'Coordinated Perimeter Mesh.',
          subtitle:
            'Autonomous multi-node target handoff tracks human and vehicular vectors over 350 meters with zero blind spots, micro-lux night optics, and predictive intrusion alerts.',
          ctaText: 'Request Pilot Demo',
        },
        {
          id: 'campus-checkpoint',
          category: 'Mission-Critical Access Intelligence',
          headline: 'Air-Gapped Autonomous Vision.',
          subtitle:
            'Raw video never exits the camera node. FIPS 140-2 Level 3 armored cryptography and hardware root-of-trust ensure permanent physical security and absolute data sovereignty.',
          ctaText: 'Request Pilot Demo',
        },
      ],

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
        image: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795505914/uandwelabs/cms/ananda_hero_1795505913763.jpg',
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
          image: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795505914/uandwelabs/cms/ananda_hero_1795505913763.jpg',
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
          image: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795505967/uandwelabs/cms/site_vision_daylight_1795505966760.jpg',
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
          image: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795424401/uandwelabs/cms/Hands_Cradling_a_Dynamic_Heart_1795424399358.jpg',
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
          image: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795433117/uandwelabs/cms/aura_2_1795433115192.jpg',
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
          image: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795433138/uandwelabs/cms/residential_breeze_1795433136193.jpg',
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
          image: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795424401/uandwelabs/cms/Hands_Cradling_a_Dynamic_Heart_1795424399358.jpg',
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
          image: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795505920/uandwelabs/cms/aura_350m_perimeter_mesh_1795505919333.jpg',
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
        line1: 'About UANDWE Labs.',
        line2: 'Where Ideas Become Real.',
      },
      heroSubtitle:
        'We bridge generative intelligence, environmental physics, and precision engineering to design sustainable, future-ready realities that serve humanity with dignity.',
      heroCta: 'Discover Our Mission',
      originBadge: 'OUR STORY & PURPOSE',
      originTitle: 'Technology Made for Real Life',
      originParagraph1:
        'UANDWE Labs began in Bengaluru with a simple, refreshing idea: what if technology stopped demanding your constant attention and instead quietly made the real world a better place to live? In a world filled with endless notifications, fleeting apps, and digital noise, we fell in love with making things you can actually feel, touch, and trust in daily life.',
      originParagraph2:
        'Our studio brings together dreamers, architects, craftspeople, and thinkers who care deeply about everyday life. Whether we are designing comfortable spaces where cool breezes flow naturally, or creating gentle devices that keep grandparents safe at home without cameras watching over them, we believe good technology should feel like second nature—protecting your dignity, respecting your peace of mind, and bringing people closer together.',
      principlesTitle: 'What We Believe In',
      principlesSubtitle: 'Core Engineering Principles',
      principlesIntro:
        'Great products begin with clear thinking, purposeful design, and an uncompromising commitment to getting the details right. At UANDWE Labs, we build technology that endures.',
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
          image: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795505932/uandwelabs/cms/building-3_1795505931913.jpg',
        },
        {
          tag: 'ASSISTIVE HEALTHCARE',
          title: 'Dara Assistive Health',
          desc: 'Contactless 60 GHz fall radar, multi-language acoustic talking clock, and rise-to-wake torch engineered for elder independence with zero wearables.',
          linkText: 'Explore Dara Hardware',
          target: 'dara',
          image: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795424401/uandwelabs/cms/Hands_Cradling_a_Dynamic_Heart_1795424399358.jpg',
        },
        {
          tag: 'PHYSICAL AI SILICON',
          title: 'Aura Autonomous Edge',
          desc: 'Deterministic 128-TOPS neural tensor cores executed in hardware cache. Sub-millisecond multilane highway LPR and 350m perimeter defense with zero cloud egress.',
          linkText: 'Explore Aura Node',
          target: 'aura',
          image: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795505962/uandwelabs/cms/hero_compute_board_1795505961255.jpg',
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
        'We are continually expanding our research and engineering branch in Bengaluru. Work alongside fluid aerodynamicists, sensor architects, and computational designers.',
      ctaButton: 'Explore Open Careers',
    },

    // ----------------------------------------------------
    // CAREERS & TALENT BENCH (ENGLISH)
    // ----------------------------------------------------
    careersPage: {
      badge: 'UANDWE RESEARCH LABS · CAREERS & FELLOWSHIP',
      heroTitle: {
        line1: 'Build What Endures.',
        line2: 'Careers at UANDWE Labs.',
      },
      heroSubtitle:
        'We are expanding our research and engineering branch in Bengaluru. We bring together hardware craftsmen and computational engineers building deep technology that truly endures.',
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
      benchesTitle: 'Life Inside UANDWE Labs',
      benchesSubtitle: 'Where curious minds, warm conversations, and bold experiments turn into technology that touches everyday lives.',
      lifeBenches: [
        {
          title: 'From Wild Ideas to Living Cities',
          desc: 'We explore how breezes flow through neighborhood courtyards, how sunlight naturally warms living rooms, and how future buildings can live in gentle harmony with nature.',
          tag: 'IMAGINING TOMORROW',
          image: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795505914/uandwelabs/cms/ananda_hero_1795505913763.jpg',
        },
        {
          title: 'Whiteboards, Warm Chai & Making Things',
          desc: 'No corporate red tape or endless slide decks. A fresh spark sketched over lunch often turns into a real, working prototype you can hold and test in your hands by Friday afternoon.',
          tag: 'THE MAKER SPIRIT',
          image: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795433148/uandwelabs/cms/about_team_brainstorm_1795433146739.jpg',
        },
        {
          title: 'Tech That Cares Without Getting in the Way',
          desc: 'From looking out for elders at home without intrusive cameras to creating calmer everyday spaces, we build thoughtful technology that puts human comfort, peace of mind, and dignity first.',
          tag: 'HUMAN-FIRST IMPACT',
          image: 'https://res.cloudinary.com/fukpn05e/image/upload/v1795433149/uandwelabs/cms/about_indian_team_1_1795433147917.jpg',
        },
      ],
      openingsTitle: 'Open Engineering Benches',
      openingsSubtitle: 'Current research and engineering openings across our branch in Bengaluru. Apply directly to our technical desk.',
      categories: {
        all: 'All Benches',
        geospatial: 'GeoSpatial Physics',
        healthcare: 'Assistive Healthcare',
        silicon: 'Edge Silicon & AI',
        systems: 'Systems & Hardware',
      },
      jobs: [
        {
          id: 'gis-urban-simulation-lead',
          title: 'Team Lead – Urban Flood & Flow Field Simulation (GIS)',
          division: 'GIS & Urban Physics',
          category: 'geospatial',
          location: 'Bangalore, India',
          type: 'Full-Time',
          exp: '7–15 Years',
          desc: 'We are looking for a hands-on Team Lead to lead an engineering team specializing in Urban Flood Simulation and Urban Flow field simulation.',
          skills: ['ArcGIS Pro / QGIS', 'HEC-RAS (2D)', 'EPA-SWMM / MIKE 21', 'OpenFOAM / ANSYS Fluent', 'DEM & LiDAR Processing'],
          responsibilities: [
            'Team Leadership: Manage workflow allocation, set milestones, and provide hands-on technical mentoring for a 2-member engineering team.',
            'Data Integration: Work with the team and coordinate with outside agencies related to data sets required for the work.',
            'Project Management: Provide support and track weekly activities and ensure work is completed in the assigned team.',
            'Quality Assurance: Utilise robust validation criteria for simulation outputs, ensuring models accurately reflect real-world hydraulic and atmospheric behavior.',
          ],
          requirements: [
            'GIS & Data: Advanced proficiency in ArcGIS Pro or QGIS, with extensive experience processing Digital Elevation Models (DEMs), LiDAR, and urban catchment geometry.',
            'Flood Simulation: Hands-on experience with 1D/2D hydraulic modeling software such as HEC-RAS (2D), EPA-SWMM, or MIKE 21/URBAN.',
            'OR CFD / Urban Flow Field: Proven track record running micro-scale wind, thermal, or flow-field simulations using OpenFOAM, ANSYS Fluent, or Star-CCM+.',
            'Qualification: Bachelor\'s or Master\'s degree in Civil Engineering, Environmental Engineering, Geoinformatics, or a related field.',
          ],
          qualification: 'Bachelor\'s or Master\'s degree in Civil Engineering, Environmental Engineering, Geoinformatics, or a related field.',
        },
        {
          id: 'mechanical-design-engineer',
          title: 'Mechanical Design Engineer (Enclosures & Thermal)',
          division: 'Mechanical & Hardware',
          category: 'systems',
          location: 'Bangalore, India',
          type: 'Full-Time',
          exp: '4–10 Years (Min 5+ yrs exp)',
          desc: 'Design and develop LRU chassis, electronic enclosures, and 19-inch rack-mounted systems (1U–42U) with thermal management and structural validation.',
          skills: ['Creo / SolidWorks / UG-NX', 'ANSYS Icepak & Mechanical', 'Electronic Enclosures (1U–42U)', 'MIL-STD-810G / IP67', 'HyperLynx Thermal'],
          responsibilities: [
            'Design and develop LRU chassis, electronic enclosures, and 19-inch rack-mounted systems (1U–42U).',
            'Create 3D models, 2D manufacturing drawings, assembly drawings, and BOMs.',
            'Design sheet metal, machined, and fabricated components.',
            'Perform material selection, GD&T, tolerance analysis, DFM and DFA.',
            'Design IP-rated enclosures (IP50/IP65/IP67), EMI/EMC shielding, sealing, and gasket arrangements.',
            'Perform system-level thermal simulation using ANSYS Icepak and PCB-level thermal analysis using HyperLynx.',
            'Perform heatsink design, fan selection, CFM calculations, and airflow optimization.',
            'Conduct structural analysis using ANSYS for stress, deformation, vibration, and mechanical strength.',
            'Support prototype development, manufacturing, assembly, and design validation.',
            'Coordinate with electrical, PCB, testing, manufacturing, and customer teams.',
          ],
          requirements: [
            'CAD: Creo, SolidWorks, UG/NX.',
            'Simulation: ANSYS Icepak, ANSYS Mechanical, HyperLynx.',
            'Standards: MIL-STD-810G, JSS 55555, IEC 60529, PCIe.',
            'Strong knowledge of mechanical design, thermal management, structural analysis, and manufacturing processes.',
            'BE/B.Tech in Mechanical Engineering with minimum 5+ years of relevant experience.',
            'Experience in electronic enclosure, aerospace, defence, or industrial product design preferred.',
            'Ability to independently handle mechanical design and development activities.',
          ],
          qualification: 'BE/B.Tech in Mechanical Engineering (Min 5+ years relevant experience)',
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
        portfolio: 'LinkedIn URL',
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

}

