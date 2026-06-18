import React from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Phone, Mail, AlertCircle, Eye, Target, PlayCircle, CheckCircle, XCircle } from "lucide-react";
import { ColumnDef } from "@/components/ui/admin/DataTable";
import { Lead } from "@/app/types/lead.types";

export const useLeadsColumns = (): ColumnDef<Lead>[] => {
  const router = useRouter();

  return [
    {
      header: "Lead",
      cell: (lead) => (
        <div>
          <p className="font-bold text-gray-900 dark:text-white">{lead.fullName}</p>
          {lead.businessName && <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mt-0.5">{lead.businessName}</p>}
          <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400 mt-1">Added: {format(new Date(lead.createdAt), "MMM dd, yyyy")}</p>
        </div>
      )
    },
    {
      header: "Contact Info",
      cell: (lead) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
            <Phone size={12} className="text-gray-400" />
            <span>{lead.phone}</span>
          </div>
          {lead.email && (
            <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
              <Mail size={12} className="text-gray-400" />
              <span>{lead.email}</span>
            </div>
          )}
        </div>
      )
    },
    {
      header: "Interest",
      accessorKey: "serviceInterest",
      cell: (lead) => (
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {lead.serviceInterest || "—"}
        </span>
      )
    },
    {
      header: "Source",
      accessorKey: "source",
      cell: (lead) => (
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {lead.source || "—"}
        </span>
      )
    },
    {
      header: "Assigned To",
      cell: (lead) => (
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {lead.assignedTo?.fullName || "Unassigned"}
        </span>
      )
    },
    {
      header: "Status",
      cell: (lead) => {
        const statusConfig: Record<string, any> = {
          NEW: { color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10", border: "border-blue-100 dark:border-blue-500/20", icon: AlertCircle },
          SEEN: { color: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-50 dark:bg-cyan-500/10", border: "border-cyan-100 dark:border-cyan-500/20", icon: Eye },
          CONTACTED: { color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/10", border: "border-indigo-100 dark:border-indigo-500/20", icon: Phone },
          INTERESTED: { color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", border: "border-amber-100 dark:border-amber-500/20", icon: Target },
          NEGOTIATING: { color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10", border: "border-purple-100 dark:border-purple-500/20", icon: PlayCircle },
          CONVERTED: { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-100 dark:border-emerald-500/20", icon: CheckCircle },
          LOST: { color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10", border: "border-red-100 dark:border-red-500/20", icon: XCircle }
        };
        const config = statusConfig[lead.status] || statusConfig.NEW;
        const Icon = config.icon;

        return (
          <div className="flex flex-col gap-1 items-start">
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-lg border tracking-wide uppercase ${config.bg} ${config.color} ${config.border}`}>
              <Icon size={12} />
              {lead.status}
            </div>
          </div>
        );
      }
    },
    {
      header: "Actions",
      cell: (lead) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => router.push(`/admin/leads/${lead.id}`)}
            className="min-h-[44px] px-4 flex items-center justify-center rounded-lg text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 transition-colors"
          >
            View Details
          </button>
        </div>
      )
    }
  ];
};
