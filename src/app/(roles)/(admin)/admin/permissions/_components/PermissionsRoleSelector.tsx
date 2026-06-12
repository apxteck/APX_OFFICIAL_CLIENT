"use client";
import React from "react";
import { Shield, Loader2 } from "lucide-react";
import { usePermissionsLogic } from "../_hooks/usePermissionsLogic";

export function PermissionsRoleSelector() {
  const { roles, isLoadingRoles, selectedRoleId, setSelectedRoleId } = usePermissionsLogic();

  return (
    <div className="bg-white dark:bg-[#111111] p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm">
      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
        <Shield className="w-4 h-4 text-indigo-500" />
        Select a Role to Manage
      </label>
      {isLoadingRoles ? (
        <div className="flex items-center gap-3 text-indigo-600 font-medium">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading roles...
        </div>
      ) : (
        <div className="max-w-sm">
          <select
            value={selectedRoleId}
            onChange={(e) => setSelectedRoleId(e.target.value ? Number(e.target.value) : "")}
            className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/50 outline-none font-bold text-gray-900 dark:text-white transition-all shadow-sm"
          >
            <option value="" disabled>-- Select a Role --</option>
            {Array.isArray(roles) && roles.map(r => (
              <option key={r.id} value={r.id}>{r.name.replace(/_/g, ' ')}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
