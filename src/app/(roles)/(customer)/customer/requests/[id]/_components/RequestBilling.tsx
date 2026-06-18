"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Download } from 'lucide-react';
import { ServiceRequestDetails } from '../../types';

interface RequestBillingProps {
  request: ServiceRequestDetails;
  setInvoicePayment: (payment: any) => void;
  setIsInvoiceOpen: (isOpen: boolean) => void;
}

export function RequestBilling({ request, setInvoicePayment, setIsInvoiceOpen }: RequestBillingProps) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const payments = request.payments || [];

  if (payments.length === 0) return null;

  return (
    <motion.div variants={item} className="bg-white dark:bg-[#111] p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm space-y-4">
      <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-cyan-500" />
        Billing
      </h3>
      <div className="space-y-3">
        {payments.map((payment: any) => (
          <div key={payment.id} className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-gray-900 dark:text-white">Amount</span>
              <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">₹{payment.negotiatedAmount}</span>
            </div>
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="text-gray-500 dark:text-gray-400">Status</span>
              <span className={`font-semibold ${payment.status === 'PAID' ? 'text-emerald-500' : 'text-amber-500'}`}>
                {payment.status}
              </span>
            </div>
            {payment.status === 'PAID' && (
              <button
                onClick={() => {
                  setInvoicePayment(payment);
                  setIsInvoiceOpen(true);
                }}
                className="w-full py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Invoice
              </button>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
