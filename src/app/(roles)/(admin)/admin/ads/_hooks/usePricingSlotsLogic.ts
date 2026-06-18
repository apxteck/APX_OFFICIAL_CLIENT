import { useState, useEffect, useCallback } from "react";
import { adsService } from "@/services/admin/ads.service";
import { AdPricingSlot } from "@/app/types/ad.types";
import toast from "react-hot-toast";

export function usePricingSlotsLogic(initialSlots: AdPricingSlot[] = []) {
  const [slots, setSlots] = useState<AdPricingSlot[]>(initialSlots);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSlots(initialSlots);
  }, [initialSlots]);

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


  const createSlot = async (data: Partial<AdPricingSlot>) => {
    try {
      await adsService.createPricingSlot(data);
      toast.success("Pricing slot created successfully");
      fetchSlots();
      return true;
    } catch (error: any) {
      console.error("Failed to create pricing slot", error);
      toast.error(error?.response?.data?.message || "Failed to create pricing slot");
      return false;
    }
  };

  const updateSlot = async (id: number, data: Partial<AdPricingSlot>) => {
    try {
      await adsService.updatePricingSlot(id, data);
      toast.success("Pricing slot updated successfully");
      fetchSlots();
      return true;
    } catch (error: any) {
      console.error("Failed to update pricing slot", error);
      toast.error(error?.response?.data?.message || "Failed to update pricing slot");
      return false;
    }
  };

  const deleteSlot = async (id: number) => {
    try {
      await adsService.deletePricingSlot(id);
      toast.success("Pricing slot deleted successfully");
      fetchSlots();
      return true;
    } catch (error: any) {
      console.error("Failed to delete pricing slot", error);
      toast.error(error?.response?.data?.message || "Failed to delete pricing slot");
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
    createSlot,
    updateSlot,
    deleteSlot,
    handleToggleActive,
  };
}
