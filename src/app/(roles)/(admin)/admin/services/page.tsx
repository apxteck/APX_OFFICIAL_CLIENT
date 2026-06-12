"use client";
import React from "react";

import dynamic from "next/dynamic";

const ServicesManager = dynamic(() => import("./_components/ServicesManager"), {
  ssr: false,
});

export default function ServicesManagementPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <ServicesManager />
    </div>
  );
}
