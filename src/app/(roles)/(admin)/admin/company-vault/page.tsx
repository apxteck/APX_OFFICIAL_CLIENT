"use client";

import React from "react";
import dynamic from "next/dynamic";

const CompanyVaultManager = dynamic(() => import("./_components/CompanyVaultManager").then(mod => mod.CompanyVaultManager), {
  ssr: false,
});

export default function CompanyVaultPage() {
  return (
    <div className="space-y-6">
      <CompanyVaultManager />
    </div>
  );
}
