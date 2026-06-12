"use client";
import React from "react";
import { Loader2, Edit2, Trash2 } from "lucide-react";
import { useRolesLogic } from "../_hooks/useRolesLogic";

export function RolesTable() {
  const { roles, isLoading, handleOpenModal, handleDelete } = useRolesLogic();

  return (
    <div className="bg-white dark:bg-[#111111] rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden mt-6">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Loading roles...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 dark:bg-white/[0.02] border-b border-gray-100 dark:border-white/5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                <th className="py-4 px-6">ID</th>
                <th className="py-4 px-6">Role Name</th>
                <th className="py-4 px-6 w-full">Description</th>
                <th className="py-4 px-6 text-center">Assigned Users</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5 text-sm font-medium">
              {roles.length > 0 ? (
                roles.map((role) => (
                  <tr key={role.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 text-gray-500 font-mono">#{role.id}</td>
                    <td className="py-4 px-6 font-bold text-gray-900 dark:text-white">
                      <span className="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-lg">
                        {role.name}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-500 dark:text-gray-400 truncate max-w-[200px] md:max-w-md">
                      {role.description || <span className="italic opacity-50">No description</span>}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center justify-center bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 w-8 h-8 rounded-full font-bold">
                        {role._count?.users || 0}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal("EDIT", role)}
                          className="p-2 text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors"
                          title="Edit Role"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(role.id, role.name)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete Role"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500">
                    No roles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
