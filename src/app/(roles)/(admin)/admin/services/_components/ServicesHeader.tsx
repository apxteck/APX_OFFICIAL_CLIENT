"use client";
import React from "react";
import { Layers, PlusCircle } from "lucide-react";
import { useServicesLogic } from "../_hooks/useServicesLogic";

export function ServicesHeader() {
  const { navigateToCreate } = useServicesLogic();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
            <Layers size={24} />
          </div>
          Services Management
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-2">
          Manage your IT services catalog, update pricing, and control visibility.
        </p>
      </div>
      <button 
        onClick={navigateToCreate}
        className="bg-[#39FF14] hover:bg-[#32e012] text-black px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm flex items-center gap-2 shrink-0"
      >
        <PlusCircle size={18} />
        Create Service
      </button>
    </div>
  );
}
