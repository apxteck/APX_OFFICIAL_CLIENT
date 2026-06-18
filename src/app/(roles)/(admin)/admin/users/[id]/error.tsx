'use client';

import React from 'react';
import Link from 'next/link';
import { AlertTriangle, ArrowLeft, RefreshCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
      <div className="w-20 h-20 bg-red-50 dark:bg-red-500/10 rounded-3xl flex items-center justify-center mb-6 border border-red-100 dark:border-red-500/20 shadow-sm">
        <AlertTriangle className="w-10 h-10 text-red-500" />
      </div>
      <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
        Failed to load user profile
      </h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
        {error.message || "An unexpected error occurred while loading this user's information."}
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={reset}
          className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-sm"
        >
          <RefreshCcw size={16} /> Try Again
        </button>
        <Link
          href="/admin/users"
          className="flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-[#111] text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 border border-gray-200 dark:border-white/10 transition-colors shadow-sm"
        >
          <ArrowLeft size={16} /> Back to Users
        </Link>
      </div>
    </div>
  );
}
