"use client";
import React from "react";

import dynamic from "next/dynamic";

const TasksManager = dynamic(() => import("./_components/TasksManager"), {
  ssr: false,
});

export default function TasksPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <TasksManager />
    </div>
  );
}
