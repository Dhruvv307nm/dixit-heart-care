import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROCEDURES, POLICIES, CONTACT_INFO } from '../data';
import { Procedure, ViewType } from '../types';
import LucideIcon from './LucideIcon';
import { Info, Calendar, ClipboardCheck, Clock, X, Heart, Search, ArrowRight, ShieldAlert } from 'lucide-react';

interface ServicesViewProps {
  onBookNow: (procedureId: string) => void;
  onViewChange: (view: ViewType) => void;
}

export default function ServicesView({ onBookNow, onViewChange }: ServicesViewProps) {
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null);
  const [hoveredPolicyIndex, setHoveredPolicyIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter procedures for quick search
  const filteredProcedures = PROCEDURES.filter(proc =>
    proc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    proc.marathiName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    proc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-[#FCFAF5] text-on-surface select-none"
    >
      {/* 1. Hero Section - Deep Whitespace and Editorial Hierarchy */}
      <section className="relative py-32 lg:py-44 overflow-hidden bg-white border-b border-outline-variant/15" id="hero-section">
        {/* Subtle geometric overlays with dual light reflections */}
        <div className="absolute inset-0 custom-grid-pattern opacity-[0.05] pointer-events-none" />
        <div className="absolute -top-[25%] -left-[10%] w-[60%] h-[75%] bg-gradient-to-tr from-primary/[0.035] to-tertiary/[0.015] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-[25%] right-[-10%] w-[50%] h-[65%] bg-gradient-to-bl from-tertiary/[0.02] to-[#1B365D]/[0.01] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-5 md:px-[64px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* Left Column Content */}
            <div className="lg:col-span-6 space-y-8 text-left">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2.5 bg-[#FCFAF5] border border-primary/10 px-4.5 py-2.5 rounded-full shadow-[0_8px_30px_rgba(27,54,93,0.01)] ring-1 ring-primary/5"
              >
                <Heart size={13} className="text-tertiary fill-tertiary/10 animate-pulse" />
                <span className="text-primary font-sans text-[10px] uppercase font-bold tracking-[0.3em]">
                  STATE-OF-THE-ART CARDIOVASCULAR SUITE
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                className="font-serif text-[48px] sm:text-[64px] lg:text-[76px] leading-[1.02] tracking-[-0.04em] font-extrabold text-[#1B365D]"
              >
                Advanced Diagnostics, <br />
                <span className="text-primary italic font-serif font-normal block pt-1">Transparent Truth.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="font-sans text-[16px] sm:text-[18px] text-[#3F3F3F]/85 max-w-lg leading-relaxed pt-2"
              >
                At Dixit Heart Care, we align medical supremacy with total transparency. Our ultra-precise, soundproofed diagnostic suites generate instantaneous clinical clarity—with upfront scheduled pricing and absolute care.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-5 pt-4 relative z-20"
              >
                <button
                  onClick={() => onViewChange('contact')}
                  className="group relative bg-[#1B365D] text-[#FCFAF5] hover:bg-neutral-900 font-sans font-extrabold text-[11px] uppercase tracking-[0.25em] px-10 py-5.5 rounded-none md:rounded-tr-[28px] md:rounded-bl-[28px] transition-all duration-700 shadow-[0_20px_45px_-10px_rgba(27,54,93,0.22)] hover:shadow-[0_24px_55px_-8px_rgba(27,54,93,0.32)] hover:-translate-y-1 cursor-pointer overflow-hidden text-center"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>Schedule Diagnostic Slot</span>
                    <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform stroke-[2.5]" />
                  </span>
                  <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <a
                  href="#procedures-grid"
                  className="relative border border-primary/15 text-primary font-sans font-extrabold text-[11px] uppercase tracking-[0.25em] px-9 py-5.5 rounded-none md:rounded-tl-[28px] md:rounded-br-[28px] hover:bg-primary/5 transition-all hover:border-primary/40 text-center cursor-pointer bg-white/30 backdrop-blur-md"
                >
                  Explore Catalog Prices
                </a>
              </motion.div>
            </div>

            {/* Right Column Creative Image Presentation with Overlaps */}
            <div className="lg:col-span-6 relative mt-16 lg:mt-0">
              <div className="absolute -inset-8 bg-primary/[0.03] rounded-[54px] blur-3xl -z-10" />
              <motion.div
                initial={{ opacity: 0, scale: 0.96, rotate: -1 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[480px] mx-auto relative group z-10"
              >
                {/* Asymmetric offset backgrounds */}
                <div className="absolute inset-0 bg-primary/5 rounded-[52px] translate-x-5 translate-y-5 -z-20 transition-transform duration-[1200ms] group-hover:translate-x-3.5 group-hover:translate-y-3.5" />
                <div className="absolute inset-0 border border-outline-variant/60 rounded-[52px] translate-x-3 translate-y-3 -z-10" />

                <div className="bg-white p-5 rounded-[48px] shadow-[0_35px_85px_rgba(27,54,93,0.03)] border border-outline-variant overflow-hidden ring-[14px] ring-white">
                  <div className="aspect-[4/3] rounded-[36px] overflow-hidden relative group">
                    <motion.img
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                      alt="Advanced GE Echo Machine"
                      src="/gallery-2.jpg"
                      className="w-full h-full object-contain bg-neutral-50 select-none pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/15 to-transparent pointer-events-none" />
                  </div>
                </div>
              </motion.div>

              {/* Floating Emergency Element - Styled with rotation, blur and high elevation */}
              <motion.div
                initial={{ opacity: 0, x: 20, rotate: 6 }}
                animate={{ opacity: 1, x: 0, rotate: 3, y: [0, 8, 0] }}
                transition={{ 
                  opacity: { delay: 0.6 },
                  x: { delay: 0.6, type: "spring", stiffness: 100 },
                  rotate: { delay: 0.6 },
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
                }}
                className="absolute -top-10 -right-4 lg:-top-14 lg:-right-12 z-20"
              >
                <div className="bg-white/95 backdrop-blur-md rounded-[24px] p-6.5 border border-primary/10 shadow-[0_20px_45px_rgba(27,54,93,0.06)] w-[260px] text-left">
                  <div className="flex items-center gap-3.5 mb-2.5">
                    <div className="w-[38px] h-[38px] rounded-xl bg-primary/10 text-primary flex items-center justify-center animate-pulse">
                      <ShieldAlert size={18} className="stroke-[2.5]" />
                    </div>
                    <h4 className="font-serif text-[17px] text-[#1B365D] font-extrabold">24/7 Helpline</h4>
                  </div>
                  <p className="font-sans text-[11.5px] uppercase tracking-wider font-extrabold text-[#3F3F3F]/60">Immediate Critical Care</p>
                  <a
                    href={`tel:${CONTACT_INFO.emergencyLine}`}
                    className="font-mono text-xs sm:text-[13.5px] font-bold text-primary hover:underline block mt-1"
                  >
                    {CONTACT_INFO.emergencyLine}
                  </a>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Services Asymmetric Staggered Section - Rich Textures and Perfect Borders */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="py-36 lg:py-48 bg-[#FCFAF5] relative border-b border-outline-variant/15" id="procedures-grid"
      >
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/2 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-[1280px] mx-auto px-5 md:px-[64px] relative z-10">
          
          {/* Header Block with Search */}
          <div className="text-center mb-24 max-w-3xl mx-auto space-y-6">
            <span className="text-tertiary font-sans text-[11px] sm:text-xs uppercase font-extrabold tracking-[0.35em] block">
              DIAGNOSTIC SUPREMACY
            </span>
            <h2 className="font-serif text-[42px] md:text-[58px] lg:text-[68px] text-on-surface leading-[1.05] tracking-tight font-extrabold">
              Prescribed Diagnostic Procedures
            </h2>
            <div className="w-20 h-[1.5px] bg-tertiary/25 mx-auto mt-4" />
            <p className="font-sans text-[16px] text-on-surface-variant max-w-2xl mx-auto pt-3 leading-relaxed">
              Clear, upfront pricing for expert cardiac check-ups. We guarantee complete clinical transparency, allowing you to focus on healing without administrative friction.
            </p>

            {/* Quick interactive search filter with designer styling */}
            <div className="pt-6 max-w-md mx-auto">
              <div className="relative">
                <Search size={18} className="absolute left-4 top-[50%] -translate-y-[50%] text-on-surface-variant/70" />
                <input
                  type="text"
                  placeholder="Filter procedures (e.g. ECG, Echo, TMT...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4.5 py-4 bg-white rounded-none md:rounded-tr-2xl md:rounded-bl-2xl border border-outline-variant/60 font-sans text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/40 shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Interactive Staggered Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8.5 items-start">
            
            {/* Left Column */}
            <div className="col-span-12 lg:col-span-6 space-y-8 lg:mt-24">
              
              {/* Filter warning if none found */}
              {filteredProcedures.length === 0 && (
                <div className="bg-white p-12 text-center rounded-[28px] border border-outline-variant/60 shadow-sm max-w-lg mx-auto">
                  <p className="font-sans text-on-surface-variant text-[15px] font-medium">No procedures match your search query.</p>
                  <button onClick={() => setSearchQuery('')} className="mt-3 text-primary font-bold hover:underline font-sans text-xs uppercase tracking-wider">Reset Filter</button>
                </div>
              )}

              {/* CARD 1 - ECG */}
              {filteredProcedures.some(p => p.id === 'ecg') && (
                (() => {
                  const proc = PROCEDURES.find(p => p.id === 'ecg')!;
                  return (
                    <motion.div
                      whileHover={{ y: -8, scale: 1.005 }}
                      onClick={() => setSelectedProcedure(proc)}
                      className="bg-white rounded-[32px] p-9 border border-outline-variant/50 shadow-premium-sm ring-1 ring-primary/[0.03] transition-all duration-750 hover:border-primary/20 hover:shadow-premium-md relative group overflow-hidden cursor-pointer text-left"
                      id="card-ecg"
                    >
                      <div className="absolute -right-8 -top-8 p-4 opacity-[0.03] group-hover:opacity-[0.07] transition-all duration-500 transform group-hover:scale-110">
                        <LucideIcon name={proc.iconName} size={130} />
                      </div>
                      <div className="flex justify-between items-start mb-5 relative z-10">
                        <div>
                          <h3 className="font-serif text-[24px] font-extrabold text-[#1B365D] group-hover:text-primary transition-colors duration-300">{proc.name}</h3>
                          <p className="text-[11px] text-[#8E706C] font-extrabold mt-0.5 tracking-wider uppercase">{proc.marathiName}</p>
                        </div>
                        <span className="bg-[#FCFAF5] text-tertiary px-5 py-2 rounded-full font-serif font-extrabold text-[15.5px] border border-tertiary/10 ring-1 ring-primary/5">
                          ₹{proc.price}
                        </span>
                      </div>
                      <p className="font-sans text-[15px] text-on-surface-variant leading-relaxed line-clamp-2">
                        {proc.description}
                      </p>
                      <div className="mt-5 flex items-center gap-1.5 text-xs text-primary font-bold uppercase tracking-wider">
                        <span>Preparation Details</span>
                        <ArrowRight size={13} className="transform group-hover:translate-x-1.5 transition-transform stroke-[2.5]" />
                      </div>
                    </motion.div>
                  );
                })()
              )}

              {/* CARD 3 - TMT */}
              {filteredProcedures.some(p => p.id === 'tmt') && (
                (() => {
                  const proc = PROCEDURES.find(p => p.id === 'tmt')!;
                  return (
                    <motion.div
                      whileHover={{ y: -8, scale: 1.005 }}
                      onClick={() => setSelectedProcedure(proc)}
                      className="bg-white rounded-[32px] p-9 border border-outline-variant/50 shadow-[0_20px_50px_rgba(27,54,93,0.01)] ring-1 ring-primary/[0.03] transition-all duration-750 hover:border-primary/20 hover:shadow-[0_40px_85px_rgba(27,54,93,0.06)] relative group overflow-hidden cursor-pointer text-left"
                      id="card-tmt"
                    >
                      <div className="absolute -right-8 -top-8 p-4 opacity-[0.03] group-hover:opacity-[0.07] transition-all duration-500 transform group-hover:scale-110">
                        <LucideIcon name={proc.iconName} size={130} />
                      </div>
                      <div className="flex justify-between items-start mb-5 relative z-10">
                        <div>
                          <h3 className="font-serif text-[24px] font-extrabold text-[#1B365D] group-hover:text-primary transition-colors duration-300">{proc.name}</h3>
                          <p className="text-[11px] text-[#8E706C] font-extrabold mt-0.5 tracking-wider uppercase">{proc.marathiName}</p>
                        </div>
                        <span className="bg-[#FCFAF5] text-tertiary px-5 py-2 rounded-full font-serif font-extrabold text-[15.5px] border border-tertiary/10 ring-1 ring-primary/5">
                          ₹{proc.price}
                        </span>
                      </div>
                      <p className="font-sans text-[15px] text-on-surface-variant leading-relaxed line-clamp-2">
                        {proc.description}
                      </p>
                      <div className="mt-5 flex items-center gap-1.5 text-xs text-primary font-bold uppercase tracking-wider">
                        <span>Preparation Details</span>
                        <ArrowRight size={13} className="transform group-hover:translate-x-1.5 transition-transform stroke-[2.5]" />
                      </div>
                    </motion.div>
                  );
                })()
              )}

              {/* CARD 5 - Lipid Profile */}
              {filteredProcedures.some(p => p.id === 'lipid') && (
                (() => {
                  const proc = PROCEDURES.find(p => p.id === 'lipid')!;
                  return (
                    <motion.div
                      whileHover={{ y: -8, scale: 1.005 }}
                      onClick={() => setSelectedProcedure(proc)}
                      className="bg-white rounded-[32px] p-9 border border-outline-variant/50 shadow-[0_20px_50px_rgba(27,54,93,0.01)] ring-1 ring-primary/[0.03] transition-all duration-750 hover:border-primary/20 hover:shadow-[0_40px_85px_rgba(27,54,93,0.06)] relative group overflow-hidden cursor-pointer text-left"
                      id="card-lipid"
                    >
                      <div className="absolute -right-8 -top-8 p-4 opacity-[0.03] group-hover:opacity-[0.07] transition-all duration-500 transform group-hover:scale-110">
                        <LucideIcon name={proc.iconName} size={130} />
                      </div>
                      <div className="flex justify-between items-start mb-5 relative z-10">
                        <div>
                          <h3 className="font-serif text-[24px] font-extrabold text-[#1B365D] group-hover:text-primary transition-colors duration-300">{proc.name}</h3>
                          <p className="text-[11px] text-[#8E706C] font-extrabold mt-0.5 tracking-wider uppercase">{proc.marathiName}</p>
                        </div>
                        <span className="bg-[#FCFAF5] text-tertiary px-5 py-2 rounded-full font-serif font-extrabold text-[15.5px] border border-tertiary/10 ring-1 ring-primary/5">
                          ₹{proc.price}
                        </span>
                      </div>
                      <p className="font-sans text-[15px] text-on-surface-variant leading-relaxed line-clamp-2">
                        {proc.description}
                      </p>
                      <div className="mt-5 flex items-center gap-1.5 text-xs text-primary font-bold uppercase tracking-wider">
                        <span>Preparation Details</span>
                        <ArrowRight size={13} className="transform group-hover:translate-x-1.5 transition-transform stroke-[2.5]" />
                      </div>
                    </motion.div>
                  );
                })()
              )}

            </div>

            {/* Right Column */}
            <div className="col-span-12 lg:col-span-6 space-y-8 relative">
              
              {/* CARD 2 - 2D Echo */}
              {filteredProcedures.some(p => p.id === 'echo') && (
                (() => {
                  const proc = PROCEDURES.find(p => p.id === 'echo')!;
                  return (
                    <motion.div
                      whileHover={{ y: -8, scale: 1.005 }}
                      onClick={() => setSelectedProcedure(proc)}
                      className="bg-white rounded-[32px] p-9 border border-outline-variant/50 shadow-[0_20px_50px_rgba(27,54,93,0.01)] ring-1 ring-primary/[0.03] transition-all duration-750 hover:border-primary/20 hover:shadow-[0_40px_85px_rgba(27,54,93,0.06)] relative group overflow-hidden cursor-pointer lg:-ml-6 text-left"
                      id="card-echo"
                    >
                      <div className="absolute -right-8 -top-8 p-4 opacity-[0.03] group-hover:opacity-[0.07] transition-all duration-500 transform group-hover:scale-110">
                        <LucideIcon name={proc.iconName} size={130} />
                      </div>
                      <div className="flex justify-between items-start mb-5 relative z-10">
                        <div>
                          <h3 className="font-serif text-[24px] font-extrabold text-[#1B365D] group-hover:text-primary transition-colors duration-300">{proc.name}</h3>
                          <p className="text-[11px] text-[#8E706C] font-extrabold mt-0.5 tracking-wider uppercase">{proc.marathiName}</p>
                        </div>
                        <span className="bg-[#FCFAF5] text-tertiary px-5 py-2 rounded-full font-serif font-extrabold text-[15.5px] border border-tertiary/10 ring-1 ring-primary/5">
                          ₹{proc.price}
                        </span>
                      </div>
                      <p className="font-sans text-[15px] text-on-surface-variant leading-relaxed line-clamp-2">
                        {proc.description}
                      </p>
                      <div className="mt-5 flex items-center gap-1.5 text-xs text-primary font-bold uppercase tracking-wider">
                        <span>Preparation Details</span>
                        <ArrowRight size={13} className="transform group-hover:translate-x-1.5 transition-transform stroke-[2.5]" />
                      </div>
                    </motion.div>
                  );
                })()
              )}

              {/* CARD 4 - Holter */}
              {filteredProcedures.some(p => p.id === 'holter') && (
                (() => {
                  const proc = PROCEDURES.find(p => p.id === 'holter')!;
                  return (
                    <motion.div
                      whileHover={{ y: -8, scale: 1.005 }}
                      onClick={() => setSelectedProcedure(proc)}
                      className="bg-white rounded-[32px] p-9 border border-outline-variant/50 shadow-[0_20px_50px_rgba(27,54,93,0.01)] ring-1 ring-primary/[0.03] transition-all duration-750 hover:border-primary/20 hover:shadow-[0_40px_85px_rgba(27,54,93,0.06)] relative group overflow-hidden cursor-pointer lg:ml-6 text-left"
                      id="card-holter"
                    >
                      <div className="absolute -right-8 -top-8 p-4 opacity-[0.03] group-hover:opacity-[0.07] transition-all duration-500 transform group-hover:scale-110">
                        <LucideIcon name={proc.iconName} size={130} />
                      </div>
                      <div className="flex justify-between items-start mb-5 relative z-10">
                        <div>
                          <h3 className="font-serif text-[24px] font-extrabold text-[#1B365D] group-hover:text-primary transition-colors duration-300">{proc.name}</h3>
                          <p className="text-[11px] text-[#8E706C] font-extrabold mt-0.5 tracking-wider uppercase">{proc.marathiName}</p>
                        </div>
                        <span className="bg-[#FCFAF5] text-tertiary px-5 py-2 rounded-full font-serif font-extrabold text-[15.5px] border border-tertiary/10 ring-1 ring-primary/5">
                          ₹{proc.price}
                        </span>
                      </div>
                      <p className="font-sans text-[15px] text-on-surface-variant leading-relaxed line-clamp-2">
                        {proc.description}
                      </p>
                      <div className="mt-5 flex items-center gap-1.5 text-xs text-primary font-bold uppercase tracking-wider">
                        <span>Preparation Details</span>
                        <ArrowRight size={13} className="transform group-hover:translate-x-1.5 transition-transform stroke-[2.5]" />
                      </div>
                    </motion.div>
                  );
                })()
              )}

              {/* CARD 6 - CONSULTATION CALLOUT (Premium Design alignment with landing page) */}
              {filteredProcedures.some(p => p.id === 'consultation') && (
                (() => {
                  const proc = PROCEDURES.find(p => p.id === 'consultation')!;
                  return (
                    <motion.div
                      whileHover={{ scale: 1.01, y: -6 }}
                      transition={{ duration: 0.5 }}
                      className="relative lg:-ml-10 mt-12 z-20 text-left"
                      id="card-consultation"
                    >
                      <div className="bg-[#1B365D] hover:bg-neutral-900 rounded-[36px] p-9 md:p-12 border border-[#9E1B1B]/20 shadow-[0_25px_65px_-10px_rgba(27,54,93,0.3)] hover:shadow-[0_30px_75px_-5px_rgba(27,54,93,0.4)] transition-all duration-700 relative group overflow-hidden">
                        
                        <div className="absolute -right-8 -top-8 p-4 opacity-[0.06] group-hover:opacity-[0.12] text-white transition-all duration-500 transform group-hover:scale-110 select-none pointer-events-none">
                          <LucideIcon name="Stethoscope" size={190} />
                        </div>

                        <div className="flex flex-col gap-6.5 relative z-10">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-serif text-[28px] md:text-[34px] text-[#FCFAF5] font-extrabold leading-tight">
                                {proc.name}
                              </h3>
                              <p className="font-sans text-xs text-[#F3EFE3]/70 mt-1 font-bold uppercase tracking-widest select-none">
                                {proc.marathiName}
                              </p>
                            </div>
                            <span className="bg-[#FCFAF5] text-[#1B365D] font-sans text-xs uppercase tracking-wider px-5 py-2.5 rounded-full font-extrabold shadow-md select-none ring-1 ring-primary/10">
                              ₹{proc.price}
                            </span>
                          </div>

                          <p className="font-sans text-[16px] md:text-[18px] text-[#FCFAF5]/85 leading-relaxed max-w-lg">
                            {proc.description}
                          </p>

                          <div className="flex flex-wrap gap-4 pt-3">
                            <button
                              onClick={() => onBookNow(proc.id)}
                              className="bg-[#FCFAF5] text-[#1B365D] hover:bg-neutral-205 font-sans font-extrabold text-[10.5px] uppercase tracking-[0.2em] px-7.5 py-4.5 rounded-none md:rounded-tr-[20px] md:rounded-bl-[20px] transition-all duration-500 shadow-md cursor-pointer"
                            >
                              Book Consultation
                            </button>
                            <button
                              onClick={() => setSelectedProcedure(proc)}
                              className="border border-[#FCFAF5]/30 text-[#FCFAF5] hover:border-[#FCFAF5] px-6 py-4.5 rounded-none md:rounded-tl-[20px] md:rounded-br-[20px] font-sans text-[10.5px] font-extrabold uppercase tracking-[0.2em] transition-all hover:bg-white/5 cursor-pointer"
                            >
                              Check Preparation
                            </button>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  );
                })()
              )}

            </div>

          </div>

        </div>
      </motion.section>

      {/* 3. Patients Policies tactile Card Stack deck - Absolute Quality Framing */}
      <section className="py-36 lg:py-48 relative bg-white overflow-hidden" id="clinic-policies">
        <div className="absolute -left-20 top-20 w-96 h-96 bg-primary/3 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-[1280px] mx-auto px-5 md:px-[64px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* Left Header Block */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="text-tertiary font-sans text-[11px] sm:text-xs uppercase tracking-[0.35em] font-extrabold block">
                OPERATION DIRECTIVES
              </span>
              <h2 className="font-serif text-[44px] md:text-[62px] text-on-surface leading-[1.05] font-extrabold tracking-tight">
                Clinic <br />
                <span className="text-primary italic font-serif font-normal">Policies &amp; Directives</span>
              </h2>
              <div className="w-[72px] h-[1.5px] bg-primary/20 my-4" />
              <p className="font-sans text-[16px] text-on-surface-variant leading-relaxed border-l-2 border-primary/20 pl-5 pt-1.5">
                We respect your time. These structured administrative operating guidelines ensure prioritizations are made seamlessly for diagnostics, sudden crises, and transparent claims.
              </p>
            </div>

            {/* Right Tactical Stack Deck */}
            <div className="lg:col-span-7 relative h-[420px] sm:h-[360px] md:h-[340px] w-full text-left">
              {POLICIES.map((policy, idx) => {
                const isHovered = hoveredPolicyIndex === idx;
                const defaultTop = idx * 95;

                return (
                  <motion.div
                    key={policy.id}
                    onMouseEnter={() => setHoveredPolicyIndex(idx)}
                    onMouseLeave={() => setHoveredPolicyIndex(null)}
                    style={{
                      top: `${defaultTop}px`,
                      zIndex: isHovered ? 50 : 10 + idx,
                    }}
                    animate={{
                      y: isHovered ? -14 : 0,
                      scale: isHovered ? 1.012 : 1,
                      x: isHovered ? (idx === 0 ? 8 : idx === 2 ? -8 : 0) : 0,
                      boxShadow: isHovered 
                        ? '0 24px 50px rgba(27,54,93,0.08)' 
                        : '0 4px 20px rgba(0, 0, 0, 0.015)'
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="absolute left-0 right-0 bg-[#FCFAF5] rounded-[24px] p-6 sm:p-8 border border-outline-variant/60 transition-all duration-300 cursor-help"
                  >
                    <div className="flex items-start gap-4 sm:gap-6">
                      <div className={`p-3.5 rounded-xl shrink-0 ${
                        policy.type === 'warning' 
                          ? 'bg-red-50 text-error' 
                          : policy.type === 'success' 
                            ? 'bg-emerald-50 text-emerald-800' 
                            : 'bg-primary/5 text-[#1B365D]'
                      }`}>
                        <LucideIcon name={policy.iconName} size={20} className="stroke-[2.5]" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-serif text-[18px] sm:text-[20px] text-[#1B365D] font-extrabold">
                          {policy.title}
                        </h4>
                        <p className="font-sans text-[13px] sm:text-[14.5px] text-[#3F3F3F]/80 leading-relaxed">
                          {policy.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 4. Preparation Instructions Modal Overlay - Fully Custom UI */}
      <AnimatePresence>
        {selectedProcedure && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProcedure(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />
            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-xl bg-white rounded-[36px] shadow-2xl overflow-hidden border border-outline-variant z-10 text-left"
            >
              {/* Top Banner Accent */}
              <div className="h-2.5 bg-[#1B365D]" />
              
              <div className="p-7 md:p-10 space-y-7">
                
                {/* Header info */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[#9E1B1B] text-[10px] font-sans font-extrabold tracking-[0.2em] uppercase block select-none">
                      CLINICAL PROCEDURE DIRECTIVE
                    </span>
                    <h3 className="font-serif text-[26px] font-extrabold text-[#1B365D] flex items-center gap-2.5">
                      <LucideIcon name={selectedProcedure.iconName} className="text-primary stroke-[2]" size={24} />
                      {selectedProcedure.name}
                    </h3>
                    <p className="text-xs text-[#3F3F3F]/60 font-semibold select-none uppercase tracking-wide">
                      {selectedProcedure.marathiName}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedProcedure(null)}
                    className="p-2 hover:bg-neutral-100 rounded-full text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
                    aria-label="Close details"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Main Content Block */}
                <div className="space-y-5">
                  {/* Stats line */}
                  <div className="grid grid-cols-2 gap-4 bg-[#FCFAF5] p-4 rounded-[20px] border border-outline-variant/50 text-center select-none">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#3F3F3F]/60 block mb-0.5">Price</span>
                      <span className="font-serif text-lg font-black text-primary">₹{selectedProcedure.price}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#3F3F3F]/60 block mb-0.5">Est. Duration</span>
                      <span className="font-serif text-lg font-black text-on-surface">{selectedProcedure.duration || '20 mins'}</span>
                    </div>
                  </div>

                  {/* General Description */}
                  <div className="space-y-1.5">
                    <span className="font-sans text-[11px] font-extrabold text-on-surface uppercase tracking-widest flex items-center gap-1.5 select-none">
                      <Info size={14} className="text-primary" /> Overview Description
                    </span>
                    <p className="font-sans text-[14.5px] text-[#3F3F3F]/85 leading-relaxed">
                      {selectedProcedure.description}
                    </p>
                  </div>

                  {/* Mandate Guidelines */}
                  <div className="space-y-3">
                    <span className="font-sans text-[11px] font-extrabold text-on-surface uppercase tracking-widest flex items-center gap-1.5 select-none">
                      <ClipboardCheck size={15} className="text-primary" /> Preparation Guidelines
                    </span>
                    <ul className="space-y-2.5 pl-1">
                      {selectedProcedure.instructions && selectedProcedure.instructions.length > 0 ? (
                        selectedProcedure.instructions.map((inst, index) => (
                          <li key={index} className="flex items-start gap-3 font-sans text-[14px] text-[#3F3F3F]/80 leading-relaxed">
                            <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-extrabold leading-none select-none mt-0.5">
                              {index + 1}
                            </span>
                            <span>{inst}</span>
                          </li>
                        ))
                      ) : (
                        <li className="font-sans text-body-md text-on-surface-variant/75 italic">
                          No special guidelines required for this test.
                        </li>
                      )}
                    </ul>
                  </div>

                </div>

                {/* Footer Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-3">
                  <button
                    onClick={() => {
                      onBookNow(selectedProcedure.id);
                      setSelectedProcedure(null);
                    }}
                    className="flex-1 bg-[#1B365D] hover:bg-neutral-900 text-[#FCFAF5] font-sans font-extrabold text-[10.5px] uppercase tracking-[0.2em] py-4 rounded-none md:rounded-tr-2xl md:rounded-bl-2xl transition-all shadow-md text-center cursor-pointer"
                  >
                    Request Diagnostic Slot
                  </button>
                  <button
                    onClick={() => setSelectedProcedure(null)}
                    className="border border-outline/30 text-on-surface hover:bg-neutral-50 px-6 py-4 rounded-none md:rounded-tl-2xl md:rounded-br-2xl font-sans text-[10.5px] font-extrabold uppercase tracking-[0.2em] transition-all cursor-pointer"
                  >
                    Close
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
