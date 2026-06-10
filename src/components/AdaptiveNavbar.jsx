import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, Layers, Calendar, Star, HelpCircle } from 'lucide-react'

/* ═══════════════════════════════════════════════════════════════
   PREMIUM NAVBAR — hackX 11.0
   Triangle badge that expands into a navbar on hover.
   Shows active section name when scrolling.
   ═══════════════════════════════════════════════════════════════ */

const NAV_ITEMS = ['About', 'Tracks', 'Timeline', 'Sponsors', 'FAQ']

const sectionNames = {
  hero: 'hackX',
  about: 'About',
  timeline: 'Timeline',
  tracks: 'Tracks',
  guardians: 'Guardians',
  prizes: 'Treasures',
  sponsors: 'Sponsors',
  archives: 'Archives',
  faq: 'FAQ',
  register: 'Register'
}

const getIcon = (item) => {
  switch(item.toLowerCase()) {
    case 'about': return Info;
    case 'tracks': return Layers;
    case 'timeline': return Calendar;
    case 'sponsors': return Star;
    case 'faq': return HelpCircle;
    default: return Info;
  }
}

const ease = [0.16, 1, 0.3, 1]

export default function AdaptiveNavbar() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isHovered, setIsHovered] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showSectionText, setShowSectionText] = useState(false)

  useEffect(() => {
    if (activeSection === 'hero') {
      setShowSectionText(false)
      return
    }

    setShowSectionText(true)
    const timeout = setTimeout(() => {
      setShowSectionText(false)
    }, 800)

    return () => clearTimeout(timeout)
  }, [activeSection])

  useEffect(() => {
    // Scroll state for mobile navbar
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })

    // Intersection Observer for active section
    const observer = new IntersectionObserver((entries) => {
      // Find the intersecting entry with the highest intersection ratio
      let bestMatch = null;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!bestMatch || entry.intersectionRatio > bestMatch.intersectionRatio) {
            bestMatch = entry;
          }
        }
      });
      if (bestMatch) {
        setActiveSection(bestMatch.target.id);
      }
    }, {
      rootMargin: '-10% 0px -40% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    });

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(s => observer.observe(s));

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* ═══ Desktop / Tablet Navbar ═══ */}
      <header className="fixed top-0 left-1/2 -translate-x-1/2 z-50 hidden md:flex flex-col items-center w-full max-w-screen-2xl pointer-events-none px-4">
        <div
          className="relative pt-4 flex flex-col items-center pointer-events-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* ── Rectangle Badge ── */}
          <div className="triangle-wrapper cursor-pointer">
            <div className="triangle-badge">
              <div className="w-full h-full flex items-center justify-center pb-1">
                {(!showSectionText || activeSection === 'hero') ? (
                  <img
                    src="/hackx-logo.webp"
                    alt="hackX 11.0"
                    className="w-[65px] h-[65px] object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                  />
                ) : (
                  <span
                    className="text-white font-bold tracking-[0.2em] uppercase text-center pl-[0.2em]"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'rgba(255,255,255,0.95)' }}
                  >
                    {sectionNames[activeSection] || activeSection}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ── Expandable Navbar Pill ── */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="navbar-glass absolute overflow-hidden flex items-center justify-center w-[800px]"
                style={{ height: '64px', borderRadius: '24px', top: '75px' }}
              >
                <nav className="flex items-center gap-[80px] whitespace-nowrap min-w-max">
                  {NAV_ITEMS.map((item, i) => {
                    const isActive = activeSection.toLowerCase() === item.toLowerCase();
                    return (
                      <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        onClick={() => setIsHovered(false)}
                        className={`relative px-5 py-2.5 text-[15px] rounded-xl font-semibold transition-all duration-300 ${
                          isActive
                            ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                            : 'text-white/70 hover:text-white'
                          }`}
                      >
                        {item}
                      </a>
                    );
                  })}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ═══ Mobile Navbar ═══ */}
      <header className="fixed top-4 left-4 right-4 z-50 md:hidden">
        <motion.div
          className={`flex items-center justify-between px-4 py-3 transition-all duration-700 ${scrolled || menuOpen
            ? 'bg-[rgba(5,15,35,0.85)] border border-[rgba(255,255,255,0.12)]'
            : 'bg-[rgba(5,15,35,0.5)] border border-[rgba(255,255,255,0.08)]'
            } backdrop-blur-[20px] shadow-[0_8px_24px_rgba(0,0,0,0.3)]`}
          style={{ borderRadius: '18px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <a href="#" className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-xl border border-[rgba(0,229,255,0.15)] flex items-center justify-center bg-[rgba(5,15,35,0.6)]" style={{ boxShadow: '0 0 16px rgba(0,229,255,0.1)' }}>
              <img src="/hackx-logo.webp" alt="hackX" className="w-4 h-4 object-contain opacity-90" />
            </div>
            <span className="font-display font-semibold text-[15px] tracking-[0.04em] text-white" style={{ fontFamily: 'var(--font-display)' }}>
              {activeSection !== 'hero' ? (sectionNames[activeSection] || activeSection).toUpperCase() : 'hackX'}
            </span>
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.05] text-white/70 hover:text-white hover:bg-white/[0.1] transition-all duration-300"
            aria-label="Menu"
          >
            <div className="w-4 h-3 flex flex-col justify-between">
              <span className={`w-4 h-[1.5px] bg-current transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
              <span className={`w-2.5 h-[1.5px] bg-current transition-all duration-300 ${menuOpen ? 'opacity-0 scale-0' : ''}`} />
              <span className={`w-4 h-[1.5px] bg-current transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[5.5px]' : ''}`} />
            </div>
          </button>
        </motion.div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="absolute top-16 right-0 p-4 bg-white/[0.05] backdrop-blur-xl z-40 flex flex-col items-center border border-white/[0.15] shadow-[0_8px_32px_rgba(0,0,0,0.37)] w-[280px]"
              style={{ borderRadius: '24px' }}
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3, ease }}
            >
              <nav className="space-y-2 w-full relative z-30">
                {NAV_ITEMS.map((item, i) => {
                  const isActive = activeSection.toLowerCase() === item.toLowerCase();
                  const Icon = getIcon(item);
                  return (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setMenuOpen(false)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                        isActive 
                          ? 'bg-white text-neutral-900' 
                          : 'text-white hover:bg-white/20'
                      }`}
                      style={{ fontFamily: 'var(--font-body)' }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3, ease }}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item}</span>
                    </motion.a>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
