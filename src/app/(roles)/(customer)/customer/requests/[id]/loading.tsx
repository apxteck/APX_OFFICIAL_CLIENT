import React from 'react';

export default function RequestDetailsLoading() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white dark:bg-[#111] p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-gray-200 dark:bg-white/10 rounded-xl"></div>
          <div>
            <div className="h-4 w-32 bg-gray-200 dark:bg-white/10 rounded mb-3"></div>
            <div className="h-8 w-64 bg-gray-200 dark:bg-white/10 rounded"></div>
          </div>
        </div>
        <div className="h-10 w-32 bg-gray-200 dark:bg-white/10 rounded-xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column Skeleton */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-[#111] p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm h-[300px]">
            <div className="h-6 w-48 bg-gray-200 dark:bg-white/10 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 w-full bg-gray-200 dark:bg-white/10 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-white/10 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-200 dark:bg-white/10 rounded"></div>
            </div>
          </div>
          <div className="bg-white dark:bg-[#111] p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm h-[200px]">
            <div className="h-6 w-48 bg-gray-200 dark:bg-white/10 rounded mb-8"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-20 bg-gray-200 dark:bg-white/10 rounded-2xl"></div>
              <div className="h-20 bg-gray-200 dark:bg-white/10 rounded-2xl"></div>
            </div>
          </div>
        </div>

        {/* Right Column Skeleton */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-[#111] p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm h-[200px]">
            <div className="h-6 w-32 bg-gray-200 dark:bg-white/10 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-10 w-full bg-gray-200 dark:bg-white/10 rounded-xl"></div>
              <div className="h-10 w-full bg-gray-200 dark:bg-white/10 rounded-xl"></div>
            </div>
          </div>
          <div className="bg-white dark:bg-[#111] p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm h-[150px]">
            <div className="h-6 w-32 bg-gray-200 dark:bg-white/10 rounded mb-6"></div>
            <div className="h-16 w-full bg-gray-200 dark:bg-white/10 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
