'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import BlobCursor from '@/components/home/BlobCursor';
import BubbleSkills from '@/components/home/BubbleSkills';
import SkillFlow from '@/components/animations/FlipUp';

const Earth3D = dynamic(() => import("@/components/animations/Earth3D"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full bg-[#050505]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-8 h-8">
          <div className="absolute inset-0 border border-[#fbbf24]/20 rounded-full" />
          <div className="absolute inset-0 border border-transparent border-t-[#fbbf24]/60 rounded-full animate-spin" />
        </div>
        <span className="text-[9px] tracking-[0.35em] text-[#3a3a3a] font-mono uppercase">
          Loading Orbit
        </span>
      </div>
    </div>
  ),
});

const ANIMATIONS = [
  { id: 'blob',      label: 'Blob',       index: '01', sub: 'Organic cursor motion',   accentColor: '#a78bfa', Component: BlobCursor   },
  { id: 'bubbles',   label: 'Bubbles',    index: '02', sub: 'Floating skill particles', accentColor: '#38bdf8', Component: BubbleSkills },
  { id: 'orbit',     label: 'Orbit',      index: '03', sub: '3D Earth renderer',        accentColor: '#fbbf24', Component: Earth3D      },
  { id: 'skillflow', label: 'Skill Flow', index: '04', sub: 'Logic flip sequence',      accentColor: '#6366f1', Component: SkillFlow    },
];

const TICKER = 'ANIMATION STUDIO ◆ INTERACTIVE CANVAS ◆ LIVE PREVIEW ◆ NEXT.JS ◆ REACT ◆ FRAMER MOTION ◆ TAILWIND CSS ◆ ';

export default function AnimationStudio() {
  const [active, setActive] = useState('blob');

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