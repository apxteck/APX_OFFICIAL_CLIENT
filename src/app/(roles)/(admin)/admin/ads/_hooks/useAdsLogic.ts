import { useState, useEffect, useCallback } from "react";
import { adsService } from "@/services/admin/ads.service";
import { Ad } from "@/app/types/ad.types";

export function useAdsLogic() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAds = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await adsService.getAds({ limit: 100 });
      setAds(data.data || []);
    } catch (error) {
      console.error("Failed to fetch ads", error);
      throw new Error("Failed to fetch ads");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this ad? This action cannot be undone.")) {
      try {
        await adsService.deleteAd(id);
        fetchAds();
        return true;
      } catch (error) {
        console.error("Failed to delete ad", error);
        throw new Error("Failed to delete ad");
      }
    }
    return false;
  };

  const handleToggleActive = async (id: number, currentStatus: boolean) => {
    try {
      await adsService.toggleAdActive(id);
      fetchAds();
      return !currentStatus;
    } catch (error) {
      console.error("Failed to update ad status", error);
      throw new Error("Failed to update ad status");
    }
  };

  const filteredAds = ads.filter(
    (ad) =>
      (ad.clientName && ad.clientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      ad.placement.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.adType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    ads,
    filteredAds,
    isLoading,
    searchTerm,
    setSearchTerm,
    fetchAds,
    handleDelete,
    handleToggleActive,
  };
}
