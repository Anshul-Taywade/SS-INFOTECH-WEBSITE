import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Layers, ExternalLink, Sparkles } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Enterprise ERP & Analytics Platform',
    category: 'Cloud & SaaS',
    tags: ['React', 'Next.js', 'Node.js', 'MongoDB'],
    desc: 'Custom enterprise resource planning solution with real-time financial telemetry and automated operational workflows.',
    metrics: '+140% Operational Efficiency',
    color: 'from-purple-600/10 to-indigo-600/10'
  },
  {
    id: 2,
    title: 'AI Predictive Healthcare Suite',
    category: 'AI & ML',
    tags: ['Python', 'Machine Learning', 'AWS', 'React'],
    desc: 'Intelligent diagnostic dashboard leveraging deep learning algorithms for automated patient risk assessment.',
    metrics: '99.4% Model Accuracy',
    color: 'from-fuchsia-600/10 to-purple-600/10'
  },
  {
    id: 3,
    title: 'Next-Gen FinTech Mobile App',
    category: 'Mobile App',
    tags: ['React Native', 'Node.js', 'Docker', 'AWS'],
    desc: 'High-speed crypto and fiat payment gateway with biometric authentication and instant cross-border settlement.',
    metrics: '2.5M+ Active Users',
    color: 'from-emerald-600/10 to-purple-600/10'
  },
  {
    id: 4,
    title: 'Omnichannel E-Commerce Cloud',
    category: 'Web App',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
    desc: 'Scalable multi-tenant e-commerce platform handling millions of requests with sub-100ms page load speeds.',
    metrics: '400k+ Monthly Orders',
    color: 'from-pink-600/10 to-purple-600/10'
  }
];

const categories = ['All', 'Web App', 'Cloud & SaaS', 'AI & ML', 'Mobile App'];

export default function PortfolioProjects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" className="relative py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-16 w-full max-w-[1400px] mx-auto">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-600/15 dark:bg-purple-600/25 blur-[160px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-300/60 dark:border-purple-800 text-purple-900 dark:text-purple-300 text-xs font-extrabold uppercase tracking-wider font-jakarta"
        >
          <Sparkles size={14} className="text-purple-600 dark:text-purple-400" />
          <span>Case Studies &amp; Showcase</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-outfit"
        >
          Featured <span className="gradient-accent">Portfolio &amp; Projects</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-medium font-outfit"
        >
          Explore how we help global enterprises launch high-impact digital products, cloud platforms, and intelligent AI applications.
        </motion.p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12 font-jakarta">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all duration-300 cursor-pointer ${
              activeFilter === cat
                ? 'bg-gradient-to-r from-purple-800 via-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-600/35 scale-105'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-slate-800 border border-purple-200/80 dark:border-slate-800 shadow-sm'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Projects */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4 }}
              className="group glass-card rounded-3xl p-8 border border-purple-200/80 dark:border-slate-800 hover:border-purple-400 bg-white/80 dark:bg-slate-900/80 transition-all duration-500 flex flex-col justify-between relative overflow-hidden shadow-xl"
            >
              {/* Background gradient card glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />

              <div>
                {/* Top Badge & Metric */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-6 font-jakarta">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-300/40">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-300/40">
                    {project.metrics}
                  </span>
                </div>

                {/* Title */}
                <Link to="/solutions" className="block cursor-pointer">
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex items-center justify-between gap-2 font-outfit">
                    <span>{project.title}</span>
                    <ArrowUpRight size={20} className="text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
                  </h3>
                </Link>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 font-medium font-outfit">
                  {project.desc}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-6 border-t border-purple-100 dark:border-slate-800 font-jakarta">
                {project.tags.map((t, idx) => (
                  <span key={idx} className="text-[11px] font-bold text-purple-800 dark:text-purple-300 bg-purple-50 dark:bg-slate-800 px-3 py-1 rounded-lg border border-purple-200/60 dark:border-slate-700">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}


