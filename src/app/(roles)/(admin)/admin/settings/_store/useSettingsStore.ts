import { create } from "zustand";
import { HeroBanner } from "@/app/types/home.types";

export type TabType = "account" | "hero" | "appearance" | "data" | "developer" | "system";
export type ToastState = { message: string; type: "success" | "error" | "loading" } | null;

interface SettingsState {
  activeTab: TabType;
  toast: ToastState;
  
  // Hero Banners specific state
  banners: HeroBanner[];
  isLoadingBanners: boolean;
  isBannerModalOpen: boolean;
  editingBanner: HeroBanner | null;
  bannerForm: {
    mediaType: "IMAGE" | "VIDEO";
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    sortOrder: number;
    isActive: boolean;
  };
  bannerFile: File | null;

  setActiveTab: (tab: TabType) => void;
  setToast: (toast: ToastState) => void;
  
  setBanners: (banners: HeroBanner[]) => void;
  setIsLoadingBanners: (isLoading: boolean) => void;
  setIsBannerModalOpen: (isOpen: boolean) => void;
  setEditingBanner: (banner: HeroBanner | null) => void;
  setBannerForm: (form: any) => void;
  setBannerFile: (file: File | null) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  activeTab: "account",
  toast: null,
  
  banners: [],
  isLoadingBanners: true,
  isBannerModalOpen: false,
  editingBanner: null,
  bannerForm: {
    mediaType: "IMAGE",
    title: "",
    subtitle: "",
    ctaText: "",
    ctaLink: "",
    sortOrder: 0,
    isActive: true,
  },
  bannerFile: null,

  setActiveTab: (activeTab) => set({ activeTab }),
  setToast: (toast) => set({ toast }),
  
  setBanners: (banners) => set({ banners }),
  setIsLoadingBanners: (isLoadingBanners) => set({ isLoadingBanners }),
  setIsBannerModalOpen: (isBannerModalOpen) => set({ isBannerModalOpen }),
  setEditingBanner: (editingBanner) => set({ editingBanner }),
  setBannerForm: (bannerForm) => set({ bannerForm }),
  setBannerFile: (bannerFile) => set({ bannerFile }),
}));
