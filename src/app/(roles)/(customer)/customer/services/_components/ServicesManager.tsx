"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ServicesHeader } from './ServicesHeader';
import { ServicesGrid } from './ServicesGrid';

export default function ServicesManager() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 pb-12">
      <ServicesHeader />
      <ServicesGrid />
    </motion.div>
  );
}
