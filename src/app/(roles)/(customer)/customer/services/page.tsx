import React from 'react';
// Removed dynamic import
import { api } from '@/lib/axios';
import { ServiceRequest } from './types';

import ServicesManager from './_components/ServicesManager';

export default async function CustomerServicesPage() {
  let initialServices: ServiceRequest[] = [];
  try {
    const res = await api.getMyRequests();
    if (res && Array.isArray(res.data)) {
      initialServices = res.data.filter((r: any) => r.status !== 'CANCELLED');
    } else if (res && Array.isArray(res)) {
      initialServices = res.filter((r: any) => r.status !== 'CANCELLED');
    }
  } catch (error) {
    console.error("Failed to fetch initial services:", error);
  }

  return <ServicesManager initialServices={initialServices} />;
}
