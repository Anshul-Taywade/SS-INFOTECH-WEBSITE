import PortfolioProjects from '@/components/PortfolioProjects';
import Testimonials from '@/components/Testimonials';
import CTABanner from '@/components/CTABanner';
import { motion } from 'framer-motion';
import { Sparkles, Code, CheckCircle2, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SolutionsPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden flex flex-col bg-bg text-text font-sans selection:bg-primary selection:text-white transition-colors duration-300">
      {/* Solutions Header Hero Card */}
      <section className="relative isolate mx-auto mt-6 mb-4 w-full max-w-[1440px] overflow-hidden rounded-[2.5rem] border border-purple-100/80 dark:border-slate-800/80 bg-gradient-to-b from-[#fbf8ff] via-[#f8f3ff] to-[#fdfbff] dark:from-[#0b0f19] dark:via-[#111827] dark:to-[#070a12] px-6 py-14 sm:px-12 md:py-20 text-center shadow-lg shadow-purple-900/5 transition-colors duration-500">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 dark:bg-purple-600/25 blur-[160px] rounded-full pointer-events-none -z-10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-purple-950/80 border border-purple-200/90 dark:border-purple-800 text-purple-950 dark:text-purple-300 text-xs font-extrabold uppercase tracking-wider font-jakarta mb-4 shadow-sm backdrop-blur-md"
        >
          <Rocket size={14} className="text-purple-600 dark:text-purple-400" />
          <span>Case Studies &amp; Industry Solutions</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight font-outfit max-w-4xl mx-auto leading-tight"
        >
          Enterprise Solutions &amp; <span className="gradient-accent">Case Studies</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-2xl mx-auto mt-6 font-medium leading-relaxed font-outfit"
        >
          Discover how SS Infotech engineers scalable cloud applications, mobile ecosystems, and custom AI products for enterprise clients.
        </motion.p>
      </section>

      {/* Main Portfolio & Solutions Component */}
      <PortfolioProjects hideHeader={true} />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 w-full">
        <CTABanner />
      </div>

      </main>
  );
}
