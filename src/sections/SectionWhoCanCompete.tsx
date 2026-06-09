import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronRight, Rocket } from 'lucide-react'
import './who-can-compete.css'

gsap.registerPlugin(ScrollTrigger)

export default function SectionWhoCanCompete() {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftCardRef = useRef<HTMLDivElement>(null)
  const rightCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup initial states
      gsap.set(leftCardRef.current, { opacity: 0, y: 30 })
      gsap.set(rightCardRef.current, { opacity: 0, y: 30 })

      // Main Entrance Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'center center',
          toggleActions: 'play none none reverse',
        }
      })

      tl.to(leftCardRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .to(rightCardRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6')
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="compete-section" id="who-can-compete">
      
      <div className="compete-content-wrapper">
        {/* Ambient Orbs for Glass Effect */}
        <div className="compete-ambient-orb orb-1"></div>
        <div className="compete-ambient-orb orb-2"></div>
        
        <div className="compete-layout-grid">
          
          {/* Left Card: Who Can Compete? */}
          <div className="compete-glass-card compete-left-card" ref={leftCardRef}>
            <h2 className="compete-card-main-title">Who Can Compete?</h2>
            <p className="compete-card-subtitle">Built for Builders. Open to All Universities.</p>
            
            <div className="compete-columns">
              {/* Column 1 */}
              <div className="compete-column">
                <h3 className="compete-column-title">YOUR TEAM</h3>
                <ul className="compete-list">
                  <li><ChevronRight size={18} color="#00E5FF" strokeWidth={3} className="shrink-0 mt-0.5" /> <span>Two to five members.</span></li>
                  <li><ChevronRight size={18} color="#00E5FF" strokeWidth={3} className="shrink-0 mt-0.5" /> <span>All currently enrolled undergraduates from the same university or higher education institute.</span></li>
                </ul>
              </div>
              
              {/* Column 2 */}
              <div className="compete-column">
                <h3 className="compete-column-title">YOUR IDEA</h3>
                <ul className="compete-list">
                  <li><ChevronRight size={18} color="#00E5FF" strokeWidth={3} className="shrink-0 mt-0.5" /> <span>Any real-world problem with a scalable, technology-driven solution.</span></li>
                  <li><ChevronRight size={18} color="#00E5FF" strokeWidth={3} className="shrink-0 mt-0.5" /> <span>Innovation from any field is welcome — healthcare, agriculture, finance, education, sustainability, and beyond.</span></li>
                </ul>
              </div>
              
              {/* Column 3 */}
              <div className="compete-column">
                <h3 className="compete-column-title">YOUR ENTRY</h3>
                <ul className="compete-list">
                  <li><ChevronRight size={18} color="#00E5FF" strokeWidth={3} className="shrink-0 mt-0.5" /> <span>Completely free. No registration fee, no prerequisites.</span></li>
                  <li><ChevronRight size={18} color="#00E5FF" strokeWidth={3} className="shrink-0 mt-0.5" /> <span>Sign up, submit your proposal by July 31, and let your idea do the talking.</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Card: CTA */}
          <div className="compete-glass-card compete-right-card" ref={rightCardRef}>
            <div className="compete-cta-icon-wrapper">
              <Rocket size={40} />
            </div>
            <h3 className="compete-cta-title">Ready to Compete?</h3>
            <p className="compete-cta-desc">
              Gather your crew, refine your idea, and prepare for the ultimate innovation expedition. The ocean of opportunities awaits.
            </p>
            <a href="#register" className="compete-cta-btn" style={{ marginTop: '1rem' }}>
              <span className="relative z-10">Register Now</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
