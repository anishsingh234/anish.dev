"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { EASE } from "./SharedComponents";

const GROUPS = [
  {
    cmd: "skills --category ai",
    label: "AI / ML",
    comment: "## Primary Specialization ──────────────────────────",
    rows: [
      { skills: ["LLMs", "RAG Pipelines", "Prompt Engineering", "Tool Calling"], hi: true },
      { skills: ["LangChain", "CrewAI", "Multi-Agent Systems", "Vercel AI SDK"], hi: true },
      { skills: ["Vector Databases", "Pinecone", "Hugging Face", "Ollama"], hi: false },
    ],
    accent: "purple",
  },
  {
    cmd: "skills --category frontend",
    label: "Frontend",
    comment: "## Frontend ────────────────────────────────────────",
    rows: [
      { skills: ["React.js", "Next.js", "Tailwind CSS", "TypeScript"], hi: true },
      { skills: ["Framer Motion", "React Native", "Expo", "Three.js"], hi: false },
    ],
    accent: "blue",
  },
  {
    cmd: "skills --category backend",
    label: "Backend",
    comment: "## Backend ─────────────────────────────────────────",
    rows: [
      { skills: ["Node.js", "Express.js", "FastAPI", "REST APIs"], hi: true },
      { skills: ["GraphQL", "WebSockets"], hi: false },
    ],
    accent: "green",
  },
  {
    cmd: "skills --category database",
    label: "Database",
    comment: "## Database ────────────────────────────────────────",
    rows: [
      { skills: ["MongoDB", "Prisma ORM", "MySQL", "Supabase", "Redis"], hi: true },
    ],
    accent: "green",
  },
  {
    cmd: "skills --category languages",
    label: "Languages",
    comment: "## Languages ───────────────────────────────────────",
    rows: [
      { skills: ["JavaScript", "TypeScript", "Python"], hi: true },
      { skills: ["C++", "SQL", "HTML", "CSS", "C"], hi: false },
    ],
    accent: "purple",
  },
  {
    cmd: "skills --category tools",
    label: "Tools",
    comment: "## Tools & Platforms ───────────────────────────────",
    rows: [
      { skills: ["Git", "GitHub", "Vercel", "VS Code"], hi: true },
      { skills: ["Postman", "Clerk Auth", "Figma"], hi: false },
    ],
    accent: "blue",
  },
];

const ACCENT = {
  purple: { hi: "text-purple-300/90", lo: "text-purple-200/45" },
  blue:   { hi: "text-blue-300/90",   lo: "text-blue-200/45"   },
  green:  { hi: "text-emerald-300/85",lo: "text-emerald-200/45"},
};

function useTypewriter(text, speed = 22, delay = 0) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed("");
    setDone(false);
    if (!text) return;
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [text, speed, delay]);
  return { displayed, done };
}

function GroupBlock({ group, show }) {
  const { displayed: typedCmd, done: cmdDone } = useTypewriter(
    show ? `$ ${group.cmd}` : "",
    22,
    80
  );
  const colors = ACCENT[group.accent];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.25 }}
      className="mb-1"
    >
      {/* Command line */}
      <div className="flex items-center gap-2 mb-1 flex-wrap">
        <span className="font-mono text-[12px] text-purple-400/70">anish</span>
        <span className="font-mono text-[12px] text-white/58">@portfolio</span>
        <span className="font-mono text-[12px] text-white/75">{typedCmd}</span>
        {!cmdDone && show && (
          <span className="inline-block w-[7px] h-[13px] bg-purple-400/60 animate-pulse" />
        )}
      </div>

      {/* Output */}
      {cmdDone && (
        <motion.div
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="pl-4 border-l border-white/[0.05] ml-1 mb-4"
        >
          <p className="font-mono text-[10px] text-white/68 mb-2 leading-relaxed tracking-wide">
            {group.comment}
          </p>
          {group.rows.map((row, ri) => (
            <div key={ri} className="flex flex-wrap gap-x-5 gap-y-1.5 mb-2">
              {row.skills.map((skill, si) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: ri * 0.07 + si * 0.035, duration: 0.25 }}
                  className={`font-mono text-[12px] sm:text-[13px] font-medium cursor-default transition-all duration-150 hover:brightness-125 select-none ${
                    row.hi ? colors.hi : colors.lo
                  }`}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function Skills() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [started, setStarted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || visibleCount >= GROUPS.length) return;
    const timer = setTimeout(
      () => setVisibleCount((v) => v + 1),
      visibleCount === 0 ? 500 : 950
    );
    return () => clearTimeout(timer);
  }, [started, visibleCount]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 sm:py-32 scroll-mt-20 border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-end justify-between mb-14 flex-wrap gap-6"
        >
          <div>
            <p className="text-[10px] font-mono text-white/58 tracking-[0.3em] uppercase mb-4">
              ◆ &nbsp; Tech Stack
            </p>
            <h2
              className="font-black text-white leading-none tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}
            >
              Tools I
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1.5px rgba(167,139,250,0.45)" }}>
                Architect With
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-8">
            {[
              { val: "40+",  label: "Technologies" },
              { val: "350+", label: "DSA Solved"   },
              { val: "5+",   label: "AI Systems"   },
            ].map(({ val, label }) => (
              <div key={label} className="flex flex-col items-end">
                <span className="text-2xl font-black text-white/75 leading-none tracking-tight">{val}</span>
                <span className="text-[9px] font-mono text-white/58 tracking-widest uppercase mt-1">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Terminal ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="rounded-2xl border border-white/[0.08] overflow-hidden"
          style={{ background: "#0E0B1A", boxShadow: "0 40px 80px rgba(0,0,0,0.55)" }}
        >
          {/* Title bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06]" style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/55" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/55" />
              <div className="w-3 h-3 rounded-full bg-green-500/55" />
            </div>
            <span className="font-mono text-[11px] text-white/52 tracking-widest">
              anish@portfolio — skills
            </span>
            <div className="w-16" />
          </div>

          {/* Body */}
          <div className="px-6 py-7 sm:px-8">
            {/* Welcome */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: started ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="mb-5"
            >
              <p className="font-mono text-[11px] text-white/52 leading-relaxed">
                Welcome. Type{" "}
                <span className="text-purple-400/50">skills --help</span>{" "}
                for all commands.
              </p>
              <p className="font-mono text-[10px] text-white/[0.12] mt-1 tracking-wider">
                ────────────────────────────────────────────────────
              </p>
            </motion.div>

            {/* Initial list command */}
            {started && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[12px] text-purple-400/70">anish</span>
                  <span className="font-mono text-[12px] text-white/58">@portfolio</span>
                  <span className="font-mono text-[12px] text-white/75">$ skills --list --all</span>
                </div>
                <p className="font-mono text-[10px] text-white/52 pl-4 border-l border-white/[0.05] ml-1 mt-1 mb-4">
                  Listing all skill categories...
                </p>
              </motion.div>
            )}

            {/* Groups */}
            {GROUPS.map((group, i) => (
              <GroupBlock
                key={group.cmd}
                group={group}
                show={started && visibleCount > i}
              />
            ))}

            {/* Final cursor */}
            {visibleCount >= GROUPS.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 mt-2 pt-3 border-t border-white/[0.05]"
              >
                <span className="font-mono text-[12px] text-purple-400/70">anish</span>
                <span className="font-mono text-[12px] text-white/58">@portfolio</span>
                <span className="inline-block w-[7px] h-[13px] bg-purple-400/55 animate-pulse ml-0.5" />
              </motion.div>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}