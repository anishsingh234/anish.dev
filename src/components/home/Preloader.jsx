"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useCallback } from "react";

gsap.registerPlugin(useGSAP);

const words = [
  { text: "नमस्ते", lang: "Hindi" },
  { text: "Hola", lang: "Spanish" },
  { text: "こんにちは", lang: "Japanese" },
  { text: "Bonjour", lang: "French" },
  { text: "안녕하세요", lang: "Korean" },
  { text: "Hello", lang: "English" },
];

const Preloader = () => {
  const preloaderRef = useRef(null);
  const tlRef = useRef(null);

  // ── Skip handler: kills the timeline and runs a fast exit ──
  const handleSkip = useCallback(() => {
    if (!tlRef.current) return;

    tlRef.current.kill();
    tlRef.current = null;

    document.body.style.overflow = "";

    gsap.to(".preloader-strip", {
      y: "101%",
      duration: 0.45,
      stagger: 0.035,
      ease: "power2.inOut",
    });
    gsap.to([".pl-text", ".pl-lang", ".pl-skip-btn"], {
      autoAlpha: 0,
      duration: 0.2,
    });
    gsap.to(preloaderRef.current, {
      autoAlpha: 0,
      duration: 0.15,
      delay: 0.45,
    });
  }, []);

  useGSAP(
    () => {
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => {
          document.body.style.overflow = "";
        },
      });

      tlRef.current = tl;

      // ── Phase 1: Flash each word ──
      words.slice(0, -1).forEach((word) => {
        tl.call(() => {
          document.querySelector(".pl-text").textContent = word.text;
          document.querySelector(".pl-lang").textContent = word.lang;
        })
          .fromTo(
            ".pl-text",
            { autoAlpha: 0, y: "-14%", scale: 1.1 },
            {
              autoAlpha: 1,
              y: "0%",
              scale: 1,
              duration: 0.08,
              ease: "back.out(2)",
            },
          )
          .fromTo(
            ".pl-lang",
            { autoAlpha: 0 },
            { autoAlpha: 0.55, duration: 0.06 },
            "<0.04",
          )
          .to(".pl-text", { duration: 0.1 })
          .to(".pl-text", {
            autoAlpha: 0,
            y: "12%",
            scale: 0.95,
            duration: 0.06,
            ease: "power2.in",
          })
          .to(".pl-lang", { autoAlpha: 0, duration: 0.05 }, "<");
      });

      // ── Phase 2: Final "Hello" slides up elegantly ──
      tl.call(() => {
        document.querySelector(".pl-text").textContent = "Hello";
        document.querySelector(".pl-lang").textContent = "English";
      })
        .fromTo(
          ".pl-text",
          { autoAlpha: 1, y: "60%", scale: 1 },
          { y: "0%", duration: 0.7, ease: "power3.out" },
        )
        .fromTo(
          ".pl-lang",
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 0.7, y: 0, duration: 0.35, ease: "power2.out" },
          "<0.35",
        );

      // ── Phase 3: Exit ──
      tl.to(".pl-text", {
        delay: 0.6,
        autoAlpha: 0,
        y: "-10%",
        scale: 0.96,
        duration: 0.28,
        ease: "power2.in",
      })
        .to(".pl-lang", { autoAlpha: 0, duration: 0.2 }, "<")
        .to(".pl-skip-btn", { autoAlpha: 0, duration: 0.2 }, "<")
        .to(
          ".preloader-strip",
          { y: "101%", duration: 0.6, stagger: 0.05, ease: "power2.inOut" },
          "<0.1",
        )
        .to(preloaderRef.current, { autoAlpha: 0, duration: 0.15 }, "<0.55");
    },
    { scope: preloaderRef },
  );

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] overflow-hidden flex"
      aria-hidden="true"
    >
      {/* 10 vertical strips */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="preloader-strip h-full flex-1 bg-[#080808]" />
      ))}

      {/* ── Skip button ── */}
      <button
        className="pl-skip-btn absolute top-4 right-4 sm:top-5 sm:right-6 z-10 group"
        onClick={handleSkip}
        aria-label="Skip intro"
        style={{ opacity: 0 }}
      >
        <style>{`
    .pl-skip-btn {
      animation: skipFadeIn 0.5s ease 0.3s forwards;
    }

    @keyframes skipFadeIn {
      from { opacity: 0; transform: translateY(-6px) scale(0.96); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
  `}</style>

        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 bg-white/5 
               transition-all duration-300 
               hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)]"
        >
          <span
            className="uppercase tracking-[0.25em] text-[11px] sm:text-xs text-[#aaa] 
                 group-hover:text-[#f2ede4] transition-colors duration-200"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Skip
          </span>

          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-300 group-hover:translate-x-1"
          >
            <path
              d="M2 7h10M8 3l4 4-4 4"
              stroke="#aaa"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:stroke-[#f2ede4] transition-colors duration-200"
            />
          </svg>
        </div>
      </button>

      {/* ── Centered word block ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-[90vw] flex flex-col items-center gap-2 pointer-events-none">
        <span
          className="pl-text block leading-tight will-change-transform"
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "clamp(48px, 13vw, 155px)",
            color: "#f2ede4",
            opacity: 0,
            whiteSpace: "nowrap",
          }}
        >
          नमस्ते
        </span>

        <span
          className="pl-lang"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "clamp(10px, 1.8vw, 15px)",
            letterSpacing: "0.3em",
            color: "#3a3a3a",
            textTransform: "uppercase",
            opacity: 0,
          }}
        >
          Hindi
        </span>
      </div>
    </div>
  );
};

export default Preloader;
