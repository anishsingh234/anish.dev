"use client";
import { useRef } from "react";
import { Mail, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionHeading from "@/components/_ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const stats = [
  { value: "12+", label: "Projects", sub: "Full-Stack & AI" },
  { value: "350+", label: "DSA Solved", sub: "LeetCode" },
  { value: "6mo+", label: "Experience", sub: "Exponent Solutions" },
  { value: "5+", label: "AI SaaS", sub: "Built & Shipped" },
  { value: "'26", label: "Graduating", sub: "B.Tech AI & ML" },
];

export default function AboutSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // 1. Cards Animation Timeline
    const cardsTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-letter",
        start: "top 75%",
        toggleActions: "play none none reverse",
      }
    });

    cardsTl.from(".about-letter", {
      x: -80,
      y: 50,
      opacity: 0,
      rotationZ: -10,
      duration: 1,
      ease: "power3.out"
    })
    .to(".about-name-highlight path", {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: "power2.inOut"
    }, "-=0.2")
    .from(".about-stats-card", {
      x: 80,
      y: -20,
      opacity: 0,
      rotationZ: 15,
      duration: 1,
      ease: "back.out(1.2)"
    }, "-=0.6");

  }, { scope: sectionRef });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 sm:py-32 bg-transparent font-sans overflow-hidden border-t-2 border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* ── Section header ── */}
        <SectionHeading
          eyebrow="Profile"
          title="Who I"
          accent="Actually Am"
          stacked
          align="center"
          className="mb-16 sm:mb-24 w-full"
        />

        {/* ── Overlapping Cards Grid ── */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-0 mt-10">
          {/* ── Left: The Parchment Letter ── */}
          <div
            className="about-letter relative w-full lg:w-[60%] bg-[#E8E6E1] text-[#111018] p-8 sm:p-12 lg:p-16 shadow-2xl z-10"
            style={{
              clipPath: "polygon(1% 1%, 99% 0, 100% 99%, 0 100%)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            }}
          >
            {/* Top Tape */}
            <div className="absolute -top-4 left-10 w-24 h-8 bg-white/40 backdrop-blur-md rotate-[-5deg] z-20 shadow-sm" />

            <div className="flex flex-col gap-8">
              <div className="font-mono text-xs opacity-50 uppercase tracking-widest border-b border-black/10 pb-4">
                File No: 404-DEV // Confidential Summary
              </div>

              {/* Paragraphs in Serif */}
              <div className="space-y-6 text-base sm:text-lg text-[#111018]/80 leading-relaxed font-serif">
                <p>
                  I&apos;m a{" "}
                  <span className="font-bold text-[#111018]">
                    Full-Stack Developer
                  </span>{" "}
                  who builds production-grade web applications with{" "}
                  <span className="italic">Next.js, React, Node.js</span> and
                  modern databases — then makes them intelligent.
                </p>
                <p>
                  What sets me apart is the ability to seamlessly layer{" "}
                  <span className="relative inline-block font-bold">
                    AI capabilities
                    {/* Hand-drawn SVG circle highlight */}
                    <svg
                      className="about-name-highlight absolute -inset-2 w-[calc(100%+1rem)] h-[calc(100%+1rem)] pointer-events-none z-10 overflow-visible"
                      viewBox="0 0 100 40"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M10,20 C10,5 90,5 90,20 C90,35 10,35 10,20 C10,10 90,10 90,20"
                        fill="none"
                        stroke="#A78BFA"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray="300"
                        strokeDashoffset="300"
                      />
                    </svg>
                  </span>{" "}
                  on top of solid engineering — LLMs, RAG pipelines, agents, and
                  multi-agent workflows that actually work in production.
                </p>
                <p>
                  I&apos;ve shipped multiple AI-powered SaaS products that
                  combine beautiful frontends with scalable backends. Currently
                  interning at{" "}
                  <span className="font-bold">Exponent Solutions</span> and
                  finishing my B.Tech in AI & ML.
                </p>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-black/10 my-2" />

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:anishsingh210204@gmail.com"
                  className="group flex items-center gap-2 px-6 py-3 bg-[#111018] text-white text-sm font-bold rounded-sm transition-transform hover:-translate-y-1 shadow-lg"
                >
                  <Mail className="w-4 h-4" />
                  Contact Me
                </a>
                <a
                  href="https://linkedin.com/in/anish-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-6 py-3 border-2 border-[#111018] text-[#111018] font-bold text-sm rounded-sm transition-colors hover:bg-[#111018]/5"
                >
                  LinkedIn
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* ── Right: The Dark ID Card (Stats) ── */}
          <div
            className="about-stats-card relative w-full lg:w-[45%] lg:-ml-12 bg-[#232132] text-white p-8 sm:p-10 shadow-2xl z-20"
            style={{
              clipPath: "polygon(0 0, 100% 2%, 98% 100%, 2% 98%)",
              boxShadow: "-10px 20px 40px rgba(0,0,0,0.6)",
            }}
          >
            {/* Red Stamp */}
            <div className="absolute -top-4 -right-4 opacity-40 transform rotate-12 pointer-events-none select-none border-4 border-red-500 text-red-500 font-bold uppercase tracking-widest p-2 text-2xl z-30">
              VERIFIED
            </div>

            <div className="font-mono text-xs opacity-50 uppercase tracking-widest border-b border-white/10 pb-4 mb-8">
              Key Metrics
            </div>

            <div className="flex flex-col gap-6">
              {stats.map(({ value, label, sub }, i) => (
                <div
                  key={label}
                  className="flex items-center justify-between group cursor-default"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-purple-300">
                      {label}
                    </span>
                    <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">
                      {sub}
                    </span>
                  </div>

                  <span className="font-black text-3xl sm:text-4xl tracking-tighter text-white group-hover:text-purple-400 transition-colors">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Note */}
            <div className="mt-10 pt-6 border-t border-white/10 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[10px] font-mono text-white/60 tracking-widest uppercase">
                Open to Opportunities
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
