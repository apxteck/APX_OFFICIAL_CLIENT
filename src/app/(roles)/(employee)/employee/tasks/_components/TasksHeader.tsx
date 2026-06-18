import React from 'react';
import { CheckSquare } from 'lucide-react';

export function TasksHeader() {
  return (
    <div className="bg-white dark:bg-[#111] p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-gray-100 dark:border-white/5 relative overflow-hidden shadow-sm">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
      <div className="space-y-2 relative z-10">
        <div className="flex items-center gap-2 text-indigo-500 font-semibold text-sm">
          <CheckSquare className="w-4 h-4 text-indigo-500" />
          <span>Task Manager</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          My Assigned Tasks
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl leading-relaxed">
          Keep track of your pending assignments, update progress, and mark tasks as completed.
        </p>
      </div>
    </div>
  );
}
