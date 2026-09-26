"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PAGE_W = 1.5;
const PAGE_H = 2;
const SEGMENTS = 40;
const PAGE_Y = 0.075; // top of the page stacks

/* ── Page artwork, drawn once into canvases ──────────────────────────────── */

// next/font gives families hashed names; read them back off the DOM.
function fontFamilyOf(className) {
  const probe = document.createElement("span");
  probe.className = className;
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  document.body.appendChild(probe);
  const family = getComputedStyle(probe).fontFamily;
  probe.remove();
  return family;
}

function paperCanvas(draw) {
  const c = document.createElement("canvas");
  c.width = 768;
  c.height = 1024;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#f1ede3";
  ctx.fillRect(0, 0, c.width, c.height);
  // fibre speckle
  for (let i = 0; i < 2600; i++) {
    ctx.fillStyle = `rgba(60,45,25,${Math.random() * 0.07})`;
    ctx.fillRect(Math.random() * c.width, Math.random() * c.height, 1.4, 1.4);
  }
  // ruled lines + margin
  ctx.strokeStyle = "rgba(88,116,150,0.32)";
  ctx.lineWidth = 2;
  for (let y = 150; y < c.height - 30; y += 58) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(c.width, y);
    ctx.stroke();
  }
  draw(ctx, c);
  return c;
}

function toTexture(canvas, mirrored = false) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  if (mirrored) {
    // seen from underneath once turned: flip u so the writing reads correctly
    tex.repeat.x = -1;
    tex.offset.x = 1;
  }
  return tex;
}

function buildPageArt(hand, type) {
  const margin = (ctx, x = 110) => {
    ctx.strokeStyle = "rgba(230,45,91,0.5)";
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1024);
    ctx.stroke();
  };
  const write = (ctx, text, x, y, size, color = "#111", weight = 700, font = hand) => {
    ctx.fillStyle = color;
    ctx.font = `${weight} ${size}px ${font}`;
    ctx.fillText(text, x, y);
  };

  // Left page before the turn: the previous page, finished.
  const previous = paperCanvas((ctx) => {
    margin(ctx, 658);
    write(ctx, "p. 08", 60, 90, 30, "#4a4852", 400, type);
    write(ctx, "clippings  ✓", 70, 262, 64);
    write(ctx, "the log  ✓", 70, 378, 64);
    write(ctx, "workbench  ✓", 70, 494, 64);
    write(ctx, "almost done…", 110, 700, 54, "#2f5fd0", 500);
  });

  // Turning page, front: nudging you on.
  const turnFront = paperCanvas((ctx) => {
    margin(ctx);
    write(ctx, "p. 09", 600, 90, 30, "#4a4852", 400, type);
    write(ctx, "one more", 160, 320, 80);
    write(ctx, "page →", 200, 430, 80, "#e62d5b");
  });

  // Turning page, back (becomes the new left page).
  const turnBack = paperCanvas((ctx) => {
    margin(ctx, 658);
    write(ctx, "one last", 70, 300, 104);
    write(ctx, "page.", 110, 420, 104);
    ctx.strokeStyle = "#e62d5b";
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(90, 452);
    ctx.bezierCurveTo(240, 432, 400, 470, 560, 446);
    ctx.stroke();
    write(ctx, "have an idea?", 90, 610, 58, "#2f5fd0", 500);
    write(ctx, "let's build it.", 90, 668, 58, "#2f5fd0", 500);
  });

  // Right page underneath: revealed once the page has turned.
  const contact = paperCanvas((ctx) => {
    margin(ctx);
    write(ctx, "say hi —", 150, 262, 70);
    ["email", "github", "linkedin", "resume"].forEach((label, i) => {
      const y = 378 + i * 58;
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.strokeRect(152, y - 34, 34, 34);
      write(ctx, label, 210, y, 52);
    });
    ctx.fillStyle = "rgba(248,221,46,0.8)";
    ctx.fillRect(140, 640, 430, 58);
    write(ctx, "notebook: read ✓", 156, 686, 50);
  });

  return { previous, turnFront, turnBack, contact };
}

/* ── Scene pieces ────────────────────────────────────────────────────────── */

