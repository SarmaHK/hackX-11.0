import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Hexagon, Trophy, Award, X, ArrowRight } from 'lucide-react'
import './ambassador.css'

gsap.registerPlugin(ScrollTrigger)

export default function SectionAmbassador() {
  const [showModal, setShowModal] = useState(false)

  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const pillarsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup initial states
      gsap.set(headerRef.current, { opacity: 0, y: 40 })
      gsap.set(ctaRef.current, { opacity: 0, y: 30 })

      const pillars = pillarsRef.current?.children
      if (pillars) {
        gsap.set(pillars, { opacity: 0, y: 50 })
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'center center',
          toggleActions: 'play none none reverse',
        }
      })

      // Animate Header
      tl.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      })

      // Stagger Pillars
      if (pillars) {
        tl.to(pillars, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out'
        }, '-=0.4')
      }

      // Animate CTA
      tl.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4')

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="amb-section" id="ambassador">

      {/* ── Underwater Ambient Particles (matches Timeline) ── */}
      <div className="section-bubbles" />

      {/* Background Ambient Orbs removed - caused visible color seam */}

      <div className="amb-content-wrapper">

        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col items-center mb-12">
          <span className="amb-subtitle">Be The Movement</span>
          <h2 className="amb-main-title">
            Carry hackX to Your Campus
          </h2>
        </div>

        {/* Pillars Grid */}
        <div ref={pillarsRef} className="amb-pillars-grid">

          {/* Pillar 1: Earn Points */}
          <div className="amb-pillar group">
            <div className="amb-icon-wrapper">
              <Hexagon size={40} className="relative z-10" />
            </div>
            <h3 className="amb-pillar-title">Earn Points</h3>
            <p className="amb-pillar-desc">
              Every team you refer earns points. As teams advance through proposal submission, selection rounds, and the Grand Finals, additional points are awarded to power your ranking.
            </p>
          </div>

          {/* Pillar 2: Climb the Leaderboard */}
          <div className="amb-pillar group">
            <div className="amb-icon-wrapper">
              <Trophy size={40} className="relative z-10" />
            </div>
            <h3 className="amb-pillar-title">Climb the Leaderboard</h3>
            <p className="amb-pillar-desc">
              A live-style leaderboard showcase. Top ambassadors receive VIP invitations, exclusive merchandise, on-stage recognition, and unprecedented access to the Grand Finals.
            </p>
          </div>

          {/* Pillar 3: Get Certified */}
          <div className="amb-pillar group">
            <div className="amb-icon-wrapper">
              <Award size={40} className="relative z-10" />
            </div>
            <h3 className="amb-pillar-title">Get Certified</h3>
            <p className="amb-pillar-desc">
              Solidify your legacy. Every ambassador who successfully completes the program receives an official hackX digital certificate and verifiable leadership credentials.
            </p>
          </div>

        </div>

        {/* Read More Button (Above the CTA line) */}
        <div className="flex justify-center w-full relative z-10" style={{ marginTop: '-2rem', marginBottom: '6rem' }}>
          <button
            onClick={() => setShowModal(true)}
            className="btn-glass group"
          >
            <span className="relative z-10 flex items-center gap-2">
              Read More About Program <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        </div>

        {/* CTA Block */}
        <div ref={ctaRef} className="amb-cta-block">
          <h3 className="amb-cta-title">Become a Campus Ambassador</h3>
          <p className="amb-cta-subtitle">Applications open June 23.</p>

          <a 
            href="#ambassador-apply" 
            className="group relative overflow-hidden inline-flex items-center justify-center w-[280px] h-[48px] rounded-full bg-white text-black font-bold text-[13px] uppercase tracking-[0.1em] transition-all duration-300 hover:scale-105 hover:bg-slate-100 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_35px_rgba(255,255,255,0.3)] mt-6"
          >
            <span className="relative z-10 flex items-center gap-3">
              Apply as Ambassador
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00E5FF]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          </a>
        </div>

      </div>

      {/* ═══ Reference Style Modal (Glass UI) ═══ */}
      {/* ═══ Reference Style Modal (Exact Match) ═══ */}
      {/* ═══ Reference Style Modal (Refined Premium UI) ═══ */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowModal(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            style={{ background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="relative w-[95vw] max-w-[960px] rounded-[24px] overflow-hidden flex flex-col shadow-2xl border border-white/[0.08]"
              style={{
                background: 'rgba(5, 15, 35, 0.85)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)'
              }}
            >
              {/* Premium Soft Radial Atlantis Glow at the top */}
              <div 
                className="absolute top-0 left-0 right-0 h-[600px] pointer-events-none"
                style={{ 
                  background: 'radial-gradient(ellipse at top center, rgba(0, 229, 255, 0.12) 0%, transparent 70%)' 
                }} 
              />

              {/* Close Button */}
              <button 
                onClick={(e) => { e.stopPropagation(); setShowModal(false); }}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.15] text-white/60 hover:text-white transition-all duration-300 z-[999] hover:rotate-90 pointer-events-auto cursor-pointer"
              >
                <X size={20} strokeWidth={1.5} />
              </button>

              <div className="relative z-10 px-10 md:px-20 py-0 flex flex-col items-center text-center">
                
                {/* ─── Top Spacer (Guarantees symmetric vertical spacing) ─── */}
                <div className="h-12 md:h-20 w-full shrink-0"></div>

                {/* ─── SECTION 1: Header ─── */}
                <h2 className="text-[48px] md:text-[64px] font-display font-bold mb-4 tracking-tight drop-shadow-lg leading-tight flex flex-col md:flex-row items-center justify-center gap-2 md:gap-5">
                  <span>
                    <span className="text-white">hack</span>
                    <span className="text-[#ffb700]">X</span>
                  </span>
                  <span className="text-white/80 text-[20px] md:text-[28px] tracking-[0.3em] uppercase md:mt-4">
                    Ambassador
                  </span>
                </h2>

                {/* ─── Divider 1 ─── */}
                <div className="w-full max-w-[800px] border-b border-white/[0.08] my-10 shrink-0"></div>

                {/* ─── SECTION 2: Description ─── */}

                
                <div className="flex flex-col gap-6 text-slate-300 text-[16px] md:text-[18px] lg:text-[20px] leading-[1.8] max-w-[800px] text-justify font-light">
                  <p>
                    The hackX 11.0 Ambassador Program puts you at the centre of Sri Lanka's premier student innovation movement.
                  </p>
                  <p>
                    As a Campus Ambassador, you become the connection between hackX and your university, introducing opportunities to your peers, inspiring participation, and earning recognition for every team you help reach the national stage.
                  </p>
                  <p>
                    This is not just volunteering. It is a leadership credential, a gamified competition across universities island-wide, and a direct line to industry mentors, tech leaders, and the Grand Finals stage itself.
                  </p>
                </div>

                {/* ─── Divider removed per request ─── */}

                {/* ─── SECTION 4: CTA Block ─── */}
                <div className="flex flex-col items-center shrink-0">
                  <p className="text-slate-400 text-[14px] uppercase tracking-widest mb-8">
                    Applications Open <strong className="text-white ml-2">JUNE 23</strong>
                  </p>
                  <button 
                    onClick={() => {
                      setShowModal(false);
                      const el = document.getElementById('ambassador-apply');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group relative overflow-hidden inline-flex items-center justify-center w-[280px] h-[48px] rounded-full bg-white text-black font-bold text-[13px] uppercase tracking-[0.1em] transition-all duration-300 hover:scale-105 hover:bg-slate-100 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_35px_rgba(255,255,255,0.3)]"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Apply as Ambassador
                      <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00E5FF]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  </button>
                </div>
                
                {/* ─── Bottom Spacer (Matches Top Spacer perfectly) ─── */}
                <div className="h-12 md:h-20 w-full shrink-0"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
