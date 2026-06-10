import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

/* ── Social SVG Icons ── */
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);

export default function SectionFooter() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [-30, 0]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const [bubbles] = useState(() =>
    Array.from({ length: 15 }).map(() => ({
      left: `${Math.random() * 100}%`,
      bottom: `${Math.random() * -10}%`,
      size: `${Math.random() * 5 + 3}px`,
      dur: `${Math.random() * 5 + 6}s`,
      del: `${Math.random() * 6}s`,
    }))
  );

  return (
    <footer ref={sectionRef} id="footer" className="footer-cinematic">
      {/* ── BG Image ── */}
      <motion.div className="footer-bg-wrap" style={{ y: bgY }}>
        <img src="/assets/Footer.png" alt="" className="footer-bg-img" />
      </motion.div>

      {/* ── Static Overlays ── */}
      <div className="footer-overlay-top" />
      <div className="footer-overlay-bottom" />

      {/* ── God Rays ── */}
      <div className="footer-rays">
        <div className="god-ray" style={{ left: '12%', width: '130px', animationDuration: '8s' }} />
        <div className="god-ray" style={{ left: '38%', width: '180px', animationDuration: '10s', animationDelay: '2s' }} />
        <div className="god-ray" style={{ left: '65%', width: '150px', animationDuration: '9s', animationDelay: '1s' }} />
        <div className="god-ray" style={{ left: '85%', width: '100px', animationDuration: '7s', animationDelay: '3s' }} />
      </div>

      {/* ── Bubbles ── */}
      <div className="footer-bubbles">
        {bubbles.map((b, i) => (
          <div key={i} className="rising-bubble" style={{ left: b.left, bottom: b.bottom, width: b.size, height: b.size, animationDuration: b.dur, animationDelay: b.del }} />
        ))}
      </div>

      {/* ── Content ── */}
      <div className="footer-content">
        <div className="footer-grid">

          {/* Col 1 — Brand */}
          <div className="footer-col footer-brand">
            <img src="/hackx-logo.webp" alt="HackX 11.0" className="footer-logo" />
            <p className="footer-desc">
              Inter-University Startup Challenge for all undergraduates of universities in Sri Lanka. Premier event of the Department of Industrial Management, University of Kelaniya.
            </p>
            <div className="footer-org-logos">
              <img src="/assets/department logos.webp" alt="Department Logos" />
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <nav className="footer-links">
              {['Home', 'About', 'Timeline', 'Contact'].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="footer-link">
                  <span className="footer-link-arrow">›</span>
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 3 — Contact */}
          <div className="footer-col">
            <h4 className="footer-heading">Contact Us</h4>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Department of Industrial Management,<br/>University of Kelaniya</span>
              </div>
              <a href="mailto:hackxuok@gmail.com" className="footer-contact-item footer-contact-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <span>hackxuok@gmail.com</span>
              </a>
              <a href="tel:+94112903282" className="footer-contact-item footer-contact-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>+94 11 290 3282</span>
              </a>
            </div>
          </div>

          {/* Col 4 — Social */}
          <div className="footer-col">
            <h4 className="footer-heading">Connect With Us</h4>
            <div className="footer-socials">
              <a href="#" className="footer-social-icon"><FacebookIcon /></a>
              <a href="#" className="footer-social-icon"><InstagramIcon /></a>
              <a href="#" className="footer-social-icon"><YoutubeIcon /></a>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="footer-bottom-wrapper">
        <div className="footer-bottom">
          <p>Organized by The Industrial Management Science Students' Association</p>
          <p>© ideasprint 2026. All rights reserved.</p>
          <button onClick={scrollToTop} aria-label="Scroll to top" className="footer-scroll-top">
            <ChevronUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}
