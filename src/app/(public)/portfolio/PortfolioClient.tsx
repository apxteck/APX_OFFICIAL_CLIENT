'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { MouseSpotlight } from '@/components/ui/MouseSpotlight';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';
import { Lightbulb, Code2, Rocket } from 'lucide-react';

const deliveryPhilosophy = [
  {
    title: '1. Strategic Blueprint',
    description: "We don't start coding blindly. We analyze your market, competitors, and technical requirements to create a robust, scalable architecture blueprint.",
    icon: Lightbulb,
    color: '#0ea5e9', // Cyan
  },
  {
    title: '2. Modular Engineering',
    description: 'We develop your product using strictly typed, component-driven frameworks like Next.js and Tailwind, ensuring lightning-fast performance and zero tech debt.',
    icon: Code2,
    color: '#8b5cf6', // Purple
  },
  {
    title: '3. Market Deployment',
    description: 'We deploy on global edge networks with heavy SEO optimizations, guaranteeing your product reaches its target audience from day one.',
    icon: Rocket,
    color: '#ec4899', // Pink
  },
];

export function PortfolioClient() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const heroPhrases = [
    "A detailed look at challenging problems we solved and technical architectures we deployed.",
    "Showcasing direct business metrics achieved through premium engineering.",
    "Real-world case studies of digital transformation for ambitious Indian SMBs.",
    "Deep dives into our custom solutions, robust systems, and stunning designs."
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

      {/* Animated Hero Section */}
      <section className="relative py-32 flex items-center justify-center min-h-[55vh] overflow-hidden">
        {/* Background Parallax Image */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0 bg-cover bg-center -z-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background z-10" />

        <div className="max-w-7xl mx-auto px-6 relative z-20 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-bold uppercase tracking-wider"
          >
            Case Studies & Work
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight"
          >
            Our Best Work <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan-400 to-emerald-400">
              Engineered for Growth
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

      {/* Our Delivery Philosophy */}
      <section className="py-20 relative max-w-7xl mx-auto px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[150px] pointer-events-none -z-10" />

        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
          >
            Our Delivery Philosophy
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-foreground/60 max-w-2xl mx-auto mt-4 text-lg"
          >
            Behind every successful case study is our rigorous 3-step execution methodology. We ensure absolute predictability and premium quality.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {deliveryPhilosophy.map((val, idx) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15, type: 'spring', bounce: 0.3 }}
                viewport={{ once: true, margin: '-50px' }}
                className="h-full"
              >
                <GlassCard className="h-full p-8 border border-glass-border hover:border-white/10 transition-colors duration-500">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center border backdrop-blur-sm mb-6 transition-transform duration-500 hover:scale-110"
                    style={{
                      backgroundColor: `${val.color}14`,
                      borderColor: `${val.color}3a`,
                      color: val.color,
                      boxShadow: `0 4px 12px -3px ${val.color}26, 0 0 8px 1px ${val.color}1a`,
                    }}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight mb-3">{val.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">{val.description}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}
