import React from 'react';
import { ViewType } from '../types';

interface FooterProps {
  onViewChange: (view: ViewType) => void;
}

export default function Footer({ onViewChange }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/20 pt-[64px] pb-[32px] relative z-20">
      <div className="max-w-[1280px] mx-auto px-5 md:px-[64px] flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand visual claim */}
        <div className="text-center md:text-left space-y-1">
          <button 
            onClick={() => onViewChange('services')}
            className="font-serif text-[24px] text-primary italic font-bold hover:opacity-90 transition-opacity outline-none focus-visible:ring-2 focus-visible:ring-primary rounded p-1"
          >
            Dixit Heart Care
          </button>
          <p className="font-sans text-[11px] text-on-surface-variant font-bold uppercase tracking-[0.1em] select-none">
            Excellence in Cardiac Medicine, Satara, Maharashtra.
          </p>
        </div>

        {/* Corporate claims */}
        <div className="font-sans text-[14px] text-on-surface-variant text-center md:text-left select-none">
          © {currentYear} Dixit Heart Care. All rights reserved.
        </div>

        {/* Informative links list */}
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-sans text-xs">
          <li>
            <a 
              href="#" 
              className="inline-block transform hover:-translate-y-0.5 text-on-surface-variant hover:text-primary transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-primary rounded px-1.5 py-0.5"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="inline-block transform hover:-translate-y-0.5 text-on-surface-variant hover:text-primary transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-primary rounded px-1.5 py-0.5"
            >
              Terms of Service
            </a>
          </li>
          <li>
            <button 
              onClick={() => onViewChange('contact')}
              className="inline-block transform hover:-translate-y-0.5 text-primary font-bold hover:underline cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary rounded px-1.5 py-0.5 transition-all duration-300"
            >
              Contact
            </button>
          </li>
          <li>
            <button 
              onClick={() => onViewChange('contact')}
              className="inline-block transform hover:-translate-y-0.5 text-error font-bold hover:underline cursor-pointer focus:outline-none focus:ring-1 focus:ring-error rounded px-1.5 py-0.5 transition-all duration-300"
            >
              Emergency Support
            </button>
          </li>
        </ul>

      </div>
    </footer>
  );
}
