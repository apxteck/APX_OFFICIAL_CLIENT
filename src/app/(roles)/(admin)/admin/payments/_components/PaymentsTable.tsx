import React from 'react';
import { Payment } from '@/services/admin/payments.service';
import { format } from 'date-fns';
import { Send, CheckCircle, Paperclip, Clock, XCircle, AlertCircle } from 'lucide-react';

interface Props {
  payments: Payment[];
  resendPending: boolean;
  resendVariables: number | null;
  onResend: (id: number) => void;
  onMarkPaid: (payment: Payment) => void;
  onOpenInvoice: (payment: Payment) => void;
}

export function PaymentsTable({
  payments,
  resendPending,
  resendVariables,
  onResend,
  onMarkPaid,
  onOpenInvoice,
}: Props) {
  const formatCurrency = (amount: string | number | null) => {
    if (!amount) return '—';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(
      Number(amount)
    );
  };

  const getStatusBadge = (status: Payment['status']) => {
    switch (status) {
      case 'PENDING':
      case 'SENT':
        return (
          <span className="inline-flex items-center gap-1 bg-[#1d4ed8] text-white px-2.5 py-1 rounded-full text-xs font-semibold uppercase">
            {status === 'PENDING' ? <Clock size={12} /> : <Send size={12} />} {status}
          </span>
        );
      case 'FAILED':
        return (
          <span className="inline-flex items-center gap-1 bg-[#dc2626] text-white px-2.5 py-1 rounded-full text-xs font-semibold uppercase">
            <XCircle size={12} /> {status}
          </span>
        );
      case 'PARTIAL':
        return (
          <span className="inline-flex items-center gap-1 bg-[#d97706] text-white px-2.5 py-1 rounded-full text-xs font-semibold uppercase">
            <AlertCircle size={12} /> {status}
          </span>
        );
      case 'PAID':
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
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-[#161b22] text-gray-400 border-b border-gray-800">
          <tr>
            <th className="px-4 py-3 font-medium">INVOICE ID</th>
            <th className="px-4 py-3 font-medium">CUSTOMER</th>
            <th className="px-4 py-3 font-medium">SERVICE</th>
            <th className="px-4 py-3 font-medium">AMOUNT</th>
            <th className="px-4 py-3 font-medium">STATUS</th>
            <th className="px-4 py-3 font-medium text-right">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((pay) => (
            <tr
              key={pay.id}
              className="border-b border-gray-800/50 hover:bg-[#161b22]/50 transition-colors"
            >
              <td className="px-4 py-3">
                <div className="font-medium text-white">INV-{pay.id}</div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {format(new Date(pay.createdAt), 'MMM dd, yyyy')}
                </div>
                {pay.transactionId && (
                  <div className="text-[10px] text-gray-500 mt-1 tracking-wider">
                    TXN: {pay.transactionId}
                  </div>
                )}
              </td>
              <td className="px-4 py-3">
                <div className="font-bold text-white">{pay.customer.fullName}</div>
                <div className="text-xs text-gray-400 mt-0.5">{pay.customer.email}</div>
              </td>
              <td className="px-4 py-3">
                <div className="text-white">{pay.service.name}</div>
                {pay.serviceRequestId && (
                  <div className="text-xs text-blue-400 mt-0.5 hover:underline cursor-pointer">
                    Req #{pay.serviceRequestId}
                  </div>
                )}
              </td>
              <td className="px-4 py-3">
                <div className="text-white">{formatCurrency(pay.negotiatedAmount)}</div>
                {(pay.status === 'PARTIAL' || pay.status === 'PAID') && (
                  <div className="text-[10px] font-bold text-[#16a34a] mt-0.5">
                    {pay.status === 'PAID'
                      ? 'FULLY PAID'
                      : `PAID: ${formatCurrency(pay.amountPaid)}`}
                  </div>
                )}
              </td>
              <td className="px-4 py-3">{getStatusBadge(pay.status)}</td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  {['PENDING', 'SENT', 'FAILED'].includes(pay.status) && (
                    <button
                      onClick={() => onResend(pay.id)}
                      disabled={resendPending}
                      className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors disabled:opacity-50"
                      title="Resend Payment Link"
                    >
                      {resendPending && resendVariables === pay.id ? (
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send size={16} />
                      )}
                    </button>
                  )}
                  {['PENDING', 'SENT', 'PARTIAL', 'FAILED'].includes(pay.status) && (
                    <button
                      onClick={() => onMarkPaid(pay)}
                      className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-green-500 hover:bg-green-500/10 rounded-md transition-colors"
                      title="Mark as Paid"
                    >
                      <CheckCircle size={16} />
                    </button>
                  )}
                  <button
                    disabled={pay.status !== 'PAID'}
                    onClick={() => onOpenInvoice(pay)}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-md transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
                    title="View Receipt / Invoice"
                  >
                    <Paperclip size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
