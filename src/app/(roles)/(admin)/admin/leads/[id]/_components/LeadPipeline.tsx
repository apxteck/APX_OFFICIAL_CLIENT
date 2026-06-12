import React from "react";
import { AlertCircle, Eye, DollarSign, XCircle } from "lucide-react";
import { Lead, LeadStatus } from "@/app/types/lead.types";

const PIPELINE_STAGES = [
  { id: "NEW", label: "New", icon: AlertCircle },
  { id: "SEEN", label: "Seen", icon: Eye },
  { id: "CONVERTED", label: "Converted", icon: DollarSign },
];

interface LeadPipelineProps {
  status: LeadStatus;
  onUpdateStatus: (status: LeadStatus) => void;
}

export function LeadPipeline({ status, onUpdateStatus }: LeadPipelineProps) {
  const activeStageIndex = PIPELINE_STAGES.findIndex(s => s.id === status);
  const isLost = status === "LOST";

  return (
    <div className="pt-4 border-t border-gray-100 dark:border-white/5">
      {isLost ? (
        <div className="flex items-center justify-center py-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl">
          <p className="font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
            <XCircle size={20} /> This lead was marked as LOST
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-between relative overflow-hidden px-4">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 dark:bg-white/5 -translate-y-1/2 z-0 rounded-full"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-indigo-500 -translate-y-1/2 z-0 rounded-full transition-all duration-500"
            style={{ width: `${Math.max(0, (activeStageIndex / (PIPELINE_STAGES.length - 1)) * 100)}%` }}
          ></div>

          {PIPELINE_STAGES.map((stage, idx) => {
            const isActive = idx === activeStageIndex;
            const isPassed = idx < activeStageIndex;
            const Icon = stage.icon;
            
            return (
              <div 
                key={stage.id} 
                onClick={() => onUpdateStatus(stage.id as LeadStatus)}
                className="relative z-10 flex flex-col items-center gap-2 cursor-pointer group"
              >
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
  );
}
