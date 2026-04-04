'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import BlobCursor from '@/components/animations/BlobCursor';
import BubbleSkills from '@/components/animations/BubbleSkills';
import SkillFlow from '@/components/animations/FlipUp';

/* ── Enhanced Earth3D loading screen ─────────────────────────────────────── */
function Earth3DLoader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  const PHASES = ['Initialising renderer', 'Loading geometry', 'Mapping textures', 'Building orbit'];

  useEffect(() => {
    // Simulate progress ticking up
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 6;
        return next >= 100 ? 100 : next;
      });
    }, 80);

    // Cycle through phases
    const phaseInterval = setInterval(() => {
      setPhase((ph) => (ph + 1) % PHASES.length);
    }, 900);

    return () => {
      clearInterval(interval);
      clearInterval(phaseInterval);
    };
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full bg-[#050505] relative overflow-hidden">

      {/* Ambient rings */}
      {[160, 220, 280].map((size, i) => (
        <div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: size,
            height: size,
            borderColor: `rgba(251,191,36,${0.06 - i * 0.015})`,
            animation: `loaderPulse ${2.5 + i * 0.6}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      {/* Central spinner cluster */}
      <div className="relative flex items-center justify-center" style={{ width: 80, height: 80 }}>

        {/* Outermost slow ring */}
        <div
          className="absolute inset-0 rounded-full border"
          style={{
            borderColor: 'rgba(251,191,36,0.08)',
            borderTopColor: 'rgba(251,191,36,0.5)',
            animation: 'loaderSpin 3s linear infinite',
          }}
        />

        {/* Middle counter-spin */}
        <div
          className="absolute rounded-full border"
          style={{
            inset: 10,
            borderColor: 'rgba(251,191,36,0.05)',
            borderBottomColor: 'rgba(251,191,36,0.35)',
            animation: 'loaderSpinReverse 2s linear infinite',
          }}
        />

        {/* Inner fast ring */}
        <div
          className="absolute rounded-full border"
          style={{
            inset: 22,
            borderColor: 'transparent',
            borderTopColor: '#fbbf24',
            animation: 'loaderSpin 0.9s linear infinite',
          }}
        />

        {/* Core dot */}
        <div
          className="w-2 h-2 rounded-full"
          style={{
            background: '#fbbf24',
            boxShadow: '0 0 12px rgba(251,191,36,0.8), 0 0 24px rgba(251,191,36,0.3)',
            animation: 'loaderCorePulse 1.4s ease-in-out infinite',
          }}
        />
      </div>

      {/* Info block — positioned below spinner */}
      <div
        className="absolute flex flex-col items-center gap-3"
        style={{ top: '50%', marginTop: 56 }}
      >
        {/* Phase label */}
        <span
          className="text-[9px] tracking-[0.35em] font-mono uppercase"
          style={{ color: '#fbbf24', opacity: 0.7 }}
        >
          {PHASES[phase]}
        </span>

        {/* Progress bar */}
        <div
          className="relative overflow-hidden"
          style={{ width: 120, height: 1, background: 'rgba(251,191,36,0.1)' }}
        >
          <div
            className="absolute left-0 top-0 h-full transition-all duration-150"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, rgba(251,191,36,0.3), #fbbf24)',
              boxShadow: '0 0 6px rgba(251,191,36,0.6)',
            }}
          />
        </div>

        {/* Numeric readout */}
        <span
          className="text-[8px] tracking-[0.3em] font-mono"
          style={{ color: '#3a3a3a' }}
        >
          {Math.floor(progress).toString().padStart(3, '0')} / 100
        </span>
      </div>

      {/* Keyframes injected locally */}
      <style>{`
        @keyframes loaderSpin        { to { transform: rotate(360deg); } }
        @keyframes loaderSpinReverse { to { transform: rotate(-360deg); } }
        @keyframes loaderPulse {
          0%, 100% { transform: scale(1);    opacity: 0.4; }
          50%       { transform: scale(1.08); opacity: 1;   }
        }
        @keyframes loaderCorePulse {
          0%, 100% { box-shadow: 0 0 12px rgba(251,191,36,0.8), 0 0 24px rgba(251,191,36,0.3); }
          50%       { box-shadow: 0 0 18px rgba(251,191,36,1),   0 0 36px rgba(251,191,36,0.5); }
        }
      `}</style>
    </div>
  );
}

/* ── Dynamic Earth3D with the new loader ─────────────────────────────────── */
const Earth3D = dynamic(() => import('@/components/animations/Earth3D'), {
  ssr: false,
  loading: () => <Earth3DLoader />,
});

const ANIMATIONS = [
  { id: 'orbit',     label: 'Orbit',      index: '01', sub: '3D Earth renderer',        accentColor: '#fbbf24', Component: Earth3D      },
  { id: 'blob',      label: 'Blob',       index: '02', sub: 'Organic cursor motion',   accentColor: '#a78bfa', Component: BlobCursor   },
  { id: 'bubbles',   label: 'Bubbles',    index: '03', sub: 'Floating skill particles', accentColor: '#38bdf8', Component: BubbleSkills },
  { id: 'skillflow', label: 'Skill Flow', index: '04', sub: 'Logic flip sequence',      accentColor: '#6366f1', Component: SkillFlow    },
];

const TICKER = 'ANIMATION STUDIO ◆ INTERACTIVE CANVAS ◆ LIVE PREVIEW ◆ NEXT.JS ◆ REACT ◆ FRAMER MOTION ◆ TAILWIND CSS ◆ ';

export default function AnimationStudio() {
  // ✅ Default changed to 'orbit'
  const [active, setActive] = useState('orbit');

  const current = ANIMATIONS.find((a) => a.id === active) || ANIMATIONS[0];
  const { Component } = current;

  return (
    <div
      className="relative flex flex-col w-full h-screen overflow-hidden font-mono text-white"
      style={{ background: '#050505' }}
    >
      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Accent glow tied to active scene */}
      <div
        className="pointer-events-none absolute -top-48 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full z-0 transition-all duration-1000"
        style={{ background: `radial-gradient(circle, ${current.accentColor}10 0%, transparent 70%)` }}
      />

      {/* ── TOP NAVBAR ──────────────────────────────────────────────────────── */}
      <nav
        className="relative z-50 w-full border-b flex-shrink-0"
        style={{ borderColor: '#1a1a1a', background: 'rgba(5,5,5,0.9)', backdropFilter: 'blur(20px)' }}
      >
        <div className="flex items-center w-full">

          {/* Brand */}
          <div
            className="flex items-center gap-3 px-5 py-3 border-r flex-shrink-0"
            style={{ borderColor: '#1a1a1a' }}
          >
            <span
              className="text-[11px] transition-colors duration-500"
              style={{ color: current.accentColor }}
            >
              ◆
            </span>
            <div>
              <p className="text-[8px] tracking-[0.3em] text-[#333] uppercase leading-none mb-0.5">
                Portfolio
              </p>
              <p className="text-[10px] tracking-[0.2em] text-white/80 uppercase leading-none font-semibold">
                Animation Studio
              </p>
            </div>
          </div>

          {/* Scene tabs */}
          <div className="flex items-center overflow-x-auto flex-1 hide-scrollbar">
            {ANIMATIONS.map((a) => {
              const isActive = active === a.id;
              return (
                <button
                  key={a.id}
                  onClick={() => setActive(a.id)}
                  className="relative flex items-center gap-2.5 px-5 py-3 border-r flex-shrink-0 transition-all duration-300"
                  style={{
                    borderColor: '#1a1a1a',
                    background: isActive ? 'rgba(255,255,255,0.03)' : 'transparent',
                  }}
                >
                  <span
                    className="text-[9px] tracking-widest transition-colors duration-300"
                    style={{ color: isActive ? a.accentColor : '#272727' }}
                  >
                    _{a.index}
                  </span>
                  <span
                    className="text-[10px] tracking-[0.18em] uppercase transition-colors duration-300"
                    style={{ color: isActive ? '#fff' : '#383838' }}
                  >
                    {a.label}
                  </span>

                  {/* Active underline glow */}
                  <span
                    className="absolute bottom-0 left-0 right-0 h-px transition-all duration-500"
                    style={{
                      background: isActive
                        ? `linear-gradient(90deg, transparent, ${a.accentColor}, transparent)`
                        : 'transparent',
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Live indicator */}
          <div
            className="hidden sm:flex items-center gap-2 px-5 py-3 flex-shrink-0 border-l"
            style={{ borderColor: '#1a1a1a' }}
          >
            <span
              className="w-1 h-1 rounded-full animate-pulse"
              style={{ background: current.accentColor, boxShadow: `0 0 6px ${current.accentColor}` }}
            />
            <span className="text-[9px] tracking-[0.3em] text-[#333] uppercase">Live</span>
          </div>
        </div>
      </nav>

      {/* ── FULL-WIDTH CANVAS ───────────────────────────────────────────────── */}
      <main className="relative z-10 flex-1 overflow-hidden">

        {/* Animation component */}
        <div
          key={active}
          className="w-full h-full"
          style={{ animation: 'studioFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) both' }}
        >
          <Component />
        </div>

        {/* Corner crosshairs */}
        <div className="absolute top-3 left-3 pointer-events-none">
          <div className="w-3 h-px bg-[#1a1a1a]" />
          <div className="w-px h-3 bg-[#1a1a1a]" />
        </div>
        <div className="absolute top-3 right-3 pointer-events-none flex flex-col items-end">
          <div className="w-3 h-px bg-[#1a1a1a]" />
          <div className="w-px h-3 bg-[#1a1a1a]" />
        </div>
        <div className="absolute bottom-9 left-3 pointer-events-none">
          <div className="w-px h-3 bg-[#1a1a1a]" />
          <div className="w-3 h-px bg-[#1a1a1a]" />
        </div>
        <div className="absolute bottom-9 right-3 pointer-events-none flex flex-col items-end">
          <div className="w-px h-3 bg-[#1a1a1a]" />
          <div className="w-3 h-px bg-[#1a1a1a]" />
        </div>

        {/* Bottom-right scene label */}
        <div className="absolute bottom-4 right-4 pointer-events-none select-none">
          <div
            className="flex items-center gap-2 px-3 py-1.5 border"
            style={{
              borderColor: '#1a1a1a',
              background: 'rgba(5,5,5,0.85)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <span
              className="w-1 h-1 rounded-full animate-pulse"
              style={{ background: current.accentColor, boxShadow: `0 0 6px ${current.accentColor}` }}
            />
            <span
              className="text-[9px] tracking-[0.3em] uppercase"
              style={{ color: current.accentColor }}
            >
              {current.label}
            </span>
            <span className="text-[9px] tracking-[0.2em] text-[#282828] uppercase">
              · {current.sub}
            </span>
          </div>
        </div>

        {/* Bottom-left ghost index watermark */}
        <div className="absolute bottom-3 left-4 pointer-events-none select-none">
          <span
            className="text-[56px] font-black leading-none opacity-[0.04] transition-all duration-500"
            style={{ color: current.accentColor }}
          >
            {current.index}
          </span>
        </div>
      </main>

      {/* ── BOTTOM TICKER TAPE ──────────────────────────────────────────────── */}
      <div
        className="relative z-50 flex-shrink-0 border-t overflow-hidden"
        style={{ borderColor: '#1a1a1a', background: '#050505', height: '26px' }}
      >
        <div
          className="flex items-center h-full whitespace-nowrap"
          style={{ animation: 'studioTicker 30s linear infinite' }}
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-[8px] tracking-[0.35em] uppercase" style={{ color: '#252525' }}>
              {TICKER}
            </span>
          ))}
        </div>
        <div
          className="absolute left-0 top-0 h-full w-12 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #050505, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 h-full w-12 pointer-events-none"
          style={{ background: 'linear-gradient(-90deg, #050505, transparent)' }}
        />
      </div>

      <style jsx global>{`
        @keyframes studioFadeIn {
          from { opacity: 0; transform: scale(0.99) translateY(3px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes studioTicker {
          from { transform: translateX(0); }
          to   { transform: translateX(-25%); }
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}