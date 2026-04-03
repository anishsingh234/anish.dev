"use client";

import { useEffect, useRef } from "react";

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const context: CanvasRenderingContext2D = ctx;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let animId = 0;
    let shootTimer = 0;

    type Star = {
      x: number;
      y: number;
      r: number;
      alpha: number;
      alphaDir: 1 | -1;
      alphaSpeed: number;
      vx: number;
      vy: number;
      glow: boolean;
    };

    type ShootingStar = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      active: boolean;
    };

    let shoot: ShootingStar | null = null;

    const STAR_COUNT = 180;
    const stars: Star[] = [];

    const rand = (min: number, max: number): number => Math.random() * (max - min) + min;

    function initStars() {
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: rand(0, W),
          y: rand(0, H),
          r: rand(0.3, 1.8),
          alpha: rand(0.1, 0.9),
          alphaDir: Math.random() > 0.5 ? 1 : -1,
          alphaSpeed: rand(0.003, 0.012),
          vx: rand(-0.04, 0.04),
          vy: rand(-0.04, 0.04),
          glow: Math.random() > 0.85,
        });
      }
    }

    function drawFrame() {
      context.clearRect(0, 0, W, H);

      // ── Stars ──
      for (const s of stars) {
        // twinkle
        s.alpha += s.alphaSpeed * s.alphaDir;
        if (s.alpha >= 0.9 || s.alpha <= 0.08) {
          s.alphaDir *= -1;
          s.alphaSpeed = rand(0.003, 0.012);
        }

        // drift
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = W;
        if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H;
        if (s.y > H) s.y = 0;

        // glow halo for select stars — purple tint
        if (s.glow) {
          const g = context.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 7);
          g.addColorStop(0, `rgba(167,139,250,${s.alpha * 0.45})`);
          g.addColorStop(1, "rgba(167,139,250,0)");
          context.beginPath();
          context.arc(s.x, s.y, s.r * 7, 0, Math.PI * 2);
          context.fillStyle = g;
          context.fill();
        }

        // star dot — mix white and purple
        context.beginPath();
        context.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        // 70% white stars, 30% soft purple
        const isPurple = s.r > 1.2;
        context.fillStyle = isPurple
          ? `rgba(200,185,255,${s.alpha * 0.55})`
          : `rgba(255,255,255,${s.alpha * 0.45})`;
        context.fill();
      }

      // ── Shooting star ──
      if (shoot?.active) {
        shoot.x += shoot.vx;
        shoot.y += shoot.vy;
        shoot.alpha -= 0.018;
        if (shoot.alpha <= 0) shoot.active = false;

        const grad = context.createLinearGradient(
          shoot.x, shoot.y,
          shoot.x - shoot.vx * 12,
          shoot.y - shoot.vy * 12
        );
        grad.addColorStop(0, `rgba(216,180,254,${shoot.alpha})`);
        grad.addColorStop(1, "rgba(167,139,250,0)");

        context.beginPath();
        context.moveTo(shoot.x, shoot.y);
        context.lineTo(shoot.x - shoot.vx * 12, shoot.y - shoot.vy * 12);
        context.strokeStyle = grad;
        context.lineWidth = 1.5;
        context.stroke();
      }

      // trigger new shooting star every ~280 frames
      shootTimer++;
      if (shootTimer > 280 && !shoot?.active) {
        shootTimer = 0;
        shoot = {
          x: rand(W * 0.1, W * 0.6),
          y: rand(0, H * 0.35),
          vx: rand(3, 5),
          vy: rand(2, 4),
          alpha: 0.9,
          active: true,
        };
      }

      animId = requestAnimationFrame(drawFrame);
    }

    const handleResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener("resize", handleResize);
    initStars();
    drawFrame();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.5 }}
    />
  );
}