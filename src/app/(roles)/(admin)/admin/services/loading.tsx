import React from 'react';

export default function ServicesLoading() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-48 mb-3"></div>
          <div className="h-4 bg-gray-100 dark:bg-gray-800/50 rounded w-72"></div>
        </div>
        <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-xl w-36"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-[#111111] rounded-3xl overflow-hidden border border-gray-100 dark:border-white/5"
          >
            <div className="h-48 bg-gray-200 dark:bg-gray-800 w-full"></div>
            <div className="p-5 space-y-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-md w-3/4"></div>
              <div className="h-4 bg-gray-100 dark:bg-gray-800/50 rounded w-1/2"></div>
              <div className="flex gap-2 pt-2">
                <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
