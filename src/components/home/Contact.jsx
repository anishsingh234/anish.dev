"use client";
import { useState, useRef } from "react";
import { Mail, Github, Linkedin, CheckCircle2, ArrowUpRight } from "lucide-react";
import Form from "@/components/contact/Form";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const socials = [
  {
    label: "GitHub",
    sub: "anishsingh234",
    href: "https://github.com/anishsingh234",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    sub: "linkedin.com/in/anish-ai",
    href: "https://linkedin.com/in/anish-ai",
    icon: <Linkedin className="w-5 h-5" />,
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef(null);

  const copyEmail = () => {
    navigator.clipboard.writeText("anishsingh210204@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useGSAP(() => {
    // 1. Header Timeline
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    headerTl.from(".contact-title-wrapper", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
    .to(".contact-header-highlight path", {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: "power2.inOut"
    }, "-=0.4");

    // 2. Left side pins
    gsap.from(".social-pin", {
      y: 50,
      opacity: 0,
      rotationZ: () => Math.random() * 10 - 5,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(1.5)",
      scrollTrigger: {
        trigger: ".contact-wrapper",
        start: "top 75%",
        toggleActions: "play none none reverse",
      }
    });

    // 3. Form Envelope (Right)
    gsap.from(".contact-form-envelope", {
      x: 80,
      opacity: 0,
      rotationZ: 3,
      duration: 1,
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: ".contact-wrapper",
        start: "top 75%",
        toggleActions: "play none none reverse",
      }
    });

  }, { scope: sectionRef });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-transparent py-20 sm:py-28 overflow-hidden font-sans border-t-2 border-white/5"
    >

      <div className="contact-wrapper max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">

        {/* ── Section header ── */}
        <div className="contact-header mb-16 relative w-fit overflow-hidden sm:overflow-visible">
          <div className="contact-title-wrapper relative inline-block">
            <p className="text-2xl font-caveat text-purple-400 mb-2 transform -rotate-2">
              Open Comms
            </p>
            <h2 className="font-bebas text-white leading-none tracking-wide relative z-10" style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}>
              Direct{" "}
              <span className="text-transparent relative inline-block" style={{ WebkitTextStroke: "2px #A78BFA" }}>
                Line.
                {/* Hand drawn highlight */}
                <svg className="contact-header-highlight absolute -bottom-4 left-0 w-[110%] h-6 overflow-visible -z-10" viewBox="0 0 200 20" fill="none">
                  <path d="M0,10 Q50,5 100,10 T200,10" stroke="#A78BFA" strokeWidth="6" strokeLinecap="round" opacity="0.4" strokeDasharray="300" strokeDashoffset="300" />
                </svg>
              </span>
            </h2>
          </div>
        </div>

        {/* ── Envelope Layout (Two columns) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ── Left: Pinned Information ── */}
          <div className="flex flex-col gap-8">
            
            <div className="social-pin p-6 bg-[#E8E6E1] text-[#111018] shadow-lg relative transform -rotate-1" style={{ clipPath: "polygon(1% 0, 99% 1%, 100% 99%, 0 100%)" }}>
              {/* Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 backdrop-blur-sm rotate-[4deg] z-10 shadow-sm" />
              
              <p className="text-lg font-serif font-medium leading-relaxed">
                I am actively seeking <span className="font-bold bg-purple-200 px-1">Full-Stack & AI Engineering</span> opportunities. 
                If you have an exciting role or a tough problem to solve, I'm ready to ship.
              </p>
            </div>

            {/* Email Block */}
            <div className="social-pin flex flex-col gap-3">
              <span className="text-xs font-mono text-white/50 tracking-[0.25em] uppercase font-bold">
                Email Dispatch
              </span>
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-xl font-bold text-white tracking-tight underline decoration-purple-500/50 decoration-2 underline-offset-4">
                  anishsingh210204@gmail.com
                </span>
                <button
                  onClick={copyEmail}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white font-mono text-[10px] uppercase tracking-widest font-bold shadow-md transition-transform hover:-translate-y-1"
                  style={{ clipPath: "polygon(5% 0, 100% 5%, 95% 100%, 0 95%)" }}
                >
                  {copied ? (
                    <><CheckCircle2 className="w-4 h-4" /> Copied</>
                  ) : (
                    <><Mail className="w-4 h-4" /> Copy Address</>
                  )}
                </button>
              </div>
            </div>

            {/* Social rows */}
            <div className="flex flex-col gap-4 mt-4">
              {socials.map(({ label, sub, href, icon }, i) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pin group flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors border-l-4 border-purple-500"
                  style={{ transform: `rotate(${i % 2 === 0 ? 1 : -1}deg)` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-white">
                      {icon}
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-white tracking-tight uppercase">
                        {label}
                      </span>
                      <span className="text-xs font-mono text-white/60 tracking-wide">
                        {sub}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </a>
              ))}
            </div>

            {/* Availability note */}
            <div className="social-pin inline-flex items-center gap-3 px-4 py-3 bg-[#1A1825] border border-white/10 shadow-md w-fit mt-4" style={{ clipPath: "polygon(0 0, 100% 2%, 98% 100%, 2% 98%)" }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-mono text-white/80 tracking-widest uppercase font-bold">
                Available · Jun 2026
              </span>
            </div>
          </div>

          {/* ── Right: Physical Form Envelope ── */}
          <div className="contact-form-envelope relative p-8 sm:p-12 bg-[#E8E6E1] shadow-[15px_20px_40px_rgba(0,0,0,0.5)] border-t-8 border-purple-600"
               style={{ clipPath: "polygon(0 0, 100% 1%, 99% 100%, 1% 99%)" }}>
            
            {/* Stamp overlay */}
            <div className="absolute top-8 right-8 opacity-20 transform rotate-12 pointer-events-none select-none border-4 border-red-600 text-red-600 font-bold uppercase tracking-widest p-2 text-2xl font-mono">
              PRIORITY
            </div>
            
            <p className="text-[10px] font-mono text-[#111018]/50 tracking-[0.25em] uppercase font-bold mb-8">
              Write a Message
            </p>
            <Form />
          </div>

        </div>
      </div>
    </section>
  );
}