"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const NUDGES = [
  {
    tag: "01 / BLOG",
    msg: "Did you visit",
    highlight: "the Blog?",
    sub: "AI, RAG & dev deep-dives.",
    href: "/blog",
    color: "text-purple-300",
    borderColor: "rgba(167,139,250,0.30)",
    glowColor: "rgba(167,139,250,0.07)",
    dotColor: "#a78bfa",
    accentText: "text-purple-400/55",
  },
  {
    tag: "02 / WHY ME",
    msg: "Need a reason",
    highlight: "to hire me?",
    sub: "I built a whole section for that.",
    href: "#why-hire-me",
    color: "text-emerald-300",
    borderColor: "rgba(52,211,153,0.30)",
    glowColor: "rgba(52,211,153,0.06)",
    dotColor: "#34d399",
    accentText: "text-emerald-400/55",
  },
  {
    tag: "03 / STUDIO",
    msg: "Explored the",
    highlight: "animated studio?",
    sub: "Projects that actually move.",
    href: "/animations",
    color: "text-sky-300",
    borderColor: "rgba(56,189,248,0.30)",
    glowColor: "rgba(56,189,248,0.06)",
    dotColor: "#38bdf8",
    accentText: "text-sky-400/55",
  },
  {
    tag: "04 / GITHUB",
    msg: "Checked out",
    highlight: "my GitHub?",
    sub: "Real code. Real commits.",
    href: "https://github.com/anishsingh234",
    color: "text-pink-300",
    borderColor: "rgba(244,114,182,0.30)",
    glowColor: "rgba(244,114,182,0.06)",
    dotColor: "#f472b6",
    accentText: "text-pink-400/55",
    external: true,
  },
  {
    tag: "05 / CONTACT",
    msg: "Got a suggestion?",
    highlight: "Let's talk →",
    sub: "I read every message.",
    href: "#contact",
    color: "text-amber-300",
    borderColor: "rgba(251,191,36,0.30)",
    glowColor: "rgba(251,191,36,0.05)",
    dotColor: "#fbbf24",
    accentText: "text-amber-400/55",
  },
];

