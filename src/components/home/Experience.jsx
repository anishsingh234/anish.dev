"use client";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { FadeUp, SectionLabel } from "./SharedComponents";
export const experiences = [
  {
    company: "Exponent Solutions",
    location: "Remote",
    period: "Nov 2025 – Present",
    bullets: [
      "Developed and deployed 3+ full-stack applications serving 3,000+ users",
      "Built a RAG-based AI chatbot using LLMs and vector embeddings",
      "Designed scalable REST APIs and optimized MongoDB queries",
      "Improved frontend performance with reusable components"
    ],
    tech: "Next.js, React, Node.js, MongoDB, LLMs, RAG",
  },
  {
    role: "B.Tech Computer Science (AI & ML)",
    company: "Uttarakhand Technical University",
    location: "Dehradun, India",
    period: "Aug 2022 – Jun 2026",
    bullets: [],
    tech: "",
  },
  {
    role: "Class 12 (Science - PCM)",
    company: "Kendriya Vidyalaya",
    location: "Patna, India",
    period: "2021 – 2022",
    bullets: [],
    tech: "",
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32 scroll-mt-20 border-t border-white/[0.06] relative overflow-hidden">
      
      {/* Background radial gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
        
        <FadeUp className="mb-14 sm:mb-16">
          <SectionLabel>Experience</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            Where I've worked
          </h2>
          <p className="text-white/50 max-w-xl leading-relaxed text-[15px]">
            Real-world production experience building and shipping software.
          </p>
        </FadeUp>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[13px] sm:left-[17px] top-3 bottom-0 w-[2px] bg-gradient-to-b from-purple-500/60 via-white/10 to-transparent" />

          <div className="space-y-12 sm:space-y-16">
            {experiences.map((exp, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="relative pl-12 sm:pl-16 group">
                  
                  {/* Timeline Node */}
                  <div className="absolute left-[9px] sm:left-[13px] top-2.5 w-2.5 h-2.5 rounded-full bg-[#0a0a0f] border-[2px] border-white/20 ring-4 ring-[#0a0a0f] group-hover:border-purple-400 group-hover:bg-purple-400 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.6)] transition-all duration-300 z-10" />

                  {/* Content Container */}
                  <div className="sm:group-hover:translate-x-1.5 transition-transform duration-300 ease-out">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 mb-2">
                      <h3 className="text-xl sm:text-[22px] font-semibold text-white tracking-wide">
                        {exp.role}
                      </h3>
                      <span className="text-sm font-medium text-gray-500 shrink-0">
                        {exp.period}
                      </span>
                    </div>
                    
                    <div className="text-[15px] font-medium text-purple-400/90 mb-5 tracking-wide flex items-center gap-2">
                      {exp.company}
                      {exp.location && (
                        <>
                          <span className="text-white/20">•</span>
                          <span className="text-gray-500">{exp.location}</span>
                        </>
                      )}
                    </div>

                    {exp.bullets.length > 0 && (
                      <ul className="space-y-3 mb-5">
                        {exp.bullets.map((b, j) => (
                          <li key={j} className="flex items-start gap-3.5 text-[15px] text-gray-300/90 leading-relaxed">
                            <span className="text-purple-400/50 mt-[7px] shrink-0 text-[8px]">■</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}

                    {exp.tech && (
                      <div className="mt-3 pt-3 border-t border-white/[0.04]">
                        <span className="text-[14px] text-gray-500">
                          Tech: <span className="text-gray-400">{exp.tech}</span>
                        </span>
                      </div>
                    )}
                  </div>

                </div>
              </FadeUp>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
