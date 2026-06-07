import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { ChevronDown } from 'lucide-react'

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
        className="relative px-8 py-3 rounded-full border border-cyan-400/80 bg-[#061428]/80 text-white font-display font-semibold text-[15px] tracking-wide shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-shadow duration-300 backdrop-blur-md flex items-center justify-center"
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
      className="relative px-8 py-3 rounded-full border border-blue-600/80 bg-[#08122a]/80 text-white font-display font-semibold text-[15px] tracking-wide hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-shadow duration-300 backdrop-blur-md flex items-center justify-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <span className="relative z-10">
        Event Booklet
      </span>
    </motion.a>
  );
}

export default function HeroContent() {
  return (
    <div className="absolute z-30 inset-0 flex flex-col items-center justify-center text-center px-6 pb-32 md:pb-48">

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

      {/* ── CTA Buttons ── */}
      <motion.div
        className="mt-16 md:mt-24 flex flex-row items-center justify-center gap-4 sm:gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease, delay: 1.1 }}
      >
        <MagneticPrimaryButton />
        <EventBookletButton />
      </motion.div>

      {/* ── Scroll Down Indicator ── */}
      <motion.div
        className="mt-16 md:mt-20 flex flex-col items-center justify-center gap-2 cursor-pointer group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.5 }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-display tracking-widest uppercase text-cyan-400/60 group-hover:text-cyan-400 transition-colors">Scroll Down</span>
          <ChevronDown className="w-6 h-6 text-cyan-400/60 group-hover:text-cyan-400 transition-colors" />
        </motion.div>
      </motion.div>
    </div>
  )
}
