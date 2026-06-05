import { useRef, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════════════════════════════
   SECTION: ABOUT HACKX 11.0
   Holographic Blueprint — Atlantis Innovation Ecosystem
   ═══════════════════════════════════════════════════════════════ */

/* Ecosystem connection nodes around the HackX core */
const ecoNodes = [
  { id: 'mentors', label: 'MENTORS', angle: 90, dist: 120, hoverDesc: 'Get guidance from experienced industry professionals.' },
  { id: 'industry', label: 'INDUSTRY', angle: 0, dist: 130, hoverDesc: 'Connect with leading tech giants and corporate partners.' },
  { id: 'universities', label: 'UNIVERSITIES', angle: 270, dist: 120, hoverDesc: 'Collaborate with top undergraduate talent nationwide.' },
]

/* Journey steps flowing downward */
const journeySteps = [
  { label: 'IDEATE', desc: 'Generate bold ideas', hoverDesc: 'Identify problems and generate innovative tech solutions.' },
  { label: 'BUILD', desc: 'Develop working solutions', hoverDesc: 'Transform concepts into working prototypes.' },
  { label: 'PITCH', desc: 'Present to experts', hoverDesc: 'Pitch your product to expert judges and investors.' },
  { label: 'IMPACT', desc: 'Create real-world value', hoverDesc: 'Launch your solution to create real-world impact.' },
]

/* Convert polar → SVG coordinates. center = (200, 200) in a 400×400 viewBox */
function polar(angleDeg, dist) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: 200 + dist * Math.cos(rad),
    y: 200 + dist * Math.sin(rad),
  }
}

/* Animated energy pulse along an SVG path */
function Pulse({ d, delay = 0 }) {
  return (
    <motion.circle r="3" fill="#00E5FF"
      style={{ filter: 'drop-shadow(0 0 6px #00E5FF)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      <animateMotion dur="2.5s" repeatCount="indefinite" begin={`${delay}s`}>
        <mpath href={`#${d}`} />
      </animateMotion>
    </motion.circle>
  )
}

/* Single ecosystem node */
function EcoNode({ node, delay, setHover }) {
  const pos = polar(node.angle, node.dist)
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 180, damping: 18 }}
      onMouseEnter={(e) => setHover({ text: node.hoverDesc, x: e.clientX, y: e.clientY })}
      onMouseLeave={() => setHover(null)}
      style={{ cursor: 'pointer' }}
    >
      {/* Invisible hitbox for reliable hover */}
      <circle cx={pos.x} cy={pos.y} r="35" fill="transparent" pointerEvents="all" />
      {/* Glow circle */}
      <circle cx={pos.x} cy={pos.y} r="22" fill="rgba(0,229,255,0.06)"
        stroke="rgba(0,229,255,0.5)" strokeWidth="1" />
      <circle cx={pos.x} cy={pos.y} r="14" fill="rgba(0,229,255,0.12)"
        stroke="rgba(0,229,255,0.9)" strokeWidth="1.5" />
      <circle cx={pos.x} cy={pos.y} r="4" fill="#00E5FF"
        style={{ filter: 'drop-shadow(0 0 6px #00E5FF)' }} />
      {/* Label */}
      <text
        x={pos.x}
        y={pos.angle === 90 ? pos.y - 34 : pos.angle === 270 ? pos.y + 38 : pos.y - 32}
        textAnchor="middle"
        fill="rgba(0,229,255,0.9)"
        fontSize="9"
        fontFamily="Space Mono, monospace"
        letterSpacing="1.5"
      >
        {node.label}
      </text>
    </motion.g>
  )
}

