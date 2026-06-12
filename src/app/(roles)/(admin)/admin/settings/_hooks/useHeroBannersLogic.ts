import { useEffect } from "react";
import { useSettingsStore } from "../_store/useSettingsStore";
import { heroBannersService } from "@/services/admin/heroBanners.service";
import { HeroBanner } from "@/app/types/home.types";

export const useHeroBannersLogic = () => {
  const store = useSettingsStore();

  const fetchBanners = async () => {
    try {
      store.setIsLoadingBanners(true);
      const res = await heroBannersService.getBanners();
      store.setBanners(res.data || []);
    } catch (error) {
      store.setToast({ message: "Failed to load banners", type: "error" });
    } finally {
      store.setIsLoadingBanners(false);
    }
  };

  useEffect(() => { fetchBanners(); }, []);

  const openCreateModal = () => {
    store.setEditingBanner(null); 
    store.setBannerForm({
      mediaType: "IMAGE", title: "", subtitle: "", ctaText: "", ctaLink: "", 
      sortOrder: store.banners.length > 0 ? Math.max(...store.banners.map(b => b.sortOrder)) + 1 : 0, 
      isActive: true
    });
    store.setBannerFile(null); 
    store.setIsBannerModalOpen(true);
  };

  const openEditModal = (banner: HeroBanner) => {
    store.setEditingBanner(banner); 
    store.setBannerForm({
      mediaType: banner.mediaType || "IMAGE", title: banner.title || "", subtitle: banner.subtitle || "", 
      ctaText: banner.ctaText || "", ctaLink: banner.ctaLink || "", sortOrder: banner.sortOrder || 0, 
      isActive: banner.isActive
    });
    store.setBannerFile(null); 
    store.setIsBannerModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      store.setToast({ message: store.editingBanner ? "Updating banner..." : "Creating banner...", type: "loading" });
      const formData = new FormData();
      formData.append("mediaType", store.bannerForm.mediaType);
      if (store.bannerForm.title) formData.append("title", store.bannerForm.title);
      if (store.bannerForm.subtitle) formData.append("subtitle", store.bannerForm.subtitle);
      if (store.bannerForm.ctaText) formData.append("ctaText", store.bannerForm.ctaText);
      if (store.bannerForm.ctaLink) formData.append("ctaLink", store.bannerForm.ctaLink);
      formData.append("sortOrder", store.bannerForm.sortOrder.toString());
      formData.append("isActive", store.bannerForm.isActive.toString());
      if (store.bannerFile) formData.append("media", store.bannerFile);

      if (store.editingBanner) await heroBannersService.updateBanner(store.editingBanner.id, formData);
      else await heroBannersService.createBanner(formData);
      
      store.setToast({ message: "Banner saved successfully", type: "success" });
      store.setIsBannerModalOpen(false); 
      fetchBanners();
    } catch (error: any) {
      store.setToast({ message: error.response?.data?.message || "Operation failed", type: "error" });
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Delete this banner permanently?")) {
      try {
        store.setToast({ message: "Deleting...", type: "loading" });
        await heroBannersService.deleteBanner(id);
        store.setToast({ message: "Banner deleted", type: "success" });
        fetchBanners();
      } catch (error) { store.setToast({ message: "Failed to delete", type: "error" }); }
    }
  };

  const handleToggleActive = async (id: number) => {
    try {
      store.setToast({ message: "Updating status...", type: "loading" });
      await heroBannersService.toggleBannerActive(id);
      store.setToast({ message: "Status updated", type: "success" });
      fetchBanners();
    } catch (error) { store.setToast({ message: "Failed to update status", type: "error" }); }
  };

  return {
    ...store,
    fetchBanners,
    openCreateModal,
    openEditModal,
    handleSubmit,
    handleDelete,
    handleToggleActive
  };
};
