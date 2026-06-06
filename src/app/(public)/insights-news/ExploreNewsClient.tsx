'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { MouseSpotlight } from '@/components/ui/MouseSpotlight';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';
import { Newspaper, TrendingUp, MonitorSmartphone } from 'lucide-react';

const knowledgeCategories = [
  {
    title: 'Technology & Code',
    description: 'Deep dives into Next.js, advanced frontend architecture, backend scaling, and clean code principles.',
    icon: MonitorSmartphone,
    color: '#0ea5e9', // Cyan
  },
  {
    title: 'Business & Scaling',
    description: 'Insights on how technology drives ROI, automates manual processes, and scales Indian SMBs into enterprise players.',
    icon: TrendingUp,
    color: '#10b981', // Emerald
  },
  {
    title: 'Digital News',
    description: 'The latest updates from APXTeck, industry tech trends, algorithm updates, and what they mean for your business.',
    icon: Newspaper,
    color: '#8b5cf6', // Purple
  },
];

export function ExploreNewsClient() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const heroPhrases = [
    "Articles and guidelines to help you build modern designs and scale system architectures.",
    "Learn how to rank high on global search engines and dominate your niche.",
    "Deep dives into Next.js, backend scaling, and clean code principles.",
    "Stay updated with industry tech trends and what they mean for your business."
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
      <FloatingWhatsApp phoneNumber="919876543210" />

      {/* Animated Hero Section */}
      <section className="relative py-32 flex items-center justify-center min-h-[50vh] overflow-hidden">
        {/* Background Parallax Image */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0 bg-cover bg-center -z-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
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
            The APXTeck Insider
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-400 to-pink-500">
              Insights & News
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

      {/* Knowledge Hub Topics */}
      <section className="py-20 relative max-w-7xl mx-auto px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />

        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
          >
            Our Knowledge Hub
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-foreground/60 max-w-2xl mx-auto mt-4 text-lg"
          >
            Explore our curated categories designed to keep you at the cutting edge of the digital landscape.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {knowledgeCategories.map((val, idx) => {
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
                <GlassCard
                  className="h-full p-8 border border-glass-border hover:border-white/10 transition-colors duration-500"
                  glowColor={val.color}
                >
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
