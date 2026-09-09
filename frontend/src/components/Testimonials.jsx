import { motion } from 'framer-motion';
import { Quote, Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';

const testimonials = [
  { 
    name: 'Amit Verma', 
    title: 'CEO, Tech Solutions', 
    quote: 'SS Infotech delivered an outstanding enterprise solution that surpassed our benchmarks. Their engineering team is exceptionally disciplined and responsive.',
    rating: 5,
    company: 'Tech Solutions'
  },
  { 
    name: 'Neha Sharma', 
    title: 'Digital Lead, Genpact', 
    quote: 'Seamless collaboration with SS Infotech. They grasped our complex business requirements quickly and executed ahead of schedule.',
    rating: 5,
    company: 'Genpact'
  },
  { 
    name: 'Rahul Khanna', 
    title: 'Founder, InnovateHub', 
    quote: 'The SS Infotech engineering team is innovative, agile, and deeply committed to quality. Highly recommended for enterprise scale digital solutions.',
    rating: 5,
    company: 'InnovateHub'
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-16 w-full max-w-[1400px] mx-auto">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-purple-600/15 dark:bg-purple-600/25 blur-[170px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-300/60 dark:border-purple-800 text-purple-900 dark:text-purple-300 text-xs font-extrabold uppercase tracking-wider font-jakarta"
        >
          <MessageSquareQuote size={14} className="text-purple-600 dark:text-purple-400" />
          <span>Client Testimonials</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-outfit"
        >
          What Our <span className="gradient-accent">Clients Say</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-medium font-outfit"
        >
          Discover why technology leaders trust SS Infotech to engineer resilient software and accelerate digital innovation.
        </motion.p>
      </div>
      
      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            whileHover={{ y: -8 }}
            className="group glass-card rounded-3xl p-8 relative flex flex-col justify-between border border-purple-200/80 dark:border-slate-800 hover:border-purple-400 bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-800 transition-all duration-500 shadow-xl"
          >
            {/* Background Quote Mark Glow */}
            <div className="absolute top-6 right-6 text-purple-300/20 dark:text-purple-700/20 group-hover:text-purple-500/30 transition-colors pointer-events-none">
              <Quote size={56} />
            </div>

            <div>
              {/* Star Rating */}
              <div className="flex gap-1 text-amber-400 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              {/* Quote Content */}
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-8 relative z-10 font-medium italic font-outfit">
                "{t.quote}"
              </p>
            </div>

            {/* Avatar & Author Info */}
            <div className="flex items-center gap-4 pt-6 border-t border-purple-100 dark:border-slate-800 relative z-10 font-jakarta">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-fuchsia-600 p-[1.5px] shadow-md">
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center font-extrabold text-purple-600 dark:text-purple-400 text-base border border-purple-100 dark:border-slate-700">
                  {t.name.charAt(0)}
                </div>
              </div>

              <div className="flex flex-col">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-1.5 font-outfit">
                  <span>{t.name}</span>
                  <CheckCircle2 size={14} className="text-purple-600 dark:text-purple-400" />
                </h4>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                  {t.title}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

