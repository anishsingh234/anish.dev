"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Download } from "lucide-react";

const PDFModal = ({ blog, onClose }) => {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  if (!blog) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        style={{ backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl h-[90vh] flex flex-col rounded-2xl overflow-hidden border border-white/[0.08]"
          style={{ backgroundColor: "#080B10" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] flex-shrink-0">
            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="font-mono text-[10px] tracking-[1.5px] uppercase text-foreground/20">
                Technical Writeup
              </p>
              <h2 className="text-sm font-medium text-foreground/80 truncate max-w-[480px]">
                {blog.title}
              </h2>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0 ml-4">
              {/* Open in new tab */}
              <a
                href={blog.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] text-foreground/40 hover:text-foreground/70 hover:border-white/[0.12] transition-all duration-200 font-mono text-[11px] tracking-[0.3px]"
              >
                <ExternalLink className="w-3 h-3" />
                open
              </a>

              {/* Download */}
              <a
                href={blog.pdf}
                download
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] text-foreground/40 hover:text-foreground/70 hover:border-white/[0.12] transition-all duration-200 font-mono text-[11px] tracking-[0.3px]"
              >
                <Download className="w-3 h-3" />
                download
              </a>

              {/* Close */}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg border border-white/[0.06] bg-white/[0.03] flex items-center justify-center text-foreground/40 hover:text-foreground/70 hover:border-white/[0.12] transition-all duration-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 overflow-hidden bg-[#0D1117]">
            <iframe
              src={`${blog.pdf}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
              className="w-full h-full"
              title={blog.title}
              style={{ border: "none" }}
            />
          </div>

          {/* Tags footer */}
          <div className="flex items-center gap-2 px-5 py-3 border-t border-white/[0.04] flex-shrink-0">
            <span className="font-mono text-[10px] text-foreground/20 tracking-[0.5px]">
              {blog.date} · {blog.readTime}
            </span>
            <span className="text-foreground/10 mx-1">·</span>
            <div className="flex gap-1.5">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] px-2 py-0.5 rounded border border-white/[0.06] bg-white/[0.02] text-foreground/25 tracking-[0.3px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PDFModal;