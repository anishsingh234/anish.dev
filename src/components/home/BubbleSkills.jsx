'use client';
import { useEffect, useRef } from 'react';

const SKILLS = [
  'Python','JavaScript','TypeScript','C++','SQL','HTML5','CSS3',
  'React.js','Next.js','Three.js','Tailwind CSS','React Native','Expo',
  'Node.js','Express.js','FastAPI','GraphQL','REST APIs',
  'LangChain','LLMs','RAG Systems','CrewAI','Pinecone','Hugging Face',
  'Prompt Eng','Multi-Agent','Ollama',
  'MongoDB','MySQL','Supabase','Prisma ORM','Vercel','Git','GitHub'
];

const SIZES = [38,44,34,42,36,40,38,46,44,36,42,38,34,44,38,36,40,34,42,38,46,36,40,34,38,42,36,44,38,40,36,34,42,40];

export default function BubbleSkills() {
  const sceneRef = useRef(null);
  const cvRef = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const cv = cvRef.current;
    const ctx = cv.getContext('2d');

    let W = scene.clientWidth;
    let H = scene.clientHeight;
    cv.width = W;
    cv.height = H;

    let particles = [];
    let bubbles = [];

    function makeBubble(i) {
      const r = SIZES[i % SIZES.length];
      return {
        x: r + Math.random() * (W - r * 2),
        y: r + Math.random() * (H - r * 2),
        r,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.15 - Math.random() * 0.25,
        label: SKILLS[i],
        hue: 190 + Math.random() * 80,
        phase: Math.random() * Math.PI * 2,
        alive: true,
      };
    }

    bubbles = SKILLS.map((_, i) => makeBubble(i));

    function drawBubble(b) {
      const { x, y, r, hue, label } = b;

      const grad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.35, r * 0.05, x, y, r);
      grad.addColorStop(0, 'rgba(220,235,255,0.07)');
      grad.addColorStop(0.5, 'rgba(160,210,240,0.04)');
      grad.addColorStop(1, 'rgba(100,170,220,0.02)');
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(${hue},60%,80%,0.28)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, r - 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(${hue + 40},70%,92%,0.10)`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      const shimmer = ctx.createLinearGradient(x - r, y - r, x + r, y + r);
      shimmer.addColorStop(0, `hsla(${hue},80%,90%,0.18)`);
      shimmer.addColorStop(0.4, `hsla(${hue + 60},70%,85%,0.06)`);
      shimmer.addColorStop(1, `hsla(${hue + 120},60%,80%,0.12)`);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.strokeStyle = shimmer;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(x - r * 0.28, y - r * 0.38, r * 0.22, r * 0.1, -0.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.18)';
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(x + r * 0.2, y + r * 0.3, r * 0.1, r * 0.05, -0.3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.09)';
      ctx.fill();

      ctx.globalAlpha = 0.55;
      ctx.font = `500 ${r > 40 ? 11 : 10}px ui-monospace,monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = `hsla(${hue},60%,88%,1)`;
      ctx.fillText(label, x, y);
      ctx.globalAlpha = 1;
    }

    function popBubble(b) {
      b.alive = false;
      const n = 18;
      for (let i = 0; i < n; i++) {
        const angle = (Math.PI * 2 / n) * i;
        const spd = 0.8 + Math.random() * 2.2;
        particles.push({
          x: b.x, y: b.y,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          life: 1,
          decay: 0.025 + Math.random() * 0.02,
          r: 1.5 + Math.random() * 2,
          hue: b.hue,
          ring: i % 3 === 0,
        });
      }
      for (let i = 0; i < 6; i++) {
        particles.push({
          x: b.x, y: b.y,
          vx: (Math.random() - 0.5) * 1.5,
          vy: -1 - Math.random() * 2,
          life: 1, decay: 0.02, r: 0.8,
          hue: b.hue, drop: true,
        });
      }
      const idx = bubbles.indexOf(b);
      setTimeout(() => {
        if (idx > -1) bubbles[idx] = makeBubble(idx);
      }, 800 + Math.random() * 400);
    }

    function loop(t) {
      ctx.clearRect(0, 0, W, H);
      const mouse = mouseRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        p.vy += 0.04; p.vx *= 0.97; p.vy *= 0.97;
        p.life -= p.decay;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life * 0.7;
        if (p.drop) {
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.r, p.r * 1.6, 0, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue},60%,85%,1)`;
          ctx.fill();
        } else if (p.ring) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 2, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${p.hue},60%,85%,1)`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue},55%,82%,1)`;
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      bubbles.forEach(b => {
        if (!b.alive) return;
        b.x += b.vx + Math.sin(t / 2000 + b.phase) * 0.15;
        b.y += b.vy;
        b.vx += (Math.random() - 0.5) * 0.01;
        if (b.x < b.r) { b.x = b.r; b.vx = Math.abs(b.vx); }
        if (b.x > W - b.r) { b.x = W - b.r; b.vx = -Math.abs(b.vx); }
        if (b.y < -b.r * 2) b.y = H + b.r;
        if (b.y > H + b.r) b.y = -b.r;

        const dx = mouse.x - b.x;
        const dy = mouse.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < b.r + 22) popBubble(b);
        else drawBubble(b);
      });

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    const onMove = (e) => {
      const rc = scene.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rc.left, y: e.clientY - rc.top };
    };
    const onLeave = () => { mouseRef.current = { x: -999, y: -999 }; };
    const onResize = () => {
      W = scene.clientWidth; H = scene.clientHeight;
      cv.width = W; cv.height = H;
    };

    scene.addEventListener('mousemove', onMove);
    scene.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      scene.removeEventListener('mousemove', onMove);
      scene.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      className="absolute inset-0 z-0 overflow-hidden"
      style={{ pointerEvents: 'none' }}
    >
      <canvas
        ref={cvRef}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'auto' }}
      />
    </div>
  );
}