// Bends the turning page: angle θ at the spine, curling back by k toward the edge.
function bendPage(geometry, t) {
  const pos = geometry.attributes.position;
  const theta = t * Math.PI;
  const k = Math.sin(t * Math.PI) * 0.85;
  for (let i = 0; i < pos.count; i++) {
    const col = i % (SEGMENTS + 1);
    const row = Math.floor(i / (SEGMENTS + 1));
    const s = col / SEGMENTS;
    let x, y;
    if (k < 1e-4) {
      x = PAGE_W * s * Math.cos(theta);
      y = PAGE_W * s * Math.sin(theta);
    } else {
      x = (PAGE_W * (Math.sin(theta) - Math.sin(theta - k * s))) / k;
      y = (PAGE_W * (Math.cos(theta - k * s) - Math.cos(theta))) / k;
    }
    const z = row === 0 ? -PAGE_H / 2 : PAGE_H / 2;
    pos.setXYZ(i, x, PAGE_Y + 0.004 + y, z);
  }
  pos.needsUpdate = true;
  geometry.computeVertexNormals();
}

function flatPage(texture, side) {
  const geo = new THREE.PlaneGeometry(PAGE_W, PAGE_H);
  geo.rotateX(-Math.PI / 2);
  geo.translate(side * PAGE_W * 0.5, PAGE_Y + 0.001, 0);
  return new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: texture, roughness: 0.92 }));
}

function softShadowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(128, 128, 20, 128, 128, 128);
  g.addColorStop(0, "rgba(0,0,0,0.55)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}

function buildPencil() {
  const pencil = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.045, 1.5, 6),
    new THREE.MeshStandardMaterial({ color: "#f5d23a", roughness: 0.55 })
  );
  const ferrule = new THREE.Mesh(
    new THREE.CylinderGeometry(0.047, 0.047, 0.1, 16),
    new THREE.MeshStandardMaterial({ color: "#b8b8c2", metalness: 0.7, roughness: 0.35 })
  );
  ferrule.position.y = 0.8;
  const eraser = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.045, 0.1, 16),
    new THREE.MeshStandardMaterial({ color: "#e98aa0", roughness: 0.8 })
  );
  eraser.position.y = 0.9;
  const wood = new THREE.Mesh(
    new THREE.ConeGeometry(0.045, 0.2, 6),
    new THREE.MeshStandardMaterial({ color: "#e2c08f", roughness: 0.9 })
  );
  wood.position.y = -0.85;
  wood.rotation.x = Math.PI;
  const lead = new THREE.Mesh(
    new THREE.ConeGeometry(0.014, 0.06, 8),
    new THREE.MeshStandardMaterial({ color: "#2c2c30", roughness: 0.4 })
  );
  lead.position.y = -0.96;
  lead.rotation.x = Math.PI;
  pencil.add(body, ferrule, eraser, wood, lead);
  pencil.rotation.set(Math.PI / 2, 0, -0.5);
  pencil.position.set(1.95, 0.05, 0.35);
  return pencil;
}

/* ── Component ───────────────────────────────────────────────────────────── */

