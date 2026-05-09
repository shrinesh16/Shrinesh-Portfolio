import Resume from './Resume'
import Typewriter from './Typewriter'
import Lanyard from './components/ui/lanyard'
import SocialDock from './components/SocialDock'
import SkillsSection from './components/SkillsSection'
import { useState, useEffect } from 'react'

// ─── PARTICLES ───────────────────────────────────────────────────────────────

const particles = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  duration: `${12 + Math.random() * 20}s`,
  delay: `${Math.random() * -20}s`,
  size: `${1 + Math.random() * 1.5}px`,
  opacity: 0.15 + Math.random() * 0.4,
}));

export default function App() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const titlePosition = {
    top: '24px',
    left: '32px',
    transform: 'none',
    align: 'left',
  }

  return (
    <div style={{ width: '100%', minHeight: '200vh', position: 'relative' }}>
      {/* 👆 minHeight creates scroll space */}

      {/* TOP RIGHT HEADER (Location, Time, Resume) */}
      <div 
        className="fixed top-4 right-4 md:top-8 md:right-10 flex flex-col items-end md:flex-row md:items-center gap-1 md:gap-4 z-[100] bg-black/40 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-2 md:p-0 rounded-lg"
        style={{
          color: '#e0e0e0',
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: '15px',
          fontWeight: '400',
          letterSpacing: '0.3px',
        }}
      >
        <div className="flex items-center gap-2 md:gap-4">
          <span>Chennai, India</span>
          <span style={{ fontSize: '10px', color: '#888' }}>●</span>
          <span>{time}</span>
        </div>
        <div className="hidden md:block" style={{ width: '1px', height: '20px', backgroundColor: '#444' }} />
        <a
          href="https://drive.google.com/file/d/1abuaj9Zj0AEF-t7_aBkwXxI8NReOiBOv/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#fff',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.color = '#00ff33f0'}
          onMouseLeave={(e) => e.target.style.color = '#fff'}
        >
          Résumé
        </a>
      </div>

      {/* FIXED BACKGROUND */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#050505', pointerEvents: 'none', overflow: 'hidden' }}>
        <div className="skills-grain" />
        <div className="skills-scanlines" />
        {particles.map(p => (
          <div
            key={p.id}
            className="skills-particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      <SocialDock />

      {/* HERO SECTION (3D CARD & ABOUT) */}
      <div className="w-screen min-h-[100svh] relative flex flex-col md:flex-row items-center z-10 pt-[100px] md:pt-0">

        {/* BORDER */}
        <div
          className="fixed inset-[8px] md:inset-[14px] pointer-events-none box-border z-10"
          style={{ border: '1.5px solid #00ff33f0' }}
        />

        {/* TYPED TEXT ON LEFT SIDE */}
        <div
          className="absolute top-[30px] left-[16px] md:top-[24px] md:left-[32px] z-10 pointer-events-none"
          style={{
            color: '#00ff33f0',
            fontSize: '16px', // Smaller on mobile
            fontWeight: 700,
            letterSpacing: '0.5px',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          <Typewriter text={"Hi, it's SHRINESH!\nThe Developer"} delay={60} />
        </div>

        {/* LEFT SIDE: 3D LANYARD CARD */}
        <div className="w-full h-[55%] md:w-1/2 md:h-full relative z-[1]">
          <div className="absolute w-[150vw] h-full left-[-25vw] md:left-[-50vw] top-0">
            <Lanyard
              position={[0, 0, 13]}
              containerClassName="w-full h-full"
            />
          </div>
        </div>

        {/* RIGHT SIDE: ABOUT SECTION */}
        <div 
          className="w-full h-auto md:w-1/2 md:h-full flex flex-col justify-start md:justify-center px-6 md:pl-5 md:pr-20 z-[2] pb-12 md:pb-0"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <h2 className="text-[#00ff33f0] text-2xl md:text-[2.5rem] mb-4 md:mb-6 uppercase tracking-widest"
              style={{ textShadow: '0 0 10px #00ff3380' }}>
            About Me
          </h2>
          <p className="text-[#ccc] text-sm md:text-[1.1rem] leading-relaxed md:leading-[1.8] mb-5 md:mb-6"
             style={{ animation: 'fadeIn 2s ease-out' }}>
            <span style={{ color: '#00ff33f0', fontWeight: 'bold' }}>I'm a developer and I create stuff like AI.</span>
            <br /><br />
            Passionate about building intelligent systems and robust architectures, I bridge the gap between machine learning research and practical software engineering. From creating computer vision applications for industrial defect detection to scaling web services, I bring ideas to life using a modern technology stack.
          </p>
          <div className="flex flex-wrap gap-3 mt-2 md:mt-5">
            <div className="px-3 md:px-4 py-2 border border-[#00ff3340] text-[#00ff33a0] text-xs md:text-sm">Machine Learning</div>
            <div className="px-3 md:px-4 py-2 border border-[#00ff3340] text-[#00ff33a0] text-xs md:text-sm">Full-Stack Web</div>
            <div className="px-3 md:px-4 py-2 border border-[#00ff3340] text-[#00ff33a0] text-xs md:text-sm">Cloud Architecture</div>
          </div>
        </div>

      </div>

      {/* SKILLS SECTION (NEW) */}
      <SkillsSection />

      {/* SCROLL CONTENT */}
      <div
        style={{
          minHeight: '100vh',
          padding: '80px 32px 0 32px', // Removed bottom padding to let content sit lower
          background: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ width: '100%' }}>
          <Resume />
        </div>

        {/* FOOTER: SIGNATURE ON LEFT, GIF & BUTTONS ON RIGHT */}
        <div className="w-full mt-auto pt-16 pb-6 flex flex-col-reverse md:flex-row justify-between items-center md:items-end gap-10 md:gap-0">
          
          {/* LEFT SIDE: SIGNATURE */}
          <div className="md:ml-[60px]">
            <img
              src={`${import.meta.env.BASE_URL}signature.png`}
              alt="Signature"
              style={{
                width: '150px',
                height: 'auto',
                opacity: 0.9,
                filter: 'brightness(0) invert(1)', /* Turns any non-transparent pixel pure white */
              }}
            />
          </div>

          {/* RIGHT SIDE: GIF & BUTTONS */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <img
              src={`${import.meta.env.BASE_URL}animated_matrix.gif`}
              alt="Matrix Animation"
              style={{
                width: '190px',
                height: 'auto',
                opacity: 0.8,
              }}
            />
            
            {/* BUTTON ROW */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              {/* Résumé Button */}
              <a
                href="https://drive.google.com/file/d/1abuaj9Zj0AEF-t7_aBkwXxI8NReOiBOv/view?usp=sharing?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#000',
                  color: '#fff',
                  padding: '12px 28px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  textDecoration: 'none',
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: '16px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = 'rgba(0, 255, 51, 0.5)';
                  e.target.style.color = '#00ff33f0';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.color = '#fff';
                }}
              >
                Résumé
              </a>

              {/* Scroll to Top Button */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 255, 51, 0.5)';
                  e.currentTarget.style.color = '#00ff33f0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.color = '#fff';
                }}
                aria-label="Scroll to top"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="20" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
