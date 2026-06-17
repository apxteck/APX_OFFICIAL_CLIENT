"use client";

import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CreditCard, Search, Clock, Send, XCircle, AlertCircle, CheckCircle, Paperclip, LayoutGrid, List, Plus } from "lucide-react";
import { paymentsService, Payment } from "@/services/admin/payments.service";
import { requestsService } from "@/services/admin/requests.service";
import toast, { Toaster } from "react-hot-toast";
import { format } from "date-fns";

export default function PaymentsPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Mark as Paid Dialog state
  const [isMarkPaidOpen, setIsMarkPaidOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [amountPaidInput, setAmountPaidInput] = useState("");
  const [transactionIdInput, setTransactionIdInput] = useState("");

  // Create Payment Link Dialog state
  const [isCreateLinkOpen, setIsCreateLinkOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string>("");
  const [createNegotiatedAmount, setCreateNegotiatedAmount] = useState("");
  const [createSuggestedAmount, setCreateSuggestedAmount] = useState("");
  const [createInvoiceNote, setCreateInvoiceNote] = useState("");

  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [invoicePayment, setInvoicePayment] = useState<Payment | null>(null);

  const sendInvoiceMutation = useMutation({
    mutationFn: (id: number) => paymentsService.sendInvoiceEmail(id),
    onSuccess: () => toast.success("Invoice sent to customer successfully"),
    onError: () => toast.error("Failed to send invoice email"),
  });

  const openInvoiceDialog = (payment: Payment) => {
    setInvoicePayment(payment);
    setIsInvoiceOpen(true);
  };

  const { data: paymentsData, isLoading, isError } = useQuery({
    queryKey: ["payments"],
    queryFn: () => paymentsService.getPayments(),
  });

  const { data: requestsData, isLoading: isLoadingRequests } = useQuery({
    queryKey: ["serviceRequests"],
    queryFn: () => requestsService.getRequests(),
  });

  const resendMutation = useMutation({
    mutationFn: (id: number) => paymentsService.resendInvoiceLink(id),
    onSuccess: () => {
      toast.success("Payment link resent");
    },
    onError: () => {
      toast.error("Failed to resend payment link");
    },
  });

  const markPaidMutation = useMutation({
    mutationFn: ({ id, amountPaid, transactionId }: { id: number; amountPaid: number; transactionId?: string }) =>
      paymentsService.markAsPaid(id, { amountPaid, transactionId }),
    onMutate: async ({ id, amountPaid, transactionId }) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ["payments"] });
      const previousPayments = queryClient.getQueryData<{ payments: Payment[]; total: number; page: number }>(["payments"]);

      if (previousPayments) {
        queryClient.setQueryData(["payments"], {
          ...previousPayments,
          payments: previousPayments.payments.map((p) =>
            p.id === id ? { ...p, status: "PAID", amountPaid: amountPaid.toString(), transactionId: transactionId || null } : p
          ),
        });
      }
      return { previousPayments };
    },
    onSuccess: () => {
      toast.success("Payment marked as paid");
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      closeMarkPaidDialog();
    },
    onError: (err, newTodo, context) => {
      if (context?.previousPayments) {
        queryClient.setQueryData(["payments"], context.previousPayments);
      }
      toast.error("Failed to mark as paid");
    },
  });

  const createPaymentMutation = useMutation({
    mutationFn: (payload: { customerId: number; serviceRequestId: number; suggestedAmount?: number; negotiatedAmount: number; invoiceNote?: string }) =>
      paymentsService.createPaymentLink(payload),
    onSuccess: () => {
      toast.success("Payment link created successfully");
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      setIsCreateLinkOpen(false);
      // Reset form
      setSelectedRequestId("");
      setCreateNegotiatedAmount("");
      setCreateSuggestedAmount("");
      setCreateInvoiceNote("");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create payment link");
    },
  });

  const payments = paymentsData?.payments || [];

  const filteredPayments = useMemo(() => {
    if (!searchTerm) return payments;
    const lowerTerm = searchTerm.toLowerCase();
    return payments.filter(
      (p) =>
        p.id.toString().includes(lowerTerm) ||
        p.customer.fullName.toLowerCase().includes(lowerTerm) ||
        p.service.name.toLowerCase().includes(lowerTerm)
    );
  }, [payments, searchTerm]);

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

  const openMarkPaidDialog = (payment: Payment) => {
    setSelectedPayment(payment);
    setAmountPaidInput(payment.negotiatedAmount);
    setTransactionIdInput("");
    setIsMarkPaidOpen(true);
  };

  const closeMarkPaidDialog = () => {
    setIsMarkPaidOpen(false);
    setSelectedPayment(null);
  };

  const handleConfirmMarkPaid = () => {
    if (!selectedPayment) return;
    markPaidMutation.mutate({
      id: selectedPayment.id,
      amountPaid: Number(amountPaidInput),
      transactionId: transactionIdInput || undefined,
    });
  };

  const handleCreatePaymentLink = () => {
    if (!selectedRequestId || !createNegotiatedAmount) {
      toast.error("Service Request and Negotiated Amount are required");
      return;
    }

    const request = requestsData?.find(r => r.id.toString() === selectedRequestId);
    if (!request || !request.customerId) {
      toast.error("Could not determine customer for this request");
      return;
    }

    createPaymentMutation.mutate({
      customerId: request.customerId,
      serviceRequestId: Number(selectedRequestId),
      suggestedAmount: createSuggestedAmount ? Number(createSuggestedAmount) : undefined,
      negotiatedAmount: Number(createNegotiatedAmount),
      invoiceNote: createInvoiceNote || undefined,
    });
  };

  return (
    <>
    <div className="p-6 max-w-7xl mx-auto text-white print:hidden">
      <Toaster position="top-right" />

      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <CreditCard className="text-blue-500 w-8 h-8" />
          <h1 className="text-2xl font-bold">Payments & Invoices</h1>
        </div>
        <p className="text-gray-400">Manage customer invoices, manually mark as paid, and track statuses.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-4">
          <div className="text-gray-400 text-sm mb-1">Total Payments</div>
          <div className="text-2xl font-bold text-white">{payments.length}</div>
        </div>
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-4">
          <div className="text-gray-400 text-sm mb-1">Total Revenue</div>
          <div className="text-2xl font-bold text-green-500">
            {formatCurrency(payments.filter(p => p.status === 'PAID').reduce((acc, curr) => acc + (Number(curr.amountPaid) || Number(curr.negotiatedAmount) || 0), 0))}
          </div>
        </div>
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-4">
          <div className="text-gray-400 text-sm mb-1">Pending Amount</div>
          <div className="text-2xl font-bold text-blue-500">
            {formatCurrency(payments.filter(p => ['PENDING', 'SENT'].includes(p.status)).reduce((acc, curr) => acc + (Number(curr.negotiatedAmount) || 0), 0))}
          </div>
        </div>
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-4">
          <div className="text-gray-400 text-sm mb-1">Paid Invoices</div>
          <div className="text-2xl font-bold text-white">
            {payments.filter(p => p.status === 'PAID').length} / {payments.length}
          </div>
        </div>
      </div>

      {/* Actions: Search, Create Link & Toggle View */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by ID, customer name, or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#161b22] border border-gray-800 rounded-md py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCreateLinkOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm font-medium"
          >
            <Plus size={16} />
            Create Link
          </button>
          <div className="flex items-center bg-[#161b22] border border-gray-800 rounded-md p-1">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-sm transition-colors ${viewMode === "table" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"}`}
              title="Table View"
            >
              <List size={16} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-sm transition-colors ${viewMode === "grid" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"}`}
              title="Card View"
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[#0d1117] border border-gray-800 rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-400">Loading payments...</div>
        ) : isError ? (
          <div className="p-8 text-center text-red-500">Failed to load payments.</div>
        ) : filteredPayments.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No payments found.</div>
        ) : viewMode === "table" ? (
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
                {filteredPayments.map((pay) => (
                  <tr key={pay.id} className="border-b border-gray-800/50 hover:bg-[#161b22]/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-white">INV-{pay.id}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 text-gray-400">
                        {format(new Date(pay.createdAt), "MMM dd, yyyy")}
                      </div>
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
                      {(pay.status === "PARTIAL" || pay.status === "PAID") && (
                        <div className="text-[10px] font-bold text-[#16a34a] mt-0.5">
                          {pay.status === "PAID" ? "FULLY PAID" : `PAID: ${formatCurrency(pay.amountPaid)}`}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">{getStatusBadge(pay.status)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {/* Send Action */}
                        {["PENDING", "SENT", "FAILED"].includes(pay.status) && (
                          <button
                            onClick={() => resendMutation.mutate(pay.id)}
                            disabled={resendMutation.isPending}
                            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                            title="Resend Payment Link"
                          >
                            {resendMutation.isPending && resendMutation.variables === pay.id ? (
                              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                              <Send size={16} />
                            )}
                          </button>
                        )}
                        {/* Mark Paid Action */}
                        {["PENDING", "SENT", "PARTIAL", "FAILED"].includes(pay.status) && (
                          <button
                            onClick={() => openMarkPaidDialog(pay)}
                            className="p-1.5 text-gray-400 hover:text-green-500 hover:bg-green-500/10 rounded-md transition-colors"
                            title="Mark as Paid"
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}
                        {/* Receipt Action */}
                        <button
                          disabled={pay.status !== "PAID"}
                          onClick={() => openInvoiceDialog(pay)}
                          className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-md transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {filteredPayments.map((pay) => (
              <div key={pay.id} className="bg-[#161b22] border border-gray-800 rounded-lg p-4 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-bold text-white">INV-{pay.id}</div>
                    <div className="text-xs text-gray-400">{format(new Date(pay.createdAt), "MMM dd, yyyy")}</div>
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
                        onClick={() => resendMutation.mutate(pay.id)}
                        className="p-1.5 text-gray-400 hover:text-white rounded-md"
                      >
                        <Send size={16} />
                      </button>
                    )}
                    {["PENDING", "SENT", "PARTIAL", "FAILED"].includes(pay.status) && (
                      <button
                        onClick={() => openMarkPaidDialog(pay)}
                        className="p-1.5 text-gray-400 hover:text-green-500 rounded-md"
                      >
                        <CheckCircle size={16} />
                      </button>
                    )}
                    {pay.status === "PAID" && (
                      <button
                        onClick={() => openInvoiceDialog(pay)}
                        className="p-1.5 text-gray-400 hover:text-blue-500 rounded-md"
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
        )}
      </div>

      {/* Mark as Paid Dialog */}
      {isMarkPaidOpen && selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[#161b22] border border-gray-800 rounded-xl w-full max-w-md p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4">Mark Payment as Paid</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">Customer</p>
                <p className="font-medium text-white">{selectedPayment.customer.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Amount Due</p>
                <p className="font-medium text-white">{formatCurrency(selectedPayment.negotiatedAmount)}</p>
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
                onClick={closeMarkPaidDialog}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                disabled={markPaidMutation.isPending}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmMarkPaid}
                disabled={markPaidMutation.isPending}
                className="px-4 py-2 text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors flex items-center gap-2"
              >
                {markPaidMutation.isPending && (
                  <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                )}
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Payment Link Dialog */}
      {isCreateLinkOpen && (
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
                <label className="block text-sm text-gray-400 mb-1">Suggested Amount (₹) (Optional)</label>
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
                onClick={() => setIsCreateLinkOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                disabled={createPaymentMutation.isPending}
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePaymentLink}
                disabled={createPaymentMutation.isPending || !selectedRequestId || !createNegotiatedAmount}
                className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createPaymentMutation.isPending && (
                  <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                )}
                Generate & Send Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

      {/* Invoice Modal (Printable) */}
      {isInvoiceOpen && invoicePayment && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/60 backdrop-blur-sm print:bg-white print:backdrop-blur-none print:block">
          <div className="flex min-h-full items-start justify-center p-4 sm:p-6">
            <div className="my-8 sm:my-12 bg-white print:border-none rounded-2xl w-full max-w-3xl shadow-2xl relative flex flex-col animate-in fade-in zoom-in-95 duration-200 ring-1 ring-gray-200 print:ring-0 print:shadow-none print:m-0">
              
              {/* Header Actions (Hidden on Print) */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 py-4 border-b border-gray-100 print:hidden bg-gray-50/90 backdrop-blur-md sticky top-0 z-20 rounded-t-2xl gap-4 sm:gap-0">
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100/50 p-2 rounded-xl">
                      <Paperclip className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                        Invoice <span className="text-gray-400 font-medium">#INV-{invoicePayment.id}</span>
                      </h2>
                    </div>
                  </div>
                  {/* Close button for mobile */}
                  <button
                    onClick={() => setIsInvoiceOpen(false)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors sm:hidden"
                    title="Close"
                  >
                    <XCircle size={22} />
                  </button>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 sm:flex-none justify-center px-3 py-2 sm:px-4 sm:py-2 text-sm font-medium bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 rounded-lg transition-all shadow-sm flex items-center gap-2"
                  >
                    <Paperclip size={16} /> 
                    <span>Print</span>
                  </button>
                  <button
                    onClick={() => sendInvoiceMutation.mutate(invoicePayment.id)}
                    disabled={sendInvoiceMutation.isPending}
                    className="flex-1 sm:flex-none justify-center px-3 py-2 sm:px-4 sm:py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-sm flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {sendInvoiceMutation.isPending ? (
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send size={16} />
                    )}
                    <span>{sendInvoiceMutation.isPending ? "Sending..." : "Email Customer"}</span>
                  </button>
                  <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block"></div>
                  {/* Close button for desktop */}
                  <button
                    onClick={() => setIsInvoiceOpen(false)}
                    className="hidden sm:block p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Close"
                  >
                    <XCircle size={22} />
                  </button>
                </div>
              </div>

              {/* Printable Invoice Content */}
              <div className="p-6 sm:p-12 print:p-0 bg-white text-gray-900 rounded-b-2xl" id="invoice-content">
                {/* Invoice Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <span className="text-2xl font-black text-white tracking-tighter">APX</span>
                    </div>
                    <div>
                      <h1 className="text-3xl font-black text-gray-900 tracking-tight">APX Teck</h1>
                      <p className="text-gray-500 text-sm mt-1 flex items-center gap-2 font-medium">
                         <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                         contact@apxteck.com
                      </p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right w-full sm:w-auto">
                    <div className="inline-block px-3 py-1 bg-green-50 border border-green-200 text-green-700 rounded-full text-[11px] font-bold tracking-widest uppercase mb-3 shadow-sm">
                      Paid Receipt
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black text-gray-200 tracking-tighter mb-2 uppercase">Invoice</h2>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-gray-900">Invoice Number: <span className="text-gray-500 font-medium">INV-{invoicePayment.id}</span></p>
                      <p className="text-sm font-semibold text-gray-900">Date Issued: <span className="text-gray-500 font-medium">{invoicePayment.paidAt ? format(new Date(invoicePayment.paidAt), "MMM dd, yyyy") : format(new Date(invoicePayment.createdAt), "MMM dd, yyyy")}</span></p>
                    </div>
                  </div>
                </div>

                {/* Billing Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Billed To</p>
                    <p className="text-lg font-bold text-gray-900 mb-1">{invoicePayment.customer.fullName}</p>
                    <p className="text-sm font-medium text-gray-500">{invoicePayment.customer.email}</p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Payment Details</p>
                    <div className="flex items-center sm:justify-end gap-2 mb-2">
                      <span className="text-sm font-semibold text-gray-900">Status:</span>
                      <span className="text-green-700 font-bold bg-green-100/80 border border-green-200 px-2 py-0.5 rounded-md text-xs">PAID</span>
                    </div>
                    <div className="flex flex-col sm:items-end">
                      <span className="text-sm font-semibold text-gray-900 mb-1">Transaction ID:</span>
                      <span className="font-mono text-xs text-gray-600 bg-white px-2 py-1 rounded-md border border-gray-200 inline-block break-all max-w-full">
                        {invoicePayment.transactionId || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Items Table */}
                <div className="border border-gray-200 rounded-2xl overflow-hidden mb-8 shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-4 px-6 font-bold text-xs text-gray-500 uppercase tracking-widest border-b border-gray-200 w-full">Service Description</th>
                        <th className="py-4 px-6 font-bold text-xs text-gray-500 uppercase tracking-widest border-b border-gray-200 text-right whitespace-nowrap">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      <tr className="group hover:bg-gray-50/50 transition-colors">
                        <td className="py-5 px-6">
                          <p className="text-base font-bold text-gray-900">{invoicePayment.service.name}</p>
                          <p className="text-sm font-medium text-gray-500 mt-1">Service Request #{invoicePayment.serviceRequestId}</p>
                          {invoicePayment.invoiceNote && (
                             <div className="mt-4 bg-blue-50/50 border border-blue-100 text-blue-800 text-sm p-3.5 rounded-xl">
                               <span className="font-bold text-blue-900 block mb-1">Note:</span> 
                               <span className="text-blue-700/90">{invoicePayment.invoiceNote}</span>
                             </div>
                          )}
                        </td>
                        <td className="py-5 px-6 text-right align-top">
                          <span className="text-lg font-bold text-gray-900">₹{invoicePayment.amountPaid || invoicePayment.negotiatedAmount}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Totals Section */}
                <div className="flex flex-col sm:flex-row justify-between items-end gap-6 mb-10 mt-6">
                  <div className="w-full sm:w-1/2 hidden sm:block">
                     {/* Spacing element */}
                  </div>
                  <div className="w-full sm:w-[340px] bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center py-2 text-sm text-gray-600">
                      <span className="font-medium">Subtotal</span>
                      <span className="font-semibold text-gray-900">₹{invoicePayment.amountPaid || invoicePayment.negotiatedAmount}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 text-sm text-gray-600 border-b border-gray-200 mb-4 pb-4">
                      <span className="font-medium">Tax (0%)</span>
                      <span className="font-semibold text-gray-900">₹0.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total Paid</span>
                      <span className="text-3xl font-black text-indigo-600 tracking-tight">₹{invoicePayment.amountPaid || invoicePayment.negotiatedAmount}</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-12 pt-8 border-t border-gray-100">
                  <div className="inline-flex items-center justify-center gap-2 mb-3 bg-green-50 text-green-700 px-4 py-2 rounded-full font-bold">
                    <CheckCircle className="w-5 h-5" />
                    <span>Payment Successful</span>
                  </div>
                  <p className="text-sm font-medium text-gray-600 max-w-md mx-auto leading-relaxed mt-2">
                    Thank you for your business! If you have any questions, please contact our billing team at <a href="mailto:contact@apxteck.com" className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline">contact@apxteck.com</a>.
                  </p>
                  <p className="mt-8 text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                    This is a computer-generated receipt and does not require a physical signature.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
