"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

const words = [
  { text: "Hello",        lang: "Code. Create. Scale." }, // English
  { text: "你好",          lang: "编写 · 创造 · 扩展" },     // Chinese
  { text: "こんにちは",     lang: "コード · 創造 · 拡張" }, // Japanese
  { text: "Bonjour",      lang: "Coder · Créer · Déployer" }, // French
  { text: "안녕하세요",     lang: "코드 · 창조 · 확장" },     // Korean
   { text: "Здравствуйте", lang: "Код · Создание · Масштаб" }, // Russian
 { text: "नमस्ते", lang: "आपका स्वागत है" } // Hindi
 
];

const FLASH_WORDS = words.slice(0, -1);
const FINAL_WORD  = words[words.length - 1];

const Preloader = () => {
  const preloaderRef = useRef(null);
  const tlRef        = useRef(null);

  // ── Animation ─────────────────────────────────────────────
  useGSAP(() => {
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => { document.body.style.overflow = ""; },
    });
    tlRef.current = tl;

    // Phase 1 — flash each word quickly
    FLASH_WORDS.forEach((word) => {
      tl.call(() => {
        document.querySelector(".pl-text").textContent = word.text;
        document.querySelector(".pl-lang").textContent = word.lang;
      })
        .fromTo(".pl-text",
          { autoAlpha: 0, y: "-14%", scale: 1.1 },
          { autoAlpha: 1, y: "0%", scale: 1, duration: 0.08, ease: "back.out(2)" }
        )
        .fromTo(".pl-lang",
          { autoAlpha: 0 },
          { autoAlpha: 0.55, duration: 0.06 },
          "<0.04"
        )
        .to(".pl-text", { duration: 0.1 })
        .to(".pl-text", { autoAlpha: 0, y: "12%", scale: 0.95, duration: 0.06, ease: "power2.in" })
        .to(".pl-lang", { autoAlpha: 0, duration: 0.05 }, "<");
    });

    // Phase 2 — namaste image drops in, then "Hello" rises beneath it
    tl.call(() => {
      document.querySelector(".pl-text").textContent = FINAL_WORD.text;
      document.querySelector(".pl-lang").textContent = FINAL_WORD.lang;
    })
      // image bounces in from top
      .fromTo(".pl-image",
        { autoAlpha: 0, y: -50, scale: 0.8 },
        { autoAlpha: 1, y: 0,   scale: 1,   duration: 0.7, ease: "back.out(1.6)" }
      )
      // "Hello" slides up
      .fromTo(".pl-text",
        { autoAlpha: 0, y: "60%" },
        { autoAlpha: 1, y: "0%", duration: 0.7, ease: "power3.out" },
        "<0.2"
      )
      // language label fades
      .fromTo(".pl-lang",
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 0.7, y: 0, duration: 0.35, ease: "power2.out" },
        "<0.35"
      );

    // Phase 3 — exit: image flies up, text fades, strips wipe out
    tl.to(".pl-image", {
      delay: 0.25,
      autoAlpha: 0, y: -24, scale: 0.88,
      duration: 0.3, ease: "power2.in",
    })
      .to(".pl-text",  { autoAlpha: 0, y: "-10%", scale: 0.96, duration: 0.28, ease: "power2.in" }, "<0.05")
      .to(".pl-lang",  { autoAlpha: 0, duration: 0.2 }, "<")

      .to(".preloader-strip",
        { y: "101%", duration: 0.6, stagger: 0.05, ease: "power2.inOut" },
        "<0.1"
      )
      .to(preloaderRef.current, { autoAlpha: 0, duration: 0.15 }, "<0.55");

  }, { scope: preloaderRef });

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] overflow-hidden flex"
    >
      {/* 10 vertical strips — match portfolio bg */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="preloader-strip h-full flex-1 bg-[#0E0B1A] scale-x-105" />
      ))}

      {/* ── Centered content ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 pointer-events-none w-[90vw]">

        {/* Namaste hands image */}
        <div
          className="pl-image"
          style={{ opacity: 0, width: "clamp(80px, 12vw, 130px)" }}
        >
          <img
            src="/namaste.png"
            alt="Namaste"
            width={130}
            height={130}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Word */}
        <span
          className="pl-text block leading-tight will-change-transform text-center"
          style={{
            fontFamily: "var(--font-great-vibes), 'Great Vibes', 'Amita', 'Samarkan', serif",
            fontSize: "clamp(48px, 13vw, 155px)",
            backgroundImage: "linear-gradient(to right, #ffffff, rgba(216,180,254,0.9))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            opacity: 0,
            whiteSpace: "nowrap",
          }}
        >
          नमस्ते
        </span>

        {/* Language label — purple tint to match theme */}
        <span
          className="pl-lang"
          style={{
            fontFamily: "var(--font-dancing-script), 'Dancing Script', cursive",
            fontSize: "clamp(10px, 1.8vw, 15px)",
            letterSpacing: "0.3em",
            color: "rgba(167,139,250,0.75)",
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