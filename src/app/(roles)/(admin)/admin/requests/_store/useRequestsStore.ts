import { create } from "zustand";
import { ServiceRequest } from "@/services/admin/requests.service";

interface RequestsState {
  requests: ServiceRequest[];
  isLoading: boolean;
  searchTerm: string;

  setRequests: (requests: ServiceRequest[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setSearchTerm: (term: string) => void;
}

export const useRequestsStore = create<RequestsState>((set) => ({
  requests: [],
  isLoading: true,
  searchTerm: "",

  setRequests: (requests) => set({ requests }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
}));
