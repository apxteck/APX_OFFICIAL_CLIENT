import React from "react";

export default function RolesLoading() {
  return (
    <div className="max-w-6xl mx-auto pb-12 space-y-6 animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div>
          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-48 mb-3"></div>
          <div className="h-4 bg-gray-100 dark:bg-gray-800/50 rounded w-72"></div>
        </div>
        <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-xl w-36"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-[#111111] rounded-3xl p-6 border border-gray-100 dark:border-white/5 space-y-4">
            <div className="flex justify-between items-start">
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-md w-32"></div>
              <div className="h-6 w-6 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
            </div>
            <div className="h-16 bg-gray-100 dark:bg-gray-800/50 rounded-lg w-full"></div>
            <div className="flex justify-between items-center pt-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-20"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-24"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
