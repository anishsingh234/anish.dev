"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { blogs } from "@/data/blogs";
import PDFModal from "@/components/PDFModal";
import { EASE } from "./home/SharedComponents";

// ── Blog row ──────────────────────────────────────────────────
const BlogRow = ({ blog, index, onOpen }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.06 }}
      onClick={() => onOpen(blog)}
      className="group cursor-pointer"
    >
      {/* Top border */}
      <div className="h-px bg-white/[0.07] group-hover:bg-white/[0.14] transition-colors duration-500" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 py-10 lg:py-12">

        {/* ── Text col ── */}
        <div className={`flex flex-col justify-between gap-6 ${isEven ? "order-1 pr-0 lg:pr-16" : "order-1 lg:order-2 lg:pl-16"}`}>

          {/* Index + meta */}
          <div className="flex items-center justify-between">
            <span
              className="font-black text-white/[0.05] leading-none select-none"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", letterSpacing: "-0.04em" }}
            >
              _{String(index + 1).padStart(2, "0")}.
            </span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-white/58 tracking-widest">
                <Clock className="w-3 h-3" />
                {blog.readTime}
              </span>
              <span className="font-mono text-[10px] text-white/48 tracking-widest">
                {blog.date}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-mono text-white/68 tracking-widest uppercase border border-white/[0.07] rounded-full px-3 py-1 group-hover:border-white/15 group-hover:text-white/65 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3
            className="font-black text-white leading-[0.95] tracking-tight group-hover:text-white/90 transition-colors"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", letterSpacing: "-0.03em" }}
          >
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-white/58 leading-relaxed max-w-sm font-light line-clamp-3">
            {blog.excerpt}
          </p>

          {/* Read CTA */}
          <div className="flex items-center gap-2 text-white/68 group-hover:text-white/78 transition-colors duration-300">
            <span className="text-[11px] font-mono tracking-widest uppercase">
              Read writeup
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </div>
        </div>

        {/* ── Image col ── */}
        <div className={`${isEven ? "order-2" : "order-2 lg:order-1"}`}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.07] group-hover:border-white/[0.13] transition-colors duration-500 bg-[#120F20]"
          >
            <Image
              src={blog.cover}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="eager"
            />
            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(8,10,16,0.55)_100%)] pointer-events-none" />
            {/* Dark tint */}
            <div className="absolute inset-0 bg-[#0E0B1A]/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
};

// ── Main export ───────────────────────────────────────────────
const BlogSection = () => {
  const [activeBlog, setActiveBlog] = useState(null);
  const featuredBlogs = blogs.filter((b) => b.featured);

  return (
    <>
      <section id="blog" className="py-24 sm:py-32 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

          {/* ── Section header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex items-end justify-between mb-16 flex-wrap gap-6"
          >
            <div>
              <p className="text-[10px] font-mono text-white/58 tracking-[0.3em] uppercase mb-4">
                ◆ &nbsp; Technical Writing
              </p>
              <h2
                className="font-black text-white leading-none tracking-tight"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}
              >
                What I've
                <br />
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: "1.5px rgba(167,139,250,0.45)" }}
                >
                  Written
                </span>
              </h2>
            </div>
            <Link
              href="/blog"
              className="group flex items-center gap-2 text-sm font-bold text-white/52 hover:text-white transition-colors"
            >
              View all posts
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* ── Blog rows ── */}
          <div>
            {featuredBlogs.map((blog, i) => (
              <BlogRow
                key={blog.id}
                blog={blog}
                index={i}
                onOpen={setActiveBlog}
              />
            ))}
            {/* Bottom border */}
            <div className="h-px bg-white/[0.07]" />
          </div>

        </div>
      </section>

      {activeBlog && (
        <PDFModal blog={activeBlog} onClose={() => setActiveBlog(null)} />
      )}
    </>
  );
};

export default BlogSection;