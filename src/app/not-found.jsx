import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-[#05050A] text-white flex flex-col items-center justify-center overflow-hidden px-6 py-20 font-sans">
      {/* Paper texture */}
      <div className="hidden md:block pointer-events-none absolute inset-0 z-0 w-full h-full opacity-[0.15] mix-blend-overlay paper-noise" />

      <div className="relative z-10 w-full max-w-xl">
        <div
          className="relative bg-[#E8E6E1] text-[#111018] p-8 sm:p-12 text-center shadow-2xl"
          style={{
            clipPath: "polygon(1% 1%, 99% 0, 100% 99%, 0 100%)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            transform: "rotate(-1.5deg)",
          }}
        >
          {/* Tape */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/50 backdrop-blur-md rotate-[-3deg] z-20 shadow-sm" />

          {/* 404 ink stamp */}
          <div
            className="inline-block mb-4 opacity-70 transform rotate-[-8deg] pointer-events-none select-none border-4 border-[#ff3366] text-[#ff3366] font-bebas tracking-[0.2em] px-4 py-1 text-2xl sm:text-3xl mix-blend-multiply"
          >
            ERROR 404
          </div>

          <p className="font-mono text-xs opacity-50 uppercase tracking-widest border-b border-black/10 pb-4 mb-6">
            File No: 404-LOST // Page Not Found
          </p>

          <h1 className="font-bebas leading-[0.85] tracking-wide uppercase mb-6" style={{ fontSize: "clamp(3.5rem, 12vw, 6rem)" }}>
            Page Went
            <br />
            <span
              className="relative inline-block px-4 py-1 mt-2 align-middle normal-case bg-accent text-white"
              style={{
                clipPath: "polygon(2% 6%, 98% 0%, 100% 94%, 0% 100%)",
                boxShadow: "6px 8px 0px rgba(0,0,0,0.35)",
                transform: "rotate(-2deg)",
              }}
            >
              Missing.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#111018]/70 leading-relaxed font-serif mb-8">
            This page was torn out, moved, or never existed. Let&apos;s get you
            back to something real.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="paper-card group relative bg-[#111018] text-white px-6 py-3 font-bold inline-flex items-center gap-2 transition-transform hover:scale-105"
              style={{
                clipPath: "polygon(0% 10%, 15% 0%, 100% 0%, 100% 100%, 0% 100%)",
                boxShadow: "4px 8px 15px rgba(0,0,0,0.4)",
              }}
            >
              <span>Go Home</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
            <Link
              href="/#projects"
              className="paper-card group relative bg-[#ffeb3b] text-[#111018] px-6 py-3 font-bold inline-flex items-center gap-2 transition-transform hover:-translate-y-1"
              style={{
                boxShadow: "6px 6px 15px rgba(0,0,0,0.4)",
                clipPath: "polygon(0% 0%, 100% 0%, 95% 100%, 0% 95%)",
              }}
            >
              <Download className="w-4 h-4" />
              <span>View Projects</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
