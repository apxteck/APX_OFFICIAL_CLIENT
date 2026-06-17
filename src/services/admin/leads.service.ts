import apiClient from '@/lib/axios';

import { Lead, LeadStatus, LeadFollowUp } from '@/app/types/lead.types';

export type { Lead, LeadStatus, LeadFollowUp };

export const leadsService = {
  getLeads: async (): Promise<Lead[]> => {
    try {
      const response = await apiClient.post('/enquiry/leads/all', { search: "", page: 1, limit: 100 });
      return response.data?.data?.data || [];
    } catch (error) {
      console.error("Failed to fetch leads", error);
      return [];
    }
  },

  getLeadById: async (id: number): Promise<Lead | null> => {
    try {
      const response = await apiClient.get(`/enquiry/leads/${id}`);
      return response.data?.data || null;
    } catch (error) {
      console.error("Failed to fetch lead", error);
      return null;
    }
  },

  updateLeadStatus: async (id: number, status: LeadStatus): Promise<Lead> => {
    const response = await apiClient.patch(`/enquiry/leads/${id}`, { status });
    return response.data?.data;
  },

  getLeadFollowUps: async (leadId: number): Promise<LeadFollowUp[]> => {
    try {
      // In the backend, there isn't a direct get follow-ups by lead id endpoint that doesn't use POST /follow-ups/all
      // It expects { search, page, limit } but doesn't natively filter by leadId easily unless we do client-side filter
      // Wait, let's see backend getAllFollowUps... It doesn't filter by leadId!
      // But we can fetch all and filter for now, or just send a request.
      const response = await apiClient.post(`/enquiry/follow-ups/all`, { page: 1, limit: 100 });
      const allFollowUps = response.data?.data?.data || [];
      return allFollowUps.filter((f: LeadFollowUp) => f.leadId === leadId);
    } catch (error) {
      console.error("Failed to fetch follow ups", error);
      return [];
    }
  },

  addLeadFollowUp: async (data: { leadId: number, doneById?: number, note: string, followedAt: string, nextFollowUpAt: string }): Promise<LeadFollowUp> => {
    // If doneById is not provided, backend should ideally take from req.user, but we might need it. We will just pass what we have.
    // The backend uses req.user.id implicitly? No, req.body.doneById.
    const response = await apiClient.post('/enquiry/follow-ups', data);
    return response.data?.data;
  }
};
