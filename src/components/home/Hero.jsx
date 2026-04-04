"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Mail, ArrowUpRight, MapPin } from "lucide-react";
import { EASE } from "./SharedComponents";
import RecruiterNudge from "./Recruiternudge";
import Link from "next/link";
import StudioPeek from "./StudioPeek";
const MARQUEE_ITEMS = [
  "NEXT.JS",
  "REACT",
  "NODE.JS",
  "PYTHON",
  "FASTAPI",
  "LANGCHAIN",
  "CREWAI",
  "RAG",
  "PINECONE",
  "TYPESCRIPT",
  "MONGODB",
  "SUPABASE",
  "FRAMER MOTION",
  "TAILWIND CSS",
];

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="w-full overflow-hidden py-3 border-y border-purple-400/[0.1]">
      <motion.div
        className="flex gap-8 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span className="text-[9px] font-bold tracking-[0.22em] text-purple-300/45">
              {item}
            </span>
            <span className="text-purple-400/20 text-[6px]">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

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
        }),
      );
    fmt();
    const t = setInterval(fmt, 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="font-mono text-[11px] text-white/55 tracking-widest tabular-nums">
      {time} IST
    </span>
  );
}

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
      className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none z-0"
      style={{
        background:
          "radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 65%)",
      }}
      animate={{ x: pos.x - 350, y: pos.y - 350 }}
      transition={{ type: "tween", ease: "backOut", duration: 0.6 }}
    />
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#0E0B1A]">
   
      <CursorGlow />
     
      {/* Ambient orbs */}
      <div
        className="absolute top-[-15%] right-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(99,55,200,0.1) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(167,139,250,0.04) 0%, transparent 65%)",
        }}
      />

      {/* ── Top bar ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-4 border-b border-purple-400/[0.1]"
      >
        {/* Location */}
        <div className="flex items-center gap-2 text-[10px] text-white/45 font-mono tracking-widest uppercase">
          <MapPin className="w-3 h-3" />
          Dehradun, India
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2.5">
          <LocalTime />

          {/* GitHub */}
          <a
            href="https://github.com/anishsingh234"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-purple-400/[0.15] bg-purple-400/[0.05] text-white/50 hover:text-white hover:border-purple-400/[0.4] hover:bg-purple-400/[0.12] transition-all"
          >
            <Github className="w-3.5 h-3.5" />
          </a>

          <Link
            href="https://linkedin.com/in/anish-ai"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-purple-400/[0.15] bg-purple-400/[0.05] text-white/50 hover:text-white hover:border-purple-400/[0.4] hover:bg-purple-400/[0.12] transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </Link>

          {/* Resume */}
          <a
            href="/resume"
            className="flex items-center gap-1.5 px-3.5 py-1.5 border border-purple-400/[0.2] rounded-lg text-[9px] font-mono text-white/55 hover:text-white hover:border-purple-400/[0.45] hover:bg-purple-400/[0.08] transition-all tracking-widest uppercase"
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Resume
          </a>
        </div>
      </motion.div>

      {/* ── Hero body ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-10 pt-8 pb-0">
        {/* Availability badge */}
        <RecruiterNudge />
       
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-emerald-500/[0.22] bg-emerald-500/[0.07] rounded-full w-fit mb-6"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          <span className="text-[9px] font-mono text-emerald-400/80 tracking-widest uppercase">
            Open to Work · Full-time Roles
          </span>
        </motion.div>

        {/* Index tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-center gap-3 text-[9px] font-mono text-purple-300/55 tracking-[0.35em] uppercase mb-6"
        >
          ◆ &nbsp; Portfolio · 2026
          <div className="w-10 h-px bg-purple-400/25" />
        </motion.div>

        {/* Giant name */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="font-black leading-[0.88] tracking-tight text-white select-none"
            style={{
              fontSize: "clamp(4rem, 13vw, 11rem)",
              letterSpacing: "-0.03em",
            }}
          >
            ANISH
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.28 }}
            className="flex items-end gap-5 flex-wrap"
          >
            <h1
              className="font-black leading-[0.88] tracking-tight text-transparent select-none"
              style={{
                fontSize: "clamp(4rem, 13vw, 11rem)",
                letterSpacing: "-0.03em",
                WebkitTextStroke: "1.5px rgba(167,139,250,0.5)",
              }}
            >
              SINGH
            </h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mb-3 sm:mb-5 flex flex-col gap-1.5"
            >
              <span className="text-[10px] font-mono text-white/50 tracking-[0.28em] uppercase">
                Full Stack Developer
              </span>
              <span className="text-[10px] font-mono text-purple-300/75 tracking-[0.28em] uppercase">
                × AI Engineer
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Divider — purple gradient */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.55, duration: 0.8, ease: EASE }}
          className="origin-left h-px mt-8 mb-8"
          style={{
            background:
              "linear-gradient(90deg, rgba(167,139,250,0.35) 0%, rgba(255,255,255,0.06) 60%, transparent 100%)",
          }}
        />

        {/* Bottom grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.65 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-10"
        >
          {/* Left: desc + stats */}
          <div className="space-y-6">
            <p className="text-[14px] text-white/50 leading-[1.85] max-w-md font-light">
              I build production-grade web apps with{" "}
              <span className="text-white/80 font-semibold">
                Next.js, Node.js, React
              </span>{" "}
              — supercharged with{" "}
              <span className="text-purple-300/85 font-medium">AI systems</span>
              : LLMs, RAG pipelines, and multi-agent workflows. Currently
              interning at{" "}
              <span className="text-white/80 font-semibold">
                Exponent Solutions
              </span>
              .
            </p>
            <div className="flex items-center gap-8">
              {[
                { val: "5+", label: "AI SaaS Shipped" },
                { val: "350+", label: "DSA Problems" },
                { val: "B.Tech", label: "CS · AI/ML '26" },
              ].map(({ val, label }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-xl font-black text-white/85 leading-none tracking-tight">
                    {val}
                  </span>
                  <span className="text-[9px] font-mono text-white/38 tracking-widest uppercase">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: CTAs */}
          <div className="flex flex-wrap items-start gap-3 lg:justify-end lg:items-center">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-2 px-6 py-3 bg-white text-[#0E0B1A] text-sm font-bold rounded-full hover:bg-white/90 transition-all"
            >
              View Projects
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>

            <motion.a
              href="https://github.com/anishsingh234"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 border border-white/[0.14] text-white/65 hover:text-white hover:border-white/30 hover:bg-white/[0.05] text-sm font-bold rounded-full transition-all"
            >
              <Github className="w-4 h-4" />
              GitHub
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 border border-purple-400/[0.28] text-purple-300/85 hover:text-white hover:border-purple-400/[0.55] hover:bg-purple-400/[0.1] text-sm font-bold rounded-full transition-all"
            >
              <Mail className="w-4 h-4" />
              Contact
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* ── Marquee ── */}
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
        <span className="text-[9px] font-mono text-white/28 tracking-[0.3em] uppercase">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-7 border border-purple-400/[0.22] rounded-full flex justify-center py-1"
        >
          <div className="w-0.5 h-1.5 bg-purple-400/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
