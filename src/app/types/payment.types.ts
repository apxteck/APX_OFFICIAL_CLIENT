// Placeholder for payment-related types
export interface PaymentPayload {
  amount: number;
  currency: string;
  paymentMethod: string;
}

export interface Payment {
  id: number;
  customerId: number;
  serviceId: number;
  serviceRequestId: number | null;
  suggestedAmount: number | null;
  negotiatedAmount: number;
  paymentLink: string | null;
  invoiceNote: string | null;
  status: 'PENDING' | 'SENT' | 'PAID' | 'CANCELLED';
  transactionId: string | null;
  amountPaid: number | null;
  emailSentAt: string | null;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  customer?: {
    id: number;
    fullName: string;
    email: string;
    phone: string;
  };
  service?: {
    id: number;
    name: string;
    slug: string;
  };
}
