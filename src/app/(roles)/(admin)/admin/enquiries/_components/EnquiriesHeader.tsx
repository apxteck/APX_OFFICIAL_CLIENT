import React from 'react';
import { MessageSquare } from 'lucide-react';

export function EnquiriesHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
            <MessageSquare size={24} />
          </div>
          Enquiries
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-2">
          Manage and review customer enquiries from the website.
        </p>
      </div>
    </div>
  );
}
