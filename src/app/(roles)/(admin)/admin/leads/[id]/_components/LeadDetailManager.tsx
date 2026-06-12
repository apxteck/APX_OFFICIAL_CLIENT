"use client";

import React from "react";
import { useLeadDetailLogic } from "../_hooks/useLeadDetailLogic";
import { LeadDetailHeader } from "./LeadDetailHeader";
import { LeadPipeline } from "./LeadPipeline";
import { LeadMessageView } from "./LeadMessageView";
import { LeadIntelSidebar } from "./LeadIntelSidebar";

export function LeadDetailManager({ leadId }: { leadId: string }) {
  const { lead, isLoading, handleUpdateStatus } = useLeadDetailLogic(leadId);

  if (isLoading || !lead) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-gray-200 dark:border-white/10 border-t-indigo-600 dark:border-t-indigo-500 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Header Pipeline Visualizer */}
      <div className="bg-white dark:bg-[#111111] p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm space-y-6">
        <LeadDetailHeader lead={lead} onUpdateStatus={handleUpdateStatus} />
        <LeadPipeline status={lead.status} onUpdateStatus={handleUpdateStatus} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: Message View */}
        <div className="xl:col-span-2 space-y-6">
          <LeadMessageView message={lead.message} />
        </div>

        {/* Right Column: Lead Intel */}
        <LeadIntelSidebar lead={lead} />
      </div>
      
    </div>
  );
}
