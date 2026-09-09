import Services from '@/components/Services';
import TechStack from '@/components/TechStack';
import ProcessWorkflow from '@/components/ProcessWorkflow';
import CTABanner from '@/components/CTABanner';
import { motion } from 'framer-motion';
import { Sparkles, Layers, Cpu, Code2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServicesPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden flex flex-col bg-bg text-text font-sans selection:bg-primary selection:text-white transition-colors duration-300">
      {/* Services Header Banner */}
      <section className="relative pt-36 pb-16 px-4 sm:px-6 md:px-12 lg:px-16 w-full max-w-[1400px] mx-auto overflow-hidden text-center">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 blur-[160px] rounded-full pointer-events-none -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-300/60 dark:border-purple-800 text-purple-900 dark:text-purple-300 text-xs font-extrabold uppercase tracking-wider font-jakarta mb-4"
        >
          <Layers size={14} className="text-purple-600 dark:text-purple-400" />
          <span>Enterprise Capabilities</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight font-outfit max-w-4xl mx-auto leading-tight"
        >
          Enterprise Software &amp; <span className="gradient-accent">Technology Services</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-2xl mx-auto mt-6 font-medium leading-relaxed font-outfit"
        >
          From cloud-native web architectures to intelligent predictive AI engines, we deliver end-to-end IT research and software development solutions designed for scale.
        </motion.p>
      </section>

      {/* Main Services Interactive Component */}
      <Services />

      {/* Technology Stack Matrix */}
      <TechStack />

      {/* Process & Workflow */}
      <ProcessWorkflow />

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 w-full">
        <CTABanner />
      </div>

      </main>
  );
}
