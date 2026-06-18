"use client";
import React from "react";
import { ListTodo } from "lucide-react";

interface Props {
  navigateToCreate: () => void;
}

export function TasksHeader({ navigateToCreate }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
            <ListTodo size={24} />
          </div>
          Task Management
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-2">
          Assign tasks to your team, track progress, and hit deadlines.
        </p>
      </div>
      <button 
        onClick={navigateToCreate}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 min-h-[44px] flex items-center justify-center rounded-xl font-bold text-sm transition-colors shadow-sm self-start sm:self-auto"
      >
        + Create Task
      </button>
    </div>
  );
}
