'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft, KeyRound } from 'lucide-react';
import Link from 'next/link';

export default function CustomerSecuritySettingsPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <motion.div variants={item} className="flex items-center gap-4">
        <Link href="/customer/settings" className="p-2 rounded-xl bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 hover:border-cyan-500/30 text-gray-500 hover:text-cyan-500 transition-all">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Security Settings</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Update your password to keep your account secure.</p>
        </div>
      </motion.div>

      {/* Main Form */}
      <motion.div variants={item} className="bg-white dark:bg-[#111] p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm space-y-8">
        <div className="flex items-center gap-4 border-b border-gray-100 dark:border-white/5 pb-6">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Change Password</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Ensure your new password is strong and unique.</p>
          </div>
        </div>

        <form className="space-y-6">
          <div className="space-y-2 max-w-md">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Current Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all text-gray-900 dark:text-white"
              placeholder="Enter current password"
            />
          </div>
          
          <div className="space-y-2 max-w-md">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">New Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all text-gray-900 dark:text-white"
              placeholder="Enter new password"
            />
          </div>

          <div className="space-y-2 max-w-md">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Confirm New Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all text-gray-900 dark:text-white"
              placeholder="Confirm new password"
            />
          </div>

          <div className="pt-4 flex items-center gap-4">
            <button type="button" className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-8 py-3 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all active:scale-[0.98]">
              Update Password
            </button>
            <Link href="/customer/settings" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-bold px-4 py-3 transition-colors">
              Cancel
            </Link>
          </div>
        </form>

        <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-4 flex gap-3 mt-8">
          <Shield className="w-5 h-5 text-indigo-500 shrink-0" />
          <div className="space-y-1">
             <p className="text-sm font-bold text-indigo-700 dark:text-indigo-400">Password Requirements</p>
             <ul className="text-xs text-indigo-600/80 dark:text-indigo-400/80 space-y-1 list-disc list-inside">
                <li>Minimum 8 characters long</li>
                <li>At least one uppercase and one lowercase letter</li>
                <li>At least one number and special character</li>
             </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
