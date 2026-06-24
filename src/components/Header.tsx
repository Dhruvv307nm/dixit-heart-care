import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Calendar, Activity, MessageSquare, Heart } from 'lucide-react';
import { ViewType } from '../types';

interface HeaderProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  appointmentCount: number;
}

export default function Header({ currentView, onViewChange, appointmentCount }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' as ViewType },
    { label: 'Services', id: 'services' as ViewType },
    { label: 'Reviews & FAQs', id: 'reviews' as ViewType },
    { label: 'Contact', id: 'contact' as ViewType }
  ];

  const handleNavClick = (view: ViewType) => {
    onViewChange(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-6 z-50 max-w-[1240px] w-[calc(100%-2.5rem)] mx-auto border border-[#9E1B1B]/15 rounded-[28px] transition-all duration-700 ease-[var(--ease-premium)] ${scrolled
      ? 'bg-[#FCFAF5]/90 backdrop-blur-xl shadow-premium-md py-0'
      : 'bg-[#FCFAF5]/60 backdrop-blur-md shadow-[0_20px_50px_rgba(142,112,108,0.04)] py-1'
      }`}>
      {/* Cardiology-inspired Fine-line Art Motif at the bottom edge of sticky header */}
      <div className="absolute bottom-0 left-6 right-6 h-[1px] overflow-hidden pointer-events-none select-none">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 10" style={{ transform: "translateY(4.5px)" }}>
          <motion.path
            d="M0,5 L380,5 L383,5 L387,-1 L391,11 L395,-7 L399,7 L403,5 L500,5 L503,5 L507,0 L511,10 L515,-6 L519,6 L523,5 L1000,5"
            fill="none"
            stroke="#9E1B1B"
            strokeWidth="0.8"
            opacity="0.2"
            initial={{ strokeDashoffset: 1000 }}
            animate={{ strokeDashoffset: [1000, 0, -1000] }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear"
            }}
            strokeDasharray="1000"
          />
        </svg>
      </div>

      <nav className="flex justify-between items-center px-6 md:px-10 py-2 min-h-[104px] transition-all duration-700">
        {/* Brand Logo with Heartpulse indicator */}
        <button
          onClick={() => handleNavClick('home')}
          className="font-serif text-[24px] tracking-wide text-primary flex items-center gap-4.5 hover:opacity-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#9E1B1B] rounded-xl p-1"
          id="brand-logo"
        >
          <div className="h-16 w-16 sm:h-20 sm:w-20 md:h-[11rem] md:w-[11rem] flex items-center justify-center shrink-0 relative group -ml-1 md:-ml-2">
            <img src="/dixit-logo.png" alt="Dixit Heart Care Logo" className="w-[140%] h-[140%] max-w-[140%] max-h-[140%] object-contain pointer-events-none select-none relative z-10 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <span className="font-display uppercase tracking-widest font-bold not-italic text-left leading-[0.85] text-[#1B365D] text-[20px] sm:text-[24px] md:text-[38px] pt-1" style={{ textShadow: "0px 4px 15px rgba(27,54,93,0.15)" }}>
            DIXIT <span className="font-sans text-[8px] sm:text-[9px] md:text-[10.5px] uppercase tracking-[0.45em] font-black text-[#9E1B1B] block mt-1.5 md:mt-2 text-left opacity-90">HEART CARE</span>
          </span>
        </button>

        {/* Desktop Navigation Links with sliding background/underline layout */}
        <ul className="hidden md:flex items-center space-x-2.5 bg-surface-container-low/30 px-3 py-1.5 rounded-full border border-outline-variant/10" role="menubar">
          {navItems.map((item, index) => {
            const isActive = currentView === item.id;
            return (
              <li key={item.id} role="none" className="relative">
                <button
                  role="menuitem"
                  onClick={() => handleNavClick(item.id)}
                  className={`relative z-10 px-4.5 py-2.5 font-sans text-[10px] font-extrabold tracking-[0.24em] uppercase transition-all duration-300 rounded-full flex items-center gap-1.5 ${isActive ? 'text-[#9E1B1B]' : 'text-on-surface-variant/70 hover:text-primary'
                    }`}
                >
                  <span className="opacity-40 text-[9px] font-mono font-medium">0{index + 1}</span>
                  {item.label}
                  {isActive && (
                    <>
                      <motion.div
                        layoutId="active-nav-capsule"
                        className="absolute inset-0 bg-[#9E1B1B]/6 rounded-full border border-[#9E1B1B]/15 -z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 26 }}
                      />
                      <motion.div
                        layoutId="active-nav-dot"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#9E1B1B]"
                        transition={{ type: "spring", stiffness: 350, damping: 26 }}
                      />
                    </>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Book Appointment CTA Button */}
        <div className="hidden md:block">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
            className="flex items-center gap-2.5 bg-[#1B365D] text-[#FCFAF5] font-sans text-[10px] uppercase tracking-[0.24em] font-extrabold px-7 py-4 rounded-none md:rounded-tr-[14px] md:rounded-bl-[14px] hover:bg-[#9E1B1B] hover:text-white transition-all duration-300 shadow-premium-sm hover:shadow-premium-md hover:-translate-y-0.5 active:scale-95 cursor-pointer relative z-50"
            id="header-cta"
          >
            <Calendar size={12.5} className="stroke-[2.5]" />
            Request Visit
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-primary p-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-xl"
          aria-label="Toggle Menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Drawer menu with overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop slide-in */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            {/* Drawer container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[300px] bg-[#FCFAF5] shadow-2xl z-50 md:hidden p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-8">
                <div className="flex justify-between items-center pb-4 border-b border-outline-variant/20">
                  <span className="font-serif italic font-bold text-primary">Menu</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-on-surface-variant hover:text-primary rounded-full bg-surface-container-low"
                  >
                    <X size={20} />
                  </button>
                </div>

                <ul className="space-y-4" role="menu">
                  {navItems.map((item) => {
                    const isActive = currentView === item.id;
                    return (
                      <li key={item.id} role="none">
                        <button
                          role="menuitem"
                          onClick={() => handleNavClick(item.id)}
                          className={`w-full flex items-center justify-between text-left p-3 font-sans text-[16px] font-semibold tracking-wide uppercase rounded-lg border transition-all ${isActive
                            ? 'bg-primary/5 border-primary/20 text-primary font-bold'
                            : 'border-transparent text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
                            }`}
                        >
                          <span className="flex items-center gap-2">
                            {item.id === 'home' && <Heart size={18} />}
                            {item.id === 'services' && <Activity size={18} />}
                            {item.id === 'reviews' && <MessageSquare size={18} />}
                            {item.id === 'contact' && <Calendar size={18} />}
                            {item.label}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Mobile CTA */}
              <div className="space-y-4 pt-6 border-t border-outline-variant/20">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary text-label-md font-semibold py-3.5 rounded shadow-md hover:bg-primary-container transition-all"
                >
                  <Calendar size={18} />
                  Book Appointment
                </button>
                <div className="text-center font-sans text-xs text-on-surface-variant">
                  Emergency Support: <span className="font-semibold text-error">+91 7218692294</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
