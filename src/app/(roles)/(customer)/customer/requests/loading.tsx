import React from 'react';

export default function RequestsLoading() {
  return (
    <div className="space-y-8 pb-12 animate-pulse max-w-7xl mx-auto">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="h-8 bg-gray-200 dark:bg-white/10 rounded w-64 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-96"></div>
        </div>
        <div className="h-10 bg-gray-200 dark:bg-white/10 rounded-xl w-32"></div>
      </div>

      {/* Filter Skeleton */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-[#111] p-4 rounded-2xl border border-gray-100 dark:border-white/5">
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 w-24 bg-gray-200 dark:bg-white/10 rounded-xl"></div>
          ))}
        </div>
        <div className="h-10 w-full md:w-64 bg-gray-200 dark:bg-white/10 rounded-xl"></div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-[#111] rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm animate-pulse flex flex-col h-[280px]"
          >
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className="h-6 w-24 bg-gray-200 dark:bg-white/10 rounded-lg"></div>
                <div className="h-4 w-16 bg-gray-200 dark:bg-white/10 rounded"></div>
              </div>
              <div className="h-6 w-3/4 bg-gray-200 dark:bg-white/10 rounded mb-2"></div>
              <div className="h-6 w-1/2 bg-gray-200 dark:bg-white/10 rounded"></div>

              <div className="space-y-3 mt-6">
                <div className="h-4 w-2/3 bg-gray-200 dark:bg-white/10 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-200 dark:bg-white/10 rounded"></div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-50 dark:border-white/5 flex items-center justify-between">
              <div className="h-4 w-24 bg-gray-200 dark:bg-white/10 rounded"></div>
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
