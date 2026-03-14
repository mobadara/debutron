import React, { useState } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

const LMSFooter = () => {
  // 1. Default the footer to collapsed (false) to maximize forum space
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex flex-col items-center mt-auto relative z-40">
      
      {/* 2. The Floating Toggle Tab */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle Campus Resources Footer"
        className="bg-slate-900 dark:bg-slate-800 text-slate-300 hover:text-white px-6 py-1.5 rounded-t-xl transition-all flex items-center justify-center -mb-[1px] shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)] dark:shadow-none border-t border-l border-r border-slate-700 dark:border-slate-700 group focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
      >
        <span className="text-[10px] font-bold uppercase tracking-widest mr-2 opacity-80 group-hover:opacity-100 transition-opacity">
          {isOpen ? "Close Resources" : "Campus Resources"}
        </span>
        {isOpen ? <FiChevronDown size={18} /> : <FiChevronUp size={18} />}
      </button>

      {/* 3. The Collapsible Body */}
      <footer 
        className={`w-full bg-slate-900 text-slate-300 border-t-4 transition-all duration-500 ease-in-out overflow-hidden flex flex-col ${
          isOpen 
            ? 'max-h-[1200px] border-[#000080] dark:border-[#0D9488] opacity-100' 
            : 'max-h-0 border-transparent opacity-0'
        }`}
      >
        <div className="max-w-[1600px] w-full mx-auto px-6 lg:px-10 py-12">
          
          {/* Top Section: Multi-Column Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 border-b border-slate-700 pb-12">
            
            {/* Brand & Address */}
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-white tracking-wide">DEBUTRON LAB.</h2>
              <p className="text-sm leading-relaxed text-slate-400">
                The Enterprise Digital Campus Bridging Academic Excellence and Tech Innovation.
              </p>
            </div>

            {/* Academic Resources */}
            <div className="space-y-4">
              <h3 className="text-white font-bold uppercase tracking-wider text-sm">Academic Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Digital Library</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Course Catalog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Academic Calendar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Student Handbook</a></li>
              </ul>
            </div>

            {/* Campus Services */}
            <div className="space-y-4">
              <h3 className="text-white font-bold uppercase tracking-wider text-sm">Campus Services</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">IT Helpdesk</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Accessibility Options</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career Placement</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Alumni Network</a></li>
              </ul>
            </div>

            {/* Internationalization */}
            <div className="space-y-4">
              <h3 className="text-white font-bold uppercase tracking-wider text-sm">Language & Region</h3>
              <select 
                className="w-full bg-slate-800 border border-slate-600 text-white text-sm rounded-md px-3 py-2 focus:ring-2 focus:ring-[#0D9488] outline-none"
                defaultValue="en"
              >
                <option value="en">English (UK)</option>
                <option value="fr">Français</option>
                <option value="yo">Yorùbá</option>
                <option value="ha">Hausa</option>
                <option value="sw">Kiswahili</option>
              </select>
            </div>
          </div>

          {/* Bottom Section: Legal & Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} Debutron Lab. All rights reserved.</p>
            <div className="flex gap-4 sm:gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Honor Code</a>
            </div>
          </div>
          
        </div>
      </footer>
    </div>
  );
};

export default LMSFooter;