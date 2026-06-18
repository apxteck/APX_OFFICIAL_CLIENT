import React from 'react';

export default function PermissionsLoading() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 animate-pulse">
      <div className="mb-6">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-64 mb-2"></div>
        <div className="h-4 bg-gray-100 dark:bg-gray-800/50 rounded w-96"></div>
      </div>
      <div className="bg-white dark:bg-[#111111] p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-48 mb-3"></div>
        <div className="h-12 bg-gray-100 dark:bg-[#1a1a1a] rounded-xl w-full max-w-sm"></div>
      </div>
      <div className="bg-white dark:bg-[#111111] rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden flex flex-col min-h-[400px] justify-center items-center">
        <div className="h-10 w-10 bg-gray-200 dark:bg-gray-800 rounded-full mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-48"></div>
      </div>
    </div>
  );
}
