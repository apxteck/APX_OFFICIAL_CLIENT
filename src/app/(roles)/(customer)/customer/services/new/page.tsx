import React from 'react';
// Removed dynamic import
import { api } from '@/lib/axios';
import { Service } from '@/app/types/service.types';

import NewServiceManager from './_components/NewServiceManager';

export default async function AddNewServicePage() {
  let initialServices: Service[] = [];
  try {
    const data = await api.fetchServices();
    if (Array.isArray(data)) {
      initialServices = data.filter(s => s.isActive);
    }
  } catch (error) {
    console.error("Failed to fetch initial active services for wizard:", error);
  }

  return <NewServiceManager initialServices={initialServices} />;
}
