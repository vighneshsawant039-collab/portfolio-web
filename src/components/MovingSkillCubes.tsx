import React, { useEffect, useRef } from 'react';

export interface SkillCubeItem {
  name: string;
  color: string;
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  size: number;
  baseY: number;
  floatOffset: number;
}

const skillsList = [
  { name: 'React JS', color: '#00D9FF', pos: [-220, -50, 0] },
  { name: 'Frontend', color: '#8A2BE2', pos: [-80, -110, 80] },
  { name: 'Backend', color: '#FF007F', pos: [70, -70, -40] },
  { name: 'MongoDB', color: '#47A248', pos: [220, -100, -80] },
  { name: 'REST APIs', color: '#00FF88', pos: [-150, 90, 40] },
  { name: 'Tailwind CSS', color: '#38BDF8', pos: [20, 110, -50] },
  { name: 'HTML', color: '#E34F26', pos: [170, 80, 60] },
];

interface MovingSkillCubesProps {
  onHoverSkill: (skillName: string | null) => void;
}

export const MovingSkillCubes: React.FC<MovingSkillCubesProps> = ({ onHoverSkill }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 900);
    let height = (canvas.height = 460);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 460;
    };
    window.addEventListener('resize', handleResize);

    // Initial Cube States
    const cubes = skillsList.map((item, idx) => ({
      name: item.name,
      color: item.color,
      x: item.pos[0],
      y: item.pos[1],
      z: item.pos[2],
      baseY: item.pos[1],
      floatOffset: idx * 0.9,
      rx: Math.random() * Math.PI,
      ry: Math.random() * Math.PI,
      rz: 0,
      size: 42,
    }));

    // Particle Sparkles
    const particles = Array.from({ length: 40 }, () => ({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: (Math.random() - 0.5) * 300,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.5 + 0.2,
      color: skillsList[Math.floor(Math.random() * skillsList.length)].color,
    }));

    // Mouse Controls
    let mouseX = 0;
    let mouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let currentRotY = 0;
    let currentRotX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left - width / 2;
      const my = e.clientY - rect.top - height / 2;
      mouseX = mx;
      mouseY = my;

      targetRotY = (mx / width) * 0.6;
      targetRotX = -(my / height) * 0.6;
    };

    canvas.parentElement?.addEventListener('mousemove', handleMouseMove);

    // 3D Cube Vertices
    const getVertices = (size: number) => [
      [-size, -size, -size],
      [size, -size, -size],
      [size, size, -size],
      [-size, size, -size],
      [-size, -size, size],
      [size, -size, size],
      [size, size, size],
      [-size, size, size],
    ];

    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // Back face
      [4, 5], [5, 6], [6, 7], [7, 4], // Front face
      [0, 4], [1, 5], [2, 6], [3, 7], // Connecting edges
    ];

    const faces = [
      [0, 1, 2, 3], // Back
      [4, 5, 6, 7], // Front
      [0, 1, 5, 4], // Top
      [2, 3, 7, 6], // Bottom
      [0, 3, 7, 4], // Left
      [1, 2, 6, 5], // Right
    ];

    // 3D Matrix Transformations
    const rotateX = (v: number[], angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return [v[0], v[1] * cos - v[2] * sin, v[1] * sin + v[2] * cos];
    };

    const rotateY = (v: number[], angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return [v[0] * cos + v[2] * sin, v[1], -v[0] * sin + v[2] * cos];
    };

    const rotateZ = (v: number[], angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return [v[0] * cos - v[1] * sin, v[0] * sin + v[1] * cos, v[2]];
    };

    let time = 0;
    let hoveredIndex: number | null = null;

    // Render Loop
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Smooth Orbit rotation
      currentRotY += (targetRotY - currentRotY) * 0.05;
      currentRotX += (targetRotX - currentRotX) * 0.05;

      const fov = 400;
      const cx = width / 2;
      const cy = height / 2;

      // Draw Floating Sparkle Particles
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < -height / 2) p.y = height / 2;

        let pVec = [p.x, p.y, p.z];
        pVec = rotateY(pVec, currentRotY);
        pVec = rotateX(pVec, currentRotX);

        const scale = fov / (fov + pVec[2] + 400);
        const px = cx + pVec[0] * scale;
        const py = cy + pVec[1] * scale;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, scale * 0.6));
        ctx.beginPath();
        ctx.arc(px, py, p.size * scale, 0, Math.PI * 2);
        ctx.fill();
      });

      // Find closest cube under cursor
      let closestIdx: number | null = null;
      let minDist = 60;

      // Project & Render Cubes
      const projectedCubes = cubes.map((cube, idx) => {
        // Floating motion
        const floatY = cube.baseY + Math.sin(time * 1.5 + cube.floatOffset) * 18;

        // Auto-rotation speeds
        const isHovered = hoveredIndex === idx;
        cube.rx += isHovered ? 0.04 : 0.015;
        cube.ry += isHovered ? 0.05 : 0.02;

        let center = [cube.x, floatY, cube.z];
        center = rotateY(center, currentRotY + time * 0.15);
        center = rotateX(center, currentRotX);

        const currentSize = isHovered ? cube.size * 1.35 : cube.size;

        // Compute 3D Vertices
        const rawVerts = getVertices(currentSize);
        const transformedVerts = rawVerts.map((v) => {
          let rot = rotateZ(v, cube.rz);
          rot = rotateY(rot, cube.ry);
          rot = rotateX(rot, cube.rx);

          const world = [rot[0] + center[0], rot[1] + center[1], rot[2] + center[2]];
          const projected = rotateY(world, 0);

          const scale = fov / (fov + projected[2] + 400);
          return {
            x: cx + projected[0] * scale,
            y: cy + projected[1] * scale,
            z: projected[2],
            scale,
          };
        });

        // Projected center for mouse collision
        const scaleCenter = fov / (fov + center[2] + 400);
        const projCenterX = cx + center[0] * scaleCenter;
        const projCenterY = cy + center[1] * scaleCenter;

        const dist = Math.hypot(mouseX + cx - projCenterX, mouseY + cy - projCenterY);
        if (dist < minDist) {
          minDist = dist;
          closestIdx = idx;
        }

        return {
          cube,
          idx,
          centerZ: center[2],
          projCenterX,
          projCenterY,
          verts: transformedVerts,
          isHovered,
        };
      });

      // Update Hovered Skill
      if (closestIdx !== hoveredIndex) {
        hoveredIndex = closestIdx;
        const activeName = closestIdx !== null ? cubes[closestIdx].name : null;
        onHoverSkill(activeName);
      }

      // Sort Cubes by Depth (z-index back to front)
      projectedCubes.sort((a, b) => b.centerZ - a.centerZ);

      // Render Each Cube
      projectedCubes.forEach(({ cube, verts, isHovered, projCenterX, projCenterY }) => {
        // Draw Faces with glowing semi-transparent glass fill
        faces.forEach((face) => {
          ctx.beginPath();
          ctx.moveTo(verts[face[0]].x, verts[face[0]].y);
          ctx.lineTo(verts[face[1]].x, verts[face[1]].y);
          ctx.lineTo(verts[face[2]].x, verts[face[2]].y);
          ctx.lineTo(verts[face[3]].x, verts[face[3]].y);
          ctx.closePath();

          ctx.fillStyle = cube.color;
          ctx.globalAlpha = isHovered ? 0.45 : 0.18;
          ctx.fill();
        });

        // Draw Glowing Wireframe Edges
        edges.forEach(([i, j]) => {
          ctx.beginPath();
          ctx.moveTo(verts[i].x, verts[i].y);
          ctx.lineTo(verts[j].x, verts[j].y);
          ctx.strokeStyle = cube.color;
          ctx.lineWidth = isHovered ? 2.5 : 1.5;
          ctx.globalAlpha = isHovered ? 1.0 : 0.55;
          ctx.shadowColor = cube.color;
          ctx.shadowBlur = isHovered ? 15 : 6;
          ctx.stroke();
          ctx.shadowBlur = 0;
        });

        // Outer Wireframe Cage Glow
        if (isHovered) {
          ctx.save();
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = 0.8;
          ctx.shadowColor = cube.color;
          ctx.shadowBlur = 20;
          edges.forEach(([i, j]) => {
            ctx.beginPath();
            ctx.moveTo(verts[i].x, verts[i].y);
            ctx.lineTo(verts[j].x, verts[j].y);
            ctx.stroke();
          });
          ctx.restore();
        }

        // Draw 3D Skill Label Below Cube
        ctx.save();
        ctx.font = `${isHovered ? 'bold 13px' : '600 11px'} Space Grotesk, sans-serif`;
        ctx.fillStyle = isHovered ? '#FFFFFF' : cube.color;
        ctx.textAlign = 'center';
        ctx.globalAlpha = isHovered ? 1.0 : 0.85;
        ctx.shadowColor = cube.color;
        ctx.shadowBlur = isHovered ? 12 : 4;
        ctx.fillText(cube.name, projCenterX, projCenterY + (isHovered ? 48 : 38));
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (canvas && canvas.parentElement) {
        canvas.parentElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [onHoverSkill]);

  return (
    <div className="relative w-full h-[460px] rounded-3xl overflow-hidden glass-panel border border-[#00D9FF]/30 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex items-center justify-center cursor-grab active:cursor-grabbing">
      {/* 3D Kinetic Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Floating Guidance Badge */}
      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700 text-[10px] font-mono text-slate-300 pointer-events-none backdrop-blur-md flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-ping" />
        <span>3D MOVING CUBES // ROTATE & HOVER</span>
      </div>
    </div>
  );
};
