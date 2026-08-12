import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, Sparkles, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const skillsList = [
  { name: 'React JS', color: '#00D9FF', pos: [-3, 1.2, 0] },
  { name: 'Frontend', color: '#8A2BE2', pos: [-1, 1.5, 1] },
  { name: 'Backend', color: '#FF007F', pos: [1, 1.2, 0] },
  { name: 'MongoDB', color: '#47A248', pos: [3, 1.5, -1] },
  { name: 'REST APIs', color: '#00FF88', pos: [-2, -1.2, 0.5] },
  { name: 'Tailwind CSS', color: '#38BDF8', pos: [0, -1.5, -0.5] },
  { name: 'HTML', color: '#E34F26', pos: [2, -1.2, 0.5] },
];

function SkillCube({ skill, onHover }: { skill: (typeof skillsList)[0]; onHover: (name: string | null) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * (hovered ? 1.5 : 0.5);
      meshRef.current.rotation.y += delta * (hovered ? 2.0 : 0.7);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <group position={skill.pos as [number, number, number]}>
        <mesh
          ref={meshRef}
          onPointerOver={() => {
            setHovered(true);
            onHover(skill.name);
          }}
          onPointerOut={() => {
            setHovered(false);
            onHover(null);
          }}
          scale={hovered ? 1.35 : 1}
        >
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={hovered ? 1.2 : 0.35}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Outer Glowing Wireframe Cage */}
        <mesh scale={hovered ? 1.5 : 1.15}>
          <boxGeometry args={[1.25, 1.25, 1.25]} />
          <meshBasicMaterial color={skill.color} wireframe transparent opacity={hovered ? 0.85 : 0.35} />
        </mesh>

        {/* 3D Floating Name Text */}
        <Text
          position={[0, -1.1, 0]}
          fontSize={0.3}
          color={hovered ? '#ffffff' : skill.color}
          anchorX="center"
          anchorY="middle"
        >
          {skill.name}
        </Text>

        {/* Particle Burst on Hover */}
        {hovered && <Sparkles count={40} scale={2} size={4} speed={2} color={skill.color} />}
      </group>
    </Float>
  );
}

interface SkillsCanvasProps {
  onHoverSkill: (skillName: string | null) => void;
}

export const SkillsCanvas: React.FC<SkillsCanvasProps> = ({ onHoverSkill }) => {
  return (
    <div className="w-full h-[460px] relative pointer-events-auto cursor-grab active:cursor-grabbing">
      <Canvas gl={{ antialias: true, alpha: true }}>
        <React.Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={50} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} rotateSpeed={0.6} />

          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#00D9FF" />
          <pointLight position={[-10, -10, -10]} intensity={1.5} color="#8A2BE2" />

          {skillsList.map((skill) => (
            <SkillCube key={skill.name} skill={skill} onHover={onHoverSkill} />
          ))}
        </React.Suspense>
      </Canvas>
    </div>
  );
};
