import ContactSection from '@/components/ContactSection';
import { motion } from 'framer-motion';
import { MessageSquare, MapPin, Phone, Mail, Clock, HelpCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden flex flex-col bg-bg text-text font-sans selection:bg-primary selection:text-white transition-colors duration-300">
      {/* Contact Header Banner */}
      <section className="relative pt-36 pb-12 px-4 sm:px-6 md:px-12 lg:px-16 w-full max-w-[1400px] mx-auto overflow-hidden text-center">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 blur-[160px] rounded-full pointer-events-none -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-300/60 dark:border-purple-800 text-purple-900 dark:text-purple-300 text-xs font-extrabold uppercase tracking-wider font-jakarta mb-4"
        >
          <MessageSquare size={14} className="text-purple-600 dark:text-purple-400" />
          <span>Get In Touch</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight font-outfit max-w-4xl mx-auto leading-tight"
        >
          Consult With Our <span className="gradient-accent">Solution Architects</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-2xl mx-auto mt-6 font-medium leading-relaxed font-outfit"
        >
          Have a project requirement or need technical consultation? Reach out directly to our engineering leadership team.
        </motion.p>
      </section>

      {/* Main Contact Section Component */}
      <ContactSection />

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 md:px-12 lg:px-16 w-full max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 text-xs font-extrabold font-jakarta uppercase">
            <HelpCircle size={14} />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white font-outfit">
            Common Inquiries
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 font-outfit">
          {[
            {
              q: 'What is your typical project kickoff timeline?',
              a: 'Following initial requirement discovery and architecture scoping, our engineering pods can initialize project onboarding within 3 to 5 business days.'
            },
            {
              q: 'What engagement models do you offer?',
              a: 'We offer flexible enterprise engagement models including Dedicated Engineering Pods, Fixed-Scope Milestone Development, and Managed Product Operations.'
            },
            {
              q: 'How do you ensure intellectual property (IP) protection?',
              a: 'All client projects are protected under comprehensive Non-Disclosure Agreements (NDAs), standard ISO-compliant data governance, and complete client IP ownership upon delivery.'
            },
            {
              q: 'Do you provide post-launch SLA maintenance?',
              a: 'Yes, we provide 24/7 telemetry monitoring, security patch automation, and SLA-backed infrastructure maintenance packages.'
            }
          ].map((faq, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              className="glass-card p-6 rounded-3xl border border-purple-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-md space-y-2"
            >
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-start gap-2">
                <CheckCircle2 size={18} className="text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed pl-6">
                {faq.a}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      </main>
  );
}
