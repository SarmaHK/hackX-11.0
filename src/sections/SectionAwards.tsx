import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import IconChampion from '../components/icons/IconChampion'
import IconRunnerUp from '../components/icons/IconRunnerUp'
import IconSecondRunnerUp from '../components/icons/IconSecondRunnerUp'
import './awards.css'

gsap.registerPlugin(ScrollTrigger)

export default function SectionAwards() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const monumentRefs = useRef<(HTMLDivElement | null)[]>([])
  const particlesRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup initial states
      gsap.set(titleRef.current, { opacity: 0, y: 50 })
      gsap.set(monumentRefs.current, { opacity: 0, y: 150 })
      gsap.set('.monument-content', { opacity: 0 })

      // Main Entrance Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'center center',
          toggleActions: 'play none none reverse',
        }
      })

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .to(monumentRefs.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power4.out'
      }, '-=0.5')
      .to('.monument-content', {
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      }, '-=0.4')

      // Floating Particles Animation
      if (particlesRef.current) {
        const particles = particlesRef.current.children
        gsap.to(particles, {
          y: () => -window.innerHeight * 1.5,
          x: 'random(-50, 50)',
          opacity: 0,
          duration: 'random(5, 15)',
          repeat: -1,
          stagger: {
            each: 0.2,
            repeat: -1
          },
          ease: 'none',
        })
      }
    }, containerRef)

    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75 // Slightly faster than 0.5
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              videoRef.current?.play().catch(e => console.error("Video play failed", e))
            } else {
              videoRef.current?.pause()
            }
          })
        },
        { threshold: 0.1 }
      )
      
      if (containerRef.current) {
        observer.observe(containerRef.current)
      }
      
      return () => {
        ctx.revert()
        observer.disconnect()
      }
    }

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="awards-section" id="awards">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="awards-video-bg"
      >
        <source src="/assets/treasure.mp4" type="video/mp4" />
      </video>
      
      {/* Cinematic Overlay */}
      <div className="awards-overlay" />

      {/* Ambient Particles */}
      <div className="ambient-particles" ref={particlesRef}>
        {[...Array(30)].map((_, i) => (
          <div 
            key={i} 
            className="ambient-particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              bottom: `${-Math.random() * 20}%`,
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="awards-content">
        <h2 className="awards-title" ref={titleRef}>
          AWARDS
        </h2>

        <div className="monuments-container">
          {/* Left Runner-Up */}
          <div 
            className="awards-monument runner-up-monument"
            ref={(el) => { monumentRefs.current[0] = el }}
          >
            <div className="monument-content">
              <div className="relic-container runner-up-relic">
                <IconRunnerUp className="relic-icon custom-relic-svg" />
              </div>
              <div className="monument-place">2nd Place</div>
              <h3 className="monument-title">Runner-Up</h3>
              <div className="monument-prize">Rs. 50,000</div>
            </div>
          </div>

          {/* Champion */}
          <div 
            className="awards-monument champion-monument"
            ref={(el) => { monumentRefs.current[1] = el }}
          >
            <div className="monument-content">
              <div className="relic-container champion-relic">
                <IconChampion className="relic-icon custom-relic-svg" />
              </div>
              <div className="monument-place">1st Place</div>
              <h3 className="monument-title">Champion</h3>
              <div className="monument-prize">Rs. 100,000</div>
            </div>
          </div>

          {/* Right Runner-Up */}
          <div 
            className="awards-monument runner-up-monument"
            ref={(el) => { monumentRefs.current[2] = el }}
          >
            <div className="monument-content">
              <div className="relic-container runner-up-relic">
                <IconSecondRunnerUp className="relic-icon custom-relic-svg" />
              </div>
              <div className="monument-place">3rd Place</div>
              <h3 className="monument-title">Runner-Up</h3>
              <div className="monument-prize">Rs. 30,000</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
