"use client";

import React, { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function CustomerDashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="min-h-[400px] flex items-center justify-center p-6">
      <div className="bg-white dark:bg-[#111111] border border-red-100 dark:border-red-500/20 rounded-3xl p-8 max-w-md w-full text-center shadow-sm">
        <div className="w-16 h-16 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Failed to load dashboard</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
          There was an issue retrieving your dashboard data. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
        >
          <RefreshCcw size={18} />
          Try Again
        </button>
      </div>
    </div>
  );
}
