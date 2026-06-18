import React from 'react';

export default function Loading() {
  return (
    <div className="flex h-[80vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-4 border-gray-200 dark:border-white/10 border-t-indigo-600 dark:border-t-indigo-500 animate-spin"></div>
        <p className="text-sm font-medium text-gray-400 dark:text-gray-500">
          Loading user profile...
        </p>
      </div>
    </div>
  );
}
