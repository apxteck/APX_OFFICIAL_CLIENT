import React from "react";
import { Edit3, LayoutGrid } from "lucide-react";
import { useRouter } from "next/navigation";

export function BlogHeader() {
  const router = useRouter();
  
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
            <LayoutGrid size={24} className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          Blog Management
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-2">
          Manage articles, AI drafts, categories, and publications.
        </p>
      </div>
      <button 
        onClick={() => router.push('/admin/blog/new')}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 min-h-[44px] rounded-xl font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2 shrink-0 w-full md:w-auto"
      >
        <Edit3 size={18} />
        Write New Post
      </button>
    </div>
  );
}
