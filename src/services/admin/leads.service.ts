import apiClient from '@/lib/axios';

import { Lead, LeadStatus } from '@/app/types/lead.types';

export type { Lead, LeadStatus };

export const leadsService = {
  getLeads: async (): Promise<Lead[]> => {
    try {
      const response = await apiClient.get('/enquiry');
      // The API returns { success: true, data: { data: [...], pagination: {...} } }
      // Or response.data.data.data depends on how backend sends it.
      // From backend controller: return ApiResponse.success(res, 'Enquiries fetched successfully', { data: enquiries, pagination: {...} });
      // So response.data.data.data is the array of enquiries.
      return response.data?.data?.data || [];
    } catch (error) {
      console.error("Failed to fetch leads", error);
      return [];
    }
  },

  getLeadById: async (id: number): Promise<Lead | null> => {
    try {
      const response = await apiClient.get(`/enquiry/${id}`);
      return response.data?.data || null;
    } catch (error) {
      console.error("Failed to fetch lead", error);
      return null;
    }
  },

  updateLeadStatus: async (id: number, status: LeadStatus): Promise<Lead> => {
    const response = await apiClient.patch(`/enquiry/${id}/status`, { status });
    return response.data?.data;
  },
};
