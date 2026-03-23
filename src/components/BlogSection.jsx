"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, BookOpen } from "lucide-react";
import { blogs } from "@/data/blogs";
import PDFModal from "@/components/PDFModal";

const BlogCard = ({ blog, index, onOpen }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      onClick={() => onOpen(blog)}
      className="group relative flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Cover Image */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-white/[0.03]">
        <Image
          src={blog.cover}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="eager"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Tags on image */}
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
        {/* Meta */}
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

        {/* Title */}
        <h3 className="text-[15px] font-semibold text-foreground/80 leading-[1.4] tracking-[-0.2px] group-hover:text-foreground transition-colors duration-200">
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="text-[13px] text-foreground/35 leading-[1.7] font-light line-clamp-2">
          {blog.excerpt}
        </p>

        {/* Read CTA */}
        <div className="flex items-center gap-1.5 mt-auto pt-2">
          <span className="flex items-center gap-1.5 font-mono text-[11.5px] text-blue-400/60 group-hover:text-blue-400 transition-colors duration-200 tracking-[0.2px]">
            <BookOpen className="w-3 h-3" />
            Read writeup
          </span>
          <ArrowUpRight className="w-3 h-3 text-blue-400/40 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
        </div>
      </div>
    </motion.article>
  );
};

const BlogSection = () => {
  const [activeBlog, setActiveBlog] = useState(null);
  const featuredBlogs = blogs.filter((b) => b.featured);

  return (
    <>
      <section id="blog" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="font-mono text-[11px] tracking-[2px] uppercase text-blue-400/60 mb-3">
              Technical Writing
            </p>
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-[-0.5px]">
                What I&apos;ve written
              </h2>
              <Link
                href="/blog"
                className="group flex items-center gap-1.5 font-mono text-[12px] text-foreground/35 hover:text-foreground/70 transition-colors duration-200 tracking-[0.3px]"
              >
                view all posts
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </Link>
            </div>
            <p className="mt-3 text-[14px] text-foreground/35 font-light max-w-xl leading-relaxed">
              Deep dives into AI systems, architecture decisions, and things I learned building in production.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featuredBlogs.map((blog, i) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                index={i}
                onOpen={setActiveBlog}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PDF Modal */}
      {activeBlog && (
        <PDFModal blog={activeBlog} onClose={() => setActiveBlog(null)} />
      )}
    </>
  );
};

export default BlogSection;