export default function RecruiterNudge() {
  const [index, setIndex] = useState(0);
  const [cardKey, setCardKey] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setIndex((i) => (i + 1) % NUDGES.length);
      setCardKey((k) => k + 1);
    }, 3800);
    return () => clearInterval(iv);
  }, []);

  const n = NUDGES[index];
  const Wrapper = n.external ? "a" : Link;
  const wrapperProps: any = n.external
    ? { href: n.href, target: "_blank", rel: "noopener noreferrer" }
    : { href: n.href };

  return (
    <>
      {/* ── DESKTOP: absolute card in right empty space, no layout impact ── */}
      <div className="absolute right-10 xl:right-16 top-1/2 -translate-y-[52%] z-20 hidden lg:block pointer-events-none select-none">

        {/* Depth shadow cards */}
        <div
          className="absolute inset-0 translate-x-2.5 translate-y-3.5 rounded-2xl"
          style={{ border: "1px solid rgba(167,139,250,0.05)", background: "rgba(14,11,26,0.55)" }}
        />
        <div
          className="absolute inset-0 translate-x-1 translate-y-1.5 rounded-2xl"
          style={{ border: "1px solid rgba(167,139,250,0.09)", background: "rgba(14,11,26,0.72)" }}
        />

        {/* Main card — wider + taller */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cardKey}
            initial={{ opacity: 0, y: 16, scale: 0.95, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, scale: 0.95, filter: "blur(8px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[280px] rounded-2xl overflow-hidden pointer-events-auto"
            style={{
              border: `1px solid ${n.borderColor}`,
              background: `linear-gradient(145deg, ${n.glowColor} 0%, rgba(14,11,26,0.97) 65%)`,
            }}
          >
            {/* Sweep accent line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="origin-left h-[1.5px] w-full"
              style={{ background: `linear-gradient(90deg, ${n.dotColor}, transparent 80%)` }}
            />

            <div className="px-6 pt-5 pb-4 space-y-4">

              {/* Tag + pulse dot */}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="flex items-center justify-between"
              >
                <span className={`text-[9px] font-mono tracking-[0.28em] uppercase ${n.accentText}`}>
                  {n.tag}
                </span>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute h-full w-full rounded-full opacity-55" style={{ background: n.dotColor }} />
                  <span className="relative rounded-full h-1.5 w-1.5" style={{ background: n.dotColor }} />
                </span>
              </motion.div>

              {/* hey recruiter */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.16, duration: 0.3 }}
                className="text-[9px] font-mono text-white/22 tracking-[0.22em] uppercase leading-none"
              >
                hey recruiter —
              </motion.p>

              {/* Main copy */}
              <div className="space-y-1">
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22, duration: 0.38 }}
                  className="text-[14px] font-light text-white/50 leading-snug"
                >
                  {n.msg}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.30, duration: 0.38 }}
                >
                  <Wrapper
                    {...wrapperProps}
                    className={`text-[20px] font-black leading-tight tracking-tight ${n.color} hover:opacity-75 transition-opacity`}
                  >
                    {n.highlight}
                  </Wrapper>
                </motion.div>
              </div>

              {/* Sub text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.38, duration: 0.4 }}
                className="pt-3 border-t"
                style={{ borderColor: "rgba(255,255,255,0.05)" }}
              >
                <p className="text-[10px] font-mono text-white/28 leading-relaxed tracking-wide">
                  {n.sub}
                </p>
              </motion.div>
            </div>

            {/* Progress bar */}
            <div className="mx-6 mb-2.5 rounded-full overflow-hidden" style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}>
              <motion.div
                key={cardKey + "-pb"}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3.8, ease: "linear" }}
                style={{ height: "100%", background: n.dotColor, opacity: 0.45 }}
              />
            </div>

            {/* Dot nav */}
            <div className="flex justify-center gap-2 pb-4">
              {NUDGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setIndex(i); setCardKey((k) => k + 1); }}
                  className="rounded-full transition-all duration-300 cursor-pointer"
                  style={{
                    width: i === index ? 18 : 5,
                    height: 5,
                    background: i === index ? n.dotColor : "rgba(255,255,255,0.13)",
                    opacity: i === index ? 0.9 : 1,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── MOBILE: fixed bottom ticker — zero layout shift ── */}
      {/* Uses fixed positioning so it NEVER affects page layout/height */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
        <div
          className="mx-4 mb-4 rounded-xl overflow-hidden pointer-events-auto"
          style={{
            border: `1px solid ${n.borderColor}`,
            background: "rgba(14,11,26,0.92)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          {/* top accent */}
          <AnimatePresence mode="wait">
            <motion.div
              key={cardKey + "-mob-line"}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="origin-left h-[1.5px] w-full"
              style={{ background: `linear-gradient(90deg, ${n.dotColor}, transparent 80%)` }}
            />
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={cardKey + "-mob"}
              initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 px-4 py-3"
            >
              {/* Pulse dot */}
              <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                <span className="animate-ping absolute h-full w-full rounded-full opacity-60" style={{ background: n.dotColor }} />
                <span className="relative rounded-full h-1.5 w-1.5" style={{ background: n.dotColor }} />
              </span>

              {/* Text */}
              <span className="text-[9px] font-mono text-white/28 tracking-[0.2em] uppercase flex-shrink-0">
                hey recruiter —
              </span>
              <span className="text-[12px] font-light text-white/50 flex-shrink-0 hidden xs:inline">
                {n.msg}
              </span>
              <Wrapper
                {...wrapperProps}
                className={`text-[12px] font-bold ${n.color} flex-shrink-0`}
              >
                {n.highlight}
              </Wrapper>

              {/* Dot nav — pushed to right */}
              <div className="ml-auto flex items-center gap-1.5 flex-shrink-0">
                {NUDGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setIndex(i); setCardKey((k) => k + 1); }}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === index ? 12 : 4,
                      height: 4,
                      background: i === index ? n.dotColor : "rgba(255,255,255,0.15)",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* progress bar */}
          <div className="mx-4 mb-2 rounded-full overflow-hidden" style={{ height: "1px", background: "rgba(255,255,255,0.05)" }}>
            <motion.div
              key={cardKey + "-mob-pb"}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3.8, ease: "linear" }}
              style={{ height: "100%", background: n.dotColor, opacity: 0.4 }}
            />
          </div>
        </div>
      </div>
    </>
  );
}