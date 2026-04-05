"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const skills = [
  { skill: "Python",       image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { skill: "JavaScript",   image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { skill: "TypeScript",   image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { skill: "C++",          image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { skill: "C",            image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { skill: "HTML5",        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { skill: "CSS3",         image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { skill: "React.js",     image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { skill: "Next.js",      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { skill: "React Native", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { skill: "Tailwind CSS", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { skill: "Three.js",     image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" },
  { skill: "Node.js",      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { skill: "Express.js",   image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { skill: "FastAPI",      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { skill: "GraphQL",      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
  { skill: "Hugging Face", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/huggingface/huggingface-original.svg" },
  { skill: "LangChain",    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/langchain/langchain-original.svg" },
  { skill: "MongoDB",      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { skill: "MySQL",        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { skill: "Prisma ORM",   image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" },
  { skill: "Git",          image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { skill: "GitHub",       image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { skill: "VS Code",      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { skill: "Vercel",       image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
];

// Split into two columns for mobile
const colA = skills.filter((_, i) => i % 2 === 0);
const colB = skills.filter((_, i) => i % 2 === 1);

/* ── Reusable skill card ─────────────────────────────────────────────────── */
function SkillCard({ skillset, index, hoveredIndex, setHoveredIndex, cardSize, iconSize, fontSize, borderRadius }) {
  const isHovered = hoveredIndex === index;
  return (
    <div
      style={{ perspective: "800px", flexShrink: 0, width: cardSize, height: cardSize }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <motion.div
        style={{ width: "100%", height: "100%", position: "relative", transformStyle: "preserve-3d" }}
        animate={isHovered ? { rotateY: [0, 180], scale: [1, 1.12, 1.08] } : { rotateY: 0, scale: 1 }}
        transition={isHovered ? { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] } : { duration: 0.45, ease: "easeOut" }}
      >
        {/* FRONT */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
          borderRadius,
          background: "linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)",
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", gap: cardSize < 140 ? 6 : 12,
          boxShadow: "0 8px 32px rgba(124,58,237,0.35)",
          cursor: "pointer", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0, borderRadius: "inherit",
            background: "radial-gradient(circle at 60% 30%, rgba(216,180,254,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <Image src={skillset.image} alt={skillset.skill} width={iconSize} height={iconSize}
            className="object-contain drop-shadow-lg" unoptimized />
          <span style={{
            color: "rgba(237,233,254,0.90)", fontSize: `${fontSize}px`, fontWeight: 600,
            letterSpacing: "0.08em", textTransform: "uppercase",
            textAlign: "center", padding: "0 8px", lineHeight: 1.3,
          }}>
            {skillset.skill}
          </span>
        </div>

        {/* BACK */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)", borderRadius,
          background: "linear-gradient(135deg, #5b21b6 0%, #2e1065 100%)",
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", gap: cardSize < 140 ? 4 : 10,
          boxShadow: "0 8px 40px rgba(124,58,237,0.5), inset 0 0 0 1.5px rgba(167,139,250,0.25)",
          cursor: "pointer", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", width: cardSize * 0.65, height: cardSize * 0.65,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(167,139,250,0.22) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <Image src={skillset.image} alt={skillset.skill} width={iconSize + 10} height={iconSize + 10}
            className="object-contain"
            style={{ filter: "brightness(1.15) drop-shadow(0 0 12px rgba(167,139,250,0.7))" }}
            unoptimized />
          <span style={{
            color: "rgba(216,180,254,0.95)", fontSize: `${fontSize - 1}px`, fontWeight: 700,
            letterSpacing: "0.15em", textTransform: "uppercase",
            textAlign: "center", padding: "0 8px", lineHeight: 1.3,
          }}>
            {skillset.skill}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Vertical auto-scrolling column (mobile only) ────────────────────────── */
function VerticalColumn({ items, direction = "up", cardSize, iconSize, fontSize, gap }) {
  const doubled = [...items, ...items];
  const totalHeight = items.length * (cardSize + gap);

  return (
    <div style={{
      overflow: "hidden",
      height: "100%",
      WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
      maskImage:       "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
    }}>
      <motion.div
        style={{ display: "flex", flexDirection: "column", gap, width: cardSize }}
        animate={{ y: direction === "up" ? [0, -totalHeight] : [-totalHeight, 0] }}
        transition={{ repeat: Infinity, repeatType: "loop", duration: 20, ease: "linear" }}
      >
        {doubled.map((skillset, i) => (
          <div key={`${skillset.skill}-${i}`} style={{ flexShrink: 0 }}>
            <SkillCard
              skillset={skillset}
              index={-1}                   // no hover flip on mobile
              hoveredIndex={-1}
              setHoveredIndex={() => {}}
              cardSize={cardSize}
              iconSize={iconSize}
              fontSize={fontSize}
              borderRadius={12}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────────────── */
export default function TechnologyPartners() {
  const controls = useAnimation();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 480);
      setIsTablet(window.innerWidth >= 480 && window.innerWidth < 768);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Horizontal marquee for tablet/desktop — duration 18s (slow & readable)
  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: { repeat: Infinity, repeatType: "loop", duration: 18, ease: "linear" },
    });
  }, [controls]);

  const cardSize     = isTablet ? 150 : 192;
  const iconSize     = isTablet ? 68  : 90;
  const fontSize     = isTablet ? 10  : 11;
  const cardGap      = isTablet ? 16  : 24;
  const borderRadius = isTablet ? 12  : 16;

  /* ── MOBILE ─────────────────────────────────────────────────────────────── */
  if (isMobile) {
    return (
      <section style={{ padding: "32px 0", background: "white", overflow: "hidden" }}>

        {/* Header text */}
        <div style={{ padding: "0 20px", marginBottom: "28px" }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}
            style={{
              display: "inline-flex", alignItems: "center",
              border: "2px dashed #c084fc", borderRadius: "8px",
              padding: "6px 12px", marginBottom: "12px",
            }}
          >
            <span style={{ color: "#9333ea", fontWeight: 500, fontSize: "12px", letterSpacing: "0.05em" }}>
              Tech Stack
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}
            style={{ fontSize: "48px", fontWeight: 700, color: "#9333ea", lineHeight: 1, marginBottom: "10px" }}
          >
            40+
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }}
            style={{ fontSize: "20px", fontWeight: 700, color: "#3b0764", lineHeight: 1.35, margin: 0 }}
          >
            Building Intelligent Products With Modern Technologies & AI-Powered Systems.
          </motion.h2>
        </div>

        {/*
          Two vertical columns on opposite sides of the screen.
          Left column scrolls UP, right column scrolls DOWN.
          A purple gradient divider runs between them.
        */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "110px 1fr 110px",
          height: "460px",
          alignItems: "stretch",
        }}>

          {/* LEFT column — scrolls up */}
          <VerticalColumn
            items={colA}
            direction="up"
            cardSize={110}
            iconSize={46}
            fontSize={8}
            gap={10}
          />

          {/* Centre divider */}
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "12px",
            padding: "0 8px",
          }}>
            <div style={{
              width: "1px", flex: 1,
              background: "linear-gradient(to bottom, transparent, #c084fc 30%, #c084fc 70%, transparent)",
            }} />
            <span style={{
              fontSize: "9px", fontWeight: 800, letterSpacing: "0.25em",
              color: "#9333ea", textTransform: "uppercase",
              writingMode: "vertical-rl",
            }}>
              Skills
            </span>
            <div style={{
              width: "1px", flex: 1,
              background: "linear-gradient(to bottom, transparent, #c084fc 30%, #c084fc 70%, transparent)",
            }} />
          </div>

          {/* RIGHT column — scrolls down */}
          <VerticalColumn
            items={colB}
            direction="down"
            cardSize={110}
            iconSize={46}
            fontSize={8}
            gap={10}
          />
        </div>
      </section>
    );
  }

  /* ── TABLET / DESKTOP — horizontal marquee ──────────────────────────────── */
  return (
    <section className="relative" style={{
      paddingTop:   isTablet ? "32px" : "64px",
      paddingLeft:  isTablet ? "16px" : "40px",
      paddingRight: isTablet ? "16px" : "40px",
    }}>
      {/* Content block */}
      <div className="bg-white" style={{
        paddingTop:    isTablet ? "24px" : "64px",
        paddingBottom: cardSize * 0.65 + 32,
      }}>
        <div className="container mx-auto px-4">
          <div style={{
            display: "flex",
            flexDirection: isTablet ? "column" : "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: isTablet ? "20px" : "32px",
          }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <motion.div
                initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }} viewport={{ once: true }}
                style={{
                  display: "inline-flex", alignItems: "center",
                  border: "2px dashed #c084fc", borderRadius: "8px",
                  padding: isTablet ? "6px 12px" : "8px 16px",
                  marginBottom: "12px", width: "fit-content",
                }}
              >
                <span style={{ color: "#9333ea", fontWeight: 500, fontSize: isTablet ? "12px" : "14px", letterSpacing: "0.05em" }}>
                  Tech Stack
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}
                style={{ fontSize: isTablet ? "44px" : "64px", fontWeight: 700, color: "#9333ea", lineHeight: 1 }}
              >
                40+
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }}
              style={{ maxWidth: isTablet ? "100%" : "560px" }}
            >
              <h2 style={{ fontSize: isTablet ? "28px" : "36px", fontWeight: 700, color: "#3b0764", lineHeight: 1.3 }}>
                Building Intelligent Products With Modern Technologies & AI-Powered Systems.
              </h2>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Horizontal marquee */}
      <div style={{
        marginTop: -(cardSize * 0.65),
        overflow: "hidden",
        padding: `${isTablet ? 12 : 24}px 0`,
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        maskImage:       "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}>
        <motion.div
          style={{ display: "flex", gap: `${cardGap}px`, alignItems: "center", width: "max-content" }}
          animate={controls}
        >
          {[...skills, ...skills].map((skillset, index) => (
            <SkillCard
              key={`${skillset.skill}-${index}`}
              skillset={skillset}
              index={index}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              cardSize={cardSize}
              iconSize={iconSize}
              fontSize={fontSize}
              borderRadius={borderRadius}
            />
          ))}
        </motion.div>
      </div>

      <div style={{ height: isTablet ? "16px" : "32px" }} />
    </section>
  );
}