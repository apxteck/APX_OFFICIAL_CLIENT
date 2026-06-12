import apiClient from "@/lib/api/axios";

export interface DashboardStats {
  customers: {
    totalCustomers: number;
    newRequestsToday: number;
    openRequests: number;
    inProgressRequests: number;
    completedRequestsThisMonth: number;
  };
  revenue: {
    pendingInvoicesAmount: number;
    revenueThisMonth: number;
    overduePaymentsCount: number;
    totalRevenueLifetime: number;
  };
  content: {
    blogPostsPublished: number;
    commentsPending?: number;
    totalBlogLikes: number;
  };
  leads: {
    newLeadsThisWeek: number;
    newEnquiries: number;
    openTasks: number;
    pendingReimbursementsAmount: number;
  };
  charts: {
    requestsByStatus: { name: string; value: number; fill: string }[];
  };
  activityFeed: {
    id: string;
    type: string;
    text: string;
    createdAt: string;
    icon: string;
    color: string;
  }[];
}

export interface EmployeeDashboardStats {
  tasks: any[];
  reimbursements: any[];
  assignedRequestsCount: number;
}

export const dashboardService = {
  getAdminStats: async (): Promise<DashboardStats | null> => {
    try {
      const response = await apiClient.get('/dashboard/admin');
      if (response.data?.success) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return null;
    }
  },
  getEmployeeStats: async (): Promise<EmployeeDashboardStats | null> => {
    try {
      const response = await apiClient.get('/dashboard/employee');
      if (response.data?.success) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching employee dashboard stats:', error);
      return null;
    }
  },
  globalSearch: async (query: string): Promise<SearchResults> => {
    const response = await apiClient.get(`/dashboard/search`, {
      params: { q: query },
    });
    return response.data?.data;
  },
};

export interface SearchResultItem {
  id: number;
  slug?: string;
  title?: string;
  name?: string;
  question?: string;
  excerpt?: string;
  description?: string;
  answer?: string;
  clientName?: string;
  serviceType?: string;
  coverImageUrl?: string;
  thumbnailUrl?: string;
}

export interface SearchResults {
  services: SearchResultItem[];
  blogs: SearchResultItem[];
  portfolios: SearchResultItem[];
  faqs: SearchResultItem[];
}
