import { useEffect, useMemo } from "react";
import { dashboardService } from "@/services/admin/dashboard.service";
import { useDashboardStore } from "../_store/useDashboardStore";
import { KPIData } from "@/services/admin/dashboardData";

export const useDashboardLogic = () => {
  const store = useDashboardStore();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await dashboardService.getAdminStats();
        store.setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        store.setIsLoading(false);
      }
    };
    
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const kpis = useMemo(() => {
    const s = store.stats;
    const customerKPIs: KPIData[] = s ? [
      { title: "Total Customers", value: s.customers.totalCustomers, trend: "up", percentage: 0 },
      { title: "New Requests (Today)", value: s.customers.newRequestsToday, trend: "up", percentage: 0 },
      { title: "Open Requests", value: s.customers.openRequests, trend: "neutral" },
      { title: "In Progress Requests", value: s.customers.inProgressRequests, trend: "up" },
      { title: "Completed (This Month)", value: s.customers.completedRequestsThisMonth, trend: "up" }
    ] : [];

    const revenueKPIs: KPIData[] = s ? [
      { title: "Pending Invoices", value: `₹${s.revenue.pendingInvoicesAmount.toLocaleString()}`, alert: s.revenue.pendingInvoicesAmount > 0 },
      { title: "Revenue This Month", value: `₹${s.revenue.revenueThisMonth.toLocaleString()}`, trend: "up" },
      { title: "Overdue Payments", value: s.revenue.overduePaymentsCount, alert: s.revenue.overduePaymentsCount > 0 },
      { title: "Total Revenue (Lifetime)", value: `₹${s.revenue.totalRevenueLifetime.toLocaleString()}`, trend: "up" }
    ] : [];

    const contentKPIs: KPIData[] = s ? [
      { title: "Blog Posts Published", value: s.content.blogPostsPublished, trend: "up" },
      { title: "Total Blog Likes", value: s.content.totalBlogLikes, trend: "up" }
    ] : [];

    const leadsKPIs: KPIData[] = s ? [
      { title: "New Leads (This Week)", value: s.leads.newLeadsThisWeek, trend: "up" },
      { title: "New Enquiries", value: s.leads.newEnquiries, alert: s.leads.newEnquiries > 0 },
      { title: "Open Tasks", value: s.leads.openTasks, trend: "neutral" },
      { title: "Pending Reimbursements", value: `₹${s.leads.pendingReimbursementsAmount.toLocaleString()}`, alert: s.leads.pendingReimbursementsAmount > 0 }
    ] : [];

    return { customerKPIs, revenueKPIs, contentKPIs, leadsKPIs };
  }, [store.stats]);

  return {
    ...store,
    ...kpis
  };
};
