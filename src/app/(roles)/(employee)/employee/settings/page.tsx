'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Briefcase, Mail, Phone, Shield } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import Link from 'next/link';

export default function EmployeeSettingsPage() {
  const { user } = useAuth();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) return null;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your employee profile, security, and preferences.</p>
      </motion.div>

      {/* Profile Section */}
      <motion.div variants={item} className="bg-white dark:bg-[#111] p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm space-y-6">
        <div className="flex items-center gap-4 border-b border-gray-100 dark:border-white/5 pb-6">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Personal Information</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Update your details and public profile.</p>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" /> Full Name
              </label>
              <input 
                type="text" 
                defaultValue={user?.fullName || ''}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 transition-all text-gray-900 dark:text-white"
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" /> Email Address
              </label>
              <input 
                type="email" 
                defaultValue={user?.email || ''}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 transition-all text-gray-500 cursor-not-allowed opacity-70"
                disabled
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" /> Phone Number
              </label>
              <input 
                type="tel" 
                defaultValue={user?.phone || ''}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 transition-all text-gray-900 dark:text-white"
                placeholder="Enter phone number"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-gray-400" /> Role
              </label>
              <input 
                type="text" 
                defaultValue={user?.role || 'Employee'}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 transition-all text-gray-500 cursor-not-allowed opacity-70 capitalize"
                disabled
              />
            </div>
          </div>
          <div className="pt-4 flex justify-end">
            <button type="button" className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all active:scale-[0.98]">
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>

      {/* Security & Notifications Grid */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#111] p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm hover:border-indigo-500/30 transition-all cursor-pointer group flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
              <Shield className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Security Settings</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Update your password and secure your account.</p>
          </div>
          <Link href="/employee/settings/security" className="w-full py-2.5 rounded-xl border-2 border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold group-hover:bg-indigo-500/10 transition-all text-center block">
            Change Password
          </Link>
        </div>

        <div className="bg-white dark:bg-[#111] p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm hover:border-amber-500/30 transition-all cursor-pointer group flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
              <Bell className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Notifications</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Manage how you receive updates and alerts.</p>
          </div>
          <Link href="/employee/settings/notifications" className="w-full py-2.5 rounded-xl border-2 border-amber-500/20 text-amber-600 dark:text-amber-400 font-bold group-hover:bg-amber-500/10 transition-all text-center block">
            Manage Preferences
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
