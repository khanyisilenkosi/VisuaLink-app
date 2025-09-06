
import React from 'react';

export const Spinner: React.FC = () => {
  return (
    <svg 
      width="64" 
      height="64" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg" 
      className="text-fuchsia-500"
    >
      <defs>
        <linearGradient id="spinner-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'currentColor', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'currentColor', stopOpacity: 0.2 }} />
        </linearGradient>
      </defs>
      <g className="animate-spin origin-center">
        <circle cx="12" cy="12" r="9.5" fill="none" stroke="url(#spinner-gradient)" strokeWidth="3" strokeLinecap="round"/>
      </g>
    </svg>
  );
};
