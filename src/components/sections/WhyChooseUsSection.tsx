'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Cpu, Zap, HeartHandshake, ShieldCheck } from 'lucide-react';

const features = [
  {
    title: 'Premium Glassmorphic Design',
    description:
      'Premium-grade glassy layouts with harmonic gradients, blur shadows, and interactive micro-animations that wow visitors.',
    icon: Cpu,
    color: '#0ea5e9', // Cyan
  },
  {
    title: 'Next.js ISR Performance',
    description:
      'Built using Next.js Incremental Static Regeneration (ISR) with a 60-second refresh for sub-second load times and flawless SEO.',
    icon: Zap,
    color: '#38bdf8', // Light Cyan
  },
  {
    title: 'Tailored for Indian SMBs',
    description:
      'High-end corporate software scaled down and custom priced to fit the exact operational budgets of Indian small-medium businesses.',
    icon: HeartHandshake,
    color: '#a855f7', // Purple
  },
  {
    title: 'Modular Clean Architecture',
    description:
      'A secure, decoupled TypeScript design system matching global coding frameworks, ensuring your codebase is ready to scale.',
    icon: ShieldCheck,
    color: '#ec4899', // Pink
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-32 relative overflow-hidden bg-background">
      {/* Background gradients */}
      <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse delay-700" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Text panel */}
          <div className="lg:col-span-5 flex flex-col items-start gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-400 text-xs font-semibold uppercase tracking-wider"
            >
              Why Partner With Us
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]"
            >
              We Build Tech That <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-500 to-purple-600">
                Commands Attention
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-foreground/75 text-lg leading-relaxed"
            >
              At APXTeck, we reject boring design. We combine advanced performance with futuristic
              aesthetics, crafting interfaces that are as fast as they are stunning.
            </motion.p>
          </div>

          {/* Features grid */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6 w-full">
            {features.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <GlassCard
                    className="h-full flex flex-col items-start gap-4 hover:border-white/20 transition-all duration-300 group"
                    glowColor={feat.color}
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border backdrop-blur-sm transition-transform duration-300 group-hover:scale-105"
                      style={{
                        backgroundColor: `${feat.color}14`,
                        borderColor: `${feat.color}3a`,
                        color: feat.color,
                        boxShadow: `0 6px 16px -4px ${feat.color}26, 0 0 12px 1px ${feat.color}1a`,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight text-foreground">
                      {feat.title}
                    </h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">{feat.description}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
