import Resume from './Resume'
import Typewriter from './Typewriter'
import Lanyard from './components/ui/lanyard'
import SocialDock from './components/SocialDock'

export default function App() {

  const titlePosition = {
    top: '24px',
    left: '32px',
    transform: 'none',
    align: 'left',
  }

  return (
    <div style={{ width: '100%', minHeight: '200vh', position: 'relative' }}>
      {/* 👆 minHeight creates scroll space */}
      <SocialDock />

      {/* HERO SECTION (3D CARD & ABOUT) */}
      <div style={{ width: '100vw', height: '100vh', position: 'relative', display: 'flex', alignItems: 'center' }}>

        {/* BORDER */}
        <div
          style={{
            position: 'fixed',
            inset: '14px',
            border: '1.5px solid #00ff33f0',
            zIndex: 10,
            pointerEvents: 'none',
            boxSizing: 'border-box',
          }}
        />

        {/* TYPED TEXT ON LEFT SIDE */}
        <div
          style={{
            position: 'fixed',
            top: titlePosition.top,
            left: titlePosition.left,
            transform: titlePosition.transform,
            textAlign: titlePosition.align,
            zIndex: 10,
            color: '#00ff33f0',
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '0.5px',
            fontFamily: "'JetBrains Mono', monospace",
            pointerEvents: 'none',
          }}
        >
          <Typewriter text={"Hi, it's SHRINESH!\nThe Developer"} delay={60} />
        </div>

        {/* LEFT SIDE: 3D LANYARD CARD */}
        <div style={{ width: '50%', height: '100%', position: 'relative', overflow: 'hidden' }}>
          <Lanyard
            position={[0, 0, 13]}
            containerClassName="w-full h-full"
          />
        </div>

        {/* RIGHT SIDE: ABOUT SECTION */}
        <div style={{
          width: '50%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 80px 0 20px',
          zIndex: 2,
          fontFamily: "'JetBrains Mono', monospace"
        }}>
          <h2 style={{
            color: '#00ff33f0',
            fontSize: '2.5rem',
            margin: '0 0 24px 0',
            textShadow: '0 0 10px #00ff3380',
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}>
            About Me
          </h2>
          <p style={{
            color: '#ccc',
            fontSize: '1.1rem',
            lineHeight: '1.8',
            margin: '0 0 20px 0',
            animation: 'fadeIn 2s ease-out',
          }}>
            <span style={{ color: '#00ff33f0', fontWeight: 'bold' }}>I'm a developer and I create stuff like AI.</span>
            <br /><br />
            Passionate about building intelligent systems and robust architectures, I bridge the gap between machine learning research and practical software engineering. From creating computer vision applications for industrial defect detection to scaling web services, I bring ideas to life using a modern technology stack.
          </p>
          <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
            <div style={{ padding: '8px 16px', border: '1px solid #00ff3340', color: '#00ff33a0', fontSize: '0.9rem' }}>Machine Learning</div>
            <div style={{ padding: '8px 16px', border: '1px solid #00ff3340', color: '#00ff33a0', fontSize: '0.9rem' }}>Full-Stack Web</div>
            <div style={{ padding: '8px 16px', border: '1px solid #00ff3340', color: '#00ff33a0', fontSize: '0.9rem' }}>Cloud Architecture</div>
          </div>
        </div>

      </div>

      {/* SCROLL CONTENT */}
      <div
        style={{
          minHeight: '100vh',
          padding: '80px 32px',
          background: '#000',
        }}
      >
        <Resume />
      </div>

    </div>
  )
}
