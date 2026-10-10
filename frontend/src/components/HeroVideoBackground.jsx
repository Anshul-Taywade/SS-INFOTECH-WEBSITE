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
          className={`absolute inset-0 h-full w-full object-cover object-center [transform:translateZ(0)] [backface-visibility:hidden] [image-rendering:crisp-edges] [filter:contrast(112%)_brightness(106%)_saturate(108%)] transition-opacity duration-300 ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={currentVideo.videoUrl} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
