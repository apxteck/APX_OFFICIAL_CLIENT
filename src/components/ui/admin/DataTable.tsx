"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal, ListFilter, ArrowUpDown, Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SortOption {
  label: string;
  value: string;
}

export interface ColumnDef<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  searchPlaceholder?: string;
  onSearch?: (term: string) => void;
  onFilter?: () => void;
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
  sortOptions?: SortOption[];
  currentSort?: string;
  onSortChange?: (value: string) => void;
}

export default function DataTable<T extends { id: string | number }>({
  data,
  columns,
  searchPlaceholder = "Search...",
  onSearch,
  onFilter,
  onRowClick,
  isLoading = false,
  sortOptions,
  currentSort,
  onSortChange,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage, '...', totalPages);
      }
    }

    return pages.map((page, idx) => {
      if (page === '...') {
        return <span key={`ellipsis-${idx}`} className="w-10 h-10 flex items-center justify-center text-gray-700 dark:text-gray-400 font-bold text-lg tracking-widest pb-2">...</span>;
      }
      return (
        <button
          key={`page-${page}`}
          onClick={() => setCurrentPage(page as number)}
          className={`w-[42px] h-[42px] flex items-center justify-center rounded-xl font-bold transition-all border text-[15px] ${
            currentPage === page
              ? 'bg-[#3b82f6] border-[#3b82f6] text-white shadow-sm'
              : 'bg-white dark:bg-[#151515] border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5'
          }`}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <div className="bg-white dark:bg-[#111111] rounded-3xl border border-gray-100 dark:border-white/5 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0px_4px_30px_rgba(0,0,0,0.2)] overflow-hidden transition-colors duration-300">
      {/* Table Toolbar */}
      <div className="p-6 border-b border-gray-100 dark:border-white/5 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-[#111111]">
        {onSearch ? (
          <div className="relative w-full sm:max-w-xs group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400 dark:text-gray-500 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-xl text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 dark:text-white"
              placeholder={searchPlaceholder}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        ) : (
          <div className="flex-1" />
        )}
        
        <div className="flex gap-3 w-full sm:w-auto">
          {onFilter && (
            <button 
              onClick={onFilter}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-all shadow-sm"
            >
              <ListFilter size={16} />
              Filter
            </button>
          )}
          {sortOptions ? (
            <div className="relative" ref={sortRef}>
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-all shadow-sm"
              >
                <ArrowUpDown size={16} />
                Sort
                <ChevronDown size={14} className={cn("transition-transform", isSortOpen && "rotate-180")} />
              </button>
              
              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-white/5 overflow-hidden z-50"
                  >
                    <div className="py-2">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            onSortChange?.(option.value);
                            setIsSortOpen(false);
                          }}
                          className="w-full flex items-center justify-between px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                        >
                          {option.label}
                          {currentSort === option.value && <Check size={16} className="text-indigo-600 dark:text-indigo-400" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-all shadow-sm">
              <SlidersHorizontal size={16} />
              View
            </button>
          )}
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-[#151515] border-b border-gray-100 dark:border-white/5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {columns.map((col, index) => (
                <th key={index} className={cn("px-6 py-4 whitespace-nowrap", col.className)}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-white/5 bg-white dark:bg-[#111111]">
            <AnimatePresence>
              {paginatedData.map((item, rowIndex) => (
                <motion.tr
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: rowIndex * 0.05 }}
                  key={item.id}
                  onClick={() => onRowClick?.(item)}
                  className={cn(
                    "hover:bg-indigo-50/50 dark:hover:bg-indigo-500/5 transition-colors duration-200 group",
                    onRowClick && "cursor-pointer"
                  )}
                >
                  {columns.map((col, colIndex) => (
                    <td 
                      key={colIndex} 
                      className={cn(
                        "px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors",
                        col.className
                      )}
                    >
                      {col.cell 
                        ? col.cell(item) 
                        : col.accessorKey 
                          ? String(item[col.accessorKey]) 
                          : null}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  <div className="flex justify-center items-center gap-3">
                    <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">Loading data...</span>
                  </div>
                </td>
              </tr>
            )}

            {!isLoading && paginatedData.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400 text-sm">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {!isLoading && data.length > 0 && (
        <div className="flex flex-col xl:flex-row items-center justify-between border-t border-gray-100 dark:border-white/5 bg-white dark:bg-[#111111] p-6 gap-6">
          
          {/* Left side: Results text & dropdown */}
          <div className="flex flex-wrap items-center gap-5">
            <div className="text-[15px] font-bold text-[#333] dark:text-gray-200">
              Results: {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, data.length)} of {data.length}
            </div>
            <div className="relative">
              <select 
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="appearance-none bg-[#f1f3f5] dark:bg-[#222] text-[#333] dark:text-gray-200 font-bold text-[14px] rounded-xl pl-4 pr-9 py-2.5 outline-none cursor-pointer border border-transparent dark:border-white/5 hover:bg-[#e9ecef] dark:hover:bg-[#2a2a2a] transition-colors"
              >
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-700 dark:text-gray-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>

          {/* Right side: Pagination Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-[42px] h-[42px] flex items-center justify-center rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#151515] text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
            
            {renderPageNumbers()}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-[42px] h-[42px] flex items-center justify-center rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#151515] text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>
          
        </div>
      )}
    </div>
  );
}
