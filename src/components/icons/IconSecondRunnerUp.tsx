import React from 'react';

export default function IconSecondRunnerUp({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bronzeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e2a76f" />
          <stop offset="50%" stopColor="#cd7f32" />
          <stop offset="100%" stopColor="#8b5a2b" />
        </linearGradient>
        <linearGradient id="emblemCyan" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00aaff" />
          <stop offset="100%" stopColor="#00ffff" />
        </linearGradient>
        <filter id="emblemGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      <g filter="url(#emblemGlow)">
        {/* Outer Ring */}
        <circle cx="60" cy="60" r="45" fill="none" stroke="url(#bronzeGrad)" strokeWidth="8" />
        <circle cx="60" cy="60" r="35" fill="none" stroke="url(#bronzeGrad)" strokeWidth="2" opacity="0.6" />
        
        {/* Outer decorations */}
        <polygon points="60,5 65,15 55,15" fill="url(#bronzeGrad)" />
        <polygon points="60,115 65,105 55,105" fill="url(#bronzeGrad)" />
        <polygon points="5,60 15,55 15,65" fill="url(#bronzeGrad)" />
        <polygon points="115,60 105,55 105,65" fill="url(#bronzeGrad)" />
        
        {/* Center Emblem Crystal */}
        <polygon points="60,25 75,60 60,95 45,60" fill="url(#emblemCyan)" />
        
        {/* Crystal Highlights */}
        <polygon points="60,25 55,60 60,40" fill="#ffffff" opacity="0.6" />
        <polygon points="60,95 57,70 60,80" fill="#ffffff" opacity="0.4" />
        
        {/* Inner bronze details */}
        <path d="M45,60 L30,60 M75,60 L90,60" stroke="url(#bronzeGrad)" strokeWidth="3" />
        <path d="M60,45 L45,60 L60,75 L75,60 Z" fill="none" stroke="url(#bronzeGrad)" strokeWidth="2" />
      </g>
    </svg>
  );
}
