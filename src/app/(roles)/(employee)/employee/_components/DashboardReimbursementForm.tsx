import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

interface DashboardReimbursementFormProps {
  claimTitle: string;
  setClaimTitle: (val: string) => void;
  claimAmount: string;
  setClaimAmount: (val: string) => void;
  claimCategory: string;
  setClaimCategory: (val: string) => void;
  isSubmittingClaim: boolean;
  claimSuccess: boolean;
  handleApplyReimbursement: (e: React.FormEvent) => void;
}

export function DashboardReimbursementForm({
  claimTitle,
  setClaimTitle,
  claimAmount,
  setClaimAmount,
  claimCategory,
  setClaimCategory,
  isSubmittingClaim,
  claimSuccess,
  handleApplyReimbursement,
}: DashboardReimbursementFormProps) {
  return (
    <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl space-y-6 shadow-sm">
      <div className="border-b border-gray-100 dark:border-white/10 pb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Claim Reimbursement</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Submit expenditures for review
        </p>
      </div>

      <form onSubmit={handleApplyReimbursement} className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Title / Item Description
          </label>
          <input
            type="text"
            value={claimTitle}
            onChange={(e) => setClaimTitle(e.target.value)}
            placeholder="e.g. Hostinger Web Server Renewal"
            className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 min-h-[44px] outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm sm:text-xs font-medium text-gray-900 dark:text-white"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Amount (INR)
            </label>
            <input
              type="number"
              value={claimAmount}
              onChange={(e) => setClaimAmount(e.target.value)}
              placeholder="e.g. 1500"
              className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 min-h-[44px] outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm sm:text-xs font-medium text-gray-900 dark:text-white"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Category
            </label>
            <select
              value={claimCategory}
              onChange={(e) => setClaimCategory(e.target.value)}
              className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-xl px-3 py-3 min-h-[44px] outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm sm:text-xs font-medium cursor-pointer text-gray-900 dark:text-white"
            >
              <option value="Travel">Travel</option>
              <option value="Meals & Entertainment">Meals & Ent.</option>
              <option value="Software/SaaS">Software/SaaS</option>
              <option value="Hardware">Hardware</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmittingClaim}
          className="w-full min-h-[44px] bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl text-sm sm:text-xs flex items-center justify-center gap-2 shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] active:scale-[0.98] transition-all disabled:opacity-75 disabled:active:scale-100 cursor-pointer"
        >
          {isSubmittingClaim ? 'Submitting...' : 'Submit Claim Request'}
          <Send className="w-3.5 h-3.5" />
        </button>

        <AnimatePresence>
          {claimSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="p-3 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 rounded-xl text-xs font-semibold flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 dark:text-emerald-400" />
              <span>Claim submitted successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
