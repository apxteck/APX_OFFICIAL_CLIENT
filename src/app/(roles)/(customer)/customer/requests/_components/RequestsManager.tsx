"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { RequestsHeader } from './RequestsHeader';
import { RequestsFilter } from './RequestsFilter';
import { RequestsGrid } from './RequestsGrid';

export default function RequestsManager() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 pb-12">
      <RequestsHeader />
      <RequestsFilter />
      <RequestsGrid />
    </motion.div>
  );
}
