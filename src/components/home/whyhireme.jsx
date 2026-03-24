"use client";

import { motion } from "framer-motion";
import { Monitor, Layers, Github, Zap } from "lucide-react";

const cards = [
  {
    icon: Monitor,
    title: "Full-Stack + AI Developer",
    bullets: [
      "MERN + Next.js + TypeScript",
      "Experience with LLMs and RAG systems",
      "Production-ready, scalable code",
    ],
  },
  {
    icon: Layers,
    title: "Built Real Products",
    bullets: [
      "ChatSathi — AI SaaS chatbot platform",
      "HopeBridge — RAG-based medical advisor",
      "HealSync — healthcare booking platform",
    ],
  },
  {
    icon: Github,
    title: "Strong Problem Solver",
    bullets: [
      "Solved 350+ DSA problems on LeetCode",
      "Strong in algorithms & data structures",
      "Performance-focused, optimized solutions",
    ],
  },
  {
    icon: Zap,
    title: "Startup Mindset",
    bullets: [
      "Fast learner & self-driven builder",
      "Can build and ship independently",
      "Comfortable in fast-paced environments",
    ],
  },
];

const stats = [
  { value: "12+",     label: "Projects"            },
  { value: "350+",    label: "DSA Problems"         },
  { value: "AI + FS", label: "Stack"                },
  { value: "Prod",    label: "Experience"           },
];

export default function WhyHireMe() {
  return (
    <section
      id="why hire me"
      className="py-24 sm:py-32 border-t border-white/[0.06] scroll-mt-20 overflow-hidden relative"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-600/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <p className="font-mono text-[11px] tracking-[2.5px] uppercase text-blue-400/60 mb-4">
            Why Hire Me
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-foreground tracking-tight leading-[1.2] max-w-2xl">
            I don&apos;t just build apps —{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              I build scalable, AI-powered products
            </span>{" "}
            that solve real problems.
          </h2>
        </motion.div>

        {/* 2×2 Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="group relative p-7 rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-md overflow-hidden cursor-default transition-shadow duration-300 hover:shadow-[0_20px_60px_rgba(99,120,255,0.08),0_0_0_1px_rgba(99,120,255,0.1)] hover:border-blue-500/[0.22]"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top_left,rgba(107,138,255,0.07)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Icon */}
                <div className="relative w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/[0.15] flex items-center justify-center mb-5">
                  <Icon className="w-[18px] h-[18px] text-blue-400/90" strokeWidth={1.75} />
                </div>

                {/* Title */}
                <h3 className="relative text-[15px] font-semibold text-foreground/90 mb-4 tracking-[-0.2px]">
                  {card.title}
                </h3>

                {/* Bullets */}
                <ul className="relative flex flex-col gap-2.5">
                  {card.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-[13px] text-foreground/45 leading-relaxed"
                    >
                      <span className="w-[5px] h-[5px] rounded-full bg-blue-500/45 flex-shrink-0 mt-[7px]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.05] border border-white/[0.06] rounded-2xl overflow-hidden"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center py-6 px-4 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-200"
            >
              <span className="text-[22px] font-bold text-foreground tracking-[-0.5px] mb-1">
                {s.value}
              </span>
              <span className="font-mono text-[10px] text-foreground/25 tracking-[0.5px] uppercase">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}