export type BlogPostStatus = "DRAFT" | "REVIEWED" | "PUBLISHED" | "REJECTED" | "UPDATED" | "REVIWED";

export interface BlogCategory {
  id: string | number;
  name: string;
  slug: string;
}

export interface AdminBlogPost {
  id: string | number;
  title: string;
  slug: string;
  status: BlogPostStatus;
  category: any;
  authorName: string;
  authorProfilePhoto?: string | null;
  author?: any;
  isAiGenerated: boolean;
  publishedAt?: string;
  createdAt: string;
  views?: number;
  tags?: string[];
  _count?: { likes: number; comments: number };
}

export interface AdminBlogPostDetail extends AdminBlogPost {
  excerpt: string;
  content: string;
  coverImageUrl?: string;
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
  authorDesignation?: string;
  authorBio?: string;
  categoryId?: number;
  aiMetadata?: {
    source: string;
    origin: string;
    runDate: string;
  };
}
