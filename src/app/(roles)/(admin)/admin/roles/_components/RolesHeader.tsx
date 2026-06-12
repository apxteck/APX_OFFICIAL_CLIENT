"use client";
import React from "react";
import { Shield, Plus } from "lucide-react";
import { useRolesLogic } from "../_hooks/useRolesLogic";

export function RolesHeader() {
  const { handleOpenModal } = useRolesLogic();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
          <Shield className="w-8 h-8 text-indigo-500" />
          Role Management
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
          Manage system roles, descriptions, and view assigned users.
        </p>
      </div>
      <button
        onClick={() => handleOpenModal("CREATE")}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-[0_4px_14px_rgba(79,70,229,0.3)] flex items-center gap-2"
      >
        <Plus size={18} />
        <span>Add New Role</span>
      </button>
    </div>
  );
}
