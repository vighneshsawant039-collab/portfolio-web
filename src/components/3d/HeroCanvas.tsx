import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles, Grid, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

// Procedural Matrix / Holographic Screen Canvas Texture
function createScreenTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Glowing border lines
    ctx.strokeStyle = '#00D9FF';
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    // Tech Header text
    ctx.fillStyle = '#00D9FF';
    ctx.font = 'bold 20px monospace';
    ctx.fillText('SYSTEM: VIGHNESH_CORE v4.0', 30, 45);

    ctx.fillStyle = '#8A2BE2';
    ctx.font = '14px monospace';
    ctx.fillText('----------------------------------', 30, 65);

    // Simulated Code Lines
    const lines = [
      'const developer = {',
      '  name: "Vighnesh Sawant",',
      '  role: "Full Stack 3D Architect",',
      '  status: "READY_FOR_DEPLOYMENT"',
      '};',
      'async renderFutureWebUI() {',
      '  await init60FPSCanvas();',
      '}',
    ];

    lines.forEach((line, i) => {
      ctx.fillStyle = i % 2 === 0 ? '#00D9FF' : '#ffffff';
      ctx.font = '15px monospace';
      ctx.fillText(line, 35, 100 + i * 22);
    });

    // Glowing status badge
    ctx.fillStyle = '#00FF88';
    ctx.fillRect(350, 35, 120, 25);
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('● ONLINE', 375, 52);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Interactive Holographic Laptop with Cursor Physics
function HolographicLaptop({ scrollProgress }: { scrollProgress: number }) {
  const laptopRef = useRef<THREE.Group>(null);
  const screenTexture = useMemo(() => createScreenTexture(), []);

  useFrame((state, delta) => {
    if (laptopRef.current) {
      // Smooth lerp mouse parallax response
      const targetY = (state.pointer.x * Math.PI) / 6 + scrollProgress * Math.PI * 2;
      const targetX = (-state.pointer.y * Math.PI) / 8 + scrollProgress * 0.3;

      laptopRef.current.rotation.y = THREE.MathUtils.damp(
        laptopRef.current.rotation.y,
        targetY,
        4,
        delta
      );
      laptopRef.current.rotation.x = THREE.MathUtils.damp(
        laptopRef.current.rotation.x,
        targetX,
        4,
        delta
      );
    }
  });

  return (
    <group ref={laptopRef} position={[0, -0.2, 0]}>
      {/* Laptop Base (Body) */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.15, 2.2]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Keyboard Glowing Frame */}
      <mesh position={[0, 0.08, 0.2]}>
        <boxGeometry args={[2.8, 0.02, 1.4]} />
        <meshStandardMaterial color="#00D9FF" emissive="#00D9FF" emissiveIntensity={0.8} wireframe />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, 0.08, 0.8]}>
        <boxGeometry args={[0.9, 0.01, 0.6]} />
        <meshStandardMaterial color="#8A2BE2" emissive="#8A2BE2" emissiveIntensity={0.4} />
      </mesh>

      {/* Screen Hinge & Frame */}
      <group position={[0, 0.08, -1.05]} rotation={[0.2, 0, 0]}>
        <mesh position={[0, 1.1, 0]}>
          <boxGeometry args={[3.2, 2.2, 0.1]} />
          <meshStandardMaterial color="#0b0f19" metalness={0.95} roughness={0.1} />
        </mesh>

        {/* Screen Display Content */}
        <mesh position={[0, 1.1, 0.06]}>
          <planeGeometry args={[3.0, 2.0]} />
          <meshBasicMaterial map={screenTexture} />
        </mesh>

        {/* Screen Back Neon Logo */}
        <mesh position={[0, 1.1, -0.06]} rotation={[0, Math.PI, 0]}>
          <ringGeometry args={[0.3, 0.4, 32]} />
          <meshBasicMaterial color="#00D9FF" side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

