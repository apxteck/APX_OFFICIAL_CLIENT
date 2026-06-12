import { useEffect, useMemo } from "react";
import { useReimbursementsStore } from "../_store/useReimbursementsStore";
import { reimbursementsService, Reimbursement } from "@/services/admin/reimbursements.service";

export const useReimbursementsLogic = () => {
  const store = useReimbursementsStore();

  const fetchReimbursements = async () => {
    try {
      store.setIsLoading(true);
      const data = await reimbursementsService.getReimbursements();
      store.setReimbursements(data);
    } catch (err) {
      store.setToast({ message: "Failed to load reimbursements", type: "error" });
    } finally {
      store.setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReimbursements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateStatus = async (id: number, status: Reimbursement["status"], note?: string) => {
    try {
      store.setToast({ message: `Marking as ${status}...`, type: "loading" });
      await reimbursementsService.updateReimbursementStatus(id, status, note);
      store.setToast({ message: `Reimbursement ${status}`, type: "success" });
      store.setSelectedRequest(null);
      store.setReviewNote("");
      fetchReimbursements();
    } catch (err: any) {
      store.setToast({ message: err.message || "Failed to update status", type: "error" });
    }
  };

  const filteredData = useMemo(() => {
    const term = store.searchTerm.toLowerCase();
    return store.reimbursements.filter(r => 
      r.title.toLowerCase().includes(term) ||
      (r.user?.fullName && r.user.fullName.toLowerCase().includes(term)) ||
      r.category.toLowerCase().includes(term)
    );
  }, [store.reimbursements, store.searchTerm]);

  return {
    ...store,
    filteredData,
    handleUpdateStatus,
  };
};
