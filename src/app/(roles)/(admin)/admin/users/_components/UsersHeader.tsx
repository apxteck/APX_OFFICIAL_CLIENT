"use client";
import React from "react";
import Link from "next/link";

export function UsersHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Users & Roles</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">Manage system users, role assignments, and module access permissions.</p>
      </div>
      <Link 
        href="/admin/users/create" 
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-[0px_4px_14px_rgba(79,70,229,0.3)] inline-flex items-center gap-2"
      >
        + Add New User
      </Link>
    </div>
  );
}
