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
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#05050A] text-foreground selection:bg-purple-500/30">
      <Navbar />

      <div className="w-full">
        {/* --- Hero Section --- */}
        <Hero />

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
