import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import './faq.css'

const faqs = [
  {
    num: '01',
    title: 'REGISTRATION',
    question: 'Registration & Deadlines',
    answer: (
      <>
        <strong>i. Who can register for hackX 11.0?</strong><br />
        Any currently enrolled undergraduate from a Sri Lankan university or higher education institute. All team members must be from the same institution.<br /><br />
        <strong>ii. Is there a registration fee?</strong><br />
        No. hackX 11.0 is completely free to enter.<br /><br />
        <strong>iii. When do registrations close?</strong><br />
        Proposals must be submitted by July 31. Register early to give your team time to prepare a strong submission.
      </>
    )
  },
  {
    num: '02',
    title: 'TEAMS',
    question: 'Team Size & Eligibility',
    answer: (
      <>
        <strong>i. How many people can be in a team?</strong><br />
        Minimum two, maximum five members.<br /><br />
        <strong>ii. Can students from non-tech faculties participate?</strong><br />
        Absolutely. hackX welcomes innovation from any discipline. Healthcare, agriculture, finance, education, any field is fair game as long as there is a technology-driven solution behind it.
      </>
    )
  },
  {
    num: '03',
    title: 'PROPOSALS',
    question: 'Ideas & Submissions',
    answer: (
      <>
        <strong>i. Do I need a finished product to register?</strong><br />
        No. You just need an idea at registration. A working prototype is required by the ideaX semi-finals stage.<br /><br />
        <strong>ii. What do I need to submit after registering?</strong><br />
        A structured startup proposal by July 31, along with a one to two minute product introduction video.
      </>
    )
  },
  {
    num: '04',
    title: 'PROGRAM',
    question: 'designX & Grand Finals',
    answer: (
      <>
        <strong>i. What is designX?</strong><br />
        An exclusive four-part workshop series for semi-finalists, covering business modelling, startup structuring, and market validation, delivered by industry professionals.<br /><br />
        <strong>ii. What can winners expect at the Grand Finals?</strong><br />
        Winners receive cash prizes, exclusive recognition on a national stage, and direct exposure to real investor opportunities through our partner network.
      </>
    )
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
      {/* ── Underwater Ambient Particles (matches Timeline) ── */}
      <div className="section-bubbles" />

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
