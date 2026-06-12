import React from "react";
import { MonitorPlay, PlusCircle } from "lucide-react";

interface AdsHeaderProps {
  onCreateClick: () => void;
}

export function AdsHeader({ onCreateClick }: AdsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
          <div className="p-2 bg-pink-50 dark:bg-pink-500/10 rounded-xl text-pink-600 dark:text-pink-400">
            <MonitorPlay size={24} />
          </div>
          Advertisements
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-2">
          Manage banner ads, Google AdSense codes, and placements across the platform.
        </p>
      </div>
      <button 
        onClick={onCreateClick}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-md flex items-center gap-2 shrink-0"
      >
        <PlusCircle size={18} />
        Create Ad
      </button>
    </div>
  );
}
