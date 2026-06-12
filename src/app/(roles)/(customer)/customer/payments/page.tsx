'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const PaymentsManager = dynamic(() => import('./_components/PaymentsManager'), {
  ssr: false,
});

export default function CustomerPaymentsPage() {
  return <PaymentsManager />;
}
