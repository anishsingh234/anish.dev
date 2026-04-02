"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Github, Mail, ArrowUpRight, MapPin } from "lucide-react";
import { EASE } from "./SharedComponents";

// ── Marquee data ──────────────────────────────────────────────
const MARQUEE_ITEMS = [
  "NEXT.JS", "REACT", "NODE.JS", "PYTHON", "FASTAPI",
  "LANGCHAIN", "CREWAI", "RAG", "PINECONE", "TYPESCRIPT",
  "MONGODB", "SUPABASE", "FRAMER MOTION", "TAILWIND CSS",
];

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="relative w-full overflow-hidden py-3 border-y border-white/[0.06]">
      <motion.div
        className="flex gap-8 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span className="text-[11px] font-bold tracking-[0.2em] text-white/25">
              {item}
            </span>
            <span className="text-white/10 text-[8px]">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ── Local time ────────────────────────────────────────────────
function LocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    fmt();
    const t = setInterval(fmt, 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="font-mono text-[11px] text-white/30 tracking-widest tabular-nums">
      {time} IST
    </span>
  );
}

// ── Cursor glow (unchanged logic, subtle) ─────────────────────
function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    const onMove = (e) => setPos({ x: e.pageX, y: e.pageY });
    if (window.innerWidth >= 768) window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);
  if (isMobile) return null;
  return (
    <motion.div
      className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
      style={{
        background:
          "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)",
      }}
      animate={{ x: pos.x - 300, y: pos.y - 300 }}
      transition={{ type: "tween", ease: "backOut", duration: 0.6 }}
    />
  );
}

// ── Main Hero ─────────────────────────────────────────────────
export default function Hero() {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#080A10]">
      <CursorGlow />

      {/* Subtle ambient orbs */}
      <div className="absolute top-[-10%] right-[5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 65%)" }} />
      <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 65%)" }} />

      {/* ── Top bar ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-5 border-b border-white/[0.06]"
      >
        <div className="flex items-center gap-2 text-[11px] text-white/30 font-mono tracking-widest uppercase">
          <MapPin className="w-3 h-3" />
          Dehradun, India
        </div>

        <div className="flex items-center gap-3">
          <LocalTime />

          {/* GitHub */}
          <a
            href="https://github.com/anishsingh234"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/[0.08] text-white/30 hover:text-white/65 hover:border-white/[0.2] transition-all"
          >
            <Github className="w-3.5 h-3.5" />
          </a>

          {/* Music */}
          <button
            title="Now Playing"
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/[0.08] text-white/30 hover:text-white/65 hover:border-white/[0.2] transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </button>

          {/* Resume */}
          <a
            href="/resume"
            className="flex items-center gap-1.5 px-3.5 py-1.5 border border-white/[0.08] rounded-lg text-[10px] font-mono text-white/30 hover:text-white/65 hover:border-white/[0.2] transition-all tracking-widest uppercase"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            Resume
          </a>
        </div>
      </motion.div>

      {/* ── Giant name block ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-10 pt-10 pb-0">

        {/* Index tag */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-[10px] font-mono text-white/20 tracking-[0.3em] uppercase mb-6"
        >
          ◆ &nbsp; Portfolio · 2026
        </motion.p>

        {/* Name — editorial oversized */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="overflow-hidden"
        >
          <motion.h1
            variants={item}
            className="font-black leading-[0.88] tracking-tight text-white select-none"
            style={{
              fontSize: "clamp(4rem, 13vw, 11rem)",
              letterSpacing: "-0.03em",
            }}
          >
            ANISH
          </motion.h1>
          <motion.div variants={item} className="flex items-end gap-6 flex-wrap">
            <h1
              className="font-black leading-[0.88] tracking-tight text-transparent select-none"
              style={{
                fontSize: "clamp(4rem, 13vw, 11rem)",
                letterSpacing: "-0.03em",
                WebkitTextStroke: "1.5px rgba(255,255,255,0.25)",
              }}
            >
              SINGH
            </h1>
            {/* Role tag — sits inline with SINGH at bottom */}
            <motion.div
              variants={item}
              className="mb-3 sm:mb-5 flex flex-col gap-1"
            >
              <span className="text-[11px] font-mono text-white/30 tracking-[0.25em] uppercase">
                Full Stack Developer
              </span>
              <span className="text-[11px] font-mono text-purple-400/60 tracking-[0.25em] uppercase">
                × AI Engineer
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Divider line ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.55, duration: 0.8, ease: EASE }}
          className="origin-left h-px bg-white/[0.08] mt-8 mb-8"
        />

        {/* ── Bottom row: description + CTAs ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-10"
        >
          {/* Left — description */}
          <motion.div variants={item} className="space-y-6">
            <p className="text-base text-white/40 leading-relaxed max-w-md font-light">
              I build production-grade web apps with{" "}
              <span className="text-white/70 font-medium">Next.js, Node.js, React</span>{" "}
              — supercharged with{" "}
              <span className="text-purple-400/80 font-medium">AI systems</span>:
              LLMs, RAG pipelines, and multi-agent workflows.
              Currently interning at{" "}
              <span className="text-white/70 font-medium">Exponent Solutions</span>.
            </p>

            {/* Stat row */}
            <div className="flex items-center gap-8">
              {[
                { val: "5+", label: "AI SaaS Shipped" },
                { val: "350+", label: "DSA Problems" },
                { val: "B.Tech", label: "CS · AI/ML '26" },
              ].map(({ val, label }) => (
                <div key={label} className="flex flex-col">
                  <span className="text-xl font-bold text-white/80 leading-none">
                    {val}
                  </span>
                  <span className="text-[10px] text-white/25 tracking-widest uppercase mt-1">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — CTAs */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-start gap-3 lg:justify-end lg:items-center"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-2 px-6 py-3 bg-white text-[#080A10] text-sm font-bold rounded-full transition-all duration-200 hover:bg-white/90"
            >
              View Projects
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>

            <motion.a
              href="https://github.com/anishsingh234"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.05)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 border border-white/[0.12] text-white/60 hover:text-white text-sm font-bold rounded-full transition-all duration-200"
            >
              <Github className="w-4 h-4" />
              GitHub
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.05)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 border border-white/[0.12] text-white/60 hover:text-white text-sm font-bold rounded-full transition-all duration-200"
            >
              <Mail className="w-4 h-4" />
              Contact
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Tech Marquee ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="relative z-10"
      >
        <Marquee />
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-4"
      >
        <span className="text-[10px] font-mono text-white/15 tracking-[0.3em] uppercase">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-7 border border-white/[0.12] rounded-full flex justify-center py-1"
        >
          <div className="w-0.5 h-1.5 bg-white/20 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}