import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Smartphone, Calendar, Clock, FileText, Send, CheckCircle2, Heart } from 'lucide-react';
import { PROCEDURES, CONTACT_INFO } from '../data';

interface WhatsAppBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProcedureId?: string;
  initialFullName?: string;
}

export default function WhatsAppBookingModal({ 
  isOpen, 
  onClose, 
  initialProcedureId = 'consultation',
  initialFullName = ''
}: WhatsAppBookingModalProps) {
  const [fullName, setFullName] = useState(initialFullName);
  const [mobileNumber, setMobileNumber] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [reasonForVisit, setReasonForVisit] = useState('');
  const [selectedProcId, setSelectedProcId] = useState(initialProcedureId);

  // Sync state when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setFullName(initialFullName);
      setSelectedProcId(initialProcedureId);
    }
  }, [isOpen, initialFullName, initialProcedureId]);

  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile Number is required';
    } else if (!/^\+?([0-9\s-]{8,15})$/.test(mobileNumber.trim())) {
      newErrors.mobileNumber = 'Please enter a valid mobile number (at least 8 digits)';
    }
    if (!preferredDate) newErrors.preferredDate = 'Preferred Date is required';
    if (!preferredTime) newErrors.preferredTime = 'Preferred Time slot is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate luxury animation delay before redirection
    setTimeout(() => {
      const selectedProc = PROCEDURES.find(p => p.id === selectedProcId) || PROCEDURES[0];
      const reasonText = reasonForVisit.trim() 
        ? `${reasonForVisit.trim()} (${selectedProc.name})`
        : selectedProc.name;

      // Construct WhatsApp message with target format
      const whatsappMessage = `Hello Dixit Heart Care Clinic,\n\n` +
        `I would like to book an appointment.\n\n` +
        `Patient Name: ${fullName.trim()}\n` +
        `Mobile Number: ${mobileNumber.trim()}\n` +
        `Preferred Date: ${preferredDate}\n` +
        `Preferred Time: ${preferredTime}\n` +
        `Reason for Visit: ${reasonText}\n\n` +
        `Please confirm availability.\n\n` +
        `Thank you.`;

      // Clean phone number from contact information
      const cleanPhone = CONTACT_INFO.whatsappNumber.replace(/\+/g, '').replace(/\s/g, '');
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMessage)}`;

      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      setIsSubmitting(false);
      onClose();
    }, 900);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-auto">
          {/* Backdrop Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0A111F]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 30, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative w-full max-w-lg bg-white rounded-[32px] shadow-[0_32px_80px_rgba(27,54,93,0.25)] border border-[#1B365D]/10 overflow-hidden z-10 flex flex-col max-h-[92vh]"
          >
            {/* Elegant Header Accent */}
            <div className="h-2 bg-gradient-to-r from-[#25D366] via-[#1B365D] to-[#9E1B1B] shrink-0" />

            {/* Modal Body Container */}
            <div className="p-6 md:p-8 space-y-5 overflow-y-auto max-h-[calc(92vh-8px)] scrollbar-thin">
              
              {/* Heading */}
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 bg-[#25D366]/8 border border-[#25D366]/20 px-3 py-1 rounded-full">
                    <span className="h-1.5 w-1.5 bg-[#25D366] rounded-full animate-pulse" />
                    <span className="text-[#128C7E] font-sans text-[10px] uppercase font-bold tracking-widest">
                      WhatsApp Booking Assistant
                    </span>
                  </div>
                  <h3 className="font-serif text-[26px] font-extrabold text-[#1B365D] tracking-tight pt-1.5">
                    Concierge Reservation
                  </h3>
                  <p className="font-sans text-[13px] text-[#3F3F3F]/70">
                    Provide your preferred slot parameters to generate your instant WhatsApp verification request.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-neutral-100 rounded-full text-neutral-400 hover:text-[#1B365D] transition-colors focus:outline-none"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form elements */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* 1. Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-[10.5px] font-sans font-extrabold text-[#1B365D]/70 uppercase tracking-wider">
                    Patient Full Name
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B365D]/40" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Shashi Dixit"
                      className={`w-full bg-[#FCFAF5] border rounded-2xl pl-11 pr-4 py-3 font-sans text-xs sm:text-sm outline-none transition-all placeholder:text-neutral-400 text-neutral-800 shadow-inner ${
                        errors.fullName ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-neutral-200 focus:ring-[#1B365D] focus:border-[#1B365D]'
                      }`}
                    />
                  </div>
                  {errors.fullName && <p className="text-[11px] text-red-500 font-medium pl-1">{errors.fullName}</p>}
                </div>

                {/* 2. Mobile Number */}
                <div className="space-y-1.5">
                  <label className="block text-[10.5px] font-sans font-extrabold text-[#1B365D]/70 uppercase tracking-wider">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Smartphone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B365D]/40" />
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="e.g. +91 9876543210"
                      className={`w-full bg-[#FCFAF5] border rounded-2xl pl-11 pr-4 py-3 font-sans text-xs sm:text-sm outline-none transition-all placeholder:text-neutral-400 text-neutral-800 shadow-inner ${
                        errors.mobileNumber ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-neutral-200 focus:ring-[#1B365D] focus:border-[#1B365D]'
                      }`}
                    />
                  </div>
                  {errors.mobileNumber && <p className="text-[11px] text-red-500 font-medium pl-1">{errors.mobileNumber}</p>}
                </div>

                {/* Date & Time Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 3. Date */}
                  <div className="space-y-1.5">
                    <label className="block text-[10.5px] font-sans font-extrabold text-[#1B365D]/70 uppercase tracking-wider">
                      Appointment Date
                    </label>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B365D]/40 pointer-events-none" />
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className={`w-full bg-[#FCFAF5] border rounded-2xl pl-11 pr-4 py-3 font-sans text-xs sm:text-sm text-neutral-800 outline-none transition-all cursor-pointer ${
                          errors.preferredDate ? 'border-red-400' : 'border-neutral-200 focus:ring-[#1B365D]'
                        }`}
                      />
                    </div>
                    {errors.preferredDate && <p className="text-[11px] text-red-500 font-medium pl-1">{errors.preferredDate}</p>}
                  </div>

                  {/* 4. Time Slot */}
                  <div className="space-y-1.5">
                    <label className="block text-[10.5px] font-sans font-extrabold text-[#1B365D]/70 uppercase tracking-wider">
                      Preferred Hour Slot
                    </label>
                    <div className="relative">
                      <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B365D]/40 pointer-events-none" />
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className={`w-full bg-[#FCFAF5] border rounded-2xl pl-11 pr-4 py-3 font-sans text-xs sm:text-sm text-neutral-800 outline-none transition-all cursor-pointer ${
                          errors.preferredTime ? 'border-red-400' : 'border-neutral-200 focus:ring-[#1B365D]'
                        }`}
                      >
                        <option value="">Select hour slot...</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                        <option value="5:00 PM">5:00 PM</option>
                        <option value="6:00 PM">6:00 PM</option>
                        <option value="7:00 PM">7:00 PM</option>
                        <option value="7:30 PM">7:30 PM</option>
                      </select>
                    </div>
                    {errors.preferredTime && <p className="text-[11px] text-red-500 font-medium pl-1">{errors.preferredTime}</p>}
                  </div>
                </div>

                {/* Select Procedure / Diagnostic */}
                <div className="space-y-1.5">
                  <label className="block text-[10.5px] font-sans font-extrabold text-[#1B365D]/70 uppercase tracking-wider">
                    Diagnostic Service Select
                  </label>
                  <select
                    value={selectedProcId}
                    onChange={(e) => setSelectedProcId(e.target.value)}
                    className="w-full bg-[#FCFAF5] border border-neutral-200 rounded-2xl px-4 py-3 font-sans text-xs sm:text-sm text-neutral-800 outline-none focus:ring-1 focus:ring-[#1B365D] focus:border-[#1B365D] transition-all cursor-pointer"
                  >
                    {PROCEDURES.map(proc => (
                      <option key={proc.id} value={proc.id}>
                        {proc.name} (Est: ₹{proc.price})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 5. Reason for Visit (Optional) */}
                <div className="space-y-1.5">
                  <label className="block text-[10.5px] font-sans font-extrabold text-[#1B365D]/70 uppercase tracking-wider">
                    Reason for Visit <span className="text-neutral-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <FileText size={16} className="absolute left-4 top-4 text-[#1B365D]/40" />
                    <textarea
                      value={reasonForVisit}
                      onChange={(e) => setReasonForVisit(e.target.value)}
                      placeholder="e.g. Routine cardiovascular screening advice, chest distress, ECG checkup"
                      rows={2}
                      className="w-full bg-[#FCFAF5] border border-neutral-200 rounded-2xl pl-11 pr-4 py-3 font-sans text-xs sm:text-sm outline-none focus:ring-1 focus:ring-[#1B365D] focus:border-[#1B365D] transition-all placeholder:text-neutral-400 text-neutral-800 resize-none shadow-inner"
                    />
                  </div>
                </div>

                {/* Live Preview Accent to increase patient confidence and transparency */}
                <div className="bg-[#25D366]/4 rounded-2xl p-3 border border-[#25D366]/15 text-left text-[11px] text-neutral-600 block">
                  <span className="font-serif text-[#128C7E] font-bold block mb-1">Pre-filled Message Preview:</span>
                  <p className="font-sans italic leading-relaxed text-neutral-500 pl-2">
                    "Hello Dixit Heart Care Clinic, I would like to book an appointment... Patient Name: {fullName || '___'}, Mobile Number: {mobileNumber || '___'}..."
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 border border-neutral-200 text-[#1B365D] hover:bg-neutral-50 font-sans text-[11px] uppercase tracking-widest font-extrabold py-3.5 rounded-2xl transition-all cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-[2] bg-[#25D366] hover:bg-[#20ba59] disabled:bg-[#a6e6bc] text-white font-sans text-[11px] uppercase tracking-widest font-extrabold py-3.5 rounded-2xl transition-all shadow-[0_12px_28px_rgba(37,211,102,0.25)] flex items-center justify-center gap-2 cursor-pointer text-center"
                  >
                    <Send size={13} className="shrink-0" />
                    <span>{isSubmitting ? 'Formatting...' : 'Generate & Open WhatsApp'}</span>
                  </button>
                </div>

              </form>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
