import React from 'react';
// Removed dynamic import
import { api } from '@/lib/axios';
import { Payment } from './types';

import PaymentsManager from './_components/PaymentsManager';

export default async function CustomerPaymentsPage() {
  let initialPayments: Payment[] = [];
  try {
    const res = await api.getMyPayments();
    if (res.success && res.data) {
      initialPayments = res.data;
    }
  } catch (error) {
    console.error('Failed to fetch initial payments:', error);
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 px-4 sm:px-6 md:px-8 pb-safe pt-4">
      <PaymentsManager initialPayments={initialPayments} />
    </div>
  );
}
