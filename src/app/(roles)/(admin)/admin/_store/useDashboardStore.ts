import { create } from "zustand";
import { DashboardStats } from "@/services/admin/dashboard.service";

export type Tab = "overview" | "customers" | "revenue" | "content" | "operations";

interface DashboardState {
  activeTab: Tab;
  stats: DashboardStats | null;
  isLoading: boolean;

  setActiveTab: (tab: Tab) => void;
  setStats: (stats: DashboardStats | null) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  activeTab: "overview",
  stats: null,
  isLoading: true,

  setActiveTab: (activeTab) => set({ activeTab }),
  setStats: (stats) => set({ stats }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
