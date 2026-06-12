'use client';

import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import Image from 'next/image';

export function AboutStory() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 relative" aria-labelledby="about-story-heading">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 text-accent font-semibold tracking-wider uppercase text-sm">
            <Rocket className="w-4 h-4" aria-hidden="true" role="presentation" /> The Origin
          </div>
          <h2 id="about-story-heading" className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Bridging the gap between <span className="text-foreground/50 italic">global enterprise tech</span> and local business needs.
          </h2>
          <div className="space-y-6 text-foreground/70 text-lg leading-relaxed">
            <p>
              Founded in 2026, APXTeck was established to solve a critical problem: growing Indian small and medium businesses deserved custom, secure, and beautiful products, but were priced out by massive enterprise licensing bills.
            </p>
            <p>
              We started as a lean engineering studio in Pune. Today, we work as strategic design and system partners for brands across the country, building high-speed Next.js web applications, customizing CRM leads systems, and executing data-driven SEO campaigns.
            </p>
          </div>
        </motion.div>

        {/* Story Visuals */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-square md:aspect-auto md:h-[600px] rounded-[3rem] overflow-hidden relative border border-glass-border shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="APXTeck team collaborating on a web development project"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              className="object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-700"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" aria-hidden="true" />

            {/* Floating Stat inside image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-8 left-8 right-8 bg-background/80 backdrop-blur-md border border-white/10 p-6 rounded-3xl"
            >
              <div className="text-3xl font-bold text-accent mb-1">100%</div>
              <div className="text-sm font-semibold text-foreground/80">In-house Engineering Team</div>
              <div className="text-xs text-foreground/60 mt-1">Zero outsourcing. Maximum quality control.</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
