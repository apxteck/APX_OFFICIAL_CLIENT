"use client";

import React, { useEffect, useState } from "react";
import DataTable, { ColumnDef } from "@/components/ui/admin/DataTable";
import { crmService, Lead } from "@/services/admin/crm.service";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { MoreVertical, PhoneCall, TrendingUp, Handshake, Mail, DollarSign, XCircle, AlertCircle } from "lucide-react";

export default function LeadsPipelinePage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    crmService.getLeads().then(data => {
      setLeads(data);
      setIsLoading(false);
    });
  }, []);

  const filteredLeads = leads.filter(lead => 
    lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: ColumnDef<Lead>[] = [
    {
      header: "Lead",
      cell: (lead) => (
        <div>
          <p className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
            {lead.fullName}
            {lead.businessName && (
              <span className="text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded">
                {lead.businessName}
              </span>
            )}
          </p>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1"><Mail size={12}/> {lead.email}</span>
            <span className="flex items-center gap-1"><PhoneCall size={12}/> {lead.phone}</span>
          </div>
        </div>
      )
    },
    {
      header: "Interest",
      accessorKey: "serviceInterest",
      cell: (lead) => <span className="font-bold text-sm text-gray-700 dark:text-gray-300">{lead.serviceInterest}</span>
    },
    {
      header: "Pipeline Stage",
      cell: (lead) => {
        const getStatusConfig = (status: string) => {
          switch(status) {
            case "NEW": return { color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10", border: "border-blue-100 dark:border-blue-500/20", icon: AlertCircle };
            case "CONTACTED": return { color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10", border: "border-purple-100 dark:border-purple-500/20", icon: PhoneCall };
            case "INTERESTED": return { color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", border: "border-amber-100 dark:border-amber-500/20", icon: TrendingUp };
            case "NEGOTIATING": return { color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/10", border: "border-indigo-100 dark:border-indigo-500/20", icon: Handshake };
            case "CONVERTED": return { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-100 dark:border-emerald-500/20", icon: DollarSign };
            case "LOST": return { color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10", border: "border-red-100 dark:border-red-500/20", icon: XCircle };
            default: return { color: "text-gray-600", bg: "bg-gray-50", border: "border-gray-200", icon: AlertCircle };
          }
        };
        const config = getStatusConfig(lead.status);
        const Icon = config.icon;

        return (
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg border ${config.bg} ${config.color} ${config.border}`}>
            <Icon size={14} />
            {lead.status}
          </div>
        );
      }
    },
    {
      header: "Priority",
      cell: (lead) => (
        <span className={`px-2 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider border ${
          lead.priority === "HIGH" ? "bg-red-50 text-red-600 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20" :
          lead.priority === "MEDIUM" ? "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20" :
          "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20"
        }`}>
          {lead.priority}
        </span>
      )
    },
    {
      header: "Assigned To",
      cell: (lead) => (
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {lead.assignedTo || "—"}
        </span>
      )
    },
    {
      header: "Actions",
      cell: (lead) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => router.push(`/admin/leads/${lead.id}`)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 transition-colors whitespace-nowrap"
          >
            Open CRM
          </button>
          <button className="p-2 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
            <MoreVertical size={16} />
          </button>
        </div>
      )
    }
  ];

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-gray-200 dark:border-white/10 border-t-indigo-600 dark:border-t-indigo-500 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Lead Pipeline</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">Track prospective clients through the sales funnel.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm flex items-center gap-2">
          + Add New Lead
        </button>
      </div>

      <DataTable 
        data={filteredLeads}
        columns={columns}
        searchPlaceholder="Search leads by name, business, or ID..."
        onSearch={setSearchTerm}
      />
    </div>
  );
}
