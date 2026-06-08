

export default function IconRunnerUp({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gemGradCenter" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#00ffff" />
          <stop offset="100%" stopColor="#0055ff" />
        </linearGradient>
        <linearGradient id="gemGradSide" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#aaddff" />
          <stop offset="100%" stopColor="#0088ff" />
        </linearGradient>
        <filter id="gemGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      <g filter="url(#gemGlow)">
        {/* Main Gem body */}
        <polygon points="60,10 90,40 60,110 30,40" fill="url(#gemGradCenter)" />
        
        {/* Left facet */}
        <polygon points="60,10 30,40 15,40 45,15" fill="url(#gemGradSide)" opacity="0.8" />
        <polygon points="30,40 60,110 40,55" fill="url(#gemGradSide)" opacity="0.6" />
        
        {/* Right facet */}
        <polygon points="60,10 90,40 105,40 75,15" fill="url(#gemGradSide)" opacity="0.8" />
        <polygon points="90,40 60,110 80,55" fill="url(#gemGradSide)" opacity="0.6" />
        
        {/* Highlights */}
        <polygon points="60,10 55,40 60,30" fill="#ffffff" opacity="0.7" />
        <polygon points="60,110 58,60 60,80" fill="#ffffff" opacity="0.5" />
        
        {/* Top facets */}
        <polygon points="30,40 45,30 75,30 90,40 60,45" fill="#ccffff" opacity="0.5" />
      </g>
    </svg>
  );
}
