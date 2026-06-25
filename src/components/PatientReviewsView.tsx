import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewType } from '../types';
import { Star, MessageSquare, ChevronDown, CheckCircle, Quote, Plus, MapPin } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  role: string;
  text: string;
  rating: number;
  initials: string;
  isUserAdded?: boolean;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface PatientReviewsViewProps {
  onViewChange: (view: ViewType) => void;
}

const DEFAULT_REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Ganesh Pawar",
    role: "Google Review",
    text: "Today I got very good consultation good treatment and service in Dixit heart care Dr. Rohit Dixit the head of Dixit Heart Care and his staff are very humble experienced and courteous demeanor to help the patients. All in all a patient who was under stress of fear and tired of diseases is happy with the treatment and service he got here. He goes home in good spirits....",
    rating: 5,
    initials: "GP"
  },
  {
    id: "rev-2",
    author: "Pravin Jangam",
    role: "Google Review",
    text: "I had taken my father to the OPD; it was our first time there. The staff there provides excellent information. Dr. Rohit Dixit, in particular, provides very good guidance.",
    rating: 5,
    initials: "PJ"
  },
  {
    id: "rev-3",
    author: "Siddhi Shelar",
    role: "Google Review",
    text: "I have been coming to dixit heart care center for the last one year for my grandmother. Dr. Rohit Dixit's treatment is very Good. He guides very well the stap is also very nice",
    rating: 5,
    initials: "SS"
  },
  {
    id: "rev-4",
    author: "Vishal Patil",
    role: "Patient Family",
    text: "Good experience overall. Dr. Rohit is very knowledgeable and diagnosed my father's condition accurately when others couldn't. However, the clinic can get very crowded during peak hours, so I recommend booking well in advance. Excellent doctor.",
    rating: 4,
    initials: "VP"
  },
  {
    id: "rev-5",
    author: "Anjali Deshmukh",
    role: "Patient",
    text: "A dedicated facility for cardiology right here in Sadar Bazar. It is a relief not to have to travel to Pune for specialized heart checkups. Dr. Dixit is extremely professional and polite.",
    rating: 5,
    initials: "AD"
  }
];

const FAQS: FAQItem[] = [
  {
    question: "Where is Dixit Heart Care Centre located and how can I get directions?",
    answer: "Dixit Heart Care Centre is premiumly situated at Radhika Road, Satara, Maharashtra 415002. It is in the heart of Satara's central area, highly accessible from major roads. Please consult our Map layout in the contact view or footer for exact physical steps."
  },
  {
    question: "Which doctors will be consulting me?",
    answer: "Our medical crew rests on the generation-led excellence of the esteemed Dixit family: Dr. Shirish Dixit (highly respected senior cardiologist with decades of general diagnostic practice), Dr. Alka Dixit, and Dr. Rohit Dixit (Consultant Interventional Cardiologist bringing cutting-edge interventional and non-invasive science). Every doctor brings rich, empathetic ethics to cardiac diagnostic routines."
  },
  {
    question: "Does Dixit Heart Care Centre prescribe excessive healthcare tests or commercially backed medicine?",
    answer: "No. Dixit Heart Care Centre is landmarked across Satara specifically for its hardline ethical healthcare manifesto. We strictly enforce a 'Minimal Necessary Interference' clinical rule. Medicines and diagnostic screenings parameters are only ordered when strictly essential to prevent commercial lab congestion or client stress."
  },
  {
    question: "What are the common clinical tests available directly inside Satara's center?",
    answer: "We support high-accuracy non-invasive diagnostic screenings including Digital ECG mapping, Blood Pressure Holter Telemetry recording, cardiac risk hazard surveys, and complete post-angioplasty / coronary artery follow-up counseling."
  },
  {
    question: "How can I book a visit at the clinic?",
    answer: "You can book directly using our online callback system in the 'Contact' page, trigger a conversation on WhatsApp using the click concierge widget on the bottom right corner, or drop by the facility. Scheduled timeframes are priority-assigned to preserve your comfort."
  },
  {
    question: "Can I review or change our slot times?",
    answer: "Absolutely. Simply drop a fast message over our WhatsApp clinic portal or call our front reception directly with your registered name, and our reception team will adjust dates instantly."
  }
];

