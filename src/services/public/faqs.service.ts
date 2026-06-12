import apiClient from '@/lib/api/axios';
import { Faq } from '@/app/types/faq.types';

export const publicFaqsService = {
  getFaqs: async (params?: { category?: string }): Promise<Faq[]> => {
    const response = await apiClient.get('/faq/public', { params });
    return response.data.data;
  },
};
