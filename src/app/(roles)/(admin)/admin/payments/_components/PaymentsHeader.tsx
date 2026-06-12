import React from "react";
import { CreditCard } from "lucide-react";

export function PaymentsHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
            <CreditCard size={24} />
          </div>
          Payments & Invoices
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-2">
          Manage customer invoices, manually mark as paid, and track statuses.
        </p>
      </div>
    </div>
  );
}
