import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Monitor,
  Zap,
  Compass,
  ArrowRight,
  ArrowLeft,
  Quote,
  Sun,
  Wind,
  Waves,
  Check,
  CheckCircle2,
  X,
  Crosshair,
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Calendar,
  Copy,
  ExternalLink,
  Share2
} from 'lucide-react';

import Footer from '../components/Footer';
import CommonCta from '../components/CommonCta';
import MorphGallery from '../components/ui/morph-gallery';
import { useTranslation } from '../i18n';

// Ananda Hero Images (Indian Modern Architecture & Microclimate CFD)
import goldenHourWindflow from '../assets/anadha/Golden-Hour Courtyard Windflow.webp';
import goldenHourRiverside from '../assets/anadha/Golden Hour Skyline by the Riverside.webp';
import geminiEcoCourtyard from '../assets/anadha/Gemini_Generated_Image_huaymkhuaymkhuay.webp';

// Commercial Bento Physics Simulation Assets
import modernOfficeStreamlines from '../assets/anadha/Modern Office Campus with Flowing Light Streamlines (1).webp';
import glowingBlueFlows from '../assets/anadha/Glowing Blue Flows Over Empty City Roads.webp';
import goldenHourPlazaShadows from '../assets/anadha/Golden Hour Urban Plaza Shadows.webp';

// Residential Bento Physics Simulation Assets
import sunsetAerialApartments from '../assets/anadha/Sunset Aerial View of Modern Apartments.webp';
import floodedCourtyardFlow from '../assets/anadha/Flooded Courtyard Flow Simulation.webp';
import luminousCourtyardAirflow from '../assets/anadha/Luminous Airflow in a Modern Courtyard.webp';

// Real CFD & Urban Physics Simulation Assets
import cfdComplexStructure from '../assets/anadha/CFD Streamlines Around Complex Structure.webp';
import cfdGridCavity from '../assets/anadha/Crisp CFD Streamlines in a Grid Cavity.webp';
import cityBlueWaterways from '../assets/anadha/Pastel Isometric City with Blue Waterways.webp';
import cfdWireframeGrid from '../assets/anadha/CFD Streamlines Through Wireframe Grid (1).webp';
import cfdFlowBlocks from '../assets/anadha/CFD Flow Around Building Blocks.webp';
import cfdVortices from '../assets/anadha/CFD Streamlines Through Vortices.webp';
import cityMassingModel from '../assets/anadha/Isometric Gray City Massing Model.webp';
import cfdCityStreamlines from '../assets/anadha/Colorful Streamlines Over a Cityscape.webp';

const CURRENT_YEAR = 2026;

// ==========================================
// DATA: 6 CORE PHYSICS CAPABILITIES
// ==========================================
const RAW_ENVIRONMENT_FEATURES = [
  {
    icon: <Sun size={24} strokeWidth={1.5} />,
    title: "Diurnal Solar Ray-Casting",
    desc: "Sub-meter solar azimuth and altitude computation based on NOAA astronomical ephemeris tables and surrounding urban morphology at 60 FPS without render queues."
  },
  {
    icon: <Wind size={24} strokeWidth={1.5} />,
    title: "LBM Aerodynamic Wind Solver",
    desc: "Lattice Boltzmann Method (LBM) fluid dynamics computing 3D airflow streamlines, corner vortex shedding, and pedestrian safety criteria in minutes."
  },
  {
    icon: <Waves size={24} strokeWidth={1.5} />,
    title: "2D Saint-Venant Hydrology",
    desc: "2D shallow water differential equations solved across high-resolution LiDAR Digital Elevation Models (DEM) for critical 100-year storm climate resilience."
  },
  {
    icon: <Compass size={24} strokeWidth={1.5} />,
    title: "Passive Cross-Breeze Corridors",
    desc: "Window-to-window cross-ventilation analysis and courtyard convective pressure differentials enabling zero-energy natural convective cooling."
  },
  {
    icon: <Zap size={24} strokeWidth={1.5} />,
    title: "Daylight Autonomy & Glare Shield",
    desc: "Calculates spatial daylight autonomy (sDA) and annual sunlight exposure (ASE), optimizing exterior louvers without blocking panoramic views."
  },
  {
    icon: <Monitor size={24} strokeWidth={1.5} />,
    title: "Native BIM & LiDAR Ingestion",
    desc: "Instant geometry ingestion of Revit IFC files, Rhino geometries, and 3D GeoTIFF matrices with zero coordinate conversion friction."
  }
];

// ==========================================
// DATA: ARCHITECT & ENGINEERING PERSPECTIVES
// ==========================================
const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Principal Environmental Architect",
    studio: "Studio Form & Light",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop&q=80",
    quote: "Ananda gives us instantaneous GPU ray-tracing on 50-story envelopes. We no longer wait three days for CFD renders; we test wind vortices live with our clients right in the design review room."
  },
  {
    name: "David Park",
    role: "Director of Masterplanning",
    studio: "Urban Matrix Labs",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&auto=format&fit=crop&q=80",
    quote: "The hydrological 2D Saint-Venant solver pinpointed flood detention zones right where our parking ingress was planned. It saved our development millions in mitigation and prevented costly redesigns."
  },
  {
    name: "Elena Rodriguez",
    role: "Sustainable Residential Designer",
    studio: "Biophilic Habitat",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&auto=format&fit=crop&q=80",
    quote: "Designing private villas with Ananda cross-ventilation lets us eliminate mechanical HVAC in living courtyards. The thermal comfort is completely natural and our clients love the energy independence."
  }
];

// ==========================================
// DATA: SIMULATION STUDY MOSAIC (BENTO)
// ==========================================
const MOSAIC_STUDIES = [
  {
    id: 1,
    title: "Hydro-Morphology & Blue Corridors",
    desc: "2D Saint-Venant shallow water simulation across urban massing and waterway detention basins.",
    image: cityBlueWaterways
  },
  {
    id: 2,
    title: "Aerodynamic Complex Envelope",
    desc: "LBM aerodynamic streamlines and vortex wake modeling around high-rise tower geometries.",
    image: cfdComplexStructure
  },
  {
    id: 3,
    title: "Mesoscale Cityscape Streamlines",
    desc: "Atmospheric boundary layer CFD flow vectors and convective thermal streamlines across metropolitan sectors.",
    image: cfdCityStreamlines
  },
  {
    id: 4,
    title: "Vortex Cross-Breeze Acceleration",
    desc: "Corner vortex shedding and convective pressure differential corridors for natural passive ventilation.",
    image: cfdVortices
  },
  {
    id: 5,
    title: "Building Blocks Micro-Airflow",
    desc: "Pedestrian-level aerodynamic comfort and wake diversion across dense modular urban blocks.",
    image: cfdFlowBlocks
  },
  {
    id: 6,
    title: "Grid Cavity Boundary Layer Flow",
    desc: "High-resolution microclimate airflow streamlines and recirculating vortex simulation in urban cavities.",
    image: cfdGridCavity
  },
  {
    id: 7,
    title: "Structural Wireframe CFD Grid",
    desc: "Sub-meter wind velocity vectors and turbulence kinetic energy solved through structural wireframe matrices.",
    image: cfdWireframeGrid
  },
  {
    id: 8,
    title: "Metropolitan Massing Masterplan",
    desc: "Multi-acre urban physics convergence, solar diurnal ray-casting, and environmental massing analysis.",
    image: cityMassingModel
  }
];

// ==========================================
// DATA: HERO PERSPECTIVES (ANANDA URBAN PHYSICS)
// ==========================================
const ANANDA_HERO_SLIDES = [
  {
    id: 'riverside_skyline',
    src: goldenHourRiverside,
    thumb: goldenHourRiverside,
    title: 'Architecture Meets Physics.',
    desc: 'Diurnal solar ray-casting and microclimate airflow simulation across glass-facade towers.',
  },
  {
    id: 'courtyard_windflow',
    src: goldenHourWindflow,
    thumb: goldenHourWindflow,
    title: 'Built for the Breeze.',
    desc: 'LBM aerodynamic wind solver and passive cross-ventilation across green courtyards.',
  },
  {
    id: 'waterway_masterplan',
    src: geminiEcoCourtyard,
    thumb: geminiEcoCourtyard,
    title: 'Water Meets Architecture.',
    desc: '2D shallow water differential hydrology and biophilic cooling for resilient masterplans.',
  },
];

