"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock, BookOpen } from "lucide-react";
import { blogs } from "@/data/blogs";
import PDFModal from "@/components/PDFModal";

export default function BlogPage() {
  const [activeBlog, setActiveBlog] = useState(null);

  return (
    <>
      <main className="min-h-screen bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-2 font-mono text-[12px] text-foreground/30 hover:text-foreground/60 transition-colors duration-200 tracking-[0.3px]"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" />
              back to home
            </Link>
          </motion.div>

          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-16"
          >
            {/* Top accent line */}
            <div className="w-8 h-px bg-blue-500/60 mb-5" />
            <p className="font-mono text-[11px] tracking-[2px] uppercase text-blue-400/60 mb-3">
              Technical Writing
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-[-0.8px] mb-4">
              Writeups & Case Studies
            </h1>
            <p className="text-[15px] text-foreground/35 font-light leading-relaxed max-w-lg">
              Deep dives into the systems I&apos;ve built — architecture decisions,
              tradeoffs, and lessons from shipping AI products in production.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex items-center gap-6 mb-12 pb-8 border-b border-white/[0.05]"
          >
            {[
              { value: blogs.length, label: "posts" },
              { value: "AI / Full-Stack", label: "topics" },
              { value: "PDF", label: "format" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-2">
                <span className="font-mono text-[13px] font-medium text-foreground/50">
                  {stat.value}
                </span>
                <span className="font-mono text-[11px] text-foreground/20 tracking-[0.5px]">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Blog Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {blogs.map((blog, i) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: "easeOut" }}
                onClick={() => setActiveBlog(blog)}
                className="group relative flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* Cover */}
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-white/[0.03]">
                  <Image
                    src={blog.cover}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 flex gap-1.5">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm border border-white/[0.1] text-white/60 tracking-[0.3px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 p-5 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 font-mono text-[11px] text-foreground/25 tracking-[0.2px]">
                      <Clock className="w-3 h-3" />
                      {blog.readTime}
                    </span>
                    <span className="text-foreground/15">·</span>
                    <span className="font-mono text-[11px] text-foreground/25 tracking-[0.2px]">
                      {blog.date}
                    </span>
                  </div>

                  <h2 className="text-[15px] font-semibold text-foreground/80 leading-[1.4] tracking-[-0.2px] group-hover:text-foreground transition-colors duration-200">
                    {blog.title}
                  </h2>

                  <p className="text-[13px] text-foreground/35 leading-[1.7] font-light line-clamp-2">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center gap-1.5 mt-auto pt-2">
                    <span className="flex items-center gap-1.5 font-mono text-[11.5px] text-blue-400/60 group-hover:text-blue-400 transition-colors duration-200 tracking-[0.2px]">
                      <BookOpen className="w-3 h-3" />
                      Read writeup
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-blue-400/40 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>

      {/* PDF Modal */}
      {activeBlog && (
        <PDFModal blog={activeBlog} onClose={() => setActiveBlog(null)} />
      )}
    </>
  );
}