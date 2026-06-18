import { useState, useEffect } from 'react';
import { api } from '@/lib/axios';
import { ServiceRequest } from '../types';

export const useServicesLogic = (initialServices: ServiceRequest[]) => {
  const [services, setServices] = useState<ServiceRequest[]>(initialServices);
  const [isLoading, setIsLoading] = useState<boolean>(initialServices.length === 0);

  useEffect(() => {
    let mounted = true;

    async function fetchMyServices() {
      try {
        if (services.length === 0) setIsLoading(true);
        const res = await api.getMyRequests();
        if (mounted && res.data) {
          const activeRequests = res.data.filter((r: any) => r.status !== 'CANCELLED');
          setServices(activeRequests);
        } else if (mounted && Array.isArray(res)) {
          const activeRequests = res.filter((r: any) => r.status !== 'CANCELLED');
          setServices(activeRequests);
        }
      } catch (error) {
        console.error("Failed to load services:", error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    fetchMyServices();

    return () => {
      mounted = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { services, isLoading };
};
