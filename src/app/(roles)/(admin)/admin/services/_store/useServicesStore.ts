import { create } from "zustand";
import { Service } from "@/services/admin/services.service";

type ToastState = { message: string; type: "success" | "error" | "loading" } | null;

interface ServicesState {
  services: Service[];
  isLoading: boolean;
  searchTerm: string;
  toast: ToastState;

  setServices: (services: Service[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setSearchTerm: (term: string) => void;
  setToast: (toast: ToastState) => void;
}

export const useServicesStore = create<ServicesState>((set) => ({
  services: [],
  isLoading: true,
  searchTerm: "",
  toast: null,

  setServices: (services) => set({ services }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setToast: (toast) => set({ toast }),
}));
