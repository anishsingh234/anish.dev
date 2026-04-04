'use client';
import { useRef, useEffect } from 'react';
import './BlobCursor.css';

const SPEEDS       = [0.03, 0.07, 0.16];
const IDLE_SIZES   = [520, 300, 110];
const ACTIVE_SIZES = [400, 200, 75];

export default function BlobCursor({
  fillColor       = '#e8b84b',
  initialXPercent = 0.72,
  initialYPercent = 0.5,
}) {
  const containerRef = useRef(null);
  const blobsRef     = useRef([]);
  const posRef       = useRef([{ x:0,y:0 },{ x:0,y:0 },{ x:0,y:0 }]);
  const targetRef    = useRef({ x:0, y:0 });
  const isIdleRef    = useRef(true);
  const idleTimer    = useRef(null);
  const rafRef       = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const setSize = (i, px) => {
      const b = blobsRef.current[i];
      if (!b) return;
      b.style.width  = px + 'px';
      b.style.height = px + 'px';
    };

    const goIdle = () => {
      isIdleRef.current = true;
      IDLE_SIZES.forEach((s, i) => setSize(i, s));
    };

    const goActive = () => {
      isIdleRef.current = false;
      ACTIVE_SIZES.forEach((s, i) => setSize(i, s));
    };

    /* init */
    const initX = container.offsetWidth  * initialXPercent;
    const initY = container.offsetHeight * initialYPercent;
    posRef.current.forEach(p => { p.x = initX; p.y = initY; });
    targetRef.current = { x: initX, y: initY };
    goIdle();

    /* RAF loop */
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
          /* blob[2] = smallest = leads cursor
             blob[1] = medium   = follows blob[2]
             blob[0] = biggest  = follows blob[1]   */
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

    /* events — window level so custom cursor doesn't block */
    const onMove = (e) => {
      const rect    = container.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const inside =
        clientX >= rect.left && clientX <= rect.right &&
        clientY >= rect.top  && clientY <= rect.bottom;

      if (!inside) { clearTimeout(idleTimer.current); goIdle(); return; }

      targetRef.current = { x: clientX - rect.left, y: clientY - rect.top };
      if (isIdleRef.current) goActive();
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(goIdle, 1800);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(idleTimer.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
    };
  }, [initialXPercent, initialYPercent]);

  return (
    <div ref={containerRef} className="blob-cursor-container">
      <svg style={{ position:'absolute', width:0, height:0 }}>
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
              opacity: i === 0 ? 1 : i === 1 ? 0.2: 0.32,
            }}
          />
        ))}
      </div>
    </div>
  );
}