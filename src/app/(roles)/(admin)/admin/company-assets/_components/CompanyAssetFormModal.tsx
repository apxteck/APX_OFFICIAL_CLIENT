import React from 'react';
import { CompanyAsset } from '@/services/admin/companyAssets.service';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Box, Calendar, DollarSign, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  onClose: () => void;
  formLogic: any;
}

export default function CompanyAssetFormModal({ onClose, formLogic }: Props) {
  const { editingAsset, isSubmitting, handleSubmit } = formLogic;
  const isEditing = !!editingAsset;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      await handleSubmit(e);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white dark:bg-[#111111] rounded-2xl sm:rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-white/10"
      >
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-gray-100 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-white/5 flex items-center justify-center text-indigo-600 dark:text-white">
              <Box size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {isEditing ? 'Edit Company Asset' : 'Add New Asset'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {isEditing ? 'Update the details of the selected asset' : 'Fill in the information to add a new asset'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Asset Type *</label>
              <select
                required
                name="type"
                defaultValue={editingAsset?.type || ''}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all"
              >
                <option value="" disabled>Select an asset type...</option>
                <option value="DOMAIN">Domain</option>
                <option value="TRADEMARK">Trademark</option>
                <option value="LICENSE">License</option>
                <option value="REGISTRATION">Registration</option>
                <option value="CERTIFICATE">Certificate</option>
                <option value="SUBSCRIPTION">Subscription</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Title *</label>
              <input
                required
                type="text"
                name="title"
                defaultValue={editingAsset?.title}
                placeholder="e.g. MacBook Pro M2"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Reference Number</label>
              <input
                type="text"
                name="referenceNumber"
                defaultValue={editingAsset?.referenceNumber || ''}
                placeholder="e.g. SRN-2023-01"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Provider / Vendor</label>
              <input
                type="text"
                name="provider"
                defaultValue={editingAsset?.provider || ''}
                placeholder="e.g. Apple Inc."
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Issued Date</label>
              <div className="relative">
                <input
                  type="date"
                  name="issuedDate"
                  defaultValue={editingAsset?.issuedDate ? new Date(editingAsset.issuedDate).toISOString().split('T')[0] : ''}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all"
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Expiry / Return Date</label>
              <div className="relative">
                <input
                  type="date"
                  name="expiryDate"
                  defaultValue={editingAsset?.expiryDate ? new Date(editingAsset.expiryDate).toISOString().split('T')[0] : ''}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all"
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Renewal / Asset Cost</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  name="renewalCost"
                  defaultValue={editingAsset?.renewalCost || ''}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all"
                />
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Status *</label>
              <select
                required
                name="status"
                defaultValue={editingAsset?.status || 'ACTIVE'}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all"
              >
                <option value="ACTIVE">Active</option>
                <option value="EXPIRING_SOON">Expiring Soon</option>
                <option value="EXPIRED">Expired</option>
                <option value="RENEWED">Renewed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
              <input
                type="checkbox"
                name="autoRenew"
                defaultChecked={editingAsset?.autoRenew || false}
                className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500/50"
              />
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">Auto Renew</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Automatically renew this asset or subscription</div>
              </div>
            </label>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Notes</label>
            <textarea
              name="notes"
              defaultValue={editingAsset?.notes || ''}
              rows={3}
              placeholder="Any additional information..."
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all resize-none"
            />
          </div>
          
          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-white/5 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  {isEditing ? 'Save Changes' : 'Create Asset'}
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
