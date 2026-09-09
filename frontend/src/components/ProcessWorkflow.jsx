import { motion } from 'framer-motion';
import { Search, Compass, Code, Rocket, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Discovery & Strategy',
    desc: 'In-depth requirement mapping, market analysis, and technical architecture roadmaps tailored to your goals.',
    icon: Search,
    color: 'from-purple-600 to-indigo-600'
  },
  {
    num: '02',
    title: 'UI/UX Design & Architecture',
    desc: 'Crafting user-centric design wireframes, high-fidelity prototypes, and scalable cloud system architecture.',
    icon: Compass,
    color: 'from-indigo-600 to-purple-600'
  },
  {
    num: '03',
    title: 'Agile Development & QA',
    desc: 'Sprint-driven clean code development with unit testing, security audits, and continuous integration.',
    icon: Code,
    color: 'from-purple-600 to-fuchsia-600'
  },
  {
    num: '04',
    title: 'Deployment & Growth',
    desc: 'Zero-downtime production deployment, 24/7 proactive telemetry monitoring, and iterative feature scaling.',
    icon: Rocket,
    color: 'from-emerald-500 to-purple-600'
  }
];

export default function ProcessWorkflow() {
  return (
    <section id="process" className="relative py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-16 w-full max-w-[1400px] mx-auto">
      {/* Glow background */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-purple-600/15 dark:bg-purple-600/25 blur-[160px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-300/60 dark:border-purple-800 text-purple-900 dark:text-purple-300 text-xs font-extrabold uppercase tracking-wider font-jakarta"
        >
          <CheckCircle2 size={14} className="text-purple-600 dark:text-purple-400" />
          <span>Execution Methodology</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-outfit"
        >
          Our Proven <span className="gradient-accent">Process &amp; Workflow</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-medium font-outfit"
        >
          A streamlined, transparent, and agile execution process designed to turn complex business needs into high-performing software.
        </motion.p>
      </div>

      {/* Steps Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((step, idx) => {
          const IconComp = step.icon;
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group glass-card rounded-3xl p-8 border border-purple-200/80 dark:border-slate-800 hover:border-purple-400 bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-800 transition-all duration-500 flex flex-col justify-between relative shadow-xl"
            >
              {/* Step Badge */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500">
                  {step.num}
                </span>

                <div className="p-3 rounded-2xl bg-purple-100 dark:bg-slate-800 border border-purple-200 dark:border-slate-700 text-purple-600 dark:text-purple-300 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-fuchsia-600 group-hover:text-white transition-all shadow-sm">
                  <IconComp size={24} />
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors font-outfit">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium font-outfit">
                  {step.desc}
                </p>
              </div>

              {/* Connecting indicator bar */}
              <div className="w-full h-1.5 bg-purple-100 dark:bg-slate-800 rounded-full overflow-hidden mt-6">
                <div className={`h-full bg-gradient-to-r ${step.color} w-full opacity-80 group-hover:opacity-100 transition-opacity`} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}


