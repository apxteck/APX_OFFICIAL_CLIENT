import React from "react";
import { MessageCircle } from "lucide-react";
import { Faq } from "@/app/types/faq.types";
import { FaqCard } from "./FaqCard";

interface FaqsListProps {
  isLoading: boolean;
  faqs: Faq[];
  searchTerm: string;
  onEdit: (faq: Faq) => void;
  onDelete: (id: number) => void;
  onToggleActive: (id: number, currentStatus: boolean) => void;
}

export function FaqsList({ isLoading, faqs, searchTerm, onEdit, onDelete, onToggleActive }: FaqsListProps) {
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-indigo-100 dark:border-indigo-500/20 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Loading FAQs...</p>
        </div>
      </div>
    );
  }

  if (faqs.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
        <div className="w-16 h-16 bg-white dark:bg-[#222] rounded-full flex items-center justify-center mb-4 border border-gray-100 dark:border-white/5">
          <MessageCircle className="text-gray-400 dark:text-gray-500" size={32} />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No FAQs found</h3>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 max-w-md">
          {searchTerm ? `We couldn't find any FAQs matching "${searchTerm}".` : "No FAQs available. Create a new one to get started."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {faqs.map((faq) => (
        <FaqCard 
          key={faq.id} 
          faq={faq} 
          onEdit={onEdit} 
          onDelete={onDelete} 
          onToggleActive={onToggleActive} 
        />
      ))}
    </div>
  );
}
