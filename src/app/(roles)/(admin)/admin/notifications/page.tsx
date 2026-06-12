"use client";
import React from "react";

import dynamic from "next/dynamic";
import { NotificationsHeader } from "./_components/NotificationsHeader";

// Lazy load the heavy client component (Framer Motion, Zustand, etc.)
// ssr: false is used here to avoid hydration mismatches with heavy client-side libraries
// and drastically reduce the initial JavaScript bundle size.
const NotificationsEmptyState = dynamic(
  () => import("./_components/NotificationsEmptyState"),
  { ssr: false }
);

export default function NotificationsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <NotificationsHeader />
      <NotificationsEmptyState />
    </div>
  );
}
