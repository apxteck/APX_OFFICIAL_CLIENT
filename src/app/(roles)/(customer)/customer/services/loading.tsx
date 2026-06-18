import React from 'react';

export default function ServicesLoading() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="h-8 bg-gray-200 dark:bg-white/10 rounded w-64 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-96"></div>
        </div>
        <div className="h-10 bg-gray-200 dark:bg-white/10 rounded-xl w-32"></div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
           <div key={i} className="bg-white dark:bg-[#111] p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm flex flex-col h-[250px]">
              <div className="w-12 h-12 rounded-2xl bg-gray-200 dark:bg-white/10 mb-6 shrink-0"></div>
              <div className="h-6 w-3/4 bg-gray-200 dark:bg-white/10 rounded mb-2"></div>
              <div className="space-y-2 mb-6 flex-1 mt-2">
                <div className="h-4 w-1/2 bg-gray-200 dark:bg-white/10 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-200 dark:bg-white/10 rounded mt-1"></div>
              </div>
              <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex justify-between items-center">
                <div className="h-6 w-24 bg-gray-200 dark:bg-white/10 rounded-md"></div>
                <div className="h-4 w-16 bg-gray-200 dark:bg-white/10 rounded"></div>
              </div>
           </div>
        ))}
      </div>
    </div>
  );
}
