"use client";

import React, { useState } from "react";
import { DollarSign, Edit, AlertCircle, Calendar, Clock, CreditCard, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { usePricingSlotsLogic } from "../_hooks/usePricingSlotsLogic";
import PricingSlotModal from "../_components/PricingSlotModal";
import { AdPricingSlot } from "@/app/types/ad.types";

export default function Page() {
  const { slots, isLoading, createSlot, updateSlot, deleteSlot, handleToggleActive } = usePricingSlotsLogic();
  const [editingSlot, setEditingSlot] = useState<Partial<AdPricingSlot> | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateNew = () => {
    setEditingSlot({
      placement: "BLOG_LIST_TOP",
      label: "",
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
    if (window.confirm("Are you sure you want to delete this pricing slot?")) {
      await deleteSlot(id);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
              <DollarSign size={24} />
            </div>
            Ad Pricing
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-2">
            Configure slot pricing and packages.
          </p>
        </div>
        <button 
          onClick={handleCreateNew}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus size={18} />
          Create Pricing Slot
        </button>
      </div>

      {isLoading ? (
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
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No Pricing Slots Found</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">
            There are currently no advertisement pricing slots available in the database.
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slots.map((slot, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={slot.id}
              className="bg-white dark:bg-[#111111] rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all flex flex-col relative overflow-hidden group"
            >
              {/* Status Toggle */}
              <button 
                onClick={() => handleToggleActive(slot.id, slot.isActive)}
                className="absolute top-4 right-4 z-10 p-1 rounded-full border border-gray-200 dark:border-white/10 shadow-sm bg-white dark:bg-[#151515] flex items-center justify-center"
                title={`Toggle Status (Currently ${slot.isActive ? 'Active' : 'Inactive'})`}
              >
                <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${slot.isActive ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`}>
                  <div className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform ${slot.isActive ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
              </button>

              <button 
                onClick={() => handleDelete(slot.id)}
                className="absolute top-4 right-16 z-10 p-2 rounded-full border border-red-200 dark:border-red-900/30 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 shadow-sm bg-white dark:bg-[#151515] flex items-center justify-center transition-colors"
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
                      {slot.label || slot.placement.replace(/_/g, " ")}
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
                    <span className="font-bold text-gray-900 dark:text-white">${Number(slot.pricePerDay).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                      <Calendar size={14} className="text-gray-400" />
                      Weekly
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">${Number(slot.pricePerWeek).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-200 dark:border-white/10">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                      <CreditCard size={14} className="text-indigo-500" />
                      Monthly
                    </div>
                    <span className="font-black text-lg text-indigo-600 dark:text-indigo-400">${Number(slot.pricePerMonth).toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <button 
                    onClick={() => setEditingSlot(slot)}
                    className="w-full bg-gray-50 hover:bg-indigo-50 dark:bg-white/5 dark:hover:bg-indigo-500/10 text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 px-4 py-3 rounded-xl font-bold text-sm transition-colors border border-gray-200 dark:border-white/10 hover:border-indigo-200 dark:hover:border-indigo-500/30 flex items-center justify-center gap-2"
                  >
                    <Edit size={16} />
                    Edit Pricing
                  </button>
                </div>
              </div>
            </motion.div>
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
