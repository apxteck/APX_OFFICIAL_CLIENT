import React from "react";
import { FolderTree, AlertCircle } from "lucide-react";

export default function Page() {
  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto pb-safe px-4 sm:px-6 md:px-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
              <FolderTree size={24} className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            Categories
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-2">
            Manage blog categorization.
          </p>
        </div>
      </div>

      {/* Empty State / Construction Placeholder */}
      <div className="w-full min-h-[500px] bg-white dark:bg-[#111111] border border-dashed border-gray-200 dark:border-white/10 rounded-3xl flex flex-col items-center justify-center p-8 text-center shadow-[0px_4px_20px_rgba(0,0,0,0.02)] animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="w-16 h-16 bg-gray-50 dark:bg-[#1a1a1a] rounded-full flex items-center justify-center mb-4 border border-gray-100 dark:border-white/5">
          <AlertCircle className="text-gray-400 dark:text-gray-500" size={32} />
        </div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Module Under Construction</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
          The <strong>Categories</strong> frontend routing is active, but the backend APIs and data tables have not been connected yet. 
        </p>
        <button className="mt-6 min-h-[44px] bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 px-6 py-2.5 rounded-xl font-bold text-sm transition-colors border border-gray-200 dark:border-white/10 flex items-center justify-center">
          Go Back
        </button>
      </div>
    </div>
  );
}
