"use client";
import { useRef } from "react";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const navLinks = [
  { label: "Home",       href: "/"            },
  { label: "Projects",   href: "/projects"    },
  { label: "Experience", href: "/#experience" },
  { label: "About",      href: "/#about"      },
  { label: "Contact",    href: "/#contact"    },
];

const socialLinks = [
  { icon: Github,   href: "https://github.com/anishsingh234",  label: "github"   },
  { icon: Linkedin, href: "https://linkedin.com/in/anish-ai",   label: "linkedin" },
  { icon: Mail,     href: "mailto:anishsingh210204@gmail.com",  label: "email"    },
];

const techStack = ["next.js", "tailwind", "gsap", "vercel"];

export default function Footer() {
  const footerRef = useRef(null);
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useGSAP(() => {
    // 1. Watermark slides up
    gsap.from(".footer-watermark span", {
      y: "100%",
      opacity: 0,
      rotation: 2,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
      }
    });

    // 2. Cards Stagger
    gsap.from(".footer-card", {
      y: 80,
      opacity: 0,
      rotationZ: () => Math.random() * 8 - 4,
      duration: 1,
      stagger: 0.15,
      ease: "back.out(1.5)",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 75%",
      }
    });

    // 3. Bottom Bar
    gsap.from(".footer-bottom", {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".footer-bottom",
        start: "top 95%",
      }
    });

    // 4. Scroll To Top Button
    gsap.from(".footer-scroll-top", {
      scale: 0,
      rotation: 45,
      duration: 0.6,
      ease: "back.out(2)",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 60%",
      }
    });
  }, { scope: footerRef });

  return (
    <footer 
      ref={footerRef}
      className="relative bg-[#0A0812] text-white pt-24 pb-0 mt-20 font-sans overflow-hidden"
      style={{
        // Jagged torn paper top edge
        clipPath: "polygon(0 40px, 4% 0, 8% 40px, 12% 10px, 16% 40px, 20% 0, 24% 40px, 28% 10px, 32% 40px, 36% 0, 40% 40px, 44% 10px, 48% 40px, 52% 0, 56% 40px, 60% 10px, 64% 40px, 68% 0, 72% 40px, 76% 10px, 80% 40px, 84% 0, 88% 40px, 92% 10px, 96% 40px, 100% 0, 100% 100%, 0 100%)",
      }}
    >
      {/* Paper texture background */}
      <div className="hidden md:block pointer-events-none absolute inset-0 z-0 w-full h-full opacity-10 mix-blend-overlay paper-noise" />

      {/* ── Giant background stamped watermark ── */}
      <div
        className="footer-watermark absolute bottom-0 left-0 right-0 flex items-end justify-center pointer-events-none select-none overflow-hidden opacity-5 z-0"
        aria-hidden
      >
        <span
          className="font-serif font-black leading-none tracking-tighter"
          style={{
            fontSize: "clamp(6rem, 25vw, 25rem)",
            color: "white",
            lineHeight: 0.75,
            transform: "rotate(-2deg)",
            transformOrigin: "bottom center"
          }}
        >
          ANISH
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-10 pb-0">

        {/* ── Collage Row ── */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-6 lg:gap-10 mb-20 items-start">
          
          {/* Card 1: Brand (Light Parchment) */}
          <div className="footer-card relative bg-[#E8E6E1] text-[#111018] p-8 sm:p-10 shadow-[10px_15px_30px_rgba(0,0,0,0.4)]"
               style={{ clipPath: "polygon(0 0, 100% 2%, 98% 100%, 2% 98%)", transform: "rotate(-2deg)" }}>
            
            <div className="flex flex-col gap-6">
              <div>
                <p className="font-serif font-black leading-none tracking-tight mb-3"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
                  Anish Kumar Singh
                </p>
                <p className="text-xs font-mono text-purple-700 tracking-widest uppercase font-bold">
                  Full Stack Developer · AI Engineer
                </p>
              </div>
              
              <div className="p-4 bg-black/5 border-l-4 border-purple-600 w-fit max-w-[350px]">
                <p className="text-[14px] text-[#111018]/80 font-serif italic leading-relaxed font-medium">
                  "Building production-grade systems at the intersection of LLMs,
                  RAG, and scalable full-stack architecture."
                </p>
              </div>

              {/* Availability Label */}
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#111018] text-white shadow-md transform rotate-1 w-fit mt-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-mono text-[10px] tracking-widest uppercase font-bold">
                  Available for Full-time Roles
                </span>
              </div>
            </div>

            {/* Tape */}
            <div className="absolute -top-3 left-10 w-16 h-6 bg-white/40 backdrop-blur-sm rotate-[4deg] z-10 shadow-sm" />
          </div>

          {/* Card 2: Index (Dark Slate) */}
          <div className="footer-card relative bg-[#232132] text-white p-8 sm:p-10 shadow-[10px_15px_30px_rgba(0,0,0,0.4)] md:-ml-8 md:mt-12"
               style={{ clipPath: "polygon(2% 0, 100% 1%, 99% 99%, 0 100%)", transform: "rotate(1deg)" }}>
            
            <p className="text-[10px] font-mono text-purple-400 tracking-[0.3em] uppercase mb-8 font-bold border-b border-white/10 pb-2 inline-block">
              Index
            </p>
            <ul className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-3 text-base font-bold text-white/70 hover:text-white transition-colors duration-200"
                  >
                    <span className="text-purple-500/0 group-hover:text-purple-500 transition-colors font-mono text-xs">◆</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Tape */}
            <div className="absolute -top-3 right-10 w-12 h-6 bg-white/20 backdrop-blur-sm rotate-[-6deg] z-10 shadow-sm" />
          </div>

          {/* Card 3: Network (Dark Purple) */}
          <div className="footer-card relative bg-[#1E1A2D] text-white p-8 sm:p-10 shadow-[10px_15px_30px_rgba(0,0,0,0.4)] md:-ml-8 md:mt-4"
               style={{ clipPath: "polygon(0 2%, 98% 0, 100% 98%, 1% 100%)", transform: "rotate(-1deg)" }}>
            
            <p className="text-[10px] font-mono text-emerald-400 tracking-[0.3em] uppercase mb-8 font-bold border-b border-white/10 pb-2 inline-block">
              Network
            </p>
            <div className="flex flex-col gap-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-4 text-white/70 hover:text-white transition-colors w-fit"
                >
                  <div className="p-3 bg-white/5 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors border border-white/5"
                       style={{ clipPath: "polygon(5% 0, 100% 5%, 95% 100%, 0 95%)" }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-sm tracking-widest uppercase font-bold group-hover:translate-x-1 transition-transform">{label}</span>
                </a>
              ))}
            </div>

            {/* Red stamp */}
            <div className="absolute bottom-6 right-4 opacity-30 transform rotate-[-15deg] pointer-events-none select-none border-4 border-red-500 text-red-500 font-bold uppercase tracking-widest p-1 text-xl md:text-2xl font-mono">
              VERIFIED
            </div>
          </div>
        </div>

        {/* ── Base Plate / Bottom Bar ── */}
        <div className="footer-bottom relative z-30 flex flex-col md:flex-row items-center justify-between gap-6 pb-8 pt-8 border-t-2 border-white/10 mt-10">
          
          <p className="font-mono text-[10px] text-white/40 tracking-widest uppercase font-bold">
            © {year} File Ref: AKS-PORTFOLIO.
          </p>
          
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="font-mono text-[9px] text-white/30 tracking-widest uppercase mr-2 font-bold">Built With:</span>
            {techStack.map((tech, i) => (
              <span
                key={tech}
                className="font-mono text-[9px] px-3 py-1.5 bg-[#1A1825] border border-white/5 text-white/60 tracking-widest uppercase shadow-sm font-bold"
                style={{ transform: `rotate(${i % 2 === 0 ? 2 : -2}deg)` }}
              >
                {tech}
              </span>
            ))}
          </div>

        </div>

        {/* ── Giant name spacer (keeps layout room) ── */}
        <div style={{ height: "clamp(4rem, 15vw, 15rem)" }} />
      </div>

      {/* ── Scroll to top Stamp ── */}
      <button
        onClick={scrollToTop}
        className="footer-scroll-top group absolute bottom-12 right-6 md:right-12 w-14 h-14 bg-purple-600 text-white flex items-center justify-center shadow-[4px_6px_12px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-1 z-50 border-2 border-black"
        style={{ clipPath: "polygon(10% 0, 100% 10%, 90% 100%, 0 90%)" }}
      >
        <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
      </button>

    </footer>
  );
}