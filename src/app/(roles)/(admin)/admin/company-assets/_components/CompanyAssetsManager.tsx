"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Plus, Search, Box, Edit2, Trash2, Share2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useCompanyAssetsLogic } from "../_hooks/useCompanyAssetsLogic";
import { useCompanyAssetFormLogic } from "../_hooks/useCompanyAssetFormLogic";
import { CompanyAsset } from "@/services/admin/companyAssets.service";

const CompanyAssetFormModal = dynamic(() => import("./CompanyAssetFormModal"), { ssr: false });

export function CompanyAssetsManager() {
  const {
    assets,
    filteredAssets,
    isLoading,
    searchTerm,
    setSearchTerm,
    fetchAssets,
    handleDelete,
  } = useCompanyAssetsLogic();

  const formLogic = useCompanyAssetFormLogic({
    onSuccess: () => {
      toast.success("Asset saved successfully");
      fetchAssets();
    }
  });

  const onDelete = async (id: number) => {
    try {
      await handleDelete(id);
      toast.success("Asset deleted successfully");
    } catch {
      toast.error("Failed to delete asset");
    }
  };

  const getStatusBadge = (status: string, daysRemaining?: number | null) => {
    // If it's active but expiring within 30 days, force "Expiring Soon" styling
    const isExpiringSoon = status === "EXPIRING_SOON" || (status === "ACTIVE" && daysRemaining !== undefined && daysRemaining !== null && daysRemaining <= 30 && daysRemaining > 0);
    const isExpired = status === "EXPIRED" || (status === "ACTIVE" && daysRemaining !== undefined && daysRemaining !== null && daysRemaining <= 0);

    if (isExpired) {
      return <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-red-500/10 text-red-500 rounded-full border border-red-500/20">Expired</span>;
    }
    
    if (isExpiringSoon) {
      return <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-500 rounded-full border border-orange-500/20 flex items-center gap-1">Expiring Soon</span>;
    }

    switch (status) {
      case "ACTIVE":
        return <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-[#39FF14]/10 text-[#39FF14] rounded-full border border-[#39FF14]/20">Active</span>;
      case "RENEWED":
        return <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-500 rounded-full border border-blue-500/20">Renewed</span>;
      case "CANCELLED":
        return <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-gray-500/10 text-gray-500 rounded-full border border-gray-500/20">Cancelled</span>;
      default:
        return null;
    }
  };

  const getProgress = (issuedDate?: string, expiryDate?: string) => {
    if (!expiryDate) return null;
    const end = new Date(expiryDate).getTime();
    const now = new Date().getTime();
    const start = issuedDate ? new Date(issuedDate).getTime() : end - (365 * 24 * 60 * 60 * 1000); // default to 1 year ago if no issue date
    
    const total = end - start;
    const elapsed = now - start;
    
    if (total <= 0) return { percentage: 100, daysRemaining: 0 };
    
    let percentage = (elapsed / total) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    
    const daysRemaining = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    
    return { percentage, daysRemaining };
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <Toaster position="bottom-right" />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Company Assets</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage physical and digital company resources</p>
        </div>
        <button
          onClick={formLogic.openCreateModal}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/30"
        >
          <Plus size={20} />
          <span>Add Asset</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-[#111111] rounded-3xl border border-gray-100 dark:border-white/5 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
        {/* Search */}
        <div className="p-4 border-b border-gray-100 dark:border-white/5">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search assets by title, provider..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-[#1A1A1A] border-none rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* List */}
        <div className="p-6 overflow-auto bg-gray-50 dark:bg-[#151515] min-h-[400px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : filteredAssets.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-500 dark:text-gray-400">
              <Box size={48} className="mb-4 opacity-20" />
              <p>No assets found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssets.map((asset: CompanyAsset) => {
                const progressData = getProgress(asset.issuedDate, asset.expiryDate);
                const isExpiringSoon = progressData && progressData.daysRemaining <= 30 && progressData.daysRemaining > 0;
                const isExpired = progressData && progressData.daysRemaining <= 0;

                return (
                <div key={asset.id} className={`bg-white dark:bg-[#1A1A1A] p-5 rounded-2xl border ${isExpiringSoon ? 'border-red-500/30 dark:border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-gray-100 dark:border-white/5'} shadow-sm hover:shadow-md transition-all group flex flex-col`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isExpiringSoon ? 'bg-red-50 dark:bg-red-500/10 text-red-500' : 'bg-indigo-50 dark:bg-white/5 text-indigo-600 dark:text-[#39FF14]'}`}>
                        <Box size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white truncate max-w-[150px]" title={asset.title}>
                          {asset.title}
                        </h3>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">{asset.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(asset.status, progressData?.daysRemaining)}
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1">
                    {asset.provider && (
                      <div className="flex justify-between">
                        <span>Provider:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{asset.provider}</span>
                      </div>
                    )}
                    {asset.renewalCost ? (
                      <div className="flex justify-between">
                        <span>Cost:</span>
                        <span className="font-medium text-gray-900 dark:text-white">${asset.renewalCost}</span>
                      </div>
                    ) : null}
                    {asset.expiryDate && (
                      <div className="flex justify-between">
                        <span>Expires:</span>
                        <span className={`font-medium ${isExpiringSoon || isExpired ? 'text-red-500 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                          {new Date(asset.expiryDate).toLocaleDateString()}
                          {isExpiringSoon && progressData && <span className="ml-2 text-xs opacity-80">({progressData.daysRemaining} days left)</span>}
                        </span>
                      </div>
                    )}
                  </div>

                  {progressData && (
                    <div className="mb-4">
                      <div className="h-1.5 w-full bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${isExpired ? 'bg-red-600' : isExpiringSoon ? 'bg-red-500' : 'bg-indigo-500 dark:bg-[#39FF14]'}`}
                          style={{ width: `${progressData.percentage}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end gap-1 pt-4 border-t border-gray-100 dark:border-white/5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        const text = `Asset: ${asset.title}\nProvider: ${asset.provider || 'N/A'}\nStatus: ${asset.status}\nExpires: ${asset.expiryDate ? new Date(asset.expiryDate).toLocaleDateString() : 'N/A'}`;
                        navigator.clipboard.writeText(text);
                        toast.success("Asset details copied");
                      }}
                      className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-white/5 rounded-lg transition-colors"
                      title="Copy Details"
                    >
                      <Share2 size={16} />
                    </button>
                    <button
                      onClick={() => formLogic.openEditModal(asset)}
                      className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-white/5 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(asset.id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )})}
            </div>
          )}
        </div>
      </div>

      {formLogic.isModalOpen && (
        <CompanyAssetFormModal 
          onClose={formLogic.closeModal} 
          formLogic={formLogic} 
        />
      )}
    </div>
  );
}
