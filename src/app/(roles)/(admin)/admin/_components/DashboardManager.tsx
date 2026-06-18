'use client';

import React from 'react';
import { DashboardHeader } from './DashboardHeader';
import { DashboardTabs } from './DashboardTabs';
import { DashboardContent } from './DashboardContent';
import { DashboardStats } from '@/services/admin/dashboard.service';
import { useDashboardLogic } from '../_hooks/useDashboardLogic';

interface Props {
  initialStats: DashboardStats | null;
}

export default function DashboardManager({ initialStats }: Props) {
  const { activeTab, setActiveTab, stats, customerKPIs, revenueKPIs, contentKPIs, leadsKPIs } =
    useDashboardLogic(initialStats);

  return (
    <>
      <DashboardHeader />
      <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <DashboardContent
        activeTab={activeTab}
        stats={stats}
        customerKPIs={customerKPIs}
        revenueKPIs={revenueKPIs}
        contentKPIs={contentKPIs}
        leadsKPIs={leadsKPIs}
      />
    </>
  );
}
