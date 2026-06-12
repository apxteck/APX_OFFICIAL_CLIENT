import { useEffect, useMemo } from 'react';
import { api } from '@/lib/axios';
import { usePaymentsStore } from '../_store/usePaymentsStore';

export const usePaymentsLogic = () => {
  const store = usePaymentsStore();

  useEffect(() => {
    async function loadPayments() {
      try {
        store.setIsLoading(true);
        const res = await api.getMyPayments();
        if (res.success && res.data) {
          store.setPayments(res.data);
        }
      } catch (error) {
        console.error("Failed to load payments:", error);
      } finally {
        store.setIsLoading(false);
      }
    }
    loadPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stats = useMemo(() => {
    const pendingPayments = store.payments.filter(p => p.status === 'PENDING' || p.status === 'SENT');
    const paidPayments = store.payments.filter(p => p.status === 'PAID');

    const amountDue = pendingPayments.reduce((sum, p) => sum + Number(p.negotiatedAmount || 0), 0);
    const lastPayment = paidPayments.length > 0 ? paidPayments[0] : null;

    return { amountDue, lastPayment };
  }, [store.payments]);

  return {
    ...store,
    ...stats
  };
};
