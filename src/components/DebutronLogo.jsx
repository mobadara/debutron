import React from 'react';

const DebutronLogo = ({ className = "w-12 h-12" }) => {
  return (
    <div className="flex items-center gap-3">
      {/* The SVG Mark */}
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Background Shield/Academic Crest subtle reference */}
        <path 
          d="M10 20C10 14.4772 14.4772 10 20 10H80C85.5228 10 90 14.4772 90 20V60C90 76.5685 76.5685 90 60 90H40C23.4315 90 10 76.5685 10 60V20Z" 
          fill="#F9FAFB" 
        />
        
        {/* The Bold 'D' */}
        <path 
          d="M30 30V70H50C61.0457 70 70 61.0457 70 50C70 38.9543 61.0457 30 50 30H30Z" 
          stroke="#0f172a" /* debutron-navy */
          strokeWidth="12" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        {/* The 'Data/AI Node' - upward trajectory */}
        <circle cx="65" cy="35" r="8" fill="#3b82f6" /* Tech blue accent */ />
        <path 
          d="M45 55L65 35" 
          stroke="#3b82f6" 
          strokeWidth="6" 
          strokeLinecap="round" 
        />
      </svg>

      {/* The Text Wordmark */}
      <div className="flex flex-col justify-center">
        <span className="font-serif text-2xl font-bold text-slate-900 leading-none tracking-tight">
          Debutron
        </span>
        <span className="font-sans text-[0.65rem] font-bold text-slate-500 uppercase tracking-[0.3em] mt-1">
          Lab
        </span>
      </div>
    </div>
  );
};

export default DebutronLogo;