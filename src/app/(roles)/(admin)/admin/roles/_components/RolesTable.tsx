"use client";
import React from "react";
import { Loader2, Edit2, Trash2 } from "lucide-react";
import { useRolesLogic } from "../_hooks/useRolesLogic";

export function RolesTable() {
  const { roles, isLoading, handleOpenModal, handleDelete } = useRolesLogic();

  return (
    <div className="bg-white/80 dark:bg-[#111111]/80 backdrop-blur-xl rounded-[2rem] border border-gray-100/80 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] overflow-hidden mt-6 transition-colors duration-300">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-10 h-10 border-4 border-indigo-200 dark:border-indigo-500/30 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400 font-bold">Loading roles...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-black/20 backdrop-blur-md border-b border-gray-100/80 dark:border-white/10 text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                <th className="py-5 px-6 lg:px-8">ID</th>
                <th className="py-5 px-6 lg:px-8">Role Name</th>
                <th className="py-5 px-6 lg:px-8 w-full">Description</th>
                <th className="py-5 px-6 lg:px-8 text-center">Assigned Users</th>
                <th className="py-5 px-6 lg:px-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/80 dark:divide-white/5 bg-transparent text-[15px]">
              {roles.length > 0 ? (
                roles.map((role) => (
                  <tr key={role.id} className="hover:bg-indigo-50/60 dark:hover:bg-indigo-500/10 transition-colors duration-300 group hover:shadow-[inset_4px_0_0_0_#6366f1]">
                    <td className="py-5 px-6 lg:px-8 text-gray-500 dark:text-gray-400 font-mono font-medium">#{role.id}</td>
                    <td className="py-5 px-6 lg:px-8">
                      <span className="font-extrabold text-[12px] uppercase tracking-wider bg-gray-100/80 dark:bg-white/5 px-3.5 py-1.5 rounded-lg text-gray-800 dark:text-gray-200 border border-gray-200/50 dark:border-white/10 shadow-sm backdrop-blur-sm">
                        {role.name}
                      </span>
                    </td>
                    <td className="py-5 px-6 lg:px-8 text-gray-600 dark:text-gray-300 truncate max-w-[200px] md:max-w-md font-medium">
                      {role.description || <span className="italic opacity-40">No description</span>}
                    </td>
                    <td className="py-5 px-6 lg:px-8 text-center">
                      <span className="inline-flex items-center justify-center bg-white dark:bg-[#1a1a1a] border border-gray-200/80 dark:border-white/10 text-gray-800 dark:text-gray-200 w-10 h-10 rounded-full font-bold shadow-sm group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                        {role._count?.users || 0}
                      </span>
                    </td>
                    <td className="py-5 px-6 lg:px-8">
                      <div className="flex justify-end gap-2.5">
                        <button
                          onClick={() => handleOpenModal("EDIT", role)}
                          className="p-2.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-[#1a1a1a] rounded-xl transition-all shadow-sm hover:shadow-md hover:shadow-indigo-500/10 active:scale-95 border border-transparent hover:border-gray-200/80 dark:hover:border-white/10"
                          title="Edit Role"
                        >
                          <Edit2 size={18} strokeWidth={2.5} />
                        </button>
                        <button
                          onClick={() => handleDelete(role.id, role.name)}
                          className="p-2.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-white dark:hover:bg-[#1a1a1a] rounded-xl transition-all shadow-sm hover:shadow-md hover:shadow-red-500/10 active:scale-95 border border-transparent hover:border-gray-200/80 dark:hover:border-white/10"
                          title="Delete Role"
                        >
                          <Trash2 size={18} strokeWidth={2.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-gray-500 dark:text-gray-400 font-bold">
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
