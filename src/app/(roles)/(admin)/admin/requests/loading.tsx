import React from "react";

export default function RequestsLoading() {
  return (
    <div className="max-w-7xl mx-auto pb-10 space-y-6 animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div>
          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-64 mb-3"></div>
          <div className="h-4 bg-gray-100 dark:bg-gray-800/50 rounded w-96"></div>
        </div>
        <div className="flex gap-3">
          <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-2xl w-28"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-2xl w-36"></div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-[#111111] rounded-[2rem] border border-gray-100 dark:border-white/5 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-[#1a1a1a]/50">
          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-xl w-64"></div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-white/5">
                <div className="space-y-2">
                  <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-24"></div>
                  <div className="h-3 bg-gray-100 dark:bg-gray-800/50 rounded w-16"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-32"></div>
                  <div className="h-3 bg-gray-100 dark:bg-gray-800/50 rounded w-40"></div>
                </div>
                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-lg w-28"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-lg w-20"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-xl w-20"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
