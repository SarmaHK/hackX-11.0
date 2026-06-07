import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, Users, Trophy, CircleDollarSign, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Sprout,
    title: 'Sustainable Innovation',
    description: 'Empowering ideas that shape the future and\ncreate meaningful impact.',
    glowStyle: {
      background: 'radial-gradient(circle at 30% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 60%), radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)'
    },
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-400/10'
  },
  {
    icon: Users,
    title: 'Inter-University Network',
    description: 'Connecting brilliant minds from\nuniversities across Sri Lanka.',
    glowStyle: {
      background: 'radial-gradient(circle at 70% 80%, rgba(99, 102, 241, 0.15) 0%, transparent 60%), radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.05) 0%, transparent 50%)'
    },
    iconColor: 'text-indigo-400',
    iconBg: 'bg-indigo-400/10'
  },
  {
    icon: Trophy,
    title: 'Premier Platform',
    description: 'Present your ideas to industry\nprofessionals, mentors, and pioneers.',
    glowStyle: {
      background: 'radial-gradient(circle at 50% 90%, rgba(59, 130, 246, 0.15) 0%, transparent 70%), radial-gradient(circle at 50% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)'
    },
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-400/10'
  },
  {
    icon: CircleDollarSign,
    title: 'Investor Access',
    description: 'Connect with investors and unlock opportunities for real-world growth.',
    glowStyle: {
      background: 'radial-gradient(circle at 80% 70%, rgba(245, 158, 11, 0.15) 0%, transparent 60%), radial-gradient(circle at 20% 30%, rgba(245, 158, 11, 0.05) 0%, transparent 50%)'
    },
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-400/10'
  }
];

export default function SectionWhyJoin() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate the featured card
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const activeFeature = features[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-48 overflow-hidden bg-abyss flex flex-col items-center justify-center z-10"
    >
      {/* Abstract Holographic Grid Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-abyss">
        {/* Cyan Grid Pattern */}
        <div className="absolute inset-0" style={{ 
            backgroundImage: 'linear-gradient(rgba(0, 229, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.03) 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
        }} />
        
        {/* Ambient Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]" />

        {/* Depth gradients to blend edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-abyss via-transparent to-abyss" />
        <div className="absolute inset-0 bg-gradient-to-r from-abyss via-transparent to-abyss opacity-80" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-50">
        <div className="ambient-particle w-2 h-2 top-[20%] left-[15%] animation-delay-0"></div>
        <div className="ambient-particle w-3 h-3 top-[60%] left-[80%] animation-delay-200"></div>
        <div className="ambient-particle w-1.5 h-1.5 top-[80%] left-[25%] animation-delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">

          {/* Left Column: Content */}
          <div className="flex flex-col items-start justify-center text-left w-full lg:w-[55%] xl:w-[60%] max-w-2xl xl:max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="glass-card w-full relative rounded-[32px] lg:rounded-[40px]"
              style={{ padding: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              {/* Subtle accent gradient inside the glass card */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent pointer-events-none rounded-[inherit] overflow-hidden" />

              <h2 className="relative z-10 text-4xl md:text-5xl lg:text-[56px] font-display font-bold text-white mb-6 uppercase tracking-tight leading-tight flex flex-col items-start">
                <span>What Is</span>
                <span className="flex items-baseline gap-3">
                  <span className="text-cyan-accent">HackX</span>
                  <span className="text-2xl lg:text-3xl text-slate-300 font-medium">11.0</span>
                </span>
              </h2>
              <p className="relative z-10 text-base lg:text-lg text-slate-300 font-body mb-10 leading-relaxed max-w-xl xl:max-w-2xl">
                hackX 11.0 is the flagship innovation and entrepreneurship challenge organized by IMSSA. It brings together universities, mentors, startups, and industry leaders to transform innovative ideas into real-world impact through a structured journey of collaboration, creation, and competition.
              </p>

              <button className="relative z-10 btn-primary group">
                <span className="relative z-10 flex items-center gap-2">
                  Learn More About HackX <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Premium Rotating Card */}
          <div className="relative w-full max-w-[280px] lg:max-w-[340px] mx-auto lg:mx-0 lg:ml-auto aspect-square rounded-[36px] overflow-hidden border border-white/10 bg-[#040814]/60 backdrop-blur-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] group">

            {/* Subtle Dot Grid Texture */}
            <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

            {/* Subtle Glass Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none z-0" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col justify-center p-6 lg:p-8 pointer-events-none z-10"
              >
                {/* Dynamic Ambient Glow */}
                <div
                  className="absolute inset-0 z-0 opacity-40 mix-blend-screen transition-all duration-1000"
                  style={activeFeature.glowStyle}
                />

                {/* Animated Floating Orb */}
                <motion.div
                  animate={{
                    x: [0, 30, -20, 0],
                    y: [0, -30, 20, 0]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute top-1/4 right-1/4 w-32 h-32 bg-cyan-400/20 rounded-full blur-[40px] z-0"
                />

                {/* Top-Left Badge */}
                <div className="absolute top-0 left-0 z-30 w-[60px] h-[60px] bg-white/[0.05] backdrop-blur-md rounded-br-[28px] flex items-center justify-center border-b border-r border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                  <activeFeature.icon className="w-6 h-6 text-slate-200" strokeWidth={1.5} />
                </div>

                {/* Centered Text */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center h-full pt-6 pb-14 gap-5">
                  <h3 className="text-[20px] lg:text-[24px] font-display font-bold text-white tracking-wide leading-tight px-6">
                    {activeFeature.title}
                  </h3>
                  <p className="text-[14px] lg:text-[15px] text-slate-300/80 font-body leading-relaxed whitespace-pre-line px-6 lg:px-8">
                    {activeFeature.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Eleventh Edition Static Badge at Bottom */}
            <div className="absolute bottom-6 left-0 right-0 z-30 flex items-center justify-center gap-3 pointer-events-none">
              <div className="w-[36px] h-[36px] bg-slate-200 rounded-[10px] flex items-center justify-center shadow-md">
                <span className="font-display font-bold text-[#020612] text-[15px] leading-none">11</span>
              </div>
              <span className="font-display font-bold text-white text-[15px] tracking-wide drop-shadow-md">Eleventh Edition</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
