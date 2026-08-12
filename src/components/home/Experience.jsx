"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const experiences = [
  {
    type: "work",
    role: "Full Stack Developer Intern",
    company: "Exponent Solutions",
    location: "Remote",
    period: "Nov 2025 – Present",
    index: "01",
    bullets: [
      "Developed and deployed 3+ full-stack applications serving 3,000+ users",
      "Built a RAG-based AI chatbot using LLMs and vector embeddings",
      "Designed scalable REST APIs and optimized MongoDB queries",
      "Improved frontend performance with reusable component architecture",
    ],
    tech: ["Next.js", "React", "Node.js", "MongoDB", "LLMs", "RAG"],
    link: null,
  },
  {
    type: "education",
    role: "B.Tech — Computer Science (AI & ML)",
    company: "Uttarakhand Technical University",
    location: "Dehradun, India",
    period: "Aug 2022 – Jun 2026",
    index: "02",
    bullets: [
      "Specialization in Artificial Intelligence & Machine Learning",
      "350+ DSA problems solved on LeetCode",
      "Built production AI SaaS projects alongside coursework",
    ],
    tech: [],
    link: null,
  },
  {
    type: "education",
    role: "Class 12 — Science (PCM)",
    company: "Kendriya Vidyalaya",
    location: "Patna, India",
    period: "2021 – 2022",
    index: "03",
    bullets: [],
    tech: [],
    link: null,
  },
];

