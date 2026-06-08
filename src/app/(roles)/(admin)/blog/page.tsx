"use client";

import React, { useEffect, useState } from "react";
import DataTable, { ColumnDef } from "@/components/ui/admin/DataTable";
import { blogService, BlogPost } from "@/services/admin/blog.service";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { MoreVertical, Edit3, Eye, Sparkles, CheckCircle, FileText, XCircle, Clock } from "lucide-react";

export default function BlogManagementPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    blogService.getPosts().then(data => {
      setPosts(data);
      setIsLoading(false);
    });
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.authorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: ColumnDef<BlogPost>[] = [
    {
      header: "Post Title",
      cell: (post) => (
        <div className="max-w-xs">
          <div className="flex items-center gap-2">
            <p className="font-bold text-gray-900 dark:text-white truncate" title={post.title}>{post.title}</p>
            {post.isAiGenerated && (
              <span className="shrink-0 flex items-center gap-1 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 px-1.5 py-0.5 rounded text-[10px] font-black tracking-widest uppercase border border-purple-100 dark:border-purple-500/20">
                <Sparkles size={10} /> AI
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">/{post.slug}</p>
        </div>
      )
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: (post) => <span className="font-medium text-gray-700 dark:text-gray-300">{post.category}</span>
    },
    {
      header: "Author",
      cell: (post) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-[10px]">
            {post.authorName.charAt(0)}
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{post.authorName}</span>
        </div>
      )
    },
    {
      header: "Status",
      cell: (post) => {
        const getStatusConfig = (status: string) => {
          switch(status) {
            case "PUBLISHED": return { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-100 dark:border-emerald-500/20", icon: CheckCircle };
            case "UPDATED": return { color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10", border: "border-blue-100 dark:border-blue-500/20", icon: CheckCircle };
            case "DRAFT": return { color: "text-gray-600 dark:text-gray-400", bg: "bg-gray-100 dark:bg-white/5", border: "border-gray-200 dark:border-white/10", icon: FileText };
            case "REVIEWED": return { color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", border: "border-amber-100 dark:border-amber-500/20", icon: Clock };
            case "REJECTED": return { color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10", border: "border-red-100 dark:border-red-500/20", icon: XCircle };
            default: return { color: "text-gray-600", bg: "bg-gray-50", border: "border-gray-200", icon: FileText };
          }
        };
        const config = getStatusConfig(post.status);
        const Icon = config.icon;

        return (
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg border ${config.bg} ${config.color} ${config.border}`}>
            <Icon size={14} />
            {post.status}
          </div>
        );
      }
    },
    {
      header: "Created",
      cell: (post) => (
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {format(new Date(post.createdAt), "MMM dd, yyyy")}
        </span>
      )
    },
    {
      header: "Actions",
      cell: (post) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => router.push(`/admin/blog/${post.id}`)}
            className="p-2 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
            title="Edit Post"
          >
            <Edit3 size={16} />
          </button>
          {post.status === "PUBLISHED" && (
            <button 
              className="p-2 rounded-lg text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors"
              title="View Live"
            >
              <Eye size={16} />
            </button>
          )}
          <button className="p-2 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
            <MoreVertical size={16} />
          </button>
        </div>
      )
    }
  ];

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-gray-200 dark:border-white/10 border-t-indigo-600 dark:border-t-indigo-500 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Blog Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">Manage articles, AI drafts, categories, and publications.</p>
        </div>
        <button 
          onClick={() => router.push('/admin/blog/new')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm flex items-center gap-2"
        >
          <Edit3 size={16} /> Write New Post
        </button>
      </div>

      <DataTable 
        data={filteredPosts}
        columns={columns}
        searchPlaceholder="Search posts by title or author..."
        onSearch={setSearchTerm}
      />
    </div>
  );
}
