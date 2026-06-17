"use client";
import React from "react";
import { Shield, Plus } from "lucide-react";
import { useRolesLogic } from "../_hooks/useRolesLogic";

export function RolesHeader() {
  const { handleOpenModal } = useRolesLogic();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white flex items-center gap-4 tracking-tight">
          <div className="p-3 bg-indigo-50/50 dark:bg-indigo-500/10 backdrop-blur-sm rounded-2xl border border-indigo-100 dark:border-indigo-500/20 shadow-sm shadow-indigo-500/10">
            <Shield className="w-8 h-8 text-indigo-600 dark:text-indigo-400 drop-shadow-md" strokeWidth={2.5} />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-indigo-800 to-gray-900 dark:from-white dark:via-indigo-300 dark:to-white">
            Role Management
          </span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-3 font-medium text-base ml-1">
          Manage system roles, descriptions, and view assigned users.
        </p>
      </div>
      <button
        onClick={() => handleOpenModal("CREATE")}
        className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-sm rounded-2xl transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98]"
      >
        <Plus size={18} strokeWidth={3} />
        <span>Add New Role</span>
      </button>
    </div>
  );
}
