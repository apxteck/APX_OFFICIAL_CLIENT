'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { RequestsHeader } from './RequestsHeader';
import { RequestsFilter } from './RequestsFilter';
import { RequestsGrid } from './RequestsGrid';
import { useRequestsLogic } from '../_hooks/useRequestsLogic';
import { ServiceRequest } from '../types';

interface RequestsManagerProps {
  initialRequests: ServiceRequest[];
}

export default function RequestsManager({ initialRequests }: RequestsManagerProps) {
  const {
    isLoading,
    filteredRequests,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
  } = useRequestsLogic(initialRequests);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 pb-12">
      <RequestsHeader />
      <RequestsFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <RequestsGrid
        isLoading={isLoading}
        filteredRequests={filteredRequests}
        searchQuery={searchQuery}
        statusFilter={statusFilter}
      />
    </motion.div>
  );
}
