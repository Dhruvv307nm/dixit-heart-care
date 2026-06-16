import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  X, 
  Search, 
  Clock, 
  MapPin, 
  Calendar, 
  Grid, 
  DollarSign, 
  Send, 
  Compass, 
  ShieldCheck, 
  AlertCircle
} from 'lucide-react';
import { PROCEDURES, CONTACT_INFO, TIMINGS } from '../data';
import WhatsAppBookingModal from './WhatsAppBookingModal';

interface WhatsAppHelpWidgetProps {
  onBookNow: (procedureId: string) => void;
  onViewChange: (view: any) => void;
}

export default function WhatsAppHelpWidget({ onBookNow, onViewChange }: WhatsAppHelpWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'appointment' | 'fees' | 'timings'>('appointment');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  // Custom quick message form states
  const [fullName, setFullName] = useState('');
  const [prefDayTime, setPrefDayTime] = useState('');
  const [selectedProcId, setSelectedProcId] = useState('consultation');
  const [feeSearch, setFeeSearch] = useState('');

  // Live status states
  const [currentTimeText, setCurrentTimeText] = useState('');
  const [clinicStatus, setClinicStatus] = useState<{
    status: 'open' | 'closed' | 'opening_soon';
    message: string;
  }>({ status: 'closed', message: 'Checking clinic status...' });

  // Update dynamic clinic timings and countdowns
  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const decimalTime = hours + minutes / 60;

      // Current time formatted
      const formattedTime = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      setCurrentTimeText(formattedTime);

      if (day === 0) {
        // Sunday
        setClinicStatus({
          status: 'closed',
          message: 'Closed Today (Sunday) • Emergency Line Active'
        });
      } else {
        // Monday - Saturday (3:00 PM to 8:00 PM implies 15:00 to 20:00)
        if (decimalTime >= 15 && decimalTime < 20) {
          setClinicStatus({
            status: 'open',
            message: 'Open Now • On-Premises Consultation'
          });
        } else if (decimalTime >= 14 && decimalTime < 15) {
          const minsToOpen = 60 - minutes;
          setClinicStatus({
            status: 'opening_soon',
            message: `Opening Soon • Active in ${minsToOpen} mins`
          });
        } else {
          setClinicStatus({
            status: 'closed',
            message: 'Closed Now • Next Session: Mon-Sat 3 PM'
          });
        }
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Filtered pricing/procedures search
  const filteredProcedures = useMemo(() => {
    if (!feeSearch.trim()) return PROCEDURES;
    const query = feeSearch.toLowerCase();
    return PROCEDURES.filter(
      p => 
        p.name.toLowerCase().includes(query) || 
        p.marathiName.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
    );
  }, [feeSearch]);

  // Selected procedure dynamic details
  const currentSelectedProc = useMemo(() => {
    return PROCEDURES.find(p => p.id === selectedProcId) || PROCEDURES[0];
  }, [selectedProcId]);

  // Auto-calculated WhatsApp greeting text to share dynamically
  const generatedWhatsAppUrl = useMemo(() => {
    const cleanPhone = CONTACT_INFO.whatsappNumber.replace(/\+/g, '').replace(/\s/g, '');
    const serviceName = currentSelectedProc.name;
    const baseMessage = `Hello Dr. Rohit Dixit's Cardiology Clinic, I would like to request an appointment of type *${serviceName}*.\n\n` +
      `• *Patient Name:* ${fullName.trim() || '[Please enter name]'}\n` +
      `• *Requested Day / Time:* ${prefDayTime.trim() || '[Please specify e.g. Monday 4 PM]'}\n` +
      `• *Procedure:* ${serviceName} (Est: ₹${currentSelectedProc.price})\n\n` +
      `Please let me know if you have an available slot at this time. Thank you!`;

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(baseMessage)}`;
  }, [fullName, prefDayTime, selectedProcId, currentSelectedProc]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* 1. Expandable Interactive Support Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="w-[92vw] max-w-[420px] bg-background/95 backdrop-blur-xl border border-outline-variant rounded-[32px] shadow-[0_24px_64px_rgba(27,54,93,0.18)] hover:shadow-[0_32px_80px_rgba(27,54,93,0.22)] overflow-hidden pointer-events-auto p-0 mb-4 ring-1 ring-primary/5 flex flex-col h-[520px] max-h-[78vh]"
            id="whatsApp-interactive-panel"
          >
            {/* Elegant Header Block */}
            <div className="bg-gradient-to-r from-primary to-[#122744] p-5 text-white relative">
              <div className="absolute top-0 right-0 p-8 bg-white/[0.02] rounded-full blur-xl pointer-events-none" />
              
              <div className="flex justify-between items-start z-10 relative">
                <div className="flex gap-3.5 items-center">
                  <div className="w-11 h-11 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 shadow-md">
                    <MessageSquare size={20} className="text-white shrink-0 fill-white/10" />
                  </div>
                  <div>
                    <h3 className="font-serif text-[18px] font-extrabold tracking-tight">Clinical Assistant</h3>
                    <p className="text-[11px] font-sans text-white/70 block uppercase tracking-wider font-semibold">
                      Dr. Rohit Dixit • Cardiology Support
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer focus:outline-none"
                  aria-label="Close Assistant"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Dynamic Live Status Tag */}
              <div className="mt-4 flex items-center justify-between bg-white/[0.08] backdrop-blur-md rounded-xl p-2 px-3 border border-white/10">
                <div className="flex items-center gap-2">
                  <span className={`relative flex h-2 w-2`}>
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      clinicStatus.status === 'open' ? 'bg-[#25D366]' : clinicStatus.status === 'opening_soon' ? 'bg-amber-500' : 'bg-rose-400'
                    }`} />
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${
                      clinicStatus.status === 'open' ? 'bg-[#25D366]' : clinicStatus.status === 'opening_soon' ? 'bg-amber-500' : 'bg-rose-500'
                    }`} />
                  </span>
                  <span className="font-sans text-[11px] font-bold text-white/90">
                    {clinicStatus.message}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-white/50">{currentTimeText}</span>
              </div>
            </div>

            {/* Premium Tab Bar Indicators */}
            <div className="flex border-b border-outline-variant/60 bg-surface-container-lowest p-1">
              <button
                onClick={() => setActiveTab('appointment')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-sans text-[11px] font-extrabold tracking-wider uppercase transition-all duration-300 ${
                  activeTab === 'appointment'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-low'
                }`}
              >
                <Calendar size={13} />
                <span>Appointment</span>
              </button>
              <button
                onClick={() => setActiveTab('fees')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-sans text-[11px] font-extrabold tracking-wider uppercase transition-all duration-300 ${
                  activeTab === 'fees'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-low'
                }`}
              >
                <DollarSign size={13} />
                <span>Fees &amp; Services</span>
              </button>
              <button
                onClick={() => setActiveTab('timings')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-sans text-[11px] font-extrabold tracking-wider uppercase transition-all duration-300 ${
                  activeTab === 'timings'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-low'
                }`}
              >
                <Clock size={13} />
                <span>Timings</span>
              </button>
            </div>

            {/* Main Interactive Content Area with height limit scrolling */}
            <div className="flex-1 min-h-0 overflow-y-auto max-h-[70vh] p-5 space-y-4">

              {/* Tab 1: Instant WhatsApp Appointment Assistant */}
              {activeTab === 'appointment' && (
                <div className="space-y-4 text-left">
                  <div className="p-3 bg-primary/[0.03] border border-primary/10 rounded-2xl flex gap-2.5 items-start">
                    <ShieldCheck size={16} className="text-primary mt-0.5 shrink-0" />
                    <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed">
                      Build your exact appointment template below. Clicking submit will open secure WhatsApp with your draft loaded immediately.
                    </p>
                  </div>

                  {/* Form Container */}
                  <div className="space-y-3.5">
                    <div>
                      <label className="block font-sans text-[10px] font-black uppercase tracking-[0.1em] text-on-surface-variant/85 mb-1.5">
                        Patient Full Name
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-3.5 py-2 font-sans text-xs outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-sans text-[10px] font-black uppercase tracking-[0.1em] text-on-surface-variant/85 mb-1.5">
                          Requested Procedure
                        </label>
                        <select
                          value={selectedProcId}
                          onChange={(e) => setSelectedProcId(e.target.value)}
                          className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-3 py-2 font-sans text-xs outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm"
                        >
                          {PROCEDURES.map(proc => (
                            <option key={proc.id} value={proc.id}>
                              {proc.name} (₹{proc.price})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-sans text-[10px] font-black uppercase tracking-[0.1em] text-on-surface-variant/85 mb-1.5">
                          Preferred Day / Time
                        </label>
                        <input
                          type="text"
                          value={prefDayTime}
                          onChange={(e) => setPrefDayTime(e.target.value)}
                          placeholder="e.g. Mon 3:30 PM"
                          className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-3.5 py-2 font-sans text-xs outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Message Box Mockup */}
                  <div className="border border-[#25D366]/20 bg-[#25D366]/[0.02] rounded-2xl p-3.5 relative overflow-hidden">
                    <span className="absolute top-3 right-3 text-[#128C7E] inline-flex items-center gap-1 font-mono text-[8px] font-bold uppercase tracking-wider bg-[#25D366]/10 px-1.5 py-0.5 rounded">
                      WhatsApp Live Preview
                    </span>
                    <p className="font-sans text-[11px] font-bold text-[#128C7E] mb-2 uppercase tracking-wide">
                      Draft Message Detail:
                    </p>
                    <div className="font-mono text-[10.5px] text-neutral-700 bg-white/70 rounded-lg p-2.5 border border-[#25D366]/10 leading-relaxed whitespace-pre-line">
                      {`Appointment: *${currentSelectedProc.name}*\n`}
                      {`Patient: ${fullName.trim() || '[Please name]'}\n`}
                      {`Time: ${prefDayTime.trim() || '[Please state time]'}\n`}
                      {`Fee: ₹${currentSelectedProc.price}`}
                    </div>
                  </div>

                  {/* Submit Button Trigger */}
                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setIsBookingModalOpen(true)}
                      className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-sans text-[11.5px] uppercase tracking-wider font-extrabold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-[0_8px_20px_-4px_rgba(37,211,102,0.35)] transition-all hover:-translate-y-0.5 cursor-pointer text-center focus:outline-none"
                    >
                      <Send size={13} className="stroke-[2.5]" />
                      <span>Book Appointment</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        onBookNow(selectedProcId);
                        setIsOpen(false);
                      }}
                      className="w-full border border-primary/15 text-[#1B365D] hover:bg-primary/5 font-sans text-[11px] uppercase tracking-wider font-extrabold py-3 rounded-xl transition-all hover:-translate-y-0.5 text-center cursor-pointer focus:outline-none"
                    >
                      Book on Web Portal
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 2: Pricing, Fees & Clinical Explanations */}
              {activeTab === 'fees' && (
                <div className="space-y-4 text-left">
                  {/* Micro Filter Search for services */}
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/55" size={13} />
                    <input
                      type="text"
                      value={feeSearch}
                      onChange={(e) => setFeeSearch(e.target.value)}
                      placeholder="Query services (e.g. Echo, EKG, Consultation...)"
                      className="w-full bg-surface-container-low border border-outline-variant rounded-xl pl-9 pr-3.5 py-2 font-sans text-xs outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm"
                    />
                    {feeSearch && (
                      <button 
                        onClick={() => setFeeSearch('')}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface text-[10px] uppercase font-bold"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* List of services */}
                  <div className="space-y-2.5 pr-1">
                    {filteredProcedures.length === 0 ? (
                      <div className="text-center py-6 text-on-surface-variant/60 font-sans text-xs space-y-2">
                        <AlertCircle className="mx-auto text-on-surface-variant/40" size={18} />
                        <p>No cardiac diagnostic services matched your keyword.</p>
                      </div>
                    ) : (
                      filteredProcedures.map((proc) => (
                        <div 
                          key={proc.id}
                          className="bg-surface-container-lowest border border-outline-variant p-3 rounded-2xl hover:border-primary/20 hover:bg-primary/[0.015] transition-all duration-300"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <div>
                              <h4 className="font-serif text-xs font-bold text-on-surface">{proc.name}</h4>
                              <p className="font-sans text-[9px] text-on-surface-variant/80 uppercase tracking-wide">{proc.marathiName}</p>
                            </div>
                            <span className="font-serif text-xs font-black text-primary px-2.5 py-1 rounded-lg bg-primary/5">
                              ₹ {proc.price}
                            </span>
                          </div>
                          <p className="font-sans text-[11px] text-on-surface-variant leading-normal mb-1.5">
                            {proc.description}
                          </p>
                          <div className="flex items-center justify-between text-[9px] font-sans text-on-surface-variant/70 border-t border-outline-variant/40 pt-1.5">
                            <span>Duration: {proc.duration || 'N/A'}</span>
                            <button
                              onClick={() => {
                                setSelectedProcId(proc.id);
                                setActiveTab('appointment');
                              }}
                              className="text-primary hover:underline font-extrabold uppercase tracking-wide cursor-pointer"
                            >
                              Choose Service &rarr;
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Quick transparency warning */}
                  <div className="bg-surface-container-lowest p-2 px-3 border border-outline-variant rounded-xl flex gap-2 items-center text-[10px] text-on-surface-variant font-sans justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>No unlisted fees • CGHS / Standard patient tariff applies.</span>
                  </div>
                </div>
              )}

              {/* Tab 3: Detailed Timings & Navigation */}
              {activeTab === 'timings' && (
                <div className="space-y-4 text-left">
                  {/* Detailed Clinic Timings block */}
                  <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4 space-y-3.5">
                    <div className="flex items-center gap-2 text-primary border-b border-outline-variant/60 pb-2">
                      <Clock size={15} />
                      <h4 className="font-sans text-[11.5px] font-extrabold uppercase tracking-wider">Session Specifications</h4>
                    </div>

                    <div className="space-y-3">
                      {TIMINGS.map((rule, idx) => (
                        <div key={idx} className="flex justify-between items-center py-0.5 text-xs font-sans">
                          <span className="font-extrabold text-on-surface">{rule.days}</span>
                          <span className={`font-semibold ${rule.isClosed ? 'text-rose-500' : 'text-on-surface-variant'}`}>
                            {rule.hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Medical Plaza Map & Location Box */}
                  <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4 space-y-3">
                    <div className="flex items-center gap-2 text-primary border-b border-outline-variant/60 pb-2">
                      <MapPin size={15} />
                      <h4 className="font-sans text-[11.5px] font-extrabold uppercase tracking-wider">Clinical Enclosure</h4>
                    </div>
                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                      {CONTACT_INFO.address}
                    </p>
                    <div className="pt-1">
                      <a
                        href={CONTACT_INFO.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-sans text-[10px] font-black uppercase tracking-wider text-primary hover:text-[#122744] bg-primary/5 p-2 px-3.5 rounded-lg border border-primary/10"
                      >
                        <Compass size={12} />
                        <span>Navigate in Google Maps</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom concierge micro footer branding */}
            <div className="bg-surface-container-low p-3.5 border-t border-outline-variant font-mono text-[9px] uppercase font-bold tracking-wider text-on-surface-variant/40 text-center">
              Dr. Rohit Dixit Cardiology Concierge • Secure Verification
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Concentric Pulsing Floating Action Button (FAB) (Always visible except when user is scrolling intensely) */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_12px_40px_rgba(37,211,102,0.45)] hover:shadow-[0_16px_48px_rgba(37,211,102,0.55)] border border-[#25D366]/20 transition-all duration-300 cursor-pointer relative focus:outline-none"
        id="whatsapp-help-fab"
        title="Explore Concierge & Help Portal"
      >
        {/* Continuous radial breath pulse behind button */}
        <span className="absolute inset-0 bg-[#25D366]/20 rounded-full animate-ping pointer-events-none scale-105" />
        
        {/* Ring 2 for premium glow effect */}
        <div className="absolute -inset-1 border border-[#25D366]/25 rounded-full scale-105 opacity-80" />

        {/* Small active notification indicator */}
        <div className="absolute -top-1 -right-0.5 h-3.5 w-3.5 bg-rose-500 rounded-full border-2 border-white flex items-center justify-center">
          <span className="text-[7.5px] font-black text-white leading-none">1</span>
        </div>

        {/* Dynamic icon swap with motion */}
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} className="stroke-[2.5]" />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg 
                viewBox="0 0 24 24" 
                className="w-6 h-6 fill-current text-white shrink-0"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.003 21c-1.897 0-3.754-.509-5.385-1.482l-5.618 1.482 1.503-5.464A9.01 9.01 0 011.5 12C1.5 7.03 5.53 3 10.5 3s9 4.03 9 9-4.03 9-8.997 9zm0-16.5c-4.135 0-7.5 3.364-7.5 7.5 0 1.761.616 3.4 1.71 4.706l-.916 3.33 3.424-.902a7.464 7.464 0 003.282.766c4.136 0 7.5-3.364 7.5-7.5s-3.364-7.5-7.5-7.5zm3.87 10.15c-.215-.108-1.272-.63-1.468-.7-.196-.07-.34-.108-.48.109-.142.217-.55.7-.674.834-.124.136-.248.152-.464.044-.216-.109-.912-.336-1.738-1.072-.643-.574-1.077-1.28-1.203-1.498-.125-.218-.013-.335.095-.443.097-.098.216-.25.324-.376.108-.124.144-.207.216-.347.072-.142.036-.267-.018-.376-.054-.109-.48-1.157-.657-1.583-.173-.414-.349-.356-.48-.363-.124-.006-.266-.007-.408-.007-.142 0-.374.053-.57.266-.196.213-.748.73-.748 1.78s.764 2.062.87 2.206c.107.144 1.502 2.294 3.64 3.22.508.22 1.054.382 1.411.495.51.162.973.139 1.34.084.41-.06 1.271-.52 1.452-1.02.181-.503.181-.934.127-1.022-.054-.09-.196-.142-.413-.25z" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <WhatsAppBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialProcedureId={selectedProcId}
        initialFullName={fullName}
      />

    </div>
  );
}
