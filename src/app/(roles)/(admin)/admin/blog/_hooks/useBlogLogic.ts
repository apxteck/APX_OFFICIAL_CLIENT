import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { blogService } from "@/services/admin/blog.service";
import { BlogPostStatus } from "@/app/types/admin-blog.types";
import { AdminBlogPost as BlogPost } from "@/app/types/admin-blog.types";

export function useBlogLogic() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await blogService.getPosts();
      setPosts(data || []);
    } catch (error) {
      toast.error("Failed to fetch posts");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDeleteClick = (id: string) => {
    setPostToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDeletePost = async () => {
    if (!postToDelete) return;
    setIsDeleting(true);
    try {
      await blogService.deletePost(postToDelete);
      toast.success("Post deleted successfully");
      setIsDeleteModalOpen(false);
      fetchPosts();
    } catch (error) {
      toast.error("Failed to delete post");
    } finally {
      setIsDeleting(false);
      setPostToDelete(null);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: BlogPostStatus) => {
    const toastId = toast.loading("Updating status...");
    try {
      await blogService.updatePostStatus(id, newStatus);
      toast.success(`Post is now ${newStatus}`, { id: toastId });
      fetchPosts();
    } catch (error) {
      toast.error("Failed to update post status", { id: toastId });
    }
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    posts,
    filteredPosts,
    isLoading,
    searchTerm,
    setSearchTerm,
    fetchPosts,
    handleDeleteClick,
    confirmDeletePost,
    handleUpdateStatus,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isDeleting,
  };
}
