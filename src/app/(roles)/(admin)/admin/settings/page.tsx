"use client";
import React from "react";

import dynamic from "next/dynamic";

const SettingsManager = dynamic(() => import("./_components/SettingsManager"), {
  ssr: false,
});

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      <SettingsManager />
    </div>
  );
}
