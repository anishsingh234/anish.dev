"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/home/Hero";
import Projects from "@/components/home/Projects";
import Skills from "@/components/home/Skills";
import Experience from "@/components/home/Experience";
import AboutSection from "@/components/home/AboutSection";
import Contact from "@/components/home/Contact";
import BlogSection from "@/components/BlogSection";
import WhyHireMe from "@/components/home/whyhireme";
import Footer from "@/components/footer";
import Preloader from "@/components/Preloader";
import TextLoop from "@/components/_animations/TextLoop";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-[#05050A] text-foreground selection:bg-purple-500/30">
      <Preloader />
      <Navbar />

      <div className="w-full">
        {/* --- Hero Section --- */}
        <Hero />

        {/* --- Text Loop Marquee Divider --- */}
        <div className="relative py-4 sm:py-8 overflow-hidden bg-[#05050A] border-y border-white/[0.06]">
          <TextLoop
            text="Developer ✦ AI Engineer ✦ Creator ✦ Problem Solver"
            shape="wave"
            speed={90}
            direction="forward"
          />
        </div>

        {/* --- Projects Section --- */}
        <Projects />

        <BlogSection />
        {/* --- Skills Section --- */}
        <Skills />

        {/* --- Experience Section --- */}
        <Experience />

        {/* --- About Section --- */}
        <AboutSection />
        <WhyHireMe />

        {/* --- Contact Section --- */}
        <Contact />

        <Footer/>
      </div>
    </main>
  );
}
