import { motion } from 'framer-motion';
import { Users, Clock, ShieldCheck, Headphones, Award } from 'lucide-react';

const features = [
  { 
    title: 'Experienced Team', 
    desc: 'Skilled software engineers and architects with years of domain experience delivering mission-critical applications.', 
    icon: Users,
    glow: 'from-purple-500/20 to-indigo-500/0'
  }, 
  { 
    title: 'On Time Delivery', 
    desc: 'Agile sprint milestones ensure high transparency, predictable velocity, and on-schedule product deployment.', 
    icon: Clock,
    glow: 'from-fuchsia-500/20 to-purple-500/0'
  }, 
  { 
    title: 'Quality Assurance', 
    desc: 'Rigorous automated testing, performance benchmarking, and bank-grade security protocols in every build.', 
    icon: ShieldCheck,
    glow: 'from-emerald-500/20 to-teal-500/0'
  }, 
  { 
    title: '24/7 Support', 
    desc: 'Proactive application monitoring, incident response, and continuous cloud optimization for uninterrupted uptime.', 
    icon: Headphones,
    glow: 'from-pink-500/20 to-rose-500/0'
  }
];

export default function WhyChooseUs() { 
  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-16 w-full max-w-[1400px] mx-auto">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-purple-600/15 dark:bg-purple-600/25 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-300/60 dark:border-purple-800 text-purple-900 dark:text-purple-300 text-xs font-extrabold uppercase tracking-wider font-jakarta"
        >
          <Award size={14} className="text-purple-600 dark:text-purple-400" />
          <span>Why Partner With Us</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-outfit"
        >
          Why Choose <span className="gradient-accent">SS Infotech</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-medium font-outfit"
        >
          We combine technical innovation with dedicated execution to build software that scales your enterprise.
        </motion.p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: i * 0.1, duration: 0.5 }} 
            whileHover={{ y: -8 }} 
            className="group glass-card rounded-3xl p-8 border border-purple-200/80 dark:border-slate-800 hover:border-purple-400 bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-800 transition-all duration-500 flex flex-col items-start relative overflow-hidden shadow-xl"
          >
            {/* Hover subtle radial light */}
            <div className={`absolute -top-10 -right-10 w-36 h-36 bg-gradient-to-br ${f.glow} blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

            <div className="p-4 rounded-2xl bg-purple-100 dark:bg-slate-800 border border-purple-200 dark:border-slate-700 text-purple-600 dark:text-purple-300 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-fuchsia-600 group-hover:text-white transition-all duration-300 mb-6 shadow-sm">
              <f.icon size={28} strokeWidth={1.8} />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors font-outfit">
              {f.title}
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium font-outfit">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  ); 
}