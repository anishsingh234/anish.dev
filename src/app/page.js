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
import CurvedLoop from "@/components/_animations/CurvedLoop";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-[#05050A] text-foreground selection:bg-purple-500/30">
      <Preloader />
      <Navbar />

      <div className="w-full">
        {/* --- Hero Section --- */}
        <Hero />

        {/* --- Curved Paper Banner Divider --- */}
        <div className="relative py-4 sm:py-8 overflow-hidden bg-[#05050A]">
          <CurvedLoop
            marqueeText="Developer ✦ AI Engineer ✦ Creator ✦ Problem Solver ✦ "
            speed={1.5}
            curveAmount={200}
            direction="left"
            interactive
            className="curved-loop-paper"
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
