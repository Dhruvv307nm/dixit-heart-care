import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Activity, Award, Star, Quote, ChevronRight, 
  Search, ShieldAlert, Sparkles, GraduationCap, Trophy, Stethoscope,
  Clock, TrendingUp, Tv, FileText
} from 'lucide-react';
import { ViewType } from '../types';

interface HomeViewProps {
  onViewChange: (view: ViewType) => void;
  onBookNow: (procedureId: string) => void;
}

// 12 Fees & prices based on the provided design document with enhanced hierarchy assets
const PRICING_DATA = [
  { 
    name: 'First Consultation', 
    marathi: 'प्रथम तपासणी', 
    price: '₹600/-', 
    id: 'consultation',
    popular: true,
    category: 'Essential Care',
    description: 'Detailed primary screening of cardiovascular symptoms, lifestyle profiling & blood pressure mapping.'
  },
  { 
    name: 'Cardiac Package', 
    marathi: 'कार्डिॲक पॅकेज', 
    price: '₹3500/-', 
    id: 'package',
    popular: true,
    category: 'Full Assessment',
    description: 'Complete defensive checkup: 2D Echo, Stress ECG, Blood Sugar profiling & full clinical consult.'
  },
  { 
    name: '2D Echo', 
    marathi: '2D Echo तपासणी', 
    price: '₹1500/-', 
    id: 'echo',
    popular: true,
    category: 'Advanced Imaging',
    description: 'Ultrasound scan to check blood flow patterns, chamber sizes, and valvular movement.'
  },
  { 
    name: 'Re-consultation', 
    marathi: 'फेर तपासणी', 
    price: '₹500/-', 
    id: 'consultation',
    category: 'Essential Care',
    description: 'Follow-up tracking within 30 days to optimize prescribed therapy or medication dosage.'
  },
  { 
    name: 'E.C.G.', 
    marathi: 'ई.सी.जी. तपासणी', 
    price: '₹400/-', 
    id: 'ecg',
    category: 'Diagnostic Screening',
    description: 'Digital 12-lead electrocardiogram trace to evaluate rhythmic electrical function.'
  },
  { 
    name: 'T.M.T.', 
    marathi: 'T.M.T. तपासणी', 
    price: '₹1500/-', 
    id: 'tmt',
    category: 'Diagnostic Screening',
    description: 'Treadmill stress test with real-time hemodynamic monitoring to spot silent ischemia.'
  },
  { 
    name: 'Holter (24 hrs)', 
    marathi: 'होल्टर तपासणी (२४ तास)', 
    price: '₹3000/-', 
    id: 'holter',
    category: 'Rhythm Tracking',
    description: 'Ambulatory cardiac rhythm tracking for erratic palpitations or transient syncopes.'
  },
  { 
    name: 'Holter (48 hrs)', 
    marathi: 'होल्टर तपासणी (४८ तास)', 
    price: '₹6000/-', 
    id: 'holter',
    category: 'Rhythm Tracking',
    description: 'Extended continuous 48-hour monitoring for highly elusive arrhythmia symptoms.'
  },
  { 
    name: 'Ambulatory BP Monitoring', 
    marathi: 'Ambulatory BP Monitoring', 
    price: '₹3000/-', 
    id: 'abpm',
    category: 'Vascular Tracking',
    description: '24-hour periodic pulse & blood pressure tracking to accurately diagnose masked hypertension.'
  },
  { 
    name: 'CD Reading', 
    marathi: 'CD Reading', 
    price: '₹1200/-', 
    id: 'cd-read',
    category: 'Diagnostic Review',
    description: 'Expert angiographic DVD data analysis to deliver a precise interventional review.'
  },
  { 
    name: 'Medical Certificate', 
    marathi: 'मेडिकल सर्टिफिकेट', 
    price: '₹100/-', 
    id: 'certificate',
    category: 'Administrative',
    description: 'Authorized medical certification and cardiac fitness forms for employment or travel.'
  },
  { 
    name: 'Second Opinion (Without Patient)', 
    marathi: 'Second Opinion Without Patient', 
    price: '₹500/-', 
    id: 'second-opinion',
    category: 'Diagnostic Review',
    description: 'Detailed assessment of existing angiographic or clinical records for expert diagnostic advice.'
  }
];

