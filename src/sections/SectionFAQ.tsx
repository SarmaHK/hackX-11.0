import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import './faq.css'

const faqs = [
  {
    num: '01',
    title: 'REGISTRATION',
    question: 'How do I register?',
    answer: 'Registration will open shortly. Keep an eye on our social media and this website for the official registration link. Teams can register via the dedicated portal once live.'
  },
  {
    num: '02',
    title: 'ELIGIBILITY',
    question: 'Who can participate?',
    answer: 'HackX 11.0 is open to all university undergraduates across Sri Lanka. If you have a passion for innovation and a valid student ID, you are welcome to dive in.'
  },
  {
    num: '03',
    title: 'TEAMS',
    question: 'How many members can be in a team?',
    answer: 'A team must consist of a minimum of 3 and a maximum of 4 members from the same university.'
  },
  {
    num: '04',
    title: 'ACCOMMODATION',
    question: 'Is accommodation provided?',
    answer: 'Yes, overnight accommodation and resting areas will be provided for all finalists during the hackathon phase at the venue.'
  },
  {
    num: '05',
    title: 'MEALS',
    question: 'Will meals be provided?',
    answer: 'All main meals, snacks, and midnight refreshments will be fully provided for participants during the physical hackathon.'
  },
  {
    num: '06',
    title: 'PRIZES',
    question: 'What can participants win?',
    answer: 'Beyond the prestigious HackX championship title, winners will receive exciting cash prizes, exclusive swags, and potential incubation opportunities.'
  }
]

export default function SectionFAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  
  // Refs for calculating SVG lines
  const diverRef = useRef<HTMLImageElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  
  // We don't necessarily need to draw dynamic lines on every render if it's too complex,
  // but let's implement a simple SVG curve using absolute coordinates if possible, or
  // just use CSS to position the items around the diver and draw standard SVG paths.
  
  // Since absolute SVG paths across a responsive layout can be tricky without a ResizeObserver,
  // we will use a simpler approach: The SVG and the items are in the same relative container.

  return (
    <section id="faq" className="faq-section">
      {/* ── Background Elements ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="cps-ambient-glow"></div>
      </div>


      <div className="faq-container">
        
        {/* LEFT COLUMN: Typography & Negative Space */}
        <div className="faq-left">
          <motion.h2 
            className="faq-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            FAQ
          </motion.h2>
          
          {/* Master Answer Display Glass Box */}
          <div className="faq-glass-answer-box">
            {activeIndex !== null ? (
              <motion.div 
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="faq-glass-content"
              >
                <h4 className="faq-glass-title">{faqs[activeIndex].title}</h4>
                <p className="faq-glass-text">{faqs[activeIndex].answer}</p>
              </motion.div>
            ) : (
              <div className="faq-glass-placeholder">
                <span className="faq-glass-icon">?</span>
                <p>HOVER OVER A TRANSMISSION TO DECRYPT LOG</p>
              </div>
            )}
          </div>        </div>

        {/* RIGHT COLUMN: Diver & Interactive Elements */}
        {/* RIGHT COLUMN: Interactive Elements & Diver Content */}
        <div className="faq-right">
          
          <div className="faq-diver-wrapper">
            <img 
              ref={diverRef}
              src="/assets/faqbg.png" 
              alt="Futuristic Diver" 
              className="faq-diver-img"
            />
          </div>

          <div className="faq-items-container">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                ref={el => { itemRefs.current[index] = el }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="faq-item-header">
                  <div className="faq-number">{faq.num} {faq.title}</div>
                  <div className="faq-question">{faq.question}</div>
                </div>
              </div>
            ))}
            
            {/* SVG Sonar Connection Lines Removed */}
          </div>

        </div>

      </div>
    </section>
  )
}
