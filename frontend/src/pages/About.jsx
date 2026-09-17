import { useState, useEffect } from 'react';
import CTABanner from '@/components/CTABanner';
import TrustedBy from '@/components/TrustedBy';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Target, Eye, Heart, 
  Globe2, ArrowRight, Building2, Sparkles, Users, Mail 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '@/services/api';

const defaultTeam = [
  {
    id: 'team-1',
    name: 'Executive Director & Tech Leader',
    role: 'Executive Management',
    email: 'executive@ssinfotech.org',
    photo: '/images/gallery/ss-infotech-executive-leader.jpg',
    specialty: 'Enterprise Software Architecture & Strategy'
  },
  {
    id: 'team-2',
    name: 'Senior Software Specialist & Tech Lead',
    role: 'Engineering Lead',
    email: 'lead@ssinfotech.org',
    photo: '/images/gallery/ss-infotech-team-lead-1.jpg',
    specialty: 'Cloud Platforms & Full-Stack Development'
  }
];

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState(defaultTeam);

  useEffect(() => {
    loadTeam();

    const handleUpdate = () => loadTeam();
    window.addEventListener('ss_team_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('ss_team_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const loadTeam = async () => {
    try {
      const res = await api.getTeam();
      if (res && res.data && res.data.length > 0) {
        setTeamMembers(res.data);
      }
    } catch (e) {
      console.warn('Team fallback active');
    }
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden flex flex-col bg-bg text-text font-sans selection:bg-primary selection:text-white transition-colors duration-300">
      {/* Header Hero Card */}
      <section className="relative isolate mx-auto mt-6 mb-4 w-full max-w-[1440px] overflow-hidden rounded-[2.5rem] border border-purple-100/80 dark:border-slate-800/80 bg-gradient-to-b from-[#fbf8ff] via-[#f8f3ff] to-[#fdfbff] dark:from-[#0b0f19] dark:via-[#111827] dark:to-[#070a12] px-6 py-14 sm:px-12 md:py-20 text-center shadow-lg shadow-purple-900/5 transition-colors duration-500">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 dark:bg-purple-600/25 blur-[160px] rounded-full pointer-events-none -z-10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-purple-950/80 border border-purple-200/90 dark:border-purple-800 text-purple-950 dark:text-purple-300 text-xs font-extrabold uppercase tracking-wider font-jakarta mb-4 shadow-sm backdrop-blur-md"
        >
          <Building2 size={14} className="text-purple-600 dark:text-purple-400" />
          <span>Corporate Overview</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight font-outfit max-w-4xl mx-auto leading-tight"
        >
          Empowering Global Enterprises Through <span className="gradient-accent">Software Engineering</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-2xl mx-auto mt-6 font-medium leading-relaxed font-outfit"
        >
          SS Infotech is an ISO-certified technology research and products development firm. We partner with forward-thinking organizations to architect, build, and scale resilient digital solutions.
        </motion.p>
      </section>

      {/* Main Corporate Story */}
      <section className="py-14 md:py-18 px-4 sm:px-6 md:px-12 lg:px-16 w-full max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-xs font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-widest font-jakarta block">
              Our Legacy &amp; Vision
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-outfit leading-tight">
              Driven by Quality, Guided by Engineering Excellence
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed font-medium font-outfit">
              Founded over a decade ago, SS Infotech has matured from a specialized IT research lab into a trusted technology partner for global enterprises. We specialize in enterprise SaaS platforms, AI-driven automation, mobile ecosystems, and high-concurrency cloud architectures.
            </p>

            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed font-medium font-outfit">
              Our multidisciplinary team of software architects, data engineers, UI/UX strategists, and cloud specialists collaborate closely to solve complex operational challenges with precision and speed.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 font-jakarta">
              <div className="p-4 rounded-2xl bg-purple-50/80 dark:bg-slate-900 border border-purple-100 dark:border-slate-800">
                <ShieldCheck className="text-purple-600 mb-2" size={24} />
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white font-outfit">ISO Certified Standard</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Enterprise compliance &amp; bank-grade security protocols.</p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/80 dark:bg-slate-900 border border-purple-100 dark:border-slate-800">
                <Globe2 className="text-purple-600 mb-2" size={24} />
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white font-outfit">Global Footprint</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Delivering mission-critical applications worldwide.</p>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Stats */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { title: '10+ Years', desc: 'Industry Leadership & Engineering Mastery' },
              { title: '250+ Projects', desc: 'Enterprise Systems & Products Delivered' },
              { title: '50+ Engineers', desc: 'Senior Software & Cloud Specialists' },
              { title: '99.9% Uptime', desc: 'System Reliability Benchmark SLA' }
            ].map((stat, idx) => (
              <div 
                key={idx} 
                className="glass-card rounded-3xl p-6 md:p-8 border border-purple-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-xl flex flex-col justify-between hover:border-purple-400 transition-colors"
              >
                <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500 font-outfit mb-3">
                  {stat.title}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-bold font-jakarta leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Mission, Vision & Core Values */}
      <section className="py-14 md:py-18 px-6 md:px-12 lg:px-16 xl:px-20 bg-purple-50/50 dark:bg-slate-950/60 border-y border-purple-100 dark:border-slate-800">
        <div className="w-full max-w-[1400px] mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-outfit">
              Our Core <span className="gradient-accent">Pillars</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm font-medium font-outfit">
              The fundamental principles that guide our product engineering culture.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Our Mission',
                desc: 'To empower organizations with scalable, high-performance technology products that accelerate business growth and ensure continuous competitive advantage.'
              },
              {
                icon: Eye,
                title: 'Our Vision',
                desc: 'To be globally recognized as the premier IT research and development powerhouse, establishing benchmark standards for software quality and security.'
              },
              {
                icon: Heart,
                title: 'Core Values',
                desc: 'Rigor in engineering, absolute transparency, customer-centric innovation, and unwavering commitment to security and operational excellence.'
              }
            ].map((pillar, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -6 }}
                className="glass-card p-8 rounded-3xl border border-purple-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-200 dark:border-purple-800">
                  <pillar.icon size={24} />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-outfit">{pillar.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium font-outfit">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Team & Staff Section (Synced with Admin Panel) */}
      <section className="py-14 md:py-18 px-4 sm:px-6 md:px-12 lg:px-16 w-full max-w-[1400px] mx-auto">
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-300/60 dark:border-purple-800 text-purple-900 dark:text-purple-300 text-xs font-extrabold uppercase tracking-wider font-jakarta">
              <Users size={14} className="text-purple-600 dark:text-purple-400" />
              <span>Corporate Leadership</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-outfit">
              Meet Our <span className="gradient-accent">Engineering Leadership</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm font-medium font-outfit">
              Experienced tech leaders and specialists driving innovation at SS Infotech.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <div 
                key={member.id || member._id}
                className="glass-card rounded-3xl p-6 border border-purple-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-xl flex items-center gap-5 hover:border-purple-400 transition-all"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-900 shrink-0 border border-purple-300/50 dark:border-purple-800">
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1.5 font-outfit">
                  <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800 uppercase font-jakarta">
                    {member.role}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">{member.name}</h3>
                  <p className="text-xs text-purple-600 dark:text-purple-400 font-bold font-jakarta">{member.specialty}</p>
                  {member.email && (
                    <p className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5 pt-1">
                      <Mail size={12} className="text-purple-500" />
                      <span>{member.email}</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Life & Culture Showcase featuring Real Photos */}
      <section className="py-14 md:py-18 px-4 sm:px-6 md:px-12 lg:px-16 w-full max-w-[1400px] mx-auto border-t border-purple-100 dark:border-slate-800">
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-300/60 dark:border-purple-800 text-purple-900 dark:text-purple-300 text-xs font-extrabold uppercase tracking-wider font-jakarta">
                <Sparkles size={14} className="text-purple-600 dark:text-purple-400" />
                <span>Life at SS Infotech</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-outfit">
                Inside Our <span className="gradient-accent">Workspaces &amp; Seminars</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm font-medium font-outfit">
                Real glimpses of our live training centers, developer workshops, team collaboration hubs, and corporate leaders.
              </p>
            </div>

            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-100 dark:bg-slate-800 hover:bg-purple-200 dark:hover:bg-slate-700 text-purple-900 dark:text-purple-200 font-extrabold text-xs tracking-wider uppercase font-jakarta shrink-0 transition-colors"
            >
              <span>Explore Corporate Gallery</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'SS Infotech Tech Seminar & Classroom Session',
                cat: 'Training & Upskilling',
                img: '/images/gallery/ss-infotech-classroom-session-1.jpg'
              },
              {
                title: 'Enterprise Cloud & Tech Team Collaboration',
                cat: 'Software R&D Hub',
                img: '/images/gallery/ss-infotech-tech-team-collaboration.png'
              },
              {
                title: 'SS Infotech Interactive Developer Workshop',
                cat: 'Live Engineering Lab',
                img: '/images/gallery/ss-infotech-live-workshop-session.jpg'
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="group relative rounded-3xl overflow-hidden glass-card border border-purple-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg"
              >
                <div className="relative w-full aspect-video overflow-hidden bg-slate-900">
                  <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md flex items-center gap-1 font-jakarta uppercase">
                    <Sparkles size={11} className="text-amber-300" />
                    <span>SS Infotech Real Photo</span>
                  </span>
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = '/images/gallery/ss-infotech-classroom-session-1.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-5 font-outfit">
                  <span className="text-[10px] font-extrabold text-purple-600 dark:text-purple-400 uppercase font-jakarta block mb-1">
                    {item.cat}
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white font-outfit">
                    {item.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Client Logos */}
      <TrustedBy />

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 w-full">
        <CTABanner />
      </div>

    </main>
  );
}
