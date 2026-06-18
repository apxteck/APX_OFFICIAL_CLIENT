'use client';

import { motion } from 'framer-motion';
import { Building2, Users, Coffee } from 'lucide-react';
import Image from 'next/image';

export function AboutCulture() {
  return (
    <section
      className="py-16 md:py-24 lg:py-32 relative max-w-7xl mx-auto px-4 sm:px-6 w-full overflow-hidden"
      aria-labelledby="about-culture-heading"
    >
      <div className="text-center mb-12 md:mb-20 flex flex-col gap-4 md:gap-6 w-full">
        <motion.h2
          id="about-culture-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight w-full"
        >
          Our Corporate Culture & IT Headquarters
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="text-foreground/60 max-w-2xl mx-auto text-base md:text-lg w-full px-2"
        >
          Operating out of the IT hub of Pune, Maharashtra. We foster a culture of deep work,
          continuous learning, and architectural perfection.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="md:col-span-2 relative h-[300px] sm:h-[400px] rounded-3xl md:rounded-[2rem] overflow-hidden group w-full"
        >
          <Image
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="APXTeck modern IT and Web Development headquarters office space in Pune, India"
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
            <h3 className="text-xl sm:text-2xl font-bold text-white">Pune, Maharashtra</h3>
            <p className="text-white/80 mt-2 text-xs sm:text-sm max-w-md">
              Our central hub where design and engineering converge. Designed for collaborative
              sprints and deep focus work.
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col gap-4 md:gap-6 w-full">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-1 rounded-3xl md:rounded-[2rem] bg-foreground/[0.02] border border-glass-border p-6 md:p-8 flex flex-col justify-center relative overflow-hidden group w-full"
          >
            <Users
              className="w-8 h-8 text-purple-400 mb-4"
              aria-hidden="true"
              role="presentation"
            />
            <h3 className="text-lg md:text-xl font-bold mb-2">Agile Web Development Teams</h3>
            <p className="text-foreground/60 text-xs md:text-sm">
              Small, highly cross-functional pods that deliver fast iterations without enterprise
              bloat.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="flex-1 rounded-3xl md:rounded-[2rem] bg-foreground/[0.02] border border-glass-border p-6 md:p-8 flex flex-col justify-center relative overflow-hidden group w-full"
          >
            <Coffee
              className="w-8 h-8 text-emerald-400 mb-4"
              aria-hidden="true"
              role="presentation"
            />
            <h3 className="text-lg md:text-xl font-bold mb-2">Developer-First Engineering</h3>
            <p className="text-foreground/60 text-xs md:text-sm">
              We invest heavily in the best hardware, mechanical keyboards, and top-tier tech
              stacks.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
