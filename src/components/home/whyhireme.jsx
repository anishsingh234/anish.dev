"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EASE } from "./SharedComponents";

const proof = [
  {
    emoji: "🚀",
    title: "Products Shipped",
    sub: "ChatSathi · HopeBridge · HealSync",
    stat: "12+",
  },
  {
    emoji: "🧠",
    title: "AI Systems Built",
    sub: "LLMs · RAG · Agents · Multi-Agent",
    stat: "5+",
  },
  {
    emoji: "⚡",
    title: "DSA Problems Solved",
    sub: "LeetCode · Algorithms · Data Structures",
    stat: "350+",
  },
  {
    emoji: "🏗️",
    title: "Production Experience",
    sub: "Exponent Solutions · 3,000+ users",
    stat: "6mo+",
  },
  {
    emoji: "🎓",
    title: "Graduating 2026",
    sub: "B.Tech CS — AI & ML · UTU Dehradun",
    stat: "'26",
  },
];

export default function WhyHireMe() {
  return (
    <section
      id="why-hire-me"
      className="py-24 sm:py-32 border-t border-white/[0.06] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16"
        >
          <p className="text-[10px] font-mono text-white/20 tracking-[0.3em] uppercase mb-4">
            ◆ &nbsp; Why Hire Me
          </p>
          <h2
            className="font-black text-white leading-none tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}
          >
            The case
            <br />
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.2)" }}
            >
              for hiring me.
            </span>
          </h2>
        </motion.div>

        {/* ── Two column body ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Left: pitch copy ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="flex flex-col gap-7"
          >
            <div className="space-y-5 text-[15px] text-white/40 leading-[1.85] font-light max-w-lg">
              <p>
                I&apos;m not just another dev who can build a CRUD app. I combine{" "}
                <span className="text-white/75 font-semibold">solid full-stack engineering</span>{" "}
                with real{" "}
                <span className="text-purple-300/80 font-medium">AI system experience</span>{" "}
                — shipped to production, used by real users.
              </p>
              <p>
                I&apos;ve built RAG pipelines, multi-agent systems, and AI-powered SaaS{" "}
                <span className="text-white/65 font-medium">from scratch</span>. I think in
                systems, ship fast, and care deeply about code quality and user experience.
              </p>
              <p>
                Whether it&apos;s architecting a scalable backend, designing a beautiful UI,
                or integrating an LLM into a product — I can{" "}
                <span className="text-white/65 font-medium">own the entire stack</span>{" "}
                and deliver.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.07]" />

            {/* Key differentiators — inline tags */}
            <div className="flex flex-col gap-3">
              {[
                { label: "Full-Stack",        detail: "Next.js · Node.js · MongoDB · TypeScript" },
                { label: "AI / ML",           detail: "LLMs · RAG · CrewAI · LangChain · Agents" },
                { label: "Startup Mindset",   detail: "Ships fast · Self-driven · Thinks in systems" },
              ].map(({ label, detail }) => (
                <div key={label} className="flex items-center gap-4">
                  <span className="text-[10px] font-mono text-white/25 tracking-widest uppercase w-28 shrink-0">
                    {label}
                  </span>
                  <span className="text-[11px] font-mono text-white/35 tracking-wide">
                    {detail}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-[#080A10] text-sm font-bold rounded-full w-fit transition-all hover:bg-white/90"
            >
              Let&apos;s work together
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          </motion.div>

          {/* ── Right: proof list ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          >
            <div className="flex flex-col">
              {proof.map(({ emoji, title, sub, stat }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.07 }}
                  className="group flex items-center gap-5 py-5 border-b border-white/[0.06] hover:border-white/[0.13] cursor-default transition-all duration-300"
                >
                  {/* Emoji icon */}
                  <div className="w-10 h-10 rounded-xl border border-white/[0.07] bg-white/[0.02] flex items-center justify-center text-[16px] shrink-0 group-hover:border-white/[0.15] group-hover:bg-white/[0.04] transition-all">
                    {emoji}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-white/60 group-hover:text-white/85 transition-colors tracking-tight">
                      {title}
                    </p>
                    <p className="text-[10px] font-mono text-white/22 mt-0.5 tracking-wide truncate">
                      {sub}
                    </p>
                  </div>

                  {/* Stat */}
                  <span
                    className="font-black text-white/18 group-hover:text-white/55 transition-colors leading-none tracking-tight shrink-0"
                    style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", letterSpacing: "-0.03em" }}
                  >
                    {stat}
                  </span>
                </motion.div>
              ))}

              {/* Bottom border */}
              <div className="h-px bg-white/[0.06]" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}