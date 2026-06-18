import React from 'react';
// Removed dynamic import
import { api } from '@/lib/axios';
import { ServiceRequest } from './types';

import RequestsManager from './_components/RequestsManager';

export default async function CustomerRequestsPage() {
  let initialRequests: ServiceRequest[] = [];
  try {
    const res = await api.getMyRequests();
    if (res && Array.isArray(res.data)) {
      initialRequests = res.data;
    } else if (res && Array.isArray(res)) {
      initialRequests = res;
    }
  } catch (error) {
    console.error('Failed to fetch initial requests:', error);
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-safe pt-4">
      <RequestsManager initialRequests={initialRequests} />
    </div>
  );
}
