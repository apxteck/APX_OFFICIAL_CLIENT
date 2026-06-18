'use client';

import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import Image from 'next/image';

export function AboutStory() {
  return (
    <section
      className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 relative w-full overflow-hidden"
      aria-labelledby="about-story-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col gap-6 md:gap-8 w-full order-2 lg:order-1"
        >
          <div className="inline-flex items-center gap-2 text-accent font-semibold tracking-wider uppercase text-xs md:text-sm">
            <Rocket className="w-4 h-4" aria-hidden="true" role="presentation" /> The Origin
          </div>
          <h2
            id="about-story-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight w-full"
          >
            Bridging the gap between{' '}
            <span className="text-foreground/50 italic">global enterprise tech</span> and local
            business needs.
          </h2>
          <div className="flex flex-col gap-4 md:gap-6 text-foreground/70 text-base md:text-lg leading-relaxed w-full">
            <p>
              Founded in 2026, APXTeck was established to solve a critical problem: growing Indian
              small and medium businesses deserved custom, secure, and beautiful products, but were
              priced out by massive enterprise licensing bills.
            </p>
            <p>
              We started as a lean engineering studio in Pune. Today, we work as strategic design
              and system partners for brands across the country, building high-speed Next.js web
              applications, customizing CRM leads systems, and executing data-driven SEO campaigns.
            </p>
          </div>
        </motion.div>

        {/* Story Visuals */}
        <div className="relative w-full order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-[4/3] sm:aspect-square lg:aspect-auto lg:h-[600px] rounded-3xl md:rounded-[3rem] overflow-hidden relative border border-glass-border shadow-xl md:shadow-2xl w-full"
          >
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="APXTeck Next.js engineering team collaborating on custom web development and enterprise software architecture"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              className="object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-700"
              priority={false}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none"
              aria-hidden="true"
            />

            {/* Floating Stat inside image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 bg-background/80 backdrop-blur-md border border-white/10 p-4 sm:p-6 rounded-2xl sm:rounded-3xl"
            >
              <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">100%</div>
              <div className="text-xs sm:text-sm font-semibold text-foreground/80">
                In-house Engineering Team
              </div>
              <div className="text-xs text-foreground/60 mt-1">
                Zero outsourcing. Maximum quality control.
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
