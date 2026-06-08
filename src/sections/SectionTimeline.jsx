import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   SECTION: TIMELINE
   The Journey of hackX 11.0
   ═══════════════════════════════════════════════════════════════ */

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
  
  // Track scroll progress for the central line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  })

  // Animate the height of the glowing line based on scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="timeline" className="timeline-section" ref={containerRef}>
      
      {/* ── Background Elements ── */}
      <div className="cps-ambient-glow" />
      
      <div className="timeline-container">
        
        {/* ── Section Header ── */}
        <div className="timeline-header">
          <motion.div className="timeline-badge"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}>
            <span className="timeline-badge-dot" />
            THE JOURNEY
          </motion.div>
          
          <motion.h2 className="timeline-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}>
            <span className="tl-outline">ROAD TO</span>
            <span className="tl-solid">GLORY</span>
          </motion.h2>
        </div>

        {/* ── Timeline Track ── */}
        <div className="timeline-track">
          {/* Base dim line */}
          <div className="timeline-line-bg" />
          {/* Animated glowing line that fills as you scroll */}
          <motion.div 
            className="timeline-line-glow" 
            style={{ height: lineHeight }} 
          />

          {/* ── Event Nodes ── */}
          {timelineEvents.map((event, index) => {
            const isLeft = index % 2 === 0
            
            return (
              <motion.div 
                key={index} 
                className={`timeline-item ${isLeft ? 'tl-left' : 'tl-right'}`}
                initial={{ opacity: 0, y: 50, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
              >
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
              </motion.div>
            )
          })}
        </div>
        
      </div>
    </section>
  )
}
