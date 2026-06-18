'use client';
import React from 'react';
import { Search, X, CornerDownLeft, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useGlobalSearchLogic } from './hooks/useGlobalSearchLogic';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const {
    query,
    setQuery,
    selectedIndex,
    setSelectedIndex,
    isSearching,
    combinedData,
    inputRef,
    listRef,
    router,
  } = useGlobalSearchLogic(isOpen, onClose);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-[9998]"
          />
          <div className="fixed inset-0 flex items-start justify-center pt-[10vh] sm:pt-[15vh] px-4 z-[9999] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full max-w-2xl bg-white dark:bg-[#111111] rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden pointer-events-auto flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center px-4 py-4 border-b border-gray-100 dark:border-white/10 relative">
                <Search className="w-5 h-5 text-gray-400 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Deep search anything... (Users, Blogs, Actions, Pages)"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  className="flex-1 bg-transparent border-none outline-none px-4 text-gray-900 dark:text-white placeholder:text-gray-400 text-lg"
                />
                {isSearching ? (
                  <Loader2 className="w-5 h-5 text-indigo-500 animate-spin mr-2" />
                ) : null}
                <button
                  onClick={onClose}
                  className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div
                ref={listRef}
                className="max-h-[60vh] overflow-y-auto custom-scrollbar p-2 flex-1"
              >
                {combinedData.length === 0 && !isSearching && query.length > 0 ? (
                  <div className="py-14 text-center px-4">
                    <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center mx-auto mb-4">
                      <Search className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-gray-900 dark:text-white font-medium mb-1">
                      No results found
                    </p>
                    <p className="text-gray-500 text-sm">
                      We deeply searched the database but couldn't find "{query}"
                    </p>
                  </div>
                ) : combinedData.length === 0 && !isSearching && query.length === 0 ? (
                  <div className="py-14 text-center px-4">
                    <p className="text-gray-500 text-sm">
                      Start typing to search across the entire platform...
                    </p>
                  </div>
                ) : (
                  combinedData.map((group, groupIndex) => (
                    <div key={group.category} className="mb-4 last:mb-0">
                      <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center justify-between">
                        {group.category}
                        {group.category.includes('Database') && (
                          <span className="text-[10px] bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 px-2 py-0.5 rounded-full">
                            Cloud
                          </span>
                        )}
                      </div>
                      <div className="space-y-1 mt-1">
                        {group.items.map((item, itemIndex) => {
                          const Icon = item.icon;
                          let globalIndex = itemIndex;
                          for (let i = 0; i < groupIndex; i++) {
                            globalIndex += combinedData[i].items.length;
                          }
                          const isSelected = selectedIndex === globalIndex;

                          return (
                            <button
                              key={item.id}
                              aria-selected={isSelected}
                              onMouseEnter={() => setSelectedIndex(globalIndex)}
                              onClick={() => {
                                if (item.href) {
                                  router.push(item.href);
                                  onClose();
                                }
                              }}
                              className={cn(
                                'w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-left',
                                isSelected
                                  ? 'bg-indigo-50 dark:bg-indigo-500/10'
                                  : 'hover:bg-gray-50 dark:hover:bg-white/5'
                              )}
                            >
                              <div
                                className={cn(
                                  'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors',
                                  isSelected
                                    ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400'
                                    : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400'
                                )}
                              >
                                <Icon size={16} />
                              </div>
                              <span
                                className={cn(
                                  'flex-1 text-sm font-medium transition-colors',
                                  isSelected
                                    ? 'text-indigo-700 dark:text-indigo-300'
                                    : 'text-gray-700 dark:text-gray-300'
                                )}
                              >
                                {item.name}
                              </span>
                              {isSelected && (
                                <CornerDownLeft size={14} className="text-indigo-500 opacity-60" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-gray-100 dark:border-white/10 p-3 bg-gray-50 dark:bg-[#161616] flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 rounded-md bg-white dark:bg-black border border-gray-200 dark:border-white/10 font-sans shadow-sm font-medium">
                      ↑
                    </kbd>
                    <kbd className="px-1.5 py-0.5 rounded-md bg-white dark:bg-black border border-gray-200 dark:border-white/10 font-sans shadow-sm font-medium">
                      ↓
                    </kbd>{' '}
                    to navigate
                  </span>
                  <span className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 rounded-md bg-white dark:bg-black border border-gray-200 dark:border-white/10 font-sans shadow-sm font-medium">
                      Enter
                    </kbd>{' '}
                    to select
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded-md bg-white dark:bg-black border border-gray-200 dark:border-white/10 font-sans shadow-sm font-medium">
                    Esc
                  </kbd>{' '}
                  to close
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
