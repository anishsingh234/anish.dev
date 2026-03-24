"use client";

import { useEffect, useRef, useState } from "react";

const TOKENS = [
  "RAG", "LLM", "AGENT", "NEXT", "NODE", "VEC", "EMBED", "CHAIN",
  "ATTN", "SOFTMAX", "LOGIT", "CTX", "TOKEN", "PIPE", "SaaS",
  "∇", "∞", "λ", "∑", "→", "fn()", "API", "DB", "AI", "<>",
  "0.97", "stream", "kv-cache", "multi-agent"
];

const COLORS = ["#a855f7", "#8b5cf6", "#3b82f6", "#22d3ee"]; // purple → blue → cyan

class Particle {
  constructor(x, y, isBurst = false) {
    this.x = x;
    this.y = y;
    this.symbol = TOKENS[Math.floor(Math.random() * TOKENS.length)];
    this.size = isBurst ? Math.random() * 13 + 9 : Math.random() * 9 + 6;
    this.alpha = isBurst ? 0.95 : 0.75;
    this.life = isBurst ? 1100 : 650;
    this.vx = (Math.random() - 0.5) * (isBurst ? 6.5 : 2.2);
    this.vy = (Math.random() - 0.5) * (isBurst ? 6.5 : 2.2) - (isBurst ? 1.5 : 0);
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.rotation = Math.random() * 360;
    this.rotSpeed = (Math.random() - 0.5) * 4;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.018; // gentle gravity
    this.vx *= 0.985;
    this.vy *= 0.985;
    this.alpha -= 0.012;
    this.life -= 16;
    this.rotation += this.rotSpeed;
  }
}

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -200, y: -200 });
  const targetRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef(null);
  const lastEmitRef = useRef(0);
  const isHoverRef = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    document.documentElement.style.cursor = "none";

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // === CANVAS SETUP ===
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9997";
    canvas.style.mixBlendMode = "screen";
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    const ctx = canvas.getContext("2d", { alpha: true });
    let width = 0;
    let height = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener("resize", resize);

    // === PARTICLE SYSTEM ===
    const particles = particlesRef.current;

    function createParticle(x, y, isBurst = false) {
      particles.push(new Particle(x, y, isBurst));
      if (particles.length > 110) particles.shift(); // max 110 for performance
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Draw neural connections first
      ctx.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 135 && p1.alpha > 0.15 && p2.alpha > 0.15) {
            ctx.strokeStyle = `rgba(139,92,246,${Math.max(0, (135 - dist) / 135 * 0.22)})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        // Glow
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 18;

        ctx.font = `${p.size}px monospace`;
        ctx.fillStyle = p.color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.symbol, 0, 0);

        ctx.restore();

        if (p.life <= 0 || p.alpha <= 0.05) {
          particles.splice(i, 1);
        }
      }
    }

    // === MAIN RAF LOOP ===
    function tick() {
      // Smooth ring lag
      targetRef.current.x = lerp(targetRef.current.x, mouseRef.current.x, 0.14);
      targetRef.current.y = lerp(targetRef.current.y, mouseRef.current.y, 0.14);

      ring.style.transform = `translate(${targetRef.current.x}px, ${targetRef.current.y}px) translate(-50%, -50%)`;

      // Particle animation + neural net
      draw();

      rafRef.current = requestAnimationFrame(tick);
    }

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    rafRef.current = requestAnimationFrame(tick);

    // === MOUSE HANDLERS ===
    const onMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      dot.style.opacity = "1";
      ring.style.opacity = "1";

      const now = Date.now();
      if (now - lastEmitRef.current > (isHoverRef.current ? 55 : 85)) {
        lastEmitRef.current = now;
        createParticle(e.clientX, e.clientY);
        // occasional extra trail
        if (Math.random() > 0.6) createParticle(e.clientX + (Math.random() - 0.5) * 18, e.clientY + (Math.random() - 0.5) * 18);
      }
    };

    const onDown = (e) => {
      ring.style.width = "22px";
      ring.style.height = "22px";
      dot.style.boxShadow = "0 0 28px #a855f7, 0 0 48px #3b82f6";

      // Big neural explosion
      for (let i = 0; i < 18; i++) {
        setTimeout(() => {
          createParticle(e.clientX, e.clientY, true);
        }, i * 14);
      }
    };

    const onUp = () => {
      ring.style.width = "34px";
      ring.style.height = "34px";
      dot.style.boxShadow = "0 0 12px rgba(168,85,247,0.9)";
    };

    const isInteractive = (el) =>
      el.closest("a, button, [role='button'], input, textarea, label, select, .cursor-interactive");

    const onOver = (e) => {
      if (isInteractive(e.target)) {
        isHoverRef.current = true;
        ring.style.width = "56px";
        ring.style.height = "56px";
        ring.style.borderColor = "rgba(59,130,246,0.85)";
        ring.style.background = "rgba(139,92,246,0.08)";
        ring.style.boxShadow = "0 0 30px rgba(59,130,246,0.6)";
      }
    };

    const onOut = (e) => {
      if (isInteractive(e.target)) {
        isHoverRef.current = false;
        ring.style.width = "34px";
        ring.style.height = "34px";
        ring.style.borderColor = "rgba(139,92,246,0.45)";
        ring.style.background = "transparent";
        ring.style.boxShadow = "none";
      }
    };

    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.style.cursor = "";
      cancelAnimationFrame(rafRef.current);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      window.removeEventListener("resize", resize);

      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      {/* Core Dot – instant follow, AI core glow */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "#a855f7",
          boxShadow: "0 0 12px rgba(168,85,247,0.95), 0 0 28px rgba(59,130,246,0.6)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          willChange: "transform, opacity, box-shadow",
          transition: "opacity 0.1s ease, box-shadow 0.2s ease",
        }}
      />

      {/* Magnetic Ring – bigger, gradient border, hover magic */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          width: "34px",
          height: "34px",
          borderRadius: "50%",
          border: "1.5px solid rgba(139,92,246,0.45)",
          background: "transparent",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0,
          willChange: "transform, width, height, border-color, background, box-shadow",
          transition: "all 0.22s cubic-bezier(0.23, 1, 0.32, 1)",
          boxShadow: "0 0 0 3px rgba(168,85,247,0.08)",
        }}
      />
    </>
  );
}