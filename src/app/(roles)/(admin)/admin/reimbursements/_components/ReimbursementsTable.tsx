"use client";
import React, { useMemo } from "react";
import DataTable, { ColumnDef } from "@/components/ui/admin/DataTable";
import { Reimbursement } from "@/services/admin/reimbursements.service";
import { format } from "date-fns";
import { IndianRupee, Clock, ShieldCheck, XCircle, CheckCircle2, Search } from "lucide-react";
import { useReimbursementsLogic } from "../_hooks/useReimbursementsLogic";

export function ReimbursementsTable() {
  const { filteredData, isLoading, setSelectedRequest } = useReimbursementsLogic();

  const columns: ColumnDef<Reimbursement>[] = useMemo(() => [
    {
      header: "Employee & Request",
      cell: (r) => (
        <div>
          <p className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
            {r.user?.fullName}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mt-1 truncate max-w-xs">{r.title}</p>
          <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mt-0.5">
            <span className="text-emerald-500">RMB-{r.id}</span> • {r.category}
          </p>
        </div>
      )
    },
    {
      header: "Amount",
      cell: (r) => (
        <span className="font-black text-gray-900 dark:text-white tracking-tight flex items-center text-base">
          <IndianRupee size={14} className="mr-0.5" />
          {Number(r.amount).toFixed(2)}
        </span>
      )
    },
    {
      header: "Date",
      cell: (r) => (
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
          {format(new Date(r.createdAt), "MMM dd, yyyy")}
        </span>
      )
    },
    {
      header: "Status",
      cell: (r) => {
        const config = {
          PENDING: { color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", border: "border-amber-100 dark:border-amber-500/20", icon: Clock },
          APPROVED: { color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10", border: "border-blue-100 dark:border-blue-500/20", icon: ShieldCheck },
          REJECTED: { color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10", border: "border-red-100 dark:border-red-500/20", icon: XCircle },
          PAID: { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-100 dark:border-emerald-500/20", icon: CheckCircle2 }
        }[r.status];
        const Icon = config.icon;

        return (
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-lg border tracking-wide uppercase ${config.bg} ${config.color} ${config.border}`}>
            <Icon size={12} />
            {r.status}
          </div>
        );
      }
    },
    {
      header: "Actions",
      cell: (r) => (
        <button 
          onClick={() => setSelectedRequest(r)}
          className="px-4 py-2 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 transition-colors"
        >
          Review
        </button>
      )
    }
  ], [setSelectedRequest]);

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-emerald-100 dark:border-emerald-500/20 border-t-emerald-600 dark:border-t-emerald-400 rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Loading requests...</p>
        </div>
      </div>
    );
  }

  if (filteredData.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-gray-50 dark:bg-[#1a1a1a] rounded-full flex items-center justify-center mb-4 border border-gray-100 dark:border-white/5">
          <Search className="text-gray-400 dark:text-gray-500" size={32} />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No requests found</h3>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 max-w-md">
          We couldn't find any reimbursement requests matching your search.
        </p>
      </div>
    );
  }

  return <DataTable columns={columns} data={filteredData} />;
}
