import { motion } from 'framer-motion';
import { ArrowRight, Rocket, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTABanner() {
  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 bg-gradient-to-r from-purple-100/90 via-purple-50 to-fuchsia-100/90 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-950 border border-purple-200/80 dark:border-slate-800 shadow-2xl text-slate-900 dark:text-white overflow-hidden font-outfit transition-colors duration-300"
    >
      {/* Background ambient lighting */}
      <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-purple-300/30 dark:bg-purple-600/20 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-fuchsia-300/30 dark:bg-fuchsia-600/20 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Decorative Rocket background watermark */}
      <motion.div 
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-6 -bottom-6 text-purple-900/10 dark:text-purple-400/10 pointer-events-none hidden lg:block"
      >
        <Rocket size={220} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 space-y-4 text-center lg:text-left max-w-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-200/80 dark:bg-purple-950/80 border border-purple-300 dark:border-purple-800 text-purple-950 dark:text-purple-200 text-xs font-extrabold uppercase tracking-wider font-jakarta shadow-sm">
          <Sparkles size={14} className="text-purple-700 dark:text-purple-400" />
          <span>Launch Your Project</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Ready to Engineer Your <br />
          <span className="text-purple-700 dark:text-purple-400">Next Digital Advantage?</span>
        </h2>

        <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed font-bold">
          Partner with SS Infotech to transform your software vision into a high-performance digital product.
        </p>
      </div>

      {/* Action CTA Button */}
      <div className="relative z-10 flex-shrink-0 font-jakarta">
        <Link 
          to="/contact"
          className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-800 via-purple-700 to-fuchsia-600 hover:opacity-95 text-white font-extrabold text-xs tracking-wider uppercase flex items-center gap-3 shadow-xl shadow-purple-600/35 hover:scale-105 active:scale-95 transition-all group cursor-pointer"
        >
          <span>Get Free Consultation</span>
          <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform text-white" />
        </Link>
      </div>
    </motion.section>
  );
}


