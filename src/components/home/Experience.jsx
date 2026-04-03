"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EASE } from "./SharedComponents";

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

function ExperienceRow({ exp, index }) {
  const isWork = exp.type === "work";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.08 }}
      className="group"
    >
      {/* Top border */}
      <div className="h-px bg-white/[0.07] group-hover:bg-white/[0.13] transition-colors duration-500" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 py-10 lg:py-12">

        {/* ── Left: all content ── */}
        <div className="flex flex-col gap-6">

          {/* Top row: index + period + type badge */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-5">
              <span
                className="font-black text-white/[0.1] leading-none select-none"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.04em" }}
              >
                _{exp.index}.
              </span>
              <span
                className={`text-[9px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-full border ${
                  isWork
                    ? "text-purple-300/70 border-purple-400/20 bg-purple-500/[0.08]"
                    : "text-white/52 border-white/[0.09] bg-white/[0.03]"
                }`}
              >
                {isWork ? "Work" : "Education"}
              </span>
            </div>
            <span className="font-mono text-[11px] text-white/68 tracking-widest">
              {exp.period}
            </span>
          </div>

          {/* Role + company */}
          <div>
            <h3
              className="font-black text-white leading-none tracking-tight mb-3 group-hover:text-white/90 transition-colors"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.6rem)", letterSpacing: "-0.03em" }}
            >
              {exp.role}
            </h3>
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`text-[13px] font-semibold ${isWork ? "text-purple-300/75" : "text-white/72"}`}>
                {exp.company}
              </span>
              {exp.location && (
                <>
                  <span className="text-white/48 text-xs">·</span>
                  <span className="text-[12px] font-mono text-white/68 tracking-wide">
                    {exp.location}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Bullets */}
          {exp.bullets.length > 0 && (
            <ul className="space-y-2.5">
              {exp.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-[13px] text-white/65 leading-relaxed font-light group-hover:text-white/72 transition-colors">
                  <span className="text-white/48 mt-[5px] shrink-0 text-[7px] font-black">◆</span>
                  {b}
                </li>
              ))}
            </ul>
          )}

          {/* Tech tags */}
          {exp.tech.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {exp.tech.map((t) => (
                <span
                  key={t}
                  className="text-[9px] font-mono text-white/68 tracking-widest uppercase border border-white/[0.07] rounded-full px-3 py-1 hover:border-white/15 hover:text-white/65 transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: arrow (only for work) ── */}
        {isWork && (
          <div className="hidden lg:flex items-start pt-12">
            <div className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center group-hover:border-white/25 group-hover:bg-white/[0.04] transition-all duration-300">
              <ArrowUpRight className="w-4 h-4 text-white/58 group-hover:text-white/78 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-14 sm:py-18 lg:py-22 scroll-mt-20 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-end justify-between mb-10 sm:mb-14 flex-wrap gap-5"
        >
          <div>
            <p className="text-[10px] font-mono text-white/58 tracking-[0.3em] uppercase mb-4">
              ◆ &nbsp; Background
            </p>
            <h2
              className="font-black text-white leading-none tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}
            >
              Where I've
              <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1.5px rgba(167,139,250,0.45)" }}
              >
                Worked & Studied
              </span>
            </h2>
          </div>

          {/* Availability badge */}
          <div className="flex items-center gap-3 px-4 py-2.5 border border-white/[0.09] rounded-full bg-white/[0.02]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono text-emerald-400/75 tracking-widest uppercase">
              Open to full-time roles
            </span>
          </div>
        </motion.div>

        {/* ── Experience rows ── */}
        <div>
          {experiences.map((exp, i) => (
            <ExperienceRow key={i} exp={exp} index={i} />
          ))}
          {/* Bottom border */}
          <div className="h-px bg-white/[0.07]" />
        </div>

      </div>
    </section>
  );
}