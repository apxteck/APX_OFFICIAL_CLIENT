"use client";

import React from "react";
import { FaqsHeader } from "./FaqsHeader";
import { FaqSearch } from "./FaqSearch";
import { FaqsList } from "./FaqsList";
import { FaqFormModal } from "./FaqFormModal";
import { useFaqsLogic } from "../_hooks/useFaqsLogic";

export function FaqsManager() {
  const {
    faqs,
    filteredFaqs,
    isLoading,
    searchTerm,
    setSearchTerm,
    fetchFaqs,
    handleDelete,
    handleToggleActive,
    isModalOpen,
    setIsModalOpen,
    editingFaq,
    openCreateModal,
    openEditModal
  } = useFaqsLogic();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <FaqsHeader onOpenCreate={openCreateModal} />

      <div className="bg-white dark:bg-[#111111] rounded-3xl border border-gray-100 dark:border-white/5 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
        <FaqSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <div className="overflow-auto bg-gray-50 dark:bg-[#151515] min-h-[400px]">
          <FaqsList 
            isLoading={isLoading}
            faqs={filteredFaqs}
            searchTerm={searchTerm}
            onEdit={openEditModal}
            onDelete={handleDelete}
            onToggleActive={handleToggleActive}
          />
        </div>
      </div>
      
      {isModalOpen && (
        <FaqFormModal 
          editingFaq={editingFaq}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchFaqs}
          nextSortOrder={faqs.length > 0 ? Math.max(...faqs.map(f => f.sortOrder)) + 1 : 0}
        />
      )}
    </div>
  );
}
