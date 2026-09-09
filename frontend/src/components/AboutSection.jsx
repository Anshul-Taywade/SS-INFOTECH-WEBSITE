import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Award, Zap, ShieldCheck, Target } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-16 w-full max-w-[1400px] mx-auto">
      {/* Background glow spot */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[450px] h-[450px] bg-purple-600/15 dark:bg-purple-600/25 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Modern Interactive Visual & Badge */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative w-full h-[380px] md:h-[480px] rounded-3xl overflow-hidden glass-card p-6 md:p-8 border border-purple-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 shadow-2xl flex flex-col justify-between group"
        >
          {/* Visual Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-transparent to-fuchsia-100/30 dark:from-purple-950/40 dark:to-slate-900 -z-10" />
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

          {/* Top Bar inside visual */}
          <div className="flex items-center justify-between border-b border-purple-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-300">
                <Award size={20} />
              </div>
              <span className="text-sm font-extrabold text-slate-900 dark:text-white tracking-wide font-outfit">Enterprise Engineering</span>
            </div>
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-300/40">
              ISO Certified Firm
            </span>
          </div>

          {/* Center Visual Mock Graphic */}
          <div className="my-auto space-y-4 max-w-md mx-auto w-full">
            <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-purple-100 dark:border-slate-700 shadow-md space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono text-slate-800 dark:text-slate-200">
                <span className="text-purple-600 dark:text-purple-400 font-bold">System Reliability</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">99.99%</span>
              </div>
              <div className="w-full bg-purple-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '99%' }}
                  transition={{ duration: 1.4, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-purple-600 via-purple-500 to-fuchsia-500 rounded-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-jakarta">
              <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-purple-100 dark:border-slate-700 flex items-center gap-2.5 text-slate-800 dark:text-slate-200 font-bold shadow-sm">
                <Zap size={16} className="text-amber-500 shrink-0" />
                <span>Rapid Deployment</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-purple-100 dark:border-slate-700 flex items-center gap-2.5 text-slate-800 dark:text-slate-200 font-bold shadow-sm">
                <ShieldCheck size={16} className="text-purple-600 dark:text-purple-400 shrink-0" />
                <span>Bank-grade Security</span>
              </div>
            </div>
          </div>

          {/* 10+ Years Floating Badge */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="absolute bottom-6 right-6 glass-card p-4 sm:p-5 rounded-2xl border border-purple-200 dark:border-slate-700 shadow-2xl flex items-center gap-3.5 bg-white/95 dark:bg-slate-900/95"
          >
            <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500 leading-none font-outfit">
              10+
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-extrabold text-slate-900 dark:text-white tracking-wider font-outfit">YEARS OF</span>
              <span className="text-[10px] font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-widest font-jakarta">EXCELLENCE</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Text Content & Stats */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-300/60 dark:border-purple-800 text-purple-900 dark:text-purple-300 text-xs font-extrabold uppercase tracking-wider font-jakarta">
              <Target size={14} className="text-purple-600 dark:text-purple-400" />
              <span>Who We Are</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight font-outfit">
              About <span className="gradient-accent">SS Infotech</span>
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-medium font-outfit">
              SS Infotech is a premier IT research and products development firm delivering enterprise-grade software solutions. We transform vision into impactful, resilient digital products through creative design and engineering rigor.
            </p>
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Years of Experience', val: '10+' },
              { label: 'Projects Completed', val: '250+' },
              { label: 'Expert Engineers', val: '50+' },
              { label: 'Client Satisfaction', val: '98%' }
            ].map((stat, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl p-5 border border-purple-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 flex flex-col justify-center shadow-md hover:border-purple-400"
              >
                <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500 font-outfit">
                  {stat.val}
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-bold mt-1 font-jakarta">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          <div>
            <Link 
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-800 via-purple-600 to-fuchsia-600 hover:opacity-95 text-white text-xs font-extrabold tracking-wider uppercase shadow-xl shadow-purple-600/35 transition-all hover:scale-105 cursor-pointer"
            >
              <span>Explore Corporate Profile</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

