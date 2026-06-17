import apiClient from '@/lib/api/axios';
import { Payment } from '@/app/types/payment.types';

export const publicPaymentService = {
  getPaymentByOrderId: async (orderId: string): Promise<Payment> => {
    const response = await apiClient.get(`/payments/order/${orderId}`);
    return response.data.data;
  },
  verifyPayment: async (data: { razorpay_order_id: string, razorpay_payment_id: string, razorpay_signature: string }): Promise<any> => {
    const response = await apiClient.post('/payments/verify', data);
    return response.data;
  }
};
