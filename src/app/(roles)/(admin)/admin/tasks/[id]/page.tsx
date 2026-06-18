import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { tasksService } from "@/services/admin/tasks.service";
import { TaskDetailClient } from "../_components/TaskDetailClient";

export default async function TaskDetailPage({ params }: { params: { id: string } }) {
  const task = await tasksService.getTaskById(Number(params.id));

  if (!task) {
    notFound();
  }

  return (
    <Suspense fallback={
      <div className="flex h-[80vh] items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-gray-200 dark:border-white/10 border-t-indigo-600 dark:border-t-indigo-500 animate-spin"></div>
      </div>
    }>
      <TaskDetailClient initialTask={task} />
    </Suspense>
  );
}
