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
    </section>
  )
}
