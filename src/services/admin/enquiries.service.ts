import apiClient from '@/lib/axios';

export type EnquiryStatus = "NEW" | "SEEN" | "CONTACTED" | "INTERESTED" | "NEGOTIATING" | "CONVERTED" | "LOST";

export interface Enquiry {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  businessName?: string;
  serviceInterest?: string;
  status: EnquiryStatus;
  source?: string;
  createdAt: string;
  assignedTo?: {
    fullName: string;
  };
  assignedToId?: number;
}

export const enquiriesService = {
  getEnquiries: async (params?: { page?: number; limit?: number; status?: string; search?: string }): Promise<Enquiry[]> => {
    try {
      const response = await apiClient.get('/enquiry', { params });
      return response.data?.data?.data || [];
    } catch (error) {
      console.error("Failed to fetch enquiries", error);
      return [];
    }
  },

  getEnquiryById: async (id: number): Promise<Enquiry | null> => {
    try {
      const response = await apiClient.get(`/enquiry/${id}`);
      return response.data?.data || null;
    } catch (error) {
      console.error("Failed to fetch enquiry", error);
      return null;
    }
  },

  updateEnquiryStatus: async (id: number, status: EnquiryStatus): Promise<Enquiry> => {
    const response = await apiClient.patch(`/enquiry/${id}/status`, { status });
    return response.data?.data;
  },

  assignEnquiry: async (id: number, assignedToId: number): Promise<Enquiry> => {
    const response = await apiClient.patch(`/enquiry/${id}/assign`, { assignedToId });
    return response.data?.data;
  },

  deleteEnquiry: async (id: number): Promise<void> => {
    await apiClient.delete(`/enquiry/${id}`);
  }
};
