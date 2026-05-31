import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

export default function SectionLabel({ text }) {
  const [displayText, setDisplayText] = useState('');
  const [isScrambling, setIsScrambling] = useState(true);
  
  // Scramble effect
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => 
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );
      
      if (iteration >= text.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }
      
      iteration += 1 / 3; // Controls speed of reveal
    }, 30);
    
    return () => clearInterval(interval);
  }, [text]);

  // Hover 3D tilt effect
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Convert to percentage from center (-0.5 to 0.5)
    const xPct = (mouseX / width - 0.5) * 2;
    const yPct = (mouseY / height - 0.5) * 2;
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const rotateX = useMotionTemplate`${mouseYSpring} * -10deg`;
  const rotateY = useMotionTemplate`${mouseXSpring} * 10deg`;

  return (
    <motion.div
      ref={ref}
      className="relative inline-flex items-center justify-center px-8 py-3 rounded-full cursor-default group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background Glass - Dark Navy Capsule */}
      <div className="absolute inset-0 bg-[#050B14]/40 backdrop-blur-md rounded-full transition-all duration-500 group-hover:bg-[#050B14]/60 group-hover:shadow-[0_0_30px_rgba(0,229,255,0.15)]" />
      
      {/* Subtle Glow Reflection Layer */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)] pointer-events-none" />

      {/* SVG Animations: Border Draw & Light Sweep */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 229, 255, 0.8)" />
            <stop offset="100%" stopColor="rgba(0, 102, 255, 0.8)" />
          </linearGradient>
        </defs>
        
        {/* Base thin border draw */}
        <motion.rect
          width="100%"
          height="100%"
          rx="50"
          fill="none"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
          className="group-hover:stroke-[rgba(0,229,255,0.3)] transition-colors duration-500"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        
        {/* Light Sweep (travels once around) */}
        <motion.rect
          width="100%"
          height="100%"
          rx="50"
          fill="none"
          stroke="url(#neonGlow)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
          whileInView={{ pathLength: 0.15, pathOffset: 1, opacity: [0, 1, 1, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
        />
      </svg>

      {/* Content - Typography and Terminal Cursor */}
      <div className="relative z-10 flex items-center justify-center font-mono text-[11px] md:text-sm tracking-[0.3em] text-white/90 font-medium whitespace-nowrap pl-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
        <span>{displayText}</span>
        
        {/* Blinking Cursor */}
        <motion.span 
          className="inline-block w-[4px] h-[14px] bg-cyan-accent ml-2 -mb-[2px] opacity-80 shadow-[0_0_8px_rgba(0,229,255,0.8)]"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "steps(2)" }}
        />
      </div>
    </motion.div>
  );
}
