import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Smartphone, Layers, BrainCircuit, Megaphone, Puzzle, ArrowRight, Sparkles, X, CheckCircle2 } from 'lucide-react';

const services = [
  { 
    id: 'web',
    title: 'Website Development', 
    description: 'We build blazing fast, responsive, and SEO-optimized web applications with modern frameworks.', 
    details: [
      'Next.js 14 & React Enterprise Architecture',
      'Core Web Vitals & Sub-Second Load Optimization',
      'Headless CMS & E-Commerce Integration',
      'Progressive Web Apps (PWA) Capabilities'
    ],
    icon: Globe,
    color: 'from-purple-600 to-indigo-600',
    iconBg: 'bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800',
  },
  { 
    id: 'mobile',
    title: 'Mobile App Development', 
    description: 'Native and cross-platform mobile apps built for seamless iOS and Android performance.', 
    details: [
      'React Native & Flutter Native Engine',
      'Biometric Security & Offline Data Sync',
      'Real-time Push Notifications & Telemetry',
      'App Store & Play Store Deployment Automation'
    ],
    icon: Smartphone,
    color: 'from-fuchsia-600 to-purple-600',
    iconBg: 'bg-fuchsia-100 dark:bg-fuchsia-950/60 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-200 dark:border-fuchsia-800',
  },
  { 
    id: 'custom',
    title: 'Custom Enterprise Software', 
    description: 'Tailored ERP, CRM, and cloud SaaS platforms engineered to automate complex business workflows.', 
    details: [
      'Microservices & Event-Driven Architecture',
      'Automated Legacy Software Migration',
      'Role-Based Access Control & SOC2 Standards',
      'High-Concurrency Database Scaling'
    ],
    icon: Layers,
    color: 'from-purple-600 to-pink-600',
    iconBg: 'bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800',
  },
  { 
    id: 'ai',
    title: 'Machine Learning & AI', 
    description: 'Intelligent AI models, predictive analytics engines, and LLM implementations for data-driven decisions.', 
    details: [
      'Custom LLM Fine-Tuning & RAG Pipelines',
      'Predictive Data Analytics & Automated Insights',
      'Computer Vision & NLP Processing Systems',
      'AI Workflow & API Automation'
    ],
    icon: BrainCircuit,
    color: 'from-indigo-600 to-purple-600',
    iconBg: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
  },
  { 
    id: 'marketing',
    title: 'Digital Marketing & Growth', 
    description: 'Data-backed digital growth strategies, conversion optimization, and brand scaling tactics.', 
    details: [
      'Technical & Enterprise SEO Audits',
      'Conversion Rate Optimization (CRO)',
      'Performance Marketing & Analytics Instrumentation',
      'Brand Identity & Interactive Content Strategy'
    ],
    icon: Megaphone,
    color: 'from-pink-600 to-purple-600',
    iconBg: 'bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-800',
  },
  { 
    id: 'integration',
    title: 'Integration Services & APIs', 
    description: 'Seamless third-party API connectivity, payment gateways, and enterprise cloud middleware.', 
    details: [
      'REST & GraphQL API Gateway Architecture',
      'Stripe, Razorpay, & Global Payment Sync',
      'Salesforce & SAP ERP Middleware Connections',
      'Zero-Downtime Webhook Telemetry'
    ],
    icon: Puzzle,
    color: 'from-purple-600 to-fuchsia-600',
    iconBg: 'bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800',
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="services" className="relative py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-16 w-full max-w-[1400px] mx-auto">
      {/* Glow highlight spot */}
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-fuchsia-600/15 dark:bg-fuchsia-600/25 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-300/60 dark:border-purple-800 text-purple-900 dark:text-purple-300 text-xs font-extrabold uppercase tracking-wider font-jakarta"
        >
          <Sparkles size={14} className="text-purple-600 dark:text-purple-400" />
          <span>Tailored Capabilities</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-outfit"
        >
          Our Premium <span className="gradient-accent">Services</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-medium font-outfit"
        >
          We provide end-to-end technology research and software development solutions engineered to scale digital enterprises.
        </motion.p>
      </div>
      
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, idx) => {
          const IconComp = service.icon;
          return (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedService(service)}
              className="group glass-card rounded-3xl p-8 border border-purple-200/80 dark:border-slate-800 hover:border-purple-400 bg-white/80 dark:bg-slate-900/80 transition-all duration-500 flex flex-col justify-between relative overflow-hidden shadow-xl hover:shadow-2xl cursor-pointer"
            >
              <div>
                {/* Icon Wrapper */}
                <div className={`w-14 h-14 rounded-2xl border ${service.iconBg} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <IconComp size={28} strokeWidth={2} />
                </div>

                {/* Text Content */}
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors font-outfit">
                  {service.title}
                </h3>
                
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium font-outfit">
                  {service.description}
                </p>
              </div>

              {/* Bottom Action */}
              <div className="w-full flex items-center justify-between pt-6 mt-6 border-t border-purple-100 dark:border-slate-800 font-jakarta">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  View Capabilities
                </span>

                <div className="p-2.5 rounded-full bg-purple-100 dark:bg-slate-800 text-purple-600 dark:text-purple-300 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-fuchsia-600 group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-sm">
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl rounded-3xl glass-card p-8 border border-purple-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl space-y-6"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-purple-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-purple-100 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl border ${selectedService.iconBg} flex items-center justify-center`}>
                  <selectedService.icon size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white font-outfit">{selectedService.title}</h3>
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400 font-jakarta">Enterprise Service Offering</span>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-outfit">
                {selectedService.description}
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white font-jakarta">Core Capabilities &amp; Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedService.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-purple-50 dark:bg-slate-800/80 border border-purple-100 dark:border-slate-700">
                      <CheckCircle2 size={16} className="text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-outfit">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-purple-100 dark:border-slate-800">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Close
                </button>
                <Link
                  to="/contact"
                  onClick={() => setSelectedService(null)}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-800 to-fuchsia-600 text-white text-xs font-extrabold shadow-lg shadow-purple-600/30 hover:scale-105 transition-all uppercase tracking-wider cursor-pointer"
                >
                  Request Consultation
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}