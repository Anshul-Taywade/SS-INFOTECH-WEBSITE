import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, ArrowUpRight, ChevronRight } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

const links = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetConsultation = (e) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false);

    const scrollToForm = () => {
      const contactElem = document.getElementById('consultation-section') || document.getElementById('contact');
      if (contactElem) {
        if (window.lenis) {
          window.lenis.scrollTo(contactElem, { offset: -90, duration: 1.2 });
        } else {
          const top = contactElem.getBoundingClientRect().top + window.pageYOffset - 90;
          window.scrollTo({ top, behavior: 'smooth' });
        }
        const firstInput = contactElem.querySelector('input, textarea');
        if (firstInput) {
          setTimeout(() => firstInput.focus(), 600);
        }
      }
    };

    if (pathname === '/') {
      scrollToForm();
    } else {
      navigate('/#consultation-section');
      setTimeout(scrollToForm, 300);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top subtle glowing line accent */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-10" />

      {/* Main Navbar Bar - identical background colors to footer */}
      <div className={`px-4 sm:px-6 lg:px-10 py-3 transition-all duration-300 text-white ${
        scrolled 
          ? 'bg-gradient-to-r from-[#5B21B6] via-[#6B21A8] to-[#701A75] dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 dark:bg-slate-950 backdrop-blur-xl shadow-xl border-b border-white/10 dark:border-slate-800' 
          : 'bg-gradient-to-r from-[#5B21B6]/95 via-[#6B21A8]/95 to-[#701A75]/95 dark:from-slate-950/95 dark:via-slate-950/95 dark:to-slate-950/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-white/10 dark:border-slate-800/80 shadow-md'
      }`}>
        <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo - Original colorful logo */}
          <Link to="/" className="flex items-center group shrink-0 py-0.5 cursor-pointer">
            <div className="bg-white px-2.5 py-1 rounded-xl shadow-md border border-white/20 flex items-center transition-transform group-hover:scale-[1.03]">
              <img 
                src="/images/logos/logo.png"
                alt="SS INFOTECH - Enterprise Software Solutions" 
                className="h-8 sm:h-9 md:h-10 w-auto object-contain" 
                onError={(e) => { e.currentTarget.src = '/images/logos/logo.jpg'; }}
              />
            </div>
          </Link>

          {/* Desktop Centered Floating Capsule Navigation */}
          <div className="hidden lg:flex items-center justify-center">
            <nav className="flex items-center gap-1 bg-white/10 dark:bg-purple-950/60 border border-white/20 dark:border-purple-500/30 rounded-full p-1.5 backdrop-blur-md shadow-inner">
              {links.map((l) => {
                const isActive = pathname === l.href;
                return (
                  <Link
                    key={l.name}
                    to={l.href}
                    className={`relative px-4 py-1.5 text-xs xl:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap rounded-full ${
                      isActive 
                        ? 'text-white dark:text-purple-100 font-bold' 
                        : 'text-purple-100 dark:text-purple-300 hover:text-white dark:hover:text-purple-100 hover:bg-white/10 dark:hover:bg-purple-900/40'
                    }`}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-white/20 dark:bg-purple-800/80 rounded-full border border-white/30 dark:border-purple-500/40 shadow-sm"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{l.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Desktop Right Action Controls (Call + Get Consultation + ThemeToggle) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Call Button */}
            <a 
              href="tel:+917770023791" 
              className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 dark:border-purple-500/30 bg-white/10 dark:bg-purple-950/60 hover:bg-white/20 dark:hover:bg-purple-900/50 text-white dark:text-purple-200 text-xs font-semibold transition-all hover:border-white/30 dark:hover:border-purple-400 shadow-sm"
              title="Call Us"
            >
              <Phone size={14} className="text-purple-200 dark:text-purple-400" />
              <span>+91 77700 23791</span>
            </a>

            {/* Get Consultation White Pill CTA Button */}
            <a
              href="/#consultation-section"
              onClick={handleGetConsultation}
              className="px-5 py-2 rounded-full bg-white text-[#5B21B6] hover:bg-purple-50 font-bold text-xs xl:text-sm tracking-wide shadow-md shadow-purple-950/20 hover:shadow-lg transition-all hover:scale-105 cursor-pointer whitespace-nowrap select-none"
            >
              Get Consultation
            </a>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2.5 md:hidden">
            <a 
              href="tel:+917770023791" 
              className="p-2 border border-white/20 rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer"
              aria-label="Call Us"
            >
              <Phone size={16} />
            </a>

            <ThemeToggle />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 transition-colors border border-white/20 dark:border-slate-800 rounded-full bg-white/10 dark:bg-slate-900 text-white hover:bg-white/20 cursor-pointer"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-1.5 p-5 mx-4 mt-2 border border-white/20 dark:border-slate-800 shadow-2xl md:hidden rounded-3xl bg-gradient-to-b from-[#5B21B6]/95 to-[#701A75]/95 dark:from-slate-950/95 dark:to-slate-900/95 backdrop-blur-2xl text-white"
          >
            {links.map((l) => {
              const isActive = pathname === l.href;
              return (
                <Link
                  key={l.name}
                  to={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 text-sm font-bold transition-all rounded-full cursor-pointer ${
                    isActive 
                      ? 'bg-white/20 dark:bg-purple-900 text-white font-extrabold border border-white/30 shadow-md' 
                      : 'text-purple-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{l.name}</span>
                  <ChevronRight size={16} className={isActive ? "text-white" : "opacity-40"} />
                </Link>
              );
            })}
            
            <div className="pt-3 mt-2 border-t border-white/20 flex flex-col gap-2">
              <a 
                href="tel:+917770023791" 
                className="flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-full text-white bg-white/10 border border-white/20 cursor-pointer"
              >
                <Phone size={15} className="text-purple-200" />
                <span>Call Us: +91 77700 23791</span>
              </a>

              <button
                type="button"
                onClick={handleGetConsultation}
                className="flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-full text-[#5B21B6] bg-white hover:bg-purple-50 shadow-md cursor-pointer w-full"
              >
                <span>Get Consultation</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}