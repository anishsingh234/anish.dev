"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const PREVIEWS = [
  { label: "RAG Pipeline",   color: "#a78bfa", border: "rgba(167,139,250,0.28)" },
  { label: "AI Agent Loop",  color: "#34d399", border: "rgba(52,211,153,0.25)"  },
  { label: "Live Dashboard", color: "#38bdf8", border: "rgba(56,189,248,0.25)"  },
];

function MiniFlow({ color }: { color: string }) {
  return (
    <svg width="108" height="26" viewBox="0 0 108 26">
      {[0,1,2].map((i) => (
        <motion.rect key={i} x={i*38+2} y="3" width="30" height="20" rx="4"
          fill={`${color}15`} stroke={`${color}50`} strokeWidth="0.7"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: i*0.1, duration: 0.3 }} />
      ))}
      {[0,1].map((i) => (
        <motion.line key={i} x1={i*38+32} y1="13" x2={i*38+40} y2="13"
          stroke={`${color}45`} strokeWidth="0.8" strokeDasharray="2 1.5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.3+i*0.1 }} />
      ))}
      {["In","↕","LLM"].map((t,i) => (
        <motion.text key={i} x={i*38+17} y="16.5" textAnchor="middle"
          fontSize="6" fill={`${color}cc`} fontFamily="monospace"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.15+i*0.1 }}>{t}</motion.text>
      ))}
    </svg>
  );
}

function MiniOrbit({ color }: { color: string }) {
  const nodes = [0,1,2,3];
  return (
    <svg width="108" height="26" viewBox="0 0 108 26">
      <motion.circle cx="54" cy="13" r="6" fill={`${color}20`} stroke={`${color}55`} strokeWidth="0.7"
        animate={{ scale:[1,1.15,1] }} transition={{ duration:2, repeat:Infinity }} />
      <motion.text x="54" y="16" textAnchor="middle" fontSize="5" fill={`${color}cc`} fontFamily="monospace"
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}>ag</motion.text>
      {nodes.map((i) => {
        const a = (i*90*Math.PI)/180;
        const cx = 54+17*Math.cos(a), cy = 13+17*Math.sin(a);
        return (
          <g key={i}>
            <motion.circle cx={cx} cy={cy} r="5" fill={`${color}10`} stroke={`${color}30`} strokeWidth="0.6"
              initial={{ opacity:0, scale:0 }} animate={{ opacity:1, scale:1 }}
              transition={{ delay:0.1*i+0.3 }} />
            <motion.text x={cx} y={cy+2.5} textAnchor="middle" fontSize="5" fill={`${color}99`} fontFamily="monospace"
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1*i+0.45 }}>
              {["T","M","P","E"][i]}
            </motion.text>
          </g>
        );
      })}
    </svg>
  );
}

function MiniBars({ color }: { color: string }) {
  const hs = [10,18,8,22,14,20,10,24];
  return (
    <svg width="108" height="26" viewBox="0 0 108 26">
      {hs.map((h,i) => (
        <motion.rect key={i} x={i*13+2} y={24-h} width="10" height={h} rx="2"
          fill={i===7?`${color}66`:`${color}22`}
          stroke={i===7?`${color}99`:`${color}33`} strokeWidth="0.5"
          initial={{ scaleY:0 }} animate={{ scaleY:1 }}
          style={{ transformOrigin:`${i*13+7}px 24px` }}
          transition={{ delay:i*0.04, duration:0.35, ease:[0.22,1,0.36,1] }} />
      ))}
    </svg>
  );
}

const MINI = [MiniFlow, MiniOrbit, MiniBars];

