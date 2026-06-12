import { create } from "zustand";
import { Payment } from "@/services/admin/payments.service";

type ToastState = { message: string; type: "success" | "error" | "loading" } | null;

interface PaymentsState {
  payments: Payment[];
  isLoading: boolean;
  searchTerm: string;
  toast: ToastState;
  
  setPayments: (payments: Payment[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setSearchTerm: (term: string) => void;
  setToast: (toast: ToastState) => void;
}

export const usePaymentsStore = create<PaymentsState>((set) => ({
  payments: [],
  isLoading: true,
  searchTerm: "",
  toast: null,
  
  setPayments: (payments) => set({ payments }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setToast: (toast) => set({ toast }),
}));
