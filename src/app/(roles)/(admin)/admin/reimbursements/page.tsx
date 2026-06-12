"use client";
import React from "react";
import { ReimbursementsHeader } from "./_components/ReimbursementsHeader";

import dynamic from "next/dynamic";

const ReimbursementsManager = dynamic(() => import("./_components/ReimbursementsManager"), {
  ssr: false,
});

export default function ReimbursementsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <ReimbursementsHeader />
      <ReimbursementsManager />
    </div>
  );
}
