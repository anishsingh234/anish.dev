"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Terminal,
  Server,
  ArrowRight,
  Github,
  Mail,
} from "lucide-react";
import { EASE, StaggeredText } from "./SharedComponents";

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.pageX, y: e.pageY });
    };

    if (window.innerWidth >= 768) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) return null;

  return (
    <motion.div
      className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0"
      animate={{
        x: mousePosition.x - 250,
        y: mousePosition.y - 250,
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
    />
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0F1A] pt-20">
      <CursorGlow />

      {/* Static glowing orbs */}
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle Noise Texture */}
      <div
        className="hidden md:block absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-1 py-12">
        {/* Left Side: Text and CTAs */}
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="text-left"
        >
          {/* Availability Badge */}
          <motion.div
            variants={heroItem}
            className="group relative inline-flex items-center gap-2 px-3 py-1.5 mb-6 bg-white/[0.03] border border-white/10 rounded-full cursor-default hover:bg-white/[0.05] transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-semibold text-foreground/80 tracking-wide">
              Open to Work
            </span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1.5 bg-[#1A1F2E] text-white text-[10px] font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 shadow-xl z-50">
              Actively looking for opportunities
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={heroItem}
            className="text-4xl sm:text-5xl lg:text-[60px] tracking-tight font-extrabold mb-6 text-foreground leading-[1.1]"
          >
            Full-Stack Developer &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              AI Engineer
            </span>
            <br />
            I ship intelligent SaaS products
          </motion.h1>

          {/* Single powerful paragraph */}
          <motion.p
            variants={heroItem}
            className="text-lg text-foreground/60 mb-10 max-w-xl leading-relaxed"
          >
            I build production-grade web applications with{" "}
            <span className="font-semibold text-white">Next.js, React, Node.js</span>{" "}
            and modern databases — then supercharge them with{" "}
            <span className="font-semibold text-white">AI systems</span> (LLMs, RAG, agents, 
            multi-agent workflows). From beautiful UX to scalable backends and intelligent features, 
            I deliver complete AI-powered SaaS products that users actually love.
          </motion.p>

          {/* Trust Indicators */}
          <motion.div
            variants={heroItem}
            className="flex flex-wrap items-center gap-3 mb-10"
          >
            <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] border border-white/[0.08] rounded-xl backdrop-blur-sm shadow-sm hover:shadow-[0_0_15px_rgba(124,58,237,0.15)] transition-shadow">
              <Brain className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-medium text-foreground/75">
                5+ AI SaaS Built &amp; Shipped
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] border border-white/[0.08] rounded-xl backdrop-blur-sm shadow-sm hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-shadow">
              <Terminal className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-medium text-foreground/75">
                350+ DSA Problems
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] border border-white/[0.08] rounded-xl backdrop-blur-sm shadow-sm hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-shadow">
              <Server className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-medium text-foreground/75">
                Full-Stack + AI
              </span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={heroItem}
            className="flex flex-wrap items-center gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300"
            >
              View Projects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="https://github.com/anishsingh234"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.05)",
              }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-7 py-3.5 border border-white/20 text-foreground/90 hover:text-white font-bold rounded-xl transition-all duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.15)] hover:-translate-y-0.5"
            >
              <Github className="w-5 h-5" />
              GitHub
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-7 py-3.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 text-foreground/90 hover:text-white font-bold rounded-xl backdrop-blur-md transition-all duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:-translate-y-0.5"
            >
              <Mail className="w-5 h-5" />
              Contact
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Side: Floating Visuals (unchanged — they already scream AI) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          className="hidden lg:flex relative h-[500px] w-full items-center justify-center pointer-events-none"
        >
          {/* Main IDE / Code Mockup */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute z-10 w-[380px] bg-[#10141f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl"
            style={{ top: "15%", left: "5%" }}
          >
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="ml-2 text-[10px] text-foreground/40 font-mono">
                llm_pipeline.ts
              </span>
            </div>
            <div className="p-5 font-mono text-[11px] leading-relaxed text-blue-200">
              <span className="text-purple-400">import</span> {"{ Document }"}{" "}
              <span className="text-purple-400">from</span>{" "}
              <span className="text-green-300">"langchain/document"</span>;
              <br />
              <br />
              <span className="text-purple-400">const</span> chain ={" "}
              <span className="text-purple-400">await</span>{" "}
              <span className="text-yellow-200">RetrievalQAChain</span>.fromLLM(
              <br />
              &nbsp;&nbsp;model,
              <br />
              &nbsp;&nbsp;vectorStore.asRetriever()
              <br />
              );
              <br />
              <br />
              <span className="text-foreground/40">// Process query...</span>
              <br />
              <span className="text-purple-400">const</span> res ={" "}
              <span className="text-purple-400">await</span> chain.
              <span className="text-blue-300">call</span>({"{"} query {"}"});
            </div>
          </motion.div>

          {/* AI Chat Layout Mockup */}
          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute z-20 w-[300px] bg-white/[0.02] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-2xl"
            style={{ bottom: "10%", right: "-5%" }}
          >
            <div className="p-4 flex flex-col gap-4">
              <div className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                  <span className="text-[10px] text-purple-200">USR</span>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-sm p-3 text-[11px] text-foreground/80">
                  How can we optimize the RAG retrieval speed?
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                  <Brain className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl rounded-tl-sm p-3 text-[11px] text-foreground/90">
                  To optimize RAG retrieval, we can use{" "}
                  <strong>HNSW indexing</strong> and embed document metadata for
                  pre-filtering before semantic search.
                </div>
              </div>
            </div>
          </motion.div>

          {/* Subtle connecting spline */}
          <svg
            className="absolute inset-0 w-full h-full -z-10 opacity-30 pointer-events-none"
            viewBox="0 0 500 500"
          >
            <path
              d="M 120 200 C 300 200, 200 350, 400 350"
              fill="none"
              stroke="url(#paint0_linear)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="120"
                y1="200"
                x2="400"
                y2="350"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9333ea" />
                <stop offset="1" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>

      {/* Scroll Indicator & Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground/30">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border-[1.5px] border-foreground/20 rounded-full flex justify-center py-1.5"
        >
          <div className="w-1 h-1.5 bg-foreground/40 rounded-full" />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent blur-sm" />
    </section>
  );
}