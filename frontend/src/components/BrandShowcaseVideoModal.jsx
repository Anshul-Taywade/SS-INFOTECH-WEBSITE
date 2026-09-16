import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, 
  Users, Sparkles, Activity, Radio, Film, Check, ShieldCheck, ArrowRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// 100% REAL HUMAN FOOTAGE COLLECTION + WALK & DRIVE PRESETS
export const REAL_HUMAN_VIDEOS = [
  {
    id: 'tech-city-drive',
    title: 'POV Night City Highway Drive',
    subtitle: 'High-definition first-person POV drive through illuminated modern smart city skyscrapers & neon highway traffic',
    category: 'POV City Drive',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-car-driving-through-the-city-at-night-41548-large.mp4',
    badge: 'POV Drive HD',
    accentColor: '#3b82f6', // Blue
  },
  {
    id: 'neon-tunnel-drive',
    title: 'Futuristic Neon Cyber Tunnel Speed Drive',
    subtitle: 'High-speed POV tunnel drive with glowing neon reflections and cyber light beams',
    category: 'Neon Speed Drive',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-driving-in-a-tunnel-with-glowing-neon-lights-41540-large.mp4',
    badge: 'Tunnel Drive HD',
    accentColor: '#ec4899', // Pink
  },
  {
    id: 'real-people-corridor',
    title: 'Real Corporate IT Team Corridor Walk',
    subtitle: '100% Real human footage of software engineers & enterprise leaders walking down modern tech corridor',
    category: 'Real IT Team Walk',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-business-people-walking-in-a-futuristic-building-41555-large.mp4',
    badge: 'Corridor Walk HD',
    accentColor: '#8b5cf6', // Violet
  },
  {
    id: 'real-tech-hallway',
    title: 'Real Tech Executives Glass Hallway Walk',
    subtitle: '100% Real human footage of tech leaders walking towards enterprise boardroom',
    category: 'Executive Walk',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-businessmen-walking-down-the-hall-of-a-building-41552-large.mp4',
    badge: 'Hallway Walk HD',
    accentColor: '#06b6d4', // Cyan
  },
  {
    id: 'real-team-collaboration',
    title: 'Real Software Engineers Collaborating & Walking',
    subtitle: '100% Real human footage of IT developers & project managers walking and working together',
    category: 'Developer Workspace Walk',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-group-of-young-people-working-together-in-an-office-41558-large.mp4',
    badge: 'Office Walk HD',
    accentColor: '#d946ef', // Fuchsia
  },
  {
    id: 'real-futuristic-walk',
    title: 'Cyber Portal Walkthrough',
    subtitle: '100% Real human footage of tech strategist walking towards digital transformation screen',
    category: 'Cyber Portal Walk',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-walking-through-a-futuristic-corridor-41549-large.mp4',
    badge: 'Portal Walk HD',
    accentColor: '#10b981', // Emerald
  }
];

const CHAPTERS = [
  { id: 0, timestamp: 0, title: '01. Walk & Drive Experience', desc: 'First-person perspective walking & driving through modern tech infrastructure' },
  { id: 1, timestamp: 10, title: '02. Engineering Excellence', desc: 'Expert software developers building resilient cloud platforms' },
  { id: 2, timestamp: 22, title: '03. Enterprise Collaboration', desc: 'Clear communication & agile cross-functional delivery' },
  { id: 3, timestamp: 32, title: '04. Global Delivery', desc: 'ISO 9001:2015 certified IT research & development' }
];

