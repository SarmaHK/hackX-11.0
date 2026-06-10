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
    title: 'Registrations Open',
    date: 'June 23',
    desc: 'Doors open to universities across Sri Lanka. Free to enter. Just bring an idea worth fighting for.'
  },
  {
    title: 'Proposal Submission',
    date: 'July 31',
    desc: 'Put your idea on paper. Teams submit structured proposals outlining the problem, the solution, and the impact. Screened by industry professionals. From this year, a one to two minute product introduction video is also required alongside the proposal.'
  },
  {
    title: 'designX Workshops',
    date: 'Sep – Oct',
    desc: 'Four expert-led sessions covering business modelling, startup structuring, and market validation. Exclusive to semi-finalists.'
  },
  {
    title: 'ideaX Semi-Finals',
    date: 'October 3',
    desc: 'Thirty teams. One stage. Present a working prototype to a panel of expert judges and earn your spot at the Grand Finals.'
  },
  {
    title: 'Grand Finals',
    date: 'November 11 (Tentative)',
    desc: 'The main event. Finalist teams present fully developed solutions before a panel of industry leaders, investors, and government officials. Cash prizes, real investor opportunities, and recognition on a national stage.'
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

          {/* Start Node */}
          <div className="timeline-cap-node start-node">
            <div className="cap-glow" />
            <img src="/assets/Xlogo.png" alt="hackX Start" className="cap-icon" />
          </div>

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

          {/* End Node */}
          <div className="timeline-cap-node end-node">
            <div className="cap-glow" />
            <img src="/assets/trident.png" alt="hackX End" className="cap-icon" />
          </div>
        </div>

      </div>
    </section>
  )
}
