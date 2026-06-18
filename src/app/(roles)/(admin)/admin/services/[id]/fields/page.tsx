import React from 'react';
import { servicesAdminService } from '@/services/admin/services.service';
import { ServiceFieldsClient } from '../../_components/ServiceFieldsClient';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Service, ServiceField } from '@/app/types/service.types';

export default async function ServiceFieldsBuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const serviceId = resolvedParams.id;

  let service = null;
  let fields: ServiceField[] = [];

  try {
    const [serviceData, fieldsData] = await Promise.all([
      servicesAdminService.getServiceById(serviceId),
      servicesAdminService.getServiceFields(serviceId),
    ]);

    service = serviceData as unknown as Service;

    if (fieldsData) {
      const sortedFields = [...fieldsData].sort((a, b) => a.sortOrder - b.sortOrder);
      fields = sortedFields as unknown as ServiceField[];
    }
  } catch (error) {
    console.error('Failed to fetch service fields data:', error);
  }

  if (!service) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Service Not Found</h2>
        <Link href="/admin/services" className="text-indigo-600 hover:underline">
          Return to Services
        </Link>
      </div>
    );
  }

  return (
    <ServiceFieldsClient initialService={service} initialFields={fields} serviceId={serviceId} />
  );
}
