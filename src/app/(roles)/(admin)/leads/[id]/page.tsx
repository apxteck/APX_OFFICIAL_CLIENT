"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { crmService, LeadDetail, LeadFollowUp } from "@/services/admin/crm.service";
import { format, formatDistanceToNow } from "date-fns";
import { 
  ArrowLeft, PhoneCall, Mail, Building, Tag, Compass,
  TrendingUp, Handshake, DollarSign, XCircle, AlertCircle,
  MessageSquare, Calendar, User as UserIcon, CheckCircle2, ChevronRight
} from "lucide-react";

const PIPELINE_STAGES = [
  { id: "NEW", label: "New Lead", icon: AlertCircle },
  { id: "CONTACTED", label: "Contacted", icon: PhoneCall },
  { id: "INTERESTED", label: "Interested", icon: TrendingUp },
  { id: "NEGOTIATING", label: "Negotiating", icon: Handshake },
  { id: "CONVERTED", label: "Converted", icon: DollarSign },
];

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [lead, setLead] = useState<LeadDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    if (params?.id) {
      crmService.getLeadDetail(params.id as string).then(data => {
        setLead(data);
        setIsLoading(false);
      });
    }
  }, [params]);

  if (isLoading || !lead) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-gray-200 dark:border-white/10 border-t-indigo-600 dark:border-t-indigo-500 animate-spin"></div>
      </div>
    );
  }

  // Determine active index for pipeline visualization
  const activeStageIndex = PIPELINE_STAGES.findIndex(s => s.id === lead.status);
  const isLost = lead.status === "LOST";

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Header Pipeline Visualizer */}
      <div className="bg-white dark:bg-[#111111] p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
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
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wider border ${
                  lead.priority === "HIGH" ? "bg-red-50 text-red-600 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20" :
                  lead.priority === "MEDIUM" ? "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20" :
                  "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20"
                }`}>
                  {lead.priority} Priority
                </span>
              </h1>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
                {lead.businessName ? `${lead.businessName} • ` : ''}Added {format(new Date(lead.createdAt), "MMM dd, yyyy")}
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            {lead.status !== "CONVERTED" && !isLost && (
              <>
                <button className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors border border-red-100 dark:border-red-500/20">
                  Mark as Lost
                </button>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm flex items-center gap-2">
                  <CheckCircle2 size={16} /> Convert Lead
                </button>
              </>
            )}
          </div>
        </div>

        {/* Pipeline Progress Bar */}
        <div className="pt-4 border-t border-gray-100 dark:border-white/5">
          {isLost ? (
            <div className="flex items-center justify-center py-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl">
              <p className="font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                <XCircle size={20} /> This lead was marked as LOST
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between relative">
              {/* Connecting Line Background */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 dark:bg-white/5 -translate-y-1/2 z-0 rounded-full"></div>
              {/* Connecting Line Fill */}
              <div 
                className="absolute top-1/2 left-0 h-1 bg-indigo-500 -translate-y-1/2 z-0 rounded-full transition-all duration-500"
                style={{ width: `${(activeStageIndex / (PIPELINE_STAGES.length - 1)) * 100}%` }}
              ></div>

              {PIPELINE_STAGES.map((stage, idx) => {
                const isActive = idx === activeStageIndex;
                const isPassed = idx < activeStageIndex;
                const Icon = stage.icon;
                
                return (
                  <div key={stage.id} className="relative z-10 flex flex-col items-center gap-2 cursor-pointer group">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white dark:border-[#111111] transition-all duration-300 ${
                      isActive ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)] scale-110" : 
                      isPassed ? "bg-indigo-100 dark:bg-indigo-500/30 text-indigo-600 dark:text-indigo-400" : 
                      "bg-gray-100 dark:bg-[#222] text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-[#333]"
                    }`}>
                      <Icon size={20} />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                      isActive ? "text-indigo-600 dark:text-indigo-400" : 
                      isPassed ? "text-gray-900 dark:text-white" : 
                      "text-gray-400"
                    }`}>
                      {stage.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column: Follow-up Timeline */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Add Follow Up Input */}
          <div className="bg-white dark:bg-[#111111] p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <MessageSquare size={16} /> Log Interaction
            </h2>
            <textarea 
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="What happened during your last contact? Log call notes, emails, or insights..."
              className="w-full bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm font-medium rounded-xl p-4 min-h-[120px] focus:ring-2 focus:ring-indigo-500 resize-none mb-4"
            />
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 flex items-center gap-3">
                <div className="flex-1 max-w-[200px]">
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Next Follow-up (Optional)</label>
                  <input 
                    type="datetime-local" 
                    className="w-full bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm font-medium rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors self-end">
                Post Note
              </button>
            </div>
          </div>

          {/* Timeline View */}
          <div className="bg-white dark:bg-[#111111] p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Interaction Timeline</h2>
            
            <div className="relative border-l-2 border-gray-100 dark:border-white/10 ml-4 space-y-8 pb-4">
              {lead.followUps.map((fu) => (
                <div key={fu.id} className="relative pl-8">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-500/20 border-4 border-white dark:border-[#111111] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400"></div>
                  </div>
                  
                  {/* Content Card */}
                  <div className="bg-gray-50 dark:bg-[#151515] p-5 rounded-2xl border border-gray-100 dark:border-white/5">
                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200 dark:border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">
                          {fu.authorName.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{fu.authorName}</span>
                      </div>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {formatDistanceToNow(new Date(fu.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {fu.note}
                    </p>
                    
                    {fu.nextFollowUpAt && (
                      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-white/5 flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 w-fit px-3 py-1.5 rounded-lg border border-amber-100 dark:border-amber-500/20">
                        <Calendar size={14} /> Scheduled Follow-up: {format(new Date(fu.nextFollowUpAt), "MMM dd, h:mm a")}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Start of Timeline Marker */}
              <div className="relative pl-8 pt-4">
                <div className="absolute -left-[11px] top-5 w-5 h-5 rounded-full bg-gray-100 dark:bg-white/10 border-4 border-white dark:border-[#111111]"></div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Lead Created on {format(new Date(lead.createdAt), "MMMM dd, yyyy")}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Lead Intel */}
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
              <a href={`mailto:${lead.email}`} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#151515] rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{lead.email}</span>
                </div>
                <ChevronRight size={14} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href={`tel:${lead.phone}`} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#151515] rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-3">
                  <PhoneCall size={16} className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{lead.phone}</span>
                </div>
                <ChevronRight size={14} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
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
                  <p className="font-bold text-indigo-700 dark:text-indigo-300 text-sm">{lead.serviceInterest}</p>
                </div>
              </div>
              
              <div>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">Acquisition Source</p>
                <div className="bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-white/10 px-4 py-2.5 rounded-xl">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{lead.source}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">Sales Assignee</p>
                <select 
                  defaultValue={lead.assignedTo || ""}
                  className="w-full bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm font-bold rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Unassigned</option>
                  <option value="Rahul Sharma">Rahul Sharma</option>
                  <option value="Priya Singh">Priya Singh</option>
                  <option value="Amit Patel">Amit Patel</option>
                </select>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
