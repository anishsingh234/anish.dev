"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";

/* ─── NUDGE DATA ──────────────────────────────────────────────────────────── */
const NUDGES = [
  {
    tag: "01 / BLOG",
    msg: "Did you visit",
    highlight: "the Blog?",
    sub: "AI, RAG & dev deep-dives.",
    href: "/blog",
    color: "#c4b5fd",           // purple-300
    borderColor: "rgba(167,139,250,0.30)",
    glowColor: "rgba(167,139,250,0.07)",
    dotColor: "#a78bfa",
    accentText: "rgba(167,139,250,0.55)",
  },
  {
    tag: "02 / WHY ME",
    msg: "Need a reason",
    highlight: "to hire me?",
    sub: "I built a whole section for that.",
    href: "#why-hire-me",
    color: "#6ee7b7",           // emerald-300
    borderColor: "rgba(52,211,153,0.30)",
    glowColor: "rgba(52,211,153,0.06)",
    dotColor: "#34d399",
    accentText: "rgba(52,211,153,0.55)",
  },
  {
    tag: "03 / STUDIO",
    msg: "Explored the",
    highlight: "animated studio?",
    sub: "Projects that actually move.",
    href: "/animations",
    color: "#7dd3fc",           // sky-300
    borderColor: "rgba(56,189,248,0.30)",
    glowColor: "rgba(56,189,248,0.06)",
    dotColor: "#38bdf8",
    accentText: "rgba(56,189,248,0.55)",
  },
  {
    tag: "04 / GITHUB",
    msg: "Checked out",
    highlight: "my GitHub?",
    sub: "Real code. Real commits.",
    href: "https://github.com/anishsingh234",
    color: "#f9a8d4",           // pink-300
    borderColor: "rgba(244,114,182,0.30)",
    glowColor: "rgba(244,114,182,0.06)",
    dotColor: "#f472b6",
    accentText: "rgba(244,114,182,0.55)",
    external: true,
  },
  {
    tag: "05 / CONTACT",
    msg: "Got a suggestion?",
    highlight: "Let's talk →",
    sub: "I read every message.",
    href: "#contact",
    color: "#fde68a",           // amber-300
    borderColor: "rgba(251,191,36,0.30)",
    glowColor: "rgba(251,191,36,0.05)",
    dotColor: "#fbbf24",
    accentText: "rgba(251,191,36,0.55)",
  },
];

const INTERVAL = 3800;

