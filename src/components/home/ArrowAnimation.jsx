"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const ArrowAnimation = () => {
  const svgRef    = useRef(null);
  const arrow1Ref = useRef(null);
  const arrow2Ref = useRef(null);

  useGSAP(() => {
    const svg    = svgRef.current;
    const arrow1 = arrow1Ref.current;
    const arrow2 = arrow2Ref.current;
    if (!svg || !arrow1 || !arrow2) return;

    const len1 = arrow1.getTotalLength();
    const len2 = arrow2.getTotalLength();

    gsap.set(svg,    { fill: "transparent", autoAlpha: 0 });
    gsap.set(arrow1, { strokeDasharray: len1, strokeDashoffset: len1 });
    gsap.set(arrow2, { strokeDasharray: len2, strokeDashoffset: len2 });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

    tl
      .to(svg, { autoAlpha: 1, duration: 0.3, delay: 1.8 })
      .to([arrow1, arrow2], {
        strokeDashoffset: 0,
        duration: 1.6,
        delay: 0.2,
        ease: "power2.inOut",
      })
      .to(svg, {
        fill: "rgba(139,92,246,0.05)",
        duration: 0.6,
        delay: 0.2,
      })
      .to(svg, {
        y: 260,
        autoAlpha: 0,
        duration: 1,
        ease: "power2.in",
      })
      .set(svg,    { y: 0, fill: "transparent" })
      .set(arrow1, { strokeDashoffset: len1 })
      .set(arrow2, { strokeDashoffset: len2 });

  }, { scope: svgRef });

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 376 111"
      fill="transparent"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none"
      style={{ width: "clamp(100px, 14vw, 180px)", height: "auto" }}
    >
      <path
        ref={arrow1Ref}
        d="M1 1V39.9286L188 110V70.6822L1 1Z"
        stroke="rgba(167,139,250,0.35)"
        strokeWidth="1"
      />
      <path
        ref={arrow2Ref}
        d="M375 1V39.9286L188 110V70.6822L375 1Z"
        stroke="rgba(167,139,250,0.35)"
        strokeWidth="1"
      />
    </svg>
  );
};

export default ArrowAnimation;