const COMMERCIAL_HERO_SLIDES = [
  {
    id: 'bangalore_ubcity',
    src: '/ananda_indian_bangalore_ubcity.jpg',
    title: 'Bengaluru Commercial Skydeck',
    desc: 'High-performance diurnal solar ray-casting and microclimate airflow simulation across glass-facade towers'
  },
  {
    id: 'mumbai_one',
    src: '/ananda_indian_mumbai_one.jpg',
    title: 'Mumbai Business District Towers',
    desc: 'LBM aerodynamic boundary layer wind solver and pedestrian vortex mapping in dense urban hubs'
  },
  {
    id: 'exoskeleton',
    src: '/ananda_hero_exoskeleton.jpg',
    title: 'Aerodynamic Monolith',
    desc: 'Monumental fluid structural exoskeleton and high-performance glass curtain wall'
  },
  {
    id: 'skybridge',
    src: '/ananda_hero_skybridge_link.jpg',
    title: 'Twin Commercial Towers & Skybridge',
    desc: 'Twin towers linked high above by an aerodynamic cantilevered glass skybridge'
  }
];

const RESIDENTIAL_HERO_SLIDES = [
  {
    id: 'indian_residential_courtyard',
    src: '/ananda_indian_residential_courtyard.jpg',
    title: 'Biophilic Indian Courtyard Sanctuary',
    desc: 'Open-to-sky central aangan with water reflection pool, Burma teakwood louvers, and passive cross-ventilation'
  },
  {
    id: 'indian_goa_villa',
    src: '/ananda_indian_goa_villa.jpg',
    title: 'Goa Coastal Pavilion Estate',
    desc: 'Passive cross-breeze corridors, natural stone terrace, and tropical lap pool for luxury coastal living'
  },
  {
    id: 'residential_sunset_villa',
    src: '/ananda_residential_sunset_villa.jpg',
    title: 'Hillside Residential Villa',
    desc: 'Indoor-outdoor living with sunken fire pit lounge and cantilevered timber overhangs'
  },
  {
    id: 'residential_estate_pool',
    src: '/ananda_residential_estate_pool.jpg',
    title: 'Luxury Residential Estate',
    desc: 'Floor-to-ceiling glass pavilions opening to infinity reflection pool and private courtyard'
  }
];

