'use client';

import React, { useState } from 'react';
import { DollarSign, AlertCircle, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { usePricingSlotsLogic } from '../../_hooks/usePricingSlotsLogic';
import { AdPricingSlot } from '@/app/types/ad.types';
import { PricingSlotCard } from './PricingSlotCard';

const PricingSlotModal = dynamic(() => import('../../_components/PricingSlotModal'), {
  ssr: false,
});

interface PricingManagerProps {
  initialSlots?: AdPricingSlot[];
}

export function PricingManager({ initialSlots = [] }: PricingManagerProps) {
  const { slots, isLoading, createSlot, updateSlot, deleteSlot, handleToggleActive } =
    usePricingSlotsLogic(initialSlots);
  const [editingSlot, setEditingSlot] = useState<Partial<AdPricingSlot> | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateNew = () => {
    setEditingSlot({
      placement: 'BLOG_LIST_TOP',
      label: '',
      pricePerDay: 0,
      pricePerWeek: 0,
      pricePerMonth: 0,
      isActive: true,
    });
    setIsCreating(true);
  };

  const handleCloseModal = () => {
    setEditingSlot(null);
    setIsCreating(false);
  };

  const handleSave = async (id: number | null, data: Partial<AdPricingSlot>) => {
    if (isCreating) {
      return await createSlot(data);
    } else if (id !== null) {
      return await updateSlot(id, data);
    }
    return false;
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this pricing slot?')) {
      await deleteSlot(id);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto pb-safe px-4 sm:px-6 md:px-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
              <DollarSign size={24} className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            Ad Pricing
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-2">
            Configure slot pricing and packages.
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 min-h-[44px] rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm flex-1 sm:flex-none"
        >
          <Plus size={18} />
          Create Pricing Slot
        </button>
      </div>

      {isLoading && slots.length === 0 ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      ) : slots.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full min-h-[400px] bg-white dark:bg-[#111111] border border-dashed border-gray-200 dark:border-white/10 rounded-3xl flex flex-col items-center justify-center p-8 text-center"
        >
          <div className="w-16 h-16 bg-gray-50 dark:bg-[#1a1a1a] rounded-full flex items-center justify-center mb-4 border border-gray-100 dark:border-white/5">
            <AlertCircle className="text-gray-400 dark:text-gray-500" size={32} />
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            No Pricing Slots Found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">
            There are currently no advertisement pricing slots available in the database.
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slots.map((slot: AdPricingSlot, index: number) => (
            <PricingSlotCard
              key={slot.id}
              slot={slot}
              index={index}
              onEdit={setEditingSlot}
              onDelete={handleDelete}
              onToggleActive={handleToggleActive}
            />
          ))}
        </div>
      )}

      {editingSlot && (
        <PricingSlotModal
          slot={editingSlot}
          isCreating={isCreating}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
