import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROCEDURES, CONTACT_INFO, TIMINGS } from '../data';
import { Appointment, ViewType } from '../types';
import LucideIcon from './LucideIcon';
import { MapPin, Phone, Clock, AlertTriangle, ShieldCheck, MessageSquare, CalendarDays, Loader2, Heart } from 'lucide-react';

interface ContactViewProps {
  preselectedProcedureId: string;
  onAppointmentCreated: (appointment: Appointment) => void;
  onViewChange: (view: ViewType) => void;
}

export default function ContactView({ preselectedProcedureId, onAppointmentCreated, onViewChange }: ContactViewProps) {
  // Form input states
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [procedureId, setProcedureId] = useState(preselectedProcedureId || 'consultation');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  
  // Validation, UI loading states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Smart Open/Closed operational state
  const [clinicStatus, setClinicStatus] = useState({ isOpen: false, text: 'Closed' });

  // Update form if preselected procedure changes
  useEffect(() => {
    if (preselectedProcedureId) {
      setProcedureId(preselectedProcedureId);
    }
  }, [preselectedProcedureId]);

  // Evaluate clinic schedule vs current system time
  useEffect(() => {
    const checkClinicStatus = () => {
      const now = new Date();
      const currentDay = now.getDay(); // 0 is Sunday, 1-6 Mon-Sat
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();
      const decimalTime = currentHour + currentMinutes / 60;

      // Monday (1) to Saturday (6)
      if (currentDay >= 1 && currentDay <= 6) {
        // Timings: 3:00 PM (15.0) to 8:00 PM (20.0)
        if (decimalTime >= 15.0 && decimalTime <= 20.0) {
          setClinicStatus({ isOpen: true, text: 'Open Now (Available for Diagnostics)' });
          return;
        }
      }
      setClinicStatus({ isOpen: false, text: 'Closed (Opens Mon-Sat: 3 PM - 8 PM)' });
    };

    checkClinicStatus();
    const interval = setInterval(checkClinicStatus, 60000); // check status every minute
    return () => clearInterval(interval);
  }, []);

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic Validation
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.length < 8) {
      setErrorMessage('Please enter a valid phone number (at least 8 digits).');
      return;
    }
    if (!preferredDate) {
      setErrorMessage('Please pick your preferred appointment date.');
      return;
    }
    if (!preferredTime) {
      setErrorMessage('Please select a preferred slot time.');
      return;
    }

    setIsSubmitting(true);

    // Brief loading state for premium UI feedback before redirecting
    setTimeout(() => {
      const selectedProcObj = PROCEDURES.find(p => p.id === procedureId) || PROCEDURES[0];
      
      // Construct structured WhatsApp message
      const message = `Hello Dixit Heart Care Reception,

I would like to request an appointment. Here are my details:

*Name:* ${fullName.trim()}
*Phone:* ${phoneNumber.trim()}
*Procedure:* ${selectedProcObj.name}
*Date:* ${preferredDate}
*Time Slot:* ${preferredTime}

Please confirm my appointment. Thank you!`;

      const encodedText = encodeURIComponent(message);
      
      // Direct user to WhatsApp
      window.open(`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodedText}`, '_blank', 'noopener,noreferrer');

      // Reset form fields
      setFullName('');
      setPhoneNumber('');
      setPreferredDate('');
      setPreferredTime('');
      setIsSubmitting(false);

      // Show success banner
      setSuccessMessage('Your request has been forwarded to our reception via WhatsApp! We will confirm your slot shortly.');
    }, 600);
  };

  const openMaps = () => {
    window.open(CONTACT_INFO.mapsLink, '_blank', 'noopener,noreferrer');
  };

  const triggerWhatsapp = () => {
    const text = encodeURIComponent("Hello Dixit Heart Care, I have an inquiry regarding your cardiac diagnostic procedures.");
    window.open(`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-[#FCFAF5] text-on-surface py-32 lg:py-48 overflow-hidden select-none"
    >
      <div className="absolute inset-0 custom-grid-pattern opacity-5 pointer-events-none" />
      <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[70%] bg-gradient-to-tr from-primary/[0.03] to-tertiary/[0.01] rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-[1280px] mx-auto px-5 md:px-[64px] relative z-20">
        
        {/* Header Title Grid */}
        <div className="flex flex-col gap-5 mb-24 max-w-2xl text-left">
          <span className="text-[#9E1B1B] font-sans text-[11px] sm:text-xs uppercase font-extrabold tracking-[0.35em] block">
            SECURE CLINICAL SCHEDULING
          </span>
          <h1 className="font-serif text-[48px] md:text-[62px] lg:text-[76px] leading-[1.02] tracking-[-0.04em] font-extrabold text-[#1B365D]">
            Private <span className="text-primary italic font-serif font-normal">Check-in Portal</span>
          </h1>
          <div className="w-20 h-[1.5px] bg-[#1B365D]/20 mt-3" />
          <p className="font-sans text-[16px] sm:text-[18px] text-[#3F3F3F]/85 leading-relaxed pt-2">
            Initiate your priority cardiac diagnostics. Visit our clinical sanctuary in Radhika Road, Satara, Maharashtra—experience diagnostic precision aligned with peace of mind.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT SIDE: Vector Map Graphic and Contact Addresses cards */}
          <div className="lg:col-span-7 space-y-10 text-left">
            
            {/* Interactive Real Google Map Frame */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-4 shadow-premium-md ring-[12px] ring-white/80 border border-outline-variant/60 rounded-[44px] overflow-hidden group hover:shadow-premium-lg transition-all duration-1000 h-[385px] md:h-[500px] relative"
            >
              <div className="w-full h-full rounded-[30px] overflow-hidden relative bg-surface-container-low">
                <iframe
                  src="https://maps.google.com/maps?q=Dixit+Heart+Care+Centre,+Radhika+Road,+Satara&z=15&output=embed"
                  className="w-full h-full border-0 absolute inset-0 z-10"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  title="Dixit Heart Care Centre Location"
                ></iframe>
                
                {/* Floating Navigation Label overlay (small visual hint) */}
                <button
                  onClick={openMaps}
                  className="absolute bottom-4 right-4 z-20 bg-[#FCFAF5]/95 hover:bg-[#1B365D] hover:text-[#FCFAF5] text-[#1B365D] border border-outline-variant/30 transition-all duration-300 font-sans text-[10px] uppercase tracking-[0.15em] font-extrabold px-5 py-3 rounded-xl shadow-lg flex items-center gap-1.5 backdrop-blur-xs select-none"
                >
                  <MapPin size={12} className="text-primary group-hover:text-white" />
                  <span>Open Full Screen Map</span>
                </button>
              </div>
            </motion.div>

            {/* Address & Direct Connection Cards row */}
            <div className="grid sm:grid-cols-2 gap-8">
              
              {/* Card Address */}
              <div className="bg-white p-8.5 rounded-[32px] border border-outline-variant/60 shadow-premium-sm ring-1 ring-primary/[0.02] flex items-start gap-4 transition-all hover:border-primary/20 hover:shadow-premium-md duration-550">
                <div className="text-primary bg-primary/5 p-3.5 rounded-xl shrink-0 select-none border border-primary/5">
                  <MapPin size={18} className="stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-sans text-[12px] font-extrabold uppercase tracking-widest text-[#1B365D]">Clinic Address</h4>
                  <p className="font-sans text-[14.5px] text-[#3F3F3F]/80 mt-2.5 leading-relaxed font-normal">
                    {CONTACT_INFO.address}
                  </p>
                </div>
              </div>

              {/* Card Connection Phone */}
              <div className="bg-white p-8.5 rounded-[32px] border border-outline-variant/60 shadow-premium-sm ring-1 ring-primary/[0.02] flex items-start gap-4 transition-all hover:border-primary/20 hover:shadow-premium-md duration-550">
                <div className="text-primary bg-primary/5 p-3.5 rounded-xl shrink-0 select-none border border-primary/5">
                  <Phone size={18} className="stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-sans text-[12px] font-extrabold uppercase tracking-widest text-[#1B365D]">Appointments desk</h4>
                  <p className="font-sans text-[14.5px] text-[#3F3F3F]/80 mt-2.5 leading-relaxed font-normal">
                    Local Desk: <a href={`tel:${CONTACT_INFO.phoneNumbers[0]}`} className="text-primary font-bold hover:underline transition-colors">{CONTACT_INFO.phoneNumbers[0]}</a> <br />
                    Direct Reception: <a href={`tel:${CONTACT_INFO.phoneNumbers[1]}`} className="text-primary font-bold hover:underline transition-colors">{CONTACT_INFO.phoneNumbers[1]}</a>
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE: Dynamic Appointment Booking */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* 1. Request Appointment Card Form Container */}
            <div className="bg-white rounded-[36px] p-8 md:p-10 border border-outline-variant/50 shadow-premium-md ring-1 ring-primary/[0.015] relative overflow-hidden">
              
              {/* Form success trigger */}
              <AnimatePresence mode="wait">
                {successMessage ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-10 space-y-8"
                  >
                    <div className="w-[80px] h-[80px] rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner select-none">
                      <ShieldCheck size={42} className="stroke-[2.25]" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-serif text-[24px] font-extrabold text-[#1B365D]">Slot Confirmed!</h3>
                      <p className="font-sans text-[14.5px] text-[#3F3F3F]/80 leading-relaxed px-2">
                        {successMessage}
                      </p>
                    </div>
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => onViewChange('reviews')}
                        className="bg-[#1B365D] hover:bg-neutral-900 text-[#FCFAF5] font-sans font-extrabold text-[11px] uppercase tracking-[0.2em] py-5 rounded-none md:rounded-tr-2xl md:rounded-bl-2xl transition-all duration-500 shadow-md cursor-pointer"
                      >
                        Browse Patient Reviews & FAQs
                      </button>
                      <button
                        onClick={() => setSuccessMessage(null)}
                        className="text-primary hover:text-[#1B365D] font-sans text-[11px] uppercase tracking-wider font-extrabold hover:underline pt-2 cursor-pointer"
                      >
                        Schedule Another Diagnostic
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-7"
                  >
                    <div className="flex justify-between items-center pb-3 border-b border-outline-variant/55 select-none">
                      <h3 className="font-serif text-[24px] font-extrabold text-[#1B365D]">
                        Request Slot
                      </h3>
                      {/* Active open state indicator */}
                      <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full ring-1 ring-primary/5 ${
                        clinicStatus.isOpen 
                          ? 'bg-emerald-50 text-emerald-800' 
                          : 'bg-amber-50 text-amber-800'
                      }`}>
                        <span className={`h-2 w-2 rounded-full ${clinicStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                        {clinicStatus.isOpen ? 'Clinic Open' : 'Clinic Closed'}
                      </span>
                    </div>

                    {/* Operational warning if clinical is closed right now */}
                    {!clinicStatus.isOpen && (
                      <div className="p-4 bg-amber-50/50 border border-amber-200/40 rounded-[16px] flex items-start gap-3 text-[12.5px] text-amber-950 select-none leading-relaxed text-left">
                        <AlertTriangle size={16} className="text-amber-700 shrink-0 mt-0.5" />
                        <span>Our diagnostics desk is currently closed. However, our secure scheduling engine is fully active. Submit your slot selection below and we will confirm first thing Mon-Sat.</span>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4.5 text-left">
                      
                      {/* Error state */}
                      {errorMessage && (
                        <div className="p-4 bg-red-50 text-red-900 border border-red-200/50 text-[13px] rounded-[16px] font-medium leading-relaxed">
                          {errorMessage}
                        </div>
                      )}

                      {/* Full Name field */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-sans font-extrabold text-[#3F3F3F]/60 uppercase tracking-widest select-none">
                          Applicant Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Your complete legal name"
                          className="w-full bg-[#FCFAF5] border border-outline-variant/60 rounded-none md:rounded-tr-xl md:rounded-bl-xl px-4 py-3 font-sans text-body-md outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-on-surface-variant/30 text-[#1A1A1A] shadow-inner"
                        />
                      </div>

                      {/* Phone number field */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-sans font-extrabold text-[#3F3F3F]/60 uppercase tracking-widest select-none">
                          Contact Phone Number
                        </label>
                        <input
                          type="text"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="Applicant active phone contact"
                          className="w-full bg-[#FCFAF5] border border-outline-variant/60 rounded-none md:rounded-tr-xl md:rounded-bl-xl px-4 py-3 font-sans text-body-md outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-on-surface-variant/30 text-[#1A1A1A] shadow-inner"
                        />
                      </div>

                      {/* Choose diagnostic treatment */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-sans font-extrabold text-[#3F3F3F]/60 uppercase tracking-widest select-none">
                          Diagnostic Service Care
                        </label>
                        <select
                          value={procedureId}
                          onChange={(e) => setProcedureId(e.target.value)}
                          className="w-full bg-[#FCFAF5] border border-outline-variant/60 rounded-none md:rounded-tr-xl md:rounded-bl-xl px-4 py-3.5 font-sans text-body-md outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-[#1A1A1A] shadow-inner cursor-pointer"
                        >
                          {PROCEDURES.map((proc) => (
                            <option key={proc.id} value={proc.id}>
                              {proc.name} (₹{proc.price})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Date & Time grids */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-sans font-extrabold text-[#3F3F3F]/60 uppercase tracking-widest select-none">
                            Preferred Date
                          </label>
                          <input
                            type="date"
                            required
                            value={preferredDate}
                            onChange={(e) => setPreferredDate(e.target.value)}
                            className="w-full bg-[#FCFAF5] border border-outline-variant/60 rounded-none md:rounded-tr-xl md:rounded-bl-xl px-4 py-3 font-sans text-[#1A1A1A] outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-inner cursor-pointer"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-sans font-extrabold text-[#3F3F3F]/60 uppercase tracking-widest select-none">
                            Preferred Hour
                          </label>
                          <select
                            required
                            value={preferredTime}
                            onChange={(e) => setPreferredTime(e.target.value)}
                            className="w-full bg-[#FCFAF5] border border-outline-variant/60 rounded-none md:rounded-tr-xl md:rounded-bl-xl px-4 py-3 font-sans text-[#1A1A1A] outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-inner cursor-pointer"
                          >
                            <option value="">Hour slot ...</option>
                            <option value="3:00 PM">3:00 PM</option>
                            <option value="4:00 PM">4:00 PM</option>
                            <option value="5:00 PM">5:00 PM</option>
                            <option value="6:00 PM">6:00 PM</option>
                            <option value="7:00 PM">7:00 PM</option>
                            <option value="7:30 PM">7:30 PM</option>
                          </select>
                        </div>
                      </div>

                      {/* Submitting state controls */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#1B365D] hover:bg-neutral-900 text-[#FCFAF5] font-sans text-[11px] uppercase tracking-[0.25em] py-4.5 rounded-none md:rounded-tr-2xl md:rounded-bl-2xl transition-all duration-700 shadow-md focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-[#1B365D] mt-4 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin" size={14} />
                            <span>Dispatching Clinical Ticket...</span>
                          </>
                        ) : (
                          <>
                            <CalendarDays size={14} className="stroke-[2]" />
                            <span>Confirm Diagnostic Appointment</span>
                          </>
                        )}
                      </button>

                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* 2. Operational Hours Timings Panel */}
            <div className="bg-white p-8 rounded-[32px] border border-outline-variant/60 shadow-[0_20px_50px_rgba(27,54,93,0.01)] text-left">
              <div className="flex items-center gap-2.5 text-primary select-none mb-4 pb-2 border-b border-[#FCFAF5]/50">
                <Clock size={16} className="stroke-[2.5]" />
                <h3 className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-[#1B365D]">Clinic Hours of Care</h3>
              </div>
              <div className="divide-y divide-outline-variant/15 font-sans text-body-md">
                {TIMINGS.map((t, index) => (
                  <div key={index} className="flex justify-between py-3 items-center first:pt-0 last:pb-0">
                    <span className="text-on-surface-variant font-medium select-none text-[13.5px]">{t.days}</span>
                    <span className={`font-semibold text-[13.5px] ${t.isClosed ? 'text-error' : 'text-on-background'}`}>
                      {t.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. High-Contrast Emergency Panel Card (Primary Red Contrast) */}
            <div className="bg-[#1B365D] text-[#FCFAF5] p-8 rounded-[32px] border border-primary-container/35 shadow-[0_20px_50px_rgba(27,54,93,0.18)] text-left relative overflow-hidden group">
              <div className="absolute right-4 top-4 opacity-[0.06] select-none pointer-events-none group-hover:scale-105 transition-all duration-300">
                <Heart size={100} className="text-white fill-white/10 shrink-0" />
              </div>
              <div className="flex items-center gap-2 relative z-10 select-none pb-1.5">
                <AlertTriangle size={20} className="text-[#FCFAF5] stroke-[2.5]" />
                <h3 className="font-serif text-[22px] font-extrabold text-[#FCFAF5]">Severe Emergency Care</h3>
              </div>
              <p className="font-sans text-xs sm:text-[13px] text-[#FCFAF5]/85 relative z-10 leading-relaxed">
                For sudden severe cardiac discomfort, persistent pressure, radiation of pain, or acute breathing crises, call high-priority local medical operations instantly.
              </p>
              
              <div className="grid grid-cols-2 gap-3 relative z-10 pt-4.5">
                <a 
                  href="tel:108"
                  className="bg-[#FCFAF5] text-[#1B365D] hover:bg-neutral-105 font-sans text-[10px] uppercase tracking-wider font-extrabold p-3.5 rounded-none md:rounded-tr-xl md:rounded-bl-xl flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <Phone size={12} className="stroke-[2.5]" />
                  <span>Dial 108</span>
                </a>
                <a 
                  href={`tel:${CONTACT_INFO.emergencyLine}`}
                  className="border border-[#FCFAF5]/30 hover:border-[#FCFAF5] text-[#FCFAF5] font-sans text-[10px] uppercase tracking-wider font-extrabold p-3.5 rounded-none md:rounded-tl-xl md:rounded-br-xl flex items-center justify-center gap-1.5 transition-all hover:bg-white/5"
                >
                  <Phone size={12} />
                  <span>Call Desk</span>
                </a>
              </div>
            </div>

            {/* 4. WhatsApp Direct Chat Button */}
            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
              onClick={triggerWhatsapp}
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-sans text-[11px] uppercase tracking-[0.2em] font-extrabold py-4.5 rounded-none md:rounded-tr-2xl md:rounded-bl-2xl flex items-center justify-center gap-2 shadow-lg transition-all duration-500 cursor-pointer"
            >
              <MessageSquare size={16} className="fill-white/10" />
              <span>Priority Inquiry via WhatsApp</span>
            </motion.button>

          </div>

        </div>

      </div>
    </motion.div>
  );
}
