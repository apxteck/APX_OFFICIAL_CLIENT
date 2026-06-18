import React from 'react';

export default function PortfolioLoading() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 animate-pulse">
      <div className="mb-6">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-64 mb-2"></div>
        <div className="h-4 bg-gray-100 dark:bg-gray-800/50 rounded w-96"></div>
      </div>

      <div className="bg-white dark:bg-[#111111] rounded-3xl border border-gray-100 dark:border-white/5 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col mt-6">
        <div className="p-4 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-[#1a1a1a]/50">
          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-xl w-full max-w-md"></div>
        </div>
        <div className="p-6 overflow-auto bg-gray-50 dark:bg-[#151515] min-h-[400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#111111] rounded-3xl border border-gray-100 dark:border-white/5 h-[340px] flex flex-col"
              >
                <div className="h-48 w-full bg-gray-200 dark:bg-gray-800 rounded-t-3xl"></div>
                <div className="p-5 flex-1 flex flex-col gap-3">
                  <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-100 dark:bg-gray-800/50 rounded w-1/2"></div>
                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5 flex justify-end gap-2">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
