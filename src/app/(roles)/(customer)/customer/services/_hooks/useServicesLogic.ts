import { useEffect } from 'react';
import { api } from '@/lib/axios';
import { useServicesStore } from '../_store/useServicesStore';

export const useServicesLogic = () => {
  const store = useServicesStore();

  useEffect(() => {
    async function fetchMyServices() {
      try {
        store.setIsLoading(true);
        // Fetching all requests to display as services
        const res = await api.getMyRequests();
        // Only keep non-cancelled requests for "My Services" view
        const activeRequests = (res.data || []).filter((r: any) => r.status !== 'CANCELLED');
        store.setServices(activeRequests);
      } catch (error) {
        console.error("Failed to load services:", error);
      } finally {
        store.setIsLoading(false);
      }
    }
    fetchMyServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return store;
};