export default function AnandaPage({
  user,
  onLogout,  
  onNavigateToHome,
  onNavigateToLogin,
  onNavigateToAnanda,
  onNavigateToDara,
  onNavigateToAura,
  onNavigateToBlogs,
  onNavigateToAbout,
  onNavigateToCareers,
  onNavigateToPrivacy,
  onNavigateToTerms,
  initialCategory = 'commercial',
}) {
  // Duality Mode state: false = Commercial Scale, true = Residential Living
  const [isResidential, setIsResidential] = useState(initialCategory === 'residential');

  // Synchronize category state when prop or navigation changes
  useEffect(() => {
    setIsResidential(initialCategory === 'residential');
  }, [initialCategory]);

  useEffect(() => {
    const handleCategoryChange = (e) => {
      if (e.detail === 'residential') {
        setIsResidential(true);
      } else if (e.detail === 'commercial') {
        setIsResidential(false);
      }
    };
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('residential')) {
        setIsResidential(true);
      } else if (hash.includes('ananda') || hash.includes('commercial')) {
        setIsResidential(false);
      }
    };
    window.addEventListener('ananda_category_change', handleCategoryChange);
    window.addEventListener('hashchange', handleHash);
    return () => {
      window.removeEventListener('ananda_category_change', handleCategoryChange);
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  // Multi-Step Modal & Consultation Flow States
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState('form'); // 'form' | 'schedule' | 'connect' | 'confirmed'
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: '',
    sector: initialCategory || 'commercial',
    latitude: '12.971599',
    longitude: '77.594566',
  });

  // Pre-fill user details when signed in
  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email,
      }));
    }
  }, [user]);

  const [gpsStatus, setGpsStatus] = useState('idle'); // 'idle' | 'detecting' | 'locked' | 'denied'
  const [gpsAccuracy, setGpsAccuracy] = useState(null);

  // Internationalization hook
  const { t } = useTranslation();
  const ap = t.anandaPage || {};
  const m = ap.modal || {};

  // Localized data structures
  const commercialHeroSlides = useMemo(() => {
    const list = ap.heroCommercialSlides || COMMERCIAL_HERO_SLIDES;
    return list.map((slide, idx) => ({
      ...slide,
      src: COMMERCIAL_HERO_SLIDES[idx]?.src || slide.src,
    }));
  }, [ap.heroCommercialSlides]);

  const residentialHeroSlides = useMemo(() => {
    const list = ap.heroResidentialSlides || RESIDENTIAL_HERO_SLIDES;
    return list.map((slide, idx) => ({
      ...slide,
      src: RESIDENTIAL_HERO_SLIDES[idx]?.src || slide.src,
    }));
  }, [ap.heroResidentialSlides]);

  const environmentFeatures = useMemo(() => {
    const icons = [
      <Sun size={24} strokeWidth={1.5} />,
      <Wind size={24} strokeWidth={1.5} />,
      <Waves size={24} strokeWidth={1.5} />,
      <Compass size={24} strokeWidth={1.5} />,
      <Zap size={24} strokeWidth={1.5} />,
      <Monitor size={24} strokeWidth={1.5} />,
    ];
    const trans = ap.features || RAW_ENVIRONMENT_FEATURES;
    return trans.map((item, idx) => ({
      ...item,
      icon: icons[idx] || RAW_ENVIRONMENT_FEATURES[idx]?.icon,
    }));
  }, [ap.features]);

  const testimonials = useMemo(() => {
    const list = ap.testimonials || TESTIMONIALS;
    return list.map((item, idx) => ({
      ...item,
      image: TESTIMONIALS[idx]?.image,
    }));
  }, [ap.testimonials]);

  const mosaicStudies = useMemo(() => {
    const list = ap.caseStudies || MOSAIC_STUDIES;
    return list.map((item, idx) => ({
      ...item,
      image: MOSAIC_STUDIES[idx]?.image,
    }));
  }, [ap.caseStudies]);

  // Agent Scheduling States
  const availableDates = m.dates || ['Today, Oct 28', 'Tomorrow, Oct 29', 'Friday, Oct 30'];
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const selectedDate = availableDates[selectedDateIndex] || availableDates[0];
  const [selectedTime, setSelectedTime] = useState('02:00 PM');
  const [copiedLink, setCopiedLink] = useState(false);

  // Live Agent WebRTC Video Bridge States
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [screenSharing, setScreenSharing] = useState(false);

  // Active Hero Slides (3 requested modern Indian architectural simulation slides)
  const heroSlides = useMemo(() => {
    const localized = ap.heroSlides || ANANDA_HERO_SLIDES;
    return ANANDA_HERO_SLIDES.map((slide, idx) => ({
      ...slide,
      title: localized[idx]?.title || slide.title,
      desc: localized[idx]?.desc || slide.desc,
    }));
  }, [ap.heroSlides]);

  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [isHeroRevealed, setIsHeroRevealed] = useState(false);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const heroReadyTriggered = useRef(false);

  const handleHeroReady = () => {
    if (heroReadyTriggered.current) return;
    heroReadyTriggered.current = true;
    requestAnimationFrame(() => {
      setIsHeroRevealed(true);
    });
  };

  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      handleHeroReady();
    }, 350);
    return () => clearTimeout(fallbackTimer);
  }, []);

  // Automatic slide rotation (5s duration, synchronized with noise dissolve WebGL transition)
  useEffect(() => {
    if (!isHeroRevealed || isHeroPaused) return;
    const timer = setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHeroRevealed, isHeroPaused, heroSlides.length]);

  const handleSelectHeroSlide = (idx) => {
    setActiveHeroIndex(idx);
  };

  // Persist category selection in sessionStorage and localStorage
  useEffect(() => {
    try {
      const cat = isResidential ? 'residential' : 'commercial';
      sessionStorage.setItem('ananda_category', cat);
      localStorage.setItem('uandwe_active_platform', cat);
    } catch {
      // ignore
    }
  }, [isResidential]);

  // Restore and persist scroll position on Ananda page
  useEffect(() => {
    let savedY = null;
    try {
      savedY = sessionStorage.getItem('ananda_scroll_y');
    } catch {}
    if (savedY && Number(savedY) > 80) {
      setTimeout(() => {
        window.scrollTo({ top: Number(savedY), behavior: 'instant' });
      }, 40);
      setTimeout(() => {
        window.scrollTo({ top: Number(savedY), behavior: 'instant' });
      }, 150);
    }

    const handleScroll = () => {
      try {
        sessionStorage.setItem('ananda_scroll_y', String(window.scrollY));
      } catch {}
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll visibility states for Core Capabilities cards, Commercial/Residential Duality, Testimonials & Case Studies
  const [cardVisible, setCardVisible] = useState([false, false, false, false, false, false]);
  const cardRefs = useRef([]);
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const [dualityVisible, setDualityVisible] = useState(false);
  const [testimonialsVisible, setTestimonialsVisible] = useState(false);
  const [caseTopVisible, setCaseTopVisible] = useState(false);
  const [caseBottomVisible, setCaseBottomVisible] = useState(false);
  const dualityRef = useRef(null);
  const testimonialsRef = useRef(null);
  const caseTopRef = useRef(null);
  const caseBottomRef = useRef(null);

  const getCardDelay = (idx, isVisible) => {
    if (!isVisible) return '0ms';
    if (screenWidth >= 1024) {
      return `${(idx % 3) * 120}ms`;
    }
    if (screenWidth >= 768) {
      return `${(idx % 2) * 130}ms`;
    }
    return '0ms';
  };

  useEffect(() => {
    const checkVisibility = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const vw = window.innerWidth || document.documentElement.clientWidth;
      setScreenWidth(vw);

      // Section 2: Core Capabilities cards visibility
      const isCardInView = (el) => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top < vh - 40 && r.bottom > -250;
      };

      const nextCardVis = [false, false, false, false, false, false];

      if (vw >= 1024) {
        // Desktop (3 columns): 2 rows of 3 cards
        const desktopRows = [[0, 1, 2], [3, 4, 5]];
        desktopRows.forEach((rowIndices) => {
          const isRowVis = rowIndices.some((idx) => isCardInView(cardRefs.current[idx]));
          rowIndices.forEach((idx) => {
            nextCardVis[idx] = isRowVis;
          });
        });
      } else if (vw >= 768) {
        // Tablet / iPad Mini (2 columns): 3 rows of 2 cards ("two two cards")
        const tabletRows = [[0, 1], [2, 3], [4, 5]];
        tabletRows.forEach((rowIndices) => {
          const isRowVis = rowIndices.some((idx) => isCardInView(cardRefs.current[idx]));
          rowIndices.forEach((idx) => {
            nextCardVis[idx] = isRowVis;
          });
        });
      } else {
        // Mobile / Small screen (1 column): each card individually ("one one card")
        for (let i = 0; i < 6; i++) {
          nextCardVis[i] = isCardInView(cardRefs.current[i]);
        }
      }

      setCardVisible((prev) => {
        let changed = false;
        for (let i = 0; i < 6; i++) {
          if (prev[i] !== nextCardVis[i]) {
            changed = true;
            break;
          }
        }
        return changed ? nextCardVis : prev;
      });

      if (dualityRef.current) {
        const r = dualityRef.current.getBoundingClientRect();
        // Trigger precisely when the Bento grid is 100px inside viewport; resets when leaving
        setDualityVisible(r.top < vh - 100 && r.bottom > 80);
      }
      if (testimonialsRef.current) {
        const r = testimonialsRef.current.getBoundingClientRect();
        setTestimonialsVisible(r.top < vh - 50 && r.bottom > 0);
      }
      if (caseTopRef.current) {
        const r = caseTopRef.current.getBoundingClientRect();
        setCaseTopVisible(r.top < vh - 50 && r.bottom > 0);
      }
      if (caseBottomRef.current) {
        const r = caseBottomRef.current.getBoundingClientRect();
        setCaseBottomVisible(r.top < vh - 50 && r.bottom > 0);
      }
    };

    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });
    checkVisibility();
    const t = setTimeout(checkVisibility, 80);

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
      clearTimeout(t);
    };
  }, []);

  // Dedicated IntersectionObserver for Section 2 Capabilities cards
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      () => {
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const vw = window.innerWidth || document.documentElement.clientWidth;
        setScreenWidth(vw);

        const isCardInView = (el) => {
          if (!el) return false;
          const r = el.getBoundingClientRect();
          return r.top < vh - 40 && r.bottom > -250;
        };

        const nextCardVis = [false, false, false, false, false, false];

        if (vw >= 1024) {
          const desktopRows = [[0, 1, 2], [3, 4, 5]];
          desktopRows.forEach((rowIndices) => {
            const isRowVis = rowIndices.some((idx) => isCardInView(cardRefs.current[idx]));
            rowIndices.forEach((idx) => {
              nextCardVis[idx] = isRowVis;
            });
          });
        } else if (vw >= 768) {
          const tabletRows = [[0, 1], [2, 3], [4, 5]];
          tabletRows.forEach((rowIndices) => {
            const isRowVis = rowIndices.some((idx) => isCardInView(cardRefs.current[idx]));
            rowIndices.forEach((idx) => {
              nextCardVis[idx] = isRowVis;
            });
          });
        } else {
          for (let i = 0; i < 6; i++) {
            nextCardVis[i] = isCardInView(cardRefs.current[i]);
          }
        }

        setCardVisible((prev) => {
          let changed = false;
          for (let i = 0; i < 6; i++) {
            if (prev[i] !== nextCardVis[i]) {
              changed = true;
              break;
            }
          }
          return changed ? nextCardVis : prev;
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: [0, 0.1, 0.25],
      }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [screenWidth]);

  // Dedicated IntersectionObserver for Bento Scale Cards
  // Ensures animation triggers only when cards are visibly on-screen, and re-triggers each time you scroll to it
  useEffect(() => {
    const el = dualityRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setDualityVisible(entry.isIntersecting);
        });
      },
      {
        root: null,
        rootMargin: '-60px 0px -100px 0px',
        threshold: 0.1,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Live Call duration timer
  useEffect(() => {
    if (!modalOpen || modalStep !== 'connect') return;
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [modalOpen, modalStep]);

  // Motion variants
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  // GPS Location Detection Handler
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setGpsStatus('denied');
      return;
    }
    setGpsStatus('detecting');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        const acc = Math.round(pos.coords.accuracy || 3);
        setFormData((prev) => ({
          ...prev,
          latitude: lat,
          longitude: lng,
        }));
        setGpsAccuracy(acc);
        setGpsStatus('locked');
      },
      (err) => {
        console.warn('Geolocation acquisition error:', err);
        setGpsStatus('denied');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // Format MM:SS duration
  const formatDuration = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  // Copy meeting link
  const handleCopyMeetingLink = () => {
    navigator.clipboard?.writeText('https://meet.uandwelabs.com/ananda-geo-8492');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Close modal with state reset
  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => {
      setModalStep('form');
      setCallDuration(0);
      setGpsStatus('idle');
      setCopiedLink(false);
      setIsMuted(false);
      setIsVideoOff(false);
      setScreenSharing(false);
    }, 250);
  };

  // Form submit -> proceed to Agent Scheduling
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setModalStep('schedule');
  };

  // Google Calendar URL generator
  const generateGoogleCalendarUrl = () => {
    const title = encodeURIComponent("Ananda GeoSpatial Simulation Consultation - UandWe Labs");
    const details = encodeURIComponent(
      `Consultation with Dr. Aris Vance (Principal GeoSpatial Engineer)\nSite Target Coordinates: ${formData.latitude}° N, ${formData.longitude}° E\nPractice/Studio: ${formData.company || 'Private Practice'}\nProject Scale: ${formData.sector}\nMeeting Link: https://meet.uandwelabs.com/ananda-geo-8492`
    );
    const location = encodeURIComponent("https://meet.uandwelabs.com/ananda-geo-8492");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <div className="bg-white min-h-screen text-neutral-900 w-full selection:bg-black selection:text-white font-sans">

      {/* ======================================================== */}
      {/* 1. IMMERSIVE HERO SECTION (MorphGallery WebGL Shader)    */}
      {/* ======================================================== */}
      <div className="min-h-screen relative flex flex-col justify-between overflow-hidden font-['Inter'] text-white select-text">
        {/* Full-Bleed Artwork (Morph Gallery with WebGL noise dissolve transition - same as Homepage) */}
        <div
          className={`absolute inset-0 w-full h-full z-0 overflow-hidden transition-all duration-1000 ease-out ${
            isHeroRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]'
          }`}
        >
          <MorphGallery
            items={heroSlides}
            index={activeHeroIndex}
            onIndexChange={handleSelectHeroSlide}
            autoplay={0}
            duration={1200}
            height="100%"
            arrows={false}
            thumbnails={false}
            onReady={handleHeroReady}
          />
          {/* Cinematic dark scrims from Homepage Hero to ensure pristine typography legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 via-50% to-transparent/10 pointer-events-none z-[1]" />
          <div className="absolute inset-0 bg-black/15 pointer-events-none z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 pointer-events-none z-[1]" />
        </div>

        {/* Top Back Navigation Button (Positioned at the top below header) */}
        <div className="absolute top-24 sm:top-28 lg:top-32 left-0 right-0 z-20 pointer-events-none">
          <div className="w-full max-w-[1560px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 2xl:px-20 flex justify-start">
            <button
              type="button"
              onClick={() => {
                if (onNavigateToHome) onNavigateToHome()
                else if (typeof window !== 'undefined') window.location.hash = ''
              }}
              aria-label="Back to Home"
              className="pointer-events-auto w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 group cursor-pointer shadow-lg hover:scale-105 active:scale-95 hover:border-white/40"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* MAIN HERO CONTENT (Identical layout, positioning & text sizes to Homepage Hero) */}
        <main className="relative z-10 flex-1 w-full flex items-center pointer-events-none pt-20 sm:pt-24 lg:pt-28 pb-12">
          <div className="relative z-10 w-full max-w-[1560px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 2xl:px-20 py-8 flex flex-col justify-center pointer-events-auto">
            <div className="max-w-3xl">
              {/* Master Content: Synchronized with Active Slide & Image Morph */}
              <div
                key={activeHeroIndex}
                className={`transition-all duration-1000 ${
                  isHeroRevealed ? 'animate-hero-sync' : 'opacity-0'
                }`}
              >
                {/* Master Headline: Synchronized with Active Slide - (Commented out for now) */}
                {/* <div className="relative inline-block py-1">
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-[64px] font-normal font-['Inter'] tracking-[0.03em] text-white uppercase leading-[1.08] select-text drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
                    {heroSlides[activeHeroIndex]?.title || ap.heroDefaultTitle || 'Where Architecture Meets Physics'}
                  </h1>
                </div> */}

                {/* Subtitle Paragraph: Synchronized with Active Slide - (Commented out for now) */}
                {/* <p className="mt-5 sm:mt-6 text-sm sm:text-[15.5px] text-white font-normal leading-relaxed max-w-xl font-['Inter'] min-h-[64px] sm:min-h-[72px] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
                  {heroSlides[activeHeroIndex]?.desc || (isResidential
                    ? (ap.heroResidentialFallbackDesc || 'Passive cross-ventilation, daylight autonomy, and microclimate comfort for private villas and estates in real time.')
                    : (ap.heroCommercialFallbackDesc || 'Sub-meter solar ray-casting, Lattice Boltzmann aerodynamic wind fields, and 2D Saint-Venant flood hydrology for commercial scale masterplans.')
                  )}
                </p> */}

                {/* Action Button: SCHEDULE SIMULATION ────○ (Commented out for now) */}
                {/* <div className="mt-6 sm:mt-8">
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center gap-4 group cursor-pointer font-['Inter'] active:scale-[0.98] transition-transform duration-150"
                  >
                    <span className="text-[11.5px] font-semibold tracking-[0.2em] uppercase text-white group-hover:text-white/80 transition-colors drop-shadow-sm">
                      {ap.scheduleSimulation || 'SCHEDULE SIMULATION'}
                    </span>

                    <div className="h-[1.5px] w-12 sm:w-16 bg-white/70 group-hover:w-20 sm:group-hover:w-24 transition-all duration-300" />

                    <div className="w-8 h-8 rounded-full border border-white/60 bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-sm text-white">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </main>

        {/* CORNER DOWN SQUARE THUMBNAILS (Exact same placement & thumbnail styling as Homepage Hero) */}
        <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 z-20 pointer-events-none">
          <div className="w-full max-w-[1560px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 2xl:px-20 flex justify-end">
            <nav
              aria-label="Ananda Hero Slide Navigation"
              className={`pointer-events-auto transition-all duration-1000 ${
                isHeroRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              onMouseEnter={() => setIsHeroPaused(true)}
              onMouseLeave={() => setIsHeroPaused(false)}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                {heroSlides.map((slide, idx) => {
                  const isActive = idx === activeHeroIndex;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => handleSelectHeroSlide(idx)}
                      className={`relative aspect-square w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 outline-none group select-none ${
                        isActive
                          ? 'border border-white scale-110 shadow-[0_12px_32px_rgba(0,0,0,0.65),0_0_16px_rgba(255,255,255,0.35)] opacity-100 z-10'
                          : 'border border-white/25 shadow-[0_8px_24px_rgba(0,0,0,0.45)] opacity-60 hover:opacity-100 hover:border-white/70 hover:scale-105'
                      }`}
                      title={`Switch to ${slide.title}`}
                      aria-label={`Slide ${idx + 1}: ${slide.title}`}
                      aria-current={isActive}
                    >
                      <img
                        src={slide.thumb || slide.src}
                        alt={slide.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
      </div>


      {/* ======================================================== */}
      {/* INNER CONTENT WRAPPER                                    */}
      {/* ======================================================== */}
      <div className="px-[4%] max-w-[1600px] mx-auto">

        {/* ======================================================== */}
        {/* 2. CORE CAPABILITIES (SWISS BRUTALIST 6-GRID)            */}
        {/* ======================================================== */}
        <div className="w-full py-12 sm:py-16 md:py-24 border-b border-black/10">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-900 mb-8 sm:mb-12 md:mb-16 font-sans">
            {ap.coreTitle || 'The Architecture of Innovation'}
          </h2>

          {/* Continuous Swiss Brutalist 6-Grid: 3 cols (desktop), 2 cols (tablet), 1 col (mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-0 md:border-t md:border-l md:border-black/10">
            {environmentFeatures.map((feature, idx) => (
              <div
                key={idx}
                ref={(el) => (cardRefs.current[idx] = el)}
                className="p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-none border border-black/10 md:border-0 md:border-b md:border-r md:border-black/10 flex flex-col justify-between group hover:bg-black transition-all duration-500 cursor-default bg-white shadow-xs md:shadow-none"
                style={{
                  transform: cardVisible[idx] ? 'translateY(0)' : 'translateY(50px)',
                  opacity: cardVisible[idx] ? 1 : 0,
                  transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 850ms cubic-bezier(0.16, 1, 0.3, 1), background-color 500ms, border-color 500ms',
                  transitionDelay: getCardDelay(idx, cardVisible[idx]),
                  willChange: 'transform, opacity',
                }}
              >
                <div>
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-neutral-100 group-hover:bg-white/10 flex items-center justify-center text-neutral-900 group-hover:text-white transition-colors duration-500 mb-6 sm:mb-8 shrink-0">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-normal text-neutral-900 tracking-tight mb-3 sm:mb-4 group-hover:text-white transition-colors duration-500 font-sans">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 font-normal text-sm leading-relaxed group-hover:text-neutral-300 transition-colors duration-500 font-sans">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> {/* END INNER CONTENT WRAPPER 1 */}


      {/* ======================================================== */}
      {/* 4. WORK / PLAY DUALITY SWITCHER (COMMERCIAL × RESIDENTIAL) */}
      {/* ======================================================== */}
      <section
        className="w-full py-20 md:py-24 border-b border-black/10 transition-colors duration-1000 overflow-x-clip"
        style={{ backgroundColor: isResidential ? '#0d0e12' : '#000000' }}
      >
        <div className="max-w-[1600px] mx-auto px-[4%] flex flex-col items-center">

          {/* The Toggle Switch */}
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-3 sm:gap-6 mb-10 sm:mb-12 md:mb-16">
            <span className={`text-base sm:text-2xl md:text-3xl font-normal transition-colors duration-500 text-center ${!isResidential ? 'text-white' : 'text-neutral-600'}`}>
              {ap.commercialScale || 'Commercial Scale'}
            </span>

            <button
              type="button"
              onClick={() => {
                const next = !isResidential;
                setIsResidential(next);
                const nextCategory = next ? 'residential' : 'commercial';
                try {
                  sessionStorage.setItem('ananda_category', nextCategory);
                  localStorage.setItem('uandwe_active_platform', nextCategory);
                } catch {
                  // ignore
                }
                window.dispatchEvent(new CustomEvent('ananda_category_change', { detail: nextCategory }));
              }}
              className="w-20 sm:w-24 h-10 sm:h-12 rounded-full bg-neutral-800 border border-white/20 relative flex items-center px-1.5 sm:px-2 cursor-pointer transition-colors duration-500 hover:border-white/50 shrink-0"
              aria-label={ap.toggleScaleAria || "Toggle Commercial or Residential Scale"}
            >
              <motion.div
                animate={{ x: isResidential ? 40 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-lg"
              />
            </button>

            <span className={`text-base sm:text-2xl md:text-3xl font-normal transition-colors duration-500 text-center ${isResidential ? 'text-white' : 'text-neutral-600'}`}>
              {ap.residentialLiving || 'Residential Living'}
            </span>
          </div>

          {/* Bento Dynamic Display */}
          <div className="max-w-6xl w-full">
            <div
              ref={dualityRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full h-auto md:h-[580px]"
            >

              {/* Main Left Card (Col Span 2) - 1st image comes from down */}
              <div
                className="col-span-1 md:col-span-2 h-[260px] sm:h-[340px] md:h-full min-h-0 relative overflow-hidden bg-neutral-800 rounded-2xl md:rounded-none group cursor-pointer"
                style={{
                  transform: dualityVisible ? 'translateY(0)' : 'translateY(160px)',
                  opacity: dualityVisible ? 1 : 0,
                  transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 850ms cubic-bezier(0.16, 1, 0.3, 1)',
                  willChange: 'transform, opacity',
                }}
              >
                <img
                  key={isResidential ? 'res-1' : 'comm-1'}
                  src={isResidential ? sunsetAerialApartments : goldenHourPlazaShadows}
                  alt={isResidential ? "Residential Apartment Sunset Simulation" : "Commercial Solar Simulation"}
                  className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Stacked Right Column */}
              <div className="col-span-1 flex flex-col gap-6 h-auto md:h-full min-h-0">

                {/* Top Right Card - comes from right side */}
                <div
                  className="h-[220px] md:h-auto md:flex-1 min-h-0 relative overflow-hidden bg-neutral-800 rounded-2xl md:rounded-none group cursor-pointer"
                  style={{
                    transform: dualityVisible ? 'translateX(0)' : 'translateX(160px)',
                    opacity: dualityVisible ? 1 : 0,
                    transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 850ms cubic-bezier(0.16, 1, 0.3, 1)',
                    willChange: 'transform, opacity',
                  }}
                >
                  <img
                    key={isResidential ? 'res-2' : 'comm-2'}
                    src={isResidential ? luminousCourtyardAirflow : modernOfficeStreamlines}
                    alt={isResidential ? "Residential Courtyard Airflow CFD Simulation" : "Commercial Airflow CFD Simulation"}
                    className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Bottom Right Card - comes from right side with stagger */}
                <div
                  className="h-[220px] md:h-auto md:flex-1 min-h-0 relative overflow-hidden bg-neutral-800 rounded-2xl md:rounded-none group cursor-pointer"
                  style={{
                    transform: dualityVisible ? 'translateX(0)' : 'translateX(160px)',
                    opacity: dualityVisible ? 1 : 0,
                    transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 850ms cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: dualityVisible ? '140ms' : '0ms',
                    willChange: 'transform, opacity',
                  }}
                >
                  <img
                    key={isResidential ? 'res-3' : 'comm-3'}
                    src={isResidential ? floodedCourtyardFlow : glowingBlueFlows}
                    alt={isResidential ? "Residential Courtyard Flood Simulation" : "Commercial Flood Hydrology Simulation"}
                    className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 ease-out group-hover:scale-105"
                  />
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>


      {/* ======================================================== */}
      {/* INNER CONTENT WRAPPER 2                                  */}
      {/* ======================================================== */}
      <div className="px-[4%] max-w-[1600px] mx-auto">

        {/* ======================================================== */}
        {/* 5. ARCHITECT & ENGINEERING PERSPECTIVES (TESTIMONIALS)   */}
        {/* ======================================================== */}
        <div className="w-full pt-12 sm:pt-16 md:pt-24 pb-6 sm:pb-8 md:pb-10">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-900 mb-8 sm:mb-12 md:mb-16 text-left">
            {ap.perspectivesTitle || 'Architect & Engineering Perspectives'}
          </h2>

          <div ref={testimonialsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 xl:gap-10 overflow-x-clip">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="flex flex-col border border-black/10 p-6 sm:p-7 lg:p-8 xl:p-10 rounded-2xl lg:rounded-none bg-neutral-50 hover:bg-white hover:border-black/30 transition-all duration-300"
                style={{
                  transform: testimonialsVisible
                    ? 'translate(0, 0)'
                    : 'translateY(40px)',
                  opacity: testimonialsVisible ? 1 : 0,
                  transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 850ms cubic-bezier(0.16, 1, 0.3, 1), background-color 300ms, border-color 300ms',
                  transitionDelay: testimonialsVisible ? `${idx * 120}ms` : '0ms',
                  willChange: 'transform, opacity',
                }}
              >
                <div className="mb-4 sm:mb-6">
                  <Quote size={28} className="text-neutral-900/15" />
                </div>
                <p className="text-base sm:text-lg lg:text-lg xl:text-xl font-normal text-neutral-900 leading-relaxed mb-6 sm:mb-8 flex-grow">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3.5 sm:gap-4 pt-5 sm:pt-6 border-t border-black/10">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover grayscale shrink-0"
                  />
                  <div>
                    <h4 className="text-neutral-900 font-medium text-sm sm:text-base leading-tight">
                      {testimonial.name}
                    </h4>
                    <p className="text-neutral-500 text-xs sm:text-[13px] tracking-normal mt-0.5">
                      {testimonial.role} · {testimonial.studio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* ======================================================== */}
        {/* 6. BUILT ON ANANDA (SELECTED PROJECTS & CASE STUDIES)   */}
        {/* ======================================================== */}
        <div className="w-full pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8 md:pb-10 border-b border-black/10">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-900 mb-8 sm:mb-12 md:mb-16 text-left">
            {ap.caseStudiesTitle || 'Built on Ananda'}
          </h2>

          <div className="border border-black/10 overflow-hidden rounded-2xl md:rounded-none overflow-x-clip">

            {/* Top 2x2 Bento Block (4 images: 1st from left, right 3 from down) */}
            <div ref={caseTopRef} className="grid grid-cols-1 md:grid-cols-2 border-b border-black/10">

              {/* Study 1: Solar (Square on Left - comes from left side) */}
              <div
                className="aspect-square relative group overflow-hidden border-b md:border-b-0 border-r border-black/10 bg-neutral-100 cursor-pointer"
                style={{
                  transform: caseTopVisible ? 'translateX(0)' : 'translateX(-160px)',
                  opacity: caseTopVisible ? 1 : 0,
                  transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 850ms cubic-bezier(0.16, 1, 0.3, 1)',
                  willChange: 'transform, opacity',
                }}
              >
                <img
                  src={mosaicStudies[0].image}
                  alt={mosaicStudies[0].title}
                  className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 pointer-events-none">
                  <h3 className="text-white text-2xl font-normal tracking-tight">{mosaicStudies[0].title}</h3>
                  <p className="text-neutral-300 font-normal mt-2 text-sm">{mosaicStudies[0].desc}</p>
                </div>
              </div>

              {/* Right Side: 3 images (all come from down) */}
              <div className="grid grid-cols-2 aspect-square">
                {/* Study 2: Airflow - comes from down */}
                <div
                  className="aspect-square relative group overflow-hidden border-b border-r border-black/10 bg-neutral-100 cursor-pointer"
                  style={{
                    transform: caseTopVisible ? 'translateY(0)' : 'translateY(160px)',
                    opacity: caseTopVisible ? 1 : 0,
                    transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 850ms cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: caseTopVisible ? '80ms' : '0ms',
                    willChange: 'transform, opacity',
                  }}
                >
                  <img
                    src={mosaicStudies[1].image}
                    alt={mosaicStudies[1].title}
                    className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 sm:p-8 pointer-events-none">
                    <h3 className="text-white text-lg sm:text-xl font-normal tracking-tight">{mosaicStudies[1].title}</h3>
                    <p className="text-neutral-300 text-xs font-normal mt-2">{mosaicStudies[1].desc}</p>
                  </div>
                </div>

                {/* Study 3: Hydrology - comes from down */}
                <div
                  className="aspect-square relative group overflow-hidden border-b border-r border-black/10 bg-neutral-100 cursor-pointer"
                  style={{
                    transform: caseTopVisible ? 'translateY(0)' : 'translateY(160px)',
                    opacity: caseTopVisible ? 1 : 0,
                    transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 850ms cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: caseTopVisible ? '160ms' : '0ms',
                    willChange: 'transform, opacity',
                  }}
                >
                  <img
                    src={mosaicStudies[2].image}
                    alt={mosaicStudies[2].title}
                    className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 sm:p-8 pointer-events-none">
                    <h3 className="text-white text-lg sm:text-xl font-normal tracking-tight">{mosaicStudies[2].title}</h3>
                    <p className="text-neutral-300 text-xs font-normal mt-2">{mosaicStudies[2].desc}</p>
                  </div>
                </div>

                {/* Study 4: Helio-Reflective Pavilion - comes from down */}
                <div
                  className="col-span-2 aspect-[2/1] relative group overflow-hidden border-r border-black/10 bg-neutral-100 cursor-pointer"
                  style={{
                    transform: caseTopVisible ? 'translateY(0)' : 'translateY(160px)',
                    opacity: caseTopVisible ? 1 : 0,
                    transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 850ms cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: caseTopVisible ? '240ms' : '0ms',
                    willChange: 'transform, opacity',
                  }}
                >
                  <img
                    src={mosaicStudies[3].image}
                    alt={mosaicStudies[3].title}
                    className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 sm:p-8 pointer-events-none">
                    <h3 className="text-white text-xl font-normal tracking-tight">{mosaicStudies[3].title}</h3>
                    <p className="text-neutral-300 text-xs font-normal mt-2">{mosaicStudies[3].desc}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom 4-Column Row (4 equal square images: all come from down fully) */}
            <div ref={caseBottomRef} className="grid grid-cols-1 md:grid-cols-4">

              {/* Study 5: Villa Daylighting - comes from down fully */}
              <div
                className="md:col-span-1 aspect-square relative group overflow-hidden border-b md:border-b-0 border-r border-black/10 bg-neutral-100 cursor-pointer"
                style={{
                  transform: caseBottomVisible ? 'translateY(0)' : 'translateY(160px)',
                  opacity: caseBottomVisible ? 1 : 0,
                  transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 850ms cubic-bezier(0.16, 1, 0.3, 1)',
                  willChange: 'transform, opacity',
                }}
              >
                <img
                  src={mosaicStudies[4].image}
                  alt={mosaicStudies[4].title}
                  className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 pointer-events-none">
                  <h3 className="text-white text-xl font-normal tracking-tight">{mosaicStudies[4].title}</h3>
                  <p className="text-neutral-300 text-xs font-normal mt-2">{mosaicStudies[4].desc}</p>
                </div>
              </div>

              {/* Study 6: Bioclimatic Canopy - comes from down fully */}
              <div
                className="md:col-span-1 aspect-square relative group overflow-hidden border-b md:border-b-0 border-r border-black/10 bg-neutral-100 cursor-pointer"
                style={{
                  transform: caseBottomVisible ? 'translateY(0)' : 'translateY(160px)',
                  opacity: caseBottomVisible ? 1 : 0,
                  transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 850ms cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: caseBottomVisible ? '120ms' : '0ms',
                  willChange: 'transform, opacity',
                }}
              >
                <img
                  src={mosaicStudies[5].image}
                  alt={mosaicStudies[5].title}
                  className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 pointer-events-none">
                  <h3 className="text-white text-xl font-normal tracking-tight">{mosaicStudies[5].title}</h3>
                  <p className="text-neutral-300 text-xs font-normal mt-2">{mosaicStudies[5].desc}</p>
                </div>
              </div>

              {/* Study 7: Metropolitan Masterplan - Box 1 */}
              <div
                className="md:col-span-1 aspect-square relative group overflow-hidden border-b md:border-b-0 border-r border-black/10 bg-neutral-100 cursor-pointer"
                style={{
                  transform: caseBottomVisible ? 'translateY(0)' : 'translateY(160px)',
                  opacity: caseBottomVisible ? 1 : 0,
                  transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 850ms cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: caseBottomVisible ? '200ms' : '0ms',
                  willChange: 'transform, opacity',
                }}
              >
                <img
                  src={mosaicStudies[6]?.image}
                  alt={mosaicStudies[6]?.title}
                  className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 sm:p-8 pointer-events-none">
                  <h3 className="text-white text-xl font-normal tracking-tight">{mosaicStudies[6]?.title}</h3>
                  <p className="text-neutral-300 text-xs font-normal mt-2 leading-relaxed">
                    {mosaicStudies[6]?.desc}
                  </p>
                </div>
              </div>

              {/* Study 8: Second Box - Box 2 */}
              <div
                className="md:col-span-1 aspect-square relative group overflow-hidden border-r border-black/10 bg-neutral-100 cursor-pointer"
                style={{
                  transform: caseBottomVisible ? 'translateY(0)' : 'translateY(160px)',
                  opacity: caseBottomVisible ? 1 : 0,
                  transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 850ms cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: caseBottomVisible ? '280ms' : '0ms',
                  willChange: 'transform, opacity',
                }}
              >
                <img
                  src={mosaicStudies[7]?.image || mosaicStudies[6]?.image}
                  alt={mosaicStudies[7]?.title || 'Metropolitan Massing Masterplan'}
                  className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 sm:p-8 pointer-events-none">
                  <h3 className="text-white text-xl font-normal tracking-tight">{mosaicStudies[7]?.title || 'Metropolitan Massing Masterplan'}</h3>
                  <p className="text-neutral-300 text-xs font-normal mt-2 leading-relaxed">
                    {mosaicStudies[7]?.desc || 'Multi-acre urban physics convergence, solar diurnal ray-casting, and environmental massing analysis.'}
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>


        {/* ======================================================== */}
        {/* 7. MONOCHROMATIC HIGH-IMPACT CTA                         */}
        {/* ======================================================== */}
        <CommonCta
          title={ap.ctaTitle || 'Ready to shape the future?'}
          subtitle={ap.ctaDesc || 'Deploy GPU ray-casting, aerodynamic wind CFD, and flood hydrology on your next architectural development with our engineering team.'}
          buttonText={ap.ctaButton || 'Schedule Simulation Consultation'}
          onButtonClick={() => setModalOpen(true)}
        />


      </div> {/* END INNER CONTENT WRAPPER 2 */}

      {/* ======================================================== */}
      {/* 8. GLOBAL SITE FOOTER                                    */}
      {/* ======================================================== */}
      <Footer
        onNavigateToHome={onNavigateToHome}
        onNavigateToAnanda={(category) => {
          setIsResidential(category === 'residential');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToDara={onNavigateToDara}
        onNavigateToAura={onNavigateToAura}
        onNavigateToBlogs={onNavigateToBlogs}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToCareers={onNavigateToCareers}
        onNavigateToPrivacy={onNavigateToPrivacy}
        onNavigateToTerms={onNavigateToTerms}
      />


      {/* ======================================================== */}
      {/* 9. SIMULATION REQUEST & AGENT CONSULTATION MODAL        */}
      {/* ======================================================== */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md cursor-pointer overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 12 }}
              transition={{ type: "spring", damping: 28, stiffness: 350, mass: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full ${modalStep === 'connect' ? 'max-w-5xl' : 'max-w-3xl'
                } bg-white rounded-3xl border border-black/15 p-8 sm:p-12 shadow-2xl text-left text-neutral-900 cursor-default max-h-[92vh] overflow-y-auto font-sans`}
            >
              {/* STEP 1: FORM WITH LAT / LNG & GPS LOCATION DETECTION */}
              {modalStep === 'form' && (
                <>
                  <div className="flex items-start justify-between pb-4 border-b border-black/10">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-900 font-sans">
                        {m.formTitle || 'Schedule Simulation Consultation'}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="p-2 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
                      title={m.close || 'Close'}
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4 pt-6 font-sans">
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1.5 font-sans">
                        {m.fullNameLabel || 'Full Name'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={m.fullNamePlaceholder || 'Your Full Name'}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-black outline-none transition-colors font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1.5 font-sans">
                        {m.emailLabel || 'Email'}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder={m.emailPlaceholder || 'your.email@domain.com'}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-black outline-none transition-colors font-sans"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-neutral-700 mb-1.5 font-sans">
                          {m.practiceLabel || 'Practice / Studio'}
                        </label>
                        <input
                          type="text"
                          placeholder={m.practicePlaceholder || 'Agency Name'}
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-black outline-none transition-colors font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-neutral-700 mb-1.5 font-sans">
                          {m.scaleLabel || 'Scale'}
                        </label>
                        <select
                          value={formData.sector}
                          onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-sm text-neutral-900 focus:border-black outline-none transition-colors cursor-pointer font-sans"
                        >
                          <option value="commercial">{m.commercialScale || 'Commercial Scale'}</option>
                          <option value="residential">{m.residentialScale || 'Residential Scale'}</option>
                          <option value="both">{m.bothScale || 'Both / Municipal'}</option>
                        </select>
                      </div>
                    </div>

                    {/* LATITUDE & LONGITUDE COORDINATES */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-medium text-neutral-700 font-sans">
                          {m.siteCoordinatesLabel || 'Site Coordinates (Lat / Long)'}
                        </label>
                        {gpsStatus === 'locked' && (
                          <span className="inline-flex items-center gap-1 text-xs text-neutral-900 bg-neutral-100 px-2.5 py-1 rounded-full border border-black/20 font-sans">
                            <CheckCircle2 size={12} className="text-black" />
                            <span>{m.gpsLocked || 'GPS Locked'} {gpsAccuracy ? `(±${gpsAccuracy}m)` : ''}</span>
                          </span>
                        )}
                        {gpsStatus === 'detecting' && (
                          <span className="inline-flex items-center gap-1.5 text-xs text-neutral-700 bg-neutral-100 px-2.5 py-1 rounded-full border border-neutral-300 font-sans">
                            <span className="w-1.5 h-1.5 rounded-full bg-black ring-2 ring-black/30" />
                            <span>{m.acquiringFix || 'Acquiring Fix...'}</span>
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <input
                            type="text"
                            required
                            placeholder={m.latPlaceholder || 'Latitude (e.g. 12.971599)'}
                            value={formData.latitude}
                            onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-black outline-none transition-colors font-sans"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            required
                            placeholder={m.lngPlaceholder || 'Longitude (e.g. 77.594566)'}
                            value={formData.longitude}
                            onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-black outline-none transition-colors font-sans"
                          />
                        </div>
                      </div>

                      {/* Detect Current Location GPS Button */}
                      <button
                        type="button"
                        onClick={handleDetectLocation}
                        className="w-full mt-3 py-3 px-4 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-xl text-neutral-800 text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer font-sans"
                      >
                        <Crosshair size={14} className={gpsStatus === 'detecting' ? 'animate-spin text-black' : 'text-neutral-600'} />
                        <span>
                          {gpsStatus === 'detecting' ? (m.acquiringSatellite || 'Acquiring Satellite Lock...') : (m.detectLocation || 'Detect Current Location')}
                        </span>
                      </button>

                      {gpsStatus === 'denied' && (
                        <p className="text-xs text-neutral-600 bg-neutral-100 p-2.5 mt-2 rounded-xl border border-neutral-300 font-sans">
                          {m.locationDenied || 'Location access was not granted by browser. You can enter latitude and longitude coordinates manually above.'}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-4 py-3.5 bg-black hover:bg-neutral-800 text-white text-sm font-medium rounded-xl transition-all cursor-pointer shadow-md font-sans"
                    >
                      {m.submitForm || 'Submit Simulation Consultation'}
                    </button>
                  </form>
                </>
              )}

              {/* STEP 2: SCHEDULE CALL WITH OUR AGENTS */}
              {modalStep === 'schedule' && (
                <>
                  <div className="flex items-start justify-between pb-4 border-b border-black/10">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setModalStep('form')}
                        className="p-1 rounded text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
                        title={m.backToForm || 'Back to Form'}
                      >
                        <ArrowLeft size={18} />
                      </button>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-neutral-900 font-sans">
                          {m.scheduleTitle || 'Schedule Consultation'}
                        </h3>
                        <p className="text-xs text-neutral-500 mt-0.5 font-sans">
                          {m.scheduleSubtitle || 'Select your preferred date and time slot for the engineering review'}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="p-1.5 rounded text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
                      title={m.close || 'Close'}
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-5 pt-5 font-sans">
                    {/* Telemetry Target Summary */}
                    <div className="p-3.5 bg-neutral-50 border border-black/10 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs font-sans">
                      <div>
                        <span className="text-neutral-500 uppercase text-[11px] mr-1.5 font-medium font-sans">
                          {m.siteCoordsLabel || 'Site Coordinates:'}
                        </span>
                        <span className="font-semibold text-neutral-900 font-sans">
                          {formData.latitude}° N, {formData.longitude}° E
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-neutral-200 text-neutral-800 rounded-md capitalize font-medium text-xs font-sans">
                          {formData.sector === 'residential' ? (m.residentialScale || 'Residential Scale') : formData.sector === 'both' ? (m.bothScale || 'Both / Municipal') : (m.commercialScale || 'Commercial Scale')}
                        </span>
                      </div>
                    </div>

                    {/* Appointment Date & Time Selection */}
                    <div className="p-6 border border-black/10 bg-white rounded-2xl space-y-5 font-sans">
                      <div className="flex items-center gap-2 pb-1 border-b border-neutral-100">
                        <Calendar size={16} className="text-neutral-900" />
                        <span className="text-sm font-semibold tracking-wide text-neutral-900 font-sans">
                          {m.selectSlot || 'Select Appointment Slot'}
                        </span>
                      </div>

                      {/* Date chips */}
                      <div>
                        <label className="block text-xs font-medium text-neutral-700 mb-2 font-sans">
                          {m.selectDate || 'Select Date'}
                        </label>
                        <div className="grid grid-cols-3 gap-2.5">
                          {availableDates.map((date, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setSelectedDateIndex(idx)}
                              className={`py-2.5 px-3 text-xs text-center border rounded-xl transition-all cursor-pointer font-sans ${selectedDateIndex === idx
                                ? 'border-neutral-900 bg-neutral-900 text-white font-medium shadow-sm'
                                : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-100'
                                }`}
                            >
                              {date}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Time chips */}
                      <div>
                        <label className="block text-xs font-medium text-neutral-700 mb-2 font-sans">
                          {m.selectTime || 'Select Time Slot'}
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                          {['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'].map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTime(slot)}
                              className={`py-2 text-xs text-center border rounded-xl transition-all cursor-pointer font-sans ${selectedTime === slot
                                ? 'border-neutral-900 bg-neutral-900 text-white font-medium shadow-sm'
                                : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-100'
                                }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setModalStep('confirmed')}
                        className="w-full mt-2 py-3.5 bg-black hover:bg-neutral-800 text-white text-xs font-medium rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md font-sans"
                      >
                        <Calendar size={14} />
                        <span>{m.confirmSchedule || 'Confirm Scheduled Session'}</span>
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* STEP 3A: LIVE AGENT VIDEO ROOM & SIMULATION BRIDGE */}
              {modalStep === 'connect' && (
                <div className="space-y-5 font-sans">
                  <div className="flex items-center justify-between pb-4 border-b border-black/10">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 font-sans">
                          {m.agentBridgeHeader || 'AGENT BRIDGE · SESSION #UWE-GEO-8492'}
                        </h4>
                        <p className="text-[11px] font-sans text-neutral-500 font-medium">
                          {m.agentBridgeSubtitle || 'WEBRTC ENCRYPTED AES-256 SIMULATION STREAM'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-neutral-900 text-white text-xs font-sans font-semibold rounded-full tabular-nums">
                        {formatDuration(callDuration)}
                      </span>
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="p-2 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
                        title={m.closeRoom || 'Close Room'}
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="relative aspect-[16/10] bg-neutral-950 rounded-2xl overflow-hidden border border-black/20 shadow-inner">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=600&auto=format&fit=crop&q=80"
                      alt={m.engineerName || 'Dr. Aris Vance'}
                      className="w-full h-full object-cover filter grayscale contrast-110"
                    />

                    {/* HUD Telemetry Top-Left Overlay */}
                    <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-3 py-2 rounded-xl border border-white/20 text-[11px] font-sans text-neutral-300 space-y-0.5">
                      <div className="text-white font-bold uppercase tracking-wider text-[10px]">
                        {m.siteTelemetryHud || 'SITE TELEMETRY HUD'}
                      </div>
                      <div>LAT: {formData.latitude}° N | LONG: {formData.longitude}° E</div>
                      <div className="text-neutral-400">{m.telemetryStats || 'FPS: 60.0 BVH RAY-CASTER | LBM WIND D3Q19'}</div>
                    </div>

                    {/* Agent Speaking Audio Visualizer Bottom-Left Overlay */}
                    <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/20 flex items-center gap-3">
                      <div>
                        <div className="text-xs font-semibold text-white tracking-tight font-sans">
                          {m.engineerName || 'Dr. Aris Vance'}
                        </div>
                        <div className="text-[11px] font-sans text-neutral-400">
                          {m.engineerRole || 'Principal GeoSpatial Engineer'}
                        </div>
                      </div>
                      <div className="flex items-end gap-1 h-3.5 pl-2 border-l border-white/20">
                        <span className="w-1 bg-white rounded-full animate-pulse h-3.5" />
                        <span className="w-1 bg-white rounded-full animate-pulse h-2" />
                        <span className="w-1 bg-white rounded-full animate-pulse h-3" />
                        <span className="w-1 bg-white rounded-full animate-pulse h-1.5" />
                      </div>
                    </div>

                    {/* Self View (PiP) Bottom-Right */}
                    <div className="absolute bottom-3 right-3 w-28 sm:w-36 aspect-video bg-neutral-900 rounded-xl border border-white/20 overflow-hidden shadow-lg flex flex-col justify-between p-1.5 font-sans">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-sans text-neutral-300 truncate max-w-[70px]">
                          {formData.name || m.architectDefaultName || 'Architect'}
                        </span>
                        {isMuted && <span className="w-1.5 h-1.5 rounded-full bg-red-500" title={m.mute || 'Muted'} />}
                      </div>
                      <div className="text-center my-auto">
                        {isVideoOff ? (
                          <span className="text-[10px] font-sans text-neutral-500">{m.cameraOff || 'Camera Off'}</span>
                        ) : (
                          <span className="text-[10px] font-sans text-emerald-400 font-medium">{m.liveVideo || 'Live Video'}</span>
                        )}
                      </div>
                      <div className="text-[9px] font-sans text-neutral-400 text-right">
                        {m.you || 'You'}
                      </div>
                    </div>
                  </div>

                  {/* Interactive Call Controls Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-neutral-100 rounded-2xl border border-neutral-300 font-sans">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsMuted(!isMuted)}
                        className={`p-2.5 text-xs font-sans rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer border ${isMuted
                          ? 'bg-black text-white border-black'
                          : 'bg-white border-neutral-300 text-neutral-800 hover:bg-neutral-50'
                          }`}
                        title={isMuted ? (m.unmute || 'Unmute Microphone') : (m.mute || 'Mute Microphone')}
                      >
                        {isMuted ? <MicOff size={15} /> : <Mic size={15} />}
                        <span className="hidden sm:inline">{isMuted ? (m.unmute || 'Unmute') : (m.mute || 'Mute')}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsVideoOff(!isVideoOff)}
                        className={`p-2.5 text-xs font-sans rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer border ${isVideoOff
                          ? 'bg-black text-white border-black'
                          : 'bg-white border-neutral-300 text-neutral-800 hover:bg-neutral-50'
                          }`}
                        title={isVideoOff ? (m.startVideo || 'Start Video') : (m.stopVideo || 'Stop Video')}
                      >
                        {isVideoOff ? <VideoOff size={15} /> : <Video size={15} />}
                        <span className="hidden sm:inline">{isVideoOff ? (m.startVideo || 'Start Video') : (m.stopVideo || 'Stop Video')}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setScreenSharing(!screenSharing)}
                        className={`p-2.5 text-xs font-sans rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer border ${screenSharing
                          ? 'bg-black text-white border-black'
                          : 'bg-white border-neutral-300 text-neutral-800 hover:bg-neutral-50'
                          }`}
                        title={screenSharing ? (m.sharingBim || 'Sharing BIM') : (m.shareModel || 'Share 3D Model / BIM Stream')}
                      >
                        <Share2 size={15} />
                        <span className="hidden sm:inline">
                          {screenSharing ? (m.sharingBim || 'Sharing BIM') : (m.shareModel || 'Share 3D Model')}
                        </span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setModalStep('schedule')}
                      className="px-4 py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-sans uppercase tracking-wider font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <PhoneOff size={14} />
                      <span>{m.leaveRoom || 'Leave Room'}</span>
                    </button>
                  </div>

                  <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 text-xs font-sans text-neutral-600">
                    <span className="text-neutral-900 font-semibold mr-1">{m.engineerName || 'Dr. Aris Vance'}:</span>
                    {(m.engineerSpokenQuote || '"Site LiDAR terrain DEM ingested for {lat}° N, {lng}° E. Initializing 360-degree diurnal solar exposure and micro-climate wind acceleration vectors..."').replace('{lat}', formData.latitude).replace('{lng}', formData.longitude)}
                  </div>
                </div>
              )}

              {/* STEP 3B: SCHEDULED APPOINTMENT CONFIRMED */}
              {modalStep === 'confirmed' && (
                <div className="space-y-5 font-sans">
                  <div className="flex items-start justify-between pb-3 border-b border-black/10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center">
                        <Check size={18} />
                      </div>
                      <div>
                        <h4 className="text-lg font-normal text-neutral-900 tracking-tight font-sans">
                          {m.confirmedTitle || 'Consultation Confirmed'}
                        </h4>
                        <p className="text-[11px] font-sans text-neutral-500 uppercase tracking-wide font-medium">
                          {m.bookingRef || 'BOOKING REFERENCE // #UWE-GEO-8492'}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="p-2 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
                      title={m.close || 'Close'}
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="p-5 bg-neutral-50 border border-black/10 rounded-2xl space-y-3 text-xs font-sans">
                    <div className="flex justify-between border-b border-neutral-200 pb-2">
                      <span className="text-neutral-500 uppercase font-medium">{m.assignedEngineerLabel || 'ASSIGNED ENGINEER:'}</span>
                      <span className="font-semibold text-neutral-900">{m.engineerName || 'Dr. Aris Vance'}</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-200 pb-2">
                      <span className="text-neutral-500 uppercase font-medium">{m.dateTimeLabel || 'DATE & TIME:'}</span>
                      <span className="font-semibold text-neutral-900">
                        {selectedDate} {m.at || 'at'} {selectedTime}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-200 pb-2">
                      <span className="text-neutral-500 uppercase font-medium">{m.siteCoordsConfirmedLabel || 'SITE COORDINATES:'}</span>
                      <span className="font-semibold text-neutral-900">
                        {formData.latitude}° N, {formData.longitude}° E
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500 uppercase font-medium">{m.clientLabel || 'CLIENT:'}</span>
                      <span className="font-semibold text-neutral-900">
                        {formData.name} ({formData.email})
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-wider font-medium text-neutral-500 mb-1.5">
                      {m.secureWebRtcLink || 'SECURE WEBRTC CONSULTATION LINK'}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value="https://meet.uandwelabs.com/ananda-geo-8492"
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl font-sans text-xs text-neutral-800 outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleCopyMeetingLink}
                        className="px-4 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-sans uppercase font-semibold rounded-xl transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                      >
                        {copiedLink ? <Check size={14} className="text-white" /> : <Copy size={14} />}
                        <span>{copiedLink ? (m.copied || 'Copied') : (m.copy || 'Copy')}</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 font-sans">
                    <button
                      type="button"
                      onClick={() => setModalStep('connect')}
                      className="w-full py-4 bg-black hover:bg-neutral-800 text-white font-sans uppercase tracking-wider text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                    >
                      <Video size={14} />
                      <span>{m.connectNow || 'CONNECT TO AGENT ROOM NOW (EARLY ACCESS)'}</span>
                    </button>

                    <a
                      href={generateGoogleCalendarUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-900 font-sans uppercase tracking-wider text-xs font-medium rounded-xl flex items-center justify-center gap-2 transition-all"
                    >
                      <Calendar size={14} />
                      <span>{m.addToCalendar || 'ADD TO GOOGLE CALENDAR'}</span>
                      <ExternalLink size={12} className="text-neutral-500" />
                    </a>

                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="w-full py-2.5 text-neutral-500 hover:text-neutral-900 text-xs font-sans uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                    >
                      {m.doneClose || 'Done / Close'}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
