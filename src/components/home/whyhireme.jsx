"use client";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const proof = [
  {
    emoji: "🚀",
    title: "Products Shipped",
    sub: "ChatSathi · HopeBridge · HealSync",
    stat: "12+",
  },
  {
    emoji: "🧠",
    title: "AI Systems Built",
    sub: "LLMs · RAG · Agents · Multi-Agent",
    stat: "5+",
  },
  {
    emoji: "⚡",
    title: "DSA Problems Solved",
    sub: "LeetCode · Algorithms · Data Structures",
    stat: "350+",
  },
  {
    emoji: "🏗️",
    title: "Production Experience",
    sub: "Exponent Solutions · 3,000+ users",
    stat: "6mo+",
  },
  {
    emoji: "🎓",
    title: "Graduating 2026",
    sub: "B.Tech CS — AI & ML · UTU Dehradun",
    stat: "'26",
  },
];

export default function WhyHireMe() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mobile = window.innerWidth < 640;

      // 1. Header Animation Timeline
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      headerTl
        .from(".hire-header-text", {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        })
        .fromTo(
          ".hire-title-highlight path",
          {
            strokeDasharray: 300,
            strokeDashoffset: 300,
          },
          {
            strokeDashoffset: 0,
            duration: 0.8,
            ease: "power2.inOut",
          },
          "-=0.4",
        );

      // 2. Pitch Note (Left) — reduced x on mobile to prevent overflow
      gsap.from(".hire-pitch-note", {
        x: mobile ? -30 : -80,
        y: mobile ? 30 : 50,
        opacity: 0,
        rotationZ: mobile ? -3 : -8,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hire-pitch-note",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // 3. Evidence Tags (Right - Staggered) — reduced x on mobile
      gsap.from(".hire-evidence-tag", {
        x: mobile ? 30 : 80,
        opacity: 0,
        rotationZ: () => (mobile ? Math.random() * 4 - 2 : Math.random() * 10 - 5),
        y: mobile ? 20 : 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".hire-pitch-note",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="why-hire-me"
      ref={sectionRef}
      className="relative py-14 sm:py-20 md:py-32 bg-[#05050A] font-sans overflow-hidden border-t border-white/5"
    >
      {/* Subtle Paper texture background — hidden on mobile for performance */}
      <svg className="hidden md:block pointer-events-none absolute inset-0 z-0 w-full h-full opacity-10 mix-blend-overlay">
        <filter id="hire-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.5 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#hire-noise)" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 relative z-10">
        {/* ── Section header ── */}
        <div className="mb-10 sm:mb-16 md:mb-20 overflow-hidden sm:overflow-visible">
          <div className="hire-header-text relative inline-block">
            <p className="text-[10px] font-mono text-purple-400/80 tracking-[0.3em] uppercase mb-3 sm:mb-4 font-bold">
              ◆ &nbsp; The Verdict
            </p>
            <h2
              className="font-black text-white leading-[1.05] tracking-tight relative inline-block z-10"
              style={{
                fontSize: "clamp(2.2rem, 7vw, 5.5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              The case
              <br />
              <span
                className="text-transparent relative z-10 inline-block"
                style={{ WebkitTextStroke: "1px #E8E6E1" }}
              >
                for hiring me.
                {/* SVG Highlight behind text */}
                <svg
                  className="hire-title-highlight absolute bottom-0 left-0 w-full h-[60%] -z-10 overflow-visible opacity-70"
                  viewBox="0 0 200 40"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M5,30 C50,20 150,20 195,30"
                    stroke="#A78BFA"
                    strokeWidth="15"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray="300"
                    strokeDashoffset="300"
                  />
                </svg>
              </span>
            </h2>
          </div>
        </div>

        {/* ── Two column body ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 sm:gap-12 lg:gap-20 items-start">
          {/* ── Left: Pitch Note (Parchment) ── */}
          <div
            className="hire-pitch-note relative bg-[#E8E6E1] text-[#111018] p-5 sm:p-8 md:p-12 shadow-2xl z-10 rounded-lg sm:rounded-none hire-clip-parchment"
            style={{
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            }}
          >
            {/* Top Tape */}
            <div className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-6 sm:h-8 bg-white/40 backdrop-blur-md rotate-[3deg] z-20 shadow-sm" />

            {/* Top Secret Stamp — smaller on mobile */}
            <div className="absolute bottom-6 sm:bottom-10 right-4 sm:right-6 opacity-15 sm:opacity-20 transform -rotate-12 pointer-events-none select-none border-2 sm:border-4 border-red-500 text-red-500 font-bold uppercase tracking-widest p-1.5 sm:p-2 text-lg sm:text-2xl z-0">
              URGENT
            </div>

            <div className="font-mono text-[10px] sm:text-xs opacity-50 uppercase tracking-widest border-b border-black/10 pb-3 sm:pb-4 mb-5 sm:mb-8">
              Subject: Candidate Pitch
            </div>

            <div className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg text-[#111018]/85 leading-relaxed font-serif relative z-10">
              <p>
                I&apos;m not just another dev who can build a CRUD app. I
                combine{" "}
                <span className="font-bold text-[#111018]">
                  solid full-stack engineering
                </span>{" "}
                with real{" "}
                <span className="italic font-bold">AI system experience</span> —
                shipped to production, used by real users.
              </p>
              <p>
                I&apos;ve built RAG pipelines, multi-agent systems, and
                AI-powered SaaS <span className="font-bold">from scratch</span>.
                I think in systems, ship fast, and care deeply about code
                quality and user experience.
              </p>
              <p>
                Whether it&apos;s architecting a scalable backend, designing a
                beautiful UI, or integrating an LLM into a product — I can{" "}
                <span className="font-bold bg-purple-500/20 px-1">
                  own the entire stack
                </span>{" "}
                and deliver.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-black/10 my-5 sm:my-8" />

            {/* CTA */}
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-5 sm:px-8 py-3 sm:py-4 bg-[#111018] text-white text-xs sm:text-sm font-bold rounded-sm transition-transform hover:-translate-y-1 shadow-lg relative z-10"
            >
              Let&apos;s work together
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          {/* ── Right: Evidence Tags (Stacked) ── */}
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 relative z-20">
            {proof.map(({ emoji, title, sub, stat }, i) => (
              <div
                key={title}
                className={`hire-evidence-tag group relative flex items-center gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 md:p-6 bg-[#232132] shadow-xl border border-white/5 transition-transform hover:scale-[1.02] hover:z-30 cursor-default rounded-lg sm:rounded-none ${i % 2 === 0 ? 'hire-clip-even' : 'hire-clip-odd'}`}
              >
                {/* Tape accent — hidden on mobile */}
                <div className="hidden sm:block absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-12 bg-white/10 backdrop-blur-sm rotate-[15deg] shadow-sm z-0" />

                {/* Emoji Box */}
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 shrink-0 bg-[#111018] flex items-center justify-center text-lg sm:text-xl md:text-2xl shadow-inner border border-white/5 relative z-10 rounded-md sm:rounded-none hire-clip-emoji"
                >
                  {emoji}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0 relative z-10">
                  <p className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight mb-0.5 sm:mb-1 group-hover:text-purple-400 transition-colors truncate">
                    {title}
                  </p>
                  <p className="text-[9px] sm:text-[10px] md:text-xs font-mono text-white/50 tracking-wider sm:tracking-widest uppercase truncate">
                    {sub}
                  </p>
                </div>

                {/* Stat */}
                <div className="shrink-0 relative z-10">
                  <span className="font-black text-xl sm:text-2xl md:text-4xl tracking-tighter text-white/50 sm:text-white/30 group-hover:text-white transition-colors">
                    {stat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
