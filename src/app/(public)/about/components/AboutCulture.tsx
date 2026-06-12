'use client';

import { motion } from 'framer-motion';
import { Building2, Users, Coffee } from 'lucide-react';
import Image from 'next/image';

export function AboutCulture() {
  return (
    <section className="py-32 relative max-w-7xl mx-auto px-6" aria-labelledby="about-culture-heading">
      <div className="text-center mb-20">
        <motion.h2
          id="about-culture-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight"
        >
          Our Culture & Headquarters
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="text-foreground/60 max-w-2xl mx-auto mt-6 text-lg"
        >
          Operating out of the IT hub of Pune, Maharashtra. We foster a culture of deep work, continuous learning, and architectural perfection.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="md:col-span-2 relative h-[400px] rounded-[2rem] overflow-hidden group"
        >
          <Image
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="APXTeck Pune Headquarters office space"
            fill
            sizes="(max-width: 768px) 100vw, 66vw"
            loading="lazy"
            className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 flex flex-col justify-end pointer-events-none">
            <div className="flex items-center gap-3 text-accent mb-2">
              <Building2 className="w-5 h-5" aria-hidden="true" role="presentation" />
              <span className="font-bold tracking-widest uppercase text-xs">Headquarters</span>
            </div>
            <h3 className="text-2xl font-bold text-white">Pune, Maharashtra</h3>
            <p className="text-white/80 mt-2 text-sm max-w-md">Our central hub where design and engineering converge. Designed for collaborative sprints and deep focus work.</p>
          </div>
        </motion.div>

        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-1 rounded-[2rem] bg-foreground/[0.02] border border-glass-border p-8 flex flex-col justify-center relative overflow-hidden group"
          >
            <Users className="w-8 h-8 text-purple-400 mb-4" aria-hidden="true" role="presentation" />
            <h3 className="text-xl font-bold mb-2">Agile Teams</h3>
            <p className="text-foreground/60 text-sm">Small, highly cross-functional pods that deliver fast iterations without enterprise bloat.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="flex-1 rounded-[2rem] bg-foreground/[0.02] border border-glass-border p-8 flex flex-col justify-center relative overflow-hidden group"
          >
            <Coffee className="w-8 h-8 text-emerald-400 mb-4" aria-hidden="true" role="presentation" />
            <h3 className="text-xl font-bold mb-2">Developer First</h3>
            <p className="text-foreground/60 text-sm">We invest heavily in the best hardware, mechanical keyboards, and top-tier tech stacks.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
