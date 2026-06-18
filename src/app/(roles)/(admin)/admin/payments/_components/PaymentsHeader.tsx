import React from "react";
import { CreditCard } from "lucide-react";

export function PaymentsHeader() {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <CreditCard className="text-blue-500 w-8 h-8" />
        <h1 className="text-2xl font-bold">Payments & Invoices</h1>
      </div>
      <p className="text-gray-400">Manage customer invoices, manually mark as paid, and track statuses.</p>
    </div>
  );
}