export default function SectionAbout() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const cardRef = useRef(null)
  const tooltipRef = useRef(null)
  const [activeHover, setActiveHover] = useState(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')

    const setCanvasSize = () => {
      if (cardRef.current) {
        canvas.width = cardRef.current.clientWidth
        canvas.height = cardRef.current.clientHeight
      }
      render()
    }

    const frameCount = 160
    const currentFrame = index => (
      `/assets/aboutbg/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.png`
    )

    const images = []
    const frames = { frame: 0 }

    for (let i = 0; i < frameCount; i++) {
      const img = new Image()
      img.src = currentFrame(i)
      images.push(img)
    }

    const render = () => {
      if (!images[frames.frame]) return
      const img = images[frames.frame]
      if (!img.complete) return

      const hRatio = canvas.width / img.width
      const vRatio = canvas.height / img.height
      const ratio = Math.max(hRatio, vRatio) * 1 // Reduce zoom to prevent head looking broken
      const centerShift_x = (canvas.width - img.width * ratio) / 2
      const centerShift_y = (canvas.height - img.height * ratio) / 2 + 30 // Move down slightly

      context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(img, 0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio)
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)
    images[0].onload = render

    const st = gsap.to(frames, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom', /* Starts animation as soon as the top of About section enters the bottom of the screen */
        end: 'bottom bottom',
        scrub: true,
      },
      onUpdate: render
    })

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      st.kill()
    }
  }, [])

  /* Line path IDs for pulse animateMotion */
  const pathIds = ecoNodes.map(n => `eco-path-${n.id}`)

  return (
    <section id="about" className="about-section" ref={sectionRef}>

      <div className="about-sticky-wrapper">
        <div className="about-top-badge-container">
          <div className="about-badge">
            <div className="about-badge-dot"></div>
            ABOUT HACKX
          </div>
        </div>

        <div className="about-showcase-card" ref={cardRef}>

          {/* ── Internal Card Backgrounds ── */}
          <div className="showcase-bg-gate" />
          <div className="showcase-bg-grid" />
          <div className="showcase-ambient" />
          <canvas ref={canvasRef} className="showcase-canvas" />

          <div className="showcase-content">

            {/* ══════════ LEFT: Typography ══════════ */}
            <div className="showcase-left">
              <motion.h2 className="about-heading"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.15 }}>
                <span className="ah-white">WHAT IS</span>
                <span className="ah-hackx-row">
                  <span className="ah-cyan">hackX</span>
                  <span className="ah-version">11.0</span>
                </span>
              </motion.h2>

              <motion.p className="about-description"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3 }}>
                hackX 11.0 is the flagship innovation and entrepreneurship challenge organized by
                IMSSA. It brings together universities, mentors, startups, and industry leaders to
                transform innovative ideas into real-world impact through a structured journey of
                collaboration, creation, and competition.
              </motion.p>

              {/* ── Innovation Glass Card ── */}
              <motion.div className="about-glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.45 }}>
                <img src="/hackx-logo.webp" alt="hackX" className="about-glass-logo" />
                <div className="about-glass-title">THE HOME OF INNOVATION</div>
                <div className="about-glass-subtitle">2016 - 2026</div>

                <div className="about-glass-divider" />

                <div className="about-glass-inner-card">
                  <div className="about-glass-inner-header">
                    <div className="about-glass-inner-badge">11</div>
                    <div className="about-glass-inner-title">Eleventh Edition</div>
                  </div>
                  <div className="about-glass-inner-desc">
                    Marking a new era of impact with the theme "Innovate. Elevate. Transform."
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ══════════ RIGHT: Holographic Blueprint ══════════ */}
            <div className="showcase-right">

              {/* Micro corner details */}
              <div className="about-corner tl"><span>COORD // 14.59.12</span><br /><span>ATLANTIS ONLINE</span></div>
              <div className="about-corner br"><span>INIT_SEQ 0x4F</span><br /><span>SYS NOMINAL</span></div>

              {/* ── SVG Blueprint Canvas ── */}
              <svg
                className="blueprint-svg"
                viewBox="0 0 400 680"
                xmlns="http://www.w3.org/2000/svg"
                onMouseMove={(e) => {
                  if (tooltipRef.current && activeHover) {
                    tooltipRef.current.style.left = `${e.clientX}px`
                    tooltipRef.current.style.top = `${e.clientY - tooltipRef.current.offsetHeight - 20}px`
                    tooltipRef.current.style.opacity = 1
                  }
                }}
              >
                <defs>
                  {/* Glow filter */}
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="glow-soft" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Path refs for pulse animation */}
                  {ecoNodes.map(n => {
                    const pos = polar(n.angle, n.dist)
                    return <path key={n.id} id={`eco-path-${n.id}`}
                      d={`M ${pos.x} ${pos.y} L 200 200`} fill="none" />
                  })}
                  <path id="journey-path" d="M 200 270 L 200 570" fill="none" />
                </defs>

                {/* ─── Ecosystem Lines (draw on view) ─── */}
                {ecoNodes.map((n, i) => {
                  const pos = polar(n.angle, n.dist)
                  return (
                    <motion.line key={n.id}
                      x1={pos.x} y1={pos.y} x2="200" y2="200"
                      stroke="#00E5FF" strokeWidth="1"
                      strokeDasharray="4 4"
                      style={{ filter: 'drop-shadow(0 0 4px rgba(0,229,255,0.5))' }}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
                      transition={{ duration: 1, delay: 0.8 + i * 0.12 }}
                    />
                  )
                })}

                {/* ─── Journey Flow Line (downward) ─── */}
                <motion.line
                  x1="200" y1="260" x2="200" y2="575"
                  stroke="#00E5FF" strokeWidth="1.5"
                  style={{ filter: 'drop-shadow(0 0 6px rgba(0,229,255,0.6))' }}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 0.7 } : {}}
                  transition={{ duration: 1.5, delay: 1.8 }}
                />

                {/* ─── Ecosystem Nodes ─── */}
                {isInView && ecoNodes.map((n, i) => (
                  <EcoNode key={n.id} node={n} delay={1.2 + i * 0.15} setHover={setActiveHover} />
                ))}

                {/* ─── HackX 11.0 Core ─── */}
                <g
                  onMouseEnter={(e) => setActiveHover({ text: 'The central hub connecting all ecosystem layers.', x: e.clientX, y: e.clientY })}
                  onMouseLeave={() => setActiveHover(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Invisible hitbox */}
                  <circle cx="200" cy="200" r="70" fill="transparent" pointerEvents="all" />
                  {/* Outer pulse rings */}
                  {[70, 55, 42].map((r, i) => (
                    <motion.circle key={i} cx="200" cy="200" r={r}
                      fill="none"
                      stroke="rgba(0,229,255,0.25)"
                      strokeWidth={i === 0 ? 0.5 : 1}
                      strokeDasharray={i === 1 ? '3 5' : 'none'}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={isInView ? {
                        scale: [1, 1.04, 1],
                        opacity: [0.2, 0.5, 0.2],
                      } : { scale: 0, opacity: 0 }}
                      transition={{
                        delay: 0.3 + i * 0.1,
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        scale: { duration: 3, repeat: Infinity },
                        opacity: { duration: 3, repeat: Infinity }
                      }}
                    />
                  ))}

                  {/* Core circle */}
                  <motion.circle cx="200" cy="200" r="28"
                    fill="rgba(0,229,255,0.1)"
                    stroke="#00E5FF"
                    strokeWidth="2"
                    filter="url(#glow)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.4, type: 'spring', stiffness: 150 }}
                  />
                  <motion.circle cx="200" cy="200" r="10"
                    fill="#00E5FF"
                    filter="url(#glow)"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.55 }}
                  />

                  {/* Core label */}
                  <motion.text x="200" y="245" textAnchor="middle"
                    fill="#FFFFFF" fontSize="11" fontFamily="Space Grotesk, sans-serif"
                    fontWeight="700" letterSpacing="2"
                    filter="url(#glow-soft)"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.9 }}
                  >
                    hackX 11.0
                  </motion.text>
                </g>

                {/* ─── Energy Pulses toward core ─── */}
                {isInView && ecoNodes.map((n, i) => (
                  <Pulse key={n.id} d={`eco-path-${n.id}`} delay={1.8 + i * 0.4} />
                ))}

                {/* ─── Journey Steps ─── */}
                {journeySteps.map((step, i) => {
                  const y = 300 + i * 90
                  const isLast = i === journeySteps.length - 1
                  return (
                    <motion.g key={step.label}
                      initial={{ opacity: 0, y: 15 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 2.2 + i * 0.25 }}
                      onMouseEnter={(e) => setActiveHover({ text: step.hoverDesc, x: e.clientX, y: e.clientY })}
                      onMouseLeave={() => setActiveHover(null)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Hitbox */}
                      <circle cx="200" cy={y} r="30" fill="transparent" pointerEvents="all" />
                      {/* Arrow indicator */}
                      {i > 0 && (
                        <text x="200" y={y - 18} textAnchor="middle"
                          fill="rgba(0,229,255,0.5)" fontSize="10">▼</text>
                      )}
                      {/* Circle node */}
                      <circle cx="200" cy={y} r="20"
                        fill="rgba(0,229,255,0.07)"
                        stroke={isLast ? '#00E5FF' : 'rgba(0,229,255,0.4)'}
                        strokeWidth={isLast ? 2 : 1}
                        filter={isLast ? 'url(#glow-soft)' : ''}
                      />
                      <circle cx="200" cy={y} r="6"
                        fill={isLast ? '#00E5FF' : 'rgba(0,229,255,0.5)'}
                        filter={isLast ? 'url(#glow)' : ''}
                      />
                      {/* Step label */}
                      <text x="200" y={y + 36} textAnchor="middle"
                        fill={isLast ? '#00E5FF' : 'rgba(255,255,255,0.8)'}
                        fontSize="10" fontFamily="Space Mono, monospace"
                        fontWeight="700" letterSpacing="2"
                        filter={isLast ? 'url(#glow-soft)' : ''}
                      >
                        {step.label}
                      </text>
                      {/* Sub-description */}
                      <text x="200" y={y + 48} textAnchor="middle"
                        fill="rgba(255,255,255,0.3)" fontSize="7.5"
                        fontFamily="Space Mono, monospace" letterSpacing="0.5">
                        {step.desc}
                      </text>
                    </motion.g>
                  )
                })}

                {/* Journey energy pulse flowing downward */}
                {isInView && (
                  <motion.circle r="3" fill="#FFFFFF"
                    style={{ filter: 'drop-shadow(0 0 8px #00E5FF)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 2.8 }}
                  >
                    <animateMotion dur="3s" repeatCount="indefinite" begin="2.8s">
                      <mpath href="#journey-path" />
                    </animateMotion>
                  </motion.circle>
                )}

                {/* Corner tick marks */}
                <line x1="10" y1="10" x2="30" y2="10" stroke="rgba(0,229,255,0.3)" strokeWidth="1" />
                <line x1="10" y1="10" x2="10" y2="30" stroke="rgba(0,229,255,0.3)" strokeWidth="1" />
                <line x1="390" y1="10" x2="370" y2="10" stroke="rgba(0,229,255,0.3)" strokeWidth="1" />
                <line x1="390" y1="10" x2="390" y2="30" stroke="rgba(0,229,255,0.3)" strokeWidth="1" />
                <line x1="10" y1="670" x2="30" y2="670" stroke="rgba(0,229,255,0.3)" strokeWidth="1" />
                <line x1="10" y1="670" x2="10" y2="650" stroke="rgba(0,229,255,0.3)" strokeWidth="1" />
                <line x1="390" y1="670" x2="370" y2="670" stroke="rgba(0,229,255,0.3)" strokeWidth="1" />
                <line x1="390" y1="670" x2="390" y2="650" stroke="rgba(0,229,255,0.3)" strokeWidth="1" />
              </svg>
            </div>

          </div>
        </div>
      </div>

      {/* ── Sci-Fi Blueprint Tooltip ── */}
      {activeHover && createPortal(
        <div ref={tooltipRef} className="blueprint-tooltip" style={{ opacity: 0 }}>
          <div className="blueprint-tooltip-text">{activeHover.text}</div>
          <svg className="blueprint-tooltip-svg" width="200" height="30">
            <line x1="20" y1="5" x2="200" y2="5" stroke="rgba(0,229,255,0.6)" strokeWidth="1" />
            <line x1="20" y1="5" x2="0" y2="25" stroke="rgba(0,229,255,0.6)" strokeWidth="1" />
          </svg>
        </div>,
        document.body
      )}

    </section>
  )
}
