import React from 'react';

export default function PaymentsLoading() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-6">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-64 mb-2"></div>
        <div className="h-4 bg-gray-100 dark:bg-gray-800/50 rounded w-96"></div>
      </div>

      {/* Summary Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-[#161b22] border border-gray-100 dark:border-gray-800 rounded-xl p-4"
          >
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-24 mb-3"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
          </div>
        ))}
      </div>

      {/* Search & Actions Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="w-full sm:w-96 h-10 bg-gray-200 dark:bg-[#161b22] border border-gray-100 dark:border-gray-800 rounded-md"></div>
        <div className="flex gap-3">
          <div className="h-10 w-32 bg-gray-200 dark:bg-[#161b22] rounded-md"></div>
          <div className="h-10 w-20 bg-gray-200 dark:bg-[#161b22] rounded-md"></div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white dark:bg-[#0d1117] border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#161b22] flex justify-between">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-20"></div>
          ))}
        </div>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center"
          >
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-32"></div>
              <div className="h-3 bg-gray-100 dark:bg-gray-800/50 rounded w-24"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-40"></div>
              <div className="h-3 bg-gray-100 dark:bg-gray-800/50 rounded w-32"></div>
            </div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-24"></div>
            <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
            <div className="flex gap-2">
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
