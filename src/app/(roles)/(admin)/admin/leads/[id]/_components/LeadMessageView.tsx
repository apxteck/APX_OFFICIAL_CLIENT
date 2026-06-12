import React from "react";
import { MessageSquare } from "lucide-react";
import { Lead } from "@/app/types/lead.types";

export function LeadMessageView({ message }: { message?: string }) {
  return (
    <div className="bg-white dark:bg-[#111111] p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm min-h-[300px]">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <MessageSquare size={20} className="text-indigo-500" /> Original Enquiry Message
      </h2>
      
      {message ? (
        <div className="bg-gray-50 dark:bg-[#151515] p-5 rounded-2xl border border-gray-100 dark:border-white/5">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {message}
          </p>
        </div>
      ) : (
        <div className="p-8 text-center bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-white/5">
          <MessageSquare className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium italic">No message was provided by the lead.</p>
        </div>
      )}
    </div>
  );
}
