import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './timeline.css'

/* ═══════════════════════════════════════════════════════════════
   SECTION: TIMELINE (Cinematic Atlantis Layout)
   The Journey of hackX 11.0
   ═══════════════════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger)

const timelineEvents = [
  {
    title: 'IdeaSprint (Soft Launch)',
    date: 'June 5',
    desc: 'The official campaign kicks off. Introduction to the competition themes, ideation strategies, and general awareness sessions for inter-university undergraduates.'
  },
  {
    title: 'Registrations Open',
    date: 'June 23',
    desc: 'The portal goes live. Teams of 3–5 undergraduate students from the same university officially assemble and register to secure their spots.'
  },
  {
    title: 'Proposal Submission Deadline',
    date: 'July 28',
    desc: 'Teams submit their initial project proposals mapping out their sustainable tech innovation, commercial viability, and high-level architecture.'
  },
  {
    title: 'ideaX Semi-Finals',
    date: 'August 28',
    desc: 'Following the initial review of proposals, selected teams pitch their core ideas to a panel of experts to earn a slot in the intensive phase.'
  },
  {
    title: 'designX Workshop 1',
    date: 'September 9',
    desc: 'Focuses on foundational business building, mapping out practical financial structures, and creating a sustainable startup business model.'
  },
  {
    title: 'designX Workshop 2',
    date: 'September 14',
    desc: 'Deep dive into product development framework, looking at engineering constraints, scaling strategies, and backend infrastructure.'
  },
  {
    title: 'designX Workshop 3',
    date: 'September 16',
    desc: 'Refining the product via UI/UX workshops, alongside key guidance on navigating startup ecosystems, tech grants, and pitching to investors.'
  },
  {
    title: 'Grand Finals',
    date: 'September 28',
    desc: 'The 12-week journey culminates here. Finalists present working prototypes and fully realized business models to a jury of venture capitalists and industry leaders.'
  }
]

export default function SectionTimeline() {
  const containerRef = useRef(null)

  useEffect(() => {
    // Clean up any existing ScrollTriggers before re-initializing
    const ctx = gsap.context(() => {
      
      // 1. Animate the glowing center line to fill up as we scroll down
      gsap.fromTo('.timeline-line-glow', 
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline-track',
            start: 'top center',
            end: 'bottom center',
            scrub: true
          }
        }
      )

      // 2. Animate each timeline item (Cards + Diver + Flashlight)
      const items = gsap.utils.toArray('.timeline-item')
      
      items.forEach((item, index) => {
        const isLeft = index % 2 === 0
        const diverContainer = item.querySelector('.diver-container')
        const flashlightBeam = item.querySelector('.flashlight-beam')
        const flashlightGlow = item.querySelector('.flashlight-glow')

        ScrollTrigger.create({
          trigger: item,
          start: 'top 65%', // Becomes active when item enters center area
          end: 'bottom 35%', // Deactivates when item leaves center area
          toggleClass: 'active',
          onEnter: () => {
            // Diver fades in and floats up slightly
            gsap.to(diverContainer, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })
            
            // Flashlight fades in and rotates toward the card
            gsap.to([flashlightBeam, flashlightGlow], { opacity: 1, duration: 0.6, delay: 0.3 })
            
            // Left card -> beam points left (-90deg roughly)
            // Right card -> beam points right (90deg roughly)
            const targetAngle = isLeft ? -90 : 90
            gsap.fromTo(flashlightBeam, 
              { rotate: targetAngle + (isLeft ? 45 : -45) }, 
              { rotate: targetAngle, duration: 1.5, ease: 'power2.out' }
            )
          },
          onLeave: () => {
            // Fade out as it goes up
            gsap.to(diverContainer, { opacity: 0, y: -30, duration: 0.6 })
            gsap.to([flashlightBeam, flashlightGlow], { opacity: 0, duration: 0.3 })
          },
          onEnterBack: () => {
            // Re-enter from top
            gsap.to(diverContainer, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })
            gsap.to([flashlightBeam, flashlightGlow], { opacity: 1, duration: 0.6, delay: 0.3 })
            const targetAngle = isLeft ? -90 : 90
            gsap.fromTo(flashlightBeam, 
              { rotate: targetAngle + (isLeft ? -45 : 45) }, 
              { rotate: targetAngle, duration: 1.5, ease: 'power2.out' }
            )
          },
          onLeaveBack: () => {
            // Fade out as it goes down
            gsap.to(diverContainer, { opacity: 0, y: 30, duration: 0.6 })
            gsap.to([flashlightBeam, flashlightGlow], { opacity: 0, duration: 0.3 })
          }
        })
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="timeline" className="timeline-section-cinematic" ref={containerRef}>
      
      {/* ── Ambient Environment ── */}
      <div className="timeline-ambient-layer">
        <div className="timeline-bubbles" />
        <div className="timeline-light-rays" />
      </div>

      <div className="timeline-container">
        
        {/* ── Section Header ── */}
        <div className="timeline-header">
          <div className="timeline-badge">
            <span className="timeline-badge-dot" />
            THE JOURNEY
          </div>
          <h2 className="timeline-title">
            <span className="tl-outline">ROAD TO</span>
            <span className="tl-solid">GLORY</span>
          </h2>
        </div>

        {/* ── Timeline Track ── */}
        <div className="timeline-track">
          {/* Base dim line */}
          <div className="timeline-line-bg" />
          {/* Animated glowing line that fills as you scroll */}
          <div className="timeline-line-glow" />

          {/* ── Event Nodes ── */}
          {timelineEvents.map((event, index) => {
            const isLeft = index % 2 === 0
            
            return (
              <div key={index} className={`timeline-item ${isLeft ? 'tl-left' : 'tl-right'}`}>
                
                {/* Center dot/node */}
                <div className="timeline-node">
                  <div className="timeline-node-inner" />
                  <div className="timeline-node-pulse" />
                </div>
                
                {/* Content Card */}
                <div className="timeline-content">
                  <div className="timeline-date">{event.date}</div>
                  <h3 className="timeline-event-title">{event.title}</h3>
                  <p className="timeline-event-desc">{event.desc}</p>
                </div>

                {/* Diver & Flashlight wrapper - placed on opposite side of card */}
                <div className="timeline-diver-wrapper">
                  <div className={`diver-container ${isLeft ? 'diver-left' : 'diver-right'}`}>
                    
                    {/* The light effects */}
                    <div className="flashlight-glow" />
                    <div className="flashlight-beam" />
                    
                    {/* Wrapper for flipping the image safely without CSS animation conflicts */}
                    <div style={{ transform: isLeft ? 'scaleX(1)' : 'scaleX(-1)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <img 
                        src="/assets/diver.png" 
                        alt="Deep Sea Explorer" 
                        className="diver-sprite" 
                      />
                    </div>
                  </div>
                </div>

              </div>
            )
          })}
        </div>
        
      </div>
    </section>
  )
}
