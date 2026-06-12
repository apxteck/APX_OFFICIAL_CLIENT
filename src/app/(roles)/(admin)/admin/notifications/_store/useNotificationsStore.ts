import { create } from "zustand";
import { Notification } from "../_types";

interface NotificationsState {
  notifications: Notification[];
  isLoading: boolean;
  setNotifications: (notifications: Notification[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useNotificationsStore = create<NotificationsState>((set) => ({
  notifications: [],
  isLoading: false,
  setNotifications: (notifications) => set({ notifications }),
  setLoading: (isLoading) => set({ isLoading }),
}));
