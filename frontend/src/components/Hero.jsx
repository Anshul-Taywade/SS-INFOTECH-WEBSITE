import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const capabilities = [
  { tag: 'Cloud Architecture' },
  { tag: 'Custom SaaS' },
  { tag: 'Predictive AI' },
  { tag: 'Mobile Ecosystems' },
];

const stats = [
  { label: 'Years Experience', value: '10+' },
  { label: 'Projects Delivered', value: '250+' },
  { label: 'Expert Engineers', value: '50+' },
  { label: 'Satisfaction Rate', value: '98%' },
];

export default function Hero() {
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="relative isolate mx-auto my-3 w-full max-w-[1440px] overflow-hidden rounded-[2.5rem] border border-purple-100/80 dark:border-slate-800/80 bg-gradient-to-b from-[#fbf8ff] via-[#f8f3ff] to-[#fdfbff] dark:from-[#0b0f19] dark:via-[#111827] dark:to-[#070a12] px-4 py-16 shadow-[0_20px_50px_-15px_rgba(147,51,234,0.08)] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] sm:px-8 md:min-h-[720px] md:px-12 md:py-20 transition-colors duration-500">
      
      {/* 1. Full-Cover Auto-Playing Background Video */}
      {!videoError && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/img/hero-mockup.png"
          onLoadedData={() => setVideoReady(true)}
          onError={() => setVideoError(true)}
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
            videoReady ? 'opacity-85 dark:opacity-85' : 'opacity-0'
          }`}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          <source src="/videos/hero1.mp4" type="video/mp4" />
        </video>
      )}

      {/* 2. Sleek Contrast Overlay Layer */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-slate-900/15 via-transparent to-slate-900/25 dark:from-[#0b0f19]/70 dark:via-[#111827]/50 dark:to-[#070a12]/80 transition-colors duration-500" 
        aria-hidden="true"
      />

      {/* 3. Tech Grid Pattern & Subtle Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20 dark:opacity-20 [background-image:linear-gradient(rgba(147,51,234,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.08)_1px,transparent_1px)] dark:[background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:36px_36px]" />

      {/* 4. Content Container */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        
        {/* ISO Badge Pill */}
        <motion.div 
          initial={{ opacity: 0, y: -12 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.45 }} 
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-purple-200/90 dark:border-purple-800/80 bg-white/90 dark:bg-purple-950/80 px-5 py-2 shadow-sm backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-purple-600 dark:bg-purple-400 animate-pulse" />
            <span className="font-jakarta text-[11px] font-extrabold uppercase tracking-wider text-purple-950 dark:text-purple-200">
              ISO 9001:2015 CERTIFIED IT RESEARCH &amp; ENTERPRISE FIRM
            </span>
          </div>
        </motion.div>

        {/* Main Headline (Solid Non-Shiny Typography) */}
        <motion.div 
          initial={{ opacity: 0, y: 18 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.55, delay: 0.08 }} 
          className="w-full px-2 sm:px-6"
        >
          <h1 className="font-outfit text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-950 dark:text-white sm:text-5xl md:text-6xl xl:text-7xl drop-shadow-md [text-shadow:_0_1px_6px_rgba(255,255,255,0.95),_0_0_15px_rgba(255,255,255,0.85)] dark:[text-shadow:_0_3px_18px_rgba(0,0,0,0.95)]">
            Empowering Digital{' '}
            <span className="mt-1 block text-slate-950 dark:text-white font-black">
              Enterprise Engineering &amp; AI
            </span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl font-outfit text-base font-extrabold leading-relaxed text-slate-950 dark:text-slate-100 sm:text-lg md:text-xl drop-shadow-md [text-shadow:_0_1px_6px_rgba(255,255,255,0.95),_0_0_12px_rgba(255,255,255,0.85)] dark:[text-shadow:_0_2px_12px_rgba(0,0,0,0.9)]">
            SS Infotech partners with global organizations to architect resilient cloud platforms, custom SaaS products, and intelligent AI ecosystems engineered for scale.
          </p>

          {/* Capabilities Tags (4 Pills) */}
          <div className="mt-9 flex flex-wrap justify-center gap-3 font-jakarta">
            {capabilities.map(({ tag }) => (
              <span key={tag} className="inline-flex items-center gap-2 rounded-2xl border border-purple-200/90 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 px-4 py-2.5 text-xs font-extrabold text-purple-950 dark:text-purple-200 shadow-sm backdrop-blur-md transition-transform hover:scale-[1.02]">
                <CheckCircle2 size={15} className="text-purple-600 dark:text-purple-400" />
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons (2 Buttons Only) */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            
            <Link
              to="/services"
              className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-purple-700 via-purple-600 to-fuchsia-600 px-8 py-4 font-jakarta text-xs font-extrabold uppercase tracking-wider text-white shadow-xl shadow-purple-600/30 transition hover:scale-[1.03] active:scale-[0.98]"
            >
              EXPLORE CAPABILITIES <ArrowRight size={16} />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 rounded-full border border-purple-200/90 dark:border-slate-700 bg-white/90 dark:bg-slate-800 px-8 py-4 font-jakarta text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white shadow-md shadow-purple-900/5 dark:shadow-none transition hover:bg-white dark:hover:bg-slate-700 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              <Play size={14} className="fill-purple-600 text-purple-600 dark:fill-purple-400 dark:text-purple-400" />
              GET CONSULTATION
            </Link>

          </div>
        </motion.div>

        {/* Thin Divider Line */}
        <div className="my-10 w-full max-w-4xl border-t border-purple-200/60 dark:border-slate-800" />

        {/* Stats Grid (4 Items) */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.55, delay: 0.18 }} 
          className="grid w-full max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4 font-outfit"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center rounded-2xl bg-white/85 dark:bg-slate-900/50 p-4 border border-purple-100/90 dark:border-slate-800/50 backdrop-blur-md shadow-sm">
              <div className="text-3xl font-black text-purple-700 dark:text-purple-400 sm:text-4xl">{stat.value}</div>
              <div className="mt-1 font-jakarta text-xs font-bold text-slate-700 dark:text-slate-300">{stat.label}</div>
            </div>
          ))}
        </motion.div>

      </div>

    </section>
  );
}
