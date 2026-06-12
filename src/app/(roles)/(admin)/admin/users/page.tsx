"use client";

import React from "react";
import dynamic from "next/dynamic";

const UsersManager = dynamic(() => import("./_components/UsersManager"), {
  ssr: false,
});

export default function UsersManagementPage() {
  return (
    <div className="space-y-6">
      <UsersManager />
    </div>
  );
}
