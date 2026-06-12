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

interface ServicesState {
  services: ServiceRequest[];
  isLoading: boolean;
  setServices: (services: ServiceRequest[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useServicesStore = create<ServicesState>((set) => ({
  services: [],
  isLoading: true,
  setServices: (services) => set({ services }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
