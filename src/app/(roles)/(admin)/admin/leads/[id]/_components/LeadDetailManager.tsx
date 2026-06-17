"use client";

import React from "react";
import { useLeadDetailLogic } from "../_hooks/useLeadDetailLogic";
import { LeadDetailHeader } from "./LeadDetailHeader";
import { LeadMessageView } from "./LeadMessageView";
import { LeadIntelSidebar } from "./LeadIntelSidebar";
import { LeadFollowUps } from "./LeadFollowUps";

export function LeadDetailManager({ leadId }: { leadId: string }) {
  const { lead, followUps, isLoading, handleAddFollowUp, handleAssignLead } = useLeadDetailLogic(leadId);

  if (isLoading || !lead) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-gray-200 dark:border-white/10 border-t-indigo-600 dark:border-t-indigo-500 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Header Visualizer */}
      <div className="bg-white dark:bg-[#111111] p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm space-y-6">
        <LeadDetailHeader lead={lead} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: Message View & Follow Ups */}
        <div className="xl:col-span-2 space-y-6">
          <LeadMessageView message={lead.message} />
          <LeadFollowUps followUps={followUps} onAddFollowUp={handleAddFollowUp} />
        </div>

        {/* Right Column: Lead Intel */}
        <LeadIntelSidebar lead={lead} onAssignLead={handleAssignLead} />
      </div>
      
    </div>
  );
}
