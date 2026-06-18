import React from 'react';

export default function PaymentsLoading() {
  return (
    <div className="space-y-8 pb-12 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="h-8 bg-gray-200 dark:bg-white/10 rounded w-64 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-96"></div>
        </div>
        <div className="h-10 bg-gray-200 dark:bg-white/10 rounded-xl w-32"></div>
      </div>

      {/* Summary Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-48 rounded-3xl bg-gray-200 dark:bg-white/10 border border-gray-100 dark:border-white/5"></div>
        <div className="h-48 rounded-3xl bg-gray-200 dark:bg-white/10 border border-gray-100 dark:border-white/5"></div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white dark:bg-[#111] p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm space-y-6">
        <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-48 mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="h-10 bg-gray-200 dark:bg-white/10 rounded flex-1"></div>
              <div className="h-10 bg-gray-200 dark:bg-white/10 rounded flex-1"></div>
              <div className="h-10 bg-gray-200 dark:bg-white/10 rounded flex-1"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
