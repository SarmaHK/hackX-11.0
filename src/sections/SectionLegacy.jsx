import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Award, GraduationCap, Rocket, Users } from 'lucide-react'

const AnimatedDivider = ({ delay }) => (
  <motion.div
    className="legacy-divider"
    initial={{ scaleY: 0, opacity: 0 }}
    whileInView={{ scaleY: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
  />
)

const StatColumn = ({ icon: Icon, value, suffix, label }) => (
  <div className="legacy-stat-column">
    <div className="legacy-stat-icon-wrap">
      <div className="legacy-stat-icon-glow" />
      <Icon className="legacy-stat-icon" strokeWidth={1.5} />
    </div>
    <div className="legacy-stat-value">
      {value}
      <span className="legacy-stat-suffix">{suffix}</span>
    </div>
    <div className="legacy-stat-label">{label}</div>
  </div>
)

export default function SectionLegacy() {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '4%'])
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.02, 1.0])

  const stats = [
    { icon: Award, value: '11', suffix: '', label: 'Editions' },
    { icon: GraduationCap, value: '26', suffix: '+', label: 'Universities' },
    { icon: Rocket, value: '550', suffix: '+', label: 'Teams' },
    { icon: Users, value: '2400', suffix: '+', label: 'Delegates' },
  ]

  return (
    <section ref={sectionRef} id="legacy" className="legacy-section">
      <motion.div className="legacy-bg-wrapper" style={{ y: bgY, scale: bgScale }}>
        <img src="/assets/legacybg.png" alt="hackX Legacy" className="legacy-bg-image" />
      </motion.div>

      <div className="legacy-overlay-dark" />
      <div className="legacy-overlay-vignette" />
      <div className="legacy-overlay-gradient-top" />
      <div className="legacy-overlay-gradient-bottom" />
      
      <div className="legacy-ambient-glow" />
      
      <div className="legacy-dust-container">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="legacy-dust-particle" style={{
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDuration: Math.random() * 10 + 10 + 's',
            animationDelay: Math.random() * 5 + 's',
            '--dust-opacity': Math.random() * 0.3 + 0.1
          }} />
        ))}
      </div>

      <div className="legacy-rays-container">
        <div className="legacy-ray legacy-ray-1" />
        <div className="legacy-ray legacy-ray-2" />
        <div className="legacy-ray legacy-ray-3" />
      </div>

      <div className="legacy-content">
        <motion.div
          className="legacy-badge"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="legacy-badge-dot" />
          <span className="legacy-badge-text">OUR LEGACY</span>
        </motion.div>

        <div className="legacy-title-group">
          <motion.h2
            className="legacy-title-main"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="legacy-title-outline">THE LEGACY</span>
            <span className="legacy-title-glow">CONTINUES</span>
          </motion.h2>
        </div>

        <motion.div
          ref={cardRef}
          className="legacy-glass-card"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="legacy-card-inner-glow" />

          <div className="legacy-stats-grid">
            {stats.map((stat, i) => (
              <div key={i} className="legacy-stat-wrapper">
                {i > 0 && <AnimatedDivider delay={0.4 + i * 0.15} />}
                <StatColumn
                  icon={stat.icon}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              </div>
            ))}
          </div>
        </motion.div>
        
        <div className="legacy-card-underglow" />
      </div>
    </section>
  )
}
