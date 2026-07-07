"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader() {
  const containerRef = useRef(null);
  const paperRef = useRef(null);
  const progressTextRef = useRef(null);
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
        setIsComplete(true);
      },
    });

    const counter = { val: 0 };

    // 1. Draw the scribble SVG while counting up
    tl.to(counter, {
      val: 100,
      duration: 2.2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (progressTextRef.current) {
          progressTextRef.current.innerText = `${Math.round(counter.val)}%`;
        }
      },
    })
    .fromTo(".preloader-scribble path", 
      { strokeDasharray: 1000, strokeDashoffset: 1000 },
      { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" },
      "<" // run concurrently with the counter
    );

    // 2. Swipe the paper away aggressively
    tl.to(paperRef.current, {
      x: "130vw",        // Fly off to the right
      y: "-20vh",        // Slight upward arc
      rotationZ: 45,     // Spin like it's being tossed
      opacity: 0,
      duration: 0.9,
      ease: "power4.in",
    }, "+=0.3") // tiny pause before tossing
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.3,
    }, "-=0.2"); // fade out the wrapper right at the end

  }, { scope: containerRef });

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#05050A] overflow-hidden"
    >
      {/* The Physical Paper filling the screen */}
      <div 
        ref={paperRef}
        className="relative w-[105vw] h-[105vh] flex flex-col items-center justify-center bg-[#E8E6E1] text-[#111018] shadow-2xl origin-center"
        style={{
          // Uneven torn edges
          clipPath: "polygon(1% 1%, 99% 0, 100% 99%, 0 98%)",
        }}
      >
        {/* Aggressive Paper Texture Overlay */}
        <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-30 mix-blend-multiply z-0">
          <filter id="preloader-heavy-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.4 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#preloader-heavy-noise)" />
        </svg>

        <div className="relative z-10 flex flex-col items-center">
          
          <h1 className="font-bebas text-6xl sm:text-8xl tracking-tight mb-8 transform -rotate-2 select-none">
            Anish.
          </h1>
          
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center select-none">
            {/* Hand-drawn scribble circle acting as loader */}
            <svg className="preloader-scribble absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 200 200">
              <path 
                d="M100,20 C140,20 180,60 180,100 C180,140 140,180 100,180 C60,180 20,140 20,100 C20,60 60,20 100,20 C140,20 190,60 190,110 C190,150 140,190 90,190 C40,190 10,140 10,90 C10,40 60,10 110,10" 
                fill="none" 
                stroke="#111018" 
                strokeWidth="6" 
                strokeLinecap="round" 
              />
            </svg>
            
            <div 
              ref={progressTextRef}
              className="font-mono text-3xl sm:text-5xl font-black text-[#111018]"
            >
              0%
            </div>
          </div>

          <p className="font-caveat text-2xl sm:text-3xl mt-12 text-[#111018]/80 transform rotate-1 select-none">
            sketching portfolio...
          </p>

        </div>
      </div>
    </div>
  );
}
