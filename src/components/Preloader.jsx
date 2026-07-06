"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader() {
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const stampRef = useRef(null);
  const [isComplete, setIsComplete] = useState(false);

  // Lock body scroll while preloader is active
  useEffect(() => {
    if (!isComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isComplete]);

  useGSAP(() => {
    if (isComplete) return;

    const tl = gsap.timeline({
      onComplete: () => {
        // Unmount preloader after animation completes
        setIsComplete(true);
      },
    });

    // Object to hold our counter value for GSAP to animate
    const counter = { val: 0 };

    // 1. Animate the counter from 0 to 100
    tl.to(counter, {
      val: 100,
      duration: 2,
      ease: "power2.out", // Starts fast, slows down at the end
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = `${Math.round(counter.val)}%`;
        }
      },
    });

    // 2. Slam the "ACCESS GRANTED" stamp down
    tl.fromTo(
      stampRef.current,
      {
        scale: 3,
        opacity: 0,
        rotation: 0,
      },
      {
        scale: 1,
        opacity: 1,
        rotation: -12, // Slanted stamp
        duration: 0.5,
        ease: "back.out(2)", // Gives that aggressive "slam" bounce effect
      }
    );

    // 3. Small pause to let the user register the stamp
    tl.to({}, { duration: 0.4 });

    // 4. Slide the entire preloader container UP to reveal the site
    tl.to(containerRef.current, {
      y: "-100%",
      duration: 0.8,
      ease: "power4.inOut",
    });
  }, { scope: containerRef });

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0D0A10] text-white font-sans overflow-hidden"
    >
      {/* Paper Noise Overlay for Preloader */}
      <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.08] mix-blend-overlay z-0">
        <filter id="preloader-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#preloader-noise)" />
      </svg>

      <div className="relative z-10 flex flex-col items-center">
        {/* Typewriter Subtext */}
        <p className="font-caveat text-xl sm:text-2xl text-purple-400/80 mb-4 transform -rotate-2">
          Compiling Dossier...
        </p>

        {/* Massive 0-100 Counter */}
        <div
          ref={counterRef}
          className="font-bebas text-white leading-none tracking-wider mix-blend-screen"
          style={{ fontSize: "clamp(6rem, 15vw, 12rem)" }}
        >
          0%
        </div>

        {/* Hidden Stamp that gets slammed down */}
        <div
          ref={stampRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0"
        >
          <div className="px-6 py-2 border-4 sm:border-8 border-[#ff3366] text-[#ff3366] font-bebas text-5xl sm:text-8xl tracking-[0.2em] whitespace-nowrap mix-blend-screen shadow-2xl">
            COMPILATION SUCCESSFUL
          </div>
        </div>
      </div>
    </div>
  );
}
