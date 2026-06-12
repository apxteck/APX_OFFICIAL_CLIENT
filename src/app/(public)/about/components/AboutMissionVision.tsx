'use client';

import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

export function AboutMissionVision() {
  return (
    <section className="py-24 bg-foreground/[0.02] border-y border-glass-border">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-10 h-full border border-glass-border shadow-xl hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6">
              <Target className="w-7 h-7" aria-hidden="true" role="presentation" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Our Mission</h2>
            <p className="text-foreground/70 leading-relaxed text-lg">
              To democratize premium engineering and custom web development for growing businesses. We make high-speed, secure, and beautiful visual experiences accessible to every ambitious Indian entrepreneur.
            </p>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-10 h-full border border-glass-border shadow-xl hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6">
              <Eye className="w-7 h-7" aria-hidden="true" role="presentation" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Our Vision</h2>
            <p className="text-foreground/70 leading-relaxed text-lg">
              To become the premier digital engineering partner for SMBs in India, recognized for modern designs, highly scalable modular codebases, and completely transparent client relationships.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
