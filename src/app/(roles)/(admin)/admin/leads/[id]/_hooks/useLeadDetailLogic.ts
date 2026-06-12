import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { leadsService } from "@/services/admin/leads.service";
import { Lead, LeadStatus } from "@/app/types/lead.types";

export function useLeadDetailLogic(leadId: string) {
  const [lead, setLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLead = useCallback(async () => {
    if (leadId) {
      try {
        setIsLoading(true);
        const data = await leadsService.getLeadById(Number(leadId));
        setLead(data);
      } catch (error) {
        toast.error("Failed to fetch lead details");
      } finally {
        setIsLoading(false);
      }
    }
  }, [leadId]);

  useEffect(() => {
    fetchLead();
  }, [fetchLead]);

  const handleUpdateStatus = async (status: LeadStatus) => {
    if (!lead) return;
    const toastId = toast.loading("Updating status...");
    try {
      await leadsService.updateLeadStatus(lead.id, status);
      toast.success(`Status updated to ${status}`, { id: toastId });
      fetchLead(); // refresh data
    } catch (error: any) {
      toast.error(error.message || "Failed to update status", { id: toastId });
    }
  };

  return {
    lead,
    isLoading,
    handleUpdateStatus
  };
}
