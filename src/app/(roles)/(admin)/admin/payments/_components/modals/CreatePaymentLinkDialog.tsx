import React from 'react';

interface Props {
  isOpen: boolean;
  requestsData: any[];
  selectedRequestId: string;
  createNegotiatedAmount: string;
  createSuggestedAmount: string;
  createInvoiceNote: string;
  isPending: boolean;
  onClose: () => void;
  onConfirm: () => void;
  setSelectedRequestId: (val: string) => void;
  setCreateNegotiatedAmount: (val: string) => void;
  setCreateSuggestedAmount: (val: string) => void;
  setCreateInvoiceNote: (val: string) => void;
}

export function CreatePaymentLinkDialog({
  isOpen,
  requestsData,
  selectedRequestId,
  createNegotiatedAmount,
  createSuggestedAmount,
  createInvoiceNote,
  isPending,
  onClose,
  onConfirm,
  setSelectedRequestId,
  setCreateNegotiatedAmount,
  setCreateSuggestedAmount,
  setCreateInvoiceNote,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#161b22] border border-gray-800 rounded-xl w-full max-w-md p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-4">Create Payment Link</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Service Request *</label>
            <select
              value={selectedRequestId}
              onChange={(e) => setSelectedRequestId(e.target.value)}
              className="w-full bg-[#0d1117] border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="">-- Select a Request --</option>
              {requestsData?.map((r) => (
                <option key={r.id} value={r.id}>
                  Req #{r.id} - {r.customerName} ({r.serviceType})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Negotiated Amount (₹) *</label>
            <input
              type="number"
              value={createNegotiatedAmount}
              onChange={(e) => setCreateNegotiatedAmount(e.target.value)}
              placeholder="Final amount to charge"
              className="w-full bg-[#0d1117] border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Suggested Amount (₹) (Optional)
            </label>
            <input
              type="number"
              value={createSuggestedAmount}
              onChange={(e) => setCreateSuggestedAmount(e.target.value)}
              placeholder="Original suggested amount"
              className="w-full bg-[#0d1117] border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Invoice Note (Optional)</label>
            <textarea
              value={createInvoiceNote}
              onChange={(e) => setCreateInvoiceNote(e.target.value)}
              placeholder="Add a note to the invoice..."
              className="w-full bg-[#0d1117] border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-500 resize-none h-20"
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
            disabled={isPending || !selectedRequestId || !createNegotiatedAmount}
            className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending && (
              <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            )}
            Generate & Send Link
          </button>
        </div>
      </div>
    </div>
  );
}
