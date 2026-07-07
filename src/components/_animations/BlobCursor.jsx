'use client';
import { useRef, useEffect, useCallback } from 'react';
import './BlobCursor.css';

// Base sizes designed for ~1440px wide screens
const IDLE_SIZES_BASE   = [300, 100, 100];
const ACTIVE_SIZES_BASE =  [300, 100, 100];
const SPEEDS            = [0.03, 0.07, 0.16];

// Clamp blob sizes relative to the container's shortest side
function getResponsiveSizes(container, baseSizes) {
  const shortSide = Math.min(container.offsetWidth, container.offsetHeight);
  // Scale factor: 1.0 at 800px short-side, clamped between 0.35 and 1.0
  const scale = Math.min(1, Math.max(0.35, shortSide / 800));
  return baseSizes.map((s) => Math.round(s * scale));
}

export default function BlobCursor({
  fillColor       = '#683387',
  initialXPercent = 0.72,
  initialYPercent = 0.5,
}) {
  const containerRef = useRef(null);
  const blobsRef     = useRef([]);
  const posRef       = useRef([{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }]);
  const targetRef    = useRef({ x: 0, y: 0 });
  const isIdleRef    = useRef(true);
  const idleTimer    = useRef(null);
  const rafRef       = useRef(null);

  // Memoised helpers so resize handler can call them without stale closures
  const setSize = useCallback((i, px) => {
    const b = blobsRef.current[i];
    if (!b) return;
    b.style.width  = px + 'px';
    b.style.height = px + 'px';
  }, []);

  const goIdle = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    isIdleRef.current = true;
    getResponsiveSizes(container, IDLE_SIZES_BASE).forEach((s, i) => setSize(i, s));
  }, [setSize]);

  const goActive = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    isIdleRef.current = false;
    getResponsiveSizes(container, ACTIVE_SIZES_BASE).forEach((s, i) => setSize(i, s));
  }, [setSize]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /* ── init ── */
    const initX = container.offsetWidth  * initialXPercent;
    const initY = container.offsetHeight * initialYPercent;
    posRef.current.forEach((p) => { p.x = initX; p.y = initY; });
    targetRef.current = { x: initX, y: initY };
    goIdle();

    /* ── RAF loop ── */
    const tick = () => {
      const pos    = posRef.current;
      const target = targetRef.current;
      const cx     = container.offsetWidth  * initialXPercent;
      const cy     = container.offsetHeight * initialYPercent;

      if (isIdleRef.current) {
        pos.forEach((p, i) => {
          p.x += (cx - p.x) * 0.032;
          p.y += (cy - p.y) * 0.032;
          const b = blobsRef.current[i];
          if (b) { b.style.left = p.x + 'px'; b.style.top = p.y + 'px'; }
        });
      } else {
        pos.forEach((p, i) => {
          const src = i === 2 ? target : pos[i + 1];
          p.x += (src.x - p.x) * SPEEDS[i];
          p.y += (src.y - p.y) * SPEEDS[i];
          const b = blobsRef.current[i];
          if (b) { b.style.left = p.x + 'px'; b.style.top = p.y + 'px'; }
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    /* ── pointer events (window-level so cursor doesn't self-block) ── */
    const onMove = (e) => {
      const rect    = container.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const inside =
        clientX >= rect.left && clientX <= rect.right &&
        clientY >= rect.top  && clientY <= rect.bottom;

      if (!inside) {
        clearTimeout(idleTimer.current);
        goIdle();
        return;
      }

      targetRef.current = { x: clientX - rect.left, y: clientY - rect.top };
      if (isIdleRef.current) goActive();
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(goIdle, 1800);
    };

    /* ── resize: recalculate blob sizes & snap idle position ── */
    const onResize = () => {
      if (isIdleRef.current) {
        goIdle();
        // Snap blobs to new idle centre instantly so they don't drift from an
        // old off-screen position after a dramatic resize
        const cx = container.offsetWidth  * initialXPercent;
        const cy = container.offsetHeight * initialYPercent;
        posRef.current.forEach((p) => { p.x = cx; p.y = cy; });
        targetRef.current = { x: cx, y: cy };
      } else {
        goActive();
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('resize',    onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(idleTimer.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('resize',    onResize);
    };
  }, [initialXPercent, initialYPercent, goIdle, goActive]);

  return (
    <div ref={containerRef} className="blob-cursor-container">
      {/* Hidden SVG filter — zero layout cost */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="blob-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur" />
            <feColorMatrix
              in="blur"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -9"
            />
          </filter>
        </defs>
      </svg>

      <div className="blob-layer">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            ref={(el) => (blobsRef.current[i] = el)}
            className="blob-circle"
            style={{
              backgroundColor: fillColor,
              opacity: i === 0 ? 1 : i === 1 ? 0.8 : 0.93,
            }}
          />
        ))}
      </div>
    </div>
  );
}