const LUXURY_GAL_CARDS = [
  {
    id: 'diagnostics',
    title: 'Precision Diagnostics Suite',
    marathi: 'प्रिसिजन डायग्नोस्टिक्स युनिट',
    sector: 'SECTOR ALPHA',
    year: 'EST. 2011',
    metric: '99.9% SENSOR CALIBRATION',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpHM5uuUQ20YKmAvXJFdPqq6B379WoDW8eFe8hyHt1z39t5Gxz_ozO1y889mIP-Bt6IKEVABRv5LLAQvYoBvzw2aHTb2x0u_kjoqmxN-kb7Esq6KHNjIvxnkuqvjOkiI3F4SLl-YlQUVE_OS9mQaNNKoQ4xJfLEIJbPo_4kb8dlA_bWdy5xkFLZoITj_U--5JERsbn9z7bEs2MHILsYjJPllqVKv24MuTs42DaEIfwNVCD7zSAcNg81kePNPKdbiiOWnT7KxXTCzU',
    desc: 'Equipped with heavy, isolation-engineered diagnostic stress decks and digitized 2-D echocardiogram analyzers under strict clinical standards. Every trace is noisefiltered to eliminate ambient artifact.',
    highlight: 'Advanced magnetic insulation blocks signal distortion.',
    details: ['Calibrated vibration-isolated base', 'Continuous clean air positive-pressure filter', 'High-fidelity 12-channel digital ECG outputs', 'Real-time telemedicine synchronization']
  },
  {
    id: 'consultation',
    title: 'Consultation Parlour',
    marathi: 'कन्सल्टेशन चेंबर',
    sector: 'SECTOR BETA',
    year: 'SERENE CLASS',
    metric: 'ACOUSTICAL SHIELDING',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDm_JX8AUlIsoUBcAes_KJYYPs-oUNLBKUHReNvV7JgrRoN7jbwHRBRf7-DZEp6Bgs2SvUZMEA2B8tZmdXjAayXFuFUPEfOob8C1NDDjP5Fy4DhrRf4LQRfqbJdrcrtNpx4eCBVautdAG-Q_ejApsKFoDWRIOmKdv3JFWOaAyAs4wx0OGwgzPyftaYiKWwK3Htl4ryudlwzKu8gvyjYr80mPbu9SScVS-vGWJybQzI-KRBCvt1vVbY0QUExEIH64ylkXFswKXDaWSo',
    desc: 'A serene sanctuary structured in sound-dampening oak panelling to foster absolute quietude. Here, patient histories are explored with zero distraction and total medical records transparency.',
    highlight: 'Double-glazed sound barriers ensure absolute consulting privacy.',
    details: ['Premium solid oak acoustics', 'Indirect warm spectrum LED wellness lighting', 'Ergonomic orthopedic consultation seating', 'Dual-monitor diagnostic review consoles']
  },
  {
    id: 'reception',
    title: 'VIP Intake Concierge',
    marathi: 'स्वागत आणि माहिती कक्ष',
    sector: 'SECTOR GAMMA',
    year: 'CONCIERGE ON CALL',
    metric: 'IMMEDIATE HOST ASSIGN',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOyErOJ8iHxVSG4nQB1KkOFY5Z2KctGToWwUbkMUgsp995gQOfUvw_HjVsRWDTe3BDWW9n98uRZIaTySBYbQ5Ioa5UAxJFECoHj1EAZa41VaMyPPhJwf844skQYIsBuLiXm3Gp8rVhlEvKqvfEO9GZyJbUa3_BeUHt4JZRGolljxW6b7hS51G2Y1dSSdnVVEjfHrQ4OMHrLRrqneD7R4YL-eqItsgtFIkh6RFNhev-lO4EsW1MtmB7-0H1rbzyFqVASqV-9TvNiYM',
    desc: 'Features a low-clutter entrance reception where admin transparency meets upscale hospitality. Live billing rates are directly verified through patient digital wallets on check-in.',
    highlight: 'Instant administrative mapping saves patient wait times.',
    details: ['Touchless digital check-in terminal', 'Fully open transparent pricing boards', 'Secured locker systems for patient records', 'Direct fast-track specialist triage']
  },
  {
    id: 'lounge',
    title: 'Soundproofed Recovery Sanctuary',
    marathi: 'शांतता आणि विश्रांती कक्ष',
    sector: 'SECTOR OMEGA',
    year: 'RECOVERY CLASS',
    metric: 'MICROCLIMATE FLUID CONTROL',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7vfXDileT4qXq_cyfDkQobi98qjHacFzW3mBRXduADAXs0WtRGgqbrqQ-XEqrK7ruOxZ9qPSLcNtSLbSM9S4_ioeoh4Aovs3kxmL9IuashpMiIPf2U8tnr2joh6dG9xtv7Ig0UTaOFFIm57I9GkoNkxzbwDo-u7VQTIHn09MdqiLwSrCkLCOnPPGgY5Nmjqub3j14B-xhhj5NVxyxUBdFN3pjeT89r99i5zZybs8nartXeMwj-GRgwotBp-4wag6ogE4LTfnqKQM',
    desc: 'An ambient, climate-regulated space designed to transition pre and post-consultation anxiety into clinical peace. Equipped with plush seating configurations and indirect oxygen-rich air circulation.',
    highlight: 'Somatic comfort is designed to stabilize baseline heart rates.',
    details: ['High air exchange clean environment', 'Orthopedic anti-stress lounge modules', 'Acoustic background calming frequency streams', 'Patient companion storage lockers']
  },
  {
    id: 'clinical_lab',
    title: 'Primary Interventional Suite',
    marathi: 'प्राथमिक प्रभाग',
    sector: 'SECTOR SIGMA',
    year: 'HEMODYNAMIC STABLE',
    metric: 'CLASS 100 STERILITY',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIboAfRzk9tpRj_PQB0aUFIvqx82Vx9vb4MMY4NtfiPxoQXT9by4Cp8AQFZY5wzMngrh6elrZF8Gj8OqOPoyz9M4GmvwQWdWZ1VJ8NtNWsx8Na7KhzBYjUqaSN5Ib2zcOvq6p81WPOzGdYQF2eUb8uPWmL3rv5sd_-xAljJtE4PwBKPLtTiCNtrr38BUaY17DIbZS9upjCYYs8ywq5Ek6KAcDf1JiAK3eKPbec6wc0Nz0ybLHueBPokEV8vTD7SD5VdTb4hu_HFlM',
    desc: 'The clean hub for high-precision diagnostic triage, providing acute cardiac monitoring and early-intervention guidance supported by real-time digital hemodynamic analysis.',
    highlight: 'Strictly sterile, maintaining advanced international surgical standards.',
    details: ['Class 100 laminar airflow systems', 'Continuous vital status digital display', 'Direct emergency transport corridor line', 'Advanced anti-pathogen composite touchpoints']
  }
];

