"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ServicesHeader } from './ServicesHeader';
import { ServicesGrid } from './ServicesGrid';
import { ServiceRequest } from '../types';
import { useServicesLogic } from '../_hooks/useServicesLogic';

interface ServicesManagerProps {
  initialServices: ServiceRequest[];
}

export default function ServicesManager({ initialServices }: ServicesManagerProps) {
  const { services, isLoading } = useServicesLogic(initialServices);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="w-full max-w-7xl mx-auto space-y-8 px-4 sm:px-6 md:px-8 pt-4 pb-safe">
      <ServicesHeader />
      <ServicesGrid services={services} isLoading={isLoading} />
    </motion.div>
  );
}
