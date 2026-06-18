'use client';

import React from 'react';
import { Trash2, MessageSquare, AlertCircle, Check, X, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCommentsLogic } from '../_hooks/useCommentsLogic';
import { CommentRow } from './CommentRow';

export function CommentsManager({ initialComments = [] }: { initialComments: any[] }) {
  const {
    loading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    selectedIds,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    deletingId,
    moderatingId,
    isBulkProcessing,
    handleDelete,
    handleModerate,
    handleBulkAction,
    paginatedComments,
    totalFilteredPosts,
    totalPages,
    toggleSelectAll,
    toggleSelect,
  } = useCommentsLogic(initialComments);

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
          className={`w-[44px] h-[44px] min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl font-bold transition-all border text-[15px] ${
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
    <div className="space-y-6 w-full max-w-7xl mx-auto pb-safe pb-10 px-4 sm:px-6 md:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            Advanced Comments
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm font-medium">Manage user comments, approve, reject, or delete them in bulk.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl text-red-600 dark:text-red-400 flex items-center gap-2 font-medium">
          <AlertCircle className="w-5 h-5 shrink-0" />
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-[#111111] rounded-3xl border border-gray-100 dark:border-white/5 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
        
        {/* Search & Filter Bar */}
        <div className="p-6 border-b border-gray-100 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search comments by user, email, or content..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 min-h-[44px] outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-white text-sm font-medium transition-all"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-bold text-gray-600 dark:text-gray-300">Status:</span>
            </div>
            <select 
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="appearance-none bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold py-2.5 pl-4 pr-10 min-h-[44px] cursor-pointer"
            >
              <option value="ALL">All Comments</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedIds.length > 0 && (
          <div className="bg-indigo-50 dark:bg-indigo-500/10 border-b border-indigo-100 dark:border-indigo-500/20 p-4 flex items-center justify-between animate-in fade-in slide-in-from-top-4">
            <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">
              {selectedIds.length} comment(s) selected
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleBulkAction('APPROVED')}
                disabled={isBulkProcessing}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-colors min-h-[44px] disabled:opacity-50 flex items-center gap-2"
              >
                <Check className="w-4 h-4" /> Approve Selected
              </button>
              <button 
                onClick={() => handleBulkAction('REJECTED')}
                disabled={isBulkProcessing}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-colors min-h-[44px] disabled:opacity-50 flex items-center gap-2"
              >
                <X className="w-4 h-4" /> Reject Selected
              </button>
              <button 
                onClick={() => handleBulkAction('DELETE')}
                disabled={isBulkProcessing}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-bold transition-colors min-h-[44px] disabled:opacity-50 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" /> Delete Selected
              </button>
            </div>
          </div>
        )}

        <div className="overflow-auto min-h-[400px]">
          {loading ? (
            <div className="flex flex-col justify-center items-center h-64 gap-3">
              <div className="w-8 h-8 border-4 border-indigo-100 dark:border-indigo-500/20 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Loading comments...</p>
            </div>
          ) : paginatedComments.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-64 gap-4">
              <div className="w-16 h-16 bg-gray-50 dark:bg-[#151515] rounded-full flex items-center justify-center border border-gray-100 dark:border-white/5">
                <MessageSquare className="w-8 h-8 text-gray-400" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">No comments found</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">We couldn't find any comments matching your filters.</p>
              </div>
            </div>
          ) : (
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 dark:bg-[#151515] text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-white/5">
                <tr>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px] w-10">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.length === paginatedComments.length && paginatedComments.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-[#222] cursor-pointer"
                    />
                  </th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px]">User Info</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px]">Content</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px]">Status</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5 bg-white dark:bg-[#111111]">
                {paginatedComments.map((comment) => (
                  <CommentRow
                    key={comment.id}
                    comment={comment}
                    isSelected={selectedIds.includes(comment.id)}
                    toggleSelect={toggleSelect}
                    handleModerate={handleModerate}
                    handleDelete={handleDelete}
                    deletingId={deletingId}
                    moderatingId={moderatingId}
                    isBulkProcessing={isBulkProcessing}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination Controls */}
        {!loading && totalFilteredPosts > 0 && (
          <div className="flex flex-col xl:flex-row items-center justify-between border-t border-gray-100 dark:border-white/5 bg-white dark:bg-[#111111] p-6 gap-6">
            <div className="flex flex-wrap items-center gap-5">
              <div className="text-[15px] font-bold text-[#333] dark:text-gray-200">
                Results: {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalFilteredPosts)} of {totalFilteredPosts}
              </div>
              <div className="relative">
                <select 
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="appearance-none bg-[#f1f3f5] dark:bg-[#222] text-[#333] dark:text-gray-200 font-bold text-[14px] rounded-xl pl-4 pr-9 py-2.5 min-h-[44px] outline-none cursor-pointer border border-transparent dark:border-white/5 hover:bg-[#e9ecef] dark:hover:bg-[#2a2a2a] transition-colors"
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

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-[44px] h-[44px] min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#151515] text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>
              
              {renderPageNumbers()}

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-[44px] h-[44px] min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#151515] text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