export default function HomeView({ onViewChange, onBookNow }: HomeViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredGalleryCard, setHoveredGalleryCard] = useState<number | null>(null);
  const [activeShowcaseCard, setActiveShowcaseCard] = useState<typeof LUXURY_GAL_CARDS[0] | null>(null);

  // Parallax state for clinic mosaic pictures
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  // Filter pricing data
  const filteredPricing = PRICING_DATA.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.marathi.includes(searchQuery)
  );

  return (
    <div className="relative">
      
      {/* 1. Cinematic Redesigned Hero Section with Ultimate Depth & Private Institute Branding */}
      <section 
        className="relative min-h-[960px] lg:min-h-[1020px] flex items-center overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#FCFAF8] to-[#F5F1E9]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        id="hero-section"
      >
        {/* Soft Background Institute Large Typography watermark */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
          <div className="absolute top-[35%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-[18vw] font-serif font-extrabold text-primary/[0.035] tracking-[0.2em] uppercase leading-none">
            DIXIT
          </div>
        </div>

        {/* Cinematic Atmospheric Breathing Background Image */}
        <div className="absolute inset-0 z-0 bg-transparent">
          <motion.div 
            className="w-full h-full"
            animate={{ 
              scale: [1.02, 1.06, 1.02],
              opacity: [0.18, 0.24, 0.18]
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <img 
              alt="Dr. Rohit Dixit Cinematic Portrait" 
              className="w-full h-full object-cover object-center grayscale select-none pointer-events-none"
              src="/src/assets/images/dr_rohit_dixit.jpg"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          {/* Advanced Multi-directional Layered Gradients for Cinematic Depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/95 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-[#FAF8F5]/30" />
          <div className="absolute inset-0 bg-radial-gradient(circle at 60% 50%, rgba(250,248,245,0.1) 0%, rgba(250,248,245,0.85) 70%, #FAF8F5 100%)" />
        </div>

        {/* Ambient Floating Sparks / Light Particles */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-tertiary/20 rounded-full"
              style={{
                top: `${20 + i * 12}%`,
                left: `${40 + (i * 9) % 45}%`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, 15, 0],
                opacity: [0.15, 0.5, 0.15],
                scale: [1, 1.4, 1]
              }}
              transition={{
                duration: 8 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.7
              }}
            />
          ))}
        </div>

        {/* Multi-layered Glowing EKG cardiology pulse beat lines in Royal Gold/Heart-clay */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-30">
          <svg className="absolute w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            {/* Background passive EKG trace */}
            <motion.path 
              d="M0,60 L20,60 L23,52 L27,78 L31,34 L35,66 L38,60 L58,60 L61,46 L65,82 L69,20 L73,72 L76,60 L100,60" 
              fill="none" 
              stroke="#9E1B1B" 
              strokeWidth="0.18"
              initial={{ pathLength: 0, opacity: 0.15 }}
              animate={{ pathLength: 1, opacity: [0.15, 0.45, 0.15] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            {/* Primary active EKG glow pulse in Terracotta clay gold */}
            <motion.path 
              d="M0,60 L20,60 L23,52 L27,78 L31,34 L35,66 L38,60 L58,60 L61,46 L65,82 L69,20 L73,72 L76,60 L100,60" 
              fill="none" 
              stroke="#9E1B1B" 
              strokeWidth="0.35"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 5.5, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
            />
          </svg>
        </div>

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 md:px-[64px] py-16 lg:py-24 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Premium Asymmetric Typography & Fine Art Editorial Layout */}
          <div className="lg:col-span-7 space-y-10 text-left relative z-10">
            {/* Fine Art Accent Line */}
            <div className="absolute -left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/30 via-primary/5 to-transparent hidden lg:block" />

            <div className="space-y-8 select-none">
              {/* Premium Real Social Proof Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="inline-flex flex-wrap items-center gap-2.5 bg-white border border-[#9E1B1B]/20 shadow-[0_12px_30px_rgba(142,112,108,0.04)] px-4.5 py-2.5 rounded-full z-10 backdrop-blur-md relative"
              >
                <div className="flex gap-0.5 text-[#DF9E21]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={11} className="fill-[#DF9E21] stroke-none" />
                  ))}
                </div>
                <span className="h-3 w-[1px] bg-[#9E1B1B]/20" />
                <span className="text-[10px] font-mono tracking-wider font-extrabold text-[#3F3F3F]/80 uppercase leading-none">
                  4.9 Rating (1,240+ Reviews)
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#9E1B1B]" />
                <span className="text-[9.5px] font-sans font-bold text-[#9E1B1B] tracking-wide uppercase leading-none">
                  Google & Practo Verified Care
                </span>
              </motion.div>

              {/* Bold Asymmetrical Heading Group with deep whitespace */}
              <h1 className="font-serif text-[52px] sm:text-[76px] lg:text-[88px] leading-[0.98] text-on-surface tracking-[-0.045em] font-extrabold relative pt-2">
                {/* Decorative Drop Glyph background watermark */}
                <span className="absolute -left-14 -top-12 text-[140px] font-serif font-extrabold text-primary/[0.025] select-none pointer-events-none hidden lg:block">
                  D
                </span>
                <motion.span 
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="block relative z-10 font-display text-[52px] sm:text-[76px] lg:text-[88px] text-primary font-semibold"
                >
                  Dixit Heart Care
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="block font-serif italic text-[32px] sm:text-[44px] lg:text-[52px] font-normal text-on-surface-variant mt-2"
                >
                  Expert Cardiology care in Satara
                </motion.span>
              </h1>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4 }}
                className="font-sans text-[17px] sm:text-[18px] text-[#3F3F3F]/85 max-w-xl leading-relaxed font-normal"
              >
                Consult Dr. Rohit Dixit for trusted cardiac care, advanced diagnostics, and personalized treatment in Satara, Maharashtra.
              </motion.p>
            </div>

            {/* Premium CTA Button Pair with asymmetrical layout */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-5 pt-6 relative z-20"
            >
              <button 
                onClick={() => onViewChange('contact')}
                className="group relative bg-[#1B365D] text-[#FCFAF5] hover:bg-neutral-900 font-sans font-extrabold text-[11px] uppercase tracking-[0.25em] px-10 py-5.5 rounded-none md:rounded-tr-[28px] md:rounded-bl-[28px] transition-all duration-700 shadow-[0_20px_45px_-10px_rgba(27,54,93,0.25)] hover:shadow-[0_24px_55px_-8px_rgba(27,54,93,0.35)] hover:-translate-y-1 cursor-pointer overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Book appointment</span>
                  <ChevronRight size={14} className="transform group-hover:translate-x-1.5 transition-transform stroke-[2.5]" />
                </span>
                <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button 
                onClick={() => onViewChange('services')}
                className="relative border border-primary/15 text-primary font-sans font-extrabold text-[11px] uppercase tracking-[0.25em] px-9 py-5.5 rounded-none md:rounded-tl-[28px] md:rounded-br-[28px] hover:bg-primary/5 transition-all hover:border-primary/40 text-center cursor-pointer bg-white/30 backdrop-blur-md"
              >
                Explore Specialized Services
              </button>
            </motion.div>

            {/* Social Proof / Clinical Credentialing Row with precise negative balance */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="grid grid-cols-2 gap-10 pt-12 border-t border-primary/10 max-w-xl"
            >
              <div className="space-y-2.5 text-left">
                <div className="flex items-center gap-2.5 text-tertiary">
                  <Award size={18} className="stroke-[2.5]" />
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3F3F3F]/60">Clinical Legacy</span>
                </div>
                <div className="font-serif text-[28px] text-on-surface font-extrabold tracking-tight">Expert Care</div>
                <p className="text-[12.5px] font-sans text-on-surface-variant leading-relaxed">High-precision cardiovascular diagnostics and personalized treatment.</p>
              </div>

              <div className="space-y-2.5 text-left">
                <div className="flex items-center gap-2.5 text-tertiary">
                  <Activity size={18} className="stroke-[2.5]" />
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3F3F3F]/60">Patient Trust</span>
                </div>
                <div className="font-serif text-[28px] text-on-surface font-extrabold tracking-tight">Dedicated Service</div>
                <p className="text-[12.5px] font-sans text-on-surface-variant leading-relaxed">Committed to ethical, evidence-based standards and genuine healing.</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Dynamic Parallax Mosaic representing professional spaces - Heavily Asymmetric */}
          <div className="hidden lg:block lg:col-span-5 h-[760px] relative z-10" id="mosaic-container">
            
            {/* Card 1: Main Overlap Center-Right */}
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[40px] right-0 z-10 group"
            >
              <motion.div 
                className="w-[310px] h-[390px] shadow-[0_35px_85px_rgba(27,54,93,0.05)] rounded-[44px] overflow-hidden bg-surface-bright p-4 border border-outline-variant hover:border-primary/30 hover:shadow-[0_45px_95px_rgba(27,54,93,0.12)] transition-all duration-1000"
                style={{ borderRadius: "48px 12px 48px 48px" }}
                animate={{ x: mousePosition.x * 0.8, y: mousePosition.y * 0.8 }}
                transition={{ type: "spring", stiffness: 100, damping: 30 }}
              >
                <div className="w-full h-full rounded-[38px] overflow-hidden relative" style={{ borderRadius: "42px 8px 42px 42px" }}>
                  <motion.div
                    className="w-full h-full"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <img 
                      alt="Clinic Treatment & Lab Equipment" 
                      className="w-full h-full object-cover group-hover:scale-108 transition-all duration-[1200ms]"
                      src="/clinic-equipment.jpg"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <span className="text-on-primary-container text-[9px] uppercase font-extrabold tracking-[0.25em]">Diagnostic Integrity</span>
                    <h4 className="text-white text-xs font-sans font-bold mt-1 uppercase tracking-wider">Calibrated Stress Labs</h4>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Card 2: Left Middle Overlay - Offset with custom rotation */}
            <motion.div
              initial={{ opacity: 0, x: -80, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[260px] -left-[40px] z-20 group"
            >
              <motion.div 
                className="w-[280px] h-[280px] shadow-[0_40px_90px_rgba(27,54,93,0.06)] rounded-[32px] overflow-hidden bg-white p-4 border border-outline-variant hover:border-primary/30 hover:shadow-[0_45px_95px_rgba(27,54,93,0.12)] transition-all duration-1000"
                style={{ borderRadius: "24px 24px 4px 24px" }}
                animate={{ x: mousePosition.x * -1.2, y: mousePosition.y * -1.2 }}
                transition={{ type: "spring", stiffness: 100, damping: 30 }}
              >
                <div className="w-full h-full rounded-[22px] overflow-hidden relative" style={{ borderRadius: "18px 18px 2px 18px" }}>
                  <motion.div
                    className="w-full h-full"
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  >
                    <img 
                      alt="Clinic Front Reception Area" 
                      className="w-full h-full object-cover group-hover:scale-108 transition-all duration-[1200ms]"
                      src="/clinic-reception.jpg"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <span className="text-on-primary-container text-[9px] uppercase font-extrabold tracking-[0.25em]">Aesthetic Wellness</span>
                    <h4 className="text-white text-xs font-sans font-bold mt-1 uppercase tracking-wider">Welcoming Concierge Checkin</h4>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Card 3: Bottom Overlapping Layer */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-[20px] right-[40px] z-0 group"
            >
              <motion.div 
                className="w-[260px] h-[260px] shadow-[0_35px_80px_rgba(27,54,93,0.04)] rounded-[40px] overflow-hidden bg-white p-3.5 border border-outline-variant hover:border-primary/30 hover:shadow-[0_45px_95px_rgba(27,54,93,0.1)] transition-all duration-1000"
                style={{ borderRadius: "40px 40px 40px 40px" }}
                animate={{ x: mousePosition.x * 0.4, y: mousePosition.y * 0.4 }}
                transition={{ type: "spring", stiffness: 100, damping: 30 }}
              >
                <div className="w-full h-full rounded-[30px] overflow-hidden relative" style={{ borderRadius: "30px 30px 30px 30px" }}>
                  <motion.div
                    className="w-full h-full"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  >
                    <img 
                      alt="Cardiac Stress Test & Evaluation Lab" 
                      className="w-full h-full object-cover group-hover:scale-108 transition-all duration-[1200ms]"
                      src="/schiller-stress-lab.jpg"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <span className="text-on-primary-container text-[9px] uppercase font-extrabold tracking-[0.25em]">Cardiac Evaluation</span>
                    <h4 className="text-white text-xs font-sans font-bold mt-1 uppercase tracking-wider">Schiller Stress Labs</h4>
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2.5 The Exhibition: Luxury Clinic Showcase with Infinite Scroll */}
      <section className="py-32 lg:py-44 bg-[#FAF8F5] relative overflow-hidden border-b border-[#9E1B1B]/15">
        {/* Subtle geometric overlay with dual light reflections */}
        <div className="absolute inset-0 custom-grid-pattern opacity-[0.05] pointer-events-none" />
        <div className="absolute -top-[25%] -left-[10%] w-[60%] h-[75%] bg-gradient-to-tr from-primary/[0.04] to-tertiary/[0.015] rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute -bottom-[25%] right-[-10%] w-[50%] h-[65%] bg-gradient-to-bl from-tertiary/[0.02] to-[#1B365D]/[0.01] rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-[1280px] mx-auto px-5 md:px-[64px] mb-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="md:col-span-7 text-left space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-12 h-[1px] bg-tertiary/35" />
                <span className="text-tertiary font-sans text-[11px] uppercase tracking-[0.35em] font-extrabold block">
                  IMMERSIVE CLINICAL SPACES
                </span>
              </div>
              <h2 className="font-serif text-[46px] md:text-[62px] lg:text-[72px] font-black text-on-surface leading-[1.02] tracking-[-0.03em]">
                Advanced Cardiac Care Center
              </h2>
            </div>
            <div className="md:col-span-5 text-left md:pb-2">
              <p className="font-sans text-[15px] text-on-surface-variant leading-relaxed pl-6 border-l-2 border-primary/10">
                Embark on a self-paced visual exposition of our soundproofed, premium clinical chambers, where diagnostic supremacy is unified with absolute tranquility. Click any suite to explore its specific diagnostic properties.
              </p>
            </div>
          </div>
        </div>

        {/* Smooth horizontal autoscrolling ribbon */}
        <div className="w-full relative overflow-hidden py-12 select-none">
          {/* Edge gradients for seamless vignette fade */}
          <div className="absolute left-0 top-0 bottom-0 w-36 bg-gradient-to-r from-background via-background/60 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-36 bg-gradient-to-l from-background via-background/60 to-transparent z-20 pointer-events-none" />

          {/* Scrolling band */}
          <div className="flex gap-14 w-max float-scroll animate-[slide_60s_linear_infinite] hover:[animation-play-state:paused]">
            {[...LUXURY_GAL_CARDS, ...LUXURY_GAL_CARDS].map((suite, index) => {
              const uniqueKey = `showcase-${suite.id}-${index}`;
              const isBlurred = hoveredGalleryCard !== null && hoveredGalleryCard !== index;
              return (
                <motion.div
                  key={uniqueKey}
                  onClick={() => setActiveShowcaseCard(suite)}
                  onMouseEnter={() => setHoveredGalleryCard(index)}
                  onMouseLeave={() => setHoveredGalleryCard(null)}
                  className={`relative group cursor-pointer w-[370px] sm:w-[430px] h-[520px] flex-shrink-0 transition-all duration-700 select-none pb-4 ${isBlurred ? 'opacity-40 blur-[2px] scale-[0.98]' : 'scale-100'}`}
                  whileHover={{ y: -12 }}
                >
                  {/* Layer 1: Bottom Outer Border (Navy Accent Outlined Backdrop) */}
                  <div className="absolute -inset-1 border border-primary/10 rounded-[48px] translate-x-2.5 -translate-y-2.5 opacity-30 transition-all duration-700 group-hover:translate-x-4 group-hover:-translate-y-4 group-hover:-inset-2.5 group-hover:opacity-90 group-hover:border-primary/20" />

                  {/* Layer 2: Main Solid Background Frame with ring outlines */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white via-white to-[#FCFAF8] rounded-[42px] shadow-[0_30px_70px_rgba(27,54,93,0.015)] border border-outline-variant ring-1 ring-primary/5 transition-all duration-700 group-hover:shadow-[0_50px_100px_rgba(27,54,93,0.08)] group-hover:border-primary/20" />

                  {/* Layer 3: Floating, Cropped Image Frame with glass border */}
                  <div className="absolute inset-4.5 rounded-[32px] overflow-hidden bg-neutral-100 z-10 transition-transform duration-700 group-hover:-translate-y-2 shadow-inner ring-1 ring-[#1B365D]/10">
                    <img
                      src={suite.img}
                      alt={suite.title}
                      className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {/* Image Frosted Soft Vignette (No text overlay) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-95 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Floating Instruction / Microcopy under scrolling marquee */}
        <div className="mt-8 text-center z-10 relative pointer-events-none">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase font-semibold tracking-[0.2em] text-on-surface-variant/70">
            <span className="w-1.5 h-1.5 bg-tertiary rounded-full animate-ping" />
            Hover to Pause &amp; Focus &bull; Click card to examine architectural specifications
          </span>
        </div>
      </section>

      {/* 3. Meet Dr. Rohit Dixit Bio Section - Asymmetrical Luxury Editorial layout */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="py-36 lg:py-48 relative bg-surface-container-low overflow-hidden"
      >
        {/* Abstract watermark element */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 font-serif text-[420px] pointer-events-none text-primary/[0.012] font-black select-none z-0">
          MD
        </div>

        <div className="max-w-[1280px] mx-auto px-5 md:px-[64px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-28 items-center">
            
            {/* Visual Column - Double-outlined custom frame */}
            <div className="lg:col-span-5 w-full relative z-10">
              <div className="absolute -inset-8 bg-primary/[0.03] rounded-[54px] blur-3xl -z-10" />
              <motion.div 
                initial={{ opacity: 0, scale: 0.96, rotate: -2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[390px] mx-auto relative group"
              >
                {/* Asymmetric offset backgrounds */}
                <div className="absolute inset-0 bg-primary/5 rounded-[52px] translate-x-5 translate-y-5 -z-20 transition-transform duration-[1200ms] group-hover:translate-x-3.5 group-hover:translate-y-3.5" />
                <div className="absolute inset-0 border border-outline-variant/60 rounded-[52px] translate-x-3 translate-y-3 -z-10" />

                <div className="bg-white p-[22px] rounded-[48px] shadow-[0_35px_85px_rgba(27,54,93,0.03)] border border-outline-variant overflow-hidden ring-[16px] ring-white">
                  <img 
                    alt="Dr. Rohit Dixit Dr Portrait" 
                    className="w-full aspect-[4/5] object-cover rounded-[36px] group-hover:scale-[1.025] transition-all duration-[2000ms]"
                    src="/rohit-dixit.jpeg"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Miniature Floating Badge */}
                  <div className="absolute -bottom-4 -right-4 bg-primary text-white py-4 px-7 rounded-[22px] shadow-2xl border border-white/20">
                    <span className="text-[10px] uppercase font-bold tracking-[0.25em] block leading-none text-[#F3EFE3]">HEART & VASCULAR SPECIALIST</span>
                    <span className="font-serif text-[14px] font-bold mt-1 block text-white leading-none">MBBS, DNB, FACC, FSCAI</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 w-full space-y-12 text-left relative z-10">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <span className="w-12 h-[1px] bg-tertiary/45" />
                  <span className="text-tertiary font-sans text-[11px] uppercase tracking-[0.35em] font-extrabold block">
                    Consultant Interventional Cardiologist
                  </span>
                </div>
                <h2 className="font-serif text-[48px] md:text-[62px] lg:text-[72px] font-black text-on-surface leading-[1.02] tracking-tight">
                  Dr. Rohit Prakash Dixit <br />
                  <span className="text-[#1B365D] font-serif text-[20px] md:text-[24px] lg:text-[28px] font-medium italic leading-snug block mt-2 tracking-normal">
                    MBBS, DNB (Medicine), DNB (Cardiology) (Gold Medalist),<br className="hidden sm:block" /> FACC, FSCAI, CRCDM
                  </span>
                </h2>
                <div className="w-24 h-[1.5px] bg-[#1B365D]/20 mt-8" />
              </div>

              <div className="space-y-7 font-sans text-on-surface-variant text-[15px] md:text-[16px] leading-relaxed max-w-xl">
                <p className="font-medium text-on-surface text-lg md:text-[20px] leading-relaxed">
                  Dr. Rohit Prakash Dixit is a Consultant Interventional Cardiologist dedicated to providing expert, patient-centered cardiovascular care in Satara.
                </p>
                <p className="text-[#3F3F3F]/85">
                  With extensive training in internal medicine and cardiology, his practice focuses on thorough clinical evaluation, ethical diagnostic methods, and evidence-based treatments for comprehensive heart and vascular health.
                </p>
              </div>

              {/* Styled Credential list instead of boring paragraph text */}
              <div className="grid grid-cols-2 gap-8 max-w-lg border-t border-outline-variant/80 pt-10">
                <div className="flex gap-4">
                  <div className="text-tertiary mt-1.5"><GraduationCap size={18} /></div>
                  <div>
                    <h5 className="font-sans text-[12px] font-bold uppercase tracking-wider text-on-surface mb-1">Core Qualifications</h5>
                    <p className="font-sans text-xs text-on-surface-variant/80">MBBS, DNB (Medicine)</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-tertiary mt-1.5"><Heart size={18} /></div>
                  <div>
                    <h5 className="font-sans text-[12px] font-bold uppercase tracking-wider text-on-surface mb-1">Specialization</h5>
                    <p className="font-sans text-xs text-on-surface-variant/80">DNB (Cardiology) (Gold Medalist), FACC, FSCAI, CRCDM</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  onClick={() => setIsBioModalOpen(true)}
                  className="inline-flex items-center gap-3 font-sans text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#1B365D] hover:text-tertiary transition-colors border-b-2 border-primary/20 hover:border-tertiary/75 pb-2.5 group focus:outline-none cursor-pointer"
                >
                  <span>Explore Academic Biography</span>
                  <ChevronRight size={14} className="stroke-[3] transition-transform duration-350 group-hover:translate-x-2" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* 4. Complete, Fully Typed "Pricing & Fees" Section with live reactive search list */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="py-36 lg:py-48 relative bg-[#FCFAF5] border-t border-outline-variant/15 overflow-hidden"
      >
        <div className="max-w-[1280px] mx-auto px-5 md:px-[64px] relative z-10">
          
          <div className="max-w-2xl mx-auto text-center space-y-5 mb-20">
            <span className="text-tertiary font-sans text-[11px] sm:text-xs uppercase font-extrabold tracking-[0.35em] block">
              PRICING TRANSPARENCY
            </span>
            <h2 className="font-serif text-[42px] md:text-[58px] lg:text-[68px] font-extrabold text-on-surface leading-[1.05] tracking-tight">
              Standard Care Schedules
            </h2>
            <div className="w-20 h-[1.5px] bg-tertiary/25 mx-auto mt-4" />
            <p className="font-sans text-[16px] text-on-surface-variant max-w-xl mx-auto pt-3 leading-relaxed">
              Transparent, premium rate schedules for private consultations, continuous diagnostic tracking, and secondary clinical opinions.
            </p>

            {/* Reactive Search Bar */}
            <div className="pt-4 max-w-md mx-auto">
              <div className="relative">
                <Search size={18} className="absolute left-4 top-[50%] -translate-y-[50%] text-on-surface-variant/70" />
                <input 
                  type="text"
                  placeholder="Search consultation fees, ECG, Echo, etc..."
                  className="w-full pl-12 pr-4.5 py-4 bg-white rounded-none md:rounded-tr-2xl md:rounded-bl-2xl border border-outline-variant/60 font-sans text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/40 shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Pricing Grid */}
          <AnimatePresence mode="popLayout">
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6.5"
            >
              {filteredPricing.map((item, index) => {
                // Select matching Lucide icon dynamically
                const IconComponent = (() => {
                  switch (item.id) {
                    case 'consultation': return Stethoscope;
                    case 'ecg': return Activity;
                    case 'echo': return Heart;
                    case 'tmt': return TrendingUp;
                    case 'holter': return Clock;
                    case 'abpm': return Clock;
                    case 'cd-read': return Tv;
                    case 'package': return Sparkles;
                    case 'certificate': return FileText;
                    case 'second-opinion': return Award;
                    default: return Heart;
                  }
                })();

                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.3) }}
                    key={item.name}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`relative rounded-[28px] p-7.5 border flex flex-col justify-between transition-all duration-500 cursor-pointer overflow-hidden text-left h-full group ${
                      item.popular 
                        ? 'bg-gradient-to-br from-[#FCFAF5] via-white to-white border-[#9E1B1B]/50 shadow-premium-md hover:shadow-premium-lg hover:border-[#9E1B1B] md:scale-[1.03] z-[2]'
                        : 'bg-white border-outline-variant/50 shadow-premium-sm hover:shadow-premium-md hover:border-primary/35 hover:-translate-y-1.5 z-[1]'
                    }`}
                    onClick={() => onBookNow(item.id)}
                  >
                    {/* Unique gradient background glow for popular card */}
                    {item.popular && (
                      <span className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#9E1B1B]/8 to-transparent rounded-full -mr-10 -mt-10 blur-xl pointer-events-none transition-opacity duration-500 group-hover:opacity-80" />
                    )}
                    
                    {/* Subtle design stroke for popular selection */}
                    {item.popular && (
                      <div className="absolute top-0 left-[8%] right-[8%] h-[3px] bg-gradient-to-r from-transparent via-[#9E1B1B] to-transparent" />
                    )}

                    {/* Cardiology-inspired repeating motif: beautiful responsive EKG watermark inside every card */}
                    <div className={`absolute right-[-15px] bottom-[-10px] w-40 h-28 opacity-[0.04] transition-all duration-700 pointer-events-none select-none z-0 ${
                      item.popular ? 'text-[#9E1B1B] group-hover:opacity-[0.14] group-hover:-translate-x-1' : 'text-primary group-hover:opacity-[0.11] group-hover:-translate-x-1'
                    }`}>
                      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path
                          d="M0,60 L30,60 L34,51 L38,76 L42,24 L46,68 L50,60 L100,60"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <div className="relative z-10">
                       {/* Top Category Badge Row */}
                      <div className="flex items-center justify-between gap-2.5 mb-6.5">
                        <span className={`font-mono text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md leading-none border ${
                          item.popular
                            ? 'text-[#9E1B1B] bg-[#9E1B1B]/5 border-[#9E1B1B]/10'
                            : 'text-primary bg-primary/5 border-primary/10'
                        }`}>
                          {item.category}
                        </span>
                        {item.popular && (
                          <span className="inline-flex items-center gap-1.5 text-[8.5px] font-black text-[#9E1B1B] tracking-[0.12em] uppercase bg-[#9E1B1B]/10 border border-[#9E1B1B]/20 px-2.5 py-1 rounded-full leading-none shadow-sm">
                            <Sparkles size={8.5} className="fill-current animate-pulse" />
                            <span className="relative">Highly Requested</span>
                          </span>
                        )}
                      </div>

                      {/* Title & Icon Header */}
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-2xl shrink-0 transition-all duration-500 ring-1 ${
                            item.popular
                              ? 'bg-[#9E1B1B]/10 text-[#9E1B1B] ring-[#9E1B1B]/15 group-hover:bg-[#9E1B1B] group-hover:text-white'
                              : 'bg-primary/5 text-primary ring-primary/[0.03] group-hover:bg-primary group-hover:text-white'
                          }`}>
                            <IconComponent size={20} className="stroke-[1.75]" />
                          </div>
                          <div className="space-y-1 min-w-0">
                            <h3 className="font-serif text-[18px] sm:text-[20px] font-bold text-on-surface tracking-tight group-hover:text-primary transition-colors leading-snug">
                              {item.name}
                            </h3>
                            <p className="font-sans text-[11px] font-semibold text-on-surface-variant/70 italic">
                              {item.marathi}
                            </p>
                          </div>
                        </div>

                        {/* Informative Short Clinical Description */}
                        <p className="font-sans text-[13px] text-on-surface-variant/80 leading-relaxed pt-1.5 h-[56px] overflow-hidden line-clamp-3">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Footer Section: Price & Booking Action */}
                    <div className="border-t border-outline-variant/30 mt-6 pt-5 flex items-center justify-between gap-2 relative z-10">
                      <div className="flex flex-col text-left">
                        <span className="font-mono text-[8px] uppercase font-extrabold tracking-widest text-[#3F3F3F]/40">Fee Schedule</span>
                        <span className={`font-sans text-[24px] sm:text-[26px] font-black tracking-tight leading-none pt-1 transition-transform origin-left duration-300 ${
                          item.popular ? 'text-[#9E1B1B] group-hover:scale-105' : 'text-primary group-hover:scale-105'
                        }`}>
                          {item.price}
                        </span>
                      </div>
                      
                      <div className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-sans text-[10px] font-extrabold uppercase tracking-[0.16em] shadow-sm ring-1 transition-all duration-300 ${
                        item.popular
                          ? 'bg-[#9E1B1B] text-white hover:bg-[#1B365D] hover:text-white shadow-md ring-[#9E1B1B]/20 border-none'
                          : 'bg-[#FCFAF5] text-[#9E1B1B] ring-primary/5 group-hover:bg-primary group-hover:text-white group-hover:ring-primary/10'
                      }`}>
                        <span>Book Visit</span>
                        <ChevronRight size={11} className="transition-transform group-hover:translate-x-1 stroke-[3]" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {filteredPricing.length === 0 && (
                <div className="col-span-full py-16 text-center text-on-surface-variant text-body-md font-sans">
                  No consultation items matched "{searchQuery}"
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-16 text-center">
            <p className="font-sans text-xs text-on-surface-variant/80 max-w-md mx-auto leading-relaxed">
              *All pricing is fully comprehensive. No additional laboratory setup, sanitization or hospital administrative charges. Standard billing cards provided.
            </p>
          </div>

        </div>
      </motion.section>

      {/* 5. Patient Testimonial Reviews Section */}
      <section className="py-36 lg:py-48 relative bg-surface border-t border-outline-variant/15 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-5 md:px-[64px] relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-5 mb-20">
            <span className="text-tertiary font-sans text-[11px] sm:text-xs uppercase font-extrabold tracking-[0.35em] block">
              TESTED & TRUSTED JOURNEYS
            </span>
            <h2 className="font-serif text-[42px] md:text-[58px] lg:text-[68px] font-extrabold text-on-surface leading-[1.05] tracking-tight">
              Letters of Gratitude
            </h2>
            <div className="w-20 h-[1.5px] bg-tertiary/25 mx-auto mt-4" />
            <p className="font-sans text-[16px] text-on-surface-variant max-w-xl mx-auto pt-3 leading-relaxed">
              Generations of patients trust Dr. Rohit Dixit to support and champion their long-term cardiovascular health.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8.5">
            {[
              {
                text: "Very good consultation, treatment, and service. Dr. Rohit Dixit and his staff are very humble, experienced, and courteous. The entire process was smooth from start to finish.",
                author: "Ganesh Pawar",
                role: "Local Guide",
                initials: "GP"
              },
              {
                text: "Excellent cardiology clinic in Satara. Dr. Rohit is very patient and knowledgeable. He listens carefully to all problems and suggests the best possible treatment. Highly recommended for any heart related issues.",
                author: "Pravin Jangam",
                role: "Google Reviewer",
                initials: "PJ"
              },
              {
                text: "I visited Dixit Heart Care for a routine checkup. The clinic is very clean, hygienic, and the staff is cooperative. Dr. Dixit's diagnosis is spot on and his polite nature makes you feel completely comfortable.",
                author: "Siddhi Shelar",
                role: "Patient",
                initials: "SS"
              }
            ].map((testi, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8, scale: 1.01 }}
                className="bg-white border border-outline-variant rounded-[32px] p-10 text-left shadow-[0_25px_60px_rgba(27,54,93,0.01)] flex flex-col justify-between relative transition-all duration-700 hover:shadow-[0_45px_100px_rgba(27,54,93,0.07)] hover:border-primary/20"
              >
                <div className="space-y-6">
                  <div className="text-primary/10 absolute top-8 right-8">
                    <Quote size={48} className="fill-primary/5 stroke-[1.25]" />
                  </div>
                  <div className="flex text-amber-500 gap-0.5">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={13} className="fill-amber-500 shrink-0" />
                    ))}
                  </div>
                  <p className="font-sans text-[15.5px] text-on-surface/90 leading-relaxed italic relative z-10">
                    "{testi.text}"
                  </p>
                </div>

                <div className="flex items-center gap-4.5 mt-10 pt-7 border-t border-outline-variant/15 relative z-10">
                  <div className="w-11 h-11 rounded-full bg-primary/10 text-primary font-serif font-bold text-[14px] flex items-center justify-center select-none border border-primary/5">
                    {testi.initials}
                  </div>
                  <div>
                    <h4 className="font-sans text-[13.5px] font-extrabold text-on-background uppercase tracking-[0.05em]">
                      {testi.author}
                    </h4>
                    <p className="font-sans text-[11px] text-[#9E1B1B] font-semibold uppercase tracking-wider">
                      {testi.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Comprehensive Dr. Dixit biography expansion modal (Drawer modal) */}
      <AnimatePresence>
        {isBioModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBioModalOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-x-4 top-[8%] bottom-[8%] md:max-w-2xl md:mx-auto bg-background z-50 rounded-lg p-8 shadow-2xl overflow-y-auto border border-outline-variant/30 text-left outline-none flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start pb-4 border-b border-outline-variant/20">
                  <div>
                    <h3 className="font-serif text-[28px] font-bold text-on-surface select-none">
                      Dr. Rohit Prakash Dixit
                    </h3>
                    <p className="font-sans text-xs uppercase tracking-widest text-primary font-bold">
                      Consultant Interventional Cardiologist
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsBioModalOpen(false)}
                    className="p-1 px-3 text-xs bg-surface-container-low hover:bg-primary hover:text-white rounded transition-colors uppercase font-bold font-sans"
                  >
                    Close
                  </button>
                </div>

                <div className="space-y-8 font-sans text-body-lg text-on-surface-variant leading-relaxed">
                  
                  {/* Medical Background */}
                  <div className="space-y-3">
                    <h4 className="font-serif text-[20px] md:text-[22px] font-extrabold text-on-surface flex items-center gap-2.5">
                      <GraduationCap size={22} className="text-primary" /> Education &amp; Training
                    </h4>
                    <p className="font-sans text-body-md leading-relaxed text-on-surface-variant">
                      Dr. Rohit Prakash Dixit completed his comprehensive medical education and specialized training:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-[14px] font-sans text-on-surface-variant/90 leading-relaxed">
                      <li><strong>MBBS</strong> – Fundamental medical training and foundation.</li>
                      <li><strong>DNB (Medicine)</strong> – Advanced study and specialization in internal medicine.</li>
                      <li><strong>DNB (Cardiology) (Gold Medalist)</strong> – Diplomate of National Board certification in specialized cardiac care, awarded with distinction.</li>
                      <li><strong>FACC, FSCAI, CRCDM</strong> – Prestigious fellowships reflecting global standards in cardiovascular and interventional care.</li>
                    </ul>
                  </div>

                  {/* Career achievements */}
                  <div className="space-y-3">
                    <h4 className="font-serif text-[20px] md:text-[22px] font-extrabold text-on-surface flex items-center gap-2.5">
                      <Stethoscope size={22} className="text-primary" /> Clinical Expertise
                    </h4>
                    <p className="text-[14px] font-sans text-on-surface-variant/90 leading-relaxed">
                      As a Consultant Interventional Cardiologist, Dr. Dixit provides expert care for a wide spectrum of cardiovascular conditions. He emphasizes accurate diagnostics, evidence-based treatments, and patient well-being, serving the Satara community with dedication and ethical practice.
                    </p>
                  </div>

                  {/* Patient practice values */}
                  <div className="space-y-3">
                    <h4 className="font-serif text-[20px] md:text-[22px] font-extrabold text-on-surface flex items-center gap-2.5">
                      <Stethoscope size={22} className="text-primary" /> Philosophy of Care
                    </h4>
                    <p className="text-[14px] font-sans text-on-surface-variant/90 leading-relaxed">
                      "Every patient heartbeat is unique. Redefining high-end cardiovascular health means looking past the monitors to understand our patient's lifestyle, reducing anxiety, and establishing transparent pricing for all diagnostics."
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-outline-variant/15 flex justify-end gap-3 shrink-0">
                <button 
                  onClick={() => setIsBioModalOpen(false)}
                  className="bg-surface-container-low hover:bg-surface-container-high px-5 py-2.5 rounded font-sans text-label-md transition-colors"
                >
                  Dismiss Profile
                </button>
                <button 
                  onClick={() => {
                    setIsBioModalOpen(false);
                    onViewChange('contact');
                  }}
                  className="bg-primary text-on-primary hover:bg-primary-container px-6 py-2.5 rounded font-sans text-label-md transition-colors font-bold"
                >
                  Book Appointment
                </button>
              </div>
            </motion.div>
          </>
        )}

        {activeShowcaseCard && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveShowcaseCard(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 cursor-pointer"
            />

            {/* Modal Box - Clean Photo Lightbox */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed inset-4 md:inset-x-12 md:max-w-4xl md:max-h-[85vh] md:m-auto z-50 rounded-[24px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.6)] flex items-center justify-center outline-none"
            >
              <div className="w-full h-full relative bg-neutral-950 flex items-center justify-center">
                <img 
                  src={activeShowcaseCard.img} 
                  alt={activeShowcaseCard.title} 
                  className="w-full h-full object-contain select-none max-h-[85vh]"
                  referrerPolicy="no-referrer"
                />

                {/* Close Button overlay */}
                <button 
                  onClick={() => setActiveShowcaseCard(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-black/50 hover:bg-white hover:text-black text-white hover:scale-105 transition-all duration-300 z-50 cursor-pointer border border-white/10 shadow-lg"
                  title="Close Photo"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
