import { create } from 'zustand';

export interface Payment {
  id: number;
  status: 'PENDING' | 'SENT' | 'PAID' | 'FAILED';
  negotiatedAmount: number;
  amountPaid?: number;
  createdAt: string;
  paidAt?: string;
  updatedAt: string;
  paymentLink?: string;
  service?: {
    name: string;
  };
}

interface PaymentsState {
  payments: Payment[];
  isLoading: boolean;
  setPayments: (payments: Payment[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const usePaymentsStore = create<PaymentsState>((set) => ({
  payments: [],
  isLoading: true,
  setPayments: (payments) => set({ payments }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
