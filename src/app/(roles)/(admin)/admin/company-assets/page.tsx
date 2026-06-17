"use client";

import React from "react";
import dynamic from "next/dynamic";

const CompanyAssetsManager = dynamic(() => import("./_components/CompanyAssetsManager").then(mod => mod.CompanyAssetsManager), {
  ssr: false,
});

export default function CompanyAssetsPage() {
  return (
    <div className="space-y-6">
      <CompanyAssetsManager />
    </div>
  );
}
