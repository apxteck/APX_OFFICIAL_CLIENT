"use client";

import React, { useState, useEffect } from "react";
import KPICard from "@/components/ui/admin/dashboard/KPICard";
import ActivityFeed from "@/components/ui/admin/dashboard/ActivityFeed";
import DashboardCharts from "@/components/ui/admin/dashboard/DashboardCharts";
import { 
  mockCustomerKPIs, 
  mockRevenueKPIs, 
  mockContentKPIs, 
  mockLeadsKPIs 
} from "@/services/admin/dashboardData";

export default function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-12 pb-12 max-w-[1600px] mx-auto">
      
      {/* 1. Customer & Request KPIs */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Customer & Request Analytics</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Overview of client growth and service request volume.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {mockCustomerKPIs.map((kpi, index) => (
            <KPICard key={kpi.title} data={kpi} delay={index * 0.05} />
          ))}
        </div>
      </section>

      {/* 2. Revenue & Payment KPIs */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Revenue & Finance</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Tracking incoming payments, overdue invoices, and lifetime revenue.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockRevenueKPIs.map((kpi, index) => (
            <KPICard key={kpi.title} data={kpi} delay={index * 0.05 + 0.1} />
          ))}
        </div>
      </section>

      {/* 3. Content & Engagement KPIs */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Content & Engagement</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Metrics on blog output, user comments, and AI-generated content.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockContentKPIs.map((kpi, index) => (
            <KPICard key={kpi.title} data={kpi} delay={index * 0.05 + 0.2} />
          ))}
        </div>
      </section>

      {/* 4. Leads & Operations KPIs */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Operations & CRM</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Internal operations, task tracking, and lead conversion metrics.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockLeadsKPIs.map((kpi, index) => (
            <KPICard key={kpi.title} data={kpi} delay={index * 0.05 + 0.3} />
          ))}
        </div>
      </section>

      {/* 5. Dashboard Charts & Visualizations */}
      <section className="pt-8 border-t border-gray-100 dark:border-white/5">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Platform Visualizations</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">In-depth graphical breakdowns of platform performance.</p>
        </div>
        <DashboardCharts />
      </section>

      {/* 6. Activity Feed */}
      <section className="pt-8 border-t border-gray-100 dark:border-white/5">
        <ActivityFeed />
      </section>

    </div>
  );
}
