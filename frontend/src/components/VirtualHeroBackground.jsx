import React, { useRef, useEffect, useState } from 'react';
import { REAL_HUMAN_VIDEOS } from './BrandShowcaseVideoModal';

// Virtual & Walk/Drive Background Presets
export const VIRTUAL_BACKGROUND_PRESETS = [
  {
    id: 'cyber-mesh',
    name: '3D Cyber Grid Wave',
    tagline: 'Interactive 3D Perspective Wave Grid on Pure White Background',
    type: 'canvas-wave',
    color: '#7c3aed', // Violet
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-cyber-network-connections-and-data-lines-41539-large.mp4',
  },
  {
    id: 'tech-city-drive',
    name: 'POV Night City Drive',
    tagline: 'High-Speed POV Drive Stream with White Architectural Glass Overlay',
    type: 'video-drive',
    color: '#2563eb', // Blue
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-car-driving-through-the-city-at-night-41548-large.mp4',
  },
  {
    id: 'neon-tunnel-drive',
    name: 'Neon Cyber Speed Tunnel',
    tagline: 'Futuristic Speed Tunnel Drive with Light Neon Rays',
    type: 'video-drive',
    color: '#d946ef', // Fuchsia
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-driving-in-a-tunnel-with-glowing-neon-lights-41540-large.mp4',
  },
  {
    id: 'corridor-walk',
    name: 'Tech Building Corridor Walk',
    tagline: 'First-Person Walkthrough Modern Glass IT Building',
    type: 'video-walk',
    color: '#0284c7', // Sky
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-business-people-walking-in-a-futuristic-building-41555-large.mp4',
  },
  {
    id: 'neural-ai',
    name: 'Neural AI Constellation',
    tagline: 'Deep Learning Synaptic Network on Pure White Background',
    type: 'canvas-neural',
    color: '#0891b2', // Cyan
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-robotic-arm-working-in-a-lab-41544-large.mp4',
  },
  {
    id: 'quantum-matrix',
    name: 'Quantum Data Matrix',
    tagline: 'Subtle Fiber Optic Data Matrix Stream',
    type: 'canvas-matrix',
    color: '#059669', // Emerald
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-lines-41538-large.mp4',
  }
];

