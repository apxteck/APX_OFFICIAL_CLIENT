import React from 'react';
import { MonitorPlay } from 'lucide-react';
import { AdCard } from './AdCard';
import { Ad } from '@/app/types/ad.types';

interface AdsListProps {
  isLoading: boolean;
  ads: Ad[];
  onEdit: (ad: Ad) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number, isActive: boolean) => void;
}

export function AdsList({ isLoading, ads, onEdit, onDelete, onToggleStatus }: AdsListProps) {
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-pink-100 dark:border-pink-500/20 border-t-pink-600 dark:border-t-pink-400 rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Loading ads...</p>
        </div>
      </div>
    );
  }

  if (ads.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-white dark:bg-[#222] rounded-full flex items-center justify-center mb-4 border border-gray-100 dark:border-white/5">
          <MonitorPlay className="text-gray-400 dark:text-gray-500" size={32} />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No ads found</h3>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 max-w-md">
          We couldn't find any advertisements matching your criteria. Create a new one to get
          started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {ads.map((ad) => (
        <AdCard
          key={ad.id}
          ad={ad}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
}
