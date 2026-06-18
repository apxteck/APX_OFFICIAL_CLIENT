'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, FileText, Briefcase, HelpCircle, Newspaper, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  dashboardService,
  SearchResults,
  SearchResultItem,
} from '@/services/admin/dashboard.service';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults>({
    services: [],
    blogs: [],
    portfolios: [],
    faqs: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setResults({ services: [], blogs: [], portfolios: [], faqs: [] });
    } else {
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  // Inline debounce
  useEffect(() => {
    if (!query) {
      setResults({ services: [], blogs: [], portfolios: [], faqs: [] });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const delayDebounceFn = setTimeout(async () => {
      try {
        const data = await dashboardService.globalSearch(query);
        setResults(data || { services: [], blogs: [], portfolios: [], faqs: [] });
      } catch (error) {
        console.error('Search failed', error);
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSelect = (url: string) => {
    onOpenChange(false);
    router.push(url);
  };

  if (!open) return null;

  const hasResults =
    results.services.length > 0 ||
    results.blogs.length > 0 ||
    results.portfolios.length > 0 ||
    results.faqs.length > 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50 w-full max-w-2xl flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-background/95 shadow-2xl backdrop-blur-xl sm:w-[600px]">
        <div className="flex items-center border-b border-white/10 px-4">
          <Search className="mr-2 h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex h-14 w-full rounded-md bg-transparent py-3 text-lg outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Search services, insights, portfolio, FAQs..."
          />
          {isLoading && <Loader2 className="ml-2 h-5 w-5 animate-spin text-accent" />}
          <div className="ml-2 text-xs text-muted-foreground border border-white/20 px-2 py-1 rounded-md">
            ESC
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10">
          {!hasResults && (
            <div className="py-10 text-center text-sm text-muted-foreground">
              {isLoading
                ? 'Searching deeply...'
                : query
                  ? 'No results found.'
                  : 'Start typing to search...'}
            </div>
          )}

          {hasResults && (
            <>
              {results.services.length > 0 && (
                <div className="mb-2">
                  <div className="px-2 py-1 text-xs font-semibold text-accent uppercase tracking-wider">
                    Services
                  </div>
                  {results.services.map((item) => (
                    <div
                      key={`service-${item.id}`}
                      onClick={() => handleSelect(`/services/${item.slug}`)}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-white/5 transition-colors"
                    >
                      <Briefcase className="h-5 w-5 text-blue-400" />
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{item.name}</span>
                        {item.description && (
                          <span className="text-xs text-muted-foreground line-clamp-1">
                            {item.description}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {results.portfolios.length > 0 && (
                <div className="mb-2">
                  <div className="px-2 py-1 text-xs font-semibold text-accent uppercase tracking-wider mt-2">
                    Portfolio
                  </div>
                  {results.portfolios.map((item) => (
                    <div
                      key={`portfolio-${item.id}`}
                      onClick={() => handleSelect(`/portfolio/${item.slug}`)}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-white/5 transition-colors"
                    >
                      <Briefcase className="h-5 w-5 text-purple-400" />
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{item.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {item.clientName} • {item.serviceType}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {results.blogs.length > 0 && (
                <div className="mb-2">
                  <div className="px-2 py-1 text-xs font-semibold text-accent uppercase tracking-wider mt-2">
                    Insights & News
                  </div>
                  {results.blogs.map((item) => (
                    <div
                      key={`blog-${item.id}`}
                      onClick={() => handleSelect(`/insights-news/${item.slug}`)}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-white/5 transition-colors"
                    >
                      <Newspaper className="h-5 w-5 text-green-400" />
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{item.title}</span>
                        {item.excerpt && (
                          <span className="text-xs text-muted-foreground line-clamp-1">
                            {item.excerpt}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {results.faqs.length > 0 && (
                <div className="mb-2">
                  <div className="px-2 py-1 text-xs font-semibold text-accent uppercase tracking-wider mt-2">
                    FAQs
                  </div>
                  {results.faqs.map((item) => (
                    <div
                      key={`faq-${item.id}`}
                      onClick={() => handleSelect(`/faq`)}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-white/5 transition-colors"
                    >
                      <HelpCircle className="h-5 w-5 text-yellow-400" />
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{item.question}</span>
                        <span className="text-xs text-muted-foreground line-clamp-1">
                          {item.answer}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
