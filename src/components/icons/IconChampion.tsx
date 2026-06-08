import React from 'react';

export default function IconChampion({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="champGradMain" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffe600" />
          <stop offset="100%" stopColor="#ff8800" />
        </linearGradient>
        <linearGradient id="champGradAccent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ffff" />
          <stop offset="100%" stopColor="#0077ff" />
        </linearGradient>
        <filter id="champGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur1" />
          <feGaussianBlur stdDeviation="8" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      <g filter="url(#champGlow)">
        {/* Base Crown Shape */}
        <path d="M15,85 L25,30 L40,60 L60,15 L80,60 L95,30 L105,85 Z" fill="url(#champGradMain)" />
        <path d="M15,85 L105,85 L100,95 L20,95 Z" fill="#ffcc00" />
        
        {/* Crystal Inlays */}
        <polygon points="60,25 50,60 60,80 70,60" fill="url(#champGradAccent)" />
        <polygon points="28,45 38,65 35,80 22,80" fill="url(#champGradAccent)" opacity="0.8" />
        <polygon points="92,45 82,65 85,80 98,80" fill="url(#champGradAccent)" opacity="0.8" />
        
        {/* Glowing Orbs on tips */}
        <circle cx="25" cy="30" r="5" fill="#ffffff" />
        <circle cx="60" cy="15" r="7" fill="#ffffff" />
        <circle cx="95" cy="30" r="5" fill="#ffffff" />
        
        {/* Inner glow/highlights */}
        <path d="M60,15 L55,40 L60,25 Z" fill="#ffffff" opacity="0.8" />
        <path d="M25,30 L30,45 L25,40 Z" fill="#ffffff" opacity="0.8" />
        <path d="M95,30 L90,45 L95,40 Z" fill="#ffffff" opacity="0.8" />
      </g>
    </svg>
  );
}
