import React from "react";
import { Payment } from "@/services/admin/payments.service";

interface Props {
  isOpen: boolean;
  payment: Payment | null;
  amountPaidInput: string;
  transactionIdInput: string;
  isPending: boolean;
  onClose: () => void;
  onConfirm: () => void;
  setAmountPaidInput: (val: string) => void;
  setTransactionIdInput: (val: string) => void;
}

export function MarkPaidDialog({
  isOpen,
  payment,
  amountPaidInput,
  transactionIdInput,
  isPending,
  onClose,
  onConfirm,
  setAmountPaidInput,
  setTransactionIdInput,
}: Props) {
  if (!isOpen || !payment) return null;

  const formatCurrency = (amount: string | number | null) => {
    if (!amount) return "—";
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(Number(amount));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#161b22] border border-gray-800 rounded-xl w-full max-w-md p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-4">Mark Payment as Paid</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-400">Customer</p>
            <p className="font-medium text-white">{payment.customer.fullName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Amount Due</p>
            <p className="font-medium text-white">{formatCurrency(payment.negotiatedAmount)}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Amount Paid (₹)</label>
            <input
              type="number"
              value={amountPaidInput}
              onChange={(e) => setAmountPaidInput(e.target.value)}
              className="w-full bg-[#0d1117] border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Transaction ID (optional)</label>
            <input
              type="text"
              value={transactionIdInput}
              onChange={(e) => setTransactionIdInput(e.target.value)}
              placeholder="e.g. TXN_123456789"
              className="w-full bg-[#0d1117] border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isPending}
            className="px-4 py-2 text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors flex items-center gap-2"
          >
            {isPending && (
              <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            )}
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
