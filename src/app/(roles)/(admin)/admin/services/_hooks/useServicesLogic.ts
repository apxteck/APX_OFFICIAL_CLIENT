import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useServicesStore } from "../_store/useServicesStore";
import { servicesService } from "@/services/admin/services.service";

export const useServicesLogic = () => {
  const store = useServicesStore();
  const router = useRouter();

  const fetchServices = async () => {
    try {
      store.setIsLoading(true);
      const data = await servicesService.getServices();
      store.setServices(data || []);
    } catch (error) {
      store.setToast({ message: "Failed to fetch services", type: "error" });
    } finally {
      store.setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this service? This action cannot be undone.")) {
      try {
        store.setToast({ message: "Deleting service...", type: "loading" });
        await servicesService.deleteService(id);
        store.setToast({ message: "Service deleted successfully", type: "success" });
        fetchServices();
      } catch (error) {
        store.setToast({ message: "Failed to delete service", type: "error" });
      }
    }
  };

  const handleToggleActive = async (id: number, currentStatus: boolean) => {
    try {
      store.setToast({ message: "Updating status...", type: "loading" });
      await servicesService.toggleServiceActive(id, !currentStatus);
      store.setToast({ message: `Service is now ${!currentStatus ? 'Active' : 'Inactive'}`, type: "success" });
      fetchServices();
    } catch (error) {
      store.setToast({ message: "Failed to update service status", type: "error" });
    }
  };

  const filteredServices = useMemo(() => {
    const term = store.searchTerm.toLowerCase();
    return store.services.filter(service => 
      service.name.toLowerCase().includes(term) ||
      service.slug.toLowerCase().includes(term)
    );
  }, [store.services, store.searchTerm]);

  const navigateToCreate = () => router.push('/admin/services/create');
  const navigateToManageFields = (id: number) => router.push(`/admin/services/${id}/fields`);
  const navigateToEdit = (id: number) => router.push(`/admin/services/${id}/edit`);

  return {
    ...store,
    filteredServices,
    handleDelete,
    handleToggleActive,
    navigateToCreate,
    navigateToManageFields,
    navigateToEdit,
  };
};
