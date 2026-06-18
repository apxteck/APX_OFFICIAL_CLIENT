'use client';

import React from 'react';
import { activityFeed } from '@/services/admin/dashboardData';
import {
  Activity,
  Headset,
  CreditCard,
  TrendingUp,
  HelpCircle,
  FileText,
  CheckCircle,
  UserPlus,
  Receipt,
  Monitor,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const IconMap: Record<string, React.ElementType> = {
  Headset,
  CreditCard,
  TrendingUp,
  HelpCircle,
  FileText,
  CheckCircle,
  UserPlus,
  Receipt,
  Monitor,
};

const ColorMap: Record<string, string> = {
  blue: 'bg-blue-100/80 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200/50 dark:border-blue-500/30',
  green:
    'bg-emerald-100/80 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-500/30',
  purple:
    'bg-purple-100/80 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 border-purple-200/50 dark:border-purple-500/30',
  orange:
    'bg-orange-100/80 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 border-orange-200/50 dark:border-orange-500/30',
  indigo:
    'bg-indigo-100/80 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 border-indigo-200/50 dark:border-indigo-500/30',
  pink: 'bg-pink-100/80 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400 border-pink-200/50 dark:border-pink-500/30',
  yellow:
    'bg-yellow-100/80 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400 border-yellow-200/50 dark:border-yellow-500/30',
};

export default function ActivityFeed({ data }: { data?: any[] }) {
  const feedData = data?.length ? data : activityFeed;

  const formatRelativeTime = (dateString: string) => {
    if (!dateString) return 'Just now';
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((new Date().getTime() - date.getTime()) / 60000);
    if (diffInMinutes < 60) return `${diffInMinutes || 1} mins ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  return (
    <div className="bg-white/80 dark:bg-[#111111]/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-gray-100/80 dark:border-white/10 flex flex-col min-h-[400px] transition-all duration-300 group hover:shadow-xl hover:border-indigo-100 dark:hover:border-indigo-500/30">
      <div className="p-6 border-b border-gray-100/80 dark:border-white/10 flex items-center justify-between">
        <h2 className="font-extrabold text-gray-900 dark:text-white text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          Recent Activity
        </h2>
        <div className="w-8 h-8 rounded-full bg-indigo-600 dark:bg-indigo-500/20 text-white dark:text-indigo-400 text-sm font-extrabold flex items-center justify-center shadow-sm">
          {feedData.length}
        </div>
      </div>
      <div className="p-6 flex-1 overflow-y-auto max-h-[600px] custom-scrollbar relative">
        <div className="space-y-6 relative">
          <div className="absolute left-5 top-2 bottom-2 w-[2px] bg-gradient-to-b from-indigo-500/20 via-purple-500/20 to-transparent dark:from-indigo-500/40 dark:via-purple-500/20"></div>
          {feedData.map((activity: any) => {
            const Icon = IconMap[activity.icon] || Activity;
            return (
              <div key={activity.id} className="flex gap-5 relative group/item">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 border-2 backdrop-blur-sm shadow-sm transition-transform duration-300 group-hover/item:scale-110',
                    ColorMap[activity.color] || ColorMap.indigo
                  )}
                >
                  <Icon size={16} strokeWidth={2.5} />
                </div>
                <div className="flex-1 pb-1 pt-1 group-hover/item:translate-x-2 transition-transform duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4 bg-transparent p-2 -mx-2 rounded-xl group-hover/item:bg-gray-50/80 dark:group-hover/item:bg-white/5 transition-colors duration-300">
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                      {activity.text}
                    </p>
                    <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 whitespace-nowrap pt-0.5 sm:pt-1">
                      {activity.time || formatRelativeTime(activity.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
