import React from 'react';
import { Loader2 } from 'lucide-react';

export default function EmployeeDashboardLoading() {
  return (
    <div className="w-full h-full min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 animate-pulse">
        Loading dashboard data...
      </p>
    </div>
  );
}
