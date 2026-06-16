import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewType, Appointment } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ServicesView from './components/ServicesView';
import ContactView from './components/ContactView';
import PatientReviewsView from './components/PatientReviewsView';
import WhatsAppHelpWidget from './components/WhatsAppHelpWidget';
import { PROCEDURES } from './data';
import LucideIcon from './components/LucideIcon';
import { ShieldAlert, Award, Star, Heart } from 'lucide-react';

export default function App() {
  // Navigation states
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [preselectedProcedureId, setPreselectedProcedureId] = useState('consultation');
  const [isLoading, setIsLoading] = useState(true);
  
  // Appointed tickets list state
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Load initial bookings from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('dixit_appointments');
      if (stored) {
        setAppointments(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse local appointments storage', e);
    }
    
    // Premium loading simulation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Update localStorage when local list changes
  const handleAddNewAppointment = (newApt: Appointment) => {
    setAppointments((prev) => [newApt, ...prev]);
  };

  // Cancel / delete appointments
  const handleCancelAppointment = (id: string) => {
    const updated = appointments.filter(apt => apt.id !== id);
    setAppointments(updated);
    try {
      localStorage.setItem('dixit_appointments', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update local storage', e);
    }
  };

  // Action hook to handle 'Book Now' trigger on cards
  const handleBookNow = (procedureId: string) => {
    setPreselectedProcedureId(procedureId);
    setCurrentView('contact');
    
    // Smooth scroll page directly up to pre-focus the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed antialiased">
      
      {/* Premium Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#FCFAF5] flex flex-col items-center justify-center pointer-events-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <img src="/dixit-logo.png" alt="Dixit Heart Care" className="h-40 md:h-52 w-auto object-contain mix-blend-multiply" />
              <div className="space-y-2 text-center -mt-6 md:-mt-10">
                <span className="font-display text-[32px] md:text-[42px] tracking-[0.12em] text-[#1B365D] font-semibold block">Dixit Heart Care</span>
                <span className="font-sans text-[11px] md:text-[13px] tracking-[0.3em] uppercase text-primary/70 font-bold block">Premium Cardiac Centre</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Header */}
      <Header
        currentView={currentView}
        onViewChange={handleViewChange}
        appointmentCount={appointments.length}
      />

      {/* Main Container with smooth view switcher transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div 
              key="home-container"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <HomeView 
                onViewChange={handleViewChange}
                onBookNow={handleBookNow}
              />
            </motion.div>
          )}

          {currentView === 'services' && (
            <motion.div 
              key="services-container"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <ServicesView
                onBookNow={handleBookNow}
                onViewChange={handleViewChange}
              />
              
              {/* Injecting highly polished Specialists section inside main flow to satisfy the design specification */}
              <section className="py-20 bg-surface border-t border-outline-variant/15" id="specialists-section">
                <div className="max-w-[1280px] mx-auto px-5 md:px-[64px] space-y-12">
                  
                  {/* Header */}
                  <div className="text-center max-w-xl mx-auto space-y-3 select-none">
                    <span className="text-primary font-sans text-label-md tracking-wider uppercase font-bold flex items-center justify-center gap-1">
                      <Award size={14} /> Medical Excellence
                    </span>
                    <h2 className="font-serif text-[32px] md:text-[40px] font-bold text-on-surface">
                      Expert Cardiologists
                    </h2>
                    <p className="font-sans text-body-md text-on-surface-variant">
                      Meet our leading cardiovascular clinicians bringing world-class expertise and empathetic care directly to you.
                    </p>
                  </div>

                  {/* Doctors Grid */}
                  <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    
                    {/* Dr. Amol */}
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="bg-surface-container-low p-6 rounded-lg border border-outline-variant/30 flex flex-col sm:flex-row gap-6 items-start"
                    >
                      {/* Placeholder for Doctor Avatar with high-end initials typography */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center font-serif text-[36px] font-bold shrink-0 self-center sm:self-auto select-none shadow-sm">
                        AD
                      </div>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-serif text-[22px] font-bold text-on-surface">Dr. Amol Dixit</h3>
                            <span className="inline-flex items-center gap-0.5 text-amber-500 font-sans text-[11px] font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">
                              <Star size={10} className="fill-amber-500" /> 4.9
                            </span>
                          </div>
                          <p className="font-sans text-[13px] text-primary uppercase tracking-widest font-semibold">
                            Senior Interventional Cardiologist
                          </p>
                        </div>
                        <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                          With over 15+ years of clinical experience, Dr. Amol specialized in complex angioplasty, coronary interventions, and paced diagnostics. Trained at premier global institutes.
                        </p>
                        <div className="flex gap-2 text-xs font-semibold text-on-surface-variant bg-surface-container-lowest p-2 rounded border border-outline-variant/20 select-none">
                          <span className="border-r border-outline-variant/30 pr-2">MD, DM (Cardiology)</span>
                          <span>Reg No: 87492</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Dr. Shruti */}
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="bg-surface-container-low p-6 rounded-lg border border-outline-variant/30 flex flex-col sm:flex-row gap-6 items-start"
                    >
                      {/* Photo placeholder with initials */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center font-serif text-[36px] font-bold shrink-0 self-center sm:self-auto select-none shadow-sm">
                        SD
                      </div>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-serif text-[22px] font-bold text-on-surface">Dr. Shruti Dixit</h3>
                            <span className="inline-flex items-center gap-0.5 text-amber-500 font-sans text-[11px] font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">
                              <Star size={10} className="fill-amber-500" /> 5.0
                            </span>
                          </div>
                          <p className="font-sans text-[13px] text-primary uppercase tracking-widest font-semibold">
                            Non-Invasive Cardiologist
                          </p>
                        </div>
                        <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                          A leading authority in non-invasive diagnosis, cardiac ultrasound, 2D Echo imaging, and fetal echocardiography. Dedicated to preventative heart risk screens.
                        </p>
                        <div className="flex gap-2 text-xs font-semibold text-on-surface-variant bg-surface-container-lowest p-2 rounded border border-outline-variant/20 select-none">
                          <span className="border-r border-outline-variant/30 pr-2">MD, DNB (Cardiology)</span>
                          <span>Reg No: 91048</span>
                        </div>
                      </div>
                    </motion.div>

                  </div>

                </div>
              </section>
            </motion.div>
          )}

          {currentView === 'contact' && (
            <motion.div 
              key="contact-container"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <ContactView
                preselectedProcedureId={preselectedProcedureId}
                onAppointmentCreated={handleAddNewAppointment}
                onViewChange={handleViewChange}
              />
            </motion.div>
          )}

          {currentView === 'reviews' && (
            <motion.div 
              key="reviews-container"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <PatientReviewsView
                onViewChange={handleViewChange}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Styled corporate footer */}
      <Footer onViewChange={handleViewChange} />

      {/* WhatsApp Help & Clinical Concierge Widget */}
      <WhatsAppHelpWidget onBookNow={handleBookNow} onViewChange={handleViewChange} />
      
    </div>
  );
}
