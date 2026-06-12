import React from "react";
import { User as UserIcon, Mail, PhoneCall, ChevronRight, Compass, Tag } from "lucide-react";
import { Lead } from "@/app/types/lead.types";

export function LeadIntelSidebar({ lead }: { lead: Lead }) {
  return (
    <div className="space-y-6">
      
      {/* Contact Details */}
      <div className="bg-white dark:bg-[#111111] rounded-3xl p-6 border border-gray-100 dark:border-white/5 shadow-sm">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <UserIcon size={16} /> Contact Details
        </h2>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-xl border-2 border-indigo-100 dark:border-indigo-500/20">
            {lead.fullName.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-lg text-gray-900 dark:text-white leading-tight">{lead.fullName}</p>
            {lead.businessName && <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-0.5">{lead.businessName}</p>}
          </div>
        </div>

        <div className="space-y-4">
          {lead.email && (
            <a href={`mailto:${lead.email}`} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#151515] rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{lead.email}</span>
              </div>
              <ChevronRight size={14} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          )}
          {lead.phone && (
            <a href={`tel:${lead.phone}`} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#151515] rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-3">
                <PhoneCall size={16} className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{lead.phone}</span>
              </div>
              <ChevronRight size={14} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          )}
        </div>
      </div>

      {/* Opportunity Intel */}
      <div className="bg-white dark:bg-[#111111] rounded-3xl p-6 border border-gray-100 dark:border-white/5 shadow-sm">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Compass size={16} /> Opportunity Intel
        </h2>
        
        <div className="space-y-5">
          <div>
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 flex items-center gap-1.5"><Tag size={12}/> Service Interest</p>
            <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 px-4 py-3 rounded-xl">
              <p className="font-bold text-indigo-700 dark:text-indigo-300 text-sm">{lead.serviceInterest || "Not specified"}</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">Acquisition Source</p>
            <div className="bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-white/10 px-4 py-2.5 rounded-xl">
              <p className="font-medium text-gray-900 dark:text-white text-sm">{lead.source || "Unknown"}</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
