'use client';

import React from 'react';
import { Payment } from '@/services/admin/payments.service';
import { Toaster } from 'react-hot-toast';
import { usePaymentsLogic } from '../_hooks/usePaymentsLogic';

import { PaymentsSummary } from './PaymentsSummary';
import { PaymentsToolbar } from './PaymentsToolbar';
import { PaymentsTable } from './PaymentsTable';
import { PaymentsGrid } from './PaymentsGrid';

import { MarkPaidDialog } from './modals/MarkPaidDialog';
import { CreatePaymentLinkDialog } from './modals/CreatePaymentLinkDialog';
import { InvoicePrintModal } from './modals/InvoicePrintModal';

interface Props {
  initialPaymentsData: {
    payments: Payment[];
    total: number;
    page: number;
  };
  initialRequestsData: any[];
}

export function PaymentsClientWrapper({ initialPaymentsData, initialRequestsData }: Props) {
  const logic = usePaymentsLogic(initialPaymentsData, initialRequestsData);

  return (
    <div className="px-4 sm:px-6 md:px-8 pb-10 w-full max-w-7xl mx-auto text-white print:hidden">
      <Toaster position="top-right" />

      {/* Summary Stats */}
      <PaymentsSummary payments={logic.payments} />

      {/* Actions: Search, Create Link & Toggle View */}
      <PaymentsToolbar
        searchTerm={logic.searchTerm}
        setSearchTerm={logic.setSearchTerm}
        viewMode={logic.viewMode}
        setViewMode={logic.setViewMode}
        onOpenCreateLink={() => logic.setIsCreateLinkOpen(true)}
      />

      {/* Main Content */}
      <div className="bg-[#0d1117] border border-gray-800 rounded-xl overflow-hidden">
        {logic.isLoading ? (
          <div className="p-8 text-center text-gray-400">Loading payments...</div>
        ) : logic.isError ? (
          <div className="p-8 text-center text-red-500">Failed to load payments.</div>
        ) : logic.filteredPayments.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No payments found.</div>
        ) : logic.viewMode === 'table' ? (
          <PaymentsTable
            payments={logic.filteredPayments}
            resendPending={logic.resendMutation.isPending}
            resendVariables={logic.resendMutation.variables ?? null}
            onResend={(id) => logic.resendMutation.mutate(id)}
            onMarkPaid={logic.openMarkPaidDialog}
            onOpenInvoice={logic.openInvoiceDialog}
          />
        ) : (
          <PaymentsGrid
            payments={logic.filteredPayments}
            resendPending={logic.resendMutation.isPending}
            onResend={(id) => logic.resendMutation.mutate(id)}
            onMarkPaid={logic.openMarkPaidDialog}
            onOpenInvoice={logic.openInvoiceDialog}
          />
        )}
      </div>

      {/* Modals */}
      <MarkPaidDialog
        isOpen={logic.isMarkPaidOpen}
        payment={logic.selectedPayment}
        amountPaidInput={logic.amountPaidInput}
        transactionIdInput={logic.transactionIdInput}
        isPending={logic.markPaidMutation.isPending}
        onClose={logic.closeMarkPaidDialog}
        onConfirm={logic.handleConfirmMarkPaid}
        setAmountPaidInput={logic.setAmountPaidInput}
        setTransactionIdInput={logic.setTransactionIdInput}
      />

      <CreatePaymentLinkDialog
        isOpen={logic.isCreateLinkOpen}
        requestsData={logic.requestsData}
        selectedRequestId={logic.selectedRequestId}
        createNegotiatedAmount={logic.createNegotiatedAmount}
        createSuggestedAmount={logic.createSuggestedAmount}
        createInvoiceNote={logic.createInvoiceNote}
        isPending={logic.createPaymentMutation.isPending}
        onClose={() => logic.setIsCreateLinkOpen(false)}
        onConfirm={logic.handleCreatePaymentLink}
        setSelectedRequestId={logic.setSelectedRequestId}
        setCreateNegotiatedAmount={logic.setCreateNegotiatedAmount}
        setCreateSuggestedAmount={logic.setCreateSuggestedAmount}
        setCreateInvoiceNote={logic.setCreateInvoiceNote}
      />

      <InvoicePrintModal
        isOpen={logic.isInvoiceOpen}
        payment={logic.invoicePayment}
        isSending={logic.sendInvoiceMutation.isPending}
        onClose={() => logic.setIsInvoiceOpen(false)}
        onSendInvoice={(id) => logic.sendInvoiceMutation.mutate(id)}
      />
    </div>
  );
}
