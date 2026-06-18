'use client';

import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

export function AboutMissionVision() {
  return (
    <section className="py-16 md:py-24 bg-foreground/[0.02] border-y border-glass-border w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-6 md:p-10 h-full border border-glass-border shadow-lg md:shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 w-full flex flex-col group">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-4 md:mb-6 shrink-0 transition-transform duration-300 group-hover:scale-110">
              <Target className="w-6 h-6 md:w-7 md:h-7" aria-hidden="true" role="presentation" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 md:mb-4">Our Web Development Mission</h2>
            <p className="text-foreground/70 leading-relaxed text-base md:text-lg">
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
          <GlassCard className="p-6 md:p-10 h-full border border-glass-border shadow-lg md:shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 w-full flex flex-col group">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4 md:mb-6 shrink-0 transition-transform duration-300 group-hover:scale-110">
              <Eye className="w-6 h-6 md:w-7 md:h-7" aria-hidden="true" role="presentation" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 md:mb-4">Our Technical Vision</h2>
            <p className="text-foreground/70 leading-relaxed text-base md:text-lg">
              To become the premier digital engineering partner for SMBs in India, recognized for modern designs, highly scalable modular codebases, and completely transparent client relationships.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
