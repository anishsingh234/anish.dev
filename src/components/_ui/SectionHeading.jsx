"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Shared heading used by every home/blog section — a caveat-script eyebrow
// tag plus a die-cut paper chip around the accent word, taped down like the
// rest of the site's parchment cards/stamps, replacing the old
// outline-text-and-SVG-underline look that didn't read as "paper".
export default function SectionHeading({
  eyebrow,
  title,
  accent,
  stamp,
  stacked = false,
  align = "left",
  className = "",
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".sh-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(
          ".sh-title-line",
          { y: 60, opacity: 0, duration: 0.9, ease: "power3.out" },
          "-=0.35",
        )
        .from(
          ".sh-accent-chip",
          {
            scale: 0,
            opacity: 0,
            rotationZ: "+=12",
            duration: 0.7,
            ease: "back.out(1.8)",
          },
          "-=0.5",
        )
        .from(
          ".sh-tape",
          { scaleX: 0, opacity: 0, duration: 0.3, ease: "power1.out" },
          "-=0.25",
        );

      if (stamp) {
        tl.from(
          ".sh-stamp",
          { scale: 2, opacity: 0, duration: 0.4, ease: "power4.in" },
          "-=0.3",
        );
      }
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className={`section-heading relative inline-block ${align === "center" ? "text-center" : ""} ${className}`}
    >
      <p className="sh-eyebrow text-2xl sm:text-3xl font-caveat text-purple-400 mb-4 transform -rotate-2 origin-left inline-block">
        {eyebrow}
      </p>
      <h2
        className="font-bebas text-white leading-[0.85] tracking-wide relative z-10 uppercase"
        style={{ fontSize: "clamp(4.5rem, 11vw, 9rem)" }}
      >
        <span className="sh-title-line relative inline-block">
          {title}
          {stamp && (
            <span className="sh-stamp absolute -top-4 -right-8 sm:-right-16 opacity-40 transform rotate-[15deg] pointer-events-none select-none border-4 border-[#ff3366] text-[#ff3366] font-bebas tracking-[0.2em] px-2 py-1 text-xl sm:text-3xl z-20 mix-blend-screen shadow-lg">
              {stamp}
            </span>
          )}
        </span>
        {stacked && <br />}
        {!stacked && " "}
        <span
          className="sh-accent-chip relative inline-block px-4 py-1 sm:px-5 sm:py-2 mt-2 sm:mt-4 align-middle normal-case bg-accent text-white"
          style={{
            clipPath: "polygon(2% 6%, 98% 0%, 100% 94%, 0% 100%)",
            boxShadow: "6px 8px 0px rgba(0,0,0,0.35)",
            transform: "rotate(-2deg)",
          }}
        >
          {accent}
          <span className="sh-tape absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-white/40 backdrop-blur-md rotate-[-4deg] shadow-sm" />
        </span>
      </h2>
    </div>
  );
}
