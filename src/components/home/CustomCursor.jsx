"use client";

import { useEffect, useRef, useState } from "react";

const TOKENS = [
  "<rag>", "llm", "→", "embed()", "vec", "∇", "token",
  "ctx", "∑", "agent", "fn()", "RAG", "pipe",
  "attn", "∞", "logit", "kv", "λ", "softmax",
  "⊕", "norm", "0.97", "stream", "sys",
];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const state   = useRef({ mx: -200, my: -200, rx: -200, ry: -200 });
  const lastEmit = useRef(0);
  const rafRef   = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    document.documentElement.style.cursor = "none";

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const s = state.current;

    // RAF loop — smooth ring lag
    function tick() {
      s.rx = lerp(s.rx, s.mx, 0.13);
      s.ry = lerp(s.ry, s.my, 0.13);
      ring.style.transform = `translate(${s.rx}px, ${s.ry}px) translate(-50%, -50%)`;
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    // Spawn floating token
    function spawnToken(x, y) {
      const el = document.createElement("span");
      el.textContent = TOKENS[Math.floor(Math.random() * TOKENS.length)];
      const ox = (Math.random() - 0.5) * 22;
      const oy = (Math.random() - 0.5) * 10;
      Object.assign(el.style, {
        position:      "fixed",
        left:          x + ox + "px",
        top:           y + oy + "px",
        transform:     "translate(-50%, -50%)",
        fontFamily:    "monospace",
        fontSize:      "10px",
        color:         "rgba(168,85,247,0.8)",
        textShadow:    "0 0 8px rgba(168,85,247,0.6)",
        pointerEvents: "none",
        zIndex:        "9997",
        whiteSpace:    "nowrap",
        userSelect:    "none",
        opacity:       "0.8",
      });
      document.body.appendChild(el);

      let start = null;
      const dur = 650 + Math.random() * 250;
      function anim(ts) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 2);
        el.style.opacity   = String((1 - p) * 0.8);
        el.style.transform = `translate(-50%, calc(-50% - ${ease * 26}px)) scale(${0.95 - p * 0.35})`;
        if (p < 1) requestAnimationFrame(anim);
        else el.remove();
      }
      requestAnimationFrame(anim);
    }

    // Tiny trail dot
    function spawnTrailDot(x, y) {
      const el = document.createElement("div");
      Object.assign(el.style, {
        position:      "fixed",
        left:          x + "px",
        top:           y + "px",
        width:         "3px",
        height:        "3px",
        borderRadius:  "50%",
        background:    "rgba(139,92,246,0.5)",
        transform:     "translate(-50%,-50%)",
        pointerEvents: "none",
        zIndex:        "9996",
        opacity:       "0.5",
      });
      document.body.appendChild(el);
      let op = 0.5;
      function fade() {
        op -= 0.06;
        el.style.opacity = String(Math.max(op, 0));
        if (op > 0) requestAnimationFrame(fade);
        else el.remove();
      }
      setTimeout(() => requestAnimationFrame(fade), 40);
    }

    // Click burst
    function burst(x, y) {
      for (let i = 0; i < 7; i++) {
        setTimeout(() => spawnToken(
          x + (Math.random() - 0.5) * 44,
          y + (Math.random() - 0.5) * 30,
        ), i * 28);
      }
    }

    // Handlers
    const onMove = (e) => {
      s.mx = e.clientX;
      s.my = e.clientY;
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      dot.style.opacity   = "1";
      ring.style.opacity  = "1";
      const now = Date.now();
      if (now - lastEmit.current > 95) {
        lastEmit.current = now;
        spawnToken(e.clientX, e.clientY);
        spawnTrailDot(e.clientX, e.clientY);
      }
    };

    const onLeave  = () => { dot.style.opacity = "0"; ring.style.opacity = "0"; };
    const onEnter  = () => { dot.style.opacity = "1"; ring.style.opacity = "1"; };

    const onDown = (e) => {
      ring.style.width      = "18px";
      ring.style.height     = "18px";
      dot.style.boxShadow   = "0 0 16px rgba(168,85,247,1), 0 0 32px rgba(139,92,246,0.5)";
      burst(e.clientX, e.clientY);
    };

    const onUp = () => {
      ring.style.width    = "32px";
      ring.style.height   = "32px";
      dot.style.boxShadow = "0 0 8px rgba(168,85,247,0.8)";
    };

    const isInteractive = (t) =>
      t.closest("a, button, [role='button'], input, textarea, label, select");

    const onOver = (e) => {
      if (isInteractive(e.target)) {
        ring.style.width       = "50px";
        ring.style.height      = "50px";
        ring.style.borderColor = "rgba(168,85,247,0.65)";
        ring.style.background  = "rgba(139,92,246,0.07)";
      }
    };

    const onOut = (e) => {
      if (isInteractive(e.target)) {
        ring.style.width       = "32px";
        ring.style.height      = "32px";
        ring.style.borderColor = "rgba(139,92,246,0.35)";
        ring.style.background  = "transparent";
      }
    };

    document.addEventListener("mousemove",  onMove,  { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);
    document.addEventListener("mouseover",  onOver,  { passive: true });
    document.addEventListener("mouseout",   onOut,   { passive: true });

    return () => {
      document.documentElement.style.cursor = "";
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseout",   onOut);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      {/* Dot — zero-lag */}
      <div
        ref={dotRef}
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         "7px",
          height:        "7px",
          borderRadius:  "50%",
          background:    "#a855f7",
          boxShadow:     "0 0 8px rgba(168,85,247,0.8)",
          pointerEvents: "none",
          zIndex:        9999,
          opacity:       0,
          willChange:    "transform, opacity",
          transition:    "opacity 0.15s, box-shadow 0.15s",
        }}
      />

      {/* Ring — smooth lag via RAF */}
      <div
        ref={ringRef}
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         "32px",
          height:        "32px",
          borderRadius:  "50%",
          border:        "1px solid rgba(139,92,246,0.35)",
          background:    "transparent",
          pointerEvents: "none",
          zIndex:        9998,
          opacity:       0,
          willChange:    "transform",
          transition:    "width 0.18s ease, height 0.18s ease, border-color 0.18s, background 0.18s, opacity 0.15s",
        }}
      />
    </>
  );
}