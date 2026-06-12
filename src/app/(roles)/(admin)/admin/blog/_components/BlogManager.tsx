"use client";

import React from "react";
import ConfirmModal from "@/components/ui/admin/ConfirmModal";
import { BlogHeader } from "./BlogHeader";
import { BlogSearch } from "./BlogSearch";
import { BlogList } from "./BlogList";
import { useBlogLogic } from "../_hooks/useBlogLogic";

export function BlogManager() {
  const {
    filteredPosts,
    isLoading,
    searchTerm,
    setSearchTerm,
    handleDeleteClick,
    confirmDeletePost,
    handleUpdateStatus,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isDeleting,
  } = useBlogLogic();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <BlogHeader />

      <div className="bg-white dark:bg-[#111111] rounded-3xl border border-gray-100 dark:border-white/5 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
        <BlogSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <div className="overflow-auto bg-gray-50 dark:bg-[#151515] min-h-[400px]">
          <BlogList 
            isLoading={isLoading}
            posts={filteredPosts}
            searchTerm={searchTerm}
            onDeleteClick={handleDeleteClick}
            onUpdateStatus={handleUpdateStatus}
          />
        </div>
      </div>
      
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
        onConfirm={confirmDeletePost}
        title="Delete Post"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
        confirmText="Delete Post"
        isLoading={isDeleting}
      />
    </div>
  );
}