/* ─── DESKTOP CARD ────────────────────────────────────────────────────────── */
function DesktopNudge({
  nudge,
  index,
  total,
  onDotClick,
}: {
  nudge: (typeof NUDGES)[0];
  index: number;
  total: number;
  onDotClick: (i: number) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const msgRef = useRef<HTMLParagraphElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressTween = useRef<gsap.core.Tween | null>(null);

  const n = nudge;

  // ── Entrance + transition animation ──
  useEffect(() => {
    const tl = gsap.timeline();

    // Card entrance
    tl.fromTo(
      cardRef.current,
      { opacity: 0, y: 24, scale: 0.93, filter: "blur(10px)" },
      { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.55, ease: "power3.out" }
    );

    // Accent sweep line
    tl.fromTo(
      accentRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.5, ease: "power3.out" },
      "-=0.35"
    );

    // Tag slide in
    tl.fromTo(
      tagRef.current,
      { opacity: 0, x: -14 },
      { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" },
      "-=0.3"
    );

    // "hey recruiter" label
    tl.fromTo(
      labelRef.current,
      { opacity: 0, y: 4 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
      "-=0.2"
    );

    // Message text
    tl.fromTo(
      msgRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
      "-=0.15"
    );

    // Highlight text — springs in with overshoot
    tl.fromTo(
      highlightRef.current,
      { opacity: 0, y: 10, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.4)" },
      "-=0.2"
    );

    // Sub section
    tl.fromTo(
      subRef.current,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
      "-=0.15"
    );

    // Progress bar — linear fill over interval
    if (progressRef.current) {
      gsap.set(progressRef.current, { width: "0%" });
      progressTween.current = gsap.to(progressRef.current, {
        width: "100%",
        duration: INTERVAL / 1000,
        ease: "none",
      });
    }

    return () => {
      tl.kill();
      progressTween.current?.kill();
    };
  }, [index]); // re-run on every nudge change

  // ── Magnetic hover ──
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
    gsap.to(el, {
      rotateY: x,
      rotateX: -y,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  const Wrapper: any = n.external ? "a" : Link;
  const wrapperProps: any = n.external
    ? { href: n.href, target: "_blank", rel: "noopener noreferrer" }
    : { href: n.href };

  return (
    <div className="absolute right-10 xl:right-16 top-1/2 -translate-y-[52%] z-20 hidden lg:block pointer-events-none select-none">
      {/* Depth shadow cards */}
      <div
        className="absolute inset-0 translate-x-2.5 translate-y-3.5 rounded-2xl"
        style={{
          border: "1px solid rgba(167,139,250,0.05)",
          background: "rgba(14,11,26,0.55)",
        }}
      />
      <div
        className="absolute inset-0 translate-x-1 translate-y-1.5 rounded-2xl"
        style={{
          border: "1px solid rgba(167,139,250,0.09)",
          background: "rgba(14,11,26,0.72)",
        }}
      />

      {/* Main card */}
      <div
        ref={cardRef}
        className="relative w-[280px] rounded-2xl overflow-hidden pointer-events-auto will-change-transform"
        style={{
          opacity: 0,
          border: `1px solid ${n.borderColor}`,
          background: `linear-gradient(145deg, ${n.glowColor} 0%, rgba(14,11,26,0.97) 65%)`,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Accent sweep line */}
        <div
          ref={accentRef}
          className="origin-left h-[1.5px] w-full"
          style={{
            transform: "scaleX(0)",
            background: `linear-gradient(90deg, ${n.dotColor}, transparent 80%)`,
          }}
        />

        <div className="px-6 pt-5 pb-4 space-y-4">
          {/* Tag + pulse dot */}
          <div ref={tagRef} className="flex items-center justify-between" style={{ opacity: 0 }}>
            <span
              className="text-[9px] font-mono tracking-[0.28em] uppercase"
              style={{ color: n.accentText }}
            >
              {n.tag}
            </span>
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="animate-ping absolute h-full w-full rounded-full opacity-55"
                style={{ background: n.dotColor }}
              />
              <span
                className="relative rounded-full h-1.5 w-1.5"
                style={{ background: n.dotColor }}
              />
            </span>
          </div>

          {/* "hey recruiter" */}
          <p
            ref={labelRef}
            className="text-[9px] font-mono text-white/22 tracking-[0.22em] uppercase leading-none"
            style={{ opacity: 0 }}
          >
            hey recruiter —
          </p>

          {/* Main copy */}
          <div className="space-y-1">
            <p
              ref={msgRef}
              className="text-[14px] font-light text-white/50 leading-snug"
              style={{ opacity: 0 }}
            >
              {n.msg}
            </p>
            <div ref={highlightRef} style={{ opacity: 0 }}>
              <Wrapper
                {...wrapperProps}
                className="text-[20px] font-black leading-tight tracking-tight hover:opacity-75 transition-opacity"
                style={{ color: n.color }}
              >
                {n.highlight}
              </Wrapper>
            </div>
          </div>

          {/* Sub text */}
          <div
            ref={subRef}
            className="pt-3 border-t"
            style={{ borderColor: "rgba(255,255,255,0.05)", opacity: 0 }}
          >
            <p className="text-[10px] font-mono text-white/28 leading-relaxed tracking-wide">
              {n.sub}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div
          className="mx-6 mb-2.5 rounded-full overflow-hidden"
          style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}
        >
          <div
            ref={progressRef}
            className="h-full rounded-full"
            style={{ width: "0%", background: n.dotColor, opacity: 0.45 }}
          />
        </div>

        {/* Dot nav */}
        <div className="flex justify-center gap-2 pb-4">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => onDotClick(i)}
              className="rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: i === index ? 18 : 5,
                height: 5,
                background: i === index ? n.dotColor : "rgba(255,255,255,0.13)",
                opacity: i === index ? 0.9 : 1,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── MOBILE TICKER ───────────────────────────────────────────────────────── */
function MobileNudge({
  nudge,
  index,
  total,
  onDotClick,
}: {
  nudge: (typeof NUDGES)[0];
  index: number;
  total: number;
  onDotClick: (i: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressTween = useRef<gsap.core.Tween | null>(null);

  const n = nudge;

  useEffect(() => {
    const tl = gsap.timeline();

    // Accent line sweep
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.45, ease: "power3.out" }
    );

    // Content fade + slide
    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 8, filter: "blur(4px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.4, ease: "power3.out" },
      "-=0.2"
    );

    // Progress bar
    if (progressRef.current) {
      gsap.set(progressRef.current, { width: "0%" });
      progressTween.current = gsap.to(progressRef.current, {
        width: "100%",
        duration: INTERVAL / 1000,
        ease: "none",
      });
    }

    return () => {
      tl.kill();
      progressTween.current?.kill();
    };
  }, [index]);

  // Entrance animation on first mount
  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.5, ease: "power4.out" }
    );
  }, []);

  const Wrapper: any = n.external ? "a" : Link;
  const wrapperProps: any = n.external
    ? { href: n.href, target: "_blank", rel: "noopener noreferrer" }
    : { href: n.href };

  return (
    <div
      ref={containerRef}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
      style={{ opacity: 0 }}
    >
      <div
        className="mx-4 mb-4 rounded-xl overflow-hidden pointer-events-auto"
        style={{
          border: `1px solid ${n.borderColor}`,
          background: "rgba(14,11,26,0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        {/* Top accent */}
        <div
          ref={lineRef}
          className="origin-left h-[1.5px] w-full"
          style={{
            transform: "scaleX(0)",
            background: `linear-gradient(90deg, ${n.dotColor}, transparent 80%)`,
          }}
        />

        {/* Content */}
        <div
          ref={contentRef}
          className="flex items-center gap-3 px-4 py-3"
          style={{ opacity: 0 }}
        >
          {/* Pulse dot */}
          <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
            <span
              className="animate-ping absolute h-full w-full rounded-full opacity-60"
              style={{ background: n.dotColor }}
            />
            <span
              className="relative rounded-full h-1.5 w-1.5"
              style={{ background: n.dotColor }}
            />
          </span>

          {/* Text */}
          <span className="text-[9px] font-mono text-white/28 tracking-[0.2em] uppercase flex-shrink-0">
            hey recruiter —
          </span>
          <span className="text-[12px] font-light text-white/50 flex-shrink-0 hidden xs:inline">
            {n.msg}
          </span>
          <Wrapper
            {...wrapperProps}
            className="text-[12px] font-bold flex-shrink-0"
            style={{ color: n.color }}
          >
            {n.highlight}
          </Wrapper>

          {/* Dot nav */}
          <div className="ml-auto flex items-center gap-1.5 flex-shrink-0">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                onClick={() => onDotClick(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === index ? 12 : 4,
                  height: 4,
                  background: i === index ? n.dotColor : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div
          className="mx-4 mb-2 rounded-full overflow-hidden"
          style={{ height: "1px", background: "rgba(255,255,255,0.05)" }}
        >
          <div
            ref={progressRef}
            className="h-full rounded-full"
            style={{ width: "0%", background: n.dotColor, opacity: 0.4 }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN EXPORT ─────────────────────────────────────────────────────────── */
export default function RecruiterNudge() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setIndex((i) => (i + 1) % NUDGES.length);
    }, INTERVAL);
    return () => clearInterval(iv);
  }, []);

  const handleDotClick = useCallback((i: number) => {
    setIndex(i);
  }, []);

  const n = NUDGES[index];

  return (
    <>
      {/* Desktop — absolute positioned card */}
      <DesktopNudge
        nudge={n}
        index={index}
        total={NUDGES.length}
        onDotClick={handleDotClick}
      />

      {/* Mobile — fixed bottom ticker */}
      <MobileNudge
        nudge={n}
        index={index}
        total={NUDGES.length}
        onDotClick={handleDotClick}
      />
    </>
  );
}