import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'

/* ═══════════════════════════════════════════════════════════════
   HERO CONTENT — hackX 11.0
   Centered cinematic composition — metallic gradient title.
   Inspired by hackX 10.0 hero typography style.
   
   Layout:
     hackX  11.0          ← large metallic silver gradient
     INTER-UNIVERSITY     ← subtle tracked label
     STARTUP [ CHALLENGE ] ← bracket-decorated tech subtitle
     Dive Into Atlantis...← italic tagline
     [Register] [Booklet] ← dual CTA
   ═══════════════════════════════════════════════════════════════ */

const ease = [0.16, 1, 0.3, 1] as const

const interText = "Inter-University".split("")
const startupText = "Startup".split("")
const challengeText = "Challenge".split("")

function MagneticPrimaryButton() {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = e.clientX - (left + width / 2);
    const middleY = e.clientY - (top + height / 2);
    x.set(middleX * 0.2);
    y.set(middleY * 0.2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="btn-float-wrapper">
      <motion.a
        ref={ref}
        href="#register"
        className="btn-primary"
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        style={{ x: springX, y: springY }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <span className="relative z-10">Register Now</span>
      </motion.a>
    </div>
  );
}

function EventBookletButton() {
  return (
    <motion.a
      href="#booklet"
      className="btn-secondary group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <span className="relative z-10 flex items-center justify-center">
        Event Booklet
      </span>
    </motion.a>
  );
}

export default function HeroContent() {
  return (
    <div className="absolute z-30 inset-0 flex flex-col items-center justify-center text-center px-6 pb-40 md:pb-56">

      {/* ── Main Title: hackX 11.0 ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease, delay: 0.4 }}
      >
        <h1 className="select-none flex items-baseline justify-center">
          <span className="hero-hack-static">hack</span>
          <span className="hero-x-animated">X</span>
          <span className="hero-version-static ml-3 md:ml-6">11.0</span>
        </h1>
      </motion.div>

      {/* ── "INTER-UNIVERSITY" label ── */}
      <div className="mt-20 md:mt-30 text-center">
        <span className="hero-label">
          {interText.map((char, i) => (
            <motion.span 
              key={`i-${i}`} 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.7 + i * 0.03 }}
              style={{ display: 'inline-block' }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </span>
      </div>

      {/* ── "STARTUP CHALLENGE" Premium Headline ── */}
      <div className="mt-10 md:mt-14 hero-challenge-row">
        <span className="hero-startup">
          {startupText.map((char, i) => (
            <motion.span 
              key={`s-${i}`} 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.9 + i * 0.05 }}
              style={{ display: 'inline-block' }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </span>
        <span className="hero-challenge-text">
          {challengeText.map((char, i) => (
            <motion.span 
              key={`c-${i}`} 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.9 + (startupText.length * 0.05) + (i * 0.05) }}
              style={{ display: 'inline-block' }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </span>
      </div>

      {/* ── Bottom Section: CTA Buttons & Scroll Down ── */}
      <div className="absolute bottom-4 left-0 w-full px-6 flex flex-col items-center justify-center gap-8">
        
        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease, delay: 1.1 }}
        >
          <MagneticPrimaryButton />
          <EventBookletButton />
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div 
          className="flex flex-col items-center justify-center cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#00E5FF] font-bold mb-1">Scroll Down</span>
          
          <div className="flex flex-col items-center -space-y-3">
            <motion.svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              animate={{ y: [0, 4, 0], opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0 }}
            >
               <polyline points="5 8 12 15 19 8"></polyline>
            </motion.svg>
            <motion.svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              animate={{ y: [0, 4, 0], opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            >
               <polyline points="5 8 12 15 19 8"></polyline>
            </motion.svg>
            <motion.svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              animate={{ y: [0, 4, 0], opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.4 }}
            >
               <polyline points="5 8 12 15 19 8"></polyline>
            </motion.svg>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
