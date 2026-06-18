'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function AboutCTA() {
  return (
    <section
      className="py-16 md:py-24 text-center max-w-4xl mx-auto px-4 sm:px-6 w-full overflow-hidden"
      aria-labelledby="about-cta-heading"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative rounded-[2.5rem] p-[2px] overflow-hidden group shadow-2xl"
      >
        {/* Spinning Gradient Border */}
        <div
          className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(14,165,233,0.5)_360deg)] animate-[spin_6s_linear_infinite]"
          aria-hidden="true"
        />

        {/* Inner Content Card */}
        <div className="relative z-10 bg-background/95 backdrop-blur-3xl rounded-[2.4rem] p-8 sm:p-12 md:p-20 border border-white/5 flex flex-col items-center justify-center w-full">
          <h2 id="about-cta-heading" className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6">
            Ready to Build a Custom Web Application?
          </h2>
          <p className="text-foreground/70 max-w-lg mx-auto mb-8 md:mb-10 text-base md:text-lg">
            Share your business requirements and we will design a high-performance, modular solution
            tailored to your budget.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full">
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] min-w-[44px] sm:h-14 items-center justify-center rounded-full bg-accent hover:bg-accent/90 text-white px-6 sm:px-8 py-3 sm:py-0 font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-accent/25 w-full sm:w-auto"
              aria-label="Navigate to contact page to get in touch with APXTeck"
            >
              Contact Our Next.js Experts
            </Link>
            <Link
              href="/services"
              className="inline-flex min-h-[44px] min-w-[44px] sm:h-14 items-center justify-center rounded-full glass-panel border border-glass-border text-foreground px-6 sm:px-8 py-3 sm:py-0 font-bold transition-all hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
              aria-label="Browse all web development and IT services"
            >
              Explore Our IT Services
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