export default function BrandShowcaseVideoModal({ isOpen, onClose, selectedVideoId, onSelectVideo }) {
  const { isDark } = useTheme();
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const duration = 40;
  const [isMuted, setIsMuted] = useState(true);
  const [showHUD, setShowHUD] = useState(true);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [videoError, setVideoError] = useState(false);

  const videoRef = useRef(null);
  const modalContainerRef = useRef(null);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    if (selectedVideoId) {
      const idx = REAL_HUMAN_VIDEOS.findIndex(v => v.id === selectedVideoId);
      if (idx !== -1) setActiveVideoIndex(idx);
    }
  }, [selectedVideoId]);

  const activeVideo = REAL_HUMAN_VIDEOS[activeVideoIndex];

  useEffect(() => {
    let interval;
    if (isOpen && isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const next = prev + 0.1;
          if (next >= duration) return 0;
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlaying, duration]);

  useEffect(() => {
    if (currentTime < 10) setActiveChapterIndex(0);
    else if (currentTime < 22) setActiveChapterIndex(1);
    else if (currentTime < 32) setActiveChapterIndex(2);
    else setActiveChapterIndex(3);
  }, [currentTime]);

  const toggleSound = () => {
    if (!isMuted) {
      setIsMuted(true);
      if (audioCtxRef.current) audioCtxRef.current.suspend();
    } else {
      setIsMuted(false);
      try {
        if (!audioCtxRef.current) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          audioCtxRef.current = new AudioContext();
          const osc = audioCtxRef.current.createOscillator();
          const gain = audioCtxRef.current.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(110, audioCtxRef.current.currentTime);
          gain.gain.setValueAtTime(0.06, audioCtxRef.current.currentTime);
          osc.connect(gain);
          gain.connect(audioCtxRef.current.destination);
          osc.start();
        } else {
          audioCtxRef.current.resume();
        }
      } catch (err) {
        console.warn('Audio error:', err);
      }
    }
  };

  const handleSelect = (idx) => {
    setActiveVideoIndex(idx);
    setVideoError(false);
    if (onSelectVideo) {
      onSelectVideo(REAL_HUMAN_VIDEOS[idx].id);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/94 backdrop-blur-2xl">
        
        {/* Main Window */}
        <motion.div
          ref={modalContainerRef}
          initial={{ opacity: 0, scale: 0.95, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 14 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-white/20 bg-slate-950 text-white shadow-[0_32px_96px_-16px_rgba(139,92,246,0.5)] flex flex-col max-h-[94vh]"
        >
          
          {/* Top Bar */}
          <div className="relative z-20 flex items-center justify-between px-5 py-4 border-b border-white/10 bg-slate-900/90 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-2xl bg-gradient-to-tr from-violet-600 via-blue-600 to-fuchsia-600 text-white shadow-md font-black font-outfit text-sm">
                SS
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-outfit font-black text-base text-white tracking-wide">
                    SS INFOTECH <span className="text-violet-400 font-bold text-xs uppercase ml-1">Walk &amp; Drive Video Showcase</span>
                  </h3>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <Users size={10} className="animate-pulse text-emerald-400" />
                    {activeVideo.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-jakarta font-medium line-clamp-1">
                  {activeVideo.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHUD(!showHUD)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold font-jakarta transition flex items-center gap-1.5 ${
                  showHUD ? 'bg-violet-600 text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Activity size={13} />
                <span className="hidden sm:inline">Telemetry HUD</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-violet-600/30 hover:bg-violet-600 text-white border border-violet-500/40 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Main Video Viewport */}
          <div className="relative flex-1 min-h-[360px] sm:min-h-[440px] bg-black overflow-hidden flex items-center justify-center select-none">
            
            {/* Native Stock Video Stream */}
            <video
              ref={videoRef}
              key={activeVideo.id}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              src={activeVideo.videoUrl}
              onError={() => setVideoError(true)}
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            />

            {/* Subtle Vignette Edge Fade */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(2,6,23,0.75)_100%)] pointer-events-none z-10" />

            {/* Telemetry HUD Overlay */}
            <AnimatePresence>
              {showHUD && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none z-20 p-5 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between font-mono text-[10px] text-cyan-300 uppercase">
                    <div className="flex items-center gap-3 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-emerald-500/30">
                      <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                        WALK &amp; DRIVE POV HD FOOTAGE
                      </span>
                      <span className="hidden sm:inline">FULL HD STREAM</span>
                    </div>
                    <div className="bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-violet-500/30 text-violet-300">
                      ISO 9001:2015 CERTIFIED FIRM
                    </div>
                  </div>

                  {/* Story Subtitles Overlay */}
                  <div className="w-full max-w-lg bg-slate-950/85 backdrop-blur-md border border-white/15 p-4 rounded-2xl shadow-xl">
                    <div className="flex items-center gap-2 text-xs font-bold text-violet-400 uppercase tracking-wider mb-1">
                      <Sparkles size={14} />
                      {CHAPTERS[activeChapterIndex].title}
                    </div>
                    <p className="text-sm font-outfit text-white font-semibold leading-relaxed">
                      {CHAPTERS[activeChapterIndex].desc}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Walk & Drive Selector Bar */}
          <div className="relative z-20 px-4 py-3 bg-slate-900/90 border-t border-white/10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-jakarta text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Users size={14} className="text-emerald-400" /> Choose Walk &amp; Drive Video Option ({REAL_HUMAN_VIDEOS.length} Choices):
              </span>
              <span className="text-[11px] font-medium text-emerald-300 hidden sm:inline">
                Click any walk or drive footage card below to set as your Hero Background Video
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 overflow-x-auto py-1">
              {REAL_HUMAN_VIDEOS.map((vid, idx) => {
                const isSelected = activeVideoIndex === idx;
                return (
                  <button
                    key={vid.id}
                    onClick={() => handleSelect(idx)}
                    className={`relative p-3 rounded-2xl border text-left transition flex flex-col justify-between gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-br from-blue-600/30 to-violet-600/30 border-blue-400 shadow-lg shadow-blue-600/20 ring-2 ring-blue-500'
                        : 'bg-slate-950/70 border-white/10 hover:bg-slate-800 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {vid.badge}
                      </span>
                      {isSelected && <Check size={13} className="text-blue-400 font-bold" />}
                    </div>

                    <div>
                      <div className="text-xs font-extrabold font-outfit text-white leading-snug line-clamp-1">
                        {vid.title}
                      </div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">
                        {vid.category}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timeline & Player Bar */}
          <div className="relative z-20 p-4 sm:p-5 bg-slate-950 border-t border-white/10 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-violet-300 w-10 text-right">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max={duration}
                step="0.1"
                value={currentTime}
                onChange={(e) => setCurrentTime(parseFloat(e.target.value))}
                className="w-full h-2 rounded-lg bg-slate-800 accent-emerald-500 cursor-pointer"
              />
              <span className="font-mono text-xs font-medium text-slate-400 w-10">
                {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg transition cursor-pointer"
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                </button>

                <button
                  onClick={() => setCurrentTime(0)}
                  className="h-9 w-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition cursor-pointer"
                >
                  <RotateCcw size={15} />
                </button>

                <button
                  onClick={toggleSound}
                  className={`px-3 py-2 rounded-full text-xs font-bold transition flex items-center gap-2 border cursor-pointer ${
                    !isMuted 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                      : 'bg-slate-800 text-slate-400 border-white/10 hover:bg-slate-700'
                  }`}
                >
                  {!isMuted ? <Volume2 size={15} className="text-emerald-400" /> : <VolumeX size={15} />}
                  <span>{!isMuted ? 'Audio ON' : 'Muted'}</span>
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-1.5">
                {CHAPTERS.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => setCurrentTime(ch.timestamp)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                      activeChapterIndex === ch.id 
                        ? 'bg-blue-500/25 text-blue-200 border border-blue-500/40' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {ch.title.split(' ')[1]}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
