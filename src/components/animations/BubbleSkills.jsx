'use client';
import { useEffect, useRef } from 'react';

// ── Skill categories with distinct color palettes ──────────────────────────
const SKILL_GROUPS = [
  { label: 'Languages',  hue: 195, skills: ['Python','JavaScript','TypeScript','C++','SQL','HTML5','CSS3'] },
  { label: 'Frontend',   hue: 160, skills: ['React.js','Next.js','Three.js','Tailwind CSS','React Native','Expo'] },
  { label: 'Backend',    hue: 230, skills: ['Node.js','Express.js','FastAPI','GraphQL','REST APIs'] },
  { label: 'AI / ML',    hue: 280, skills: ['LangChain','LLMs','RAG Systems','CrewAI','Pinecone','Hugging Face','Prompt Eng','Multi-Agent','Ollama'] },
  { label: 'Data & Ops', hue: 30,  skills: ['MongoDB','MySQL','Supabase','Prisma ORM','Vercel','Git','GitHub'] },
];

const ALL_SKILLS = [];
const ALL_HUES   = [];
const ALL_SIZES  = []; // BASE sizes at 1440px wide — scaled at runtime

SKILL_GROUPS.forEach(({ skills, hue }) => {
  skills.forEach((s, i) => {
    ALL_SKILLS.push(s);
    ALL_HUES.push(hue + (i % 3) * 12);
    ALL_SIZES.push(36 + (i % 4) * 6); // 36 / 42 / 48 / 54
  });
});

// ── Helpers ────────────────────────────────────────────────────────────────
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

/**
 * Returns a responsive scale factor based on canvas width.
 * 1.0 at ≥900 px, down to 0.45 at 320 px.
 */
function getScale(W) {
  return Math.min(1, Math.max(0.45, W / 900));
}

/**
 * How many bubbles to show — fewer on small screens so they don't crowd.
 * Full set above 700 px, down to ~40 % at 320 px.
 */
function getBubbleCount(W) {
  if (W >= 700) return ALL_SKILLS.length;
  if (W >= 500) return Math.round(ALL_SKILLS.length * 0.75);
  if (W >= 380) return Math.round(ALL_SKILLS.length * 0.55);
  return Math.round(ALL_SKILLS.length * 0.42);
}

