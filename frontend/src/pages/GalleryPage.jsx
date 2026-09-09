import { useState, useEffect } from 'react';
import CTABanner from '@/components/CTABanner';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, X, ChevronLeft, ChevronRight, Filter, 
  Building2, Users, Award, Calendar, Sparkles, Image as ImageIcon 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { REAL_COMPANY_GALLERY_ITEMS } from '@/components/galleryData';

const categories = [
  'All',
  'Cultural & Celebrations',
  'Company Events',
  'Training & Workshops',
  'Office Environment',
  'Team Activities'
];

export default function GalleryPage() {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('ss_gallery_items');
      return saved ? JSON.parse(saved) : REAL_COMPANY_GALLERY_ITEMS;
    } catch (e) {
      return REAL_COMPANY_GALLERY_ITEMS;
    }
  });

  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const saved = localStorage.getItem('ss_gallery_items');
        if (saved) setItems(JSON.parse(saved));
      } catch (e) {}
    };

    window.addEventListener('ss_gallery_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('ss_gallery_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter(item => item.category === activeCategory);

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  return (
    <main className="min-h-screen w-full overflow-x-hidden flex flex-col bg-bg text-text font-sans selection:bg-primary selection:text-white transition-colors duration-300">
      {/* Gallery Header Banner */}
      <section className="relative pt-36 pb-16 px-4 sm:px-6 md:px-12 lg:px-16 w-full max-w-[1400px] mx-auto overflow-hidden text-center">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 blur-[160px] rounded-full pointer-events-none -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-300/60 dark:border-purple-800 text-purple-900 dark:text-purple-300 text-xs font-extrabold uppercase tracking-wider font-jakarta mb-4"
        >
          <Camera size={14} className="text-purple-600 dark:text-purple-400" />
          <span>Life at SS Infotech</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight font-outfit max-w-4xl mx-auto leading-tight"
        >
          Corporate <span className="gradient-accent">Gallery &amp; Culture</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-2xl mx-auto mt-6 font-medium leading-relaxed font-outfit"
        >
          Explore our real office environment, live tech seminars, engineering workshops, corporate leadership, and company milestones.
        </motion.p>
      </section>

      {/* Category Filter Tabs */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-16 w-full max-w-[1400px] mx-auto mb-12">
        <div className="flex flex-wrap justify-center gap-2.5 font-jakarta">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setLightboxIndex(null);
              }}
              className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 scale-105'
                  : 'bg-white dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-950/60 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Photo Grid */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-16 w-full max-w-[1400px] mx-auto mb-20 flex-grow">
        <motion.div 
          layout
          className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setLightboxIndex(idx)}
                className="break-inside-avoid relative rounded-3xl overflow-hidden glass-card cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200 dark:border-slate-800"
              >
                <div className="relative overflow-hidden w-full bg-slate-900">
                  <img
                    src={item.imgSrc}
                    alt={item.title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-purple-900/80 text-purple-200 border border-purple-700/60 backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 font-jakarta">
                    <h3 className="text-white font-black text-lg font-outfit leading-snug">{item.title}</h3>
                    <p className="text-slate-300 text-xs mt-1.5 line-clamp-2">{item.caption}</p>
                    <div className="flex items-center justify-between mt-4 text-[11px] font-bold text-purple-300 pt-3 border-t border-white/10">
                      <span>{item.location || 'SS Infotech'}</span>
                      <span>{item.date || '2024'}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <ChevronRight size={28} />
            </button>

            {/* Image Container */}
            <div className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center space-y-4">
              <img
                src={activeItem.imgSrc}
                alt={activeItem.title}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
              />

              <div className="text-center max-w-2xl font-jakarta space-y-2">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-purple-600/30 text-purple-300 border border-purple-500/30">
                  {activeItem.category}
                </span>
                <h2 className="text-xl md:text-2xl font-black text-white font-outfit">{activeItem.title}</h2>
                <p className="text-slate-300 text-xs md:text-sm">{activeItem.caption}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 w-full">
        <CTABanner />
      </div>
    </main>
  );
}