// Glowing Floating Orbs around the scene
function GlowingOrbs() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  const orbPositions = useMemo(() => {
    return [
      { pos: [-3.2, 1.5, -2], color: '#00D9FF', scale: 0.4 },
      { pos: [3.2, 2, -1], color: '#8A2BE2', scale: 0.5 },
      { pos: [-2, -1, 1], color: '#FF007F', scale: 0.3 },
      { pos: [2.5, -1.5, -3], color: '#00D9FF', scale: 0.45 },
    ];
  }, []);

  return (
    <group ref={groupRef}>
      {orbPositions.map((orb, index) => (
        <Float key={index} speed={2} rotationIntensity={1} floatIntensity={2}>
          <mesh position={orb.pos as [number, number, number]}>
            <sphereGeometry args={[orb.scale, 32, 32]} />
            <meshStandardMaterial
              color={orb.color}
              emissive={orb.color}
              emissiveIntensity={2}
              roughness={0.1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Moving Cyber Light Streaks
function LightStreaks() {
  const streaksRef = useRef<THREE.InstancedMesh>(null);
  const count = 35;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 15,
        y: (Math.random() - 0.5) * 10,
        z: (Math.random() - 0.5) * 15,
        speed: Math.random() * 0.06 + 0.03,
        scale: Math.random() * 1.5 + 0.5,
      });
    }
    return temp;
  }, []);

  useFrame(() => {
    if (streaksRef.current) {
      particles.forEach((p, i) => {
        p.z += p.speed;
        if (p.z > 8) p.z = -12;

        dummy.position.set(p.x, p.y, p.z);
        dummy.scale.set(0.03, 0.03, p.scale * 1.5);
        dummy.updateMatrix();

        streaksRef.current!.setMatrixAt(i, dummy.matrix);
      });
      streaksRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={streaksRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#00D9FF" />
    </instancedMesh>
  );
}

interface HeroCanvasProps {
  scrollProgress: number;
}

export const HeroCanvas: React.FC<HeroCanvasProps> = ({ scrollProgress }) => {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-auto cursor-grab active:cursor-grabbing">
      <Canvas gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
        <React.Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 6 + scrollProgress * 3]} fov={50} />
          
          {/* Orbit Controls for free mouse inspection */}
          <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 3} rotateSpeed={0.5} />

          {/* Ambient & Point Lights */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.8} color="#00D9FF" />
          <pointLight position={[-10, -10, -5]} intensity={1.5} color="#8A2BE2" />
          <directionalLight position={[0, 5, 5]} intensity={1} color="#ffffff" />

          {/* Background Environment Stars */}
          <Stars radius={100} depth={50} count={3500} factor={4} saturation={0} fade speed={1.5} />

          {/* Floating Sparks */}
          <Sparkles count={140} scale={12} size={3} speed={0.4} color="#00D9FF" opacity={0.6} />
          <Sparkles count={90} scale={10} size={4} speed={0.3} color="#8A2BE2" opacity={0.5} />

          {/* Floating 3D Laptop */}
          <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
            <HolographicLaptop scrollProgress={scrollProgress} />
          </Float>

          {/* Floating Glowing Orbs */}
          <GlowingOrbs />

          {/* Light Streaks */}
          <LightStreaks />

          {/* Cyber Animated Wireframe Grid Floor */}
          <group position={[0, -2.5, 0]} rotation={[0, 0, scrollProgress * 0.2]}>
            <Grid
              infiniteGrid
              cellSize={0.8}
              cellThickness={0.8}
              cellColor="#00D9FF"
              sectionSize={3.2}
              sectionThickness={1.5}
              sectionColor="#8A2BE2"
              fadeDistance={25}
              fadeStrength={1.5}
            />
          </group>

          {/* Fog effect for depth */}
          <fog attach="fog" args={['#050505', 5, 25]} />

          {/* Post-processing Bloom */}
          <EffectComposer>
            <Bloom
              intensity={1.2}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              blendFunction={BlendFunction.SCREEN}
            />
            <ChromaticAberration
              offset={new THREE.Vector2(0.001, 0.001)}
              blendFunction={BlendFunction.NORMAL}
            />
          </EffectComposer>
        </React.Suspense>
      </Canvas>
    </div>
  );
};