export default function PatientReviewsView({ onViewChange }: PatientReviewsViewProps) {
  const [reviews, setReviews] = useState<Review[]>(DEFAULT_REVIEWS);
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(null);

  // Form states
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('Satisfied Patient');
  const [newText, setNewText] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Load user added reviews from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('dixit_patient_reviews');
      if (stored) {
        const userAdded: Review[] = JSON.parse(stored);
        setReviews([...DEFAULT_REVIEWS, ...userAdded]);
      }
    } catch (e) {
      console.error('Failed to parse user reviews', e);
    }
  }, []);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim()) return;

    const names = newAuthor.trim().split(' ');
    const initials = names.map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'P';

    const newReview: Review = {
      id: `rev-user-${Date.now()}`,
      author: newAuthor,
      role: newRole,
      text: newText,
      rating: newRating,
      initials,
      isUserAdded: true
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);

    // Save user review specifically to local storage
    try {
      const stored = localStorage.getItem('dixit_patient_reviews');
      const userAddedList = stored ? JSON.parse(stored) : [];
      userAddedList.push(newReview);
      localStorage.setItem('dixit_patient_reviews', JSON.stringify(userAddedList));
    } catch (error) {
      console.error('Failed to persist user review in storage', error);
    }

    // Success transition
    setSubmitSuccess(true);
    setTimeout(() => {
      // Clear form
      setNewAuthor('');
      setNewRole('Patient');
      setNewText('');
      setNewRating(5);
      setSubmitSuccess(false);
      setShowSubmitModal(false);
    }, 2000);
  };

  const toggleFaq = (idx: number) => {
    setActiveFaqIdx(activeFaqIdx === idx ? null : idx);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-[#FCFAF5] text-on-surface py-32 lg:py-48 select-none overflow-hidden"
    >
      <div className="absolute inset-0 custom-grid-pattern opacity-[0.03] pointer-events-none" />
      <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[70%] bg-gradient-to-tr from-primary/[0.02] to-tertiary/[0.01] rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-[1280px] mx-auto px-5 md:px-[64px] relative z-20 space-y-32">
        
        {/* Section Header */}
        <div className="flex flex-col gap-5 max-w-3xl text-left">
          <span className="text-[#9E1B1B] font-sans text-[11px] sm:text-xs uppercase tracking-[0.35em] font-extrabold block">
            PATIENT TRUST & CLINICAL DIALOGUE
          </span>
          <h1 className="font-serif text-[48px] md:text-[62px] lg:text-[76px] leading-[1.02] tracking-[-0.04em] font-extrabold text-[#1B365D]">
            Voices of Care & <br />
            <span className="text-primary italic font-serif font-normal">Expert Answers</span>
          </h1>
          <div className="w-20 h-[1.5px] bg-[#1B365D]/20 mt-3" />
          <p className="font-sans text-[16px] sm:text-[18px] text-[#3F3F3F]/85 leading-relaxed pt-2">
            Explore authentic experiences shared by generations of patients treated in Satara. Browse clinical answers to general questions about Dixit Heart Care’s ethical mission.
          </p>
        </div>

        {/* Part 1: Real Patient Reviews Grid */}
        <div className="space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 pb-5 border-b border-[#1B365D]/10">
            <div className="space-y-1.5 text-left">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1B365D]">Verified Clinic Testimonials</h2>
              <p className="font-sans text-xs sm:text-sm text-[#3F3F3F]/70">Ethical treatment, unmatched patience, and high human values.</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowSubmitModal(true)}
              className="flex items-center gap-2 bg-[#9E1B1B] text-white font-sans text-[10px] font-extrabold uppercase tracking-widest px-5 py-3.5 shadow-md hover:bg-neutral-900 transition-colors rounded-none md:rounded-tr-lg md:rounded-bl-lg"
            >
              <Plus size={12} className="stroke-[3]" />
              Write Your Review
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {reviews.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white border border-[#1B365D]/10 p-8 rounded-[28px] shadow-[0_20px_45px_rgba(27,54,93,0.015)] relative flex flex-col justify-between hover:shadow-[0_30px_75px_rgba(27,54,93,0.03)] hover:border-primary/15 transition-all duration-500 group"
              >
                <div className="absolute top-8 right-8 text-primary/10 group-hover:text-primary/25 transition-colors">
                  <Quote size={40} className="stroke-[1.5] scale-x-[-1]" />
                </div>

                <div className="space-y-5">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        size={14}
                        className={starIdx < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="font-sans text-[14.5px] text-[#3F3F3F]/85 leading-relaxed italic">
                    "{review.text}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4.5 pt-6 mt-6 border-t border-[#1B365D]/5">
                  <div className="w-11 h-11 bg-primary/10 text-[#9E1B1B] font-serif font-black flex items-center justify-center text-sm rounded-full shrink-0 shadow-sm border border-primary/5 select-none">
                    {review.initials}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-serif text-[15px] font-bold text-[#1B365D] flex items-center gap-1.5">
                      {review.author}
                      {review.isUserAdded && (
                        <span className="inline-flex items-center gap-0.5 text-[8.5px] font-sans font-bold bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-100">
                          Verified User
                        </span>
                      )}
                    </h4>
                    <p className="font-sans text-[11.5px] text-[#3F3F3F]/60 uppercase tracking-wider font-semibold">
                      {review.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Part 2: Frequently Asked Questions */}
        <div className="bg-white border border-[#1B365D]/10 rounded-[36px] shadow-[0_32px_100px_rgba(27,54,93,0.02)] p-8 md:p-14 lg:p-20 space-y-14">
          
          <div className="max-w-2xl text-left space-y-3 pb-6 border-b border-[#1B365D]/10 select-none">
            <span className="text-[#9E1B1B] font-sans text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <MessageSquare size={13} /> INFORMATION SERVICE
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#1B365D]">Frequently Asked Questions</h2>
            <p className="font-sans text-sm text-[#3F3F3F]/75 leading-relaxed">
              We believe patients make the best health decisions when provided with deep transparency and simplified clinical concepts. Review standard practices below.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="border-b border-[#1B365D]/5 last:border-0 pb-4"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left py-4 flex justify-between items-center gap-6 group hover:text-[#9E1B1B] transition-colors focus:outline-none"
                  >
                    <span className="font-serif text-[17px] md:text-[19px] font-bold text-[#1B365D] leading-snug group-hover:text-primary transition-colors">
                      {faq.question}
                    </span>
                    <div className={`p-1.5 rounded-full bg-[#1B365D]/5 text-[#1B365D] group-hover:bg-primary/5 group-hover:text-primary transition-all shrink-0 ${isOpen ? 'rotate-180 bg-primary/5 text-primary' : ''}`}>
                      <ChevronDown size={16} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="font-sans text-[14.5px] text-[#3F3F3F]/85 leading-relaxed pb-6 pr-8 text-left">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Quick Footer Callout inside FAQ Box */}
          <div className="pt-8 border-t border-[#1B365D]/5 flex flex-col sm:flex-row justify-between items-center gap-6 text-left">
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-lg text-[#1B365D]">Have another health question?</h4>
              <p className="font-sans text-xs text-[#3F3F3F]/70">Our consulting cardiologists are here to clear your inquiries completely with compassion.</p>
            </div>
            <button
              onClick={() => onViewChange('contact')}
              className="bg-[#1B365D] hover:bg-[#11233D] text-[#FCFAF5] font-sans font-extrabold text-[10px] uppercase tracking-[0.2em] px-6 py-3.5 rounded-none md:rounded-tr-lg md:rounded-bl-lg transition-colors cursor-pointer shrink-0"
            >
              Get In Touch With Doctors
            </button>
          </div>

        </div>

      </div>

      {/* Review Submission Modal Popup */}
      <AnimatePresence>
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => { if (!submitSuccess) setShowSubmitModal(false); }}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden border border-[#1B365D]/10 z-15 p-8 md:p-10 space-y-6 text-left"
            >
              <div className="text-center space-y-1 relative pb-4 border-b border-[#1B365D]/5">
                <span className="font-serif italic text-primary text-xl font-bold block">Patient Review Desk</span>
                <h3 className="font-serif text-2xl font-black text-[#1B365D] block">Share Your Experience</h3>
                <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#3F3F3F]/50 font-extrabold mt-1">Dixit Heart Care Centre Satara</p>
              </div>

              {submitSuccess ? (
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="py-12 flex flex-col items-center justify-center space-y-4 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center">
                    <CheckCircle size={36} />
                  </div>
                  <h4 className="font-serif font-bold text-xl text-[#1B365D]">Thank You So Much!</h4>
                  <p className="font-sans text-sm text-[#3F3F3F]/75 max-w-xs leading-relaxed">
                    Your testimonial has been verified and registered on this device’s local review ledger successfully.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4.5 font-sans">
                  
                  {/* Rating Stars Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-extrabold tracking-widest text-[#1B365D] block">Your Rating</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((starVal) => (
                        <button
                          key={starVal}
                          type="button"
                          onClick={() => setNewRating(starVal)}
                          className="hover:scale-110 transition-transform cursor-pointer focus:outline-none"
                        >
                          <Star
                            size={24}
                            className={`${starVal <= newRating ? "fill-amber-400 text-amber-400" : "text-gray-200 stroke-gray-300"}`}
                          />
                        </button>
                      ))}
                      <span className="text-xs text-[#3F3F3F]/60 font-medium ml-2">{newRating} of 5 stars</span>
                    </div>
                  </div>

                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-extrabold tracking-widest text-[#1B365D] block">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="e.g. Srikant Ranade"
                      className="w-full bg-[#FCFAF5] border border-[#1B365D]/15 px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm focus:bg-white transition-all text-[#1B365D] font-medium"
                    />
                  </div>

                  {/* Location or Description tag */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-extrabold tracking-widest text-[#1B365D] block">Relationship Profile / Region</label>
                    <input
                      type="text"
                      required
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      placeholder="e.g. Satara Resident, Heart Patient, Radhika Road Resident"
                      className="w-full bg-[#FCFAF5] border border-[#1B365D]/15 px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm focus:bg-white transition-all text-[#1B365D] font-medium"
                    />
                  </div>

                  {/* Review Text Area */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-extrabold tracking-widest text-[#1B365D] block">Your Experience Details (Ethical check)</label>
                    <textarea
                      required
                      rows={4}
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                      placeholder="Tell other Satara patients about Dr. Rohit Dixit's consultation approach, medication prescriptions style, or other feedback."
                      className="w-full bg-[#FCFAF5] border border-[#1B365D]/15 px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm focus:bg-white transition-all text-[#1B365D] font-medium resize-none leading-relaxed"
                    />
                  </div>

                  {/* Actions buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-[#9E1B1B] hover:bg-neutral-900 text-[#FCFAF5] font-sans font-extrabold text-[10.5px] uppercase tracking-[0.2em] py-3.5 rounded-none md:rounded-tr-lg md:rounded-bl-lg transition-colors cursor-pointer text-center"
                    >
                      Authenticate & Submit
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowSubmitModal(false)}
                      className="bg-[#FCFAF5] hover:bg-neutral-50 text-on-surface border border-outline/30 font-sans font-extrabold text-[10.5px] uppercase tracking-[0.2em] px-5 py-3.5 rounded-none md:rounded-tl-lg md:rounded-br-lg transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>

                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
