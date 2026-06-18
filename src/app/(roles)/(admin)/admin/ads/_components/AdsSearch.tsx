import React from "react";
import { Search } from "lucide-react";

interface AdsSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export function AdsSearch({ searchTerm, setSearchTerm }: AdsSearchProps) {
  return (
    <div className="p-4 border-b border-gray-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50 dark:bg-[#1a1a1a]/50">
      <div className="relative max-w-md w-full">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search ads by client, placement, or type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 min-h-[44px] bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-xl text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 dark:focus:border-pink-400 transition-all"
        />
      </div>
    </div>
  );
}
