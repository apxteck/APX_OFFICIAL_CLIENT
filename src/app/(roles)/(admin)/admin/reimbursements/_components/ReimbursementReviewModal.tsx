import React from "react";
import { IndianRupee, ExternalLink, FileText, XCircle, CheckCircle2 } from "lucide-react";
import { Reimbursement } from "@/services/admin/reimbursements.service";

interface Props {
  selectedRequest: Reimbursement | null;
  reviewNote: string;
  setReviewNote: (note: string) => void;
  onClose: () => void;
  onUpdateStatus: (id: number, status: Reimbursement["status"], note?: string) => void;
}

export function ReimbursementReviewModal({
  selectedRequest,
  reviewNote,
  setReviewNote,
  onClose,
  onUpdateStatus
}: Props) {
  if (!selectedRequest) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-white dark:bg-[#111] h-full shadow-2xl animate-in slide-in-from-right flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
          <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
            Review Request
          </h2>
          <button 
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            <XCircle size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          <div className="text-center p-6 bg-gray-50 dark:bg-[#1a1a1a] rounded-3xl border border-gray-100 dark:border-white/5">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Requested Amount</p>
            <p className="text-4xl font-black text-gray-900 dark:text-white flex items-center justify-center gap-1">
              <IndianRupee size={32} className="text-gray-400" />
              {Number(selectedRequest.amount).toFixed(2)}
            </p>
          </div>

          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Request Details</p>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-white/5">
                <span className="text-sm font-medium text-gray-500">Employee</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{selectedRequest.user?.fullName}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-white/5">
                <span className="text-sm font-medium text-gray-500">Category</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{selectedRequest.category}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-white/5">
                <span className="text-sm font-medium text-gray-500">Title</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white text-right max-w-[200px] truncate">{selectedRequest.title}</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-[#1a1a1a] p-4 rounded-2xl border border-gray-100 dark:border-white/5">
              {selectedRequest.description || "No description provided."}
            </p>
          </div>

          {selectedRequest.receiptUrl && (
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Attachments</p>
              <div className="rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden bg-gray-50 dark:bg-[#1a1a1a]">
                {selectedRequest.receiptUrl.match(/\.(jpeg|jpg|gif|png|webp|avif)$/i) ? (
                  <a href={selectedRequest.receiptUrl} target="_blank" rel="noreferrer" className="block relative w-full h-48 overflow-hidden group">
                    <img src={selectedRequest.receiptUrl} alt="Receipt" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 bg-white/90 dark:bg-black/90 backdrop-blur-sm text-black dark:text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 flex items-center gap-2">
                        <ExternalLink size={14} /> View Full Image
                      </span>
                    </div>
                  </a>
                ) : (
                  <a href={selectedRequest.receiptUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group">
                    <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
                        <FileText size={20} />
                      </div>
                      <span className="font-bold text-sm group-hover:underline">View Receipt Document</span>
                    </div>
                    <ExternalLink size={16} className="text-gray-400 group-hover:text-indigo-500" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Review Note */}
          {selectedRequest.status === "PENDING" && (
            <div className="pt-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Admin Note (Optional)</label>
              <textarea 
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                placeholder="Enter reason for rejection or approval note..."
                className="w-full p-4 bg-white dark:bg-[#151515] border border-gray-200 dark:border-white/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 min-h-[100px]"
              />
            </div>
          )}
          
          {/* Existing Note */}
          {selectedRequest.reviewNote && selectedRequest.status !== "PENDING" && (
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Admin Note</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 p-4 rounded-2xl">
                {selectedRequest.reviewNote}
              </p>
            </div>
          )}

        </div>

        {/* Actions Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#151515]">
          {selectedRequest.status === "PENDING" ? (
            <div className="flex gap-3">
              <button 
                onClick={() => onUpdateStatus(selectedRequest.id, "REJECTED", reviewNote)}
                className="flex-1 px-4 py-3 min-h-[44px] bg-white dark:bg-[#222] border border-gray-200 dark:border-white/10 hover:border-red-500 hover:text-red-600 dark:hover:text-red-400 rounded-xl font-bold text-sm transition-colors text-gray-700 dark:text-gray-300"
              >
                Reject
              </button>
              <button 
                onClick={() => onUpdateStatus(selectedRequest.id, "APPROVED", reviewNote)}
                className="flex-1 px-4 py-3 min-h-[44px] bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-colors shadow-sm"
              >
                Approve
              </button>
            </div>
          ) : selectedRequest.status === "APPROVED" ? (
            <button 
              onClick={() => onUpdateStatus(selectedRequest.id, "PAID")}
              className="w-full px-4 py-3 min-h-[44px] bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={18} /> Mark as Paid
            </button>
          ) : (
            <button 
              onClick={onClose}
              className="w-full px-4 py-3 min-h-[44px] bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-800 dark:text-white rounded-xl font-bold text-sm transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
