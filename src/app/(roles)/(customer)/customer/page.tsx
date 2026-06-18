import React from 'react';
// Removed dynamic import
import { api } from '@/lib/axios';

import DashboardManager from './_components/DashboardManager';

export default async function CustomerDashboard() {
  let activeRequests: any[] = [];
  let completedCount = 0;
  let unpaidInvoices = 0;

  try {
    const [reqRes, payRes] = await Promise.all([
      api.getMyRequests(),
      api.getMyPayments()
    ]);

    const requests = reqRes?.data || [];
    if (Array.isArray(requests)) {
      const active = requests.filter((r: any) => !['COMPLETED', 'CANCELLED'].includes(r.status));
      completedCount = requests.filter((r: any) => r.status === 'COMPLETED').length;
      
      activeRequests = active.map((r: any) => ({
        id: `REQ-${r.id.toString().padStart(4, '0')}`,
        rawId: r.id,
        serviceType: r.service?.name || 'Custom Service',
        status: r.status,
        priority: r.priority,
        createdAt: r.createdAt
      }));
    }

    const payments = payRes?.data || [];
    if (Array.isArray(payments)) {
      unpaidInvoices = payments.filter((p: any) => p.status === 'PENDING' || p.status === 'FAILED').length;
    }
  } catch (error) {
    console.error("Failed to load dashboard data on server", error);
  }

  return (
    <DashboardManager 
      activeRequests={activeRequests} 
      completedCount={completedCount} 
      unpaidInvoices={unpaidInvoices} 
    />
  );
}
