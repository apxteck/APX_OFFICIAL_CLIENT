"use client";

import React from "react";
import { Search } from "lucide-react";
import DataTable from "@/components/ui/admin/DataTable";
import { LeadsHeader } from "./LeadsHeader";
import { useLeadsColumns } from "./LeadsColumns";
import { useLeadsLogic } from "../_hooks/useLeadsLogic";

export function LeadsManager() {
  const { leads, isLoading } = useLeadsLogic();
  const columns = useLeadsColumns();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <LeadsHeader />

      <div className="bg-white dark:bg-[#111111] rounded-3xl border border-gray-100 dark:border-white/5 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
        <div className="flex-1 overflow-auto">
          {isLoading ? (
            <div className="min-h-[400px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-4 border-indigo-100 dark:border-indigo-500/20 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Loading leads...</p>
              </div>
            </div>
          ) : leads.length > 0 ? (
            <DataTable 
              columns={columns} 
              data={leads} 
            />
          ) : (
            <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 bg-gray-50 dark:bg-[#1a1a1a] rounded-full flex items-center justify-center mb-4 border border-gray-100 dark:border-white/5">
                <Search className="text-gray-400 dark:text-gray-500" size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No leads found</h3>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 max-w-md">
                We couldn't find any leads matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