function TimelineCard({ exp, index }) {
  const isWork = exp.type === "work";
  const isEven = index % 2 === 0;

  // Paper Craft styling based on type
  const bg = isWork ? "bg-[#232132]" : "bg-[#E8E6E1]";
  const textPrimary = isWork ? "text-white" : "text-[#111018]";
  const textSecondary = isWork ? "text-white/70" : "text-[#111018]/70";
  const border = isWork ? "border-white/10" : "border-[#111018]/20";

  // Random slight rotation for physical feel
  const rotation = (index % 2 === 0 ? 1 : -1) * (Math.random() * 2 + 1);

  return (
    <div
      className={`timeline-row relative w-full flex flex-col md:flex-row items-center justify-between mb-20 md:mb-32 ${isEven ? "md:flex-row-reverse" : ""}`}
    >
      {/* ── Spacer for desktop grid ── */}
      <div className="hidden md:block w-[45%]" />

      {/* ── Center Node ── */}
      <div className="timeline-node absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-[#111018] bg-purple-500 z-20 shadow-[0_0_0_4px_rgba(167,139,250,0.2)]" />

      {/* ── Card Content ── */}
      <div className="w-[85%] md:w-[45%] ml-auto md:ml-0">
        <div
          className={`timeline-card relative w-full p-8 md:p-10 ${bg} ${textPrimary} shadow-2xl transition-transform hover:scale-[1.02] hover:z-30`}
          style={{
            clipPath: isEven
              ? "polygon(2% 0, 100% 2%, 98% 100%, 0 98%)"
              : "polygon(0 2%, 98% 0, 100% 98%, 2% 100%)",
            transform: `rotate(${rotation}deg)`,
          }}
        >
          {/* Tape accent */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/30 backdrop-blur-md rotate-[-3deg] z-10 shadow-sm" />

          {/* Red Stamp */}
          <div className="absolute top-6 right-6 opacity-30 transform rotate-12 pointer-events-none select-none border-4 border-red-500 text-red-500 font-bebas tracking-[0.2em] px-3 py-1 text-2xl lg:text-3xl">
            {isWork ? "HIRED" : "ENROLLED"}
          </div>

          <div className="flex items-center gap-4 mb-4">
            <span className="font-bebas text-6xl opacity-10 select-none">
              _{exp.index}
            </span>
            <span
              className={`text-[10px] font-mono tracking-widest uppercase px-3 py-1 border ${border} rounded-sm`}
            >
              {exp.period}
            </span>
          </div>

          <h3 className="font-bebas text-4xl sm:text-5xl leading-[1.1] tracking-wide mb-2">
            {exp.role}
          </h3>

          <div
            className={`text-sm sm:text-base font-bold mb-6 ${isWork ? "text-purple-400" : "text-purple-700"}`}
          >
            {exp.company}
            {exp.location && (
              <span className={`ml-2 font-normal ${textSecondary}`}>
                · {exp.location}
              </span>
            )}
          </div>

          {exp.bullets.length > 0 && (
            <ul className={`space-y-3 mb-6 font-serif ${textSecondary}`}>
              {exp.bullets.map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm leading-relaxed"
                >
                  <span className="mt-[6px] shrink-0 text-[8px] font-black opacity-50">
                    ◆
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          )}

          {exp.tech.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-black/5">
              {exp.tech.map((t) => (
                <span
                  key={t}
                  className={`text-[10px] font-mono tracking-widest uppercase px-2 py-1 ${
                    isWork ? "bg-white/10" : "bg-black/5"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Header Animation Timeline
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    headerTl.from(".exp-title-wrapper", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
    .to(".exp-header-underline path", {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: "power2.inOut"
    }, "-=0.4")
    .from(".exp-badge", {
      y: 40,
      opacity: 0,
      rotationZ: -5,
      duration: 0.8,
      ease: "back.out(2)"
    }, "-=0.6");

    // 2. Timeline Line Draw Animation
    gsap.fromTo(".timeline-line-active", 
      { scaleY: 0, transformOrigin: "top center" },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          end: "bottom 40%",
          scrub: true,
        }
      }
    );

    // 3. Timeline Nodes and Cards
    const rows = gsap.utils.toArray(".timeline-row");
    
    rows.forEach((row, i) => {
      const node = row.querySelector(".timeline-node");
      const card = row.querySelector(".timeline-card");
      
      const isEven = i % 2 === 0;
      // Cards come in from their respective sides
      const xOffset = isEven ? 60 : -60; 
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      });

      // Node pops in
      tl.from(node, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(2.5)"
      })
      // Card slides and rotates in
      .from(card, {
        x: xOffset,
        y: 40,
        opacity: 0,
        rotationZ: isEven ? -8 : 8, // More dramatic paper drop
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.2");
    });

  }, { scope: sectionRef });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-20 sm:py-32 bg-[#151420] font-sans overflow-hidden border-t-2 border-white/5"
    >
      {/* Noise Overlay */}
      <div className="hidden md:block pointer-events-none absolute inset-0 z-0 w-full h-full opacity-10 mix-blend-overlay paper-noise" />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* ── Section header ── */}
        <div className="exp-header flex flex-col items-center text-center mb-24 overflow-hidden sm:overflow-visible">
          <div className="exp-title-wrapper relative inline-block">
            <p className="text-2xl font-caveat text-purple-400 mb-2 transform rotate-2">
              Background
            </p>
            <h2
              className="font-bebas text-white leading-none tracking-wide mb-8 relative z-10"
              style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}
            >
              The{" "}
              <span
                className="text-transparent relative inline-block"
                style={{ WebkitTextStroke: "2px #A78BFA" }}
              >
                Journey
                {/* SVG scribble underline */}
                <svg className="exp-header-underline absolute -bottom-4 left-0 w-[110%] h-8 overflow-visible -z-10" viewBox="0 0 200 20" fill="none">
                  <path d="M10,15 C50,0 150,0 190,15" stroke="#A78BFA" strokeWidth="6" strokeLinecap="round" opacity="0.8" strokeDasharray="250" strokeDashoffset="250" />
                </svg>
              </span>
            </h2>
          </div>

          <div className="exp-badge flex items-center gap-3 px-6 py-3 border-2 border-white/10 bg-white/5 shadow-lg transform rotate-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <span className="text-xs font-mono text-emerald-400/90 tracking-widest uppercase font-bold">
              Available for Full-time Roles
            </span>
          </div>
        </div>

        {/* ── Timeline Container ── */}
        <div ref={containerRef} className="relative w-full pb-20">
          {/* Background vertical line (faded) */}
          <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-white/5" />

          {/* Static active vertical line */}
          <div
            className="timeline-line-active absolute left-8 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-purple-500 shadow-[0_0_15px_rgba(167,139,250,0.5)]"
          />

          {/* Experience Rows */}
          {experiences.map((exp, i) => (
            <TimelineCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
