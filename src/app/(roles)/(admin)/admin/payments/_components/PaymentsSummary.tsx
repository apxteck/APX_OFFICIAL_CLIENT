import React from "react";
import { Payment } from "@/services/admin/payments.service";

interface Props {
  payments: Payment[];
}

export function PaymentsSummary({ payments }: Props) {
  const formatCurrency = (amount: string | number | null) => {
    if (!amount) return "—";
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(Number(amount));
  };

  const totalRevenue = payments
    .filter((p) => p.status === "PAID")
    .reduce((acc, curr) => acc + (Number(curr.amountPaid) || Number(curr.negotiatedAmount) || 0), 0);

  const pendingAmount = payments
    .filter((p) => ["PENDING", "SENT"].includes(p.status))
    .reduce((acc, curr) => acc + (Number(curr.negotiatedAmount) || 0), 0);

  const paidCount = payments.filter((p) => p.status === "PAID").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-[#161b22] border border-gray-800 rounded-xl p-4">
        <div className="text-gray-400 text-sm mb-1">Total Payments</div>
        <div className="text-2xl font-bold text-white">{payments.length}</div>
      </div>
      <div className="bg-[#161b22] border border-gray-800 rounded-xl p-4">
        <div className="text-gray-400 text-sm mb-1">Total Revenue</div>
        <div className="text-2xl font-bold text-green-500">{formatCurrency(totalRevenue)}</div>
      </div>
      <div className="bg-[#161b22] border border-gray-800 rounded-xl p-4">
        <div className="text-gray-400 text-sm mb-1">Pending Amount</div>
        <div className="text-2xl font-bold text-blue-500">{formatCurrency(pendingAmount)}</div>
      </div>
      <div className="bg-[#161b22] border border-gray-800 rounded-xl p-4">
        <div className="text-gray-400 text-sm mb-1">Paid Invoices</div>
        <div className="text-2xl font-bold text-white">
          {paidCount} / {payments.length}
        </div>
      </div>
    </div>
  );
}
