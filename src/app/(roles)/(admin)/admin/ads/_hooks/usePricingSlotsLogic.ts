import { useState, useEffect, useCallback } from "react";
import { adsService } from "@/services/admin/ads.service";
import { AdPricingSlot } from "@/app/types/ad.types";
import toast from "react-hot-toast";

export function usePricingSlotsLogic() {
  const [slots, setSlots] = useState<AdPricingSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSlots = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await adsService.getPricingSlots();
      setSlots(data || []);
    } catch (error) {
      console.error("Failed to fetch pricing slots", error);
      toast.error("Failed to fetch pricing slots");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  const updateSlot = async (id: number, data: Partial<AdPricingSlot>) => {
    try {
      await adsService.updatePricingSlot(id, data);
      toast.success("Pricing slot updated successfully");
      fetchSlots();
      return true;
    } catch (error) {
      console.error("Failed to update pricing slot", error);
      toast.error("Failed to update pricing slot");
      return false;
    }
  };

  const handleToggleActive = async (id: number, currentStatus: boolean) => {
    try {
      await adsService.updatePricingSlot(id, { isActive: !currentStatus });
      toast.success(`Slot ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
      fetchSlots();
      return !currentStatus;
    } catch (error) {
      console.error("Failed to update slot status", error);
      toast.error("Failed to toggle slot status");
      throw new Error("Failed to update slot status");
    }
  };

  return {
    slots,
    isLoading,
    fetchSlots,
    updateSlot,
    handleToggleActive,
  };
}
