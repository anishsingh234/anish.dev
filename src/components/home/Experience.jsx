"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-[#111018] bg-purple-500 z-20 shadow-[0_0_0_4px_rgba(167,139,250,0.2)]" />

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
  const lineRef = useRef(null);

  useGSAP(
    () => {
      // 1. Draw the central timeline SVG line
      gsap.fromTo(
        lineRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
          },
        },
      );

      // 2. Animate cards throwing onto the screen
      const rows = gsap.utils.toArray(".timeline-row");

      rows.forEach((row) => {
        const card = row.querySelector(".timeline-card");
        const node = row.querySelector(".rounded-full");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.set(card, { transformPerspective: 1000 });

        tl.fromTo(
          node,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" },
        ).fromTo(
          card,
          { opacity: 0, rotationX: -90, transformOrigin: "top center" },
          { opacity: 1, rotationX: 0, duration: 0.8, ease: "power3.out" },
          "-=0.2",
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-20 sm:py-32 bg-transparent font-sans overflow-hidden border-t-2 border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* ── Section header ── */}
        <div className="flex flex-col items-center text-center mb-24">
          <p className="text-2xl font-caveat text-purple-400 mb-2 transform rotate-2">
            Background
          </p>
          <h2
            className="font-bebas text-white leading-none tracking-wide mb-8"
            style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}
          >
            The{" "}
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "2px #A78BFA" }}
            >
              Journey
            </span>
          </h2>

          <div className="flex items-center gap-3 px-6 py-3 border-2 border-white/10 bg-white/5 shadow-lg transform rotate-2">
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
        <div className="relative w-full pb-20">
          {/* Background vertical line (faded) */}
          <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-white/5" />

          {/* Animated active vertical line */}
          <div
            ref={lineRef}
            className="absolute left-8 md:left-1/2 -translate-x-1/2 top-0 w-1 bg-purple-500 shadow-[0_0_15px_rgba(167,139,250,0.5)] origin-top"
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
