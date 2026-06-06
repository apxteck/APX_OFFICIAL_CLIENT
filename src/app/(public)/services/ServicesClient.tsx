'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ShieldCheck, Zap, Layers, BarChart3, Code2, Cpu } from 'lucide-react';
import { MouseSpotlight } from '@/components/ui/MouseSpotlight';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';

const valuePropositions = [
  {
    title: 'Enterprise Architecture',
    description: 'We build highly scalable, modular systems using Next.js and robust backend frameworks, ensuring your app handles traffic spikes effortlessly.',
    icon: Layers,
    color: '#0ea5e9', // Cyan
  },
  {
    title: 'Bank-Grade Security',
    description: 'Security is not an afterthought. We implement advanced encryption, strict access controls, and regular vulnerability scanning.',
    icon: ShieldCheck,
    color: '#10b981', // Emerald
  },
  {
    title: 'Lightning Performance',
    description: 'Sub-second load times. We optimize everything from Edge caching to database indexing for an unparalleled user experience.',
    icon: Zap,
    color: '#f59e0b', // Amber
  },
  {
    title: 'Data-Driven Insights',
    description: 'Integrated analytics and custom dashboards give you real-time visibility into your digital performance and ROI.',
    icon: BarChart3,
    color: '#8b5cf6', // Purple
  },
  {
    title: 'Clean Code Standards',
    description: 'Strict TypeScript typing, comprehensive linting, and automated testing guarantee that your codebase remains maintainable for years.',
    icon: Code2,
    color: '#ec4899', // Pink
  },
  {
    title: 'AI & Automation Ready',
    description: 'Future-proofed designs ready to integrate with machine learning models and automated CRM workflows as your business scales.',
    icon: Cpu,
    color: '#3b82f6', // Blue
  },
];

export function ServicesClient() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const heroPhrases = [
    "Explore our comprehensive suite of high-performance design and system architecture.",
    "Scaling growing businesses with cutting-edge technology and automation.",
    "Delivering robust security, lightning speed, and data-driven insights.",
    "Your dedicated engineering partner for enterprise-grade digital solutions."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % heroPhrases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroPhrases.length]);

  return (
    <>
      <MouseSpotlight />
      <FloatingWhatsApp phoneNumber="919405282582" />

      {/* Hero Section */}
      <section className="relative py-32 flex items-center justify-center min-h-[50vh] overflow-hidden">
        {/* Background Parallax */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center -z-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background z-10" />

        <div className="max-w-7xl mx-auto px-6 relative z-20 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-bold uppercase tracking-wider"
          >
            Capabilities & Solutions
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight"
          >
            Digital Transformation <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-500 to-pink-500">
              Delivered
            </span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-foreground/70 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed h-[80px] md:h-[60px] relative flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={phraseIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-x-0"
              >
                {heroPhrases[phraseIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Our Services (The APXTeck Advantage) */}
      <section className="py-20 relative max-w-7xl mx-auto px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />

        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
          >
            The APXTeck Advantage
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-foreground/60 max-w-2xl mx-auto mt-4 text-lg"
          >
            We don't just write code. We architect solutions that give you a definitive competitive edge in the digital landscape.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {valuePropositions.map((val, idx) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, type: "spring", bounce: 0.3 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <GlassCard
                  className="h-full p-8 border border-glass-border hover:border-white/10 transition-colors duration-500 relative group overflow-hidden"
                  glowColor={val.color}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center border backdrop-blur-sm mb-6 relative z-10 transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundColor: `${val.color}14`,
                      borderColor: `${val.color}3a`,
                      color: val.color,
                      boxShadow: `0 4px 12px -3px ${val.color}26, 0 0 8px 1px ${val.color}1a`,
                    }}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight mb-3 relative z-10">{val.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed relative z-10">{val.description}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}
