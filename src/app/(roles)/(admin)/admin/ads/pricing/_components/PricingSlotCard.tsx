import React from 'react';
import { DollarSign, Edit, Calendar, Clock, CreditCard, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { AdPricingSlot } from '@/app/types/ad.types';

interface PricingSlotCardProps {
  slot: AdPricingSlot;
  index: number;
  onEdit: (slot: AdPricingSlot) => void;
  onDelete: (id: number) => void;
  onToggleActive: (id: number, currentStatus: boolean) => void;
}

export function PricingSlotCard({
  slot,
  index,
  onEdit,
  onDelete,
  onToggleActive,
}: PricingSlotCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white dark:bg-[#111111] rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all flex flex-col relative overflow-hidden group"
    >
      {/* Status Toggle */}
      <button
        onClick={() => onToggleActive(slot.id, slot.isActive)}
        className="absolute top-4 right-4 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border border-gray-200 dark:border-white/10 shadow-sm bg-white dark:bg-[#151515]"
        title={`Toggle Status (Currently ${slot.isActive ? 'Active' : 'Inactive'})`}
      >
        <div
          className={`w-8 h-4 rounded-full p-0.5 transition-colors ${slot.isActive ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`}
        >
          <div
            className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform ${slot.isActive ? 'translate-x-4' : 'translate-x-0'}`}
          ></div>
        </div>
      </button>

      <button
        onClick={() => onDelete(slot.id)}
        className="absolute top-4 right-16 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border border-red-200 dark:border-red-900/30 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 shadow-sm bg-white dark:bg-[#151515] transition-colors"
        title="Delete Pricing Slot"
      >
        <Trash2 size={14} />
      </button>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center">
            <DollarSign size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg tracking-tight leading-tight">
              {slot.label || slot.placement.replace(/_/g, ' ')}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-0.5">
              {slot.placement}
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-6 bg-gray-50 dark:bg-[#1a1a1a] p-4 rounded-2xl border border-gray-100 dark:border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
              <Clock size={14} className="text-gray-400" />
              Daily
            </div>
            <span className="font-bold text-gray-900 dark:text-white">
              ${Number(slot.pricePerDay).toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
              <Calendar size={14} className="text-gray-400" />
              Weekly
            </div>
            <span className="font-bold text-gray-900 dark:text-white">
              ${Number(slot.pricePerWeek).toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-200 dark:border-white/10">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
              <CreditCard size={14} className="text-indigo-500" />
              Monthly
            </div>
            <span className="font-black text-lg text-indigo-600 dark:text-indigo-400">
              ${Number(slot.pricePerMonth).toFixed(2)}
            </span>
          </div>
        </div>

        <div className="mt-auto">
          <button
            onClick={() => onEdit(slot)}
            className="w-full min-h-[44px] bg-gray-50 hover:bg-indigo-50 dark:bg-white/5 dark:hover:bg-indigo-500/10 text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 px-4 py-3 rounded-xl font-bold text-sm transition-colors border border-gray-200 dark:border-white/10 hover:border-indigo-200 dark:hover:border-indigo-500/30 flex items-center justify-center gap-2"
          >
            <Edit size={16} />
            Edit Pricing
          </button>
        </div>
      </div>
    </motion.div>
  );
}
