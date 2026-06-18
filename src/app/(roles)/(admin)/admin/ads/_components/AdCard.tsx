import React from "react";
import { Code, Edit, Globe, Image as ImageIcon, Link as LinkIcon, Trash2 } from "lucide-react";
import { Ad } from "@/app/types/ad.types";

interface AdCardProps {
  ad: Ad;
  onEdit: (ad: Ad) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number, isActive: boolean) => void;
}

export function AdCard({ ad, onEdit, onDelete, onToggleStatus }: AdCardProps) {
  return (
    <div className="bg-white dark:bg-[#111111] rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all flex flex-col group relative overflow-hidden">
      {/* Status Toggle */}
      <button 
        onClick={() => onToggleStatus(ad.id, ad.isActive)}
        className="absolute top-4 right-4 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border border-gray-200 dark:border-white/10 shadow-sm bg-white dark:bg-[#151515]"
        title={`Toggle Status (Currently ${ad.isActive ? 'Active' : 'Inactive'})`}
      >
        <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${ad.isActive ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`}>
          <div className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform ${ad.isActive ? 'translate-x-4' : 'translate-x-0'}`}></div>
        </div>
      </button>

      {/* Ad Banner Preview */}
      <div className="h-40 w-full bg-gray-100 dark:bg-[#1a1a1a] border-b border-gray-100 dark:border-white/5 relative flex items-center justify-center overflow-hidden group-hover:opacity-95 transition-opacity">
        {ad.adType === 'CLIENT' && ad.bannerUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={ad.bannerUrl} alt={ad.clientName || 'Ad'} className="w-full h-full object-cover" />
        ) : ad.adType === 'GOOGLE' ? (
          <div className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500">
            <Code size={32} />
            <span className="text-xs font-bold uppercase tracking-widest">Google AdSense</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500">
            <ImageIcon size={32} />
            <span className="text-xs font-bold uppercase tracking-widest">No Banner</span>
          </div>
        )}
        
        {/* Badge */}
        <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md border border-white/10 text-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
          {ad.adType === 'CLIENT' ? <Globe size={12} className="text-pink-500"/> : <Code size={12} className="text-indigo-500" />}
          {ad.adType}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-gray-900 dark:text-white text-lg tracking-tight mb-1">
          {ad.clientName || 'Google AdSense Campaign'}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4 font-mono">
          <span className="bg-gray-100 dark:bg-[#222] px-2 py-0.5 rounded">
            {ad.placement}
          </span>
        </div>

        {ad.targetUrl && (
          <a href={ad.targetUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-4 hover:underline break-all">
            <LinkIcon size={14} className="shrink-0" />
            <span className="line-clamp-1">{ad.targetUrl}</span>
          </a>
        )}

        <div className="mt-auto flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-white/5">
          <button 
            onClick={() => onEdit(ad)}
            className="flex-1 min-h-[44px] bg-gray-50 hover:bg-indigo-50 dark:bg-white/5 dark:hover:bg-indigo-500/10 text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 px-4 py-2 rounded-xl font-bold text-xs transition-colors border border-gray-200 dark:border-white/10 hover:border-indigo-200 dark:hover:border-indigo-500/30 flex items-center justify-center gap-2"
          >
            <Edit size={14} />
            Edit
          </button>
          <button 
            onClick={() => onDelete(ad.id)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-500/10 rounded-xl transition-colors border border-gray-200 dark:border-white/10 hover:border-red-200 dark:hover:border-red-500/30 bg-gray-50 dark:bg-white/5"
            title="Delete Ad"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
