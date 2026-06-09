import AdaptiveNavbar from './AdaptiveNavbar'
import HeroContent from './HeroContent'
import AtlantisVideo from './AtlantisVideo'
import HeroMascot from './HeroMascot'

/* ═══════════════════════════════════════════════════════════════
   HERO SECTION
   Full-screen cinematic — the visitor enters the Atlantis world.
   No frames, no boxes. Pure immersion.
   ═══════════════════════════════════════════════════════════════ */

export default function HeroSection() {
  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      <AtlantisVideo />
      <AdaptiveNavbar />
      <HeroContent />
      <HeroMascot />
      
      {/* Bottom Fade Transition to next section */}
      <div className="absolute bottom-0 left-0 w-full h-48 lg:h-64 bg-gradient-to-t from-abyss to-transparent z-20 pointer-events-none" />
    </section>
  )
}
