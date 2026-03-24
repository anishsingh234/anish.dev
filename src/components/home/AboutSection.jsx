"use client";
import { Mail, Linkedin } from "lucide-react";
import { SectionLabel, FadeUp } from "./SharedComponents";

export default function AboutSection() {
  const stats = [
    { value: "12+", label: "Projects Completed", sub: "Full-Stack & AI" },
    { value: "350+", label: "DSA Problems Solved", sub: "C++ & Java" },
    { value: "6 months+", label: "Professional Experience", sub: "Full-Stack + AI" },
    { value: "5+", label: "AI SaaS Applications", sub: "Built & Shipped" },
    { value: "2026", label: "Graduating 2026", sub: "B.Tech AI & ML" },
  ];

  return (
    <section
      id="about"
      className="py-24 sm:py-32 border-t border-white/[0.06] scroll-mt-20 overflow-hidden relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <FadeUp>
            <SectionLabel>About</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight tracking-tight">
              Full-Stack Developer &amp;{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                AI Engineer
              </span>
            </h2>

            <div className="space-y-6 text-foreground/70 leading-[1.75] text-[16.5px] sm:text-[17px] max-w-lg">
              <p>
                I&apos;m a passionate <span className="font-semibold text-white">Full-Stack Developer</span> with strong expertise in building production-ready web applications using{" "}
                <span className="font-semibold text-white">Next.js</span>,{" "}
                <span className="font-semibold text-white">React</span>,{" "}
                <span className="font-semibold text-white">Node.js</span>, and modern databases.
              </p>

              <p>
                What sets me apart is my ability to seamlessly integrate powerful{" "}
                <span className="font-semibold text-white">AI capabilities</span> into applications. 
                I specialize in building intelligent systems using LLMs, RAG pipelines, AI agents, 
                and multi-agent architectures.
              </p>

              <p>
                I&apos;ve designed, developed, and shipped multiple{" "}
                <span className="font-semibold text-white">AI-powered SaaS applications</span> that combine 
                beautiful, responsive frontends with scalable backends and cutting-edge AI features — 
                delivering real value to users.
              </p>

              <p className="text-white/80">
                Currently focused on advancing my skills in autonomous AI agents and next-generation 
                AI tooling while pursuing my B.Tech in Artificial Intelligence &amp; Machine Learning.
              </p>
            </div>

            <div className="mt-10">
              <p className="text-sm font-medium text-foreground/50 mb-3 ml-0.5">
                Open to full-time roles &amp; exciting opportunities
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:anishsingh210204@gmail.com"
                  className="flex items-center gap-2 px-5 py-2.5 bg-white text-black text-[15px] font-semibold rounded-lg hover:bg-white/90 transition-all hover:-translate-y-0.5 shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
                >
                  <Mail className="w-4 h-4" />
                  Get in Touch
                </a>
                <a
                  href="https://linkedin.com/in/anish-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white border border-white/10 text-[15px] font-semibold rounded-lg transition-all hover:-translate-y-0.5 active:scale-95"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>
            </div>
          </FadeUp>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ value, label, sub }, i) => (
              <FadeUp key={label} delay={i * 0.1}>
                <div className="p-6 rounded-[1.5rem] bg-white/[0.015] border border-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_4px_16px_rgba(0,0,0,0.1)] hover:bg-white/[0.03] hover:border-purple-500/[0.25] hover:-translate-y-1 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_12px_32px_rgba(139,92,246,0.12)] transition-all duration-300 ease-out">
                  <p className="text-3xl font-extrabold text-foreground mb-1.5 tracking-tight">
                    {value}
                  </p>
                  <p className="text-[13px] font-semibold text-foreground/70">
                    {label}
                  </p>
                  <p className="text-[11px] font-medium text-purple-400/80 mt-1">
                    {sub}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}