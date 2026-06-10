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
import SectionWhoCanCompete from './sections/SectionWhoCanCompete'
import SectionAmbassador from './sections/SectionAmbassador'
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

  const SHOW_MOBILE_UNDER_DEV = true; // Toggle this boolean to turn the mobile screen on or off

  return (
    <>
      {/* Mobile "Under Development" Screen */}
      {SHOW_MOBILE_UNDER_DEV && (
        <div className="md:hidden fixed inset-0 z-[99999] bg-[#010814] flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-2xl font-bold text-[#00E5FF] mb-4" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            MOBILE VERSION
          </h1>
          <p className="text-gray-400 max-w-sm tracking-wide">
            Under developing process...<br /><br />
            For the full immersive experience, please view this website on a desktop browser.
          </p>
        </div>
      )}

      {/* Main Desktop Application */}
      <div className={`${SHOW_MOBILE_UNDER_DEV ? 'hidden md:block' : 'block'} min-h-screen bg-abyss font-body overflow-x-hidden text-white selection:bg-cyan-accent/20`}>
        <GlobalAmbientEffects />
        <HeroSection />
        <SectionLegacy />
        <SectionAbout />
        <SectionWhyJoin />
        <SectionTimeline />
        <SectionAwards />
        <SectionWhoCanCompete />
        <SectionAmbassador />
        <SectionContact />
        <SectionFAQ />
        <SectionFooter />
      </div>
    </>
  )
}
