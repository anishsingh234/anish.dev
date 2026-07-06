"use client";

import { useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { blogs } from "@/data/blogs";
import PDFModal from "@/components/PDFModal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Helper to generate a random rotation between -2 and 2 degrees
const getRandomRotation = () => Math.random() * 4 - 2;

// ── Journal Card ──────────────────────────────────────────────────
const JournalCard = ({ blog, index, onOpen }) => {
  // Alternate card colors
  const colors = ["bg-[#E8E6E1] text-[#111018]", "bg-[#232132] text-white", "bg-[#1E1A2D] text-white"];
  const theme = colors[index % colors.length];
  const isDark = theme.includes("text-[#111018]");

  return (
    <article
      onClick={() => onOpen(blog)}
      className={`journal-card cursor-pointer group relative flex flex-col p-6 sm:p-8 transition-transform hover:scale-[1.02] hover:z-20 ${theme}`}
      style={{
        boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
        clipPath: index % 2 === 0 
          ? "polygon(1% 0, 99% 2%, 100% 99%, 0 100%)" 
          : "polygon(0 2%, 100% 0, 98% 100%, 2% 99%)",
        transform: `rotate(${getRandomRotation()}deg)`
      }}
    >
      {/* ── Image ── */}
      <div className="relative w-full aspect-[16/10] mb-6 border border-black/10 shadow-inner overflow-hidden transform group-hover:-rotate-1 transition-transform duration-500">
        <Image
          src={blog.cover}
          alt={blog.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="eager"
        />
        {/* Tape accent */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 backdrop-blur-sm rotate-[4deg] z-10" style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }} />
      </div>

      {/* ── Meta ── */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-black text-4xl opacity-10 font-mono tracking-tighter select-none">
          _{String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-4">
          <span className={`flex items-center gap-1.5 font-mono text-[10px] tracking-widest ${isDark ? "text-[#111018]/60" : "text-white/60"}`}>
            <Clock className="w-3 h-3" />
            {blog.readTime}
          </span>
          <span className={`font-mono text-[10px] tracking-widest ${isDark ? "text-[#111018]/50" : "text-white/50"}`}>
            {blog.date}
          </span>
        </div>
      </div>

      {/* ── Title ── */}
      <h3 className="font-black text-3xl sm:text-4xl leading-[1.1] tracking-tight mb-4 group-hover:underline decoration-4 underline-offset-4 decoration-purple-500/50">
        {blog.title}
      </h3>

      {/* ── Tags ── */}
      <div className="flex flex-wrap gap-2 mb-6">
        {blog.tags.map((tag) => (
          <span
            key={tag}
            className={`text-[9px] font-mono tracking-widest uppercase border rounded-sm px-2 py-1 ${
              isDark ? "border-[#111018]/20 bg-[#111018]/5 text-[#111018]/80" : "border-white/20 bg-white/5 text-white/80"
            }`}
            style={{ clipPath: "polygon(5% 0, 100% 5%, 95% 100%, 0 95%)" }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* ── Excerpt (Journal style) ── */}
      <div className="mt-auto">
        <div className={`h-px w-full mb-4 ${isDark ? "bg-[#111018]/10" : "bg-white/10"}`} />
        <p className={`text-sm sm:text-base leading-relaxed font-serif line-clamp-3 ${isDark ? "text-[#111018]/80" : "text-white/80"}`}>
          {blog.excerpt}
        </p>
        
        {/* Read CTA */}
        <div className={`flex items-center justify-end mt-4 gap-1 font-bold text-sm ${isDark ? "text-purple-700" : "text-purple-400"}`}>
          Read Clipping
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </div>
      </div>

    </article>
  );
};

// ── Main export ───────────────────────────────────────────────
export default function BlogSection() {
  const [activeBlog, setActiveBlog] = useState(null);
  const featuredBlogs = blogs.filter((b) => b.featured);
  
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useGSAP(() => {
    // Animate the header SVG highlight
    gsap.fromTo(
      ".blog-header-highlight path",
      { strokeDasharray: 500, strokeDashoffset: 500 },
      {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        },
      }
    );

    // Stagger in the Journal Cards (Page Flip)
    const cards = gsap.utils.toArray(".journal-card");
    gsap.set(cards, { transformPerspective: 1000 });
    
    gsap.fromTo(cards, 
      { opacity: 0, rotationX: -90, transformOrigin: "top center" },
      {
        opacity: 1, 
        rotationX: 0, 
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );

  }, { scope: containerRef });

  return (
    <>
      <section id="blog" ref={containerRef} className="relative py-20 sm:py-28 bg-[#111018] font-sans overflow-hidden">
        
        {/* Paper texture background */}
        <svg className="pointer-events-none absolute inset-0 z-0 w-full h-full opacity-[0.15] mix-blend-overlay">
          <filter id="blog-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.5 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#blog-noise)" />
        </svg>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">

          {/* ── Section header ── */}
          <div ref={headerRef} className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="relative">
              <p className="text-[10px] font-mono text-purple-400/80 tracking-[0.3em] uppercase mb-4 font-bold">
                ◆ &nbsp; Technical Writing
              </p>
              <h2
                className="font-black text-white leading-none tracking-tight relative z-10"
                style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", letterSpacing: "-0.03em" }}
              >
                My{" "}
                <span className="text-transparent" style={{ WebkitTextStroke: "1.5px #E8E6E1" }}>
                  Journal
                </span>
              </h2>
              
              {/* SVG Highlight behind "Journal" */}
              <svg className="blog-header-highlight absolute bottom-0 right-0 w-3/4 h-1/2 -z-10 overflow-visible opacity-60" viewBox="0 0 200 40" fill="none">
                <path d="M10,25 C50,15 150,15 190,25 C170,35 70,35 20,30" stroke="#A78BFA" strokeWidth="12" strokeLinecap="round" />
              </svg>
            </div>
            
            <Link
              href="/blog"
              className="group paper-card flex items-center gap-2 font-bold text-white border-2 border-white/20 px-6 py-3 transition-colors hover:bg-white/5"
              style={{ clipPath: "polygon(2% 0, 100% 2%, 98% 100%, 0 98%)" }}
            >
              View Archives
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>

          {/* ── Grid Layout for Blogs ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
            {featuredBlogs.map((blog, i) => (
              <JournalCard
                key={blog.id}
                blog={blog}
                index={i}
                onOpen={setActiveBlog}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ── PDF Reader Modal ── */}
      {activeBlog && (
        <PDFModal blog={activeBlog} onClose={() => setActiveBlog(null)} />
      )}
    </>
  );
}