export default function VirtualHeroBackground({
  virtualMode = 'cyber-mesh',
  selectedRealVideoId = 'tech-city-drive',
}) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const activePreset = VIRTUAL_BACKGROUND_PRESETS.find(p => p.id === virtualMode) || VIRTUAL_BACKGROUND_PRESETS[0];
  const realVideo = REAL_HUMAN_VIDEOS.find(v => v.id === selectedRealVideoId) || REAL_HUMAN_VIDEOS[0];

  const currentVideoSrc = virtualMode === 'real-human-stream'
    ? realVideo.videoUrl
    : activePreset.videoSrc;

  // Track Mouse Movement for Interactive Parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Reset video state when video source changes
  useEffect(() => {
    setVideoReady(false);
    setVideoError(false);
  }, [currentVideoSrc]);

  // 3D Canvas Visualizer Engine on White Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animId;
    let time = 0;

    const cols = 36;
    const rows = 18;
    let gridPoints = [];

    const numParticles = 60;
    let particles = [];

    const numMatrixColumns = 40;
    let matrixDrops = [];

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      initGrid();
      initParticles();
      initMatrix();
    }

    function initGrid() {
      gridPoints = [];
      const cellW = width / (cols - 1);
      const cellH = height / (rows - 1);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          gridPoints.push({
            baseX: c * cellW,
            baseY: r * cellH,
            x: c * cellW,
            y: r * cellH,
            row: r,
            col: c,
            pulse: Math.random() * Math.PI * 2,
          });
        }
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          radius: Math.random() * 2.5 + 1.2,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function initMatrix() {
      matrixDrops = [];
      const colWidth = width / numMatrixColumns;
      for (let i = 0; i < numMatrixColumns; i++) {
        matrixDrops.push({
          x: i * colWidth + colWidth / 2,
          y: Math.random() * height - height,
          speed: Math.random() * 2.5 + 1.2,
          length: Math.floor(Math.random() * 10 + 5),
          chars: Array.from({ length: 12 }, () =>
            String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96))
          ),
        });
      }
    }

    function animate() {
      time += 0.018;

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      if (virtualMode === 'cyber-mesh' || virtualMode.includes('drive') || virtualMode.includes('walk')) {
        // --- 3D WAVE PERSPECTIVE GRID ON WHITE ---
        gridPoints.forEach((pt) => {
          const wave1 = Math.sin(pt.col * 0.22 + time) * Math.cos(pt.row * 0.3 + time * 0.8);
          const wave2 = Math.sin((pt.col + pt.row) * 0.15 + time * 1.2) * 8;
          let offsetZ = wave1 * 12 + wave2;

          const dx = pt.baseX - mx;
          const dy = pt.baseY - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            offsetZ += (1 - dist / 180) * 20;
          }

          pt.x = pt.baseX + Math.cos(pt.row * 0.2 + time) * 4;
          pt.y = pt.baseY + offsetZ;
        });

        // Horizontal grid lines (crisp purple/indigo on white)
        for (let r = 0; r < rows; r++) {
          ctx.beginPath();
          for (let c = 0; c < cols; c++) {
            const idx = r * cols + c;
            const pt = gridPoints[idx];
            if (c === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
          const alpha = (r / rows) * 0.22 + 0.08;
          ctx.strokeStyle = `rgba(124, 58, 237, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Vertical grid lines (cyan/violet on white)
        for (let c = 0; c < cols; c++) {
          ctx.beginPath();
          for (let r = 0; r < rows; r++) {
            const idx = r * cols + c;
            const pt = gridPoints[idx];
            if (r === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
          const alpha = Math.sin((c / cols) * Math.PI) * 0.2 + 0.06;
          ctx.strokeStyle = `rgba(14, 165, 233, ${alpha})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }

        // Glowing intersection nodes on white
        gridPoints.forEach((pt) => {
          if ((pt.row + pt.col) % 5 === 0) {
            const pulse = (Math.sin(pt.pulse + time * 3) + 1) / 2;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 1.8 + pulse * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(147, 51, 234, ${0.5 + pulse * 0.4})`;
            ctx.fill();
          }
        });
      } else if (virtualMode === 'neural-ai') {
        // --- NEURAL CONSTELLATION ON WHITE ---
        particles.forEach((p, idx) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160 && dist > 0) {
            p.x += (dx / dist) * 0.5;
            p.y += (dy / dist) * 0.5;
          }

          for (let j = idx + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const pdx = p2.x - p.x;
            const pdy = p2.y - p.y;
            const pdist = Math.sqrt(pdx * pdx + pdy * pdy);

            if (pdist < 130) {
              const alpha = (1 - pdist / 130) * 0.4;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(109, 40, 217, ${alpha})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }

          const pulse = (Math.sin(p.phase + time * 2) + 1) / 2;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius + pulse * 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(124, 58, 237, ${0.6 + pulse * 0.3})`;
          ctx.fill();
        });
      } else if (virtualMode === 'quantum-matrix') {
        // --- MATRIX DROP ON WHITE ---
        ctx.font = '12px monospace';
        matrixDrops.forEach((drop) => {
          drop.y += drop.speed;
          if (drop.y > height + 100) {
            drop.y = -Math.random() * 200;
            drop.speed = Math.random() * 2.5 + 1.2;
          }

          for (let i = 0; i < drop.length; i++) {
            const charY = drop.y - i * 14;
            if (charY > 0 && charY < height) {
              const char = drop.chars[i % drop.chars.length];
              const alpha = (1 - i / drop.length) * 0.7;
              ctx.fillStyle = i === 0
                ? '#0284c7'
                : `rgba(124, 58, 237, ${alpha})`;
              ctx.fillText(char, drop.x, charY);
            }
          }
        });
      }

      animId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [virtualMode]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden bg-white" aria-hidden="true">
      
      {/* PURE WHITE BASE BACKGROUND */}
      <div className="absolute inset-0 bg-white" />

      {/* NATIVE HD VIDEO STREAM WITH CRISP WHITE GLASS OVERLAY */}
      {!videoError && (
        <video
          key={currentVideoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setVideoReady(true)}
          onError={() => setVideoError(true)}
          className={`absolute inset-0 h-full w-full scale-105 object-cover object-center transition-opacity duration-1000 ${
            videoReady ? 'opacity-25' : 'opacity-0'
          }`}
        >
          <source src={currentVideoSrc} type="video/mp4" />
        </video>
      )}

      {/* 3D CANVAS INTERACTIVE OVERLAY */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-90 transition-opacity duration-700 pointer-events-none"
      />

      {/* Light Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(124,58,237,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />

      {/* Soft Pastel Ambient Glow Orbs */}
      <div className="absolute -right-32 -top-20 h-[36rem] w-[36rem] rounded-full border border-violet-200/50 bg-violet-100/60 blur-3xl" />
      <div className="absolute -left-32 -bottom-20 h-[32rem] w-[32rem] rounded-full border border-cyan-200/50 bg-cyan-100/50 blur-3xl" />

      {/* Pure White Glassmorphism Edge Fade & Lighting Mask */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/50 to-white/95" />
    </div>
  );
}
