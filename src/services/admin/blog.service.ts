export type BlogPostStatus = "DRAFT" | "REVIEWED" | "PUBLISHED" | "REJECTED" | "UPDATED";

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  status: BlogPostStatus;
  category: string;
  authorName: string;
  isAiGenerated: boolean;
  publishedAt?: string;
  createdAt: string;
}

export interface BlogPostDetail extends BlogPost {
  excerpt: string;
  content: string;
  coverImageUrl?: string;
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
  aiMetadata?: {
    source: string;
    origin: string;
    runDate: string;
  };
}

const mockPosts: BlogPost[] = [
  { id: "POST-001", title: "10 Web Design Trends for 2024", slug: "web-design-trends-2024", status: "PUBLISHED", category: "Design", authorName: "Ganesh Sharma", isAiGenerated: false, publishedAt: "2024-03-01T10:00:00Z", createdAt: "2024-02-28T14:30:00Z" },
  { id: "POST-002", title: "How AI is Reshaping Tech Startups in India", slug: "ai-tech-startups-india", status: "DRAFT", category: "Technology", authorName: "APX Bot", isAiGenerated: true, createdAt: "2024-03-14T14:00:00Z" },
  { id: "POST-003", title: "Maximizing SEO ROI for E-commerce", slug: "seo-roi-ecommerce", status: "REVIEWED", category: "Marketing", authorName: "Priya Singh", isAiGenerated: false, createdAt: "2024-03-12T09:15:00Z" },
  { id: "POST-004", title: "React vs Next.js: Which should you choose?", slug: "react-vs-nextjs", status: "UPDATED", category: "Engineering", authorName: "Amit Patel", isAiGenerated: false, publishedAt: "2024-01-15T11:00:00Z", createdAt: "2024-01-10T16:20:00Z" },
  { id: "POST-005", title: "Top 5 Cloud Providers for Indian MSMEs", slug: "cloud-providers-msme", status: "REJECTED", category: "Business", authorName: "APX Bot", isAiGenerated: true, createdAt: "2024-03-13T09:00:00Z" }
];

export const blogService = {
  getPosts: async (): Promise<BlogPost[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockPosts;
  },

  getPostDetail: async (id: string): Promise<BlogPostDetail | null> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const basePost = mockPosts.find(p => p.id === id) || mockPosts[1]; // Default to the AI post if not found
    
    return {
      ...basePost,
      excerpt: basePost.isAiGenerated 
        ? "Artificial Intelligence is completely altering the landscape of the Indian startup ecosystem. In this deep dive, we explore exactly how founders are leveraging Gemini and ChatGPT to hyper-scale."
        : "Discover the latest trends in UI/UX design that are set to dominate the web in 2024. From glassmorphism to AI-driven interfaces.",
      content: basePost.isAiGenerated 
        ? "<h2>The AI Revolution in India</h2><p>Startups across Bengaluru, Pune, and NCR are rapidly adopting LLMs to automate customer support, generate marketing copy, and even write boilerplate code.</p><p>According to recent reports, over 40% of newly funded startups have integrated some form of generative AI into their core product offering.</p>"
        : "<h2>1. The Return of Glassmorphism</h2><p>What started as a macOS aesthetic has fully permeated the web. Glassmorphism involves semi-transparent backgrounds with background-blur effects...</p>",
      coverImageUrl: "https://placehold.co/800x400?text=Blog+Cover",
      tags: basePost.isAiGenerated ? ["AI", "Startups", "India", "Gemini"] : ["Design", "UI/UX", "Trends"],
      metaTitle: basePost.title + " | APXTeck Insights",
      metaDescription: "An in-depth analysis brought to you by APXTeck.",
      aiMetadata: basePost.isAiGenerated ? {
        source: "google_trends|gnews",
        origin: "gemini-1.5-pro",
        runDate: basePost.createdAt
      } : undefined
    };
  }
};
