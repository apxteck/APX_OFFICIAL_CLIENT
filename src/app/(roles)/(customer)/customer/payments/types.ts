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
