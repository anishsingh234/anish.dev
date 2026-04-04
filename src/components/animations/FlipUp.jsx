"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const skills = [
  // Languages
  { skill: "Python",       image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { skill: "JavaScript",   image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { skill: "TypeScript",   image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { skill: "C++",          image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { skill: "C",            image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { skill: "HTML5",        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { skill: "CSS3",         image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  // Frontend
  { skill: "React.js",     image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { skill: "Next.js",      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { skill: "React Native", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { skill: "Tailwind CSS", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { skill: "Three.js",     image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" },
  // Backend
  { skill: "Node.js",      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { skill: "Express.js",   image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { skill: "FastAPI",      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { skill: "GraphQL",      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
  // AI / ML
  { skill: "Hugging Face", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/huggingface/huggingface-original.svg" },
  { skill: "LangChain",    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/langchain/langchain-original.svg" },
  // Databases
  { skill: "MongoDB",      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { skill: "MySQL",        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { skill: "Prisma ORM",   image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" },
  // Tools
  { skill: "Git",          image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { skill: "GitHub",       image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { skill: "VS Code",      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { skill: "Vercel",       image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
];

export default function TechnologyPartners() {
  const controls = useAnimation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 10,      // ← 20 → 10 (2x faster)
        ease: "linear",
      },
    });
  }, [controls]);

  return (
    <section className="relative py-16 px-10">

      {/* Top Section — background white rakha, content + colors changed */}
      <div className="bg-white pt-16 pb-36">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">

            <div className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-flex items-center border-2 border-dashed border-purple-400 rounded-lg px-4 py-2 mb-4 w-fit"
              >
                <span className="text-purple-600 font-medium text-sm tracking-wide">
                  Tech Stack
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-5xl md:text-6xl font-bold text-purple-600"
              >
                40+
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="md:max-w-xl"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 leading-tight">
                Building Intelligent Products With Modern Technologies & AI-Powered Systems.
              </h2>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Marquee Row — card colors purple themed */}
      <div className="absolute bottom-0 left-0 right-0 -translate-y-[60%] z-10 overflow-hidden py-6">
        <motion.div
          className="flex gap-6 items-center"
          animate={controls}
        >
          {[...skills, ...skills].map((skillset, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={`${skillset.skill}-${index}`}
                style={{ perspective: "800px", flexShrink: 0, width: 192, height: 192 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    transformStyle: "preserve-3d",
                  }}
                  animate={
                    isHovered
                      ? { rotateY: [0, 180], scale: [1, 1.12, 1.08] }
                      : { rotateY: 0, scale: 1 }
                  }
                  transition={
                    isHovered
                      ? { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }
                      : { duration: 0.45, ease: "easeOut" }
                  }
                >
                  {/* FRONT FACE — purple gradient */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      borderRadius: 16,
                      background: "linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 12,
                      boxShadow: "0 8px 32px rgba(124,58,237,0.35)",
                      cursor: "pointer",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 16,
                        background: "radial-gradient(circle at 60% 30%, rgba(216,180,254,0.18) 0%, transparent 70%)",
                        pointerEvents: "none",
                      }}
                    />
                    <Image
                      src={skillset.image}
                      alt={skillset.skill}
                      width={90}
                      height={90}
                      className="object-contain drop-shadow-lg"
                      unoptimized
                    />
                    <span
                      style={{
                        color: "rgba(237,233,254,0.90)",
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        textAlign: "center",
                        padding: "0 12px",
                      }}
                    >
                      {skillset.skill}
                    </span>
                  </div>

                  {/* BACK FACE — deeper purple */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      borderRadius: 16,
                      background: "linear-gradient(135deg, #5b21b6 0%, #2e1065 100%)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      boxShadow: "0 8px 40px rgba(124,58,237,0.5), inset 0 0 0 1.5px rgba(167,139,250,0.25)",
                      cursor: "pointer",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(167,139,250,0.22) 0%, transparent 70%)",
                        pointerEvents: "none",
                      }}
                    />
                    <Image
                      src={skillset.image}
                      alt={skillset.skill}
                      width={100}
                      height={100}
                      className="object-contain"
                      style={{ filter: "brightness(1.15) drop-shadow(0 0 12px rgba(167,139,250,0.7))" }}
                      unoptimized
                    />
                    <span
                      style={{
                        color: "rgba(216,180,254,0.95)",
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        textAlign: "center",
                        padding: "0 12px",
                      }}
                    >
                      {skillset.skill}
                    </span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      <div className="h-48"></div>
    </section>
  );
}