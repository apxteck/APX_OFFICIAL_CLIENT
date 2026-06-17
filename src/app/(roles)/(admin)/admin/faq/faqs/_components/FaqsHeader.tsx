import React from "react";
import { HelpCircle, PlusCircle } from "lucide-react";

interface FaqsHeaderProps {
  onOpenCreate: () => void;
}

export function FaqsHeader({ onOpenCreate }: FaqsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
            <HelpCircle size={24} />
          </div>
          FAQs Management
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-2">
          Create, edit, and organize Frequently Asked Questions.
        </p>
      </div>
      <button 
        onClick={onOpenCreate}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-md flex items-center gap-2 shrink-0"
      >
        <PlusCircle size={18} />
        Create FAQ
      </button>
    </div>
  );
}
