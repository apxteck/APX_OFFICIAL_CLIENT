import React from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, CheckCircle2, Eye } from "lucide-react";
import { Lead, LeadStatus } from "@/app/types/lead.types";

interface LeadDetailHeaderProps {
  lead: Lead;
  onUpdateStatus: (status: LeadStatus) => void;
}

export function LeadDetailHeader({ lead, onUpdateStatus }: LeadDetailHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.push('/admin/leads')}
          className="p-2 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 rounded-xl transition-colors"
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
      
      <div className="flex gap-3">
        {lead.status !== "CONVERTED" && (
          <>
            <button 
              onClick={() => onUpdateStatus("SEEN")}
              className="bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-100 dark:hover:bg-cyan-500/20 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors border border-cyan-100 dark:border-cyan-500/20 flex items-center gap-2"
            >
              <Eye size={16} /> Mark as Seen
            </button>
            <button 
              onClick={() => onUpdateStatus("CONVERTED")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm flex items-center gap-2"
            >
              <CheckCircle2 size={16} /> Convert Lead
            </button>
          </>
        )}
        {lead.status === "CONVERTED" && (
          <div className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20 px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2">
            <CheckCircle2 size={16} /> Lead Successfully Converted
          </div>
        )}
      </div>
    </div>
  );
}
