import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewServiceLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-gray-400">
          <ArrowLeft className="w-5 h-5" />
        </div>
        <div>
          <div className="h-8 w-64 bg-gray-200 dark:bg-white/10 rounded mb-2"></div>
          <div className="h-4 w-96 bg-gray-200 dark:bg-white/10 rounded"></div>
        </div>
      </div>

      <div className="space-y-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10"></div>
            <div className="h-6 w-48 bg-gray-200 dark:bg-white/10 rounded"></div>
          </div>
          
          <div className="pl-10">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="p-6 rounded-3xl border border-gray-100 dark:border-white/5 bg-white dark:bg-[#111] flex flex-col items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-200 dark:bg-white/10"></div>
                  <div className="space-y-2 w-full">
                    <div className="h-4 w-3/4 bg-gray-200 dark:bg-white/10 rounded"></div>
                    <div className="h-3 w-1/2 bg-gray-200 dark:bg-white/10 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
