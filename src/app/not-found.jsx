// app/not-found.tsx

import Link from 'next/link'
import BlobCursor from '@/components/animations/BlobCursor'

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center overflow-hidden cursor-none">

      <BlobCursor
        fillColor="#683387"
        initialXPercent={0.75}
        initialYPercent={0.5}
      />

      {/* Grid background */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(104,51,135,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(104,51,135,0.07) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Glow orb */}
      <div className="absolute w-[400px] h-[400px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(104,51,135,0.18) 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-xl px-6">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#68338726] border border-[#68338750] text-[#c084e8] text-xs font-medium tracking-widest uppercase px-4 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#683387] animate-pulse" />
          Error 404
        </div>

        <h1 className="text-[130px] font-black leading-none tracking-tighter text-transparent select-none"
          style={{ WebkitTextStroke: '2px rgba(104,51,135,0.4)' }}>
          404
        </h1>

        <div className="w-14 h-0.5 mx-auto my-4 rounded"
          style={{ background: 'linear-gradient(90deg, transparent, #683387, transparent)' }}
        />

        <code className="text-[#c084e8a0] text-xs bg-[#68338715] border border-[#68338730] rounded px-3 py-1 mb-5 inline-block">
          undefined · page not found
        </code>

        <p className="text-2xl font-bold text-[#f0e8f5] mb-3">Oops! Lost in the void</p>
        <p className="text-sm text-[#f0e8f570] mb-10 leading-relaxed">
          This page doesn't exist or was moved.<br />
          Let's get you back to something real.
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/"
            className="flex items-center gap-2 bg-[#683387] hover:bg-[#7d3ea3] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-all">
            ← Go Home
          </Link>
          <Link href="/#projects"
            className="flex items-center gap-2 border border-[#68338750] hover:border-[#683387] text-[#f0e8f560] hover:text-[#c084e8] text-sm font-medium px-5 py-2.5 rounded-lg transition-all">
            View Projects
          </Link>
        </div>

      </div>
    </main>
  )
}