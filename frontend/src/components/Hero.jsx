import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, ShieldCheck, Rocket, Cpu, CheckCircle2, Terminal, Award, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 px-4 sm:px-6 md:px-12 lg:px-16 w-full max-w-[1400px] mx-auto overflow-hidden">
      {/* Background Ambient Radial Lights & Pattern */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-purple-600/20 via-fuchsia-600/15 to-purple-400/25 blur-[160px] rounded-full pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10" />

      {/* Top Corporate Announcement Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-6"
      >
        <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-purple-100 via-fuchsia-50 to-purple-100 dark:from-purple-950/80 dark:to-slate-900 border border-purple-300/80 dark:border-purple-800/80 px-4 py-1.5 rounded-full shadow-sm hover:border-purple-400 transition-colors">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600 dark:bg-purple-400" />
          </span>
          <span className="text-[11px] font-extrabold tracking-wider text-purple-950 dark:text-purple-200 uppercase font-jakarta">
            ISO 9001:2015 Certified IT Research &amp; Enterprise Firm
          </span>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* Left Column Content */}
        <div className="flex-1 space-y-8 text-center lg:text-left z-10">
          
          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] font-outfit"
          >
            Empowering Digital <br />
            <span className="bg-gradient-to-r from-purple-700 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent inline-block relative">
              Enterprise Engineering
            </span> &amp; AI
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium font-outfit"
          >
            SS Infotech partners with global organizations to architect resilient cloud platforms, custom SaaS products, and intelligent AI ecosystems engineered for scale.
          </motion.p>

          {/* Feature highlights pill bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-wrap justify-center lg:justify-start gap-2.5 font-jakarta"
          >
            {['Cloud Architecture', 'Custom SaaS', 'Predictive AI', 'Mobile Ecosystems'].map((tag, idx) => (
              <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50 dark:bg-slate-900 border border-purple-200/80 dark:border-slate-800 text-[11px] font-extrabold text-purple-900 dark:text-purple-300">
                <CheckCircle2 size={13} className="text-purple-600 dark:text-purple-400" />
                <span>{tag}</span>
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
          >
            <Link 
              to="/services"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-800 via-purple-600 to-fuchsia-600 hover:opacity-95 text-white font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-xl shadow-purple-600/35 hover:shadow-purple-600/55 hover:scale-[1.03] active:scale-[0.97] transition-all cursor-pointer font-jakarta"
            >
              <span>Explore Capabilities</span>
              <ArrowRight size={16} />
            </Link>

            <Link 
              to="/contact"
              className="px-8 py-4 rounded-full bg-white dark:bg-slate-900 hover:bg-purple-50 dark:hover:bg-slate-800 border border-purple-200/80 dark:border-slate-800 text-slate-900 dark:text-white font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 backdrop-blur-md transition-all shadow-md hover:border-purple-400 cursor-pointer font-jakarta"
            >
              <Play size={14} className="text-purple-600 dark:text-purple-400 fill-purple-600 dark:fill-purple-400" />
              <span>Get Consultation</span>
            </Link>
          </motion.div>

          {/* Stats Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-purple-200/60 dark:border-slate-800/80"
          >
            {[
              { label: 'Years Experience', val: '10+' },
              { label: 'Projects Delivered', val: '250+' },
              { label: 'Expert Engineers', val: '50+' },
              { label: 'Satisfaction Rate', val: '98%' }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center lg:items-start p-2">
                <span className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500 font-outfit">
                  {stat.val}
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5 font-jakarta">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Graphic Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative w-full lg:w-1/2 flex justify-center items-center"
        >
          {/* Glowing Backlight Ring */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-fuchsia-600/30 rounded-3xl blur-3xl -z-10" />

          {/* Floating SaaS Card container */}
          <div className="relative w-full max-w-[580px] rounded-3xl glass-card p-3.5 md:p-5 border border-purple-200/80 dark:border-slate-800 shadow-2xl bg-white/95 dark:bg-slate-900/95 overflow-hidden group">
            
            {/* Window Header */}
            <div className="flex items-center justify-between mb-3 px-3.5 py-2 bg-purple-50/80 dark:bg-slate-800/80 rounded-xl border border-purple-100 dark:border-slate-700 font-jakarta">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="ml-2 text-[10px] font-mono font-bold text-purple-900 dark:text-purple-300 flex items-center gap-1">
                  <Terminal size={12} />
                  <span>ssinfotech-telemetry-v2.0</span>
                </span>
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40">
                99.99% ONLINE
              </span>
            </div>

            {/* Mockup image */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-950 to-slate-900 shadow-inner">
              <img 
                src="/img/hero-mockup.png" 
                alt="SS Infotech Software Solutions Mockup" 
                width={800} 
                height={600} 
                className="w-full h-auto object-contain transform group-hover:scale-[1.02] transition-transform duration-700"
                priority 
              />
            </div>

            {/* Floating Badges */}
            <motion.div 
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-12 -left-4 glass-card px-4 py-2.5 rounded-2xl border border-purple-200 dark:border-slate-700 shadow-xl bg-white/95 dark:bg-slate-900/95 flex items-center gap-3 hidden sm:flex font-jakarta"
            >
              <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-300">
                <Rocket size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-slate-900 dark:text-white">Bank-Grade SLA</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold">99.99% Uptime</span>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-3 -right-3 glass-card px-4 py-2.5 rounded-2xl border border-purple-200 dark:border-slate-700 shadow-xl bg-white/95 dark:bg-slate-900/95 flex items-center gap-3 hidden sm:flex font-jakarta"
            >
              <div className="p-2 rounded-xl bg-fuchsia-100 dark:bg-fuchsia-900/60 text-fuchsia-600 dark:text-fuchsia-300">
                <Cpu size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-slate-900 dark:text-white">Enterprise AI Engine</span>
                <span className="text-[10px] text-purple-600 dark:text-purple-300 font-extrabold">Cloud Native Solutions</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}