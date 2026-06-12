"use client";

import React from "react";
import { PermissionsHeader } from "./_components/PermissionsHeader";

import dynamic from "next/dynamic";

const PermissionsManager = dynamic(() => import("./_components/PermissionsManager"), {
  ssr: false,
});

export default function ModuleAccessPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <PermissionsHeader />
      <PermissionsManager />
    </div>
  );
}

