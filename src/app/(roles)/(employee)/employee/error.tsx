'use client';

import React, { useEffect } from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';

export default function EmployeeDashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Employee Dashboard Error:', error);
  }, [error]);

  return (
    <div className="w-full h-full min-h-[60vh] flex flex-col items-center justify-center p-6 space-y-6 text-center">
      <div className="w-16 h-16 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>

      <div className="space-y-2 max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Failed to load dashboard
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          We encountered an error while loading your dashboard data. Our team has been notified.
        </p>
      </div>

      <button
        onClick={() => reset()}
        className="flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all active:scale-95"
      >
        <RefreshCcw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
}