export default function BubbleSkills() {
  const sceneRef = useRef(null);
  const cvRef    = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const touchRef = useRef({ x: -9999, y: -9999, active: false });
  const rafRef   = useRef(null);
  // Store mutable loop state in a ref so resize can update it without re-running useEffect
  const stateRef = useRef({ W: 0, H: 0, bubbles: [], particles: [], scale: 1, count: ALL_SKILLS.length });

  useEffect(() => {
    const scene = sceneRef.current;
    const cv    = cvRef.current;
    const ctx   = cv.getContext('2d');

    // ── Resize canvas to fill scene ────────────────────────────────────────
    function resize() {
      const s    = stateRef.current;
      s.W        = scene.clientWidth;
      s.H        = scene.clientHeight;
      cv.width   = s.W;
      cv.height  = s.H;
      s.scale    = getScale(s.W);
      s.count    = getBubbleCount(s.W);

      // Clamp existing bubble positions into new bounds
      s.bubbles.forEach(b => {
        const r = b.baseR * s.scale;
        b.x = Math.min(Math.max(b.x, r), s.W - r);
        b.y = Math.min(Math.max(b.y, r), s.H - r);
      });
    }

    resize();
    const { W, H } = stateRef.current;

    // ── Bubble factory ─────────────────────────────────────────────────────
    function makeBubble(i, s) {
      const baseR = ALL_SIZES[i % ALL_SIZES.length];
      const r     = baseR * s.scale;
      const hue   = ALL_HUES[i % ALL_HUES.length];
      return {
        x:       r + Math.random() * (s.W - r * 2),
        y:       s.H + r + Math.random() * s.H * 0.5,
        baseR,                                          // store unscaled for resize
        r,                                              // scaled radius (updated each frame)
        vx:      (Math.random() - 0.5) * 0.35,
        vy:      -(0.18 + Math.random() * 0.28),
        label:   ALL_SKILLS[i],
        hue,
        sat:     55 + Math.random() * 20,
        phase:   Math.random() * Math.PI * 2,
        wobble:  0.12 + Math.random() * 0.1,
        alive:   true,
        opacity: 0,
      };
    }

    // Initial scatter
    const s = stateRef.current;
    s.bubbles = ALL_SKILLS.map((_, i) => {
      const b = makeBubble(i, s);
      b.y      = (Math.random() * s.H * 1.2) - b.r;
      b.opacity = Math.random();
      return b;
    });

    // ── Draw one bubble ────────────────────────────────────────────────────
    function drawBubble(b, t) {
      const { x, y, r, hue, sat, label, opacity } = b;
      const alpha = Math.min(1, opacity);
      if (alpha <= 0 || r <= 0) return;

      ctx.save();
      ctx.globalAlpha = alpha;

      // Soft outer glow
      const glowR = r * 1.55;
      const glow  = ctx.createRadialGradient(x, y, r * 0.6, x, y, glowR);
      glow.addColorStop(0, `hsla(${hue},${sat + 20}%,70%,0.13)`);
      glow.addColorStop(1, `hsla(${hue},${sat}%,50%,0)`);
      ctx.beginPath(); ctx.arc(x, y, glowR, 0, Math.PI * 2);
      ctx.fillStyle = glow; ctx.fill();

      // Glass body
      const body = ctx.createRadialGradient(
        x - r * 0.28, y - r * 0.32, r * 0.04,
        x + r * 0.1,  y + r * 0.1,  r
      );
      body.addColorStop(0,    `hsla(${hue},70%,88%,0.09)`);
      body.addColorStop(0.45, `hsla(${hue},60%,65%,0.055)`);
      body.addColorStop(1,    `hsla(${hue - 20},50%,40%,0.04)`);
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = body; ctx.fill();

      // Iridescent rim
      const rimTime = t / 4000;
      const rim = ctx.createLinearGradient(x - r, y - r, x + r, y + r);
      const h2  = (hue + 60  + Math.sin(rimTime + b.phase) * 30) % 360;
      const h3  = (hue + 150 + Math.cos(rimTime + b.phase) * 20) % 360;
      rim.addColorStop(0,    `hsla(${hue},80%,85%,0.45)`);
      rim.addColorStop(0.35, `hsla(${h2},75%,80%,0.22)`);
      rim.addColorStop(0.7,  `hsla(${h3},70%,75%,0.30)`);
      rim.addColorStop(1,    `hsla(${hue},80%,85%,0.40)`);
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.strokeStyle = rim; ctx.lineWidth = 1.2; ctx.stroke();

      ctx.beginPath(); ctx.arc(x, y, r - 1.5, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(${hue + 30},70%,92%,0.10)`;
      ctx.lineWidth = 0.6; ctx.stroke();

      // Specular highlight
      ctx.save();
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.clip();
      const spec = ctx.createRadialGradient(
        x - r * 0.30, y - r * 0.38, 0,
        x - r * 0.30, y - r * 0.38, r * 0.55
      );
      spec.addColorStop(0,   'rgba(255,255,255,0.38)');
      spec.addColorStop(0.5, 'rgba(255,255,255,0.10)');
      spec.addColorStop(1,   'rgba(255,255,255,0)');
      ctx.fillStyle = spec;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
      const spec2 = ctx.createRadialGradient(
        x + r * 0.32, y + r * 0.34, 0,
        x + r * 0.32, y + r * 0.34, r * 0.35
      );
      spec2.addColorStop(0, `hsla(${hue + 40},80%,95%,0.22)`);
      spec2.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = spec2;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
      ctx.restore();

      // Shimmer capsule
      ctx.save();
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.clip();
      ctx.beginPath();
      ctx.ellipse(x - r * 0.26, y - r * 0.40, r * 0.24, r * 0.09, -0.45, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.22)'; ctx.fill();
      ctx.restore();

      // Core pulse
      const pulse = 0.5 + 0.5 * Math.sin(t / 1200 + b.phase);
      const core  = ctx.createRadialGradient(x, y, 0, x, y, r * 0.7);
      core.addColorStop(0,   `hsla(${hue},90%,80%,${0.08 + pulse * 0.06})`);
      core.addColorStop(0.6, `hsla(${hue},70%,65%,${0.03 + pulse * 0.03})`);
      core.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.beginPath(); ctx.arc(x, y, r * 0.7, 0, Math.PI * 2);
      ctx.fillStyle = core; ctx.fill();

      // Label — font size scales with r
      const fontSize = Math.max(7, r > 46 ? 11.5 : r > 40 ? 10.5 : r > 32 ? 9.5 : 8.5);
      ctx.font         = `600 ${fontSize}px 'JetBrains Mono','Fira Code',ui-monospace,monospace`;
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor  = `hsla(${hue},80%,20%,0.6)`;
      ctx.shadowBlur   = 6;
      ctx.fillStyle    = `hsla(${hue + 10},90%,92%,0.92)`;
      ctx.fillText(label, x, y);
      ctx.shadowBlur   = 0;

      ctx.restore();
    }

    // ── Pop a bubble ───────────────────────────────────────────────────────
    function popBubble(b) {
      b.alive = false;
      const { x, y, r, hue } = b;
      const ps = stateRef.current.particles;

      for (let k = 0; k < 3; k++) {
        ps.push({ type: 'ring', x, y, radius: r * 0.6, maxRadius: r * (2.5 + k * 0.8),
          life: 1, decay: 0.028 + k * 0.012, hue, lineWidth: 1.2 - k * 0.3 });
      }
      const shardCount = 22;
      for (let i = 0; i < shardCount; i++) {
        const angle = (Math.PI * 2 / shardCount) * i + Math.random() * 0.3;
        const spd   = 1.2 + Math.random() * 3.0;
        ps.push({ type: 'shard', x, y, vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd - 0.5,
          life: 1, decay: 0.022 + Math.random() * 0.018, r: 1.2 + Math.random() * 2.2,
          hue: hue + (Math.random() - 0.5) * 40, iridescent: Math.random() < 0.3 });
      }
      for (let i = 0; i < 8; i++) {
        ps.push({ type: 'drop',
          x: x + (Math.random() - 0.5) * r, y: y + (Math.random() - 0.5) * r * 0.5,
          vx: (Math.random() - 0.5) * 1.8, vy: -0.5 - Math.random() * 2.5,
          life: 1, decay: 0.018 + Math.random() * 0.014, r: 1.0 + Math.random() * 1.8, hue });
      }

      const idx = stateRef.current.bubbles.indexOf(b);
      setTimeout(() => {
        const st = stateRef.current;
        if (idx > -1) {
          const nb   = makeBubble(idx, st);
          nb.opacity = 0;
          st.bubbles[idx] = nb;
        }
      }, 700 + Math.random() * 500);
    }

    // ── Main render loop ───────────────────────────────────────────────────
    function loop(t) {
      const st      = stateRef.current;
      const { W, H, scale, count } = st;
      ctx.clearRect(0, 0, W, H);

      const mouse   = mouseRef.current;
      const touch   = touchRef.current;
      const pointer = touch.active ? touch : mouse;

      // Particles
      for (let i = st.particles.length - 1; i >= 0; i--) {
        const p = st.particles[i];
        p.life -= p.decay;
        if (p.life <= 0) { st.particles.splice(i, 1); continue; }
        const a = easeOutCubic(p.life);

        if (p.type === 'ring') {
          const progress = 1 - p.life;
          p.radius = p.maxRadius * easeOutCubic(progress + p.decay);
          ctx.save(); ctx.globalAlpha = p.life * 0.7;
          ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(0, p.radius), 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${p.hue},75%,80%,1)`;
          ctx.lineWidth   = p.lineWidth; ctx.stroke(); ctx.restore();

        } else if (p.type === 'shard') {
          p.x += p.vx; p.y += p.vy; p.vy += 0.055; p.vx *= 0.97; p.vy *= 0.97;
          ctx.save(); ctx.globalAlpha = a * 0.85;
          const fh = p.iridescent ? (p.hue + t / 20) % 360 : p.hue;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${fh},75%,82%,1)`; ctx.fill(); ctx.restore();

        } else if (p.type === 'drop') {
          p.x += p.vx; p.y += p.vy; p.vy += 0.07; p.vx *= 0.97;
          ctx.save(); ctx.globalAlpha = a * 0.75;
          ctx.beginPath(); ctx.ellipse(p.x, p.y, p.r * 0.55, p.r * 1.5, 0, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue},65%,85%,1)`; ctx.fill(); ctx.restore();
        }
      }

      // Bubbles — only render up to `count` (responsive subset)
      st.bubbles.forEach((b, idx) => {
        if (!b.alive || idx >= count) return;

        // Update scaled radius every frame so resize takes effect smoothly
        b.r = b.baseR * scale;

        b.opacity = Math.min(1, b.opacity + 0.008);
        b.x += b.vx + Math.sin(t / 2200 + b.phase) * b.wobble;
        b.y += b.vy + Math.cos(t / 2800 + b.phase) * b.wobble * 0.4;
        b.vx += (Math.random() - 0.5) * 0.008;
        b.vx  = Math.max(-0.6, Math.min(0.6, b.vx));

        // Wall bounce
        if (b.x < b.r)     { b.x = b.r;     b.vx =  Math.abs(b.vx); }
        if (b.x > W - b.r) { b.x = W - b.r; b.vx = -Math.abs(b.vx); }

        // Vertical wrap
        if (b.y < -b.r * 3) b.y = H + b.r;
        if (b.y > H + b.r)  b.y = -b.r * 2;

        // Pop on pointer proximity — use a slightly tighter threshold on touch
        const dx   = pointer.x - b.x;
        const dy   = pointer.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const popThreshold = b.r + (touch.active ? 8 : 18);
        if (dist < popThreshold) {
          popBubble(b);
        } else {
          drawBubble(b, t);
        }
      });

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    // ── Event listeners ────────────────────────────────────────────────────
    const onMove = (e) => {
      const rc = scene.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rc.left, y: e.clientY - rc.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    const onTouchMove = (e) => {
      e.preventDefault();
      const rc = scene.getBoundingClientRect();
      const t0 = e.touches[0];
      touchRef.current = { x: t0.clientX - rc.left, y: t0.clientY - rc.top, active: true };
    };
    const onTouchEnd = () => { touchRef.current = { x: -9999, y: -9999, active: false }; };

    const onResize = () => { resize(); };

    scene.addEventListener('mousemove',  onMove);
    scene.addEventListener('mouseleave', onLeave);
    scene.addEventListener('touchmove',  onTouchMove, { passive: false });
    scene.addEventListener('touchend',   onTouchEnd);
    window.addEventListener('resize',    onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      scene.removeEventListener('mousemove',  onMove);
      scene.removeEventListener('mouseleave', onLeave);
      scene.removeEventListener('touchmove',  onTouchMove);
      scene.removeEventListener('touchend',   onTouchEnd);
      window.removeEventListener('resize',    onResize);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600&display=swap');
      `}</style>

      <div
        ref={sceneRef}
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ pointerEvents: 'none' }}
      >
        <canvas
          ref={cvRef}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'auto',
            touchAction: 'none',
          }}
        />
      </div>
    </>
  );
}