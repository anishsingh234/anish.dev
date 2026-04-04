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

/* ────────────────── Floating particles ────────────────── */

function FloatingParticles() {
  const pointsRef = useRef();
  const count = 120;

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
  }, []);

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

function Globe() {
  const meshRef = useRef();
  const cloudsRef = useRef();

  const [earthMap, cloudMap] = useTexture([
    earthImg.src,
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png",
  ]);

  earthMap.colorSpace = THREE.SRGBColorSpace;
  earthMap.anisotropy = 4;

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

  return (
    <group rotation={[0.35, 4.92, 0.05]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 48, 48]} />
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
        <sphereGeometry args={[1.5, 48, 48]} />
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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
    <div style={{ width: "100%", height: "100%", position: "relative", cursor: "grab" }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <KeepAlive />

        <ambientLight intensity={0.8} />
        <hemisphereLight args={["#b1e1ff", "#112244", 0.6]} />
        <directionalLight position={[-5, 3, 5]} intensity={3.2} />
        <directionalLight position={[3, 2, 4]} intensity={1.2} />
        <pointLight position={[4, 0, -4]} intensity={1.2} />

        <Suspense fallback={null}>
          <Globe />
          <FloatingParticles />
          <Preload all />
        </Suspense>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  );
}