import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Sparkles, Cpu, Layers, Activity, Check, Play, ShieldCheck, Zap, Video, Radio, Sliders
} from 'lucide-react';
import { VIRTUAL_BACKGROUND_PRESETS } from './VirtualHeroBackground';
import { REAL_HUMAN_VIDEOS } from './BrandShowcaseVideoModal';

export default function VirtualHeroModal({
  isOpen,
  onClose,
  activeVirtualMode,
  onSelectVirtualMode,
  selectedRealVideoId,
  onSelectRealVideo,
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-slate-950/92 backdrop-blur-2xl">
        
        {/* Main Modal Shell */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.28 }}
          className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-blue-500/30 bg-slate-950 text-white shadow-[0_32px_96px_-16px_rgba(59,130,246,0.5)] flex flex-col max-h-[92vh]"
        >
          
          {/* Top Bar Header */}
          <div className="relative z-20 flex items-center justify-between px-6 py-5 border-b border-white/10 bg-slate-900/90 backdrop-blur-md">
            <div className="flex items-center gap-3.5">
              <div className="flex items-center justify-center h-11 w-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-violet-600 to-cyan-500 text-white shadow-lg shadow-blue-600/30 font-black font-outfit text-base">
                <Video size={22} className="animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-outfit font-black text-lg text-white tracking-wide">
                    WALK &amp; DRIVE HERO VIDEO CONTROLS
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    <Sparkles size={11} className="text-blue-400 animate-pulse" />
                    HD Stream + 3D Canvas
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-jakarta font-medium">
                  Select and customize high-definition Walk &amp; Drive POV background video streams and 3D canvas visualizers
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-blue-600/30 hover:bg-blue-600 text-white border border-blue-500/40 transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            
            {/* Section 1: Walk / Drive & Virtual Canvas Presets */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-outfit text-sm font-extrabold uppercase tracking-wider text-blue-300 flex items-center gap-2">
                  <Layers size={16} /> Choose Walk, Drive or 3D Canvas Mode ({VIRTUAL_BACKGROUND_PRESETS.length} Choices):
                </h4>
                <span className="text-xs font-semibold text-slate-400">
                  Native 1080p HD Video + Interactive 3D Mesh
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {VIRTUAL_BACKGROUND_PRESETS.map((preset) => {
                  const isSelected = activeVirtualMode === preset.id;
                  const isWalkOrDrive = preset.type.includes('drive') || preset.type.includes('walk');
                  return (
                    <button
                      key={preset.id}
                      onClick={() => onSelectVirtualMode(preset.id)}
                      className={`group relative p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-br from-blue-900/60 via-purple-900/40 to-slate-950 border-blue-400 ring-2 ring-blue-500 shadow-xl shadow-blue-900/30'
                          : 'bg-slate-900/60 border-white/10 hover:bg-slate-900 hover:border-blue-400/40'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span
                          className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border"
                          style={{
                            backgroundColor: `${preset.color}20`,
                            color: preset.color,
                            borderColor: `${preset.color}40`,
                          }}
                        >
                          {isWalkOrDrive ? 'Walk & Drive HD' : '3D Virtual Canvas'}
                        </span>
                        {isSelected && (
                          <span className="flex items-center gap-1 text-xs font-extrabold text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                            <Check size={13} /> Active
                          </span>
                        )}
                      </div>

                      <div>
                        <h5 className="font-outfit text-base font-black text-white group-hover:text-blue-200 transition">
                          {preset.name}
                        </h5>
                        <p className="text-xs text-slate-300 font-jakarta mt-1 leading-relaxed">
                          {preset.tagline}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-white/10 pt-2.5 mt-1">
                        <span>{isWalkOrDrive ? 'POV Stream: HD' : '3D Parallax: ON'}</span>
                        <span className="text-blue-300 group-hover:translate-x-1 transition flex items-center gap-1">
                          Apply Video &rarr;
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Real IT Team Footage Selector */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-outfit text-sm font-extrabold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
                  <Video size={16} /> All Walk &amp; Drive Real Human Video Choices ({REAL_HUMAN_VIDEOS.length} Options):
                </h4>
                <span className="text-xs font-semibold text-emerald-400">
                  100% Real Footage (POV Walk &amp; Drive Collection)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {REAL_HUMAN_VIDEOS.map((vid) => {
                  const isSelected = selectedRealVideoId === vid.id;
                  return (
                    <button
                      key={vid.id}
                      onClick={() => {
                        onSelectRealVideo(vid.id);
                        if (activeVirtualMode !== 'real-human-stream') {
                          onSelectVirtualMode('real-human-stream');
                        }
                      }}
                      className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between gap-2 cursor-pointer ${
                        isSelected && activeVirtualMode === 'real-human-stream'
                          ? 'bg-gradient-to-br from-emerald-950/60 to-blue-950/60 border-emerald-400 ring-2 ring-emerald-500'
                          : 'bg-slate-950/70 border-white/10 hover:bg-slate-800 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {vid.badge}
                        </span>
                        {isSelected && activeVirtualMode === 'real-human-stream' && (
                          <Check size={12} className="text-emerald-400" />
                        )}
                      </div>

                      <div className="text-xs font-bold font-outfit text-white line-clamp-1">
                        {vid.title}
                      </div>

                      <div className="text-[10px] text-slate-400 font-jakarta line-clamp-1">
                        {vid.subtitle}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Features Highlight */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-purple-950/40 to-slate-950 border border-blue-500/20 text-xs font-jakarta">
              <div className="flex items-center gap-2 text-blue-200">
                <ShieldCheck size={16} className="text-cyan-400" />
                <span>Zero lag HTML5 MP4 video stream • 60 FPS • Auto-looping seamless background</span>
              </div>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 font-extrabold uppercase text-white shadow-md hover:scale-105 transition cursor-pointer"
              >
                Done &amp; Continue
              </button>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
