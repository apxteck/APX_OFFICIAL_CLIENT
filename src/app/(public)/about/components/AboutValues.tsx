'use client';

import { motion } from 'framer-motion';
import { coreValues } from '../constants';
import { GlassCard } from '@/components/ui/GlassCard';

export function AboutValues() {
  return (
    <section
      className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 relative w-full overflow-hidden"
      aria-labelledby="about-values-heading"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-accent/5 rounded-full blur-[100px] md:blur-[150px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="text-center mb-12 md:mb-16 flex flex-col gap-4 w-full">
        <motion.h2
          id="about-values-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight w-full"
        >
          Our Core IT & Business Values
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="text-foreground/60 max-w-xl mx-auto text-base md:text-lg px-2 w-full"
        >
          These fundamental operating guidelines direct how we write code, design interfaces, and
          support our partners.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
        {coreValues.map((val, idx) => {
          const Icon = val.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, type: 'spring', bounce: 0.4 }}
              viewport={{ once: true, margin: '-50px' }}
            >
              <GlassCard
                className="h-full hover:-translate-y-2 transition-transform duration-300 relative group overflow-hidden w-full flex flex-col p-6 md:p-8"
                glowColor={val.color}
              >
                <div
                  className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"
                  aria-hidden="true"
                >
                  <Icon
                    className="w-20 h-20 md:w-24 md:h-24"
                    style={{ color: val.color }}
                    aria-hidden="true"
                    role="presentation"
                  />
                </div>

                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center border backdrop-blur-sm mb-4 md:mb-6 relative z-10 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${val.color}14`,
                    borderColor: `${val.color}3a`,
                    color: val.color,
                    boxShadow: `0 4px 12px -3px ${val.color}26, 0 0 8px 1px ${val.color}1a`,
                  }}
                  aria-hidden="true"
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" role="presentation" />
                </div>
                <h3 className="text-lg md:text-xl font-bold tracking-tight mb-2 md:mb-3 relative z-10">
                  {val.title}
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed relative z-10 flex-1">
                  {val.description}
                </p>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
