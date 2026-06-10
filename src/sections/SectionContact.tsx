import { useRef } from 'react'
import { motion } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   SECTION: CONTACT — PREMIUM MODERN CARDS
   ═══════════════════════════════════════════════════════════════ */

const teamMembers = [
  {
    id: 'COORD-01',
    name: 'Tharushi Kulathunga',
    role: 'Chief Coordinator',
    event: 'hackX 11.0',
    image: '/assets/tharushi.jpg',
  },
  {
    id: 'COORD-02',
    name: 'Tharindu Dhanushka',
    role: 'Chief Coordinator',
    event: 'ideasprint 2026',
    image: '/assets/tharindu.jpg',
  },
  {
    id: 'COORD-03',
    name: 'Thilini Bhagya',
    role: 'Chief Coordinator',
    event: 'ideasprint 2026',
    image: '/assets/thilini.jpg',
  },
  {
    id: 'COORD-04',
    name: 'Praveen Madawalage',
    role: 'Chief Coordinator',
    event: 'hackX 11.0',
    image: '/assets/praveen.jpg',
  },
]

export default function SectionContact() {
  const sectionRef = useRef<HTMLElement>(null)

  // Render a single card to reuse in the marquee groups
  const renderCard = (member: typeof teamMembers[0], keySuffix: string) => (
    <div key={`${member.id}-${keySuffix}`} className="cps-card">
      <div className="cps-glare"></div>

      <div className="cps-card-inner">
        <div className="cps-photo-container">
          <div className="cps-photo-box">
            {member.image ? (
              <img src={member.image} alt={member.name} className="cps-photo" />
            ) : (
              <div className="cps-photo-placeholder">{member.name.charAt(0)}</div>
            )}
          </div>
          <div className="cps-role-badge-wrapper">
            <div className="cps-role-badge">{member.role}</div>
          </div>
        </div>

        <div className="cps-info">
          <h3 className="cps-name">{member.name}</h3>
          <p className="cps-event">{member.event}</p>
        </div>
      </div>
    </div>
  )

  return (
    <section id="contact" className="contact-premium-section" ref={sectionRef}>
      {/* Ambient Environment - matches Timeline section */}
      <div className="section-bubbles" />

      <div className="cps-container">
        
        <motion.div 
          className="cps-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="cps-section-label">
            <span className="cps-label-dot"></span>
            CONTACT US
          </div>
          <h2 className="cps-title">CONTACT OUR TEAM</h2>
          <p className="cps-description">
            Reach out directly to the hackX 11.0 organizing team for any questions or support.
          </p>
        </motion.div>

        {/* Looping Carousel */}
        <motion.div 
          className="cps-carousel-viewport"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="cps-marquee-track">
            {/* First Group */}
            <div className="cps-marquee-group">
              {[...teamMembers, ...teamMembers, ...teamMembers, ...teamMembers].map((member, idx) => renderCard(member, `g1-${idx}`))}
            </div>
            {/* Duplicated Group for Seamless Loop */}
            <div className="cps-marquee-group" aria-hidden="true">
              {[...teamMembers, ...teamMembers, ...teamMembers, ...teamMembers].map((member, idx) => renderCard(member, `g2-${idx}`))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
