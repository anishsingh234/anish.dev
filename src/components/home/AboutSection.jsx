"use client";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { EASE } from "./SharedComponents";

const stats = [
  { value: "12+",      label: "Projects",    sub: "Full-Stack & AI"      },
  { value: "350+",     label: "DSA Solved",  sub: "LeetCode"             },
  { value: "6mo+",     label: "Experience",  sub: "Exponent Solutions"   },
  { value: "5+",       label: "AI SaaS",     sub: "Built & Shipped"      },
  { value: "'26",      label: "Graduating",  sub: "B.Tech AI & ML"       },
];

export default function AboutSection() {
  return (
    <section
      id="about"
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
            ◆ &nbsp; About
          </p>
          <h2
            className="font-black text-white leading-none tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}
          >
            Who I
            <br />
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.2)" }}
            >
              Actually Am
            </span>
          </h2>
        </motion.div>

        {/* ── Body grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Left: text ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="flex flex-col gap-8"
          >
            {/* Paragraphs */}
            <div className="space-y-5 text-[15px] text-white/40 leading-[1.85] font-light max-w-lg">
              <p>
                I&apos;m a{" "}
                <span className="text-white/80 font-semibold">Full-Stack Developer</span>{" "}
                who builds production-grade web applications with{" "}
                <span className="text-white/70 font-medium">Next.js, React, Node.js</span>{" "}
                and modern databases — then makes them intelligent.
              </p>
              <p>
                What sets me apart is the ability to seamlessly layer{" "}
                <span className="text-purple-300/80 font-medium">AI capabilities</span>{" "}
                on top of solid engineering — LLMs, RAG pipelines, agents, and
                multi-agent workflows that actually work in production.
              </p>
              <p>
                I&apos;ve shipped multiple{" "}
                <span className="text-white/70 font-medium">AI-powered SaaS products</span>{" "}
                that combine beautiful frontends with scalable backends and
                cutting-edge AI features. Currently interning at{" "}
                <span className="text-white/70 font-medium">Exponent Solutions</span>{" "}
                and finishing my B.Tech in AI & ML — graduating 2026.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.07]" />

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <motion.a
                href="mailto:anishsingh210204@gmail.com"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2 px-6 py-3 bg-white text-[#111318] text-sm font-bold rounded-full transition-all hover:bg-white/90"
              >
                <Mail className="w-4 h-4" />
                Get in Touch
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/anish-ai"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.05)" }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2 px-6 py-3 border border-white/[0.1] text-white/55 hover:text-white text-sm font-bold rounded-full transition-all"
              >
                LinkedIn
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
            </div>
          </motion.div>

          {/* ── Right: stats ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          >
            {/* Stat rows */}
            <div className="flex flex-col">
              {stats.map(({ value, label, sub }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.15 + i * 0.07 }}
                  className="group flex items-center justify-between py-5 border-b border-white/[0.06] hover:border-white/[0.12] transition-colors duration-300 cursor-default"
                >
                  {/* Left: label + sub */}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[13px] font-semibold text-white/55 tracking-tight group-hover:text-white/75 transition-colors">
                      {label}
                    </span>
                    <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase">
                      {sub}
                    </span>
                  </div>

                  {/* Right: value */}
                  <span
                    className="font-black text-white/70 leading-none tracking-tight group-hover:text-white transition-colors"
                    style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.03em" }}
                  >
                    {value}
                  </span>
                </motion.div>
              ))}

              {/* Bottom note */}
              <div className="pt-6 flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[11px] font-mono text-white/25 tracking-widest uppercase">
                  Open to full-time roles & exciting opportunities
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}