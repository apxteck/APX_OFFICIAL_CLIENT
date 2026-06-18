import React from 'react';

export default function CustomerDashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Welcome Banner Skeleton */}
      <div className="rounded-3xl bg-gray-200 dark:bg-white/5 h-[280px] md:h-[220px]"></div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-[#111] p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm h-[104px] flex items-center justify-between">
            <div className="space-y-3 w-1/2">
              <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-full"></div>
              <div className="h-8 bg-gray-200 dark:bg-white/10 rounded w-1/2"></div>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gray-200 dark:bg-white/10"></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Table Skeleton */}
        <div className="lg:col-span-2 bg-white dark:bg-[#111] p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm space-y-6 min-h-[400px]">
          <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-64 mb-8"></div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-white/5">
              <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-20"></div>
              <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-32"></div>
              <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-20"></div>
              <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-24"></div>
            </div>
          ))}
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-gray-200 dark:bg-white/5 h-[250px]"></div>
          <div className="rounded-3xl bg-gray-200 dark:bg-white/5 h-[150px]"></div>
        </div>
      </div>
    </div>
  );
}
