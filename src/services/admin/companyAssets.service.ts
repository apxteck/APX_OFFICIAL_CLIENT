import apiClient from '@/lib/api/axios';

export interface CompanyAsset {
  id: number;
  type: string;
  title: string;
  referenceNumber?: string;
  provider?: string;
  issuedDate?: string;
  expiryDate?: string;
  renewalCost?: number;
  autoRenew: boolean;
  status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED' | 'MAINTENANCE';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FetchAssetsParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
  status?: string;
}

export const companyAssetsService = {
  getAllCompanyAssets: async (
    params?: FetchAssetsParams
  ): Promise<{ data: CompanyAsset[]; total: number; totalPages: number }> => {
    try {
      const response = await apiClient.get('/company-asset/getAll', { params });
      return {
        data: response.data?.data?.data || [],
        total: response.data?.data?.pagination?.total || 0,
        totalPages: response.data?.data?.pagination?.totalPages || 1,
      };
    } catch (error) {
      console.error('Failed to fetch company assets', error);
      return { data: [], total: 0, totalPages: 1 };
    }
  },

  getCompanyAssetById: async (id: number): Promise<CompanyAsset | null> => {
    try {
      const response = await apiClient.get(`/company-asset/${id}`);
      return response.data?.data || null;
    } catch (error) {
      console.error('Failed to fetch company asset details', error);
      return null;
    }
  },

  createCompanyAsset: async (data: Partial<CompanyAsset>): Promise<CompanyAsset> => {
    const response = await apiClient.post('/company-asset/create', data);
    return response.data?.data;
  },

  updateCompanyAsset: async (id: number, data: Partial<CompanyAsset>): Promise<CompanyAsset> => {
    const response = await apiClient.patch(`/company-asset/${id}`, data);
    return response.data?.data;
  },

  deleteCompanyAsset: async (id: number): Promise<void> => {
    await apiClient.delete(`/company-asset/${id}`);
  },
};
