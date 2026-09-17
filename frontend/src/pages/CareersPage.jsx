import { useState } from 'react';
import CTABanner from '@/components/CTABanner';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, 
  Sparkles, Code, Cpu, Shield, Send, X, HeartHandshake, GraduationCap 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '@/services/api';

const jobs = [
  {
    id: 'job-1',
    title: 'Senior Full-Stack Engineer (Next.js & Node.js)',
    department: 'Engineering',
    type: 'Full-Time',
    location: 'Bangalore / Hybrid',
    exp: '4+ Years',
    desc: 'Architect high-throughput web applications and microservices using React, Next.js, and Node.js enterprise frameworks.',
    requirements: [
      'Proficiency in React 18, Next.js App Router, TypeScript, and Tailwind CSS',
      'Solid experience with Node.js, Express, PostgreSQL, and Redis',
      'Hands-on experience with CI/CD deployment pipelines on AWS/GCP',
      'Understanding of microservices architecture and zero-downtime releases'
    ]
  },
  {
    id: 'job-2',
    title: 'Lead Mobile Application Developer (React Native)',
    department: 'Mobile Ecosystems',
    type: 'Full-Time',
    location: 'Bangalore',
    exp: '5+ Years',
    desc: 'Lead the development of secure, native-performing iOS & Android mobile applications for fintech and healthcare clients.',
    requirements: [
      'Deep expertise in React Native, Redux Toolkit, and Native Bridges',
      'Track record of publishing top-rated apps on iOS App Store & Google Play',
      'Experience with biometric security, offline sync, and push telemetry',
      'Strong knowledge of mobile UI animation performance optimization'
    ]
  },
  {
    id: 'job-3',
    title: 'AI & Data Solutions Architect',
    department: 'AI & Research',
    type: 'Full-Time',
    location: 'Bangalore / Remote',
    exp: '6+ Years',
    desc: 'Design predictive AI models, RAG search pipelines, and custom LLM integrations for enterprise SaaS platforms.',
    requirements: [
      'Strong foundation in Python, PyTorch/TensorFlow, and LangChain/LlamaIndex',
      'Experience designing RAG architectures with Vector Databases (Pinecone/Weaviate)',
      'Background in data pipeline orchestration and model telemetry',
      'M.S. or B.S. in Computer Science or quantitative field preferred'
    ]
  },
  {
    id: 'job-4',
    title: 'DevOps & Cloud Infrastructure Lead',
    department: 'Infrastructure',
    type: 'Full-Time',
    location: 'Bangalore',
    exp: '5+ Years',
    desc: 'Manage high-concurrency Kubernetes clusters, automated Terraform infrastructure, and SOC2 compliance monitoring.',
    requirements: [
      'Extensive experience with AWS/Azure, Kubernetes (EKS), and Docker',
      'Infrastructure as Code (IaC) mastery using Terraform and Ansible',
      'Proficiency in Prometheus, Grafana, and ELK telemetry stacks',
      'Solid understanding of SOC2, ISO27001, and zero-trust network models'
    ]
  }
];

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', portfolio: '', notes: '' });
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const handleApply = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    try {
      await api.submitContact({
        name: formState.name,
        email: formState.email,
        service: `Job Application: ${selectedJob ? selectedJob.title : 'Engineering Role'}`,
        message: `Portfolio/Resume Link: ${formState.portfolio || 'N/A'}\nCover Note: ${formState.notes || 'Interested in job role.'}`
      });
    } catch (err) {
      console.warn('Job Application submission note:', err.message);
    } finally {
      setTimeout(() => {
        setFormSubmitted(false);
        setSelectedJob(null);
        setFormState({ name: '', email: '', portfolio: '', notes: '' });
      }, 4000);
    }
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden flex flex-col bg-bg text-text font-sans selection:bg-primary selection:text-white transition-colors duration-300">
      {/* Careers Header Hero Section (Exact 1-to-1 Home Hero Structure) */}
      <section className="relative isolate mx-auto my-3 w-full max-w-[1440px] overflow-hidden rounded-[2.5rem] border border-purple-100/80 dark:border-slate-800/80 bg-gradient-to-b from-[#fbf8ff] via-[#f8f3ff] to-[#fdfbff] dark:from-[#0b0f19] dark:via-[#111827] dark:to-[#070a12] px-4 py-16 shadow-[0_20px_50px_-15px_rgba(147,51,234,0.08)] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] sm:px-8 md:min-h-[720px] md:px-12 md:py-20 transition-colors duration-500">
        
        {/* 1. Full-Cover Auto-Playing Background Video (service.mp4) */}
        {!videoError && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/img/hero-mockup.png"
            onLoadedData={() => setVideoReady(true)}
            onError={() => setVideoError(true)}
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
              videoReady ? 'opacity-85 dark:opacity-85' : 'opacity-0'
            }`}
          >
            <source src="/videos/service.mp4" type="video/mp4" />
            <source src="/videos/services.mp4" type="video/mp4" />
          </video>
        )}

        {/* 2. Sleek Dual-Theme Readability Overlay */}
        <div 
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-slate-900/15 via-transparent to-slate-900/25 dark:from-[#0b0f19]/70 dark:via-[#111827]/50 dark:to-[#070a12]/80 transition-colors duration-500" 
          aria-hidden="true"
        />

        {/* 3. Tech Grid Pattern & Soft Radial Purple Ambient Glow */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-20 dark:opacity-20 [background-image:linear-gradient(rgba(147,51,234,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.08)_1px,transparent_1px)] dark:[background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:36px_36px]" />
        <div className="pointer-events-none absolute -top-36 left-1/2 z-0 h-[480px] w-[650px] -translate-x-1/2 rounded-full bg-gradient-to-b from-purple-300/25 via-fuchsia-200/15 to-transparent dark:from-purple-600/20 dark:via-fuchsia-600/10 dark:to-transparent blur-3xl" />

        {/* 4. Content Container */}
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
          
          {/* Badge Pill */}
          <motion.div 
            initial={{ opacity: 0, y: -12 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.45 }} 
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border border-purple-200/90 dark:border-purple-800/80 bg-white/90 dark:bg-purple-950/80 px-5 py-2 shadow-sm backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-purple-600 dark:bg-purple-400 animate-pulse" />
              <span className="font-jakarta text-[11px] font-extrabold uppercase tracking-wider text-purple-950 dark:text-purple-200">
                JOIN OUR GLOBAL IT &amp; ENGINEERING TEAM
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.div 
            initial={{ opacity: 0, y: 18 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.55, delay: 0.08 }} 
            className="w-full px-2 sm:px-6"
          >
            <h1 className="font-outfit text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-950 dark:text-white sm:text-5xl md:text-6xl xl:text-7xl drop-shadow-md [text-shadow:_0_1px_6px_rgba(255,255,255,0.95),_0_0_15px_rgba(255,255,255,0.85)] dark:[text-shadow:_0_3px_18px_rgba(0,0,0,0.95)]">
              Build the Future of Enterprise Tech
            </h1>
            
            <p className="mx-auto mt-6 max-w-2xl font-outfit text-base font-extrabold leading-relaxed text-slate-950 dark:text-slate-100 sm:text-lg md:text-xl drop-shadow-md [text-shadow:_0_1px_6px_rgba(255,255,255,0.95),_0_0_12px_rgba(255,255,255,0.85)] dark:[text-shadow:_0_2px_12px_rgba(0,0,0,0.9)]">
              Join an engineering-first culture dedicated to technological innovation, continuous learning, and building high-impact enterprise software.
            </p>

            {/* Action Button */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#open-positions"
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-purple-700 via-purple-600 to-fuchsia-600 px-8 py-4 font-jakarta text-xs font-extrabold uppercase tracking-wider text-white shadow-xl shadow-purple-600/30 transition hover:scale-[1.03] active:scale-[0.98]"
              >
                VIEW OPEN POSITIONS <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>

          {/* Thin Divider Line */}
          <div className="my-10 w-full max-w-4xl border-t border-purple-200/60 dark:border-slate-800" />

          {/* Perks Grid (4 Items, exactly like Stats grid on Home Hero) */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.55, delay: 0.18 }} 
            className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4 font-outfit"
          >
            {[
              { icon: Code, title: 'Cutting-Edge Stack', desc: 'React 18 & Cloud AI' },
              { icon: GraduationCap, title: 'Continuous Growth', desc: 'Certifications & Seminars' },
              { icon: HeartHandshake, title: 'Work-Life Balance', desc: 'Flexible Hybrid Culture' },
              { icon: Shield, title: 'Tech Autonomy', desc: 'Engineering Ownership' }
            ].map((perk, idx) => (
              <div key={idx} className="text-center rounded-2xl bg-white/85 dark:bg-slate-900/50 p-4 border border-purple-100/90 dark:border-slate-800/50 backdrop-blur-md shadow-sm">
                <div className="flex justify-center text-purple-700 dark:text-purple-400 mb-2">
                  <perk.icon size={22} />
                </div>
                <div className="text-sm font-extrabold text-slate-950 dark:text-white font-outfit">{perk.title}</div>
                <div className="mt-1 font-jakarta text-xs font-bold text-slate-700 dark:text-slate-300">{perk.desc}</div>
              </div>
            ))}
          </motion.div>

        </div>

      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-14 md:py-18 px-4 sm:px-6 md:px-12 lg:px-16 w-full max-w-[1400px] mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-outfit">
            Open <span className="gradient-accent">Engineering Positions</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm font-medium font-outfit">
            Explore current opportunities to join our team in Bangalore or hybrid roles.
          </p>
        </div>

        <div className="space-y-4">
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              whileHover={{ scale: 1.005 }}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-purple-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-md hover:border-purple-400 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="space-y-3 max-w-2xl font-outfit">
                <div className="flex flex-wrap items-center gap-2 font-jakarta">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 uppercase">
                    {job.department}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-purple-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-purple-200 dark:border-slate-700">
                    {job.type}
                  </span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <MapPin size={13} />
                    <span>{job.location}</span>
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">{job.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">{job.desc}</p>
              </div>

              <button
                onClick={() => setSelectedJob(job)}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-800 to-fuchsia-600 text-white text-xs font-extrabold shadow-lg shadow-purple-600/30 hover:scale-105 transition-all uppercase tracking-wider whitespace-nowrap cursor-pointer font-jakarta shrink-0"
              >
                Apply Now
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Application Modal */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl rounded-3xl glass-card p-8 border border-purple-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-purple-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-purple-100 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div>
                <span className="text-xs font-extrabold text-purple-600 uppercase font-jakarta tracking-wider block mb-1">Applying For Position</span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white font-outfit">{selectedJob.title}</h3>
                <p className="text-xs text-slate-500 font-bold font-jakarta mt-1">{selectedJob.department} • {selectedJob.location} • Min Experience: {selectedJob.exp}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-purple-100 dark:border-slate-800">
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase font-jakarta">Key Qualifications</h4>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 font-outfit font-medium">
                  {selectedJob.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Form */}
              <form onSubmit={handleApply} className="space-y-4 pt-4 border-t border-purple-100 dark:border-slate-800 font-outfit">
                {formSubmitted && (
                  <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-emerald-600" />
                    <span>Application received! Our HR team will review your profile within 48 hours.</span>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 font-jakarta uppercase">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-purple-50/60 dark:bg-slate-800 border border-purple-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 font-jakarta uppercase">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="jane@domain.com"
                      className="w-full bg-purple-50/60 dark:bg-slate-800 border border-purple-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-600"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 font-jakarta uppercase">LinkedIn Profile / Portfolio Link</label>
                  <input
                    type="url"
                    required
                    value={formState.portfolio}
                    onChange={(e) => setFormState({ ...formState, portfolio: e.target.value })}
                    placeholder="https://linkedin.com/in/janedoe or https://github.com/janedoe"
                    className="w-full bg-purple-50/60 dark:bg-slate-800 border border-purple-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 font-jakarta uppercase">Brief Introduction &amp; Achievements</label>
                  <textarea
                    rows={3}
                    value={formState.notes}
                    onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                    placeholder="Tell us about your technical background and key projects..."
                    className="w-full bg-purple-50/60 dark:bg-slate-800 border border-purple-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3 font-jakarta">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-800 to-fuchsia-600 text-white text-xs font-extrabold uppercase shadow-md hover:scale-105 transition-all cursor-pointer"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 w-full">
        <CTABanner />
      </div>

      </main>
  );
}
