'use client';

import { motion } from 'framer-motion';
import { Lightbulb, PenTool, Code2, Rocket } from 'lucide-react';

const processSteps = [
  {
    id: '01',
    title: 'Discovery & Strategy',
    description: 'We dive deep into your business requirements, target audience, and goals to craft a tailored digital roadmap.',
    icon: Lightbulb,
    color: '#8b5cf6', // Purple
  },
  {
    id: '02',
    title: 'UI/UX Design',
    description: 'Our design leads create premium, glassmorphic interfaces focused on conversion and flawless user experience.',
    icon: PenTool,
    color: '#ec4899', // Pink
  },
  {
    id: '03',
    title: 'Engineering',
    description: 'We build scalable, secure architectures using Next.js, Node.js, and Prisma—engineered for lightning speed.',
    icon: Code2,
    color: '#0ea5e9', // Cyan
  },
  {
    id: '04',
    title: 'Launch & Scale',
    description: 'We deploy your platform, optimize it for search engines, and provide continuous support to scale your traffic.',
    icon: Rocket,
    color: '#10b981', // Emerald
  },
];

export function ProcessSection() {
  return (
    <section className="py-32 relative bg-background overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-semibold uppercase tracking-wider mb-4"
          >
            How We Work
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6"
          >
            Our Proven Delivery Process
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground/75 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            From raw concept to enterprise-grade execution. We follow a strict, agile methodology that guarantees quality at every step.
          </motion.p>
        </div>

        <div className="relative">
          {/* Central Connecting Line (Visible on md+) */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="hidden md:block absolute left-1/2 top-0 w-px bg-gradient-to-b from-transparent via-accent/50 to-transparent -translate-x-1/2" 
          />
          
          {/* Faint static background line so it doesn't look completely empty before animation */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-glass-border/30 -translate-x-1/2 -z-10" />

          <div className="space-y-12 md:space-y-24">
            {processSteps.map((step, index) => {
              const isRightSide = index % 2 !== 0;
              const Icon = step.icon;

              const CardContent = (
                <motion.div
                  initial={{ opacity: 0, x: isRightSide ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
                  className="w-full max-w-lg"
                >
                  {/* Glowing Animated Border Container */}
                  <div className="relative rounded-3xl p-[1.5px] overflow-hidden group w-full shadow-2xl">
                    
                    {/* Spinning Gradient */}
                    <div 
                      className="absolute inset-[-150%] animate-[spin_4s_linear_infinite] opacity-80" 
                      style={{ background: `conic-gradient(from 0deg, transparent 0 280deg, ${step.color} 360deg)` }} 
                    />
                    
                    {/* Card Body */}
                    <div className="relative h-full bg-background/95 backdrop-blur-2xl border border-white/5 p-8 rounded-[23px] flex flex-col z-10 hover:bg-background/90 transition-colors duration-300">
                      
                      {/* Huge Background Number */}
                      <div 
                        className="absolute right-4 top-4 text-7xl md:text-8xl font-extrabold select-none pointer-events-none transition-all duration-500 opacity-20 group-hover:opacity-40 group-hover:scale-110 origin-top-right"
                        style={{
                          WebkitTextStroke: `2px ${step.color}`,
                          color: 'transparent'
                        }}
                      >
                        {step.id}
                      </div>
                      
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center border backdrop-blur-sm mb-6 z-20"
                        style={{
                          backgroundColor: `${step.color}14`,
                          borderColor: `${step.color}3a`,
                          color: step.color,
                          boxShadow: `0 8px 20px -6px ${step.color}26`,
                        }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <h3 className="text-2xl font-bold tracking-tight text-foreground mb-3 z-20">
                        {step.title}
                      </h3>
                      <p className="text-foreground/70 leading-relaxed text-sm z-20 break-words h-auto">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );

              return (
                <div key={step.id} className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 w-full items-center">
                  
                  {/* Left Column */}
                  {!isRightSide ? (
                    <div className="w-full flex md:justify-end md:pr-16">
                      {CardContent}
                    </div>
                  ) : (
                    <div className="hidden md:block" />
                  )}

                  {/* Center Node (Timeline Point) */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 items-center justify-center z-10">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="w-12 h-12 rounded-full bg-background border-4 border-glass-border flex items-center justify-center shadow-xl"
                      style={{ borderColor: step.color }}
                    >
                      <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: step.color }} />
                    </motion.div>
                  </div>

                  {/* Right Column */}
                  {isRightSide ? (
                    <div className="w-full flex md:justify-start md:pl-16">
                      {CardContent}
                    </div>
                  ) : (
                    <div className="hidden md:block" />
                  )}

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
