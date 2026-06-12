import { create } from "zustand";
import { Reimbursement } from "@/services/admin/reimbursements.service";

type ToastState = { message: string; type: "success" | "error" | "loading" } | null;

interface ReimbursementsState {
  reimbursements: Reimbursement[];
  isLoading: boolean;
  searchTerm: string;
  toast: ToastState;
  selectedRequest: Reimbursement | null;
  reviewNote: string;
  
  setReimbursements: (reimbursements: Reimbursement[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setSearchTerm: (term: string) => void;
  setToast: (toast: ToastState) => void;
  setSelectedRequest: (req: Reimbursement | null) => void;
  setReviewNote: (note: string) => void;
}

export const useReimbursementsStore = create<ReimbursementsState>((set) => ({
  reimbursements: [],
  isLoading: true,
  searchTerm: "",
  toast: null,
  selectedRequest: null,
  reviewNote: "",
  
  setReimbursements: (reimbursements) => set({ reimbursements }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setToast: (toast) => set({ toast }),
  setSelectedRequest: (selectedRequest) => set({ selectedRequest }),
  setReviewNote: (reviewNote) => set({ reviewNote }),
}));
