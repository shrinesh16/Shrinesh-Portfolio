import { useRef, useState, useEffect, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'framer-motion';

// ─── DATA ────────────────────────────────────────────────────────────────────

const skillsData = [
  {
    title: "Languages",
    description: "Building the foundation — from systems-level performance to high-level scripting, these are the languages I think and ship in.",
    stats: [
      { value: "20+", label: "projects built" },
      { value: "100+", label: "github commits" }
    ],
    items: [
      "JavaScript",
      "TypeScript",
      "Python",
      "C",
      "Java",
      "Go"
    ]
  },
  {
    title: "Frameworks",
    description: "Modern abstractions that let me move fast — from reactive frontends to high-performance APIs and ML pipelines.",
    stats: [
      { value: "12+", label: "frameworks used" },
    ],
    items: [
      "React",
      "Next.js",
      "FastAPI",
      "Pytorch",
      "Express",
      "React Native",
      "Framer Motion",
      "TailwindCSS"
    ]
  },
  {
    title: "Tools",
    description: "The right tools make the difference between a good project and a great one. These power my workflows end-to-end.",
    stats: [
      { value: "3+", label: "years learning" },
    ],
    items: [
      "Git",
      "Docker",
      "AWS",
      "Linux",
      "Vite",
      "Figma",
      "Postman",
      "MongoDB",
      "PostgreSQL",
    ]
  }
];

const allItems = skillsData.flatMap((section, sIdx) =>
  section.items.map((item, idx) => ({
    name: item,
    sectionIndex: sIdx,
    isFirst: idx === 0
  }))
);

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const ITEM_HEIGHT = 72; // px per item slot
const PIXELS_PER_ITEM = 90; // scroll pixels consumed per item
const MAX_PIXELS = (allItems.length - 1) * PIXELS_PER_ITEM;
const LERP_FACTOR = 0.08; // smoothing — lower = silkier, higher = snappier
const UNLOCK_DELAY = 200; // ms to wait after boundary hit before unlocking

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

function SkillsSection() {
  const sectionRef = useRef(null);
  const rightColumnRef = useRef(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const [isHovered, setIsHovered] = useState(false);
  const autoScrollDirection = useRef(1);

  // ── Animation engine ──────────────────────────────────────────────────────
  // Raw accumulator tracks exact scroll position (set instantly on input)
  const scrollAccumulator = useMotionValue(0);

  // Spring smooths it for buttery visual output
  const smoothScroll = useSpring(scrollAccumulator, {
    stiffness: 80,
    damping: 24,
    mass: 0.8,
  });

  // Normalized item index (0 → allItems.length - 1)
  const activeIndexFloat = useTransform(smoothScroll, v => v / PIXELS_PER_ITEM);

  // List Y translation
  const listTranslateY = useTransform(activeIndexFloat, v => -(v * ITEM_HEIGHT));

  // Radial glow opacity tied to progress
  const glowOpacity = useTransform(smoothScroll, [0, MAX_PIXELS * 0.5, MAX_PIXELS], [0.15, 0.35, 0.15]);

  // ── Sync left-column category on index change ─────────────────────────────
  useEffect(() => {
    return activeIndexFloat.on('change', latest => {
      const idx = Math.round(latest);
      const clamped = Math.max(0, Math.min(allItems.length - 1, idx));
      const section = allItems[clamped]?.sectionIndex ?? 0;
      setCurrentSectionIndex(prev => (prev !== section ? section : prev));
    });
  }, [activeIndexFloat]);

  // ── Auto-Scrolling (when not hovered) ─────────────────────────────────────
  useAnimationFrame((time, delta) => {
    if (isHovered) return;

    const current = scrollAccumulator.get();
    const speed = 0.065; // Adjust speed: pixels per ms
    let next = current + (autoScrollDirection.current * speed * delta);

    if (next >= MAX_PIXELS) {
      next = MAX_PIXELS;
      autoScrollDirection.current = -1; // Bounce up
    } else if (next <= 0) {
      next = 0;
      autoScrollDirection.current = 1; // Bounce down
    }

    scrollAccumulator.set(next);
  });

  // ── Hover-based Scroll Hijack (Right Column Only) ─────────────────────────
  useEffect(() => {
    const el = rightColumnRef.current;
    if (!el) return;

    const handleMovement = (deltaY, e) => {
      const current = scrollAccumulator.get();
      const next = current + deltaY;

      if (next < 0) {
        scrollAccumulator.set(0);
        return; // Let the page scroll normally
      }

      if (next > MAX_PIXELS) {
        scrollAccumulator.set(MAX_PIXELS);
        return; // Let the page scroll normally
      }

      e.preventDefault(); // Prevent page scroll, hijack for list
      scrollAccumulator.set(next);
    };

    const handleWheel = (e) => handleMovement(e.deltaY, e);

    let touchStartY = 0;
    const handleTouchStart = (e) => { touchStartY = e.touches[0].clientY; };
    const handleTouchMove = (e) => {
      const delta = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      handleMovement(delta * 1.5, e);
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
    };
  }, [scrollAccumulator]);

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', background: 'transparent', fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── Layer 2: Radial glow (tied to scroll progress) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)',
          opacity: glowOpacity,
          zIndex: 1,
        }}
      />

      {/* ── Layer 5: Content ── */}
      <div
        className="relative flex flex-col md:flex-row items-center w-full h-full mx-auto pt-16 md:pt-0"
        style={{ maxWidth: '1200px', zIndex: 10, padding: '0 24px' }}
      >
        {/* LEFT COLUMN */}
        <div className="flex-none md:flex-1 w-full md:w-auto h-[40%] md:h-full flex flex-col justify-center pr-0 md:pr-[60px] pb-4 md:pb-0">
          {/* Section label */}
          <span
            className="uppercase tracking-[3px] mb-4 block"
            style={{ color: '#555', fontSize: '12px', fontWeight: 500, fontFamily: "'JetBrains Mono', monospace" }}
          >
            Skills
          </span>

          <LeftContent currentSection={currentSectionIndex} />
        </div>

        {/* CENTER DIVIDER */}
        <div
          className="hidden md:block flex-shrink-0"
          style={{
            width: '1px',
            height: '55vh',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.12) 70%, transparent 100%)',
          }}
        />

        {/* RIGHT COLUMN */}
        <div 
          ref={rightColumnRef}
          className="flex-1 w-full relative flex items-center justify-center h-[60%] md:h-full cursor-ns-resize"
          style={{ 
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          {/* Tech list container */}
          <div className="relative h-full" style={{ width: '340px' }}>
            {/* Active indicator line */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                top: '50%',
                right: '-8px',
                width: '28px',
                height: '1.5px',
                background: 'rgba(255,255,255,0.5)',
                transform: 'translateY(-50%)',
                zIndex: 20,
                boxShadow: '0 0 8px rgba(255,255,255,0.2)',
              }}
            />

            {/* Scrolling list */}
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: `${ITEM_HEIGHT - 48}px`, // gap = ITEM_HEIGHT - item visual height
                width: '100%',
                y: listTranslateY,
                position: 'absolute',
                top: '50%',
                marginTop: '-24px', // half of item height
              }}
            >
              {allItems.map((item, i) => (
                <ListItem key={i} item={item} index={i} activeIndexFloat={activeIndexFloat} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Scroll progress indicator (bottom) ── */}
      <ScrollIndicator progress={activeIndexFloat} total={allItems.length} />
    </section>
  );
}

