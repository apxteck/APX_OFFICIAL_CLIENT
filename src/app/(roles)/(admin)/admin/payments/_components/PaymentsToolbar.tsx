import React from 'react';
import { Search, Plus, List, LayoutGrid } from 'lucide-react';

interface Props {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  viewMode: 'table' | 'grid';
  setViewMode: (mode: 'table' | 'grid') => void;
  onOpenCreateLink: () => void;
}

export function PaymentsToolbar({
  searchTerm,
  setSearchTerm,
  viewMode,
  setViewMode,
  onOpenCreateLink,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      <div className="relative w-full sm:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search by ID, customer name, or service..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#161b22] border border-gray-800 rounded-md py-2 min-h-[44px] pl-9 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenCreateLink}
          className="flex items-center justify-center gap-2 px-4 min-h-[44px] bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm font-medium"
        >
          <Plus size={16} />
          Create Link
        </button>
        <div className="flex items-center bg-[#161b22] border border-gray-800 rounded-md p-1">
          <button
            onClick={() => setViewMode('table')}
            className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-sm transition-colors ${
              viewMode === 'table' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
            }`}
            title="Table View"
          >
            <List size={16} />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-sm transition-colors ${
              viewMode === 'grid' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
            }`}
            title="Card View"
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
