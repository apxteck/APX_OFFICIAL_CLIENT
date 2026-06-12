"use client";

import React from "react";

import dynamic from "next/dynamic";

const RolesManager = dynamic(() => import("./_components/RolesManager"), {
  ssr: false,
});

export default function RolesManagementPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <RolesManager />
    </div>
  );
}

