import React from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { Lead } from "@/app/types/lead.types";

interface LeadDetailHeaderProps {
  lead: Lead;
}

export function LeadDetailHeader({ lead }: LeadDetailHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.push('/admin/leads')}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 rounded-xl transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
            {lead.fullName}
          </h1>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
            {lead.businessName ? `${lead.businessName} • ` : ''}Added {format(new Date(lead.createdAt), "MMM dd, yyyy")}
          </p>
        </div>
      </div>
    </div>
  );
}
