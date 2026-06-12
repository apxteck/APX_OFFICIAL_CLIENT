'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { publicFaqsService } from '@/services/public/faqs.service';
import { Faq } from '@/app/types/faq.types';

export function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await publicFaqsService.getFaqs();
        // Since we fetch public FAQs, they might already be filtered by isPublished
        // but just in case, we'll sort them.
        const sortedFaqs = data.sort((a, b) => a.sortOrder - b.sortOrder);
        setFaqs(sortedFaqs);
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <section className="py-32 relative">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold tracking-tight mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground/70 text-lg"
          >
            Everything you need to know about our services and process.
          </motion.p>
        </div>

        <div className="space-y-4 min-h-[200px]">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : faqs.length > 0 ? (
            faqs.map((faq, index) => {
              const isActive = activeIndex === index;

              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    'border border-glass-border rounded-2xl overflow-hidden transition-colors',
                    isActive ? 'bg-accent/5 border-accent/30' : 'bg-transparent hover:bg-white/5'
                  )}
                >
                  <button
                    suppressHydrationWarning
                    onClick={() => setActiveIndex(isActive ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="font-semibold text-lg">{faq.question}</span>
                    <ChevronDown
                      className={cn(
                        'w-5 h-5 text-accent transition-transform duration-300',
                        isActive ? 'rotate-180' : ''
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 text-foreground/70 leading-relaxed whitespace-pre-wrap">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center text-foreground/50 py-10">
              No FAQs available at the moment.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
