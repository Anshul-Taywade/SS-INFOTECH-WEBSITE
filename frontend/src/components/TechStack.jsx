import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Box, Server, Database, Brain, Coffee, BarChart3, Cloud, Container, GitBranch, Cpu } from 'lucide-react';

const technologies = [
  { name: 'React', category: 'Frontend', icon: Code2, desc: 'UI Library' },
  { name: 'Next.js', category: 'Frontend', icon: Box, desc: 'React Framework' },
  { name: 'Node.js', category: 'Backend', icon: Server, desc: 'JS Runtime' },
  { name: 'MongoDB', category: 'Database', icon: Database, desc: 'NoSQL Database' },
  { name: 'Python', category: 'Backend', icon: Brain, desc: 'AI & Data Science' },
  { name: 'Java', category: 'Backend', icon: Coffee, desc: 'Enterprise Systems' },
  { name: 'MySQL', category: 'Database', icon: BarChart3, desc: 'Relational Database' },
  { name: 'AWS', category: 'Cloud', icon: Cloud, desc: 'Cloud Infrastructure' },
  { name: 'Docker', category: 'Cloud', icon: Container, desc: 'Containerization' },
  { name: 'Git', category: 'Tools', icon: GitBranch, desc: 'Version Control' },
];

const categories = ['All', 'Frontend', 'Backend', 'Database', 'Cloud', 'Tools'];

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTech = activeCategory === 'All' 
    ? technologies 
    : technologies.filter(t => t.category === activeCategory);

  return (
    <section id="technologies" className="relative py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-16 w-full max-w-[1400px] mx-auto">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 dark:bg-purple-600/25 blur-[160px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-300/60 dark:border-purple-800 text-purple-900 dark:text-purple-300 text-xs font-extrabold uppercase tracking-wider font-jakarta"
        >
          <Cpu size={14} className="text-purple-600 dark:text-purple-400" />
          <span>Modern Tech Stack</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-outfit"
        >
          Technologies We <span className="gradient-accent">Work With</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-medium font-outfit"
        >
          We build enterprise software using high-performance, robust, and modern technology frameworks.
        </motion.p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-12 font-jakarta">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all duration-300 cursor-pointer ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-purple-800 via-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-600/35 scale-105'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-slate-800 border border-purple-200/80 dark:border-slate-800 shadow-sm'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      
      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-5xl mx-auto"
      >
        {filteredTech.map((tech) => {
          const IconComponent = tech.icon;
          if (!IconComponent) return null; 

          return (
            <motion.div 
              layout
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -6, scale: 1.04 }}
              transition={{ duration: 0.3 }}
              className="group glass-card rounded-3xl p-5 border border-purple-200/80 dark:border-slate-800 hover:border-purple-400 bg-white/80 dark:bg-slate-900/80 flex flex-col items-center justify-center gap-3 text-center transition-all shadow-md"
            >
              <div className="p-3.5 rounded-2xl bg-purple-100 dark:bg-slate-800 border border-purple-200 dark:border-slate-700 text-purple-600 dark:text-purple-400 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-fuchsia-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <IconComponent size={30} strokeWidth={1.8} />
              </div>

              <div>
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors font-outfit">
                  {tech.name}
                </h4>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold font-jakarta">
                  {tech.desc}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

