import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';

const logos = [
  { src: '/images/logos/infosys.png' },
  { src: '/images/logos/mahindra.png' },
  { src: '/images/logos/expleo.png' },
  { src: '/images/logos/genpact.png' },
  { src: '/images/logos/hcl.png' },
  { src: '/images/logos/hp.png' },
  { src: '/images/logos/mindtree.png' },
  { src: '/images/logos/3i.png' },
];

export default function TrustedBy() {
  return (
    <section className="relative w-full py-16 overflow-hidden border-y border-purple-100/60 dark:border-slate-800 bg-purple-50/40 dark:bg-slate-950/60">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 mb-8 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-widest uppercase text-purple-950 dark:text-purple-300 font-jakarta">
          <Building2 size={15} className="text-purple-600 dark:text-purple-400" />
          <span>Trusted By Global Industry Leaders</span>
        </div>
      </div>
      
      {/* Infinite marquee ticker container with edge mask fade */}
      <div className="relative flex w-full overflow-hidden mask-image-gradient">
        <motion.div
          className="flex items-center gap-6 py-2 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: 'linear',
          }}
        >
          {/* Map logos 4x to ensure smooth loop on wide screens */}
          {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
            <div 
              key={i} 
              className="glass-card rounded-2xl px-6 py-4 flex items-center justify-center gap-3 min-w-[170px] h-20 bg-white/95 dark:bg-slate-900/90 border border-purple-200/60 dark:border-slate-800 hover:border-purple-400 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 shadow-sm group"
            >
              <img 
                src={logo.src} 
                alt={logo.name} 
                className="max-w-[100px] max-h-9 object-contain opacity-70 dark:opacity-80 dark:invert-[0.1] group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span className="text-xs font-extrabold transition-colors text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 font-outfit">
                {logo.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}