"use client";

import { useRef, useEffect, useState, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, Preload, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import earthImg from "./8k_earth_daymap.jpg";

/* ────────────── WebGL context keep-alive helper ────────── */

function KeepAlive() {
  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;

    const handleContextLost = (e) => {
      e.preventDefault();
    };

    const handleContextRestored = () => {
      gl.setSize(canvas.clientWidth, canvas.clientHeight);
    };

    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);

    return () => {
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
    };
  }, [gl]);

  return null;
}

/* ────────────── Responsive camera adjuster ────────────── */

function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    // On narrow screens, pull camera back so globe fits without clipping
    const isMobile = size.width < 480;
    const isTablet = size.width < 768;

    if (isMobile) {
      camera.position.set(0, 0, 6.5);
      camera.fov = 45;
    } else if (isTablet) {
      camera.position.set(0, 0, 5.5);
      camera.fov = 42;
    } else {
      camera.position.set(0, 0, 5);
      camera.fov = 40;
    }

    camera.updateProjectionMatrix();
  }, [camera, size.width]);

  return null;
}

/* ────────────────── Floating particles ────────────────── */

function FloatingParticles({ isMobile }) {
  const pointsRef = useRef();
  // Fewer particles on mobile for performance
  const count = isMobile ? 60 : 120;

  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.0 + Math.random() * 1.8;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      sz[i] = 1.0 + Math.random() * 2.0;
    }

    return { positions: pos, sizes: sz };
  }, [count]);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0002;
      pointsRef.current.rotation.x += 0.0001;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>

      <pointsMaterial
        color="#44ccff"
        size={0.022}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ──────────────────── Globe mesh ───────────────────────── */

function Globe({ isMobile }) {
  const meshRef = useRef();
  const cloudsRef = useRef();

  const [earthMap, cloudMap] = useTexture([
    earthImg.src,
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png",
  ]);

  earthMap.colorSpace = THREE.SRGBColorSpace;
  // Lower anisotropy on mobile saves GPU memory
  earthMap.anisotropy = isMobile ? 2 : 4;

  useEffect(() => {
    return () => {
      earthMap.dispose();
      cloudMap.dispose();
    };
  }, [earthMap, cloudMap]);

  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.0004;
    if (cloudsRef.current) cloudsRef.current.rotation.y += 0.00058;
  });

  // Slightly fewer segments on mobile for performance
  const segments = isMobile ? 36 : 48;

  return (
    <group rotation={[0.35, 4.92, 0.05]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, segments, segments]} />
        <meshStandardMaterial
          map={earthMap}
          roughness={0.45}
          metalness={0.25}
          emissive={new THREE.Color(0x1a3a6a)}
          emissiveIntensity={0.35}
          envMapIntensity={1.2}
        />
      </mesh>

      <mesh ref={cloudsRef} scale={[1.007, 1.007, 1.007]}>
        <sphereGeometry args={[1.5, segments, segments]} />
        <meshStandardMaterial
          map={cloudMap}
          alphaMap={cloudMap}
          transparent
          opacity={0.9}
          depthWrite={false}
          roughness={1}
          metalness={0}
        />
      </mesh>
    </group>
  );
}

/* ─────────────── Main exported component ─────────────── */

export default function Earth3D() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    const checkBreakpoint = () => {
      setIsMobile(window.innerWidth < 480);
      setIsTablet(window.innerWidth >= 480 && window.innerWidth < 768);
    };

    checkBreakpoint();

    window.addEventListener("resize", checkBreakpoint);
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []);

  if (!mounted) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          minHeight: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            border: "3px solid #1BA4E5",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
      </div>
    );
  }

  return (
    /*
     * IMPORTANT: the parent must have an explicit height.
     * On mobile, "height: 100%" collapses if the parent has no height set.
     * We use minHeight as a safe fallback so the canvas never renders
     * into a zero-height box (which causes the "blank globe" bug on mobile).
     */
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: isMobile ? "320px" : isTablet ? "420px" : "500px",
        position: "relative",
        // Show pointer on desktop, default touch cursor on mobile
        cursor: isMobile ? "default" : "grab",
        // Prevent touch scroll from fighting with OrbitControls
        touchAction: "none",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <Canvas
        /*
         * Don't set a fixed camera here — ResponsiveCamera() handles it
         * reactively. We still set a sensible default for the first render.
         */
        camera={{ position: [0, 0, 5], fov: 40, near: 0.1, far: 1000 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "block", // Eliminates the 4px inline gap on mobile
        }}
        gl={{ alpha: true, antialias: !isMobile }} // antialias off on mobile = big perf win
        /*
         * Cap DPR at 2 on desktop, 1.5 on mobile.
         * High-DPR mobile screens (3×) would otherwise render 3× the pixels
         * for no visible gain at globe size.
         */
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        // Throttle frame rate on mobile to save battery
        frameloop={isMobile ? "demand" : "always"}
      >
        <KeepAlive />
        <ResponsiveCamera />

        <ambientLight intensity={0.8} />
        <hemisphereLight args={["#b1e1ff", "#112244", 0.6]} />
        <directionalLight position={[-5, 3, 5]} intensity={3.2} />
        <directionalLight position={[3, 2, 4]} intensity={1.2} />
        <pointLight position={[4, 0, -4]} intensity={1.2} />

        <Suspense fallback={null}>
          <Globe isMobile={isMobile} />
          <FloatingParticles isMobile={isMobile} />
          <Preload all />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.4}
          /*
           * These touch multipliers control how sensitive drag/rotate feels
           * on a finger vs. a mouse. Lower = less jerky on mobile.
           */
          rotateSpeed={isMobile ? 0.5 : 1.0}
          touches={{
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_ROTATE,
          }}
        />
      </Canvas>
    </div>
  );
}