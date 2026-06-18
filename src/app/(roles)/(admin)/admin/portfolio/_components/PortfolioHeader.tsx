'use client';
import React from 'react';
import { Briefcase, PlusCircle } from 'lucide-react';
export function PortfolioHeader({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
            <Briefcase size={24} />
          </div>
          Portfolio Management
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-2">
          Showcase your best projects, manage client cases, and update portfolio visibility.
        </p>
      </div>
      <button
        onClick={onCreateClick}
        className="bg-[#39FF14] hover:bg-[#32e012] text-black px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm flex items-center justify-center min-h-[44px] gap-2 shrink-0"
      >
        <PlusCircle size={18} />
        Create Portfolio
      </button>
    </div>
  );
}
