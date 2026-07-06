"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

// SVG filter for paper texture noise
const PaperTexture = () => (
  <svg className="pointer-events-none fixed inset-0 z-50 w-full h-full opacity-[0.15] mix-blend-overlay">
    <filter id="preloader-noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
      <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.5 0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#preloader-noise)" />
  </svg>
);

const Preloader = () => {
  const preloaderRef = useRef(null);

  useGSAP(() => {
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => { 
        document.body.style.overflow = ""; 
      },
    });

    // 1. Draw the paper plane
    tl.fromTo(".paper-plane path", 
      { strokeDasharray: 200, strokeDashoffset: 200 },
      { strokeDashoffset: 0, duration: 1.2, stagger: 0.1, ease: "power2.inOut" }
    )
    // 2. Fill the paper plane slightly
    .to(".paper-plane path", { fill: "rgba(167,139,250,0.1)", duration: 0.3 }, "-=0.3")
    
    // 3. Plane flies away
    .to(".paper-plane", { 
      x: 300, y: -300, scale: 0.5, opacity: 0, rotation: 45, 
      duration: 0.6, ease: "power3.in" 
    })
    
    // 4. Preloader "Paper" splits open horizontally
    .to(".preloader-half-top", { y: "-100%", duration: 0.6, ease: "power3.inOut" }, "-=0.2")
    .to(".preloader-half-bottom", { y: "100%", duration: 0.6, ease: "power3.inOut" }, "<")
    
    // 5. Hide container
    .to(preloaderRef.current, { autoAlpha: 0, duration: 0.1 });

  }, { scope: preloaderRef });

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex flex-col overflow-hidden"
    >
      <PaperTexture />
      
      {/* Top Half of Paper */}
      <div className="preloader-half-top absolute top-0 left-0 w-full h-1/2 bg-[#111018] border-b border-purple-400/10 shadow-[0_10px_20px_rgba(0,0,0,0.3)] origin-top" />
      
      {/* Bottom Half of Paper */}
      <div className="preloader-half-bottom absolute bottom-0 left-0 w-full h-1/2 bg-[#111018] border-t border-purple-400/10 shadow-[0_-10px_20px_rgba(0,0,0,0.3)] origin-bottom" />

      {/* Centered Origami Graphic */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <svg 
          className="paper-plane w-32 h-32 md:w-48 md:h-48 overflow-visible" 
          viewBox="0 0 100 100" 
          fill="transparent" 
          stroke="rgba(167,139,250,0.8)" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Main body of paper plane */}
          <path d="M10,50 L90,10 L50,90 L40,60 Z" />
          {/* Fold line */}
          <path d="M90,10 L40,60" />
          {/* Bottom flap */}
          <path d="M40,60 L40,80 L50,65" />
        </svg>
      </div>
    </div>
  );
};

export default Preloader;