import { useState, useEffect, useMemo } from 'react';
import { api } from '@/lib/axios';
import { ServiceRequest } from '../types';

export const useRequestsLogic = (initialRequests: ServiceRequest[]) => {
  const [requests, setRequests] = useState<ServiceRequest[]>(initialRequests);
  const [isLoading, setIsLoading] = useState<boolean>(initialRequests.length === 0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  useEffect(() => {
    let mounted = true;

    async function loadRequests() {
      try {
        if (requests.length === 0) setIsLoading(true);
        const res = await api.getMyRequests();
        if (mounted && res.data) {
          setRequests(res.data);
        }
      } catch (error) {
        console.error('Failed to load requests:', error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    loadRequests();

    return () => {
      mounted = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const matchesSearch =
        req.service?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `REQ-${req.id}`.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || req.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [requests, searchQuery, statusFilter]);

  return {
    requests,
    isLoading,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    filteredRequests,
  };
};
