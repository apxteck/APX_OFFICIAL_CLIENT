import React from 'react';

export default function CompanyAssetsLoading() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 animate-pulse">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-48 mb-2"></div>
          <div className="h-4 bg-gray-100 dark:bg-gray-800/50 rounded w-64"></div>
        </div>
        <div className="h-10 bg-indigo-200 dark:bg-indigo-900/30 rounded-xl w-32"></div>
      </div>

      <div className="bg-white dark:bg-[#111111] rounded-3xl border border-gray-100 dark:border-white/5 h-[400px] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
