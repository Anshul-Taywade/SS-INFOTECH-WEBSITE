import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import Services from '@/components/Services';
import TechStack from '@/components/TechStack';
import TrustedBy from '@/components/TrustedBy';
import WhyChooseUs from '@/components/WhyChooseUs';
import ProcessWorkflow from '@/components/ProcessWorkflow';
import PortfolioProjects from '@/components/PortfolioProjects';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/ContactSection';
import { Link } from 'react-router-dom';
import { Camera, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden flex flex-col bg-bg text-text font-sans selection:bg-primary selection:text-white transition-colors duration-300">
      {/* Section 1: Navbar */}
      {/* Section 2: Hero */}
      <Hero />

      {/* Section 3: About Us (Right below Hero) */}
      <AboutSection />

      {/* Section 4: Client Marquee */}
      <TrustedBy />

      {/* Section 5: Enterprise Capabilities Grid */}
      <Services />

      {/* Section 5: Industries & Solutions Case Studies */}
      <PortfolioProjects />

      {/* Section 6: Tech Ecosystem Matrix */}
      <TechStack />

      {/* Section 8: Why Choose Us / Enterprise Pillars */}
      <WhyChooseUs />

      {/* Section 9: 4-Step Agile Execution Workflow */}
      <ProcessWorkflow />

      {/* Section 10: Client Testimonials */}
      <Testimonials />

      {/* Section 10: Corporate Gallery Preview */}
      <section className="py-20 px-4 sm:px-6 md:px-12 lg:px-16 w-full max-w-[1400px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 sm:p-12 rounded-3xl border border-purple-200/80 dark:border-slate-800 bg-gradient-to-r from-purple-900/90 via-purple-800/90 to-fuchsia-900/90 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-extrabold font-jakarta uppercase">
              <Camera size={14} />
              <span>Life &amp; Culture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-outfit text-white">
              Explore Our Corporate Gallery
            </h2>
            <p className="text-purple-100 text-sm font-medium font-outfit leading-relaxed">
              Take a visual tour of our R&amp;D workstations, engineering summits, team workshops, and company celebrations.
            </p>
          </div>

          <Link
            to="/gallery"
            className="px-8 py-3.5 rounded-full bg-white hover:bg-purple-50 text-purple-950 font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-xl shadow-purple-950/40 hover:scale-105 transition-all cursor-pointer font-jakarta shrink-0"
          >
            <span>View Full Gallery</span>
            <ArrowRight size={16} className="text-purple-700" />
          </Link>
        </motion.div>
      </section>

      {/* Section 11: Contact */}
      <ContactSection />

      {/* Section 12: Footer */}
      </main>
  );
}