export default function StudioPeek() {
  const [show,      setShow]      = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [idx,       setIdx]       = useState(0);
  const [pKey,      setPKey]      = useState(0);

  useEffect(() => {
    const t = setTimeout(() => { if (!dismissed) setShow(true); }, 3200);
    return () => clearTimeout(t);
  }, [dismissed]);

  useEffect(() => {
    if (!show) return;
    const iv = setInterval(() => {
      setIdx((i) => (i+1) % PREVIEWS.length);
      setPKey((k) => k+1);
    }, 2200);
    return () => clearInterval(iv);
  }, [show]);

  const p = PREVIEWS[idx];
  const Preview = MINI[idx];
  if (dismissed) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity:0, y:-10, scale:0.95, filter:"blur(6px)" }}
          animate={{ opacity:1, y:0,   scale:1,    filter:"blur(0px)" }}
          exit={{   opacity:0, y:-10, scale:0.95, filter:"blur(6px)" }}
          transition={{ duration:0.45, ease:[0.22,1,0.36,1] }}
          // top-[8%] keeps a large gap above RecruiterNudge (top-1/2)
          className="absolute right-10 xl:right-16 top-[8%] z-20 hidden lg:block pointer-events-auto select-none"
        >
          <div
            className="w-[258px] rounded-xl overflow-hidden"
            style={{
              border: `1px solid ${p.border}`,
              background: `linear-gradient(145deg, ${p.color}09 0%, rgba(14,11,26,0.97) 60%)`,
            }}
          >
            {/* sweep line */}
            <motion.div key={pKey+"-l"} initial={{ scaleX:0 }} animate={{ scaleX:1 }}
              transition={{ duration:0.45, ease:[0.22,1,0.36,1] }}
              className="origin-left h-[1.5px] w-full"
              style={{ background:`linear-gradient(90deg, ${p.color}, transparent 75%)` }} />

            <div className="px-4 py-3 flex items-center gap-3 relative">
              {/* Left text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                    <span className="animate-ping absolute h-full w-full rounded-full opacity-55"
                      style={{ background:p.color }} />
                    <span className="relative rounded-full h-1.5 w-1.5"
                      style={{ background:p.color }} />
                  </span>
                  <span className="text-[7.5px] font-mono tracking-[0.22em] uppercase"
                    style={{ color:`${p.color}88` }}>
                    animated studio
                  </span>
                </div>
                <p className="text-[11px] font-light text-white/40 leading-none mb-0.5">explore the</p>
                <Link href="/animations"
                  className="text-[15px] font-black leading-tight tracking-tight hover:opacity-75 transition-opacity"
                  style={{ color:p.color }}>
                  Studio →
                </Link>
              </div>

              {/* Right mini preview */}
              <AnimatePresence mode="wait">
                <motion.div key={pKey+"-prev"}
                  initial={{ opacity:0, filter:"blur(4px)" }}
                  animate={{ opacity:1, filter:"blur(0px)" }}
                  exit={{   opacity:0, filter:"blur(4px)" }}
                  transition={{ duration:0.28 }}
                  className="flex-shrink-0 rounded-lg px-1.5 pt-1.5 pb-1"
                  style={{ border:`1px solid ${p.border}`, background:"rgba(0,0,0,0.2)" }}
                >
                  <p className="text-[6px] font-mono mb-0.5" style={{ color:`${p.color}66` }}>
                    {p.label}
                  </p>
                  <Preview color={p.color} />
                </motion.div>
              </AnimatePresence>

              {/* Dismiss */}
              <button
                onClick={() => { setShow(false); setDismissed(true); }}
                className="absolute top-2 right-2.5 text-white/20 hover:text-white/50 transition-colors text-[11px] leading-none"
              >✕</button>
            </div>

            {/* progress bar */}
            <div className="mx-4 mb-2 rounded-full overflow-hidden"
              style={{ height:"1px", background:"rgba(255,255,255,0.05)" }}>
              <motion.div key={pKey+"-pb"} initial={{ width:"0%" }} animate={{ width:"100%" }}
                transition={{ duration:2.2, ease:"linear" }}
                style={{ height:"100%", background:p.color, opacity:0.4 }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}