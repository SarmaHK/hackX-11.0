import { useMemo } from 'react';
import '../ambient.css';

export default function GlobalAmbientEffects() {
  // Generate random values once to avoid hydration mismatches or infinite re-renders
  const bubbles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 8 + 4}px`, // 4px to 12px
      delay: `${Math.random() * 15}s`,
      duration: `${Math.random() * 10 + 10}s` // 10s to 20s
    }));
  }, []);

  const dustParticles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1}px`, // 1px to 4px
      delay: `${Math.random() * 20}s`,
      duration: `${Math.random() * 15 + 15}s` // 15s to 30s
    }));
  }, []);

  return (
    <div className="global-ambient-container">
      {/* Global Deep-Ocean Dot-Grid Rising Particles */}
      <div className="ambient-dot-grid" />

      {/* Global Volumetric Sway Rays */}
      <div className="ambient-sway-rays" />

      {/* Water Caustics Overlay */}
      <div className="ambient-caustics" />

      {/* Light Rays */}
      <div className="ambient-rays">
        <div className="ambient-ray" style={{ transform: 'rotate(-15deg)' }} />
        <div className="ambient-ray" style={{ transform: 'rotate(-5deg)' }} />
        <div className="ambient-ray" style={{ transform: 'rotate(5deg)' }} />
        <div className="ambient-ray" style={{ transform: 'rotate(15deg)' }} />
      </div>

      {/* Floating Dust Particles */}
      <div className="ambient-dust-container">
        {dustParticles.map(p => (
          <div
            key={`dust-${p.id}`}
            className="ambient-dust"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration
            }}
          />
        ))}
      </div>

      {/* Rising Bubbles */}
      <div className="ambient-bubbles-container">
        {bubbles.map(b => (
          <div
            key={`bubble-${b.id}`}
            className="ambient-bubble"
            style={{
              left: b.left,
              width: b.size,
              height: b.size,
              animationDelay: b.delay,
              animationDuration: b.duration
            }}
          />
        ))}
      </div>
    </div>
  );
}
