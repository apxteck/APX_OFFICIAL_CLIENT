import React, { useState, useEffect } from "react";
import { Edit, XCircle, CheckCircle2 } from "lucide-react";
import { AdPricingSlot } from "@/app/types/ad.types";

interface PricingSlotModalProps {
  slot: Partial<AdPricingSlot> | null;
  onClose: () => void;
  onSave: (id: number | null, data: Partial<AdPricingSlot>) => Promise<boolean>;
  isCreating?: boolean;
}

export default function PricingSlotModal({ slot, onClose, onSave, isCreating = false }: PricingSlotModalProps) {
  const [formData, setFormData] = useState<Partial<AdPricingSlot>>({
    label: "",
    pricePerDay: 0,
    pricePerWeek: 0,
    pricePerMonth: 0,
    isActive: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (slot) {
      setFormData({
        label: slot.label || "",
        placement: slot.placement || "BLOG_LIST_TOP",
        pricePerDay: slot.pricePerDay || 0,
        pricePerWeek: slot.pricePerWeek || 0,
        pricePerMonth: slot.pricePerMonth || 0,
        isActive: slot.isActive ?? true,
      });
    }
  }, [slot]);

  if (!slot) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Ensure numeric values are sent properly
    const payload = {
      ...formData,
      pricePerDay: Number(formData.pricePerDay) || 0,
      pricePerWeek: Number(formData.pricePerWeek) || 0,
      pricePerMonth: Number(formData.pricePerMonth) || 0,
    };
    
    const success = await onSave(isCreating ? null : slot.id!, payload);
    setIsSubmitting(false);
    if (success) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-[#151515]/50">
          <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
            <Edit className="text-indigo-500" size={20} />
            {isCreating ? 'Create Pricing Slot' : 'Edit Pricing Slot'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors bg-white dark:bg-[#222] p-1.5 rounded-full border border-gray-200 dark:border-white/10">
            <XCircle size={20} />
          </button>
        </div>

        <form id="pricing-form" onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Placement ID</label>
            {isCreating ? (
              <select
                name="placement"
                value={formData.placement || "BLOG_LIST_TOP"}
                onChange={handleChange as any}
                className="w-full bg-white dark:bg-[#151515] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
              >
                <option value="BLOG_LIST_TOP">BLOG_LIST_TOP</option>
                <option value="BLOG_LIST_MID">BLOG_LIST_MID</option>
                <option value="BLOG_POST_TOP">BLOG_POST_TOP</option>
                <option value="BLOG_POST_MID">BLOG_POST_MID</option>
                <option value="BLOG_POST_BOTTOM">BLOG_POST_BOTTOM</option>
                <option value="BLOG_POST_SIDEBAR">BLOG_POST_SIDEBAR</option>
              </select>
            ) : (
              <input 
                type="text" 
                value={slot.placement}
                disabled
                className="w-full bg-gray-100 dark:bg-[#222] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium cursor-not-allowed"
              />
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Display Label</label>
            <input 
              type="text" 
              name="label"
              value={formData.label || ""}
              onChange={handleChange}
              placeholder="e.g. Top Banner (728x90)"
              className="w-full bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price / Day ($)</label>
              <input 
                type="number" 
                name="pricePerDay"
                min="0"
                step="0.01"
                value={formData.pricePerDay}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price / Wk ($)</label>
              <input 
                type="number" 
                name="pricePerWeek"
                min="0"
                step="0.01"
                value={formData.pricePerWeek}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price / Mo ($)</label>
              <input 
                type="number" 
                name="pricePerMonth"
                min="0"
                step="0.01"
                value={formData.pricePerMonth}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <div className="relative flex items-center">
              <input 
                type="checkbox" 
                id="isActive" 
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="peer sr-only"
              />
              <label 
                htmlFor="isActive"
                className={`w-12 h-6 bg-gray-200 dark:bg-white/10 rounded-full cursor-pointer shadow-inner transition-all
                  ${formData.isActive ? 'bg-emerald-500' : ''}
                  relative`}
              >
                <div className={`absolute top-[2px] left-[2px] bg-white border-gray-300 border rounded-full h-5 w-5 transition-all
                  ${formData.isActive ? 'translate-x-6 border-white' : ''}`}
                ></div>
              </label>
            </div>
            <label htmlFor="isActive" className="text-sm font-bold text-gray-700 dark:text-gray-300 cursor-pointer">
              Slot Available for Booking
            </label>
          </div>
        </form>

        <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-[#151515]/50 flex items-center justify-end gap-3">
          <button 
            type="button" 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold text-sm bg-white dark:bg-[#222] border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            form="pricing-form"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle2 size={16} />
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
