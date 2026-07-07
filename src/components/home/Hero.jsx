"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Github,
  Mail,
  ArrowUpRight,
  Download,
  Brain,
  Code2,
  Rocket,
} from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// SVG filter for paper texture noise
const PaperTexture = () => (
  <svg className="hidden md:block pointer-events-none fixed inset-0 z-50 w-full h-full opacity-[0.15] mix-blend-overlay">
    <filter id="noise">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.8"
        numOctaves="4"
        stitchTiles="stitch"
      />
      <feColorMatrix
        type="matrix"
        values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.5 0"
      />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
);

export default function Hero() {
  const containerRef = useRef(null);
  const storyWrapRef = useRef(null);

  useGSAP(
    () => {
      // 1. Initial "Drawing" Animation (Delayed to sync with Preloader exit)
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 3.2, // Wait for Preloader to finish sketching (2.2s) + pause (0.3s) + swipe (0.9s)
      });

      // 1. Drop in collage letters with gravity and bounce
      tl.fromTo(
        ".collage-letter",
        {
          y: -300,
          opacity: 0,
          rotationZ: () => Math.random() * 60 - 30,
          scale: 1.5,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          // Try to keep their original inline rotation if possible
          rotationZ: (i, el) => parseFloat(el.getAttribute("data-rot") || "0"),
          ease: "bounce.out",
        },
      )
        // 2. Stamp the last name aggressively
        .fromTo(
          ".stamped-text",
          { opacity: 0, scale: 3 },
          {
            opacity: 0.8,
            scale: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: "power4.in",
          },
          "-=0.2",
        )
        // 3. Flutter in the paper cut-out elements
        .fromTo(
          ".paper-card",
          {
            y: 60,
            opacity: 0,
            rotationZ: () => Math.random() * 10 - 5,
            rotationX: 30,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            rotationZ: 0,
            rotationX: 0,
            ease: "power3.out",
          },
          "-=0.2",
        )
        .fromTo(
          ".scroll-indicator",
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.4",
        );

      // 2. Scrollytelling Pinned Sequence
      const panels = gsap.utils.toArray(".story-panel");

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: storyWrapRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          start: "top top",
          end: () => "+=" + storyWrapRef.current.offsetWidth,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0D0A10] text-white overflow-hidden font-sans"
    >
      <PaperTexture />

      {/* ── Landing Area ── */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-40">
        <h1 className="sr-only">Anish Singh - Full Stack Developer and AI Engineer</h1>
        {/* ── Collage Name: ANISH ── */}
        <div className="w-full max-w-4xl mx-auto mb-2 flex flex-col items-center justify-center relative z-10">
          <div className="flex justify-center items-center gap-1 sm:gap-3 mb-6">
            {/* A - Newspaper */}
            <div
              className="collage-letter relative bg-[#f4f1ea] text-black font-bebas text-6xl sm:text-8xl px-4 sm:px-6 py-2 sm:py-4 shadow-xl border border-gray-300"
              data-rot="-6"
              style={{
                clipPath: "polygon(5% 0%, 100% 3%, 95% 100%, 0% 97%)",
                transform: "rotate(-6deg)",
              }}
            >
              A
            </div>
            {/* N - Yellow notepad */}
            <div
              className="collage-letter relative bg-[#fdf5c9] text-blue-800 font-bebas text-6xl sm:text-8xl px-4 sm:px-6 py-2 sm:py-4 shadow-xl border-t-[10px] border-[#e2d58b]"
              data-rot="4"
              style={{
                clipPath: "polygon(0% 2%, 98% 0%, 100% 98%, 3% 100%)",
                transform: "rotate(4deg)",
              }}
            >
              N
            </div>
            {/* I - Black tape */}
            <div
              className="collage-letter relative bg-[#1a1a1a] text-white font-bebas text-6xl sm:text-8xl px-5 sm:px-8 py-1 sm:py-2 shadow-2xl"
              data-rot="-2"
              style={{
                clipPath: "polygon(2% 0%, 98% 2%, 100% 100%, 0% 96%)",
                transform: "rotate(-2deg)",
              }}
            >
              I
            </div>
            {/* S - Cardboard */}
            <div
              className="collage-letter relative bg-[#d4b595] text-[#3a2818] font-bebas text-6xl sm:text-8xl px-4 sm:px-6 py-2 sm:py-4 shadow-xl border-2 border-[#b59575] border-dashed"
              data-rot="8"
              style={{ transform: "rotate(8deg)" }}
            >
              S
            </div>
            {/* H - Receipt paper */}
            <div
              className="collage-letter relative bg-white text-black font-bebas text-6xl sm:text-8xl px-4 sm:px-6 py-2 sm:py-4 shadow-xl"
              data-rot="-5"
              style={{
                clipPath: "polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)",
                transform: "rotate(-5deg)",
              }}
            >
              H
            </div>
          </div>

          {/* Stamped Last Name: SINGH */}
          <div className="flex justify-center mb-16 relative">
            <div
              className="stamped-text font-bebas text-5xl sm:text-7xl tracking-[0.2em] text-[#ff3366] mix-blend-screen"
              style={{ transform: "rotate(-2deg)" }}
            >
              SINGH
            </div>
            {/* Ink splatters */}
            <div
              className="stamped-text absolute -top-4 right-0 w-3 h-3 bg-[#ff3366] rounded-full mix-blend-screen"
              style={{ transform: "rotate(-2deg)" }}
            ></div>
            <div className="stamped-text absolute bottom-2 -left-4 w-1.5 h-1.5 bg-[#ff3366] rounded-full mix-blend-screen"></div>
          </div>
        </div>

        {/* Paper Cut-out CTA Cards */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 relative z-10">
          {/* View My Work - Manila folder tab */}
          <a
            href="#projects"
            className="paper-card group relative bg-[#d9c5a0] text-[#111018] px-8 py-4 font-bold text-lg inline-flex items-center gap-3 transition-transform hover:scale-105 border border-[#c2ae87]"
            style={{
              clipPath: "polygon(0% 10%, 15% 0%, 100% 0%, 100% 100%, 0% 100%)",
              boxShadow: "4px 8px 15px rgba(0,0,0,0.4)",
            }}
          >
            <span>View My Work</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>

          {/* Resume - Neon Sticky Note */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="paper-card group relative bg-[#ffeb3b] text-[#111018] px-8 py-4 font-bold text-lg inline-flex items-center gap-3 transition-transform hover:-translate-y-2 origin-bottom-right"
            style={{
              boxShadow: "6px 6px 15px rgba(0,0,0,0.4)",
              clipPath: "polygon(0% 0%, 100% 0%, 95% 100%, 0% 95%)",
            }}
          >
            <Download className="w-5 h-5" />
            <span>Resume</span>
            {/* Sticky note folded corner illusion */}
            <div
              className="absolute bottom-0 right-0 w-6 h-6 bg-[#d4c32b] transform -rotate-12 translate-x-1 translate-y-1 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ clipPath: "polygon(0% 100%, 100% 0%, 100% 100%)" }}
            ></div>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-10 flex flex-col items-center gap-2 opacity-60">
          <span
            className="text-2xl font-caveat text-white/80"
            style={{ transform: "rotate(-6deg)" }}
          >
            Scroll to read
          </span>
          {/* Hand-drawn arrow SVG */}
          <svg
            width="40"
            height="60"
            viewBox="0 0 40 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/80"
          >
            <path d="M20 5 Q25 30 15 50" />
            <path d="M5 40 Q15 55 15 50 Q25 45 35 35" />
          </svg>
        </div>
      </div>

      {/* ── Scrollytelling Chapters ── */}
      <div
        ref={storyWrapRef}
        className="h-screen flex flex-nowrap overflow-hidden bg-[#161520]"
      >
        {/* Chapter 1: The Developer */}
        <div className="story-panel w-screen h-screen flex-shrink-0 flex items-center justify-center p-8 md:p-20 relative">
          <div className="absolute top-10 left-10 md:top-20 md:left-20 text-[10vw] font-black text-white/[0.03] pointer-events-none">
            01
          </div>
          <div
            className="max-w-2xl paper-card bg-[#232132] p-8 md:p-12 rounded-sm border-l-4 border-purple-500"
            style={{
              boxShadow: "10px 15px 30px rgba(0,0,0,0.5)",
              clipPath: "polygon(0 0, 100% 1%, 99% 100%, 1% 99%)",
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <Code2 className="w-10 h-10 text-purple-400" />
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                The Developer
              </h2>
            </div>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light font-serif">
              I build production-grade web applications. My foundation is built
              on{" "}
              <span className="font-bold text-white bg-purple-500/20 px-2 py-0.5 rounded">
                Next.js, Node.js, and React
              </span>
              . I treat code like a craft—focusing on clean architecture,
              scalable systems, and seamless user experiences.
            </p>
          </div>
        </div>

        {/* Chapter 2: The AI Engineer */}
        <div className="story-panel w-screen h-screen flex-shrink-0 flex items-center justify-center p-8 md:p-20 relative">
          <div className="absolute top-10 left-10 md:top-20 md:left-20 text-[10vw] font-black text-white/[0.03] pointer-events-none">
            02
          </div>
          <div
            className="max-w-2xl paper-card bg-[#E8E6E1] p-8 md:p-12 rounded-sm border-t-4 border-blue-500"
            style={{
              boxShadow: "10px 15px 30px rgba(0,0,0,0.5)",
              clipPath: "polygon(1% 0, 99% 1%, 100% 100%, 0 99%)",
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <Brain className="w-10 h-10 text-blue-600" />
              <h2 className="text-3xl md:text-5xl font-black text-[#111018] tracking-tight">
                The AI Engineer
              </h2>
            </div>
            <p className="text-lg md:text-xl text-[#111018]/70 leading-relaxed font-light font-serif">
              Web dev alone wasn't enough. I supercharge my applications with{" "}
              <span className="font-bold text-blue-800 bg-blue-500/20 px-2 py-0.5 rounded">
                Intelligent Systems
              </span>
              . From RAG pipelines and custom LLM integrations to multi-agent
              workflows using LangChain and CrewAI, I bridge the gap between AI
              research and practical products.
            </p>
          </div>
        </div>

        {/* Chapter 3: The Creator */}
        <div className="story-panel w-screen h-screen flex-shrink-0 flex items-center justify-center p-8 md:p-20 relative">
          <div className="absolute top-10 left-10 md:top-20 md:left-20 text-[10vw] font-black text-white/[0.03] pointer-events-none">
            03
          </div>
          <div
            className="max-w-2xl paper-card bg-[#1E1A2D] p-8 md:p-12 rounded-sm border-b-4 border-emerald-500"
            style={{
              boxShadow: "10px 15px 30px rgba(0,0,0,0.5)",
              clipPath: "polygon(0 1%, 100% 0, 99% 99%, 1% 100%)",
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <Rocket className="w-10 h-10 text-emerald-400" />
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                The Creator
              </h2>
            </div>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light font-serif">
              I don't just write code; I ship products. I've launched{" "}
              <span className="font-bold text-emerald-300">
                5+ AI SaaS platforms
              </span>{" "}
              and continuously iterate based on user feedback. Currently honing
              my skills as an intern at Exponent Solutions.
            </p>
            <div className="mt-10 flex gap-6">
              <a
                href="https://github.com/anishsingh234"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
              >
                <Github className="w-6 h-6" />{" "}
                <span className="font-mono text-sm">GitHub</span>
              </a>
              <a
                href="mailto:anishsingh210204@gmail.com"
                className="flex items-center gap-2 text-emerald-400/70 hover:text-emerald-400 transition-colors"
              >
                <Mail className="w-6 h-6" />{" "}
                <span className="font-mono text-sm">Contact</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
