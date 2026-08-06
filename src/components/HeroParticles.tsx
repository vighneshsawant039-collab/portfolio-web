import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  baseX: number;
  baseY: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  pulseSpeed: number;
}

interface Streak {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  angle: number;
  width: number;
}

interface HeroParticlesProps {
  mousePos: { x: number; y: number };
}

export const HeroParticles: React.FC<HeroParticlesProps> = ({ mousePos }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Color palette for particles and glow streaks
    const colors = [
      'rgba(0, 217, 255, ',   // Neon cyan
      'rgba(138, 43, 226, ',  // Neon purple
      'rgba(255, 0, 127, ',   // Neon pink
      'rgba(255, 255, 255, ', // White dust
    ];

    // Generate floating dust particles
    const particleCount = Math.min(Math.floor((width * height) / 18000), 75);
    const particles: Particle[] = Array.from({ length: particleCount }, () => {
      const colorPrefix = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.6 + 0.2,
        color: colorPrefix,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      };
    });

    // Generate light streaks
    const streakCount = 8;
    const streaks: Streak[] = Array.from({ length: streakCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 120 + 60,
      speed: Math.random() * 0.8 + 0.3,
      opacity: Math.random() * 0.25 + 0.05,
      angle: -Math.PI / 4 + (Math.random() - 0.5) * 0.2,
      width: Math.random() * 1.5 + 0.5,
    }));

    let pulseTimer = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      pulseTimer += 0.02;

      // Mouse Parallax factor
      const parallaxX = (mousePos.x - 0.5) * 35;
      const parallaxY = (mousePos.y - 0.5) * 35;

      // 1. Draw light streaks
      streaks.forEach((streak) => {
        streak.y -= streak.speed;
        streak.x += Math.cos(streak.angle) * streak.speed * 0.5;

        if (streak.y + streak.length < 0 || streak.x > width + 100) {
          streak.y = height + streak.length;
          streak.x = Math.random() * width;
        }

        const endX = streak.x + Math.sin(streak.angle) * streak.length;
        const endY = streak.y - Math.cos(streak.angle) * streak.length;

        const grad = ctx.createLinearGradient(streak.x, streak.y, endX, endY);
        grad.addColorStop(0, `rgba(0, 217, 255, 0)`);
        grad.addColorStop(0.5, `rgba(0, 217, 255, ${streak.opacity})`);
        grad.addColorStop(1, `rgba(138, 43, 226, 0)`);

        ctx.beginPath();
        ctx.moveTo(streak.x + parallaxX * 0.3, streak.y + parallaxY * 0.3);
        ctx.lineTo(endX + parallaxX * 0.3, endY + parallaxY * 0.3);
        ctx.strokeStyle = grad;
        ctx.lineWidth = streak.width;
        ctx.stroke();
      });

      // 2. Draw particles & glowing nodes
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around boundaries
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const currentOpacity = p.opacity + Math.sin(pulseTimer * p.pulseSpeed * 10) * 0.15;
        const finalX = p.x + parallaxX * (p.size / 2.5);
        const finalY = p.y + parallaxY * (p.size / 2.5);

        ctx.beginPath();
        ctx.arc(finalX, finalY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0, currentOpacity)})`;
        ctx.shadowBlur = p.size > 1.8 ? 8 : 0;
        ctx.shadowColor = p.color.includes('217') ? '#00D9FF' : '#8A2BE2';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
};
