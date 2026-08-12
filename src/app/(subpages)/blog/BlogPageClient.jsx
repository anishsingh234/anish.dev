"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock, BookOpen } from "lucide-react";
import { blogs } from "@/data/blogs";
import PDFModal from "@/components/PDFModal";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function BlogPageClient() {
  const [activeBlog, setActiveBlog] = useState(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Back link & Header entrance
    tl.fromTo(".page-header",
      { y: 30, opacity: 0, rotationZ: -2 },
      { y: 0, opacity: 1, rotationZ: 0, duration: 0.8, ease: "power3.out" }
    );

    // 2. Stats row stamp in
    tl.fromTo(".stat-stamp",
      { scale: 1.5, opacity: 0, rotationZ: () => Math.random() * 20 - 10 },
      { scale: 1, opacity: 1, rotationZ: (i) => i % 2 === 0 ? -2 : 2, duration: 0.4, stagger: 0.1, ease: "back.out(2)" },
      "-=0.4"
    );

    // 3. Blog cards (Physical Polaroids / Reports) flutter in
    tl.fromTo(".blog-card",
      { y: 60, opacity: 0, rotationX: -30, transformPerspective: 1000 },
      { y: 0, opacity: 1, rotationX: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
      "-=0.2"
    );

  }, { scope: containerRef });

  return (
    <>
      <main ref={containerRef} className="min-h-screen bg-[#111018] font-sans relative overflow-hidden">

        {/* Paper texture overlay — scoped to this page, not fixed to viewport */}
        <div className="pointer-events-none absolute inset-0 z-[1] w-full h-full opacity-[0.15] mix-blend-overlay paper-noise" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">

          {/* Back link */}
          <div className="page-header mb-12">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 font-mono text-sm font-bold text-[#E8E6E1]/50 hover:text-white transition-colors uppercase tracking-widest border border-white/10 px-4 py-2 bg-white/5 shadow-sm"
              style={{ clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0 100%)" }}
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Return to Base
            </Link>
          </div>

          {/* Page Header */}
          <div className="page-header mb-16 relative w-fit">
            <div className="absolute -top-6 left-0 w-16 h-8 bg-white/10 backdrop-blur-sm rotate-[-4deg] shadow-sm pointer-events-none" />

            <p className="font-mono text-xs font-bold text-red-500 tracking-widest uppercase mb-4 border-b-2 border-red-500 pb-1 inline-block">
              Declassified Field Reports
            </p>
            <h1 className="text-5xl sm:text-7xl font-black text-white uppercase tracking-tighter drop-shadow-[4px_4px_0_rgba(0,0,0,0.8)] leading-none mb-6">
              Research <br />
              <span className="text-[#E8E6E1]" style={{ WebkitTextStroke: "1px black" }}>Dossiers.</span>
            </h1>
            <p className="text-sm font-mono text-white/60 font-bold max-w-lg leading-relaxed bg-[#232132] p-4 border-l-4 border-red-500 shadow-md">
              "Deep dives into the systems I've built — architecture decisions,
              tradeoffs, and lessons from shipping AI products in production."
            </p>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-6 mb-16 border-b-2 border-white/10 pb-8">
            {[
              { value: blogs.length, label: "Files" },
              { value: "AI / Sys", label: "Topics" },
              { value: "PDF", label: "Format" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="stat-stamp flex items-center gap-3 px-4 py-2 bg-[#E8E6E1] text-[#111018] shadow-[4px_6px_0_rgba(0,0,0,0.5)] border-2 border-black"
                style={{ clipPath: "polygon(2% 2%, 98% 0, 100% 98%, 0 100%)" }}
              >
                <span className="font-black text-xl font-mono">
                  {stat.value}
                </span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-60">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Blog Cards (Dossier Polaroids) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {blogs.map((blog, i) => (
              <article
                key={blog.id}
                onClick={() => setActiveBlog(blog)}
                className="blog-card group relative flex flex-col bg-[#E8E6E1] text-[#111018] p-4 sm:p-6 shadow-[10px_15px_30px_rgba(0,0,0,0.5)] cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:shadow-[15px_20px_40px_rgba(0,0,0,0.6)] border-t-8 border-t-[#232132]"
                style={{
                  clipPath: i % 2 === 0 ? "polygon(1% 0, 100% 1%, 99% 100%, 0 99%)" : "polygon(0 1%, 99% 0, 100% 99%, 1% 100%)",
                  transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)`
                }}
              >

                {/* Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/50 rotate-[3deg] shadow-sm pointer-events-none z-10" />

                {/* Cover Polaroid */}
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#232132] border-4 border-white shadow-inner mb-6">
                  <Image
                    src={blog.cover}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale-[20%] contrast-125"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Photo timestamp overlay */}
                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-red-500 font-mono text-[10px] font-bold tracking-widest">
                    REC: {blog.date}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] font-bold px-2 py-1 bg-[#111018] text-white uppercase tracking-widest"
                      style={{ clipPath: "polygon(2% 0, 100% 2%, 98% 100%, 0 98%)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1">

                  <h2 className="text-xl font-black uppercase tracking-tight leading-none mb-3 line-clamp-2">
                    {blog.title}
                  </h2>

                  <div className="p-3 bg-white/60 border border-black/10 shadow-[inset_1px_2px_4px_rgba(0,0,0,0.05)] mb-4 font-serif italic text-sm leading-relaxed text-[#111018]/80 line-clamp-3">
                    "{blog.excerpt}"
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t-2 border-black/10">
                    <span className="flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-red-600">
                      <Clock className="w-3.5 h-3.5" />
                      {blog.readTime}
                    </span>

                    <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-[#111018] group-hover:text-purple-700 transition-colors">
                      <BookOpen className="w-3.5 h-3.5" />
                      Read Report
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>

                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      {/* PDF Modal */}
      {activeBlog && (
        <PDFModal blog={activeBlog} onClose={() => setActiveBlog(null)} />
      )}
    </>
  );
}
