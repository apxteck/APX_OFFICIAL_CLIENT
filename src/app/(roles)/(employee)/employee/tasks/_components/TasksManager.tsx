"use client";
import React from 'react';
import { TasksHeader } from './TasksHeader';
import { TaskList } from './TaskList';
import { useTasksLogic } from '../_hooks/useTasksLogic';
import { Task } from "@/services/admin/tasks.service";

interface Props {
  initialTasks: Task[];
  initialTotalPages: number;
  initialPage: number;
}

export default function TasksManager({ initialTasks, initialTotalPages, initialPage }: Props) {
  const {
    tasks,
    isLoading,
    page,
    totalPages,
    statusFilter,
    handleFilterChange,
    handleUpdateStatus,
    fetchTasks
  } = useTasksLogic(initialTasks, initialTotalPages, initialPage);

  return (
    <div className="w-full space-y-8 pb-10">
      <TasksHeader />
      <TaskList 
        tasks={tasks}
        isLoading={isLoading}
        page={page}
        totalPages={totalPages}
        statusFilter={statusFilter}
        handleFilterChange={handleFilterChange}
        fetchTasks={fetchTasks}
        handleUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
