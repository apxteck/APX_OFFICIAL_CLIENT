import adminApi from "./api";

export interface DashboardStats {
  totalUsers: number;
  activeRequests: number;
  totalServices: number;
  recentActivity: Array<{
    id: string;
    title: string;
    description: string;
    time: string;
    type: "request" | "user" | "service";
  }>;
}

export const dashboardService = {
  getOverviewStats: async (): Promise<DashboardStats> => {
    try {
      // Execute all active backend API calls in parallel
      const [usersRes, requestsRes, servicesRes] = await Promise.allSettled([
        adminApi.get("/auth/getAllUsers?limit=5"),
        adminApi.get("/service/request/all?limit=5"),
        adminApi.get("/service/getAll"),
      ]);

      let totalUsers = 0;
      let activeRequests = 0;
      let totalServices = 0;
      const recentActivity: any[] = [];

      // Helper function to format relative time
      const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const diffInMinutes = Math.floor((new Date().getTime() - date.getTime()) / 60000);
        if (diffInMinutes < 60) return `${diffInMinutes || 1} mins ago`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
        return `${Math.floor(diffInMinutes / 1440)} days ago`;
      };

      // 1. Process Users
      if (usersRes.status === "fulfilled" && usersRes.value.data?.success) {
        // ApiResponse structure: { success: true, data: { data: [...], pagination: { total: X } } }
        const payload = usersRes.value.data.data;
        totalUsers = payload?.pagination?.total || payload?.data?.length || 0;
        
        const usersList = payload?.data || [];
        if (Array.isArray(usersList)) {
          const recentUsers = usersList.slice(0, 3).map((u: any) => ({
            id: `user-${u.id}`,
            title: "New User Registered",
            description: `${u.fullName} joined the platform.`,
            time: formatTime(u.createdAt),
            type: "user",
            createdAt: new Date(u.createdAt).getTime()
          }));
          recentActivity.push(...recentUsers);
        }
      }

      // 2. Process Requests
      if (requestsRes.status === "fulfilled" && requestsRes.value.data?.success) {
        const payload = requestsRes.value.data.data;
        // The total active might require filtering if the API just returns total of all
        const requestsList = payload?.data || [];
        totalRequestsFound: {
          if (payload?.pagination?.total) {
            activeRequests = payload.pagination.total;
          } else if (Array.isArray(requestsList)) {
            activeRequests = requestsList.length;
          }
        }
        
        if (Array.isArray(requestsList)) {
          const recentReqs = requestsList.slice(0, 3).map((r: any) => ({
            id: `req-${r.id}`,
            title: "Service Request",
            description: `Request for Service #${r.serviceId} has been created.`,
            time: formatTime(r.createdAt),
            type: "request",
            createdAt: new Date(r.createdAt).getTime()
          }));
          recentActivity.push(...recentReqs);
        }
      }

      // 3. Process Services
      if (servicesRes.status === "fulfilled" && servicesRes.value.data?.success) {
        const payload = servicesRes.value.data.data;
        const servicesList = payload || [];
        if (Array.isArray(servicesList)) {
          totalServices = servicesList.length;
          const recentServs = servicesList.slice(0, 2).map((s: any) => ({
            id: `serv-${s.id}`,
            title: "Service Updated",
            description: `Service '${s.name}' was recently modified.`,
            time: formatTime(s.updatedAt || s.createdAt),
            type: "service",
            createdAt: new Date(s.updatedAt || s.createdAt).getTime()
          }));
          recentActivity.push(...recentServs);
        }
      }

      // Sort recent activity by date descending and take top 5
      recentActivity.sort((a, b) => b.createdAt - a.createdAt);

      return {
        totalUsers,
        activeRequests,
        totalServices,
        recentActivity: recentActivity.slice(0, 5),
      };

    } catch (error) {
      console.error("Failed to fetch dashboard stats", error);
      return { 
        totalUsers: 0, 
        activeRequests: 0, 
        totalServices: 0, 
        recentActivity: [] 
      };
    }
  },
};
