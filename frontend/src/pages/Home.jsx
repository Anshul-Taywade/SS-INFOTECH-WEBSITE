import Hero from '@/components/Hero';
import TechStack from '@/components/TechStack';
import TrustedBy from '@/components/TrustedBy';
import WhyChooseUs from '@/components/WhyChooseUs';
import ProcessWorkflow from '@/components/ProcessWorkflow';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden flex flex-col bg-bg text-text font-sans selection:bg-primary selection:text-white transition-colors duration-300">
      {/* Section 1: Navbar */}
      {/* Section 2: Hero */}
      <Hero />

      {/* Client Marquee */}
      <TrustedBy />

      {/* Tech Ecosystem Matrix */}
      <TechStack />

      {/* Why Choose Us / Enterprise Pillars */}
      <WhyChooseUs />

      {/* 4-Step Agile Execution Workflow */}
      <ProcessWorkflow />

      {/* Client Testimonials */}
      <Testimonials />
    </main>
  );
}
