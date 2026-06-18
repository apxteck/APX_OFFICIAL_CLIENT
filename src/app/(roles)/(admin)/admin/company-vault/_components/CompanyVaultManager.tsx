'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Plus, Search, Archive } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useCompanyVaultLogic } from '../_hooks/useCompanyVaultLogic';
import { useCompanyVaultFormLogic } from '../_hooks/useCompanyVaultFormLogic';
import { CompanyVaultDocument } from '@/services/admin/companyVault.service';
import { CompanyVaultCard } from './CompanyVaultCard';

const CompanyVaultFormModal = dynamic(() => import('./CompanyVaultFormModal'), { ssr: false });

export function CompanyVaultManager({
  initialDocuments = [],
}: {
  initialDocuments?: CompanyVaultDocument[];
}) {
  const { filteredDocuments, isLoading, searchTerm, setSearchTerm, fetchDocuments, handleDelete } =
    useCompanyVaultLogic(initialDocuments);

  const formLogic = useCompanyVaultFormLogic({
    onSuccess: () => {
      toast.success('Document saved successfully');
      fetchDocuments();
    },
  });

  const onDelete = async (id: number) => {
    try {
      await handleDelete(id);
      toast.success('Document deleted successfully');
    } catch {
      toast.error('Failed to delete document');
    }
  };

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto pb-safe pb-10 px-4 sm:px-6 md:px-8">
      <Toaster position="bottom-right" />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Company Vault</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Secure repository for critical company documents
          </p>
        </div>
        <button
          onClick={formLogic.openCreateModal}
          className="flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/30 w-full md:w-auto"
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
              className="w-full pl-12 pr-4 py-3 min-h-[44px] bg-gray-50 dark:bg-[#1A1A1A] border-none rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-gray-500"
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
                <CompanyVaultCard
                  key={doc.id}
                  doc={doc}
                  onEdit={(doc) => formLogic.openEditModal(doc)}
                  onDelete={onDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {formLogic.isModalOpen && (
        <CompanyVaultFormModal onClose={formLogic.closeModal} formLogic={formLogic} />
      )}
    </div>
  );
}
