'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { MouseSpotlight } from '@/components/ui/MouseSpotlight';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';
import Image from 'next/image';
import { Newspaper, TrendingUp, MonitorSmartphone } from 'lucide-react';
import { useInsightsHeroLogic } from './hooks/useInsightsHeroLogic';

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
  const { typewrittenText, currentFullWord, phraseIndex, heroPhrases } = useInsightsHeroLogic();

  return (
    <>
      <MouseSpotlight />
      <FloatingWhatsApp phoneNumber="919405282582" />

      {/* Animated Hero Section */}
      <section className="relative py-32 flex items-center justify-center min-h-[50vh] overflow-hidden" aria-labelledby="insights-hero-title">
        {/* Background Parallax Image */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0 -z-20"
        >
          <Image
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="APXTeck Insights and News Background"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background z-10" aria-hidden="true" />

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
            id="insights-hero-title"
            className="text-5xl md:text-7xl font-extrabold tracking-tight flex flex-col items-center gap-2"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            >
              Insights & News
            </motion.span>
            
            <motion.span
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.5, duration: 0.8, type: "spring", bounce: 0.4 }}
              className="flex items-center justify-center min-h-[1.2em] text-[7vw] sm:text-4xl md:text-5xl lg:text-7xl whitespace-nowrap"
            >
              <span className="relative flex items-center justify-center">
                {/* Invisible placeholder for exact width of the CURRENT word to keep it perfectly centered */}
                <span className="opacity-0 pointer-events-none select-none">{currentFullWord}</span>
                
                {/* Typing text overlay */}
                <span className="absolute left-0 flex items-center whitespace-nowrap">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-400 to-pink-500">
                    {typewrittenText}
                  </span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-1.5 md:w-2 h-[0.8em] bg-pink-500 ml-1 md:ml-2 rounded-sm shrink-0 shadow-[0_0_12px_rgba(236,72,153,0.7)]"
                  />
                </span>
              </span>
            </motion.span>
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
      <section className="py-20 relative max-w-7xl mx-auto px-6" aria-labelledby="knowledge-hub-title">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none -z-10" aria-hidden="true" />

        <div className="text-center mb-16">
          <motion.h2
            id="knowledge-hub-title"
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
                    <Icon className="w-7 h-7" aria-hidden="true" role="presentation" />
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
