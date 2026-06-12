"use client";

import React from "react";

import dynamic from "next/dynamic";

const PortfolioManager = dynamic(() => import("./_components/PortfolioManager"), {
  ssr: false,
});

export default function PortfolioManagementPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <PortfolioManager />
    </div>
  );
}

