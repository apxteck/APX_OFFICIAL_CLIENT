"use client";
import React from "react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardTabs } from "./DashboardTabs";
import { DashboardContent } from "./DashboardContent";

export default function DashboardManager() {
  return (
    <>
      <DashboardHeader />
      <DashboardTabs />
      <DashboardContent />
    </>
  );
}
