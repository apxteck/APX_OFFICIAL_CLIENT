import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { Faq } from "@/app/types/faq.types";

interface FaqCardProps {
  faq: Faq;
  onEdit: (faq: Faq) => void;
  onDelete: (id: number) => void;
  onToggleActive: (id: number, currentStatus: boolean) => void;
}

export function FaqCard({ faq, onEdit, onDelete, onToggleActive }: FaqCardProps) {
  return (
    <div className="bg-white dark:bg-[#111111] rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all flex flex-col group relative overflow-hidden">
      
      {/* Status Toggle on Top Right */}
      <button 
        onClick={() => onToggleActive(faq.id, faq.isPublished)}
        className="absolute top-4 right-4 z-10 p-1 rounded-full border border-gray-200 dark:border-white/10 shadow-sm bg-white dark:bg-[#151515] flex items-center justify-center"
        title={`Toggle Status (Currently ${faq.isPublished ? 'Published' : 'Hidden'})`}
      >
        <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${faq.isPublished ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`}>
          <div className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform ${faq.isPublished ? 'translate-x-4' : 'translate-x-0'}`}></div>
        </div>
      </button>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3">
          <span className="bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded-lg">
            {faq.category || 'General'}
          </span>
          <span className="bg-gray-100 dark:bg-white/5 px-2 py-1 rounded-lg text-gray-500 dark:text-gray-400">
            Order: {faq.sortOrder}
          </span>
        </div>

        <h3 className="font-bold text-gray-900 dark:text-white text-lg tracking-tight mb-2 pr-12">
          {faq.question}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-6 leading-relaxed">
          {faq.answer}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-white/5">
          <button 
            onClick={() => onEdit(faq)}
            className="flex-1 bg-gray-50 hover:bg-indigo-50 dark:bg-white/5 dark:hover:bg-indigo-500/10 text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 px-4 py-2.5 rounded-xl font-bold text-xs transition-colors border border-gray-200 dark:border-white/10 flex items-center justify-center gap-2"
          >
            <Edit size={16} />
            Edit FAQ
          </button>
          <button 
            onClick={() => onDelete(faq.id)}
            className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-500/10 rounded-xl transition-colors border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5"
            title="Delete FAQ"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
