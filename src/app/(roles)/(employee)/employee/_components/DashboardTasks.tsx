import React from 'react';
import { TaskItem } from '../_hooks/useDashboardLogic';

interface DashboardTasksProps {
  tasks: TaskItem[];
}

export function DashboardTasks({ tasks }: DashboardTasksProps) {
  return (
    <div className="lg:col-span-2 bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl space-y-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/10 pb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Assigned Checklist</h3>
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium font-mono">{tasks.length} Tasks Listed</span>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-[#1a1a1a] hover:border-indigo-500/20 transition-all"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.status === 'COMPLETED'}
                readOnly
                className="rounded border-gray-300 dark:border-white/20 text-indigo-500 focus:ring-indigo-500 w-5 h-5 cursor-pointer bg-white dark:bg-[#111]"
              />
              <div className="space-y-0.5">
                <p className={`font-semibold text-sm ${task.status === 'COMPLETED' ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-gray-100'}`}>
                  {task.title}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-mono font-bold text-indigo-500 dark:text-indigo-400">TSK-{task.id}</span>
                  <span>•</span>
                  <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
              task.priority === 'HIGH' ? 'bg-red-500/10 text-red-500 dark:text-red-400' :
              task.priority === 'MEDIUM' ? 'bg-amber-500/10 text-amber-500 dark:text-amber-400' :
              'bg-gray-500/10 text-gray-500 dark:text-gray-400'
            }`}>
              {task.priority}
            </span>
          </div>
        ))}
        {tasks.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">No assigned tasks currently.</p>
        )}
      </div>
    </div>
  );
}
