import React from 'react';
import DashboardManager from './_components/DashboardManager';
import { dashboardService, DashboardStats } from '@/services/admin/dashboard.service';

export default async function AdminDashboardPage() {
  let initialStats: DashboardStats | null = null;
  try {
    initialStats = await dashboardService.getAdminStats();
  } catch (error) {
    console.error('Failed to load dashboard stats', error);
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto space-y-8 px-4 sm:px-6 md:px-8 pb-safe pt-4 overflow-x-hidden">
      <DashboardManager initialStats={initialStats} />
    </div>
  );
}
