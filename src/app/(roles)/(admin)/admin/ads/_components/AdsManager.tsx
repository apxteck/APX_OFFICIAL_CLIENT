"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { AdsHeader } from "./AdsHeader";
import { AdsSearch } from "./AdsSearch";
import { AdsList } from "./AdsList";
import { AdsToast, ToastType } from "./AdsToast";
import { useAdsLogic } from "../_hooks/useAdsLogic";
import { useAdFormLogic } from "../_hooks/useAdFormLogic";
import { Ad } from "@/app/types/ad.types";

// Lazy load the modal since it's heavy and not immediately needed
const AdFormModal = dynamic(() => import("./AdFormModal"), {
  ssr: false,
});

export function AdsManager({ initialAds = [] }: { initialAds?: Ad[] }) {
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  
  const {
    ads,
    filteredAds,
    isLoading,
    searchTerm,
    setSearchTerm,
    fetchAds,
    handleDelete,
    handleToggleActive,
  } = useAdsLogic(initialAds);

  const formLogic = useAdFormLogic({
    onSuccess: () => {
      setToast({ message: "Ad saved successfully", type: "success" });
      fetchAds();
    }
  });

  const onDelete = async (id: number) => {
    try {
      setToast({ message: "Deleting ad...", type: "loading" });
      const success = await handleDelete(id);
      if (success) {
        setToast({ message: "Ad deleted successfully", type: "success" });
      } else {
        setToast(null); // Cancelled
      }
    } catch {
      setToast({ message: "Failed to delete ad", type: "error" });
    }
  };

  const onToggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      setToast({ message: "Updating status...", type: "loading" });
      const newStatus = await handleToggleActive(id, currentStatus);
      setToast({ message: `Ad is now ${newStatus ? 'Active' : 'Inactive'}`, type: "success" });
    } catch {
      setToast({ message: "Failed to update ad status", type: "error" });
    }
  };

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto pb-safe pb-10 px-4 sm:px-6 md:px-8">
      <AdsHeader onCreateClick={formLogic.openCreateModal} />

      <div className="bg-white dark:bg-[#111111] rounded-3xl border border-gray-100 dark:border-white/5 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
        <AdsSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <div className="p-6 overflow-auto bg-gray-50 dark:bg-[#151515] min-h-[400px]">
          <AdsList 
            isLoading={isLoading}
            ads={filteredAds}
            onEdit={formLogic.openEditModal}
            onDelete={onDelete}
            onToggleStatus={onToggleStatus}
          />
        </div>
      </div>

      {toast && (
        <AdsToast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      {formLogic.isModalOpen && (
        <AdFormModal 
          onClose={formLogic.closeModal} 
          formLogic={formLogic} 
        />
      )}
    </div>
  );
}
