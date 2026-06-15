import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

/**
 * CustomCursor — A premium custom cursor with three states:
 *  1. DEFAULT  → small glowing dot + trailing outer ring
 *  2. TEXT     → morphs into a sleek vertical beam
 *  3. LINK     → expands into a pulsing crosshair / expand icon
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const beamRef = useRef(null);
  const crosshairRef = useRef(null);
  const requestRef = useRef(null);

  // Real-time mouse position (instant)
  const mouse = useRef({ x: -100, y: -100 });
  // Smoothed ring position (trailing)
  const ring = useRef({ x: -100, y: -100 });
  // Current cursor mode
  const mode = useRef('default'); // 'default' | 'text' | 'link'
  // Track visibility
  const visible = useRef(false);

  const setMode = useCallback((newMode) => {
    mode.current = newMode;
    const dot = dotRef.current;
    const ringEl = ringRef.current;
    const beam = beamRef.current;
    const cross = crosshairRef.current;
    if (!dot || !ringEl || !beam || !cross) return;

    if (newMode === 'default') {
      dot.style.opacity = '1';
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
      ringEl.style.width = '36px';
      ringEl.style.height = '36px';
      ringEl.style.borderColor = 'rgba(0, 255, 51, 0.35)';
      ringEl.style.opacity = '1';
      ringEl.style.borderRadius = '50%';
      beam.style.opacity = '0';
      beam.style.transform = 'translate(-50%, -50%) scaleY(0)';
      cross.style.opacity = '0';
      cross.style.transform = 'translate(-50%, -50%) scale(0) rotate(0deg)';
    } else if (newMode === 'text') {
      dot.style.opacity = '0';
      dot.style.transform = 'translate(-50%, -50%) scale(0)';
      ringEl.style.width = '4px';
      ringEl.style.height = '32px';
      ringEl.style.borderColor = 'rgba(0, 255, 51, 0.8)';
      ringEl.style.opacity = '1';
      ringEl.style.borderRadius = '2px';
      beam.style.opacity = '1';
      beam.style.transform = 'translate(-50%, -50%) scaleY(1)';
      cross.style.opacity = '0';
      cross.style.transform = 'translate(-50%, -50%) scale(0) rotate(0deg)';
    } else if (newMode === 'link') {
      dot.style.opacity = '0';
      dot.style.transform = 'translate(-50%, -50%) scale(0.3)';
      ringEl.style.width = '52px';
      ringEl.style.height = '52px';
      ringEl.style.borderColor = 'rgba(0, 255, 51, 0.5)';
      ringEl.style.opacity = '1';
      ringEl.style.borderRadius = '50%';
      beam.style.opacity = '0';
      beam.style.transform = 'translate(-50%, -50%) scaleY(0)';
      cross.style.opacity = '1';
      cross.style.transform = 'translate(-50%, -50%) scale(1) rotate(45deg)';
    }
  }, []);

  // Animation loop — smooth trailing
  const animate = useCallback(() => {
    const lerp = 0.15;
    ring.current.x += (mouse.current.x - ring.current.x) * lerp;
    ring.current.y += (mouse.current.y - ring.current.y) * lerp;

    const dot = dotRef.current;
    const ringEl = ringRef.current;
    const beam = beamRef.current;
    const cross = crosshairRef.current;

    if (dot) {
      dot.style.left = `${mouse.current.x}px`;
      dot.style.top = `${mouse.current.y}px`;
    }
    if (ringEl) {
      ringEl.style.left = `${ring.current.x}px`;
      ringEl.style.top = `${ring.current.y}px`;
    }
    if (beam) {
      beam.style.left = `${mouse.current.x}px`;
      beam.style.top = `${mouse.current.y}px`;
    }
    if (cross) {
      cross.style.left = `${ring.current.x}px`;
      cross.style.top = `${ring.current.y}px`;
    }

    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Hide on mobile / touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Show custom cursor, hide native
    document.body.style.cursor = 'none';

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!visible.current) {
        visible.current = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }
    };

    const onMouseLeave = () => {
      visible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
      if (beamRef.current) beamRef.current.style.opacity = '0';
      if (crosshairRef.current) crosshairRef.current.style.opacity = '0';
    };

    const onMouseEnter = () => {
      visible.current = true;
      setMode(mode.current);
    };

    // Detect element type under cursor
    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const tag = target.tagName?.toLowerCase();
      const isLink = tag === 'a' || tag === 'button' || target.closest('a') || target.closest('button');
      const isClickable = target.getAttribute('role') === 'button' ||
                          target.style?.cursor === 'pointer' ||
                          window.getComputedStyle(target).cursor === 'pointer';
      const isText = ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'label', 'blockquote'].includes(tag);
      const isInput = ['input', 'textarea', 'select'].includes(tag);

      if (isLink || isClickable) {
        setMode('link');
      } else if (isText || isInput) {
        setMode('text');
      } else {
        setMode('default');
      }
    };

    // Add cursor:none to all interactive elements
    const style = document.createElement('style');
    style.id = 'custom-cursor-override';
    style.textContent = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', onMouseOver, { passive: true });

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(requestRef.current);
      document.body.style.cursor = '';
      const styleEl = document.getElementById('custom-cursor-override');
      if (styleEl) styleEl.remove();
    };
  }, [animate, setMode]);

  return createPortal(
    <>
      {/* ─── DOT (inner, instant) ─── */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #00ff33 0%, #00ff3380 60%, transparent 100%)',
          boxShadow: '0 0 8px 2px rgba(0, 255, 51, 0.4), 0 0 20px 4px rgba(0, 255, 51, 0.15)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'opacity 0.2s ease, transform 0.2s ease, width 0.25s ease, height 0.25s ease',
          opacity: 0,
          mixBlendMode: 'screen',
        }}
      />

      {/* ─── RING (outer, trailing) ─── */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1.5px solid rgba(0, 255, 51, 0.35)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'width 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.3s ease, opacity 0.2s ease, border-radius 0.3s ease',
          opacity: 0,
          mixBlendMode: 'screen',
        }}
      />

      {/* ─── TEXT BEAM (appears on text hover) ─── */}
      <div
        ref={beamRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '2px',
          height: '24px',
          background: 'linear-gradient(to bottom, transparent 0%, #00ff33 20%, #00ff33 80%, transparent 100%)',
          boxShadow: '0 0 6px rgba(0, 255, 51, 0.5), 0 0 12px rgba(0, 255, 51, 0.2)',
          transform: 'translate(-50%, -50%) scaleY(0)',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'opacity 0.2s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
          opacity: 0,
          borderRadius: '1px',
        }}
      />

      {/* ─── CROSSHAIR (appears on links/buttons) ─── */}
      <div
        ref={crosshairRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '20px',
          height: '20px',
          transform: 'translate(-50%, -50%) scale(0) rotate(0deg)',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'opacity 0.2s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          opacity: 0,
        }}
      >
        {/* 4 arrows pointing outward */}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Top arrow */}
          <line x1="10" y1="0" x2="10" y2="6" stroke="#00ff33" strokeWidth="1.5" strokeLinecap="round" />
          <polyline points="7,3 10,0 13,3" fill="none" stroke="#00ff33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Bottom arrow */}
          <line x1="10" y1="14" x2="10" y2="20" stroke="#00ff33" strokeWidth="1.5" strokeLinecap="round" />
          <polyline points="7,17 10,20 13,17" fill="none" stroke="#00ff33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Left arrow */}
          <line x1="0" y1="10" x2="6" y2="10" stroke="#00ff33" strokeWidth="1.5" strokeLinecap="round" />
          <polyline points="3,7 0,10 3,13" fill="none" stroke="#00ff33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Right arrow */}
          <line x1="14" y1="10" x2="20" y2="10" stroke="#00ff33" strokeWidth="1.5" strokeLinecap="round" />
          <polyline points="17,7 20,10 17,13" fill="none" stroke="#00ff33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </>,
    document.body
  );
}
