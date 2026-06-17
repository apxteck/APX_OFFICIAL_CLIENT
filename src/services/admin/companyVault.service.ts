import apiClient from "@/lib/api/axios";

export interface CompanyVaultDocument {
  id: number;
  key: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  fileId?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FetchVaultParams {
  page?: number;
  limit?: number;
  search?: string;
  fileType?: string;
}

export const companyVaultService = {
  getAllCompanyVault: async (params?: FetchVaultParams): Promise<{ data: CompanyVaultDocument[], total: number, totalPages: number }> => {
    try {
      const response = await apiClient.get("/company-vault/getAll", { params });
      return {
        data: response.data?.data?.data || [],
        total: response.data?.data?.pagination?.total || 0,
        totalPages: response.data?.data?.pagination?.totalPages || 1,
      };
    } catch (error) {
      console.error("Failed to fetch company vault documents", error);
      return { data: [], total: 0, totalPages: 1 };
    }
  },

  getCompanyVaultById: async (id: number): Promise<CompanyVaultDocument | null> => {
    try {
      const response = await apiClient.get(`/company-vault/${id}`);
      return response.data?.data || null;
    } catch (error) {
      console.error("Failed to fetch company vault document", error);
      return null;
    }
  },

  createCompanyVault: async (formData: FormData): Promise<CompanyVaultDocument> => {
    const response = await apiClient.post("/company-vault/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data?.data;
  },

  updateCompanyVault: async (id: number, formData: FormData): Promise<CompanyVaultDocument> => {
    const response = await apiClient.patch(`/company-vault/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data?.data;
  },

  deleteCompanyVault: async (id: number): Promise<void> => {
    await apiClient.delete(`/company-vault/${id}`);
  }
};
