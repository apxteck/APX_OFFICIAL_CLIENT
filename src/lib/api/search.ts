import apiClient from './axios';

export interface SearchResultItem {
  id: number;
  slug?: string;
  title?: string; // used by blog and portfolio
  name?: string; // used by service
  question?: string; // used by faq
  excerpt?: string;
  description?: string;
  answer?: string;
  clientName?: string;
  serviceType?: string;
  coverImageUrl?: string;
  thumbnailUrl?: string;
}

export interface SearchResults {
  services: SearchResultItem[];
  blogs: SearchResultItem[];
  portfolios: SearchResultItem[];
  faqs: SearchResultItem[];
}

export const globalSearch = async (query: string): Promise<SearchResults> => {
  const response = await apiClient.get(`/search`, {
    params: { q: query },
  });
  return response.data?.data;
};
