import React from "react";
import { servicesAdminService } from "@/services/admin/services.service";
import { EditServiceClient } from "../../_components/EditServiceClient";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Service } from "@/app/types/service.types";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const serviceId = resolvedParams.id;

  let service = null;
  try {
    const data = await servicesAdminService.getServiceById(serviceId);
    service = data as unknown as Service;
  } catch (error) {
    console.error("Failed to fetch service:", error);
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

  return <EditServiceClient initialService={service} serviceId={serviceId} />;
}
