"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Plus, Search, Archive, Edit2, Trash2, Download, FileText, Image as ImageIcon, Eye, Share2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useCompanyVaultLogic } from "../_hooks/useCompanyVaultLogic";
import { useCompanyVaultFormLogic } from "../_hooks/useCompanyVaultFormLogic";
import { CompanyVaultDocument } from "@/services/admin/companyVault.service";

const CompanyVaultFormModal = dynamic(() => import("./CompanyVaultFormModal"), { ssr: false });

export function CompanyVaultManager() {
  const {
    documents,
    filteredDocuments,
    isLoading,
    searchTerm,
    setSearchTerm,
    fetchDocuments,
    handleDelete,
  } = useCompanyVaultLogic();

  const formLogic = useCompanyVaultFormLogic({
    onSuccess: () => {
      toast.success("Document saved successfully");
      fetchDocuments();
    }
  });

  const onDelete = async (id: number) => {
    try {
      await handleDelete(id);
      toast.success("Document deleted successfully");
    } catch {
      toast.error("Failed to delete document");
    }
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes("image")) return <ImageIcon size={20} className="text-blue-500" />;
    if (mimeType.includes("pdf")) return <FileText size={20} className="text-red-500" />;
    return <FileText size={20} className="text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <Toaster position="bottom-right" />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Company Vault</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Secure repository for critical company documents</p>
        </div>
        <button
          onClick={formLogic.openCreateModal}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/30"
        >
          <Plus size={20} />
          <span>Upload Document</span>
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
              placeholder="Search by key, filename..."
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
          ) : filteredDocuments.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-500 dark:text-gray-400">
              <Archive size={48} className="mb-4 opacity-20" />
              <p>No documents in the vault yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((doc: CompanyVaultDocument) => (
                <div key={doc.id} className="bg-white dark:bg-[#1A1A1A] p-5 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                  <div className="flex justify-between items-start mb-4 w-full">
                    <div className="flex items-center gap-3 w-full">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-[#222222] flex items-center justify-center shrink-0">
                        {getFileIcon(doc.fileType)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 dark:text-white truncate" title={doc.fileName}>
                          {doc.fileName}
                        </h3>
                        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-mono tracking-wider truncate">
                          {doc.key}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 flex-1 mb-4">
                    {doc.description && (
                      <p className="line-clamp-2 text-sm">{doc.description}</p>
                    )}
                    <div className="flex justify-between pt-2 mt-2 border-t border-gray-50 dark:border-white/5">
                      <span className="text-xs">{formatFileSize(doc.fileSize)}</span>
                      <span className="text-xs">{new Date(doc.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-white/5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      <Eye size={16} />
                      View
                    </a>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(doc.fileUrl);
                          toast.success("Link copied to clipboard");
                        }}
                        className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-white/5 rounded-lg transition-colors"
                        title="Share / Copy Link"
                      >
                        <Share2 size={16} />
                      </button>
                      <a
                        href={doc.fileUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-white/5 rounded-lg transition-colors"
                        title="Download"
                      >
                        <Download size={16} />
                      </a>
                      <button
                        onClick={() => formLogic.openEditModal(doc)}
                        className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-white/5 rounded-lg transition-colors"
                        title="Edit Details"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(doc.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {formLogic.isModalOpen && (
        <CompanyVaultFormModal 
          onClose={formLogic.closeModal} 
          formLogic={formLogic} 
        />
      )}
    </div>
  );
}