export default function NotebookScene({ className = "" }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      return; // no WebGL — the page reads fine without the notebook
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
    camera.position.set(0, 5.4, 4.2);
    camera.lookAt(0, 0, 0.15);

    scene.add(new THREE.HemisphereLight("#fff8ec", "#1b1a23", 1.5));
    const key = new THREE.DirectionalLight("#ffffff", 1.6);
    key.position.set(-3, 5, 2.5);
    scene.add(key);

    const notebook = new THREE.Group();
    notebook.rotation.y = 0.12;
    scene.add(notebook);

    // desk shadow
    const shadowTex = softShadowTexture();
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(4.6, 3.4),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.set(0.1, -0.02, 0.18);
    notebook.add(shadow);

    // cobalt cloth cover and the two page blocks
    const cover = new THREE.Mesh(
      new THREE.BoxGeometry(PAGE_W * 2 + 0.14, 0.03, PAGE_H + 0.12),
      new THREE.MeshStandardMaterial({ color: "#2446a6", roughness: 0.85 })
    );
    cover.position.y = 0.015;
    notebook.add(cover);
    const blockMat = new THREE.MeshStandardMaterial({ color: "#e4ddcd", roughness: 1 });
    [-1, 1].forEach((side) => {
      const block = new THREE.Mesh(new THREE.BoxGeometry(PAGE_W - 0.02, 0.045, PAGE_H - 0.02), blockMat);
      block.position.set(side * (PAGE_W / 2), 0.052, 0);
      notebook.add(block);
    });

    // magenta ribbon bookmark trailing out of the spine
    const ribbon = new THREE.Mesh(
      new THREE.PlaneGeometry(0.06, 0.7),
      new THREE.MeshStandardMaterial({ color: "#e62d5b", roughness: 0.6, side: THREE.DoubleSide })
    );
    ribbon.rotation.set(-Math.PI / 2, 0, 0.25);
    ribbon.position.set(0.12, PAGE_Y + 0.006, PAGE_H / 2 + 0.25);
    notebook.add(ribbon);

    notebook.add(buildPencil());

    /* on-demand rendering: only while something is still settling */
    let turnGeo;
    let ready = false;
    let disposed = false;
    const state = { t: reduced ? 1 : 0, targetT: reduced ? 1 : 0, tiltX: 0, tiltY: 0, targetX: 0, targetY: 0 };
    let frame = 0;

    const render = () => {
      frame = 0;
      const ease = 0.12;
      state.tiltX += (state.targetX - state.tiltX) * ease;
      state.tiltY += (state.targetY - state.tiltY) * ease;
      const prevT = state.t;
      state.t += (state.targetT - state.t) * 0.1;

      notebook.rotation.x = state.tiltX;
      notebook.rotation.z = -state.tiltY * 0.6;
      notebook.rotation.y = 0.12 + state.tiltY;
      if (ready && Math.abs(state.t - prevT) > 1e-5) bendPage(turnGeo, state.t);

      renderer.render(scene, camera);

      const settling =
        Math.abs(state.targetX - state.tiltX) > 1e-4 ||
        Math.abs(state.targetY - state.tiltY) > 1e-4 ||
        Math.abs(state.targetT - state.t) > 1e-4;
      if (settling) requestRender();
    };
    const requestRender = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    // page artwork needs the real fonts, so wait for them before drawing
    const hand = fontFamilyOf("font-caveat");
    const type = fontFamilyOf("font-mono");
    const disposables = [shadowTex];

    Promise.all([document.fonts.load(`700 40px ${hand}`), document.fonts.load(`400 20px ${type}`)])
      .catch(() => {})
      .then(() => {
        if (disposed) return;
        const art = buildPageArt(hand, type);
        const tex = {
          previous: toTexture(art.previous),
          contact: toTexture(art.contact),
          front: toTexture(art.turnFront),
          back: toTexture(art.turnBack, true),
        };
        disposables.push(...Object.values(tex));

        notebook.add(flatPage(tex.previous, -1), flatPage(tex.contact, 1));

        turnGeo = new THREE.PlaneGeometry(PAGE_W, PAGE_H, SEGMENTS, 1);
        const front = new THREE.Mesh(turnGeo, new THREE.MeshStandardMaterial({ map: tex.front, roughness: 0.92 }));
        const back = new THREE.Mesh(
          turnGeo,
          new THREE.MeshStandardMaterial({ map: tex.back, roughness: 0.92, side: THREE.BackSide })
        );
        notebook.add(front, back);
        ready = true;
        bendPage(turnGeo, state.t);
        requestRender();
      });


    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      requestRender();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    // cursor tilt — the notebook leans toward the pointer, a few degrees at most
    const onPointer = (e) => {
      if (reduced) return;
      const r = host.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
      state.targetY = Math.max(-1, Math.min(1, nx)) * 0.12;
      state.targetX = Math.max(-1, Math.min(1, ny)) * 0.08;
      requestRender();
    };
    const onLeave = () => {
      state.targetX = 0;
      state.targetY = 0;
      requestRender();
    };
    const section = host.closest("section") || host;
    section.addEventListener("pointermove", onPointer);
    section.addEventListener("pointerleave", onLeave);

    // the page turns as the last page scrolls into place
    const trigger = reduced
      ? null
      : ScrollTrigger.create({
          trigger: host,
          start: "top 85%",
          end: "center 45%",
          onUpdate: (self) => {
            state.targetT = self.progress;
            requestRender();
          },
        });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      trigger?.kill();
      ro.disconnect();
      section.removeEventListener("pointermove", onPointer);
      section.removeEventListener("pointerleave", onLeave);
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
      });
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className={className} />;
}
