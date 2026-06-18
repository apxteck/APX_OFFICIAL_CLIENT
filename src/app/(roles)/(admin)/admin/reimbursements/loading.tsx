import React from "react";

export default function ReimbursementsLoading() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 animate-pulse">
      <div className="mb-6">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-64 mb-2"></div>
        <div className="h-4 bg-gray-100 dark:bg-gray-800/50 rounded w-96"></div>
      </div>
      
      <div className="bg-white dark:bg-[#111111] rounded-3xl border border-gray-100 dark:border-white/5 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-[#1a1a1a]/50 flex justify-between">
          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-xl w-64"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-xl w-24"></div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                  <div>
                    <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-32 mb-1"></div>
                    <div className="h-3 bg-gray-100 dark:bg-gray-800/50 rounded w-24"></div>
                  </div>
                </div>
                <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-24"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-20"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
