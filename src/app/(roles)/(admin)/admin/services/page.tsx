import React, { Suspense } from 'react';
import { servicesService } from '@/services/admin/services.service';
import ServicesLoading from './loading';
// Removed dynamic import

import ServicesManager from './_components/ServicesManager';

async function ServicesFetcher() {
  let initialServices: import('@/services/admin/services.service').Service[] = [];
  try {
    const data = await servicesService.getServices();
    initialServices = data || [];
  } catch (error) {
    console.error('Failed to fetch services:', error);
  }

  return <ServicesManager initialServices={initialServices} />;
}

export default function ServicesManagementPage() {
  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto pb-safe pb-12 px-4 sm:px-6 md:px-8">
      <Suspense fallback={<ServicesLoading />}>
        <ServicesFetcher />
      </Suspense>
    </div>
  );
}
