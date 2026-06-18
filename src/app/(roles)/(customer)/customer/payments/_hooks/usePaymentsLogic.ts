import { useState, useEffect, useMemo } from 'react';
import { api } from '@/lib/axios';
import { Payment } from '../types';

export const usePaymentsLogic = (initialPayments: Payment[]) => {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [isLoading, setIsLoading] = useState<boolean>(initialPayments.length === 0);

  useEffect(() => {
    // If we already have initialPayments (e.g. from SSR), we might still want to fetch
    // to ensure data is fresh, but if we don't have them (SSR fetch failed due to auth),
    // we MUST fetch them here on the client.
    let mounted = true;

    async function loadPayments() {
      try {
        if (payments.length === 0) setIsLoading(true);
        const res = await api.getMyPayments();
        if (mounted && res.success && res.data) {
          setPayments(res.data);
        }
      } catch (error) {
        console.error("Failed to load payments:", error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    loadPayments();

    return () => {
      mounted = false;
    };
  }, []); // Only run once on mount

  const stats = useMemo(() => {
    const pendingPayments = payments.filter(p => p.status === 'PENDING' || p.status === 'SENT' || p.status === 'FAILED');
    const paidPayments = payments.filter(p => p.status === 'PAID');

    const amountDue = pendingPayments.reduce((sum, p) => sum + Number(p.negotiatedAmount || 0), 0);
    const lastPayment = paidPayments.length > 0 ? paidPayments[0] : null;

    return { amountDue, lastPayment };
  }, [payments]);

  return {
    payments,
    isLoading,
    ...stats
  };
};
