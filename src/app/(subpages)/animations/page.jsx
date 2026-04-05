'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { JetBrains_Mono } from 'next/font/google';

import BlobCursor from '@/components/animations/BlobCursor';
import BubbleSkills from '@/components/animations/BubbleSkills';
import SkillFlow from '@/components/animations/FlipUp';

/* ── Font — loaded via next/font/google (guaranteed to work in Next.js) ──── */
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-jetbrains',
});

/* ── Earth3D loader ───────────────────────────────────────────────────────── */
function Earth3DLoader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const PHASES = ['Initialising renderer', 'Loading geometry', 'Mapping textures', 'Building orbit'];

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress((p) => { const n = p + Math.random() * 6; return n >= 100 ? 100 : n; });
    }, 80);
    const ph = setInterval(() => setPhase((p) => (p + 1) % PHASES.length), 900);
    return () => { clearInterval(iv); clearInterval(ph); };
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full bg-[#050505] relative overflow-hidden">
      {[160, 220, 280].map((size, i) => (
        <div key={i} className="absolute rounded-full border" style={{
          width: size, height: size,
          borderColor: `rgba(251,191,36,${0.06 - i * 0.015})`,
          animation: `loaderPulse ${2.5 + i * 0.6}s ease-in-out infinite`,
          animationDelay: `${i * 0.3}s`,
        }} />
      ))}
      <div className="relative flex items-center justify-center" style={{ width: 80, height: 80 }}>
        <div className="absolute inset-0 rounded-full border" style={{ borderColor: 'rgba(251,191,36,0.08)', borderTopColor: 'rgba(251,191,36,0.5)', animation: 'loaderSpin 3s linear infinite' }} />
        <div className="absolute rounded-full border" style={{ inset: 10, borderColor: 'rgba(251,191,36,0.05)', borderBottomColor: 'rgba(251,191,36,0.35)', animation: 'loaderSpinReverse 2s linear infinite' }} />
        <div className="absolute rounded-full border" style={{ inset: 22, borderColor: 'transparent', borderTopColor: '#fbbf24', animation: 'loaderSpin 0.9s linear infinite' }} />
        <div className="w-2 h-2 rounded-full" style={{ background: '#fbbf24', boxShadow: '0 0 12px rgba(251,191,36,0.8)', animation: 'loaderCorePulse 1.4s ease-in-out infinite' }} />
      </div>
      <div className="absolute flex flex-col items-center gap-3" style={{ top: '50%', marginTop: 56 }}>
        <span style={{ fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#fbbf24', opacity: 0.7 }}>
          {PHASES[phase]}
        </span>
        <div className="relative overflow-hidden" style={{ width: 120, height: 1, background: 'rgba(251,191,36,0.1)' }}>
          <div className="absolute left-0 top-0 h-full transition-all duration-150" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, rgba(251,191,36,0.3), #fbbf24)' }} />
        </div>
        <span style={{ fontSize: 8, letterSpacing: '0.3em', color: '#888' }}>
          {Math.floor(progress).toString().padStart(3, '0')} / 100
        </span>
      </div>
      <style>{`
        @keyframes loaderSpin        { to { transform: rotate(360deg); } }
        @keyframes loaderSpinReverse { to { transform: rotate(-360deg); } }
        @keyframes loaderPulse       { 0%,100%{transform:scale(1);opacity:0.4} 50%{transform:scale(1.08);opacity:1} }
        @keyframes loaderCorePulse   { 0%,100%{box-shadow:0 0 12px rgba(251,191,36,0.8)} 50%{box-shadow:0 0 18px rgba(251,191,36,1)} }
      `}</style>
    </div>
  );
}

/* ── Dynamic Earth3D ──────────────────────────────────────────────────────── */
const Earth3D = dynamic(() => import('@/components/animations/Earth3D'), {
  ssr: false,
  loading: () => <Earth3DLoader />,
});

const ANIMATIONS = [
  { id: 'orbit',     label: 'Orbit',      index: '01', sub: '3D Earth renderer',        accentColor: '#fbbf24', Component: Earth3D      },
  { id: 'blob',      label: 'Blob',       index: '02', sub: 'Organic cursor motion',    accentColor: '#a78bfa', Component: BlobCursor   },
  { id: 'bubbles',   label: 'Bubbles',    index: '03', sub: 'Floating skill particles', accentColor: '#38bdf8', Component: BubbleSkills },
  { id: 'skillflow', label: 'Skill Flow', index: '04', sub: 'Logic flip sequence',      accentColor: '#6366f1', Component: SkillFlow    },
];

const TICKER = 'ANIMATION STUDIO ◆ INTERACTIVE CANVAS ◆ LIVE PREVIEW ◆ NEXT.JS ◆ REACT ◆ FRAMER MOTION ◆ TAILWIND CSS ◆ ';

export default function AnimationStudio() {
  const [activeIdx, setActiveIdx] = useState(0);

  const current  = ANIMATIONS[activeIdx];
  const prevAnim = ANIMATIONS[(activeIdx - 1 + ANIMATIONS.length) % ANIMATIONS.length];
  const nextAnim = ANIMATIONS[(activeIdx + 1) % ANIMATIONS.length];
  const { Component } = current;

  const goPrev = () => setActiveIdx((i) => (i - 1 + ANIMATIONS.length) % ANIMATIONS.length);
  const goNext = () => setActiveIdx((i) => (i + 1) % ANIMATIONS.length);

  return (
    /*
      jetbrainsMono.variable injects --font-jetbrains as a CSS custom property.
      fontFamily on the root div uses it directly — works guaranteed in Next.js 13+.
    */
    <div
      className={`${jetbrainsMono.variable} relative flex flex-col w-full h-screen overflow-hidden text-white`}
      style={{ background: '#050505', fontFamily: 'var(--font-jetbrains), "JetBrains Mono", monospace' }}
    >
      {/* Grid texture */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]" style={{
        backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Accent glow */}
      <div
        className="pointer-events-none absolute -top-48 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full z-0 transition-all duration-1000"
        style={{ background: `radial-gradient(circle, ${current.accentColor}10 0%, transparent 70%)` }}
      />

      {/* ── TOP NAVBAR ──────────────────────────────────────────────────────── */}
      <nav
        className="relative z-50 w-full border-b flex-shrink-0"
        style={{ borderColor: '#1a1a1a', background: 'rgba(5,5,5,0.92)', backdropFilter: 'blur(20px)' }}
      >
        <div className="flex items-center w-full">

          {/* Brand */}
          <div className="flex items-center gap-3 px-5 py-3 border-r flex-shrink-0" style={{ borderColor: '#1a1a1a' }}>
            <span className="text-[11px] transition-colors duration-500" style={{ color: current.accentColor }}>◆</span>
            <div>
              <p style={{ fontSize: 8, letterSpacing: '0.3em', color: '#999', textTransform: 'uppercase', lineHeight: 1, marginBottom: 3 }}>
                Portfolio
              </p>
              <p style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', lineHeight: 1, fontWeight: 600 }}>
                Animation Studio
              </p>
            </div>
          </div>

          {/* Desktop scene tabs — hidden on mobile */}
          <div className="hidden sm:flex items-center overflow-x-auto flex-1 hide-scrollbar">
            {ANIMATIONS.map((a, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={a.id}
                  onClick={() => setActiveIdx(idx)}
                  className="relative flex items-center gap-2.5 px-5 py-3 border-r flex-shrink-0 transition-all duration-300"
                  style={{ borderColor: '#1a1a1a', background: isActive ? 'rgba(255,255,255,0.03)' : 'transparent' }}
                >
                  <span style={{ fontSize: 9, letterSpacing: '0.2em', color: isActive ? a.accentColor : '#666', transition: 'color 0.3s' }}>
                    _{a.index}
                  </span>
                  <span style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: isActive ? '#fff' : '#777', transition: 'color 0.3s', fontWeight: isActive ? 600 : 400 }}>
                    {a.label}
                  </span>
                  <span
                    className="absolute bottom-0 left-0 right-0 h-px transition-all duration-500"
                    style={{ background: isActive ? `linear-gradient(90deg,transparent,${a.accentColor},transparent)` : 'transparent' }}
                  />
                </button>
              );
            })}
          </div>

          {/* Mobile: current scene label in navbar */}
          <div className="sm:hidden flex items-center gap-2 px-4 flex-1">
            <span style={{ fontSize: 9, letterSpacing: '0.2em', color: current.accentColor }}>_{current.index}</span>
            <span style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff', fontWeight: 600 }}>
              {current.label}
            </span>
          </div>

          {/* Live dot */}
          <div className="flex items-center gap-2 px-5 py-3 flex-shrink-0 border-l" style={{ borderColor: '#1a1a1a' }}>
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: current.accentColor, boxShadow: `0 0 6px ${current.accentColor}` }}
            />
            <span className="hidden sm:block" style={{ fontSize: 9, letterSpacing: '0.3em', color: '#999', textTransform: 'uppercase' }}>
              Live
            </span>
          </div>
        </div>
      </nav>

      {/* ── CANVAS ──────────────────────────────────────────────────────────── */}
      {/* pb-[88px] clears the fixed mobile nav */}
      <main className="relative z-10 flex-1 overflow-hidden pb-[88px] sm:pb-0">
        <div
          key={current.id}
          className="w-full h-full"
          style={{ animation: 'studioFadeIn 0.4s cubic-bezier(0.4,0,0.2,1) both' }}
        >
          <Component />
        </div>

        {/* Corner crosshairs */}
        <div className="absolute top-3 left-3 pointer-events-none"><div className="w-3 h-px bg-[#222]" /><div className="w-px h-3 bg-[#222]" /></div>
        <div className="absolute top-3 right-3 pointer-events-none flex flex-col items-end"><div className="w-3 h-px bg-[#222]" /><div className="w-px h-3 bg-[#222]" /></div>
        <div className="absolute bottom-[96px] sm:bottom-9 left-3 pointer-events-none"><div className="w-px h-3 bg-[#222]" /><div className="w-3 h-px bg-[#222]" /></div>
        <div className="absolute bottom-[96px] sm:bottom-9 right-3 pointer-events-none flex flex-col items-end"><div className="w-px h-3 bg-[#222]" /><div className="w-3 h-px bg-[#222]" /></div>

        {/* Scene label badge */}
        <div className="absolute bottom-[96px] sm:bottom-4 right-4 pointer-events-none select-none">
          <div className="flex items-center gap-2 px-3 py-1.5 border" style={{ borderColor: '#1a1a1a', background: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(12px)' }}>
            <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: current.accentColor }} />
            <span style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: current.accentColor }}>
              {current.label}
            </span>
            <span className="hidden sm:block" style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555' }}>
              · {current.sub}
            </span>
          </div>
        </div>

        {/* Ghost watermark index */}
        <div className="absolute bottom-[88px] sm:bottom-3 left-4 pointer-events-none select-none">
          <span className="text-[56px] font-black leading-none transition-all duration-500" style={{ color: current.accentColor, opacity: 0.04 }}>
            {current.index}
          </span>
        </div>
      </main>

      {/* ── MOBILE BOTTOM NAV ─────────────────────────────────────────────────
          Layout: [← PREV] [scene info + progress dots] [NEXT →]
          Only visible on screens smaller than sm (640px).
      ──────────────────────────────────────────────────────────────────────── */}
      <div
        className="sm:hidden fixed bottom-0 left-0 right-0 z-50"
        style={{ background: 'rgba(5,5,5,0.97)', backdropFilter: 'blur(20px)', borderTop: '1px solid #1a1a1a' }}
      >
        <div className="flex items-stretch">

          {/* ← PREV */}
          <button
            onClick={goPrev}
            className="flex flex-col items-center justify-center gap-1.5 px-5 py-3 border-r transition-all duration-200 active:scale-95 active:bg-white/5 flex-shrink-0"
            style={{ borderColor: '#1a1a1a', minWidth: 72 }}
            aria-label="Previous animation"
          >
            {/* Chevron left SVG */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 15L7.5 10L12.5 5" stroke={prevAnim.accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 7, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#666', whiteSpace: 'nowrap' }}>
              {prevAnim.label}
            </span>
          </button>

          {/* Centre: progress dots + scene info */}
          <div className="flex-1 flex flex-col items-center justify-center gap-2 py-2">
            {/* Progress pills */}
            <div className="flex items-center gap-1.5">
              {ANIMATIONS.map((a, idx) => (
                <button
                  key={a.id}
                  onClick={() => setActiveIdx(idx)}
                  aria-label={`Go to ${a.label}`}
                  className="transition-all duration-300"
                  style={{
                    width: activeIdx === idx ? 22 : 5,
                    height: 5,
                    borderRadius: 3,
                    background: activeIdx === idx ? a.accentColor : '#2a2a2a',
                    boxShadow: activeIdx === idx ? `0 0 6px ${a.accentColor}80` : 'none',
                  }}
                />
              ))}
            </div>
            {/* Scene label */}
            <div className="flex items-center gap-1.5">
              <span style={{ fontSize: 8, letterSpacing: '0.3em', color: current.accentColor }}>
                _{current.index}
              </span>
              <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff', fontWeight: 700 }}>
                {current.label}
              </span>
            </div>
            <span style={{ fontSize: 7, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666' }}>
              {current.sub}
            </span>
          </div>

          {/* NEXT → */}
          <button
            onClick={goNext}
            className="flex flex-col items-center justify-center gap-1.5 px-5 py-3 border-l transition-all duration-200 active:scale-95 active:bg-white/5 flex-shrink-0"
            style={{ borderColor: '#1a1a1a', minWidth: 72 }}
            aria-label="Next animation"
          >
            {/* Chevron right SVG */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 5L12.5 10L7.5 15" stroke={nextAnim.accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 7, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#666', whiteSpace: 'nowrap' }}>
              {nextAnim.label}
            </span>
          </button>

        </div>
      </div>

      {/* ── TICKER TAPE ─────────────────────────────────────────────────────── */}
      <div
        className="relative z-50 flex-shrink-0 border-t overflow-hidden"
        style={{ borderColor: '#1a1a1a', background: '#050505', height: 26 }}
      >
        <div className="flex items-center h-full whitespace-nowrap" style={{ animation: 'studioTicker 30s linear infinite' }}>
          {[...Array(4)].map((_, i) => (
            <span key={i} style={{ fontSize: 8, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#555' }}>
              {TICKER}
            </span>
          ))}
        </div>
        <div className="absolute left-0 top-0 h-full w-12 pointer-events-none" style={{ background: 'linear-gradient(90deg,#050505,transparent)' }} />
        <div className="absolute right-0 top-0 h-full w-12 pointer-events-none" style={{ background: 'linear-gradient(-90deg,#050505,transparent)' }} />
      </div>

      <style jsx global>{`
        @keyframes studioFadeIn {
          from { opacity: 0; transform: scale(0.99) translateY(3px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);   }
        }
        @keyframes studioTicker {
          from { transform: translateX(0);    }
          to   { transform: translateX(-25%); }
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}