import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useRequestsStore } from "../_store/useRequestsStore";
import { requestsService } from "@/services/admin/requests.service";

export const useRequestsLogic = () => {
  const store = useRequestsStore();
  const router = useRouter();

  useEffect(() => {
    store.setIsLoading(true);
    requestsService.getRequests()
      .then(data => {
        store.setRequests(data);
      })
      .catch(err => {
        console.error("Failed to load requests", err);
      })
      .finally(() => {
        store.setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredRequests = useMemo(() => {
    const term = store.searchTerm.toLowerCase();
    return store.requests.filter(req => 
      req.customerName.toLowerCase().includes(term) ||
      String(req.id).toLowerCase().includes(term) ||
      req.serviceType.toLowerCase().includes(term)
    );
  }, [store.requests, store.searchTerm]);

  const navigateToCreate = () => router.push('/admin/requests/create');
  const navigateToManage = (id: string | number) => router.push(`/admin/requests/${id}`);

  return {
    ...store,
    filteredRequests,
    navigateToCreate,
    navigateToManage,
  };
};
