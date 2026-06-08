import { useEffect } from 'react'
import GlobalAmbientEffects from './components/GlobalAmbientEffects'
import HeroSection from './components/HeroSection'
import SectionLegacy from './sections/SectionLegacy'
import SectionAbout from './sections/SectionAbout'
import SectionWhyJoin from './sections/SectionWhyJoin'
import SectionTimeline from './sections/SectionTimeline'
import SectionContact from './sections/SectionContact'
import SectionFooter from './sections/SectionFooter'
import SectionAwards from './sections/SectionAwards'
import SectionFAQ from './sections/SectionFAQ'
/* ═══════════════════════════════════════════════════════════════
   hackX 11.0
   Main Application Component
   ═══════════════════════════════════════════════════════════════ */

/* ─── Mouse Parallax Hook ─── */
function useMouseParallax() {
  useEffect(() => {
    let tx = 0, ty = 0, cx = 0, cy = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2
      ty = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const tick = () => {
      const dx = tx - cx
      const dy = ty - cy
      
      if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) {
        cx += dx * 0.025
        cy += dy * 0.025
        document.documentElement.style.setProperty('--mx', cx.toFixed(4))
        document.documentElement.style.setProperty('--my', cy.toFixed(4))
      }
      
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])
}

/* ═══════════════════════════════════════
   APP
   ═══════════════════════════════════════ */

export default function App() {
  useMouseParallax()

  return (
    <div className="min-h-screen bg-abyss font-body overflow-x-hidden text-white selection:bg-cyan-accent/20">
      <GlobalAmbientEffects />
      <HeroSection />
      <SectionLegacy />
      <SectionAbout />
      <SectionWhyJoin />
      <SectionTimeline />
      <SectionAwards />
      <SectionContact />
      <SectionFAQ />
      <SectionFooter />
    </div>
  )
}
