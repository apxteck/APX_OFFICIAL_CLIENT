import React from "react";
import { FileText } from "lucide-react";
import { BlogCard } from "./BlogCard";
import { BlogPostStatus, AdminBlogPost as BlogPost } from "@/app/types/admin-blog.types";

interface BlogListProps {
  isLoading: boolean;
  posts: BlogPost[];
  searchTerm: string;
  onDeleteClick: (id: string) => void;
  onUpdateStatus: (id: string, newStatus: BlogPostStatus) => void;
}

export function BlogList({ isLoading, posts, searchTerm, onDeleteClick, onUpdateStatus }: BlogListProps) {
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-indigo-100 dark:border-indigo-500/20 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
        <div className="w-16 h-16 bg-white dark:bg-[#222] rounded-full flex items-center justify-center mb-4 border border-gray-100 dark:border-white/5">
          <FileText className="text-gray-400 dark:text-gray-500" size={32} />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No posts found</h3>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 max-w-md">
          We couldn't find any blog posts matching "{searchTerm}".
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {posts.map((post) => (
        <BlogCard
          key={post.id}
          post={post}
          onDeleteClick={onDeleteClick}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
}
