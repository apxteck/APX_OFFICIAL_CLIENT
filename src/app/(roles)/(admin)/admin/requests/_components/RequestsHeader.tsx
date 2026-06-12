"use client";
import React from "react";
import { useRequestsLogic } from "../_hooks/useRequestsLogic";

export function RequestsHeader() {
  const { navigateToCreate } = useRequestsLogic();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Service Requests</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">Manage incoming customer requests, tracking, and assignments.</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-900 dark:text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm">
          Export CSV
        </button>
        <button 
          onClick={navigateToCreate}
          className="bg-indigo-600 hover:bg-indigo-700 text-white border border-transparent px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm"
        >
          Create Request
        </button>
      </div>
    </div>
  );
}
