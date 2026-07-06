"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Github, Mail, ArrowUpRight, Download, Brain, Code2, Rocket } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// SVG filter for paper texture noise
const PaperTexture = () => (
  <svg className="pointer-events-none fixed inset-0 z-50 w-full h-full opacity-[0.15] mix-blend-overlay">
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
      <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.5 0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
);

export default function Hero() {
  const containerRef = useRef(null);
  const storyWrapRef = useRef(null);

  useGSAP(() => {
    // 1. Initial "Drawing" Animation (Delayed to sync with Preloader exit)
    const tl = gsap.timeline({ defaults: { ease: "power2.out" }, delay: 2.2 });
    
    // Animate SVG text strokes
    tl.fromTo(".drawn-text path", 
      { strokeDasharray: 1000, strokeDashoffset: 1000 },
      { strokeDashoffset: 0, duration: 2, stagger: 0.15, ease: "power1.inOut" }
    )
    // Fill in the text
    .to(".drawn-text path", { fill: "rgba(255,255,255,0.9)", duration: 1 }, "-=0.5")
    // Flutter in the paper cut-out elements
    .fromTo(".paper-card", 
      { y: 60, opacity: 0, rotationZ: () => Math.random() * 10 - 5, rotationX: 30 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, rotationZ: () => Math.random() * 4 - 2, rotationX: 0, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(".scroll-indicator", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 1 }, "-=0.5");

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
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-[#111018] text-white overflow-hidden font-sans">
      <PaperTexture />

      {/* ── Landing Area ── */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-10">
        
        {/* Hand-drawn SVG Title */}
        <div className="w-full max-w-4xl mx-auto mb-16 flex justify-center">
          <svg className="drawn-text w-full h-auto max-h-[30vh] overflow-visible" viewBox="0 0 800 200" fill="transparent" stroke="rgba(167,139,250,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* "ANISH" */}
            <path d="M100 150 L150 50 L200 150 M125 100 L175 100" /> {/* A */}
            <path d="M220 150 L220 50 L280 150 L280 50" /> {/* N */}
            <path d="M310 50 L350 50 M330 50 L330 150 M310 150 L350 150" /> {/* I */}
            <path d="M430 50 C380 50, 380 100, 405 100 C430 100, 430 150, 380 150" /> {/* S */}
            <path d="M460 50 L460 150 M510 50 L510 150 M460 100 L510 100" /> {/* H */}
            
            {/* "SINGH" slightly offset and smaller */}
            <g transform="translate(150, 60) scale(0.6)">
               <path d="M430 50 C380 50, 380 100, 405 100 C430 100, 430 150, 380 150" /> {/* S */}
               <path d="M450 50 L490 50 M470 50 L470 150 M450 150 L490 150" /> {/* I */}
               <path d="M510 150 L510 50 L570 150 L570 50" /> {/* N */}
               <path d="M650 50 C600 50, 590 150, 620 150 C650 150, 650 100, 620 100" /> {/* G */}
               <path d="M680 50 L680 150 M730 50 L730 150 M680 100 L730 100" /> {/* H */}
            </g>
          </svg>
        </div>

        {/* Paper Cut-out CTA Cards */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 relative z-10">
          <a href="#projects" className="paper-card group relative bg-[#E8E6E1] text-[#111018] px-8 py-4 font-bold text-lg inline-flex items-center gap-3 transition-transform hover:scale-105"
             style={{ clipPath: "polygon(2% 0, 100% 2%, 98% 100%, 0 98%)", boxShadow: "4px 8px 15px rgba(0,0,0,0.4)" }}>
             <span>View My Work</span>
             <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
             {/* Drawn underline effect on hover */}
             <svg className="absolute bottom-2 left-8 w-[calc(100%-4rem)] h-2 stroke-[#111018] stroke-2 fill-none stroke-dasharray-[100] stroke-dashoffset-[100] group-hover:stroke-dashoffset-0 transition-all duration-500" viewBox="0 0 100 10" preserveAspectRatio="none">
               <path d="M0 5 Q 50 0 100 8" />
             </svg>
          </a>

          <a href="/resume" className="paper-card group relative bg-transparent border-2 border-purple-400 text-purple-300 px-8 py-4 font-bold text-lg inline-flex items-center gap-3 transition-colors hover:bg-purple-400/10"
             style={{ clipPath: "polygon(0 2%, 98% 0, 100% 98%, 2% 100%)", boxShadow: "4px 6px 12px rgba(167,139,250,0.15)" }}>
             <Download className="w-5 h-5" />
             <span>Resume</span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-10 flex flex-col items-center gap-2 opacity-50">
          <span className="text-xs font-mono tracking-widest uppercase">Scroll to read</span>
          <div className="w-px h-16 bg-gradient-to-b from-purple-400 to-transparent" />
        </div>
      </div>

      {/* ── Scrollytelling Chapters ── */}
      <div ref={storyWrapRef} className="h-screen flex flex-nowrap overflow-hidden bg-[#161520]">
        
        {/* Chapter 1: The Developer */}
        <div className="story-panel w-screen h-screen flex-shrink-0 flex items-center justify-center p-8 md:p-20 relative">
          <div className="absolute top-10 left-10 md:top-20 md:left-20 text-[10vw] font-black text-white/[0.03] pointer-events-none">01</div>
          <div className="max-w-2xl paper-card bg-[#232132] p-8 md:p-12 rounded-sm border-l-4 border-purple-500"
               style={{ boxShadow: "10px 15px 30px rgba(0,0,0,0.5)", clipPath: "polygon(0 0, 100% 1%, 99% 100%, 1% 99%)" }}>
            <div className="flex items-center gap-4 mb-6">
              <Code2 className="w-10 h-10 text-purple-400" />
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">The Developer</h2>
            </div>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light font-serif">
              I build production-grade web applications. My foundation is built on <span className="font-bold text-white bg-purple-500/20 px-2 py-0.5 rounded">Next.js, Node.js, and React</span>. 
              I treat code like a craft—focusing on clean architecture, scalable systems, and seamless user experiences.
            </p>
          </div>
        </div>

        {/* Chapter 2: The AI Engineer */}
        <div className="story-panel w-screen h-screen flex-shrink-0 flex items-center justify-center p-8 md:p-20 relative">
          <div className="absolute top-10 left-10 md:top-20 md:left-20 text-[10vw] font-black text-white/[0.03] pointer-events-none">02</div>
          <div className="max-w-2xl paper-card bg-[#E8E6E1] p-8 md:p-12 rounded-sm border-t-4 border-blue-500"
               style={{ boxShadow: "10px 15px 30px rgba(0,0,0,0.5)", clipPath: "polygon(1% 0, 99% 1%, 100% 100%, 0 99%)" }}>
            <div className="flex items-center gap-4 mb-6">
              <Brain className="w-10 h-10 text-blue-600" />
              <h2 className="text-3xl md:text-5xl font-black text-[#111018] tracking-tight">The AI Engineer</h2>
            </div>
            <p className="text-lg md:text-xl text-[#111018]/70 leading-relaxed font-light font-serif">
              Web dev alone wasn't enough. I supercharge my applications with <span className="font-bold text-blue-800 bg-blue-500/20 px-2 py-0.5 rounded">Intelligent Systems</span>. 
              From RAG pipelines and custom LLM integrations to multi-agent workflows using LangChain and CrewAI, I bridge the gap between AI research and practical products.
            </p>
          </div>
        </div>

        {/* Chapter 3: The Creator */}
        <div className="story-panel w-screen h-screen flex-shrink-0 flex items-center justify-center p-8 md:p-20 relative">
          <div className="absolute top-10 left-10 md:top-20 md:left-20 text-[10vw] font-black text-white/[0.03] pointer-events-none">03</div>
          <div className="max-w-2xl paper-card bg-[#1E1A2D] p-8 md:p-12 rounded-sm border-b-4 border-emerald-500"
               style={{ boxShadow: "10px 15px 30px rgba(0,0,0,0.5)", clipPath: "polygon(0 1%, 100% 0, 99% 99%, 1% 100%)" }}>
            <div className="flex items-center gap-4 mb-6">
              <Rocket className="w-10 h-10 text-emerald-400" />
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">The Creator</h2>
            </div>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light font-serif">
              I don't just write code; I ship products. I've launched <span className="font-bold text-emerald-300">5+ AI SaaS platforms</span> and continuously iterate based on user feedback. 
              Currently honing my skills as an intern at Exponent Solutions.
            </p>
            <div className="mt-10 flex gap-6">
              <a href="https://github.com/anishsingh234" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
                <Github className="w-6 h-6" /> <span className="font-mono text-sm">GitHub</span>
              </a>
              <a href="mailto:anishsingh210204@gmail.com" className="flex items-center gap-2 text-emerald-400/70 hover:text-emerald-400 transition-colors">
                <Mail className="w-6 h-6" /> <span className="font-mono text-sm">Contact</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
