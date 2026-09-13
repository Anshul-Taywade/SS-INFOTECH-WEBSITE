import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { REAL_HUMAN_VIDEOS } from './BrandShowcaseVideoModal';

export default function HeroVideoBackground({ selectedVideoId = 'real-people-corridor' }) {
  const { isDark } = useTheme();
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const currentVideo = REAL_HUMAN_VIDEOS.find(v => v.id === selectedVideoId) || REAL_HUMAN_VIDEOS[0];

  useEffect(() => {
    setVideoReady(false);
    setVideoError(false);
  }, [selectedVideoId]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden" aria-hidden="true">
      
      {/* Deep Rich Space Background Gradient Fallback */}
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#1e1b4b_0%,#0f172a_60%,#030712_100%)] transition-opacity duration-700 ${videoReady ? 'opacity-20' : 'opacity-100'}`} />

      {/* 100% PURE REAL HUMAN CORPORATE VIDEO FOOTAGE STREAM */}
      {!videoError && (
        <video
          key={currentVideo.id}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setVideoReady(true)}
          onError={() => setVideoError(true)}
          className={`absolute inset-0 h-full w-full scale-105 object-cover object-center transition-opacity duration-1000 ${
            videoReady ? 'opacity-55' : 'opacity-0'
          }`}
        >
          <source src={currentVideo.videoUrl} type="video/mp4" />
        </video>
      )}

      {/* Clean Professional Glassmorphism & Theme Lighting Overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(3,7,18,0.68)_0%,rgba(15,23,42,0.38)_48%,rgba(88,28,135,0.24)_100%)]" />
      <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px]" />
      
      <div className={`absolute inset-0 transition-colors duration-500 ${isDark ? 'bg-slate-950/25' : 'bg-slate-950/15'}`} />
      <div className={`absolute inset-0 transition-all duration-500 ${isDark ? 'bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/90' : 'bg-gradient-to-b from-white/10 via-transparent to-slate-950/35'}`} />

      <div className="absolute -right-36 top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full border border-cyan-400/20 shadow-[0_0_140px_40px_rgba(34,211,238,0.18)] animate-pulse" />
      <div className="absolute -left-36 bottom-10 h-[30rem] w-[30rem] rounded-full border border-purple-500/20 shadow-[0_0_120px_36px_rgba(168,85,247,0.18)]" />
    </div>
  );
}
