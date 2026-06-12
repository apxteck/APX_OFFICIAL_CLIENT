"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { PaymentsHeader } from './PaymentsHeader';
import { PaymentsSummary } from './PaymentsSummary';
import { PaymentsTable } from './PaymentsTable';

export default function PaymentsManager() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 pb-12">
      <PaymentsHeader />
      <PaymentsSummary />
      <PaymentsTable />
    </motion.div>
  );
}
