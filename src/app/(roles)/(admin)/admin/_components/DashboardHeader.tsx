"use client";
import React from "react";
import Link from "next/link";
import { Plus, Users, FileText, Zap, LayoutDashboard } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="flex flex-col xl:flex-row justify-between items-start gap-6 mb-2">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
            <LayoutDashboard className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Admin Dashboard</h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400">Welcome back! Here is a summary of platform performance.</p>
      </div>
      
      {/* Quick Actions */}
      <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto p-2 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-200/60 dark:border-white/5 shadow-sm">
        <div className="px-3 flex items-center gap-2 border-r border-gray-200 dark:border-white/10 hidden sm:flex">
           <Zap className="w-4 h-4 text-amber-500" />
           <span className="text-sm font-bold text-gray-600 dark:text-gray-300">Quick Actions</span>
        </div>
        <Link href="/admin/tasks/new" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-all shadow-sm shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5 active:translate-y-0">
          <Plus className="w-4 h-4" /> New Task
        </Link>
        <Link href="/admin/users" className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 hover:border-gray-300 dark:hover:border-white/20 text-gray-700 dark:text-gray-300 text-sm font-bold rounded-xl transition-all shadow-sm hover:-translate-y-0.5 active:translate-y-0">
          <Users className="w-4 h-4" /> Add User
        </Link>
        <Link href="/admin/blog" className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 hover:border-gray-300 dark:hover:border-white/20 text-gray-700 dark:text-gray-300 text-sm font-bold rounded-xl transition-all shadow-sm hover:-translate-y-0.5 active:translate-y-0">
          <FileText className="w-4 h-4" /> Write Blog
        </Link>
      </div>
    </div>
  );
}
