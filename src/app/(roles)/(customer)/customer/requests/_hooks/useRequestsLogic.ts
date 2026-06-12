import { useEffect, useMemo } from 'react';
import { api } from '@/lib/axios';
import { useRequestsStore } from '../_store/useRequestsStore';

export const useRequestsLogic = () => {
  const store = useRequestsStore();

  useEffect(() => {
    async function loadRequests() {
      try {
        store.setIsLoading(true);
        const res = await api.getMyRequests();
        store.setRequests(res.data || []);
      } catch (error) {
        console.error("Failed to load requests:", error);
      } finally {
        store.setIsLoading(false);
      }
    }
    loadRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredRequests = useMemo(() => {
    return store.requests.filter(req => {
      const matchesSearch = req.service?.name?.toLowerCase().includes(store.searchQuery.toLowerCase()) || 
                            `REQ-${req.id}`.toLowerCase().includes(store.searchQuery.toLowerCase());
      const matchesStatus = store.statusFilter === 'ALL' || req.status === store.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [store.requests, store.searchQuery, store.statusFilter]);

  return {
    ...store,
    filteredRequests
  };
};
