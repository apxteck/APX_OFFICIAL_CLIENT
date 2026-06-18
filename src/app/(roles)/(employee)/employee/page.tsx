import React from 'react';
// Removed dynamic import
import { dashboardService } from '@/services/admin/dashboard.service';

import DashboardManager from './_components/DashboardManager';

export default async function EmployeeDashboardPage() {
  let initialTasks = [];
  let initialReimbursements = [];
  let initialAssignedRequests = 0;

  try {
    const stats = await dashboardService.getEmployeeStats();
    if (stats) {
      initialTasks = stats.tasks || [];
      initialReimbursements = stats.reimbursements || [];
      initialAssignedRequests = stats.assignedRequestsCount || 0;
    }
  } catch (error) {
    console.error("Failed to load initial dashboard stats on server", error);
  }

  return (
    <DashboardManager 
      initialTasks={initialTasks}
      initialReimbursements={initialReimbursements}
      initialAssignedRequests={initialAssignedRequests}
    />
  );
}
