"use client";

import React from "react";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function NotificationsEmptyState() {
  const router = useRouter();
  const handleGoBack = () => router.back();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full min-h-[500px] bg-white dark:bg-[#111111] border border-dashed border-gray-200 dark:border-white/10 rounded-3xl flex flex-col items-center justify-center p-8 text-center shadow-[0px_4px_20px_rgba(0,0,0,0.02)]"
    >
      <div className="w-16 h-16 bg-gray-50 dark:bg-[#1a1a1a] rounded-full flex items-center justify-center mb-4 border border-gray-100 dark:border-white/5">
        <AlertCircle className="text-gray-400 dark:text-gray-500" size={32} />
      </div>
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Module Under Construction</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
        The <strong>Notifications</strong> frontend routing is active, but the backend APIs and data tables have not been connected yet. 
      </p>
      <button 
        onClick={handleGoBack}
        className="mt-6 min-h-[44px] flex items-center justify-center bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 px-6 py-2.5 rounded-xl font-bold text-sm transition-colors border border-gray-200 dark:border-white/10"
      >
        Go Back
      </button>
    </motion.div>
  );
}
