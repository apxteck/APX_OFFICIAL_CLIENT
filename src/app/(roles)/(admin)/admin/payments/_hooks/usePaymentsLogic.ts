import { useEffect, useMemo } from "react";
import { usePaymentsStore } from "../_store/usePaymentsStore";
import { paymentsService, Payment } from "@/services/admin/payments.service";

export const usePaymentsLogic = () => {
  const store = usePaymentsStore();

  const fetchPayments = async () => {
    store.setIsLoading(true);
    try {
      const data = await paymentsService.getPayments();
      store.setPayments(data);
    } catch (err) {
      store.setToast({ message: "Failed to load payments", type: "error" });
    } finally {
      store.setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateStatus = async (id: number, status: Payment["status"]) => {
    try {
      store.setToast({ message: "Updating status...", type: "loading" });
      await paymentsService.updatePaymentStatus(id, status);
      store.setToast({ message: `Invoice #${id} marked as ${status}`, type: "success" });
      fetchPayments();
    } catch (err: any) {
      store.setToast({ message: err.message || "Failed to update status", type: "error" });
    }
  };

  const handleResendLink = async (id: number) => {
    try {
      store.setToast({ message: "Sending email...", type: "loading" });
      await paymentsService.resendInvoiceLink(id);
      store.setToast({ message: `Payment link sent for Invoice #${id}`, type: "success" });
      fetchPayments();
    } catch (err: any) {
      store.setToast({ message: err.message || "Failed to send link", type: "error" });
    }
  };

  const filteredPayments = useMemo(() => {
    const term = store.searchTerm.toLowerCase();
    return store.payments.filter((pay) =>
      pay.customerName.toLowerCase().includes(term) ||
      pay.id.toString().includes(term) ||
      pay.serviceName.toLowerCase().includes(term)
    );
  }, [store.payments, store.searchTerm]);

  return {
    ...store,
    filteredPayments,
    handleUpdateStatus,
    handleResendLink,
  };
};
