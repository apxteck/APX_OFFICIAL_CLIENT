"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckSquare, 
  PlayCircle, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Flag, 
  Calendar,
  Loader2,
  AlertCircle
} from "lucide-react";
import { tasksService } from "@/services/employee/tasks.service";
import { Task } from "@/services/admin/tasks.service";
import { format, isPast, isToday } from "date-fns";

export default function EmployeeTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("");

  const fetchTasks = async (pageNum = 1) => {
    setIsLoading(true);
    try {
      const res = await tasksService.getMyTasks({ page: pageNum, limit: 10, status: statusFilter || undefined });
      if (res.success) {
        setTasks(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
        setPage(res.data.pagination.page);
      }
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [statusFilter]);

  const handleUpdateStatus = async (id: number, currentStatus: string) => {
    let nextStatus: Task["status"] = "IN_PROGRESS";
    if (currentStatus === "IN_PROGRESS") nextStatus = "COMPLETED";
    
    try {
      await tasksService.updateTaskStatus(id, nextStatus);
      fetchTasks(page);
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to update task status.");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'OPEN':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-500/10 text-blue-500 dark:text-blue-400 border border-blue-500/20 flex items-center gap-1.5"><Clock size={12} /> Open</span>;
      case 'IN_PROGRESS':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 flex items-center gap-1.5"><PlayCircle size={12} /> In Progress</span>;
      case 'COMPLETED':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5"><CheckCircle2 size={12} /> Completed</span>;
      case 'CANCELLED':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-red-500/10 text-red-500 dark:text-red-400 border border-red-500/20 flex items-center gap-1.5"><XCircle size={12} /> Cancelled</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-gray-500/10 text-gray-500 border border-gray-500/20">{status}</span>;
    }
  };

  return (
    <div className="w-full space-y-8 pb-10">
      {/* Header */}
      <div className="bg-white dark:bg-[#111] p-8 rounded-3xl border border-gray-100 dark:border-white/5 relative overflow-hidden shadow-sm">
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

      <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 p-6 sm:p-8 rounded-3xl shadow-sm overflow-hidden min-h-[500px]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 dark:border-white/10 pb-4 mb-6 gap-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Task List</h3>
            <span className="text-xs font-bold bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full">
              {tasks.length} Records
            </span>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="">All Statuses</option>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Loading your tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
            <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center">
              <CheckSquare className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <div>
              <h4 className="text-base font-bold text-gray-900 dark:text-white">No Tasks Found</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm">You don't have any tasks matching the current filter.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => {
              const isDue = task.dueDate ? isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate)) && task.status !== "COMPLETED" && task.status !== "CANCELLED" : false;
              
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={task.id} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-[#1a1a1a] hover:border-indigo-500/20 transition-all gap-4 group"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between sm:justify-start gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 dark:text-indigo-400 px-2 py-0.5 rounded-md">
                          TSK-{task.id}
                        </span>
                        <p className="font-bold text-sm text-gray-900 dark:text-white truncate max-w-[200px] sm:max-w-md">{task.title}</p>
                      </div>
                      {getStatusBadge(task.status)}
                    </div>
                    
                    {task.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 max-w-2xl">
                        {task.description}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium pt-1">
                      <span className={`px-2 py-1 font-bold rounded-md uppercase tracking-wider border inline-flex items-center gap-1 ${
                        task.priority === "HIGH" ? "bg-red-50 text-red-600 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20" :
                        task.priority === "MEDIUM" ? "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20" :
                        "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20"
                      }`}>
                        <Flag size={10} />
                        {task.priority}
                      </span>

                      {task.dueDate && (
                        <div className={`inline-flex items-center gap-1.5 font-bold px-2 py-1 rounded-md border ${
                          isDue ? "bg-red-50 text-red-600 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20" : 
                          "bg-gray-50 text-gray-600 border-gray-200 dark:bg-[#151515] dark:text-gray-400 dark:border-white/10"
                        }`}>
                          <Calendar size={12} />
                          {format(new Date(task.dueDate), "MMM dd, yyyy")}
                        </div>
                      )}

                      <span className="text-gray-400 dark:text-gray-500 flex items-center gap-1">
                        <Clock size={12} /> Created {format(new Date(task.createdAt), "MMM dd, yyyy")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end shrink-0">
                    {task.status === 'OPEN' && (
                      <button
                        onClick={() => handleUpdateStatus(task.id, task.status)}
                        className="px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold text-xs rounded-xl transition-colors border border-indigo-100 dark:border-indigo-500/20 flex items-center gap-1.5"
                      >
                        <PlayCircle size={14} /> Start Task
                      </button>
                    )}
                    {task.status === 'IN_PROGRESS' && (
                      <button
                        onClick={() => handleUpdateStatus(task.id, task.status)}
                        className="px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs rounded-xl transition-colors border border-emerald-100 dark:border-emerald-500/20 flex items-center gap-1.5"
                      >
                        <CheckCircle2 size={14} /> Complete Task
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/10 mt-6">
                <button 
                  disabled={page === 1}
                  onClick={() => fetchTasks(page - 1)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 disabled:opacity-50 transition-colors"
                >
                  Previous
                </button>
                <span className="text-xs font-semibold text-gray-500">Page {page} of {totalPages}</span>
                <button 
                  disabled={page === totalPages}
                  onClick={() => fetchTasks(page + 1)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 disabled:opacity-50 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
