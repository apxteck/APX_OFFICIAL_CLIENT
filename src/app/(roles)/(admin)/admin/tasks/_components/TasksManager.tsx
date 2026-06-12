"use client";
import React from "react";
import { TasksHeader } from "./TasksHeader";
import { TasksTable } from "./TasksTable";

export default function TasksManager() {
  return (
    <>
      <TasksHeader />
      <TasksTable />
    </>
  );
}
