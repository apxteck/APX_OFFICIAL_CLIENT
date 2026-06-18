import React from "react";
import { Payment } from "@/services/admin/payments.service";
import { format } from "date-fns";
import { Send, CheckCircle, Paperclip, Clock, XCircle, AlertCircle } from "lucide-react";

interface Props {
  payments: Payment[];
  resendPending: boolean;
  onResend: (id: number) => void;
  onMarkPaid: (payment: Payment) => void;
  onOpenInvoice: (payment: Payment) => void;
}

export function PaymentsGrid({
  payments,
  resendPending,
  onResend,
  onMarkPaid,
  onOpenInvoice,
}: Props) {
  const formatCurrency = (amount: string | number | null) => {
    if (!amount) return "—";
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(Number(amount));
  };

  const getStatusBadge = (status: Payment["status"]) => {
    switch (status) {
      case "PENDING":
      case "SENT":
        return (
          <span className="inline-flex items-center gap-1 bg-[#1d4ed8] text-white px-2.5 py-1 rounded-full text-xs font-semibold uppercase">
            {status === "PENDING" ? <Clock size={12} /> : <Send size={12} />} {status}
          </span>
        );
      case "FAILED":
        return (
          <span className="inline-flex items-center gap-1 bg-[#dc2626] text-white px-2.5 py-1 rounded-full text-xs font-semibold uppercase">
            <XCircle size={12} /> {status}
          </span>
        );
      case "PARTIAL":
        return (
          <span className="inline-flex items-center gap-1 bg-[#d97706] text-white px-2.5 py-1 rounded-full text-xs font-semibold uppercase">
            <AlertCircle size={12} /> {status}
          </span>
        );
      case "PAID":
        return (
          <span className="inline-flex items-center gap-1 bg-[#16a34a] text-white px-2.5 py-1 rounded-full text-xs font-semibold uppercase">
            <CheckCircle size={12} /> PAID
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {payments.map((pay) => (
        <div key={pay.id} className="bg-[#161b22] border border-gray-800 rounded-lg p-4 flex flex-col">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="font-bold text-white">INV-{pay.id}</div>
              <div className="text-xs text-gray-400">{format(new Date(pay.createdAt), "MMM dd, yyyy")}</div>
              {pay.transactionId && (
                <div className="text-[10px] text-gray-500 mt-1 tracking-wider">
                  TXN: {pay.transactionId}
                </div>
              )}
            </div>
            {getStatusBadge(pay.status)}
          </div>
          <div className="mb-3">
            <div className="font-bold text-white">{pay.customer.fullName}</div>
            <div className="text-xs text-gray-400">{pay.customer.email}</div>
          </div>
          <div className="mb-3">
            <div className="text-sm text-white">{pay.service.name}</div>
          </div>
          <div className="mt-auto flex items-end justify-between pt-4 border-t border-gray-800/50">
            <div>
              <div className="text-sm font-bold text-white">{formatCurrency(pay.negotiatedAmount)}</div>
              {(pay.status === "PARTIAL" || pay.status === "PAID") && (
                <div className="text-[10px] font-bold text-[#16a34a]">
                  {pay.status === "PAID" ? "FULLY PAID" : `PAID: ${formatCurrency(pay.amountPaid)}`}
                </div>
              )}
            </div>
            <div className="flex gap-1">
              {["PENDING", "SENT", "FAILED"].includes(pay.status) && (
                <button
                  onClick={() => onResend(pay.id)}
                  disabled={resendPending}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 rounded-md disabled:opacity-50 transition-colors"
                >
                  <Send size={16} />
                </button>
              )}
              {["PENDING", "SENT", "PARTIAL", "FAILED"].includes(pay.status) && (
                <button
                  onClick={() => onMarkPaid(pay)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-green-500 hover:bg-green-500/10 rounded-md transition-colors"
                >
                  <CheckCircle size={16} />
                </button>
              )}
              {pay.status === "PAID" && (
                <button
                  onClick={() => onOpenInvoice(pay)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-md transition-colors"
                  title="View Receipt"
                >
                  <Paperclip size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
