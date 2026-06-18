import React from 'react';

export default function EmployeeReimbursementsLoading() {
  return (
    <div className="w-full space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-gray-200 dark:bg-white/5 rounded-3xl h-[160px]"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Skeleton */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 p-6 sm:p-8 rounded-3xl space-y-6 shadow-sm h-[600px]">
            <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-48"></div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 dark:bg-white/10 rounded w-full"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-10 bg-gray-200 dark:bg-white/10 rounded w-full"></div>
                <div className="h-10 bg-gray-200 dark:bg-white/10 rounded w-full"></div>
              </div>
              <div className="h-24 bg-gray-200 dark:bg-white/10 rounded w-full"></div>
              <div className="h-24 bg-gray-200 dark:bg-white/10 rounded w-full"></div>
              <div className="h-12 bg-gray-200 dark:bg-white/10 rounded w-full mt-8"></div>
            </div>
          </div>
        </div>

        {/* List Skeleton */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 p-6 sm:p-8 rounded-3xl shadow-sm h-[600px] space-y-6">
            <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-40"></div>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex justify-between items-center p-5 rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-[#1a1a1a]"
              >
                <div className="space-y-2 w-1/2">
                  <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-1/2"></div>
                </div>
                <div className="h-8 bg-gray-200 dark:bg-white/10 rounded w-20"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
