import { create } from 'zustand';

export type RequestStatus = "NEW" | "IN_REVIEW" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export interface ServiceRequest {
  id: number;
  status: RequestStatus;
  priority: string;
  createdAt: string;
  service: { id: number; name: string };
  assignedTo?: { id: number; fullName: string };
}

interface RequestsState {
  requests: ServiceRequest[];
  isLoading: boolean;
  searchQuery: string;
  statusFilter: string;
  
  setRequests: (requests: ServiceRequest[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setSearchQuery: (searchQuery: string) => void;
  setStatusFilter: (statusFilter: string) => void;
}

export const useRequestsStore = create<RequestsState>((set) => ({
  requests: [],
  isLoading: true,
  searchQuery: '',
  statusFilter: 'ALL',
  
  setRequests: (requests) => set({ requests }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
}));
