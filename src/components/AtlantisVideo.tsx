import { useState, useEffect, useRef } from 'react'

/* ─── God Rays (Enhanced) ─── */
function GodRays() {
  return (
    <div className="god-rays-wrap parallax-subtle">
      <div className="god-ray" style={{ left: '15%', width: '120px', animationDuration: '18s', transform: 'rotate(-8deg)' }} />
      <div className="god-ray" style={{ left: '35%', width: '90px', animationDuration: '22s', transform: 'rotate(5deg)' }} />
      <div className="god-ray" style={{ left: '58%', width: '160px', animationDuration: '14s', transform: 'rotate(9deg)' }} />
      <div className="god-ray" style={{ left: '72%', width: '80px', animationDuration: '19s', transform: 'rotate(17deg)' }} />
      <div className="god-ray" style={{ left: '85%', width: '220px', animationDuration: '16s', transform: 'rotate(6deg)' }} />
    </div>
  )
}

/* ─── Particles (Enhanced — more particles) ─── */
function Particles() {
  const [dots] = useState(() => 
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      s: Math.random() * 2.5 + 0.8,
      x: Math.random() * 100,
      y: Math.random() * 100,
      dur: Math.random() * 22 + 18,
      del: Math.random() * 20,
    }))
  )

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden parallax-medium" style={{ zIndex: 14 }}>
      {dots.map((p) => (
        <div
          key={p.id}
          className="ambient-particle"
          style={{ width: p.s, height: p.s, left: `${p.x}%`, top: `${p.y}%`, animationDuration: `${p.dur}s`, animationDelay: `${p.del}s` }}
        />
      ))}
    </div>
  )
}

/* ─── Bubbles ─── */
function Bubbles() {
  const [items] = useState(() => 
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      s: Math.random() * 6 + 2,
      x: Math.random() * 100,
      del: Math.random() * 25,
      dur: Math.random() * 20 + 16,
    }))
  )

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 12 }}>
      {items.map((b) => (
        <div
          key={b.id}
          className="rising-bubble"
          style={{ width: b.s, height: b.s, left: `${b.x}%`, bottom: -20, animationDuration: `${b.dur}s`, animationDelay: `${b.del}s` }}
        />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   ATLANTIS VIDEO
   Full-screen cinematic background — enhanced with atmospheric
   fog layers, stronger vignette, and better depth.
   ═══════════════════════════════════════════════════════════════ */

export default function AtlantisVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!videoRef.current || !containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(e => console.error("Video play failed", e))
          } else {
            videoRef.current?.pause()
          }
        })
      },
      { threshold: 0 }
    )
    
    observer.observe(containerRef.current)
    
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden z-0">
      {/* Video — full viewport, enhanced contrast */}
      <video
        ref={videoRef}
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover parallax-video"
        style={{ filter: 'brightness(0.7) saturate(1.4) contrast(1.15)' }}
      >
        <source src="/assets/UnderWater.mp4" type="video/mp4" />
      </video>

      {/* Depth gradient — lighter edges */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `radial-gradient(
            ellipse 100% 100% at 50% 50%,
            transparent 0%,
            rgba(1,8,20,0.1) 40%,
            rgba(1,8,20,0.3) 75%,
            rgba(1,8,20,0.4) 100%
          )`,
        }}
      />

      {/* Bioluminescent Corner Leaks */}
      <div
        className="absolute top-0 left-0 w-[800px] h-[800px] z-10 mix-blend-screen pointer-events-none opacity-70"
        style={{
          background: 'radial-gradient(circle at 0% 0%, rgba(0, 229, 255, 0.15) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[800px] h-[800px] z-10 mix-blend-screen pointer-events-none opacity-70"
        style={{
          background: 'radial-gradient(circle at 100% 100%, rgba(0, 229, 255, 0.1) 0%, transparent 70%)',
        }}
      />

      {/* Bottom vignette — grounds the content */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: 'linear-gradient(0deg, rgba(1,8,20,0.75) 0%, rgba(1,8,20,0.3) 20%, transparent 40%)' }}
      />

      {/* Top fade — navbar blend */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: 'linear-gradient(180deg, rgba(1,8,20,0.4) 0%, transparent 15%)' }}
      />

      {/* Radial vignette overlay */}
      <div className="vignette opacity-20" />

      {/* Atmospheric fog layers */}
      <div className="fog-layer fog-layer-1" style={{ zIndex: 13 }} />
      <div className="fog-layer fog-layer-2" style={{ zIndex: 13 }} />

      {/* Ambient effects */}
      <GodRays />
      <Particles />
      <Bubbles />
    </div>
  )
}
