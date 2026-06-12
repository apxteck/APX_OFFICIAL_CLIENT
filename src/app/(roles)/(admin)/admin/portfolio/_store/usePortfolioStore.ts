import { create } from "zustand";
import { Portfolio } from "@/services/admin/portfolio.service";

type ToastState = { message: string; type: "success" | "error" | "loading" } | null;

interface PortfolioState {
  portfolios: Portfolio[];
  isLoading: boolean;
  searchTerm: string;
  toast: ToastState;
  
  setPortfolios: (portfolios: Portfolio[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setSearchTerm: (term: string) => void;
  setToast: (toast: ToastState) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  portfolios: [],
  isLoading: true,
  searchTerm: "",
  toast: null,
  
  setPortfolios: (portfolios) => set({ portfolios }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setToast: (toast) => set({ toast }),
}));