// ─── LEFT CONTENT ────────────────────────────────────────────────────────────

const LeftContent = memo(function LeftContent({ currentSection }) {
  const section = skillsData[currentSection];
  if (!section) return null;

  return (
    <div style={{ height: '340px', display: 'flex', flexDirection: 'column' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ flex: 1 }}
        >
          <h2
            style={{
              color: '#fff',
              fontSize: '54px',
              fontWeight: 700,
              marginBottom: '20px',
              letterSpacing: '-2px',
              lineHeight: 1.05,
            }}
          >
            {section.title}
          </h2>
          <p
            style={{
              color: '#666',
              fontSize: '15px',
              lineHeight: 1.7,
              maxWidth: '380px',
              fontWeight: 400,
            }}
          >
            {section.description}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Stats */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
          className="flex gap-12"
          style={{ marginTop: 'auto' }}
        >
          {section.stats.map((stat, idx) => (
            <div key={idx}>
              <div
                style={{
                  color: '#fff',
                  fontSize: '42px',
                  fontWeight: 700,
                  letterSpacing: '-1.5px',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  color: '#555',
                  fontSize: '12px',
                  marginTop: '6px',
                  fontWeight: 500,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

// ─── LIST ITEM ───────────────────────────────────────────────────────────────

const ListItem = memo(function ListItem({ item, index, activeIndexFloat }) {
  const diff = useTransform(activeIndexFloat, v => index - v);
  const absDiff = useTransform(diff, d => Math.abs(d));

  // Diagonal fan-out for upcoming items
  const x = useTransform(diff, d => Math.max(0, d) * 35);

  // Opacity: active = 1, adjacent = faded, distant = very dim
  const opacity = useTransform(absDiff, [0, 0.3, 1, 2.5, 5], [1, 1, 0.35, 0.12, 0.04]);

  // Scale: active = full, others shrink
  const scale = useTransform(absDiff, [0, 0.5, 2], [1, 0.95, 0.85]);

  // Subtle blur on distant items
  const blur = useTransform(absDiff, [0, 1, 3], [0, 0, 2]);
  const filterVal = useTransform(blur, v => `blur(${v}px)`);

  // Active glow
  const textShadow = useTransform(absDiff, [0, 0.5, 1.5], [
    '0 0 20px rgba(255,255,255,0.25)',
    '0 0 8px rgba(255,255,255,0.1)',
    '0 0 0px rgba(255,255,255,0)',
  ]);

  return (
    <motion.div
      style={{
        position: 'relative',
        opacity,
        scale,
        x,
        filter: filterVal,
        transformOrigin: 'right center',
        height: '48px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: '24px',
      }}
    >
      <motion.span
        style={{
          fontSize: '30px',
          fontWeight: 600,
          letterSpacing: '-0.5px',
          color: '#fff',
          textShadow,
          willChange: 'transform, opacity',
        }}
      >
        {item.name}
      </motion.span>

      {/* Section divider line between categories */}
      {item.isFirst && item.sectionIndex > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '-12px',
            right: '0',
            width: '160px',
            height: '1px',
            background: 'linear-gradient(to left, rgba(255,255,255,0.15), transparent)',
          }}
        />
      )}
    </motion.div>
  );
});

// ─── SCROLL INDICATOR (bottom dots) ──────────────────────────────────────────

const ScrollIndicator = memo(function ScrollIndicator({ progress, total }) {
  const progressPct = useTransform(progress, [0, total - 1], [0, 100]);

  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      style={{ bottom: '32px', zIndex: 20 }}
    >
      {/* Progress bar */}
      <div
        style={{
          width: '40px',
          height: '2px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '1px',
          overflow: 'hidden',
        }}
      >
        <motion.div
          style={{
            height: '100%',
            background: 'rgba(255,255,255,0.5)',
            borderRadius: '1px',
            width: useTransform(progressPct, v => `${v}%`),
          }}
        />
      </div>

      {/* Label */}
      <span
        style={{
          color: '#444',
          fontSize: '10px',
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}
      >
        scroll
      </span>
    </div>
  );
});

export default memo(SkillsSection);
