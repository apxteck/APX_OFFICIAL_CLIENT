import React from "react";

export default function NotificationsLoading() {
  return (
    <div className="bg-white dark:bg-[#111111] p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm space-y-6 animate-pulse">
      {/* Controls Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-white/10 pb-6">
        <div className="flex gap-2">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-xl w-32"></div>
          <div className="h-8 bg-gray-100 dark:bg-gray-800/50 rounded-xl w-24"></div>
        </div>
      </div>

      {/* List Skeleton */}
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-4 p-4 rounded-xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#151515]">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
              <div className="h-3 bg-gray-100 dark:bg-gray-800/50 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
