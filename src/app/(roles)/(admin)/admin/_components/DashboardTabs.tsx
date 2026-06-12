"use client";
import React from "react";
import { motion } from "framer-motion";
import { useDashboardLogic } from "../_hooks/useDashboardLogic";
import { Tab } from "../_store/useDashboardStore";

const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "customers", label: "Customers & Requests" },
  { id: "revenue", label: "Finance & Revenue" },
  { id: "content", label: "Content & Engagement" },
  { id: "operations", label: "CRM & Operations" },
];

export function DashboardTabs() {
  const { activeTab, setActiveTab } = useDashboardLogic();

  return (
    <div className="mb-8 relative z-10">
      <div className="flex flex-wrap gap-2 bg-gray-100/80 dark:bg-white/5 p-1.5 rounded-2xl w-full xl:max-w-max border border-gray-200/60 dark:border-white/5 shadow-sm">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex-1 sm:flex-none text-center relative overflow-hidden ${
              activeTab === tab.id
                ? "bg-white dark:bg-[#151515] text-indigo-600 dark:text-indigo-400 shadow-[0_2px_15px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_15px_rgba(0,0,0,0.3)] ring-1 ring-gray-200/50 dark:ring-white/10"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-white/5"
            }`}
          >
            <span className="relative z-10">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-white dark:bg-[#151515] rounded-xl z-0"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
