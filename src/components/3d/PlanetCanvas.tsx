import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function RotatingPlanet() {
  const planetRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.3;
      planetRef.current.rotation.x += delta * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group>
      {/* Central Cyber Planet */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshStandardMaterial
          color="#0b0f19"
          emissive="#00D9FF"
          emissiveIntensity={0.25}
          metalness={0.9}
          roughness={0.2}
          wireframe
        />
      </mesh>

      {/* Outer Atmosphere Glow Sphere */}
      <mesh scale={1.05}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial color="#8A2BE2" transparent opacity={0.15} />
      </mesh>

      {/* Orbital Ring System */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[2.3, 2.7, 64]} />
        <meshBasicMaterial color="#00D9FF" side={THREE.DoubleSide} transparent opacity={0.4} />
      </mesh>

      {/* Secondary Outer Thin Ring */}
      <mesh rotation={[Math.PI / 2.5, 0.4, 0]}>
        <ringGeometry args={[3.0, 3.1, 64]} />
        <meshBasicMaterial color="#FF007F" side={THREE.DoubleSide} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export const PlanetCanvas: React.FC = () => {
  return (
    <div className="w-full h-[400px] relative pointer-events-auto cursor-grab active:cursor-grabbing">
      <Canvas gl={{ antialias: true, alpha: true }}>
        <React.Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} rotateSpeed={0.7} />

          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#00D9FF" />
          <pointLight position={[-10, -10, -10]} intensity={1.5} color="#8A2BE2" />

          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
            <RotatingPlanet />
          </Float>

          <Sparkles count={100} scale={8} size={3} speed={0.4} color="#00D9FF" opacity={0.5} />
          <Sparkles count={60} scale={6} size={4} speed={0.3} color="#8A2BE2" opacity={0.4} />
        </React.Suspense>
      </Canvas>
    </div>
  );
};
