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
